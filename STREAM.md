
## Features

* **Copy/Paste** - Well, obviously...

* **Persist/Restore Component State** - Pages, :root, read/writeStorage()

* **Toast on Hotkey Pressed** - For screen recording - or can QuickTime Recorder already do that?

* **Screenshots** - Use of screenshots is so cool and would be scriptable/componentable in Code, that can be __an amazing feature__!!

* **Workflow** - create a redmine issue, upload a file to Veldoffice, notify person, run script with this context

* **Workspace Management** -

* **Resource Editing** - By default a log is kept of every resource being edited through the editor. Everytime you save a copy is made. In your local PouchDB. Which you can sync to the cloud. You probably also have it connected to a GitHUb-repo as well, so it's not for version management, other than on that specific location. Automatically packs hourly, daily and weekly checkpoints. Don't loose your history anymore. Be able to rebuild up from start.

		> Big Brother

* **Photo/Document/Files Manager** 

	* previews of documents should be photos
	* photos are files, associated with an element
	* extend /fs API, mostly clientside
	* generating previews of documents
	
* **Markdown Renderer** - organize/project headings in Tabs, List, Tree, ...

### 2018-02-07

## Strategy of a dog?

Like I am creating these .md files here and there, to find my way again -- hopefully done in a way I can rely on in the future. Keep it sinple!

## Loving .md

Why didn't I start to do this a couple of years ago? This stream thingy is super cool! Markdown, snag.gy, Ace, 

![](https://snag.gy/dy3GoI.jpg)

## Designing vcl-comps 

Following needs to be more dynamic:

![](https://snag.gy/JhzB9b.jpg)

### Not this

> ![](https://snag.gy/yBgKQY.jpg)

### ...but this:

> ![](https://snag.gy/yBgKQY.jpg)

* **Notes** - how to link to Apple Notes?

### 2018-02-06

Some neat code:

![](https://snag.gy/PAVpvn.jpg)

require(["styles/code"])


### 2018-02-05

## Veldoffice & VeldwerkM - going strong

![](https://snag.gy/bKtkYu.jpg)

## Let's get rid of the $

![](https://snag.gy/MA8lVw.jpg)

## CREATE INDEX <> createDesignDoc()

![](https://snag.gy/746VGo.jpg)

## Pouch pitfalls?

![](https://snag.gy/D0WwX9.jpg)

![](https://snag.gy/mpGt9Q.jpg)

## General UI design

Framework 7 seems a good fit for a desktop/tablet-sized app as well.

	* Navigator (left)
	* Map/List (client/fill/stretch)
	* Detail (right)
	* Console (bottom)

## Left, Sidebar, Navigator

Consisting of:

* vcl-ui/Tree
* vcl-ui/List
* vcl-ui/Panel#search
* vcl-data/Pouch#items

## Double Tap Keyboard Shortcuts

* **Alt+Cmd+1-9**: Toggle Sidepanel/Switch to Sidepanel
* **Cmd+1-9**: Toggle Workspace-Tabs/Switch to Workspace

### 2018-02-04

![](https://snag.gy/3ciqP7.jpg)

## Stripped UI for newer DevToolZ

* history navigatie
* twee niveaus van tabs

## Used SmartSVN...

...to recover some code from code/src/main.js:

>	shim: {
		"amcharts.funnel": {
			"deps": ["amcharts"],
			"exports": "AmCharts",
			"init": function () {
				AmCharts.isReady = true;
			}
		},
		...

	:-D

![](https://snag.gy/XsPDMt.jpg)

## Scrolling vcl-ui/List

It is just terrible when you have more than 10 columns.

**requestAnimationFrame** could be used to create an alterniative and hopefully more fluent scrolling experience. (for now moving on)

### 2018-02-03

## Editor<vcl> --> Outline inline in tree?

While debugging the view below, I was wondering that it would be cool to have an outline under Meetpunt.js:

![](https://snag.gy/kRdtBn.jpg)

## Editor<csv>

vcl-ui/List really needs a boost in performance. Ace out performs it so much that it makes me think whether I can strip some scrolling stuff from that package...

## Advanced Markdown

Currently I am missing the following things:

- alignment, mainly wanted to center images
- 

## Loving Snaggy - Screenshots everywhere!

The following screenshot is hosted by https://snag.gy:

![](https://snag.gy/J4CkbE.jpg)

![](https://snag.gy/Sv8L6m.jpg)

## Workspaces Loaded indicator
It's useful to know whether a Workspace-tab has been loaded or not. Must be subtle.

## Extra hotkeys
* **Shift+Ctrl+Meta+N**: instantiate-specific-editor - Where you get to choose which Editor<>-class to instantiate, as well as a fast way to select the path of the new resource.

## Abstracting devtools/Editor
* **Shift+MetaCtrl+S**: toggle-source
* **Shift+MetaCtrl+O**: toggle-output/outline
* **Shift+MetaCtrl+X**: toggle-instantiate/execute
* **Shift+MetaCtrl+C**: toggle-component

## Paste Image
It should be possible to paste an image to a clipboard and do stuff. For instance, to create a Redmine issue with the image automatically embedded.

![](https://snag.gy/KrY61Q.jpg)

These images are hosted for 6 months by snag.gy. Need to find a way to copy them. Which shouldn't be too hard to accomplish:

- √ **Snaggy.app** - https://snag.gy in Epichrome
- Editor<md> - should keep track on image URLs coming by and persist them in a store for download

## Redmine Integration
- Create Issues
- List Issues