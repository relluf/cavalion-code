// requirejs.s.contexts._.config.paths['inherits'] = "../lib/node_modules/paste-image/scripts/index"

// var parent = j$[71]._node;

function _define() {
	define("paste-image-inherits", [], function () {
	    if (typeof Object.create === 'function') {
	        // implementation from standard node.js 'util' module
	        return function inherits(ctor, superCtor) {
	            if (superCtor) {
	                ctor.super_ = superCtor
	                ctor.prototype = Object.create(superCtor.prototype, {
	                    constructor: {
	                        value: ctor,
	                        enumerable: false,
	                        writable: true,
	                        configurable: true
	                    }
	                })
	            }
	        };
	    } else {
	        // old school shim for old browsers
	        return function inherits(ctor, superCtor) {
	            if (superCtor) {
	                ctor.super_ = superCtor
	                var TempCtor = function () {}
	                TempCtor.prototype = superCtor.prototype
	                ctor.prototype = new TempCtor()
	                ctor.prototype.constructor = ctor
	            }
	        }
	    }
	
	});
	define("paste-image-events", [], function () {
	
	    function EventEmitter() {
	        this._events = this._events || {};
	        this._maxListeners = this._maxListeners || undefined;
	    }
	
	    // Backwards-compat with node 0.10.x
	    EventEmitter.EventEmitter = EventEmitter;
	
	    EventEmitter.prototype._events = undefined;
	    EventEmitter.prototype._maxListeners = undefined;
	
	    // By default EventEmitters will print a warning if more than 10 listeners are
	    // added to it. This is a useful default which helps finding memory leaks.
	    EventEmitter.defaultMaxListeners = 10;
	
	    // Obviously not all Emitters should be limited to 10. This function allows
	    // that to be increased. Set to zero for unlimited.
	    EventEmitter.prototype.setMaxListeners = function (n) {
	        if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	        this._maxListeners = n;
	        return this;
	    };
	
	    EventEmitter.prototype.emit = function (type) {
	        var er, handler, len, args, i, listeners;
	
	        if (!this._events) this._events = {};
	
	        // If there is no 'error' event listener then throw.
	        if (type === 'error') {
	            if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
	                er = arguments[1];
	                if (er instanceof Error) {
	                    throw er; // Unhandled 'error' event
	                } else {
	                    // At least give some kind of context to the user
	                    var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	                    err.context = er;
	                    throw err;
	                }
	            }
	        }
	
	        handler = this._events[type];
	
	        if (isUndefined(handler)) return false;
	
	        if (isFunction(handler)) {
	            switch (arguments.length) {
	                // fast cases
	            case 1:
	                handler.call(this);
	                break;
	            case 2:
	                handler.call(this, arguments[1]);
	                break;
	            case 3:
	                handler.call(this, arguments[1], arguments[2]);
	                break;
	                // slower
	            default:
	                args = Array.prototype.slice.call(arguments, 1);
	                handler.apply(this, args);
	            }
	        } else if (isObject(handler)) {
	            args = Array.prototype.slice.call(arguments, 1);
	            listeners = handler.slice();
	            len = listeners.length;
	            for (i = 0; i < len; i++)
	            listeners[i].apply(this, args);
	        }
	
	        return true;
	    };
	
	    EventEmitter.prototype.addListener = function (type, listener) {
	        var m;
	
	        if (!isFunction(listener)) throw TypeError('listener must be a function');
	
	        if (!this._events) this._events = {};
	
	        // To avoid recursion in the case that type === "newListener"! Before
	        // adding it to the listeners, first emit "newListener".
	        if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
	
	        if (!this._events[type])
	        // Optimize the case of one listener. Don't need the extra array object.
	        this._events[type] = listener;
	        else if (isObject(this._events[type]))
	        // If we've already got an array, just append.
	        this._events[type].push(listener);
	        else
	        // Adding the second element, need to change to array.
	        this._events[type] = [this._events[type], listener];
	
	        // Check for listener leak
	        if (isObject(this._events[type]) && !this._events[type].warned) {
	            if (!isUndefined(this._maxListeners)) {
	                m = this._maxListeners;
	            } else {
	                m = EventEmitter.defaultMaxListeners;
	            }
	
	            if (m && m > 0 && this._events[type].length > m) {
	                this._events[type].warned = true;
	                console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	                if (typeof console.trace === 'function') {
	                    // not supported in IE 10
	                    console.trace();
	                }
	            }
	        }
	
	        return this;
	    };
	
	    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	    EventEmitter.prototype.once = function (type, listener) {
	        if (!isFunction(listener)) throw TypeError('listener must be a function');
	
	        var fired = false;
	
	        function g() {
	            this.removeListener(type, g);
	
	            if (!fired) {
	                fired = true;
	                listener.apply(this, arguments);
	            }
	        }
	
	        g.listener = listener;
	        this.on(type, g);
	
	        return this;
	    };
	
	    // emits a 'removeListener' event iff the listener was removed
	    EventEmitter.prototype.removeListener = function (type, listener) {
	        var list, position, length, i;
	
	        if (!isFunction(listener)) throw TypeError('listener must be a function');
	
	        if (!this._events || !this._events[type]) return this;
	
	        list = this._events[type];
	        length = list.length;
	        position = -1;
	
	        if (list === listener || (isFunction(list.listener) && list.listener === listener)) {
	            delete this._events[type];
	            if (this._events.removeListener) this.emit('removeListener', type, listener);
	
	        } else if (isObject(list)) {
	            for (i = length; i-->0;) {
	                if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
	                    position = i;
	                    break;
	                }
	            }
	
	            if (position < 0) return this;
	
	            if (list.length === 1) {
	                list.length = 0;
	                delete this._events[type];
	            } else {
	                list.splice(position, 1);
	            }
	
	            if (this._events.removeListener) this.emit('removeListener', type, listener);
	        }
	
	        return this;
	    };
	
	    EventEmitter.prototype.removeAllListeners = function (type) {
	        var key, listeners;
	
	        if (!this._events) return this;
	
	        // not listening for removeListener, no need to emit
	        if (!this._events.removeListener) {
	            if (arguments.length === 0) this._events = {};
	            else if (this._events[type]) delete this._events[type];
	            return this;
	        }
	
	        // emit removeListener for all listeners on all events
	        if (arguments.length === 0) {
	            for (key in this._events) {
	                if (key === 'removeListener') continue;
	                this.removeAllListeners(key);
	            }
	            this.removeAllListeners('removeListener');
	            this._events = {};
	            return this;
	        }
	
	        listeners = this._events[type];
	
	        if (isFunction(listeners)) {
	            this.removeListener(type, listeners);
	        } else if (listeners) {
	            // LIFO order
	            while (listeners.length)
	            this.removeListener(type, listeners[listeners.length - 1]);
	        }
	        delete this._events[type];
	
	        return this;
	    };
	
	    EventEmitter.prototype.listeners = function (type) {
	        var ret;
	        if (!this._events || !this._events[type]) ret = [];
	        else if (isFunction(this._events[type])) ret = [this._events[type]];
	        else ret = this._events[type].slice();
	        return ret;
	    };
	
	    EventEmitter.prototype.listenerCount = function (type) {
	        if (this._events) {
	            var evlistener = this._events[type];
	
	            if (isFunction(evlistener)) return 1;
	            else if (evlistener) return evlistener.length;
	        }
	        return 0;
	    };
	
	    EventEmitter.listenerCount = function (emitter, type) {
	        return emitter.listenerCount(type);
	    };
	
	    function isFunction(arg) {
	        return typeof arg === 'function';
	    }
	
	    function isNumber(arg) {
	        return typeof arg === 'number';
	    }
	
	    function isObject(arg) {
	        return typeof arg === 'object' && arg !== null;
	    }
	
	    function isUndefined(arg) {
	        return arg === void 0;
	    }
	
	    return EventEmitter;
	
	});
	define("paste-image", ["require", "paste-image-inherits", "paste-image-events"], function (require) {
	    'use strict';
	
	    // This code is heavily based on Joel Basada's great work at
	    // http://joelb.me/blog/2011/code-snippet-accessing-clipboard-images-with-javascript/
	    var inherits = require('paste-image-inherits'),
	    events = require('paste-image-events');
	
	    var PasteImage = function () {
	        this._initialized = false;
	        this._wrapEmitterFns();
	    };
	
	    inherits(PasteImage, events.EventEmitter);
	
	    // We want to wrap emitter functions so that we can ensure that we have initialized the document
	    // listeners before listening to any paste events
	    PasteImage.prototype._wrapEmitterFns = function () {
	        var self = this,
	        fns = ['on', 'once'];
	
	        fns.forEach(function (fn) {
	            PasteImage.prototype[fn] = function () {
	                if (!self._initialized) {
	                    self._init();
	                }
	
	                return events.EventEmitter.prototype[fn].apply(self, arguments);
	            };
	        });
	    };
	
	    PasteImage.prototype._clipboardSupported = function () {
	        return window.Clipboard;
	    };
	
	    PasteImage.prototype._pasteCatcherFocus = function () {
	        this._pasteCatcher.focus();
	    };
	
	    PasteImage.prototype._listenForClick = function () {
	        var self = this;
	
	        // Make sure it is always in focus. We ignore code coverage for this area as there does not appear
	        // to be an easy cross-browser way of triggering a click event on the document
	        //
	        /* istanbul ignore next */
	        document.addEventListener('click', function () {
	            self._pasteCatcherFocus();
	        });
	    };
	
	    PasteImage.prototype._createPasteCatcherIfNeeded = function () {
	        // We start by checking if the browser supports the Clipboard object. If not, we need to create a
	        // contenteditable element that catches all pasted data
	        if (!this._clipboardSupported()) {
	            this._pasteCatcher = document.createElement('div');
	
	            // Firefox allows images to be pasted into contenteditable elements
	            this._pasteCatcher.setAttribute('contenteditable', '');
	
	            // We can hide the element and append it to the body,
	            this._pasteCatcher.style.opacity = 0;
	
	            // Use absolute positioning so that the paste catcher doesn't take up extra space. Note: we
	            // cannot set style.display='none' as this will disable the functionality.
	            this._pasteCatcher.style.position = 'absolute';
	
	            document.body.appendChild(this._pasteCatcher);
	
	            this._pasteCatcher.focus();
	            this._listenForClick();
	        }
	    };
	
	    PasteImage.prototype._listenForPaste = function () {
	        var self = this;
	
	        // Add the paste event listener. We ignore code coverage for this area as there does not appear to
	        // be a cross-browser way of triggering a pase event
	        //
	        /* istanbul ignore next */
	        window.addEventListener('paste', function (e) {
	            self._pasteHandler(e);
	        });
	    };
	
	    PasteImage.prototype._init = function () {
	        this._createPasteCatcherIfNeeded();
	        this._listenForPaste();
	        this._initialized = true;
	    };
	
	    PasteImage.prototype._checkInputOnNextTick = function () {
	        var self = this;
	        // This is a cheap trick to make sure we read the data AFTER it has been inserted.
	        setTimeout(function () {
	            self._checkInput();
	        },
	        1);
	    };
	
	    PasteImage.prototype._pasteHandler = function (e) {
	        // Starting to paste image
	        this.emit('pasting-image', e);
	
	        // We need to check if event.clipboardData is supported (Chrome)
	        if (e.clipboardData && e.clipboardData.items) {
	            // Get the items from the clipboard
	            var items = e.clipboardData.items;
	
	            // Loop through all items, looking for any kind of image
	            for (var i = 0; i < items.length; i++) {
	                if (items[i].type.indexOf('image') !== -1) {
	                    // We need to represent the image as a file
	                    var blob = items[i].getAsFile();
	
	                    // Use a URL or webkitURL (whichever is available to the browser) to create a temporary URL
	                    // to the object
	                    var URLObj = this._getURLObj();
	                    var source = URLObj.createObjectURL(blob);
	
	                    // The URL can then be used as the source of an image
	                    this._createImage(source);
	                }
	            }
	            // If we can't handle clipboard data directly (Firefox), we need to read what was pasted from
	            // the contenteditable element
	        } else {
	            this._checkInputOnNextTick();
	        }
	    };
	
	    PasteImage.prototype._getURLObj = function () {
	        return window.URL || window.webkitURL;
	    };
	
	    // Parse the input in the paste catcher element
	    PasteImage.prototype._checkInput = function () {
	        // Store the pasted content in a variable
	        var child = this._pasteCatcher.childNodes[0];
	
	        // Clear the inner html to make sure we're always getting the latest inserted content
	        this._pasteCatcher.innerHTML = '';
	
	        if (child) {
	            // If the user pastes an image, the src attribute will represent the image as a base64 encoded
	            // string.
	            if (child.tagName === 'IMG') {
	                this._createImage(child.src);
	            }
	        }
	    };
	
	    // Creates a new image from a given source
	    PasteImage.prototype._createImage = function (source) {
	        var self = this,
	        pastedImage = new Image();
	
	        pastedImage.onload = function () {
	            // You now have the image!
	            self.emit('paste-image', pastedImage);
	        };
	        pastedImage.src = source;
	    };
	
	    return new PasteImage();
	
	});
	req("paste-image");
}

