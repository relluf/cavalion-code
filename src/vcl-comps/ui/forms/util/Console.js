"use js";

var js = require("js");

function setPaths() {
	localStorage.setItem("cavalion-js-path", "/home/Workspaces/cavalion.org/cavalion-js/src/");
	localStorage.setItem("cavalion-vcl-path", "/home/Workspaces/cavalion.org/cavalion-vcl/src/");
	localStorage.setItem("cavalion-blocks-path", "/home/Workspaces/cavalion.org/cavalion-blocks/src/");
	localStorage.setItem("cavalion-devtools-path", "/home/Workspaces/cavalion.org/cavalion-devtools/src/");
	localStorage.setItem("cavalion-ide-path", "/home/Workspaces/cavalion.org/cavalion-ide/src/");
	localStorage.setItem("veldoffice-js-path", "/home/Workspaces/veldapps.com/veldoffice-js/src/");
	localStorage.setItem("veldapps-v7-path", "/home/Workspaces/veldapps.com/V7/src/");
}

$([], {}, [
    $i("console", {
        onEvaluate: function (expr) {
            var scope = this.scope(), me = this;

			var app = this.app();
            var ws = app.down("devtools/Workspace<>:root:selected:visible");
            var ace = ws && ws.down("devtools/Editor<>:root:visible #ace");
            var host = ws && ws.down("devtools/Editor<>:root:visible #host");
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
    })
]);