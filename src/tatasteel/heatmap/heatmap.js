var RD_X = 0;
var RD_Y = 0;

var rows = 100, cols = 100;
var rx = 1000, ry = 1000;
var max_r = 12500;
var maxx = cols * rx, maxy = rows * ry;

var grid = [];
var datapoints = [], n_datapoints = 12;

var start = Date.now();

for(var i = 0; i < n_datapoints; ++i) {
    datapoints.push({
        x: RD_X + max_r + parseInt(Math.random() * (maxx - max_r * 2)),
        y: RD_Y + max_r + parseInt(Math.random() * (maxy - max_r * 2)),
        value: 25 + parseInt(Math.random() * 25)
    });
}

for(var y = ry / 2, ey = maxy + ry / 2; y < ey; y += ry) {
    var row = [];
    for(var x = rx / 2, ex = maxx + rx / 2; x < ex; x += rx) {
        var value = -1;
        datapoints.forEach(function(dp) {
            var dx = Math.abs(dp.x - x), dy = Math.abs(dp.y - y);
            var r = Math.sqrt((dx * dx) + (dy * dy));
            if(r < max_r) {
                var v = ((max_r - r) / max_r) * dp.value;
                if(value < v) { 
                    value = v;
                }
            }
        });
        row.push(value);
    }
    grid.push(row);
}


var sql = [];
var heatmap_id = (Date.now() - 1429633866640) / 1000;
sql.push(String.format("INSERT INTO tata_heatmap (id,name) VALUES (%d, '%s');", heatmap_id, 'Heatmap'));
datapoints.forEach(function(dp, i) {
    sql.push(String.format("INSERT INTO tata_heatmap_points (geom,`text`,value,heatmap_id) VALUES (GeomFromText('%s'), '%s', %f, %d);",
        String.format("POINT(%s %s)", RD_X + dp.x / 1000, RD_Y + dp.y / 1000),
        String.format("pb%d (%d)", i + 1, dp.value),
        dp.value, heatmap_id
    ));
});
grid.forEach(function(row, y) {
    row.forEach(function(cell, x) {
        if(cell !== -1) {
            sql.push(String.format("INSERT INTO tata_heatmap_polys (geom,value,heatmap_id) VALUES (GeomFromText('%s'), %d, %d);",
                String.format("POLYGON((%s %s, %s %s, %s %s, %s %s, %s %s))", 
                    RD_X + x * rx / 1000, RD_Y + y * ry / 1000, 
                    RD_X + (x + 1) * rx / 1000, RD_Y + y * ry / 1000,
                    RD_X + (x + 1) * rx / 1000, RD_Y + (y + 1) * ry / 1000, 
                    RD_X + x * rx / 1000, RD_Y + (y + 1) * ry / 1000,
                    RD_X + x * rx / 1000, RD_Y + y * ry / 1000
                ),
                cell, heatmap_id
            ));
        }
    });
});

console.log({grid: grid, time: Date.now() - start, datapoints: datapoints});

require("js/JsObject").$[82].setValue(sql.join("\n"));
