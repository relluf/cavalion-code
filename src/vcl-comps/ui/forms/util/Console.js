"use vcl/Component";

const Method = require("js/Method");
const Component = require("vcl/Component");

const Res = require("devtools/Resources");
const H = (uri, vars) => B.i(["Hover<>", { vars: js.mi({ uri: uri }, vars)}]);
const C = (id) => j$[id];

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


/*- HM-20241010-1-method-auto-require-in-first-call
		
		let cc = Method.lazyreq("clipboard-copy", resolved => cc = resolved);
		
*/
let cc = function() {
	// const args = js.copy_args(arguments);
	return Promise.resolve(req("clipboard-copy")).then(cc_ => {
		cc = cc_;
		return cc.apply(window, arguments);
	});
};


["", {}, [
	
	["vcl/Action", ("reload"), {
		hotkey: "MetaCtrl+R",
		on(evt) {
			evt.preventDefault();
			this.app()
				.qsa("devtools/Alphaview<> #reload")
				.forEach(b => b.onclick());
		}
	}],
	
    [("#console"), {
        onEvaluate: function (expr) {
			const app = this.app();
            const ws = app.down("devtools/Workspace<>:root:selected:visible");
            // const ace = ws && ws.down("devtools/Editor<>:root < vcl/ui/Ace:visible");
            // const ace = ws && ws.qsa("devtools/Editor<>:root:visible #ace").pop();
            const ace = ws && ws.qsa("devtools/Editor<>:root:visible").map(_ => _.down("#ace")).pop();
			// ws.qsa("devtools/Editor<>:root:visible #ace")
            const host = ws && ws.qsa("devtools/Editor<>:root:visible #host").pop();
            const root = ace && ace.up().down(":root");
            const pr = this.print.bind(this);

            const open = (uri, opts) => this.bubble(
            	"openform", js.mi(js.mi(opts || {}), { uri: uri })
            );

            /* jshint evil: true */
            return eval(expr);
        }
    }]
]];