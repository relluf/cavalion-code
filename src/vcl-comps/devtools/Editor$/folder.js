"use devtools/Resources";
// #editor-needed has a param parents

var Resources = require("devtools/Resources");

function allowResource(resource) {
	return resource.uri.split("/").pop() !== ".DS_Store";
}
function common(tab) {
	var resource = tab.vars("resource");
	tab.setCloseable(false);
	tab.on("dblclick", function() { 
		if(confirm("Are you sure?") === true) {
			this.getControl().getForm().close();
		}
		//this._control && this._control._form && this._control._form.close(); 
	});
	if(resource.uri.split("/").pop().indexOf(".") === -1) {
		tab.addClass("bold");
	}
}

$([], {
	css: {
		"[id$=-editors-tabs]": "border-top-color: transparent;"
	},
	_onDispatchChildEvent: function(component, name, evt, f, args) {
		if(name !== "keyup") {
			return;
		}
		var tabs = this.down("#editors-tabs");
		if(evt.ctrlKey === true && evt.shiftKey === true) {
			if(evt.keyCode === 186) {
				tabs.selectPrevious();
			} else if(evt.keyCode === 222) {
				tabs.selectNext();
			} else {
				console.log(evt.keyCode);
			}
		} else if(evt.ctrlKey === true) {
			if(evt.keyCode === evt.KEY_PAGE_UP) {
				tabs.selectPrevious();
			} else if(evt.keyCode === evt.KEY_PAGE_DOWN) {
				tabs.selectNext();
			}
		}
	},
    onActivate: function() {
    	this.qsa("vcl/ui/Tab[selected=true]").each(tab => tab.getControl().setFocus());
        return this.inherited(arguments);
    },
    onLoad: function() {
    	var scope = this.scope();
    	var owner = this;
    	var uri = this.vars(["resource.uri", true]);
    	var editor_needed = this.up("devtools/Workspace<>:root").down("#editor-needed");
    	
    	// if this a not a local folder, request its contents from Resources/cavalion-server
    	if(typeof uri === "string" && !uri.startsWith("local:")) {
	    	Resources.list(uri).then(function(res) {
				res.filter(allowResource).forEach(function(resource, i) {
	    			var tab = editor_needed.execute({
	    				parents: {container: owner, tab: scope['editors-tabs']},
	    				resource: resource,
	    				selected: i === 0,
	    				owner: owner
	    			});
	    			if(resource.uri.split("/").pop().indexOf(".") === -1)  {
	    				tab.addClass("bold");
	    			}
	    			tab.setCloseable(false);
	    			tab.on("dblclick", function() { 
	    				if(confirm("Are you sure?") === true) {
	    					this.getControl().getForm().close();
	    				}
	    				//this._control && this._control._form && this._control._form.close(); 
	    			});
				});
			});
    	}
		
		scope.save._onExecute = null;

		var tab = this.up("vcl/ui/Tab");
        tab.emit("resource-loaded");

    	// Nasty hacks ;-)
		if(tab) tab.addClass("bold");
		scope['add-resources'].execute(this.vars("resources") || []);
	
		// NOTE do not call inherited, because we are not editing a file? didn't seem to work with jpg/png.js - better override refresh?
    }
}, [
	$("vcl/ui/Tabs", "editors-tabs", {}),
	$i("ace", { visible: false }),
	
	$("vcl/Action", "add-resources", {
		onExecute:  function(resources) {
	    	var scope = this.scope(), app = this.app();
	    	var uri = this.vars(["resource.uri", true]);
	    	var editor_needed = this.up("devtools/Workspace<>:root").down("#editor-needed");
	    	var editors = this.up("devtools/Workspace<>:root").down("#editors");
	    	
	    	resources = resources.map(function(resource) {
	    		return typeof resource === "string" ? {uri: resource} : resource;
	    	});
	    	
	    	var folders = resources.filter(_ => _.uri.indexOf("/") >= 0).map(_ => _.uri.split("/").shift());
	    	folders = folders.filter(function(path, index) {
	    			return folders.indexOf(path) === index;
	    		});
	    		
			resources.forEach(function(resource, i) {
				if(resource.uri.split("/").length === 1) {
	    			var tab = editor_needed.execute({
	    				parents: {container: scope['@owner'], tab: scope['editors-tabs']},
	    				resource: resource,
	    				selected: i === 0 && !folders.length,
	    				owner: scope['@owner']
	    			});
	    			
	    			// TODO folder-resource-loaded?
	    			tab.on("resource-loaded", function() {
	    				if(typeof resource.onGenerate === "function") {
	    					tab.down("#ace").setValue(resource.onGenerate(tab));
	    				}
	    			});
	    			
	    			common(tab);
				}
			});
			
	    	var tabs = {};
	    	folders.forEach(function(folder_uri, i) {
	    		var tab = editor_needed.execute({
	    			selected: i === 0,
	    			resource: { uri: folder_uri, type: "Folder" },
    				parents: { container: scope['@owner'], tab: scope['editors-tabs'] }
	    		});
	    		
	    		tab.on("resource-loaded", function() {
		    		var lresources = resources.filter(function(resource) {
		    			return resource.uri.indexOf(folder_uri + "/") === 0;
		    		}).map(function(resource) {
		    			return js.mixIn(js.mixIn(resource), { 
		    				uri: resource.uri.substring(resource.uri.indexOf("/") + 1) 
		    			});
		    		});
	    			tab.down("#add-resources").execute(lresources);
	    			app.print("resource-loaded", this);
	    		});
	    		app.print(folder_uri, tab);
    			common(tab);
	    	});
	    	
		}
	})
]);