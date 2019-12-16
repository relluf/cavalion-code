$([], {
	handlers: {
		loaded() {
			this.down("#session-bar").setParent(this.app().down("#window"));
			this.down("#session-bar").setIndex(0);
			
			this.up("devtools/Main<>").down("#workspace-needed")
				.execute(["Gebruikers", "Bedrijven", "Onderzoeken", "Meetpunten", "Documenten"]);
		}
	}
}, [

]);