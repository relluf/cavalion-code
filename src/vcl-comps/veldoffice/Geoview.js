"jquery, leaflet, leaflet.markercluster, leaflet.awesome-markers, leafletjs/CoordinatesControl, proj4leaflet, epsg/28992";

/*- vars: map, markers, source, dest */

var Control = require("vcl/Control");
var Proj4js = require("proj4");
var ajax = require("jquery").ajax;
var CoordinatesControl = require("leafletjs/CoordinatesControl");
        
var MINUTE = 60 * 1000;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var API = "/office-rest/v1/";

function objectify(obj, comment) {
    if(typeof obj === "string") {
        obj = JSON.parse(obj);
        //comment && console.log("parsed " + comment);
    }
    return obj;
}
function makedate(date) {
    date = date.split("T");
    if(date.length === 2) {
        date[0] = date[0].split("-");
        date[1] = date[1].split(":");
    }
    
    return new Date(
        parseInt(date[0].shift(), 10), 
        parseInt(date[0].shift(), 10) - 1, 
        parseInt(date[0].shift(), 10),
        parseInt(date[1].shift(), 10),
        parseInt(date[1].shift(), 10),
        parseFloat(date[1].shift())
    );
}
function since(date) {
    var delta = Date.now() - date.getTime();
    if(delta < 2 * MINUTE) {
        return "Nu";
    }
    
    if(delta < HOUR) {
        return String.format("%d minuten", parseInt(delta / MINUTE));
    }
    
    if(delta < DAY) {
        return String.format("%d uur", parseInt(delta / HOUR));
    }
    
    return String.format("%d dagen", parseInt(delta / DAY));
}
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
function osm() {
	var tile = "http://tile.openstreetmap.org/{z}/{x}/{y}.png";
	return new L.TileLayer(tile, {
		detectRetina: true,
		maxZoom: 28,
        attribution: ""//Map data &copy; 2012 OpenStreetMap contributors"
	});
}
function obk() {
    return new L.TileLayer("http://www.openbasiskaart.nl/" + 
        "mapcache/tms/1.0.0/osm@rd/{z}/{x}/{y}.png", {
            tms: true,
            minZoom: 0,
            maxZoom: 14,
            continuousWorld: true
    });
}
function kk() {
    var url = "http://geodata.nationaalgeoregister.nl/kadastralekaartv2/wms";
    return new L.TileLayer.WMS(url, {
        format: "image/png",
        transparent: true,
        layers: "kadastralekaart,annotatie,perceelnummer"
    });
}
function foo() {
    var map = new L.Map("map", {
        continuousWorld: true,
        crs: rd,
        layers: [
            // De layer van de openbasiskaart
            new L.TileLayer(
                "http://www.openbasiskaart.nl/mapcache/tms/1.0.0/osm@rd/{z}/{x}/{y}.png", {
                    tms: true,
                    minZoom: 3,
                    maxZoom: 13,
                    continuousWorld: true
                }
            )
        ],
        center: new L.LatLng(52, 5.3),
        zoom: 3
    });
}
function rd() {
    
    /*- Resoluties benodigd voor het tile schema */
    var rd_res = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 
            53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 
            0.210, 0.105, 0.0525, 0.02625];
            
    /*- Maak van de projectiestring voor het Rijksdriehoekstelsel 
        een Leaflet projectie object */
    var rd = L.CRS.proj4js("EPSG:28992", 
        "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 " + 
        "+k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m " + 
        "+towgs84=565.2369,50.0087,465.658,-0.406857330322398," + 
        "0.350732676542563,-1.8703473836068,4.0812 +no_defs",
        new L.Transformation(1, 285401.920, -1, 903401.920));
        
    /*- Override de scale instelling voor het schema */
    rd.scale = function(zoom) {
        return 1 / rd_res[zoom];
    };
    
    return rd;
}
function markerdragstart() {
    window.marker = this;
    this._icon.style['margin-top'] = "-72px";
    return false;
}
function markerdragend() {
    this._icon.style['margin-top'] = "-42px";
    this._icon.style.opacity = "0.5";
    this.dragging.disable();
    var sp = this.dragging._draggable._startPos;
    var ep = this.dragging._draggable._newPos;
    var dp = [ep.x - sp.x, sp.y - ep.y];
    
//    console.log(dp);
    
    var vars = Control.findByNode(this._icon).getOwner().getVars();
    var crs = vars.map.options.crs;
    var tuple = this.options.tuple;
    var me = this;
    var rd = crs.projection.project(this._latlng);
    
    ajax({
        url: API + String.format("persistence/meetpunt/%d", tuple.id),
        type: "POST",
        data: JSON.stringify({ xcoord: rd.x, ycoord: rd.y }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
        .success(function() {
            me._icon.style.opacity = "1";
            me.dragging.enable();
        })
        .error(function() {
			var pt = {x:tuple.xcoord, y:tuple.ycoord};
			Proj4js.transform(vars.epsg28992, vars.wgs84, pt);
			
			alert("Het verplaatsen is mislukt");
			
			me.setLatLng([pt.y, pt.x]);
            me._icon.style.opacity = "1";
            me.dragging.enable();
        });
    
}
function strdate(date, time) {
    if(time === true) {
        return String.format("%d/%02d/%02d %02d:%02d:%02d", 
                date.getFullYear(), date.getMonth() + 1, date.getDate(),
                date.getHours(), date.getMinutes(), date.getSeconds());
    }
    // return String.format("%d/%02d/%02d", 
    //         date.getFullYear(), date.getMonth() + 1, date.getDate());
    
    var months = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", 
            "Sep", "Oct", "Nov", "Dec"];
    return String.format("%d %s %d", date.getDate(), months[date.getMonth()], 
                date.getFullYear());
}

var icons = {
    byType: [
        ["2377", "grondboring",     "life-ring", "blue"],
        ["2382", "peilbuis met 1 filter", 
                                    "dot-circle-o", "blue"],
        ["2387", "peilbuis met 2 filters", 
                                    "dot-circle-o", "blue"],
        ["2392", "peilbuis met 3 filters", 
                                    "dot-circle-o", "blue"],
        ["2397", "sondering",       "star", "blue"],
        ["2402", "depot",           "recycle", "blue"],
        ["2407", "sondering dynamisch", 
                                    "star", "blue"],
        ["2412", "inspectiegat",    "star", "blue"],
        ["2417", "grepen",          "star", "blue"],
        ["2422", "kabelslagboring", "star", "blue"],
        ["2427", "lozingspunt",     "star", "blue"],
        ["2432", "putbodem",        "star", "blue"],
        ["2437", "rotatieboring",   "star", "blue"],
        ["2442", "sleuf",           "magnet", "blue"],
        ["2447", "slib",            "minus-circle", "blue"],
        ["2452", "vensterbemonsteringsboring", 
                                    "star", "blue"],
        ["2457", "wand",            "star", "blue"],
        ["2462", "sondering cpt",   "star", "blue"]
    ].reduce(function(icons, args, index, thisObj) {
        icons[args[0]] = L.AwesomeMarkers.icon({
            icon: args[2],
            markerColor: args[3]
        });
        return icons;
    }, {})
};

function listeners(scope, vars) {
    
    vars.markers.on({
        "clustermousemove": function(evt) {
            console.log("clustermove", evt);
        }
    });
    
    scope['project-selector'].on("change", function() {
        this.setEnabled(false);
        vars.markers.clearLayers();
        
        var me = this; //2316225
        ajax(API + String.format("persistence/onderzoek/%d/meetpunt", 2316225 || this.getValue()))
            .success(function(arr) {
                objectify(arr).forEach(function(tuple, i) {
				    if(tuple.xcoord && tuple.ycoord) {
						var pt = {x:tuple.xcoord, y:tuple.ycoord};
						Proj4js.transform(vars.epsg28992, vars.wgs84, pt);
						var icon = icons.byType[tuple.type.id];
						var marker = new L.Marker([pt.y, pt.x], {
						    icon: icon,
						    tuple: tuple,
						    riseOnHover: true,
						    draggable: true, title: String.format("%s, %s" + 
						        "\nDatum: %s\nBoormeester: %s", 
						        tuple.code, tuple.type.naam, 
						        strdate(makedate(tuple.datum)),
						        tuple.boormeester)
						});
						
						marker.bindPopup(String.format(
						    "<div class='title'><i class='fa fa-%s'></i> <b>%H" + 
						    "</b><span>%H </span></div>" + 
						    "<div>Datum: %H</div>" + 
						    "<div>Boormeester: %H</div>" + 
						    "<div>Einddiepte: %d (cm-mv)</div>" + 
						    "<div class='links'>" + 
						        "<i class='fa fa-info-circle'></i>&nbsp;" + 
						        "<a>Details</a><span class='coords'>" + 
						        String.format("%.3f, %.3f</span>", 
						            tuple.xcoord, tuple.ycoord) + 
						        //"<a>Verplaatsen ongedaan maken</a>" + 
                            "</div>", 
						    icon.options.icon, tuple.code, tuple.type.naam, 
						    strdate(makedate(tuple.datum)), 
						    tuple.boormeester, 350), {closeButton:false});
						marker.on({
                            "dragstart": markerdragstart,
                            "dragend": markerdragend
						});
						
						vars.markers.addLayer(marker);
						//vars.map.addLayer(marker);
						
						var _ii = marker._initIcon;
						marker._initIcon = function() {
						    var r = _ii.apply(this, arguments);
						    this._icon.querySelector("i").innerHTML = 
						        "<div class='marker-code'>" + 
						        tuple.code + "</div>";
						    return r;
						};
				    } else {
				        
				    }
				});
            })
            .always(function() {
                me.setEnabled(true);
            });
    });
    scope['map-panel'].once("show", function() {
		var me = this, ignoreTap;
		
		vars.map.on("mousemove", function(evt) {
		    var classes = evt.originalEvent.target.classList;
		    if(classes.contains("leaflet-marker-icon")) {
		        //console.log("move-marker", evt);
		    }
		});
/*		
		vars.map.on("mousedown", function(evt) {
			//console.log("mousedown: ignoreTap => false");
			ignoreTap = false;
			me.setTimeout("longpress", function() {
				console.log("longpress", evt, evt.latlng);
				ignoreTap = true;

				var all = [];
				vars.map.eachLayer(function(l) {
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
		vars.map.on("mousemove", function(evt) {
			//console.log("mousemove: no more longpress");
			me.clearTimeout("longpress");
			ignoreTap = true;
		});
		vars.map.on("mouseup", function(evt) {
			//console.log("mouseup");
			me.clearTimeout("longpress");
			//evt.originalEvent.stopPropagation();
			if(!ignoreTap) {
    			me.setTimeout("tap", function() {

    				var all = [];
    				vars.map.eachLayer(function(l) {
						if(l instanceof L.Polygon && 
						        GeoUtils.pip([evt.latlng.lat, 
								    evt.latlng.lng], cnv(l._latlngs))
						) {
							all.push(l);
						}
					});


    				if(all.length > 0) {
    					evt.layer = all[0];
    					vars.map.fitBounds(evt.layer.getBounds());
    					//map.closePopup();
    				}

	    		}, 0);
			}
		});
		vars.map.on("click", function(evt) {
			if(!ignoreTap) {
    			me.setTimeout("tap", function() {
    				console.log("tap", evt);
    			}, 200);
			} else {

			}
			ignoreTap = false;
		});
		vars.map.on("dblclick", function(evt) {
			me.clearTimeout("tap");
			console.log("dbltap", evt);
		});
*/		
		this.on("resize", function(evt) {
		    vars.map.invalidateSize();
		});
    });
}

$(["ui/Form"], {
    css: {
        "font-family": 
            "'Open Sans', 'Segoe UI', 'Droid Sans', Tahoma, Arial, sans-serif",
		"[id$=-top]": {
		    "padding": "8px",
		    "padding-top": "0px"
		},

		"[id$=-project-selector-container]": {
            "display": "inline-block",
            "max-width": "50%"
		},
		"[id$=-project-selector]": {
            "padding": "6px 9px 5px 4px",
            "border": "1px solid #e1e3e8",
            "color": "#656b79",
            "height": "31px",
            "width": "100%",
            "padding": "7px 9px",
            "box-shadow": "none !important",
            "font-size": "11px",
            "line-height": "1.4615384615384615",
            "border-radius": "3px",
            "transition": 
                "border-color ease-in-out .15s, box-shadow ease-in-out .15s"
		},
/*
		"[id$=-project-selector-container]": {
            "border-bottom": "1px solid white",
            "border-radius": "3px",
            "display": "inline-block"
		},
		"[id$=-project-selector]": {
            "max-width": "500px",
            "font-family": "Segoe UI",
            "padding": "2px",
            "border": "1px inset #f0f0f0",
            "border-radius": "3px",
            
            "&.disabled": {
                color: "transparent",
                background: "url(/shared/vcl/images/loading.gif) no-repeat 6px center"
            }
        },
*/
		"[id$=-client]": {
			"z-index": "1",
			"background-color": "white"
		},
		"[id$=-map-panel]": {
			overflow: "hidden",
			">div.map": "left:0;top:0;right:0;bottom:0;position:absolute;",
			
			".leaflet-marker-icon.leaflet-marker-draggable": {
			    "transition": "margin-top 0.1s"
			},
			
			".leaflet-popup-content": {
                "font-family": 
                    "'Open Sans', 'Segoe UI', 'Droid Sans', Tahoma, Arial, sans-serif"
			},
			
			".awesome-marker": {
    	        ".marker-code": {
    	            "background-color": "rgb(54,165,215)",
    	            "margin-top": "2px",
    	            "font-size": "7pt",
    	            "font-family": "'Helvetica Neue', Arial, Helvetica, sans-serif"
    	        }
			},
	
			"div.title": {
			    "min-width": "200px",
			    "border-bottom": "1px solid #ddd",
			    "padding-bottom": "6px",
			    "margin-bottom": "8px",
			    ".fa": {
			        "font-size": "larger"
			    },
			    "span": {
			        "float": "right"
			    }
			},
			"div.links": {
			    "margin-top": "8px",
			    "padding-top": "6px",
			    "border-top": "1px solid #ddd",
		        "color": "#4697ce",
			    "a": {
			        "text-decoration": "underline",
			        "cursor": "pointer",
			        "margin-right": "6px",
			        "&:active": {
			            color: "red"
			        }
			    },
			    ".coords": {
			        "float": "right",
			        "color": "silver"
			    }
			}
    	}
	},
    onNodeCreated: function() {
    	setTimeout(function() {
	        var scope = this.getScope();
	        var vars = this.mixInVars({
			    "map": L.map(scope['map-panel'].getChildNode(0), {
	        		zoomControl: !("ontouchstart" in window),
	        		attributionControl: false,
	        		crs: rd(),//L.CRS.proj4js("EPSG:28992"),
	         		center: [52.05, 5.27],
	        		zoom: 3
	        	}),
	            "epsg28992": new Proj4js.Proj("EPSG:28992"),
	            "wgs84": new Proj4js.Proj("WGS84"),
	            "markers": new L.MarkerClusterGroup({
	    			maxClusterRadius: 10,
	    			disableClusteringAtZoom: 15
	    		})
			});
			
			listeners(scope, vars);
			
	    	vars.map.addLayer(obk());
	    	vars.map.addLayer(kk());
	    	
	    	//vars.map.addLayer(osm());
	    	vars.map.addLayer(vars.markers);
	    	
	        var cc = new CoordinatesControl({
	            position: "bottomright"
	        }).addTo(vars.map);
	        
	        vars.map.on("mousemove", function(e) {
	            var crs = vars.map.options.crs;
	            cc.setCoordinates(e.latlng, crs.projection.project(e.latlng));
	        });
	            
	        L.control.scale({imperial:false}).addTo(vars.map);
	        
	        // ajax("src/features/veldoffice/features.json").
	        ajax("/code/src/features/gwklicapp/Melding/features-total").
	            success(function(geojson) {
	            	vars.map.addLayer(L.Proj.geoJson(JSON.parse(geojson)));
	            });
	        
	        ajax(API + "session").success(function(sessions) {
	            sessions = objectify(sessions, "sessions");
	            
	            if(sessions.length === 0) {
	                alert("You need to login first");
	                throw "NoSession";
	            }
	            
	            ajax(API + "persistence/onderzoek?pagesize=100&" + 
	                    "sortby=created&sorttype=DESC")
	                .success(function(arr) {
	                    scope['project-selector'].show();
	                    scope['project-selector'].setOptions([""].concat(
	                        objectify(arr, "onderzoek").map(function(item) {
	                            return {
	                                value: item.id,
	                                content: String.format("%s - %s (%s)", 
	                                    item.projectcode, 
	                                    (item.naam || "Geen naam"),
	                                    since(makedate(item.created)))
	                            };
	                        })));
	                });
	        });
    		
    	}.bind(this), 0);
    }	
}, [
    $("vcl/ui/Panel", "client", {
    	align: "client"
    }, [
        $("vcl/ui/Panel", "top", {
            align: "top",
            autoSize: "height",
            visible: false
        }, [
            $("vcl/ui/Group", "project-selector-container", {}, [
                $("vcl/ui/Select", "project-selector", {
                    visible: false
                })
            ]),
            //$("vcl/ui/Group", "top-right", {}, [])
        ]),
        $("vcl/ui/Panel", "map-panel", {
        	align: "client",
        	content: "<div class='map' style='position:absolute;'></div>"
        })
    ])
]);