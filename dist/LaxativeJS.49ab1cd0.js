// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var bind = function bind(obj, methods) {
    if (typeof methods === 'string') {
        obj[methods] = obj[methods].bind(obj);
        return;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = methods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var method = _step.value;

            obj[method] = obj[method].bind(obj);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

function camelCaseToDash(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

var toCamelCase = function toCamelCase(str) {
    str = str.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });

    return str[0].toLowerCase() + str.slice(1);
};

var isElement = function isElement(element) {
    return element instanceof HTMLElement;
};

exports.bind = bind;
exports.camelCaseToDash = camelCaseToDash;
exports.toCamelCase = toCamelCase;
exports.isElement = isElement;
},{}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Element = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tools = require('./tools');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                              Basic helper class that works on a single DOM Object at a time.
                                                                                                                                                              A new Element can be instantiated by passing a node type, or 
                                                                                                                                                              a pre-existing DOM Object.
                                                                                                                                                          
                                                                                                                                                              Example: Element('div') or Element(document.querySelector('body'))
                                                                                                                                                          */

var elements = [];

var Element = function Element(tag) {
    return new CreateElement(tag);
};

var rect = function rect(element) {
    return element.getBoundingClientRect();
};

var sizeStore = {};

var CreateElement = function () {
    function CreateElement(tag) {
        _classCallCheck(this, CreateElement);

        this._id = Symbol('Element');
        elements.push(this);

        if ((0, _tools.isElement)(tag)) {
            this.el = tag;
        } else {
            this.el = document.createElement(tag);
        }

        return this;
    }

    _createClass(CreateElement, [{
        key: 'append',
        value: function append(child) {
            if ((0, _tools.isElement)(child)) {
                this.el.appendChild(child);
            }

            try {
                this.el.appendChild(child.el);
            } catch (error) {
                console.error(error);
            }

            return this;
        }
    }, {
        key: 'appendTo',
        value: function appendTo(element) {
            if (!(0, _tools.isElement)(element)) {
                element = document.querySelector(element);
            }

            element.appendChild(this.el);

            return this;
        }
    }, {
        key: 'text',
        value: function text(_text) {
            this.el.appendChild(document.createTextNode(_text));
            return this;
        }
    }, {
        key: 'html',
        value: function html(_html) {
            this.el.innerHTML = _html;
            return this;
        }
    }, {
        key: 'data',
        value: function data(dataProp) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            if (typeof value !== 'undefined') {
                this.el.dataset[(0, _tools.toCamelCase)(dataProp)] = value;
            }

            if (this.el.dataset) {
                return this.el.dataset[(0, _tools.toCamelCase)(dataProp)];
            } else {
                return this.el.getAttribute('data-' + (0, _tools.camelCaseToDash)(dataProp));
            }
        }
    }, {
        key: 'addClass',
        value: function addClass(className) {
            this.el.classList.add(className);
            return this;
        }
    }, {
        key: 'removeClass',
        value: function removeClass(className) {
            this.el.classList.remove(className);
            return this;
        }
    }, {
        key: 'size',
        value: function size() {
            if (sizeStore[this._id]) {
                return sizeStore[this._id];
            }

            var size = rect(this.el);
            var sizeObj = { width: size.width, height: size.height };

            sizeStore[this._id] = sizeObj;

            return sizeObj;
        }
    }, {
        key: 'width',
        value: function width() {
            return this.size().width;
        }
    }, {
        key: 'height',
        value: function height() {
            return this.size().height;
        }
    }, {
        key: 'position',
        value: function position() {
            var pos = rect(this.el);
            return { x: pos.x, y: pos.y };
        }
    }, {
        key: 'css',
        value: function css(styles, value) {
            if (typeof styles === 'string') {
                this.el.style[styles] = value;
                return this;
            }

            for (var prop in styles) {
                this.el.style[prop] = styles[prop];
            }

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return this.el.cloneNode(true);
        }
    }]);

    return CreateElement;
}();

exports.Element = Element;
},{"./tools":11}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Element = require('./Element');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var selectParticles = function selectParticles(selector) {
    return document.querySelectorAll(selector);
};

var setAbsolutePosition = function setAbsolutePosition(particle, scrollY) {
    particle.el.css({
        width: particle.el.width() + 'px',
        height: particle.el.height() + 'px',
        top: particle.yPos + scrollY + 'px',
        left: particle.xPos + 'px'
    });
};

