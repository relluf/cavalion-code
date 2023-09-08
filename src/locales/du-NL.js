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
	
	"Login": {
		".title":						"Aanmelden",
		"-user":						"Gebruikersnaam",
		"-password":					"Wachtwoord",
		".messages": {
			"-login-fail":				"<b>Toegang geweigerd</b><br>%H",
			"-login-ok":				"<b>Welkom</b><br>%H"
		}
	},

	"Application": {
		"-build":						document.head.dataset.version,
		"-version":						"versie 0.0.1",
		"-title": 						"Applicatie Titel",
		"-name":						"Applicatie Naam",
		".willReload":					"Alle instellingen zijn geaccepteerd. Deze pagina zal worden herladen."
	}
}});