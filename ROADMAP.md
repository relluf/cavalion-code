### vcl/Component-type browser

Maybe introduce a **Classes**-tab in `#left-sidebar`. In, through a vcl/ui/Console, of course. (And most of)the work is already done, it seems:

>> ![](https://i.snipboard.io/57wgtC.jpg?2x)
>> ![](https://i.snipboard.io/QrI3Gm.jpg?2x)

Events...?

### devtools/Editor<xsd>/Manager

Eigenlijk zou je bij de `XSD->types/writers/collectors generator` een output-workspace moeten aanmaken. De resources die in die workspace worden geladen worden in een unieke database zodat de output een mobiel/atomair-shareable ding wordt?

### devtools/Editor<md>/PostParser

* Project -< Resource -< Post

### devtools/Resource-pouchdb

Hosts allDocs as a JSON resource or devtools:resource is the actual doc.

* revision should be integrated
* difference between Resource and object (no extension?)
	* poucndb://va-objects/ => object
	* pouchdb://va-entities/ =>
		* difference between va-objects & va-entities?
	* pouchdb://devtools-resources/ => devtools/Resource
* hook changes()

### devtools/Resource.contentType

To be implemented by:

* devtools/Workspace<> #editor-needed
* devtools/Editor
* devtools/Resource-pouchdb

### devtools/Navigator

* Index/list or all nodes

Cleanup. Define interface.

### vcl/Component - events

Cleanup event situation in vcl/Component.

### blocks/Container

* vcl/Component - properties
* blocks/Container - interfaces

### va/design

* Better JSON stuff. Azure-style?
	* bulkDocument
* 
