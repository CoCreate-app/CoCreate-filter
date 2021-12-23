import action from '@cocreate/actions';
import crud from '@cocreate/crud-client';

const CoCreateFilter = {
	items: [],
	ioInstance: null,
	moduleAttribues: [],
	
	module_items : [],
	
	/** start init processing **/
	__init: function() {
		this.__initIntesection()
		this.__initSocket()
		this.__initEvents()
	},
	
	__initIntesection: function() {
		const self = this;
		this.ioInstance = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const attributeInfo = self.__getMainAttribue(entry.target);
					if (attributeInfo.id) {
						document.dispatchEvent(new CustomEvent('CoCreateFilter-loadMore', {
							detail: {
								attrName: attributeInfo.name,
								attrId: attributeInfo.id
							}
						}));
					}
					self.ioInstance.unobserve(entry.target)
				}
			})
		}, {
			threshold: 1
		})	
	},
	
	__runLoadMore: function(attrName, id) {
		if (!id || !attrName) return;
		let item = this.items.find((item) => item.attrName === attrName && item.id === id)
		if (!item) return;
		
		if (item.count > 0) {
			this.fetchData(item)
		}
	},
	
	__getMainAttribue: function(el) {
		const attribute = this.moduleAttribues.find((attr) => (el.getAttribute(attr) || "") !== "" )
		if (attribute) {
			return {
				name : attribute,
				id: el.getAttribute(attribute)
			}
		} else {
			return {};
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
				let element = document.querySelector(`[${item.attrName}="${item.id}"][fetch-type="scroll"]`)
				if (result_data.length > 0 && element) {
					self.ioInstance.observe(element)
				}
				
				// /** render total count **/
				const totalCount = data['operator'].total
				const totalElements = document.querySelectorAll(`[${item.attrName}="${item.id}"][fetch-type="total"]`)
				
				if (totalElements) {
					totalElements.forEach((el) => el.innerHTML = totalCount)
				}
			}
		})
	},
	
	__initEvents: function() {
		const self = this;
		document.addEventListener('CoCreateFilter-loadMore', function(event) {
			const attrId = event.detail.attrId;
			const attrName = event.detail.attrName
			self.__runLoadMore(attrName, attrId)
		})
		
		let buttons = document.querySelectorAll('[fetch-type="loadmore"]');
		buttons.forEach((btn) => {
			btn.addEventListener('click', function(e) {
				e.preventDefault();
				const attributeInfo = self.__getMainAttribue(btn);

				if (!attributeInfo.id) return;
				self.__runLoadMore(attributeInfo.attrName, attributeInfo.attrId)
			})
		});
	},
	
	/** ---  End --- **/
	
	setFilter: function(el, mainAttr, type) {
			
		if (!mainAttr) {
			return;
		}
		
		let id = el.getAttribute(mainAttr);
		
		if (!id) return;
		
		if (!this.moduleAttribues.includes(mainAttr)) this.moduleAttribues.push(mainAttr)
		
		let collection = el.getAttribute('fetch-collection');
		let fetch_type = el.getAttribute('fetch-value_type')
		let fetch_collection = fetch_type == "collection" ? true : false;
		
		let order_name = el.getAttribute('order-by')
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
	
		if (order_name) {
			item.orders.push({name: order_name, type: order_type == 'asc' ? 1 : -1 })
		}

		this._initFilter(item, id, mainAttr);
		this._initOrder(item, id, mainAttr);
		this.items.push(item);
		this._initInputForm(item, mainAttr);
		
		// this._initExportImport(item, id, mainAttr);
		return item;
	},
	
	_initFilter: function(item, id, attrName) {
		let filter_objs = item.el.getRootNode().querySelectorAll('[' + attrName + '="' + id + '"]');
		for (var i = 0; i < filter_objs.length; i++) {
			
			let f_el = filter_objs[i];
			let filter_name = f_el.getAttribute('filter-name');
			let filter_operator = f_el.getAttribute('filter-operator') ? f_el.getAttribute('filter-operator') : '$contain';
			let value_type = f_el.getAttribute('filter-value-type') ? f_el.getAttribute('filter-value-type') : 'string';
			let filter_type = f_el.getAttribute('filter-type');
			let filter_value = f_el.getAttribute('filter-value');
			if (filter_value == null) {
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
			let order_name = f_el.getAttribute('order-by');
			let order_value = f_el.getAttribute('value');
			if (!order_name || !order_value) {
				continue ;
			}
			
			if (['A', 'BUTTON'].includes(f_el.tagName)) {
				f_el.addEventListener('click', function(){
					let name = this.getAttribute('order-by');
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
		
		this._initToggleOrderEvent(item, id, attrName);
	},
	
	_initToggleOrderEvent: function(item, id, attrName) {
		let elements = document.querySelectorAll(`[${attrName}="${id}"][toggle-order]`)
		const self =this;
		elements.forEach((element) => {
			element.addEventListener('click', function() {
				let value = this.getAttribute('toggle-order') || '';
				let order_name = this.getAttribute('order-by');
				
				value = value === 'asc' ? 'desc' : 'asc';

				for (let i = 0; i < elements.length; i++) {
					if (elements[i] !== element) {
						elements[i].setAttribute('toggle-order', '');
					}
				}
				
				item.orders = [];
				
				self._applyOrder(item, order_name, value);
				element.setAttribute('toggle-order', value);
				
				if (item.el) {
					item.el.dispatchEvent(new CustomEvent("changeFilterInput", { detail: {type: 'order'} }))
				}
				
			})
		})
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
		let collection = filter.el.getAttribute('fetch-collection');
		filter.collection = collection;
		filter.startIndex = 0;
	},
	
	_makeSearchOption: function(id, attrName) {
		let forms = document.querySelectorAll(`form[${attrName}="${id}"]`);
		
		let tmpSelector = `[${attrName}="${id}"]`;
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
			let filter_name = template_inputs[i].getAttribute('filter-name')
			let order_name = template_inputs[i].getAttribute('order-by')
			
			let input = template_inputs[i];
			let value_type = input.getAttribute('filter-value-type') ? input.getAttribute('filter-value-type') : 'string';
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

		// console.log('input form', tmpSelector);
		
		for (let i=0; i < formInputs.length; i++) {
			let input = formInputs[i];
			
			let order_by = input.getAttribute('order-by');
			
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
			
			let order_by = this.getAttribute('order-by');
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
			let filter_name = this.getAttribute('filter-name');
			let filter_operator = this.getAttribute('filter-operator') || '$contain';
			let filter_type = this.getAttribute('filter-type');
			let value_type = this.getAttribute('filter-value-type') || 'string';
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
				var f_name = elements[i].getAttribute('filter-name');
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
		crud.readDocumentList(json);
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
		}
		
		if (item.count) {
			json['operator'].count = item.count;
		}
		return json;
	},
	
	init: function({name, attribute, callback}) {
		let elements = document.querySelectorAll(`[fetch-collection][${attribute}]`)
		const self = this;
		elements.forEach((el) => {
			self.__initFilterElement(el, attribute, name);
		});
		
		crud.listen('readDocumentList', function(data) {
			callback.call(null, data);
		})
	},
	
	__initFilterElement: function(el, attribute, name) {
		let _id = el.getAttribute(attribute)
		const self = this;
		if (!_id) return;
		
		//. restrict the duplication define
		// if (this.module_items.some(x => x.name == name && x.id == _id)) {
		// 	return;
		// }
		
		let filter = this.setFilter(el, attribute, name)
		
		if (filter) {
			this.module_items.push({
				el: el,
				filter: filter,
				id: _id,
				name: name
			})
			
			el.addEventListener('changeFilterInput', function(e) {
				self.fetchData(filter)
			})
			
			this.fetchData(filter)
		}
	},
	
	exportAction: async function(btn) {
		const item_id = btn.getAttribute('template_id');
		let item = this.items.find((item) => item.id === item_id);
		if (!item) return;
		
		let new_filter = this.makeFetchOptions(item)
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
			a.remove()		
		}
    	document.dispatchEvent(new CustomEvent('exported', {
			detail: {}
		}))

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
			})
		}
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
}

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