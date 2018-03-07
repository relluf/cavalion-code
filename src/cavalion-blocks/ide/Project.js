"use locale";
"use strict";

var locale = window.locale;//require("locale");

["Page", {}, [
	
	["./Topbar", { visible: false }, [
		// ["Location"],
		// ["veldoffice/Session"]
	]],
	
	["./Sidebar", {}, [
		["#tabs", {}, [
			["./Tab", { control: "navigator", text: locale("Navigator") }],
			["./Tab", { control: "recent", text: locale("Recent") }],
			["./Tab", { control: "console", text: locale("Console") }],
			["./Tab", { control: "outline", text: locale("Outline") }]
		]],
		
		["./Navigator", "navigator", { visible: false }],
		["./Recent", "recent", { visible: false }],
		["./Console", "console", { visible: false }],
		["./Outline", "outline", { visible: false }]
	]],
	
	["Tabs", "tabs"] // editors
]];

/* Geneste editors
Stel dat meerdere 'clients' besluiten tegelijkertijd schrijven naar een key. En wel de `state` van editors, Ace-session etc. Dan komen er waarschijnijk wel conflicten. En die moeten worden opgelost. De conflicten komen zichtbaar in editor van de desbetreffende resource. De desbetreffende Tab licht wellicht subtiel in het rood op.
*/