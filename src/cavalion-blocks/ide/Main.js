"use strict";

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
	// },
	"#tabs onLoad": function() {
		
	}
};

["Page", { handlers: handlers }, [
	
	// ["Executeable", "workspace-needed"]
	
	["Tabs", "workspaces", { align: "bottom", classes: "bottom" }, []]
	
]];