// delete window.require.s.contexts._.defined['paste-image'];
if(!window.require.s.contexts._.defined['paste-image']) {
	_define();
	Promise.resolve(req("paste-image")).then((PasteImage) => {
		PasteImage.on("paste-image", (image) => ws.vars(["pasted-images", false, []]).push(image));
		return PasteImage;	
	});
}

function VeldwerkM() {
	$root("org.cavalion.comp.ui.Form", {
	    onActivate: function onActivate() {
	        var scope = this.getScope();
	        var value = scope.$window.getVar(String.format("%s.photos_caption.tag", scope.photos_caption._uri));
	        if (value !== undefined && value !== scope.photos_caption._tag) {
	            scope.photos_caption.tap();
	        }
	        return js.lang.Class.__inherited(this, arguments);
	    },
	    onLoad: function onLoad() {
	        this.setConstant("cant-select-photo", {
	            message: "Kan foto niet selecteren"
	        });
	
	        this.setConstant("photos_menu", {
	            caption: "<div><div class='button'>toevoegen</div><div class='button clear'>schonen</div></div><input type='file' %s>"
	        });
	
	        this.setConstant("confirm-clear", "Weet u zeker dat u de foto's wilt schonen?");
	        this.setConstant("confirm-clear-buttons", ["Ja", "Nee"]);
	
	        return js.lang.Class.__inherited(this, arguments);
	    },
	    onReceiveParams: function onReceiveParams(params) {
	        var Manager = js.require("org.cavalion.persistence.Manager");
	
	        var scope = this.getScope();
	        var gui = scope.$window.getVar("Gui");
	        var r = js.lang.Class.__inherited(this, arguments);
	
	        function CONST() {
	            return scope.$owner.getConstant.apply(scope.$owner, arguments);
	        }
	        /**
	     * 
	     */
	        function select() {
	            gui.block(String.format("selecting for %n", params.instance));
	            with(Manager.query("Foto", "omschrijving,thumb", "where context = ? order by omschrijving", [params.instance])) {
	                addCallback(function (res) {;
	                    gui.unblock();
	                    var objs = res.getObjs();
	                    var node = scope.photos_host.getNode();
	                    var html = [];
	                    var i;
	                    for (i = 0; i < objs.length; ++i) {
	                        html.push(String.format("<div><div class='remove'><div></div></div><img><div class='desc'>%d</div></div>", i));
	                    }
	                    node.innerHTML = html.join("");
	                    for (i = 0; i < objs.length; ++i) {
	                        var img = node.childNodes[i].childNodes[1];
	                        img.src = objs[i].thumb;
	                        img.$foto = objs[i].$;
	                        img.onload = function () {
	                            var h = this.height;
	                            var w = this.width;
	                            if (w > h) {
	                                this.parentNode.style.width = "33%";
	                            }
	                        };
	                        var omschrijving = objs[i].omschrijving;
	                        if (omschrijving === null) {
	                            omschrijving = "";
	                        }
	                        node.childNodes[i].childNodes[2].innerHTML = String.format("%H", omschrijving);
	                        scope.instance.hookInstance(objs[i].$);
	                    }
	                });
	                addErrback(function (err) {
	                    gui.unblock();
	                    gui.alert(CONST("cant-select-photo.message"));
	                    throw err;
	                });
	            }
	        }
	
	        select();
	
	        if (scope.photos_host.getVar("instance") !== params.instance) {
	            scope.photos_host.getNode().innerHTML = "";
	            scope.photos_host.setVar("instance", params.instance);
	        }
	        return r;
	    }
	}, [
	    $i("panel_client", {}, [
	        $("org.cavalion.comp.ui.Group", "photos_group_outer", {
	            classes: "section",
	            onLoad: function onLoad() {
	                this.setIndex(this._parent.getControlCount() - this.getProperty("index"));
	                return js.lang.Class.__inherited(this, arguments);
	            },
	            properties: {
	                index: 2
	            }
	        }, [
	            $("org.cavalion.comp.ui.Group", "photos_group_inner", {
	                classes: "line disabled"
	            }, [
	                $("org.cavalion.comp.ui.Label", "photos_caption", {
	                    caption: "foto",
	                    css: {
	                        "": {
	                            "padding-bottom": "10px"
	                        },
	                        ":active:active": {
	                            "background-color": "rgb(2,109,236)",
	                            color: "white",
	                            "border-top-left-radius": "10px"
	                        }
	                    },
	                    onTap: function (evt) {
	                        var scope = this.getScope();
	                        function CONST() {
	                            return scope.$owner.getConstant.apply(scope.$owner, arguments);
	                        }
	                        var tag = 1 - this.getTag();
	                        this.setTag(tag);
	                        this.setCaption(tag ? "foto's" : "foto");
	                        scope.photos_menu.setCaption(String.format(CONST("photos_menu.caption"), tag === 1 ? " multiple" : ""));
	                        scope.photos_menu.dispatch("nodecreated", {});
	                        if (evt) {
	                            scope.$window.setVar(String.format("%s.%s.tag", this._uri, this._name), tag);
	                        }
	                    }
	                }),
	                $("org.cavalion.comp.ui.Label", "photos_menu", {
	                    caption: "<div><div class=\"button\">toevoegen</div><div class=\"button clear\">schonen</div></div><input type='file'>",
	                    classes: "file",
	                    css: {
	                        ".file.file.file": {
	                            overflow: "hidden",
	                            "text-align": "left",
	                            padding: "0"
	                        },
	                        ">div": {
	                            display: "inline-block",
	                            position: "absolute"
	                        },
	                        " input": {
	                            position: "relative",
	                            left: "-105px",
	                            display: "inline-block",
	                            opacity: "0",
	                            "max-width": "190px",
	                            margin: "0",
	                            padding: "0",
	                            cursor: "pointer"
	                        },
	                        " .clear": {
	                            display: "none"
	                        },
	                        " .button": {
	                            display: "inline-block",
	                            font: "12px Helvetica",
	                            padding: "1px 6px 3px 6px",
	                            cursor: "pointer",
	                            color: "white",
	                            "border-width": "0 5px 0 5px",
	                            "font-weight": "bold",
	                            "margin-left": "5px",
	                            "text-shadow": "rgba(0, 0, 0, .6) 0 -1px 0",
	                            "white-space": "nowrap",
	                            "border-style": "solid",
	                            "-webkit-border-image": "url(lib/img/iphone/help.apple.com/iphone/4/interface/iAd/assets/button/UINavigationBarDefaultButton.png) 0 5 0 5"
	                        },
	                        " .button:not(.back):active": {
	                            "border-style": "solid",
	                            "-webkit-border-image": "url(lib/img/iphone/help.apple.com/iphone/4/interface/iAd/assets/button/UINavigationBarDefaultButtonPressed.png) 0 5 0 5"
	                        },
	                        " .button:not(.back).selected": {
	                            "border-style": "solid",
	                            "-webkit-border-image": "url(lib/img/iphone/help.apple.com/iphone/4/interface/iAd/assets/button/UINavigationBarDefaultButtonPressed.png) 0 5 0 5"
	                        },
	                        " .button.done": {
	                            "border-style": "solid",
	                            "-webkit-border-image": "url(lib/img/iphone/help.apple.com/iphone/4/interface/iAd/assets/button/UINavigationBarDoneButton.png) 0 5 0 5"
	                        },
	                        " .button.done:active": {
	                            "border-style": "solid",
	                            "-webkit-border-image": "url(lib/img/iphone/help.apple.com/iphone/4/interface/iAd/assets/button/UINavigationBarDoneButtonPressed.png) 0 5 0 5"
	                        },
	                        " .button.selected:active": {
	                            "border-style": "solid",
	                            "-webkit-border-image": "url(lib/img/iphone/help.apple.com/iphone/4/interface/iAd/assets/button/UINavigationBarDoneButtonPressed.png) 0 5 0 5"
	                        }
	                    },
	                    onNodeCreated: function onNodeCreated() {
	
	                        var Manager = js.require("org.cavalion.persistence.Manager");
	                        var MegaPixImage = js.require("stomita.MegaPixImage");
	                        var EXIF = js.require("jseidelin.EXIF");
	                        var Deferred = js.require("js.util.Deferred");
	
	                        var scope = this.getScope();
	                        var input = this.getNode().childNodes[1];
	                        var autofill = Manager.getInstance("Autofill", "0000000001");
	
	                        var THUMBNAIL_SIZE = 100;
	                        var SRC_SIZE = 1000;
	
	                        var busy_counter = 0;
	
	                        this.setVar("input", input);
	
	                        /**
	     * 
	     */
	                        function newFotoInstance(obj) {
	                            var instance = Manager.newInstance("Foto", js.mixIn(obj, {
	                                context: scope.instance.getInstance()
	                            }));
	                            scope.instance.hookInstance(instance);
	                            return instance;
	                        }
	
	                        /**
	     * 
	     */
	                        function getResizedImageDataURL(mpi, type, quality, options) {
	                            var canvas = document.createElement("canvas");
	                            mpi.render(canvas, options);
	                            return canvas.toDataURL(type || "image/jpeg", quality || 0.5);
	                        }
	
	                        /**
	     * 
	     */
	                        function imageLoaded(evt) {
	                            this.style.height = "";
	
	                            var w = this.naturalWidth;
	                            var h = this.naturalHeight;
	                            var o = this.$exif.Orientation || 1;
	
	                            if (h < w) {
	                                this.parentNode.style.width = "33%";
	                            }
	
	                            var thumb = getResizedImageDataURL(this.$mpi, "image/png", 1, {
	                                maxWidth: THUMBNAIL_SIZE,
	                                maxHeight: THUMBNAIL_SIZE,
	                                orientation: o
	                            });
	
	                            var tag = autofill.getAttributeValue("foto_resolutie.tag");
	                            if (tag === "1.5") SRC_SIZE = 1500;
	                            else if (tag === "2") SRC_SIZE = 2000;
	                            else if (tag === "2.5") SRC_SIZE = 2500;
	                            else if (tag === "3") SRC_SIZE = 3000;
	
	                            var src = getResizedImageDataURL(this.$mpi, "image/jpeg", 0.75, {
	                                maxWidth: SRC_SIZE,
	                                maxHeight: SRC_SIZE,
	                                orientation: o
	                            });
	
	                            this.$foto = newFotoInstance({
	                                omschrijving: String.format("%d", this.$n),
	                                src: src,
	                                thumb: thumb
	                            });
	
	                            if (--busy_counter === 0) {
	                                var busy = scope.commit.getVar("busy");
	                                scope.commit.removeVar("busy");
	                                busy.callback();
	                            }
	                        }
	
	                        /**
	     * 
	     */
	                        input.addEventListener("change", function () {
	                            if (scope.commit.getVar("busy") === undefined) {
	                                scope.commit.setVar("busy", new Deferred());
	                            }
	
	                            var host = scope.photos_host.getNode();
	                            var files = this.files;
	                            var l = files.length;
	                            var divs = [];
	                            var i;
	                            var count = host.childNodes.length + 1;
	
	                            for (i = 0; i < l; i++) {
	                                var node = document.createElement("div");
	                                node.innerHTML = String.format("<div class='remove'><div></div></div><img style='height: %dpx;'/><div class='desc'>%d</div>", 75, i + count);
	                                host.appendChild(node);
	                                divs.push(node);
	                                busy_counter++;
	                            }
	
	                            i = -1;
	
	                            function next() {
	                                if (++i < l) {
	                                    var file = files[i];
	                                    var div = divs[i];
	                                    var img = div.childNodes[1];
	
	                                    img.$n = i + count;
	                                    img.onload = imageLoaded;
	
	                                    try {
	                                        //EXIF.getData(file, function () {
	                                        try {
	                                            img.$mpi = new MegaPixImage(file);
	                                            img.$exif = file.exifdata || {};
	                                            img.$mpi.render(img, {
	                                                maxWidth: 300,
	                                                maxWidth: 300,
	                                                orientation: img.$exif.Orientation || 1
	                                            });
	                                            next();
	                                        } catch(e) {
	                                            alert(e.message);
	                                        }
	                                        //});
	                                    } catch(e) {
	                                        alert(e.message + 0);
	                                    }
	                                }
	                            }
	
	                            //setTimeout(next, 10);
	                            next();
	                        },
	                        false);
	                    },
	                    onTap: function (evt) {
	                        var Manager = js.require("org.cavalion.persistence.Manager");
	                        var scope = this.getScope();
	
	                        /**
	     * 
	     */
	                        function clear() {
	                            scope.photos_host.getNode().innerHTML = "";
	
	                            var instances = scope.instance.getInstances();
	                            for (var i = 0; i < instances.length; ++i) {
	                                var instance = instances[i];
	                                if (instance.isManaged() === false && instance.getEntity().getQName() === "veldwerkm:Foto") {
	                                    scope.instance.unhookInstance(instance);
	                                }
	                            }
	
	                            instances = scope.$owner.getVar("remove");
	                            if (instances === undefined) {
	                                var gui = scope.$window.getVar("Gui");
	                                gui.block();
	
	                                with(Manager.query("Foto", ".", "where context = ?", [scope.instance.getInstance()])) {
	                                    addCallback(function (res) {
	                                        var objs = res.getObjs();
	                                        var instances = [];
	                                        objs.forEach(function (obj) {
	                                            instances.push(obj);
	                                        });
	                                        scope.$owner.setVar("remove", instances);
	                                        gui.unblock();
	                                    });
	
	                                    addErrback(function (err) {
	                                        gui.unblock();
	                                        throw err;
	                                    });
	                                }
	                            }
	
	                            scope.instance.getInstance().setAttributeValue("modified", new Date());
	                        }
	
	                        var gui = scope.$window.getVar("Gui");
	                        if (js.dom.Element.hasClass(evt.target, "clear")) {
	                            gui.confirm(scope.$owner.getConstant("confirm-clear"), function (res) {
	                                if (res === true) {
	                                    clear();
	                                }
	                            },
	                            document.title, scope.$owner.getConstant("confirm-clear-buttons"));
	                        }
	                    }
	                }),
	                $("org.cavalion.comp.ui.Group", "photos_host", {
	                    css: {
	                        "": {
	                            padding: "16px 12px 16px 2px",
	                            "border-radius": "0 0 10px 10px",
	                            "border-top": "1px solid #f0f0f0",
	                            "font-weight": "normal",
	                            color: "gray",
	                            overflow: "hidden"
	                        },
	                        ">div": {
	                            "box-sizing": "border-box",
	                            width: "25%",
	                            display: "inline-block",
	                            border: "8px solid transparent"
	                        },
	                        " >div>img": {
	                            "box-shadow": "2px 2px 6px #888888",
	                            margin: "5px",
	                            width: "100%",
	                            cursor: "pointer"
	                        },
	                        " >div:active>img": {
	                            opacity: "0.5"
	                        },
	                        " >div>div.desc": {
	                            "font-size": "80%",
	                            "text-align": "center",
	                            "text-overflow": "ellipsis",
	                            "white-space": "nowrap",
	                            overflow: "hidden",
	                            display: "snone"
	                        },
	                        " >div>.remove": {
	                            position: "absolute",
	                            "z-index": "1"
	                        },
	                        " >div>.remove>div": {
	                            position: "relative",
	                            left: "-5px",
	                            top: "-5px",
	                            width: "44px",
	                            height: "44px",
	                            cursor: "pointer",
	                            "background-image": "url(./lib/img/iphone/remove-image.png)",
	                            "background-repeat": "no-repeat"
	                        }
	                    },
	                    onTap: function onTap(evt) {
	                        var scope = this.getScope();
	                        var node = evt.target;
	                        if (node.className === "remove" || node.parentNode.className === "remove") {
	                            if (node.parentNode.className === "remove") {
	                                node = node.parentNode.parentNode;
	                            } else {
	                                node = node.parentNode;
	                            }
	                            var instance = node.childNodes[1].$foto;
	                            if (instance.isManaged()) {
	                                var remove = this._owner.getVar("remove");
	                                if (remove === undefined) {
	                                    remove = [];
	                                    this._owner.setVar("remove", remove);
	                                }
	                                remove.push(instance);
	                                // trigger dirty
	                                scope.instance.getInstance().setAttributeValue("modified", new Date());
	                            }
	                            node.parentNode.removeChild(node);
	                        } else if (node.nodeName === "IMG") {
	                            if (0 && node.$foto !== undefined) {
	                                scope.$window.openForm("iphone:ui.forms.persistence.Edit<Foto>", {
	                                    animation: "show: bottom-top; hide: delayed;",
	                                    paramsObj: {
	                                        instance: node.$foto,
	                                        onCommit: function () {
	                                            node.parentNode.childNodes[2].innerHTML = String.format("%H", node.$foto.getAttributeValue("omschrijving"));
	                                        }
	                                    },
	                                });
	                            }
	                        }
	                    }
	                }),
	                $("org.cavalion.comp.ui.Label", "label_camera", {
	                    caption: "<div class=\"button\">camera</button>",
	                    css: {
	                        "": {
	                            "padding-bottom": "10px"
	                        },
	                        " .button": {
	                            display: "inline-block",
	                            font: "12px Helvetica",
	                            padding: "1px 6px 3px 6px",
	                            cursor: "pointer",
	                            color: "white",
	                            "border-width": "0 5px 0 5px",
	                            "font-weight": "bold",
	                            "margin-left": "5px",
	                            "text-shadow": "rgba(0, 0, 0, .6) 0 -1px 0",
	                            "white-space": "nowrap",
	                            "border-style": "solid",
	                            "-webkit-border-image": "url(lib/img/iphone/help.apple.com/iphone/4/interface/iAd/assets/button/UINavigationBarDefaultButton.png) 0 5 0 5"
	                        },
	                        " .button:not(.back):active": {
	                            "border-style": "solid",
	                            "-webkit-border-image": "url(lib/img/iphone/help.apple.com/iphone/4/interface/iAd/assets/button/UINavigationBarDefaultButtonPressed.png) 0 5 0 5"
	                        }
	                    },
	                    onLoad: function () {
	                        this.setVisible(( !! navigator.camera) === true && typeof navigator.camera.getPicture === "function");
	                    },
	                    onTap: function onTap(evt) {
	
	                        var Manager = js.require("org.cavalion.persistence.Manager");
	                        var MegaPixImage = js.require("stomita.MegaPixImage");
	                        var EXIF = js.require("jseidelin.EXIF");
	                        var Deferred = js.require("js.util.Deferred");
	                        var scope = this.getScope();
	
	                        var autofill = Manager.getInstance("Autofill", "0000000001");
	
	                        var THUMBNAIL_SIZE = 100;
	                        var SRC_SIZE = 1000;
	
	                        var tag = autofill.getAttributeValue("foto_resolutie.tag");
	                        if (tag === "1.5") SRC_SIZE = 1500;
	                        else if (tag === "2") SRC_SIZE = 2000;
	                        else if (tag === "2.5") SRC_SIZE = 2500;
	                        else if (tag === "3") SRC_SIZE = 3000;
	
	                        function clear() {
	                            scope.photos_host.getNode().innerHTML = "";
	
	                            var instances = scope.instance.getInstances();
	                            for (var i = 0; i < instances.length; ++i) {
	                                var instance = instances[i];
	                                if (instance.isManaged() === false && instance.getEntity().getQName() === "veldwerkm:Foto") {
	                                    scope.instance.unhookInstance(instance);
	                                }
	                            }
	
	                            instances = scope.$owner.getVar("remove");
	                            if (instances === undefined) {
	                                var gui = scope.$window.getVar("Gui");
	                                gui.block();
	
	                                with(Manager.query("Foto", ".", "where context = ?", [scope.instance.getInstance()])) {
	                                    addCallback(function (res) {
	                                        var objs = res.getObjs();
	                                        var instances = [];
	                                        objs.forEach(function (obj) {
	                                            instances.push(obj);
	                                        });
	                                        scope.$owner.setVar("remove", instances);
	                                        gui.unblock();
	                                    });
	
	                                    addErrback(function (err) {
	                                        gui.unblock();
	                                        throw err;
	                                    });
	                                }
	                            }
	
	                            scope.instance.getInstance().setAttributeValue("modified", new Date());
	                        }
	
	                        /*- TODO code duplicated (and modified) from onNodeCreated */
	
	                        function newFotoInstance(obj) {
	                            var instance = Manager.newInstance("Foto", js.mixIn(obj, {
	                                context: scope.instance.getInstance()
	                            }));
	                            scope.instance.hookInstance(instance);
	                            return instance;
	                        }
	
	                        function getResizedImageDataURL(mpi, type, quality, options) {
	                            var canvas = document.createElement("canvas");
	                            mpi.render(canvas, options);
	                            return canvas.toDataURL(type || "image/jpeg", quality || 0.5);
	                        }
	
	                        function imageLoaded(evt) {
	                            this.style.height = "";
	
	                            var w = this.naturalWidth;
	                            var h = this.naturalHeight;
	                            var o = this.$exif.Orientation || 1;
	
	                            if (h < w) {
	                                this.parentNode.style.width = "33%";
	                            }
	
	                            var thumb = getResizedImageDataURL(this.$mpi, "image/png", 1, {
	                                maxWidth: THUMBNAIL_SIZE,
	                                maxHeight: THUMBNAIL_SIZE,
	                                orientation: o
	                            });
	
	                            var src = getResizedImageDataURL(this.$mpi, "image/jpeg", 0.5, {
	                                maxWidth: SRC_SIZE,
	                                maxHeight: SRC_SIZE,
	                                orientation: o
	                            });
	
	                            this.$foto = newFotoInstance({
	                                omschrijving: String.format("%d", this.$n),
	                                src: src,
	                                thumb: thumb
	                            });
	                        }
	
	                        /**
	     * 
	     */
	                        function camera() {
	                            navigator.camera.getPicture(
	                            function (imageData) {
	                                try {
	                                    var host = scope.photos_host.getNode();
	                                    var count = host.childNodes.length + 1;
	                                    var div = document.createElement("div");
	                                    div.innerHTML = String.format("<div class='remove'><div></div></div><img style='height: %dpx;'/><div class='desc'>%d</div>", 75, count);
	                                    host.appendChild(div);
	
	                                    var img = div.childNodes[1];
	                                    img.$n = count;
	                                    img.onload = imageLoaded;
	
	                                    var srcImg = new Image();
	                                    srcImg.src = "data:image/jpeg;base64," + imageData;
	
	                                    img.$mpi = new MegaPixImage(srcImg);
	                                    img.$exif = {};
	                                    img.$mpi.render(img, {
	                                        maxWidth: 300,
	                                        maxWidth: 300,
	                                        orientation: img.$exif.Orientation || 1
	                                    });
	                                } catch(e) {
	                                    alert(e.message);
	                                }
	                            },
	                            function () {
	                                //error or cancelled?
	                                // alert(scope.$owner.getConstant("cant-select-photo.message"));
	                            },
	                            {
	                                quality: 50,
	                                mediaType: Camera.MediaType.PICTURE,
	                                destinationType: Camera.DestinationType.DATA_URL
	                            });
	                        }
	
	                        camera();
	                    }
	                })
	            ])
	        ])
	    ])
	]);
}