$([], {
	
	content: $("@./content.html")
	
}, [

	$("vcl/Action", "show", {
		onExecute: $("@./show.onExecute.js"/*, "coffee2js"*/)
	})
	
]);