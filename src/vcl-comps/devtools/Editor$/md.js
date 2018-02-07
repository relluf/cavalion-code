"markdown";

var markdown = require("markdown");

$([], {}, [
    
    $i("ace", {
        align: "left",
        width: 475,
        onChange: function() {
            var scope = this.getScope();
            scope.out.setContent(markdown.toHTML(this.getValue()));
        }
    }),
    
    $("vcl/ui/Panel", "out", {
        align: "client",
        css: { 
            "background-color": "#f0f0f0", 
            "border-left": "1px solid silver",
            "border-right": "1px solid silver",
            "font-family": "times,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'", 
            "font-size": "12pt",
            padding: "10px",
            "img:not(:hover)": "max-width: 75%;",
            "code": "border-radius:3px;font-size: 10pt;background-color:white;padding:2px;line-height:12pt;"
        }
    })

]);