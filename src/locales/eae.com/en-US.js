define(["./prototype"], function(proto) { return {
	
	proto: proto,

	"Apply": 							".",
	"Language": 						".",
	"Select":							".",
	"Choose":							".",
	"Back":								".",
	"Submit":							"Apply Settings",
	"Revert":							"Reload",
	"Working":							"Working...",
	"Alert":							".",
	"Ready":							"Ready",
	"Yes":								".",
	"No":								".",
	"Cancel":							".",
	
	"*.hint":							"Hint",

	"Application": {
		"-build":						document.head.dataset.version,
		"-version":						"version 2.0.0",
		"-title": 						"Settings",
		"-title-": 						"Eijkelkamp GDT Installation Page",
		"-name":						"GDT Installation Page",
		".willReload":					"All requested changes are accepted. The page will reload when this message is dismissed."
	},
	"Modem": {
		"":								".",
		".plural":  					"Modems",
		// "-batteryCapacity": 			"Battery Capacity",
		"-hardware": 					"Hardware",
		"-hardwareVersion": 			"Hardware Version",
		"-serial": 						"Serial Number",
		"-softwareVersion": 			"Software Version",
		"-type":						"Type"
	},
	"Channel": {
		"":								"."	
	},
	"Setting": {
		".requestsNotAccepted":			"The following requested changes are not accepted:<ul><li>%s</li></ul>",
		".defaultsApplied":				"Some settings have just been set to their recommended values (shown in blue). It is important that you submit these changes.",
		".reapplyTopPortSettingsF":		"After replacing the battery the modem will loose the 'Top Port' settings. Do you want to re-apply the currently known settings?<ul><li>Top Port Sensor: <b>%H</b></li><li>Power Supply: <b>%H</b></li><li>Output: <b>%H</b></li></ul>",
		
		// refactor -> #sendinterval (or /.sendinterval)
		"/requestconfirmconfiguration": {
			"":							"Process Page",
			".title":					"Process Page",
			".label":					"Process Page",
			".query":					"You have made hardware changes to this modem. Would you like to create a new Process Page?",
			".hint":					"Er is met Interact afgesproken dat de gebruiker moet aangeven dat een configuratie gewijzigd is zodat Interact weet dat er de huidige locatie gearchiveerd moet worden en dat er een nieuwe locatie aangemaakt moet worden. Voorstel is dat er een vinkje gezet kan worden waarmee de gebruiker bevestigd dat de instellingen nieuw zijn en door Interact verwerkt moeten worden. Een aangevinkt vinkje resulteert in een changerequest met setting 'requestconfirmconfiguration' en waarde de huidige epochtijd."
		},
		"/location": {
			"":							"Location",
			".label":					"Name",
			".hint":					"The name of the location of the modem can be described alphanumerically.",
			".placeholder":				"The location of the modem"
		},
		"/emailaddress": {
			"":							"Email Address",
			".hint":					"",
			".placeholder":				"joe@example.com"
		},
		"/sendinterval":				"Send Interval",
		"/wakeupinterval":				"Wakeup Interval",
		"/barologinterval":				"Barolog Interval",
		"/sampleinterval":				"Sample Interval",
		"/allportsic":					"Internal Compensation",
		"/allportsic.header":			"Measurements",
		"/allportsic.hint":				"Once internal compensation is switched on calculated water level values, instead of plain water pressure values, will be reported. The formula used here is as follows:<pre>water_level = water_pressure - air_pressure</pre>Note that <code>water_pressure</code> is measured by the diver and <code>air_pressure</code> is measured by the modem.",
		"/topportparameters":			{
			"":							"Top Port Parameters",
			".title":					"Parameters"
		},
		"/topportparameter":			{
			"":							"Top Port Parameter",
			".title":					"Parameter"
		},
		"/topport": {
			"":							"Top Port",
			".title":					"Top Port"
		},

		"/IC":							"Internal Compensation",
		"/battery": {
			"":							"Battery",
			".required":				"Specify which battery is installed",
			".replace":					"Tap here when replacing battery"
		},
		"/newbattery":					"New Battery",
		"/newbattery.hint":				"Specify which type of battery has been placed in the modem. After replacing the battery, the modem resets the 'Analog Sensor' settings. It is therefore important that those settings are revised.",
		"/newbattery.false":			"No New Battery",
		"/currentbattery":				"Current Battery",
		"/email.plural":				"Email addresses",
		"/emailaddress1":		 		"1st",
		"/emailaddress2":				"2nd",
		"/emailaddress3":				"3rd",
		"/emailaddress4":				"4th",
		"/ext_eswsensor": {
			"":							"Top Port Sensor",
			".custom":					"Custom Top Port",
			".required":				"Specify which type of sensor is installed at the top port of the modem",
			".title":					"Top Port Sensor",
			".header":					"Top Port Sensor"
		},
		"/ext_interfacetype": {
			"":							"Output",
			".required":				"Specify which output type is delivered"
		},
		"/ext_powersupply": {
			"":							"Power Supply",
			".required":				"Specify which voltage the power supply uses"
		}
	},
	"IC": {	
		"#false":						"Off (all ports)",
		"#true":						"On (all ports)"
	},
	"TCN": {
		"#false":						"No change",
		"#true":						"Create new process page"
	},
	"Battery": {
		"#":							"No Battery",
	    "#10":							"Alkaline D Cells (10.4 Ah)",
	    "#13":							"Lithium Battery Pack (13 Ah)",
	    "#26":							"Lithium Battery Pack (26 Ah)",
	    "#28":							"Lithium DD Cells (28 Ah)"
	},
	"Interval": {
		".plural":						"Intervals",
		".unit":						"second",
		".unit.plural":					"seconds",
		"#300":							"Every 5 minutes",
		"#600":							"Every 10 minutes",
		"#900":							"4 times an hour",
		"#1200":						"3 times an hour",
		"#1800":						"Twice an hour",
		"#3600":						"Every hour",
		"#7200":						"Every 2 hours",
		"#14400":						"Every 4 hours",
		"#21600":						"4 times a day",
		"#43200":						"Twice a day",
		"#86400":						"Once a day",
		"#604800":						"Once a week"
	},
	"ModemType": {
		"#-1":							"Unknown",
		"#1":							"GDT-M",
		"#2":							"GDT-S",
		"#3":							"GDT-S Prime",
		"#4":							"GDT-S Prime Plus"
	},
	
	"CustomIntervalPrompt-title":		"Custom Interval",
	"CustomIntervalPrompt-message":		"Enter the number of minutes:<div style='color:gray;'>(Will be converted to seconds)</div>",

	"MessageNewBatteryRequired":		"You must select the battery.",

}});