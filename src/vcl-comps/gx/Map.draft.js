$(["ui/Form"], {
	'@require': [
	    "leaflet", "leaflet/plugins/fullscreen",
        "leaflet/plugins/markercluster", "leaflet/plugins/draw",
        "leaflet/plugins/geonames", "leaflet/plugins/history",
        "leaflet/plugins/omnivore",
        "proj4leaflet", "epsg/28992",
        "Framework7",
        "features/GeoUtils",
        "text!veldoffice/Onderzoek/views/Info.views.html"],
	css: {
		"[id$=-map_panel]": {
			overflow: "hidden",
            ">div.map": "left:0;top:0;right:0;bottom:0;position:absolute;"
		},

		".item-input": {
			display: "inline-block",
			transform: "scale3d(0.5, 0.5, 1)",
			position: "relative",
			top: "-9px"
		},

		".label-switch": {
			height: "0"
		},

		"a > i.fa": {
    		// fontawesome, why is this necessary?!
			"padding-top": "7px"
		},

		".leaflet-popup-content": {
			h3: {
				"margin-bottom": "0"
			},
			".details": {
				"margin-bottom": "8px"
			},
			".actions": {
				"margin-top": "8px",
				i: {
					"font-size": "12pt"
				}
			},
			".onderzoek": {
				"span.toggle": {
					color: "red"
				}
			}
		},

		"a.a": {
			"text-decoration": "underline",
			color: "blue",
			cursor: "pointer"
		},

		".leaflet-geonames-search.leaflet-bar.leaflet-control a": {
			"padding-top": "1px"
		},

		"a.leaflet-control-home": {
			cursor: "pointer",
			"font-size": "large",
			"i.fa": {
				"padding-top": "5px"
			}
		},

		"FLAT.leaflet-bar": {
			"box-shadow": "none",
			"border": "1px solid rgba(0, 0, 0, 0.05)",
			"background-color": "#f0f0f0"
		},

		".search-box-control": {
			position: "absolute",
			left: "36px",
			'-webkit-transition': "left 0.25s ease-in",
			"text-align": "center",

			div: {
				a: {
					display: "inline-block",
					position: "absolute",
					cursor: "pointer",
					right: "0",
					top: "0",
					height: "23px",
					"border-bottom": "none",
					'border-radius': "4px"
				},
				input: {
					"border-radius": "4px",
					border: "none",
					display: "inline-block",
					padding: "5px",
					"padding-right": "26px",
					outline: "none",
					width: "400px",
					'-webkit-transition': "all 0.1s ease-in",
//					"padding-left": "0",
//					"&:focus": {
//						width: "300px",
//						"padding-left": "5px"
//					}
				},
				".results": {
					display: "none",
					"border-bottom-left-radius": "4px",
					"border-bottom-right-radius": "4px",
					"border-top": "1px solid #f0f0f0",
					"padding": "4px"
				},
				"&.results": {
					".results": {
						display: "block"
					}
				}
			}
		}
	}
}, [
    $("vcl/ui/Panel", "map_panel", {
    	align: "client",
    	content: "<div class='map'></div>",
    	onResize: function() {
    		if(!this.isVisible()) {
    			return;
    		}
    		var map = this.getVar("map");
    		map && map.invalidateSize();

    		var me = this;
    		this.setTimeout("position-sbox", function() {
	    		var sbox = me.getAppVar("map-controls.searchBox");
	    		if(sbox) {
		    		var div = sbox.getContainer();
		    		var width = parseInt(me.getComputedStyle().width, 10);

		    		div.style.left = String.format("%dpx", (width - div.clientWidth) / 2);
	    		}
    		}, 200);

    	},
    	onShow: function() {
    		var Proj4js = require("proj4");
    		var HE = require("util/HtmlElement");
    		var GeoUtils = require("features/GeoUtils");

    		function fix(node) {
				if (!L.Browser.touch) {
				    L.DomEvent.disableClickPropagation(node);
				    L.DomEvent.on(node, 'mousewheel', L.DomEvent.stopPropagation);
				} else {
				    L.DomEvent.on(node, 'click', L.DomEvent.stopPropagation);
				}
    		}
    		function cnv(latlngs) {
    			return latlngs.map(function(latlng) {
    				return [latlng.lat, latlng.lng];
    			});
    		}
    		
    		var scope = this.getScope();
    		var me = this;
    		var map = L.map(this.getChildNode(0), {
    			zoomControl: false,//!("ontouchstart" in window),
    			center: [52.05, 5.27],
    			zoom: 8
    		});
    		var tile = "http://tile.openstreetmap.org/{z}/{x}/{y}.png";
    		var osm = new L.TileLayer(tile, {
    			detectRetina: true,
    			maxZoom: 28,
    			attribution: ""//Map data &copy; 2012 OpenStreetMap contributors"
    		});
    		map.addLayer(osm);

    		var ignoreTap;
    		map.on("mousedown", function(evt) {
    			//console.log("mousedown: ignoreTap => false");
				ignoreTap = false;
    			me.setTimeout("longpress", function() {
    				console.log("longpress", evt, evt.latlng);
    				ignoreTap = true;

    				var all = [];
    				map.eachLayer(function(l) {
						if(l instanceof L.Polygon
								&& GeoUtils.pip([evt.latlng.lat, evt.latlng.lng], cnv(l._latlngs))) {
							all.push(l);
						}
					});


    				if(all.length > 0) {
    					evt.layers = all;
    				}

    			}, 250);
    		});
    		map.on("mousemove", function() {
    			//console.log("mousemove: no more longpress");
    			me.clearTimeout("longpress");
    			ignoreTap = true;
    		});
    		map.on("mouseup", function(evt) {
    			//console.log("mouseup");
    			me.clearTimeout("longpress");
    			//evt.originalEvent.stopPropagation();
    			if(!ignoreTap) {
	    			me.setTimeout("tap", function() {

	    				var all = [];
	    				map.eachLayer(function(l) {
							if(l instanceof L.Polygon
									&& GeoUtils.pip([evt.latlng.lat, evt.latlng.lng], cnv(l._latlngs))) {
								all.push(l);
							}
						});


	    				if(all.length > 0) {
	    					evt.layer = all[0];
	    					map.fitBounds(evt.layer.getBounds());
	    					//map.closePopup();
	    				}

		    		}, 0);
    			}
    		});
    		map.on("click", function(evt) {
    			if(!ignoreTap) {
	    			me.setTimeout("tap", function() {
	    				console.log("tap", evt);
	    			}, 200);
    			} else {

    			}
    			ignoreTap = false;
    		});
    		map.on("dblclick", function(evt) {
    			me.clearTimeout("tap");
				console.log("dbltap", evt);
    		});

            (new L.HistoryControl({
            	maxMovesToSave: 50,
            	orientation: "horizontal"
            })).addTo(map);
            L.control.scale({imperial:false}).addTo(map);

	    	this.setVar("map", map);
	    	this.getApp().setVars({
	    		map: map
	    	});
    	}
    }),

    $(["./Overlays"], "overlays", {

    	onLoad: function() {
    		//alert(this.getAppVar("map"));
    	}

    })

]);
