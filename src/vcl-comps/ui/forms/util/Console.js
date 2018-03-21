"use js";

var js = require("js");

function req() {
	if(arguments.length == 1) {
    	try {
    		return require(arguments[0]);
    	} catch(e) {}
	}
    var d = new Deferred();
    require.apply(this, [js.copy_args(arguments),
        function () {
            d.callback.apply(d, js.copy_args(arguments));
        },
        function (err) {
            d.errback(err);
        }
    ]);
    return d;
}

$([], {}, [
	$i("console", {
		
		// height: ["stored"],
		
		onEvaluate: function (expr) {
		    var scope = this.scope(), app = this.app(), me = this;
		    var pr = this.print.bind(this);
		
		    function open(uri, opts) {
		        me.bubble("openform", js.mixIn(js.mixIn(opts || {}),
		            {uri: uri}));
		    }
		
		    /* jshint evil: true */
		    return eval(expr);
		}
	})	
]);