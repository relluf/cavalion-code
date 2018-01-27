var Handlers = {

	"#ace loaded": function() {
		this.scope().refresh.onclick();
	},
	"#refresh click": function() {
		var ace = this.scope().ace;
		ace.setValue(js.b(localStorage['devtools/Main$workspaces'] || "<no data>"));
		ace._editor.session.setMode("ace/mode/javascript");
	},
	"#update click": function() {
		var ace = this.scope().ace;
		localStorage['devtools/Main$workspaces'] = ace.getValue();
	}
	
};


$("vcl/ui/Panel", { handlers: Handlers, align: "client" }, [
	
	$("vcl/ui/Ace#ace"),
	
	$("vcl/ui/Panel", {
		align: "top", autoSize: "height", 
		css: {
			padding: "16px", 
			'.{./Button}': "margin-right: 5px;"
		}
	}, [
		$("vcl/ui/Button#refresh", { content: "Refresh" }),
		$("vcl/ui/Button#update", { content: "Update" })
	])
	
]);