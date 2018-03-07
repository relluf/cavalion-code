"pouchdb";

var PouchDB = require("pouchdb");
var db = new PouchDB("v7.7");
var db_remote = new PouchDB("https://veldapps.cloudant.com/v7_7");

var handlers = {
	onLoad: function() { 
		var scope = this.scope();
		db.changes().on('change', function() {
			scope.console.print("Changes", {'this': this, 'arguments': arguments});
		});
	},
	"#console onEvaluate": function(expr) {
		var scope = this.scope(); 
		return eval(expr);
	}
};

$([], { handlers: handlers } , [

	$("vcl-ui/Console", "console")	
	
]);