var ParticleMap = function () {
    function ParticleMap(selector, scrollY) {
        _classCallCheck(this, ParticleMap);

        this._scrollY = scrollY || 0;
        this._particle_map = [];
        this._particles = selectParticles(selector);
        this.setup();
    }

    _createClass(ParticleMap, [{
        key: 'setup',
        value: function setup() {
            var _this = this;

            this._particles.forEach(function (particle) {
                var el = (0, _Element.Element)(particle);
                var original = el.clone();
                var particleObj = {
                    el: el,
                    xPos: el.position().x,
                    yPos: el.position().y,
                    speed: Number(el.data('laxative-speed')),
                    original: original
                };

                el.addClass('laxative');
                setAbsolutePosition(particleObj, _this._scrollY);
                _this._particle_map.push(particleObj);
            });

            // We do this last to ensure that elements with margin
            // get spaced correctly.
            this._particle_map.forEach(function (particle) {
                particle.el.css({
                    margin: 0
                });
            });
        }
    }, {
        key: 'decompose',
        value: function decompose() {
            // Remove particle data and reset to original
        }
    }, {
        key: 'move',
        value: function move() {
            var scrollAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            this._particle_map.forEach(function (particle) {
                var move = -(scrollAmount * particle.speed);
                particle.el.css({
                    transform: 'translateY(' + move + 'px)'
                });
            });
        }
    }]);

    return ParticleMap;
}();

exports.default = ParticleMap;
},{"./Element":7}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ParticleMap = require('./ParticleMap');

var _ParticleMap2 = _interopRequireDefault(_ParticleMap);

var _tools = require('./tools');

var _Element = require('./Element');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var laxative_count = 0;

var defaultConfig = {
    scrollTarget: window,
    defaultSpeed: 1
};

var configureLaxative = function configureLaxative(config) {
    var _config = Object.assign({}, defaultConfig, config);
    var lax_config = {};

    for (var prop in _config) {
        lax_config[prop] = _config[prop];
    }

    return lax_config;
};

var createCSS = function createCSS() {
    var css = '\n        .laxative {\n            position: fixed;\n            transition: transform 2s cubic-bezier(0.11, 0.87, 0.13, 0.97);\n        }\n    ';

    (0, _Element.Element)('style').text(css).appendTo(document.head);
};

var Laxative = function () {
    function Laxative(selector) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Laxative);

        this._id = 'laxative_' + ++laxative_count;
        this._config = configureLaxative(config);
        this._particles = new _ParticleMap2.default(selector, this._config.scrollTarget.scrollY);
        this._scrollY = 0;

        createCSS();
        (0, _tools.bind)(this, ['onScroll']);
    }

    _createClass(Laxative, [{
        key: 'start',
        value: function start() {
            this._config.scrollTarget.addEventListener('scroll', this.onScroll);
        }
    }, {
        key: 'dump',
        value: function dump() {}
    }, {
        key: 'onScroll',
        value: function onScroll(event) {
            this._scrollY = this._config.scrollTarget.scrollY;
            this._particles.move(this._scrollY);
        }
    }]);

    return Laxative;
}();

exports.default = Laxative;
},{"./ParticleMap":10,"./tools":11,"./Element":7}],4:[function(require,module,exports) {
'use strict';

var _Laxative = require('./src/Laxative');

var _Laxative2 = _interopRequireDefault(_Laxative);

var _Element = require('./src/Element');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var random = function random(min, max) {
    return Math.floor(Math.random() * max) + min;
};

var container = (0, _Element.Element)(document.querySelector('.container'));
var body = (0, _Element.Element)(document.querySelector('body'));

for (var i = 0; i < 200; i++) {
    var div = (0, _Element.Element)('div').addClass('dot');
    div.addClass('lax');
    var size = random(5, 100);

    div.css({
        width: size + 'px',
        height: size + 'px',
        opacity: random(1, 100) / 100,
        top: random(-window.scrollY, body.height()) + 'px',
        left: random(1, body.width()) + 'px'
    });

    div.data('laxative-speed', random(1, 100) / 100);

    container.append(div);
}

var lax = new _Laxative2.default('.lax');
lax.start();
},{"./src/Laxative":6,"./src/Element":7}],14:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '54916' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[14,4], null)
//# sourceMappingURL=/LaxativeJS.49ab1cd0.map