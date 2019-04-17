"vcl/ui/Ace, js/Method, vcl/Factory, vcl/ui/FormContainer";

var Ace = require("vcl/ui/Ace");
var Method = require("js/Method");
var Factory = require("vcl/Factory");
var FormContainer = require("vcl/ui/FormContainer");

var handlers = {
	loaded: function() {
		var scope = this.scope(), me = this;
		this.open = function(uri, opts) {
			if(typeof uri === "string") {
				opts = opts || {};
				opts.uri = uri;
			} else {
				opts = uri;
				uri = opts.uri;
			}
			return new Promise(function(resolve, reject) {
				if(opts.modal === true) {
					alert("don't know about modal");
					resolve(scope.openform_modal.execute(opts));
				} else {
					// this.down("devtools/Main<>:root #open_form").execute(opts.uri, opts);
					if(!opts.workspace) {
						opts.workspace = {name: opts.name || uri};
						opts.selected = true;
					}
					var tab = me.down("devtools/Main<>:root #workspace-needed").execute(opts);
					var ws = tab._control && tab._control._form;
					if(ws) {
						resolve(ws);
					} else {
						tab._control.once("formloaded", function() {
							ws = tab._control && tab._control._form;
							resolve(ws);
						});
					}
				}
			});
		};
	}
};

(function OverridesAndOtherHacks() {
	
	// var localStorage_pouched = require("devtools/localStorage-pouched");
	// var Component = require("vcl/Component");
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
	
	/*- disable Ctrl+Shift+D */
	Method.override(Ace.prototype, "onnodecreated", function() {
	    var r = this.inherited(arguments);
	    this._editor.commands.removeCommand("duplicateSelection");
	    return r;
	});
	/*- $HOME - thingy */
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
	/*- ws/ - thingy */
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

} ());

$(["App.v1.console"], { title: "Code", icon: "images/favicon.ico", handlers: handlers }, [
	$i("client", {formUri: "./Main"})
]);