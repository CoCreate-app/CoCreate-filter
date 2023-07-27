/*globals IntersectionObserver, CustomEvent*/
import observer from '@cocreate/observer';
import '@cocreate/element-prototype';
import { queryElements, checkValue, queryData, searchData, sortData } from '@cocreate/utils'

const elements = new Map();
const filters = new Map();
const dispatch = new Map();
const selector = '[filter-selector], [filter-closest], [filter-parent], [filter-next], [filter-previous]'


function init() {
    let filterSelector = selector + ', [filter-name], [filter-search], [filter-sort-name], [filter-on]'
    let filterElements = document.querySelectorAll(filterSelector)
    for (let i = 0; i < filterElements.length; i++)
        initElement(filterElements[i])
}

function initElement(element) {
    if (!elements.has(element)) {
        elements.set(element, {})

        initElementEvents(element)

        let filteredElements = queryElements({ element, prefix: 'filter' })
        if (!filteredElements)
            filteredElements = [element]

        for (let j = 0; j < filteredElements.length; j++) {
            if (!filters.has(filteredElements[j])) {
                initFilterOnEvent(filteredElements[j]);
                getFilter(filteredElements[j])
                filteredElements[j].getFilter = () => getFilter(filteredElements[j])
            }
        }
    }
}

function initElementEvents(element) {
    if (element.hasAttribute('filter-sort-name'))
        initSortEvent(element);
    if (element.hasAttribute('filter-name') || element.hasAttribute('filter-search'))
        initInputEvent(element);
}

function getElementFilters(element) {
    let filter = {}
    if (element.hasAttribute('filter-sort-name'))
        applySort(filter, element);
    if (element.hasAttribute('filter-name'))
        applyQuery(filter, element);
    if (element.hasAttribute('filter-search'))
        applySearch(filter, element);

    elements.set(element, filter)
    return filter
}

function getFilter(element) {
    let filter = {
        index: 0
    }

    for (let key of elements.keys()) {
        let filteredElement = queryElements({ element: key, prefix: 'filter' })
        if (!filteredElement) continue
        for (let i = 0; i < filteredElement.length; i++) {
            if (filteredElement[i] === element)
                filter = { ...filter, ...filters.get(filteredElement[i]) }
        }
    }

    let filterLimit = parseInt(element.getAttribute('filter-limit'));
    if (!isNaN(filterLimit)) {
        filter.limit = filterLimit;
    }

    filters.set(element, filter);
    return filter
}

function updateFilter(element, loadMore) {
    let newFilter = getElementFilters(element);

    let els = queryElements({ element, prefix: 'filter' })
    for (let i = 0; i < els.length; i++) {
        let filter = filters.get(els[i])
        filter = { ...filter, ...newFilter }
        if (loadMore) {
            let filterLimit = element.getAttribute('filter-limit')
            if (filterLimit)
                filter.limit = filterLimit
            filter.index = filter.count

        }
        filters.set(els[i], filter)

        let delayTimer = dispatch.get(els[i])
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
            dispatch.delete(els[i])
            els[i].setFilter(filter)
        }, 500);
        dispatch.set(els[i], delayTimer)
    }
}

function applyQuery(filter, element) {
    let name = element.getAttribute('filter-name')
    let operator = element.getAttribute('filter-operator') || 'includes'
    let logicalOperator = element.getAttribute('filter-logical-operator') || 'and'
    let filterValueType = element.getAttribute('filter-value-type') || 'string';
    let caseSensitive = element.getAttribute('filter-case-sensitive') || false

    // TODO: rename to filter-query-type?
    // filter-type used for $center $box etc
    let type = element.getAttribute('filter-type');
    let value = element.getAttribute('filter-value');
    if (!value && element.value !== undefined)
        value = element.getValue();

    if (!checkValue(name) || !checkValue(value) || !checkValue(type) || !checkValue(operator))
        filter.isFilter = false

    if (value.includes(",")) {
        value = value.split(',');
        for (let i = 0; i < value.length; i++)
            value[i] = value[i].trim()
    }

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

    let index = getQuery(filter, name, operator, logicalOperator);
    if (index === null || filter.query[index].value !== value)
        insertArray(filter.query, index, { name, value, operator, logicalOperator, type, caseSensitive });
}

