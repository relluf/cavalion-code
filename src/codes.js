define(function(require) {
	return {
        load: function (name, parentRequire, onLoad, config) {
        	name = name.split(":");
        	if(name[0] === "brobhrgt") {
        		name.shift();
				console.warn("brobhrgt -> bro:bhrgt");
        		parentRequire([js.sf("veldapps-imbro/codes!bhrgt:%s", name.join(":"))], onLoad);
        	} else if(name[0] === "bro") {
        		name.shift();
        		parentRequire([js.sf("veldapps-imbro/codes!%s", name.join(":"))], onLoad);
        	} else if(name[0] === "veldoffice") {
        		name.shift();
        		parentRequire([js.sf("json!va/veldoffice/codering/locales/%s", 
        		//TODO prefer dutch codes for now
        				"nl" || window.locale.loc.split("-")[0])], function(codes) {
        					onLoad(codes[name]);
		        		});
        	}
        	// ... timeout
        }
	};
});
