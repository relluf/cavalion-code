"vcl/ui/FormContainer, vcl/ui/Tab, ace/range, locale";

var Tab = {
    render: function () {
        var text = this.getVar("resource.uri") || "New";
        
        this.getNode().title = text;
        
        var html = String.format("%H", text.split("/").pop());
        if(0 && html.charAt(0) === ".") {
        /*- Disabled because of Editor<folder> */
        	text = text.split("/");
        	text.pop();
        	html = text.pop() + "/" + html;
        }
        if (this.getVar("modified")) {
            html = "* " + html;
        }
        var ace = this.qsa("vcl/ui/Ace")[0];
        if(ace) {
            html += String.format(" <span class='hashcode'>[%s]</span>",
                ace.hashCode());
        }
        
        this._nodes.text.innerHTML = html;
    }
};
var Utils = {
    getState: function(scope) {
        var tabs = scope["editors-tabs"].getControls();
        return {
        	'left-sidebar.visible': scope['left-sidebar'].getVisible(),
            editors: tabs.map(function(tab) {
                var ace = tab.qsa("devtools/Editor<> #ace")[0];
                var resource = tab.getVar("resource") || {}, r;
                if(ace) {
                    var ed = ace.getEditor();
                    r = {
                        resource: {
                            uri: resource.uri,
                            type: resource.type
                        },
                        position: ed.selection.getCursor(),
                        selection: ed.selection.toJSON(),
                        options: ed.session.getOptions(),
                        //mode: ed.session.getMode().$id,
                        folds: ed.session.getAllFolds().map(function(fold) {
                            return {
                                start: fold.start,
                                end: fold.end,
                                placeholder: fold.placeholder
                            };
                        }),
                        scrollTop: ed.session.getScrollTop(),
                        scrollLeft: ed.session.getScrollLeft()
                    };
                } else {
                    r = tab.getVar(".state");
                }
                r.selected = tab && tab.getSelected();
                return r;
            })
        };
    },
    setState: function(state, scope) {
        var Range = require("ace/range").Range;
        
        var workspace = scope['@owner'];
        if(state) {
	        state.editors && state.editors.forEach(function(state) {
	            var _state = js.mixIn({}, state);
	            var tab = scope["editor-needed"].execute(js.mixIn(state, {
	            	dontBringToFront: true
	            }));
	            tab.setVar(".state", _state);
	            tab.once("resource-loaded", function() {
	                var ace = tab._control._form.getScope().ace;
	                setTimeout(function() {
	                    /*- FIXME setTimeout seems necessary because the row is not yet scrolled into view :-s */               
	                    var session = ace.getEditor().session;    
	                    session.selection.fromJSON(state.selection);
	                    session.setOptions(state.options);
	                    state.mode && session.setMode(state.mode);
	                    try {
	                        state.folds.forEach(function(fold){
	                            session.addFold(fold.placeholder, 
	                                Range.fromPoints(fold.start, fold.end));
	                        });
	                    } catch(e) {
	                        console.log(e.message);
	                    }
	                    session.setScrollTop(state.scrollTop);
	                    session.setScrollLeft(state.scrollLeft);
	
	                    ace.getEditor().gotoLine(
	                        state.position.row + 1,
	                        state.position.column);
	                }, 0);
	            });
	        });
	        scope['left-sidebar'].setVisible(state['left-sidebar.visible'] !== false);
        }
    }
};

