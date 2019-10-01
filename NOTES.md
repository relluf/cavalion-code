# Features/Low Hanging Fruit

Getting more and more comfortable with PouchDB. Still I am merely using 5% of its features. VA.objects seems to be succesful.

* More offline first in cavalion-code
	* Persist vcl/Component state in VA.objects-like manner
	* Server is the prototype, mothership
---

* GLOBAL HOTKEYS (not nested in components)
* ALREADY OLD FEATURE - WHYIWYG on the device - two screen
	* laptop is development env
	* device is running the app which you are debugging/developing
	* laptop and device share the same POUCHDB so that live updating is always there from the beginning
		* this is what Metro is? but then transparent/open
* Favorties resources (favorite, but not indexed?)
* Every resource has a chevron-down now, so that means that every resource can A FOLDER (!!!)
	* what about linking resources?
* Ctrl+Cmd+Num to switch to editors
* alt-clicky-2.0.0
* generate content for multiple files
	* Victor Appelscha
* folder/multiple resources editing "as a whole"
	* upload ZIP to Dropbox
	* expand in browser -> pouchdb
	* ...
* devtools/Editor<>
	- before determining Editor, check to see whether there is a directive for what Editor to use?
	- save source for specific editor in cavalion-blocks format in pouchdb (!!)
* devtools/Editor<html> uitbreiden met Template7 preview
	* Template7 preview
	* Template7 data
	* data? waar komt ie vandaan in code?
		* opslaan in PouchDB op basis van resource URI
		* 
* project -< workspace
* new shell - code-1.5.0
	* Use Chrome DevTools' font	
	* pure node_modules
	* pure nobackend (pouchdbs)
		* GENERATE/POST documents to back-end
		* GET/PERSIST documents from back-end
		* VA.objects - multiple dbs
			* veldoffice://onderzoek/11161119
			* veldoffice://meetpunt/1234567
			* va/personal://account/veldoffice
			* va/personal://account/veldwerkm
			* va/personal://account/velddata
			* dropbox-123://...
			* v7_6664cee32622a7c60f6b8255ec973f35://
	* pure blocks
		* [vcl-2.0.0](http://where.com) under the hood 
	* pure locales
		* use [i18next](https://www.i18next.com/overview/api) under the hood
* keyboard navigation (nested tabs)
	* Ctrl+Shift+Cursors