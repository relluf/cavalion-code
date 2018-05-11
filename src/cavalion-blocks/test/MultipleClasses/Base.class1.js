["", {
	align: "client",
	css: "background-color: green;",
	onLoad: function() {
		console.log("Base.class1.onLoad");
		return this.inherited(arguments);
	}
}, [
	
	["vcl-ui:Button", { content: "class1" }]
	
]];