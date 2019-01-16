"entities/EM, blocks/Blocks";

var EM = require("entities/EM");
var prefix = "/bbt-1.5.3/";

$([], {
	
	onLoad: function() {
		if(EM.prefix !== prefix) {
			EM.prefix = prefix;
			this.app().qs("vcl/ui/Console#console").print("loaded-BBT-153", this);
		}
		return this.inherited(arguments);
	}
	
}, []);