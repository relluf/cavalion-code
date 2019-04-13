$(["devtools/Workspace"], { 
	vars: {
		favorites: [
			"Workspaces/cavalion.org/cavalion-ide/src",
			"Workspaces/cavalion.org/cavalion-code/src",
			"Workspaces/cavalion.org/cavalion-code/src/vcl-comps"
		]
	},
	handlers: {
		"#fs loaded": function() {
			// alert(this.vars(["uris", true]));
			// this.qs("#navigator #tree");
			// return this.inherited(arguments);
		}
	}
}, []);