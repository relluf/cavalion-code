"use strict";

["vcl-comps:make/Build<code>", {
	css: { button: "width:auto;" },
    vars: {
		"modules": [
			"js/nameOf",
			"util/HtmlElement",
			"console/node/OnlyKey",
			"js/_js",
			"js/Enum",
			"util/Browser",
			"util/Event",
			"lib/node_modules/dropbox/dist/Dropbox-sdk",
			"lib/bower_components/relational-pouch/dist/pouchdb.relational-pouch",
			"lib/bower_components/pouchdb/dist/pouchdb",
			"lib/bower_components/pouchdb-find/dist/pouchdb.find",
			"vcl/Application",
			"pouch/bower_components/relational-pouch/dist/pouchdb.relational-pouch",
			"pouch/bower_components/pouchdb-find/dist/pouchdb.find",
			"pouch/bower_components/pouchdb/dist/pouchdb",
			"js/global",
			"js/minify",
			"js/serialize",
			"js/beautify",
			"pouch/pouchdb.save",
			"vcl/EventDispatcher",
			"vcl/CssRules",
			"locales/prototype",
			"locales/en-US",
			"util/DocumentHook",
			"util/Stylesheet",
			"util/Ajax",
			"vcl/ui/Ace",
			"vcl/ui/FormContainer",
			"vcl/ui/Form",
			"vcl/ui/Panel",
			"vcl/Control",
			"util/Text",
			"vcl/ui/Container",
			"ace/ace",
			"vcl/Action",
			"vcl/Component.query",
			"vcl/ControlUpdater",
			"vcl/Dragger",
			"vcl/ui/Element",
			"util/HotkeyManager",
			"data/SourceEvent",
			"util/Keyboard",
			"util/Fullscreen",
			"vcl/ui/Tree",
			"vcl/ui/Button",
			"vcl/ui/Node",
			"vcl/ui/Popup",
			"vcl/ui/List",
			"data/Source",
			"vcl/ui/ListColumn",
			"vcl/ui/ListFooter",
			"vcl/ui/ListHeader",
			"vcl/ui/ListBody",
			"vcl/ui/ListRow",
			"data/SourceState",
			"devtools/Parser",
			"vcl/ui/Sizer",
			"devtools/cavalion-devtools",
			"veldapps-xml/index",
			"util/Xml",
			"lib/node_modules/papaparse/papaparse",
			"lib/bower_components/markdown/lib/markdown",
			"veldapps-xml/fast-xml-parser/parser",
			"vcl/ui/Group",
			"vcl/ui/Input",
			"vcl/ui/Console",
			"vcl/ui/Console.evaluate",
			"vcl/ui/Tab",
			"vcl/ui/Bar",
			"vcl/data/Array",
			"vcl/ui/Tabs",
			"devtools/NavigatorNode",
			"v7/pdok/viewer-metadata",
			"v7/pdok/themes",
			"fast-xml-parser",
			"json",
			"ace/ext-modelist",
			"vcl/ui/CheckGroup",
			"vcl/ui/Radiobutton",
			"vcl/ui/Checkbox",
			"veldapps-imsikb/util",
			"veldapps-imsikb/js/nameOf/methods",
			"veldapps-imsikb/lookup",
			"veldapps-imsikb/urns",
			"veldapps-imsikb/traverse",
			"veldapps-imsikb/guess",
			"lib/bower_components/papaparse/papaparse",
			"console/Printer",
			"text",
			"veldapps-gds-devtools/vcl-comps/devtools/Renderer$/locales/nl",
			"veldapps-gds-devtools/vcl-comps/devtools/Renderer$/locales/prototype",
			"veldapps-gds-devtools/Util",
			"console/node/Array",
			"console/node/MethodStack",
			"console/node/Number",
			"console/node/Undefined",
			"console/node/Null",
			"console/node/Boolean",
			"console/node/String",
			"console/node/Error",
			"console/node/Function",
			"console/node/Deferred",
			"console/node/Promise",
			"stylesheet",
			"less",
			"on",
			"locale",
			"util/Clipboard"
		],
		components: ["text!vcl-comps/devtools/App.js","text!vcl-comps/App.js","text!vcl/prototypes/App.v1.js","text!vcl/prototypes/App.console.js","text!vcl/prototypes/App.js","text!vcl-comps/ui/forms/util/Console.js","text!vcl/prototypes/ui/forms/util/Console.js","text!vcl/prototypes/App.openform.js","text!vcl/prototypes/App.toast.js","text!vcl/prototypes/ui/controls/SizeHandle.js","text!vcl/prototypes/ui/Form.js","text!vcl/prototypes/ui/controls/Toolbar.js","text!vcl-comps/devtools/Main.js","text!vcl-comps/devtools/TabFactory.js","text!vcl-comps/devtools/DragDropHandler.js","text!vcl-comps/devtools/CtrlCtrl.js","text!vcl-comps/devtools/Workspace.js","text!vcl-comps/devtools/Navigator.js","text!vcl-comps/devtools/Bookmarks.js","text!vcl-comps/devtools/Outline.js","text!vcl-comps/devtools/OpenTabs.js","text!vcl-comps/devtools/Console.js","text!vcl-comps/make/Build.js","text!vcl-comps/devtools/Editor$/html.js","text!vcl-comps/devtools/Editor.js","text!vcl-comps/devtools/Editor$/vcl.js","text!vcl-comps/devtools/Editor$/png.js","text!vcl-comps/devtools/Editor$/md.js","text!vcl-comps/devtools/Editor$/folder.js","text!vcl-comps/devtools/Editor$/blocks.js","text!blocks/prototypes/Bar.js","text!blocks/prototypes/Container.js","text!vcl-comps/App.v1.console.js","text!vcl-comps/App.v1.js","text!vcl-comps/App.console.js","text!vcl/prototypes/App.openform.toast.js","text!vcl-comps/ui/Form.js","text!vcl-comps/ui/controls/Toolbar.js","text!vcl/prototypes/devtools/CtrlCtrl.js","text!vcl-comps/devtools/Workspace$/code.js","text!vcl-comps/ui/controls/SizeHandle.js","text!vcl-comps/devtools/Workspace$/blocks.js","text!vcl-comps/devtools/Workspace$/Veldoffice.js","text!vcl-comps/veldoffice/Navigator.js","text!vcl-comps/veldoffice/Session.js","text!vcl-comps/devtools/Editor$/pdf.js","text!vcl-comps/devtools/Editor$/csv.js","text!vcl-comps/devtools/Editor$/xml.js","text!blocks/prototypes/Executable.js","text!blocks/prototypes/Map.js","text!blocks/prototypes/Node.js","text!blocks/prototypes/Store.js","text!vcl-comps/devtools/Editor$/js.js","text!vcl-comps/devtools/Workspace$/veldapps.js","text!vcl-comps/devtools/Editor$/json.js",
		
			"text!vcl-comps/devtools/Workspace$/cavalion-blocks.js",
			"text!vcl-comps/App$/code.js",
			"text!vcl/prototypes/App.glassy.js",
			"text!blocks/prototypes/Hover.js",
			"text!blocks/prototypes/Container.glassy.js",
			"text!blocks/prototypes/Container.closex.js",
			"text!blocks/prototypes/Element.js"
		]
    }
}];