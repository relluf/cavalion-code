"use fast-xml-parser";

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
	function resolve_xlinks(elems, elem, log, done) {
		var key = "@_xlink:href-resolved", href;
		
		done = done || [];
		if(done.indexOf(elem) !== -1) return;
		done.push(elem);
		
		for(var k in elem) {
			if(k !== key && typeof elem[k] === "object") {
				resolve_xlinks(elems, elem[k], log); // <- what about done? 
			}
		}
	
		if((href = elem['@_xlink:href'])) {
			if(href.charAt(0) === '#') href = href.substring(1);
			if(!(elem[key] = elems[href])) {
				log && log.push(String.format("%s not found", href));
			}
		}
	}
	function gml(root) {
		var key = Object.keys(root)[0];
		var ns = key.split(":")[0];
		var features = asArray(root[key][ns + ":featureMember"]);
		var elems = {}, map = {}; /* return value */
		var log = [];
	
		resolve_xlinks(elems, root);
		features.forEach(function(_) {
			var key = Object.keys(_)[0];
			var arr = (map[key] = map[key] || []);
	
			elems[_[key]['@_gml:id']] = _;
	
			arr.push(_[key]);
		});
		resolve_xlinks(elems, root, log);
		
		return log.length ? { messages: log, result: map } : map;
	}

var styles = {
	"#output": "background-color: #f0f0f0; border-right: 1px solid silver;"
};

$([], { css: styles }, [
    $(("vcl/Action#toggle-source"), {
        hotkey: "Shift+MetaCtrl+S",
        selected: "state", visible: "state",
        state: true,
        
        onExecute: function() {
        	this.setState(!this.getState());
        	// this.scope().ace.setVisible(this.getState());
        }
    }),
    $(("vcl/Action#toggle-output"), {
        hotkey: "Shift+MetaCtrl+O",
        selected: "state",
        visible: "state",
        state: true,
        
        onExecute: function() {
        	var output = this.scope().output;
        	output.setVisible(!output.isVisible());
        }
    }),
    $(("vcl/Action#render"), {
    	onExecute: function() {
    		var scope = this.scope();
		 	var console = scope.console;
			
			var root = Parser.parse(scope.ace.getValue(), {ignoreAttributes : false});
			this._owner.setVar("root", root);
			
			console.print("root", root);
    	}
    }),
    
    $(("vcl/ui/Panel"), "output", { align: "client" }, [
	    $(("vcl/ui/Tabs"), "tabs", { align: "bottom", classes: "bottom" }, [
	    	$(("vcl/ui/Tab"), { text: locale("Console"), control: "console", selected: true })
	    ]),
	    $(("vcl/ui/Console"), "console", { align: "client", 
	    	onEvaluate: function(expr) {
	    		var root = this._owner.getVar("root"), scope = this.scope();
	    		var ctx = this.vars(["devtools/Editor<xml>/console-eval-ctx"]) || {};

	    		with(ctx) {
	    			return eval(expr);
	    		}
	    	}
	    })
    ]),
    $i(("ace"), { 
    	align: "left", width: 600, action: "toggle-source",
    	executesAction: "none",
        onChange: function() {
        	var scope = this.scope();
            scope.render.setTimeout("execute", 500);
        }
    }),
]);