$([], {}, [

	$("vcl-ui/Panel#sidepanel", { align: "left", width: 375 }, [
		$(["Navigator"], "navigator"),
		$(["Recent"], "recent"),
		$(["Console"], "console"),
		$(["Outline"])
	]),
	
	
	$("vcl-ui/Panel#editors", {}, [
		$(["Tabs"], "editors-tabs")
	])
	

]);