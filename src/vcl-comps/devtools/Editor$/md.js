"markdown";

var markdown = require("markdown");

$([], {}, [
    
    $i("ace", {
        align: "left",
        autoSize: "width",
        css: { width: "50%" },
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
            "font-family": "times", 
            "font-size": "12pt",
            padding: "10px"
        }
    })

]);