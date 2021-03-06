'use strict';

exports.__esModule = true;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Base class for all modules.
  Extends _defaults to _props
*/

var Module = function () {
  /*
    constructor method calls scaffolding methods.
  */

  function Module() {
    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Module);

    this._o = o;
    this._index = this._o.index || 0;
    this._declareDefaults();
    this._extendDefaults();
    this._vars();
    this._render();
  }
  /*
    Method to declare defaults.
    @private
  */


  Module.prototype._declareDefaults = function _declareDefaults() {
    this._defaults = {
      className: '',
      parent: document.body,
      isPrepend: false,
      isRipple: false,
      prefix: ''
    };
  };
  /*
    Method to add pointer down even listener to el.
    @param {Object}   HTMLElement to add event listener on.
    @param {Function} Event listener callback.
  */


  Module.prototype._addPointerDownEvent = function _addPointerDownEvent(el, fn) {
    if (window.navigator.msPointerEnabled) {
      el.addEventListener('MSPointerDown', fn);
    } else if (window.ontouchstart !== undefined) {
      el.addEventListener('touchstart', fn);
      el.addEventListener('mousedown', fn);
    } else {
      el.addEventListener('mousedown', fn);
    }
  };
  /*
    Method to add pointer up even listener to el.
    @param {Object}   HTMLElement to add event listener on.
    @param {Function} Event listener callback.
  */


  Module.prototype._addPointerUpEvent = function _addPointerUpEvent(el, fn) {
    if (window.navigator.msPointerEnabled) {
      el.addEventListener('MSPointerUp', fn);
    } else if (window.ontouchstart !== undefined) {
      el.addEventListener('touchend', fn);
      el.addEventListener('mouseup', fn);
    } else {
      el.addEventListener('mouseup', fn);
    }
  };
  /*
    Method to check if variable holds link to a function.
    @param {Function?} A variable to check.
    @returns {Boolean} If passed variable is a function.
  */


  Module.prototype._isFunction = function _isFunction(fn) {
    return typeof fn === 'function';
  };
  /*
    Method to a function or silently fail.
    @param {Function?} A variable to check.
    @param {Array like} Arguments.
  */


  Module.prototype._callIfFunction = function _callIfFunction(fn) {
    Array.prototype.shift.call(arguments);
    this._isFunction(fn) && fn.apply(this, arguments);
  };
  /*
    Method to declare module's variables.
    @private
  */


  Module.prototype._vars = function _vars() {};
  /*
    Method to render on initialization.
    @private
  */


  Module.prototype._render = function _render() {
    this._addMainElement();
  };
  /*
    Method to add `this.el` on the module.
    @private
    @param {String} Tag name of the element.
  */


  Module.prototype._addMainElement = function _addMainElement() {
    var tagName = arguments.length <= 0 || arguments[0] === undefined ? 'div' : arguments[0];

    var p = this._props;

    this.el = this._createElement(tagName);
    this._addMainClasses();

    var method = p.isPrepend ? 'prepend' : 'append';
    this['_' + method + 'Child'](p.parent, this.el);
  };
  /*
    Method to classes on `this.el`.
    @private
  */


  Module.prototype._addMainClasses = function _addMainClasses() {
    var p = this._props;
    if (p.className instanceof Array) {
      for (var i = 0; i < p.className.length; i++) {
        this._addClass(this.el, p.className[i]);
      }
    } else {
      this._addClass(this.el, p.className);
    }
  };
  /*
    Method to add a class on el.
    @private
    @param {Object} HTML element to add the class on.
    @param {String} Class name to add.
  */


  Module.prototype._addClass = function _addClass(el, className) {
    className && el.classList.add(className);
  };
  /*
    Method to set property on the module.
    @private
    @param {String, Object} Name of the property to set
                            or object with properties to set.
    @param {Any} Value for the property to set. Could be
                  undefined if the first param is object.
  */


  Module.prototype._setProp = function _setProp(attr, value) {
    if ((typeof attr === 'undefined' ? 'undefined' : (0, _typeof3.default)(attr)) === 'object') {
      for (var key in attr) {
        this._assignProp(key, attr[key]);
      }
    } else {
      this._assignProp(attr, value);
    }
  };
  /*
    Method to assign single property's value.
    @private
    @param {String} Property name.
    @param {Any}    Property value.
  */


  Module.prototype._assignProp = function _assignProp(key, value) {
    this._props[key] = value;
  };
  /*
    Method to copy `_o` options to `_props` object
    with fallback to `_defaults`.
    @private
  */


  Module.prototype._extendDefaults = function _extendDefaults() {
    this._props = {};
    // this._deltas = {};
    for (var key in this._defaults) {
      var value = this._o[key];
      this.isIt && console.log(key);
      // copy the properties to the _o object
      this._assignProp(key, value != null ? value : this._defaults[key]);
    }
  };
  /*
    Method to create HTMLElement from tag name.
    @private
    @param {String} Name of the tag to create `HTML` element.
    @returns {Object} HtmlElement.
  */


  Module.prototype._createElement = function _createElement(tagName) {
    return document.createElement(tagName);
  };
  /*
    Method to create HTMLElement and append it to the `el` with a className.
    @private
    @param {String} The tagname for the HTMLElement.
    @param {String} Optional class name to add to the new child.
    @returns {Object} The newely created HTMLElement.
  */


  Module.prototype._createChild = function _createChild(tagName, className) {
    var child = this._createElement('div');
    className && child.classList.add(className);
    this.el.appendChild(child);
    return child;
  };
  /*
    Method to prepend child to the el.
    @private
    @param {Object} Parent HTMLElement.
    @param {Object} Child HTMLElement.
  */


  Module.prototype._appendChild = function _appendChild(el, childEl) {
    el.appendChild(childEl);
  };
  /*
    Method to prepend child to the el.
    @private
    @param {Object} Parent HTMLElement.
    @param {Object} Child HTMLElement.
  */


  Module.prototype._prependChild = function _prependChild(el, childEl) {
    el.insertBefore(childEl, el.firstChild);
  };

  return Module;
}();

exports.default = Module;