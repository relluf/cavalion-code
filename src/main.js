var bwr = (name) => "lib/bower_components/" + name;
var npm = (name) => "lib/node_modules/" + name;
var bwr_bang = (banger, name) => banger + "!lib/bower_components/" + name;
var npm_bang = (banger, name) => banger + "!lib/node_modules/" + name;

var cavalion_js = npm("cavalion-js/src/");
var cavalion_vcl = npm("cavalion-vcl/src/");
var cavalion_blocks = npm("cavalion-blocks/src/");
var cavalion_devtools = npm("cavalion-devtools/src/");
var cavalion_pouch = npm("cavalion-pouch");
var veldapps_v7 = npm("veldapps-v7/src/");
var veldoffice_js = npm("veldoffice-js/src/");
var veldoffice_js_ = veldoffice_js.substring(veldoffice_js.charAt(0) === '/' ? 1 : 0);

require.config({
    paths: {
        'cavalion-blocks/$HOME': "/home",
        'home': "/home",
        '$HOME': "/home",

        'Projects': "/home/Projects",
        'Library': "/home/Library",
        'Workspaces': "/home/Workspaces",
        
        'npm': "lib/node_modules",
        'bwr': "lib/bower_components",

        /*- bangers! */
        'stylesheet': cavalion_js + "stylesheet",
        'script': cavalion_js + "script",
        'text': cavalion_js + "text",
        'json': cavalion_js + "json",
        'locale': cavalion_js + "locale",

        /*- cavalion.org */
        'js': cavalion_js + "js",
        'console': cavalion_js + "console",
        'vcl': cavalion_vcl.replace(/\/$/, ""),
        'blocks': cavalion_blocks.replace(/\/$/, ""),
        'devtools': cavalion_devtools + "devtools",
        'pouch': cavalion_pouch,

        'data': cavalion_js + "data",
        'persistence': cavalion_js + "persistence",
        'features': cavalion_js + "features",
        'entities': cavalion_js + "entities",

        'util': cavalion_js + "util",
        'on': cavalion_js + "on",
        'yell': cavalion_js + "yell",
        
        'xslt': npm("xslt/dist/xslt"),
        'mapbox-gl': npm("mapbox-gl/dist/mapbox-gl-unminified"),
        
        'shapefile': npm("shapefile/dist/shapefile"),
        'pako': npm("pako/dist/pako"),
        'sqlite': npm("sql.js/dist/sql-wasm"),

		'bxv': npm("veldapps-bxv-parser/src"),
		'bro': npm("veldapps-imbro/src"), // '/ "bro': npm("veldapps-xmlgen-broservices"),
		'sikb': npm("veldapps-imsikb/src"),
		'sikb0101': npm("veldapps-xmlgen-imsikb"),

		'veldapps-ol': npm("veldapps-ol/src"),
		'veldapps-xml': npm("veldapps-xml/src"),
		'veldapps-imkl': npm("veldapps-imkl/src"),
		'veldapps-imsikb': npm("veldapps-imsikb/src"),
		'veldapps-imbro': npm("veldapps-imbro/src"),
		'veldapps-gds-devtools': npm("veldapps-gds-devtools/src"),

		'vcl-veldoffice': veldoffice_js + "/veldapps.com/veldoffice/vcl-veldoffice",
		'veldoffice': veldoffice_js + "/veldapps.com/veldoffice",

        'ace': npm("ace-builds/src"),
		'less': "../lib/bower_components/less/dist/less.min",
        'moment': "../lib/bower_components/moment/moment",
        'moment-locale': "../lib/bower_components/moment/locale",
        'moment-timezone': "../lib/bower_components/moment-timezone/moment-timezone",

        'fast-xml-parser': "../lib/fast-xml-parser/parser",
		'papaparse': npm("papaparse"),
		'jszip': npm("jszip/dist/jszip.min"),
		'jspdf': npm("jspdf/dist/jspdf.umd"),

		// /*- veldapps-leaflet/3rd party */
		'proj4': npm("veldapps-leaflet-js/src/proj4js.org/proj4-src"),
		'epsg': npm("veldapps-leaflet-js/src/proj4js.org/epsg"),
		'leaflet': npm("veldapps-leaflet-js/src/leafletjs.com"),
		'jquery': npm("veldapps-leaflet-js/src/jquery.com/jquery-2.1.0.min"),
		'famous': npm("famous"),

		'ipfs': npm("ipfs/dist/index.min"),

		// TODO now in veldapps-xml
        'xml-js': npm("xml-js/dist/xml-js"),
        'handlebars': npm("handlebars/dist/handlebars.min"),
        
        'xml-formatter': npm("xml-formatter/dist/browser/xml-formatter"),

		/*- bower */
        'backbone': bwr("backbone/backbone"),
        'underscore': bwr("underscore/underscore"),
        'js-yaml': bwr("js-yaml/dist/js-yaml"),

        /*- dojo */
        'dojo': bwr("dojo"),
        'dgrid': bwr("dgrid"),
        'dstore': bwr("dstore"),
        
		'chartjs': npm("chart.js/dist"),
		'dygraphs/Dygraph': npm("dygraphs/dist/dygraph"),

		'html2canvas': npm("html2canvas/dist/html2canvas.min"),

		/*- amcharts3 */
        'amcharts': bwr("amcharts3/amcharts/amcharts"),
        'amcharts.funnel': bwr("amcharts3/amcharts/funnel"),
        'amcharts.gauge': bwr("amcharts3/amcharts/gauge"),
        'amcharts.pie': bwr("amcharts3/amcharts/pie"),
        'amcharts.radar': bwr("amcharts3/amcharts/radar"),
        'amcharts.serial': bwr("amcharts3/amcharts/serial"),
        'amcharts.xy': bwr("amcharts3/amcharts/xy")

    },
	shim: {
		'amcharts.funnel': {
            'deps': ["amcharts"],
            'exports': "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts.gauge': {
            'deps': ["amcharts"],
            'exports': "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts.pie': {
            'deps': ["amcharts"],
            'exports': "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts.radar': {
            'deps': ["amcharts"],
            'exports': "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts.serial': {
            'deps': ["amcharts"],
            'exports': "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts.xy': {
            'deps': ["amcharts"],
            'exports': "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        }
    }
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

define("veldapps/Session", [npm("veldapps-mmx/src/Session")], (Session) => Session);
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
	Element.prototype.soup = function selfOrUp(selector) {
		if(this.matches(selector)) {
			return this;
		}
		return this.up(selector);
	};
	Element.prototype.position = function() {
	    let offsetTop = 0;
	    let offsetLeft = 0;
	    let currentElement = this;
	
	    // Loop through the offset parents to calculate top and left relative to the closest positioned ancestor
	    while (currentElement) {
	        offsetTop += currentElement.offsetTop;
	        offsetLeft += currentElement.offsetLeft;
	        currentElement = currentElement.offsetParent;
	    }
	
	    return { top: offsetTop, left: offsetLeft };
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
define("xml-funcs", ["veldapps-xml/index"], Xml => Xml);
define("utils/asarray", function() {
	
	/*	asArray(arrLike) - 
	
		used while processing XML files when a sequence 
		of elements is expected:
	
			var root = parse(xml);
			
			asArray(root.children).map( .... )
	
	*/
	
	return (_) => (_ instanceof Array ? _ : (_ !== undefined && _ !== null ? [_] : []));
});

// define("papaparse", ["papaparse"], (ppp) => ppp);
define("papaparse", [npm("papaparse/papaparse")], (ppp) => ppp);

define(("dropzone"), [npm("dropzone/dist/dropzone-amd-module"), "stylesheet!lib/node_modules/dropzone/dist/dropzone.css"], (dz) => dz);

define("mime-db", ["json!npm/mime-db/db"], (db) => db);
define("mime-types", ["npm/mime-types/lookup"], (lu) => lu);

define("dygraphs/Dygraph", [npm("dygraphs/dist/dygraph"), "stylesheet!../lib/node_modules/dygraphs/dist/dygraph.css"], function(dygraph) {
	return dygraph;
});

define("am5", ["lib/amcharts5-lib/dist/am5.amd"], am5 => am5);
define("ol-10.2.1", ["script!lib/ol-10.2.1-dist/ol.js", "stylesheet!lib/ol-10.2.1-dist/ol.css"], ol => {
	ol = window.ol;
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
	return (window.ol = ol);
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
define("ol-6.14.1", ["lib/ol-6.14.1-dist/ol", "stylesheet!../lib/ol-6.14.1-dist/ol.css"], function(ol_) {
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
define("ol", ["ol-6.14.1"], ol => ol)
// define("ol", ["ol-8.1.0"], ol => ol)
// define("ol", ["ol-10.2.1"], ol => ol)
define("proj4", [npm("proj4/dist/proj4-src")], function(P) {
	return P;
});
define("leaflet", ["js", veldoffice_js_ + "leafletjs.com/leaflet-default"], function(js, L) {
	return L;
});

define("pouchdb", ["pouch/db"], db => db);

define("hljs", [npm("@highlightjs/cdn-assets/highlight.min")], () => window.hljs);

define(("dropbox"), [npm("dropbox/dist/Dropbox-sdk")], (dbx) => dbx);
define("markdown", [bwr("markdown/lib/markdown")], function() {
	return window.markdown;
});
define("marked-highlight", ["hljs", npm("marked-highlight/lib/index.umd")], (hljs, markedhl) => markedhl);
define("marked", [npm("marked/marked.min"), "marked-highlight"], (marked) => marked);
define("pace", [bwr("PACE/pace"), "stylesheet!../lib/bower_components/PACE/themes/blue/pace-theme-minimal.css"], function(pace) { 
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
define("clipboard-copy", ["util/Clipboard"], (Clipboard) => Clipboard.copy);
define("vcl/Component.storage-pouchdb", ["pouch/Component.storageDB", "devtools/Resources"], (DB, Resources) => { 

	
	return DB;
	
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
	/*- So, fetch() is called **always**, default implementation reject()s, which is anticipated (catch()) and it falls back on RequireJS config */
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

console.log("FETCH", obj, js.sf("pouchdb://%s/cavalion-blocks%s.js", Component.storageDB.name, name))

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

define("implicit_sources", ["blocks/Factory", "blocks/Factory.implicit_sources"], (Factory, sources) => {
	// vcl-comps might be done like this as well
	// the idea is that this code is only run (required) in the build (see build.json)
	Factory.implicit_sources = sources;
});

define(function(require) {
	require("pace");
	require("Element");

	require("locale!en-US");
	require("console/Printer"); 
	require("font-awesome");
	
	// require("veldapps-gds-devtools/index");

	var Resources = require("devtools/Resources");
	var ComponentNode = require("console/node/vcl/Component");
	var Factory = require("vcl/Factory");
	var Url = require("util/net/Url");
	var JsObject = require("js/JsObject");

	ComponentNode.initialize();

	window.j$ = JsObject.$;
	window.B = require("B")
	window.addEventListener("beforeunload", (e) => {
		const app = window.app;
		if(app) {
			const cul = app.vars("canunload");
			if(typeof cul === "function" && !cul(app, e)) {
				e.returnValue = "Are you sure?"
			}
		}
	});

	require("vcl/Component.storage-pouchdb");
	// require("vcl/Factory.fetch-storageDB");
	// require("blocks/Factory.fetch-storageDB");
	require("vcl/Factory.fetch-resources");
	require("blocks/Factory.fetch-resources");
	require("stylesheet!styles.less");

	Resources.getDefaultURIBase = (uri) => {
		return js.sf("pouchdb://%s/", req("vcl/Component").storageDB.name);
	};

	var url = new Url(), app = js.sf("App<%s>", [ 
		url.getPath().split("/")[0] || "code", 
		url.getParamValues("").filter(s => s !== "debug")[0],
		url.getHost() === "localhost" ? "" : ""//url.getHost()
	].filter(_ => _).join("."));
		
	Factory.require(app, function(factory) {
		window.app = B.DEFAULT_OWNER = factory.newInstance();
		window.app.vars("url", url);

		document.body.removeChild(document.getElementById("devtools-loading"));
	});
});