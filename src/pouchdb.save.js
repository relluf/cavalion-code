define(function(require) {
"use strict";

	var Hash = require("util/Hash");

	var skipSave = (s) => s.startsWith("$$") || s.endsWith("$$") || s.startsWith("__") || s.endsWith("__");
	var skipHash = (s) => skipSave(s) || s.startsWith("_") || s.endsWith("_");
	
	var SALT_DBI = "nog-niet-geactiveerde-genen";
	var DBS_HOST = "dbs.veldapps.com";
	
	function va_objects_hash(object) {
		var hash = {};
		for(var k in object) {
			if(!skipHash(k)) {
				hash[k] = object[k];
			}
		}
		return Hash.md5(JSON.stringify(hash));
	}
	function va_objects_make_put(object) {
		var obj = {};
		for(var k in object) {
			if(!skipSave(k)) {
				obj[k] = object[k];
			}
		}
		return obj;
	}
	
	var db_index = {};
	function va_objects_wrapper(db) {
		var dbi = db.name;
		
		if(!(this instanceof va_objects_wrapper)) {
			return (db_index[dbi] = (db_index[dbi] || new va_objects_wrapper(db)));
		}

		var va_objects = db;
		var va_objects_timeouts = {};
		var va_objects_idx = {};
		var va_objects_listeners = {};
		
		function va_objects_create(path, proto) {
			var props = {};
			if(proto) {
				props._proto = {
					writable: false, value: proto,
					enumerable: false
				};
			}
	
			var r = Object.create(proto || Object.prototype, props);
			r._id = path;
			return (va_objects_idx[path] = r);
		}
		function va_objects_emit(path, name, args) {
			return (va_objects_listeners[path] || []).map(function(listener) {
				if(listener.name === name) {
					return listener.callback.apply(listener, args);
				}
			});
		}

		js.mixIn(this, {
			idx: va_objects_idx, listeners: va_objects_listeners,
			db: va_objects,
	
			// TODO protected methods
			throwIfNotManaged: function(obj) {
				if(this.get(obj._id) !== obj) {
					throw new Error("Object not managed");
				}
			},
			getPrototypeFor: function(path) {
				// future feature request ;-)
				return {};
			},
			fetch: function(path) {
				// Returns a Promise which will resolve when path is refreshed
				if(va_objects_idx[path] instanceof Promise) {
					console.log("v7/objs.fetch", path, "already fetching");
					return va_objects_idx[path];
				}
				
				var object = va_objects_idx[path];
				if(object === undefined) {
					object = va_objects_create(path, this.getPrototypeFor(path));
				}
				
				var OPTIONS = { revs: true, revs_info: true };
				var START = Date.now(), r = (va_objects_idx[path] = new Promise(
					function(resolve, reject) {
						va_objects.get(path, OPTIONS, function(err, obj) {
							js.mixIn(object, obj);
							if(va_objects_idx[path] instanceof Promise) {
								va_objects_idx[path] = object;
							}
							resolve(object); 
							va_objects_emit(object._id, "fetched", [object]);
							delete r.$object;
						});
					}
				));
				r.$object = object;
				
				this._fetching = r;
				this._fetching.then(function(res) {
					delete this._fetching;
					return res;
				}.bind(this));
				
				return r;
			},
	
			// sync
			get: function(path) { 
			    // Returns the same object for the same path
				if(va_objects_idx[path] instanceof Promise) {
					return va_objects_idx[path].$object;
				}
				return va_objects_idx[path] || this.fetch(path).$object;
			},
	
			// async 
			resolve: function(reference) {
				if(reference instanceof Array) {
					return Promise.all(reference.map(_ => this.resolve(_)));
				}
				if(typeof reference === "string") {
					return this.resolve(this.get(reference));
				}
				this.throwIfNotManaged(reference);
	
				return Promise.resolve(va_objects_idx[reference._id]);	
			},
			refresh: function(object) {
				if(typeof object === "string") {
					return this.refresh(this.get(object));
				}
				this.throwIfNotManaged(object);
	
				return this.fetch(object._id);
			},
			save: function(object, options) {
				if(typeof object === "string") {
					return this.save(this.get(object), options);
				}
				this.throwIfNotManaged(object);
				
				if(options === undefined) options = { delay: 250 };
				
				if(parseInt(options.delay, 10)) {
					var me = this;
					return new Promise(function(resolve, reject) {
						if(va_objects_timeouts[object._id]) {
							clearTimeout(va_objects_timeouts[object._id]);
						}
						va_objects_timeouts[object._id] = setTimeout(function() {
							delete va_objects_timeouts[object._id];
							me.save(object, { delay: false }).then(function(result) {
								resolve(result);
							}).catch(reject);
						}, options.delay);
					});
				}
	
				var hash = va_objects_hash(object);
				if(object.hash_ !== hash) {
					object.hash_ = hash;
					object.savedAt_ = Date.now();
					// console.log("V7.objects.save", object._id, object);
					return new Promise(function(resolve, reject) {
						va_objects.put(va_objects_make_put(object), function(err, result) {
							va_objects_emit(object._id, "saved", [result]);
							if(err) reject(err);
							if(result && result.ok === true) {
								object._rev = result.rev;
							}
							resolve(object);
		// console.log(js.sf("VA.objects.save %s %dms", object._id, Date.now() - object.savedAt_));
						});
					});
				} else {
		// console.log(js.sf("VA.objects.save %s ignored", object._id), "hash equals");
				}
				
				return Promise.resolve(object);
			},
			
			changed: function(object) { // isObjectChanged?
				if(typeof object === "string") {
					return this.changed(this.get(object));
				}
				return object.hash_ !== va_objects_hash(object);
			},
			on: function(object, name, callback) {
				if(typeof object === "string") {
					return this.on(this.get(object), name, callback);
				}
				
				if(this.get(object._id) !== object) {
					throw new Error("Object not managed");
				}
				
				var id = object._id;
				va_objects_listeners[id] = (va_objects_listeners[id] || []);
				va_objects_listeners[id].push({ name: name, callback: callback });
			}
		});
	}
	
	function getRemoteDb(db) {
		var PouchDB = require("pouchdb"), name = db.name.toLowerCase();
		return new PouchDB(js.sf("https://%s/ralphk-%s-%s/", DBS_HOST, name, 
				Hash.md5(SALT_DBI + name)));
		// return new PouchDB(js.sf("https://%s/%s/", DBS_HOST, Hash.md5(SALT_DBI + db.name)));
	}

	return {
		getReference: function(id, opts) {
			return va_objects_wrapper(this).get(id);
		},
		fetch: function(id, opts) {
			return this.resolve(id, opts);
		},
		resolve: function(id, opts) {
			return va_objects_wrapper(this).resolve(id, opts);
		},
		save: function(obj, opts) {
			return va_objects_wrapper(this).save(obj, opts);
		},
		pull: function(opts, callback) {
			return this.replicate.from(getRemoteDb(this), opts, callback);
		},
		push: function(opts, callback) {
			return this.replicate.to(getRemoteDb(this), opts, callback);
		}
	};	

});