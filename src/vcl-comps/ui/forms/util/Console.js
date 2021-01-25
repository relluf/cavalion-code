"use vcl/Component";

var Component = require("vcl/Component");

function setPaths() {
	localStorage.setItem("cavalion-js-path", "/home/Workspaces/cavalion.org/cavalion-js/src/");
	localStorage.setItem("cavalion-vcl-path", "/home/Workspaces/cavalion.org/cavalion-vcl/src/");
	localStorage.setItem("cavalion-blocks-path", "/home/Workspaces/cavalion.org/cavalion-blocks/src/");
	localStorage.setItem("cavalion-devtools-path", "/home/Workspaces/cavalion.org/cavalion-devtools/src/");
	localStorage.setItem("cavalion-ide-path", "/home/Workspaces/cavalion.org/cavalion-ide/src/");
	localStorage.setItem("veldoffice-js-path", "/home/Workspaces/veldapps.com/Veldoffice/veldoffice-js/src/");
	localStorage.setItem("veldapps-v7-path", "/home/Workspaces/veldapps.com/V7/src/");
}
function edit(component) {
	var uri = component && component._uri;
	var app = component && component.app();
	
	if(typeof uri === "string" && uri.indexOf("devtools/Workspace<") === 0) {
		var keys = Component.getKeysByUri(uri);
		return component.app().open("code").then(function(workspace) {
			return workspace.open("Workspaces/cavalion.org/cavalion-devtools/src/vcl-comps/devtools/Workspace$/" + keys.specializer + ".js");
			// .then(function(editor) {
			// });
		});
	}
}

["", {}, [
    ["#console", {
        onEvaluate: function (expr) {
            var scope = this.scope(), me = this;

			var app = this.app();
            var ws = app.down("devtools/Workspace<>:root:selected:visible");
            // var ace = ws && ws.down("devtools/Editor<>:root < vcl/ui/Ace:visible");
            // var ace = ws && ws.qsa("devtools/Editor<>:root:visible #ace").pop();
            var ace = ws && ws.qsa("devtools/Editor<>:root:visible").map(_ => _.down("#ace")).pop();
			// ws.qsa("devtools/Editor<>:root:visible #ace")
            var host = ws && ws.qsa("devtools/Editor<>:root:visible #host").pop();
            var root = ace && ace.up().down(":root");
            var pr = this.print.bind(this);

            function open(uri, opts) {
                me.bubble("openform", js.mixIn(js.mixIn(opts || {}), {
                    uri: uri
                }));
            }

            /* jshint evil: true */
            return eval(expr);
        }
    }]
]];