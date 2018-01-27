
var ft = {
    "type": "Feature",
    "id": "_788529152_5707836_line.15283",
    "geometry": {
        "type": "MultiLineString",
        "coordinates": [[[72579.4944876057, 445214.0705841547], [72579.5366841569, 445214.0380204541]]]
    },
    "geometry_name": "the_geom",
    "properties": {
        "__ds_src__": "0wk00002lG"
    }
};

var all = require("js/JsObject").all;

var IN = 141;
var OUT = 150;


require(["js/Packer"], function(Packer) {
    
    function parse() {
        var dt = Date.now();
        var features = JSON.parse(all[IN].getValue());
        console.log("parsed", Date.now() - dt, all[IN].getValue().length / 1024);
        return features;
    }
    
    function compile(features) {
        var dt = Date.now();
        var obj = {};
        features.features.forEach(function(ft) {
            if(ft.type === "Feature") {
                var id = ft.id.split(".");
                var layer = obj[id[0]] = obj[id[0]] || [];
                layer.push(ft.geometry.coordinates);
            }
        });
        var r = JSON.stringify(obj);
        console.log("compile", Date.now() - dt, r.length / 1024);
        return r;
    }
    
    function pack(str) {
        var dt = Date.now();
        var r = (new Packer()).pack2(str, function(p,a,c,k,e,r) {
            return p.
                replace(/\[\[\[/g, "/").
                replace(/\]\]\]/g, "\\").
                replace(/\]\,\[/g, "*").
                replace(/\\\,\//g, "&").
                replace(/1&/g, "!").
                replace(/2&/g, "@").
                replace(/3&/g, "#").
                replace(/4&/g, "$").
                replace(/5&/g, "%").
                replace(/6&/g, "^");
        });
        
        console.log("pack", Date.now() - dt, r.length / str.length, str.length / 1024, r.length / 1024);
        return r;
    }
    
    function unpack(str) {
        var dt = Date.now();
        var r = eval(str.substring(4)).
            replace(/\^/g, "6&").
            replace(/\%/g, "5&").
            replace(/\$/g, "4&").
            replace(/\#/g, "3&").
            replace(/\@/g, "2&").
            replace(/\!/g, "1&").
            replace(/\&/g, "\,/").
            replace(/\*/g, "],[").
            replace(/\\/g, "]]]").
            replace(/\//g, "[[[");
        console.log("unpack", Date.now() - dt, r.length / 1024, str.length / 1024);
        return r;
    }
    
    var str = compile(parse());
    var packed = pack(str);
    
    //all[OUT].setValue(packed);
    localStorage.setItem("test", packed);
    
    var unpacked = unpack(packed);
    //all[187].setValue(unpacked);
    
    console.log("");
});
