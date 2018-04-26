define(function() { return {
	"Model": {
		"":								".",
		".plural":						"Models",
		"-entities":					"Entities",
		"-entities.instances":			"Instances",
		"-entities.favorites":			"Favorites",
		"-entities.all":				"All Entities"
	},
	"Entity": {
		"-attributes":					"Attributes",
		"-instances":					"Instances",
		"-collections":					"Collections",
		"-path":						"Path"
	},
	"Language": {
		".du-NL":						"Nederlands (NL)",
		".du-NL.flag":					"&#x1F1F3;&#x1F1F1",
		".en-US":						"English (US)",
		".en-US.flag":					"&#x1F1FA;&#x1F1F8"
	},
	"ESWSensor#0":						"None",
	"Voltage": {
		"#5":							"None",
		"#5":							"5V",
		// "#6":							"6V",
		// "#7":							"7V",
		// "#8":							"8V",
		// "#9":							"9V",
		// "#10":							"10V",
		// "#11":							"11V",
		"#12":							"12V",
		// "#13":							"13V",
		// "#14":							"14V",
		// "#15":							"15V",
		// "#16":							"16V",
		// "#17":							"17V",
		// "#18":							"18V",
		// "#19":							"19V",
		// "#20":							"20V",
		// "#21":							"21V",
		// "#22":							"22V",
		// "#23":							"23V",
		// "#24":							"24V"
	},
	"InterfaceType": {
		"#0":							"None",
		// "#1":							"EPlus",
		// "#2":							"SDI_12",
		// "#3":							"Aquaread",
		"#16":							"Analog_0_5V_SingleEnded",
		"#17":							"Analog_0_5V_Differential",
		"#18":							"Analog_0_1V_SingleEnded",
		"#19":							"Analog_0_1V_Differential",
		"#20":							"Analog_4_20mA",
		"#21":							"Analog_0_20mA",
		"#22":							"Analog_Pulse",
		"#23":							"Analog_PotentioMeter"
	},
	"*.factories/": {
		"key": function() { return this.id; },
		"title": function(entity, factory, options) { return entity; }
	}
}});