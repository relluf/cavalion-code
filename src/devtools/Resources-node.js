define(function(require) {

	var $ = require("jquery");
	var js = require("js");

	var BASE_URL = "/fs/";

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
			return deferred($.ajax(adjust("") + "?index&uris=" + window.escape(uris.join(";"))))
				.then(function(res) {
						/*- TODO Current devtools/Navigator expects weird structure */
						var dirs = {};
						for(var path in res) {
							res[path].forEach(function(item) {
								// if(item.type !== "Folder") {
								var item_path = item.path.split("/");
								var dir, name = item_path.pop();
								
								item_path.unshift(path);
								dir = item_path.join("/");
								if(!dirs.hasOwnProperty(dir)) {
									dirs[dir] = [];
								}
								dirs[dir].push(js.mixIn(item, {name: name, uri: dir}));
							});
						}


						console.log("res2dir", [res, dirs]);
						
						return dirs;
					});
		},
		list: function(uri) {
			if(typeof uri === "string" && uri !== "/" && uri.charAt(uri.length - 1) !== "/") {
				uri += "/";
			}
			return deferred($.ajax(adjust(uri))).then(function(res) {
					var arr = [];
					for(var k in res) {
						var resource = res[k];
						arr.push({
							uri: uri + k, modified: resource.mtime,
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