$([], { 
	vars: {
		"#navigator favorites": [
			"Workspaces/veldapps.com/V7/CHANGELOG.md;;File",
			"Workspaces/veldapps.com/V7/src",
			"Workspaces/veldapps.com/V7/src/va/veldoffice"
		]
	},
	handlers: {
		loaded: function() {
			var app = this.app();
			require(["v7/objects"], function(OM) {
				app.print("window.OM = require('v7/objects')", window.OM = OM);
			});
		}
	}
}, [

]);