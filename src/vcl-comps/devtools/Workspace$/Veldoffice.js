var styles = {
	// ".{Bar}": {
	// 	"> *": "margin-right:4px;",
	// 	".{Group} > *": "margin-right:4px;",
	// 	"input": "padding:4px;border-radius:3px;border:1px solid silver;"
	// },
	"#list": "background-color: white;"
};

$([], { css: styles }, [
	$(["veldoffice/Session"], { css: "background-color: #f0f0f0; direction: rtl; padding: 8px;" }, [
		$("vcl-ui/Button", { content: locale("Hide"), index: 1,
			onClick: function() { 
				this._parent.hide(); 
			}
		})
	]),
	
	$(["veldoffice/Collections"], "collections"),
	$(["veldoffice/ListOf<Onderzoek>"], "investigations", { visible: false }),
	
	$i("left-sidebar-tabs", {
		onLoad: function() {
			var scope = this.scope();
			var control = this._controls[0]._control;
			this._controls[0].setControl(scope['vo-navigator']);
			control.hide();
		}
	}),
	$i(["left-sidebar"], [
		$(["veldoffice/Navigator"], "vo-navigator")
	])
	
	
]);