$([], {
    onLoad: function() {
        var tab = this.up("vcl/ui/Tab");
        var scope = this.scope();

        function f() { scope.render.execute({}); }
        tab.on({"resource-loaded": f, "resource-saved": f});
        
		// TODO pinpoint specific event (not all)
		this.vars("listeners", scope.source.on("event", () => { 
			scope.count.setContent(scope.source.getSize()); 
		}));
			
        return this.inherited(arguments);
    },
    onDestroy: function() {
		this.scope().source.un(this.removeVar("listeners"));
    }
}, [
	$i("ace", { align: "bottom", height: 200 }),
	$("vcl/ui/Bar", { autoSize: "height", align: "top" }, [
		$("vcl/ui/Input", "search", {
			onChange: function() {
				var me = this; me.setTimeout("update", function() {
					var value = me.getInputValue().toLowerCase();
					me.scope().source.setOnFilterObject(function(object) {
						for(var k in object) {
							var index = ("" + object[k]).toLowerCase().indexOf(value);
							if(index !== -1) { return false; }
						}	
						return true;
					});
					// me.scope().list.setSource(null);
					// me.scope().list.setSource(me.scope().source);
				}, 200);
			}
		}),
		$("vcl/ui/Element", "count", { content: "-" })
	]),
	$("vcl/data/Array#source", {
		// onLoad() {
		// },
		// onDestroy() {
		// 	debugger;
		// }
	}),
	$("vcl/ui/List#list", { 
		css: "background-color: white;",
		autoColumns: true, source: "source",
		onColumnGetValue: function(column, value, row, source) {
			// var value = this._source._array[row][column._attribute];
			if(column.getIndex() === 0) {
				return row + " - " + value;
			}
			return value;
		}
	}),
	$("vcl/Action#render", {
		onExecute: function() {
			var scope = this.scope();
			var f = [].concat;

			var arr = scope.ace.getValue().split("\n").map(function(line) { 
				var tokens = f.apply([], line.split('"').map(function(v, i) {
					return i % 2 ? v : v.split(' ');
				})).filter(Boolean);
				
				return tokens;
			});


			scope.source.setArray(arr.map(function(values) {
				var obj = {};
				for(var k in values) {
					obj["key " + k] = values[k];
					if(k === "10") {
						obj["key " + k] = parseInt((values[k].split("/").pop() || "").split("*")[0], 10) / 1000000;
					}
				}
				return obj;
			}));
		}
	})
]);