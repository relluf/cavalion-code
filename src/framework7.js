define("framework7", [
	npm("framework7/js/framework7.bundle"),
	npm("framework7-plugin-3d-panels/dist/framework7.3dpanels"),
	"framework7/plugins/esc-is-back",
	"framework7/plugins/auto-back-title",
	npm_bang("stylesheet", "framework7/css/framework7.bundle.css"), 
	npm_bang("stylesheet", "framework7-icons/css/framework7-icons.css")
], function(Framework7, Panels) { 

	Framework7.use(Panels);
	
	return Framework7; 
});
define("framework7/util", function() {
	return {
		back: function() {
			var selector = ".navbar-current .left a.back.link";
			var modals = $$(".modal-in"), sel;
			if(modals.length > 0) {
				if(modals[modals.length - 1].qsa(".page-previous").length === 0) {
					return modals[modals.length - 1].f7Modal.close();
				}
				sel = ".popup.modal-in .view " + selector;
			} else {
				sel = (f7a.panel.left.opened ? ".panel-left " : ".view-main ") + selector;
			}
			var back = document.body.qs(sel);
			if(back) {
				back.click();
			} else {
				if(f7a.panel.left.opened) {
					f7a.panel.left.close();
				} else {
					f7a.panel.left.open();
				}
			}
		}
	};
});
define("framework7/plugins/auto-back-title", function() {
	
	var selectors = {
		back: ".navbar .back.link span:not(.static)",
		title: ".title"
	};

    /*- Link title of back button to title of page */
    var previous;
    document.addEventListener("page:mounted", function (e) {
    	if(e.detail.direction !== "forward") {
			// console.log("page:mounted - no direction", e.detail);
    	} else {
    		previous = e.detail.pageFrom;
    	}

    	if(!previous) return;
    	
    	var current = e.detail;
        var back = current.navbarEl && current.navbarEl.down(selectors.back);

        if(back && previous.navbarEl) {
            back.innerHTML = previous.navbarEl.down(selectors.title).innerHTML;
        }
    });
    
    return selectors;
});
define("framework7/plugins/esc-is-back", ["framework7/util"], function() {  // Element?
	document.addEventListener("keyup", function(e) {
		if(e.keyCode === 27 && typeof $$ !== "undefined") {
			require("framework7/util").back();
		}
	});
});

define("Framework7", ["framework7"], (framework7) => framework7);
define("template7", ["Framework7"], function() {
	
	Template7.registerHelper("l", function (str) {
		if(arguments.length > 1) {
			str = js.copy_args(arguments);
			
			if(str[0] !== ">") {
				str.pop();
				str = str.join("");
			} else {
				str.shift(); // [thisObj, entity, factory, options]
				var f = window.locale(String.format("%s.factories/%s", str[1], str[2]));
				if(typeof f === "function") {
					return f.apply(str[0], [str[1], str[2], str[3]]);
				}
			}
		}
		
	    if (typeof str === "function") str = str.call(this);
	    
	    if(typeof window.locale === "function") {
	    	return window.locale(str);
	    }
	    
	    return str;
    });
    Template7.registerHelper("e", function(context, options) {
    	var joined;
		if(arguments.length > 1) {
			context = js.copy_args(arguments);
			options = context.pop();
			joined = context = context.join(".");
		    context = js.get(context);
		} else {
	    	if (typeof context === "function") context = context.call(this);
		}

		return String.escapeHtml(options.fn(context));
    });
    Template7.registerHelper("w", function(context, options) {
    	var joined;
		if(arguments.length > 1) {
			context = js.copy_args(arguments);
			options = context.pop();
			joined = context = context.join("");
			try {
		    	context = eval(context);
		    } catch(e) {
		    	context = js.get(context);
		    }
		}
		
    	if (typeof context === "function") context = context.call(this);

		return options.fn(context);
    });
    Template7.registerHelper("wjs", function(expression, options) {
        if (typeof expression === "function") { expression = expression.call(this); }
    	
        // 'with': function (context, options) {
        //     if (isFunction(context)) { context = context.call(this); }
        //     return options.fn(context);
        // },
        
        var func;
        if (expression.indexOf('return')>=0) {
            func = '(function(){'+expression+'})';
        }
        else {
            func = '(function(){return ('+expression+')})';
        }
        return options.fn(eval.call(this, func).call(this));
    });
    
	return {
		load: function(name, parentRequire, load, config) {
			/** @see http://requirejs.org/docs/plugins.html#apiload */
			parentRequire(["text!" + name], function(source) {
				load(Template7.compile(source));
			});
		}
	};
});
