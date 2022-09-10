function searchData(result, filter) {
	if (filter['search']['type'] == 'and') {
		result = andSearch(result, filter['search']['value']);
	} else {
		result = orSearch(result, filter['search']['value']);
	}
	
	const total = result.length;
	const startIndex = filter.startIndex;
	const count = filter.count;
	let result_data = [];
	
	if (data.created_ids && data.created_ids.length > 0) {
		let _nn = (count) ? startIndex : result.length;
		
		for (let ii = 0; ii < _nn; ii++) {
			
			const selected_item = result[ii];
			data.created_ids.forEach((fetch_id, index) => {
				if (fetch_id == selected_item['_id']) {
					result_data.push({ item: selected_item, position: ii })
				}
			})
		}
	} else {
		if (startIndex) result = result.slice(startIndex, total);
		if (count) result = result.slice(0, count)
		
		result_data = result;
	}
	filter['startIndex'] = startIndex
	filter['count'] = count
	filter['total'] = total
	return result_data
}

//. or operator
function orSearch(results, search) {
	var tmp
	if (search && search.length > 0) {

		tmp = results.filter(function(item) {
			
			for (var key in item) {
				var value = item[key];
				var __status = false;
				
				var str_value = value;
				
				if (Array.isArray(str_value) || typeof str_value == 'number') {
					str_value = str_value.toString();
				}
				
				if (typeof str_value == 'string') {
					str_value = str_value.toUpperCase();
				}

				for (let i = 0; i < search.length; i++) {
					if (typeof search[i] == 'string' && typeof str_value == 'string') {
						if (str_value.indexOf(search[i].toUpperCase()) > -1) {
							__status = true;
							break;
						}
					} else {
						if (value == search[i]) {
							__status = true;
							break;
						}
					}
				}
				
				if (__status) {
					return true;
				}
			}
			
			return false;
		})  
	} else {
		tmp = results;
	}
	
	return tmp;
}


//. and operator
function andSearch(results, search) {
	var tmp
	if (search && search.length > 0) {
				
		tmp = results.filter(function(item) {

			for (let i = 0; i < search.length; i++) {
				var __status = false;
				
				for (var key in item) {
					var value = item[key];
					
					if (typeof search[i] == 'string') {
						
						if (Array.isArray(value) || typeof value == 'number' ) {
							value = value.toString();
						} 
						
						if (typeof value == 'string') {
							value = value.toUpperCase();  
							if (value.indexOf(search[i].toUpperCase()) > -1) {
								__status = true;
								break;
							}
						}
						
					} else {
						if (value == search[i]) {
							__status = true;
							break;
						}
					}
				}
				
				if (!__status) {
					return false;  
				}
			}
			
			return true;
		})  
	} else {
		tmp = results;
	}
	
	return tmp;
}
	
function sortData(data, sort) {
	let name = Object.keys(sort)[0]
	if (name) {
		let sortType = sort[name];
		let sortValueType = "";
		let sortData;
		if (sortType == '-1') {
			if (sortValueType == 'number')
				sortData = data.sort((a, b) => 
					b[name] - a[name]
				);
			else
				sortData = data.sort((a, b) => 
					b[name].localeCompare(a[name])
				);
		} else {
			if (sortValueType == 'number')
				sortData = data.sort((a, b) => 
					a[name] - b[name]
				);
			else
				sortData = data.sort((a, b) => 
					a[name].localeCompare(b[name])
				);
			
		}
		return sortData;
	}
}	

function queryData(item, query) {
	//. $contain, $range, $eq, $ne, $lt, $lte, $gt, $gte, $in, $nin, $geoWithin
	let flag = true;
	if (!item || !query) {
		return false;
	}
	if (Array.isArray(item)) return false;
	query.forEach(({name, operator, type, value}) => {
		// ToDo: if fieldValue is an array check for each
		const fieldValue = item[name];
		switch (operator) {
			case '$contain':
				// if (!Array.isArray(fieldValue) || !fieldValue.some(x => value.includes(x))) flag = false;
				if (fieldValue && !fieldValue.includes(value)) flag = false; 
				break;
			case '$range':
				if (value !== null && value !== null) {
					if (value[0] > fieldValue || value[1] <= fieldValue)
						flag = false;
				} else if (item.value[0] == null && value[1] >= fieldValue) {
					flag = false;
				} else if (item.value[1] == null && value[0] <= fieldValue) {
					flag = false;
				}
				break;
			case '$eq':
				if (fieldValue != value) flag = false; 
				break;
			case '$ne':
				if (fieldValue == value) flag = false;
				break;
			case '$lt':
				if (fieldValue >= value) flag = false;
				break;
			case '$lte':
				if (fieldValue > value) flag = false;
				break;
			case '$gt':
				if (fieldValue <= value) flag = false;
				break;
			case '$gte':
				if (fieldValue < value) flag = false;
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
}

module.exports = {
	searchData,
	andSearch,
	orSearch,
	sortData,
	queryData
  };
  