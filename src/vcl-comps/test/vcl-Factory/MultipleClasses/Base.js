$("vcl/ui/Panel", {
	align: "client",
	css: "background-color: red;",
	onLoad: function() {
		console.log("Base.onLoad");
		return this.inherited(arguments);
	}
	
	
}, [
	
]);