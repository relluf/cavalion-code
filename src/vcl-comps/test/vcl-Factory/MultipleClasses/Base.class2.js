$([], {
	align: "client",
	css: "background-color: blue;",
	onLoad: function() {
		console.log("Base.class2.onLoad");
		return this.inherited(arguments);
	}
}, [
	
	$("vcl/ui/Button", { content: "class2" })
	
]);