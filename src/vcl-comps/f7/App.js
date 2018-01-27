"font-awesome, Framework7, Framework7.plugins/3dpanels, util/Browser, util/HtmlElement";

var Framework7 = require("Framework7");
var Browser = require("util/Browser");
var HE = require("util/HtmlElement");
var $$ = Framework7.$;

// LeftPanel, Main, 3D swiping

var Util = {
	
    initializeView: function(source, dest, opts) {
    	/*- Move .navbar and .pages childNodes */
        $$(".navbar", source).appendTo(dest.querySelector(".navbar"));
        $$(".pages", source).appendTo(dest.querySelector(".pages"));
    }
};


$(["App"], {
	
	onLoad: function() {
		var scope = this.scope();
		
		HE.addClasses(document.body, Browser.ios ? 
			"ios-statusbar visible" : 
			"visible");
			
		/*- Need to wait until the DOM nodes are available in the document */
		scope.f7body.on("nodeinserted", function() {
		    /*- Initialize app */
		    var f7 = new Framework7({
		        swipePanel: "left",
		        // swipeBackPage: false,
		        // template7Pages: true,
		        // template7Data: {},
		        animateNavBackIcon: true
		    });
		
		    /*- Add views */
		    f7.addView(".view-left", { dynamicNavbar: true });
		    f7.addView(".view-main", { dynamicNavbar: true });
		    
		    this.app().setVar("f7", f7);
		});

		return this.inherited(arguments);
	}
	
}, [

	$("vcl/ui/Panel", "f7body", { 
		align: "client",
		classes: "f7-body",
		css: "overflow: hidden;",
		content: $("@./f7body.content.html"),
		onLoad: function() {
			this.setParentNode(document.body);
		},
		onNodeInserted: function() {
			var scope = this.scope(), node = this.getNode();
			Util.initializeView(scope.main.getNode(), $$(".view-main", node)[0]);
			Util.initializeView(scope.left.getNode(), $$(".view-left", node)[0]);
		}
	}),
	
	$i("window", { visible: false }),
	
	$(["f7/Page<Main>"], "main", {
		// onLoad: function() {
		// 	alert(this.toString() + " :" + this._content);
		// 	return this.inherited(arguments);
		// }
	}),
	
	$(["f7/Page<Left>"], "left", {
		// onLoad: function() {
		// 	alert(this.toString() + " :" + this._content);
		// }
	})
	
]);
