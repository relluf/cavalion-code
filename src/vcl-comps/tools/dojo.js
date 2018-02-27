"dstore/Memory, dgrid/OnDemandGrid";

var Memory = require("dstore/Memory");
var List = require("dgrid/OnDemandGrid");

$([], {}, [

	$("vcl-ui/Bar", [
		$("vcl-ui/Button", { action: "do-list" })
	]),
	
	$("vcl/Action", "do-list", {
		content: locale("List"),
		onExecute: function() {
			var scope = this.scope();
			var node = scope.client.getNode();

			var store = new Memory();
		    store.setData(require("vcl/Component").all.sort(function(i1, i2) {
				return i1.hashCode() - i2.hashCode();
			}));
		    
	    	var list = new List({
				collection: store,
		        columns: {
		        	_owner: "Owner",
		        	_enabled: "Enabled",
		        	'@hashCode': "Id",
		        	_name: "Name",
		        	_tag: "Tag",
		        	'@factory': "Factory"
		        },
		        farOffRemoval: 500
		    }, node);
		    list.startup();
			scope.console.print(this);			
		}	
	}),

	$("vcl-ui/Panel", "client", { align: "client" }),
	
	$("vcl-ui/Console", "console", { align: "bottom", height: 200, classes: "no-time" })
	
]);