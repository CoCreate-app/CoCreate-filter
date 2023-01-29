/*globals IntersectionObserver, CustomEvent*/
import observer from '@cocreate/observer';
import crud from '@cocreate/crud-client';
import action from '@cocreate/actions';
import '@cocreate/element-prototype';
import {checkValue, queryData, searchData, sortData} from '@cocreate/utils'

const CoCreateFilter = {
	items: new Map(),
	filterEvents: new Map(),
	mutatonObserver: false,
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
		let item = {el};

		// ToDo: add default and custom attributes to window.CoCreateConfig.attributes
		// let attributes = window.CoCreateConfig.attributes;
		let attributes = {"fetch-db": "db", "fetch-database": "database", "fetch-collection": "collection", "fetch-index": "index", "fetch-document": "document", "fetch-name": "name", "fetch-data": "data"}

		for (let attribute of el.attributes) {
			let variable = attributes[attribute.name]
			if (variable) {
				let object = {[variable]: attribute.value}
				if (object[variable]) {
					if (!checkValue(object[variable]))
						return
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

		item.filter = {
			attribute,
			id,
			search: [],
			sort: [],
			query: [],
			startIndex: 0
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
		if (item.data)
			item.filter.type = 'data'
		
		if (['index', 'document'].includes(item.filter.type) && !item.collection.length)
			return

		item.filter.startIndex = 0;
		let fetchLimit = parseInt(el.getAttribute('fetch-limit'));
		if (!isNaN(fetchLimit)) {
			item.filter.limit = fetchLimit;
		}
			
		this.setCheckboxName(item.filter.id, item.filter.attribute);
		this._initFilter(item);
		this._initLoadMore(item);
		if (!this.mutatonObserver) 
			this.initMutationObserver()
		if (!this.intersectionObserver) 
			this.initIntersectionObserver()

		if (item.isFilter != false) {
			delete item.isFilter
		}

		this.items.set(item.filter.id, item);
		el.filter = item.filter
		return item;
	},
	
	_initFilter: function(item, element, event) {
		let elements
		if (element)
			elements = [element]
		else
			elements = item.el.ownerDocument.querySelectorAll(`[${item.filter.attribute}='${item.filter.id}']`);
		
		if (elements)
			delete item.isFilter
		
		
		for (var i = 0; i < elements.length; i++) {
			let el = elements[i];
			let filterName = el.getAttribute('filter-name');
			let sortName = el.getAttribute('filter-sort-name');
			let search = el.hasAttribute('filter-search');
			let loadMore = el.getAttribute('fetch-type');
			if (!this.filterEvents.has(el)) {
				this.filterEvents.set(el, true);
				var setEvent = true;
			}

			if (sortName) {
				this._applySort(item, el);
				if (setEvent)
					this._initSortEvent(item, el);
			} 
			if (filterName) {
				this._applyQuery(item, el, filterName, event);
				if (setEvent)
					this.initInputEvent(item, el);
			}
			if (search) {
				this._applySearch(item, el);
				if (setEvent)
					this.initInputEvent(item, el);
			}
			if (loadMore == 'loadmore' && setEvent)
				this.initLoadMoreEvent(item, el)

		}

		if (element) {
			item.filter.startIndex = 0;
			if (item.isFilter != false)
				item.el.dispatchEvent(new CustomEvent("fetchData", { detail: {type: 'filter'} }));
		}
	},
		
	_applyQuery: function(item, element, name, event, compare) {
		let operator = element.getAttribute('filter-operator') || 'includes'
		let logicalOperator = element.getAttribute('filter-logical-operator') || 'and'
		let filterValueType = element.getAttribute('filter-value-type') || 'string';
		
		// ToDo: rename to filter-query-type?
		// filter_type used for $center $box etc
		let filter_type = element.getAttribute('filter-type');		
		let value = element.getAttribute('filter-value');
		if (!value && element.value !== undefined)
			value = element.getValue();

		if (!checkValue(name) || !checkValue(value) || !checkValue(filter_type) || !checkValue(operator))
			item.isFilter = false
			
		if (value.includes(",")) {
			value = value.split(',');
			for (let i = 0; i < value.length; i++)
				value[i] = value[i].trim()
		}

		// ToDo: if filter value is an array check for each
		if (Array.isArray(value)) {
			for (let i = 0; i < value.length; i++) {
				switch (filterValueType) {
					case 'number':
						value[i] = Number(value[i]);
						break
				}
			}
		} else {
			switch (filterValueType) {
				case 'number':
					value = Number(value);
					break
			}
		}

		if (event) {
			if (value === '' && event.target !== element) 
				return
		} 
	
		let index = this.getQuery(item, name, operator, logicalOperator);
		if (compare) {
			if (index === null || item.filter.query[index].value !== value)
				this._initFilter(item, element)
		} else if (index === null && value === '') 
			return
		
		this.insertArray(item.filter.query, index, {name, value, operator, logicalOperator, type: filter_type});
	},
	
	_applySearch: function(item, element, compare) {
		let operator = element.getAttribute('filter-operator') || 'or'
		let caseSensitive = element.getAttribute('filter-case-sensitive') || false
		let value = element.getValue()
		if (!checkValue(value) || !checkValue(operator))
			item.isFilter = false
		
		let index = this.getSearch(item, value, operator, caseSensitive);
		if (compare) {
			if (index === null)
				this._initFilter(item, element)
		} else 
			this.insertArray(item.filter.search, index, {value, operator, caseSensitive});

	},

	_applySort: function(item, element, direction, compare) {
		let name = element.getAttribute('filter-sort-name');
		
		if (!direction)
			direction = element.getAttribute('filter-sort-direction') || 'asc';

		if (!checkValue(name) || !checkValue(direction))
			return

		let index = this.getSort(item, name);
		if (compare) {
			if (index === null || item.filter.sort[index].direction !== direction)
				this._initFilter(item, element)
		} else 
			this.insertArray(item.filter.sort, index, {name, direction});
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
						if (item.isFilter != false)
							item.el.dispatchEvent(new CustomEvent("fetchData", { detail: {type: 'sort'} }));
					}
				});
			} else if (['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
				this._initSortChangeEvent(item, element);
			}
		}
	},
	
	// ToDo: depreciate as this can be handeled by CoCreate-toggle/click
	_initSortToggleEvent: function(item, element) {
		const self = this;
		element.addEventListener('click', function() {
			let direction = this.getAttribute('filter-sort-toggle');
			if (direction == 'asc')
				direction = 'desc'
			else
				direction = 'asc'
			item.filter.sort = [];
			self._applySort(item, element, direction);
			element.setAttribute('filter-sort-toggle', direction);
			
			if (item.el) {
				item.filter.startIndex = 0;
				item.el.dispatchEvent(new CustomEvent("fetchData", { detail: {type: 'sort'} }));
			}
		});
	},
	
	_initSortChangeEvent: function(item, element) {
		const self = this;
		element.addEventListener('change', function(e) {
			e.preventDefault();
			self._applySort(item, element, e.target.value);
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

	},

	initLoadMoreEvent: function(item, element) {
		const self = this;
		element.addEventListener('click', function(e) {
			self.loadMore(item);
		});
	},

	loadMore: function(item) {
		if (!item) 
			return;
		
		item.el.dispatchEvent(new CustomEvent("fetchData", { detail: {type: 'loadmore'} }));
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
		
	getFilter: function(el) {
		for (let item of this.items.values()) {
			if (item.el == el)
				return item
		}
	},
	
	getQuery: function (item, name, operator, logicalOperator) {
		for (let i = 0; i < item.filter.query.length; i++) {
			let f = item.filter.query[i];
			if (f.name == name && f.operator == operator && f.logicalOperator == logicalOperator) {
				return i;
			}
		}
		return null;
	},

	getSearch: function (item, value, operator, caseSensitive) {
		for (let i = 0; i < item.filter.search.length; i++) {
			let f = item.filter.search[i];
			if (f.value == value && f.operator == operator && f.caseSensitive == caseSensitive) {
				return i;
			}
		}
		return null;
	},
	
	getSort: function(item, name) {
		for (let i = 0; i < item.filter.sort.length; i++) {
			if (item.filter.sort[i].name == name) {
				return i;
			}
		}
		return null;
	},

	insertArray: function(filterArray, index, obj) {
		if (index >= 0)
			filterArray.splice(index, 1, obj);
		else
			filterArray.push(obj);
		
		return filterArray;
	},
				
	exportAction: async function(btn) {
		const item_id = btn.getAttribute('template_id');
		let item = this.items.get(item_id)
		if (!item) return;
		
		
		let Item = new Object(item)
		Item.filter.startIndex = 0;
		delete Item.el
		delete Item.count

		let data;
		if (crud) {
			data = await crud.readDocument(Item);
		}
		// ToDo: get from local data source
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
			if (crud) {
				let file = e.target.files[0];
				crud.importCollection({
					collection: collection,
					file: file
				});
			}
		};
		input.click();
	},
	
	__deleteDocumentsAction: function(btn) {
		const collection = btn.getAttribute('collection');
		if (checkValue(collection)) {
			const template_id = btn.getAttribute('template_id');
			if (!template_id) return;

			let _ids = []
			const selectedEls = document.querySelectorAll(`.selected[templateid="${template_id}"]`);
			for (let i = 0; i < selectedEls.length; i++) {
				const _id = selectedEls[i].getAttribute('document_id');
				if (checkValue(_id))
					_ids.push({_id})
			}

			if (_ids.length > 0 && crud) {
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

	initMutationObserver: function() {
		const self = this
		this.mutatonObserver = true

		observer.init({ 
			name: 'CoCreateFilterInit', 
			observe: ['addedNodes'],
			target: '[filter-name], [filter-sort-name]',
			callback: function(mutation) {
				// ToDo: needs to check for fetch- attributes
				if (mutation.target.hasAttribute('fetch-collection')) 
					return;
				let item = self.getFilter(mutation.target);
				if (item)
					self._initFilter(item, mutation.target);
			}
		});
		
		observer.init({ 
			name: 'CoCreateFilterObserver', 
			observe: ['attributes'],
			attributeName: ['filter-name', 'filter-operator', 'filter-value', 'filter-value-type', 'filter-sort-name', 'filter-sort-direction', 'filter-type'],
			callback: function(mutation) {
				let element = mutation.target
				let attribute = mutation.attributeName
				let item = self.getFilter(mutation.target);
				if (item) {
					delete item.isFilter
					if (!item.isFetched)
						self._initFilter(item, element);
					else if (attribute.includes('search')) {
						self._applySearch(item, element, true)
					} else if (attribute.includes('sort')) {
						self._applySort(item, element, '', true)
					} else if (element.hasAttribute('filter-name')) {
						let name = element.getAttribute('filter-name')
						self._applyQuery(item, element, name, '', true) 
					}
				}
			}
		});
	}
};

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

export default {
  ...CoCreateFilter,
  queryData,
  searchData,
  sortData
};
