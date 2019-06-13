"use blocks/Blocks";

var B = require("blocks/Blocks");

$(["devtools/Workspace<Veldoffice>"], {
	handlers: {
		loaded() {
			B.instantiate(["veldapps/OpenLayers<PDOK-v2>"]);
		}
	}
}, [

	
	
]);