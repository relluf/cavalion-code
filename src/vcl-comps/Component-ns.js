"X";

var X = require("X");

[["Page"], {}, [
	
	[["Bar"], {}, [
		[["Button", "Executable"], "refresh", {
			execute: function() {
				
			}
		}]
	]],
	
	["List", { source: X }, [
		
	]],
	
	[["Element"], {
		content: function(value) {
			if(arguments.length === 1) {
				this.setContent(value);
			}
			return this.getContent();
		}
	}],
	
	[["Element"], {
		content: {
			set (value) { this.setContent(value); },
			get () { return this.getContent(); }
		}
	}]
]];