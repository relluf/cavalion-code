define(function(require) {

	require("Framework7");

	var js = require("js");
	var $$ = window.Dom7;
	
	var defaults = {
		data: function() {
			return window.app_data;
		},
		on: function(controller) {
			return {
				pageMounted: function(e, page) {
					page.el.dispatchEvent(new CustomEvent("mounted", {detail: e}));
				},
				pageInit: function(e, page) {
					controller.initialize(e, page);
					page.el.dispatchEvent(new CustomEvent("init", {detail: e}));
				},
				pageBeforeIn: function(e, page) {
					controller.beforeIn(e, page);
					page.el.dispatchEvent(new CustomEvent("beforein", {detail: e}));
				},
				pageAfterIn: function(e, page) {
					controller.afterIn(e, page);
					page.el.dispatchEvent(new CustomEvent("afterin", {detail: e}));
				},
				pageBeforeOut: function(e, page) {
					controller.beforeOut(e, page);
					page.el.dispatchEvent(new CustomEvent("beforeout", {detail: e}));
				},
				pageAfterOut: function(e, page) {
					controller.afterOut(e, page);
					page.el.dispatchEvent(new CustomEvent("afterout", {detail: e}));
				},
				pageBeforeRemove: function(e, page) {
					page.el.dispatchEvent(new CustomEvent("beforeremove", {detail: e}));
				}
			};
		}
	};
	var tools = {
		setTimeoutRouterBack: function(router) {
			window.setTimeout(function() { 
				router.back();
			}, 250);
		}
	};

	function Controller(config) {
		/*- Utilizing the prototype doesn't work correctly, it seems 
			that Framework7 checks for own properties */
		js.mixIn(this, defaults);
		js.mixIn(this, config);
		
		if(!config.hasOwnProperty("on")) {
			this.on = this.on(this);
		}
	}
	
	function nullf() {}
	
	js.mixIn(Controller.prototype, {
		defaults: defaults,
		initialize: function(e, page) {
			function loop(handlers, node) {
				/*- Find navbar */
				var navbar = node.up(".view").down(".navbar");
				
				/*- Set/hook/initialize event handldersß */
				for(var k in handlers) {
					if(handlers.hasOwnProperty(k)) {
						var f = handlers[k];
						if(k === "navbar") {
							/* Nest navbar */
							arguments.callee(f, navbar);
						} else if(k.indexOf("navbar ") === 0) {
							var obj = {};
							obj[k.substring("7")] = f;
							arguments.callee(obj, navbar);
						} else {
							/*- Two flavors: 
								1) div.button1::click 
								2) div.button1 click 
							*/
							var i = k.indexOf("::");
							var selector, event;
							if(i !== -1) {
								selector = k.substring(0, i);
								event = k.substring(i + 2);
							} else {
								selector = k.split(" ");
								event = selector.pop();
								selector = selector.join(" ");
							}
							if(selector.length > 0) {
								$$(selector, node).on(event, f);
							} else {
								$$(node).on(event, f);
							}
						}
					}
				}
			}
			loop(this.handlers, page.el);
		},
		afterIn: function(e, page) {},
		beforeIn: function(e, page) {},
		afterOut: function(e, page) {},
		beforeOut: function(e, page) {}
	});
	
	
	/*- 
		> callbacks: this === f7Page 
		> setting can.must be coded in template as data member, eg:
		
			<div class="page" data-setting="ext_powersupply">
		
		- TODO fix these getValue and setValue lines
			- perhaps events should be triggered in context of controller? ^o)
	*/
	
	js.mixIn(Controller, {
		create: function(type, config, overrides) {
			if(typeof type === "string") {
				if(typeof this[type] === "function") {
					return this[type](config || {}, overrides || {});
				}
			} else {
				overrides = config || {};
				config = type;
			}
			return js.override(new Controller(config || {}), overrides);
		},
		text: function(config) {
			config.handlers = js.mixIn({
				"afterin": function(e) {
					this.down("input[type=text][name=value]").select(true);
					this.down("input[type=text][name=value]").focus();
				},
				"text:changed": function(e) {
					var page = this.f7Page;
					setValue.apply(page, [e.detail.target.value]);
				},
				"input[type=text][name=value] keypress": function(e) {
					if(e.keyCode === 13) {
						var page = this.up(".page").f7Page;
						tools.setTimeoutRouterBack(page.router);
					}	
				},
				"input[type=text][name=value] change": function(e) {
					this.up(".page").dispatchEvent(
						new CustomEvent("text:changed", {detail: e}));
				}
			}, config.handlers);

			if(!config.callbacks) {
				var setting = config.setting;
				config.callbacks = {
					getValue: function() {
						// <div class="page" data-setting="{{$route.params.name}}interval">
						setting = setting || this.el.dataset.setting;
						return window.app_data.Modem._values.requested[setting];
					},
					setValue: function(value) {
						// <div class="page" data-setting="{{$route.params.name}}interval">
						setting = setting || this.el.dataset.setting;
						window.app_data.Modem._values.requested[setting] = value;
					}
				};
			}
			
			/*- TODO fix these */
			var setValue = js.get("callbacks.setValue", config) || nullf;
			var getValue = js.get("callbacks.getValue", config) || nullf;
			
			return this.create(config, {
				beforeIn: function(e, page) {
					var value = getValue.apply(page, []);
					$$("input[type=text][name=value]", page.el).val(value);
				}
			});	
		},
		topportparameter: function(config) {
			config.handlers = js.mixIn({
				"afterin": function(e) {
					this.down("input[type=text][name=value]").select(true);
					this.down("input[type=text][name=value]").focus();
				},
				"text:changed": function(e) {
					var page = this.f7Page;
					setValue.apply(page, [e.detail.target.value]);
				},
				"input[type=text][name=value] keypress": function(e) {
					if(e.keyCode === 13) {
						var page = this.up(".page").f7Page;
						tools.setTimeoutRouterBack(page.router);
					}	
				},
				"input[type=text][name=value] change": function(e) {
					this.up(".page").dispatchEvent(
						new CustomEvent("text:changed", {detail: e}));
				}
			}, config.handlers);

			if(!config.callbacks) {
				var parameter = config.parameter;
				config.callbacks = {
					getValue: function() {
						// <div class="page" data-parameter="{{$route.params.name}}interval">
						parameter = parameter || this.el.dataset.parameter;
						return window.app_data.Modem.template_topportparameters(true)[parameter].value;
					},
					setValue: function(value) {
						// <div class="page" data-parameter="{{$route.params.name}}interval">
						parameter = parameter || this.el.dataset.parameter;
						window.app_data.Modem.template_topportparameters(true)[parameter].value = value;
						window.app_data.Modem._values.requested['topportparameter-' + parameter] = value;
					}
				};
			}
			
			/*- TODO fix these */
			var setValue = js.get("callbacks.setValue", config) || nullf;
			var getValue = js.get("callbacks.getValue", config) || nullf;
			
			return this.create(config, {
				beforeIn: function(e, page) {
					var value = getValue.apply(page, []);
					$$("input[type=text][name=value]", page.el).val(value);
				}
			});	
		},
		lookup: function(config) {
			config.handlers = js.mixIn({
				"lookup:item-changed": function(e) {
					var page = this.f7Page;
					var value = e.detail.target.up("li").dataset.key;
					setValue.apply(page, [value]);
					
					tools.setTimeoutRouterBack(page.router);
				},
				"li label click": function(e) {
					var self = arguments.callee;
					if(self.last && self.last.timeStamp === e.timeStamp) 
						return; 
						
					self.last = e;
					e = new CustomEvent("lookup:item-changed", {detail: e});
					this.up(".page").dispatchEvent(e);
				}
			}, config.handlers);
			
			if(!config.callbacks) {
				var setting = config.setting;
				config.callbacks = {
					getValue: function() {
						// <div class="page" data-setting="{{$route.params.name}}interval">
						setting = setting || this.el.dataset.setting;
						return window.app_data.Modem._values.requested[setting];
					},
					setValue: function(value) {
						// <div class="page" data-setting="{{$route.params.name}}interval">
						setting = setting || this.el.dataset.setting;
						window.app_data.Modem._values.requested[setting] = parseInt(value, 10);
					}
				};
			}

			/*- TODO fix these */
			var setValue = js.get("callbacks.setValue", config) || nullf;
			var getValue = js.get("callbacks.getValue", config) || nullf;
			
			return this.create(config, {
				afterIn: function(e, page) {
					var key = getValue.apply(page, []);
					var selector = "[data-key='" + key + "'] input[type=radio][name=value]";
					selector = $$(selector, page.el);
					if(selector.length) {
						selector.attr("checked", true);
						selector[0].up("li").scrollIntoView(false);
					}
				}
			});
		},
		toggle: function(config) {
			config.handlers = js.mixIn({
				"toggle:changed": function(e) {
					var page = this.f7Page;
					/* FIXME inverted -> weird, should use other event */
					setValue.apply(page, [!e.detail/*.target*/.checked]);
					tools.setTimeoutRouterBack(page.router);
				},
				".toggle click": function(e) {
					var input = e.target.up().down("input[type=checkbox][name=value]");
					if(input) {
						var self = arguments.callee;
						if(self.last && self.last.timeStamp === e.timeStamp) 
							return; 
							
						self.last = e;
						this.up(".page").dispatchEvent(
							new CustomEvent("toggle:changed", {detail: input}));
					}
				}
			}, config.handlers);

			if(!config.callbacks) {
				var setting = config.setting;
				config.callbacks = {
					getValue: function() {
						// <div class="page" data-setting="{{$route.params.name}}interval">
						setting = setting || this.el.dataset.setting;
						return window.app_data.Modem._values.requested[setting];
					},
					setValue: function(value) {
						// <div class="page" data-setting="{{$route.params.name}}interval">
						setting = setting || this.el.dataset.setting;
						window.app_data.Modem._values.requested[setting] = value;
					}
				};
			}
			
			/*- TODO fix these */
			var setValue = js.get("callbacks.setValue", config) || nullf;
			var getValue = js.get("callbacks.getValue", config) || nullf;
			
			return this.create(config, {
				afterIn: function(e, page) {
					var value = getValue.apply(page, []);
					var selector = $$("input[type=checkbox][name=value]", page.el);
					if(selector.length) {
						if(value) {
							selector.attr("checked", value);
						// } else {
						// 	selector.removeAttr("checked");
						}
						selector[0].up("li").scrollIntoView(false);
					}
				}
			});	
		}
	});
	
	return Controller;
});