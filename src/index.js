/********************************************************************************
 * Copyright (C) 2023 CoCreate and Contributors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 ********************************************************************************/

// Commercial Licensing Information:
// For commercial use of this software without the copyleft provisions of the AGPLv3,
// you must obtain a commercial license from CoCreate LLC.
// For details, visit <https://cocreate.app/licenses/> or contact us at sales@cocreate.app.

/*globals IntersectionObserver, CustomEvent*/
import observer from "@cocreate/observer";
import "@cocreate/element-prototype";
import {
	queryElements,
	checkValue,
	queryData,
	searchData,
	sortData,
	dotNotationToObject
} from "@cocreate/utils";

const elements = new Map();
const filters = new Map();
const dispatch = new Map();
const selector =
	"[filter-selector], [filter-closest], [filter-parent], [filter-next], [filter-previous], [filter-key], [filter-query-key], [filter-search], [filter-sort-key], [filter-on], [filter-limit], [filter-index]";

async function init(element) {
	if (!element) {
		element = document.querySelectorAll(selector);
		for (let i = 0; i < element.length; i++) {
			await initElement(element[i]);
		}
	} else {
		if (
			!(element instanceof HTMLCollection) &&
			!(element instanceof NodeList) &&
			!Array.isArray(element)
		) {
			element = [element];
		}
		for (let i = 0; i < element.length; i++) {
			if (element[i].matches(selector)) {
				await initElement(element[i]);
			}
		}
	}

	return true;
}

async function initElement(element) {
	let filteredElements = [];
	if (!elements.has(element)) {
		let newFilter = await getElementFilters(element);

		elements.set(element, newFilter);

		initElementEvents(element);

		filteredElements = queryElements({ element, prefix: "filter" });
		if (!filteredElements) filteredElements = [element];

		for (let j = 0; j < filteredElements.length; j++) {
			if (!filteredElements[j]) continue;

			if (!filters.has(filteredElements[j])) {
				initFilterOnEvent(filteredElements[j]);
				await getFilter(filteredElements[j]);
				filteredElements[j].getFilter = async () =>
					await getFilter(filteredElements[j]);
			}
		}
	}

	return filteredElements;
}

function initElementEvents(element) {
	if (element.hasAttribute("filter-sort-key")) initSortEvent(element);
	if (
		element.hasAttribute("filter-key") ||
		element.hasAttribute("filter-query-key") ||
		element.hasAttribute("filter-search")
	)
		initInputEvent(element);
}

async function getElementFilters(element) {
	let filter = {};
	if (element.hasAttribute("filter-sort-key")) applySort(filter, element);
	if (element.hasAttribute("filter-key")) await applyKey(filter, element);
	if (element.hasAttribute("filter-query-key"))
		await applyQuery(filter, element);
	if (element.hasAttribute("filter-search"))
		await applySearch(filter, element);

	elements.set(element, filter);
	return filter;
}

async function getFilter(element) {
	let filter = await getElementFilters(element);
	filter.index = 0;

	for (let key of elements.keys()) {
		let filteredElement = queryElements({ element: key, prefix: "filter" });
		if (!filteredElement) continue;
		for (let i = 0; i < filteredElement.length; i++) {
			if (filteredElement[i] === element) {
				let filterEl = elements.get(key) || {};
				filter.query = { ...filter.query, ...filterEl.query };
				if (filterEl.key)
					filter.key = { ...(filter.key || {}), ...filterEl.key };

				if (filterEl.sort) mergeSort(filter, filterEl);

				if (filterEl.search)
					filter.search = [
						...(filter.search || []),
						...filterEl.search
					];
			}
		}
	}

	if (!element.hasAttribute("filter-limit")) {
		filter.limit = 20;
	} else {
		let filterLimit = parseInt(element.getAttribute("filter-limit"));
		if (!isNaN(filterLimit)) {
			filter.limit = filterLimit;
		}
	}

	let filterIndex = parseInt(element.getAttribute("filter-index"));
	if (!isNaN(filterIndex)) {
		filter.index = filterIndex;
	}

	filter.overwrite = true;
	filters.set(element, filter);
	return filter;
}

