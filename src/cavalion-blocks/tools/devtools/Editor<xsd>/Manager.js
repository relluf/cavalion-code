var sf = String.format;

["Container", { 
	css: {
		"": "background-color: #f0f0f0; border-right: 1px solid silver;"
	},
	handlers: {
		"loaded": function() {
			var scope = this.scope(),  me = this;
			var workspaces = this.app().qsa("devtools/Workspace<>:root");
			var xsds = this.app().qsa("devtools/Editor<xsd>:root");
			
			var schema2ns = {};
			xsds.map(_ => _.vars("parser")).forEach(function(parser) {
				schema2ns[parser.schema] = parser.xmlns[''];
			});
			
			["stypes", "ctypes", "groups", "agroups", "elems", "attrs", "stars"].map(function(key) {
				scope[key].setArray(workspaces.reduce(function(arr, workspace) {
					var res = workspace.qsa("devtools/Editor<xsd>:root #" + key);
					return (arr = arr.concat(res.reduce(function(items, array) {
							return (items = items.concat(array._array || []));
						}, [])
					));
				}, []));
			});
			
			this.qsa("List<>").forEach(list => list.setOnColumnGetValue(function(column, value, rowIndex, source) {
				if(value && column._attribute === '@__') {
					var schema = value.schema.split("/");
					return schema2ns[value.schema] + ":" + schema.pop();
				}
				return value;
			}));

			this.qsa("List<>").on("dblclick", function() {
				var list = this;
				this.up("devtools/Workspace<>:root")
					.qsa("vcl/ui/Console#console")
					.map(function(console) {
						list.getSelection(true).forEach(function(xselem) {
							console.print(xselem['@_name'] || xselem.name || "?", xselem);
						});
					});
			});
		},
		"#search-input onChange": function() { 
			var me = this, scope = me.scope();
			
			function filter(object) {
				var values = me.getInputValue().toLowerCase().trim().split(" ");
				var or = values.some(function(value) {
					return Object.keys(object).some(function(key) {
						return (""+object[key]).toLowerCase().indexOf(value) !== -1;
					});
				});
				var and = values.every(function(value) {
					return Object.keys(object).some(function(key) {
						return (""+object[key]).toLowerCase().indexOf(value) !== -1;
					});
				});
				
				return !and;
			}
			
			this.setTimeout("change", function() {
				var value = me.getInputValue();
				scope.stypes.setOnFilterObject(!value.length ? null : filter);
				scope.ctypes.setOnFilterObject(!value.length ? null : filter);
				scope.elems.setOnFilterObject(!value.length ? null : filter);
				scope.attrs.setOnFilterObject(!value.length ? null : filter);
				scope.groups.setOnFilterObject(!value.length ? null : filter);
				scope.agroups.setOnFilterObject(!value.length ? null : filter);
				scope.stars.setOnFilterObject(!value.length ? null : filter);
			}, 200);
		} 
	}
}, [

	["Array", "ctypes" ],
	["Array", "stypes" ],
	["Array", "groups" ],
	["Array", "agroups" ],
	["Array", "elems" ],
	["Array", "attrs" ],
	["Array", "stars" ],
	
	["Bar", [
		["Input", "search-input", { classes: "search-top" }],
	]],
	["Tabs", "tabs", { align: "bottom", classes: "bottom" }, [
		["Tab", { control: "console", text: locale("Console") }],
		["Tab", { control: "allstars", text: "*" || locale("-/Star.symbol"), selected: true }],
		["Tab", { control: "elements", text: locale("-/Element.plural"), selected: true }],
		["Tab", { control: "attributes", text: locale("-/Attribute.plural") }],
		["Tab", { control: "complexTypes", text: locale("-/ComplexType.plural") }],
		["Tab", { control: "simpleTypes", text: locale("-/SimpleType.plural") }],
		["Tab", { control: "attributeGroups", text: locale("-/AttributeGroup.plural") }],
		["Tab", { control: "groupsl", text: locale("-/Group.plural") }]
	]],
	
	["Console", "console", { visible: false }],
	["List", "attributes", { autoColumns: true, visible: false, source: "attrs"} ],
	["List", "elements", { autoColumns: true, visible: false, source: "elems"} ],
	["List", "complexTypes", { autoColumns: true, visible: false, source: "ctypes"} ],
	["List", "allstars", { autoColumns: true, visible: false, source: "stars"} ],
	["List", "groupsl", { autoColumns: true, visible: false, source: "groups"} ],
	["List", "attributeGroups", { autoColumns: true, visible: false, source: "agroups"} ],
	["List", "simpleTypes", { autoColumns: true, visible: false, source: "stypes"} ],

]];