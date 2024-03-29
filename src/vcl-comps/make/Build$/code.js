"use js";
//
// cd C:\Users\ralph\Source\veldapps.com\veldoffice\rapportage
// node r.js -o build.json
//
["", {
    vars: {
    	"app-js": "Workspaces/cavalion.org/cavalion-code/src/app.js",
    	
		modules: ["js/global","js/beautify","js/minify","js/nameOf","js/serialize","util/Browser","util/Event","locales/prototype","locales/en-US","text","vcl/ui/Ace","vcl/ui/FormContainer","vcl/ui/Form","vcl/ui/Panel","vcl/Control","vcl/ui/Container","vcl/ui/Element","util/Stylesheet","util/DocumentHook","vcl/Action","vcl/EventDispatcher","vcl/ControlUpdater","vcl/CssRules","vcl/Dragger","data/SourceEvent","util/Ajax","util/HotkeyManager","util/Keyboard","util/Fullscreen","vcl/Application","util/Command","vcl/ui/Sizer","entities/EM","entities/ExpressionBuilder","util/Rest","features/FM","entities/Instance","jquery","data/Source","data/SourceState","vcl/ui/Button","vcl/ui/Console","vcl/ui/Console.evaluate","vcl/ui/Tab","vcl/ui/Bar","vcl/ui/Input","vcl/ui/Tabs","vcl/ui/Node","vcl/ui/ListHeader","vcl/ui/Group","devtools/NavigatorNode","devtools/Resources","devtools/Resources-node","vcl/data/Array","vcl/ui/List","vcl/ui/ListColumn","vcl/ui/Tree","vcl/ui/ListFooter","vcl/ui/ListBody","vcl/ui/ListRow","util/Xml","../lib/bower_components/framework7/dist/js/framework7","on","../lib/bower_components/markdown/lib/markdown","vcl/ui/CheckGroup","util/HtmlElement","v7/pdok/viewer-metadata","v7/pdok/themes","util/Hash","utils/asarray","json","fast-xml-parser","js/Type","js/Property","vcl/Listeners","js/mixInRecursive","vcl/Component.query","console/node/OnlyKey","util/net/Url","blocks/Blocks","ace/ace","ace/commands/default_commands","ace/lib/fixoldbrowsers","ace/lib/dom","ace/lib/event","ace/range","ace/editor","ace/edit_session","ace/virtual_renderer","ace/undomanager","ace/worker/worker_client","ace/keyboard/hash_handler","ace/placeholder","ace/multi_select","ace/mode/folding/fold_mode","ace/ext/error_marker","ace/theme/textmate","ace/config","ace/lib/lang","ace/lib/useragent","ace/lib/keys","ace/lib/oop","ace/keyboard/textinput","ace/mouse/mouse_handler","ace/search","ace/keyboard/keybinding","ace/mouse/fold_handler","ace/commands/command_manager","ace/bidihandler","ace/token_iterator","ace/clipboard","ace/lib/event_emitter","ace/selection","ace/mode/text","ace/document","ace/background_tokenizer","ace/search_highlight","ace/edit_session/folding","ace/edit_session/bracket_match","ace/layer/gutter","ace/layer/marker","ace/layer/text","ace/layer/cursor","ace/scrollbar","ace/renderloop","ace/requirejs/text","ace/layer/font_metrics","ace/range_list","ace/mouse/multi_select_handler","ace/commands/multi_select_commands","ace/line_widgets","ace/lib/app_config","ace/mouse/default_handlers","ace/mouse/default_gutter_handler","ace/mouse/mouse_event","ace/mouse/dragdrop_handler","ace/lib/bidiutil","ace/mouse/touch_handler","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/behaviour/cstyle","ace/unicode","ace/apply_delta","ace/anchor","ace/edit_session/fold_line","ace/layer/lines","ace/edit_session/fold","ace/lib/net","ace/tooltip","ace/mode/behaviour","devtools/Resources-pouchdb","devtools/Resources-dropbox","devtools/Resources-dropped","../lib/node_modules/dropbox/dist/Dropbox-sdk","../lib/node_modules/dropbox/dist/DropboxTeam-sdk","ace/theme/eclipse","ace/mode/javascript","ace/mode/matching_brace_outdent","ace/mode/javascript_highlight_rules","ace/mode/folding/cstyle","ace/mode/doc_comment_highlight_rules","handlebars","ace/mode/markdown","ace/mode/folding/markdown","ace/mode/html","ace/mode/sh","ace/mode/css","ace/mode/xml","ace/mode/html_highlight_rules","ace/mode/folding/html","ace/mode/behaviour/xml","ace/mode/html_completions","ace/mode/sh_highlight_rules","ace/mode/css_highlight_rules","ace/mode/css_completions","ace/mode/behaviour/css","ace/mode/xml_highlight_rules","ace/mode/folding/xml","ace/mode/folding/mixed","ace/mode/markdown_highlight_rules","ace/ext/searchbox","ace/mode/gitignore","ace/mode/gitignore_highlight_rules","ace/mode/json","ace/mode/json_highlight_rules",
		
		
		
"js/referenceClass",
"js/Enum",
"js/_js",
"cavalion-pouch/bower_components/relational-pouch/dist/pouchdb.relational-pouch",
"cavalion-pouch/bower_components/pouchdb-find/dist/pouchdb.find",
"cavalion-pouch/pouchdb.save",
"cavalion-pouch/bower_components/pouchdb/dist/pouchdb",
"lib/bower_components/pouchdb-find/dist/pouchdb.find",
"lib/bower_components/pouchdb/dist/pouchdb",
"lib/bower_components/relational-pouch/dist/pouchdb.relational-pouch",
"pouchdb.save",
"pouchdb.authentication",
"pouchdb.memory",
"lib/node_modules/dropbox/dist/DropboxTeam-sdk",
"lib/node_modules/dropbox/dist/Dropbox-sdk",
"ace/lib/es6-shim",
"veldapps-ol/Map-default",
"veldapps-ol/Map-bro",
"veldapps-ol/Map-klic",
"veldapps-ol/proj/RD",
"veldapps-ol/Map-nederland",
"veldoffice/KLIC",
"lib/node_modules/proj4/dist/proj4-src",
"lib/ol-6.14.1-dist/ol",
"veldapps-xml/index",
"veldapps-imsikb/util",
"cavalion-blocks/veldapps/_",
"veldapps-imbro/util",
"veldapps-imsikb/js/nameOf/methods",
"veldapps-imsikb/urns",
"veldapps-imsikb/lookup",
"veldapps-xml/fast-xml-parser/parser",
"veldapps-imsikb/traverse",
"veldapps-imsikb/guess",
"veldapps-imbro/codes",
"veldapps-imbro/js/nameOf/methods",
"cavalion-blocks/veldapps/locales",
		
		
"veldoffice/devtools",
"veldoffice/VO",
"veldoffice/EM",
"veldoffice/Session",
"veldoffice/models",
"entities/Model",
"ace/ext/modelist",
"lib/bower_components/markdown/lib/markdown",
"cavalion-blocks/veldapps/ListOf<>/where",
"vcl/ui/PopupButton",
"vcl/ui/Select",
"vcl/ui/Popup",
"vcl-veldoffice/Query",
"vcl/entities/Query"
		
		
		],
        components: ["text!vcl-comps/devtools/App.js","text!vcl-comps/App.js","text!vcl/prototypes/App.v1.js","text!vcl/prototypes/App.console.js","text!vcl/prototypes/App.glassy.js","text!vcl/prototypes/App.js","text!vcl-comps/ui/forms/util/Console.js","text!vcl/prototypes/ui/forms/util/Console.js","text!vcl/prototypes/App.openform.js","text!vcl/prototypes/App.toast.js","text!vcl/prototypes/ui/controls/SizeHandle.js","text!vcl/prototypes/ui/Form.js","text!vcl/prototypes/ui/controls/Toolbar.js","text!vcl-comps/devtools/Main.js","text!vcl-comps/devtools/TabFactory.js","text!vcl-comps/devtools/DragDropHandler.js","text!vcl-comps/devtools/CtrlCtrl.js","text!vcl-comps/devtools/Workspace.js","text!vcl-comps/devtools/Navigator.js","text!vcl-comps/devtools/Bookmarks.js","text!vcl-comps/devtools/Outline.js","text!vcl-comps/devtools/OpenTabs.js","text!vcl-comps/devtools/Console.js","text!vcl-comps/make/Build.js","text!vcl-comps/devtools/Editor$/html.js","text!vcl-comps/devtools/Editor.js","text!vcl-comps/devtools/Editor$/vcl.js","text!vcl-comps/devtools/Editor$/png.js","text!vcl-comps/devtools/Editor$/md.js","text!vcl-comps/devtools/Editor$/folder.js","text!blocks/prototypes/Console.js","text!vcl-comps/devtools/Editor$/blocks.js","text!vcl-comps/veldoffice/Session.js","text!vcl-comps/devtools/Editor$/xml.js","text!vcl-comps/devtools/Editor$/xsd.js","text!vcl-comps/devtools/App$/code.js","text!vcl-comps/devtools/Main$/code.js","text!vcl-comps/devtools/Main$/Cavalion-code.js","text!vcl-comps/devtools/Workspace$/code.js","text!vcl-comps/devtools/Editor$/js.js","text!vcl-comps/devtools/Workspace$/vcl.js","text!vcl-comps/devtools/Workspace$/blocks.js","text!vcl-comps/App$/code.js",
        
			"text!vcl-comps/App$/bxv.js",
			"text!vcl-comps/devtools/Main$/bxv.js",
			"text!vcl-comps/devtools/Workspace$/cavalion-blocks.js",
			"text!vcl/prototypes/cavalion-blocks.js",
			"text!cavalion-blocks/veldapps/Map.js",
			"text!blocks/prototypes/Node.js",
			"text!cavalion-blocks/veldapps/OpenLayers<>/PDOK-v2.js",
			"text!cavalion-blocks/devtools/OpenLayers<>/Documents.js",
			"text!cavalion-blocks/veldapps/Features<>/imsikb0101.js",
			"text!cavalion-blocks/veldapps/Features<>/imbro.js",
			"text!cavalion-blocks/veldapps/Features<>/itwbm.js",
			"text!cavalion-blocks/veldapps/OpenLayers.js",
			"text!veldapps-imsikb/imsikb0101-all.js",
			"text!cavalion-blocks/veldapps/Features.js",
			"text!veldapps-imsikb/immetingen-all.js",
			"text!veldapps-imbro/domains.js",
			"text!blocks/prototypes/Executable.js",
			"text!blocks/prototypes/Bar.js",
			"text!blocks/prototypes/Tree.js",
			"text!blocks/prototypes/Container.js",
			"text!blocks/prototypes/Element.js",
			"text!vcl-comps/make/Build$/code.js",
        
        
			"text!vcl/prototypes/devtools/App.js",
			"text!vcl/prototypes/App.v1.console.js",
			"text!vcl/prototypes/App.openform.toast.glassy.js",
			"text!vcl-comps/ui/Form.js",
			"text!vcl-comps/ui/controls/Toolbar.js",
			"text!vcl-comps/ui/controls/SizeHandle.js",
			"text!vcl-comps/devtools/DragDropHandler$/dropbox.js",
			"text!vcl/prototypes/devtools/CtrlCtrl.js",
			"text!vcl/prototypes/devtools/Navigator.js",
			
			"text!cavalion-blocks/veldoffice/ListOf<>/Document.js",
			"text!cavalion-blocks/veldapps/ListOf<>/Document.js",
			"text!blocks/prototypes/Column.js",
			"text!blocks/prototypes/Group.js",
			"text!cavalion-blocks/veldapps/ListOf.js",
			"text!blocks/prototypes/Input.js",
			"text!blocks/prototypes/Tab.js",
			"text!veldoffice/models.json",
			"text!blocks/prototypes/Button.js",
			"text!blocks/prototypes/List.js",
			
			"text!blocks/prototypes/Array.js",
			"text!blocks/prototypes/Radiobutton.js",
			"text!blocks/prototypes/Checkbox.js",
			"text!blocks/prototypes/Ace.js",
			"text!blocks/prototypes/Tabs.js"

        ]
//     implicit_components: {
   //     	"text!vcl-comps/App.console.desktop.v1.js":"$([\"App\", \"App.v1\", \"App.desktop\", \"App.console\"]);","text!vcl-comps/App.js":"$([\"vcl/prototypes/App\"]);","text!vcl-comps/App.v1.js":"$([\"App\", \"vcl/prototypes/App.v1\"]);","text!vcl-comps/App.desktop.js":"$([\"App\", \"vcl/prototypes/App.desktop\"]);","text!vcl-comps/App.console.js":"$([\"App\", \"vcl/prototypes/App.console\"]);","text!vcl-comps/ui/forms/util/Console.js":"$([\"vcl/prototypes/ui/forms/util/Console\"]);","text!vcl/prototypes/App.openform.toast.js":"$([\"vcl/prototypes/App\", \"vcl/prototypes/App.toast\", \"vcl/prototypes/App.openform\"]);","text!vcl-comps/ui/controls/Toolbar.js":"$([\"vcl/prototypes/ui/controls/Toolbar\"]);","text!vcl-comps/Portal$/Onderzoek.js":"$([\"Portal\"]);","text!vcl-comps/Portal.reports.js":"$([\"Portal\", \"vcl/prototypes/Portal.reports\"]);","text!vcl/prototypes/Portal.reports.js":"$([\"vcl/prototypes/Portal\"]);","text!vcl/prototypes/Portal.js":"$(\"vcl/Component\", \"dead-end\");","text!vcl-comps/ui/forms/Portal.js":"$([\"vcl/prototypes/ui/forms/Portal\"]);","text!vcl-comps/Home.reports.js":"$([\"Home\", \"vcl/prototypes/Home.reports\"]);","text!vcl-comps/Home$/Onderzoek.js":"$([\"Home\"]);","text!vcl/prototypes/Home.reports.js":"$([\"vcl/prototypes/Home\"]);","text!vcl/prototypes/Home.js":"$(\"vcl/Component\", \"dead-end\");","text!vcl-comps/ui/forms/Home.tree.js":"$([\"ui/forms/Home\", \"vcl/prototypes/ui/forms/Home.tree\"]);","text!vcl-comps/ui/forms/Home.js":"$([\"vcl/prototypes/ui/forms/Home\"]);","text!vcl-comps/ui/forms/View.js":"$([\"vcl/prototypes/ui/forms/View\"]);"}
    }
}];