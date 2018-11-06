"devtools/Resources";

// #editor-needed has a param parents

var Resources = require("devtools/Resources");

function allowResource(resource) {
	return resource.uri.split("/").pop() !== ".DS_Store";
}

$([], {
	css: {
		"[id$=-editors-tabs]": "border-top-color: transparent;"
	},
	onDispatchChildEvent: function(component, name, evt, f, args) {
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
    	var uri = this.getVar("resource.uri", true);
    	var act = this.up("devtools/Workspace<>:root").down("#editor-needed");
    	Resources.list(uri).then(function(res) {
			res.filter(allowResource).forEach(function(resource, i) {
    			var tab = act.execute({
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
		
		scope.save._onExecute = null;
    }

}, [
	$("vcl/ui/Tabs", "editors-tabs", [], {
		onDblClick: function() {
			alert(1);
		}
	}),
	$i("ace", {visible:false})
]);