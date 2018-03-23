"bower_components/papaparse/papaparse";

var Parser = require("bower_components/papaparse/papaparse");

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
			// see https://www.papaparse.com/docs#config
			var options = this.getVar("options", true) || {
				// delimiter: "",	// auto-detect
				// newline: "",	// auto-detect
				// quoteChar: '"',
				// escapeChar: '"',
				// header: false,
				// dynamicTyping: false,
				// preview: 0,
				// encoding: "",
				// worker: false,
				// comments: false,
				// step: undefined,
				// complete: undefined,
				// error: undefined,
				// download: false,
				// skipEmptyLines: false,
				// chunk: undefined,
				// fastMode: undefined,
				// beforeFirstChunk: undefined,
				// withCredentials: undefined
			};
			
			var scope = this.scope();
			var arr = Parser.parse(scope.ace.getValue(), options).data;
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