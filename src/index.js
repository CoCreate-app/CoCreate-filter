(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["./client"], function(CoCreateFilter) {
        	return factory(CoCreateFilter)
        });
    } else if (typeof module === 'object' && module.exports) {
      const CoCreateFilter = require("./filter.js")
      module.exports = factory(CoCreateFilter);
    } else {
        root.returnExports = factory(root["./client.js"]);
  }
}(typeof self !== 'undefined' ? self : this, function (CoCreateFilter) {
  return CoCreateFilter;
}));