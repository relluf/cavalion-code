### `[011]` vcl/ui/Popup ?

### `[001]` pouchdb://cavalion-blocks

Addressing resources like that makes it so much cleaner now. For instance the below-here-commented-out variable db is not needed anymore and would've been way too much complexity anyways. 

**Next step**: RequireJS should pickup the `pouchdb://` prefix and route it to `devtools/Resources`.
	
>> ![](https://i.snipboard.io/GB6nO1.jpg?2x)

WOOOOOHOOOOOOOO!!!!   **:-D**

What about the following:

	pouchdb://cavalion-blocks/veldapps/ListOf<>/Bedrijf.js
	pouchdb://cavalion-ide/ide/workspaces/docs/
	
>> ![](https://i.snipboard.io/0RE7zF.jpg?2x)
>> ![](https://i.snipboard.io/ZAOJF4.jpg?2x)

### `[002]` vcl/Component-type browser

Maybe introduce a **Classes**-tab in `#left-sidebar`. In, through a vcl/ui/Console, of course. (And most of)the work is already done, it seems:

>> ![](https://i.snipboard.io/57wgtC.jpg?2x)
>> ![](https://i.snipboard.io/QrI3Gm.jpg?2x)

Events...?

### `[003]` devtools/Editor<xsd>/Manager

Eigenlijk zou je bij de `XSD->types/writers/collectors generator` een output-workspace moeten aanmaken. De resources die in die workspace worden geladen worden in een unieke database zodat de output een mobiel/atomair-shareable ding wordt?

### `[004]` devtools/Editor<md>/PostParser

* Project -< Resource -< Post

### `[005]` devtools/Resource-pouchdb

Hosts allDocs as a JSON resource or devtools:resource is the actual doc.

* revision should be integrated
* difference between Resource and object (no extension?)
	* poucndb://va-objects/ => object
	* pouchdb://va-entities/ =>
		* difference between va-objects & va-entities?
	* pouchdb://devtools-resources/ => devtools/Resource
* hook changes()

### `[006]` devtools/Resource.contentType

To be implemented by:

* devtools/Workspace<> #editor-needed
* devtools/Editor
* devtools/Resource-pouchdb

### `[007]` devtools/Navigator

* Index/list or all nodes

Cleanup. Define interface.

### `[008]` vcl/Component - events

Cleanup event situation in vcl/Component.

### `[009]` blocks/Container

* vcl/Component - properties
* blocks/Container - interfaces

### `[010]` va/design

* Better JSON stuff. Azure-style?
	* bulkDocument
* 

### `[012]` va/entities/veldoffice/onderzoek ==> ??

How does that translate to new VA way-of-doing things?

![](https://i.snipboard.io/rb2UMd.jpg?2x)

### `[013]` Node interface?

### `[---]` persist settings rewrite

* Using "va/objects"-style of persistence
* 

### `[---]` #console-container #console

Refactor `#left-sidebar #console` -> `#left-sidebar #console-container` (or anything different than `#console`)