/**
 * @switch-company/sticky-focus - Ensure focused element is not under a sticky element
 * @version v1.0.1
 * @link undefined
 * @license ISC
 **/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['sticky-focus'] = factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var StickyFocus = function () {
    function StickyFocus(options) {
      classCallCheck(this, StickyFocus);


      if (!options.elements) {
        throw new Error('No elements array passed.');
      }

      this._handleFocus = this._handleFocus.bind(this);

      this.update(options.elements);

      delete options.elements;

      this.options = Object.assign({
        padding: 0
      }, options);

      this._listen();
    }

    createClass(StickyFocus, [{
      key: '_listen',
      value: function _listen() {
        document.body.addEventListener('focus', this._handleFocus, true);
      }
    }, {
      key: '_handleFocus',
      value: function _handleFocus(event) {
        var parentElement = this._data.find(function (_ref) {
          var el = _ref.el;
          return el.contains(event.target);
        });

        // don't try to change the scroll if the focused element is in the sticky element
        if (parentElement) {
          return;
        }

        // get the screen position of the focused element
        var focusTop = event.target.getBoundingClientRect().top;
        // get the current scroll
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        // scroll when the focused element is under the sticky element
        if (focusTop < this._currentHeight) {
          var newScrollTop = Math.floor(scrollTop - (this._currentHeight - focusTop + this.options.padding));

          document.documentElement.scrollTop = document.body.scrollTop = newScrollTop;
        }
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.update(this.elements);
      }
    }, {
      key: 'restart',
      value: function restart(elements) {
        if (elements) {
          this.update(elements);
        } else {
          this.refresh();
        }

        this._listen();
      }
    }, {
      key: 'stop',
      value: function stop() {
        document.body.removeEventListener('focus', this._handleFocus, true);
      }
    }, {
      key: 'update',
      value: function update(elements) {
        this.elements = elements;

        this._data = elements.map(function (el) {
          return {
            el: el,
            height: el.getBoundingClientRect().bottom
          };
        });

        this._currentHeight = Math.ceil(Math.max.apply(null, this._data.map(function (el) {
          return el.height;
        })));
      }
    }, {
      key: 'currentHeight',
      get: function get$$1() {
        return this._currentHeight;
      }
    }]);
    return StickyFocus;
  }();

  return StickyFocus;

})));
