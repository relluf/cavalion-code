"use locale, veldoffice/VO, veldoffice/devtools";

window.VO = require("veldoffice/VO");

require("locale").mixIn({
		
		'*.close':				"Sluiten",
		'*.refresh':			"Vernieuwen",
		'*-id':					"ID",
		'*-bedrijf':			"Bedrijf",
		
		'Session': {
			'.title':			"Veldoffice-sessie",
			
			'.login':			"Aanmelden",
			'.logout':			"Afmelden",
			
			"-username":		"Gebruikersnaam",
			"-password":		"Wachtwoord"
		},
		
	});

[["devtools/App<>"], {  title: "Veldoffice" }, [
	[("#window"), {
		overrides: {
			// dispatchChildEvent(component, name, evt, f, args) {
			// 	if(name === "click") {
			// 		component.print(name, "blocked");
			// 		return false;
			// 	}
			// 	return this.inherited(arguments);
			// }
		},
		css: {
			// '.{Button}:not(.disabled)': "color:red;"
		}
	}]
]];