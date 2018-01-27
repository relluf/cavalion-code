"jquery, vcl/ui/Ace, js/Method";

var Ace = require("vcl/ui/Ace");
var Method = require("js/Method");

$(["App.v1.console"], {
    name: "DevTools",
	title: "Code",
	icon: "images/favicon.ico",
	onLoad: function() {
        /*- disable Ctrl+Shift+D */
        Method.override(Ace.prototype, "onnodecreated", function() {
            var r = this.inherited(arguments);
            this._editor.commands.removeCommand("duplicateSelection");
            return r;
        });

        var scope = this.scope();
        scope.client.setFormUri("devtools/Main");
        
        this.on("workspace-persist", function(evt) {
            var workspace = evt.sender;
        });

		return this.inherited(arguments);
	},
	onGetStorageKey: function(forKey) {
		//console.log("onGetStorageKey", forKey);
	}
});
