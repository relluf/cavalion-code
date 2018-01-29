"vcl/ui/Node, vcl/ui/ListHeader, devtools/NavigatorNode, devtools/Resources-node, js/Method";

var Method = require("js/Method");
var Resources = require("devtools/Resources-node");
var NavigatorNode = require("devtools/NavigatorNode");

var needsParent = ["src", "build", "vcl-comps", "css", "images", "img", "lib", "pages"];
function getNodeText(uri, usedNames) {
	var r = []; usedNames = usedNames || [];
	r.push((uri = uri.split("/")).pop());
	
	while(uri.length > 0 && (needsParent.indexOf(r[0]) !== -1 || usedNames.indexOf(r.join("/")) !== -1)) {
		r.unshift(uri.pop());
	}
	
	return r.join("/");
}

$("vcl/ui/Form", {
	activeControl: "search-input",
    onDispatchChildEvent: function (component, name, evt, f, args) {
        if (name.indexOf("key") === 0) {
            var scope = this.getScope();
            if (name.indexOf("key") === 0) {
                if (component === scope['search-input']) {
                    if ([13, 27, 33, 34, 38, 40].indexOf(evt.keyCode) !== -1) {
                        var list = scope['search-list'];
                        if(evt.keyCode === 13 && list.getSelection().length === 0 && list.getCount()) {
                            list.setSelection([0]);
                        } else if(evt.keyCode === 27) {
			                scope['search-input'].setValue("");
			                scope['search-input'].fire("onChange", [true]); // FIXME
                        }

                        if (list.isVisible()) {
                            list.dispatch(name, evt);
                        }
                        evt.preventDefault();
                    }
                }
            }
        }
        return this.inherited(arguments);
    },
    onLoad: function () {
        var scope = this.scope();
        var me = this;
        
        this.readStorage("uris", function (json) {

            var indexing = 0;
            var lists = {};
            var index = {};
            var uris = json ? JSON.parse(json) : [];

            me.setVar("index", index);
            me.setVar("uris", uris);

            me.setVar("Resources", {

                index: function () {
                    var run = ++indexing;
                    scope['search-input'].addClass("searching");
                    return Resources.index(uris).
	                    then(function (res) {
	                        if (run === indexing) {
	                            for (var k in index) {
	                                delete index[k];
	                            }
	                            for (k in lists) {
	                                if (lists[k].results[0] instanceof Array) {
	                                    index[k] = lists[k].results[0];
	                                }
	                            }
	                            js.mixIn(index, res);
	                            scope.search.execute();
	                        }
	                        scope['search-input'].removeClass("searching");
	                        return res;
	                    }).
	                    catch(function(res) {
	                        scope['search-input'].removeClass("searching");
	                        return res;
	                    });
                },

                list: function (uri) {
                    lists[uri] = Resources.list(uri);
                    return lists[uri].
	                    then(function (res) {
	                        return (index[uri] = res);
	                    });
                },

                refresh: function (uri) {
                    delete lists[uri];
                }
            });

            me.apply("Resources.index");
            scope.tree.dispatch("nodesneeded", null);
        });

        return this.inherited(arguments);
    }

}, [
    $("vcl/data/Array", "search-results", {}),
    
    $("vcl/Action", "search-open", {
        onExecute: function (evt) {
            var list = this.scope('search-list');
            var a = this.up("devtools/Workspace<>:root").down("#editor-needed");
            list.getSelection(true).forEach(function (resource) {
            	a.execute({resource: resource, selected: true});
            }, this);
        }
    }),
    $("vcl/Action", "search-focus", {
        hotkey: "MetaCtrl+191|Alt+F",
        onExecute: function () {
            var scope = this.getScope();
            var previous = this.getVar("previous");
            var now = Date.now();
            if(previous !== undefined && now - previous < 175) {
                scope['search-input'].setValue("");
                scope['search-input'].fire("onChange", [true]); // FIXME
            }
            scope['search-input'].setFocus(true);
            this.setVar("previous", now);
        }
    }),
    $("vcl/Action", "search", {
        onExecute: function () {
            var scope = this.getScope();
            var text = scope['search-input'].getInputValue();
            var lower = text.toLowerCase();
            var index = this._owner.getVar("index");
            var exacts = [],
            lowers = [],
            names = [],
            uris = [];

            function sort(i1, i2) {
                return i1.name < i2.name ? -1 : 1;
            }

            for (var k in index) {
                index[k].forEach(function (item) {
                	item.uri = k ? (k + "/" + item.name) : item.name;
                    if (item.name === text) {
                        exacts.push(item);
                    } else if (item.name.toLowerCase() === lower) {
                        lowers.push(item);
                    } else if (item.name.toLowerCase().indexOf(lower) !== -1) {
                        names.push(item);
                    } else if ((k + "/" + item.name).toLowerCase().indexOf(lower) !== -1) {
                        uris.push(item);
                    }
                });
            }

            scope['search-results'].setArray(
                [exacts.sort(sort), lowers, names, uris].
                    reduce(function (prev, curr) {
                        return prev.concat(curr.sort(sort));
                    }));
        }
    }),
    $("vcl/Action", "resource-focus", {
        onExecute: function(evt) {
            var scope = this.getScope();
            var names = evt.resource.uri.split("/");
            var path = [];

            scope['search-list'].hide();

            function walk(parent) {
                path.push(names.shift());

                var node = parent.getControls().find(function(node) {
                    return node.getVar("resource.uri") === path.join("/");
                });

                if(node) {
                    if(names.length) {
                        node.childNodesNeeded(function() {
                            node.setExpanded(true);
                            walk(node);
                        });
                    } else {
                        scope.tree.setSelection([node]);
                        scope.tree.makeVisible(node);
                    }
                } else {
                    //alert("Could not find " + evt.resource.uri);
                }
            }

            walk(scope.tree);
        }
    }),
    $("vcl/Action", "resource-new", {}),
    $("vcl/Action", "resource-delete", {}),
    $("vcl/ui/Panel", "search-panel", {
        align: "top",
        autoSize: "height",
        css: "padding: 6px 4px;"
    }, [
        $("vcl/ui/Input", "search-input", {
            placeholder: "Search Workspace Resources (⌥+F)",
            css: {
                width: "100%",
                border: "1px solid silver",
                "border-radius": "3px",
                padding: "4px",
                "&.searching": {
                    "background": "url(/shared/vcl/images/loading.gif) no-repeat 2px 2px",
                    "background-position": "right 4px top 5px"
                },
                "&.value": {
                    "background-color": "yellow"
                }
            },
            onDblClick: function() {
//                this.fire("onChange", [false]);
                var scope = this.getScope();
                scope['search-list'].hide();
                this.setValue("");
                this._nodes.input.value = "";
            },
            onFocus: function () {
                this.fire("onChange", [!this.getInputValue()]);
            },
            onBlur: function () {
                this.fire("onChange", [false]);
            },
            onChange: function (evt) {
                var scope = this.getScope();
                var value = this.getInputValue();
                var hasChecking = scope.tree.hasClass("checking");
                var hasValue = scope.tree.hasClass("value");
                var should = typeof evt === "boolean" ? evt : (this.isFocused());// && !value);

                scope['search-list'].setVisible( !! value);

                if (should && !hasChecking) {
                    scope.tree.addClass("checking");
                    scope.tree.setTimeout("removeClass", function () {
                        scope.tree.removeClass("checking");
                    }, 2000);
                } else if (!should && hasChecking) {
                    scope.tree.setTimeout("removeClass", function () {
                        scope.tree.removeClass("checking");
                    }, 100);
                }
                if (typeof evt !== "boolean") {
                    scope.search.execute(evt);
                }
            }
        })
    ]),
    $("vcl/ui/Tree", "tree", {
        css: {
            "padding-left": undefined,
            "overflow-x": undefined,
            ".{./Node}": {
            	"&.seperator": {
            		"border-top": "1px solid #f0f0f0", 
            		"margin-top":" 2px", 
            		"padding-top": "2px"
            	},
                ">.checkbox": {
                    position: "absolute",
                    right: "4px",
                    display: "none"
                },
                ">.icon": {
                    width: "30px",
                    "background-repeat": "no-repeat",
                    "background-position-x": "right",
                    "background-position-y": "2px",
                },
                "&.folder >.icon": {
                    "background-image": "url(/shared/vcl/images/folder16.png)",
                },
                "&.file >.icon": {
                    "background-image": "url(/shared/vcl/images/file16.png)",
                },
                ">.text>.desc": {
                    "font-size": "7.5pt",
                    color: "silver",
                    "pointer-events": "none"
                },
	            "&.opaque": {
	            	">.checkbox":{
	            		opacity: "0.5"
	            	}
	            }
            },
            "&.checking .{./Node}.folder >.checkbox": {
                display: "block"
            },
            "&.busy": {
                background: "url(/shared/vcl/images/loading.gif) no-repeat 50%,50%",
                ".{./Node}": {
                    opacity: "0.5"
                }
            }
        },
        onDispatchChildEvent: function (component, name, evt, f, args) {
            var resource, owner = this._owner;
            var app = this.app();
            
            var selection = this.getSelection();
            
            /* TODO Hotkeys should be moved to devtools/Main<> and dispatched to selected workspace */

			/*- Add/Remove Resource - Use Insert/Delete (or F8/F9) */
            if(selection.length && name === "keydown") {
            	// console.log(evt.keyCode);
                if (evt.keyCode === evt.KEY_DELETE || evt.keyCode === evt.KEY_F8) {
                	evt.preventDefault();
                    app.confirm(String.format("You are about to delete the " + 
                    "following resource%s:\n- %s\n\nAre you sure to continue?",
                        selection.length > 1 ? "s" : "",
                        selection.map(function(node) {
                            return node.getVar("resource.uri");
                        }).join("\n- ")), function(res) {
                            if(res === true) {
                                selection.forEach(function(node) {
                                    node.setEnabled(false);
                                    node.setExpanded(false);
                                    node.getNode().style.opacity = "0.5";
                                    Resources['delete'](node.getVar("resource.uri"))
                                        .then(function() {
                                            node.destroy();
                                        })
                                        .catch(function(err) {
                                            node.setEnabled(true);
                                            node.getNode().style.opacity = ""; // FIXME use a class!
                                        });
                                })
                            }
                        });
                }
                if (evt.keyCode === evt.KEY_INSERT || evt.keyCode === evt.KEY_F9) {
                    if(selection[0].getVar("resource.type") === "Folder") {
                        app.prompt("Enter uri for new resource:",
                            selection[0].getVar("resource.uri") + "/",
                            function(uri) {
                                if(uri !== null) {
                                    Resources.create(uri, {text:""})
                                        .then(function(res) {
                                            selection[0].reloadChildNodes();
                                            app.qsa("devtools/Workspace<>:owner-of(.) #editor-needed", owner)
                                            	.execute({
	                                                resource: {uri: uri},
	                                                selected: true
	                                            });
                                        })
                                        .catch(function(res) {
                                            alert(res);
                                        });
                                }
                        });
                    }
                }
            }

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
                var uris = this._owner.getVar("uris");
                var uri = component.getVar("resource.uri");
                var checked = component.getChecked();
                var index = uris.indexOf(uri);
                if (index !== -1 && !checked) {
                    uris.splice(index, 1);
                } else {
                    uris.push(uri);
                }

                this._owner.writeStorage("uris", JSON.stringify(uris));

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
        },
        onNodesNeeded: function (parent) {
            var owner = this._owner;
            var root = parent === null;

            parent = parent || this;

            var uri = parent.getVar("resource.uri") || "";
            var control = parent.getVar("control");
            var uris = this._owner.getVar("uris").sort(function(i1, i2) {
            	return i1 < i2 ? -1 : 1;
            });
            
            if(root) {
	            var uriNodes = {};
				function createUriNode(uri) {
	                var node = new NavigatorNode(owner);
	                
	                uri = uri.split(";");
	                
	                var item = {
	                	uri:	uri[0], 
	                	name:	uri[1] || getNodeText(uri[0]),
	                	type:	uri[2] || "Folder"
	                };
	
	                root && node.addClass("root");
	                node.setVar("resource", item);
	                
	                node.setChecked(true);
	                node.setExpandable(true);
	                node.setParent(parent);
	                return (uriNodes[uri[1]] = node);
	            }            
	            
	            uris.forEach(createUriNode);
	            
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
            
            var r = this.apply("Resources.list", [uri]).
	            then(function (res) {
	            	res.sort(function(i1, i2) {
	            		if(i1.type === i2.type) {
	            			return i1.name < i2.name ? -1 : 1;
	            		}
	            		return i1.type !== "Folder" ? 1 : -1;
	            	});
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
	                return res;
	            });
            return r;
        }
    }),
    $("vcl/ui/List", "search-list", {
        align: "client",
        action: "search-open",
        source: "search-results",
        visible: false,
        css: {
            "background-color": "white",
            ".{./ListHeader}": {
                height: "0"
            },
            ".ListCell": {
            	"margin-top": "1px",
                "padding-top": "4px",
                "padding-left": "34px",
                "background-repeat": "no-repeat",
                "background-position-x": "14px",
                "background-position-y": "1px",
                "&.file": {
                    "background-image": "url(/shared/vcl/images/file16.png)",
                },
                "&.folder": {
                    "background-image": "url(/shared/vcl/images/folder16.png)",
                },
                "span": {
                    "font-size": "7.5pt",
                    color: "silver"
                }
            }
        },
        onLoad: function () {
            // FIXME
            this._rowHeight = 19;
        }
    }, [
        $("vcl/ui/ListColumn", {
            content: "#",
            attribute: ".",
            onGetValue: function (value, row, source) {
                return [String.format("%H <span> - %H</span>", value.name, value.uri)];
            },
            onRenderCell: function (cell, value, column, row, source, orgValue) {
                var classes = cell.className.split(" ");
                if (classes.length === 4) {
                    classes.pop();
                }
                classes.push(orgValue.type === "Folder" ? "folder" : "file");
                cell.className = classes.join(" ");
            }
        })
    ])
])