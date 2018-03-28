

var Handlers = {
	"#ace loaded": function() {
		this.scope().refresh.onclick();
	},
	"#refresh click": function() {
		var all = {};
		for(var k in localStorage) {
			all[k] = localStorage[k];
		}
		var ace = this.scope().ace;
		ace.setValue(js.b(JSON.stringify(all)));
		ace._editor.session.setMode("ace/mode/javascript");
	}
};


$("vcl/ui/Panel", { handlers: Handlers, align: "client" }, [
	$("vcl/ui/Ace#ace"),
	$("vcl/ui/Bar", {
		// css: {
		// 	padding: "16px", 
		// 	'.{Button}': "margin-right: 5px;"
		// }
	}, [
		$("vcl/ui/Button#refresh", { content: "Refresh" }),
	])
	
]);