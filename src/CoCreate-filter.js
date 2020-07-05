
function CoCreateFilter() {
	this.items = [];
}

CoCreateFilter.prototype = {
	constructor: CoCreateFilter,
	
	setFilter: function(el, mainAttr, type) {
			
			if (!mainAttr) {
				return;
			}
			
			let id = el.getAttribute(mainAttr);
			
			if (!id) return;
			
			let collection = el.getAttribute('data-fetch_collection') ? el.getAttribute('data-fetch_collection') : 'module_activity';
			let fetch_name = el.getAttribute('data-fetch_name');
			let fetch_value = el.getAttribute('data-fetch_value');
			let search_type = el.getAttribute('data-search_type');
			let fetch_collection = el.getAttribute('data-fetch_collection_list') == "true" ? true : false;
			
			let order_name = el.getAttribute('data-order_by')
			let order_type = el.getAttribute('data-order_type') || 'asc';

			let fetch_count = parseInt(el.getAttribute('data-fetch_count'));
			
			// let searchKey = '';
			// let searchInput = document.querySelector("[data-engine-id='" + id + "'].template-search");
			// if (searchInput && searchInput.value) searchKey = searchInput.value;

			let item = {
				el: el,
				id: id,
				eId: id, // + this.items.length,
				type: type,
				
				attrName: mainAttr,
				
				collection: collection,
				startIndex: 0,
				options: {},	/** return options **/
				fetch: {},
				is_collection: fetch_collection,
				search: {
					type: 'or',
					value: []
				},
				orders: [],
				filters: []
			}
			
			if (!isNaN(fetch_count) && fetch_count > 0) {
				item.count = fetch_count;
			}
		
			if (search_type) {
				item.search.type = search_type;
			}
			
			if (order_name) {
				item.orders.push({name: order_name, type: order_type == 'asc' ? 1 : -1 })
			}
			
			if (fetch_name && fetch_value) {
				item.fetch = {
					name: fetch_name,
					value: fetch_value
				}
			}
			
			this._initFilter(item, id, mainAttr);
			this._initOrder(item, id, mainAttr);
			this.items.push(item);
			this._initInputForm(item, mainAttr);
			return item;
	},
	
	_initFilter: function(item, id, attrName) {
		let filter_objs = item.el.getRootNode().querySelectorAll('[' + attrName + '="' + id + '"]');
		for (var i = 0; i < filter_objs.length; i++) {
			
			let f_el = filter_objs[i];
			let filter_name = f_el.getAttribute('data-filter_name');
			let filter_operator = f_el.getAttribute('data-filter_operator') ? f_el.getAttribute('data-filter_operator') : 'contain';
			let value_type = f_el.getAttribute('data-value_type') ? f_el.getAttribute('data-value_type') : 'string';
			let filter_type = f_el.getAttribute('data-filter_type');
			let filter_value = f_el.getAttribute('data-filter_value');
			if (!filter_value || filter_value == "") {
				continue ;
			}
			if (value_type !== "raw") {
				filter_value = filter_value.replace(/\s/g, '').split(',');
			}
	
			if (!filter_name) {
				item.search.value = this._makeSearchOption(id, attrName);
			} else {
				let idx = this.getFilterByName(item, filter_name, filter_operator);
				if (value_type != 'string') {
					for (let i = 0; i < filter_value.length; i++) {
						filter_value[i] = Number(filter_value[i]);
					}
				}
				this.insertArrayObject(item.filters, idx, {name: filter_name, value: filter_value, operator: filter_operator, type: filter_type})
			}
		}
	},
	
	_initOrder: function(item, id, attrName) {
		let filter_objs = item.el.getRootNode().querySelectorAll('[' + attrName + '="' + id + '"]');
		const _this = this;
		for (var i = 0; i < filter_objs.length; i++) {
			
			let f_el = filter_objs[i];
			let order_name = f_el.getAttribute('data-order_by');
			let order_value = f_el.getAttribute('value');
			if (!order_name || !order_value) {
				continue ;
			}
			
			
			if (['A', 'BUTTON'].includes(f_el.tagName)) {
				f_el.addEventListener('click', function(){
					let name = this.getAttribute('data-order_by');
					let value = this.getAttribute('value');
					_this._applyOrder(item, name, value)
					if (item.el) {
						item.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'order'} }))
					}
				});
				//. apply click event
			} else {
				this._applyOrder(item, order_name, order_value);
			}
		}			
	},
	
	_applyOrder: function(item, name, value) {
		
		if (!value) {
			return;
		}
		let order_type = 0;
		let idx = this.getOrderByName(item, name);
		
		if (value == 'asc') {
			order_type = 1;   
		} else if (value == 'desc') {
			order_type = -1;
		} else {
			order_type = [];
		}
		this.insertArrayObject(item.orders, idx, {name: name, type: order_type}, order_type)
	},
	
	changeCollection: function(filter) {
		let collection = filter.el.getAttribute('data-fetch_collection') ? filter.el.getAttribute('data-fetch_collection') : 'module_activity';
		filter.collection = collection;
		filter.startIndex = 0;
	},
	
	_makeSearchOption: function(id, attrName) {
		let forms = document.querySelectorAll('form[' + attrName + '=' + id + ']');
		
		let tmpSelector = '[' + attrName + '=' + id + ']';
		let otherInputs = document.querySelectorAll('input' + tmpSelector + ',textarea' + tmpSelector + ', select' + tmpSelector);
		
		let template_inputs = [];

		for (let i=0; i < forms.length; i++) {
			let form = forms[i];
			let formInputs = form.querySelectorAll('input, textarea, select');
			formInputs = Array.prototype.slice.call(formInputs)
			template_inputs = template_inputs.concat(formInputs);
		}
		
		otherInputs = Array.prototype.slice.call(otherInputs);
		template_inputs = template_inputs.concat(otherInputs)
		
		let values = [];
		
		for (var i = 0; i < template_inputs.length; i++) {
			let filter_name = template_inputs[i].getAttribute('data-filter_name')
			let order_name = template_inputs[i].getAttribute('data-order_by')
			
			let input = template_inputs[i];
			let value_type = input.getAttribute('data-value_type') ? input.getAttribute('data-value_type') : 'string';
			let value = null;
			
			if (!filter_name && !order_name) {
				if (input.type == 'checkbox' && !input.checked) {
					value = null;
				} else {
					value = input.value;
					if (value_type != 'string') {
						value = Number(value);
					}
					if (value && !values.includes(value)) {
						values.push(value)
					}
				}
			}
		}
		return values;
	},
	
	_initInputForm: function(item, attrName) {
	
		if (!item) return;
	
		let tmpSelector = '[' + attrName + '="' + item.id + '"]';
		let formInputs = item.el.getRootNode().querySelectorAll('form'+ tmpSelector + ' input, form' + tmpSelector + ' textarea, form' + tmpSelector + ' select');
		let otherInputs = item.el.getRootNode().querySelectorAll('input' + tmpSelector + ',textarea' + tmpSelector + ', select' + tmpSelector);
	
		this.setCheckboxName(item.id, attrName);
		
		formInputs = Array.prototype.slice.call(formInputs);
		otherInputs = Array.prototype.slice.call(otherInputs);
		formInputs = formInputs.concat(otherInputs);

		console.log('input form', tmpSelector);
		
		for (let i=0; i < formInputs.length; i++) {
			let input = formInputs[i];
			
			let order_by = input.getAttribute('data-order_by');
			
			if (order_by) {
				this._initOrderInput(item, input);
			} else {
				this._initFilterInput(item, input, item.id);
			}
		}
	},
	
	_initOrderInput: function(item, input) {
		var _instance = this;
		input.addEventListener('change', function(e) {
			
			e.preventDefault();
			
			let order_by = this.getAttribute('data-order_by');
			let order_type = 0;
			let idx = _instance.getOrderByName(item, order_by);
			
			if (this.value == 'asc') {
				order_type = 1;   
			} else if (this.value == 'desc') {
				order_type = -1;
			} else {
				order_type = [];
			}
			
			_instance.insertArrayObject(item.orders, idx, {name: order_by, type: order_type}, order_type)
			
			if (item.el) {
				item.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'order'} }))
			}
		})
	},

	_initFilterInput: function (item, input, id) {
		var _instance = this;
		var delayTimer;
		input.addEventListener('input', function(e) {
			e.preventDefault();
			let filter_name = this.getAttribute('data-filter_name');
			let filter_operator = this.getAttribute('data-filter_operator') || 'contain';
			let filter_type = this.getAttribute('data-filter_type');
			let value_type = this.getAttribute('data-value_type') || 'string';
			clearTimeout(delayTimer);
			delayTimer = setTimeout(function() {
				
				if (!filter_name) {
					item.search.value = _instance._makeSearchOption(id, item.attrName);
				} else {
					
					let idx = _instance.getFilterByName(item, filter_name, filter_operator);
			
					let inputType = input.type;
					let filterValue = [];
				
					if (inputType == 'checkbox') {
						var inputGroup = document.querySelectorAll("input[name=" + input.name + "]:checked");
						for (var i = 0; i < inputGroup.length; i++) {
							filterValue.push(inputGroup[i].value);
						}
			
					} else if (inputType == 'raido') {
						
					} else if (inputType == 'range') {
						filterValue = [Number(input.min), Number(input.value)];
					} else {
						var value = input.value;
						if (value_type != 'string') {
							value = Number(value);
						}
						if (value != "none") {
							filterValue = [value];
						}
						
						if (value_type === "raw") {
							filterValue = value;
						}
					}
					
					_instance.insertArrayObject(item.filters, idx, {name: filter_name, value: filterValue, operator: filter_operator, type: filter_type})
				}
				if (item.el) {
					item.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'filter'} }))
				}
			
			}, 500);

		})
	},
	setCheckboxName: function (id, attrName) {
		var forms = document.querySelectorAll('form[' + attrName + '="' + id + '"]')
		for (var k = 0; k < forms.length; k++) {
			
			var elements = forms[k].querySelectorAll('input[type=checkbox], form input[type=radio]');
			
			for (var i = 0; i < elements.length; i++) {
				var el_name = elements[i].getAttribute('name');
				var f_name = elements[i].getAttribute('data-filter_name');
				if (el_name || !f_name) {
					continue;
				}
				elements[i].setAttribute('name', "_" + id +"-" + f_name + "_" + k);
			}
			
		}
	},
	
	getFilterByName: function (item, filterName, filterOperator) {
		for (var i = 0; i < item.filters.length; i++) {
			var f = item.filters[i];
			if (f.name == filterName && f.operator == filterOperator) {
				return i;
			}
		}
		return -1;
	},
	
	insertArrayObject: function(data, idx, obj, value) {
		if (!value) {
			value = obj.value;
		}
		if (typeof value == 'object'  && value.length == 0) {
			if (idx != -1) {
				data.splice(idx, 1);
			}
		} else {
			if (idx != -1) {
				data[idx] = obj;
			} else {
				data.push(obj);
			}
		}
		
		return data;
	},
	
	getOrderByName: function(item, name) {
		for (var i = 0; i < item.orders.length; i++) {
			if (item.orders[i].name == name) {
				return i;
			}
		}
		return -1;
	},
	
	
	defineEvent: function(item) {
		item.el.addEventListener('fetchFilterData', function(event) {
			console.log(event);
		});
	},
	
	fetchData:function (item) {
		let json = this.makeFetchOptions(item);
		CoCreate.readDocumentList(json);
	},
	
	getObjectByFilterId: function(obj, id) {
		for (var i = 0; i < obj.length; i++) {
			let filter = obj[i].filter;
			if (!filter) {
				continue;
			}
			
			if (filter.id == id) {
				return obj[i];
			}
		}
	},
	
	getObjectByElement: function(obj, el) {
		for (var i = 0; i < obj.length; i++) {
			let filter = obj[i].filter;
			if (!filter) {
				continue;
			}
			
			if (filter.el.isSameNode(el)) {
				return obj[i];
			}
		}
	},
	
	makeFetchOptions: function(item) {
		let json = {
			"collection": item.collection,
			"element": item.eId,
			"metadata": "",
			"operator" :  {
				"fetch": item.fetch,
				"filters": item.filters,
				"orders": item.orders,
				"search": item.search,
				"startIndex": item.startIndex,
			},
			"is_collection": item.is_collection
		}
		
		if (item.count) {
			json['operator'].count = item.count;
		}
		return json;
	}


}

var g_cocreateFilter = new CoCreateFilter();

console.log(g_cocreateFilter);

