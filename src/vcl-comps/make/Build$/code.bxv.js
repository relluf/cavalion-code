"use js";
//
// cd C:\Users\ralph\Source\veldapps.com\veldoffice\rapportage
// node r.js -o build.json
//
["", {
    vars: {
    	"app-js": "Workspaces/cavalion.org/cavalion-code/src/app.js",
    	
		modules: ["js/nameOf","util/Browser","util/HtmlElement","util/Event","console/node/OnlyKey","pouch/bower_components/pouchdb/dist/pouchdb","util/Hash","vcl/Application","lib/node_modules/dropbox/dist/Dropbox-sdk","pouch/bower_components/relational-pouch/dist/pouchdb.relational-pouch","pouch/bower_components/pouchdb-find/dist/pouchdb.find","pouch/pouchdb.save","js/global","js/minify","js/beautify","vcl/EventDispatcher","js/serialize","vcl/CssRules","util/DocumentHook","util/Stylesheet","locales/prototype","locales/en-US","util/Ajax","text","vcl/ui/Ace","vcl/ui/FormContainer","ace/ace","util/Text","vcl/ui/Panel","vcl/ui/Form","vcl/Control","vcl/ui/Popup","vcl/ui/List","vcl/ui/Container","util/Fullscreen","vcl/ui/Element","vcl/ui/Tree","vcl/ui/Node","vcl/Action","vcl/ui/Button","vcl/ControlUpdater","vcl/Dragger","data/SourceEvent","data/Source","vcl/ui/ListColumn","vcl/ui/ListHeader","vcl/ui/ListFooter","vcl/ui/Group","vcl/ui/ListBody","vcl/ui/ListRow","vcl/ui/Console","util/HotkeyManager","data/SourceState","vcl/ui/Console.evaluate","util/Keyboard","vcl/ui/Input","vcl/ui/Tabs","util/Clipboard","devtools/Parser","vcl/ui/Sizer","devtools/cavalion-devtools","vcl/ui/Bar","util/Xml","vcl/ui/Tab","lib/node_modules/papaparse/papaparse","lib/bower_components/markdown/lib/markdown","veldapps-xml/index","veldapps-xml/fast-xml-parser/parser","veldapps-xml/comment-parser","vcl/data/Array","veldapps-gds-devtools/index","veldapps-gds-devtools/vcl-comps/devtools/Renderer$/locales/prototype","veldapps-gds-devtools/vcl-comps/devtools/Renderer$/locales/nl","veldapps-gds-devtools/Util","veldoffice/VO","veldoffice/EM","veldoffice/Session","veldoffice/nameOf","entities/Instance","veldoffice/models","jquery","entities/Model","json","veldoffice/devtools","devtools/NavigatorNode","lib/node_modules/marked/marked.min","lib/node_modules/@highlightjs/cdn-assets/highlight.min","lib/node_modules/marked-highlight/lib/index.umd","ace/ext-modelist","amcharts","amcharts.xy","amcharts.serial","vcl/ui/Node-closeable","vcl/ui/Select","lib/node_modules/regression/dist/regression","vcl/ui/Checkbox","vcl/ui/PopupButton","jszip","veldapps-imsikb/util","fast-xml-parser","veldapps-imsikb/js/nameOf/methods","veldapps-imsikb/urns","veldapps-imsikb/lookup","veldapps-imsikb/traverse","veldapps-imsikb/guess","vcl/ui/Radiobutton","veldapps-ol/Map-default","veldapps-ol/Map-klic","veldapps-ol/proj/RD","veldapps-ol/Map-bro","veldapps-ol/Map-nederland","veldoffice/KLIC","lib/node_modules/proj4/dist/proj4-src","lib/ol-6.14.1-dist/ol","cavalion-blocks/veldapps/_","cavalion-blocks/veldapps/locales","vcl/ui/CheckGroup","veldapps-ol/util","cavalion-blocks/$HOME/Dropbox-veldapps/Issues/VA-20220501-1-Map/FeaturesOf<>/MeetpuntCache","cavalion-blocks/$HOME/Dropbox-veldapps/Issues/VA-20220501-1-Map/FeaturesOf<>/MeetpuntColors","cavalion-blocks/$HOME/Dropbox-veldapps/Issues/VA-20220501-1-Map/FeaturesOf<>/MeetpuntWebGLLayer","lib/node_modules/rbush/rbush","util/Queue","util/EventEmitter"],
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
			"text!blocks/prototypes/Tabs.js",
			
			
			"text!vcl-comps/App$/code.bxv.js",
			"text!vcl-comps/devtools/App$/veldoffice.js",
			"text!vcl-comps/devtools/Main$/code.bxv.js",
			"text!vcl/prototypes/devtools/DragDropHandler.js",
			"text!vcl-comps/cavalion-blocks.js",
			"text!cavalion-blocks/veldapps/OpenLayers<>/PDOK-v3.js",
			"text!blocks/prototypes/Hover.js",
			"text!blocks/prototypes/Container.closex.js",
			"text!blocks/prototypes/Container.glassy.js",
			"text!cavalion-blocks/devtools/Alphaview.js",

			"text!vcl-comps/devtools/Workspace$/cavalion-blocks:Dropbox-veldapps/Issues/VA-20220501-1-Map/Map.js",
			"text!vcl-comps/devtools/Workspace$/cavalion-blocks:Dropbox-veldapps/Issues/VA-20220501-1-Map.js",
			"text!vcl-comps/devtools/Workspace$/cavalion-blocks:Dropbox-veldapps/Issues.js",
			"text!vcl-comps/devtools/Workspace$/cavalion-blocks:Dropbox-veldapps.js",
			"text!cavalion-blocks/$HOME/Dropbox-veldapps/Issues/VA-20220501-1-Map/Map.js",
			"text!cavalion-blocks/$HOME/Dropbox-veldapps/Issues/VA-20220501-1-Map/FeaturesOf<>/Meetpunt.js"

        ]
//     implicit_components: {
   //     	"text!vcl-comps/App.console.desktop.v1.js":"$([\"App\", \"App.v1\", \"App.desktop\", \"App.console\"]);","text!vcl-comps/App.js":"$([\"vcl/prototypes/App\"]);","text!vcl-comps/App.v1.js":"$([\"App\", \"vcl/prototypes/App.v1\"]);","text!vcl-comps/App.desktop.js":"$([\"App\", \"vcl/prototypes/App.desktop\"]);","text!vcl-comps/App.console.js":"$([\"App\", \"vcl/prototypes/App.console\"]);","text!vcl-comps/ui/forms/util/Console.js":"$([\"vcl/prototypes/ui/forms/util/Console\"]);","text!vcl/prototypes/App.openform.toast.js":"$([\"vcl/prototypes/App\", \"vcl/prototypes/App.toast\", \"vcl/prototypes/App.openform\"]);","text!vcl-comps/ui/controls/Toolbar.js":"$([\"vcl/prototypes/ui/controls/Toolbar\"]);","text!vcl-comps/Portal$/Onderzoek.js":"$([\"Portal\"]);","text!vcl-comps/Portal.reports.js":"$([\"Portal\", \"vcl/prototypes/Portal.reports\"]);","text!vcl/prototypes/Portal.reports.js":"$([\"vcl/prototypes/Portal\"]);","text!vcl/prototypes/Portal.js":"$(\"vcl/Component\", \"dead-end\");","text!vcl-comps/ui/forms/Portal.js":"$([\"vcl/prototypes/ui/forms/Portal\"]);","text!vcl-comps/Home.reports.js":"$([\"Home\", \"vcl/prototypes/Home.reports\"]);","text!vcl-comps/Home$/Onderzoek.js":"$([\"Home\"]);","text!vcl/prototypes/Home.reports.js":"$([\"vcl/prototypes/Home\"]);","text!vcl/prototypes/Home.js":"$(\"vcl/Component\", \"dead-end\");","text!vcl-comps/ui/forms/Home.tree.js":"$([\"ui/forms/Home\", \"vcl/prototypes/ui/forms/Home.tree\"]);","text!vcl-comps/ui/forms/Home.js":"$([\"vcl/prototypes/ui/forms/Home\"]);","text!vcl-comps/ui/forms/View.js":"$([\"vcl/prototypes/ui/forms/View\"]);"}
    }
}];