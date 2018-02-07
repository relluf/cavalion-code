/* Example to show usage with some static data */

$(["./Node<vcl-data/Source>"], { 
	vars: "source: #array;",
	onNodesNeeded: function(parent) {
		console.log(this, "onNodesNeeded", parent);
		return this.inherited(arguments);
	}
	
}, [
	
	$("vcl-data/Array#array", {
		array: [
			{ _: 1, parent_: null, text: locale("Pages"), classes: "folder", expandable: true },
			{ _: 2, parent_: 1, text: locale("MainPage"), classes: "file", expandable: true },
			{ _: 3, parent_: 1, text: locale("Investigations"), classes: "file", expandable: true },
			{ _: 4, parent_: 1, text: locale("Locations"), classes: "file" },
			{ _: 5, parent_: 1, text: locale("MainPage2"), classes: "file" },
			{ _: 6, parent_: 1, text: locale("MainPage3"), classes: "file" },
			
			{ _: 12, parent_: 2, text: locale("Meetpunten"), classes: "file" },
			{ _: 13, parent_: 2, text: locale("Bodemlagen"), classes: "file" },
			{ _: 14, parent_: 2, text: locale("Monsters"), classes: "file" },
			{ _: 15, parent_: 2, text: locale("MainPage2"), classes: "file" },
			{ _: 16, parent_: 2, text: locale("MainPage3"), classes: "file" },
			
		]
		
	})
]);