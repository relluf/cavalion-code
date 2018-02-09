/*- 

	vars: {
		source: "querystring for the array"
	}
*/
$([], {
	expandable: true, 
	vars: { item: { _: null } },
	onNodesNeeded: function(parent) { 
		parent = parent || this;
		parent.setExpandable("auto");
		
		var Node = this.constructor;
		var array = this.qs(this.getVar("source"));
		var parent_ = parent.getVar("item._");
		
		array.setOnFilterObject(function(obj) {
			return obj.parent_ !== parent_;
		});
	
		var owner = this._owner, props;
		parent.beginLoading();
console.log("nodesneeded", parent)
		array.getObjects().forEach(function(item) {
			var node = new Node(owner);
			props = props || node.defineProperties();
	
			for(var k in item) { var p;
				if(k !== "_" && k !== "parent_" && (p = props[k]) !== undefined) {
					p.set(node, item[k]);
				}
			}
			// if(!item.hasOwnProperty("expandable")) {
			// 	node.setExpandable(true);
			// }
			// if(!item.hasOwnProperty("onNodesNeeded")) {
				// node._onChildNodesNeeded = onNodesNeeded;
			// }
			
			node.setVar("item", item);
			node.setParent(parent);
console.log("child created", parent)
		});
		parent.endLoading();
console.log("parent.update()", parent)
		parent.update(function() {
console.log("callback parent.update()", parent)
			parent.updateChildren();
		});
		
		// return false; // do not bubble up to tree?
	}
});