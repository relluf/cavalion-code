// "use strict";

var XSD_NS = "http://www.w3.org/2001/XMLSchema";
var PARSED_KEY = "__";
var sf = String.format;
// var locale = window.locale, $ = window.$, $i = window.$i, js = window.js;

	function asArray(arr) {
		if(arr === null || arr === undefined) return [];
		if(!(arr instanceof Array)) return [arr];
		return arr;
	}
	function onDblClick() { 
		// var console = this.scope().console; 
		var console = this.up("devtools/Workspace<>").down("vcl/ui/Console#console");
		this.getSelection(true).map(_ => console.print(_['__name'] || _['@_name'], _));
		// this.scope().tabs.getControl(0).setSelected(true);
		
	}
	
	function resolveUri(uri, me) {
		if(uri.indexOf("http://schemas.opengis.net/") === 0) {
			uri = "Library/opengis.net/" + uri.substring("http://schemas.opengis.net/".length);
		} else if(uri.indexOf("http://www.w3.org/1999/") === 0) {
			uri = "Library/opengis.net/" + uri.substring("http://www.w3.org/1999/".length);
		} else if(uri.indexOf("/") === -1) {
			uri = js.up(me.vars(["resource.uri", true])) + "/" + uri;
		}
		return uri;
	}
	function parseComplexType(type, elem, prefix) {
		var arr, name, ref, ext, base, path, subst;
		var me = this;
		
		// create debug info and optionally add attribute
		function f(ctx, key, value, add_attr) {
			var type;
			function g(ctx, key, value) {
				var obj = elem[PARSED_KEY][ctx] || (elem[PARSED_KEY][ctx] = {});
				return (obj[key] = value);
			}

			if(add_attr !== false) {
				g("attributes", value['@_name'] || key, value);
				if((type = value['@_type'])) {
					if((type = me.ctypes_map[type])) {
						value['__type-resolved'] = type;
					} else {
						// me.log(elem, String.format("@_type %s not found", value['@_type']));
					}
				}
			}
			
			g("__attributes", sf("%s/%s", prefix, value['@_name'] || key), value);
			return g("__" + ctx, value['@_name'] || key, value);
		}
		
		function parseElement(el, i) {
			var type; /* hide outer type !!! */
			if((name = el["@_name"])) {
				f(path + "@_name", String.format("%s/%s", (prefix||"?"), name), el);
				if(el.complexType) {
					f(path + "complexType", String.format("%s", ref), el);
				}
			} else if((ref = el["@_ref"])) {
				if((ref = me.elems_map[ref])) {
					el["__ref-resolved"] = ref;
					me.parseComplexType(ref, elem, el['@_ref']);
					f(path + "@_ref", String.format("%s", el['@_ref']), el);
				} else {
					me.log(elem, String.format("@_ref %s not found", el['@_ref']));
				}
			} else if((type = el["@_type"])) {
				if((type = me.ctypes_map[type])) {
					el["__type-resolved"] = type;
					me.parseComplexType(type, elem, el['@_type']);
					f(path + "@_type", String.format("%s", el['@_type']), el);
				} else {
					me.log(elem, String.format("@_type %s not found", el['@_type']));
				}
			} else {
				me.log(elem,"parseElement - need implementation", el);
			}
		}			

		if((base = type['@_base'])) {
			if((base = this.ctypes_map[base])) {
				type["__base-resolved"] = base;
				this.parseComplexType(base, elem, type['@_base']);
			} else {
				this.log(elem, String.format("@_base %s not found", type['@_base']));
			}
		}
		if((ref = type['@_ref'])) {
			if((ref = this.elems_map[ref])) {
				type["__ref-resolved"] = ref;
				this.parseComplexType(ref, elem, type['@_ref']);
			} else {
				this.log(elem, String.format("@_ref %s not found", type['@_ref']));
			}
		}
		if((subst = type['@_substitutionGroup'])) {
			if((subst = this.elems_map[subst])) {
				type['@_substitutionGroup-resolved'] = subst;
				// this.parseComplexType(subst, elem, type['@_substitutionGroup']);
			} else {
				this.log(elem, String.format("@_substitutionGroup %s not found", type['@_substitutionGroup']));
			}
		}
		if((ext = js.get("complexContent.extension", type))) {
			this.parseComplexType(ext, elem, prefix);
		}
		if((arr = asArray(js.get("attribute", type))).length) {
			arr.forEach(function(attr, i) {
				if((name = attr["@_name"])) {
					f("attribute/@_name", String.format("%s/%s", (prefix||"?"), name), attr);
				} else if((ref = attr["@_ref"]))	 {
					// attr["__ref-resolved-a"] = ref;
					f("attribute/@_ref", String.format("%s", ref), attr);
				} else {
					me.log(elem, "attribute?", el);
				}
			});
		}
		if((arr = asArray(js.get("sequence.element", type))).length) {
			path = "sequence.element/";
			arr.forEach(parseElement);
		}
		if((arr = asArray(js.get("sequence.sequence.element", type))).length) {
			path = "sequence.sequence.element/";
			arr.forEach(parseElement);
		}
		if((arr = asArray(js.get("sequence.group", type))).length) {
			arr.forEach(function(group, i) {
				if((name = group["@_name"])) {
					f("sequence.group/@_name", String.format("%s/%s", (prefix||"?"), name), group);
					// this.log(elem, String.format(""))
				} else if((ref = group['@_ref'])) {
					f("sequence.group/@_ref", String.format("%s", ref), group, false);
					if((ref = me.groups_map[ref])) {
						group["__ref-resolved"] = ref;
						me.parseComplexType(ref, elem, group['@_ref']);
					} else {
						me.log(elem, [String.format("@_ref %s not found", group['@_ref']), group]);
					}
				}
				
			});
		}
	}

