"use Data, locale, vcl/ui/Tab";
"use strict";

var Tab = require("vcl/ui/Tab");
var Data = require("Data");
var locale = window.locale;

var handlers = {
	// onLoad: function() {
	// 	var me = this, workspaces = this.scope().workspaces;
	// 	// Data.bind([workspaces, "tabs"], {
	// 	// 	to: function() {
	// 	// 		var tabs = workspaces._controls || [];
	// 	// 		tabs.filter(_ => _ instanceof Tab).map(_ => ({
	// 	// 			label: _.getText(), 
	// 	// 			name: _.getVar("workspace")
	// 	// 		}));
	// 	// 		return tabs;
	// 	// 	},
	// 	// 	from: function(workspaces) {
	// 	// 		workspaces.forEach(_ => me.qsa("#workspace-needed").execute(_));
	// 	// 	},
	// 	// 	update: function() {
				
	// 	// 	}
	// 	// });
	// }
};

["Page", { handlers: handlers }, [
	
	/*- 
		render the ide/Project<>-instances	
			- entity: ide/Project
			- collection/class: recent
	*/

	["Tabs", "tabs", { align: "bottom" }]

]];