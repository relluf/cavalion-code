"use locale";

require("locale").mixIn({
		
	});

[["devtools/App<veldoffice>"], { 
	title: "BXV", 
	vars: {
		"markdown-source-intially-hidden": true
		//default-workspaces not possible yet, because devtools/Main<> defines them
} }, [
	// [("#window"), {
	// 	overrides: {
	// 		// dispatchChildEvent(component, name, evt, f, args) {
	// 		// 	if(name === "click") {
	// 		// 		component.print(name, "blocked");
	// 		// 		return false;
	// 		// 	}
	// 		// 	return this.inherited(arguments);
	// 		// }
	// 	},
	// 	css: {
	// 		// '.{Button}:not(.disabled)': "color:red;"
	// 	}
	// }]
]];