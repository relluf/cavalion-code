function asArray(arr) {
	if(arr === null || arr === undefined) return [];
	if(!(arr instanceof Array)) return [arr];
	return arr;
}
function onDblClick() { 
	// var console = this.scope().console; 
	var console = this.up("devtools/Workspace<>").down("vcl/ui/Console#console");
	this.getSelection(true).map(_ => console.print(_['@_name'], _));
	// this.scope().tabs.getControl(0).setSelected(true);
	
}

$(["devtools/Editor<xml>"], { handlers: {
	
	'#search-input onChange': function() { 
		var me = this, scope = me.scope();
		
		function filter(object) {
			var values = me.getInputValue().toLowerCase().trim().split(" ");
			return !values.some(function(value) {
				return Object.keys(object).some(function(key) {
					return (""+object[key]).toLowerCase().indexOf(value) !== -1;
				});
			});
		}
		
		this.setTimeout("change", function() {
			var value = me.getInputValue();
			scope.stypes.setOnFilterObject(!value.length ? null : filter);
			scope.ctypes.setOnFilterObject(!value.length ? null : filter);
			scope.elems.setOnFilterObject(!value.length ? null : filter);
		}, 200);
	}
	
}}, [

    $("vcl/data/Array", "ctypes"), $("vcl/data/Array", "elems"),
    
	$i("render", {
		onExecute: function() {
			var r = this.inherited(arguments), app = this.app();
			var root = this.vars(["root"]), scope = this.scope();
			var stypes, ctypes, elems;
			// var ns_xsd = "http://www.w3.org/2001/XMLSchema";
			
			var xmlns = {};
			Object.keys(root.schema).forEach(function(key) { 
				if(key.indexOf('@_xmlns:') === 0) {
					xmlns[key.split(":").pop()] = root.schema[key];
					if(root.schema['@_targetNamespace'] === root.schema[key]) {
						xmlns[''] = key.split(":").pop();
					}
				}
			});

			if(Object.keys(root).indexOf("xsd:schema") !== -1) {
				stypes = asArray(js.get("xsd:schema.xsd:simpleType", root));
				ctypes = asArray(js.get("xsd:schema.xsd:complexType", root));
				elems = asArray(js.get("xsd:schema.xsd:element", root));
			} else {
				stypes = asArray(js.get("schema.simpleType", root));
				ctypes = asArray(js.get("schema.complexType", root));
				elems = asArray(js.get("schema.element", root));
			}
			
			var ctype_index = this.up("devtools/Main<>").vars(["devtools/Editor<xsd>::ctype_index", false, {}]);
			
			ctypes.reduce(function(r, a, b, arr) {
				r[xmlns[''] + ":" + a['@_name']] = a; return r;
			}, ctype_index);
			

			function log(elem, msg) {
				app.down("#console #console").print(msg, elem);
				(elem.messages = elem.messages || []).push(msg);
			}
			
			function parseComplexType_attributes(type, elem, prefix) {
				var arr, name, ext, base, attributes = elem.attributes || (elem.attributes = {});
				if((arr = asArray(js.get("sequence.element", type))) instanceof Array) {
					arr.forEach(function(el, i) {
						if((name = el["@_name"])) {
							attributes[String.format("%02d-%s/%s", i, (prefix||"?"), name)] = el;
							// log(elem, String.format(""))
						}
					});
				}
				if((ext = js.get("complexContent.extension", type))) {
					parseComplexType_attributes(ext, elem, prefix);
				}
				if((base = type['@_base'])) {
					if((base = ctype_index[base])) {
						type['@_base_'] = base;
						parseComplexType_attributes(base, elem, type['@_base']);
					} else {
						log(elem, String.format("@_base %s not found", type['@_base']));
					}
				}
				if((subst = type['@_substitutionGroup'])) {
					if((subst = ctype_index[subst])) {
						type['@_substitutionGroup_'] = subst;
						parseComplexType_attributes(subst, elem, type['@_substitutionGroup']);
					} else {
						log(elem, String.format("@_substitutionGroup %s not found", type['@_substitutionGroup']));
					}
				}
			}
			
			elems.forEach(function(elem) {
				if(elem.annotation) {
					// TODO this is should be rendered in list column?
					elem.aantekening = elem.annotation.documentation;
				}
				
				if((type = elem['@_type'])) {
					if((type = ctype_index[type])) {
						elem['@_type_'] = type;
						parseComplexType_attributes(type, elem, elem['@_type']);
					}
				}
			});

			scope.stypes.setArray(stypes);
			scope.ctypes.setArray(ctypes);
			scope.elems.setArray(elems);
			
			scope.elements._columns.forEach(function(col, i) {
				if(i && col._attribute.charAt(0) === "@") {
					col.setIndex(0);
				}
			});
			
			return r;
		}
	}),
	
	$("vcl/data/Array", "ctypes"),
	$("vcl/data/Array", "stypes"),
	$("vcl/data/Array", "elements"),

    $i("output", [
    	$("vcl/ui/Bar", [
    		$("vcl/ui/Input", "search-input", { classes: "search-top" }),
    	]),
	    $i("tabs", [
	    	$("vcl/ui/Tab", { text: locale("-/SimpleType.plural"), control: "simpleTypes" }),
	    	$("vcl/ui/Tab", { text: locale("-/ComplexType.plural"), control: "complexTypes" }),
	    	$("vcl/ui/Tab", { text: locale("-/Element.plural"), control: "elements", selected: true })
	    ]),
	    $i("console", { visible: false }),
	    $("vcl/ui/List", "simpleTypes", { autoColumns: true, source: "stypes", visible: false, onDblClick: onDblClick }),
	    $("vcl/ui/List", "complexTypes", { autoColumns: true, source: "ctypes", visible: false, onDblClick: onDblClick }),
	    $("vcl/ui/List", "elements", { autoColumns: true, source: "elems", visible: true, onDblClick: onDblClick })
    ])

]);