"jquery, vcl/ui/Ace, js/Method, vcl/Factory, vcl/ui/FormContainer, devtools/localStorage-pouched, pouchdb, veldoffice/models";

var Ace = require("vcl/ui/Ace");
var Method = require("js/Method");
var Factory = require("vcl/Factory");
var FormContainer = require("vcl/ui/FormContainer");

var localStorage_pouched = require("devtools/localStorage-pouched");
var Component = require("vcl/Component");
var PouchDB = require("pouchdb");

var models = require("veldoffice/models");
var info = {};

var handlers = {
	onGetStorageKey: function(forKey) {
		// console.log("devtools/App.onGetStorageKey", forKey);
	}
};
0 && Method.override(Component.prototype, {
    readStorage: function (key, callback, errback) {
        return localStorage_pouched.getItem(this.getStorageKey(key), callback, errback);
    },
    writeStorage: function (key, value, callback, errback) {
    	console.log("writeStorage", this.getUri(), key, value.length);
        try {
            var item = this.getStorageKey(key);
            var r = localStorage_pouched.setItem(item, value);
            if (typeof callback === "function") {
                callback.apply(this, [r]);
            }
        } catch(e) {
            if (typeof errback === "function") {
                errback.apply(this, [e]);
            }
        }
    },
});
Method.override(Ace.prototype, "onnodecreated", function() {
    var r = this.inherited(arguments);
    this._editor.commands.removeCommand("duplicateSelection");
    return r;
});
Method.override(Factory, {
	resolveUri: function(uri) {
		var r = js.inherited(this, arguments);
		var i = uri.indexOf("/vcl-comps/"), l = "/vcl-comps/".length;
			
		if(uri.indexOf("vcl/prototypes/$HOME/") === 0 && i !== -1) { // #
			r = String.format("vcl/prototypes/%s", uri.substring(i + l));
			// console.log("resolveUri", uri, "->", r);
		} else {
			// console.log("!resolveUri", uri, "->", r);
		}
		return r;
	}	
});
Method.override(FormContainer.prototype, {
	getBaseUri: function() {
		var r = this.inherited(arguments);
		if(r.indexOf("ws/") === 0) {
			r = r.split("/");
			r.shift(); r.shift();
			r.unshift("home");
			r = r.join("/");
		}
		return r;
	}
});

$(["App.v1.console"], { 
	title: "Code",  
	icon: "images/favicon.ico", 
	handlers: handlers, 
	onLoad: function() {
        /*- disable Ctrl+Shift+D */

        var scope = this.scope();
        scope.client.setFormUri("devtools/Main");
        
        this.on("workspace-persist", function(evt) {
            var workspace = evt.sender;
        });
        
	
		return this.inherited(arguments);
	}
});
