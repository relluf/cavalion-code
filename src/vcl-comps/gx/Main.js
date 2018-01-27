$(["ui/Form"], {
    
    '@require': ["jquery"],

	classes: "sidebar-hidden",

	css: {
		overflow: "hidden",

		">[id$=-sidebar]": {
			"z-index": "0"
		},
		
		"[id$=-top]": {
		    padding: "8px",
		    "padding-top": "0px",
		    //background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(237,237,237,1) 100%)"
		},
		
		"[id$=-top-right]": {
		    float: "right",
		    "padding-top": "6px",
		    "padding-right": "6px"
		},
		
		"[id$=-project-selector-container]": {
            "border-bottom": "1px solid white",
            "border-radius": "3px",
            "display": "inline-block"
		},
		
		"[id$=-project-selector]": {
            "max-width": "500px",
            "font-family": "Segoe UI",
		  //  "font": "12pt Segoe UI",
            "padding": "2px",
            // "padding-top": "0",
            "border": "1px inset #f0f0f0",
            "border-radius": "3px"
        },

		">[id$=-client]": {
			"z-index": "1",
			"background-color": "white"
		},

		"&:not(.inital)": {
			">[id$=-sidebar]": {
				"-webkit-transition": "all 0.2s",
				"-webkit-transition-timing-funtion": "cubic-bezier(1, 7, 10, 1)"
			},
			">[id$=-client]": {
				"-webkit-transition": "all 0.2s",
				"-webkit-transition-timing-funtion": "cubic-bezier(1, 7, 10, 1)"
			},
		},

		"&.sidebar-hidden": {
			">[id$=-sidebar]": {
				"-webkit-transform": "translate3d(-40px, 0, 0)"
			},
			">[id$=-client]": {
			}
		},

		"&:not(.sidebar-hidden)": {
			">[id$=-sidebar]": {
				"-webkit-transform": "translate3d(0, 0, 0)"
			},
			">[id$=-client]": {
				"-webkit-transform": "translate3d(300px, 0, 0)"
			}
		}
	},
	
    onLoad: function() {
        var $ = require("jquery");
        var scope = this.getScope();
        
        var MINUTE = 60 * 1000;
        var HOUR = 60 * MINUTE;
        var DAY = 24 * HOUR;
        
        var API = "/office-rest/v1/";

        function jsonfy(obj, comment) {
            if(typeof obj === "string") {
                obj = JSON.parse(obj);
                // if(comment) {
                //     console.log("parsed " + comment);
                // }
            }
            return obj;
        }
        function makedate(date) {
            date = date.split("-");
            return new Date(
                parseInt(date.pop(), 10), 
                parseInt(date.pop(), 10) - 1, 
                parseInt(date.pop(), 10)
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
        
        scope['project-selector'].on("change", function() {
            var me = this;
            this.setEnabled(false);
            $.ajax(API + String.format("persistence/onderzoek/%d/meetpunt", this.getValue())).
                success(function(arr) {
                    arr = jsonfy(arr);
                }).
                always(function() {
                    me.setEnabled(true);
                });
        });
        
        $.ajax(API + "session").
            success(function(sessions) {
                sessions = jsonfy(sessions, "sessions");
                
                if(sessions.length === 0) {
                    alert("You need to login first");
                    throw "NoSession";
                }
                
                $.ajax(API + "session/" + sessions[0]).
                    success(function(session) {
                        session = jsonfy(session, "session");

                        scope['top-right'].setContent(String.format(
                            "%s - %s", session.name, session.bedrijf.naam));
                    }).
                    error(function(err) {
                        console.log(err);
                    });
                    
                $.ajax(API + "persistence/onderzoek?pagesize=100&sortby=created&sorttype=DESC").
                    success(function(arr) {
                        scope['project-selector'].show();
                        scope['project-selector'].setOptions([""].concat(
                            jsonfy(arr, "onderzoek").map(function(item) {
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
    }	
}, [

//    $(["./Sidebar"], "sidebar", {
//    	autoSize: "both",
//    	//formUri: "ui/Sidebar",
//    	css: {
//    		"background-color": "red",
//
//    		left: "-40px",
//    		top: "0",
//    		bottom: "0",
//    		width: "300px"
//    	}
//    }),

    $("vcl/ui/Panel", "client", {
    	align: "client"
    }, [
        $("vcl/ui/Panel", "top", {
            align: "top",
            autoSize: "height"
        }, [
            $("vcl/ui/Group", "project-selector-container", {}, [
                $("vcl/ui/Select", "project-selector", {
                    visible: false
                })
            ]),
            $("vcl/ui/Group", "top-right", {}, [])
        ]),
        
		$("vcl/ui/FormContainer", {
			formUri: "gx/Map"
		}),

		$("vcl/ui/Element", "toggle-sidebar", {
			visible: false,
			//content: ">>",
			content: "<div class='leaflet-bar leaflet-control'>" +
					"<a class='leaflet-control-fullscreen-button leaflet-bar-part' " +
					"href='#'>&gt;&gt;</a></div>",
			css: "position:absolute;bottom:32px;left:10px;",
			onTap: function() {
				var owner = this._owner;
				if(owner.hasClass("sidebar-hidden")) {
					owner.removeClass("sidebar-hidden");
				} else {
					owner.addClass("sidebar-hidden");
				}
			}
		})
    ])
]);