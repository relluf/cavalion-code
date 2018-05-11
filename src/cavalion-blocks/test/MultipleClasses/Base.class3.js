["", {
	align: "client",
	css: "background-color: yellow;",
	onLoad: function() {
		console.log("Base.class3.onLoad");
		return this.inherited(arguments);
	}
}, [
	
	["vcl-ui:Button", { content: "class3" }]
	
]];