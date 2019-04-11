function ls(k) { var r = localStorage[k]; if(r) { console.log(k, r); return r; } }
var cavalion_js = ls('cavalion-js-path') || "node_modules/cavalion-js/src/";
var cavalion_vcl = ls('cavalion-vcl-path') || "node_modules/cavalion-vcl/src";
var cavalion_blocks = ls('cavalion-blocks-path') || "node_modules/cavalion-blocks/src";
var veldoffice_js = ls('veldoffice-js-path') || "node_modules/veldoffice-js/src/";

less = { logLevel: 0 };

require.config({
    paths: {
        "cavalion-blocks/$HOME": "/home",
        "home": "/home",
        // "v7": "node_modules/veldapps-v7/src/v7",
        "v7": "/home/Projects/V7/src/v7",

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
        "on": cavalion_js + "on",
        "json": cavalion_js + "json",
        "util": cavalion_js + "util",
        "vcl": cavalion_vcl,
        "blocks": cavalion_blocks,
        
        "eswbo": "/home/Workspaces/eae.com/BBT-1.5.3/WebContent/app/src",

		/* veldapps.com */		
		"veldapps": veldoffice_js + "veldapps.com",
		"veldoffice": veldoffice_js + "veldapps.com/veldoffice",
		"vcl-veldoffice": veldoffice_js + "veldapps.com/veldoffice/vcl-veldoffice",
		// "vcl/veldoffice": veldoffice_js + "veldapps.com/veldoffice/vcl-veldoffice",
		/*- veldapps.com/leaflet */
		// "proj4": veldoffice_js + "proj4js.org/proj4",
		"epsg": veldoffice_js + "proj4js.org/epsg",
		"leaflet": veldoffice_js + "leafletjs.com",

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
        "js-yaml": "bower_components/js-yaml/dist/js-yaml",
        
        /*- dojo */
        "dojo": "bower_components/dojo",
        "dgrid": "bower_components/dgrid",
        "dstore": "bower_components/dstore",

		/*- amcharts3 */
        "amcharts": "bower_components/amcharts3/amcharts/amcharts",
        "amcharts.funnel": "bower_components/amcharts3/amcharts/funnel",
        "amcharts.gauge": "bower_components/amcharts3/amcharts/gauge",
        "amcharts.pie": "bower_components/amcharts3/amcharts/pie",
        "amcharts.radar": "bower_components/amcharts3/amcharts/radar",
        "amcharts.serial": "bower_components/amcharts3/amcharts/serial",
        "amcharts.xy": "bower_components/amcharts3/amcharts/xy",

        "fast-xml-parser": "fast-xml-parser/parser",

		"dygraphs/Dygraph": "node_modules/dygraphs/dist/dygraph"
        
        /*- Framework 7 */
    },
    shim: {
        "amcharts.funnel": {
            "deps": ["amcharts"],
            "exports": "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        },
        "amcharts.gauge": {
            "deps": ["amcharts"],
            "exports": "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        },
        "amcharts.pie": {
            "deps": ["amcharts"],
            "exports": "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        },
        "amcharts.radar": {
            "deps": ["amcharts"],
            "exports": "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        },
        "amcharts.serial": {
            "deps": ["amcharts"],
            "exports": "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        },
        "amcharts.xy": {
            "deps": ["amcharts"],
            "exports": "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        }
    }
});

window.req = function req() {
	if(arguments.length == 1) {
    	try {
    		return require(arguments[0]);
    	} catch(e) {}
	}
	var modules = js.copy_args(arguments);
	return new Promise(function(resolve, reject) {
	    require(modules, resolve, reject);
	});
};
var veldoffice_js_ = veldoffice_js.substring(veldoffice_js.charAt(0) === '/' ? 1 : 0);

define("pace", ["bower_components/PACE/pace", "stylesheet!bower_components/PACE/themes/blue/pace-theme-minimal.css"], function(pace) { 
		pace.start({ 
			restartOnRequestAfter: true, 
			restartOnPushState: true,
			document: false
		});
		//{ trackMethods: [] } });
		return pace; 
	});
	
define("Element", function() {
	/* Make life easier */
	var qsa = Element.prototype.querySelectorAll;
	Element.prototype.up = function(selector) {
		
		if(arguments.length === 0) {
			return this.parentNode;
		}

		function distanceToParent(node, parent) {
			var r = 1;
			node = node.parentNode;
			while(node && node !== parent) {
				node = node.parentNode;
				r++;
			}
			return node === parent ? r : 0;
		}
		
		var all = document.querySelectorAll(selector), me = this;
		return Array.prototype.slice.apply(all, [0]).map(function(node) { 
			return {node: node, distance: distanceToParent(me, node)};
		}).filter(function(result) {
			return result.distance > 0;
		}).sort(function(i1, i2) {
			return i1.distance - i2.distance;
		}).map(function(i1) {
			return i1.node;
		})[0] || null;
	};
	Element.prototype.down = function(selector) {
		return this.querySelector(selector);
	};
	Element.prototype.qsa = function() {
		return Array.prototype.slice.call(qsa.apply(this, arguments), [0]);
	};
	Element.prototype.qs = Element.prototype.querySelector;
	Element.prototype.on = function() {
		var args = Array.prototype.slice.apply(args, [0]); 
		return on.apply(this, (args.unshift(this), args));
	};
	Element.prototype.once = function(name, f) {
		this.addEventListener(name, function() {
			this.removeEventListener(name, arguments.callee);
			f.apply(this, arguments);
		});
	};
	Element.prototype.inViewport = function() {
	    var el = this, rect = el.getBoundingClientRect();
	    return (
	        rect.top >= 0 &&
	        rect.left >= 0 &&
	        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
	        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	    );
	};
	/* Again */
	document.down = document.qs = document.querySelector;
	document.qsa = document.querySelectorAll;
	document.addEventListener("touchmove", function(evt) {
	    if(evt.target === document) {
	        evt.preventDefault();
	    }
	}, false);
	document.addEventListener("ontouchstart" in window ? 
		"touchstart" : "mousedown", function checkBlockSwipe(evt) {
			var node = evt.target, prevent = false;
	    	if(evt.touches) {
	    		node = evt.touches[0].target;
	    	}
			while(node !== document && node !== null && !prevent) {
				prevent = $(node).hasClass("block-swipe");
				node = node.parentNode;
			}
			window.TouchEvent && (TouchEvent.prototype.f7PreventPanelSwipe = prevent);
			window.MouseEvent && (MouseEvent.prototype.f7PreventPanelSwipe = prevent);
	    });
});
define("Framework7/plugins/auto-back-title", function() {
	
	var selectors = {
		back: ".navbar .back.link span",
		title: ".title"
	};

    /*- Link title of back button to title of page */
    document.addEventListener("page:beforein", function (e) {
    	
    	if(e.detail.direction !== "forward") {
    		return;
    	}
    	
    	var previous = e.detail.pageFrom;
    	if(!previous) return;
    	
    	var current = e.detail;
        var back = current.navbarEl && current.navbarEl.down(selectors.back);

        if(back && previous.navbarEl) {
            back.innerHTML = previous.navbarEl.down(selectors.title).innerHTML;
        }
    });
    
    return selectors;
});
define("Framework7/plugins/esc-is-back", [], function() {

	var selectors = {
		back: ".view-main .navbar .navbar-current .left a.back.link",
	};
	
	document.addEventListener("keyup", function(e) {
		if(e.keyCode === 27) {
			e.preventDefault();
			document.qsa(selectors.back).forEach(function(el, index) {
				if(index === 0) el.click();
			});
		}
	});
	
	return selectors;
});
define("Framework7", [
	"bower_components/framework7/dist/js/framework7", 
	"Framework7/plugins/auto-back-title", "Framework7/plugins/esc-is-back",
	"stylesheet!bower_components/font-awesome/css/font-awesome.css",
	"stylesheet!bower_components/framework7/dist/css/framework7.css", 
	"stylesheet!bower_components/framework7-icons/css/framework7-icons.css"
], function(Framework7) {
	
	Template7.registerHelper("l", function (str) {
		if(arguments.length > 1) {
			str = js.copy_args(arguments);
			
			if(str[0] !== ">") {
				str.pop();
				str = str.join("");
			} else {
				str.shift(); // [thisObj, entity, factory, options]
				var f = window.locale(String.format("%s.factories/%s", str[1], str[2]));
				if(typeof f === "function") {
					return f.apply(str[0], [str[1], str[2], str[3]]);
				}
			}
		}
		
	    if (typeof str === "function") str = str.call(this);
	    
	    if(typeof window.locale === "function") {
	    	return window.locale(str);
	    }
	    
	    return str;
    });
    Template7.registerHelper("e", function(context, options) {
    	var joined;
		if(arguments.length > 1) {
			context = js.copy_args(arguments);
			options = context.pop();
			joined = context = context.join(".");
		    context = js.get(context);
		} else {
	    	if (typeof context === "function") context = context.call(this);
		}

		return String.escapeHtml(options.fn(context));
    });
    Template7.registerHelper("w", function(context, options) {
    	var joined;
		if(arguments.length > 1) {
			context = js.copy_args(arguments);
			options = context.pop();
			joined = context = context.join("");
			try {
		    	context = eval(context);
		    } catch(e) {
		    	context = js.get(context);
		    }
		}
		
    	if (typeof context === "function") context = context.call(this);

		return options.fn(context);
    });
    Template7.registerHelper("wjs", function(expression, options) {
        if (typeof expression === "function") { expression = expression.call(this); }
    	
        // 'with': function (context, options) {
        //     if (isFunction(context)) { context = context.call(this); }
        //     return options.fn(context);
        // },
        
        var func;
        if (expression.indexOf('return')>=0) {
            func = '(function(){'+expression+'})';
        }
        else {
            func = '(function(){return ('+expression+')})';
        }
        return options.fn(eval.call(this, func).call(this));
    });
    
	return Framework7;
});
define("dropbox", [
	// bang_node_module("script", "dropbox/dist/Dropbox-sdk.js"), 
	// bang_node_module("script", "dropbox/dist/DropboxTeam-sdk.js")
	"node_modules/dropbox/dist/Dropbox-sdk.js", 
	"node_modules/dropbox/dist/DropboxTeam-sdk.js"
], function(dbx) {
	return dbx;
});
define("template7", ["Framework7"], function() {
	
	Template7.registerHelper("l", function (str) {
		if(arguments.length > 1) {
			str = js.copy_args(arguments);
			
			if(str[0] !== ">") {
				str.pop();
				str = str.join("");
			} else {
				str.shift(); // [thisObj, entity, factory, options]
				var f = window.locale(String.format("%s.factories/%s", str[1], str[2]));
				if(typeof f === "function") {
					return f.apply(str[0], [str[1], str[2], str[3]]);
				}
			}
		}
		
	    if (typeof str === "function") str = str.call(this);
	    
	    if(typeof window.locale === "function") {
	    	return window.locale(str);
	    }
	    
	    return str;
    });
    Template7.registerHelper("e", function(context, options) {
    	var joined;
		if(arguments.length > 1) {
			context = js.copy_args(arguments);
			options = context.pop();
			joined = context = context.join(".");
		    context = js.get(context);
		} else {
	    	if (typeof context === "function") context = context.call(this);
		}

		return String.escapeHtml(options.fn(context));
    });
    Template7.registerHelper("w", function(context, options) {
    	var joined;
		if(arguments.length > 1) {
			context = js.copy_args(arguments);
			options = context.pop();
			joined = context = context.join("");
			try {
		    	context = eval(context);
		    } catch(e) {
		    	context = js.get(context);
		    }
		}
		
    	if (typeof context === "function") context = context.call(this);

		return options.fn(context);
    });
    Template7.registerHelper("wjs", function(expression, options) {
        if (typeof expression === "function") { expression = expression.call(this); }
    	
        // 'with': function (context, options) {
        //     if (isFunction(context)) { context = context.call(this); }
        //     return options.fn(context);
        // },
        
        var func;
        if (expression.indexOf('return')>=0) {
            func = '(function(){'+expression+'})';
        }
        else {
            func = '(function(){return ('+expression+')})';
        }
        return options.fn(eval.call(this, func).call(this));
    });
    
	return {
		load: function(name, parentRequire, load, config) {
			/** @see http://requirejs.org/docs/plugins.html#apiload */
			parentRequire(["text!" + name], function(source) {
				load(Template7.compile(source));
			});
		}
	};
});

// define("proj4", [veldoffice_js.substring(1) + "proj4js.org/proj4-src"], function(P) {
define("proj4", [veldoffice_js_ + "proj4js.org/proj4-src"], function(P) {
	return P;
});
define("leaflet", ["js", veldoffice_js_ + "leafletjs.com/leaflet-default"], function(js, L) {
	return L;
});

define("pouchdb", [
	"bower_components/pouchdb/dist/pouchdb", "bower_components/pouchdb-find/dist/pouchdb.find", 
	"bower_components/relational-pouch/dist/pouchdb.relational-pouch", "pouchdb.memory"], 
function(pouchdb, find, relational, memory) {
	
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
define("override", function() {
	
	function override(obj, method, factory) {
		obj[method] = factory(obj[method]);
	}
	
	return override;
});
define("blocks-js", ["blocks/Blocks", "blocks/Factory"], function(Blocks, Factory) {

	var override = require("override");
	override(Blocks, "implicitBaseFor", function(inherited) {
		return function(uri) {
			var r = inherited.apply(this, arguments);
			if(r === null && uri.indexOf("cavalion-blocks") !== -1 
					&& uri.indexOf(Blocks.PREFIX_PROTOTYPES + "$HOME/") === 0) {
				r = uri.split("/");
				while(r[2] !== "cavalion-blocks" && r.length > 2) {
					r.splice(2, 1);
				}
				r.splice(2, 1);
				r = r.join("/");
			}
			return r;
		};
	});
	
	// TODO Refactor to blocks/Superblock?
	define("vcl/Component-parentIsOwner", ["require", "js/defineClass", "vcl/Component"], function (require, ComponentPIO, Component) {
		return (ComponentPIO = ComponentPIO(require, {
			inherits: Component,
			prototype: {
				setParentComponent: function(value) {
					this.setOwner(value);
				}
			}
		}));
	});	
	
	Blocks.adjustUri = function(uri) {
		if(uri.indexOf("cavalion-blocks") !== -1 && uri.indexOf(Blocks.PREFIX_PROTOTYPES + "$HOME/") === 0) {
			uri = uri.split("/");
			while(uri[2] !== "cavalion-blocks" && uri.length > 2) {
				uri.splice(2, 1);
			}
			uri.splice(2, 1);
			uri = uri.join("/");
		}
		return uri;
	}

	Blocks.DEFAULT_NAMESPACES['devtools'] = "devtools";
	
	return Blocks;
});

define("vcl/Component.prototype.print", ["vcl/Component"], function(Component) {
	return (Component.prototype.print = function() {
		var args = js.copy_args(arguments);
		if(this.qsa("vcl/ui/Console#console").map(function(console, i) {
			i === 0 && console.print.apply(console, args);
			return console;
		}).length === 0) {
			bubble = this.up();
			if(typeof bubble.print === "function") {
				bubble.print.apply(bubble, args);
			}
		}
	});
});
define("vcl/Component.read/writeStorage->PouchDB", ["vcl/Component", "v7/objects"], function(Component, objects) {
	var V7 = {objects: objects}, property = "cavalion:vcl/Component";
	js.override(Component.prototype, {
        readStorage: function (key, callback, errback) {
        	var args = arguments, me = this;
            V7.objects.fetch(this.getStorageKey()).then(function(obj) {
// console.info("fetched", obj);
            	if(!obj.hasOwnProperty(property)) {
        			obj[property] = {};
            	}
            	if(!obj[property].hasOwnProperty(key)) {
            		var ls = me.inherited(args);
            		if(ls) {
            			obj[property][key] = ls;
// console.log(">>> copied from localStorage", me.getStorageKey(), key, obj[property][key]);
            		}
            	}
            	if(typeof(obj && obj[property] && obj[property][key]) === "object") {
            		// try { obj = JSON.parse(obj[property][key]); } catch(e) {}
            		obj[property][key] = JSON.stringify(obj[property][key]);
            	}
            	callback(obj && obj[property] && obj[property][key] || null);
            }).catch(function(e) {
            	console.error(e);
            	errback(e);	
            });
// console.log("readStorage", this, arguments);
        },
        writeStorage: function (key, value, callback, errback) {
        	var args = arguments, me = this;
            V7.objects.fetch(this.getStorageKey()).then(function(obj) {
            	if(!obj.hasOwnProperty(property)) {
        			obj[property] = {};
            	}
            	if(typeof value === "string") {
            		try { value = JSON.parse(value); } catch(e) {}
            	}
				obj[property][key] = value;
				V7.objects.save(obj).then(function() {
				    if (typeof callback === "function") { // nextTick?
				        callback.apply(this, arguments);
				    }
				}).catch(function() {
				    if (typeof errback === "function") { // nextTick?
				        errback.apply(this, arguments);
				    }
				});
            });
// console.log("writeStorage", this, arguments);
        }
	});
});
define("vcl/Component.all-kinds-of-aliases-for-codenvide", ["vcl/Component"], function(Component) {
	Component.prototype.e = function() {
		if(typeof this.constructor.prototype.execute === "function") {
			if(typeof this.execute === "function") {
				return this.execute.apply(this, arguments);
			}
		}
	};
});

window.locale_base = "locales/";
window.loc = "en-US";
define(function(require) {
	
	require("pace");
	require("stylesheet!styles.less");

	/*- Class/Type System, Tools, etc. */	
	require("js");
	require("less");
	require("blocks-js");

	/*- Some awesomeness */
	require("font-awesome");
	require("console/Printer");
	
	require("locale!en-US");
	// require("leaflet"); //depends on global js, which might not be loaded yet
	
	require("PageVisibility");
	require("Element");
	
	var ComponentNode = require("console/node/vcl/Component");
	var Component = require("vcl/Component");
	var Factory = require("vcl/Factory");
	var Url = require("util/net/Url");
	var JsObject = require("js/JsObject");
	var override = require("override");

	require("vcl/Component.read/writeStorage->PouchDB");
	require("vcl/Component.prototype.print");
	
	window.j$ = JsObject.$;
	
	ComponentNode.initialize();

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