function applySearch(filter, element) {
    let operator = element.getAttribute('filter-operator') || 'or'
    let caseSensitive = element.getAttribute('filter-case-sensitive') || false
    let value = element.getValue()
    if (!checkValue(value) || !checkValue(operator))
        filter.isFilter = false

    let index = getSearch(filter, value, operator, caseSensitive);
    if (index === null)
        insertArray(filter.search, index, { value, operator, caseSensitive });

}

function applySort(filter, element) {
    let name = element.getAttribute('filter-sort-name');
    let direction = element.getAttribute('filter-sort-direction')

    if (!name || !direction || !checkValue(name) || !checkValue(direction))
        return

    let index = getSort(filter, name);
    if (index === null || filter.sort[index].direction !== direction) {
        filter.sort.splice(index, 1)
        insertArray(filter.sort, index, { name, direction });
    }
}

function initSortEvent(element) {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
        element.addEventListener('change', function (e) {
            updateFilter(element)
        });
    }
}

function initInputEvent(element) {
    let contenteditable = element.getAttribute('contenteditable');
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName) || contenteditable != undefined && contenteditable != 'false') {
        element.addEventListener('input', function () {
            updateFilter(element)
        });
    }
}

function initFilterOnEvent(element) {
    element.addEventListener('fetchedData', () => {
        for (let el of elements.keys()) {
            let type = el.getAttribute('filter-on')
            switch (type) {
                case 'click':
                    el.addEventListener('click', () => updateFilter(el, true));
                    break;
                case 'scroll':
                    intersectionObserver.observe(el)
                    break;
                case 'fetched':
                    // TODO: get filter from response data
                    const filter = filters.get(element)
                    el.setValue(filter.count)
                    break;
            }
        }
    });

}

const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateFilter(entry.target, true)
            intersectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 1
});

function getQuery(filter, name, operator, logicalOperator) {
    if (filter.query) {
        for (let i = 0; i < filter.query.length; i++) {
            let f = filter.query[i];
            if (f.name == name && f.operator == operator && f.logicalOperator == logicalOperator) {
                return i;
            }
        }
    } else {
        filter.query = []
    }
    return null;
}

function getSearch(filter, value, operator, caseSensitive) {
    if (filter.search) {
        for (let i = 0; i < filter.search.length; i++) {
            let f = filter.search[i];
            if (f.operator == operator && f.caseSensitive == caseSensitive) {
                return i;
            }
        }
    } else {
        filter.search = []
    }
    return null;
}

function getSort(filter, name) {
    if (filter.sort) {
        for (let i = 0; i < filter.sort.length; i++) {
            if (filter.sort[i].name == name) {
                return i;
            }
        }
    } else {
        filter.sort = []
    }
    return null;
}

function insertArray(filterArray, index, obj) {
    if (index !== null && index >= 0)
        filterArray.splice(index, 1, obj);
    else
        filterArray.push(obj);

    return filterArray;
}

observer.init({
    name: 'CoCreateFilterInit',
    observe: ['addedNodes'],
    target: selector,
    callback(mutation) {
        initElement(mutation.target);
    }
});

observer.init({
    name: 'CoCreateFilterObserver',
    observe: ['attributes'],
    attributeName: ['filter-name', 'filter-operator', 'filter-value', 'filter-value-type', 'filter-sort-name', 'filter-sort-direction', 'filter-type'],
    callback(mutation) {
        updateFilter(mutation.target)
    }
});


init()

export default {
    init,
    getFilter,
    elements,
    filters,
    queryData,
    searchData,
    sortData
};
