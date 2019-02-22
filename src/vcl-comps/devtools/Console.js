"use blocks/Factory!Console";

var Console = require("blocks/Factory!Console");

$("vcl/ui/Form", { 
	activeControl: "console",
	// onLoad: function() {
	// 	var console = Console.newInstance(this, this._uri, { loaded: function() {}})
	// 		.setProperties({
	// 			align: "client", 
	// 			classes: "no-time bg-white",
	// 			parent: this
	// 		});
	// 	this.print = function() {
	// 		return console.print.apply(console, arguments);
	// 	};
	// }
}, [
	// Console.$("console", {align: "client", classes: "no-time",
 //   	onLoad: function() {
 //   		var me = this;
	// 		this._owner.print = function() {
	// 			return me.print.apply(me, arguments);
	// 		};
	// 		this.print("this.up()", this.up());
 //   	},
 //   	onEvaluate: function(expr) {
 //   		return eval(expr);
 //   	}
	// })
	["vcl/ui/Console", "console", {
		classes: "no-time",
		onLoad: function() {
			this.print("ready", this);
		}
	}]
]);
