console.warn("DEPRECATED, use veldoffice.nl/leaflet/CoordinatesControl")
define(function(require) {
    
    var L = require("leaflet");
    var css = require("stylesheet!./CoordinatesControl.css");
    var GeoUtils = require("features/GeoUtils");

    return L.Control.extend({
    	options: {
    		position: "bottomleft",
    		mode: 0
    	},
    
    	initialize: function(options) {
    	    /* for options */
    		L.Control.prototype.initialize.call(this, options);
    	},
    
    	onAdd: function(map) {
        	var className = "leaflet-control-coordinates rd";
    		var div = this._div = L.DomUtil.create("div", className);
    		L.DomUtil.addClass(div, "hidden");
    		L.DomEvent.disableClickPropagation(div);
    		
    		var me = this;
    		L.DomEvent.on(div, "click", function(e) {
    		    me.options.mode++;
    		    var mode = (me.options.mode %= 3);
    		    
                var ll = L.DomUtil.hasClass(div, "ll");
                var rd = L.DomUtil.hasClass(div, "rd");
                if(mode === 0) {
                    if(ll) L.DomUtil.removeClass(div, "ll");
                    if(!rd) L.DomUtil.addClass(div, "rd");
                } else if(mode === 1) {
                    if(rd) L.DomUtil.removeClass(div, "rd");
                    if(!ll) L.DomUtil.addClass(div, "ll");
                } else if(mode === 2) {
                    if(!rd) L.DomUtil.addClass(div, "rd");
                    if(!ll) L.DomUtil.addClass(div, "ll");
                }
    		});
    		
    		return div;
    	},
    	
    	setCoordinates: function(latlng, point) {
            if(L.DomUtil.hasClass(this._div, "hidden")) {
                L.DomUtil.removeClass(this._div, "hidden");
            }
            this._div.innerHTML = String.format(
                "<span>%s, %s</span><span>%s, %s</span>",
                GeoUtils.lat2dms(latlng.lat), GeoUtils.lng2dms(latlng.lat), 
                point.x.toFixed(2), point.y.toFixed(2));
    	},
    	
    	show: function() {
    	    L.DomUtil.removeClass(this._div, "hidden");
    	},
    	
    	hide: function() {
    	    L.DomUtil.addClass(this._div, "hidden");
    	}
    });
});