"use strict";

var locale = window.locale;
var styles = {
	".{Node}.root-invisible": {
		"> *:not(ol)": "display:none;",
		"> ol": "padding-left: 0;"
	},
	"#tree": {
        "padding-left": undefined,
        "overflow-x": undefined,
        ".{Node}": {
        	"&.seperator": {
        		"border-top": "1px solid #f0f0f0", 
        		"margin-top":" 2px", 
        		"padding-top": "2px"
        	},
            ">.checkbox": {
                position: "absolute",
                right: "4px",
                // display: "none"
            },
            ">.icon": {
                width: "30px",
                "background-repeat": "no-repeat",
                "background-position-x": "right",
                "background-position-y": "2px",
            },
            "&.folder >.icon": {
                "background-image": "url(/shared/vcl/images/folder16.png)",
            },
            "&.file >.icon": {
                "background-image": "url(/shared/vcl/images/file16.png)",
            },
            ">.text>.desc": {
                "font-size": "7.5pt",
                color: "silver",
                "pointer-events": "none"
            },
            "&.opaque": {
            	">.checkbox":{
            		opacity: "0.5"
            	}
            }
        },
        "&.checking .{./Node}.folder >.checkbox": {
            display: "block"
        },
        "&.busy": {
            background: "url(/shared/vcl/images/loading.gif) no-repeat 50%,50%",
            ".{./Node}": {
                opacity: "0.5"
            }
        }
    },
};
var methods = {
	"#tree onNodesNeeded": function(parent) { 
		var node = parent, pname = "_onChildNodesNeeded";
		while(node && !node.hasOwnProperty(pname)) {
			node = node._parent;
		}
		if(node === parent) {
			return;
		}
		if(node && node.hasOwnProperty(pname)) {
			return node.fire(pname.substring(1), [parent]);
		}
	},
	"#search onUpdate": function() {
		
	}
};

["vcl-ui:Form", { css: styles, handlers: methods }, [

	["./Searchbar", {
		onUpdate: function() {
			
		}
	}],
	
	["vcl-ui:Tree", "tree", [
		["Node<devtools/Resources>", { classes: "root-invisible", expanded: true }],
		
		["Node", { text: "Node 2 (dummy)", expandable: true }]
	]]
	
]];