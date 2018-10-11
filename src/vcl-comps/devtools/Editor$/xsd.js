function asArray(arr) {
	if(arr === null || arr === undefined) return [];
	if(!(arr instanceof Array)) return [arr];
	return arr;
}
function onDblClick() { 
	var console = this.scope().console;
	this.getSelection(true).map(_ => console.log(_['@_name'], _));
	this.scope().tabs.getControl(0).setSelected(true);
}

$(["devtools/Editor<xml>"], {}, [

    $("vcl/data/Array", "ctypes"), $("vcl/data/Array", "elems"),
    
	$i("render", {
		onExecute: function() {
			var r = this.inherited(arguments);
			var root = this.vars(["root"]), scope = this.scope();
			scope.ctypes.setArray(asArray(js.get("schema.complexType", root)));
			scope.elems.setArray(asArray(js.get("schema.element", root)));
			return r;
		}
	}),
	
	$("vcl/data/Array", "ctypes"),
	$("vcl/data/Array", "elements"),

    $i("output", [
	    $i("tabs", {
	    	onChange: function() {
	    	//	j$[6].log(this.getSelectedControl(1));
	    	}
	    }, [
	    	$("vcl/ui/Tab", { text: locale("-/ComplexType.plural"), control: "complexTypes" }),
	    	$("vcl/ui/Tab", { text: locale("-/Element.plural"), control: "elements" })
	    ]),
	    $("vcl/ui/List", "complexTypes", { autoColumns: true, source: "ctypes", visible: false, onDblClick: onDblClick
	    }),
	    $("vcl/ui/List", "elements", { autoColumns: true, source: "elems", visible: false, onDblClick: onDblClick })
    ])

]);