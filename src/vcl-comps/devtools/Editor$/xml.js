"fast-xml-parser";

var Parser = require("fast-xml-parser");

$([], {
    // onLoad: function() {
    //     var tab = this.up("vcl/ui/Tab");
    //     var scope = this.scope();

    //     function f() { scope.render.execute({}); }
    //     tab.on({"resource-loaded": f, "resource-saved": f});

    //     return this.inherited(arguments);
    // }
}, [
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
        state: false,
        
        onExecute: function() {
        	// this.setState(!this.getState());
        	var preview = this.scope().console;
        	preview.setVisible(!preview.isVisible());
        }
    }),
    $("vcl/ui/Console", "console", { align: "client", 
    	css: "background-color: #f0f0f0; border-left: 1px solid silver; border-right: 1px solid silver;",
    	onEvaluate: function(expr) {
    		var root = this._owner.getVar("root"), scope = this.scope();
    		return eval(expr);
    	}
    }),
    $i("ace", { 
    	align: "left", width: 475, action: "toggle-source",
    	executesAction: "none",
        onChange: function() {
        	var console = this.scope().console;
			function render() {
				var root = Parser.parse(this.getValue(), {ignoreAttributes : false});
				console.print("root", root);
				this._owner.setVar("root", root);
            }        	
        	
            this.setTimeout("render", render.bind(this), 500);
        }
    }),
]);