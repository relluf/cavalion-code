$("vcl/Component", {

	/*- Leaflet Overlays Control */

	'@require': ["leaflet", "vcl/ui/Element"],

	vars: {

		"overlay-element-click": function(evt) {
			var Control = require("vcl/Control");

			var element = Control.findByNode(evt.target);
			if(element !== null) {
				var map = element.getAppVar("map");
				var layer = element.getVar("layer");

    			if(evt.target.nodeName === "INPUT") {
					if(map.hasLayer(layer)) {
						map.removeLayer(layer);
					} else {
						layer.addTo(map);
					}
    			} else if(evt.target.nodeName === "A") {
    				map.fitBounds(element.getVar("layer"));
    			} else {
    				//element.toggleClass("no-clear");
    			}
			}
		},

		/**
		 *
		 */
		setMap: function(map) {
			var scope = this.getScope();
			var control = L.control({position: "topright"});
			control.onAdd = function() {
				var container = document.createElement("div");
				scope.host.setParentNode(container);
				return container;
			};

			control.addTo(map);
			this.setVar("map", map);
			this.setVar("control", control);
		},

		/**
		 *
		 */
		prepare: function(options) {
			var Element = require("vcl/ui/Element");

			var scope = this.getScope();
			var me = this;

			var content = options.content || "No content";
			var classes = options.classes || "fade loading-right";

			if(options.title !== undefined) {
				content = String.format("<b>%s</b><div>%s</div>",
						options.title, content);
			}

			var elem = new Element(this);
			elem.setContent(content);
			elem.setParent(scope.host);
			elem.addClasses(classes);
			elem.update(function() {
				elem.addClass("appear");
			});

			return {
				element: elem,

				remove: function() {
					return me.apply("remove", [elem]);
				},

				set: function(options) {
					elem.removeClass("loading-right");
    				elem.addClass("padding-right-20px");
    				elem.setContent(String.format("<div>%H <a>(%d)</a>" +
    						"<div class='item-input right-half-size-switch'>" +
    						"<label class='label-switch'><input type='checkbox'checked>" +
    						"<div class='checkbox'></div></label></div></div>",
    						options.title, options.layer.getLayers().length));

		            options.layer.addTo(me.getVar("map"));

		            elem.setVar("layer", options.layer);
		            elem.on("click", me.getVar("overlay-element-click"));
				}
			}
		}
	}


}, [
    $("vcl/ui/Group", "host", {
//		autoSize: "both",
//		autoPosition: "top-left-bottom-right",

		css: {
			/*- TODO integrate/isolate Framework 7 defs */
	   		".right-half-size-switch": {
				height: "15px",
				width: "20px",
				display: "inline-block",
				float: "right",
				transform: "scale3d(0.5, 0.5, 1) translate3d(0, 11px, 0)"
			},
//			right: "0",
//			left: "0",
//			bottom: "40px",
//			"z-index": "20000",
//			font: "10pt arial",
			"pointer-events": "none",
			".{./Element}": {
				"a": {
					"text-decoration": "underline",
					cursor: "pointer"
				},
				opacity: "0.75",
				color: "black",
				padding: "8px",
				margin: "4px",
				"pointer-events": "all",
				"background-color": "white",
				"padding-bottom": "7px",
				"float": "right",
				"clear": "both",
	    		"&.box-shadow": {
	    			"box-shadow": "0 1px 5px rgba(0,0,0,0.65)",
	    			"border-radius": "4px"
	    		},
	    		"&.no-clear": {
	    			clear: "none"
	    		},
				"&.fade": {
					opacity: "0",
					transition: "opacity 1s ease",
				},
				"&.appear": {
					opacity: "1"
				},
				"&.disappear": {

				},
				"&:hover": {
					opacity: "1"
				},
				"&.loading-right": {
					"background-image": "url(/shared/vcl/images/loading.gif)",
					"background-position": "95% center",
					"background-repeat": "no-repeat",
					"padding-right": "32px"
				},
	    		"&.padding-right-20px": {
	    			"padding-right": "20px"
	    		}
			}
		}
    }, [
        
        $("vcl/ui/Group")
        
    ])

])