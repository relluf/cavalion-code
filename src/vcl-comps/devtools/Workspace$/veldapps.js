"veldoffice/Session, veldoffice/EM, stylesheet!home/Workspaces/veldapps.com/V7/src/styles.less, pouchdb";

var Application = require("vcl/Application");
var Session = require("veldoffice/Session");
var EM = require("veldoffice/EM");
var Blocks = require("blocks/Blocks");

var app = Application.get();
var consol3 = app.qs("#console");
var PouchDB = require("pouchdb");

define("veldoffice/models", ["home/Workspaces/veldapps.com/veldoffice-js/src/veldapps.com/veldoffice/models"], function(models) {
	return models;
});

$([], {
	onLoad: function() {
		window.veldapps = { EM: EM, Session: Session };
		window.EM = EM;
		window.Session = Session;
		
		window.v7o_db = new PouchDB("v7-objects");

	/* Blocks: Add namespaces */		
		Blocks.DEFAULT_NAMESPACES['vcl-veldoffice'] = "vcl/veldoffice";

		consol3.log("veldapps loaded", veldapps);
		return this.inherited(arguments);
	}
}, []);