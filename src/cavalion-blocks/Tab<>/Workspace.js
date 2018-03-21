"use blocks/Blocks, override";
//"use strict";

var Blocks = require("blocks/Blocks");
var override = require("override");
var locale = window.locale;

		/*- This controller controls:
				- the page ide/Workspace [to be lazily loaded]
				- the entity Project [to be bound to this tab (and thus page)]
		*/

[[], {
	text: locale(".label")
}, [
	// ["ide/Workspace", { 
	// 	onLoad: function() {
	// 		this.setParent(this._parent._parent);
	// 	}
	// }]
]];