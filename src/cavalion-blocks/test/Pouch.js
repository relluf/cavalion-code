"use strict";

var letters = "aaaaaabbccdddeeeeeeeeefgghiiijjkklllmmnnnnnnoooooppqrrssttuuuuuvvwxyzzz";
function randomWord() {
	var n = Math.random() * 10;
	if(n > 7) {
		n += Math.random() * 5;
	}
	
	n = parseInt(n) + 1;
	
	var r = "", p;
	while(n-- >= 0) {
		p = parseInt(Math.random() * letters.length);
		r += letters.substring(p, p + 1);
	}
	
	return r.substring(0, 1).toUpperCase() + r.substring(1);
}


["Container", [
	
	["vcl-data:Pouch", "pouch", {
		dbName: "test",
		// onLoad: function() {
		// 	var arr = [];
		// 	for(var i = 0; i < 100000; ++i) {
		// 		arr.push({
		// 			_id: String.format("%020d", 6000000 + (i - 2) * 3 + parseInt(Math.random(6))),
		// 			index: i,
		// 			name: randomWord() + " " + randomWord().toLowerCase()
		// 		});
		// 	}
		// 	console.log(this._db.bulkDocs(arr));
		// }
	}],
	
	["Bar", [
		["vcl-ui:Input"]	
	]],

	["vcl-ui:List", { source: "pouch" }, [
		["vcl-ui:ListColumn", {  attribute: "name" }],
		["vcl-ui:ListColumn", {  attribute: "index" }],
		["vcl-ui:ListColumn", { 
			attribute: "_id",
			onGetValue: function(value, row, source) {
				if(value === undefined) value = "...";
				return String.format("%d - %s", row, value);
			}
		}]
	]]	
	
]];