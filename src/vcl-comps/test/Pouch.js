$([], {}, [

	$("vcl/ui/List#list", { autoColumns: true, source: "pouch" }),
	
	$("vcl/data/Pouch#pouch", {
		overrides: {
			setArray: function(arr) {
				var r = this.inherited(arguments);
				this.getPage(0);
				this.setTimeout(function() {
					
					this.updateFilter();
					this.scope().list.updateColumns();
					
				}.bind(this), 200);
				
				return r;
			}
		},
		
		dbName: "v7.7",
		_onFilterObject: function(obj) {
			return !obj._id || obj._id.split(":")[0] !== "Bodemlaag";
		}
	})
	
]);