"js/Method, devtools/Resources, devtools/NavigatorNode";

var Method = require("js/Method");
var Resources = require("devtools/Resources");
var NavigatorNode = require("devtools/NavigatorNode");

var needsParent = ["src", "build", "vcl-comps", "css", "images", "img", "lib", "pages"];

function getUriNodeText(uri, usedNames) {
	var r = []; usedNames = usedNames || [];
	r.push((uri = uri.split("/")).pop());
	
	while(uri.length > 0 && (needsParent.indexOf(r[0]) !== -1 || usedNames.indexOf(r.join("/")) !== -1)) {
		r.unshift(uri.pop());
	}
	
	return r.join("/");
}

[[], {
	onLoad: function() {
        var scope = this.scope();
        var me = this;
        
        this.readStorage("uris", function (json) {

            var indexing = 0;
            var lists = {};
            var index = {};
            var uris = json ? JSON.parse(json) : [];

	/*- TODO get rid of this Var-thing (or not?) */
            me.setVar("index", index);
            me.setVar("uris", uris);
            me.setVar("Resources", {
                index: function () {
                    var run = ++indexing;
                    // scope['search-input'].addClass("searching");
                    return Resources.index(uris).
	                    then(function (res) {
	                        if (run === indexing) {
	                            // for (var k in index) {
	                            //     delete index[k];
	                            // }
	                            for (k in lists) {
	                                if (lists[k] instanceof Array) {
	                                    index[k] = lists[k];
	                                }
	                            }
	                            js.mixIn(index, res);
	                            // scope.search.execute();
	                        }
	                        // scope['search-input'].removeClass("searching");
	                        return res;
	                    }).
	                    catch(function(res) {
	                        // scope['search-input'].removeClass("searching");
	                        return res;
	                    });
                },
                list: function (uri) {
                    lists[uri] = Resources.list(uri);
                    return lists[uri].
	                    then(function (res) {
	                    	lists[uri] = res;
	                        return (index[uri] = res);
	                    });
                },
                refresh: function (uri) {
                    delete lists[uri];
                }
            });

            me.apply("Resources.index");
            // scope.tree.dispatch("nodesneeded", null);
        });

        return this.inherited(arguments);
	},
	onDispatchChildEvent: function (component, name, evt, f, args) {
	
		/*- Open Resource - Use Shift to open folders */
        if (name === "dblclick" && (component.hasClass("file") || 
            evt.shiftKey === true) && 
            (resource = component.getVar("resource"))
        ) {
        	this.up("devtools/Workspace<>:root")
        		.down("#editor-needed")
        		.execute({resource: resource, selected: true});
        	evt.preventDefault();
        	return false;
        }

		/*- Index Folder Resource */
        if (name === "click" && evt.target.nodeName === "INPUT") {
            var uris = this.getVar("uris");
            var uri = component.getVar("resource.uri");
            var checked = component.getChecked();
            var index = uris.indexOf(uri);
            if (index !== -1 && !checked) {
                uris.splice(index, 1);
            } else {
                uris.push(uri);
            }

            this.writeStorage("uris", JSON.stringify(uris));

            var me = this;
            this.setTimeout("refresh-index", function () {
                me.apply("Resources.index");
            }, 750);
        }

        /*- Cancel the timeout (whatever event) */
        if (this.hasClass("checking")) {
            var me = this;
            this.setTimeout("removeClass", function () {
                me.removeClass("checking");
            }, 2000);
        }
	
	
	    return this.inherited(arguments);
	},
	onNodesNeeded: function(parent) {
        var owner = this;//._owner; // TODO this or this._owner?
        var root = parent === undefined || parent === null || parent === this; // TODO too much options (called from Navigator or from vcl/ui/Node)

        parent = parent || this;

        var uri = parent.getVar("resource.uri") || "";
        var control = parent.getVar("control");
        var uris = this.getVar("uris");
        
        if(root) {
            var uriNodes = {};
			function createUriNode(uri) {
                var node = new NavigatorNode(owner);
                
                uri = uri.split(";");
                
                var item = {
                	uri:	uri[0], 
                	name:	uri[1] || getUriNodeText(uri[0]),
                	type:	uri[2] || "Folder"
                };

                root && node.addClass("root");
                node.setVar("resource", item);
                
                node.setChecked(true);
                node.setExpandable(true);
                node.setParent(parent);
                return (uriNodes[uri[1]] = node);
            }            
            
            uris.sort(function(i1, i2) { return i1 < i2 ? -1 : 1; }).forEach(createUriNode);
            
            Method.override(uris, {
	            splice: function(index, count) {
	            	for(var i = 0; i < count; ++i) {
	            		var node = uriNodes[this[index + i]];
	            		node && node.destroy();
	            	}
	            	return Method.callInherited(this, arguments);
	            },
	            push: function() {
	            	for(var i= 0; i < arguments.length; ++i) {
	            		createUriNode(arguments[i]).setIndex(0);
	            	}
	            	return Method.callInherited(this, arguments);
	            }
            });
        }
        
        /*- TODO get rid of this weird apply-thing */
        var r = this.apply("Resources.list", [uri]).
            then(function (res) {
            	res.sort(function(i1, i2) {
            		if(i1.type === i2.type) {
            			return i1.name < i2.name ? -1 : 1;
            		}
            		return i1.type !== "Folder" ? 1 : -1;
            	});
            	parent.setExpandable("auto");
            	parent.beginLoading();
            	try {
	                res.forEach(function (item, index) {
	                    var node = new NavigatorNode(owner);
	                    item.uri = uri !== "" ? (uri + "/" + item.name) : item.name;
	
	                    node.setVar("resource", item);
	                    root && node.addClass("root");
	                    
	                    root === true && index === 0 && node.addClass("seperator top");
	
	                    var checked = false;
	                    for(var i = 0; i < uris.length && !checked; ++i) {
	                    	checked = uris[i].indexOf(item.uri) === 0;
	                    }
	
	                    if(checked && uris.indexOf(item.uri) === -1) {
	                    	node.addClass("opaque");
	                    }
	                    node.setChecked(checked);
	                    if (control) {
	                        node.setVar("control", control);
	                    }
	                    node.setExpandable(item.type.indexOf("Folder") !== -1);
	                    node.setParent(parent);
	                });
            	} finally {
            		parent.endLoading();
            		parent.updateChildren(); // TODO should be automatic
            	}
                return res;
            });
        return r;
	}
}];