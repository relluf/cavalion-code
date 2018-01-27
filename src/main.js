var cavalion_js = "/home/Workspaces/cavalion.org/cavalion-js/src/";
var cavalion_vcl = "/home/Workspaces/cavalion.org/cavalion-vcl/src/";
require.config({
    paths: {
		/*- TODO */
        "home": "/home",
        "vcl-comps/ws/VO": "/home",

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
        "ace": "./bower_components/ace/lib/ace",
        "less": "./bower_components/less/dist/less",
        "pouchdb": "./bower_components/pouchdb/dist/pouchdb",
        "jquery": "./bower_components/jquery/dist/jquery",
        "moment": "./bower_components/moment/moment",
        "moment-locale": "./bower_components/moment/locale"
    },
    shim: {
    }
});

define("font-awesome", ["stylesheet!bower_components/font-awesome/css/font-awesome.css"], function(stylesheet) {
	return stylesheet;
});

define("markdown", ["./bower_components/markdown/lib/markdown"], function() {
	return window.markdown;
});

define(function(require) {

	/*- Class/Type System, Tools, etc. */	
	require("js");
	require("less");

	/*- Some awesomeness */
	require("font-awesome");
	require("console/Printer");
	
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
