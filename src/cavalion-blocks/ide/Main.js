"use strict";

var locale = window.locale;
var handlers = {
	"#workspaces loaded": function() {
		this.readStorage(function(data) {
			var wn = this.qsa("workspace-needed");
			data = JSON.parse(data);
			data.workspaces.forEach(
				workspace => wn.execute({workspace: workspace})
			);
		});
	}
};

["Page, Store", { handlers: handlers }, [
	
	["Executeable", "workspace-needed", {
		onExecute: function() {
		
		}
	}],
	
	["Workspace<code>", "code"],
	["Workspace<code>", "vcl"],
	["Workspace<code>", "blocks"],
	["Workspace<veldapps>", "veldapps"],
	["Workspace<veldapps>", "VO"],
	["Workspace<veldapps>", "V7"],
	["Workspace<eae>", "BBT-1.5.0"],
	["Workspace<eae>", "BBT-1.5.3"],
	["Workspace<cavalion>", "ide"],

	["Tabs", "workspaces", { align: "bottom", classes: "bottom" }, [
		["vcl-ui:Tab", { control: "code" }],
		["vcl-ui:Tab", { control: "vcl" }],
		["vcl-ui:Tab", { control: "blocks" }],
		["vcl-ui:Tab", { control: "veldapps" }], /*- etc. */
	]]
]];