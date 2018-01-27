define(function() {

	var js = require("js");

	function getNamespaceUri(namespace, elements) {
		elements = [].concat(elements);
		while(elements.length) {
			var attrs = elements.pop().attributes || {};
			if(attrs['xmlns:' + namespace] !== undefined) {
				return attrs['xmlns:' + namespace];
			}
		}
		return null;
	}
	function stringify() {
		var out = [];
		this.write(function(s) {
			out.push(s);
		});
		return out.join("");
	}
	function writer(write) {
		write(String.format("<%s:%s", this.namespace, this.qualifiedName));
		
		for(var k in this.attributes) {
			if(this.attributes.hasOwnProperty(k)) {
				write(String.format(" %s=\"%H\"", k, this.attributes[k]));
			}
		}
		
		if(this.childNodes !== undefined) {
			var cn = this.childNodes;
			if(typeof cn == "function") {
				cn = cn.apply(this, []);
			}
			write(">");
			cn.forEach(function(node) {
				if(node && node.write === writer) {
					node.write(write);
				} else {
					write(node);
				}
			});
			write(String.format("</%s:%s", this.namespace, this.qualifiedName));
		} else {
			write(" /");
		}
		
		write(">");
	}	
	
	var ElementFactory = {
		newInstance: function(namespace, qualifiedName) {
			return function(attributes, childNodes) {
				if(typeof attributes === "string") {
					attributes = js.str2obj(attributes);
				}
				if(attributes instanceof Array) {
					childNodes = attributes;
					attributes = {};					
				}
				var obj = {};
				if(attributes !== undefined) {
					obj.attributes = attributes;
				}
				if(childNodes !== undefined) {
					if(childNodes instanceof Array && childNodes[0] === null) {
						childNodes[0] = "";
					}
					obj.childNodes = childNodes;					
				}
				
				return Object.create(obj, {
					namespace: {value: namespace},
					qualifiedName: {value: qualifiedName},
	
					stringify: {value: stringify},
					write: {value: writer}
				});
			};
		},
		ns: function() {
			var ns = {};
			
			for(var i = 0; i < arguments.length; ++i) {
				var s = arguments[i].split(":");
				var k = s[1].replace(/\-/g, "_");
				ns[k] = this.newInstance(s[0], s[1]);
			}
			
			return ns;
		}
	};
	
	return ElementFactory;

});