async function updateFilter(element, loadMore) {
	let newFilter = await getElementFilters(element);

	let els = queryElements({ element, prefix: "filter" });
	if (els === false && filters.has(element)) els = [element];
	for (let i = 0; i < els.length; i++) {
		let filter = filters.get(els[i]);
		if (!filter) return (filter = { isFilter: false });
		if (newFilter) {
			filter.query = { ...filter.query, ...newFilter.query };
			if (newFilter.key)
				filter.key = {
					...(filter.key || {}),
					...newFilter.key
				};

			if (newFilter.sort) mergeSort(filter, newFilter);

			if (newFilter.search)
				filter.search = [...(filter.search || []), ...newFilter.search];
		}

		// filter = { ...filter, ...newFilter }
		if (loadMore) {
			if (!element.hasAttribute("filter-limit")) {
				filter.limit = 20;
			} else {
				let filterLimit = parseInt(
					element.getAttribute("filter-limit")
				);
				if (!isNaN(filterLimit)) {
					filter.limit = filterLimit;
				}
			}
			filter.loadMore = true;
			delete filter.overwrite;
		} else {
			filter.index = 0;
			let filterIndex = parseInt(element.getAttribute("filter-index"));
			if (!isNaN(filterIndex)) {
				filter.index = filterIndex;
			}
			filter.overwrite = true;
		}

		filters.set(els[i], filter);

		let delayTimer = dispatch.get(els[i]);
		clearTimeout(delayTimer);
		delayTimer = setTimeout(function () {
			dispatch.delete(els[i]);
			if (els[i].setFilter) els[i].setFilter(filter);
		}, 500);
		dispatch.set(els[i], delayTimer);
	}
}

function mergeSort(filter, newFilter) {
	if (newFilter.sort) {
		if (!filter.sort) filter.sort = [...newFilter.sort];
		else {
			for (let newSort of newFilter.sort) {
				const index = filter.sort.findIndex(
					(sort) => sort.key === newSort.key
				);
				if (index >= 0) {
					filter.sort[index] = newSort;
				} else {
					filter.sort.push(newSort);
				}
			}
		}
	}
}

async function applyQuery(filter, element) {
	let key = element.getAttribute("filter-query-key");
	let operator = element.getAttribute("filter-operator");
	let logicalOperator = element.getAttribute("filter-logical-operator");
	let filterValueType = element.getAttribute("filter-value-type") || "string";

	// TODO: rename to filter-query-type?
	// filter-type used for $center $box etc
	let type = element.getAttribute("filter-type");
	let value = element.getAttribute("filter-query-value");
	if (!value && element.value !== undefined)
		value = (await element.getValue()) || "";

	const keys = ["$organization_id", "$user_id", "$clientId", "$session_id"];
	if (!value && keys.includes(element.value))
		value = element.getAttribute("value");

	if (!key || !value) return (filter.isFilter = false);

	if (
		!checkValue(key) ||
		!checkValue(value) ||
		!checkValue(type) ||
		!checkValue(operator)
	)
		return (filter.isFilter = false);

	if (value.includes(",")) {
		value = value.split(",");
		for (let i = 0; i < value.length; i++) value[i] = value[i].trim();
	}

	if (Array.isArray(value)) {
		for (let i = 0; i < value.length; i++) {
			switch (filterValueType) {
				case "number":
					value[i] = Number(value[i]);
					break;
			}
		}
	} else {
		switch (filterValueType) {
			case "number":
				value = Number(value);
				break;
		}
	}

	let dotNotation = "";

	if (logicalOperator && !logicalOperator.endsWith("]")) {
		logicalOperator += "[]";
		if (!logicalOperator.startsWith("$"))
			logicalOperator = "$" + logicalOperator;
		dotNotation = logicalOperator + ".";
	}

	dotNotation += key;
	let regexKey = dotNotation;
	// if (operator) dotNotation += "." + operator;

	if (operator === "$in" && !Array.isArray(value)) value = [value];

	if (!filter.query) filter.query = {};

	// filter.query = dotNotationToObject({ [dotNotation]: value }, filter.query)
	if (operator) {
		filter.query[dotNotation] = { [operator]: value };
	} else {
		filter.query[dotNotation] = value;
	}
	if (operator === "$regex") {
		regexKey += "." + "$options";
		let options = element.getAttribute("filter-regex-flag");
		if (options)
			filter.query = dotNotationToObject(
				{ [regexKey]: options },
				filter.query
			);
	}
}

