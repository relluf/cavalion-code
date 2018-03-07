"use veldoffice/Session,veldoffice/EM,veldoffice/models";
"use strict";

var locale = window.locale;
var models = require("veldoffice/models");
var Session = require("veldoffice/Session");
var Panel = require("vcl/ui/Panel");

var panel = Object.create(new Panel(), {
	
	content: {
		get: function() { return this.getContent(); },
		set: function(value) { this.setContent(value); }
	}
	
});

	var UriTools = {
        parse: function (uri) {
            var r = {};

            uri = uri.split("<");
            if (uri.length === 2) {
                r.template = uri[0];
                r.namespace = uri[0].split(".")[0].split("/");
                r.name = r.namespace.pop();
                r.namespace = r.namespace.join("/");

                uri = uri[1].split(">");
                if ((r.specializer = uri.shift()) === "") {
                    r.template = "";
                }
                r.classes = uri.shift().split(".");
                if (r.classes[0] === "") {
                    r.classes.shift();
                }
            } else {
                // Only last part can have a dot (.) indicating classes
                r.classes = uri[0].split("/").pop().split(".");
                r.classes.shift();

                uri = uri[0].substring(0, uri[0].length - r.classes.join(".").length - 1);

                r.template = "";
                r.specializer = "";

                r.namespace = uri.split("/");
                r.name = r.namespace.pop();
                r.namespace = r.namespace.join("/");
            }

            if (r.specializer) {
                r.specializer = r.specializer.split(".");
                r.specializer_classes = r.specializer.splice(1);
                r.specializer = r.specializer.pop();
            } else {
                r.specializer_classes = [];
            }

            return r;
        },
        compile: function (keys) {

            var className = keys.className || (keys.classes ? keys.classes.join(" ") : "");
            var specializer = keys.specializer ? keys.specializer : keys.template ? keys.namespace || "" : "";
            var name = keys.name || "";
            var uri;
            if (className !== "") {
                className = String.format(".%s", className.split(" ").join("."));
            }

            if (name.indexOf(".") === -1) {
                name = "";
            } else {
                name = "." + name;
            }

            if (keys.specializer_classes instanceof Array && keys.specializer_classes.length) {
                specializer += String.format(".%s", keys.specializer_classes.join("."));
            }

            if (keys.template) {
                uri = String.format("%s<%s>%s%s", keys.template, specializer, name, className);
            } else {
                uri = String.format("%s%s%s%s", keys.namespace, keys.namespace ? "/" : "", keys.name, className);
            }

            return uri;
        },
        implicitBaseFor: function (uri, loop) {
            if (loop === true) {
                var arr = [];
                while (uri !== null) {
                    arr.push(uri);
                    uri = UriTools.implicitBaseFor(uri);
                }
                return arr;
            }

            var keys = UriTools.parse(uri);

            // ui/forms/persistence/View
            if (keys.specializer === "" && keys.classes.length === 0) {
                if (uri.indexOf("<>") !== -1) {
                    return uri.split("<")[0];
                }
                return null;
            }

            // ui/forms/persistence/View<X>.a
            if (keys.classes.length > 0) {
                delete keys.classes;
                return UriTools.compile(keys);
            }

            // ui/forms/persistence/View<X.b>.a
            if (keys.specializer_classes.length > 0) {
                delete keys.specializer_classes;
                return UriTools.compile(keys);
            }

            // ui/forms/persistence/View<X.a>
            if (keys.specializer !== "") {
                if (keys.specializer.indexOf(".") !== -1) {
                    if ((keys.specializer = keys.specializer.split(".")[0]) !== "") {
                        return UriTools.compile(keys);
                    }
                    // ui/forms/persistence/View<X/Y>
                } else if (keys.specializer.indexOf("/") !== -1 || keys.specializer.indexOf(":") !== -1) {
                    keys.specializer = keys.specializer.split("/");
                    if (keys.specializer.length === 1) {
                        keys.specializer = keys.specializer[0].split(":");
                    }
                    keys.specializer.pop();
                    if ((keys.specializer = keys.specializer.join("/")) !== "") {
                        return UriTools.compile(keys);
                    }
                }
            }

            // ui/forms/persistence/View<X>
            return keys.template;
        },
        implicitBasesFor: function (uri) {
            var base = UriTools.implicitBaseFor(uri);
            var r = [];

            if (base !== null) {
                var keys = UriTools.parse(uri);
                var classes = keys.classes;
                var spec_classes = keys.specializer_classes;
                if (classes.length > 1) {
                    // [A] Each class expands
                    classes.forEach(function (cls) {
                        keys.classes = [cls];
                        r.push(UriTools.compile(keys));
                    });
                } else if (classes.length === 1) {
                    if (spec_classes.length > 1) {
                        // [B] Each specializer_class expands
                        spec_classes.forEach(function (cls) {
                            keys.specializer_classes = [cls];
                            r.push(UriTools.compile(keys));
                        });
                    } else if (spec_classes.length === 1) {
                        // [C]
                        delete keys.specializer_classes;
                        r.push(UriTools.compile(keys));
                    } else if (keys.specializer) {
                        // [D] keys.classes.length === 1 && keys.specializer
                        delete keys.template;
                        delete keys.specializer;
                        r.push(UriTools.compile(keys));
                    } else if (uri.indexOf(Factory.PREFIX_PROTOTYPES) !== 0) {
                        // [H] keys.classes.length === 1 && !keys.specializer && !prototypes/
                        r.push(String.format("%s%s", Factory.PREFIX_PROTOTYPES, uri));
                    } else {
                        // [J] equals [G], continue on prototypes/ prefix
                    }
                } else if (spec_classes.length > 1) {
                    // [E] Each specializer_class expands
                    spec_classes.forEach(function (cls) {
                        keys.specializer_classes = [cls];
                        r.push(UriTools.compile(keys));
                    });
                } else if (spec_classes.length === 1) {
                    // [F]
                    delete keys.specializer_classes;
                    r.push(UriTools.compile(keys));
                } else if (keys.specializer) {
                    /*- [G] nothing todo here since there are no (spec_)classes
                     * and the implicit base is already pushed */
                } else {
                    /*- console.warn("Thought this was unreachable code"); */
                    // empty specifier due to: ComponentClass<>
                }

                // Always inherit the implicit base
                r.push(base);

            } else if (uri.indexOf(Factory.PREFIX_PROTOTYPES) !== 0) {
                r.push(String.format("%s%s", Factory.PREFIX_PROTOTYPES, uri));
            } else {
                // [I] it ends here, there is no implicit base for uri
            }
            return r;
        },
        implicitSourceFor: function (uri) {
            var uris = UriTools.implicitBasesFor(uri);
            if (uris.length === 0) {
                if (uri.indexOf(Factory.PREFIX_PROTOTYPES) !== 0) {
                    uris.push(String.format("%s%s", Factory.PREFIX_PROTOTYPES, uri));
                }
            }

            uris.sort(function (u1, u2) {
                // WRONG: 304 App.desktop --> $(["App", "vcl/prototypes/App.desktop"]);
                // RIGHT: 304 App.desktop --> $(["vcl/prototypes/App.desktop", "App"]);
                u1 = u1.indexOf(".scaffold");
                u2 = u2.indexOf(".scaffold");
                return u1 < u2 ? -1 : 1;
            });
            
            uris = uris.filter(function(uri, index) {
            	return uris.indexOf(uri) === index;
            });
            
            return String.format("[\"" + uris.join("\", \"") + "\"];");
        }
	};


$([], {
	
	handlers: {
		"#toggle-console click": function() {
			var console = this.scope().console;
			if(console.isVisible()) console.hide(); else console.show();
		},
		
		"#console loaded": function() {
			this.print("this", this);
		}
	}
	
}, [

	$("vcl/ui/Panel", {
		align: "top",
		autoSize: "height",
		css: "padding: 8px; _border-bottom: 1px solid silver;"
	}, [
		
		$("vcl/ui/Button#toggle-console", {
			content: locale("Toggle console")
		})
		
	]),
	
	$("vcl/ui/Console#console", { align: "client", classes: "no-time", height: 150, onEvaluate: function(expression) { var scope = this.scope(), me = this._owner; return eval(expression); }})
	
]);