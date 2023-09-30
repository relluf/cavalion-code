
var npm = (name) => "lib/node_modules/" + name;
var npm_bang = (banger, name) => banger + "!../lib/node_modules/" + name;
var bower = (name) => "lib/bower_components/" + name;

function ls(k, slash) { var r = localStorage[k]; if(r) { 
	if(slash && !r.endsWith("/")) r+= "/"; 
	console.log(k, r); 
	return r; } }

var cavalion_js = ls('cavalion-js-path', true) || "lib/node_modules/cavalion-js/src/";
var cavalion_vcl = ls('cavalion-vcl-path', false) || "lib/node_modules/cavalion-vcl/src/";
var cavalion_blocks = ls('cavalion-blocks-path', false) || "lib/node_modules/cavalion-blocks/src/";
var cavalion_pouch = ls('cavalion-pouch-path', false) || "lib/node_modules/cavalion-pouch/src/";
var veldapps_v7 = ls('veldapps-v7-path', true) || "lib/node_modules/veldapps-v7/src/";
var veldoffice_js = ls('veldoffice-js-path', true) || "lib/node_modules/veldoffice-js/src/";
var veldoffice_js_ = veldoffice_js.substring(veldoffice_js.charAt(0) === '/' ? 1 : 0);

require.config({
    paths: {
        "cavalion-blocks/$HOME": "/home",
        "home": "/home",
        "$HOME": "/home",

        "Projects": "/home/Projects",
        "Library": "/home/Library",
        "Workspaces": "/home/Workspaces",

        /*- bangers! */
        "stylesheet": cavalion_js + "stylesheet",
        "script": cavalion_js + "script",
        "text": cavalion_js + "text",
        "json": cavalion_js + "json",
        "locale": cavalion_js + "locale",

        /*- cavalion.org */
        "js": cavalion_js + "js",
        "console": cavalion_js + "console",
        "vcl": cavalion_vcl,
        "blocks": cavalion_blocks,
        "pouch": cavalion_pouch,

        "data": cavalion_js + "data",
        "persistence": cavalion_js + "persistence",
        "features": cavalion_js + "features",
        "entities": cavalion_js + "entities",

        "util": cavalion_js + "util",
        "on": cavalion_js + "on",
        "yell": cavalion_js + "yell",
        
		"cavalion-pouch": "/home/Workspaces/cavalion.org/cavalion-pouch",
        "xslt": "lib/node_modules/xslt/dist/xslt",
        "eswbo": "/home/Workspaces/eae.com/BBT-1.5.3/WebContent/app/src",
        "mapbox-gl": "lib/node_modules/mapbox-gl/dist/mapbox-gl-unminified",

		// "veldapps-ol": "/home/Workspaces/veldapps.com/veldapps-ol/src",
		"veldapps-ol": "lib/node_modules/veldapps-ol/src",
		// "veldapps-xml": "/home/Workspaces/veldapps.com/veldapps-xml/src",
		"veldapps-xml": "lib/node_modules/veldapps-xml/src",
		// "veldapps-imkl": "/home/Workspaces/veldapps.com/veldapps-imkl/src",
		"veldapps-imkl": "lib/node_modules/veldapps-imkl/src",
		// "veldapps-imsikb": "/home/Workspaces/veldapps.com/veldapps-imsikb/src",
		"veldapps-imsikb": "lib/node_modules/veldapps-imsikb/src",
		// "veldapps-imbro": "/home/Workspaces/veldapps.com/veldapps-imbro/src",
		"veldapps-imbro": "lib/node_modules/veldapps-imbro/src",
		// "vo": "/home/Workspaces/veldapps.com/veldapps-vo/src",
		// "vo": "lib/node_modules/veldapps-vo/src",
		"veldapps-gds-devtools": "/home/Workspaces/veldapps.com/veldapps-gds-devtools/src",
		// "veldapps-gds-devtools": "lib/node_modules/veldapps-gds-devtools/src",
		
		"veldoffice": veldoffice_js + "veldapps.com/veldoffice",
		"vcl-veldoffice": veldoffice_js + "veldapps.com/veldoffice/vcl-veldoffice",
		// "vcl/veldoffice": veldoffice_js + "veldapps.com/veldoffice/vcl-veldoffice",
		/*- veldapps.com/leaflet */

		/*- veldapps-leaflet/3rd party */
		"proj4": "lib/node_modules/veldapps-leaflet-js/src/proj4js.org/proj4-src",
		"epsg": "lib/node_modules/veldapps-leaflet-js/src/proj4js.org/epsg",
		"leaflet": "lib/node_modules/veldapps-leaflet-js/src/leafletjs.com",
		"famous": "lib/node_modules/famous",

		"ipfs": "lib/node_modules/ipfs/dist/index.min",

		// TODO now in veldapps-xml
        "xml-js": "lib/node_modules/xml-js/dist/xml-js",
        "handlebars": "lib/node_modules/handlebars/dist/handlebars.min",
        
        "sikb0101": "lib/node_modules/veldapps-xmlgen-imsikb",
        "xml-formatter": "lib/node_modules/xml-formatter/dist/browser/xml-formatter",

		/*- bower */
        "ace": "lib/bower_components/ace/lib/ace",
        "less": "lib/bower_components/less/dist/less",
        "moment": "lib/bower_components/moment/moment",
        "moment-locale": "lib/bower_components/moment/locale",
        "jquery": "lib/bower_components/jquery/dist/jquery",
        "backbone": "lib/bower_components/backbone/backbone",
        "underscore": "lib/bower_components/underscore/underscore",
        "js-yaml": "lib/bower_components/js-yaml/dist/js-yaml",
        // "csv-js": "lib/bower_components/CSV-JS/csv",
        // "relational-pouch": "lib/bower_components/relational-pouch/dist/pouchdb.relational-pouch",
        
        /*- dojo */
        "dojo": "lib/bower_components/dojo",
        "dgrid": "lib/bower_components/dgrid",
        "dstore": "lib/bower_components/dstore",
        
		"chartjs": "lib/node_modules/chart.js/dist",
		"dygraphs/Dygraph": "lib/node_modules/dygraphs/dist/dygraph",

        "fast-xml-parser": "lib/fast-xml-parser/parser",
		"papaparse": "lib/node_modules/papaparse",
		"jspdf": "lib/node_modules/jspdf/dist/jspdf.umd",
		"html2canvas": "lib/node_modules/html2canvas/dist/html2canvas.min",

		/*- amcharts3 */
        "amcharts": "lib/bower_components/amcharts3/amcharts/amcharts",
        "amcharts.funnel": "lib/bower_components/amcharts3/amcharts/funnel",
        "amcharts.gauge": "lib/bower_components/amcharts3/amcharts/gauge",
        "amcharts.pie": "lib/bower_components/amcharts3/amcharts/pie",
        "amcharts.radar": "lib/bower_components/amcharts3/amcharts/radar",
        "amcharts.serial": "lib/bower_components/amcharts3/amcharts/serial",
        "amcharts.xy": "lib/bower_components/amcharts3/amcharts/xy"

    },
	// map: {
	// 	'*': {
	// 	  'famous/*': 'famous/*/index.js'
	// 	}
	// },
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
    },
    packages: [
        {
            name: 'famous',
            location: "lib/node_modules/famous",
            main: 'index'
        }
    ]
});

