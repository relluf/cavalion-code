"use blocks/Blocks";

var B = require("blocks/Blocks");

$(["devtools/Workspace<Veldoffice>"], {
	handlers: {
		loaded() {
			var fs = this.down("#navigator #fs");
			fs.removeClass("root-invisible");
			fs.setExpanded(false);
			
			B.instantiate("veldapps/OpenLayers<PDOK-v2.default-layers>", { owner: this }).then(_ => _.setParent(this.down("#editors")));
		}
	}
}, [

	
	
]);