$(["ui/Form"], {
    onActivate: function() {
    	/*- TODO describe why a timeout is necessary */
        this.getApp().setTimeout({
            name: "devtools/Workspace<>.activate", 
            f: function(me) {
            	// debugger;
                me.qsa(["vcl/ui/Tab[uri=devtools/Workspace][selected=true]", 
                    "vcl/ui/Ace"].join(" ")).focus();
            }, 
            ms: 200, 
            args: [this]
        });
        this.setSelected(true);
    },
    onDeactivate: function() {
    	this.setSelected(false);
    },
    onLoad: function() {
        var scope = this.getScope();
        this.readStorage("state", function(value) {
            Utils.setState(JSON.parse(value) || {workspace:0}, scope);
        });

        this.on("state-dirty", function() {
            var workspace = scope['@owner'];
            workspace.setTimeout("saveState", function() {
                 workspace.writeStorage("state",
                    JSON.stringify(Utils.getState(
                        workspace.getScope())));
            }, 200);
        });
        
        scope['left-sidebar'].override("visibleChanged", function() {
            this._owner.emit("state-dirty");
        	return this.inherited(arguments);
        });
        
        return this.inherited(arguments);
    }
}, [
    $(["devtools/TabFactory"], "editor-factory", {
        vars: {
            closeable: true,
            formUri: "devtools/Editor<js>",
            parents: {
                container: "editors",
                tab: "editors-tabs"
            }
        },
        onExecute: function(evt) {
            var tab = this.inherited(arguments);
            var owner = tab.getOwner();
            tab.render = Tab.render;
            tab._control.once("formloaded", function() {
                var ed = this._form.getScope().ace.getEditor();
                ed.selection.on("changeCursor", function(e, thisObj) {
                    tab._owner.emit("state-dirty");
                });
                ed.session.on("changeFold", function() {
                    // FIXME does not work
                    tab._owner.emit("state-dirty");
                });
                tab.render();
				this._form.setName(tab.getVar("resource.uri"));
            });
            return tab;
        }
    }),
    $("vcl/Action#editors-next", {
    	onExecute: function() {
			var tabs = this.up().qsa("#editors-tabs:visible");
			var focused = this.up().vars("editors-tabs:focused");
			if(focused && !focused.isFocused()) {
				return focused.setFocus();
			}
			if(tabs.length) {
				var index = tabs.indexOf(focused) + 1;
				if(index >= tabs.length) index = 0;
				focused = this.up().vars("editors-tabs:focused", tabs[index]);
				focused.setFocus();
			}
    	}
    }),
    $("vcl/Action#editors-previous", {
    	onExecute: function() {
			var tabs = this.up().qsa("#editors-tabs:visible");
			var focused = this.up().vars("editors-tabs:focused");
			if(focused && !focused.isFocused()) {
				return focused.setFocus();
			}
			if(tabs.length) {
				var index = tabs.indexOf(focused) - 1;
				if(index < 0) index = tabs.length - 1;
				focused = this.up().vars("editors-tabs:focused", tabs[index]);
				focused.setFocus();
			}
    	}
    }),
    $("vcl/Action#editor-new", {
        onExecute: function(evt) {
            this.scope("editor-factory")
            	.execute(evt)
            	.setSelected(true);
        }
    }),
    $("vcl/Action#editor-needed", {
        onExecute: function(evt) {
            var scope = this.scope(), tab;
            if(!evt.parents) {
	    		var tabs = scope['editors-tabs'].getControls();
	    		tab = tabs.find(function(tab) {
	    			return tab.getVar("resource.uri") === evt.resource.uri;
	    		});
            }
    		if(!tab) {
    		    if(!evt.formUri) {
    			    var ext = (evt.resource.uri || "").split(".").pop();
    			    var path = evt.resource.uri ? evt.resource.uri.split("/") : [];
    			    if(evt.resource && evt.resource.type === "Folder") {
    			    	evt.formUri = "devtools/Editor<folder>";
    			    } else if(path.indexOf("vcl-comps") !== -1 && ext === "js") {
                        evt.formUri = "devtools/Editor<vcl>";
    			    } else if(path.indexOf("cavalion-blocks") !== -1 && ext === "js") {
                        evt.formUri = "devtools/Editor<blocks>";
                    // } else if(path.indexOf("pages") !== -1)  {
                    // 	evt.formUri = "devtools/Editor<page>";
    			    } else if(path.length > 1 && evt.resource.uri.indexOf("/var/log/") !== -1) {
    			    	evt.formUri = "devtools/Editor<var/log>";
                    } else {
    			        evt.formUri = String.format("devtools/Editor<%s>", ext);
                    }
    			}
	            tab = scope['editor-factory'].execute(evt, this);
	            tab.setVar("resource", evt.resource);
	            tab.nodeNeeded();
    		} else {
    		    if(evt.selected === true) {
    		        tab.setSelected(true);
    		    }
    		}
    		if(!evt.dontBringToFront) {
            	tab.setIndex(0);
    		}
    		return tab;
        }
    }),
    $("vcl/Action#editor-next", {
        onExecute: function() {
			var tabs = this.up().vars("editors-tabs:focused") || this.scope()["editors-tabs"];
			tabs.selectNext();
        }
    }),
    $("vcl/Action#editor-previous", {
        onExecute: function() {
			var tabs = this.up().vars("editors-tabs:focused") || this.scope()["editors-tabs"];
			tabs.selectPrevious();
        }
    }),
    $("vcl/Action#editor-close", {
        onExecute: function(evt) {
            var scope = this.getScope();
            var selected = scope['editors-tabs'].getSelectedControl(1);
            if(selected) {
                selected._control._form.close();
            }
            evt.preventDefault();
        }
    }),
    $("vcl/Action#editor-move-to-front", {
    	onExecute: function() {
    		this._owner.qs("vcl/ui/Tab:selected:childOf(editors-tabs)").setIndex(0);
    	}
    }),
    $("vcl/Action#editor-move-left", {
    	onExecute: function() {
    		var tab = this._owner.qs("vcl/ui/Tab:selected:childOf(editors-tabs)");
    		var index = tab.getIndex();
    		if(index > 0) {
    			tab.setIndex(index - 1);
    		}
    	}
    }),
    $("vcl/Action#editor-move-right", {
    	onExecute: function() {
    		var tab = this._owner.qs("vcl/ui/Tab:selected:childOf(editors-tabs)");
    		var index = tab.getIndex();
    		tab.setIndex(index + 1);
    	}
    }),
    $("vcl/Action#editor-setfocus", {
    	onExecute: function(evt) {
			this._owner.qs("vcl/ui/Tab:selected:childOf(editors-tabs) #ace").setFocus();
    	}
    }),
    $("vcl/Action#editor-focus-in-navigator", {
        onExecute: function(evt) {
        	// TODO 
            // var app = this.getApp();
            // var resource = this.getVar("resource", true);
            // app.qsa("devtools/Workspace<>:owner-of(.) #navigator #resource-focus", this)
            // 	.execute({resource: resource}, this);
        }
    }),

    $("vcl/ui/Panel#left-sidebar", { align: "left", css: "border-right: 1px solid gray;", width: 375 }, [
    	
        $("vcl/ui/Tabs#left-sidebar-tabs", [
            $("vcl/ui/Tab", { text: locale("Navigator"), control: "navigator", selected: true }),
            $("vcl/ui/Tab", { text: locale("Open Tabs"), control: "openTabs" }),
            $("vcl/ui/Tab", { text: locale("Console"), control: "console" }),
            $("vcl/ui/Tab", { text: locale("Outline"), control: "outline" }),
            $("vcl/ui/Tab", { text: locale("Bookmarks"), control: "bookmarks", visible: false }),
            $("vcl/ui/Tab", { text: locale("Search"), control: "search-panel", visible: false }),
            $(["ui/controls/SizeHandle"], { classes: "horizontal", vars: "control: left-sidebar;" })
        ]),

        $(["./Navigator"], "navigator"),
        $(["./Bookmarks"], "bookmarks", { align: "client", visible: false }),
        $(["./Outline"], "outline", { _align: "client", visible: false }),
        $(["./OpenTabs"], "openTabs", { visible: false }),
        $(["./Console"], "console", { visible: false }),

        $("vcl/ui/Panel", "search-panel", { align: "client", visible: false }),
        $("vcl/ui/Panel", "inspector-panel", { align: "client", visible: false })
    ]),

    $("vcl/ui/Panel#editors", { align: "client", css: "background-color: red;" }, [
        $("vcl/ui/Tabs", "editors-tabs", {
            onChange: function(tab, previous) {
// TODO tell application to render it's title
                var title = this.app().getTitle(), me = this;
                this.setTimeout("foo", function() {
	                var ws = me.app().qs(":root:selected");
	                ws = ws !== null ? ws.getSpecializer() : "";
                    if(tab) {
                        document.title = String.format("%s - [%s > %s]",
                            tab.getVar("resource.uri"), title, ws);
                    } else {
                        // document.title = title;
                    }
                }, 0);
                this._owner.emit("state-dirty");
            }
        })
    ])
]);