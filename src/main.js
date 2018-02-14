var cavalion_js = localStorage['cavalion-js-path'] || "node_modules/cavalion-js/src/";
var cavalion_vcl = localStorage['cavalion-vcl-path'] || "node_modules/cavalion-vcl/src";
var veldoffice_js = localStorage['veldoffice-js-path'] || "node_modules/veldoffice-js/src";
require.config({
    paths: {
		/*- TODO */
        "vcl-comps/ws/VO": "/home",
        "vcl-comps/ws/code": "/home",
        
        "home": "/home",
		"veldoffice": veldoffice_js + "veldapps.com/veldoffice",
		"vcl-veldoffice": veldoffice_js + "veldapps.com/veldoffice/vcl-veldoffice",

        /*- bangers! */
        "locale": cavalion_js + "locale",
        "text": cavalion_js + "text",
        "stylesheet": cavalion_js + "stylesheet",
        "script": cavalion_js + "script",

        /*- cavalion.org */
        "console": cavalion_js + "console",
        "data": cavalion_js + "data",
        "persistence": cavalion_js + "persistence",
        "entities": cavalion_js + "entities",
        "features": cavalion_js + "features",
        "js": cavalion_js + "js",
        "util": cavalion_js + "util",
        "vcl": cavalion_vcl,

		/*- bower */
        "ace": "bower_components/ace/lib/ace",
        "less": "bower_components/less/dist/less",
        "jquery": "bower_components/jquery/dist/jquery",
        "moment": "bower_components/moment/moment",
        "moment-locale": "bower_components/moment/locale",
        // "csv-js": "bower_components/CSV-JS/csv",
        // "relational-pouch": "bower_components/relational-pouch/dist/pouchdb.relational-pouch",
        "backbone": "bower_components/backbone/backbone",
        "underscore": "bower_components/underscore/underscore",
        
		/*- amcharts3 */
        "amcharts": "bower_components/amcharts3/amcharts/amcharts",
        "amcharts.funnel": "bower_components/amcharts3/amcharts/funnel",
        "amcharts.gauge": "bower_components/amcharts3/amcharts/gauge",
        "amcharts.pie": "bower_components/amcharts3/amcharts/pie",
        "amcharts.radar": "bower_components/amcharts3/amcharts/radar",
        "amcharts.serial": "bower_components/amcharts3/amcharts/serial",
        "amcharts.xy": "bower_components/amcharts3/amcharts/xy",
        
    },
    shim: {
    }
});

define("pouchdb", ["bower_components/pouchdb/dist/pouchdb", "bower_components/pouchdb-find/dist/pouchdb.find", "bower_components/relational-pouch/dist/pouchdb.relational-pouch", "pouchdb.memory"], function(pouchdb, find, relational, memory) {
	
	/*- hacked pouchdb.memory */
	memory = window.pouch_MemoryPouchPlugin;
	delete window.pouch_MemoryPouchPlugin;
	
	pouchdb.plugin(find);
	pouchdb.plugin(relational);
	pouchdb.plugin(memory);
	return pouchdb;
});

define("font-awesome", ["stylesheet!bower_components/font-awesome/css/font-awesome.css"], function(stylesheet) {
	return stylesheet;
});
define("markdown", ["bower_components/markdown/lib/markdown"], function() {
	return window.markdown;
});

window.locale_base = "locales/";

define(function(require) {

	/*- Class/Type System, Tools, etc. */	
	require("js");
	require("less");

	/*- Some awesomeness */
	require("font-awesome");
	require("console/Printer");
	
	require("locale!en-US");
	
	var ComponentNode = require("console/node/vcl/Component");
	var Component = require("vcl/Component");
	var Factory = require("vcl/Factory");
	var Url = require("util/net/Url");
	var JsObject = require("js/JsObject");

	window.j$ = JsObject.$;

	var app, url = new Url(); 
	if((app = url.getParamValue("app"))) {
		if(app && app.indexOf("/") === -1) {
		    app += "/App.v1.desktop";
		} else if(!app) {
	        app = "App.v1.desktop";
	    }
	} else {
		// TODO reserved valueless parameters: ['debug']
		
		app = url.getParamValues("").filter(function(s) { 
			return s !== "debug"; })[0] || "devtools";
		app += "/App";
	}

	Factory.require(app, function(factory) {
		factory.newInstance();
	});
});
