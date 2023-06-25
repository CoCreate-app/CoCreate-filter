/*globals IntersectionObserver, CustomEvent*/
import observer from '@cocreate/observer';
import crud from '@cocreate/crud-client';
import action from '@cocreate/actions';
import '@cocreate/element-prototype';
import { checkValue, queryData, searchData, sortData } from '@cocreate/utils'

const CoCreateFilter = {
    filters: new Map(),
    filterEvents: new Map(),
    mutatonObserver: false,
    intersectionObserver: null,

    initIntersectionObserver: function () {
        const self = this;
        this.intersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let filter = entry.target['filter']
                    self.loadMore(filter);
                    self.intersectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 1
        });
    },

    init: function (element, attribute) {
        if (!element) return;
        if (!attribute)
            attribute = 'filter'

        let id = element.getAttribute(attribute);
        if (!id) return;

        let filter = {
            element,
            attribute,
            id,
            search: [],
            sort: [],
            query: [],
            startIndex: 0
        }

        let filterLimit = parseInt(element.getAttribute('filter-limit'));
        if (!isNaN(filterLimit)) {
            filter.limit = filterLimit;
        }

        this.setCheckboxName(filter.id, filter.attribute);
        this._initFilter(filter);
        this._initLoadMore(filter);
        if (!this.mutatonObserver)
            this.initMutationObserver()
        if (!this.intersectionObserver)
            this.initIntersectionObserver()

        if (filter.isFilter != false) {
            delete filter.isFilter
        }

        this.filters.set(filter.id, filter);

        element.filter = filter

        let Filter = { ...filter }
        delete Filter.element
        return Filter;
    },

    _initFilter: function (filter, element, event) {
        let elements
        if (element)
            elements = [element]
        else
            elements = filter.element.ownerDocument.querySelectorAll(`[${filter.attribute}='${filter.id}']`);

        if (elements)
            delete filter.isFilter


        for (var i = 0; i < elements.length; i++) {
            let el = elements[i];
            let filterName = el.getAttribute('filter-name');
            let sortName = el.getAttribute('filter-sort-name');
            let search = el.hasAttribute('filter-search');
            let loadMore = el.getAttribute('filter-on');
            if (!this.filterEvents.has(el)) {
                this.filterEvents.set(el, true);
                var setEvent = true;
            }

            if (sortName) {
                this._applySort(filter, el);
                if (setEvent)
                    this._initSortEvent(filter, el);
            }
            if (filterName) {
                this._applyQuery(filter, el, filterName, event);
                if (setEvent)
                    this.initInputEvent(filter, el);
            }
            if (search) {
                this._applySearch(filter, el);
                if (setEvent)
                    this.initInputEvent(filter, el);
            }
            if (loadMore == 'loadmore' && setEvent)
                this.initLoadMoreEvent(filter, el)

        }

        if (element) {
            filter.startIndex = 0;
            if (filter.isFilter != false)
                filter.element.dispatchEvent(new CustomEvent("fetchData", { detail: { filter } }));
        }
    },

    _applyQuery: function (filter, element, name, event, compare) {
        let operator = element.getAttribute('filter-operator') || 'includes'
        let logicalOperator = element.getAttribute('filter-logical-operator') || 'and'
        let filterValueType = element.getAttribute('filter-value-type') || 'string';
        let caseSensitive = element.getAttribute('filter-case-sensitive') || false

        // TODO: rename to filter-query-type?
        // filter_type used for $center $box etc
        let filter_type = element.getAttribute('filter-type');
        let value = element.getAttribute('filter-value');
        if (!value && element.value !== undefined)
            value = element.getValue();

        if (!checkValue(name) || !checkValue(value) || !checkValue(filter_type) || !checkValue(operator))
            filter.isFilter = false

        if (value.includes(",")) {
            value = value.split(',');
            for (let i = 0; i < value.length; i++)
                value[i] = value[i].trim()
        }

        // TODO: if filter value is an array check for each
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

        let index = this.getQuery(filter, name, operator, logicalOperator);
        if (compare) {
            if (index === null || filter.query[index].value !== value)
                this._initFilter(filter, element)
            // TODO: a way to include matching empty string logicalOperator !== 'and'
        } else if (index === null && value === '')
            return

        this.insertArray(filter.query, index, { name, value, operator, logicalOperator, type: filter_type, caseSensitive });
    },

    _applySearch: function (filter, element, compare) {
        let operator = element.getAttribute('filter-operator') || 'or'
        let caseSensitive = element.getAttribute('filter-case-sensitive') || false
        let value = element.getValue()
        if (!checkValue(value) || !checkValue(operator))
            filter.isFilter = false

        let index = this.getSearch(filter, value, operator, caseSensitive);
        if (compare) {
            if (index === null)
                this._initFilter(filter, element)
        } else
            this.insertArray(filter.search, index, { value, operator, caseSensitive });

    },

    _applySort: function (filter, element, direction, compare) {
        let name = element.getAttribute('filter-sort-name');

        if (!direction)
            direction = element.getAttribute('filter-sort-direction')

        if (!name || !direction || !checkValue(name) || !checkValue(direction))
            return

        let index = this.getSort(filter, name);
        if (compare) {
            if (index === null || filter.sort[index].direction !== direction) {
                filter.sort.splice(index, 1)
                this._initFilter(filter, element)
            }
        } else
            this.insertArray(filter.sort, index, { name, direction });
    },

    _initSortEvent: function (filter, element) {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
            const self = this;
            element.addEventListener('change', function (e) {
                e.preventDefault();
                self._applySort(filter, element, e.target.value);
                if (filter.element) {
                    filter.startIndex = 0;
                    filter.element.dispatchEvent(new CustomEvent("fetchData", { detail: { filter } }));
                }
            });
        }
    },

    initInputEvent: function (filter, el) {
        const self = this;
        let delayTimer;
        let contenteditable = el.getAttribute('contenteditable');
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || contenteditable != undefined && contenteditable != 'false') {
            el.addEventListener('input', function (e) {
                e.preventDefault();
                clearTimeout(delayTimer);
                delayTimer = setTimeout(function () {
                    let element = e.target;
                    if (element.hasAttribute('template_id') || element.form && element.form.hasAttribute('template_id'))
                        self._initFilter(filter, element, e);
                }, 500);

            });
        }
    },

    _initLoadMore: function (filter) {
        const self = this;

        filter.element.addEventListener('fetchedData', () => {
            const elements = document.querySelectorAll(`[${filter.attribute}="${filter.id}"][filter-on]`);
            for (let i = 0; i < elements.length; i++) {
                elements[i]['filter'] = filter
                let type = elements[i].getAttribute('filter-on')
                switch (type) {
                    case 'scroll':
                        self.intersectionObserver.observe(elements[i])
                        break;
                    case 'fetched':
                        elements[i].setValue(filter.startIndex)
                        break;
                    default:
                        if (type && type != 'loadmore')
                            elements[i].setValue(filter[type])
                }
            }
        });

    },

    initLoadMoreEvent: function (filter, element) {
        const self = this;
        element.addEventListener('click', function (e) {
            self.loadMore(filter);
        });
    },

    loadMore: function (filter) {
        if (!filter)
            return;

        filter.element.dispatchEvent(new CustomEvent("fetchData", { detail: { filter } }));
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
                elements[i].setAttribute('name', "_" + id + "-" + f_name + "_" + k);
            }

        }
    },

    getFilter: function (element) {
        let id = element.getAttribute('template_id')
        let filter = this.filters.get(id)
        if (filter)
            return filter
        for (let filter of this.filters.values()) {
            if (filter.element == element)
                return filter
        }
    },

    getQuery: function (filter, name, operator, logicalOperator) {
        for (let i = 0; i < filter.query.length; i++) {
            let f = filter.query[i];
            if (f.name == name && f.operator == operator && f.logicalOperator == logicalOperator) {
                return i;
            }
        }
        return null;
    },

    getSearch: function (filter, value, operator, caseSensitive) {
        for (let i = 0; i < filter.search.length; i++) {
            let f = filter.search[i];
            if (f.operator == operator && f.caseSensitive == caseSensitive) {
                return i;
            }
        }
        return null;
    },

    getSort: function (filter, name) {
        for (let i = 0; i < filter.sort.length; i++) {
            if (filter.sort[i].name == name) {
                return i;
            }
        }
        return null;
    },

    insertArray: function (filterArray, index, obj) {
        if (index !== null && index >= 0)
            filterArray.splice(index, 1, obj);
        else
            filterArray.push(obj);

        return filterArray;
    },

    __deleteDocumentsAction: function (btn) {
        const collection = btn.getAttribute('collection');
        if (checkValue(collection)) {
            const template_id = btn.getAttribute('template_id');
            if (!template_id) return;

            let _ids = []
            const selectedEls = document.querySelectorAll(`.selected[templateid="${template_id}"]`);
            for (let i = 0; i < selectedEls.length; i++) {
                const _id = selectedEls[i].getAttribute('document_id');
                if (checkValue(_id))
                    _ids.push({ _id })
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

    initMutationObserver: function () {
        const self = this
        this.mutatonObserver = true

        observer.init({
            name: 'CoCreateFilterInit',
            observe: ['addedNodes'],
            target: '[filter-name], [filter-sort-name]',
            callback: function (mutation) {
                // TODO: needs to check for fetch- attributes
                if (mutation.target.hasAttribute('fetch-collection'))
                    return;
                let filter = self.getFilter(mutation.target);
                if (filter)
                    self._initFilter(filter, mutation.target);
            }
        });

        observer.init({
            name: 'CoCreateFilterObserver',
            observe: ['attributes'],
            attributeName: ['filter-name', 'filter-operator', 'filter-value', 'filter-value-type', 'filter-sort-name', 'filter-sort-direction', 'filter-type'],
            callback: function (mutation) {
                let element = mutation.target
                let attribute = mutation.attributeName
                let filter = self.getFilter(mutation.target);
                if (filter) {
                    delete filter.isFilter
                    if (!filter.isFetched)
                        self._initFilter(filter, element);
                    else if (attribute.includes('search')) {
                        self._applySearch(filter, element, true)
                    } else if (attribute.includes('sort')) {
                        self._applySort(filter, element, '', true)
                    } else if (element.hasAttribute('filter-name')) {
                        let name = element.getAttribute('filter-name')
                        self._applyQuery(filter, element, name, '', true)
                    }
                }
            }
        });
    }
};

action.init({
    name: "deleteDocuments",
    endEvent: "deletedDocuments",
    callback: (data) => {
        CoCreateFilter.__deleteDocumentsAction(data.element);
    }
});

export default {
    ...CoCreateFilter,
    queryData,
    searchData,
    sortData
};