$(["devtools/Editor<xml>"], { 
	handlers: {
		"loaded": function() {
	        var tab = this.up("vcl/ui/Tab"), scope = this.scope();
			tab.on("resource-loaded", function() {
				scope.render.setTimeout("execute", 500);
			});
		},
		"#elements onDblClick": onDblClick,
		"#complexTypes onDblClick": onDblClick,
		"#simpleTypes onDblClick": onDblClick,
		"#attributes onDblClick": onDblClick,
		"#imports onDblClick": function(evt) {
			var action = this.up("devtools/Workspace<>").down("#editor-needed");
			var me = this; evt = evt || {};
			this.getSelection(true).forEach(function(imp) {
				var uri = resolveUri(imp['@_schemaLocation'], me);
				var tab = action.execute({dontBringToFront: true, selected: evt.metaKey, resource:{uri: uri}});
				var root = tab._control.down(":root");
				if(!root) {
					// tab.setIndex(0);
					// tab.setSelected(true);
					me.up("devtools/Workspace<>").down("devtools/OpenTabs<>").dispatch("activate", {});
				}
				// console.log({ tab: tab, root: root });
			});
		},
		"#search-input onChange": function() { 
			var me = this, scope = me.scope();
			
			function filter(object) {
				var values = me.getInputValue().toLowerCase().trim().split(" ");
				var or = values.some(function(value) {
					return Object.keys(object).some(function(key) {
						return (""+object[key]).toLowerCase().indexOf(value) !== -1;
					});
				});
				var and = values.every(function(value) {
					return Object.keys(object).some(function(key) {
						return (""+object[key]).toLowerCase().indexOf(value) !== -1;
					});
				});
				
				return !and;
			}
			
			this.setTimeout("change", function() {
				var value = me.getInputValue();
				scope.stypes.setOnFilterObject(!value.length ? null : filter);
				scope.ctypes.setOnFilterObject(!value.length ? null : filter);
				scope.elems.setOnFilterObject(!value.length ? null : filter);
				scope.attrs.setOnFilterObject(!value.length ? null : filter);
			}, 200);
		} 
	}, 
}, [

    $("vcl/data/Array", "ctypes"), $("vcl/data/Array", "elems"),
    
	$i("render", {
		onExecute: function() {

	// Setup vars
			var r = this.inherited(arguments);
			var app = this.app(), scope = this.scope(), me = this;
			var workspace = this.up("devtools/Workspace<>:root");
			var resource = this.vars(["resource", true]);

	// Determine xs:schema node and ns_prefix (ie. none, xs: or xsd:)
			var root = this.vars(["root"]), schema, ns_prefix;
			['', 'xs:', 'xsd:'].some(function(prefix) {
				ns_prefix = prefix;
				schema = root[ns_prefix + "schema"];
				return root.hasOwnProperty(prefix + "schema");
			});

	// Parse namespaces and determine default namespace (ie. xmlns[''])
			var xmlns = {};
			Object.keys(schema).forEach(function(key) { 
				if(key.indexOf('@_xmlns:') === 0) {
					xmlns[key.split(":").pop()] = schema[key];
					if(schema['@_targetNamespace'] === schema[key]) {
						xmlns[''] = key.split(":").pop();
					}
				}
			});

	 // Gather parser context, types and definitions			
			var parser = {
				root: root, 
				xmlns: xmlns,
				schema: schema,
				ns_prefix: ns_prefix,
				
				stypes: asArray(js.get(sf("%ssimpleType", ns_prefix), schema)),
				ctypes: asArray(js.get(sf("%scomplexType", ns_prefix), schema)),
				elems: asArray(js.get(sf("%selement", ns_prefix), schema)),
				groups: asArray(js.get(sf("%sgroup", ns_prefix), schema)),
				imps: asArray(js.get(sf("%simport", ns_prefix), schema)).concat(
					asArray(js.get(sf("%sschema.%sinclude", ns_prefix, ns_prefix), root))
						.map(function(include) {
							include['@_namespace'] = schema['@_targetNamespace'];
							return include;
						})
				),
				attrs: [],
				
				ctypes_map: workspace.vars(["devtools/Editor<xsd>/ctypes_map", false, {}]),
				stypes_map: workspace.vars(["devtools/Editor<xsd>/stypes_map", false, {}]),
				elems_map: workspace.vars(["devtools/Editor<xsd>/elems_map", false, {}]),
				groups_map: workspace.vars(["devtools/Editor<xsd>/groups_map", false, {}]),
				imps_map: workspace.vars(["devtools/Editor<xsd>/imps_map", false, {}]),
				
				parseComplexType: parseComplexType,
				log: function(elem, msg) {
					if(msg instanceof Array) {
						scope.console.print(msg[0], msg.splice(1));
					} else {
						scope.console.print(msg, elem);
					}
					(elem[PARSED_KEY].messages 
							= elem[PARSED_KEY].messages || []).push(msg);
				}
			};
			parser.stypes.forEach(function(type) {
				type[PARSED_KEY] = type[PARSED_KEY] || {
					schema: resource.uri.split("/").splice(2).join("/")
				};
				parser.stypes_map[xmlns[''] + ":" + type['@_name']] = type;
			});
			parser.ctypes.forEach(function(type) {
				type[PARSED_KEY] = type[PARSED_KEY] || {
					schema: resource.uri.split("/").splice(2).join("/")
				};
				parser.ctypes_map[xmlns[''] + ":" + type['@_name']] = type;
			});
			parser.groups.forEach(function(group) {
				group[PARSED_KEY] = group[PARSED_KEY] || {
					schema: resource.uri.split("/").splice(2).join("/")
				};
				parser.groups_map[xmlns[''] + ":" + group['@_name']] = group;
			});
			parser.imps.forEach(function(imp) {
				parser.imps_map[imp['@_schemaLocation']] = resolveUri(imp['@_schemaLocation'], me);
			});
	// --->>> Parse elements and fill attrs
			parser.elems.forEach(function(elem) {
				elem[PARSED_KEY] = elem[PARSED_KEY] || {
					schema: resource.uri.split("/").splice(2).join("/")
				};
				parser.elems_map[xmlns[''] + ":" + elem['@_name']] = elem;
				
				var type;
				if((type = elem['@_type'])) {
					if((type = parser.ctypes_map[type])) {
						elem["__type-resolved"] = type;
						parser.parseComplexType(type, elem, elem['@_type']);
					}
				}
// complexType
				if((type = elem.complexType)) {
					parser.parseComplexType(type, elem, "complexType");
				}
				
				if((type = elem.simpleType)) {
					parser.log(elem, "simpleType");
				}
				
				if(elem[PARSED_KEY].__attributes) {
					Object.keys(elem[PARSED_KEY].__attributes).forEach(function(key, i) {
						var type = elem[PARSED_KEY].__attributes[key];
						parser.attrs.push({ 
							namespace: key.split(":")[0],
							element: elem['@_name'],
							name: key.split("/").pop(),
							index: i,
							type: key.split("/")[0].split(":").pop(),
							documentation: js.get("annotation.documentation", type) || "",
							'__elem': elem,
							'__type': type,
							'__name': key
						});
					});
				}
			});

	// Reflect UI (fill grids)
			scope.imps.setArray(parser.imps);
			scope.stypes.setArray(parser.stypes);
			scope.ctypes.setArray(parser.ctypes);
			scope.elems.setArray(parser.elems);
			scope.groups.setArray(parser.groups);
			scope.attrs.setArray(parser.attrs);

	// Sort columns			
			var sorted = [].concat(scope.elements._columns).sort(function(c1, c2) {
				return c1._attribute < c2._attribute ? -1 : 1;
			});
			scope.elements._columns.forEach(function(col) {
				col.setIndex(sorted.indexOf(col));
			});
			
			var schemas_map = workspace.vars(["devtools/Editor<xsd>/schemas_map", false, {}]);
			schemas_map[resource.uri] = schema;
			parser.schemas_map = schemas_map;
	// Report and emit
			scope.console.print("vars", parser);
			this.up("vcl/ui/Tab").emit("resource-rendered", [this]);

			return r;
		}
	}),
	
	$("vcl/data/Array", "imps"),
	$("vcl/data/Array", "attrs"),
	$("vcl/data/Array", "groups"),
	$("vcl/data/Array", "elems"),
	$("vcl/data/Array", "ctypes"),
	$("vcl/data/Array", "stypes"),

    $i("output", [
    	$("vcl/ui/Bar", [
    		$("vcl/ui/Input", "search-input", { classes: "search-top" }),
    	]),
	    $i("tabs", [
	    	$("vcl/ui/Tab", { text: locale("-/Import.plural"), control: "imports", selected: true  }),
	    	$("vcl/ui/Tab", { text: locale("-/Attribute.plural"), control: "attributes"}),
	    	$("vcl/ui/Tab", { text: locale("-/Element.plural"), control: "elements" }),
	    	$("vcl/ui/Tab", { text: locale("-/ComplexType.plural"), control: "complexTypes" }),
	    	$("vcl/ui/Tab", { text: locale("-/Groups.plural"), control: "groupsl" }),
	    	$("vcl/ui/Tab", { text: locale("-/SimpleType.plural"), control: "simpleTypes" })
	    ]),
	    $i("console", { visible: false }),
	    $("vcl/ui/List", "imports", { autoColumns: true, source: "imps", visible: true, onDblClick: onDblClick }),
	    $("vcl/ui/List", "attributes", { autoColumns: true, source: "attrs", visible: false, onDblClick: onDblClick }),
	    $("vcl/ui/List", "elements", { autoColumns: true, source: "elems", visible: false, onDblClick: onDblClick }),
	    $("vcl/ui/List", "complexTypes", { autoColumns: true, source: "ctypes", visible: false, onDblClick: onDblClick }),
	    $("vcl/ui/List", "groupsl", { autoColumns: true, source: "groups", visible: false, onDblClick: onDblClick }),
	    $("vcl/ui/List", "simpleTypes", { autoColumns: true, source: "stypes", visible: false, onDblClick: onDblClick })
    ])

]);