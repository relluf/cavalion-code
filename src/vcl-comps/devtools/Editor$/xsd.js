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

$(["devtools/Editor<xml>"], {}, [

    $("vcl/data/Array", "ctypes"), $("vcl/data/Array", "elems"),
    
	$i("render", {
		onExecute: function() {
			var r = this.inherited(arguments);
			var root = this.vars(["root"]), scope = this.scope();
			var stypes, ctypes, elems;
			// var ns_xsd = "http://www.w3.org/2001/XMLSchema";
			if(Object.keys(root).indexOf("xsd:schema") !== -1) {
				stypes = asArray(js.get("xsd:schema.xsd:simpleType", root));
				ctypes = asArray(js.get("xsd:schema.xsd:complexType", root));
				elems = asArray(js.get("xsd:schema.xsd:element", root));
			} else {
				stypes = asArray(js.get("schema.simpleType", root));
				ctypes = asArray(js.get("schema.complexType", root));
				elems = asArray(js.get("schema.element", root));
			}

			scope.stypes.setArray(stypes);
			scope.ctypes.setArray(ctypes);
			scope.elems.setArray(elems);
			
			return r;
		}
	}),
	
	$("vcl/data/Array", "ctypes"),
	$("vcl/data/Array", "stypes"),
	$("vcl/data/Array", "elements"),

    $i("output", [
	    $i("tabs", [
	    	$("vcl/ui/Tab", { text: locale("-/SimpleType.plural"), control: "simpleTypes" }),
	    	$("vcl/ui/Tab", { text: locale("-/ComplexType.plural"), control: "complexTypes" }),
	    	$("vcl/ui/Tab", { text: locale("-/Element.plural"), control: "elements" })
	    ]),
	    $("vcl/ui/List", "simpleTypes", { autoColumns: true, source: "stypes", visible: false, onDblClick: onDblClick
	    }),
	    $("vcl/ui/List", "complexTypes", { autoColumns: true, source: "ctypes", visible: false, onDblClick: onDblClick
	    }),
	    $("vcl/ui/List", "elements", { autoColumns: true, source: "elems", visible: false, onDblClick: onDblClick })
    ])

]);