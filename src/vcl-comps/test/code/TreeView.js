var styles = {
	"background-color": "white",
	"#search-query": "width: 100%; padding: 4px; border: 1px solid silver; border-radius: 3px;",
	".{./Panel}#search": "padding: 4px 6px;"
};

$("vcl-ui/Panel", { align: "client",  css: styles }, [
	
	$("vcl-ui/Panel#search", { align: "top", autoSize: "height"}, [
		$("vcl-ui/Input#search-query", {})
	]),
	
	$("vcl-data/Array#nodes", {
		array: [
			{ id: "dashboard", text: "l:Dashboard" }, 
			{ id: "investigations", text: "l:Investigations" },
			{ id: "orders", text: "l:Orders" },
			{ id: "statistics", text: "l:Statistics" },
			{ id: "import",	text: "l:Import" },
			{ id: "config", text: "l:Configuration" },
			{ id: "admin",	text: "l:Admin" }
		]
	}),
	
	$("vcl-ui/Tree", {
		
		onNodesNeeded: function() {
			
		}
		
	}, [
		$("vcl-ui/Node#dashboard",		{ text: locale("Dashboard") }),
		$("vcl-ui/Node#invesigations",	{ text: locale("Investigations"), expandable: true }),
		$("vcl-ui/Node#orders", 		{ text: locale("Orders") }),
		$("vcl-ui/Node#statistics", 	{ text: locale("Statistics") }),
		$("vcl-ui/Node#import",			{ text: locale("Import") }),
		$("vcl-ui/Node#config", 		{ text: locale("Configuration") }),
		$("vcl-ui/Node#admin",			{ text: locale("Admin") })
	]),
	
	$("vcl-data/Array", "search-results", {}), 
	
	// $("vcl-ui/List#list-search-results", { align: "client", source: "search-results" }, [])
	
]);