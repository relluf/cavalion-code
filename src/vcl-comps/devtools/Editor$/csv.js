"lib/bower_components/papaparse/papaparse";

var Parser = require("lib/bower_components/papaparse/papaparse");

$([], {
    onLoad: function() {
        var tab = this.up("vcl/ui/Tab");
        var scope = this.scope();

        function f() { scope.render.execute({}); }
        tab.on({"resource-loaded": f, "resource-saved": f});
        
        return this.inherited(arguments);
    },
    onDispatchChildEvent: function (component, name, evt, f, args) {
        if (name.indexOf("key") === 0) {
            var scope = this.scope();
            // this.app().qs("vcl/ui/Console#console").print(name, {f: arguments.callee, args: arguments});
			if (component === scope['search-input']) {
                if ([13, 27, 33, 34, 38, 40].indexOf(evt.keyCode) !== -1) {
                    var list = scope.list;
                    if(evt.keyCode === 13 && list.getSelection().length === 0 && list.getCount()) {
                        list.print(list.getSelection(true));
                    } else if(evt.keyCode === 27) {
		                scope['search-input'].setValue("");
		                scope['search-input'].fire("onChange", [true]); // FIXME
                    }
                    if (list.isVisible()) {
                        list.dispatch(name, evt);
                    }
                    evt.preventDefault();
                }
            }
        }
        return this.inherited(arguments);
    },
    handlers: {
		"#source onFilterObject": function(obj) {
			var q = this.udown("#search-input").getInputValue().toLowerCase();
			if(q === "") return false;
			
			// var text = obj._text || (obj._text = JSON.stringify(obj).toLowerCase());
			var text = JSON.stringify(obj).toLowerCase();
			return !q.split(" ").every(function(term) {
				return text.includes(term);
			});
		},
		"#search-input onKeyDown": function() {
		},
		"#search-input onChange": function() {
			var source = this.scope().source;
			this.setTimeout(function() { source.updateFilter(); }, 500);
		}
    }
}, [
	$i("ace", { align: "bottom", height: 200 }),
	$("vcl/data/Array#source"),
	
	$("vcl/ui/Bar", [
		$("vcl/ui/Input", "search-input", { placeholder: locale("Search.placeholder") }),
		$("vcl/ui/Element", "status")
	]),
	
	$("vcl/ui/List#list", { css: "background-color: white;", align: "client", autoColumns: true, source: "source",
		onDblClick: function() {
			this.print(this.getSelection(true));	
		},
		onColumnGetValue: function(column, value, row, source) {
			var value = this._source._arr[row][column._attribute];
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