async function applyKey(filter, element) {
	let key = element.getAttribute("filter-key");

	let value = element.getAttribute("filter-value");
	if (!value && element.value !== undefined) value = await element.getValue();

	if (typeof value !== "number") {
		if (value === "true") value = 1;
		else if (value === "true") value = 0;
		else value = Number(value);
	}

	if (Number.isNaN(value)) value = 1;

	if (!checkValue(key) || !checkValue(value))
		return (filter.isFilter = false);

	if (!filter.key) filter.key = {};

	filter.key[key] = value;
}

async function applySearch(filter, element) {
	let operator = element.getAttribute("filter-operator") || "or";
	let caseSensitive = element.getAttribute("filter-case-sensitive") || false;
	let value = await element.getValue();
	if (
		!checkValue(value) ||
		!checkValue(operator) ||
		!checkValue(caseSensitive)
	)
		return (filter.isFilter = false);

	if (!filter.search) filter.search = [];
	filter.search.push({ value, operator, caseSensitive });
}

function applySort(filter, element) {
	let key = element.getAttribute("filter-sort-key");
	let direction = element.getAttribute("filter-sort-direction");

	if (!key || !direction) return;

	if (!checkValue(key) || !checkValue(direction))
		return (filter.isFilter = false);

	if (!filter.sort) filter.sort = [];

	const index = filter.sort.findIndex((sort) => sort.key === key);
	if (index >= 0) {
		filter.sort[index] = { key, direction };
	} else {
		filter.sort.push({ key, direction });
	}
}

function initSortEvent(element) {
	if (["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)) {
		element.addEventListener("change", function (e) {
			updateFilter(element);
		});
	}
}

function initInputEvent(element) {
	let contenteditable = element.getAttribute("contenteditable");
	if (
		["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName) ||
		(contenteditable != undefined && contenteditable != "false")
	) {
		element.addEventListener("input", function () {
			updateFilter(element);
		});
	}
}

function initFilterOnEvent(element) {
	element.addEventListener("fetchedData", () => {
		for (let el of elements.keys()) {
			let type = el.getAttribute("filter-on");
			switch (type) {
				case "click":
					el.addEventListener("click", () => updateFilter(el, true));
					break;
				case "scroll":
					intersectionObserver.observe(el);
					break;
				case "fetched":
					// TODO: get filter from response data
					const filter = filters.get(element);
					el.setValue(filter.count);
					break;
			}
		}
	});
}

const intersectionObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				updateFilter(entry.target, true);
				// intersectionObserver.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 1
	}
);

observer.init({
	name: "CoCreateFilterInit",
	observe: ["addedNodes"],
	selector,
	callback(mutation) {
		initElement(mutation.target);
	}
});

observer.init({
	name: "CoCreateFilterObserver",
	observe: ["attributes"],
	attributeName: [
		"filter-key",
		"filter-value",
		"filter-query-key",
		"filter-query-value",
		"value",
		"filter-operator",
		"filter-logical-operator",
		"filter-value-type",
		"filter-sort-key",
		"filter-sort-direction",
		"filter-search",
		"filter-case-sensitive",
		"filter-type",
		"filter-limit",
		"filter-index"
	],
	callback(mutation) {
		if (
			mutation.target.getAttribute(mutation.attributeName) !==
			mutation.oldValue
		)
			updateFilter(mutation.target);
	}
});

observer.init({
	name: "CoCreateFiltersRemovedNodes",
	observe: ["removedNodes"],
	selector,
	callback: function (mutation) {
		elements.delete(mutation.target);
	}
});

init();

export default {
	init,
	getFilter,
	elements,
	filters,
	queryData,
	searchData,
	sortData
};
