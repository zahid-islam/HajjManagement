(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(require("angular"));
    else if (typeof define === 'function' && define.amd)
        define(["angular"], factory);
    else if (typeof exports === 'object')
        exports["angularIoBarcode"] = factory(require("angular"));
    else
        root["angularIoBarcode"] = factory(root["angular"]);
})(this, function (__WEBPACK_EXTERNAL_MODULE_54__) {
    return /******/ (function (modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {};
        /******/
        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/ 		if (installedModules[moduleId]) {
                /******/ 			return installedModules[moduleId].exports;
                /******/
            }
            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			i: moduleId,
                /******/ 			l: false,
                /******/ 			exports: {}
                /******/
            };
            /******/
            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Flag the module as loaded
            /******/ 		module.l = true;
            /******/
            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules;
        /******/
        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules;
        /******/
        /******/ 	// define getter function for harmony exports
        /******/ 	__webpack_require__.d = function (exports, name, getter) {
            /******/ 		if (!__webpack_require__.o(exports, name)) {
                /******/ 			Object.defineProperty(exports, name, {
                    /******/ 				configurable: false,
                    /******/ 				enumerable: true,
                    /******/ 				get: getter
                    /******/
                });
                /******/
            }
            /******/
        };
        /******/
        /******/ 	// getDefaultExport function for compatibility with non-harmony modules
        /******/ 	__webpack_require__.n = function (module) {
            /******/ 		var getter = module && module.__esModule ?
            /******/ 			function getDefault() { return module['default']; } :
            /******/ 			function getModuleExports() { return module; };
            /******/ 		__webpack_require__.d(getter, 'a', getter);
            /******/ 		return getter;
            /******/
        };
        /******/
        /******/ 	// Object.prototype.hasOwnProperty.call
        /******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        /******/
        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = "";
        /******/
        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(__webpack_require__.s = 53);
        /******/
    })
    /************************************************************************/
    /******/([
    /* 0 */
    /***/ (function (module, exports) {

        var core = module.exports = { version: '2.4.0' };
        if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

        /***/
    }),
    /* 1 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        exports.__esModule = true;

        exports.default = function (instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        };

        /***/
    }),
    /* 2 */
    /***/ (function (module, exports, __webpack_require__) {

        var global = __webpack_require__(3)
          , core = __webpack_require__(0)
          , ctx = __webpack_require__(37)
          , hide = __webpack_require__(9)
          , PROTOTYPE = 'prototype';

        var $export = function (type, name, source) {
            var IS_FORCED = type & $export.F
              , IS_GLOBAL = type & $export.G
              , IS_STATIC = type & $export.S
              , IS_PROTO = type & $export.P
              , IS_BIND = type & $export.B
              , IS_WRAP = type & $export.W
              , exports = IS_GLOBAL ? core : core[name] || (core[name] = {})
              , expProto = exports[PROTOTYPE]
              , target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
              , key, own, out;
            if (IS_GLOBAL) source = name;
            for (key in source) {
                // contains in native
                own = !IS_FORCED && target && target[key] !== undefined;
                if (own && key in exports) continue;
                // export native or passed
                out = own ? target[key] : source[key];
                // prevent global pollution for namespaces
                exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
                // bind timers to global for call from export context
                : IS_BIND && own ? ctx(out, global)
                // wrap global constructors for prevent change them in library
                : IS_WRAP && target[key] == out ? (function (C) {
                    var F = function (a, b, c) {
                        if (this instanceof C) {
                            switch (arguments.length) {
                                case 0: return new C;
                                case 1: return new C(a);
                                case 2: return new C(a, b);
                            } return new C(a, b, c);
                        } return C.apply(this, arguments);
                    };
                    F[PROTOTYPE] = C[PROTOTYPE];
                    return F;
                    // make static versions for prototype methods
                })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
                // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
                if (IS_PROTO) {
                    (exports.virtual || (exports.virtual = {}))[key] = out;
                    // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
                    if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
                }
            }
        };
        // type bitmap
        $export.F = 1;   // forced
        $export.G = 2;   // global
        $export.S = 4;   // static
        $export.P = 8;   // proto
        $export.B = 16;  // bind
        $export.W = 32;  // wrap
        $export.U = 64;  // safe
        $export.R = 128; // real proto method for `library` 
        module.exports = $export;

        /***/
    }),
    /* 3 */
    /***/ (function (module, exports) {

        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var global = module.exports = typeof window != 'undefined' && window.Math == Math
          ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
        if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

        /***/
    }),
    /* 4 */
    /***/ (function (module, exports, __webpack_require__) {

        // to indexed object, toObject with fallback for non-array-like ES3 strings
        var IObject = __webpack_require__(41)
          , defined = __webpack_require__(17);
        module.exports = function (it) {
            return IObject(defined(it));
        };

        /***/
    }),
    /* 5 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        exports.__esModule = true;

        var _defineProperty = __webpack_require__(44);

        var _defineProperty2 = _interopRequireDefault(_defineProperty);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    (0, _defineProperty2.default)(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        /***/
    }),
    /* 6 */
    /***/ (function (module, exports, __webpack_require__) {

        var anObject = __webpack_require__(12)
          , IE8_DOM_DEFINE = __webpack_require__(38)
          , toPrimitive = __webpack_require__(23)
          , dP = Object.defineProperty;

        exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPrimitive(P, true);
            anObject(Attributes);
            if (IE8_DOM_DEFINE) try {
                return dP(O, P, Attributes);
            } catch (e) { /* empty */ }
            if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
            if ('value' in Attributes) O[P] = Attributes.value;
            return O;
        };

        /***/
    }),
    /* 7 */
    /***/ (function (module, exports, __webpack_require__) {

        // Thank's IE8 for his funny defineProperty
        module.exports = !__webpack_require__(10)(function () {
            return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
        });

        /***/
    }),
    /* 8 */
    /***/ (function (module, exports) {

        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function (it, key) {
            return hasOwnProperty.call(it, key);
        };

        /***/
    }),
    /* 9 */
    /***/ (function (module, exports, __webpack_require__) {

        var dP = __webpack_require__(6)
          , createDesc = __webpack_require__(16);
        module.exports = __webpack_require__(7) ? function (object, key, value) {
            return dP.f(object, key, createDesc(1, value));
        } : function (object, key, value) {
            object[key] = value;
            return object;
        };

        /***/
    }),
    /* 10 */
    /***/ (function (module, exports) {

        module.exports = function (exec) {
            try {
                return !!exec();
            } catch (e) {
                return true;
            }
        };

        /***/
    }),
    /* 11 */
    /***/ (function (module, exports, __webpack_require__) {

        var store = __webpack_require__(25)('wks')
          , uid = __webpack_require__(19)
          , Symbol = __webpack_require__(3).Symbol
          , USE_SYMBOL = typeof Symbol == 'function';

        var $exports = module.exports = function (name) {
            return store[name] || (store[name] =
              USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
        };

        $exports.store = store;

        /***/
    }),
    /* 12 */
    /***/ (function (module, exports, __webpack_require__) {

        var isObject = __webpack_require__(13);
        module.exports = function (it) {
            if (!isObject(it)) throw TypeError(it + ' is not an object!');
            return it;
        };

        /***/
    }),
    /* 13 */
    /***/ (function (module, exports) {

        module.exports = function (it) {
            return typeof it === 'object' ? it !== null : typeof it === 'function';
        };

        /***/
    }),
    /* 14 */
    /***/ (function (module, exports, __webpack_require__) {

        // 19.1.2.14 / 15.2.3.14 Object.keys(O)
        var $keys = __webpack_require__(40)
          , enumBugKeys = __webpack_require__(26);

        module.exports = Object.keys || function keys(O) {
            return $keys(O, enumBugKeys);
        };

        /***/
    }),
    /* 15 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = { "default": __webpack_require__(68), __esModule: true };

        /***/
    }),
    /* 16 */
    /***/ (function (module, exports) {

        module.exports = function (bitmap, value) {
            return {
                enumerable: !(bitmap & 1),
                configurable: !(bitmap & 2),
                writable: !(bitmap & 4),
                value: value
            };
        };

        /***/
    }),
    /* 17 */
    /***/ (function (module, exports) {

        // 7.2.1 RequireObjectCoercible(argument)
        module.exports = function (it) {
            if (it == undefined) throw TypeError("Can't call method on  " + it);
            return it;
        };

        /***/
    }),
    /* 18 */
    /***/ (function (module, exports) {

        // 7.1.4 ToInteger
        var ceil = Math.ceil
          , floor = Math.floor;
        module.exports = function (it) {
            return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        };

        /***/
    }),
    /* 19 */
    /***/ (function (module, exports) {

        var id = 0
          , px = Math.random();
        module.exports = function (key) {
            return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
        };

        /***/
    }),
    /* 20 */
    /***/ (function (module, exports) {

        exports.f = {}.propertyIsEnumerable;

        /***/
    }),
    /* 21 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        exports.__esModule = true;

        var _typeof2 = __webpack_require__(47);

        var _typeof3 = _interopRequireDefault(_typeof2);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = function (self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }

            return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
        };

        /***/
    }),
    /* 22 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        exports.__esModule = true;

        var _setPrototypeOf = __webpack_require__(92);

        var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

        var _create = __webpack_require__(96);

        var _create2 = _interopRequireDefault(_create);

        var _typeof2 = __webpack_require__(47);

        var _typeof3 = _interopRequireDefault(_typeof2);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = function (subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
            }

            subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
        };

        /***/
    }),
    /* 23 */
    /***/ (function (module, exports, __webpack_require__) {

        // 7.1.1 ToPrimitive(input [, PreferredType])
        var isObject = __webpack_require__(13);
        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
        // and the second argument - flag - preferred type is a string
        module.exports = function (it, S) {
            if (!isObject(it)) return it;
            var fn, val;
            if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
            if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
            if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
            throw TypeError("Can't convert object to primitive value");
        };

        /***/
    }),
    /* 24 */
    /***/ (function (module, exports, __webpack_require__) {

        var shared = __webpack_require__(25)('keys')
          , uid = __webpack_require__(19);
        module.exports = function (key) {
            return shared[key] || (shared[key] = uid(key));
        };

        /***/
    }),
    /* 25 */
    /***/ (function (module, exports, __webpack_require__) {

        var global = __webpack_require__(3)
          , SHARED = '__core-js_shared__'
          , store = global[SHARED] || (global[SHARED] = {});
        module.exports = function (key) {
            return store[key] || (store[key] = {});
        };

        /***/
    }),
    /* 26 */
    /***/ (function (module, exports) {

        // IE 8- don't enum bug keys
        module.exports = (
          'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
        ).split(',');

        /***/
    }),
    /* 27 */
    /***/ (function (module, exports) {

        exports.f = Object.getOwnPropertySymbols;

        /***/
    }),
    /* 28 */
    /***/ (function (module, exports, __webpack_require__) {

        // 7.1.13 ToObject(argument)
        var defined = __webpack_require__(17);
        module.exports = function (it) {
            return Object(defined(it));
        };

        /***/
    }),
    /* 29 */
    /***/ (function (module, exports) {

        module.exports = true;

        /***/
    }),
    /* 30 */
    /***/ (function (module, exports) {

        module.exports = {};

        /***/
    }),
    /* 31 */
    /***/ (function (module, exports, __webpack_require__) {

        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        var anObject = __webpack_require__(12)
          , dPs = __webpack_require__(75)
          , enumBugKeys = __webpack_require__(26)
          , IE_PROTO = __webpack_require__(24)('IE_PROTO')
          , Empty = function () { /* empty */ }
          , PROTOTYPE = 'prototype';

        // Create object with fake `null` prototype: use iframe Object with cleared prototype
        var createDict = function () {
            // Thrash, waste and sodomy: IE GC bug
            var iframe = __webpack_require__(39)('iframe')
              , i = enumBugKeys.length
              , lt = '<'
              , gt = '>'
              , iframeDocument;
            iframe.style.display = 'none';
            __webpack_require__(76).appendChild(iframe);
            iframe.src = 'javascript:'; // eslint-disable-line no-script-url
            // createDict = iframe.contentWindow.Object;
            // html.removeChild(iframe);
            iframeDocument = iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
            iframeDocument.close();
            createDict = iframeDocument.F;
            while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
            return createDict();
        };

        module.exports = Object.create || function create(O, Properties) {
            var result;
            if (O !== null) {
                Empty[PROTOTYPE] = anObject(O);
                result = new Empty;
                Empty[PROTOTYPE] = null;
                // add "__proto__" for Object.getPrototypeOf polyfill
                result[IE_PROTO] = O;
            } else result = createDict();
            return Properties === undefined ? result : dPs(result, Properties);
        };


        /***/
    }),
    /* 32 */
    /***/ (function (module, exports, __webpack_require__) {

        var def = __webpack_require__(6).f
          , has = __webpack_require__(8)
          , TAG = __webpack_require__(11)('toStringTag');

        module.exports = function (it, tag, stat) {
            if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
        };

        /***/
    }),
    /* 33 */
    /***/ (function (module, exports, __webpack_require__) {

        exports.f = __webpack_require__(11);

        /***/
    }),
    /* 34 */
    /***/ (function (module, exports, __webpack_require__) {

        var global = __webpack_require__(3)
          , core = __webpack_require__(0)
          , LIBRARY = __webpack_require__(29)
          , wksExt = __webpack_require__(33)
          , defineProperty = __webpack_require__(6).f;
        module.exports = function (name) {
            var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
            if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
        };

        /***/
    }),
    /* 35 */
    /***/ (function (module, exports, __webpack_require__) {

        var pIE = __webpack_require__(20)
          , createDesc = __webpack_require__(16)
          , toIObject = __webpack_require__(4)
          , toPrimitive = __webpack_require__(23)
          , has = __webpack_require__(8)
          , IE8_DOM_DEFINE = __webpack_require__(38)
          , gOPD = Object.getOwnPropertyDescriptor;

        exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
            O = toIObject(O);
            P = toPrimitive(P, true);
            if (IE8_DOM_DEFINE) try {
                return gOPD(O, P);
            } catch (e) { /* empty */ }
            if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
        };

        /***/
    }),
    /* 36 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        exports.__esModule = true;

        var _getPrototypeOf = __webpack_require__(15);

        var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

        var _getOwnPropertyDescriptor = __webpack_require__(100);

        var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = function get(object, property, receiver) {
            if (object === null) object = Function.prototype;
            var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

            if (desc === undefined) {
                var parent = (0, _getPrototypeOf2.default)(object);

                if (parent === null) {
                    return undefined;
                } else {
                    return get(parent, property, receiver);
                }
            } else if ("value" in desc) {
                return desc.value;
            } else {
                var getter = desc.get;

                if (getter === undefined) {
                    return undefined;
                }

                return getter.call(receiver);
            }
        };

        /***/
    }),
    /* 37 */
    /***/ (function (module, exports, __webpack_require__) {

        // optional / simple context binding
        var aFunction = __webpack_require__(59);
        module.exports = function (fn, that, length) {
            aFunction(fn);
            if (that === undefined) return fn;
            switch (length) {
                case 1: return function (a) {
                    return fn.call(that, a);
                };
                case 2: return function (a, b) {
                    return fn.call(that, a, b);
                };
                case 3: return function (a, b, c) {
                    return fn.call(that, a, b, c);
                };
            }
            return function (/* ...args */) {
                return fn.apply(that, arguments);
            };
        };

        /***/
    }),
    /* 38 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = !__webpack_require__(7) && !__webpack_require__(10)(function () {
            return Object.defineProperty(__webpack_require__(39)('div'), 'a', { get: function () { return 7; } }).a != 7;
        });

        /***/
    }),
    /* 39 */
    /***/ (function (module, exports, __webpack_require__) {

        var isObject = __webpack_require__(13)
          , document = __webpack_require__(3).document
          // in old IE typeof document.createElement is 'object'
          , is = isObject(document) && isObject(document.createElement);
        module.exports = function (it) {
            return is ? document.createElement(it) : {};
        };

        /***/
    }),
    /* 40 */
    /***/ (function (module, exports, __webpack_require__) {

        var has = __webpack_require__(8)
          , toIObject = __webpack_require__(4)
          , arrayIndexOf = __webpack_require__(61)(false)
          , IE_PROTO = __webpack_require__(24)('IE_PROTO');

        module.exports = function (object, names) {
            var O = toIObject(object)
              , i = 0
              , result = []
              , key;
            for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
            // Don't enum bug & hidden keys
            while (names.length > i) if (has(O, key = names[i++])) {
                ~arrayIndexOf(result, key) || result.push(key);
            }
            return result;
        };

        /***/
    }),
    /* 41 */
    /***/ (function (module, exports, __webpack_require__) {

        // fallback for non-array-like ES3 and non-enumerable old V8 strings
        var cof = __webpack_require__(42);
        module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
            return cof(it) == 'String' ? it.split('') : Object(it);
        };

        /***/
    }),
    /* 42 */
    /***/ (function (module, exports) {

        var toString = {}.toString;

        module.exports = function (it) {
            return toString.call(it).slice(8, -1);
        };

        /***/
    }),
    /* 43 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _classCallCheck2 = __webpack_require__(1);

        var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

        var _createClass2 = __webpack_require__(5);

        var _createClass3 = _interopRequireDefault(_createClass2);

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        // The L (left) type of encoding
        var Lbinary = {
            0: '0001101',
            1: '0011001',
            2: '0010011',
            3: '0111101',
            4: '0100011',
            5: '0110001',
            6: '0101111',
            7: '0111011',
            8: '0110111',
            9: '0001011'
        };

        // The G type of encoding
        var Gbinary = {
            0: '0100111',
            1: '0110011',
            2: '0011011',
            3: '0100001',
            4: '0011101',
            5: '0111001',
            6: '0000101',
            7: '0010001',
            8: '0001001',
            9: '0010111'
        };

        // The R (right) type of encoding
        var Rbinary = {
            0: '1110010',
            1: '1100110',
            2: '1101100',
            3: '1000010',
            4: '1011100',
            5: '1001110',
            6: '1010000',
            7: '1000100',
            8: '1001000',
            9: '1110100'
        };

        // The left side structure in EAN-13
        var EANstruct = {
            0: 'LLLLLL',
            1: 'LLGLGG',
            2: 'LLGGLG',
            3: 'LLGGGL',
            4: 'LGLLGG',
            5: 'LGGLLG',
            6: 'LGGGLL',
            7: 'LGLGLG',
            8: 'LGLGGL',
            9: 'LGGLGL'
        };

        // Valid EAN code
        var validRe = /^[0-9]{13}$/;
        // The start bits
        var startBin = '101';
        // The end bits
        var endBin = '101';
        // The middle bits
        var middleBin = '01010';

        var EAN = function () {
            function EAN(code) {
                (0, _classCallCheck3.default)(this, EAN);

                this.code = String(code);
            }

            (0, _createClass3.default)(EAN, [{
                key: 'isValid',
                value: function isValid() {
                    return validRe.test(this.code) && Number(this.code[12]) === this.checksum();
                }
            }, {
                key: 'checksum',
                value: function checksum() {
                    var result = 0;

                    for (var i = 0; i < 12; i += 2) {
                        result += Number(this.code[i]);
                    }
                    for (var i = 1; i < 12; i += 2) {
                        result += Number(this.code[i]) * 3;
                    }

                    return (10 - result % 10) % 10;
                }

                // Create the binary representation of the EAN code
                // number needs to be a string

            }, {
                key: 'encode',
                value: function encode() {
                    // Create the return variable
                    var result = '';

                    // Get the first digit (for later determination of the encoding type)
                    var firstDigit = this.code[0];

                    // Get the number to be encoded on the left side of the EAN code
                    var leftSide = this.code.substr(1, 7);

                    // Get the number to be encoded on the right side of the EAN code
                    var rightSide = this.code.substr(7, 6);

                    // Add the start bits
                    result += startBin;

                    // Add the left side
                    result += this.encodeStruct(leftSide, EANstruct[firstDigit]);

                    // Add the middle bits
                    result += middleBin;

                    // Add the right side
                    result += this.encodeStruct(rightSide, 'RRRRRR');

                    // Add the end bits
                    result += endBin;

                    return result;
                }

                // Convert a number array to the representing

            }, {
                key: 'encodeStruct',
                value: function encodeStruct(codePart, struct) {
                    // Create the variable that should be returned at the end of the function
                    var result = '';

                    // Loop all the numbers
                    for (var i = 0; i < codePart.length; i++) {
                        // Using the L, G or R encoding and add it to the returning variable
                        if (struct[i] === 'L') {
                            result += Lbinary[codePart[i]];
                        } else if (struct[i] === 'G') {
                            result += Gbinary[codePart[i]];
                        } else if (struct[i] === 'R') {
                            result += Rbinary[codePart[i]];
                        }
                    }
                    return result;
                }
            }]);
            return EAN;
        }();

        exports.default = EAN;

        /***/
    }),
    /* 44 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = { "default": __webpack_require__(65), __esModule: true };

        /***/
    }),
    /* 45 */
    /***/ (function (module, exports, __webpack_require__) {

        // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
        var has = __webpack_require__(8)
          , toObject = __webpack_require__(28)
          , IE_PROTO = __webpack_require__(24)('IE_PROTO')
          , ObjectProto = Object.prototype;

        module.exports = Object.getPrototypeOf || function (O) {
            O = toObject(O);
            if (has(O, IE_PROTO)) return O[IE_PROTO];
            if (typeof O.constructor == 'function' && O instanceof O.constructor) {
                return O.constructor.prototype;
            } return O instanceof Object ? ObjectProto : null;
        };

        /***/
    }),
    /* 46 */
    /***/ (function (module, exports, __webpack_require__) {

        // most Object methods by ES6 should accept primitives
        var $export = __webpack_require__(2)
          , core = __webpack_require__(0)
          , fails = __webpack_require__(10);
        module.exports = function (KEY, exec) {
            var fn = (core.Object || {})[KEY] || Object[KEY]
              , exp = {};
            exp[KEY] = exec(fn);
            $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
        };

        /***/
    }),
    /* 47 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        exports.__esModule = true;

        var _iterator = __webpack_require__(70);

        var _iterator2 = _interopRequireDefault(_iterator);

        var _symbol = __webpack_require__(81);

        var _symbol2 = _interopRequireDefault(_symbol);

        var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
            return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
            return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        /***/
    }),
    /* 48 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";

        var LIBRARY = __webpack_require__(29)
          , $export = __webpack_require__(2)
          , redefine = __webpack_require__(49)
          , hide = __webpack_require__(9)
          , has = __webpack_require__(8)
          , Iterators = __webpack_require__(30)
          , $iterCreate = __webpack_require__(74)
          , setToStringTag = __webpack_require__(32)
          , getPrototypeOf = __webpack_require__(45)
          , ITERATOR = __webpack_require__(11)('iterator')
          , BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
          , FF_ITERATOR = '@@iterator'
          , KEYS = 'keys'
          , VALUES = 'values';

        var returnThis = function () { return this; };

        module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
            $iterCreate(Constructor, NAME, next);
            var getMethod = function (kind) {
                if (!BUGGY && kind in proto) return proto[kind];
                switch (kind) {
                    case KEYS: return function keys() { return new Constructor(this, kind); };
                    case VALUES: return function values() { return new Constructor(this, kind); };
                } return function entries() { return new Constructor(this, kind); };
            };
            var TAG = NAME + ' Iterator'
              , DEF_VALUES = DEFAULT == VALUES
              , VALUES_BUG = false
              , proto = Base.prototype
              , $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
              , $default = $native || getMethod(DEFAULT)
              , $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
              , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
              , methods, key, IteratorPrototype;
            // Fix native
            if ($anyNative) {
                IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
                if (IteratorPrototype !== Object.prototype) {
                    // Set @@toStringTag to native iterators
                    setToStringTag(IteratorPrototype, TAG, true);
                    // fix for some old engines
                    if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
                }
            }
            // fix Array#{values, @@iterator}.name in V8 / FF
            if (DEF_VALUES && $native && $native.name !== VALUES) {
                VALUES_BUG = true;
                $default = function values() { return $native.call(this); };
            }
            // Define iterator
            if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
                hide(proto, ITERATOR, $default);
            }
            // Plug for library
            Iterators[NAME] = $default;
            Iterators[TAG] = returnThis;
            if (DEFAULT) {
                methods = {
                    values: DEF_VALUES ? $default : getMethod(VALUES),
                    keys: IS_SET ? $default : getMethod(KEYS),
                    entries: $entries
                };
                if (FORCED) for (key in methods) {
                    if (!(key in proto)) redefine(proto, key, methods[key]);
                } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
            }
            return methods;
        };

        /***/
    }),
    /* 49 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__(9);

        /***/
    }),
    /* 50 */
    /***/ (function (module, exports, __webpack_require__) {

        // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
        var $keys = __webpack_require__(40)
          , hiddenKeys = __webpack_require__(26).concat('length', 'prototype');

        exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
            return $keys(O, hiddenKeys);
        };

        /***/
    }),
    /* 51 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _classCallCheck2 = __webpack_require__(1);

        var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

        var _createClass2 = __webpack_require__(5);

        var _createClass3 = _interopRequireDefault(_createClass2);

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        //The structure for the all digits, 1 is wide and 0 is narrow
        var digitStructure = {
            0: '00110',
            1: '10001',
            2: '01001',
            3: '11000',
            4: '00101',
            5: '10100',
            6: '01100',
            7: '00011',
            8: '10010',
            9: '01010'
        };

        // The start bits
        var startBin = '1010';
        // The end bits
        var endBin = '11101';

        // Regexp for a valid Inter25 code
        var validRe = /^([0-9][0-9])+$/;

        var ITF = function () {
            function ITF(code) {
                (0, _classCallCheck3.default)(this, ITF);

                this.code = String(code);
            }

            (0, _createClass3.default)(ITF, [{
                key: 'isValid',
                value: function isValid() {
                    return validRe.test(this.code);
                }
            }, {
                key: 'encode',
                value: function encode() {
                    // Create the variable that should be returned at the end of the function
                    var result = '';

                    // Always add the same start bits
                    result += startBin;

                    // Calculate all the digit pairs
                    for (var i = 0; i < this.code.length; i += 2) {
                        result += this.calculatePair(this.code.substr(i, 2));
                    }

                    // Always add the same end bits
                    result += endBin;

                    return result;
                }
            }, {
                key: 'calculatePair',
                value: function calculatePair(twoNumbers) {
                    var result = '';

                    var number1Struct = digitStructure[twoNumbers[0]];
                    var number2Struct = digitStructure[twoNumbers[1]];

                    // Take every second bit and add to the result
                    for (var i = 0; i < 5; i++) {
                        result += number1Struct[i] === '1' ? '111' : '1';
                        result += number2Struct[i] === '1' ? '000' : '0';
                    }

                    return result;
                }
            }]);
            return ITF;
        }();

        exports.default = ITF;

        /***/
    }),
    /* 52 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _classCallCheck2 = __webpack_require__(1);

        var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

        var _createClass2 = __webpack_require__(5);

        var _createClass3 = _interopRequireDefault(_createClass2);

        var _defineProperty2 = __webpack_require__(105);

        var _defineProperty3 = _interopRequireDefault(_defineProperty2);

        var _code128b;

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        // Data for each character
        // The last characters will not be encoded but are used for error correction
        var code128b = (_code128b = {
            ' ': ['11011001100', 0],
            '!': ['11001101100', 1],
            '"': ['11001100110', 2],
            '#': ['10010011000', 3],
            '$': ['10010001100', 4],
            '%': ['10001001100', 5],
            '&': ['10011001000', 6],
            '\'': ['10011000100', 7],
            '(': ['10001100100', 8],
            ')': ['11001001000', 9],
            '*': ['11001000100', 10],
            '+': ['11000100100', 11],
            ',': ['10110011100', 12],
            '-': ['10011011100', 13],
            '.': ['10011001110', 14],
            '/': ['10111001100', 15],
            '0': ['10011101100', 16],
            '1': ['10011100110', 17],
            '2': ['11001110010', 18],
            '3': ['11001011100', 19],
            '4': ['11001001110', 20],
            '5': ['11011100100', 21],
            '6': ['11001110100', 22],
            '7': ['11101101110', 23],
            '8': ['11101001100', 24],
            '9': ['11100101100', 25],
            ':': ['11100100110', 26],
            ';': ['11101100100', 27],
            '<': ['11100110100', 28],
            '=': ['11100110010', 29],
            '>': ['11011011000', 30],
            '?': ['11011000110', 31],
            '@': ['11000110110', 32],
            'A': ['10100011000', 33],
            'B': ['10001011000', 34],
            'C': ['10001000110', 35],
            'D': ['10110001000', 36],
            'E': ['10001101000', 37],
            'F': ['10001100010', 38],
            'G': ['11010001000', 39],
            'H': ['11000101000', 40],
            'I': ['11000100010', 41],
            'J': ['10110111000', 42],
            'K': ['10110001110', 43],
            'L': ['10001101110', 44],
            'M': ['10111011000', 45],
            'N': ['10111000110', 46],
            'O': ['10001110110', 47],
            'P': ['11101110110', 48],
            'Q': ['11010001110', 49],
            'R': ['11000101110', 50],
            'S': ['11011101000', 51],
            'T': ['11011100010', 52],
            'U': ['11011101110', 53],
            'V': ['11101011000', 54],
            'W': ['11101000110', 55],
            'X': ['11100010110', 56],
            'Y': ['11101101000', 57],
            'Z': ['11101100010', 58],
            '': ['11100011010', 59],
            '\\': ['11101111010', 60],
            ']': ['11001000010', 61],
            '^': ['11110001010', 62],
            '_': ['10100110000', 63],
            '`': ['10100001100', 64],
            'a': ['10010110000', 65],
            'b': ['10010000110', 66],
            'c': ['10000101100', 67],
            'd': ['10000100110', 68],
            'e': ['10110010000', 69],
            'f': ['10110000100', 70],
            'g': ['10011010000', 71],
            'h': ['10011000010', 72],
            'i': ['10000110100', 73],
            'j': ['10000110010', 74],
            'k': ['11000010010', 75],
            'l': ['11001010000', 76],
            'm': ['11110111010', 77],
            'n': ['11000010100', 78],
            'o': ['10001111010', 79],
            'p': ['10100111100', 80],
            'q': ['10010111100', 81],
            'r': ['10010011110', 82],
            's': ['10111100100', 83],
            't': ['10011110100', 84],
            'u': ['10011110010', 85],
            'v': ['11110100100', 86],
            'w': ['11110010100', 87],
            'x': ['11110010010', 88],
            'y': ['11011011110', 89],
            'z': ['11011110110', 90],
            '{': ['11110110110', 91],
            '|': ['10101111000', 92],
            '}': ['10100011110', 93],
            '~': ['10001011110', 94]
        }, (0, _defineProperty3.default)(_code128b, String.fromCharCode(127), ['10111101000', 95]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(128), ['10111100010', 96]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(129), ['11110101000', 97]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(130), ['11110100010', 98]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(131), ['10111011110', 99]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(132), ['10111101110', 100]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(133), ['11101011110', 101]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(134), ['11110101110', 102]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(135), ['11010000100', 103]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(136), ['11010010000', 104]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(137), ['11010011100', 105]), _code128b);

        var endBin = '1100011101011';
        var validRe = /^[!-~ ]+$/;

        var CODE128 = function () {
            function CODE128(code) {
                (0, _classCallCheck3.default)(this, CODE128);

                this.code = String(code);
            }

            (0, _createClass3.default)(CODE128, [{
                key: 'isValid',
                value: function isValid() {
                    return validRe.test(this.code);
                }
            }, {
                key: 'encode',
                value: function encode() {
                    var result = '';

                    //Add the start bits
                    result += this.encodingById(this.startCode);

                    //Add the encoded bits
                    result += this.encodeClass();

                    //Add the checksum
                    result += this.encodingById(this.checksum());

                    //Add the end bits
                    result += endBin;

                    return result;
                }
            }, {
                key: 'encodingById',
                value: function encodingById(id) {
                    for (var key in code128b) {
                        var code = code128b[key];
                        if (code[1] === id) {
                            return code[0];
                        }
                    }
                    return '';
                }
            }, {
                key: 'weightByCharacter',
                value: function weightByCharacter(char) {
                    var code = code128b[char];
                    if (!code) return 0;
                    return code[1];
                }
            }, {
                key: 'encodingByChar',
                value: function encodingByChar(char) {
                    var code = code128b[char];
                    if (!code) return '';
                    return code[0];
                }
            }]);
            return CODE128;
        }();

        exports.default = CODE128;

        /***/
    }),
    /* 53 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";



        var angular = __webpack_require__(54)
        var ioBarcode = __webpack_require__(55)

        module.exports =
        angular.module('io-barcode', [])

        /**
         * @ngdoc constant
         * @name $ioBarcode
         *
         * @description
         * Export of `io-barcode` module
         *
         */
          .constant('$ioBarcode', ioBarcode)

        /**
         * @ngdoc constant
         * @name IO_BARCODE_TYPES
         *
         * @description
         * Array of barcode types supported
         *
         */
          .constant('IO_BARCODE_TYPES', [
            'EAN',
            'UPC',
            'ITF',
            'ITF14',
            'CODE39',
            'CODE128B',
            'CODE128C',
            'Pharmacode'
          ])

        /**
         * @ngdoc directive
         * @name ioBarcode
         * @restrict E
         *
         * @param {string} code The string to encode
         * @param {string} type The type of barcode, can be: CODE128B, CODE128C, EAN, UPC, CODE39, ITF, ITF14, Pharmacode
         * @param {object} options Additional formatting options. See io-barcode.
         *
         * @description
         * Render a barcode using io-barcode
         *
         * @example
           <io-barcode code="123456789999" type="UPC"></io-barcode>
         *
         */
          .directive('ioBarcode', ['$ioBarcode', function ($ioBarcode) {
              return {
                  restrict: 'E',
                  template: '<img />',
                  replace: true,
                  scope: {
                      code: '@',
                      type: '@',
                      options: '='
                  },
                  link: function (scope, element, attrs) {
                      scope.$watchGroup([
                        'code',
                        'type',
                        'options'
                      ], render)
                      scope.$watch('options', render, true)

                      function render() {
                          if (!ioBarcode[scope.type]) {
                              console.warn('Invalid barcode type: ' + scope.type)
                              return
                          }
                          if (!scope.code) {
                              console.warn('No code provided')
                              return
                          }

                          var canvas = $ioBarcode[scope.type](scope.code, scope.options)
                          element.attr('src', canvas.toDataURL('image/png'))
                      }
                  }
              }
          }])


        /***/
    }),
    /* 54 */
    /***/ (function (module, exports) {

        module.exports = __WEBPACK_EXTERNAL_MODULE_54__;

        /***/
    }),
    /* 55 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _assign = __webpack_require__(56);

        var _assign2 = _interopRequireDefault(_assign);

        var _encodings = __webpack_require__(64);

        var _encodings2 = _interopRequireDefault(_encodings);

        var _canvasBrowserify = __webpack_require__(111);

        var _canvasBrowserify2 = _interopRequireDefault(_canvasBrowserify);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var api = {};

        var defaults = {
            width: 2,
            height: 100,
            quite: 10,
            displayValue: false,
            font: 'monospace',
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'normal',
            backgroundColor: '',
            lineColor: '#000'
        };

        function _drawBarcodeText(text, canvas, opts) {
            var ctx = canvas.getContext('2d');
            var x = undefined,
                y = undefined;

            y = opts.height;

            ctx.font = opts.fontWeight + ' ' + opts.fontSize + 'px ' + opts.font;
            ctx.textBaseline = 'bottom';
            ctx.textBaseline = 'top';

            if (opts.textAlign === 'left') {
                x = opts.quite;
                ctx.textAlign = 'left';
            } else if (opts.textAlign === 'right') {
                x = canvas.width - opts.quite;
                ctx.textAlign = 'right';
            } else {
                x = canvas.width / 2;
                ctx.textAlign = 'center';
            }

            ctx.fillText(text, x, y);
        }

        function generateBarcodeDataUri(Encoding, code, opts) {
            /* eslint complexity:0 */
            opts = (0, _assign2.default)({}, defaults, opts);

            var canvas = new _canvasBrowserify2.default();
            var encoder = new Encoding(code);

            // Abort if the barcode format does not support the content
            if (!encoder.isValid()) {
                throw new Error('Content is not supported by the encoding');
            }

            // Encode the content
            var binaryString = encoder.encode();

            // Get the canvas context
            var ctx = canvas.getContext('2d');

            // Set the width and height of the barcode
            canvas.width = binaryString.length * opts.width + 2 * opts.quite;

            // Set extra height if the value is displayed under the barcode.
            canvas.height = opts.height + (opts.displayValue ? opts.fontSize * 1.3 : 0);

            // Paint the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (opts.backgroundColor) {
                ctx.fillStyle = opts.backgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Change to lineColor to paint the lines
            ctx.fillStyle = opts.lineColor;

            // Creates the barcode out of the binary string
            for (var i = 0; i < binaryString.length; i++) {
                var x = i * opts.width + opts.quite;
                if (binaryString[i] === '1') {
                    ctx.fillRect(x, 0, opts.width, opts.height);
                }
            }

            // Add value below if enabled
            if (opts.displayValue) {
                _drawBarcodeText(opts.customLabel || code, canvas, opts);
            }

            return canvas;
        }

        /* eslint no-loop-func:0 */

        var _loop = function _loop(name) {
            api[name] = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return generateBarcodeDataUri.apply(undefined, [_encodings2.default[name]].concat(args));
            };
        };

        for (var name in _encodings2.default) {
            _loop(name);
        }

        module.exports = api;

        /***/
    }),
    /* 56 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = { "default": __webpack_require__(57), __esModule: true };

        /***/
    }),
    /* 57 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(58);
        module.exports = __webpack_require__(0).Object.assign;

        /***/
    }),
    /* 58 */
    /***/ (function (module, exports, __webpack_require__) {

        // 19.1.3.1 Object.assign(target, source)
        var $export = __webpack_require__(2);

        $export($export.S + $export.F, 'Object', { assign: __webpack_require__(60) });

        /***/
    }),
    /* 59 */
    /***/ (function (module, exports) {

        module.exports = function (it) {
            if (typeof it != 'function') throw TypeError(it + ' is not a function!');
            return it;
        };

        /***/
    }),
    /* 60 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";

        // 19.1.2.1 Object.assign(target, source, ...)
        var getKeys = __webpack_require__(14)
          , gOPS = __webpack_require__(27)
          , pIE = __webpack_require__(20)
          , toObject = __webpack_require__(28)
          , IObject = __webpack_require__(41)
          , $assign = Object.assign;

        // should work with symbols and should have deterministic property order (V8 bug)
        module.exports = !$assign || __webpack_require__(10)(function () {
            var A = {}
              , B = {}
              , S = Symbol()
              , K = 'abcdefghijklmnopqrst';
            A[S] = 7;
            K.split('').forEach(function (k) { B[k] = k; });
            return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
        }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
            var T = toObject(target)
              , aLen = arguments.length
              , index = 1
              , getSymbols = gOPS.f
              , isEnum = pIE.f;
            while (aLen > index) {
                var S = IObject(arguments[index++])
                  , keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
                  , length = keys.length
                  , j = 0
                  , key;
                while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
            } return T;
        } : $assign;

        /***/
    }),
    /* 61 */
    /***/ (function (module, exports, __webpack_require__) {

        // false -> Array#indexOf
        // true  -> Array#includes
        var toIObject = __webpack_require__(4)
          , toLength = __webpack_require__(62)
          , toIndex = __webpack_require__(63);
        module.exports = function (IS_INCLUDES) {
            return function ($this, el, fromIndex) {
                var O = toIObject($this)
                  , length = toLength(O.length)
                  , index = toIndex(fromIndex, length)
                  , value;
                // Array#includes uses SameValueZero equality algorithm
                if (IS_INCLUDES && el != el) while (length > index) {
                    value = O[index++];
                    if (value != value) return true;
                    // Array#toIndex ignores holes, Array#includes - not
                } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
                    if (O[index] === el) return IS_INCLUDES || index || 0;
                } return !IS_INCLUDES && -1;
            };
        };

        /***/
    }),
    /* 62 */
    /***/ (function (module, exports, __webpack_require__) {

        // 7.1.15 ToLength
        var toInteger = __webpack_require__(18)
          , min = Math.min;
        module.exports = function (it) {
            return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
        };

        /***/
    }),
    /* 63 */
    /***/ (function (module, exports, __webpack_require__) {

        var toInteger = __webpack_require__(18)
          , max = Math.max
          , min = Math.min;
        module.exports = function (index, length) {
            index = toInteger(index);
            return index < 0 ? max(index + length, 0) : min(index, length);
        };

        /***/
    }),
    /* 64 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _ean = __webpack_require__(43);

        var _ean2 = _interopRequireDefault(_ean);

        var _upc = __webpack_require__(67);

        var _upc2 = _interopRequireDefault(_upc);

        var _itf = __webpack_require__(51);

        var _itf2 = _interopRequireDefault(_itf);

        var _itf3 = __webpack_require__(99);

        var _itf4 = _interopRequireDefault(_itf3);

        var _code = __webpack_require__(103);

        var _code2 = _interopRequireDefault(_code);

        var _code128b = __webpack_require__(104);

        var _code128b2 = _interopRequireDefault(_code128b);

        var _code128c = __webpack_require__(106);

        var _code128c2 = _interopRequireDefault(_code128c);

        var _pharmacode = __webpack_require__(107);

        var _pharmacode2 = _interopRequireDefault(_pharmacode);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = {
            EAN: _ean2.default,
            UPC: _upc2.default,
            ITF: _itf2.default,
            ITF14: _itf4.default,
            CODE39: _code2.default,
            CODE128B: _code128b2.default,
            CODE128C: _code128c2.default,
            Pharmacode: _pharmacode2.default
        };

        /***/
    }),
    /* 65 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(66);
        var $Object = __webpack_require__(0).Object;
        module.exports = function defineProperty(it, key, desc) {
            return $Object.defineProperty(it, key, desc);
        };

        /***/
    }),
    /* 66 */
    /***/ (function (module, exports, __webpack_require__) {

        var $export = __webpack_require__(2);
        // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
        $export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(6).f });

        /***/
    }),
    /* 67 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _getPrototypeOf = __webpack_require__(15);

        var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

        var _classCallCheck2 = __webpack_require__(1);

        var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

        var _possibleConstructorReturn2 = __webpack_require__(21);

        var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

        var _inherits2 = __webpack_require__(22);

        var _inherits3 = _interopRequireDefault(_inherits2);

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _ean = __webpack_require__(43);

        var _ean2 = _interopRequireDefault(_ean);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var UPC = function (_EAN) {
            (0, _inherits3.default)(UPC, _EAN);

            function UPC(code) {
                (0, _classCallCheck3.default)(this, UPC);
                return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UPC).call(this, '0' + code));
            }

            return UPC;
        }(_ean2.default);

        exports.default = UPC;

        /***/
    }),
    /* 68 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(69);
        module.exports = __webpack_require__(0).Object.getPrototypeOf;

        /***/
    }),
    /* 69 */
    /***/ (function (module, exports, __webpack_require__) {

        // 19.1.2.9 Object.getPrototypeOf(O)
        var toObject = __webpack_require__(28)
          , $getPrototypeOf = __webpack_require__(45);

        __webpack_require__(46)('getPrototypeOf', function () {
            return function getPrototypeOf(it) {
                return $getPrototypeOf(toObject(it));
            };
        });

        /***/
    }),
    /* 70 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = { "default": __webpack_require__(71), __esModule: true };

        /***/
    }),
    /* 71 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(72);
        __webpack_require__(77);
        module.exports = __webpack_require__(33).f('iterator');

        /***/
    }),
    /* 72 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";

        var $at = __webpack_require__(73)(true);

        // 21.1.3.27 String.prototype[@@iterator]()
        __webpack_require__(48)(String, 'String', function (iterated) {
            this._t = String(iterated); // target
            this._i = 0;                // next index
            // 21.1.5.2.1 %StringIteratorPrototype%.next()
        }, function () {
            var O = this._t
              , index = this._i
              , point;
            if (index >= O.length) return { value: undefined, done: true };
            point = $at(O, index);
            this._i += point.length;
            return { value: point, done: false };
        });

        /***/
    }),
    /* 73 */
    /***/ (function (module, exports, __webpack_require__) {

        var toInteger = __webpack_require__(18)
          , defined = __webpack_require__(17);
        // true  -> String#at
        // false -> String#codePointAt
        module.exports = function (TO_STRING) {
            return function (that, pos) {
                var s = String(defined(that))
                  , i = toInteger(pos)
                  , l = s.length
                  , a, b;
                if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
                a = s.charCodeAt(i);
                return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
                  ? TO_STRING ? s.charAt(i) : a
                  : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
            };
        };

        /***/
    }),
    /* 74 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";

        var create = __webpack_require__(31)
          , descriptor = __webpack_require__(16)
          , setToStringTag = __webpack_require__(32)
          , IteratorPrototype = {};

        // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
        __webpack_require__(9)(IteratorPrototype, __webpack_require__(11)('iterator'), function () { return this; });

        module.exports = function (Constructor, NAME, next) {
            Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
            setToStringTag(Constructor, NAME + ' Iterator');
        };

        /***/
    }),
    /* 75 */
    /***/ (function (module, exports, __webpack_require__) {

        var dP = __webpack_require__(6)
          , anObject = __webpack_require__(12)
          , getKeys = __webpack_require__(14);

        module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
            anObject(O);
            var keys = getKeys(Properties)
              , length = keys.length
              , i = 0
              , P;
            while (length > i) dP.f(O, P = keys[i++], Properties[P]);
            return O;
        };

        /***/
    }),
    /* 76 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__(3).document && document.documentElement;

        /***/
    }),
    /* 77 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(78);
        var global = __webpack_require__(3)
          , hide = __webpack_require__(9)
          , Iterators = __webpack_require__(30)
          , TO_STRING_TAG = __webpack_require__(11)('toStringTag');

        for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
            var NAME = collections[i]
              , Collection = global[NAME]
              , proto = Collection && Collection.prototype;
            if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
            Iterators[NAME] = Iterators.Array;
        }

        /***/
    }),
    /* 78 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";

        var addToUnscopables = __webpack_require__(79)
          , step = __webpack_require__(80)
          , Iterators = __webpack_require__(30)
          , toIObject = __webpack_require__(4);

        // 22.1.3.4 Array.prototype.entries()
        // 22.1.3.13 Array.prototype.keys()
        // 22.1.3.29 Array.prototype.values()
        // 22.1.3.30 Array.prototype[@@iterator]()
        module.exports = __webpack_require__(48)(Array, 'Array', function (iterated, kind) {
            this._t = toIObject(iterated); // target
            this._i = 0;                   // next index
            this._k = kind;                // kind
            // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
        }, function () {
            var O = this._t
              , kind = this._k
              , index = this._i++;
            if (!O || index >= O.length) {
                this._t = undefined;
                return step(1);
            }
            if (kind == 'keys') return step(0, index);
            if (kind == 'values') return step(0, O[index]);
            return step(0, [index, O[index]]);
        }, 'values');

        // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
        Iterators.Arguments = Iterators.Array;

        addToUnscopables('keys');
        addToUnscopables('values');
        addToUnscopables('entries');

        /***/
    }),
    /* 79 */
    /***/ (function (module, exports) {

        module.exports = function () { /* empty */ };

        /***/
    }),
    /* 80 */
    /***/ (function (module, exports) {

        module.exports = function (done, value) {
            return { value: value, done: !!done };
        };

        /***/
    }),
    /* 81 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = { "default": __webpack_require__(82), __esModule: true };

        /***/
    }),
    /* 82 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(83);
        __webpack_require__(89);
        __webpack_require__(90);
        __webpack_require__(91);
        module.exports = __webpack_require__(0).Symbol;

        /***/
    }),
    /* 83 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";

        // ECMAScript 6 symbols shim
        var global = __webpack_require__(3)
          , has = __webpack_require__(8)
          , DESCRIPTORS = __webpack_require__(7)
          , $export = __webpack_require__(2)
          , redefine = __webpack_require__(49)
          , META = __webpack_require__(84).KEY
          , $fails = __webpack_require__(10)
          , shared = __webpack_require__(25)
          , setToStringTag = __webpack_require__(32)
          , uid = __webpack_require__(19)
          , wks = __webpack_require__(11)
          , wksExt = __webpack_require__(33)
          , wksDefine = __webpack_require__(34)
          , keyOf = __webpack_require__(85)
          , enumKeys = __webpack_require__(86)
          , isArray = __webpack_require__(87)
          , anObject = __webpack_require__(12)
          , toIObject = __webpack_require__(4)
          , toPrimitive = __webpack_require__(23)
          , createDesc = __webpack_require__(16)
          , _create = __webpack_require__(31)
          , gOPNExt = __webpack_require__(88)
          , $GOPD = __webpack_require__(35)
          , $DP = __webpack_require__(6)
          , $keys = __webpack_require__(14)
          , gOPD = $GOPD.f
          , dP = $DP.f
          , gOPN = gOPNExt.f
          , $Symbol = global.Symbol
          , $JSON = global.JSON
          , _stringify = $JSON && $JSON.stringify
          , PROTOTYPE = 'prototype'
          , HIDDEN = wks('_hidden')
          , TO_PRIMITIVE = wks('toPrimitive')
          , isEnum = {}.propertyIsEnumerable
          , SymbolRegistry = shared('symbol-registry')
          , AllSymbols = shared('symbols')
          , OPSymbols = shared('op-symbols')
          , ObjectProto = Object[PROTOTYPE]
          , USE_NATIVE = typeof $Symbol == 'function'
          , QObject = global.QObject;
        // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
        var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

        // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
        var setSymbolDesc = DESCRIPTORS && $fails(function () {
            return _create(dP({}, 'a', {
                get: function () { return dP(this, 'a', { value: 7 }).a; }
            })).a != 7;
        }) ? function (it, key, D) {
            var protoDesc = gOPD(ObjectProto, key);
            if (protoDesc) delete ObjectProto[key];
            dP(it, key, D);
            if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
        } : dP;

        var wrap = function (tag) {
            var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
            sym._k = tag;
            return sym;
        };

        var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
            return typeof it == 'symbol';
        } : function (it) {
            return it instanceof $Symbol;
        };

        var $defineProperty = function defineProperty(it, key, D) {
            if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
            anObject(it);
            key = toPrimitive(key, true);
            anObject(D);
            if (has(AllSymbols, key)) {
                if (!D.enumerable) {
                    if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
                    it[HIDDEN][key] = true;
                } else {
                    if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
                    D = _create(D, { enumerable: createDesc(0, false) });
                } return setSymbolDesc(it, key, D);
            } return dP(it, key, D);
        };
        var $defineProperties = function defineProperties(it, P) {
            anObject(it);
            var keys = enumKeys(P = toIObject(P))
              , i = 0
              , l = keys.length
              , key;
            while (l > i) $defineProperty(it, key = keys[i++], P[key]);
            return it;
        };
        var $create = function create(it, P) {
            return P === undefined ? _create(it) : $defineProperties(_create(it), P);
        };
        var $propertyIsEnumerable = function propertyIsEnumerable(key) {
            var E = isEnum.call(this, key = toPrimitive(key, true));
            if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
            return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
        };
        var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
            it = toIObject(it);
            key = toPrimitive(key, true);
            if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
            var D = gOPD(it, key);
            if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
            return D;
        };
        var $getOwnPropertyNames = function getOwnPropertyNames(it) {
            var names = gOPN(toIObject(it))
              , result = []
              , i = 0
              , key;
            while (names.length > i) {
                if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
            } return result;
        };
        var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
            var IS_OP = it === ObjectProto
              , names = gOPN(IS_OP ? OPSymbols : toIObject(it))
              , result = []
              , i = 0
              , key;
            while (names.length > i) {
                if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
            } return result;
        };

        // 19.4.1.1 Symbol([description])
        if (!USE_NATIVE) {
            $Symbol = function Symbol() {
                if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
                var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
                var $set = function (value) {
                    if (this === ObjectProto) $set.call(OPSymbols, value);
                    if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                    setSymbolDesc(this, tag, createDesc(1, value));
                };
                if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
                return wrap(tag);
            };
            redefine($Symbol[PROTOTYPE], 'toString', function toString() {
                return this._k;
            });

            $GOPD.f = $getOwnPropertyDescriptor;
            $DP.f = $defineProperty;
            __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
            __webpack_require__(20).f = $propertyIsEnumerable;
            __webpack_require__(27).f = $getOwnPropertySymbols;

            if (DESCRIPTORS && !__webpack_require__(29)) {
                redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
            }

            wksExt.f = function (name) {
                return wrap(wks(name));
            }
        }

        $export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

        for (var symbols = (
            // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
          'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
        ).split(','), i = 0; symbols.length > i;) wks(symbols[i++]);

        for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) wksDefine(symbols[i++]);

        $export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
            // 19.4.2.1 Symbol.for(key)
            'for': function (key) {
                return has(SymbolRegistry, key += '')
                  ? SymbolRegistry[key]
                  : SymbolRegistry[key] = $Symbol(key);
            },
            // 19.4.2.5 Symbol.keyFor(sym)
            keyFor: function keyFor(key) {
                if (isSymbol(key)) return keyOf(SymbolRegistry, key);
                throw TypeError(key + ' is not a symbol!');
            },
            useSetter: function () { setter = true; },
            useSimple: function () { setter = false; }
        });

        $export($export.S + $export.F * !USE_NATIVE, 'Object', {
            // 19.1.2.2 Object.create(O [, Properties])
            create: $create,
            // 19.1.2.4 Object.defineProperty(O, P, Attributes)
            defineProperty: $defineProperty,
            // 19.1.2.3 Object.defineProperties(O, Properties)
            defineProperties: $defineProperties,
            // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
            // 19.1.2.7 Object.getOwnPropertyNames(O)
            getOwnPropertyNames: $getOwnPropertyNames,
            // 19.1.2.8 Object.getOwnPropertySymbols(O)
            getOwnPropertySymbols: $getOwnPropertySymbols
        });

        // 24.3.2 JSON.stringify(value [, replacer [, space]])
        $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
            var S = $Symbol();
            // MS Edge converts symbol values to JSON as {}
            // WebKit converts symbol values to JSON as null
            // V8 throws on boxed symbols
            return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
        })), 'JSON', {
            stringify: function stringify(it) {
                if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
                var args = [it]
                  , i = 1
                  , replacer, $replacer;
                while (arguments.length > i) args.push(arguments[i++]);
                replacer = args[1];
                if (typeof replacer == 'function') $replacer = replacer;
                if ($replacer || !isArray(replacer)) replacer = function (key, value) {
                    if ($replacer) value = $replacer.call(this, key, value);
                    if (!isSymbol(value)) return value;
                };
                args[1] = replacer;
                return _stringify.apply($JSON, args);
            }
        });

        // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
        $Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
        // 19.4.3.5 Symbol.prototype[@@toStringTag]
        setToStringTag($Symbol, 'Symbol');
        // 20.2.1.9 Math[@@toStringTag]
        setToStringTag(Math, 'Math', true);
        // 24.3.3 JSON[@@toStringTag]
        setToStringTag(global.JSON, 'JSON', true);

        /***/
    }),
    /* 84 */
    /***/ (function (module, exports, __webpack_require__) {

        var META = __webpack_require__(19)('meta')
          , isObject = __webpack_require__(13)
          , has = __webpack_require__(8)
          , setDesc = __webpack_require__(6).f
          , id = 0;
        var isExtensible = Object.isExtensible || function () {
            return true;
        };
        var FREEZE = !__webpack_require__(10)(function () {
            return isExtensible(Object.preventExtensions({}));
        });
        var setMeta = function (it) {
            setDesc(it, META, {
                value: {
                    i: 'O' + ++id, // object ID
                    w: {}          // weak collections IDs
                }
            });
        };
        var fastKey = function (it, create) {
            // return primitive with prefix
            if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
            if (!has(it, META)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return 'F';
                // not necessary to add metadata
                if (!create) return 'E';
                // add missing metadata
                setMeta(it);
                // return object ID
            } return it[META].i;
        };
        var getWeak = function (it, create) {
            if (!has(it, META)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return true;
                // not necessary to add metadata
                if (!create) return false;
                // add missing metadata
                setMeta(it);
                // return hash weak collections IDs
            } return it[META].w;
        };
        // add metadata on freeze-family methods calling
        var onFreeze = function (it) {
            if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
            return it;
        };
        var meta = module.exports = {
            KEY: META,
            NEED: false,
            fastKey: fastKey,
            getWeak: getWeak,
            onFreeze: onFreeze
        };

        /***/
    }),
    /* 85 */
    /***/ (function (module, exports, __webpack_require__) {

        var getKeys = __webpack_require__(14)
          , toIObject = __webpack_require__(4);
        module.exports = function (object, el) {
            var O = toIObject(object)
              , keys = getKeys(O)
              , length = keys.length
              , index = 0
              , key;
            while (length > index) if (O[key = keys[index++]] === el) return key;
        };

        /***/
    }),
    /* 86 */
    /***/ (function (module, exports, __webpack_require__) {

        // all enumerable object keys, includes symbols
        var getKeys = __webpack_require__(14)
          , gOPS = __webpack_require__(27)
          , pIE = __webpack_require__(20);
        module.exports = function (it) {
            var result = getKeys(it)
              , getSymbols = gOPS.f;
            if (getSymbols) {
                var symbols = getSymbols(it)
                  , isEnum = pIE.f
                  , i = 0
                  , key;
                while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
            } return result;
        };

        /***/
    }),
    /* 87 */
    /***/ (function (module, exports, __webpack_require__) {

        // 7.2.2 IsArray(argument)
        var cof = __webpack_require__(42);
        module.exports = Array.isArray || function isArray(arg) {
            return cof(arg) == 'Array';
        };

        /***/
    }),
    /* 88 */
    /***/ (function (module, exports, __webpack_require__) {

        // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
        var toIObject = __webpack_require__(4)
          , gOPN = __webpack_require__(50).f
          , toString = {}.toString;

        var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
          ? Object.getOwnPropertyNames(window) : [];

        var getWindowNames = function (it) {
            try {
                return gOPN(it);
            } catch (e) {
                return windowNames.slice();
            }
        };

        module.exports.f = function getOwnPropertyNames(it) {
            return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
        };


        /***/
    }),
    /* 89 */
    /***/ (function (module, exports) {



        /***/
    }),
    /* 90 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(34)('asyncIterator');

        /***/
    }),
    /* 91 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(34)('observable');

        /***/
    }),
    /* 92 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = { "default": __webpack_require__(93), __esModule: true };

        /***/
    }),
    /* 93 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(94);
        module.exports = __webpack_require__(0).Object.setPrototypeOf;

        /***/
    }),
    /* 94 */
    /***/ (function (module, exports, __webpack_require__) {

        // 19.1.3.19 Object.setPrototypeOf(O, proto)
        var $export = __webpack_require__(2);
        $export($export.S, 'Object', { setPrototypeOf: __webpack_require__(95).set });

        /***/
    }),
    /* 95 */
    /***/ (function (module, exports, __webpack_require__) {

        // Works with __proto__ only. Old v8 can't work with null proto objects.
        /* eslint-disable no-proto */
        var isObject = __webpack_require__(13)
          , anObject = __webpack_require__(12);
        var check = function (O, proto) {
            anObject(O);
            if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
        };
        module.exports = {
            set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
              function (test, buggy, set) {
                  try {
                      set = __webpack_require__(37)(Function.call, __webpack_require__(35).f(Object.prototype, '__proto__').set, 2);
                      set(test, []);
                      buggy = !(test instanceof Array);
                  } catch (e) { buggy = true; }
                  return function setPrototypeOf(O, proto) {
                      check(O, proto);
                      if (buggy) O.__proto__ = proto;
                      else set(O, proto);
                      return O;
                  };
              }({}, false) : undefined),
            check: check
        };

        /***/
    }),
    /* 96 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = { "default": __webpack_require__(97), __esModule: true };

        /***/
    }),
    /* 97 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(98);
        var $Object = __webpack_require__(0).Object;
        module.exports = function create(P, D) {
            return $Object.create(P, D);
        };

        /***/
    }),
    /* 98 */
    /***/ (function (module, exports, __webpack_require__) {

        var $export = __webpack_require__(2)
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        $export($export.S, 'Object', { create: __webpack_require__(31) });

        /***/
    }),
    /* 99 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _getPrototypeOf = __webpack_require__(15);

        var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

        var _classCallCheck2 = __webpack_require__(1);

        var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

        var _createClass2 = __webpack_require__(5);

        var _createClass3 = _interopRequireDefault(_createClass2);

        var _possibleConstructorReturn2 = __webpack_require__(21);

        var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

        var _get2 = __webpack_require__(36);

        var _get3 = _interopRequireDefault(_get2);

        var _inherits2 = __webpack_require__(22);

        var _inherits3 = _interopRequireDefault(_inherits2);

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _itf = __webpack_require__(51);

        var _itf2 = _interopRequireDefault(_itf);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var validRe = /^[0-9]{13,14}$/;

        var ITF14 = function (_ITF) {
            (0, _inherits3.default)(ITF14, _ITF);

            function ITF14(code) {
                (0, _classCallCheck3.default)(this, ITF14);

                var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ITF14).call(this, code));

                if (code.length === 13) {
                    _this.code += _this.checksum();
                }
                return _this;
            }

            (0, _createClass3.default)(ITF14, [{
                key: 'isValid',
                value: function isValid() {
                    return (0, _get3.default)((0, _getPrototypeOf2.default)(ITF14.prototype), 'isValid', this).call(this) && validRe.test(this.code) && Number(this.code[13]) === this.checksum();
                }
            }, {
                key: 'checksum',
                value: function checksum() {
                    var result = 0;

                    for (var i = 0; i < 13; i++) {
                        result += Number(this.code[i]) * (3 - i % 2 * 2);
                    }

                    return 10 - result % 10;
                }
            }]);
            return ITF14;
        }(_itf2.default);

        exports.default = ITF14;

        /***/
    }),
    /* 100 */
    /***/ (function (module, exports, __webpack_require__) {

        module.exports = { "default": __webpack_require__(101), __esModule: true };

        /***/
    }),
    /* 101 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(102);
        var $Object = __webpack_require__(0).Object;
        module.exports = function getOwnPropertyDescriptor(it, key) {
            return $Object.getOwnPropertyDescriptor(it, key);
        };

        /***/
    }),
    /* 102 */
    /***/ (function (module, exports, __webpack_require__) {

        // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
        var toIObject = __webpack_require__(4)
          , $getOwnPropertyDescriptor = __webpack_require__(35).f;

        __webpack_require__(46)('getOwnPropertyDescriptor', function () {
            return function getOwnPropertyDescriptor(it, key) {
                return $getOwnPropertyDescriptor(toIObject(it), key);
            };
        });

        /***/
    }),
    /* 103 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _classCallCheck2 = __webpack_require__(1);

        var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

        var _createClass2 = __webpack_require__(5);

        var _createClass3 = _interopRequireDefault(_createClass2);

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var code39 = {
            '0': '101000111011101',
            '1': '111010001010111',
            '2': '101110001010111',
            '3': '111011100010101',
            '4': '101000111010111',
            '5': '111010001110101',
            '6': '101110001110101',
            '7': '101000101110111',
            '8': '111010001011101',
            '9': '101110001011101',
            'A': '111010100010111',
            'B': '101110100010111',
            'C': '111011101000101',
            'D': '101011100010111',
            'E': '111010111000101',
            'F': '101110111000101',
            'G': '101010001110111',
            'H': '111010100011101',
            'I': '101110100011101',
            'J': '101011100011101',
            'K': '111010101000111',
            'L': '101110101000111',
            'M': '111011101010001',
            'N': '101011101000111',
            'O': '111010111010001',
            'P': '101110111010001',
            'Q': '101010111000111',
            'R': '111010101110001',
            'S': '101110101110001',
            'T': '101011101110001',
            'U': '111000101010111',
            'V': '100011101010111',
            'W': '111000111010101',
            'X': '100010111010111',
            'Y': '111000101110101',
            'Z': '100011101110101',
            '-': '100010101110111',
            '.': '111000101011101',
            ' ': '100011101011101',
            '$': '100010001000101',
            '/': '100010001010001',
            '+': '100010100010001',
            '%': '101000100010001'
        };

        var validRe = /^[0-9a-zA-Z\-\.\ \$\/\+\%]+$/;

        var CODE39 = function () {
            function CODE39(code) {
                (0, _classCallCheck3.default)(this, CODE39);

                this.code = String(code);
            }

            (0, _createClass3.default)(CODE39, [{
                key: 'isValid',
                value: function isValid() {
                    return validRe.test(this.code);
                }
            }, {
                key: 'encode',
                value: function encode() {
                    var string = this.code.toUpperCase();

                    var result = '';
                    result += '1000101110111010';
                    for (var i = 0; i < string.length; i++) {
                        result += this.encodingByChar(string[i]) + '0';
                    }
                    result += '1000101110111010';
                    return result;
                }
            }, {
                key: 'encodingByChar',
                value: function encodingByChar(char) {
                    return code39[char] || '';
                }
            }]);
            return CODE39;
        }();

        exports.default = CODE39;

        /***/
    }),
    /* 104 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _getPrototypeOf = __webpack_require__(15);

        var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

        var _classCallCheck2 = __webpack_require__(1);

        var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

        var _createClass2 = __webpack_require__(5);

        var _createClass3 = _interopRequireDefault(_createClass2);

        var _possibleConstructorReturn2 = __webpack_require__(21);

        var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

        var _get2 = __webpack_require__(36);

        var _get3 = _interopRequireDefault(_get2);

        var _inherits2 = __webpack_require__(22);

        var _inherits3 = _interopRequireDefault(_inherits2);

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _code = __webpack_require__(52);

        var _code2 = _interopRequireDefault(_code);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var CODE128B = function (_CODE) {
            (0, _inherits3.default)(CODE128B, _CODE);

            function CODE128B(code) {
                (0, _classCallCheck3.default)(this, CODE128B);

                var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CODE128B).call(this, code));

                _this.startCode = 104;
                return _this;
            }

            (0, _createClass3.default)(CODE128B, [{
                key: 'encodeClass',
                value: function encodeClass() {
                    var result = '';
                    for (var i = 0; i < this.code.length; i++) {
                        result += (0, _get3.default)((0, _getPrototypeOf2.default)(CODE128B.prototype), 'encodingByChar', this).call(this, this.code[i]);
                    }
                    return result;
                }
            }, {
                key: 'checksum',
                value: function checksum() {
                    var sum = 0;
                    for (var i = 0; i < this.code.length; i++) {
                        sum += (0, _get3.default)((0, _getPrototypeOf2.default)(CODE128B.prototype), 'weightByCharacter', this).call(this, this.code[i]) * (i + 1);
                    }
                    return (sum + this.startCode) % 103;
                }
            }]);
            return CODE128B;
        }(_code2.default);

        exports.default = CODE128B;

        /***/
    }),
    /* 105 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        exports.__esModule = true;

        var _defineProperty = __webpack_require__(44);

        var _defineProperty2 = _interopRequireDefault(_defineProperty);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = function (obj, key, value) {
            if (key in obj) {
                (0, _defineProperty2.default)(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }

            return obj;
        };

        /***/
    }),
    /* 106 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _getPrototypeOf = __webpack_require__(15);

        var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

        var _classCallCheck2 = __webpack_require__(1);

        var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

        var _createClass2 = __webpack_require__(5);

        var _createClass3 = _interopRequireDefault(_createClass2);

        var _possibleConstructorReturn2 = __webpack_require__(21);

        var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

        var _get2 = __webpack_require__(36);

        var _get3 = _interopRequireDefault(_get2);

        var _inherits2 = __webpack_require__(22);

        var _inherits3 = _interopRequireDefault(_inherits2);

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _code = __webpack_require__(52);

        var _code2 = _interopRequireDefault(_code);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var CODE128C = function (_CODE) {
            (0, _inherits3.default)(CODE128C, _CODE);

            function CODE128C(code) {
                (0, _classCallCheck3.default)(this, CODE128C);

                var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CODE128C).call(this, code));

                _this.code = _this.code.replace(/ /g, '');
                _this.startCode = 105;
                return _this;
            }

            (0, _createClass3.default)(CODE128C, [{
                key: 'encodeClass',
                value: function encodeClass() {
                    var result = '';
                    for (var i = 0; i < this.code.length; i += 2) {
                        result += (0, _get3.default)((0, _getPrototypeOf2.default)(CODE128C.prototype), 'encodingById', this).call(this, Number(this.code.substr(i, 2)));
                    }
                    return result;
                }
            }, {
                key: 'checksum',
                value: function checksum() {
                    var sum = 0;
                    var w = 1;
                    for (var i = 0; i < this.code.length; i += 2) {
                        sum += Number(this.code.substr(i, 2)) * w;
                        w++;
                    }
                    return (sum + this.startCode) % 103;
                }
            }]);
            return CODE128C;
        }(_code2.default);

        exports.default = CODE128C;

        /***/
    }),
    /* 107 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _classCallCheck2 = __webpack_require__(1);

        var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

        var _createClass2 = __webpack_require__(5);

        var _createClass3 = _interopRequireDefault(_createClass2);

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _repeat = __webpack_require__(108);

        var _repeat2 = _interopRequireDefault(_repeat);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var Pharmacode = function () {
            function Pharmacode(code) {
                (0, _classCallCheck3.default)(this, Pharmacode);

                this.code = Number(code);
            }

            (0, _createClass3.default)(Pharmacode, [{
                key: 'isValid',
                value: function isValid() {
                    return this.code >= 3 && this.code <= 131070;
                }

                // A helper function to calculate the zeros at the end of a string

            }, {
                key: '_calcZeros',
                value: function _calcZeros(code) {
                    var i = code.length - 1;
                    var zeros = 0;
                    while (code[i] === '0' || i < 0) {
                        zeros++;
                        i--;
                    }
                    return zeros;
                }
            }, {
                key: 'encodeBinary',
                value: function encodeBinary(code, state) {
                    if (code.length === 0) return '';

                    var generated = undefined;
                    var nextState = false;
                    var nZeros = this._calcZeros(code);

                    if (nZeros === 0) {
                        generated = state ? '001' : '00111';
                        nextState = state;
                    } else {
                        generated = (0, _repeat2.default)('001', nZeros - (state ? 1 : 0));
                        generated += '00111';
                    }
                    return this.encodeBinary(code.substr(0, code.length - nZeros - 1), nextState) + generated;
                }
            }, {
                key: 'encode',
                value: function encode() {
                    return this.encodeBinary(this.code.toString(2), true).substr(2);
                }
            }]);
            return Pharmacode;
        }();

        exports.default = Pharmacode;

        /***/
    }),
    /* 108 */
    /***/ (function (module, exports, __webpack_require__) {

        __webpack_require__(109);
        module.exports = __webpack_require__(0).String.repeat;

        /***/
    }),
    /* 109 */
    /***/ (function (module, exports, __webpack_require__) {

        var $export = __webpack_require__(2);

        $export($export.P, 'String', {
            // 21.1.3.13 String.prototype.repeat(count)
            repeat: __webpack_require__(110)
        });

        /***/
    }),
    /* 110 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";

        var toInteger = __webpack_require__(18)
          , defined = __webpack_require__(17);

        module.exports = function repeat(count) {
            var str = String(defined(this))
              , res = ''
              , n = toInteger(count);
            if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
            for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
            return res;
        };

        /***/
    }),
    /* 111 */
    /***/ (function (module, exports) {


        var Canvas = module.exports = function Canvas(w, h) {
            var canvas = document.createElement('canvas')
            canvas.width = w || 300
            canvas.height = h || 150
            return canvas
        }

        Canvas.Image = function () {
            var img = document.createElement('img')
            return img
        }





        /***/
    })
    /******/]);
});