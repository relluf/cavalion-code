var modules = requirejs.s.contexts._.modulesLoaded;
this.scope().ace
	// .setValue(JSON.stringify(modules));
	.setValue(String.format("\"%s\"", modules
		.sort()
		.join("\", \n\"")
	));
