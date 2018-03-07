"use strict";

var locale = window.locale;

["vcl-ui:Panel", {
	align: "left", width: 300 || locale("Sidebar.width")
}, [
	["vcl-ui:Tabs", "tabs"]	
]];