"locale";

var locale = window.locale;
var styles = { 
	padding: "8px", 
	">*": "margin-right: 5px;" 
};
var handlers = {
	
	"#read click": function() {
		var workspace = this.scope().workspace.getValue();
		
		var source = {}, 
			prefix = String.format("devtools/Workspace<%s>", workspace);
		for(var k in localStorage) {
			if(k.indexOf(prefix) === 0) {
				source[k] = localStorage[k];
			}
		}
		this.scope().source.setValue(js.b(JSON.stringify(source)));
	},
	
	"#write click": function() {
		var source = this.scope().source.getValue();
		var obj = JSON.parse(source);
		var overwritten = {};
		for(var k in obj) {
			overwritten[k] = localStorage[k];
			localStorage[k] = obj[k];
		}
		this.scope().source.setValue(
			js.b(JSON.stringify(overwritten)) + "\n\n" + source);
	}
	
};

var Controller = {
	handlers: handlers
};
var locale = window.locale;

$([], { handlers: handlers }, [
	
	$("vcl/ui/Panel", {
		align: "top",
		css: styles, 
		autoSize: "height"
	}, [
		$("vcl/ui/Input", "workspace", {
			placeholder: "Workspace"//, value: "VO"
		}),
		$("vcl/ui/Button#read", {
			content: locale("Read.localStorage")
		}),
		$("vcl/ui/Button#write", {
			content: locale("Write.localStorage")
		})
	]),
	
	$("vcl/ui/Ace", "source", { mode: "javascript" }),
	
	$("vcl/ui/Console", { align: "bottom", height: 150, onEvaluate: function(expression) { var scope = this.scope(), me = this._owner; return eval(expression); }})
]);