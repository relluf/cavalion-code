$("vcl/ui/Form", { activeControl: "console" }, [
    $("vcl/ui/Console#console", { align: "client", classes: "no-time",
    	onLoad: function() {
    		var me = this;
			this._owner.print = function() {
				return me.print.apply(me, arguments);
			};
    	}
    })
]);