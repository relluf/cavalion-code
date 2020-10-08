function ls(k) { var r = localStorage[k]; if(r) { console.log(k, r); return r; } }

var cavalion_js = ls('cavalion-js-path') || "../lib/node_modules/cavalion-js/src/";
var cavalion_vcl = ls('cavalion-vcl-path') || "../lib/node_modules/cavalion-vcl/src";
var cavalion_blocks = ls('cavalion-blocks-path') || "../lib/node_modules/cavalion-blocks/src";
var veldapps_v7 = ls('veldapps-v7-path') || "../lib/node_modules/veldapps-v7/src";
var veldoffice_js = ls('veldoffice-js-path') || "../lib/node_modules/veldoffice-js/src/";
var veldoffice_js_ = veldoffice_js.substring(veldoffice_js.charAt(0) === '/' ? 1 : 0);

less = { logLevel: 0 };
require.config({
    paths: {
        "cavalion-blocks/$HOME": "/home",
        "home": "/home",
        "$HOME": "/home",

        "Projects": "/home/Projects",
        "Library": "/home/Library",
        "Workspaces": "/home/Workspaces",

        // "v7": "node_modules/veldapps-v7/src/v7",
        // "v7": "/home/Projects/V7/src/v7",
        // "va": "/home/Projects/V7/src/va",
        // "v7": veldapps_v7 + "/v7",
        // "va": veldapps_v7 + "/va",
        // "VA": veldapps_v7 + "/VA",
        
        "lib": "../lib",

        /*- bangers! */
        "locale": cavalion_js + "locale",
        "text": cavalion_js + "text",
        "stylesheet": cavalion_js + "stylesheet",
        "script": cavalion_js + "script",

        /*- cavalion.org */
        "console": cavalion_js + "console",
        "yell": cavalion_js + "yell",
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
        
		"cavalion-pouch": "/home/Workspaces/cavalion.org/cavalion-pouch",
        "xslt": "../lib/node_modules/xslt/dist/xslt",
        "eswbo": "/home/Workspaces/eae.com/BBT-1.5.3/WebContent/app/src",
        "mapbox-gl": "../lib/node_modules/mapbox-gl/dist/mapbox-gl-unminified",

		"veldapps-imsikb": "/home/Workspaces/veldapps.com/veldapps-imsikb/src",
		"veldapps": veldoffice_js + "veldapps.com",
		"veldoffice": veldoffice_js + "veldapps.com/veldoffice",
		"vcl-veldoffice": veldoffice_js + "veldapps.com/veldoffice/vcl-veldoffice",
		// "vcl/veldoffice": veldoffice_js + "veldapps.com/veldoffice/vcl-veldoffice",
		/*- veldapps.com/leaflet */
		// "proj4": veldoffice_js + "proj4js.org/proj4",
		"epsg": veldoffice_js + "proj4js.org/epsg",
		"leaflet": veldoffice_js + "leafletjs.com",
		
		"ipfs": "../lib/node_modules/ipfs/dist/index.min",

		/*- bower */
        "ace": "../lib/bower_components/ace/lib/ace",
        "less": "../lib/bower_components/less/dist/less",
        "jquery": "../lib/bower_components/jquery/dist/jquery",
        "moment": "../lib/bower_components/moment/moment",
        "moment-locale": "../lib/bower_components/moment/locale",
        // "csv-js": "../lib/bower_components/CSV-JS/csv",
        // "relational-pouch": "../lib/bower_components/relational-pouch/dist/pouchdb.relational-pouch",
        "backbone": "../lib/bower_components/backbone/backbone",
        "underscore": "../lib/bower_components/underscore/underscore",
        "js-yaml": "../lib/bower_components/js-yaml/dist/js-yaml",
        
        /*- dojo */
        "dojo": "../lib/bower_components/dojo",
        "dgrid": "../lib/bower_components/dgrid",
        "dstore": "../lib/bower_components/dstore",
        
		/*- amcharts3 */
        "amcharts": "../lib/bower_components/amcharts3/amcharts/amcharts",
        "amcharts.funnel": "../lib/bower_components/amcharts3/amcharts/funnel",
        "amcharts.gauge": "../lib/bower_components/amcharts3/amcharts/gauge",
        "amcharts.pie": "../lib/bower_components/amcharts3/amcharts/pie",
        "amcharts.radar": "../lib/bower_components/amcharts3/amcharts/radar",
        "amcharts.serial": "../lib/bower_components/amcharts3/amcharts/serial",
        "amcharts.xy": "../lib/bower_components/amcharts3/amcharts/xy",

        "fast-xml-parser": "../lib/fast-xml-parser/parser",
        "xml-js": "node_modules/xml-js/dist/xml-js",

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

window.locale_base = "locales/";
window.loc = "en-US";
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

define("blocks", ["vcl/Component", "blocks/Blocks", "blocks/Factory"], function(Component, Blocks, Factory) {

	var override = require("override");
	override(Blocks, "implicitBaseFor", function(inherited) {
		// has something todo with $HOME
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
		uri = uri.split(">").join("").split("<").join("<>/")
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
	// Factory.fetch = function(name) {
	// 	var source_code_pouchdb = Component.storageDB;

	// 	return source_code_pouchdb.get(js.sf("cavalion-blocks/%s.js", name)).then(function(obj) {
	// 		var src = js.get("cavalion-blocks:source", obj);
	// 		if(src === undefined) {
	// 			src = js.get("devtools:resource.text", obj);
	// 			if(src === undefined) {
	// 				src = "[\"\", {}, []];";
	// 			} else {
	// 				// src = minify(src);
	// 				js.set("cavalion-blocks:source", src, obj);
	// 			}
	// 		}
	// 		return src;
	// 	});
	// };
	// override(Factory, "makeTextUri", function(org) {
	// 	// #CVLN-20200824-1
	// 	return function(uri, suffix) {
	// 		if(uri.startsWith("$HOME/")) {
	// 			uri = uri.substring("$HOME/".length);
	// 			console.log("uri.$HOME ==>", this.resolveUri(uri.split(">").join("").split("<").join("<>/")))
	// 			// console.log(uri.split(">").join("").split("<").join("<>/"));
	// 		} else {
	// 			console.log("uri ==>", this.resolveUri(uri.split(">").join("").split("<").join("<>/")))
	// 		}
	// 		return org.apply(this, [uri.split(">").join("").split("<").join("<>/"), suffix]);
	// 	};
	// });

	Blocks.DEFAULT_NAMESPACES.devtools = "devtools";
	
	return Blocks;
});
define("B", ["blocks/Factory"], function(Factory) {
	var Blocks = require("blocks/Blocks");
	Blocks.DEFAULT_NAMESPACES['vcl-veldoffice'] = "vcl-veldoffice";
	Blocks.DEFAULT_NAMESPACES.veldoffice = "vcl-veldoffice";
	return Blocks;
});
define("override", function() {
	
	function override(obj, method, factory) {
		obj[method] = factory(obj[method]);
	}
	
	return override;
});
define("ArrayFactory", function() {
	return {
		create: function(options, callback) {
			var r = [];
			var inc = options.inclusive === true;
	
	//			if(options.inclusive === true && options.hasOwnProperty("end") && options.hasOwnProperty("step")) {
	//				options.end += options.step;
	//			}
	
			for(var i = options.start; inc ? i <= options.end : i < options.end; i += options.step) {
				if(typeof callback === "function") {
					var item = callback(i, options, arr);
					if(item !== undefined) {
						r.push(item);
					}
				} else {
					r.push(i);
				}
			}
			return r;
		},
		from: function(a) {
			return Array.from(a || []);
		}
	};
});
define("Element", function() {
	/* Make life easier */
	var qsa = Element.prototype.querySelectorAll;
	Element.prototype.up = function(selector, includeThis) {
		
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
		
		var all = Array.from(document.querySelectorAll(selector)), me = this;
		if(includeThis && all.includes(this)) {
			return this;
		}
		
		return all.map(node => ({ node: node, distance: distanceToParent(me, node) }))
			.filter(result => result.distance > 0)
			.sort((i1, i2) => i1.distance - i2.distance < 0 ? -1 : 1)
			.map(i1 => i1.node)
			.shift() || null;
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
	return Element;
});
define("xml-funcs", [], function() {

	function logonce(s) {
		var app = require("vcl/Application").instances[0];
		var ac = arguments.callee; ac.cache = (ac.cache || (ac.cache = []));
		if(ac.cache.indexOf(s) === -1) {
			ac.cache.push(s);
			app.print(s);
		}
	}
	function asArray(arr) {
		if(arr instanceof Array) {
			return arr;
		}
		
		if(arr === null || arr === undefined) {
			return [];
		}
		
		return [arr];
	}
	function types(scrape_gml_root, opts) {
		var r = {};
		for(var k in scrape_gml_root) {
			r[k] = scrape_gml_root[k].map(_ => Object.keys(_).join(",")).filter(function(v, i, a) {
				return a.indexOf(v) === i;
			});
		}
		return r;
	}

	function gml(root, messages) {
		
		function resolve_xlinks(elems, elem, log, done) {
			var key = "@_xlink:href-resolved", href;
			
			done = done || [];
			if(done.indexOf(elem) !== -1) return;
			done.push(elem);
			
			for(var k in elem) {
				if(k !== key && typeof elem[k] === "object") {
					resolve_xlinks(elems, elem[k], log); // <- what about done? 
				}
			}
		
			if((href = elem['@_xlink:href'])) {
				if(href.charAt(0) === '#') href = href.substring(1);
				if(!(elem[key] = elems[href])) {
					log && log.push(String.format("%s not found", href));
				}
			}
		}
		
		var key = Object.keys(root)[0];
		var ns = key.split(":")[0];
		var features = asArray(root[key][ns + ":featureMember"]);
		var elems = {}, map = {}; /* return value */
		var log = [];
	
		resolve_xlinks(elems, root);
		features.forEach(function(_) {
			var key = Object.keys(_)[0];
			var arr = (map[key] = map[key] || []);
	
			elems[_[key]['@_gml:id']] = _;
	
			arr.push(_[key]);
		});
		resolve_xlinks(elems, root, log);
		
		return messages && log.length ? { messages: log, result: map } : map;
		// return map;
	}
	function gml2geojson(feature) {
		
		function coordinates(arr) {
			return arr.map(function(v) {
				if(typeof v['#text'] === "string") {
					v = v['#text'];
				}
				var r = [], coords = v.split(/\s/);
				while(coords.length) {
					r.push([parseFloat(coords.shift()), parseFloat(coords.shift())]);
				}
				return r;
			});
		}
		
		var keys = Object.keys(feature);
		var ft = feature[keys[0]], v;
		var r = { 
			geometry: { type: keys[0].split(":").pop() },
			properties: { id: ft['@_gml:id'] },
			type: "Feature"
		};
		
		if(r.geometry.type === "LineString") {
			r.geometry.coordinates = coordinates(asArray(ft["gml:posList"]));
		} else if(r.geometry.type === "Point") {
			r.geometry.coordinates = coordinates(asArray(ft["gml:pos"]))[0][0];
		} else if(r.geometry.type === "Polygon") {
			r.geometry.coordinates = coordinates(asArray(js.get("gml:exterior.gml:LinearRing.gml:posList", ft)));
		} else if(r.geometry.type === "Curve") {
			r.geometry.type = "LineString";
			r.geometry.coordinates = coordinates(asArray(js.get("gml:segments.gml:LineStringSegment.gml:posList", ft)))[0];
		} else {
			logonce(r.geometry.type);
		}
		r.properties['@_gml'] = ft;
		return r;
	}
	function imkl2geojson(root, opts) {

		function scrape(gml_root, opts) {
			var result = {};
	
			opts = opts || {};
			
			function walk(item, path, objs) {
				
				path = path || [];
				objs = objs || [];
				
				if(objs.indexOf(item) !== -1) return;
				
				objs.push(item);
				
				var r = {}, k;
				for(var key in item) {
					if(key !== "@_gml:id") {// && key!=="@_xlink:href-resolved") {
						path.push(key);
						if(key.indexOf("gml:") === 0) {
							if(opts.fullPaths !== false) {
								r[path.join("/")] = item[key];
							} else {
								if(r[key] instanceof Array) {
									r[key].push(item[key]);
								} else if(r[key] === undefined) {
									r[key] = item[key];
								} else {
									r[key] = [r[key], item[key]];
								}
							}
						} else if(key === "net:link") {
							js.mixIn(r, walk(item[key]["@_xlink:href-resolved"], path, objs));
						} else if(typeof item[key] === "object") {
							js.mixIn(r, walk(item[key], path, objs));
						}
						path.pop();
					}
				}
				return r;
			}
			
			for(var k in gml_root) {
				var arr = gml_root[k].map(item => walk(item)).filter(_ => Object.keys(_).length);
				if(arr.length > 0) {
					result[k] = arr;
				}
			}
			
			return result;
		}

		opts = opts || {};
		
		var scraped = scrape(gml(root, opts));
		var layers = {}, all = [];

		for(var layer in scraped) {
			layers[layer] = {
				type: "FeatureCollection", name: layer,
				crs: { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::28992" } },
				features: scraped[layer].map(gml2geojson)
			};
			all = all.concat(layers[layer].features)
		}
		
		if(opts.all === true) {
			return {
				type: "FeatureCollection", 
				name: (/\d\d.\d\d\d\d\d\d/.exec(all[0].properties.id)||[""])[0],
				crs: { 
					"type": "name", 
					"properties": { "name": "urn:ogc:def:crs:EPSG::28992" } 
				},
				features: all
			}
		}

		return layers;
	}
	
	return {
		gml: gml, 
		gml2geojson: gml2geojson,
		imkl2geojson: imkl2geojson
	}
	
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
define(("Framework7"), [
	"../lib/bower_components/framework7/dist/js/framework7", 
	"Framework7/plugins/auto-back-title", "Framework7/plugins/esc-is-back",
	"stylesheet!../lib/bower_components/font-awesome/css/font-awesome.css",
	"stylesheet!../lib/bower_components/framework7/dist/css/framework7.css", 
	"stylesheet!../lib/bower_components/framework7-icons/css/framework7-icons.css"
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

define("ol", ["../lib/ol-6.1.1", "stylesheet!../lib/ol-6.1.1.css"], function(ol_) {
	var ol = window.ol || ol_;
	window.ol = ol;
	
	ol.convert = (function(){
		return function convert(value, properties) {
			function instantiate(def, properties) {
			
				var values = def[1] || {};
				var code = js.sf("new %s(values)", def[0].replace(/\:/g, "."));
			
				for(var name in values) {
					var value = values[name];
					values[name] = convert(value, properties);
				}
				
				/*- jshint:evil */
				return eval(code);
			}
		
			// TODO escape with backslash
			if(typeof value === "string" && value.charAt(0) === ":" && value.charAt(1) !== ":") {
				return properties[value.substring(1)];
			}
			
			if(!(value instanceof Array)) {
				return value;
			}
				
			if(value.length < 1 || value.length > 2 || typeof value[0] !== "string") {
				return value.map(function(val) {
					return convert(val, properties);
				});
			}
			
			if(value[0].indexOf("ol:") === 0) {
				value = instantiate(value, properties);
			}
			
			return value;
		};
	}());
	
	return arguments[0];
});
define("proj4", ["../lib/node_modules/proj4/dist/proj4-src"], function(P) {
	return P;
});
define("leaflet", ["js", veldoffice_js_ + "leafletjs.com/leaflet-default"], function(js, L) {
	return L;
});
define(("pouchdb"), ["" + "../lib/bower_components/pouchdb/dist/pouchdb", "../lib/bower_components/pouchdb-find/dist/pouchdb.find", 
	"../lib/bower_components/relational-pouch/dist/pouchdb.relational-pouch", 
	"pouchdb.memory",
	"pouchdb.save"
], 
function(pouchdb, find, relational, memory, save) {
	
	/*- hacked pouchdb.memory */
	memory = window.pouch_MemoryPouchPlugin;
	delete window.pouch_MemoryPouchPlugin;
	
	pouchdb.plugin(find);
	pouchdb.plugin(relational);
	pouchdb.plugin(memory);
	pouchdb.plugin(save);
	
	return pouchdb;
});

define(("dropbox"), ["../lib/node_modules/dropbox/dist/Dropbox-sdk", "../lib/node_modules/dropbox/dist/DropboxTeam-sdk"], (dbx) => dbx);
define("markdown", ["../lib/bower_components/markdown/lib/markdown"], function() {
	return window.markdown;
});
define("pace", ["../lib/bower_components/PACE/pace", "stylesheet!../lib/bower_components/PACE/themes/blue/pace-theme-minimal.css"], function(pace) { 
		pace.start({ 
			ajax: {
			    ignoreURLs: ['https://dbs.veldapps.com/'],
			},
			elements: false,
			restartOnRequestAfter: true, 
			restartOnPushState: true,
			document: false
		});
		//{ trackMethods: [] } });
		return pace; 
	});
define("font-awesome", ["stylesheet!../lib/bower_components/font-awesome/css/font-awesome.css"], function(stylesheet) {
	return stylesheet;
});

define("vcl/Component.storage-pouchdb", ["vcl/Component", "pouchdb", "util/net/Url"], function(Component, PouchDB, Url) {
	var url = new Url();
	
	var workspaces = url.getParamValue("workspaces") || url.getParamValue("title");
	var app = url.getParamValue("") || (workspaces && workspaces.split(",")[0]) || "code";
	var dbName = url.getParamValue("db") || js.sf("%s-va_objects", app.split(/-|\./).shift());
	var idPrefix = url.getParamValue("db-id-prefix") || "";
	var property = "cavalion-vcl:state";
	var cid = (s, c) => js.sf("[%s %s]", c._name ? c._name : "#" + c.hashCode(), s);
	
	var storageDB = new PouchDB(dbName);
	var db = (c) => c.vars(["storage-db"]) || storageDB;
	var prefix = (c) => c.vars(["storage-id-prefix"]) || idPrefix;
	
	console.log("using", storageDB, "for vcl-comps (" + storageDB.name + ")");
	
/*- perhaps here we should prefix the id (just like in Resources) with the workspace better */
	
	function fetch(db, key, opts) {
		return db.fetch(key, opts);
	}
	function save(db, obj, opts) {
		return db.save(obj, opts);
	}
	
	Component.sync = function(opts) {
		var dbi = js.sf("https://dbs.veldapps.com/ralphk-%s", dbName);
		var root = opts.app || require("vcl/Application").instances[0];
		var sh = db(root).sync(new PouchDB(dbi), opts)
			.on("error", function(err) {
				console.error(err);
				root.print("sync-error", { sh: sh, err: err, 'this': this, args: arguments });
			})
			.on("change", function (change) {
				console.log("change", change);
				root.print("sync-change", { sh: sh, change: change, 'this': this, args: arguments });
			})
			.on("paused", function (info) {
				console.log("paused", info);
				root.print("sync-paused", { sh: sh, info: info, 'this': this, args: arguments });
			})
			.on("active", function (info) {
				console.log("active", info);
				root.print("sync-active", { sh: sh, info: info, 'this': this, args: arguments });
			});
			
		return sh;
	};
	Component.storageDB = storageDB;

	js.override(Component.prototype, {
        readStorage: function (key, callback, errback) {

// this.print(cid("readStorage", this), key);

        	var args = arguments, me = this;
            fetch(db(me), this.getStorageKey()).then(function(obj) {
// me.print(cid("readStorage-fetched", me), obj);
            	if(!obj.hasOwnProperty(property)) {
        			obj[property] = {};
            	}
//             	if(!obj[property].hasOwnProperty(key)) {
//             		var ls = me.inherited(args);
//             		if(ls) {
//             			obj[property][key] = ls;
// // me.print(cid("copyFromLS", me), [me.getStorageKey(), key, obj[property][key]]);
//             		}
//             	}
            	// if(typeof(obj && obj[property] && obj[property][key]) === "object") {
            	// 	// try { obj = JSON.parse(obj[property][key]); } catch(e) {}
            	// 	// obj[property][key] = JSON.stringify(obj[property][key]);
            	// }
            	callback(obj && obj[property] && obj[property][key]);
            }).catch(function(e) {
            	console.error(e);
            	errback(e);	
            });
// console.log("readStorage", me, arguments);
        },
        writeStorage: function (key, value, callback, errback) {
        	var args = arguments, me = this;
if(typeof value === "string") {
	try { value = JSON.parse(value); } catch(e) {}
	console.log("converted to object", value);
}
// me.print(cid("writeStorage", me), key, value);
            fetch(db(me), this.getStorageKey()).then(function(obj) {
            	if(!obj.hasOwnProperty(property)) {
        			obj[property] = {};
            	}
				obj[property][key] = value;
				save(db(me), obj).then(function() {
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
define("vcl/Factory.fetch-resources", ["vcl/Factory", "vcl/Component", "devtools/Resources"], (Factory, Component, Resources) => {
	Factory.fetch = function(name) {
		if(name.charAt(0) !== "/") {
			name = "/" + name;
		}
		if(name.indexOf("<") !== -1) {
			name = name.split("<").join("$/").split(">")[0] + ".js";
		}
		return Resources.get(js.sf("pouchdb://%s%s", Component.storageDB.name, name));
	};
});
define("vcl/Factory.fetch-storageDB", ["vcl/Factory", "vcl/Component"], (Factory, Component) => {
	Factory.fetch = function(name) {
		var source_code_pouchdb = Component.storageDB;
		if(name.indexOf("<") !== -1) {
			name = name.split("<").join("$/").split(">")[0] + ".js";
		}
		return new Promise((resolve, reject) => {
			source_code_pouchdb.get(js.sf("vcl-comps/%s", name))
				.then(function(obj) {
					// console.log(">>>", name, "get result", obj);
					var src = js.get("vcl-comps:source", obj);
					if(src === undefined) {
						src = js.get("devtools:resource.text", obj);
						if(src === undefined) {
							src = "[\"\", {}, []];";
						} else {
							// src = minify(src);
							js.set("vcl-comps:source", src, obj);
						}
					}
					resolve(src);
				})
				.catch((err) => resolve(null));
		});

	};
});
define("blocks/Factory.fetch-resources", ["blocks/Factory", "vcl/Component", "devtools/Resources"], (Factory, Component, Resources) => {
	Factory.fetch = function(name) {
		if(name.charAt(0) !== "/") {
			name = "/" + name;
		}
		if(name.indexOf("<") !== -1) {
			name = name.split("<").join("$/").split(">")[0] + ".js";
		}
		return Resources.get(js.sf("pouchdb://%s%s", Component.storageDB.name, name));
	};
});
define("blocks/Factory.fetch-storageDB", ["blocks/Factory", "vcl/Component"], (Factory, Component) => {
	Factory.fetch = function(name) {
		var source_code_pouchdb = Component.storageDB;

		return source_code_pouchdb.get(js.sf("cavalion-blocks/%s.js", name)).then(function(obj) {
			var src = js.get("cavalion-blocks:source", obj);
			if(src === undefined) {
				src = js.get("devtools:resource.text", obj);
				if(src === undefined) {
					src = "[\"\", {}, []];";
				} else {
					// src = minify(src);
					js.set("cavalion-blocks:source", src, obj);
				}
			}
			return src;
		});
	};
});

define(function(require) {
	require("pace");
	require("stylesheet!styles.less");

	/*- Class/Type System, Tools, etc. */	
	require("js");
	require("less");
	require("blocks"); // <-- basic blocks funcs

	/*- Some awesomeness */
	require("font-awesome");
	require("console/Printer");
	
	require("locale!en-US");
	// require("leaflet"); //depends on global js, which might not be loaded yet

	window.locale.slashDotRepl = false;

	require("Element");
	
	var ComponentNode = require("console/node/vcl/Component");
	var Component = require("vcl/Component");
	var Factory = require("vcl/Factory");
	var Url = require("util/net/Url");
	var JsObject = require("js/JsObject");
	var override = require("override");

	require("vcl/Component.storage-pouchdb");
	require("vcl/Factory.fetch-storageDB");
	require("blocks/Factory.fetch-storageDB");
	
	// require("vcl/Component.prototype.print");
	
	window.j$ = JsObject.$;
	window.B = require("B")
	
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
			return s !== "debug"; })[0] || "code";

		app = js.sf("devtools/App<%s>", app);
		// app += "/App";
	}
	
	Factory.require(app, function(factory) {
		window.app = B.DEFAULT_OWNER = factory.newInstance();
		window.app.vars("url", url);

		document.body.removeChild(document.getElementById("devtools-loading"));
	});
});