less = { logLevel: 0 };

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
window.cl = console.log;

define("veldapps/Session", ["lib/node_modules/veldapps-mmx/src/Session"], (Session) => Session);
define("blocks", ["vcl/Component", "blocks/Blocks", "blocks/Factory", "override"], function(Component, Blocks, Factory) {

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
		uri = uri.split(">").join("").split("<").join("<>/");
		if(uri.indexOf("cavalion-blocks") !== -1 && uri.indexOf(Blocks.PREFIX_PROTOTYPES + "$HOME/") === 0) {
			uri = uri.split("/");
			while(uri[2] !== "cavalion-blocks" && uri.length > 2) {
				uri.splice(2, 1);
			}
			uri.splice(2, 1);
			uri = uri.join("/");
		}
		return uri;
	};
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
define("Element", ["on"], function(on) {
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
		var args = Array.prototype.slice.apply(arguments, [0]); 
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
	return Element;
});
define("xml-funcs", ["veldapps-xml/index"], function(Xml) {
	return Xml;

	// function logonce(s) {
	// 	var app = require("vcl/Application").instances[0];
	// 	var ac = arguments.callee; ac.cache = (ac.cache || (ac.cache = []));
	// 	if(ac.cache.indexOf(s) === -1) {
	// 		ac.cache.push(s);
	// 		app.print(s);
	// 	}
	// }
	// function asArray(arr) {
	// 	if(arr instanceof Array) {
	// 		return arr;
	// 	}
		
	// 	if(arr === null || arr === undefined) {
	// 		return [];
	// 	}
		
	// 	return [arr];
	// }
	// function types(scrape_gml_root, opts) {
	// 	var r = {};
	// 	for(var k in scrape_gml_root) {
	// 		r[k] = scrape_gml_root[k].map(_ => Object.keys(_).join(",")).filter(function(v, i, a) {
	// 			return a.indexOf(v) === i;
	// 		});
	// 	}
	// 	return r;
	// }

	// function gml(root, messages, opts) {
	// 	function resolve_xlinks(elems, elem, log, done) {
	// 		var key = "@_xlink:href-resolved", href;
			
	// 		done = done || [];
	// 		if(done.indexOf(elem) !== -1) return;
	// 		done.push(elem);
			
	// 		for(var k in elem) {
	// 			if(k !== key && typeof elem[k] === "object") {
	// 				resolve_xlinks(elems, elem[k], log); // <- what about done? 
	// 			}
	// 		}
		
	// 		if((href = elem['@_xlink:href'])) {
	// 			if(href.charAt(0) === '#') href = href.substring(1);
	// 			if(!(elem[key] = elems[href])) {
	// 				log && log.push(String.format("%s not found", href));
	// 			}
	// 		}
	// 	}
		
	// 	var key = Object.keys(root)[0];
	// 	var ns = key.split(":")[0];
	// 	var features = asArray(root[key][ns + ":featureMember"]);
	// 	var elems = {}, map = {}; /* return value */
	// 	var log = [];
	
	// 	resolve_xlinks(elems, root);
	// 	features.forEach(function(_) {
	// 		var key = Object.keys(_)[0];
	// 		var arr = (map[key] = map[key] || []);
	
	// 		elems[_[key]['@_gml:id']] = _;
	
	// 		arr.push(_[key]);
	// 	});
	// 	resolve_xlinks(elems, root, log);
		
	// 	return messages && log.length ? { messages: log, result: map } : map;
	// 	// return map;
	// }
	// function gml2geojson(feature) {
		
	// 	function coordinates(arr) {
	// 		return arr.map(function(v) {
	// 			if(typeof v['#text'] === "string") {
	// 				v = v['#text'];
	// 			}
	// 			var r = [], coords = v.split(/\s/);
	// 			while(coords.length) {
	// 				r.push([parseFloat(coords.shift()), parseFloat(coords.shift())]);
	// 			}
	// 			return r;
	// 		});
	// 	}
		
	// 	var keys = Object.keys(feature);
	// 	var ft = feature[keys[0]], v;
	// 	var r = { 
	// 		geometry: { type: keys[0].split(":").pop() },
	// 		properties: { id: ft['@_gml:id'] },
	// 		type: "Feature"
	// 	};
		
	// 	if(r.geometry.type === "LineString") {
	// 		r.geometry.coordinates = coordinates(asArray(ft["gml:posList"]));
	// 	} else if(r.geometry.type === "Point") {
	// 		r.geometry.coordinates = coordinates(asArray(ft["gml:pos"]))[0][0];
	// 	} else if(r.geometry.type === "Polygon") {
	// 		r.geometry.coordinates = coordinates(asArray(js.get("gml:exterior.gml:LinearRing.gml:posList", ft)));
	// 	} else if(r.geometry.type === "Curve") {
	// 		r.geometry.type = "LineString";
	// 		r.geometry.coordinates = coordinates(asArray(js.get("gml:segments.gml:LineStringSegment.gml:posList", ft)))[0];
	// 	} else {
	// 		logonce(r.geometry.type);
	// 	}
	// 	r.properties['@_gml'] = ft;
	// 	return r;
	// }
	// function imkl2geojson(root, opts) {

	// 	function scrape(gml_root, opts) {
	// 		var result = {};
	
	// 		opts = opts || {};
			
	// 		function walk(item, path, objs) {
				
	// 			path = path || [];
	// 			objs = objs || [];
				
	// 			if(objs.indexOf(item) !== -1) return;
				
	// 			objs.push(item);
				
	// 			var r = {}, k;
	// 			for(var key in item) {
	// 				if(key !== "@_gml:id") {// && key!=="@_xlink:href-resolved") {
	// 					path.push(key);
	// 					if(key.indexOf("gml:") === 0) {
	// 						if(opts.fullPaths !== false) {
	// 							r[path.join("/")] = item[key];
	// 						} else {
	// 							if(r[key] instanceof Array) {
	// 								r[key].push(item[key]);
	// 							} else if(r[key] === undefined) {
	// 								r[key] = item[key];
	// 							} else {
	// 								r[key] = [r[key], item[key]];
	// 							}
	// 						}
	// 					} else if(key === "net:link") {
	// 						js.mixIn(r, walk(item[key]["@_xlink:href-resolved"], path, objs));
	// 					} else if(typeof item[key] === "object") {
	// 						js.mixIn(r, walk(item[key], path, objs));
	// 					}
	// 					path.pop();
	// 				}
	// 			}
	// 			return r;
	// 		}
			
	// 		for(var k in gml_root) {
	// 			var arr = gml_root[k].map(item => walk(item)).filter(_ => Object.keys(_).length);
	// 			if(arr.length > 0) {
	// 				result[k] = arr;
	// 			}
	// 		}
			
	// 		return result;
	// 	}

	// 	opts = opts || {};
		
	// 	var scraped = scrape(gml(root, opts));
	// 	var layers = {}, all = [];

	// 	for(var layer in scraped) {
	// 		layers[layer] = {
	// 			type: "FeatureCollection", name: layer,
	// 			crs: { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::28992" } },
	// 			features: scraped[layer].map(gml2geojson)
	// 		};
	// 		all = all.concat(layers[layer].features)
	// 	}
		
	// 	if(opts.all === true) {
	// 		return {
	// 			type: "FeatureCollection", 
	// 			name: (/\d\d.\d\d\d\d\d\d/.exec(all[0].properties.id)||[""])[0],
	// 			crs: { 
	// 				"type": "name", 
	// 				"properties": { "name": "urn:ogc:def:crs:EPSG::28992" } 
	// 			},
	// 			features: all
	// 		}
	// 	}

	// 	return layers;
	// }
	
	// return {
	// 	stringify: (obj) => JSON.stringify(obj, (key, value) => key !== "@_xlink:resolved" ? value : undefined),
		
	// 	gml: gml, 
	// 	gml2geojson: gml2geojson,
	// 	imkl2geojson: imkl2geojson
	// }
	
});
define("utils/asarray", function() {
	
	/*	asArray(arrLike) - 
	
		used while processing XML files when a sequence 
		of elements is expected:
	
			var root = parse(xml);
			
			asArray(root.children).map( .... )
	
	*/
	
	return (_) => (_ instanceof Array ? _ : (_ !== undefined && _ !== null ? [_] : []));
});

define("dygraphs/Dygraph", ["lib/node_modules/dygraphs/dist/dygraph", "stylesheet!../lib/node_modules/dygraphs/dist/dygraph.css"], function(dygraph) {
	return dygraph;
});

define("ol", ["lib/ol-6.14.1-dist/ol", "stylesheet!../lib/ol-6.14.1-dist/ol.css"], function(ol_) {
	var ol = window.ol || ol_;
	window.ol = ol;
	
	ol.create = ol.convert = (function(){
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
	ol.control.defaults.defaults = ol.control.defaults;

	return arguments[0];
});
define("ol-8.1.0", ["lib/ol-8.1.0-dist/ol", "stylesheet!../lib/ol-8.1.0-dist/ol.css"], ol => {
	ol = window.ol; // that was better before 7.1.0
	ol.create = ol.convert = (function(){
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
	return ol;
});
define("proj4", ["lib/node_modules/proj4/dist/proj4-src"], function(P) {
	return P;
});
define("leaflet", ["js", veldoffice_js_ + "leafletjs.com/leaflet-default"], function(js, L) {
	return L;
});
define(("pouchdb"), ["" + "lib/bower_components/pouchdb/dist/pouchdb", "lib/bower_components/pouchdb-find/dist/pouchdb.find", 
	"lib/bower_components/relational-pouch/dist/pouchdb.relational-pouch", 
	"pouchdb.authentication",
	"pouchdb.memory",
	"pouchdb.save"
], 
function(pouchdb, find, relational, authentication, memory, save) {
	
	/*- hacked pouchdb.memory */
	memory = window.pouch_MemoryPouchPlugin;
	delete window.pouch_MemoryPouchPlugin;
	
	pouchdb.plugin(find);
	pouchdb.plugin(relational);
	pouchdb.plugin(authentication);
	pouchdb.plugin(memory);
	pouchdb.plugin(save);
	
	return pouchdb;
});

define(("dropbox"), ["lib/node_modules/dropbox/dist/Dropbox-sdk", "lib/node_modules/dropbox/dist/DropboxTeam-sdk"], (dbx) => dbx);
define("markdown", ["lib/bower_components/markdown/lib/markdown"], function() {
	return window.markdown;
});
define("marked", ["lib/node_modules/marked/marked.min"], (marked) => marked);
define("pace", ["lib/bower_components/PACE/pace", "stylesheet!../lib/bower_components/PACE/themes/blue/pace-theme-minimal.css"], function(pace) { 
		pace.start({ 
			ajax: {
			    ignoreURLs: ['https://dbs.veldapps.com/'],
			},
			elements: false,
			restartOnRequestAfter: true, 
			restartOnPushState: true,
			document: false
		});
		return pace; 
	});
define("font-awesome", ["stylesheet!../lib/bower_components/font-awesome/css/font-awesome.css"], function(stylesheet) {
	return stylesheet;
});
define("clipboard-copy", [], () => {
	return function clipboardCopy (text) {
	  // Use the Async Clipboard API when available. Requires a secure browsing
	  // context (i.e. HTTPS)
	  if (navigator.clipboard) {
	    return navigator.clipboard.writeText(text).catch(function (err) {
	      throw (err !== undefined ? err : new DOMException('The request is not allowed', 'NotAllowedError'))
	    })
	  }
	
	  // ...Otherwise, use document.execCommand() fallback
	
	  // Put the text to copy into a <span>
	  var span = document.createElement('span')
	  span.textContent = text
	
	  // Preserve consecutive spaces and newlines
	  span.style.whiteSpace = 'pre'
	  span.style.webkitUserSelect = 'auto'
	  span.style.userSelect = 'all'
	
	  // Add the <span> to the page
	  document.body.appendChild(span)
	
	  // Make a selection object representing the range of text selected by the user
	  var selection = window.getSelection()
	  var range = window.document.createRange()
	  selection.removeAllRanges()
	  range.selectNode(span)
	  selection.addRange(range)
	
	  // Copy text to the clipboard
	  var success = false
	  try {
	    success = window.document.execCommand('copy')
	  } catch (err) {
	    console.log('error', err)
	  }
	
	  // Cleanup
	  selection.removeAllRanges()
	  window.document.body.removeChild(span)
	
	  return success
	    ? Promise.resolve()
	    : Promise.reject(new DOMException('The request is not allowed', 'NotAllowedError'))
	}
})
define("vcl/Component.storage-pouchdb", ["cavalion-pouch/Component.storageDB"], function() { return arguments[0]; });
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
			name = name.split("<").join("$/").split(">")[0];
		}


		return Resources.get(js.sf("pouchdb://%s/vcl-comps%s.js", Component.storageDB.name, name))
				.then(function(obj) {
					var src = js.get("vcl-comps:source", obj);
					if(src === undefined) {
						src = js.get("devtools:resource.text", obj);
						if(src === undefined) {
							src = obj.text || "[\"\", {}, []];";
						} else {
							// src = minify(src);
							js.set("vcl-comps:source", src, obj);
						}
					}

// console.log(js.sf(">>> pouchdb://%s/vcl-comps%s.js", Component.storageDB.name, name))
					
					return src;
				})
				.catch(err => null);
	};
});
define("vcl/Factory.fetch-storageDB", ["vcl/Factory", "vcl/Component"], (Factory, Component) => {
	Factory.fetch = function(name) {
		var source_code_pouchdb = Component.storageDB;
		if(name.indexOf("<") !== -1) {
			name = name.split("<").join("$/").split(">")[0] + ".js";
		}
		return new Promise((resolve, reject) => {
			// console.log(js.sf(">>> vcl-comps/%s", name));
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
		var keys = Component.getKeysByUri(name);
		name = js.sf("%s/%s", keys.namespace, keys.name);
		if(keys.classes.length) {
			name += js.sf(".%s", keys.classes.join("."));
		}
		
		if(keys.specializer) {
			name += js.sf("<>/%s", keys.specializer);
			if(keys.specializer_classes.length) {
				name += js.sf(".%s", keys.specializer_classes.join("."));
			}
		}

		if(name.charAt(0) !== "/") {
			name = "/" + name;
		}

// console.log(js.sf(">>> pouchdb://%s/cavalion-blocks%s.js", Component.storageDB.name, name))

		return Resources.get(js.sf("pouchdb://%s/cavalion-blocks%s.js", Component.storageDB.name, name))
			.then(function(obj) {
				var src = js.get("cavalion-blocks:source", obj);
				if(src === undefined) {
					src = js.get("devtools:resource.text", obj);
					if(src === undefined) {
						src = obj.text || "[\"\", {}, []];";
					} else {
						// src = minify(src);
						js.set("cavalion-blocks:source", src, obj);
					}
				}
				return src;
			});
	};
});
define("blocks/Factory.fetch-storageDB", ["blocks/Factory", "vcl/Component"], (Factory, Component) => {
	Factory.fetch = function(name) {
		var source_code_pouchdb = Component.storageDB;

		if(name.indexOf("<") !== -1) {
			name = name.split("<").join("<>/").split(">")[0] + ".js";
		}

		return source_code_pouchdb.get(js.sf("cavalion-blocks/%s.js", name))
			.then(function(obj) {
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
	require("Element");

	require("locale!en-US");
	require("console/Printer"); 
	require("font-awesome");
	
	require("veldapps-gds-devtools/index");

	var ComponentNode = require("console/node/vcl/Component");
	var Factory = require("vcl/Factory");
	var Url = require("util/net/Url");
	var JsObject = require("js/JsObject");

	ComponentNode.initialize();

	window.j$ = JsObject.$;
	window.B = require("B")
	window.addEventListener("beforeunload", (e) => {
		// check for dirty editors?
		e.returnValue  = "Are you sure?";
	});

	require("vcl/Component.storage-pouchdb");
	// require("vcl/Factory.fetch-storageDB");
	// require("blocks/Factory.fetch-storageDB");
	require("vcl/Factory.fetch-resources");
	require("blocks/Factory.fetch-resources");
	require("stylesheet!styles.less");

	var url = new Url(), app = js.sf("App<%s>", [ 
		url.getPath().split("/")[0] || "code", 
		url.getParamValues("").filter(s => s !== "debug")[0],
		url.getHost() === "localhost" ? "" : url.getHost()
	].filter(_ => _).join("."));
		
	Factory.require(app, function(factory) {
		window.app = B.DEFAULT_OWNER = factory.newInstance();
		window.app.vars("url", url);

		document.body.removeChild(document.getElementById("devtools-loading"));
	});
});