$([], {
    onLoad: function() {
        var tab = this.up("vcl/ui/Tab");
        var scope = this.scope();

        function f() { scope.render.execute({}); }
        tab.on({"resource-loaded": f, "resource-saved": f});
        
        return this.inherited(arguments);
    }
}, [
	$i("ace", { align: "bottom", height: 200 }),
	$("vcl/ui/Bar", { autoSize: "height", align: "top" }, [
		$("vcl/ui/Input", "search", {
			onChange: function() {
				var me = this; me.setTimeout("update", function() {
					var value = me.getInputValue().toLowerCase();
					scope.list.setOnFilterObject(function(object) {
						for(var k in object) {
							var index = ("" + object[k]).toLowerCase().indexOf(value);
							return index !== -1;
						}	
					});
				}, 200);
			}
		})
	]),
	$("vcl/data/Array#source"),
	$("vcl/ui/List#list", { css: "background-color: white;", align: "client", autoColumns: true, source: "source",
		onColumnGetValue: function(column, value, row, source) {
			var value = this._source._array[row][column._attribute];
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
				}
				return obj;
				var obj = {};
				headers.forEach(function(key, index) {
					obj[key] = values[index];
				});
				return obj;
			}));
		}
	})
]);