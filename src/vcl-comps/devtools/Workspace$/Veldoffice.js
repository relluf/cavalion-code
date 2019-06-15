var styles = {
	// ".{Bar}": {
	// 	"> *": "margin-right:4px;",
	// 	".{Group} > *": "margin-right:4px;",
	// 	"input": "padding:4px;border-radius:3px;border:1px solid silver;"
	// },
	"#session-bar": "background-color:#f0f0f0;",
	"#list": "background-color: white;",
	"button": "width: auto;"
};

$([], { 
	vars: {
		"#navigator favorites": [
			"Workspaces/veldapps.com/Veldoffice/Veldoffice-glassfish/veldoffice2-front-end",
			"Workspaces/veldapps.com/Veldoffice/veldoffice-geografie-vcl",
			// "Workspaces/veldapps.com/Veldoffice/veldoffice-lib-vcl-comps",
			"Workspaces/veldapps.com/Veldoffice/veldoffice-rapportage-vcl",
			"Workspaces/veldapps.com/Veldoffice/veldoffice-rapportage-scripts"
		]
	},
	css: styles,
	handlers: {
		loaded: function() {
			var Blocks = require("blocks/Blocks");
			Blocks.DEFAULT_NAMESPACES['vcl-veldoffice'] = "vcl-veldoffice";
			this.down("#session-bar").setIndex(0);
			
			var keys = require("vcl/Component").getKeysByUri;
			if(keys(this._uri).specializer_classes.length > 0) {
				return;
			}
			
	/*- TODO this should flow back to devtools/Workspace - double click the corresponding tab to expand/collapse sub tabs. The idea is that the hotkeys activate a workspace (Cmd+1..9 remain fixed to address/focus an area (code/vcl/blocks/veldapps) and then another key could be pressed (ie. rapidly) to select a sub-tab (eg. Cmd+1, 3)*/

			var this_index = this.up("vcl/ui/Tab").getIndex(), tab;
			this.udown("#workspace-needed").execute({workspace:{name: "Veldoffice/rapportage", selected: false}}).setIndex(this_index + 1);
			this.udown("#workspace-needed").execute({workspace:{name: "Veldoffice/geografie", selected: false}}).setIndex(this_index + 2);
			
		},
		activate: function() {
			this.setTimeout("activate->refresh", function() {
				this.down("#session-bar #refresh").execute();
			}.bind(this), 200);
			return this.inherited(arguments);
		}
	}
}, [
	$(["veldoffice/Session"], "session-bar"),
	
	$i("left-sidebar-tabs", {
		// onLoad: function() {
		// 	var scope = this.scope();
		// 	var control = this._controls[0]._control;
		// 	this._controls[0].setControl(scope['vo-navigator']);
		// 	control.hide();
		// }
	}),
	$i(["left-sidebar"], [
		// $(["veldoffice/Navigator"], "vo-navigator")
	])
	
]);