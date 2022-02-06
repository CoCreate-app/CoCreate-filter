/*globals IntersectionObserver, CustomEvent*/
import observer from '@cocreate/observer';
import action from '@cocreate/actions';
import crud from '@cocreate/crud-client';

const CoCreateFilter = {
	items: [],
	ioInstance: null,
	moduleAttribues: [],
	filterEvents: new Map(),
	module_items : [],
	
	__init: function() {
		this.__initIntersection();
		this.__initSocket();
		this.__initEvents();
	},
	
	__initIntersection: function() {
		const self = this;
		this.ioInstance = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const attributeInfo = self.getMainAttribue(entry.target);
					if (attributeInfo.id) {
						document.dispatchEvent(new CustomEvent('CoCreateFilter-loadMore', {
							detail: {
								attrName: attributeInfo.name,
								attrId: attributeInfo.id
							}
						}));
					}
					self.ioInstance.unobserve(entry.target);
				}
			});
		}, {
			threshold: 1
		});	
	},
	
	__runLoadMore: function(attrName, id) {
		if (!id || !attrName) return;
		let item = this.items.find((item) => item.attrName === attrName && item.id === id);
		if (!item) return;
		
		if (item.count > 0) {
			this.fetchData(item);
		}
	},
	
	__initSocket: function() {
		const self = this;
		crud.listen('readDocumentList', function(data) {
			let item_id = data['element'];
			let item = self.items.find((item) => item.id === item_id);
			if (item) {
				// eObj.startIndex += data.result.length;
				const result_data = data['data'];
				
				//. set the intersection observe element
				let element = document.querySelector(`[${item.attrName}="${item.id}"][fetch-type="scroll"]`);
				if (result_data.length > 0 && element) {
					self.ioInstance.observe(element);
				}
				
				// /** render total count **/
				const totalCount = data['operator'].total;
				const totalElements = document.querySelectorAll(`[${item.attrName}="${item.id}"][fetch-type="total"]`);
				
				if (totalElements) {
					totalElements.forEach((el) => el.innerHTML = totalCount);
				}
			}
		});
	},
	
	__initEvents: function() {
		const self = this;
		document.addEventListener('CoCreateFilter-loadMore', function(event) {
			const attrId = event.detail.attrId;
			const attrName = event.detail.attrName;
			self.__runLoadMore(attrName, attrId);
		});
		
		let buttons = document.querySelectorAll('[fetch-type="loadmore"]');
		buttons.forEach((btn) => {
			btn.addEventListener('click', function(e) {
				e.preventDefault();
				const attributeInfo = self.getMainAttribue(btn);

				if (!attributeInfo.id) return;
				self.__runLoadMore(attributeInfo.attrName, attributeInfo.attrId);
			});
		});
	},
	
	setFilter: function(el, mainAttr, type) {
			
		if (!mainAttr) {
			return;
		}
		
		let id = el.getAttribute(mainAttr);
		
		if (!id) return;
		
		if (!this.moduleAttribues.includes(mainAttr)) this.moduleAttribues.push(mainAttr);
		
		let collection = el.getAttribute('fetch-collection');
		let is_collection = el.hasAttribute('fetch-collections');
		
		let order_name = el.getAttribute('order-by');
		let order_type = el.getAttribute('order-type') || 'asc';

		let fetch_count = parseInt(el.getAttribute('fetch-count'));
		
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
			is_collection,
			search: {
				type: 'or',
				value: []
			},
			orders: [],
			filters: []
		};
		
		if (!isNaN(fetch_count) && fetch_count > 0) {
			item.count = fetch_count;
		}
	
		if (order_name) {
			item.orders.push({name: order_name, type: order_type == 'asc' ? 1 : -1 });
		}
		
		this.setCheckboxName(item.id, item.attrName);
		this._initFilter(item);
		this.items.push(item);
	
		return item;
	},
	
	_initFilter: function(item, element, event) {
		let elements;
		if(element)
			elements = [element];
		else
			elements = this.queryFilters(item);
		for (var i = 0; i < elements.length; i++) {
			let f_el = elements[i];
			let filter_name = f_el.getAttribute('filter-name');
			let order_name = f_el.getAttribute('order-by');
			if(!this.filterEvents.has(f_el)){
				this.filterEvents.set(f_el, true);
				var setEvent = true;
			}
			if (order_name){
				this._applyOrder(item, f_el);
				if(setEvent)
					this._initOrderEvent(item, f_el);
			}
			if (filter_name){
				this._applyFilter(item, f_el, filter_name, event);
				if(setEvent)
					this.initInputEvent(item, f_el);
			}
			else{
				this._applySearch(item, f_el);
				if(setEvent)
					this.initInputEvent(item, f_el);
			}	
		}
		if (element) {
			item.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'filter'} }));
		}
	},
	
	queryFilters: function(item) {
		let tmpSelector = '[' + item.attrName + '="' + item.id + '"]';
		let formInputs = item.el.getRootNode().querySelectorAll('form'+ tmpSelector + ' input, form' + tmpSelector + ' textarea, form' + tmpSelector + ' select');
		let otherInputs = item.el.getRootNode().querySelectorAll(tmpSelector);
	
		formInputs = Array.prototype.slice.call(formInputs);
		otherInputs = Array.prototype.slice.call(otherInputs);
		let elements = formInputs.concat(otherInputs);
		
		return elements;
	},
	
	_applyOrder: function(item, element, value) {
		let f_el = element;
		let name = f_el.getAttribute('order-by');
		if (!value)
			value = f_el.getAttribute('value') || '';
		
		if (!value) return;
		let order_type = 0;
		let idx = this.getOrderByName(item, name);
		
		if (value == 'asc') {
			order_type = 1;   
		} else if (value == 'desc') {
			order_type = -1;
		} else {
			order_type = [];
		}
		this.insertArrayObject(item.orders, idx, {name: name, type: order_type}, order_type);
	},

	_applyFilter: function(item, element, filter_name, event) {
		let f_el = element;	
		let filter_operator = f_el.getAttribute('filter-operator') ? f_el.getAttribute('filter-operator') : '$contain';
		let value_type = f_el.getAttribute('filter-value-type') ? f_el.getAttribute('filter-value-type') : 'string';
		let filter_type = f_el.getAttribute('filter-type');
		let filter_value = f_el.getAttribute('filter-value');
		
		if (filter_value) {
			if (value_type !== "raw")
				filter_value = filter_value.replace(/\s/g, '').split(',');
		}
		else {
			let inputType = f_el.type;
			filter_value = [];
		
			if (inputType == 'checkbox') {
				var inputGroup = document.querySelectorAll("input[name=" + f_el.name + "]:checked");
				for (var i = 0; i < inputGroup.length; i++) {
					filter_value.push(inputGroup[i].value);
				}
	
			} else if (inputType == 'raido') {
				
			} else if (inputType == 'range') {
				filter_value = [Number(f_el.min), Number(f_el.value)];
			} else {
				var value = f_el.value;
				if (value_type != 'string') {
					value = Number(value);
				}
				if (value != "none") {
					filter_value = [value];
				}
				
				if (value_type === "raw") {
					filter_value = value;
				}
			}
		}
		if (filter_value == '' && !event) 
			return;
		let idx = this.getFilterByName(item, filter_name, filter_operator);
		if (value_type != 'string') {
			for (let i = 0; i < filter_value.length; i++) {
				filter_value[i] = Number(filter_value[i]);
			}
		}
		this.insertArrayObject(item.filters, idx, {name: filter_name, value: filter_value, operator: filter_operator, type: filter_type});
	},
	
	_applySearch: function(item, element) {
		let input = element;
		let value_type = input.getAttribute('filter-value-type') ? input.getAttribute('filter-value-type') : 'string';
		let value = null;
		
		if (input.type == 'checkbox' && !input.checked) {
			value = null;
		} else {
			value = input.value;
			if (value_type != 'string') {
				value = Number(value);
			}
		}
		if (value && !item.search.value.includes(value)) {
			item.search.value.push(value);
		}
	},
	
	_initOrderEvent: function(item, element) {
		const self = this;
		if (element.hasAttribute('toggle-order'))
			this._initToggleOrderEvent(item, element);
		else{
			if (['A', 'BUTTON'].includes(element.tagName)) {
				element.addEventListener('click', function(){
					self._applyOrder(item, element);
					if (item.el) {
						item.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'order'} }));
					}
				});
			} else if (['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
				this._initOrderChangeEvent(item, element);
			}
		}
	},
	
	_initToggleOrderEvent: function(item, element) {
		const self = this;
		element.addEventListener('click', function() {
			let value = this.getAttribute('toggle-order') || '';
			value = value === 'asc' ? 'desc' : 'asc';

			item.orders = [];
			
			self._applyOrder(item, element, value);
			element.setAttribute('toggle-order', value);
			
			if (item.el) {
				item.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'order'} }));
			}
		});
	},
	
	_initOrderChangeEvent: function(item, input) {
		const self = this;
		input.addEventListener('change', function(e) {
			
			e.preventDefault();
			
			let order_by = this.getAttribute('order-by');
			let order_type = 0;
			let idx = self.getOrderByName(item, order_by);
			
			if (this.value == 'asc') {
				order_type = 1;   
			} else if (this.value == 'desc') {
				order_type = -1;
			} else {
				order_type = [];
			}
			
			self.insertArrayObject(item.orders, idx, {name: order_by, type: order_type}, order_type);
			
			if (item.el) {
				item.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'order'} }));
			}
		});
	},

	initInputEvent: function (item, input) {
		var _instance = this;
		var delayTimer;
		let contenteditable = input.getAttribute('contenteditable');
		if (['INPUT', 'TEXTAREA', 'SELECT'].includes(input.tagName) || contenteditable != undefined && contenteditable != 'false'){
			input.addEventListener('input', function(e) {
				e.preventDefault();
				clearTimeout(delayTimer);
				delayTimer = setTimeout(function() {
					let element = e.target;
					if (element.hasAttribute('template_id') || element.form && element.form.hasAttribute('template_id'))
						_instance._initFilter(item, element, e);
				}, 500);
	
			});
		}
	},
	
	setCheckboxName: function (id, attrName) {
		var forms = document.querySelectorAll('form[' + attrName + '="' + id + '"]');
		for (var k = 0; k < forms.length; k++) {
			
			var elements = forms[k].querySelectorAll('input[type=checkbox], form input[type=radio]');
			
			for (var i = 0; i < elements.length; i++) {
				var el_name = elements[i].getAttribute('name');
				var f_name = elements[i].getAttribute('filter-name');
				if (el_name || !f_name) {
					continue;
				}
				elements[i].setAttribute('name', "_" + id +"-" + f_name + "_" + k);
			}
			
		}
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
	
	fetchData:function (item) {
		let json = this.makeFetchOptions(item);
		crud.readDocumentList(json);
	},
	
	getMainAttribue: function(el) {
		if (el.hasAttribute('template_id'))
			return {
				name : 'template_id',
				id: el.getAttribute('template_id')
			};
		const attribute = this.moduleAttribues.find((attr) => (el.getAttribute(attr) || "") !== "" );
		if (attribute) {
			return {
				name : attribute,
				id: el.getAttribute(attribute)
			};
		} else {
			return {};
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
	
	getOrderByName: function(item, name) {
		for (var i = 0; i < item.orders.length; i++) {
			if (item.orders[i].name == name) {
				return i;
			}
		}
		return -1;
	},

	getItemById: function(obj, id) {
		for (var i = 0; i < obj.length; i++) {
			let filter = obj[i];
			if (!filter) {
				continue;
			}
			
			if (filter.id == id) {
				return filter;
			}
		}
	},
	
	getItemByElement: function(obj, el) {
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
			"metadata": {
				isRefresh: item.isRefresh
			},
			"operator" :  {
				"filters": item.filters,
				"orders": item.orders,
				"search": item.search,
				"startIndex": item.startIndex,
			},
			"is_collection": item.is_collection
		};
		
		if (item.count) {
			json['operator'].count = item.count;
		}
		return json;
	},
	
	init: function({name, attribute, callback}) {
		let elements = document.querySelectorAll(`[fetch-collection][${attribute}]`);
		const self = this;
		elements.forEach((el) => {
			self.__initFilterElement(el, attribute, name);
		});
		if (callback)
			crud.listen('readDocumentList', function(data) {
				callback.call(null, data);
			});
	},
	
	__initFilterElement: function(el, attribute, name) {
		let _id = el.getAttribute(attribute);
		const self = this;
		if (!_id) return;
		
		let filter = this.setFilter(el, attribute, name);
		
		if (filter) {
			this.module_items.push({
				el: el,
				filter: filter,
				id: _id,
				name: name
			});
			
			el.addEventListener('changeFilterInput', function(e) {
				self.fetchData(filter);
			});
			
			this.fetchData(filter);
		}
	},
	
	filterItem: function(item, filters) {
		//. $contain, $range, $eq, $ne, $lt, $lte, $gt, $gte, $in, $nin, $geoWithin
		let flag = true;
		if (!item || !filters) {
			return false;
		}
		if (Array.isArray(item)) return false;
		filters.forEach(({name, operator, type, value}) => {
			
			const fieldValue = item[name];
			switch (operator) {
				case '$contain':
					// if (!Array.isArray(fieldValue) || !fieldValue.some(x => value.includes(x))) flag = false;
					if (!fieldValue.includes(value[0])) flag = false; 
					break;
				case '$range':
					if (value[0] !== null && value[1] !== null) {
						if (value[0] > fieldValue || value[1] <= fieldValue)
							flag = false;
					} else if (item.value[0] == null && value[1] >= fieldValue) {
						flag = false;
					} else if (item.value[1] == null && value[0] <= fieldValue) {
						flag = false;
					}
					break;
				case '$eq':
					if (fieldValue != value[0]) flag = false; 
					break;
				case '$ne':
					if (fieldValue == value[0]) flag = false;
					break;
				case '$lt':
					if (fieldValue >= value[0]) flag = false;
					break;
				case '$lte':
					if (fieldValue > value[0]) flag = false;
					break;
				case '$gt':
					if (fieldValue <= value[0]) flag = false;
					break;
				case '$gte':
					if (fieldValue < value[0]) flag = false;
					break;
				case '$in':
					if (!Array.isArray(fieldValue) || !fieldValue.some(x => value.includes(x))) flag = false;
					break;
				case '$nin':
					if (Array.isArray(fieldValue) && fieldValue.some(x => value.includes(x))) flag = false;
					break;
			}
		});
		return flag;
	},
	
	exportAction: async function(btn) {
		const item_id = btn.getAttribute('template_id');
		let item = this.items.find((item) => item.id === item_id);
		if (!item) return;
		
		let new_filter = this.makeFetchOptions(item);
		new_filter.operator.startIndex = 0;
		new_filter.operator.search.startIndex = 0;
		
		let data = await crud.readDocumentList(new_filter);
		this.exportFile(data);
	},
	
	exportFile: function(data) {
		if (window.document) {
			const file_name = data.collection || 'downloadFile';
			var a = document.createElement("a");
			a.style = "display: none";
			let exportData = JSON.stringify(data.data);
			let blob = new Blob([exportData], { type: "application/json" });	
			let url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = file_name;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			a.remove();		
		}
    	document.dispatchEvent(new CustomEvent('exported', {
			detail: {}
		}));

	},

	importAction: function(btn) {
		const collection = btn.getAttribute('collection');
		if (!collection) { 
			console.log('collection is required'); 
			return;
		}				
		var input = document.createElement('input');
		input.type = 'file';

		input.onchange = e => {
			var file = e.target.files[0];
			crud.importCollection({
				collection: collection,
				file: file
			});
		};
		input.click();
	},
	
	__deleteDocumentsAction: function(btn) {
		const collection = btn.getAttribute('collection');
		if(crud.checkAttrValue(collection)) {
			const dataTemplateid = btn.getAttribute('template_id');
			if(!dataTemplateid) return;

			const selectedEls = document.querySelectorAll(`.selected[templateid="${dataTemplateid}"]`);

			selectedEls.forEach((el) => {
				const document_id = el.getAttribute('document_id');

				if(crud.checkAttrValue(document_id)) {
					crud.deleteDocument({
						collection,
						document_id,
						'metadata': ''
					});
				}
			});

			document.dispatchEvent(new CustomEvent('deletedDocuments', {
				detail: {}
			}));
		}
	},
};

observer.init({ 
	name: 'CoCreateFilterInit', 
	observe: ['addedNodes'],
	target: '[filter-name], [order-by]',
	callback: function(mutation) {
		let el = mutation.target;
		if (el.hasAttribute('fetch-collection')) return;
		let attr = CoCreateFilter.getMainAttribue(el);
		let item = CoCreateFilter.getItemById(CoCreateFilter.items, attr.id);
		if (item)
			CoCreateFilter._initFilter(item, mutation.target);
	}
});

observer.init({ 
	name: 'CoCreateFilterObserver', 
	observe: ['attributes'],
	attributeName: ['filter-name', 'filter-value'],
	callback: function(mutation) {
		let el = mutation.target;
		let attr = CoCreateFilter.getMainAttribue(el);
		let item = CoCreateFilter.getItemById(CoCreateFilter.items, attr.id);
		if (item)
			CoCreateFilter._initFilter(item, mutation.target);
	}
});

action.init({
	action: "import",
	endEvent: "imported",
	callback: (btn, data) => {
		CoCreateFilter.importAction(btn)
	},
})

action.init({
	action: "export",
	endEvent: "exported",
	callback: (btn, data) => {
		CoCreateFilter.exportAction(btn)
	},
})

action.init({
	action: "deleteDocuments",
	endEvent: "deletedDocuments",
	callback: (btn, data) => {
		CoCreateFilter.__deleteDocumentsAction(btn);
	}
});

CoCreateFilter.__init();
 
export default CoCreateFilter;