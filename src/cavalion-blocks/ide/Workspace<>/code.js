["Container", { 
	
	/*- Not perfect, should get rid of the wrapping container and the hack of resetting the uri. Basically blocks/Factory's handling of vcl-comps:... must be improved. But for now, het doel heiligt de middelen. */
	
	css: "background-color:white; border: 3px solid red;", 
	
	onLoad: function() {
		this._components[0]._uri = "devtools/Workspace<code>";
		return this.inherited(arguments);
	}
}, [
	["vcl-comps:devtools/Workspace"]
]];