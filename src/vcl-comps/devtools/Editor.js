"devtools/Resources, util/Xml, vcl/ui/Tab";

/*- Two way data binding mechanism needed! */
/*- Event model/mechanism needed! */

// TODO resetundo,gototop?
var Resources = require("devtools/Resources");

$(["ui/Form"], {
    activeControl: "ace",
    onLoad: function () {
        var tab = this.up("vcl/ui/Tab");
        var scope = this.getScope();
        
        var ExtensionToMode = {
            "html": "html",
            "css": "css",
            "scss": "scss",
            "json": "json",
            "js": "javascript",
            "blocks": "javascript",
            "vcl": "javascript",
            "ts": "typescript",
            "md": "markdown",
            "java": "java",
            "jsx": "jsx",
            "wsdl": "xml",
            "xsd": "xml",
            "xml": "xml",
            "xsl": "xml",
            "jsp": "jsp"
        };

        var ed = scope.ace.getEditor();
        ed.setTheme("ace/theme/eclipse");
        ed.renderer.setHScrollBarAlwaysVisible(false);
        ed.setScrollSpeed(2);

        var ext = (tab.getVar("resource.uri") || "").split(".").pop();
        var session = ed.getSession();
        
        var mode = "ace/mode/" + (ExtensionToMode[ext || this.getSpecializer()] || (ext || "js"));
        
        require([mode], 
        	function() { session.setMode(mode); }, 
        	function() { console.log("Unknown mode " + mode); });
        
        session.setUseWrapMode(true);
        session.setWrapLimitRange(null, null);

        session.on("change", function (e) {
            scope.ace.setTimeout("update", function () {
                var modified = tab.getVar("modified");
                if (modified === "resetundo,gototop") {
                    session.getUndoManager().reset();
                    tab.removeVar("modified");
                    tab.setState("invalidated", true);
                } else {
                    if (session.getUndoManager().hasUndo()) {
                        if (!modified) {
                            tab.setVar("modified", true);
                            tab.setState("invalidated", true);
                        }
                    } else {
                        if (tab.getVar("modified") !== undefined) {
                            tab.removeVar("modified");
                            tab.setState("invalidated", true);
                        }
                    }
                }
            }, 100);
        });

        scope.refresh.execute();
        
        return this.inherited(arguments);
    }
}, [
    $(("vcl/Action"), "refresh", {
        hotkey: "MetaCtrl+R",
        onExecute: function (evt) {
            var scope = this.getScope();
            var tab = this.up("vcl/ui/Tab");
            var resource = tab.getVar("resource");
            var editor = scope.ace.getEditor();
            if (resource) {
                scope.loading.show();
                editor.setReadOnly(true);
                editor.blur();
                Resources.get(resource.uri).
                    then(function (res) {
                        if(res.text !== undefined && res.text !== editor.session.getValue()) {
                            tab.setVar("modified", "resetundo,gototop");
                            editor.session.setValue(res.text);
                        } else {
                            tab.removeVar("modified");
                        }
                        tab.setVar("resource.revision", res.revision);
                        editor.setReadOnly(false);
                        editor.focus();
                        scope.loading.hide();
                        tab.emit("resource-loaded");
//                        tab.setState("invalidated", true);
                    }).
                    catch(function(res) {
                        editor.setReadOnly(false);
                        editor.focus();
                        
                        scope.loading.hide();
                        tab.emit("resource-loaded");
                        console.error(res);
                    });
            }
        }
    }),
    $(("vcl/Action"), "save", {
        hotkey: "MetaCtrl+S",
        onExecute: function () {
            var scope = this.getScope();
            var resource = this.getVar("resource", true);
            var text = scope.ace.getValue();
            var editor = scope.ace.getEditor();
            
            // vcl/ui/Tab[uri=devtools/Workspace]:owner-of(.)
            /*- Since it has to be the first owner 'up-wise', expressions become MUCH simpler by using ::up(). Hear, hear, Ext.. */
            var tab = this.up("vcl/ui/Tab"); 

            if(!resource.uri || !tab.getVar("modified")) {
                return;
            }

            scope.loading.show();
            editor.setReadOnly(true);
            editor.blur();

            resource.text = editor.getValue();
            Resources.update(resource.uri, resource).
                then(function(res) {
                    editor.setReadOnly(false);
                    editor.focus();
                    scope.loading.hide();
                    return res;
                }).
                then(function(res) {
                    tab.removeVar("modified");
                    tab.setState("invalidated", true);
                    resource.revision = res.revision;
                    tab.emit("resource-saved");
                }).
                catch(function(err) {
                    alert(err.message);
                });
        }
    }),
    $(("vcl/Action"), "format", {
        hotkey: "MetaCtrl+Shift+F",
        onExecute: function () {
            var Xml = require("util/Xml");
            var scope = this.getScope();
            var editor = scope.ace.getEditor();
            var mode = editor.session.$modeId || "";
            switch (mode.split("/").pop()) {
            case "javascript":
            case "json":
                editor.setValue(js.b(editor.getValue()));
                break;

            case "xml":
                editor.setValue(Xml.beautify(editor.getValue()));
                break;

            default:
                alert("Don't know how to format this (yet)");

            }
        }
    }),
    $(("vcl/Action"), "toggle-wrap", {
        hotkey: "MetaCtrl+Shift+W",
        onExecute: function (evt) {
            var editor = this.scope().ace.getEditor();
            editor.getSession().setUseWrapMode(!editor.getSession().getUseWrapMode());
            evt.preventDefault();
        }
    }),
    $(("vcl/Action"), "evaluate", {
        hotkey: "MetaCtrl+Enter",
        onExecute: function() {
            var all = require("js/JsObject").all;
            var Deferred = require("js/Deferred");

            function defer(requirements, callback) {
                var deferred = new Deferred();
                require(requirements, function() {
                    var args = [deferred].concat(js.copy_args(arguments));
                    return callback.apply(this, args);
                });
                return deferred;
            }


            function pr() {
                scope['@app'].emit("print", arguments);
            }

            var scope = this.getScope();
            var text = scope.ace.getEditor().getSession().getValue();

            if(text.charAt(0) === "{") {
                text = "(" + text + ")";
            }
            try {
                var value = eval(text);
                if(value !== undefined) {
                    scope['@app'].emit("print", value);
                    //console.log(value);
                }
            } catch(e) {
                scope['@app'].emit("print", e);
                //console.log(e);
            }
        }
    }),
    $(("vcl/Action"), "focus-in-navigator", {
    	hotkey: "MetaCtrl+48",
        onExecute: function(evt) {
            var app = this.getApp();
            var resource = this.getVar("resource", true);
            app.qsa("devtools/Workspace<>:owner-of(.) #navigator #resource-focus", this)
            	.execute({resource: resource}, this);
        }
    }),
    $(("vcl/ui/Ace"), "ace"),
    $(("vcl/ui/Panel"), "loading", {
        align: "none",
        autoSize: "both",
        css: {
            opacity: "0.75",
            background: "white url(/shared/vcl/images/loading.gif) no-repeat center center",
            "z-index": "10000",
            left: 0, top: 0, bottom: 0, right: 0
        },
        visible: false,
        
        /* TODO fade out */
        onLoad: function() {
            var canHide = Date.now();
            this.override({
                showNode: function() {
                    this.clearTimeout("hideNode");
                    canHide = Date.now() + 250;
                    return this.inherited(arguments);
                },
                hideNode: function() {
                    var me = this, args = js.copy_args(arguments);
                    args.callee = arguments.callee;
                    this.setTimeout(function() {
                        me.inherited(args);
                    }, canHide - Date.now());
                }
            })
        }
    })
]);