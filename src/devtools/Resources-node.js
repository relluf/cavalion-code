define(function(require) {

	var $ = require("jquery");
	var js = require("js");

	var BASE_URL = "/restify-fs/";

	function deferred(request) {
		return Promise.resolve(request);
		// var r = new Deferred();
		// request.then(function() {
		// 	r.callback.apply(r, arguments);
		// }).fail(function() {
		// 	var message = request.status + " - " + request.statusText;
		// 	var error = js.mixIn(new Error(message), {
		// 		request: request,
		// 		responseJSON: request.responseJSON,
		// 		responseText: request.responseText,
		// 		status: request.status
		// 	});
		// 	r.errback(error);
		// });
		// return r;
	}
	function adjust(uri) {
		return BASE_URL + (window.escape(uri) || "");
	}

	return {
		index: function(uris) {
			return deferred($.ajax(adjust("index") + "?uris=" +
					window.escape(uris.join(";"))));
		},
		list: function(uri) {
			if(typeof uri === "string" && uri.charAt(uri.length - 1) !== "/") {
				uri += "/";
			}
			return deferred($.ajax(adjust(uri))).then(function(res) {
					var arr = [];
					for(var k in res) {
						var resource = res[k];
						arr.push({
							uri: resource.path, modified: resource.mtime,
							created: resource.ctime, added: resource.atime,
							link: resource.link, size: resource.size, name: k, 
							type: resource.type
						});
					}
					return arr;
				});
		},
		get: function(uri) {
			return deferred($.ajax(adjust(uri)).then(function(res) {
					return res;	
				}));
		},
		create: function(uri, resource) {
			return deferred($.ajax(adjust(uri), {
				method: "POST",
				contentType: "application/json",
				data: JSON.stringify({
					"text": resource.text,
					"revision": resource.revision,
					"position": 0
				})
			}));
		},
		'delete': function(uri) {
		    return deferred($.ajax(adjust(uri), {
		        method: "DELETE"
		    }));
		},
		update: function(uri, resource) {
			return deferred($.ajax(adjust(uri), {
				method: "PUT",
				contentType: "application/json",
				data: JSON.stringify({
					"text": resource.text,
					"revision": resource.revision,
					"position": 0
				})
			}));
		}
	};

});