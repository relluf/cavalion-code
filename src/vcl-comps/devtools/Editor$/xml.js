"fast-xml-parser";

var Parser = require("fast-xml-parser");

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
			function render() {
				this.scope().render.execute({});
            }        	
            this.setTimeout("render", render.bind(this), 500);
        }
    }),
]);