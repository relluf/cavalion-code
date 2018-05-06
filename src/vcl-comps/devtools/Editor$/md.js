"markdown";
var markdown = require("markdown");

function render() {
	var root = markdown.toHTMLTree(this.getValue());
	this.up().vars("root", markdown.toHTMLTree(this.getValue()));//[].concat(root));
    this.up().qsa("#output").forEach(_ => _.setContent(markdown.renderJsonML(root)));
}        	

$([
    $i("ace", { 
    	align: "left", width: 475, action: "toggle-source",
    	executesAction: "none",
        onChange: function() { 
        	this.setTimeout("render", render.bind(this), 500);
        }
    }),
    $("vcl/Action#toggle-source", {
        hotkey: "Shift+MetaCtrl+S",
        selected: "state", visible: "state",
        state: true,
        
        onExecute: function() {
        	this.setState(!this.getState());
        	// this.scope().ace.setVisible(this.getState());
        }
    }),
    $("vcl/ui/Panel", "output", { align: "client", css: {
	    "background-color": "#f0f0f0", 
	    "border-left": "1px solid silver",
	    "border-right": "1px solid silver",
	    "font-family": "times,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'", 
	    "font-size": "12pt",
	    padding: "10px",
	    "img:not(:hover)": "max-width: 75%; max-height: 600px;",
	    "code": "border-radius:3px;font-size: 10pt;background-color:white;padding:2px;line-height:12pt;"
    } })
]);