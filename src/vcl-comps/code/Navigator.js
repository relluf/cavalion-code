"vcl/ui/Node";

var Component = require("vcl/Component");
var Console = require("vcl/ui/Console");
var Node_ = require("vcl/ui/Node"); var count = 0;

function tree_onNodesNeeded(parent) {
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
	
	pr(this, "tree_onNodesNeeded", parent);
}

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

$("vcl-ui/Panel", { align: "client", css: styles }, [
	$("vcl-ui/Bar#search-bar", { classes: "no-border" }, [
		$("vcl-ui/Input", "search", { placeholder: "Search"})
	]),
	$("vcl-ui/Tree#tree", { onNodesNeeded: tree_onNodesNeeded }, [
		$(["./Node.fs"], "fs-node", { classes: "root-invisible", text: locale("FileSystem"), expandable: true, expanded: true }),
		$(["./ArrayExample"], "arrayExample-node", { classes: "folder", text: "Array-example" })
	])
]);