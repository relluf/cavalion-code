"use devtools/Resources, vcl/Control";

const Res = require("devtools/Resources");
const Control = require("vcl/Control");

const getContext = (c) => Control.focused || c.up("devtools/Workspace<>") || c.app();
const getVar = (c, v) => c.vars(v) || c.vars([c._name + "\\." + v]);

[["vcl/prototypes/App.v1.console"], [

	["vcl/Action", ("list-issues"), {
		hotkey: "Shift+Cmd+Alt+I",
		on() {
			const context = getContext(this); 
			const path = getVar(this, "path");

			H.i(Res.ls(path)).then(h => h.addClass("no-shrinking"));
		}
	}]
	
]];