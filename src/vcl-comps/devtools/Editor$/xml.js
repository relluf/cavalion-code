"fast-xml-parser";

var Parser = require("fast-xml-parser");

function asArray(arr) {
	if(arr instanceof Array) {
		return arr;
	}
	
	if(arr === null || arr === undefined) {
		return [];
	}
	
	return [arr];
}

	function resolve_xlinks(elems, elem, done, key) {
		done = done || [];
		if(done.indexOf(elem) !== -1) return;
		
		key = "@_xlink:href-resolved";
		done.push(elem);
		
		for(var k in elem) {
			if(k !== key && typeof elem[k] === "object") {
				resolve_xlinks(elems, elem[k]);
			}
		}

		var href;
		if((href = elem['@_xlink:href'])) {
			elem[key] = elems[href.substring(1)];
		}
	}

function gml(root) {
	var key = Object.keys(root)[0];
	var ns = key.split(":")[0];
	var features = asArray(root[key][ns + ":featureMember"]);
	var elems = {}, map = {}; /* return value */

	resolve_xlinks(elems, root);
	
	features.forEach(function(_) {
		var key = Object.keys(_)[0];
		var arr = (map[key] = map[key] || []);

		elems[_[key]['@_gml:id']] = _;

		arr.push(_[key]);
	});

	resolve_xlinks(elems, root);
	
	return map;
}

function sikb(root) {
	var elems = {}, key = "@_xlink:href-resolved";
	
	// function resolve_xlinks(elem, done) {
	// 	done = done || [];
	// 	if(done.indexOf(elem) !== -1) return;
	// 	done.push(elem);
		
	// 	for(var k in elem) {
	// 		if(k !== key && typeof elem[k] === "object") {
	// 			resolve_xlinks(elem[k]);
	// 		}
	// 	}

	// 	var href;
	// 	if((href = elem['@_xlink:href'])) {
	// 		elem[key] = elems[href.substring(1)];
	// 	}
	// }
	resolve_xlinks(elems, root);

	var arr = root['imsikb0101:FeatureCollectionIMSIKB0101']['imsikb0101:featureMember'];
	var entityMap = {};
	arr.forEach(function(_) {
		var key = Object.keys(_)[0];
		var arr = (entityMap[key] = entityMap[key] || []);
		
		elems[_[key]['@_gml:id']] = _;
		
		arr.push(_[key]);
	});
	resolve_xlinks(elems, root);
	return entityMap;
}

var utils = {
	sikb: sikb
};

var styles = {
	"#output": "background-color: #f0f0f0; border-right: 1px solid silver;"
};

$([], { css: styles }, [
    $("vcl/Action#toggle-source", {
        hotkey: "Shift+MetaCtrl+S",
        selected: "state", visible: "state",
        state: true,
        
        onExecute: function() {
        	this.setState(!this.getState());
        	// this.scope().ace.setVisible(this.getState());
        }
    }),
    $("vcl/Action#toggle-output", {
        hotkey: "Shift+MetaCtrl+O",
        selected: "state",
        visible: "state",
        state: true,
        
        onExecute: function() {
        	var output = this.scope().output;
        	output.setVisible(!output.isVisible());
        }
    }),
    $("vcl/Action#render", {
    	onExecute: function() {
    		var scope = this.scope();
		 	var console = scope.console;
			
			var root = Parser.parse(scope.ace.getValue(), {ignoreAttributes : false});
			this._owner.setVar("root", root);
			
			console.print("root", root);
    	}
    }),
    
    $("vcl/ui/Panel", "output", { align: "client" }, [
	    $("vcl/ui/Tabs", "tabs", { align: "bottom", classes: "bottom" }, [
	    	$("vcl/ui/Tab", { text: locale("Console"), control: "console", selected: true })
	    ]),
	    $("vcl/ui/Console", "console", { align: "client", 
	    	onEvaluate: function(expr) {
	    		var root = this._owner.getVar("root"), scope = this.scope();
	    		return eval(expr);
	    	}
	    })
    ]),
    $i("ace", { 
    	align: "left", width: 600, action: "toggle-source",
    	executesAction: "none",
        onChange: function() {
        	var scope = this.scope();
        	
        	
            scope.render.setTimeout("execute", 500);
        }
    }),
]);