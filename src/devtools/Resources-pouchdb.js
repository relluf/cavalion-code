define(function(require) {

	var PouchDB = require("pouchdb");

	/*- 
		Hosts allDocs as a JSON resource or devtools:resource is the actual doc.
		String before first slash identifies the database.
			
			cavalion-code/vcl-comps/devtools/Workspace$/V7.js
			cavalion-docs/vcl-comps/devtools/Workspace$/V7.js
			
		### 2019-10-08
		- list() now also returns /

	*/
	
	var dbs = {};
	function getDb(uri) {
		var name = uri.split("/").shift();
		if(dbs[name] === undefined) {
			dbs[name] = new PouchDB(name);
		}
		return dbs[name];
	}

	return {
		dbs: dbs,
		index: function(uris) {
			return Promise.resolve([]);
		},
		list: function(parent) {
			var db = parent.split("/").shift(); 
			
			if(!parent.endsWith("/")) parent += "/";

 			return getDb(parent).allDocs().then(function(res) {
 				var all = res.rows.map(_ => db + "/" + _.id);
 				return all.filter(uri => uri.startsWith(parent))
					.map(uri => uri.substring(parent.length).split("/").shift())
					.filter(function(name, index, arr) { return arr.indexOf(name) === index; })
					.map(name => ({
						name: name, uri: parent + (name || "/"), 
						type: all.indexOf(parent + name) !== -1 ? "File" : "Folder",
						expandable: true,
						contentType: "application/json"
					}));
 			});
		},
		get: function(uri) {
			// TODO make a devtools/Resource.get compatible object/return value
			uri = uri.split("/");
			return getDb(uri.shift()).get(uri.join("/")).then(function(res) {
				var text = js.get("devtools:resource.text", res);
				if(typeof text !== "string") {
					text = js.b(JSON.stringify(res));
				}
				return res && {
					revision: res._rev,
					contentType: "application/json",
					text: text
				};
			});
		},
		create: function(uri, resource) {
			uri = uri.split("/");
			return getDb(uri.shift()).put({ 
				_id: uri.join("/"), 
				'devtools:resource': { text: resource.text }
			});
		},
		'delete': function(uri) {
			uri = uri.split("/");
			var db = getDb(uri.shift());
			return db.get(uri.join("/")).then(function(doc) {
				return db.remove(doc);
			});
		},
		update: function(uri, resource) {
			uri = uri.split("/");
			return getDb(uri.shift()).put({ 
				_id: uri.join("/"), 
				_rev: resource.revision,
				'devtools:resource': { text:resource.text }
			});
		}
	};
});