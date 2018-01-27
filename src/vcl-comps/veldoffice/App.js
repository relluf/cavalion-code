"jquery, vcl/ui/Ace, js/Method";

$(["App"], {
    name: "Veldoffice",
	title: "Veldoffice",
//	icon: "images/favicon.ico",
	onLoad: function() {
	    var $ = require("jquery");
	    var scope = this.getScope();

	    function ready() {
	        scope.client.setFormUri("veldoffice/Geoview2");
	    }

        $.ajax("/office-rest/v1/session").success(function(resp) {
            resp = JSON.parse(resp);
            if(resp.length === 0) {
    	        $.ajax("/office-rest/v1/session", {
    	            method: "POST",
    	            contentType: "application/json",
    	            data: JSON.stringify({
    	                username: "ralph",
    	                password: ""
    	            })
    	        }).success(ready);
            } else {
                ready();
            }
        });
		return this.inherited(arguments);
	}
}, [
    $i("client", {
        formUri: "veldoffice/Geoview2"
    })
]);