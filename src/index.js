/*globals IntersectionObserver, CustomEvent*/
import observer from '@cocreate/observer';
import action from '@cocreate/actions';
import crud from '@cocreate/crud-client';
import {searchData, andSearch, orSearch, sortData, queryData} from '@cocreate/utils'

const CoCreateFilter = {
	items: new Map(),
	filterEvents: new Map(),
	intersectionObserver: null,
	
	initIntersectionObserver: function() {
		const self = this;
		this.intersectionObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					let item = entry.target['filter']
					self.loadMore(item);
					self.intersectionObserver.unobserve(entry.target);
				}
			});
		}, {
			threshold: 1
		});	
	},
	
	init: function(el, attribute) {	
		if (!el || !attribute) return;
		
		let id = el.getAttribute(attribute);
		
		if (!id) return;
		let item = this.items.get(id) || {el};
		
		// ToDo: add default and custom attributes to window.CoCreateConfig.attributes
		// let attributes = window.CoCreateConfig.attributes;
		let attributes = {"fetch-db": "db", "fetch-database": "database", "fetch-collection": "collection", "fetch-index": "index", "fetch-document": "document", "fetch-name": "name"}

		for (let attribute of el.attributes) {
			let variable = attributes[attribute.name]
			if (variable) {
				let object = {[variable]: attribute.value}
				if (object[variable]) {
					if (object[variable].includes(",")) {
						const array = object[variable].split(',');
						for (let i = 0; i < array.length; i++)
						array[i].trim()
						item[variable] = array
					} else {
						item[variable] = [object[variable]]
					}
				} else {
					item[variable] = [];
				}
	
			} 
		}

		let fetchCount = parseInt(el.getAttribute('fetch-count'));

		if (!item.filter) {
			item.filter = {
				attribute,
				id,
				search: {
					type: 'or',
					value: []
				},
				sort: [],
				query: [],
				startIndex: 0
			}	
		}

		if (item.database)
			item.filter.type = 'database'
		if (item.collection) {
			if (item.collection.length > 0) {
				item.filter.type = 'document'
				item.document = []
			}
			else
				item.filter.type = 'collection'
		}
		if (item.index)
			item.filter.type = 'index'
		if (item.document)
			item.filter.type = 'document'
		if (item.name)
			item.filter.type = 'name'
		
		if (['index', 'document'].includes(item.filter.type) && !item.collection.length)
			return

		if (!isNaN(fetchCount) && fetchCount > 0) {
			item.filter.count = fetchCount;
		}
			
		if (!this.items.has(item.filter.id)) {	
			this.setCheckboxName(item.filter.id, item.filter.attribute);
			this._initFilter(item);
			this._initLoadMore(item);
		}

		this.items.set(item.filter.id, item);
		el.filter = item.filter
		return item;
	},
	
	_initFilter: function(item, element, event) {
		let elements = this.queryFilters(item);
		if (elements){
			delete item.fetch
			// item.filter.sort = [];
			item.filter.query = [];
			item.filter.search.value = [];
		}
		
		for (var i = 0; i < elements.length; i++) {
			let el = elements[i];
			let filter_name = el.getAttribute('filter-name');
			let sortName = el.getAttribute('filter-sort-name');
			if (!this.filterEvents.has(el)) {
				this.filterEvents.set(el, true);
				var setEvent = true;
			}
			if (sortName) {
				this._applySort(item, el);
				if (setEvent)
					this._initSortEvent(item, el);
			}
			if (filter_name) {
				this._applyQuery(item, el, filter_name, event);
				if (setEvent)
					this.initInputEvent(item, el);
			} else {
				this._applySearch(item, el);
				if (setEvent)
					this.initInputEvent(item, el);
			}	
		}
		if (element) {
			item.filter.startIndex = 0;
			item.el.dispatchEvent(new CustomEvent("fetchData", { detail: {type: 'filter'} }));
		}
	},
	
	queryFilters: function(item) {
		let tmpSelector = '[' + item.filter.attribute + '="' + item.filter.id + '"]';
		let formInputs = item.el.ownerDocument.querySelectorAll('form'+ tmpSelector + ' input, form' + tmpSelector + ' textarea, form' + tmpSelector + ' select');
		let otherInputs = item.el.ownerDocument.querySelectorAll(tmpSelector);
	
		formInputs = Array.prototype.slice.call(formInputs);
		otherInputs = Array.prototype.slice.call(otherInputs);
		let elements = formInputs.concat(otherInputs);
		
		return elements;
	},
	
	_applySort: function(item, element, value) {
		let name = element.getAttribute('filter-sort-name');
		if (!value)
			value = element.getAttribute('value') || element.getAttribute('filter-sort-type');
		
		if (!value) return;
		let valueType = element.getAttribute('filter-value-type') ? element.getAttribute('filter-value-type') : 'string';

		let sortType = 0;
		let idx = this.getSortByName(item, name);
		
		if (value == 'asc') {
			sortType = 1;   
		} else if (value == 'desc') {
			sortType = -1;
		} else {
			sortType = [];
		}
		this.insertArrayObject(item.filter.sort, idx, {name: name, type: sortType, valueType }, sortType);
	},

	_applyQuery: function(item, element, filter_name, event) {
		let el = element;	
		let filter_operator = el.getAttribute('filter-operator') ? el.getAttribute('filter-operator') : '$contain';
		let value_type = el.getAttribute('filter-value-type') ? el.getAttribute('filter-value-type') : 'string';
		
		// ToDo: rename to filter-query-type?
		// filter_type used for $center $box etc
		let filter_type = el.getAttribute('filter-type');

		// ToDo: if filter value is an array check for each
		// if (Array.isArray(filter_value)) {}
		// if (filter_value) {
			// if (value_type !== "raw")
			// 	filter_value = filter_value.replace(/\s/g, '');
		// }		
		
		let filter_value = el.getAttribute('filter-value');
		if (!crud.checkValue(filter_name) || !crud.checkValue(filter_value) || !crud.checkValue(filter_type) || !crud.checkValue(filter_operator))
			item.fetch = false
		if (!filter_value) {
			let inputType = el.type;
			filter_value = [];
		
			if (inputType == 'checkbox') {
				var inputGroup = document.querySelectorAll("input[name=" + el.name + "]:checked");
				for (var i = 0; i < inputGroup.length; i++) {
					filter_value.push(inputGroup[i].value);
				}
	
			} else if (inputType == 'raido') {
				
			} else if (inputType == 'range') {
				filter_value = [Number(el.min), Number(el.value)];
			} else {
				var value = el.value;
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
		if (filter_value == '' && !event || event && event.target !== el) 
			return;
		let idx = this.getQueryByName(item, filter_name, filter_operator);
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
		let el = element;
		let value_type = el.getAttribute('filter-value-type')
		if (!value_type)
			value_type = 'string'
		let value = null;
		
		if (el.type == 'checkbox' && !el.checked) {
			value = null;
		} else {
			value = el.value;
			if (value_type != 'string') {
				value = Number(value);
			}
		}
		if (value && !item.filter.search.value.includes(value)) {
			item.filter.search.value.push(value);
		}
	},
	
	_initSortEvent: function(item, element) {
		const self = this;
		if (element.hasAttribute('filter-sort-toggle'))
			this._initSortToggleEvent(item, element);
		else{
			if (['A', 'BUTTON'].includes(element.tagName)) {
				element.addEventListener('click', function(){
					self._applySort(item, element);
					if (item.el) {
						item.filter.startIndex = 0;
						item.el.dispatchEvent(new CustomEvent("fetchData", { detail: {type: 'sort'} }));
					}
				});
			} else if (['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
				this._initSortChangeEvent(item, element);
			}
		}
	},
	
	_initSortToggleEvent: function(item, element) {
		const self = this;
		element.addEventListener('click', function() {
			let value = this.getAttribute('filter-sort-toggle') || '';
			value = value === 'asc' ? 'desc' : 'asc';

			item.filter.sort = [];
			
			self._applySort(item, element, value);
			element.setAttribute('filter-sort-toggle', value);
			
			if (item.el) {
				item.filter.startIndex = 0;
				item.el.dispatchEvent(new CustomEvent("fetchData", { detail: {type: 'sort'} }));
			}
		});
	},
	
	_initSortChangeEvent: function(item, el) {
		const self = this;
		el.addEventListener('change', function(e) {
			
			e.preventDefault();
			
			let sortName = this.getAttribute('filter-sort-name');
			let sortType = 0;
			let idx = self.getSortByName(item, sortName);
			
			if (this.value == 'asc') {
				sortType = 1;   
			} else if (this.value == 'desc') {
				sortType = -1;
			} else {
				sortType = [];
			}
			
			self.insertArrayObject(item.filter.sort, idx, {name: sortName, type: sortType}, sortType);
			
			if (item.el) {
				item.filter.startIndex = 0;
				item.el.dispatchEvent(new CustomEvent("fetchData", { detail: {type: 'sort'} }));
			}
		});
	},

	initInputEvent: function (item, el) {
		const self = this;
		let delayTimer;
		let contenteditable = el.getAttribute('contenteditable');
		if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || contenteditable != undefined && contenteditable != 'false'){
			el.addEventListener('input', function(e) {
				e.preventDefault();
				clearTimeout(delayTimer);
				delayTimer = setTimeout(function() {
					let element = e.target;
					if (element.hasAttribute('template_id') || element.form && element.form.hasAttribute('template_id'))
						self._initFilter(item, element, e);
				}, 500);
	
			});
		}
	},

	_initLoadMore: function(item) {
		const self = this;

		item.el.addEventListener('fetchedData', () => {
	
			const elements = document.querySelectorAll(`[${item.filter.attribute}="${item.filter.id}"][fetch-type]`);
			for (let i = 0; i < elements.length; i++) {
				elements[i]['filter'] = item
				let type = elements[i].getAttribute('fetch-type')
				switch(type) {
					case 'scroll':
						self.intersectionObserver.observe(elements[i])
						break;
					case 'fetched':
						elements[i].setValue(item.filter.startIndex)
					  break;
					default:
						if (type && type != 'loadmore')
							elements[i].setValue(item.filter[type])
				}
			}
		});

		let buttons = document.querySelectorAll(`[${item.filter.attribute}="${item.filter.id}"][fetch-type="loadmore"]`);
		buttons.forEach((btn) => {
			self.initLoadMoreEvent(btn, item)
		});

	},

	initLoadMoreEvent: function(element, item) {
		const self = this;
		element.addEventListener('click', function(e) {
			self.loadMore(item);
		});
	},

	loadMore: function(item) {
		if (!item) 
			return;
		
		if (item.filter.total > item.filter.startIndex ) {
			item.el.dispatchEvent(new CustomEvent("fetchData", { detail: {type: 'loadmore'} }));
		}
	},

	setCheckboxName: function (id, attribute) {
		var forms = document.querySelectorAll('form[' + attribute + '="' + id + '"]');
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
	
	getFilter: function(el) {
		for (let item of this.items.values()) {
			if (item.el == el)
				return item
		}
	},
	
	getQueryByName: function (item, filterName, filterOperator) {
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
				
	exportAction: async function(btn) {
		const item_id = btn.getAttribute('template_id');
		let item = this.items.get(item_id)
		if (!item) return;
		
		
		let Item = new Object(item)
		Item.filter.startIndex = 0;
		delete Item.el
		delete Item.count


		let data = await crud.readDocument(Item);
		this.exportFile(data);
	},
	
	exportFile: function(data) {
		let file_name = data.type || 'download';
		let exportData = JSON.stringify(data.document, null, 4);
		let blob = new Blob([exportData], { type: "application/json" });	
		let url = URL.createObjectURL(blob);

		let link = document.createElement("a");

		link.href = url;
		link.download = file_name;

		document.body.appendChild(link);

		link.dispatchEvent(
			new MouseEvent('click', { 
				bubbles: true, 
				cancelable: true, 
				view: window 
			})
		);

		URL.revokeObjectURL(url);
		link.remove();		
	
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
		if (crud.checkValue(collection)) {
			const template_id = btn.getAttribute('template_id');
			if (!template_id) return;

			let _ids = []
			const selectedEls = document.querySelectorAll(`.selected[templateid="${template_id}"]`);
			for (let i = 0; i < selectedEls.length; i++) {
				const _id = selectedEls[i].getAttribute('document_id');
				if (crud.checkValue(_id))
					_ids.push({_id})
			}

			if (_ids.length > 0) {
				crud.deleteDocument({
					collection,
					document: _ids
				}).then(() => {
					document.dispatchEvent(new CustomEvent('deletedDocuments', {
						detail: {}
					}));
				})
			}

			
		}
	},
};

observer.init({ 
	name: 'CoCreateFilterInit', 
	observe: ['addedNodes'],
	target: '[filter-name], [filter-sort-name]',
	callback: function(mutation) {
		// ToDo: needs to check for fetch- attributes
		if (el.hasAttribute('fetch-collection')) return;
		let item = CoCreateFilter.getFilter(mutation.target);
		if (item)
			CoCreateFilter._initFilter(item, mutation.target);
	}
});

observer.init({ 
	name: 'CoCreateFilterObserver', 
	observe: ['attributes'],
	attributeName: ['filter-name', 'filter-operator', 'filter-value', 'filter-value-type', 'filter-sort-name', 'filter-type', 'filter-type'],
	callback: function(mutation) {
		let item = CoCreateFilter.getFilter(mutation.target);
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

CoCreateFilter.initIntersectionObserver()
export default {
  ...CoCreateFilter,
  searchData,
  andSearch,
  orSearch,
  sortData,
  queryData
};
