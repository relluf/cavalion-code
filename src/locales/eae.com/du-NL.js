define(["./prototype"], function(proto) { return {
	
	proto: proto,

	"Language": 						"Taal",
	"Apply": 							"Toepassen",
	"Select":							"Selecteer",
	"Choose":							"Maak een keuze",
	"Back":								"Terug",
	"Submit":							"Toepassen",
	"Revert":							"Vernieuwen",
	"Working":							"Bezig...",
	"Alert":							"Let op!",
	"Ready":							"Klaar",
	"Yes":								"Ja",
	"No":								"Nee",
	"Cancel":							"Terug",

	"Application": {
		"-build":						document.head.dataset.version,
		"-version":						"versie 1.5.3",
		"-title": 						"Instellingen",
		"-title-": 						"Eijkelkamp GDT Installatie Pagina",
		"-name":						"GDT Installatie Pagina",
		".willReload":					"Alle instellingen zijn geaccepteerd. Deze pagina zal worden herladen."
	},
	"Modem": {
		"":								".",
		".plural":  					"Modems",
		"-batteryCapacity": 			"Batterijcapaciteit",
		"-hardware": 					"Hardware",
		"-hardwareVersion": 			"Hardwareversie",
		"-serial": 						"Serienummer",
		"-softwareVersion": 			"Softwareversie",
		"-type":						"Type"
	},
	"Channel": {
		"":								"Kanaal"	
	},
	"Setting": {
		".requestsNotAccepted":			"Niet alle instellingen zijn geaccepteerd. De server heeft u het volgende te melden:<ul><li>{0}</li></ul>",
		".defaultsApplied":				"Bepaalde instellingen zijn veranderd naar de voorkeursinstelling. Het is belangrijk dat u de wijzigingen indient. Het betreft de blauw gekleurde waarden.",
		".reapplyTopPortSettingsF":		"Na het vervangen van de batterij verliest het modem de 'Bovenste poort' instellingen. Wilt u de laatst bekende instellingen opnieuw toepassen?<ul><li>Bovenste poort: <b>%H</b></li><li>Stroomvoorziening: <b>%H</b></li><li>Output: <b>%H</b></li></ul>",
		
		"/requestconfirmconfiguration": {
			"":							"Proces-pagina",
			".title":					"Proces-pagina",
			".label":					"Proces-pagina",
			".query":					"U heeft nieuwe hardware instellingen voor het modem ingesteld. Wilt u een nieuwe proces-pagina aanmaken?",
			".hint":					"Er is met Interact afgesproken dat de gebruiker moet aangeven dat een configuratie gewijzigd is zodat Interact weet dat er de huidige locatie gearchiveerd moet worden en dat er een nieuwe locatie aangemaakt moet worden. Voorstel is dat er een vinkje gezet kan worden waarmee de gebruiker bevestigd dat de instellingen nieuw zijn en door Interact verwerkt moeten worden. Een aangevinkt vinkje resulteert in een changerequest met setting 'requestconfirmconfiguration' en waarde de huidige epochtijd."
		},
		"/location": {
			"":							"Locatie",
			".label":					"Naam",
			".hint":					"De locatie waar het modem geplaatst is dient te dusdaning te worden omschrevenm dat deze makkelijk terug te binden  is.",
			".placeholder":				"Alfanumerieke omschrijving van de locatie"
		},
		"/emailaddress": {
			"":							"Email adres",
			".hint":					"",
			".placeholder":				"joe@example.com"
		},
		"/sendinterval":				"Verstuur interval",
		"/wakeupinterval":				"Ontwaak interval",
		"/barologinterval":				"Barolog interval",
		"/sampleinterval":				"Meet interval",
		"/allportsic.header":			"Meetinstellingen",
		"/allportsic":					"Interne compensatie",
		"/allportsic.hint":				"Once internal compensation is switched on calculated water level values, instead of plain water pressure values, will be reported. The formula used here is as follows:<pre>water_level = water_pressure - air_pressure</pre>Note that <code>water_pressure</code> is measured by the diver and <code>air_pressure</code> is measured by the modem.",
		"/topportparameters":			{
			"":							"Bovenste poort parameters",
			".title":					"Parameters"
		},
		"/topportparameter":			{
			"":							"Bovenste poort parameter",
			".title":					"Parameter"
		},
		"/topport": {
			"":							"Bovenste poort",
			".title":					"Bovenste poort"
		},
	
		"/IC":							"Interne compensatie",
		"/battery":						"Batterij",
		"/newbattery":					"Nieuwe batterij",
		"/newbattery.hint":				"Selecteer hier welke nieuwe batterij in het modem geplaatst wordt. Let op, wanneer de batterij wordt vervangen, gaan de instellingen met betrekking tot 'Bovenste poort' verloren. Het is daarom noodzakelijk dat deze instellingen opnieuw worden toegepast.",
		"/newbattery.false":			"Geen nieuwe batterij",
		"/currentbattery":				"Huidige batterij",
		"/email.plural":				"Email adressen",
		"/emailaddress1":		 		"1:",
		"/emailaddress2":				"2:",
		"/emailaddress3":				"3:",
		"/emailaddress4":				"4:",
		"/ext_eswsensor": {
			"":							"Bovenste poort",
			".custom":					"Bovenste poort aangepast",
			".required":				"Specificeer welk type sensor is geinstalleerd in de bovenste poort"
		},
		"/ext_interfacetype": {
			"":							"Output",
			".required":				"Specificeer welk type output van toepassing is"
		},
		"/ext_powersupply": {
			"":							"Stroomvoorziening",
			".required":				"Specificeer het voltage van de stroomvoorziening"
		}
	},
	"IC": {
		"#false":						"Uit, voor alle poorten",
		"#true":						"Aan, voor alle poorten"
	},
	"TCN": {
		"#false":						"Geen wijziging",
		"#true":						"Nieuwe procespagina aanmaken"
	},
	"Battery": {
		"#":							"Geen batterij",
    	"#10":							"Alkaline D cellen (10,4 Ah)",
    	"#13":							"Lithium batterypack (13 Ah)",
    	"#26":							"Lithium batterypack (26 Ah)",
    	"#28":							"Lithium DD cellen (28 Ah)"
	},
	"Interval": {
		".plural":						"Intervallen",
		".unit":						"seconde",
		".unit.plural": 				"seconden",
		"#300":							"Iedere 5 minuten",
		"#600":							"Iedere 10 minuten",
		"#900":							"Ieder kwartier",
		"#1200":						"3x per uur",
		"#1800":						"2x per uur",
		"#3600":						"1x per uur",
		"#7200":						"Iedere 2 uur",
		"#14400":						"Iedere 4 uur",
		"#21600":						"4x per dag",
		"#43200":						"2x per dag",
		"#86400":						"1x per dag",
		"#604800":						"1x per week"
	},
	"ModemType": {
		"#-1":							"Onbekend",
		"#1":							"GDT-M",
		"#2":							"GDT-S",
		"#3":							"GDT-S Prime",
		"#4":							"GDT-S Prime Plus"
	},
	"ESWSensor#0":						"Geen",
	"Voltage#0":						"Geen",
	"InterfaceType#0":					"Geen",

	"CustomIntervalPrompt-title":		"Aangepast interval",
	"CustomIntervalPrompt-message":		"Voer het aantal minuten in:<div style='color:gray;'>(NB: Wordt omgerekend naar seconden)</div>",

	"MessageExplainIC":					"Wanneer interne compensatie AAN staat berekent het modem waterhoogte waarden en stuurt die in plaats van waterdruk metingen. Waterhoogte = waterdruk (gemeten door Diver) - luchtdruk (gemeten door modem)."

}});