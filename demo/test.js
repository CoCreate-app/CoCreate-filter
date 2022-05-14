const CoCreateFilterTesting = {
	items: [],
	attrName: 'data-test_id',
	
	init: function() {
		const self = this;
		
		let wrappers = document.querySelectorAll('[fetch-collection][data-test_id]')
		
		wrappers.forEach((el) => {
			self.__initElement(el);
		})
		
		this.__initSocketEvent()
	},
	
	__initSocketEvent: function() {
		const self = this;
		CoCreate.socket.listen('readDocuments', function(data) {
			self.__renderData(data)
		})

		CoCreate.socket.listen('createDocument', function(data) {
			
			self.__createItem(data)
		})
	
		CoCreate.socket.listen('deleteDocument', function(data) {
			self.__deleteItem(data);
		})
	},
	
	__initElement: function(el) {
		let id = el.getAttribute('data-test_id');
		if (!id) return;
		
		let filter = CoCreate.filter.setFilter(el, this.attrName, 'test');
		
		if (filter) {
			this.items.push({
				el: el,
				filter: filter,
				id: id
			})
			
			el.addEventListener("changeFilterInput", function(e) {
				// self.__removeOldData(item.el)
				// item.filter.startIndex = 0;
				// item.filter.isRefresh = true;
				CoCreate.filter.fetchData(filter);
			})
			
			CoCreate.filter.fetchData(filter)
		}
	},
	
	__renderData: function(data) {
		//. render items
		
		console.log('render items', data);	
	},
	
	__createItem: function(data) {
		//. add create-processing section
		console.log('createitem', data)
	},
	
	__deleteItem: function(data){
		//. add delete-processing section
		console.log('deleteitem', data);
	}
}

CoCreateFilterTesting.init()