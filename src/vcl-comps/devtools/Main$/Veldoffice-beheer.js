$(["devtools/Main<Veldoffice>"], {
	vars: {
		"default-workspaces": [{
			name: "Log",
			selected: true,
	        "state": {
	            "left-sidebar.visible": true,
	            "editors": [{
	                "selected": false,
	                "resource": {
	                    "uri": "Resource-wavkytnyk5.log",
	                    "type": "File"
	                }
	            },
	            {
	                "selected": true,
	                "resource": {
	                    "uri": "STREAM.md",
	                    "type": "File"
	                }
	            }]
	        }
		}, {
			name: "Sessies",
			state: {
	            "left-sidebar.visible": false,
	            editors: [{
	                selected: true,
	                resource: {
	                    uri: "Library/cavalion-blocks/tools/veldapps/ListOf<>/Session.js",
	                    type: "File"
	                }
	            }]
			}
		}, {
			name: "Bedrijven",
			state: {
				"left-sidebar.visible": false,
	            editors: [{
	                selected: true,
	                resource: {
	                    uri: "Library/cavalion-blocks/tools/veldapps/ListOf<>/Bedrijf.js"
	                }
	            }]
			}
		}, { 
			name: "Gebruikers",
			state: {
				"left-sidebar.visible": false,
	            editors: [{
	                selected: true,
	                resource: {
	                    uri: "Library/cavalion-blocks/tools/veldapps/ListOf<>/Account.js"
	                }
	            }]
			}
		}, { 
			name: "Onderzoeken",
			state: {
				"left-sidebar.visible": false,
	            editors: [{
	                selected: true,
	                resource: {
						uri: "Library/cavalion-blocks/tools/veldapps/ListOf<>/Onderzoek.js"
	                }
				}]
			}
		}, { 
			name: "Documenten",
			state: {
				"left-sidebar.visible": false,
	            editors: [{
	                selected: true,
	                resource: {
						uri: "Library/cavalion-blocks/tools/veldapps/ListOf<>/Document.js"
	                }
				}]
			}
		}, { 
			name: "Fotos",
			state: {
				"left-sidebar.visible": false,
	            editors: [{
	                selected: true,
	                resource: {
						uri: "Library/cavalion-blocks/tools/veldapps/ListOf<>/Foto.js"
	                }
	            }]
			}
		}, { 
			name: "Meetpunten",
			state: {
				"left-sidebar.visible": false,
	            editors: [{
	                selected: true,
	                resource: {
						uri: "Library/cavalion-blocks/tools/veldapps/ListOf<>/Meetpunt.js"
	                }
	            }]
			}
		}]
	},
	css: {
		// ".vcl-ui-Tabs": "background-color: white;",
		".vcl-ui-Tabs.bottom": "background-color: transparent;"
	}
}, [
	$i("session-bar", [
	
		$i("title", { 
			content: "Veldoffice<span style='font-weight:normal;'> - beheer</span>" 
		})
		
	])
]);