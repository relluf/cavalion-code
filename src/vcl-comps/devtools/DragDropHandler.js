$("vcl/ui/Panel", {
	onLoad: function() {
		this.setParentNode(document.body);

		var me = this, listeners;
		this.vars("listeners", listeners = {
			dragover: function(evt) {
				
				console.log(js.get("dataTransfer.files.length", evt));
				
				evt.preventDefault();
				me.setVisible(true);
			},
			dragleave: function(evt) {
				evt.preventDefault();
				me.setVisible(false);
			},
			drop: function(evt) {
				console.log(js.get("dataTransfer.files.length", evt));
				
				evt.preventDefault();
				me.setVisible(false);
			}
		});
		
		document.addEventListener("dragover", listeners.dragover);
		document.addEventListener("dragleave", listeners.dragleave);
		document.addEventListener("drop", listeners.drop);
	},
	onDestroy: function() {
		var listeners = this.vars("listeners");
		document.removeEventListener("dragover", listeners.dragover);
		document.removeEventListener("dragleave", listeners.dragleave);
		document.removeEventListener("drop", listeners.drop);
	},
	align: "client",
	css: "background-color:rgba(45,45,45,0.8);z-index:9999999999; color:white;padding:64px; font-family:\"Lucida Grande\", Arial, sans-serif;",
	content: locale("DragDropHandler.dropHereMessage") + " [" + Date.now() + "]",
	visible: false
});