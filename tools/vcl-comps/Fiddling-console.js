"veldoffice/Session,veldoffice/EM,veldoffice/models";

var locale = window.locale;

var models = require("veldoffice/models");
var Session = require("veldoffice/Session");


$([], {
	
	handlers: {
		"#toggle-console click": function() {
			var console = this.scope().console;
			if(console.isVisible()) console.hide(); else console.show();
		},
		
		"#console loaded": function() {
			this.print("this", this);
		}
	}
	
}, [

	$("vcl/ui/Panel", {
		align: "top",
		autoSize: "height",
		css: "padding: 8px; _border-bottom: 1px solid silver;"
	}, [
		
		$("vcl/ui/Button#toggle-console", {
			content: locale("Toggle console")
		})
		
	]),
	
	$("vcl/ui/Console#console", { align: "client", height: 150, onEvaluate: function(expression) { var scope = this.scope(), me = this._owner; return eval(expression); }})
	
]);