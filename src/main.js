require.config({
    paths: {
		/*- TODO */
        "home": "/home",
        "vcl-comps/ws/VO": "/home",

        /*- bangers! */
        "text": "../lib/cavalion.org/text",
        "stylesheet": "../lib/cavalion.org/stylesheet",
        "script": "../lib/cavalion.org/script",

        /*- cavalion.org */
        "console": "../lib/cavalion.org/console",
        "data": "../lib/cavalion.org/data",
        "persistence": "../lib/cavalion.org/persistence",
        "entities": "../lib/cavalion.org/entities",
        "features": "../lib/cavalion.org/features",
        "js": "../lib/cavalion.org/js",
        "util": "../lib/cavalion.org/util",
        "vcl": "../lib/cavalion.org/vcl",

		/*- bower */
        "ace": "./bower_components/ace/lib/ace",
        "pouchdb": "./bower_components/pouchdb/dist/pouchdb",
        "jquery": "./bower_components/jquery/dist/jquery",
        "moment": "./bower_components/moment/moment",
        "moment-locale": "./bower_components/moment/locale"
    },
    shim: {
    }
});

define("locale", ["../lib/cavalion.org/locale"], function(locale) {
	return locale;
});

define("pouchdb", ["./bower_components/pouchdb/dist/pouchdb"], function(pouchdb) { return pouchdb; });

define("leaflet", ["leaflet/leaflet-default"], function(leaflet) { 
	return leaflet; });
define("Framework7", ["framework7/Framework7"]);
define("font-awesome", ["stylesheet!../lib/font-awesome.io/bower_components/font-awesome/css/font-awesome.css"], function(stylesheet) {
	return stylesheet;
});

define("markdown", ["./bower_components/markdown/lib/markdown"], function() {
	return window.markdown;
});

define("less", ["./bower_components/less/dist/less"], function(less) {
	return less;
});

define(function(require) {

	/*- Get IE up to speed */	
	// require("node_modules/es5-shim/es5-shim");
	// require("node_modules/es6-shim/es6-shim");
	// require("node_modules/es7-shim/dist/es7-shim");

	/*- Class/Type System, Tools, etc. */	
	require("js");
	require("less");

	/*- Some awesomeness */
	// require("font-awesome");
	require("console/Printer");
	
	var ComponentNode = require("console/node/vcl/Component");
	var Component = require("vcl/Component");
	var Factory = require("vcl/Factory");
	var Url = require("util/net/Url");
	var JsObject = require("js/JsObject");

	var app, url = new Url();
	
	window.j$ = JsObject.$;
	
	if((app = url.getParamValue("app"))) {
		if(app && app.indexOf("/") === -1) {
		    app += "/App.v1.desktop";
		} else if(!app) {
	        app = "App.v1.desktop";
	    }
	} else {
		app = url.getParamValues().filter(function(s) { 
			return s !== "debug"; });
		app += "/App";
	}

	Factory.require(app, function(factory) {
		factory.newInstance();
	});
});
