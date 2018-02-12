"bower_components/CSV-JS/csv";

var CSV = require("bower_components/CSV-JS/csv");

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
			var arr = CSV.parse(scope.ace.getValue());
			var headers = arr.shift();
			
			scope.source.setArray(arr.map(function(values) {
				var obj = {};
				headers.forEach(function(key, index) {
					obj[key] = values[index];
				});
				return obj;
			}));
		}
	})
]);