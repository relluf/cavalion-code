"js/Method, vcl/ui/Ace, vcl/ui/Panel, vcl/ui/Bar, util/HotkeyManager";

var Ace = require("vcl/ui/Ace");
var Method = require("js/Method");
var HotkeyManager = require("util/HotkeyManager");

var DefaultWorkspaces = [{
    name: "code",
    selected: true
}, { name: "vcl"
}, { name: "V7"
// }, { //     name: "cavalion.org"
}, { name: "veldapps.com"
}, { name: "VO"
}, { // name: "eae.com"
}, { // name: "eae.com/BBT"
}, { name: "BBT-1.5.0"
}, { name: "BBT-1.5.3"
}, { name: "geoxplore.nl"
}, { name: "Vectorklic"
}, { name: "Playground"
}, { name: "consoles"
}, { name: "devtools/Editor"
}, { name: "leaflet"
}, { name: "fw7"
}];

// FIXME Move
function replaceChars(uri) {
    return uri.replace(/[ \\\/\<\>\$\#\@\!\%\^\&\*\(\)\-\=\+\{\}\[\]\:\"\'\;\,\.]/g, "_");
}
function forceUpdate(control) {
	/*- FIXME Find a better solution to force a Tab to update while invisible */
	var ControlUpdater = require("vcl/ControlUpdater");
	(function loop(c) {
		ControlUpdater.queue(c);
		c._controls && c._controls.forEach(loop);
	}(control));
}

$(["ui/Form"], {
    css: {
        ".{./Panel}#editors": {
            "background-color": "silver"
        },
        "#editors-tabs:focus": "transition: background-color 0.5s ease-in 0.2s; background-color: rgba(244, 253, 255, 0.94);",
        ".{./Bar}": {
            "&[id$=-tabs]": {
	            // typical usage vertical: 4px 16px 4px
	            "background-color": "#f0f0f0",
	            'height': "26px",
	            "padding-left": "2px",
	            "padding-top": "3px",
	            "border-top": "1px solid silver",
	            
	            "&.gradient":{
	                "background-image": "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#F5F5F5), to(#E5E5E5))",
	            },
	            "&:not(.bottom)": {
	                "border-bottom": "1px solid silver"
	            },
                "&.bottom": {
	                "padding-top": "0px",
	                "border-top": "1px solid silver",
                    ".{./Tab}": {
                        // border: "1px solid silver",
                        "&.selected": {
                        	// "border-radius": "5px",
                        	"border-bottom": "1px solid #a0a0a0"
                        },
                        "border-top": "none"
                    }
                },
	            "&.sizeable": {
	                "padding-right": "10px",
	                "&.overflowing": {
	                    "padding-right": "24px"
	                },
	                ".overflow_handler": {
	                    right: "4px"
	                }
	            },
	            ">#size_handle": {
	                "margin-top": "9px"
	            },
                ".{./Tab}": {
                    display: "inline-block",
                    border: "1px solid transparent",
                    "border-bottom": "none",
                    padding: "2px 4px 2px 4px",
                    "margin-left": "3px",
                    "margin-right": "3px",
                    "&.selected": {
                        "background-color": "white",
                        "border-color": "#a0a0a0",
	                    ".hashcode": "font-size: 7pt;"
                    },
                    "&:not(.selected) .hashcode": "display: none;"
                },
            }
        }
    },
    onLoad: function () {
        var scope = this.scope();
        var me = this;

        /*- disable Ctrl+Shift+D */
        Method.override(Ace.prototype, "onnodecreated", function() {
            var r = this.inherited(arguments);
            this._editor.commands.removeCommand("duplicateSelection");
            return r;
        });

        this.readStorage("workspaces", function (value) {
            if(value) {
                value = JSON.parse(value);
            } else {
                value = DefaultWorkspaces;
            }
            value.forEach(function (workspace) {
                scope["workspace-needed"].execute({
                        sender: this,
    	                workspace: workspace,
    	                selected: workspace.selected
                    });
            }, this);
        });
        this.readStorage("state", function(state) {
            if(state !== null) {
                var index = JSON.parse(state).workspace;
                var tab = scope['workspaces-tabs'].getControl(index);
                tab && tab.setSelected(true);
            }
        });
        
        this.on("state-dirty", function() {
            me.setTimeout("saveState", function() {
                me.writeStorage("state", JSON.stringify({
                    workspace: scope['workspaces-tabs'].getSelectedControl(1).
                        getIndex()}));
            }, 200);
        });

        var console_scope = this.app().scope().console.scope();
        console_scope.toolbar.setVisible(false);
        console_scope.size_handle.setParent(scope['workspaces-tabs']);

        return this.inherited(arguments);
    },
    onActivate: function() {
    	/*- TODO Mac/Windows shortcuts */
		var shortcuts = {
			"Ctrl+Alt+F1": "editor-move-to-front",
			"Ctrl+N": "editor-new", 
			"Alt+Ctrl+N": "editor-new",
			"Ctrl+Tab": "editor-next", 
			"Shift+Ctrl+221": "editor-next", 
			"Shift+Ctrl+Tab": "editor-previous", 
			"Shift+Ctrl+219": "editor-previous", 
			"Shift+Ctrl+Meta+219": "editor-move-left",
			"Shift+Ctrl+Meta+221": "editor-move-right",
			"Ctrl+W": "editor-close",
			// "MetaCtrl+48": "editor-focus-in-navigator",
			"Escape": "editor-setfocus"
		};
		
		var me = this;
		function create_callback(hotkey, action) {
			return function(evt, type) {
				evt.preventDefault();
				me.qsa("devtools/Workspace<>:root[selected=true] #" + action)
					.execute(evt);
			};
		}
		function create_callback_sidebar(hotkey, index) {
			return function(evt, type) {
				evt.preventDefault();
				var sidebar = me.app().qs("devtools/Workspace<>:root:selected #left-sidebar");
				if(sidebar && !sidebar.isVisible()) {
					sidebar.show();
				}
				
				var tabs = me.down("devtools/Workspace<>:root[selected=true]")
					.down("#left-sidebar-tabs");
				var tab = tabs.qsa("< vcl/ui/Tab")[index];
				if(tab.isSelected()) {
					var control = js.get("_control._activeControl", tab);
					if(control) control.setFocus();
				} else {
					tab.setSelected(true);
				}
			};
		}
		function create_callback_activateWS(hotkey, index) {
			return function(evt, type) {
				evt.preventDefault();
				me.scope()['workspaces-tabs'].qsa("< vcl/ui/Tab")[index].setSelected(true);
			};
		}
		
		// general shortcuts, see def above
		for(var k in shortcuts) {
			HotkeyManager.register(k, {
				type: "keydown",
				callback: create_callback(k, shortcuts[k])
			});
		}
		
		HotkeyManager.register("Meta+U", {
			type: "keydown", 
			callback: function(evt) {
				var q = me.app().qsa("devtools/Workspace<>:root:selected #left-sidebar");
				if(q.length && q[0].isVisible()) {
					q.hide();
				} else {
					q.show();
				}
			}
		});
		
		/* Workspaces and Sidebar */
		for(var i = 1; i <= 9; ++i) {
			var hotkey = String.format("Meta+%d", i + 48);
			HotkeyManager.register(hotkey, {
				type: "keydown",
				callback: create_callback_activateWS(hotkey, i - 1)
			});
			hotkey = String.format("Meta+Alt+%d", i + 48);
			HotkeyManager.register(hotkey, {
				type: "keydown",
				callback: create_callback_sidebar(hotkey, i - 1)
			});
		}

		var ctrlctrl = this.scope("ctrlctrl");
		
		// CtrlCtrl
		(function(focused) {
			HotkeyManager.register({
				keyCode: 17, type: "keyup",
				callback: function(evt) {
					if(focused) {
						if(ctrlctrl.getVisible()) ctrlctrl.hide(); 
						else ctrlctrl.show();
					} else {
						focused = require("vcl/Control").focused;
						me.setTimeout("ctrlctrl", function() { 
							focused = null;}, 250);
					}
				}
			});
		}());
		
		// EscEsc; focus editor/console
		0 && (function(focused) {
			HotkeyManager.register({
				keyCode: 27, type: "keyup",
				callback: function(evt) {
					if(focused) {
						console.log(evt.keyCode, focused, evt);
					} else {
						focused = require("vcl/Control").focused;
						me.setTimeout("escesc", function() { 
							focused = null;}, 250);
					}
				}
			});
		}());
    },
    onDeactivate: function() {
    	// FIXME deactivate hotkeys
    }
}, [
    $(["devtools/TabFactory"], "workspaces-new", {
        vars: {
            parents: {
            tab: "workspaces-tabs",
                container: "@owner",
                owner: "@owner"
            }
        },
        onExecute: function(evt) {
            if(!evt.hasOwnProperty("formUri")) {
                evt.formUri = evt.workspace.formUri ||
                    String.format("devtools/Workspace<%s>",
	                	replaceChars(evt.workspace.name || ""));
            }

            evt.params = evt.workspace;

            var tab = this.inherited(arguments);
            tab.setVar("workspace", evt.workspace);
            tab.setText(evt.workspace.name);
            return tab;
        }
    }),
    $("vcl/Action", "workspace-needed", {
        onExecute: function(evt) {
            var scope = this.getScope();
    		var tabs = scope['workspaces-tabs'].getControls();
    		var tab = tabs.find(function(tab) {
    			return tab.getVar("workspace.name") === evt.workspace.name;
    		});
    		if(!tab) {
	            tab = scope['workspaces-new'].execute(evt);
    		} else {
        		tab.setSelected(true);
    		}
        }
    }),
    $("vcl/Action", "workspace-activate", {
    	hotkey: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(keyCode) { 
    		return "Ctrl+" + (48 + keyCode); }).join("|"),
    	onExecute: function(evt) {
            var control, tabs = this.getScope()['workspaces-tabs'];
            if((control = tabs.getControl(evt.keyCode - 49)) !== null) {
                evt.preventDefault();
                control.setSelected(true);
            }
    	}
    }),
    $("vcl/Action", "workspaces-tabs::next-previous", {
    	hotkey: "Ctrl+Alt+219|Ctrl+Alt+221",
    	onExecute: function(evt) {
    		var method = evt.keyCode === 219 ? "Previous" : "Next";
    		this.scope("workspaces-tabs")["select" + method]();
    		evt.preventDefault();
    	}
    }),
    $("vcl/Action", "workspace-left-sidebar-tabs::next-previous", {
    	hotkey: "Ctrl+32|Ctrl+Shift+32",
    	onExecute: function(evt) {
			var tabs = this.up()
				.down("devtools/Workspace<>:root[selected=true]")
				.down("#left-sidebar-tabs");
    		
    		tabs["select" + (evt.shiftKey ? "Previous" : "Next")]();
    		evt.preventDefault();
    	}
    }),
    $("vcl/Action", "F5-blocker", {
        hotkey: "F5|MetaCtrl+R",
        onExecute: function(evt) {
            evt.preventDefault();
        }
    }),
    $("vcl/ui/Tabs", "workspaces-tabs", {
        align: "bottom",
        classes: "bottom",
        onChange: function() {
            var app = this.app();
        	var selected = this.getSelectedControl(1);
        	var title = this.getApp().getPropertyValue("title");
        	if(selected) {
        		title = [title, selected.getNode().
        				childNodes[0].textContent].join(" - ");
        	}
    		app.setTitle(title);
    		
    		this._owner.emit("state-dirty");
        }
    }),
    
    
    $(["devtools/CtrlCtrl<>"], "ctrlctrl", { visible: false})
]);
