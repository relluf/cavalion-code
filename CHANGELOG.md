### 2020-09-18

	+ cavalion-vcl@1.1.11
	- ipfs@0.50.2: removed 807 packages and audited 82 packages in 7.775s

- Removed IPFS dependencies, a more lightweight approach seems wise
- Starting to use colors in a new title area

### 2020-09-14

	+ cavalion-devtools@1.0.10
	+ cavalion-js@1.0.54

### 2020-09-13

	+ ipfs@0.50.2
	added 807 packages from 1164 contributors and audited 889 packages in 139.229s

- Adding IPFS (69M) via NPM, not really necessary since only `dist/index.min.js` is actually used - but then again, that's where the build-process come is

### Before: 236M
![image](https://user-images.githubusercontent.com/686773/93016465-fbf85480-f586-11ea-91c5-33e6b5b65ac7.png)
### After: 305M
![image](https://user-images.githubusercontent.com/686773/93016469-01ee3580-f587-11ea-941a-c2bf87f99e45.png)

### 2020-09-11 / 1.0.123

	+ cavalion-vcl@1.1.10
	+ cavalion-blocks@0.9.18
	+ cavalion-devtools@1.0.9

* Deploying new features of cavalion-devtools' Console

### 2020-09-07 / 1.0.122

	+ cavalion-devtools@1.0.8
	+ cavalion-vcl@1.1.8
	+ cavalion-js@1.0.53
	+ framework7@5.7.12

### 2020-08-30 / 1.0.121

* Updating build

### 2020-08-27

	+ papaparse@5.3.0
	+ cavalion-vcl@1.1.7
	+ cavalion-devtools@1.0.7
	+ cavalion-js@1.0.52

### 2020-08-22 / 1.0.120

	+ cavalion-vcl@1.1.6
	+ cavalion-js@1.0.51
	+ cavalion-devtools@1.0.6
	+ framework7@5.7.11

* Mainly updating new features for Editor-descendants (csv, xml)
* Many console improvements

### 2020-08-02 / 1.0.119

	+ cavalion-js@1.0.50
	+ ol@6.4.3
	+ cavalion-blocks@0.9.17
	+ mapbox-gl@1.12.0
	+ cavalion-devtools@1.0.5
	+ cavalion-vcl@1.1.3

* Updating packages

### 2020-08-02 / 1.0.118

	+ cavalion-blocks@0.9.16
	+ ol@6.4.2
	+ cavalion-devtools@1.0.4

* Updating packages, build, etc. (in favor of veldoffice.nl/code (and veldapps.com/code perhaps))

### 2020-07-29 / 1.0.117

	+ cavalion-js@1.0.49
	+ ol@6.4.0
	+ cavalion-devtools@1.0.2
	+ framework7@5.7.10
	+ cavalion-vcl@1.1.1

* Updating packages, build, etc.

### 2020-06-10

	+ cavalion-devtools@1.0.1
	+ cavalion-js@1.0.48
	+ veldoffice-js@1.0.47
	+ framework7@5.7.8
	+ mapbox-gl@1.11.1

* Now using **cavalion-devtools**

### 2020-06-10 / 1.0.116

	+ cavalion-js@1.0.45
	+ cavalion-vcl@1.0.78

* Updated app.js, lib.js as well
* Better Alt+Click

### 2020-06-06 / 1.0.115

	+ framework7-icons@3.0.1
	+ framework7@5.7.7
	+ cavalion-js@1.0.44
	+ veldoffice-js@1.0.46
	+ cavalion-vcl@1.0.77
	+ proj4@2.6.2
	+ mapbox-gl@1.10.1

### 2020-04-14 / 1.0.114

	+ cavalion-blocks@0.9.15
	+ cavalion-js@1.0.38
	+ cavalion-vcl@1.0.74

### 2020-04-06 / 1.0.113

	+ papaparse@5.2.0
	+ proj4@2.6.1
	+ ol@6.3.1
	+ cavalion-vcl@1.0.72
	+ mapbox-gl@1.9.1

* Updating cavalion-vcl (relative require!)

### 2020-04-03 / 1.0.112

	+ cavalion-blocks@0.9.14

- Developing focus movements of selected `Tab<devtools/Editor>` (or 'vcl/ui/Tabs`?)

### 2020-02-16
- Add mapbox-gl

### 2020-01-24 / 1.0.111
- Doubleclick `devtools/Editor<folder>#editors-tabs` to create new resource
- Enhancing inheritance, performance and features of `devtools/Editor<csv>` and `dectools/Editor<var/log>`


### 2020-01-22 / 1.0.110
	+ cavalion-js@1.0.35
	+ cavalion-vcl@1.0.70

### 2020-01-10 / 1.0.109
	+ cavalion-code-blocks@1.0.12
	+ cavalion-vcl@1.0.69

### 2020-01-10 / 1.0.108
	+ cavalion-code-blocks@1.0.10
- Finetuning and bugfixing for a demo/collab with TO

### 2020-01-10 / 1.0.107
	+ cavalion-code-blocks@1.0.9
- Speed up searching in `devtools/Editor<csv>` (was terribly slow)
- Source pane is now left aligned and by default invisible for `devtools/Editor<csv>`
- No wrapping by default seems a better default for 'devtools/Editor<>`
- Adding many shortcuts, of which a few:
	- Ctrl+Shift+I - new Github-issue
	- Ctrl+Alt+...

### 2020-01-08 / 1.0.106
- `devtools/Editor<md> #ace` will be invisible by default when a file named `.md` (ie. dot md) is loaded.

### 2020-01-07 / 1.0.105
	+ cavalion-code-blocks@1.0.8
	+ cavalion-vcl@1.0.68
- Introducing `devtools/Editor<js>` - autofolding on first run, sub-classes/-comps/-blocks:
	- `devtools/Editor<vcl>`
	- `devtools/Editor<blocks>`

### 2020-01-05 / 1.0.104
	+ cavalion-code-blocks@1.0.7
	+ cavalion-vcl@1.0.67
- Introducing pull/push to dbs.veldapps.com in `pouchdb.save`

### 2020-01-05 / 1.0.103
- Fixed a bug where retina-images might not be scaled correctly just after opening a resource in `devtools/Editor<md>`
- TODO Implementing Tab.event-onMenuClick~Executable#menu-open.execute
	- ui/Tab.js: Fix for onMenuClick (add to prototype)
- Refactored va\_objects-instance (which is called code-va_objects most of the times anyways), from V7 -> code
- Source-panes (#ace) of devtools/Editor<md>#.md are invisible by default

### 2020-01-04 / 1.0.102
- Fix for vcl/Component.storage-pouch-prototype.readStorage()


### 2020-01-02 / 1.0.101
- Supporting JSO
- Starting implementation of an Azure-inspired horizontal scrolling UI. The source panel can be revealed by scrolling with two fingers on Macbook trackpad - so cool !

>> ![image](https://user-images.githubusercontent.com/686773/71699764-cc057a00-2d86-11ea-9446-1a7678df5396.png?2x)

- `localhost/code?{appName}&workspaces={workspaces}&title={title}&db={db}`
	- **appName** - application name
	- **workspaces** - comma-seperated list of workspaces to be opened
	- **title** - title of the window
	- **db** - the PouchDB instance for va\_objects. When omitted it defaults to **appName** splitted by a dot (.) or dash (-). So in the following example `Veldoffice`, `Veldoffice-beheer` and `Veldoffice-rapportage` all three by default share the same va_objects PouchDB-instance:
		- `localhost/code?Veldoffice`
		- `localhost/code?Veldoffice-beheer`
		- `localhost/code?Veldoffice-rapportage`
- **appName** is used as the specifier for the `devtools/App<>`- and `devtools/Main<>`-instances
- `devtools/Main<>` can be implemented to solve the problem of default-workspaces - these will now nicely flow into PouchDB - let's see how this develops

>> ![image](https://user-images.githubusercontent.com/686773/71699435-1554ca00-2d85-11ea-9956-76c16cb3d367.png?2x)

With these `vars` as shown above it's a piece of pie later on to mixin a pouch'd state into the `default-state` or the `bulk` to make analogy with `V7/va/veldoffice/onderzoek`. When no pouch'd state is available the coded state remains.

>> ![image](https://user-images.githubusercontent.com/686773/71699477-4f25d080-2d85-11ea-9f70-6413e866fb37.png?2x)

### 2020-01-01 / 1.0.100
- Fixing folding-restore bug in devtools/Editor<>
- Updating and fine-tuning, approaching "devtools-invisible"
- Now persisting devtools/Editor<> #ace "word-wrap"-state

### 2020-01-01 / 1.0.99
- Current url pattern: `host/code?[AppName][&workspaces=ws1,ws2,ws3][&title=MyApp][&db=AppName-va_objects]`
- Refactoring devtools/Main<> and state persistence
- Starting persisting state for devtools/Editor<folder>
- Cleaning up dead code, implementing onGetStorageKey for [devtools/Resource~resource]-varred (ie. tagged) components (did component tagging just occur to me?)

### 2019-12-28 / 1.0.97
- Updating node_modules
	+ cavalion-code-blocks@1.0.1
	+ cavalion-vcl@1.0.65
- Adding shortcut for changing focused Tabs instance
- A dash in the Workspace name doesn't "implicit inherit" anymore

### 2019-12-25
- Introducing NPM module `cavalion-code-blocks`

### 2019-12-24 / 1.0.96
- Editing "pouchdb://"-resources with contentType equal to `application/json` like editing records in the database"
- Introducing VO.app workspace, a workspace for the application VO

### 2019-12-21 / 1.0.95
- Reorganzing cavalion-blocks
	- Library -> .../dropbox@veldapps.com
	- Source actively pushed from macbook2
- Using PouchDB as storage layer for application state
	- Thinking about hiding devtools in order to debug/design application with Code
- Updating to cavalion-vcl@1.0.64

### 2019-12-16 / 1.0.94
- Trying to sync workspace with PouchDB

### 2019-12-13 / 1.0.93
- Working on sharing workspaces (VO.app)

### 2019-12-02 / 1.0.92
- Lots of improvements, but most importantly relative require implemented for devtools/Editor<blocks>

### 2019-10-29 / 1.0.90
- Adding pouchdb://-resources

### 2019-10-06 / 1.0.88
- Adding search feature to devtools/Editor<csv>
- Introducing devtools/Editor<tsv>
- Improving devtools/Editor<>
	- resource.contentType (application/json)
	- improving UX non-existent resource messages (still horrible though)
- Introducing **devtools/Resources-pouchdb**, finally ;-) . 
![](https://i.snipboard.io/VAwKOF.jpg?2x)

### 2019-09-01 / 1.0.87
- Updating V7 dependency
- Now using inset tabs for most bottom tabs (workspaces will remain default)
- Working on devtools/Editor<>

### 2019-08-31 / 1.0.86
- Updating for Docker container install
	- Bower is fighting back

### 2019-07-03 / 1.0.84
- Tweaking blurry's position
- Cleaning up
- Updating favorites of devtools/Workspace<blocks>
- Updating dependencies

### 2019-06-23 / 1.0.83
- Cleaning up around `vcl/Component.prototype.print()`

### 2019-06-19 / 1.0.81
- New build for PDOK stuff
- Cleaning up workspaces that should live in server2/Dropbox/local PouchDB

### 2019-06-14 / 1.0.80
- Working PDOK and veldoffice-geografie

### 2019-06-12 / 1.0.77
- Still working on PDOK
- Fixed an issue in Navigator where searching resources by uri turned out to be pretty buggy (whole thing needs a rewrite, but hey, what else is new)

### 2019-06-11 / 1.0.72
- Advancing PDOK integration

>> ![](https://i.snag.gy/npXUer.jpg?2x)

### 2019-06-10 / 1.0.71
- Hacking at and with PDOK, will result in some future refactorings

### 2019-06-10 / 1.0.70
- OpenLayers 5 related adjustments
- Blurred got some tweaks
- Integrating PDOK viewer catalog in devtools/Navigator - this is fun! :-)
- Introducing `utils/asarray` (and utils as a matter of fact)

### 2019-06-08 / 1.0.69
- Fixed some issue with Component.prototype.getKeysByUri
- Removed devtools/Workspace<>-descendants from the build

### 2019-06-08 / 1.0.68
- Bumped up to 68, improving Navigator, Editor<folder>, App, Main
- Commiting more `devtools/Workspace<>` implementations. These will become the core functionality on which user will base their workspaces. Static workspaces is a good thing.
- Working on OpenLayers
- Introducing RWR (Rapid Window Recognition, something is  being rendered when the window blurs (devtools/App.js)

>>>>> ![](https://i.snag.gy/NgQs3m.jpg?2x)

- Advancing `devtools/Editor<folder>` (_though I guess this code will dissapear here and move to local resources_). Explode models, it's fun:

>>>>> ![](https://i.snag.gy/UAlEFY.jpg?2x)

### 2019-06-05 / 1.0.65
- Fixed (some of) devtools/Navigator's indexing issue(s)
- Introducing window blurred feature

### 2019-05-08
- Fixed several issues concerning focussing elements using the various sidebar related keyboard shortcuts

### 2019-04-16 / 1.0.64
- Console: edit(ws)
- Workspace<>: favorites!
- Fixing some lib issues with bower_components
- Workspace/App: working on Component.prototype.open() implemention 

### 2019-04-13 / 1.0.63
- Refactoring modules: js, vcl, blocks, code, devtools, ide
- Refactoring project structure to match layout of V7
	- lib/bower_components
	- lib/node_modules
	- src/cavalion-blocks/
	- src/vcl-comps/
- ui/forms/util/Console: adding ws, ace, host, root, etc.
- Implemented Component.prototype.open() in devtools/Workspace->editor-needed and devtools/Main->workspace-needed
- Doing some work on devtools/Navigator and devtools/Workspace<> in order to support "workspace specific favorites"
- Introducing `setPaths()` in ui/forms/util/Console

### 2019-04-11 / 1.0.62
- Logging version during startup
- Tuning storage for devtools/Workspace<> settings

### 2019-04-10 / 1.0.60
- Removed devtools/Workspace<> instances from app.js

### 2019-04-06 / 1.0.59
- "No more bitmaps"-update
- Showing min/maxOccurs in (xsd manager)
- Advancing devtools/Workspace<Veldoffice>

### 2019-03-06 / 1.0.57
- Wrapping up some coding around imsikb0101-13.5.0
- Added dblclick handler to open new workspace
- Improved user-facing messages when dealing with errors and non-existent resources in devtools/Editor<>
- Improved devtools/Editor<xml> gml()-function
- Manager.js: Adding all stars

### 2019-02-19 / 1.0.55
- Added the "*"-tab to `devtools/Editor<xsd>`
- Several adjustments made to use improved vcl/ui/Console
- Further improving `devtools/Editor<xsd>`
	- implemented xlink:href
	- developing code generation iterations
		- Writers
		- Collectos

### 2019-02-13 / 1.0.53
- Stamping XSD elements in order to correctly regenerate namespace

### 2019-02-11 / 1.0.52
- Thinking about using `vcl/Component.prototype.print` at application-, workspace- and project/editor- level
- Improving `devtools/Editor<xsd>` better

### 2019-02-06 / 1.0.48
- Advancing `devtools/Editor<xsd>`, loading all relevant XSD files in the workspace

### 2019-02 / 1.0.45
- Developing `devtools/Editor<xsd>`, gathering type info like attributes and relationships in order to auto-generate code templates for importing and exporting

### 2019-01 / 1.0.44
- Got rid of annoying logging (Less)
- Enhancing devtools/Editor<blocks/vcl/svg>
- Enhancing keyboard navigating nested editor tabs
- Tweaking PouchDB usage for read/writeStorage, data is now considered to be JSON object (valid strings are parsed and thus instantiated automatically)
- Started working on a PouchDB viewer/editor (ide/pouchdb/AllDocs)
- Finally fixed the images vs. devicePixelRatio issue in `Editor<md>`

### 2018-12 / 1.0.43
- Navigating `devtools/Workspace<>:root #editors-tabs`
- Centralizing/staticfying keyboards shortcuts

### 2018-12 / 1.0.42
- Fixing issues with loading cavalion-blocks inline
- Adding dygraphs
- F5 refreshes the navigator when search is focused (finally)
- Implemented open_form in Main.js - use `open('<uri>')` in the console (open\_form must refactor to page somehow)
- Introducing `tools/make/Build`, not sure whether it's the way go though
- Creating a first build and second (optimized) build
- Improving `Editor<blocks>` and `Editor<vcl>`
- Adding to ability to instruct `Editor<md>` about highresulution (@2x) images
- Facilitating switch to load certain modules (cavalion\_js, cavalion\_vcl, cavalion\_blocks, veldoffice\_js) from the default node\_modules or soome other path set in localStorage 
- Improved searching Editor<md>/PostParser

>>![](https://i.snag.gy/jFQ2aT.jpg?1)
>>![](https://i.snag.gy/3KrkJY.jpg)

- Finally supporting (viewing) PDF files  

>>![](https://i.snag.gy/7EJca1.jpg)

- Finally starting using PouchDB as storage layer
- Bolder folder
- Blending in Veldoffice/Velddata

>>![](https://i.snag.gy/2R1ifr.jpg)

### 2018-10
- Introducing devtools/Editor<xsd>
- Using NPM for the cavalion-js/vcl/blocks libraries
- Added `window.req`

 
>> ![](https://i.snag.gy/E8pPKz.jpg)

### 2018-05-21
- Improved reloading in `devtools/Editor<blocks>`
- Finetuning illegal workspace characters and the navigator tree

### 2018-05-10
- Developing PostParser/Factory
- Improving pagination for vcl-data/Pouch, now handling 1000s without hassle
- Adding pace to the mix

### 2018-05-05
- Component.query: adding vars() to Result
- ImageSnagger was born, this should be the begin of persisting in Pouch

### 2018-04-24
- `cavalion-blocks` now supports `vcl-comps`
- Porting to cavalion-blocks way of doing things

### 2018-03-22

* **devtools/Editor<csv>** - Switching to PapaParse

### 2018-03-21

* Start using `cavalion-blocks`
* `veldapps` namespace is emerging
* Advancing `devtools/Editor<xml>`

### 2018-02-28

New release due to bug fixes in cavalion-vcl and cavalion-code.

### 2018-02-22

Adding dojo to the mix of libraries to work with. 

![](https://snag.gy/9NGLq4.jpg)

### 2018-02-21

Lot's has changed, lets see if I can recall (using GitUp).

![](https://i.snag.gy/cTzw04.jpg)

* Introducing locales/prototype - common ground for all locales
* Updating bower configuration
* Using localStorage to tweak dependency locations
* Adding RequireJS shim config for AmCharts3
* `devtools/App`: refactoring code, been playing around with localStorage-pouched for shared Workspace settings between browsers
* `devtools/Editor<>`: Improving png, csv, vcl and introducing xml

### 2018-02-11
- Made workspaces configuration visible and accesible for Theo
- Autodetect `tools/vcl-comps` and `vcl-comps/tools` resources

> ![](https://i.snag.gy/FQHaCm.jpg)  
(*Need away to link directly to these kind of snippets*)

### 2018-02-10
- The visibility of the Left sidebar is maintained in workspace state

### 2018-02-09
- Developing `code/Node<>` components
- vcl/Action#toggle-source for devtools/Editor<md>
- Setting up PouchDB libraries via bower 
- Moved STREAM.md and DESIGN.md to (personal) Dropbox (for now?)

### 2018-02-07
- Integrating .md more and more
- Developing vcl-comps/code/Navigator, how to work with dynamic and static nodes. Thinking about offline-first stuff.
- Made src/styles.less override vcl-comps::css definitions
- Moving general styles to styles.less

### 2018-02-04
- Improved [Navigator vcl/Action#focus-resources], some smooth scrolling would be nice still, though...

### 2018-02-03
- Introducing **devtools/Editor<csv>**

### 2018-02-02
- Fighting with pouchdb-live-find, seems promising, but can't get it to work (yet)
- Envisioning "samenwerken", V7 met Karel, devtools2/code

### 2018-02-01
- Writing some more Markdown in Main.md
- Still debugging devtools/Resources-node (sigh)
- In need of a test workflow as well going forward (!!)

### 2018-01-31
- Enhancing Markdown support

### 2018-01-30
- Finetuning Navigator, Resources, cavalion-server/fs
	- Things always cost more time than you think 
	- This Resources thing is and was a mess (but het doel heiligt de middelen)
	- Need general entity modelling everywhere
- Introducing Main.md (how about grouping all .md resources in the Navigator? We need filters)

### 2018-01-27
- Moving to Git in order to be able to more easily share code within Cavalion team, for now focus will be a build which should be runnable

### 2018-01-21
- Fixing some non-escaped HTML (vcl/ui/Tab, vcl/ui/Node)
- Adding several libraries to main.js
- Tweaking Navigator and Editor<vcl>
- Start using locale()

### 2018-01-10
- Adding search field to OpenTabs (finally) - still needs work
- Source tab of devtools/Editor<vcl> can now be hidden
- Added Shift+MetaCtrl+Enter shortcut to activate preview in devtools/Editor<vcl>

### 2018-01-08
- Adding AmCharts to the mix
- EditorsTabs -> OpenTabs
- Some annoyancees fixed in devtools/Navigator
	- double clicking/clearing search field now works correctly the first tim
	- filtering is working correctly
- Introducing/using/developing vcl-comps/tools/
- Just noticed that this project didn't have a CHANGELOG :-S
	(below follows a COPY from vcl project)
	
### 2018-01-02
- Giving some love to vcl/Component::handlers and ::overrides
- vcl/Factory now catching eval errors
- vcl/ui/Printer now supports native Promise (js/Deferred.prototype.then())
- entities/Model.parse() now resolves models
- Added loaded event for Component::onLoad
- Developing veldoffice/Session, veldoffice/EM and veldoffice/models
- Adding locale

### 2017-11-04
- devtools/Workspace: Added query close for tabs
- devtools/Editor<html>: First steps to specific [uri=*.\.page/\.html] editor

### 2017-10-18
- Improved context handling with Pages and App7.loadPage (basically it's all back to url_query again, but that's a good thing :-))
- EM.query: When omitted pagesize will default to 50

### 2017-10-15
- Pages: Removing obligatory less resource. It seems these are hardly used and can always be required by the conroller module
- Commiting in favor of V7

### 2017-10-11
- Code: new release

### 2017-10-08
- V7: Releasing build 126
- stylesheet! - now supporting less
- Embracing Template7, setting up context before loading page

### 2017-10-02
- Editor<html>: Restoring scroll position upon changes in the source code

### 2017-08-11
- Component.query: Added toggleClass()
- Query.events: Added "event"
- vcl/data/Pouch: Finetuning, developing...
- vc/prototypes/App.framework7: Adding debug support
- vcl/ui/Panel: Finetuning zoom
- entities/EM: Developing, finetuning
- Resolved: #1297

### 2017-07-01
- Introducing vcl/ui/Panel (might move upwards in the class hierarchy) zoom (cool feature!!)

### 2017-06-24
- Adding vcl/data/Pouch in the mix
- Optmizing performance for vcl/ui/List icw vcl/data/Array
- Fixing (workaround) some weird bug with Function.prototype.toString

### 2017-06-20
- Updating code base

### 2017-04-23
- Improving make/Build

### 2017-03-16
- Reorganized JavaScript libraries
- Conformed code/devtools to new struture
- Currently working on:
	- eae.com/BBT/appx
	- veldapps.com/code
	- cavalion.org/devtools
	- veldapps.com/V7
	- veldapps.com/vcl-rapportage-module

### 2017-03-11
- Getting rid of cavalion.org/... module requires, now using relative paths within cavalion.org sources/modules

### 2017-03-07
- Removed [id^=vcl-] from Control CSSRules selector
- Making FormContainer work with relative formUris

### 2017-03-04
- Optimizing code for folding features in Ace
- Fixing bugs for not being comptabile with IE
- Refresh button in ui/entities/Query
- Time for cavalion.org/Command to go away - jquery.ajax should be sufficient
- Deprecating App.scaffold

### 2017-02-28
- Working on entities/Instance <--> model, how to receive sets/one-to-many collections from server?
- Fixing scaffolding issues. No longer a-synchronous. All scaffold code should run *before* onLoad.
- Explicit express in code that an certain component should be scaffolded, eg.:
	- View<Measurement>: $(["ui/entities/Query<Measurement>.scaffold"], {}, []);
	- View<Modem>: $(["ui/entities/Query<Modem>.scaffold"], {}, []);
- Working on nesting operators for Component.prototype.qsa
- Working on vcl/Control's update bug
- Introducing vcl/Action:onUpdate
- Bugfixing vcl/entities/Query; tuples vs instances
- Improving vcl/ui/FormContainer with new API swapForm()
- Simplyfing CSS fonts

### 2017-02-25
- Bug fixed where parent could not be nulled in a vcl resource
- Refactoring/bugfixing scaffolding

	$(["View<Logger>.select"]);

### 2017-02-24
- Bugfixing vcl/Control.update, where controls could be updated while not anticipated for and leave them in a inconsistent state in relation to the DOM (mailny they would be removed from the DOM)
- Implementing scaffolding in vcl/Factory
- Added nesting operator (<) to vcl/Component.query, indicating to parent/child relationship

### 2017-02-23
- Integrated Dygraphs for visualizing measurements in a interactive timeline
- Keeping UI as simple as possible
- Refactoring vcl/prototypes/App.v1 to multiple classes, like .openform, .console (developing)
- Adding component name in DOM node classes, prefixed by a #-sign
- Refer to component names in css definitions (# --> \\#)

### 2017-02-17
- Developing ui/entities/Query, ./QueryFilters, ./AttributeInput
- Finetuning Component.qs, still need a good operator for controls

### 2017-02-14
- Working on vcl/ui/Input
	- toInputValue/fromInputValue

### 2017-02-02
- Reformatting code to be better suited for folding features in the editor
- Console: Introducing req()
- vcl/Component.prototype.setVars: Now allowing a string as input (js.str2obj)

