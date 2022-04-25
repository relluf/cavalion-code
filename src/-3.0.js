

define("js-3.0", ["js/nameOf.key-value-pair"], () => {
	
	window.locale.slashDotRepl = false; // ?

	js.nameOf.methods.set("key-value-pair", (obj) => {
		if(obj.hasOwnProperty("key") && obj.hasOwnProperty("value")) {
			return js.sf("%n: %n", obj.key, obj.value);
		}
		if(obj.hasOwnProperty("k") && obj.hasOwnProperty("v")) {
			return js.sf("%n: %n", obj.k, obj.v);
		}
		if(obj.kv instanceof Array && obj.kv.length === 2) {
			return js.sf("%n: %n", obj.kv[0], obj.kv[1]);
		}
	});
	
});

define("vcl-3.0", ["js", "vcl/Component"], (js, Component) => {
	js.nameOf.methods.set("key-value-pair", (obj) => {
		if(obj.hasOwnProperty("key") && obj.hasOwnProperty("value")) {
			return js.sf("%n: %n", obj.key, obj.value);
		}
		if(obj.hasOwnProperty("k") && obj.hasOwnProperty("v")) {
			return js.sf("%n: %n", obj.k, obj.v);
		}
		if(obj.kv instanceof Array && obj.kv.length === 2) {
			return js.sf("%n: %n", obj.kv[0], obj.kv[1]);
		}
	});
	
	// scope, up, down, ud, udown, qs, qsa, query, set, get
	js.mixIn(require("vcl/Component").prototype, {
		owner() { return this._owner; },
		owners() { 
			var r = [this], c = r[0]; 
			while((c = c._owner)) {
				r.push(c); 
			}
			return r;
		},
		parent() { return this._parent; },
		parents() { 
			var r = [this], c = r[0]; 
			while((c = c._parent)) {
				r.push(c); 
			}
			return r;
		}
	});
})

