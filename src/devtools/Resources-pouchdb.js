define(function(require) {

	var PouchDB = require("pouchdb");

	/*- 
		Hosts allDocs as a JSON resource or devtools:resource is the actual doc.
		String before first slash identifies the database.
			
			cavalion-code/vcl-comps/devtools/Workspace$/V7.js
			cavalion-docs/vcl-comps/devtools/Workspace$/V7.js

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
		list: function(uri) {
			var db = uri.split("/").shift(); 

			if(!uri.endsWith("/")) uri += "/";

 			return getDb(uri).allDocs().then(function(all) {
 				var all = all.rows.map(_ => db + "/" + _.id);
	 			return all.filter(db_id => db_id.startsWith(uri))
					.map(db_id => db_id.substring(uri.length).split("/").shift())
					.filter(function(name, index, arr) { return name.length > 0 && arr.indexOf(name) === index; })
					.map(name => ({
						name: name, uri: uri + name, 
						type: all.indexOf(uri + name) !== -1 ? "File" : "Folder",
						contentType: "application/json"
					}));
 			});
		},
		get: function(uri) {
			// TODO make a devtools/Resource.get compatible object/return value
			uri = uri.split("/");
			return getDb(uri.shift()).get(uri.join("/")).then(function(res) {
				var text = js.get("devtools:resource.text", res);
				if(!text) {
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
			return getDb(uri.shift()).remove(uri.join("/"));
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