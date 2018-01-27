$(["ui/Form"], {
	'@require': ["leaflet", "leaflet/plugins/fullscreen",
	             "leaflet/plugins/markercluster", "leaflet/plugins/draw",
	             "leaflet/plugins/geonames", "leaflet/plugins/history",
	             "leaflet/plugins/omnivore",
	             "proj4leaflet", "epsg/28992",
	             "Framework7",
	             "features/GeoUtils",
	             "text!veldoffice/Onderzoek/views/Info.views.html"],

	css: {
		"[id$=-map_panel]": {
			overflow: "hidden"
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

		// fontawesome, why is this necessary?!
		"a > i.fa": {
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
    	css: {
    		">div.map": "left:0;top:0;right:0;bottom:0;position:absolute;"
    	},
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
    		var HE = require("util/HtmlElement")
    		var GeoUtils = require("features/GeoUtils");

    		var scope = this.getScope();
    		var me = this;

    		var map = L.map(this.getChildNode(0), {
    			zoomControl: !("ontouchstart" in window),
    			center: [52.05, 5.27],
    			zoom: 8
    		});

    		var tile = "http://tile.openstreetmap.org/{z}/{x}/{y}.png";
    		var osm = new L.TileLayer(tile, {
    			detectRetina: true,
    			maxZoom: 28,
    			attribution: "Map data &copy; 2012 OpenStreetMap contributors"
    		});

    		map.addLayer(osm);
// -- POPUP --- begin ---
    						function toggleMeetpunten(evt, onderzoek, meetpunten, obj) {
								if(meetpunten) {
									if(map.hasLayer(meetpunten)) {
										map.removeLayer(meetpunten);
									} else {
										map.addLayer(meetpunten);
									}
									return;
								}

								var EM = require("entities/EM");
								var Proj4js = require("proj4");

								//var map = app.getVar("map");
								var layersControl = layersc;//app.getVar("map-controls.layers");

								EM.query("../gx//veldoffice:Meetpunt",
									"code,type.omschrijving,boormeester,datum,xcoord,ycoord,einddiepte," +
										"max:bodemlagen.onderkant", {
									where: EM.eb.eq("onderzoek", onderzoek),
									groupBy: "."
								}).addCallback(function(res) {
									var source = new Proj4js.Proj("EPSG:28992");
									var dest = new Proj4js.Proj("WGS84");

									evt.target.disabled = false;

									var markers = new L.MarkerClusterGroup({
										maxClusterRadius: 10,
										disableClusteringAtZoom: 15
									});

									meetpunten = markers;
									onderzoek.setAttributeValue("@meetpunten", markers);

									var opts = { draggable: true };
									res.tuples.forEach(function(tuple, i) {
										var pt = {x:tuple[4], y:tuple[5]};
										Proj4js.transform(source, dest, pt);
										var marker = new L.Marker([pt.y, pt.x], opts);
										markers.addLayer(marker);
										marker.data = res.instances[i];
										// L.marker([pt.y, pt.x]).addTo(map);
									});

									map.addLayer(markers);
									layersControl.addOverlay(markers, String.format("Meetpunten %H (%d) <a href='#'>[...]</a>",
											obj.naam, res.count));

									markers.on("click", function (evt) {
										var meetpunt = evt.layer.data;
										var obj = meetpunt._values;
										var html = String.format("<div class='meetpunt'>" +
												"<h3>Meetpunt %H</h3>" +
												"<div class='details'>" +
													"<div>Type: %H</div>" +
													"<div>Einddiepte: %f m-mv</div>" +
													"<div>Boormeester: %H</div>" +
												"</div>" +
										   		"<div class='actions'>" +
											   		//"<i class='fa fa-arrows'></i> " +
											   			"<a class='a fit-bounds'>Ga &gt;</a>&nbsp;&nbsp;&nbsp;" +
											   		"<a class='a edit'>Verplaatsen</a>&nbsp;&nbsp;&nbsp;" +
											   		//"<i class='fa fa-info-circle'></i> " +
											   			"<a class='a details'>Details &gt;</a>" +
											   	"</div>" +
											"</div>",
											meetpunt.getAttributeValue("code"),
											meetpunt.getAttributeValue("type.omschrijving"),
											meetpunt.getAttributeValue("max:bodemlagen.onderkant"),
											meetpunt.getAttributeValue("boormeester")
										);
										map.openPopup(html, evt.latlng, {
											closeButton: false,
											offset: [0, -20]
										});
									});

									markers.on("clusterclick", function (a) {
									    //console.log("cluster " + a.layer.getAllChildMarkers().length);
									});
								});
    						}

    				function popup(evt) {
    					if(evt.layers.length === 1) {
    						popup_one(evt);
    					} else {
    						popup_multiple(evt);
    					}
    				}

    				function popup_multiple(evt) {
    					var popup = L.popup({
    						closeButton: true
    					})
    				}

		            function popup_one(evt) {
		            	var layer = evt.layers[0];
		            	var feature = layer.feature;

						var popup = L.popup({
							//closeButton: false
						});

	            		var onderzoek = feature.properties.instance;
		            	var obj = onderzoek._values;
		            	var meetpunten = obj["@meetpunten"];

		            	popup
						   .setLatLng(evt.latlng)
						   .setContent(String.format("<div class='onderzoek'><h3>%H</h3>" +
						   		"<div class='details'>" +
						   			"<div>Projectcode: %H</div>" +
						   			"<div>Meetpunten: %d " +
						   				"<div class=\"item-input\">" +
						   					"<label class=\"label-switch\">" +
						   						"<input type=\"checkbox\" %s>" +
												"<div class=\"checkbox\"></div>" +
											"</label>" +
										"</div>" +
						   			"</div>" +
						   			"<div>Datum: 12/5/2015</div>" +
						   			"<div>Samenvatting:</div>" +
						   		"</div>" +
						   		"<textarea style='height:110px;'>Veldwerk samenvatting</textarea>" +
						   		"<div class='actions'>" +
							   		//"<i class='fa fa-arrows'></i> " +
							   		"<a class='a fit-bounds'>Opslaan</a><br>" +
							   		"<a class='a fit-bounds'>Ga &gt;</a>&nbsp;&nbsp;&nbsp;" +
							   		"<a class='a edit'>Docs (6)</a>&nbsp;&nbsp;&nbsp;" +
							   		//"<i class='fa fa-info-circle'></i> " +
							   		"<a class='a details'>Foto's (13)</a>" +
						   		"</div></div>", obj.naam || "<geen naam>", obj.projectcode,
						   			obj['count:meetpunten'], map.hasLayer(meetpunten) ? "checked" : ""))
						   .openOn(map);

						popup['@layer'] = evt.layer;

						L.DomEvent.on(popup._contentNode, 'click', function(evt) {
							if(evt.target.nodeName === "A") {
								var cl = evt.target.className;
								if(cl.indexOf("fit-bounds") !== -1) {
									map.fitBounds(layer);
								} else if(cl.indexOf("edit") !== -1) {
					            	if(vars.current === layer) {
				            			vars.current.editing.disable();
				            			delete vars.current;
					            	} else {
					            		if(vars.current !== undefined) {
					            			vars.current.editing.disable();
					            		}
					            		vars.current = layer;
					            		layer.editing.enable();
					            	}
								} else if(cl.indexOf("details") !== 1) {
									if(scope.details.isVisible()) {
										scope.details.hide();
									} else {
										scope.details.show();
									}
								}
								popup._close();
							} else if(["BUTTON", "INPUT"].indexOf(evt.target.nodeName) !== -1) {
								toggleMeetpunten(evt, onderzoek, obj["@meetpunten"], obj);
							} else {
								//console.log(evt.target.nodeName);
							}
						});

		            	return popup;
		            }


// -- POPUP --- end ---


    		function cnv(latlngs) {
    			return latlngs.map(function(latlng) {
    				return [latlng.lat, latlng.lng];
    			});
    		}

    		var ignoreTap;
    		map.on("mousedown", function(evt) {
    			//console.log("mousedown");
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
    					popup(evt);
		    			map.closePopup = function() {
		    				// block once
		    				delete map.closePopup;
		    			}
    				}

    			}, 250);
    		});

    		map.on("mousemove", function() {
    			//console.log("mousemove");
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



    		function fix(node) {
				if (!L.Browser.touch) {
				    L.DomEvent.disableClickPropagation(node);
				    L.DomEvent.on(node, 'mousewheel', L.DomEvent.stopPropagation);
				} else {
				    L.DomEvent.on(node, 'click', L.DomEvent.stopPropagation);
				}
    		}

//-- HOME --- begin ---
            var homeControl = L.control({
            	position: "topleft"
            });
			homeControl.onAdd = function(map) {
			    this._div = L.DomUtil.create("div", "leaflet-bar");

			    this._div.innerHTML = "<a class='leaflet-control-home' title='Go Home'>" +
			    		"<i class='fa fa-home'></i></a>";

			    this._div.addEventListener("click", function() {
			    	map.setView([52.05, 5.27], 8)
			    });
			    return this._div;
			}
			homeControl.addTo(map);
			fix(homeControl.getContainer());
//-- HOME --- end ---

//-- SEARCH BOX --- begin ---
            var sboxControl = L.control({
            	position: "topleft"
            });
			sboxControl.onAdd = function(map) {
			    this._div = L.DomUtil.create("div", "search-box-control");
			    this._div.innerHTML = "<div class='leaflet-bar'>" +
			    		"<input placeholder='Zoeken op onderzoek naam en projectcode' type='text'>" +
			    		"<a title='Search'><i class='fa fa-search'></i></a>" +
			    		"<div class='results'></div></div>";

			    this._div.addEventListener("click", function(evt) {
			    	if(["I", "A"].indexOf(evt.target.nodeName) !== -1) {
			    		this.querySelector("input").focus();
			    	}
			    });

			    this._div.addEventListener("keypress", function(evt) {
			    	if(evt.keyCode === 13) {
			    		scope.search.execute(this.querySelector("input").value);
			    		this.querySelector("input").select();
			    	}
			    });

			    setTimeout(function() {
			    	this._div.querySelector("input").focus();
			    }.bind(this), 0);

			    return this._div;
			}
			sboxControl.addTo(map);
			fix(sboxControl.getContainer());

//-- SEARCH BOX --- end ---

            var fullscreenControl = L.control.fullscreen();
            fullscreenControl.addTo(map);

            var historyControl = new L.HistoryControl({
            	maxMovesToSave: 50,
            	orientation: "horizontal"
            });
            historyControl.addTo(map);

            var layersControl = L.control.layers();
            layersControl.addTo(map);

			scope.overlays.apply("setMap", [map]);

            var scaleControl = L.control.scale({imperial:false});
            scaleControl.addTo(map);

//-- DRAW PLUGIN --- begin ----

			// Initialise the FeatureGroup to store editable layers
			var drawnItems = new L.FeatureGroup({
				style: {
				    "color": "#ffabde",
				    "weight": 5,
				    "opacity": 0.65
				},
			});
			map.addLayer(drawnItems);

			// Initialise the draw control and pass it the FeatureGroup of editable layers
			var drawControl = new L.Control.Draw({
			    edit: {
			        featureGroup: drawnItems,
			        edit: false
			    },
			    draw: {
			    	polyline: false
			    }
			});
			drawControl.addTo(map);


			map.on('draw:created', function (e) {
			    var type = e.layerType, layer = e.layer;

			    if (type === 'marker') {
			        // Do marker specific actions
			    }

			    // Do whatever else you need to. (save to db, add to map etc)
			    map.addLayer(layer);
			    drawnItems.addLayer(layer);
			    layer.editing.enable();
			});

//			map.on("draw:drawstart draw:deletestart draw:editstart", function(e) {
//				me.clearTimeout("remove-draw");
//			});
//
//			map.on("draw:drawend draw:deletestop draw:editstop", function(e) {
//				me.setTimeout("remove-draw", function() {
//					drawControl.removeFrom(map);
//				}, 200);
//			});

//-- DRAW PLUGIN --- end ----

//-- GEONAMES PLUGIN --- begin ---
			var geonamesControl = new L.Control.Geonames({
			    username: 'cbi.test',  // Geonames account username.  Must be provided
			    zoomLevel: 18,  // Max zoom level to zoom to for location.  If null, will use the map's max zoom level.
			    maxresults: 5,  // Maximum number of results to display per search
			    className: 'fa fa-crosshairs',  // class for icon
			    workingClass: 'fa-spin',  // class for search underway
			    featureClasses: ['A', 'H', 'L', 'P', 'R', 'T', 'U', 'V'],  // feature classes to search against.  See: http://www.geonames.org/export/codes.html
			    baseQuery: 'isNameRequired=true',  // The core query sent to GeoNames, later combined with other parameters above
			    position: 'topleft'
			});
			map.addControl(geonamesControl);

			fix(geonamesControl.getContainer());

//-- GEONAMES PLUGIN --- end ---


            var Ajax = require("util/Ajax");

//-- GEOJSON LAYER --- begin ---
            Ajax.get("src/features/gwklicapp/Melding/features-total", function(resp, req) {
            	resp = JSON.parse(resp);

            	var klics = L.Proj.geoJson(resp, {
					style: {
					    "color": "#ff7800",
					    "weight": 5,
					    "opacity": 0.65
					},
	            	onEachFeature: function(feature, layer) {
	            		//console.log(feature, layer);
	            	}
				});
            	//klics.addTo(map);

            	klics.on("click", function(evt) {
            		window.evt = evt;
            		map.fitBounds(evt.layer);
            	});

            	window.klics = klics;
            	layersControl.addOverlay(klics, "Klics");

            	00 && Ajax.get("src/features/veldoffice/Meetpunt/11412.json", function(resp, req) {
            		resp = JSON.parse(resp);

					var source = new Proj4js.Proj("EPSG:28992");
					var dest = new Proj4js.Proj("WGS84");

					var markers = new L.MarkerClusterGroup({
						maxClusterRadius: 20,
						disableClusteringAtZoom: 17
					});
					var opts = { draggable: true };
					resp.forEach(function(tuple, i) {
						if(i < 50000) {
							var pt = {x:tuple[4], y:tuple[5]};
							Proj4js.transform(source, dest, pt);
							var marker = new L.Marker([pt.y, pt.x], opts);
							markers.addLayer(marker);
							marker.data = tuple;
							// L.marker([pt.y, pt.x]).addTo(map);
						}
					});
			//		map.addLayer(markers);

					layersControl.addOverlay(markers, "Meetpunten");

					markers.on("click", function (evt) {
						var tuple = evt.layer.data;
						var html = String.format("<h1>%H</h1><b>%H</b><br>%H",
								tuple[2], tuple[1], tuple[0]);
						map.openPopup(html, evt.latlng, {
							closeButton: false,
							offset: [0, -20]
						});
					});

					markers.on("clusterclick", function (a) {
					    //console.log("cluster " + a.layer.getAllChildMarkers().length);
					});

            	});

			});
//-- GEOJSON LAYER --- end ---

	    	this.setVar("map", map);

	    	this.getApp().setVars({
	    		map: map,
	    		layers: {
	    			edit: drawnItems
	    		},
	    		"map-controls": {
	    			draw: drawControl,
	    			layers: layersControl,
	    			searchBox: sboxControl
	    		}
	    	});

	    	window.map = map;
	    	window.drawc = drawControl;
	    	window.layersc = layersControl;

	    	/* TODO */
	    	setInterval(function() {
		    	Array.prototype.slice.apply(document.querySelectorAll("A"), [0, -1]).
		    		forEach(function(a) {
		    			if(a.getAttribute("href") === "#") {
		    				a.removeAttribute("href");
		    				a.style.cursor = "pointer";
		    			}
		    		});
	    	}, 500);
    	}
    }, [
	]),

        $("vcl/ui/Panel", "details", {
        	visible: false, // controlled by popup
        	draggable: true,
        	left: 30, top: -29, width: 320, height: 400,
        	content: "<div>%s</div>",
        	css: {
        		"box-shadow": "0 1px 5px rgba(0,0,0,0.65)",
        		"border-radius": "3px",
        		//"transform": "scale3d(0.8, 0.8, 1)"
        	},
        	onNodeCreated: function(node) {
        		var Framework7 = require("Framework7");
        		var f7 = new Framework7();

        		this.setContent(String.format(this._content, require(
        				"text!veldoffice/Onderzoek/views/Info.views.html")));

        		this.update(function() {
					var mainView = f7.addView(node.querySelectorAll(".view-main"), {
					    dynamicNavbar: true,
					    domCache: true
					});

					setTimeout(function() {
						mainView.router.load({pageName: "form"});
					}, 200);
        		});
        	}
        }),

    $("vcl/Action", "search", {
    	vars: {
			colorIndex: 0,
			colors: ["#6600FF", "#E600FF", "#FF0099", "#FF001A", "#FF6600", "#FFE600", "#99FF00",
			         "#1AFF00", "#00FF66", "#00FFE6", "#0099FF", "#001AFF", "#8B3DFF", "#AF7AFF",
			         "#B1FF3D", "#CAFF7"],



    	},
    	onExecute: function(text) {
    		var FM = require("features/FM");
    		var omnivore = require("leaflet/plugins/omnivore");

    		var scope = this.getScope();
//    		var map = this.getAppVar("map");
//    		var draw = this.getAppVar("map-controls.draw");
//    		var layers = this.getAppVar("map-controls.layers");

    		var vars = this.getVars();
    		var app = this.getApp();
    		var me = this;

    		var overlay = scope.overlays.apply("prepare", {
    			classes: "fade loading-right box-shadow",
    			content: String.format("Zoeken naar: '%H'", text)
    		});

    		var pattern = String.format("%%%s%%", text.replace(/%/g, "%%"));
    		FM.query("../gx//veldoffice:Onderzoek", "naam,projectcode,count:meetpunten", {
    			limit: -1,
    			groupBy: ".",
    			where: FM.eb.or(
    					FM.eb.like("naam", pattern),
    					FM.eb.like("projectcode", pattern)
    			)
    		}).addBoth(function(res) {
//    			toast.element.removeClass("loading-right");
    			return res;
    		}).addCallback(function(res) {

    			if(res.count === 0) {
    				overlay.element.setContent(String.format(
    						"Geen resultaten gevonden voor '%H'", text));
    				overlay.remove(2500);
    			} else {
    				/*- FIXME Generalize this in features/FM */
    				var features = [];
		            res.instances.forEach(function(instance) {
		                var parsed = omnivore.wkt.parse(instance._values.geom);
		                var fts = parsed.toGeoJSON().features;
		                fts.forEach(function(ft) {
		                	ft.properties.instance = instance;
		                });
		                features = features.concat(fts);
		            });

		            var geojson = {
		                features: features,
		                type: "FeatureCollection",
		                crs: {
		                    type: "EPSG",
		                    properties: {
		                        code: "28992"
		                    }
		                }
		            };

		            var layer = L.Proj.geoJson(geojson, {
		            	style: {
		            		color: vars.colors[vars.colorIndex],
		            		width: 5,
		            		opacity: "0.4"
		            	}
		            });

		            vars.colorIndex++;
		            vars.colorIndex %= vars.colors.length;

    				overlay.set({
    					layer: layer,
    					title: text
    				});

    			}
    		}).addErrback(function(err) {
    			console.error(err);
    			overlay.element.setContent(String.format("Er is een fout opgetreden", text));
    			overlay.cancel(2500);
    		});
    	}
    }),

    $(["./Overlays"], "overlays", {

    	onLoad: function() {
    		//alert(this.getAppVar("map"));
    	}

    })

]);
