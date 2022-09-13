/*globals IntersectionObserver, CustomEvent*/
import observer from '@cocreate/observer';
import action from '@cocreate/actions';
import crud from '@cocreate/crud-client';
import {searchData, andSearch, orSearch, sortData, queryData} from './filter'

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
		let item = this.items.find((item) => item.filter.attrName === attrName && item.filter.id === id);
		if (!item) return;
		
		if (item.filter.count > 0) {
			this.fetchData(item);
		}
	},
	
	__initSocket: function() {
		const self = this;
		crud.listen('readDocuments', function(data) {
			let item_id = data.filter.id;
			let item = self.items.find((item) => item.filter.id === item_id);
			if (item) {
				// eObj.startIndex += data.result.length;
				const result_data = data['data'];
				
				//. set the intersection observe element
				let element = document.querySelector(`[${item.filter.attrName}="${item.filter.id}"][fetch-type="scroll"]`);
				if (result_data.length > 0 && element) {
					self.ioInstance.observe(element);
				}
				
				// /** render total count **/
				const totalCount = data.filter.total;
				const totalElements = document.querySelectorAll(`[${item.filter.attrName}="${item.filter.id}"][fetch-type="total"]`);
				
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
	
	setFilter: function(el, attrName) {
			
		if (!attrName) {
			return;
		}
		
		let id = el.getAttribute(attrName);
		
		if (!id) return;
		
		if (!this.moduleAttribues.includes(attrName)) 
			this.moduleAttribues.push(attrName);
		
		let collection = el.getAttribute('fetch-collection');
		
		let order_name = el.getAttribute('filter-order-name');
		let order_type = el.getAttribute('filter-order-type') || 'asc';

		let fetch_count = parseInt(el.getAttribute('fetch-count'));
		
		let item = {
			collection,
			filter: {
				id,
				el,
				search: {
					type: 'or',
					value: []
				},
				sort: [],
				query: [],
				startIndex: 0,
				attrName
			}
		};
		
		if (!isNaN(fetch_count) && fetch_count > 0) {
			item.filter.count = fetch_count;
		}
	
		if (order_name) {
			item.filter.sort.push({name: order_name, type: order_type == 'asc' ? 1 : -1 });
		}
		
		this.setCheckboxName(item.filter.id, item.filter.attrName);
		this._initFilter(item);
		this.items.push(item);
	
		return item;
	},
	
	_initFilter: function(item, element, event) {
		let elements = this.queryFilters(item);
		if (elements){
			// item.filter.sort = [];
			item.filter.query = [];
			item.filter.search.value = [];
		}
		
		for (var i = 0; i < elements.length; i++) {
			let f_el = elements[i];
			let filter_name = f_el.getAttribute('filter-name');
			let order_name = f_el.getAttribute('filter-order-name');
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
			item.filter.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'filter'} }));
		}
	},
	
	queryFilters: function(item) {
		let tmpSelector = '[' + item.filter.attrName + '="' + item.filter.id + '"]';
		let formInputs = item.filter.el.ownerDocument.querySelectorAll('form'+ tmpSelector + ' input, form' + tmpSelector + ' textarea, form' + tmpSelector + ' select');
		let otherInputs = item.filter.el.ownerDocument.querySelectorAll(tmpSelector);
	
		formInputs = Array.prototype.slice.call(formInputs);
		otherInputs = Array.prototype.slice.call(otherInputs);
		let elements = formInputs.concat(otherInputs);
		
		return elements;
	},
	
	_applyOrder: function(item, element, value) {
		let f_el = element;
		let name = f_el.getAttribute('filter-order-name');
		if (!value)
			value = f_el.getAttribute('value') || f_el.getAttribute('filter-order-type');
		
		if (!value) return;
		let order_type = 0;
		let idx = this.getSortByName(item, name);
		5
		if (value == 'asc') {
			order_type = 1;   
		} else if (value == 'desc') {
			order_type = -1;
		} else {
			order_type = [];
		}
		this.insertArrayObject(item.filter.sort, idx, {name: name, type: order_type}, order_type);
	},

	_applyFilter: function(item, element, filter_name, event) {
		let f_el = element;	
		let filter_operator = f_el.getAttribute('filter-operator') ? f_el.getAttribute('filter-operator') : '$contain';
		let value_type = f_el.getAttribute('filter-value-type') ? f_el.getAttribute('filter-value-type') : 'string';
		let filter_type = f_el.getAttribute('filter-type');
		let filter_value = f_el.getAttribute('filter-value');
		// ToDo: if filter value is an array check for each
		// if (Array.isArray(filter_value)) {}
		// if (filter_value) {
			// if (value_type !== "raw")
			// 	filter_value = filter_value.replace(/\s/g, '');
		// }
		if (!filter_value) {
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
		if (filter_value == '' && !event || event && event.target !== f_el) 
			return;
		let idx = this.getFilterByName(item, filter_name, filter_operator);
		if (value_type != 'string') {
			if (Array.isArray(filter_value)) {
				for (let i = 0; i < filter_value.length; i++) {
					filter_value[i] = Number(filter_value[i]);
				}
			}
			else
				filter_value = Number(filter_value)
		}
		this.insertArrayObject(item.filter.query, idx, {name: filter_name, value: filter_value, operator: filter_operator, type: filter_type});
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
		if (value && !item.filter.search.value.includes(value)) {
			item.filter.search.value.push(value);
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
					if (item.filter.el) {
						item.filter.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'order'} }));
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

			item.filter.sort = [];
			
			self._applyOrder(item, element, value);
			element.setAttribute('toggle-order', value);
			
			if (item.filter.el) {
				item.filter.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'order'} }));
			}
		});
	},
	
	_initOrderChangeEvent: function(item, input) {
		const self = this;
		input.addEventListener('change', function(e) {
			
			e.preventDefault();
			
			let order_by = this.getAttribute('filter-order-name');
			let order_type = 0;
			let idx = self.getSortByName(item, order_by);
			
			if (this.value == 'asc') {
				order_type = 1;   
			} else if (this.value == 'desc') {
				order_type = -1;
			} else {
				order_type = [];
			}
			
			self.insertArrayObject(item.filter.sort, idx, {name: order_by, type: order_type}, order_type);
			
			if (item.filter.el) {
				item.filter.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'order'} }));
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
		if (item.filter['is_collection'])
			crud.readCollections(item);
		else
			crud.readDocuments(item);
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
		for (var i = 0; i < item.filter.query.length; i++) {
			var f = item.filter.query[i];
			if (f.name == filterName && f.operator == filterOperator) {
				return i;
			}
		}
		return -1;
	},
	
	getSortByName: function(item, name) {
		for (var i = 0; i < item.filter.sort.length; i++) {
			if (item.filter.sort[i].name == name) {
				return i;
			}
		}
		return -1;
	},

	getItemById: function(obj, id) {
		for (var i = 0; i < obj.length; i++) {
			if (obj[i].filter.id == id) {
				return obj[i];
			}
		}
	},
		
	init: function({name, attribute, callback}) {
		let elements = document.querySelectorAll(`[fetch-collection][${attribute}]`);
		const self = this;
		elements.forEach((el) => {
			self.__initFilterElement(el, attribute, name);
		});
		if (callback)
			crud.listen('readDocuments', function(data) {
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
		
	exportAction: async function(btn) {
		const item_id = btn.getAttribute('template_id');
		let item = this.items.find((item) => item.filter.id === item_id);
		if (!item) return;
		
		item.filter.startIndex = 0;
		
		let data = await crud.readDocuments(item);
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
	target: '[filter-name], [filter-order-name]',
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
	name: "import",
	endEvent: "imported",
	callback: (btn, data) => {
		CoCreateFilter.importAction(btn)
	},
})

action.init({
	name: "export",
	endEvent: "exported",
	callback: (btn, data) => {
		CoCreateFilter.exportAction(btn)
	},
})

action.init({
	name: "deleteDocuments",
	endEvent: "deletedDocuments",
	callback: (btn, data) => {
		CoCreateFilter.__deleteDocumentsAction(btn);
	}
});

CoCreateFilter.__init();
 
// export default CoCreateFilter;
module.exports = {
	...CoCreateFilter,
	searchData,
	andSearch,
	orSearch,
	sortData,
	queryData
  };
