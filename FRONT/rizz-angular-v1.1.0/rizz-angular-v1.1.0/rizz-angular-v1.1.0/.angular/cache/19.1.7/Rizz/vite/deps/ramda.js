import "./chunk-APYJOV5E.js";

// node_modules/ramda/es/F.js
var F = function() {
  return false;
};
var F_default = F;

// node_modules/ramda/es/T.js
var T = function() {
  return true;
};
var T_default = T;

// node_modules/ramda/es/__.js
var __default = {
  "@@functional/placeholder": true
};

// node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}

// node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

// node_modules/ramda/es/add.js
var add = _curry2(function add2(a, b) {
  return Number(a) + Number(b);
});
var add_default = add;

// node_modules/ramda/es/internal/_concat.js
function _concat(set1, set22) {
  set1 = set1 || [];
  set22 = set22 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set22.length;
  var result = [];
  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set22[idx];
    idx += 1;
  }
  return result;
}

// node_modules/ramda/es/internal/_arity.js
function _arity(n, fn) {
  switch (n) {
    case 0:
      return function() {
        return fn.apply(this, arguments);
      };
    case 1:
      return function(a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function(a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function(a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function(a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function(a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function(a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function(a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function(a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}

// node_modules/ramda/es/internal/_curryN.js
function _curryN(length3, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length3;
    var combinedIdx = 0;
    var hasPlaceholder = false;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      } else {
        hasPlaceholder = true;
      }
      combinedIdx += 1;
    }
    return !hasPlaceholder && left <= 0 ? fn.apply(this, combined) : _arity(Math.max(0, left), _curryN(length3, combined, fn));
  };
}

// node_modules/ramda/es/curryN.js
var curryN = _curry2(function curryN2(length3, fn) {
  if (length3 === 1) {
    return _curry1(fn);
  }
  return _arity(length3, _curryN(length3, [], fn));
});
var curryN_default = curryN;

// node_modules/ramda/es/addIndex.js
var addIndex = _curry1(function addIndex2(fn) {
  return curryN_default(fn.length, function() {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function() {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx += 1;
      return result;
    };
    return fn.apply(this, args);
  });
});
var addIndex_default = addIndex;

// node_modules/ramda/es/addIndexRight.js
var addIndexRight = _curry1(function addIndex3(fn) {
  return curryN_default(fn.length, function() {
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var idx = list.length - 1;
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function() {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx -= 1;
      return result;
    };
    return fn.apply(this, args);
  });
});
var addIndexRight_default = addIndexRight;

// node_modules/ramda/es/internal/_curry3.js
function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function(_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function(_c) {
          return fn(a, b, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function(_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

// node_modules/ramda/es/adjust.js
var adjust = _curry3(function adjust2(idx, fn, list) {
  var len = list.length;
  if (idx >= len || idx < -len) {
    return list;
  }
  var _idx = (len + idx) % len;
  var _list = _concat(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});
var adjust_default = adjust;

// node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};

// node_modules/ramda/es/internal/_isTransformer.js
function _isTransformer(obj) {
  return obj != null && typeof obj["@@transducer/step"] === "function";
}

// node_modules/ramda/es/internal/_dispatchable.js
function _dispatchable(methodNames, transducerCreator, fn) {
  return function() {
    if (arguments.length === 0) {
      return fn();
    }
    var obj = arguments[arguments.length - 1];
    if (!isArray_default(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === "function") {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}

// node_modules/ramda/es/internal/_reduced.js
function _reduced(x) {
  return x && x["@@transducer/reduced"] ? x : {
    "@@transducer/value": x,
    "@@transducer/reduced": true
  };
}

// node_modules/ramda/es/internal/_xfBase.js
var xfBase_default = {
  init: function() {
    return this.xf["@@transducer/init"]();
  },
  result: function(result) {
    return this.xf["@@transducer/result"](result);
  }
};

// node_modules/ramda/es/internal/_xall.js
var XAll = function() {
  function XAll2(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }
  XAll2.prototype["@@transducer/init"] = xfBase_default.init;
  XAll2.prototype["@@transducer/result"] = function(result) {
    if (this.all) {
      result = this.xf["@@transducer/step"](result, true);
    }
    return this.xf["@@transducer/result"](result);
  };
  XAll2.prototype["@@transducer/step"] = function(result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced(this.xf["@@transducer/step"](result, false));
    }
    return result;
  };
  return XAll2;
}();
function _xall(f) {
  return function(xf) {
    return new XAll(f, xf);
  };
}

// node_modules/ramda/es/all.js
var all = _curry2(_dispatchable(["all"], _xall, function all2(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }
    idx += 1;
  }
  return true;
}));
var all_default = all;

// node_modules/ramda/es/internal/_arrayFromIterator.js
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}

// node_modules/ramda/es/internal/_includesWith.js
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}

// node_modules/ramda/es/internal/_functionName.js
function _functionName(f) {
  var match3 = String(f).match(/^function (\w*)/);
  return match3 == null ? "" : match3[1];
}

// node_modules/ramda/es/internal/_has.js
function _has(prop3, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop3);
}

// node_modules/ramda/es/internal/_objectIs.js
function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  } else {
    return a !== a && b !== b;
  }
}
var objectIs_default = typeof Object.is === "function" ? Object.is : _objectIs;

// node_modules/ramda/es/internal/_isArguments.js
var toString = Object.prototype.toString;
var _isArguments = function() {
  return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
}();
var isArguments_default = _isArguments;

// node_modules/ramda/es/keys.js
var hasEnumBug = !{
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = function() {
  "use strict";
  return arguments.propertyIsEnumerable("length");
}();
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop3, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
  for (prop3 in obj) {
    if (_has(prop3, obj) && (!checkArgsLength || prop3 !== "length")) {
      ks[ks.length] = prop3;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop3 = nonEnumerableProps[nIdx];
      if (_has(prop3, obj) && !contains(ks, prop3)) {
        ks[ks.length] = prop3;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var keys_default = keys;

// node_modules/ramda/es/type.js
var type = _curry1(function type2(val) {
  return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
});
var type_default = type;

// node_modules/ramda/es/internal/_equals.js
function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }
  return !_includesWith(function(b2, aItem) {
    return !_includesWith(eq, aItem, b2);
  }, b, a);
}
function _equals(a, b, stackA, stackB) {
  if (objectIs_default(a, b)) {
    return true;
  }
  var typeA = type_default(a);
  if (typeA !== type_default(b)) {
    return false;
  }
  if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
    return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
  }
  if (typeof a.equals === "function" || typeof b.equals === "function") {
    return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
  }
  switch (typeA) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
        return a === b;
      }
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof a === typeof b && objectIs_default(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case "Date":
      if (!objectIs_default(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case "Error":
      return a.name === b.name && a.message === b.message;
    case "RegExp":
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }
  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }
  switch (typeA) {
    case "Map":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case "Set":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return false;
  }
  var keysA = keys_default(a);
  if (keysA.length !== keys_default(b).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}

// node_modules/ramda/es/equals.js
var equals = _curry2(function equals2(a, b) {
  return _equals(a, b, [], []);
});
var equals_default = equals;

// node_modules/ramda/es/internal/_indexOf.js
function _indexOf(list, a, idx) {
  var inf, item;
  if (typeof list.indexOf === "function") {
    switch (typeof a) {
      case "number":
        if (a === 0) {
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === "number" && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        return list.indexOf(a, idx);
      // all these types can utilise Set
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return list.indexOf(a, idx);
      case "object":
        if (a === null) {
          return list.indexOf(a, idx);
        }
    }
  }
  while (idx < list.length) {
    if (equals_default(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}

// node_modules/ramda/es/internal/_includes.js
function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

// node_modules/ramda/es/internal/_map.js
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}

// node_modules/ramda/es/internal/_quote.js
function _quote(s) {
  var escaped = s.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

// node_modules/ramda/es/internal/_toISOString.js
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};
var toISOString_default = _toISOString;

// node_modules/ramda/es/internal/_complement.js
function _complement(f) {
  return function() {
    return !f.apply(this, arguments);
  };
}

// node_modules/ramda/es/internal/_arrayReduce.js
function _arrayReduce(reducer, acc, list) {
  var index = 0;
  var length3 = list.length;
  while (index < length3) {
    acc = reducer(acc, list[index]);
    index += 1;
  }
  return acc;
}

// node_modules/ramda/es/internal/_filter.js
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}

// node_modules/ramda/es/internal/_isObject.js
function _isObject(x) {
  return Object.prototype.toString.call(x) === "[object Object]";
}

// node_modules/ramda/es/internal/_xfilter.js
var XFilter = function() {
  function XFilter2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter2.prototype["@@transducer/init"] = xfBase_default.init;
  XFilter2.prototype["@@transducer/result"] = xfBase_default.result;
  XFilter2.prototype["@@transducer/step"] = function(result, input) {
    return this.f(input) ? this.xf["@@transducer/step"](result, input) : result;
  };
  return XFilter2;
}();
function _xfilter(f) {
  return function(xf) {
    return new XFilter(f, xf);
  };
}

// node_modules/ramda/es/filter.js
var filter = _curry2(_dispatchable(["fantasy-land/filter", "filter"], _xfilter, function(pred, filterable) {
  return _isObject(filterable) ? _arrayReduce(function(acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }
    return acc;
  }, {}, keys_default(filterable)) : (
    // else
    _filter(pred, filterable)
  );
}));
var filter_default = filter;

// node_modules/ramda/es/reject.js
var reject = _curry2(function reject2(pred, filterable) {
  return filter_default(_complement(pred), filterable);
});
var reject_default = reject;

// node_modules/ramda/es/internal/_toString.js
function _toString(x, seen) {
  var recur = function recur2(y) {
    var xs = seen.concat([x]);
    return _includes(y, xs) ? "<Circular>" : _toString(y, xs);
  };
  var mapPairs = function(obj, keys4) {
    return _map(function(k) {
      return _quote(k) + ": " + recur(obj[k]);
    }, keys4.slice().sort());
  };
  switch (Object.prototype.toString.call(x)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + _map(recur, x).join(", ") + "))";
    case "[object Array]":
      return "[" + _map(recur, x).concat(mapPairs(x, reject_default(function(k) {
        return /^\d+$/.test(k);
      }, keys_default(x)))).join(", ") + "]";
    case "[object Boolean]":
      return typeof x === "object" ? "new Boolean(" + recur(x.valueOf()) + ")" : x.toString();
    case "[object Date]":
      return "new Date(" + (isNaN(x.valueOf()) ? recur(NaN) : _quote(toISOString_default(x))) + ")";
    case "[object Map]":
      return "new Map(" + recur(Array.from(x)) + ")";
    case "[object Null]":
      return "null";
    case "[object Number]":
      return typeof x === "object" ? "new Number(" + recur(x.valueOf()) + ")" : 1 / x === -Infinity ? "-0" : x.toString(10);
    case "[object Set]":
      return "new Set(" + recur(Array.from(x).sort()) + ")";
    case "[object String]":
      return typeof x === "object" ? "new String(" + recur(x.valueOf()) + ")" : _quote(x);
    case "[object Undefined]":
      return "undefined";
    default:
      if (typeof x.toString === "function") {
        var repr = x.toString();
        if (repr !== "[object Object]") {
          return repr;
        }
      }
      return "{" + mapPairs(x, keys_default(x)).join(", ") + "}";
  }
}

// node_modules/ramda/es/toString.js
var toString2 = _curry1(function toString3(val) {
  return _toString(val, []);
});
var toString_default = toString2;

// node_modules/ramda/es/max.js
var max = _curry2(function max2(a, b) {
  if (a === b) {
    return b;
  }
  function safeMax(x, y) {
    if (x > y !== y > x) {
      return y > x ? y : x;
    }
    return void 0;
  }
  var maxByValue = safeMax(a, b);
  if (maxByValue !== void 0) {
    return maxByValue;
  }
  var maxByType = safeMax(typeof a, typeof b);
  if (maxByType !== void 0) {
    return maxByType === typeof a ? a : b;
  }
  var stringA = toString_default(a);
  var maxByStringValue = safeMax(stringA, toString_default(b));
  if (maxByStringValue !== void 0) {
    return maxByStringValue === stringA ? a : b;
  }
  return b;
});
var max_default = max;

// node_modules/ramda/es/internal/_xmap.js
var XMap = function() {
  function XMap2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap2.prototype["@@transducer/init"] = xfBase_default.init;
  XMap2.prototype["@@transducer/result"] = xfBase_default.result;
  XMap2.prototype["@@transducer/step"] = function(result, input) {
    return this.xf["@@transducer/step"](result, this.f(input));
  };
  return XMap2;
}();
var _xmap = function _xmap2(f) {
  return function(xf) {
    return new XMap(f, xf);
  };
};
var xmap_default = _xmap;

// node_modules/ramda/es/map.js
var map = _curry2(_dispatchable(["fantasy-land/map", "map"], xmap_default, function map2(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case "[object Function]":
      return curryN_default(functor.length, function() {
        return fn.call(this, functor.apply(this, arguments));
      });
    case "[object Object]":
      return _arrayReduce(function(acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys_default(functor));
    default:
      return _map(fn, functor);
  }
}));
var map_default = map;

// node_modules/ramda/es/internal/_isInteger.js
var isInteger_default = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

// node_modules/ramda/es/internal/_isString.js
function _isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}

// node_modules/ramda/es/internal/_nth.js
function _nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
}

// node_modules/ramda/es/prop.js
var prop = _curry2(function prop2(p, obj) {
  if (obj == null) {
    return;
  }
  return isInteger_default(p) ? _nth(p, obj) : obj[p];
});
var prop_default = prop;

// node_modules/ramda/es/pluck.js
var pluck = _curry2(function pluck2(p, list) {
  return map_default(prop_default(p), list);
});
var pluck_default = pluck;

// node_modules/ramda/es/internal/_isArrayLike.js
var _isArrayLike = _curry1(function isArrayLike(x) {
  if (isArray_default(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== "object") {
    return false;
  }
  if (_isString(x)) {
    return false;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
var isArrayLike_default = _isArrayLike;

// node_modules/ramda/es/internal/_createReduce.js
var symIterator = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
function _createReduce(arrayReduce, methodReduce, iterableReduce) {
  return function _reduce2(xf, acc, list) {
    if (isArrayLike_default(list)) {
      return arrayReduce(xf, acc, list);
    }
    if (list == null) {
      return acc;
    }
    if (typeof list["fantasy-land/reduce"] === "function") {
      return methodReduce(xf, acc, list, "fantasy-land/reduce");
    }
    if (list[symIterator] != null) {
      return iterableReduce(xf, acc, list[symIterator]());
    }
    if (typeof list.next === "function") {
      return iterableReduce(xf, acc, list);
    }
    if (typeof list.reduce === "function") {
      return methodReduce(xf, acc, list, "reduce");
    }
    throw new TypeError("reduce: list must be array or iterable");
  };
}

// node_modules/ramda/es/internal/_xArrayReduce.js
function _xArrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf["@@transducer/step"](acc, list[idx]);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    idx += 1;
  }
  return xf["@@transducer/result"](acc);
}

// node_modules/ramda/es/bind.js
var bind = _curry2(function bind2(fn, thisObj) {
  return _arity(fn.length, function() {
    return fn.apply(thisObj, arguments);
  });
});
var bind_default = bind;

// node_modules/ramda/es/internal/_xReduce.js
function _xIterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf["@@transducer/step"](acc, step.value);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    step = iter.next();
  }
  return xf["@@transducer/result"](acc);
}
function _xMethodReduce(xf, acc, obj, methodName) {
  return xf["@@transducer/result"](obj[methodName](bind_default(xf["@@transducer/step"], xf), acc));
}
var _xReduce = _createReduce(_xArrayReduce, _xMethodReduce, _xIterableReduce);
var xReduce_default = _xReduce;

// node_modules/ramda/es/internal/_xwrap.js
var XWrap = function() {
  function XWrap2(fn) {
    this.f = fn;
  }
  XWrap2.prototype["@@transducer/init"] = function() {
    throw new Error("init not implemented on XWrap");
  };
  XWrap2.prototype["@@transducer/result"] = function(acc) {
    return acc;
  };
  XWrap2.prototype["@@transducer/step"] = function(acc, x) {
    return this.f(acc, x);
  };
  return XWrap2;
}();
function _xwrap(fn) {
  return new XWrap(fn);
}

// node_modules/ramda/es/reduce.js
var reduce = _curry3(function(xf, acc, list) {
  return xReduce_default(typeof xf === "function" ? _xwrap(xf) : xf, acc, list);
});
var reduce_default = reduce;

// node_modules/ramda/es/allPass.js
var allPass = _curry1(function allPass2(preds) {
  return curryN_default(reduce_default(max_default, 0, pluck_default("length", preds)), function() {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }
      idx += 1;
    }
    return true;
  });
});
var allPass_default = allPass;

// node_modules/ramda/es/always.js
var always = _curry1(function always2(val) {
  return function() {
    return val;
  };
});
var always_default = always;

// node_modules/ramda/es/and.js
var and = _curry2(function and2(a, b) {
  return a && b;
});
var and_default = and;

// node_modules/ramda/es/internal/_xany.js
var XAny = function() {
  function XAny2(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }
  XAny2.prototype["@@transducer/init"] = xfBase_default.init;
  XAny2.prototype["@@transducer/result"] = function(result) {
    if (!this.any) {
      result = this.xf["@@transducer/step"](result, false);
    }
    return this.xf["@@transducer/result"](result);
  };
  XAny2.prototype["@@transducer/step"] = function(result, input) {
    if (this.f(input)) {
      this.any = true;
      result = _reduced(this.xf["@@transducer/step"](result, true));
    }
    return result;
  };
  return XAny2;
}();
function _xany(f) {
  return function(xf) {
    return new XAny(f, xf);
  };
}

// node_modules/ramda/es/any.js
var any = _curry2(_dispatchable(["any"], _xany, function any2(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}));
var any_default = any;

// node_modules/ramda/es/anyPass.js
var anyPass = _curry1(function anyPass2(preds) {
  return curryN_default(reduce_default(max_default, 0, pluck_default("length", preds)), function() {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }
      idx += 1;
    }
    return false;
  });
});
var anyPass_default = anyPass;

// node_modules/ramda/es/internal/_reduce.js
function _iterableReduce(reducer, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = reducer(acc, step.value);
    step = iter.next();
  }
  return acc;
}
function _methodReduce(reducer, acc, obj, methodName) {
  return obj[methodName](reducer, acc);
}
var _reduce = _createReduce(_arrayReduce, _methodReduce, _iterableReduce);
var reduce_default2 = _reduce;

// node_modules/ramda/es/ap.js
var ap = _curry2(function ap2(applyF, applyX) {
  return typeof applyX["fantasy-land/ap"] === "function" ? applyX["fantasy-land/ap"](applyF) : typeof applyF.ap === "function" ? applyF.ap(applyX) : typeof applyF === "function" ? function(x) {
    return applyF(x)(applyX(x));
  } : reduce_default2(function(acc, f) {
    return _concat(acc, map_default(f, applyX));
  }, [], applyF);
});
var ap_default = ap;

// node_modules/ramda/es/internal/_aperture.js
function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);
  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }
  return acc;
}

// node_modules/ramda/es/internal/_xaperture.js
var XAperture = function() {
  function XAperture2(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XAperture2.prototype["@@transducer/init"] = xfBase_default.init;
  XAperture2.prototype["@@transducer/result"] = function(result) {
    this.acc = null;
    return this.xf["@@transducer/result"](result);
  };
  XAperture2.prototype["@@transducer/step"] = function(result, input) {
    this.store(input);
    return this.full ? this.xf["@@transducer/step"](result, this.getCopy()) : result;
  };
  XAperture2.prototype.store = function(input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };
  XAperture2.prototype.getCopy = function() {
    return _concat(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
  };
  return XAperture2;
}();
function _xaperture(n) {
  return function(xf) {
    return new XAperture(n, xf);
  };
}

// node_modules/ramda/es/aperture.js
var aperture = _curry2(_dispatchable([], _xaperture, _aperture));
var aperture_default = aperture;

// node_modules/ramda/es/append.js
var append = _curry2(function append2(el, list) {
  return _concat(list, [el]);
});
var append_default = append;

// node_modules/ramda/es/apply.js
var apply = _curry2(function apply2(fn, args) {
  return fn.apply(this, args);
});
var apply_default = apply;

// node_modules/ramda/es/values.js
var values = _curry1(function values2(obj) {
  var props3 = keys_default(obj);
  var len = props3.length;
  var vals = [];
  var idx = 0;
  while (idx < len) {
    vals[idx] = obj[props3[idx]];
    idx += 1;
  }
  return vals;
});
var values_default = values;

// node_modules/ramda/es/applySpec.js
function mapValues(fn, obj) {
  return isArray_default(obj) ? obj.map(fn) : keys_default(obj).reduce(function(acc, key) {
    acc[key] = fn(obj[key]);
    return acc;
  }, {});
}
var applySpec = _curry1(function applySpec2(spec) {
  spec = mapValues(function(v) {
    return typeof v == "function" ? v : applySpec2(v);
  }, spec);
  return curryN_default(reduce_default(max_default, 0, pluck_default("length", values_default(spec))), function() {
    var args = arguments;
    return mapValues(function(f) {
      return apply_default(f, args);
    }, spec);
  });
});
var applySpec_default = applySpec;

// node_modules/ramda/es/applyTo.js
var applyTo = _curry2(function applyTo2(x, f) {
  return f(x);
});
var applyTo_default = applyTo;

// node_modules/ramda/es/ascend.js
var ascend = _curry3(function ascend2(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});
var ascend_default = ascend;

// node_modules/ramda/es/curry.js
var curry = _curry1(function curry2(fn) {
  return curryN_default(fn.length, fn);
});
var curry_default = curry;

// node_modules/ramda/es/ascendNatural.js
var ascendNatural = curry_default(function ascendNatural2(locales, fn, a, b) {
  const aa = fn(a);
  const bb = fn(b);
  return aa.localeCompare(bb, locales, {
    numeric: true
  });
});
var ascendNatural_default = ascendNatural;

// node_modules/ramda/es/internal/_assoc.js
function _assoc(prop3, val, obj) {
  if (isInteger_default(prop3) && isArray_default(obj)) {
    var arr = [].concat(obj);
    arr[prop3] = val;
    return arr;
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop3] = val;
  return result;
}

// node_modules/ramda/es/isNil.js
var isNil = _curry1(function isNil2(x) {
  return x == null;
});
var isNil_default = isNil;

// node_modules/ramda/es/assocPath.js
var assocPath = _curry3(function assocPath2(path2, val, obj) {
  if (path2.length === 0) {
    return val;
  }
  var idx = path2[0];
  if (path2.length > 1) {
    var nextObj = !isNil_default(obj) && _has(idx, obj) && typeof obj[idx] === "object" ? obj[idx] : isInteger_default(path2[1]) ? [] : {};
    val = assocPath2(Array.prototype.slice.call(path2, 1), val, nextObj);
  }
  return _assoc(idx, val, obj);
});
var assocPath_default = assocPath;

// node_modules/ramda/es/assoc.js
var assoc = _curry3(function assoc2(prop3, val, obj) {
  return assocPath_default([prop3], val, obj);
});
var assoc_default = assoc;

// node_modules/ramda/es/nAry.js
var nAry = _curry2(function nAry2(n, fn) {
  switch (n) {
    case 0:
      return function() {
        return fn.call(this);
      };
    case 1:
      return function(a0) {
        return fn.call(this, a0);
      };
    case 2:
      return function(a0, a1) {
        return fn.call(this, a0, a1);
      };
    case 3:
      return function(a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };
    case 4:
      return function(a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };
    case 5:
      return function(a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };
    case 6:
      return function(a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };
    case 7:
      return function(a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };
    case 8:
      return function(a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };
    case 9:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };
    case 10:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };
    default:
      throw new Error("First argument to nAry must be a non-negative integer no greater than ten");
  }
});
var nAry_default = nAry;

// node_modules/ramda/es/binary.js
var binary = _curry1(function binary2(fn) {
  return nAry_default(2, fn);
});
var binary_default = binary;

// node_modules/ramda/es/internal/_isFunction.js
function _isFunction(x) {
  var type3 = Object.prototype.toString.call(x);
  return type3 === "[object Function]" || type3 === "[object AsyncFunction]" || type3 === "[object GeneratorFunction]" || type3 === "[object AsyncGeneratorFunction]";
}

// node_modules/ramda/es/liftN.js
var liftN = _curry2(function liftN2(arity, fn) {
  var lifted = curryN_default(arity, fn);
  return curryN_default(arity, function() {
    return _arrayReduce(ap_default, map_default(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});
var liftN_default = liftN;

// node_modules/ramda/es/lift.js
var lift = _curry1(function lift2(fn) {
  return liftN_default(fn.length, fn);
});
var lift_default = lift;

// node_modules/ramda/es/both.js
var both = _curry2(function both2(f, g) {
  return _isFunction(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : lift_default(and_default)(f, g);
});
var both_default = both;

// node_modules/ramda/es/call.js
var call = _curry1(function call2(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});
var call_default = call;

// node_modules/ramda/es/internal/_makeFlat.js
function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;
    while (idx < ilen) {
      if (isArrayLike_default(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
}

// node_modules/ramda/es/internal/_forceReduced.js
function _forceReduced(x) {
  return {
    "@@transducer/value": x,
    "@@transducer/reduced": true
  };
}

// node_modules/ramda/es/internal/_flatCat.js
var tInit = "@@transducer/init";
var tStep = "@@transducer/step";
var tResult = "@@transducer/result";
var XPreservingReduced = function() {
  function XPreservingReduced2(xf) {
    this.xf = xf;
  }
  XPreservingReduced2.prototype[tInit] = xfBase_default.init;
  XPreservingReduced2.prototype[tResult] = xfBase_default.result;
  XPreservingReduced2.prototype[tStep] = function(result, input) {
    var ret = this.xf[tStep](result, input);
    return ret["@@transducer/reduced"] ? _forceReduced(ret) : ret;
  };
  return XPreservingReduced2;
}();
var XFlatCat = function() {
  function XFlatCat2(xf) {
    this.xf = new XPreservingReduced(xf);
  }
  XFlatCat2.prototype[tInit] = xfBase_default.init;
  XFlatCat2.prototype[tResult] = xfBase_default.result;
  XFlatCat2.prototype[tStep] = function(result, input) {
    return !isArrayLike_default(input) ? _xArrayReduce(this.xf, result, [input]) : xReduce_default(this.xf, result, input);
  };
  return XFlatCat2;
}();
var _flatCat = function _xcat(xf) {
  return new XFlatCat(xf);
};
var flatCat_default = _flatCat;

// node_modules/ramda/es/internal/_xchain.js
function _xchain(f) {
  return function(xf) {
    return xmap_default(f)(flatCat_default(xf));
  };
}

// node_modules/ramda/es/chain.js
var chain = _curry2(_dispatchable(["fantasy-land/chain", "chain"], _xchain, function chain2(fn, monad) {
  if (typeof monad === "function") {
    return function(x) {
      return fn(monad(x))(x);
    };
  }
  return _makeFlat(false)(map_default(fn, monad));
}));
var chain_default = chain;

// node_modules/ramda/es/clamp.js
var clamp = _curry3(function clamp2(min3, max3, value) {
  if (min3 > max3) {
    throw new Error("min must not be greater than max in clamp(min, max, value)");
  }
  return value < min3 ? min3 : value > max3 ? max3 : value;
});
var clamp_default = clamp;

// node_modules/ramda/es/internal/_cloneRegExp.js
function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, pattern.flags ? pattern.flags : (pattern.global ? "g" : "") + (pattern.ignoreCase ? "i" : "") + (pattern.multiline ? "m" : "") + (pattern.sticky ? "y" : "") + (pattern.unicode ? "u" : "") + (pattern.dotAll ? "s" : ""));
}

// node_modules/ramda/es/internal/_clone.js
function _clone(value, deep, map3) {
  map3 || (map3 = new _ObjectMap());
  if (_isPrimitive(value)) {
    return value;
  }
  var copy = function copy2(copiedValue) {
    var cachedCopy = map3.get(value);
    if (cachedCopy) {
      return cachedCopy;
    }
    map3.set(value, copiedValue);
    for (var key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        copiedValue[key] = deep ? _clone(value[key], true, map3) : value[key];
      }
    }
    return copiedValue;
  };
  switch (type_default(value)) {
    case "Object":
      return copy(Object.create(Object.getPrototypeOf(value)));
    case "Array":
      return copy(Array(value.length));
    case "Date":
      return new Date(value.valueOf());
    case "RegExp":
      return _cloneRegExp(value);
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "BigInt64Array":
    case "BigUint64Array":
      return value.slice();
    default:
      return value;
  }
}
function _isPrimitive(param) {
  var type3 = typeof param;
  return param == null || type3 != "object" && type3 != "function";
}
var _ObjectMap = function() {
  function _ObjectMap2() {
    this.map = {};
    this.length = 0;
  }
  _ObjectMap2.prototype.set = function(key, value) {
    var hashedKey = this.hash(key);
    var bucket = this.map[hashedKey];
    if (!bucket) {
      this.map[hashedKey] = bucket = [];
    }
    bucket.push([key, value]);
    this.length += 1;
  };
  _ObjectMap2.prototype.hash = function(key) {
    var hashedKey = [];
    for (var value in key) {
      hashedKey.push(Object.prototype.toString.call(key[value]));
    }
    return hashedKey.join();
  };
  _ObjectMap2.prototype.get = function(key) {
    if (this.length <= 180) {
      for (var p in this.map) {
        var bucket = this.map[p];
        for (var i = 0; i < bucket.length; i += 1) {
          var element = bucket[i];
          if (element[0] === key) {
            return element[1];
          }
        }
      }
      return;
    }
    var hashedKey = this.hash(key);
    var bucket = this.map[hashedKey];
    if (!bucket) {
      return;
    }
    for (var i = 0; i < bucket.length; i += 1) {
      var element = bucket[i];
      if (element[0] === key) {
        return element[1];
      }
    }
  };
  return _ObjectMap2;
}();

// node_modules/ramda/es/clone.js
var clone = _curry1(function clone2(value) {
  return value != null && typeof value.clone === "function" ? value.clone() : _clone(value, true);
});
var clone_default = clone;

// node_modules/ramda/es/collectBy.js
var collectBy = _curry2(function collectBy2(fn, list) {
  var group = reduce_default2(function(o3, x) {
    var tag2 = fn(x);
    if (o3[tag2] === void 0) {
      o3[tag2] = [];
    }
    o3[tag2].push(x);
    return o3;
  }, {}, list);
  var newList = [];
  for (var tag in group) {
    newList.push(group[tag]);
  }
  return newList;
});
var collectBy_default = collectBy;

// node_modules/ramda/es/comparator.js
var comparator = _curry1(function comparator2(pred) {
  return function(a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});
var comparator_default = comparator;

// node_modules/ramda/es/not.js
var not = _curry1(function not2(a) {
  return !a;
});
var not_default = not;

// node_modules/ramda/es/complement.js
var complement = lift_default(not_default);
var complement_default = complement;

// node_modules/ramda/es/internal/_pipe.js
function _pipe(f, g) {
  return function() {
    return g.call(this, f.apply(this, arguments));
  };
}

// node_modules/ramda/es/internal/_checkForMethod.js
function _checkForMethod(methodname, fn) {
  return function() {
    var length3 = arguments.length;
    if (length3 === 0) {
      return fn();
    }
    var obj = arguments[length3 - 1];
    return isArray_default(obj) || typeof obj[methodname] !== "function" ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length3 - 1));
  };
}

// node_modules/ramda/es/slice.js
var slice = _curry3(_checkForMethod("slice", function slice2(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));
var slice_default = slice;

// node_modules/ramda/es/tail.js
var tail = _curry1(_checkForMethod("tail", slice_default(1, Infinity)));
var tail_default = tail;

// node_modules/ramda/es/pipe.js
function pipe() {
  if (arguments.length === 0) {
    throw new Error("pipe requires at least one argument");
  }
  return _arity(arguments[0].length, reduce_default(_pipe, arguments[0], tail_default(arguments)));
}

// node_modules/ramda/es/reverse.js
var reverse = _curry1(function reverse2(list) {
  return _isString(list) ? list.split("").reverse().join("") : Array.prototype.slice.call(list, 0).reverse();
});
var reverse_default = reverse;

// node_modules/ramda/es/compose.js
function compose() {
  if (arguments.length === 0) {
    throw new Error("compose requires at least one argument");
  }
  return pipe.apply(this, reverse_default(arguments));
}

// node_modules/ramda/es/head.js
var head = _curry1(function(list) {
  return _nth(0, list);
});
var head_default = head;

// node_modules/ramda/es/internal/_identity.js
function _identity(x) {
  return x;
}

// node_modules/ramda/es/identity.js
var identity = _curry1(_identity);
var identity_default = identity;

// node_modules/ramda/es/pipeWith.js
var pipeWith = _curry2(function pipeWith2(xf, list) {
  if (list.length <= 0) {
    return identity_default;
  }
  var headList = head_default(list);
  var tailList = tail_default(list);
  return _arity(headList.length, function() {
    return reduce_default2(function(result, f) {
      return xf.call(this, f, result);
    }, headList.apply(this, arguments), tailList);
  });
});
var pipeWith_default = pipeWith;

// node_modules/ramda/es/composeWith.js
var composeWith = _curry2(function composeWith2(xf, list) {
  return pipeWith_default.apply(this, [xf, reverse_default(list)]);
});
var composeWith_default = composeWith;

// node_modules/ramda/es/concat.js
var concat = _curry2(function concat2(a, b) {
  if (isArray_default(a)) {
    if (isArray_default(b)) {
      return a.concat(b);
    }
    throw new TypeError(toString_default(b) + " is not an array");
  }
  if (_isString(a)) {
    if (_isString(b)) {
      return a + b;
    }
    throw new TypeError(toString_default(b) + " is not a string");
  }
  if (a != null && _isFunction(a["fantasy-land/concat"])) {
    return a["fantasy-land/concat"](b);
  }
  if (a != null && _isFunction(a.concat)) {
    return a.concat(b);
  }
  throw new TypeError(toString_default(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});
var concat_default = concat;

// node_modules/ramda/es/cond.js
var cond = _curry1(function cond2(pairs) {
  var arity = reduce_default(max_default, 0, map_default(function(pair3) {
    return pair3[0].length;
  }, pairs));
  return _arity(arity, function() {
    var idx = 0;
    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }
      idx += 1;
    }
  });
});
var cond_default = cond;

// node_modules/ramda/es/constructN.js
var constructN = _curry2(function constructN2(n, Fn) {
  if (n > 10) {
    throw new Error("Constructor with greater than ten arguments");
  }
  if (n === 0) {
    return function() {
      return new Fn();
    };
  }
  return curry_default(nAry_default(n, function($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (n) {
      case 1:
        return new Fn($0);
      case 2:
        return new Fn($0, $1);
      case 3:
        return new Fn($0, $1, $2);
      case 4:
        return new Fn($0, $1, $2, $3);
      case 5:
        return new Fn($0, $1, $2, $3, $4);
      case 6:
        return new Fn($0, $1, $2, $3, $4, $5);
      case 7:
        return new Fn($0, $1, $2, $3, $4, $5, $6);
      case 8:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
      case 9:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
      case 10:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});
var constructN_default = constructN;

// node_modules/ramda/es/construct.js
var construct = _curry1(function construct2(Fn) {
  return constructN_default(Fn.length, Fn);
});
var construct_default = construct;

// node_modules/ramda/es/converge.js
var converge = _curry2(function converge2(after, fns) {
  return curryN_default(reduce_default(max_default, 0, pluck_default("length", fns)), function() {
    var args = arguments;
    var context = this;
    return after.apply(context, _map(function(fn) {
      return fn.apply(context, args);
    }, fns));
  });
});
var converge_default = converge;

// node_modules/ramda/es/count.js
var count = curry_default(function(pred, list) {
  return reduce_default2(function(a, e) {
    return pred(e) ? a + 1 : a;
  }, 0, list);
});
var count_default = count;

// node_modules/ramda/es/internal/_xreduceBy.js
var XReduceBy = function() {
  function XReduceBy2(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }
  XReduceBy2.prototype["@@transducer/init"] = xfBase_default.init;
  XReduceBy2.prototype["@@transducer/result"] = function(result) {
    var key;
    for (key in this.inputs) {
      if (_has(key, this.inputs)) {
        result = this.xf["@@transducer/step"](result, this.inputs[key]);
        if (result["@@transducer/reduced"]) {
          result = result["@@transducer/value"];
          break;
        }
      }
    }
    this.inputs = null;
    return this.xf["@@transducer/result"](result);
  };
  XReduceBy2.prototype["@@transducer/step"] = function(result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, _clone(this.valueAcc, false)];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };
  return XReduceBy2;
}();
function _xreduceBy(valueFn, valueAcc, keyFn) {
  return function(xf) {
    return new XReduceBy(valueFn, valueAcc, keyFn, xf);
  };
}

// node_modules/ramda/es/reduceBy.js
var reduceBy = _curryN(4, [], _dispatchable([], _xreduceBy, function reduceBy2(valueFn, valueAcc, keyFn, list) {
  var xf = _xwrap(function(acc, elt) {
    var key = keyFn(elt);
    var value = valueFn(_has(key, acc) ? acc[key] : _clone(valueAcc, false), elt);
    if (value && value["@@transducer/reduced"]) {
      return _reduced(acc);
    }
    acc[key] = value;
    return acc;
  });
  return xReduce_default(xf, {}, list);
}));
var reduceBy_default = reduceBy;

// node_modules/ramda/es/countBy.js
var countBy = reduceBy_default(function(acc, elem) {
  return acc + 1;
}, 0);
var countBy_default = countBy;

// node_modules/ramda/es/dec.js
var dec = add_default(-1);
var dec_default = dec;

// node_modules/ramda/es/defaultTo.js
var defaultTo = _curry2(function defaultTo2(d, v) {
  return v == null || v !== v ? d : v;
});
var defaultTo_default = defaultTo;

// node_modules/ramda/es/descend.js
var descend = _curry3(function descend2(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});
var descend_default = descend;

// node_modules/ramda/es/descendNatural.js
var descendNatural = curry_default(function descendNatural2(locales, fn, a, b) {
  const aa = fn(a);
  const bb = fn(b);
  return bb.localeCompare(aa, locales, {
    numeric: true
  });
});
var descendNatural_default = descendNatural;

// node_modules/ramda/es/internal/_Set.js
var _Set = function() {
  function _Set2() {
    this._nativeSet = typeof Set === "function" ? /* @__PURE__ */ new Set() : null;
    this._items = {};
  }
  _Set2.prototype.add = function(item) {
    return !hasOrAdd(item, true, this);
  };
  _Set2.prototype.has = function(item) {
    return hasOrAdd(item, false, this);
  };
  return _Set2;
}();
function hasOrAdd(item, shouldAdd, set3) {
  var type3 = typeof item;
  var prevSize, newSize;
  switch (type3) {
    case "string":
    case "number":
      if (item === 0 && 1 / item === -Infinity) {
        if (set3._items["-0"]) {
          return true;
        } else {
          if (shouldAdd) {
            set3._items["-0"] = true;
          }
          return false;
        }
      }
      if (set3._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set3._nativeSet.size;
          set3._nativeSet.add(item);
          newSize = set3._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set3._nativeSet.has(item);
        }
      } else {
        if (!(type3 in set3._items)) {
          if (shouldAdd) {
            set3._items[type3] = {};
            set3._items[type3][item] = true;
          }
          return false;
        } else if (item in set3._items[type3]) {
          return true;
        } else {
          if (shouldAdd) {
            set3._items[type3][item] = true;
          }
          return false;
        }
      }
    case "boolean":
      if (type3 in set3._items) {
        var bIdx = item ? 1 : 0;
        if (set3._items[type3][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set3._items[type3][bIdx] = true;
          }
          return false;
        }
      } else {
        if (shouldAdd) {
          set3._items[type3] = item ? [false, true] : [true, false];
        }
        return false;
      }
    case "function":
      if (set3._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set3._nativeSet.size;
          set3._nativeSet.add(item);
          newSize = set3._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set3._nativeSet.has(item);
        }
      } else {
        if (!(type3 in set3._items)) {
          if (shouldAdd) {
            set3._items[type3] = [item];
          }
          return false;
        }
        if (!_includes(item, set3._items[type3])) {
          if (shouldAdd) {
            set3._items[type3].push(item);
          }
          return false;
        }
        return true;
      }
    case "undefined":
      if (set3._items[type3]) {
        return true;
      } else {
        if (shouldAdd) {
          set3._items[type3] = true;
        }
        return false;
      }
    case "object":
      if (item === null) {
        if (!set3._items["null"]) {
          if (shouldAdd) {
            set3._items["null"] = true;
          }
          return false;
        }
        return true;
      }
    /* falls through */
    default:
      type3 = Object.prototype.toString.call(item);
      if (!(type3 in set3._items)) {
        if (shouldAdd) {
          set3._items[type3] = [item];
        }
        return false;
      }
      if (!_includes(item, set3._items[type3])) {
        if (shouldAdd) {
          set3._items[type3].push(item);
        }
        return false;
      }
      return true;
  }
}
var Set_default = _Set;

// node_modules/ramda/es/difference.js
var difference = _curry2(function difference2(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  var secondLen = second.length;
  var toFilterOut = new Set_default();
  for (var i = 0; i < secondLen; i += 1) {
    toFilterOut.add(second[i]);
  }
  while (idx < firstLen) {
    if (toFilterOut.add(first[idx])) {
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
});
var difference_default = difference;

// node_modules/ramda/es/differenceWith.js
var differenceWith = _curry3(function differenceWith2(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_includesWith(pred, first[idx], second) && !_includesWith(pred, first[idx], out)) {
      out.push(first[idx]);
    }
    idx += 1;
  }
  return out;
});
var differenceWith_default = differenceWith;

// node_modules/ramda/es/remove.js
var remove = _curry3(function remove2(start, count2, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count2);
  return result;
});
var remove_default = remove;

// node_modules/ramda/es/internal/_dissoc.js
function _dissoc(prop3, obj) {
  if (obj == null) {
    return obj;
  }
  if (isInteger_default(prop3) && isArray_default(obj)) {
    return remove_default(prop3, 1, obj);
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  delete result[prop3];
  return result;
}

// node_modules/ramda/es/dissocPath.js
function _shallowCloneObject(prop3, obj) {
  if (isInteger_default(prop3) && isArray_default(obj)) {
    return [].concat(obj);
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  return result;
}
var dissocPath = _curry2(function dissocPath2(path2, obj) {
  if (obj == null) {
    return obj;
  }
  switch (path2.length) {
    case 0:
      return obj;
    case 1:
      return _dissoc(path2[0], obj);
    default:
      var head2 = path2[0];
      var tail2 = Array.prototype.slice.call(path2, 1);
      if (obj[head2] == null) {
        return _shallowCloneObject(head2, obj);
      } else {
        return assoc_default(head2, dissocPath2(tail2, obj[head2]), obj);
      }
  }
});
var dissocPath_default = dissocPath;

// node_modules/ramda/es/dissoc.js
var dissoc = _curry2(function dissoc2(prop3, obj) {
  return dissocPath_default([prop3], obj);
});
var dissoc_default = dissoc;

// node_modules/ramda/es/divide.js
var divide = _curry2(function divide2(a, b) {
  return a / b;
});
var divide_default = divide;

// node_modules/ramda/es/internal/_xdrop.js
var XDrop = function() {
  function XDrop2(n, xf) {
    this.xf = xf;
    this.n = n;
  }
  XDrop2.prototype["@@transducer/init"] = xfBase_default.init;
  XDrop2.prototype["@@transducer/result"] = xfBase_default.result;
  XDrop2.prototype["@@transducer/step"] = function(result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }
    return this.xf["@@transducer/step"](result, input);
  };
  return XDrop2;
}();
function _xdrop(n) {
  return function(xf) {
    return new XDrop(n, xf);
  };
}

// node_modules/ramda/es/drop.js
var drop = _curry2(_dispatchable(["drop"], _xdrop, function drop2(n, xs) {
  return slice_default(Math.max(0, n), Infinity, xs);
}));
var drop_default = drop;

// node_modules/ramda/es/internal/_xtake.js
var XTake = function() {
  function XTake2(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }
  XTake2.prototype["@@transducer/init"] = xfBase_default.init;
  XTake2.prototype["@@transducer/result"] = xfBase_default.result;
  XTake2.prototype["@@transducer/step"] = function(result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf["@@transducer/step"](result, input);
    return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
  };
  return XTake2;
}();
function _xtake(n) {
  return function(xf) {
    return new XTake(n, xf);
  };
}

// node_modules/ramda/es/take.js
var take = _curry2(_dispatchable(["take"], _xtake, function take2(n, xs) {
  return slice_default(0, n < 0 ? Infinity : n, xs);
}));
var take_default = take;

// node_modules/ramda/es/internal/_dropLast.js
function dropLast(n, xs) {
  return take_default(n < xs.length ? xs.length - n : 0, xs);
}

// node_modules/ramda/es/internal/_xdropLast.js
var XDropLast = function() {
  function XDropLast2(n, xf) {
    if (n <= 0) {
      return xf;
    }
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XDropLast2.prototype["@@transducer/init"] = xfBase_default.init;
  XDropLast2.prototype["@@transducer/result"] = function(result) {
    this.acc = null;
    return this.xf["@@transducer/result"](result);
  };
  XDropLast2.prototype["@@transducer/step"] = function(result, input) {
    if (this.full) {
      result = this.xf["@@transducer/step"](result, this.acc[this.pos]);
    }
    this.store(input);
    return result;
  };
  XDropLast2.prototype.store = function(input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };
  return XDropLast2;
}();
function _xdropLast(n) {
  return function(xf) {
    return new XDropLast(n, xf);
  };
}

// node_modules/ramda/es/dropLast.js
var dropLast2 = _curry2(_dispatchable([], _xdropLast, dropLast));
var dropLast_default = dropLast2;

// node_modules/ramda/es/internal/_dropLastWhile.js
function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }
  return slice_default(0, idx + 1, xs);
}

// node_modules/ramda/es/internal/_xdropLastWhile.js
var XDropLastWhile = function() {
  function XDropLastWhile2(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }
  XDropLastWhile2.prototype["@@transducer/init"] = xfBase_default.init;
  XDropLastWhile2.prototype["@@transducer/result"] = function(result) {
    this.retained = null;
    return this.xf["@@transducer/result"](result);
  };
  XDropLastWhile2.prototype["@@transducer/step"] = function(result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };
  XDropLastWhile2.prototype.flush = function(result, input) {
    result = xReduce_default(this.xf, result, this.retained);
    this.retained = [];
    return this.xf["@@transducer/step"](result, input);
  };
  XDropLastWhile2.prototype.retain = function(result, input) {
    this.retained.push(input);
    return result;
  };
  return XDropLastWhile2;
}();
function _xdropLastWhile(fn) {
  return function(xf) {
    return new XDropLastWhile(fn, xf);
  };
}

// node_modules/ramda/es/dropLastWhile.js
var dropLastWhile2 = _curry2(_dispatchable([], _xdropLastWhile, dropLastWhile));
var dropLastWhile_default = dropLastWhile2;

// node_modules/ramda/es/internal/_xdropRepeatsWith.js
var XDropRepeatsWith = function() {
  function XDropRepeatsWith2(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = void 0;
    this.seenFirstValue = false;
  }
  XDropRepeatsWith2.prototype["@@transducer/init"] = xfBase_default.init;
  XDropRepeatsWith2.prototype["@@transducer/result"] = xfBase_default.result;
  XDropRepeatsWith2.prototype["@@transducer/step"] = function(result, input) {
    var sameAsLast = false;
    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }
    this.lastValue = input;
    return sameAsLast ? result : this.xf["@@transducer/step"](result, input);
  };
  return XDropRepeatsWith2;
}();
function _xdropRepeatsWith(pred) {
  return function(xf) {
    return new XDropRepeatsWith(pred, xf);
  };
}

// node_modules/ramda/es/last.js
var last = _curry1(function(list) {
  return _nth(-1, list);
});
var last_default = last;

// node_modules/ramda/es/dropRepeatsWith.js
var dropRepeatsWith = _curry2(_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith2(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;
  if (len !== 0) {
    result[0] = list[0];
    while (idx < len) {
      if (!pred(last_default(result), list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
  }
  return result;
}));
var dropRepeatsWith_default = dropRepeatsWith;

// node_modules/ramda/es/dropRepeats.js
var dropRepeats = _curry1(_dispatchable([], function() {
  return _xdropRepeatsWith(equals_default);
}, dropRepeatsWith_default(equals_default)));
var dropRepeats_default = dropRepeats;

// node_modules/ramda/es/eqBy.js
var eqBy = _curry3(function eqBy2(f, x, y) {
  return equals_default(f(x), f(y));
});
var eqBy_default = eqBy;

// node_modules/ramda/es/dropRepeatsBy.js
var dropRepeatsBy = _curry2(function(fn, list) {
  return _dispatchable([], function() {
    return _xdropRepeatsWith(eqBy_default(fn));
  }, dropRepeatsWith_default(eqBy_default(fn)))(list);
});
var dropRepeatsBy_default = dropRepeatsBy;

// node_modules/ramda/es/internal/_xdropWhile.js
var XDropWhile = function() {
  function XDropWhile2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XDropWhile2.prototype["@@transducer/init"] = xfBase_default.init;
  XDropWhile2.prototype["@@transducer/result"] = xfBase_default.result;
  XDropWhile2.prototype["@@transducer/step"] = function(result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }
      this.f = null;
    }
    return this.xf["@@transducer/step"](result, input);
  };
  return XDropWhile2;
}();
function _xdropWhile(f) {
  return function(xf) {
    return new XDropWhile(f, xf);
  };
}

// node_modules/ramda/es/dropWhile.js
var dropWhile = _curry2(_dispatchable(["dropWhile"], _xdropWhile, function dropWhile2(pred, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }
  return slice_default(idx, Infinity, xs);
}));
var dropWhile_default = dropWhile;

// node_modules/ramda/es/or.js
var or = _curry2(function or2(a, b) {
  return a || b;
});
var or_default = or;

// node_modules/ramda/es/either.js
var either = _curry2(function either2(f, g) {
  return _isFunction(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : lift_default(or_default)(f, g);
});
var either_default = either;

// node_modules/ramda/es/internal/_isTypedArray.js
function _isTypedArray(val) {
  var type3 = Object.prototype.toString.call(val);
  return type3 === "[object Uint8ClampedArray]" || type3 === "[object Int8Array]" || type3 === "[object Uint8Array]" || type3 === "[object Int16Array]" || type3 === "[object Uint16Array]" || type3 === "[object Int32Array]" || type3 === "[object Uint32Array]" || type3 === "[object Float32Array]" || type3 === "[object Float64Array]" || type3 === "[object BigInt64Array]" || type3 === "[object BigUint64Array]";
}

// node_modules/ramda/es/empty.js
var empty = _curry1(function empty2(x) {
  return x != null && typeof x["fantasy-land/empty"] === "function" ? x["fantasy-land/empty"]() : x != null && x.constructor != null && typeof x.constructor["fantasy-land/empty"] === "function" ? x.constructor["fantasy-land/empty"]() : x != null && typeof x.empty === "function" ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === "function" ? x.constructor.empty() : isArray_default(x) ? [] : _isString(x) ? "" : _isObject(x) ? {} : isArguments_default(x) ? /* @__PURE__ */ function() {
    return arguments;
  }() : _isTypedArray(x) ? x.constructor.from("") : void 0;
});
var empty_default = empty;

// node_modules/ramda/es/takeLast.js
var takeLast = _curry2(function takeLast2(n, xs) {
  return drop_default(n >= 0 ? xs.length - n : 0, xs);
});
var takeLast_default = takeLast;

// node_modules/ramda/es/endsWith.js
var endsWith = _curry2(function(suffix, list) {
  return equals_default(takeLast_default(suffix.length, list), suffix);
});
var endsWith_default = endsWith;

// node_modules/ramda/es/eqProps.js
var eqProps = _curry3(function eqProps2(prop3, obj1, obj2) {
  return equals_default(obj1[prop3], obj2[prop3]);
});
var eqProps_default = eqProps;

// node_modules/ramda/es/evolve.js
var evolve = _curry2(function evolve2(transformations, object) {
  if (!_isObject(object) && !isArray_default(object)) {
    return object;
  }
  var result = object instanceof Array ? [] : {};
  var transformation, key, type3;
  for (key in object) {
    transformation = transformations[key];
    type3 = typeof transformation;
    result[key] = type3 === "function" ? transformation(object[key]) : transformation && type3 === "object" ? evolve2(transformation, object[key]) : object[key];
  }
  return result;
});
var evolve_default = evolve;

// node_modules/ramda/es/internal/_xfind.js
var XFind = function() {
  function XFind2(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind2.prototype["@@transducer/init"] = xfBase_default.init;
  XFind2.prototype["@@transducer/result"] = function(result) {
    if (!this.found) {
      result = this.xf["@@transducer/step"](result, void 0);
    }
    return this.xf["@@transducer/result"](result);
  };
  XFind2.prototype["@@transducer/step"] = function(result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf["@@transducer/step"](result, input));
    }
    return result;
  };
  return XFind2;
}();
function _xfind(f) {
  return function(xf) {
    return new XFind(f, xf);
  };
}

// node_modules/ramda/es/find.js
var find = _curry2(_dispatchable(["find"], _xfind, function find2(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));
var find_default = find;

// node_modules/ramda/es/internal/_xfindIndex.js
var XFindIndex = function() {
  function XFindIndex2(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }
  XFindIndex2.prototype["@@transducer/init"] = xfBase_default.init;
  XFindIndex2.prototype["@@transducer/result"] = function(result) {
    if (!this.found) {
      result = this.xf["@@transducer/step"](result, -1);
    }
    return this.xf["@@transducer/result"](result);
  };
  XFindIndex2.prototype["@@transducer/step"] = function(result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf["@@transducer/step"](result, this.idx));
    }
    return result;
  };
  return XFindIndex2;
}();
function _xfindIndex(f) {
  return function(xf) {
    return new XFindIndex(f, xf);
  };
}

// node_modules/ramda/es/findIndex.js
var findIndex = _curry2(_dispatchable([], _xfindIndex, function findIndex2(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}));
var findIndex_default = findIndex;

// node_modules/ramda/es/internal/_xfindLast.js
var XFindLast = function() {
  function XFindLast2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFindLast2.prototype["@@transducer/init"] = xfBase_default.init;
  XFindLast2.prototype["@@transducer/result"] = function(result) {
    return this.xf["@@transducer/result"](this.xf["@@transducer/step"](result, this.last));
  };
  XFindLast2.prototype["@@transducer/step"] = function(result, input) {
    if (this.f(input)) {
      this.last = input;
    }
    return result;
  };
  return XFindLast2;
}();
function _xfindLast(f) {
  return function(xf) {
    return new XFindLast(f, xf);
  };
}

// node_modules/ramda/es/findLast.js
var findLast = _curry2(_dispatchable([], _xfindLast, function findLast2(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx -= 1;
  }
}));
var findLast_default = findLast;

// node_modules/ramda/es/internal/_xfindLastIndex.js
var XFindLastIndex = function() {
  function XFindLastIndex2(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }
  XFindLastIndex2.prototype["@@transducer/init"] = xfBase_default.init;
  XFindLastIndex2.prototype["@@transducer/result"] = function(result) {
    return this.xf["@@transducer/result"](this.xf["@@transducer/step"](result, this.lastIdx));
  };
  XFindLastIndex2.prototype["@@transducer/step"] = function(result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.lastIdx = this.idx;
    }
    return result;
  };
  return XFindLastIndex2;
}();
function _xfindLastIndex(f) {
  return function(xf) {
    return new XFindLastIndex(f, xf);
  };
}

// node_modules/ramda/es/findLastIndex.js
var findLastIndex = _curry2(_dispatchable([], _xfindLastIndex, function findLastIndex2(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }
    idx -= 1;
  }
  return -1;
}));
var findLastIndex_default = findLastIndex;

// node_modules/ramda/es/flatten.js
var flatten = _curry1(_makeFlat(true));
var flatten_default = flatten;

// node_modules/ramda/es/flip.js
var flip = _curry1(function flip2(fn) {
  return curryN_default(fn.length, function(a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});
var flip_default = flip;

// node_modules/ramda/es/flow.js
var flow = _curry2(function flow2(seed, pipeline) {
  return reduce_default2(applyTo_default, seed, pipeline);
});
var flow_default = flow;

// node_modules/ramda/es/forEach.js
var forEach = _curry2(_checkForMethod("forEach", function forEach2(fn, list) {
  var len = list.length;
  var idx = 0;
  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }
  return list;
}));
var forEach_default = forEach;

// node_modules/ramda/es/forEachObjIndexed.js
var forEachObjIndexed = _curry2(function forEachObjIndexed2(fn, obj) {
  var keyList = keys_default(obj);
  var idx = 0;
  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }
  return obj;
});
var forEachObjIndexed_default = forEachObjIndexed;

// node_modules/ramda/es/fromPairs.js
var fromPairs = _curry1(function fromPairs2(pairs) {
  var result = {};
  var idx = 0;
  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }
  return result;
});
var fromPairs_default = fromPairs;

// node_modules/ramda/es/groupBy.js
var groupBy = _curry2(_checkForMethod("groupBy", reduceBy_default(function(acc, item) {
  acc.push(item);
  return acc;
}, [])));
var groupBy_default = groupBy;

// node_modules/ramda/es/groupWith.js
var groupWith = _curry2(function(fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    var nextidx = idx + 1;
    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }
    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }
  return res;
});
var groupWith_default = groupWith;

// node_modules/ramda/es/gt.js
var gt = _curry2(function gt2(a, b) {
  return a > b;
});
var gt_default = gt;

// node_modules/ramda/es/gte.js
var gte = _curry2(function gte2(a, b) {
  return a >= b;
});
var gte_default = gte;

// node_modules/ramda/es/hasPath.js
var hasPath = _curry2(function hasPath2(_path2, obj) {
  if (_path2.length === 0 || isNil_default(obj)) {
    return false;
  }
  var val = obj;
  var idx = 0;
  while (idx < _path2.length) {
    if (!isNil_default(val) && _has(_path2[idx], val)) {
      val = val[_path2[idx]];
      idx += 1;
    } else {
      return false;
    }
  }
  return true;
});
var hasPath_default = hasPath;

// node_modules/ramda/es/has.js
var has = _curry2(function has2(prop3, obj) {
  return hasPath_default([prop3], obj);
});
var has_default = has;

// node_modules/ramda/es/hasIn.js
var hasIn = _curry2(function hasIn2(prop3, obj) {
  if (isNil_default(obj)) {
    return false;
  }
  return prop3 in obj;
});
var hasIn_default = hasIn;

// node_modules/ramda/es/identical.js
var identical = function(a, b) {
  switch (arguments.length) {
    case 0:
      return identical;
    case 1:
      return /* @__PURE__ */ function() {
        return function unaryIdentical(_b) {
          switch (arguments.length) {
            case 0:
              return unaryIdentical;
            default:
              return objectIs_default(a, _b);
          }
        };
      }();
    default:
      return objectIs_default(a, b);
  }
};
var identical_default = identical;

// node_modules/ramda/es/ifElse.js
var ifElse = _curry3(function ifElse2(condition, onTrue, onFalse) {
  return curryN_default(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});
var ifElse_default = ifElse;

// node_modules/ramda/es/inc.js
var inc = add_default(1);
var inc_default = inc;

// node_modules/ramda/es/includes.js
var includes = _curry2(_includes);
var includes_default = includes;

// node_modules/ramda/es/indexBy.js
var indexBy = reduceBy_default(function(acc, elem) {
  return elem;
}, null);
var indexBy_default = indexBy;

// node_modules/ramda/es/indexOf.js
var indexOf = _curry2(function indexOf2(target, xs) {
  return typeof xs.indexOf === "function" && !isArray_default(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
});
var indexOf_default = indexOf;

// node_modules/ramda/es/init.js
var init = slice_default(0, -1);
var init_default = init;

// node_modules/ramda/es/innerJoin.js
var innerJoin = _curry3(function innerJoin2(pred, xs, ys) {
  return _filter(function(x) {
    return _includesWith(pred, x, ys);
  }, xs);
});
var innerJoin_default = innerJoin;

// node_modules/ramda/es/insert.js
var insert = _curry3(function insert2(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});
var insert_default = insert;

// node_modules/ramda/es/insertAll.js
var insertAll = _curry3(function insertAll2(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});
var insertAll_default = insertAll;

// node_modules/ramda/es/internal/_xuniqBy.js
var XUniqBy = function() {
  function XUniqBy2(f, xf) {
    this.xf = xf;
    this.f = f;
    this.set = new Set_default();
  }
  XUniqBy2.prototype["@@transducer/init"] = xfBase_default.init;
  XUniqBy2.prototype["@@transducer/result"] = xfBase_default.result;
  XUniqBy2.prototype["@@transducer/step"] = function(result, input) {
    return this.set.add(this.f(input)) ? this.xf["@@transducer/step"](result, input) : result;
  };
  return XUniqBy2;
}();
function _xuniqBy(f) {
  return function(xf) {
    return new XUniqBy(f, xf);
  };
}

// node_modules/ramda/es/uniqBy.js
var uniqBy = _curry2(_dispatchable([], _xuniqBy, function(fn, list) {
  var set3 = new Set_default();
  var result = [];
  var idx = 0;
  var appliedItem, item;
  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (set3.add(appliedItem)) {
      result.push(item);
    }
    idx += 1;
  }
  return result;
}));
var uniqBy_default = uniqBy;

// node_modules/ramda/es/uniq.js
var uniq = uniqBy_default(identity_default);
var uniq_default = uniq;

// node_modules/ramda/es/intersection.js
var intersection = _curry2(function intersection2(list1, list2) {
  var toKeep = new Set_default();
  for (var i = 0; i < list1.length; i += 1) {
    toKeep.add(list1[i]);
  }
  return uniq_default(_filter(toKeep.has.bind(toKeep), list2));
});
var intersection_default = intersection;

// node_modules/ramda/es/intersperse.js
var intersperse = _curry2(_checkForMethod("intersperse", function _intersperse(separator, list) {
  var length3 = list.length;
  if (length3 === 0) {
    return [];
  }
  var out = Array(length3 * 2 - 1);
  var idx = 0;
  while (idx < length3) {
    var i = idx * 2;
    if (idx === length3 - 1) {
      out[i] = list[idx];
    } else {
      out[i] = list[idx];
      out[i + 1] = separator;
    }
    idx += 1;
  }
  return out;
}));
var intersperse_default = intersperse;

// node_modules/ramda/es/internal/_objectAssign.js
function _objectAssign(target) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  var output = Object(target);
  var idx = 1;
  var length3 = arguments.length;
  while (idx < length3) {
    var source = arguments[idx];
    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}
var objectAssign_default = typeof Object.assign === "function" ? Object.assign : _objectAssign;

// node_modules/ramda/es/objOf.js
var objOf = _curry2(function objOf2(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});
var objOf_default = objOf;

// node_modules/ramda/es/internal/_stepCat.js
var _stepCatArray = {
  "@@transducer/init": Array,
  "@@transducer/step": function(xs, x) {
    xs.push(x);
    return xs;
  },
  "@@transducer/result": _identity
};
var _stepCatString = {
  "@@transducer/init": String,
  "@@transducer/step": function(a, b) {
    return a + b;
  },
  "@@transducer/result": _identity
};
var _stepCatObject = {
  "@@transducer/init": Object,
  "@@transducer/step": function(result, input) {
    return objectAssign_default(result, isArrayLike_default(input) ? objOf_default(input[0], input[1]) : input);
  },
  "@@transducer/result": _identity
};
function _stepCat(obj) {
  if (_isTransformer(obj)) {
    return obj;
  }
  if (isArrayLike_default(obj)) {
    return _stepCatArray;
  }
  if (typeof obj === "string") {
    return _stepCatString;
  }
  if (typeof obj === "object") {
    return _stepCatObject;
  }
  throw new Error("Cannot create transformer for " + obj);
}

// node_modules/ramda/es/into.js
var into = _curry3(function into2(acc, transducer, list) {
  var xf = transducer(_isTransformer(acc) ? acc : _stepCat(acc));
  return xReduce_default(xf, xf["@@transducer/init"](), list);
});
var into_default = into;

// node_modules/ramda/es/invert.js
var invert = _curry1(function invert2(obj) {
  var props3 = keys_default(obj);
  var len = props3.length;
  var idx = 0;
  var out = {};
  while (idx < len) {
    var key = props3[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }
  return out;
});
var invert_default = invert;

// node_modules/ramda/es/invertObj.js
var invertObj = _curry1(function invertObj2(obj) {
  var props3 = keys_default(obj);
  var len = props3.length;
  var idx = 0;
  var out = {};
  while (idx < len) {
    var key = props3[idx];
    out[obj[key]] = key;
    idx += 1;
  }
  return out;
});
var invertObj_default = invertObj;

// node_modules/ramda/es/invoker.js
var invoker = _curry2(function invoker2(arity, method) {
  return curryN_default(arity + 1, function() {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString_default(target) + ' does not have a method named "' + method + '"');
  });
});
var invoker_default = invoker;

// node_modules/ramda/es/is.js
var is = _curry2(function is2(Ctor, val) {
  return val instanceof Ctor || val != null && (val.constructor === Ctor || Ctor.name === "Object" && typeof val === "object");
});
var is_default = is;

// node_modules/ramda/es/isEmpty.js
var isEmpty = _curry1(function isEmpty2(x) {
  return x != null && equals_default(x, empty_default(x));
});
var isEmpty_default = isEmpty;

// node_modules/ramda/es/isNotEmpty.js
var isNotEmpty = _curry1(function isNotEmpty2(x) {
  return !isEmpty_default(x);
});
var isNotEmpty_default = isNotEmpty;

// node_modules/ramda/es/isNotNil.js
var isNotNil = _curry1(function isNotNil2(x) {
  return !isNil_default(x);
});
var isNotNil_default = isNotNil;

// node_modules/ramda/es/join.js
var join = invoker_default(1, "join");
var join_default = join;

// node_modules/ramda/es/juxt.js
var juxt = _curry1(function juxt2(fns) {
  return converge_default(function() {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});
var juxt_default = juxt;

// node_modules/ramda/es/keysIn.js
var keysIn = _curry1(function keysIn2(obj) {
  var prop3;
  var ks = [];
  for (prop3 in obj) {
    ks[ks.length] = prop3;
  }
  return ks;
});
var keysIn_default = keysIn;

// node_modules/ramda/es/lastIndexOf.js
var lastIndexOf = _curry2(function lastIndexOf2(target, xs) {
  if (typeof xs.lastIndexOf === "function" && !isArray_default(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;
    while (idx >= 0) {
      if (equals_default(xs[idx], target)) {
        return idx;
      }
      idx -= 1;
    }
    return -1;
  }
});
var lastIndexOf_default = lastIndexOf;

// node_modules/ramda/es/internal/_isNumber.js
function _isNumber(x) {
  return Object.prototype.toString.call(x) === "[object Number]";
}

// node_modules/ramda/es/length.js
var length = _curry1(function length2(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});
var length_default = length;

// node_modules/ramda/es/lens.js
var lens = _curry2(function lens2(getter, setter) {
  return function(toFunctorFn) {
    return function(target) {
      return map_default(function(focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});
var lens_default = lens;

// node_modules/ramda/es/update.js
var update = _curry3(function update2(idx, x, list) {
  return adjust_default(idx, always_default(x), list);
});
var update_default = update;

// node_modules/ramda/es/lensIndex.js
var lensIndex = _curry1(function lensIndex2(n) {
  return lens_default(function(val) {
    return _nth(n, val);
  }, update_default(n));
});
var lensIndex_default = lensIndex;

// node_modules/ramda/es/internal/_path.js
function _path(pathAr, obj) {
  var val = obj;
  for (var i = 0; i < pathAr.length; i += 1) {
    if (val == null) {
      return void 0;
    }
    var p = pathAr[i];
    if (isInteger_default(p)) {
      val = _nth(p, val);
    } else {
      val = val[p];
    }
  }
  return val;
}

// node_modules/ramda/es/lensPath.js
var lensPath = _curry1(function lensPath2(p) {
  return lens_default(function(val) {
    return _path(p, val);
  }, assocPath_default(p));
});
var lensPath_default = lensPath;

// node_modules/ramda/es/lensProp.js
var lensProp = _curry1(function lensProp2(k) {
  return lens_default(prop_default(k), assoc_default(k));
});
var lensProp_default = lensProp;

// node_modules/ramda/es/lt.js
var lt = _curry2(function lt2(a, b) {
  return a < b;
});
var lt_default = lt;

// node_modules/ramda/es/lte.js
var lte = _curry2(function lte2(a, b) {
  return a <= b;
});
var lte_default = lte;

// node_modules/ramda/es/mapAccum.js
var mapAccum = _curry3(function mapAccum2(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = Array(len);
  var tuple = [acc];
  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }
  return [tuple[0], result];
});
var mapAccum_default = mapAccum;

// node_modules/ramda/es/mapAccumRight.js
var mapAccumRight = _curry3(function mapAccumRight2(fn, acc, list) {
  var idx = list.length - 1;
  var result = Array(list.length);
  var tuple = [acc];
  while (idx >= 0) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx -= 1;
  }
  return [tuple[0], result];
});
var mapAccumRight_default = mapAccumRight;

// node_modules/ramda/es/mapObjIndexed.js
var mapObjIndexed = _curry2(function mapObjIndexed2(fn, obj) {
  return _arrayReduce(function(acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys_default(obj));
});
var mapObjIndexed_default = mapObjIndexed;

// node_modules/ramda/es/match.js
var match = _curry2(function match2(rx, str) {
  return str.match(rx) || [];
});
var match_default = match;

// node_modules/ramda/es/mathMod.js
var mathMod = _curry2(function mathMod2(m, p) {
  if (!isInteger_default(m)) {
    return NaN;
  }
  if (!isInteger_default(p) || p < 1) {
    return NaN;
  }
  return (m % p + p) % p;
});
var mathMod_default = mathMod;

// node_modules/ramda/es/maxBy.js
var maxBy = _curry3(function maxBy2(f, a, b) {
  var resultB = f(b);
  return max_default(f(a), resultB) === resultB ? b : a;
});
var maxBy_default = maxBy;

// node_modules/ramda/es/sum.js
var sum = reduce_default(add_default, 0);
var sum_default = sum;

// node_modules/ramda/es/mean.js
var mean = _curry1(function mean2(list) {
  return sum_default(list) / list.length;
});
var mean_default = mean;

// node_modules/ramda/es/median.js
var median = _curry1(function median2(list) {
  var len = list.length;
  if (len === 0) {
    return NaN;
  }
  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean_default(Array.prototype.slice.call(list, 0).sort(function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});
var median_default = median;

// node_modules/ramda/es/memoizeWith.js
var memoizeWith = _curry2(function memoizeWith2(keyGen, fn) {
  var cache = {};
  return _arity(fn.length, function() {
    var key = keyGen.apply(this, arguments);
    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  });
});
var memoizeWith_default = memoizeWith;

// node_modules/ramda/es/mergeAll.js
var mergeAll = _curry1(function mergeAll2(list) {
  return objectAssign_default.apply(null, [{}].concat(list));
});
var mergeAll_default = mergeAll;

// node_modules/ramda/es/mergeWithKey.js
var mergeWithKey = _curry3(function mergeWithKey2(fn, l, r) {
  var result = {};
  var k;
  l = l || {};
  r = r || {};
  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }
  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }
  return result;
});
var mergeWithKey_default = mergeWithKey;

// node_modules/ramda/es/mergeDeepWithKey.js
var mergeDeepWithKey = _curry3(function mergeDeepWithKey2(fn, lObj, rObj) {
  return mergeWithKey_default(function(k, lVal, rVal) {
    if (_isObject(lVal) && _isObject(rVal)) {
      return mergeDeepWithKey2(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});
var mergeDeepWithKey_default = mergeDeepWithKey;

// node_modules/ramda/es/mergeDeepLeft.js
var mergeDeepLeft = _curry2(function mergeDeepLeft2(lObj, rObj) {
  return mergeDeepWithKey_default(function(k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});
var mergeDeepLeft_default = mergeDeepLeft;

// node_modules/ramda/es/mergeDeepRight.js
var mergeDeepRight = _curry2(function mergeDeepRight2(lObj, rObj) {
  return mergeDeepWithKey_default(function(k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});
var mergeDeepRight_default = mergeDeepRight;

// node_modules/ramda/es/mergeDeepWith.js
var mergeDeepWith = _curry3(function mergeDeepWith2(fn, lObj, rObj) {
  return mergeDeepWithKey_default(function(k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});
var mergeDeepWith_default = mergeDeepWith;

// node_modules/ramda/es/mergeLeft.js
var mergeLeft = _curry2(function mergeLeft2(l, r) {
  return objectAssign_default({}, r, l);
});
var mergeLeft_default = mergeLeft;

// node_modules/ramda/es/mergeRight.js
var mergeRight = _curry2(function mergeRight2(l, r) {
  return objectAssign_default({}, l, r);
});
var mergeRight_default = mergeRight;

// node_modules/ramda/es/mergeWith.js
var mergeWith = _curry3(function mergeWith2(fn, l, r) {
  return mergeWithKey_default(function(_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});
var mergeWith_default = mergeWith;

// node_modules/ramda/es/min.js
var min = _curry2(function min2(a, b) {
  if (a === b) {
    return a;
  }
  function safeMin(x, y) {
    if (x < y !== y < x) {
      return y < x ? y : x;
    }
    return void 0;
  }
  var minByValue = safeMin(a, b);
  if (minByValue !== void 0) {
    return minByValue;
  }
  var minByType = safeMin(typeof a, typeof b);
  if (minByType !== void 0) {
    return minByType === typeof a ? a : b;
  }
  var stringA = toString_default(a);
  var minByStringValue = safeMin(stringA, toString_default(b));
  if (minByStringValue !== void 0) {
    return minByStringValue === stringA ? a : b;
  }
  return a;
});
var min_default = min;

// node_modules/ramda/es/minBy.js
var minBy = _curry3(function minBy2(f, a, b) {
  var resultB = f(b);
  return min_default(f(a), resultB) === resultB ? b : a;
});
var minBy_default = minBy;

// node_modules/ramda/es/internal/_modify.js
function _modify(prop3, fn, obj) {
  if (isInteger_default(prop3) && isArray_default(obj)) {
    var arr = [].concat(obj);
    arr[prop3] = fn(arr[prop3]);
    return arr;
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop3] = fn(result[prop3]);
  return result;
}

// node_modules/ramda/es/modifyPath.js
var modifyPath = _curry3(function modifyPath2(path2, fn, object) {
  if (!_isObject(object) && !isArray_default(object)) {
    return object;
  }
  if (path2.length === 0) {
    return fn(object);
  }
  var idx = path2[0];
  if (!_has(idx, object)) {
    return object;
  }
  if (path2.length === 1) {
    return _modify(idx, fn, object);
  }
  var val = modifyPath2(Array.prototype.slice.call(path2, 1), fn, object[idx]);
  if (val === object[idx]) {
    return object;
  }
  return _assoc(idx, val, object);
});
var modifyPath_default = modifyPath;

// node_modules/ramda/es/modify.js
var modify = _curry3(function modify2(prop3, fn, object) {
  return modifyPath_default([prop3], fn, object);
});
var modify_default = modify;

// node_modules/ramda/es/modulo.js
var modulo = _curry2(function modulo2(a, b) {
  return a % b;
});
var modulo_default = modulo;

// node_modules/ramda/es/move.js
var move = _curry3(function(from, to, list) {
  var length3 = list.length;
  var result = list.slice();
  var positiveFrom = from < 0 ? length3 + from : from;
  var positiveTo = to < 0 ? length3 + to : to;
  var item = result.splice(positiveFrom, 1);
  return positiveFrom < 0 || positiveFrom >= list.length || positiveTo < 0 || positiveTo >= list.length ? list : [].concat(result.slice(0, positiveTo)).concat(item).concat(result.slice(positiveTo, list.length));
});
var move_default = move;

// node_modules/ramda/es/multiply.js
var multiply = _curry2(function multiply2(a, b) {
  return a * b;
});
var multiply_default = multiply;

// node_modules/ramda/es/partialObject.js
var partialObject = _curry2((f, o3) => (props3) => f.call(void 0, mergeDeepRight_default(o3, props3)));
var partialObject_default = partialObject;

// node_modules/ramda/es/negate.js
var negate = _curry1(function negate2(n) {
  return -n;
});
var negate_default = negate;

// node_modules/ramda/es/none.js
var none = _curry2(function none2(fn, input) {
  return all_default(_complement(fn), input);
});
var none_default = none;

// node_modules/ramda/es/nth.js
var nth = _curry2(_nth);
var nth_default = nth;

// node_modules/ramda/es/nthArg.js
var nthArg = _curry1(function nthArg2(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN_default(arity, function() {
    return _nth(n, arguments);
  });
});
var nthArg_default = nthArg;

// node_modules/ramda/es/o.js
var o = _curry3(function o2(f, g, x) {
  return f(g(x));
});
var o_default = o;

// node_modules/ramda/es/of.js
var of = _curry2(function of2(Ctor, val) {
  return typeof Ctor["fantasy-land/of"] === "function" ? Ctor["fantasy-land/of"](val) : typeof Ctor.of === "function" ? Ctor.of(val) : [val];
});
var of_default = of;

// node_modules/ramda/es/omit.js
var omit = _curry2(function omit2(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }
  for (var prop3 in obj) {
    if (!index.hasOwnProperty(prop3)) {
      result[prop3] = obj[prop3];
    }
  }
  return result;
});
var omit_default = omit;

// node_modules/ramda/es/on.js
var on = _curryN(4, [], function on2(f, g, a, b) {
  return f(g(a), g(b));
});
var on_default = on;

// node_modules/ramda/es/once.js
var once = _curry1(function once2(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function() {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});
var once_default = once;

// node_modules/ramda/es/internal/_assertPromise.js
function _assertPromise(name, p) {
  if (p == null || !_isFunction(p.then)) {
    throw new TypeError("`" + name + "` expected a Promise, received " + _toString(p, []));
  }
}

// node_modules/ramda/es/otherwise.js
var otherwise = _curry2(function otherwise2(f, p) {
  _assertPromise("otherwise", p);
  return p.then(null, f);
});
var otherwise_default = otherwise;

// node_modules/ramda/es/over.js
var Identity = function(x) {
  return {
    value: x,
    map: function(f) {
      return Identity(f(x));
    }
  };
};
var over = _curry3(function over2(lens3, f, x) {
  return lens3(function(y) {
    return Identity(f(y));
  })(x).value;
});
var over_default = over;

// node_modules/ramda/es/pair.js
var pair = _curry2(function pair2(fst, snd) {
  return [fst, snd];
});
var pair_default = pair;

// node_modules/ramda/es/internal/_createPartialApplicator.js
function _createPartialApplicator(concat3) {
  return _curry2(function(fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function() {
      return fn.apply(this, concat3(args, arguments));
    });
  });
}

// node_modules/ramda/es/partial.js
var partial = _createPartialApplicator(_concat);
var partial_default = partial;

// node_modules/ramda/es/partialRight.js
var partialRight = _createPartialApplicator(flip_default(_concat));
var partialRight_default = partialRight;

// node_modules/ramda/es/partition.js
var partition = juxt_default([filter_default, reject_default]);
var partition_default = partition;

// node_modules/ramda/es/path.js
var path = _curry2(_path);
var path_default = path;

// node_modules/ramda/es/paths.js
var paths = _curry2(function paths2(pathsArray, obj) {
  return pathsArray.map(function(paths3) {
    var val = obj;
    var idx = 0;
    var p;
    while (idx < paths3.length) {
      if (val == null) {
        return;
      }
      p = paths3[idx];
      val = isInteger_default(p) ? _nth(p, val) : val[p];
      idx += 1;
    }
    return val;
  });
});
var paths_default = paths;

// node_modules/ramda/es/pathEq.js
var pathEq = _curry3(function pathEq2(val, pathAr, obj) {
  return equals_default(_path(pathAr, obj), val);
});
var pathEq_default = pathEq;

// node_modules/ramda/es/pathOr.js
var pathOr = _curry3(function pathOr2(d, p, obj) {
  return defaultTo_default(d, _path(p, obj));
});
var pathOr_default = pathOr;

// node_modules/ramda/es/pathSatisfies.js
var pathSatisfies = _curry3(function pathSatisfies2(pred, propPath, obj) {
  return pred(_path(propPath, obj));
});
var pathSatisfies_default = pathSatisfies;

// node_modules/ramda/es/pick.js
var pick = _curry2(function pick2(names, obj) {
  var result = {};
  var idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
});
var pick_default = pick;

// node_modules/ramda/es/pickAll.js
var pickAll = _curry2(function pickAll2(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }
  return result;
});
var pickAll_default = pickAll;

// node_modules/ramda/es/pickBy.js
var pickBy = _curry2(function pickBy2(test3, obj) {
  var result = {};
  for (var prop3 in obj) {
    if (test3(obj[prop3], prop3, obj)) {
      result[prop3] = obj[prop3];
    }
  }
  return result;
});
var pickBy_default = pickBy;

// node_modules/ramda/es/prepend.js
var prepend = _curry2(function prepend2(el, list) {
  return _concat([el], list);
});
var prepend_default = prepend;

// node_modules/ramda/es/product.js
var product = reduce_default(multiply_default, 1);
var product_default = product;

// node_modules/ramda/es/useWith.js
var useWith = _curry2(function useWith2(fn, transformers) {
  return curryN_default(transformers.length, function() {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});
var useWith_default = useWith;

// node_modules/ramda/es/project.js
var project = useWith_default(_map, [pickAll_default, identity_default]);
var project_default = project;

// node_modules/ramda/es/internal/_promap.js
function _promap(f, g, profunctor) {
  return function(x) {
    return g(profunctor(f(x)));
  };
}

// node_modules/ramda/es/internal/_xpromap.js
var XPromap = function() {
  function XPromap2(f, g, xf) {
    this.xf = xf;
    this.f = f;
    this.g = g;
  }
  XPromap2.prototype["@@transducer/init"] = xfBase_default.init;
  XPromap2.prototype["@@transducer/result"] = xfBase_default.result;
  XPromap2.prototype["@@transducer/step"] = function(result, input) {
    return this.xf["@@transducer/step"](result, _promap(this.f, this.g, input));
  };
  return XPromap2;
}();
function _xpromap(f, g) {
  return function(xf) {
    return new XPromap(f, g, xf);
  };
}

// node_modules/ramda/es/promap.js
var promap = _curry3(_dispatchable(["fantasy-land/promap", "promap"], _xpromap, _promap));
var promap_default = promap;

// node_modules/ramda/es/propEq.js
var propEq = _curry3(function propEq2(val, name, obj) {
  return equals_default(val, prop_default(name, obj));
});
var propEq_default = propEq;

// node_modules/ramda/es/propIs.js
var propIs = _curry3(function propIs2(type3, name, obj) {
  return is_default(type3, prop_default(name, obj));
});
var propIs_default = propIs;

// node_modules/ramda/es/propOr.js
var propOr = _curry3(function propOr2(val, p, obj) {
  return defaultTo_default(val, prop_default(p, obj));
});
var propOr_default = propOr;

// node_modules/ramda/es/propSatisfies.js
var propSatisfies = _curry3(function propSatisfies2(pred, name, obj) {
  return pred(prop_default(name, obj));
});
var propSatisfies_default = propSatisfies;

// node_modules/ramda/es/props.js
var props = _curry2(function props2(ps, obj) {
  return ps.map(function(p) {
    return prop_default(p, obj);
  });
});
var props_default = props;

// node_modules/ramda/es/range.js
var range = _curry2(function range2(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError("Both arguments to range must be numbers");
  }
  var result = Array(from < to ? to - from : 0);
  var finish = from < 0 ? to + Math.abs(from) : to - from;
  var idx = 0;
  while (idx < finish) {
    result[idx] = idx + from;
    idx += 1;
  }
  return result;
});
var range_default = range;

// node_modules/ramda/es/reduceRight.js
var reduceRight = _curry3(function reduceRight2(fn, acc, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    acc = fn(list[idx], acc);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    idx -= 1;
  }
  return acc;
});
var reduceRight_default = reduceRight;

// node_modules/ramda/es/reduceWhile.js
var reduceWhile = _curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  var xf = _xwrap(function(acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  });
  return xReduce_default(xf, a, list);
});
var reduceWhile_default = reduceWhile;

// node_modules/ramda/es/reduced.js
var reduced = _curry1(_reduced);
var reduced_default = reduced;

// node_modules/ramda/es/times.js
var times = _curry2(function times2(fn, n) {
  var len = Number(n);
  if (len < 0 || isNaN(len)) {
    throw new RangeError("n must be a non-negative number");
  }
  var idx = 0;
  var list = Array(len);
  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }
  return list;
});
var times_default = times;

// node_modules/ramda/es/repeat.js
var repeat = _curry2(function repeat2(value, n) {
  return times_default(always_default(value), n);
});
var repeat_default = repeat;

// node_modules/ramda/es/replace.js
var replace = _curry3(function replace2(regex, replacement, str) {
  return str.replace(regex, replacement);
});
var replace_default = replace;

// node_modules/ramda/es/internal/_xscan.js
var tInit2 = "@@transducer/init";
var tStep2 = "@@transducer/step";
var XScan = function() {
  function XScan2(reducer, acc, xf) {
    this.xf = xf;
    this.f = reducer;
    this.acc = acc;
  }
  XScan2.prototype[tInit2] = function() {
    return this.xf[tStep2](this.xf[tInit2](), this.acc);
  };
  XScan2.prototype["@@transducer/result"] = xfBase_default.result;
  XScan2.prototype[tStep2] = function(result, input) {
    if (result["@@transducer/reduced"]) {
      return result;
    }
    this.acc = this.f(this.acc, input);
    return this.xf[tStep2](result, this.acc);
  };
  return XScan2;
}();
var _xscan = _curry3(function _xscan2(reducer, acc, xf) {
  return new XScan(reducer, acc, xf);
});
var xscan_default = _xscan;

// node_modules/ramda/es/scan.js
var scan = _curry3(_dispatchable([], xscan_default, function scan2(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = Array(len + 1);
  result[0] = acc;
  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }
  return result;
}));
var scan_default = scan;

// node_modules/ramda/es/sequence.js
var sequence = _curry2(function sequence2(F2, traversable) {
  var of3 = typeof F2["fantasy-land/of"] === "function" ? F2["fantasy-land/of"] : typeof F2.of === "function" ? F2.of : F2;
  var TypeRep = {
    "fantasy-land/of": of3
  };
  return typeof traversable["fantasy-land/traverse"] === "function" ? traversable["fantasy-land/traverse"](TypeRep, _identity) : typeof traversable.traverse === "function" ? traversable.traverse(TypeRep, _identity) : reduceRight_default(function(x, acc) {
    return ap_default(map_default(prepend_default, x), acc);
  }, of3([]), traversable);
});
var sequence_default = sequence;

// node_modules/ramda/es/set.js
var set = _curry3(function set2(lens3, v, x) {
  return over_default(lens3, always_default(v), x);
});
var set_default = set;

// node_modules/ramda/es/sort.js
var sort = _curry2(function sort2(comparator3, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator3);
});
var sort_default = sort;

// node_modules/ramda/es/sortBy.js
var sortBy = _curry2(function sortBy2(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function(a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});
var sortBy_default = sortBy;

// node_modules/ramda/es/sortWith.js
var sortWith = _curry2(function sortWith2(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function(a, b) {
    var result = 0;
    var i = 0;
    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }
    return result;
  });
});
var sortWith_default = sortWith;

// node_modules/ramda/es/split.js
var split = invoker_default(1, "split");
var split_default = split;

// node_modules/ramda/es/splitAt.js
var splitAt = _curry2(function splitAt2(index, array) {
  return [slice_default(0, index, array), slice_default(index, length_default(array), array)];
});
var splitAt_default = splitAt;

// node_modules/ramda/es/splitEvery.js
var splitEvery = _curry2(function splitEvery2(n, list) {
  if (n <= 0) {
    throw new Error("First argument to splitEvery must be a positive integer");
  }
  var result = [];
  var idx = 0;
  while (idx < list.length) {
    result.push(slice_default(idx, idx += n, list));
  }
  return result;
});
var splitEvery_default = splitEvery;

// node_modules/ramda/es/splitWhen.js
var splitWhen = _curry2(function splitWhen2(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];
  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }
  return [prefix, Array.prototype.slice.call(list, idx)];
});
var splitWhen_default = splitWhen;

// node_modules/ramda/es/splitWhenever.js
var splitWhenever = _curryN(2, [], function splitWhenever2(pred, list) {
  var acc = [];
  var curr = [];
  for (var i = 0; i < list.length; i = i + 1) {
    if (!pred(list[i])) {
      curr.push(list[i]);
    }
    if ((i < list.length - 1 && pred(list[i + 1]) || i === list.length - 1) && curr.length > 0) {
      acc.push(curr);
      curr = [];
    }
  }
  return acc;
});
var splitWhenever_default = splitWhenever;

// node_modules/ramda/es/startsWith.js
var startsWith = _curry2(function(prefix, list) {
  return equals_default(take_default(prefix.length, list), prefix);
});
var startsWith_default = startsWith;

// node_modules/ramda/es/subtract.js
var subtract = _curry2(function subtract2(a, b) {
  return Number(a) - Number(b);
});
var subtract_default = subtract;

// node_modules/ramda/es/swap.js
var swapObject = function(indexA, indexB, o3) {
  var copy = clone_default(o3);
  var properties = Object.getOwnPropertyNames(copy);
  if (properties.includes(indexA) && properties.includes(indexB)) {
    var tmp = copy[indexA];
    copy[indexA] = copy[indexB];
    copy[indexB] = tmp;
  }
  return copy;
};
var swapList = function(indexA, indexB, list) {
  var length3 = list.length;
  var result = list.slice();
  var positiveIndexA = indexA < 0 ? length3 + indexA : indexA;
  var positiveIndexB = indexB < 0 ? length3 + indexB : indexB;
  var positiveMin = Math.min(positiveIndexA, positiveIndexB);
  var positiveMax = Math.max(positiveIndexA, positiveIndexB);
  if (positiveIndexA < 0 || positiveIndexA > length3) {
    return result;
  }
  if (positiveIndexB < 0 || positiveIndexB > length3) {
    return result;
  }
  if (positiveIndexA === positiveIndexB) {
    return result;
  }
  result = [].concat(result.slice(0, positiveMin)).concat([result[positiveMax]]).concat(result.slice(positiveMin + 1, positiveMax)).concat([result[positiveMin]]).concat(result.slice(positiveMax + 1, length3));
  return result;
};
var swapString = function(indexA, indexB, s) {
  var result = swapList(indexA, indexB, s);
  return isArray_default(result) ? result.join("") : result;
};
var swap = _curry3(function(indexA, indexB, o3) {
  if (isArray_default(o3)) {
    return swapList(indexA, indexB, o3);
  } else if (_isString(o3)) {
    return swapString(indexA, indexB, o3);
  } else {
    return swapObject(indexA, indexB, o3);
  }
});
var swap_default = swap;

// node_modules/ramda/es/symmetricDifference.js
var symmetricDifference = _curry2(function symmetricDifference2(list1, list2) {
  return concat_default(difference_default(list1, list2), difference_default(list2, list1));
});
var symmetricDifference_default = symmetricDifference;

// node_modules/ramda/es/symmetricDifferenceWith.js
var symmetricDifferenceWith = _curry3(function symmetricDifferenceWith2(pred, list1, list2) {
  return concat_default(differenceWith_default(pred, list1, list2), differenceWith_default(pred, list2, list1));
});
var symmetricDifferenceWith_default = symmetricDifferenceWith;

// node_modules/ramda/es/takeLastWhile.js
var takeLastWhile = _curry2(function takeLastWhile2(fn, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }
  return slice_default(idx + 1, Infinity, xs);
});
var takeLastWhile_default = takeLastWhile;

// node_modules/ramda/es/internal/_xtakeWhile.js
var XTakeWhile = function() {
  function XTakeWhile2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTakeWhile2.prototype["@@transducer/init"] = xfBase_default.init;
  XTakeWhile2.prototype["@@transducer/result"] = xfBase_default.result;
  XTakeWhile2.prototype["@@transducer/step"] = function(result, input) {
    return this.f(input) ? this.xf["@@transducer/step"](result, input) : _reduced(result);
  };
  return XTakeWhile2;
}();
function _xtakeWhile(f) {
  return function(xf) {
    return new XTakeWhile(f, xf);
  };
}

// node_modules/ramda/es/takeWhile.js
var takeWhile = _curry2(_dispatchable(["takeWhile"], _xtakeWhile, function takeWhile2(fn, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }
  return slice_default(0, idx, xs);
}));
var takeWhile_default = takeWhile;

// node_modules/ramda/es/internal/_xtap.js
var XTap = function() {
  function XTap2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTap2.prototype["@@transducer/init"] = xfBase_default.init;
  XTap2.prototype["@@transducer/result"] = xfBase_default.result;
  XTap2.prototype["@@transducer/step"] = function(result, input) {
    this.f(input);
    return this.xf["@@transducer/step"](result, input);
  };
  return XTap2;
}();
function _xtap(f) {
  return function(xf) {
    return new XTap(f, xf);
  };
}

// node_modules/ramda/es/tap.js
var tap = _curry2(_dispatchable([], _xtap, function tap2(fn, x) {
  fn(x);
  return x;
}));
var tap_default = tap;

// node_modules/ramda/es/internal/_isRegExp.js
function _isRegExp(x) {
  return Object.prototype.toString.call(x) === "[object RegExp]";
}

// node_modules/ramda/es/test.js
var test = _curry2(function test2(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError("‘test’ requires a value of type RegExp as its first argument; received " + toString_default(pattern));
  }
  return _cloneRegExp(pattern).test(str);
});
var test_default = test;

// node_modules/ramda/es/andThen.js
var andThen = _curry2(function andThen2(f, p) {
  _assertPromise("andThen", p);
  return p.then(f);
});
var andThen_default = andThen;

// node_modules/ramda/es/toLower.js
var toLower = invoker_default(0, "toLowerCase");
var toLower_default = toLower;

// node_modules/ramda/es/toPairs.js
var toPairs = _curry1(function toPairs2(obj) {
  var pairs = [];
  for (var prop3 in obj) {
    if (_has(prop3, obj)) {
      pairs[pairs.length] = [prop3, obj[prop3]];
    }
  }
  return pairs;
});
var toPairs_default = toPairs;

// node_modules/ramda/es/toPairsIn.js
var toPairsIn = _curry1(function toPairsIn2(obj) {
  var pairs = [];
  for (var prop3 in obj) {
    pairs[pairs.length] = [prop3, obj[prop3]];
  }
  return pairs;
});
var toPairsIn_default = toPairsIn;

// node_modules/ramda/es/toUpper.js
var toUpper = invoker_default(0, "toUpperCase");
var toUpper_default = toUpper;

// node_modules/ramda/es/transduce.js
var transduce = curryN_default(4, function transduce2(xf, fn, acc, list) {
  return xReduce_default(xf(typeof fn === "function" ? _xwrap(fn) : fn), acc, list);
});
var transduce_default = transduce;

// node_modules/ramda/es/transpose.js
var transpose = _curry1(function transpose2(outerlist) {
  var i = 0;
  var result = [];
  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;
    while (j < innerlist.length) {
      if (typeof result[j] === "undefined") {
        result[j] = [];
      }
      result[j].push(innerlist[j]);
      j += 1;
    }
    i += 1;
  }
  return result;
});
var transpose_default = transpose;

// node_modules/ramda/es/traverse.js
var traverse = _curry3(function traverse2(F2, f, traversable) {
  var of3 = typeof F2["fantasy-land/of"] === "function" ? F2["fantasy-land/of"] : typeof F2.of === "function" ? F2.of : F2;
  var TypeRep = {
    "fantasy-land/of": of3
  };
  return typeof traversable["fantasy-land/traverse"] === "function" ? traversable["fantasy-land/traverse"](TypeRep, f) : typeof traversable.traverse === "function" ? traversable.traverse(TypeRep, f) : sequence_default(TypeRep, map_default(f, traversable));
});
var traverse_default = traverse;

// node_modules/ramda/es/trim.js
var ws = "	\n\v\f\r                　\u2028\u2029\uFEFF";
var zeroWidth = "​";
var hasProtoTrim = typeof String.prototype.trim === "function";
var trim = !hasProtoTrim || ws.trim() || !zeroWidth.trim() ? _curry1(function trim2(str) {
  var beginRx = new RegExp("^[" + ws + "][" + ws + "]*");
  var endRx = new RegExp("[" + ws + "][" + ws + "]*$");
  return str.replace(beginRx, "").replace(endRx, "");
}) : _curry1(function trim3(str) {
  return str.trim();
});
var trim_default = trim;

// node_modules/ramda/es/tryCatch.js
var tryCatch = _curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function() {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});
var tryCatch_default = tryCatch;

// node_modules/ramda/es/unapply.js
var unapply = _curry1(function unapply2(fn) {
  return function() {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});
var unapply_default = unapply;

// node_modules/ramda/es/unary.js
var unary = _curry1(function unary2(fn) {
  return nAry_default(1, fn);
});
var unary_default = unary;

// node_modules/ramda/es/uncurryN.js
var uncurryN = _curry2(function uncurryN2(depth, fn) {
  return curryN_default(depth, function() {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;
    while (currentDepth <= depth && typeof value === "function") {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }
    return value;
  });
});
var uncurryN_default = uncurryN;

// node_modules/ramda/es/unfold.js
var unfold = _curry2(function unfold2(fn, seed) {
  var pair3 = fn(seed);
  var result = [];
  while (pair3 && pair3.length) {
    result[result.length] = pair3[0];
    pair3 = fn(pair3[1]);
  }
  return result;
});
var unfold_default = unfold;

// node_modules/ramda/es/union.js
var union = _curry2(compose(uniq_default, _concat));
var union_default = union;

// node_modules/ramda/es/internal/_xuniqWith.js
var XUniqWith = function() {
  function XUniqWith2(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.items = [];
  }
  XUniqWith2.prototype["@@transducer/init"] = xfBase_default.init;
  XUniqWith2.prototype["@@transducer/result"] = xfBase_default.result;
  XUniqWith2.prototype["@@transducer/step"] = function(result, input) {
    if (_includesWith(this.pred, input, this.items)) {
      return result;
    } else {
      this.items.push(input);
      return this.xf["@@transducer/step"](result, input);
    }
  };
  return XUniqWith2;
}();
function _xuniqWith(pred) {
  return function(xf) {
    return new XUniqWith(pred, xf);
  };
}

// node_modules/ramda/es/uniqWith.js
var uniqWith = _curry2(_dispatchable([], _xuniqWith, function(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;
  while (idx < len) {
    item = list[idx];
    if (!_includesWith(pred, item, result)) {
      result[result.length] = item;
    }
    idx += 1;
  }
  return result;
}));
var uniqWith_default = uniqWith;

// node_modules/ramda/es/unionWith.js
var unionWith = _curry3(function unionWith2(pred, list1, list2) {
  return uniqWith_default(pred, _concat(list1, list2));
});
var unionWith_default = unionWith;

// node_modules/ramda/es/unless.js
var unless = _curry3(function unless2(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});
var unless_default = unless;

// node_modules/ramda/es/unnest.js
var unnest = chain_default(_identity);
var unnest_default = unnest;

// node_modules/ramda/es/until.js
var until = _curry3(function until2(pred, fn, init2) {
  var val = init2;
  while (!pred(val)) {
    val = fn(val);
  }
  return val;
});
var until_default = until;

// node_modules/ramda/es/unwind.js
var unwind = _curry2(function(key, object) {
  if (!(key in object && isArray_default(object[key]))) {
    return [object];
  }
  return _map(function(item) {
    return _assoc(key, item, object);
  }, object[key]);
});
var unwind_default = unwind;

// node_modules/ramda/es/valuesIn.js
var valuesIn = _curry1(function valuesIn2(obj) {
  var prop3;
  var vs = [];
  for (prop3 in obj) {
    vs[vs.length] = obj[prop3];
  }
  return vs;
});
var valuesIn_default = valuesIn;

// node_modules/ramda/es/view.js
var Const = function(x) {
  return {
    value: x,
    "fantasy-land/map": function() {
      return this;
    }
  };
};
var view = _curry2(function view2(lens3, x) {
  return lens3(Const)(x).value;
});
var view_default = view;

// node_modules/ramda/es/when.js
var when = _curry3(function when2(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});
var when_default = when;

// node_modules/ramda/es/where.js
var where = _curry2(function where2(spec, testObj) {
  for (var prop3 in spec) {
    if (_has(prop3, spec) && !spec[prop3](testObj[prop3])) {
      return false;
    }
  }
  return true;
});
var where_default = where;

// node_modules/ramda/es/whereAny.js
var whereAny = _curry2(function whereAny2(spec, testObj) {
  for (var prop3 in spec) {
    if (_has(prop3, spec) && spec[prop3](testObj[prop3])) {
      return true;
    }
  }
  return false;
});
var whereAny_default = whereAny;

// node_modules/ramda/es/whereEq.js
var whereEq = _curry2(function whereEq2(spec, testObj) {
  return where_default(map_default(equals_default, spec), testObj);
});
var whereEq_default = whereEq;

// node_modules/ramda/es/without.js
var without = _curry2(function without2(xs, list) {
  var toRemove = new Set_default();
  for (var i = 0; i < xs.length; i += 1) {
    toRemove.add(xs[i]);
  }
  return reject_default(toRemove.has.bind(toRemove), list);
});
var without_default = without;

// node_modules/ramda/es/xor.js
var xor = _curry2(function xor2(a, b) {
  return Boolean(!a ^ !b);
});
var xor_default = xor;

// node_modules/ramda/es/xprod.js
var xprod = _curry2(function xprod2(a, b) {
  var i = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = Array(ilen * jlen);
  while (i < ilen) {
    j = 0;
    while (j < jlen) {
      result[i * jlen + j] = [a[i], b[j]];
      j += 1;
    }
    i += 1;
  }
  return result;
});
var xprod_default = xprod;

// node_modules/ramda/es/zip.js
var zip = _curry2(function zip2(a, b) {
  var len = Math.min(a.length, b.length);
  var rv = Array(len);
  var idx = 0;
  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }
  return rv;
});
var zip_default = zip;

// node_modules/ramda/es/zipObj.js
var zipObj = _curry2(function zipObj2(keys4, values3) {
  var idx = 0;
  var len = Math.min(keys4.length, values3.length);
  var out = {};
  while (idx < len) {
    out[keys4[idx]] = values3[idx];
    idx += 1;
  }
  return out;
});
var zipObj_default = zipObj;

// node_modules/ramda/es/zipWith.js
var zipWith = _curry3(function zipWith2(fn, a, b) {
  var len = Math.min(a.length, b.length);
  var rv = Array(len);
  var idx = 0;
  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }
  return rv;
});
var zipWith_default = zipWith;

// node_modules/ramda/es/thunkify.js
var thunkify = _curry1(function thunkify2(fn) {
  return curryN_default(fn.length, function createThunk() {
    var fnArgs = arguments;
    return function invokeThunk() {
      return fn.apply(this, fnArgs);
    };
  });
});
var thunkify_default = thunkify;
export {
  F_default as F,
  T_default as T,
  __default as __,
  add_default as add,
  addIndex_default as addIndex,
  addIndexRight_default as addIndexRight,
  adjust_default as adjust,
  all_default as all,
  allPass_default as allPass,
  always_default as always,
  and_default as and,
  andThen_default as andThen,
  any_default as any,
  anyPass_default as anyPass,
  ap_default as ap,
  aperture_default as aperture,
  append_default as append,
  apply_default as apply,
  applySpec_default as applySpec,
  applyTo_default as applyTo,
  ascend_default as ascend,
  ascendNatural_default as ascendNatural,
  assoc_default as assoc,
  assocPath_default as assocPath,
  binary_default as binary,
  bind_default as bind,
  both_default as both,
  call_default as call,
  chain_default as chain,
  clamp_default as clamp,
  clone_default as clone,
  collectBy_default as collectBy,
  comparator_default as comparator,
  complement_default as complement,
  compose,
  composeWith_default as composeWith,
  concat_default as concat,
  cond_default as cond,
  construct_default as construct,
  constructN_default as constructN,
  converge_default as converge,
  count_default as count,
  countBy_default as countBy,
  curry_default as curry,
  curryN_default as curryN,
  dec_default as dec,
  defaultTo_default as defaultTo,
  descend_default as descend,
  descendNatural_default as descendNatural,
  difference_default as difference,
  differenceWith_default as differenceWith,
  dissoc_default as dissoc,
  dissocPath_default as dissocPath,
  divide_default as divide,
  drop_default as drop,
  dropLast_default as dropLast,
  dropLastWhile_default as dropLastWhile,
  dropRepeats_default as dropRepeats,
  dropRepeatsBy_default as dropRepeatsBy,
  dropRepeatsWith_default as dropRepeatsWith,
  dropWhile_default as dropWhile,
  either_default as either,
  empty_default as empty,
  endsWith_default as endsWith,
  eqBy_default as eqBy,
  eqProps_default as eqProps,
  equals_default as equals,
  evolve_default as evolve,
  filter_default as filter,
  find_default as find,
  findIndex_default as findIndex,
  findLast_default as findLast,
  findLastIndex_default as findLastIndex,
  flatten_default as flatten,
  flip_default as flip,
  flow_default as flow,
  forEach_default as forEach,
  forEachObjIndexed_default as forEachObjIndexed,
  fromPairs_default as fromPairs,
  groupBy_default as groupBy,
  groupWith_default as groupWith,
  gt_default as gt,
  gte_default as gte,
  has_default as has,
  hasIn_default as hasIn,
  hasPath_default as hasPath,
  head_default as head,
  identical_default as identical,
  identity_default as identity,
  ifElse_default as ifElse,
  inc_default as inc,
  includes_default as includes,
  indexBy_default as indexBy,
  indexOf_default as indexOf,
  init_default as init,
  innerJoin_default as innerJoin,
  insert_default as insert,
  insertAll_default as insertAll,
  intersection_default as intersection,
  intersperse_default as intersperse,
  into_default as into,
  invert_default as invert,
  invertObj_default as invertObj,
  invoker_default as invoker,
  is_default as is,
  isEmpty_default as isEmpty,
  isNil_default as isNil,
  isNotEmpty_default as isNotEmpty,
  isNotNil_default as isNotNil,
  join_default as join,
  juxt_default as juxt,
  keys_default as keys,
  keysIn_default as keysIn,
  last_default as last,
  lastIndexOf_default as lastIndexOf,
  length_default as length,
  lens_default as lens,
  lensIndex_default as lensIndex,
  lensPath_default as lensPath,
  lensProp_default as lensProp,
  lift_default as lift,
  liftN_default as liftN,
  lt_default as lt,
  lte_default as lte,
  map_default as map,
  mapAccum_default as mapAccum,
  mapAccumRight_default as mapAccumRight,
  mapObjIndexed_default as mapObjIndexed,
  match_default as match,
  mathMod_default as mathMod,
  max_default as max,
  maxBy_default as maxBy,
  mean_default as mean,
  median_default as median,
  memoizeWith_default as memoizeWith,
  mergeAll_default as mergeAll,
  mergeDeepLeft_default as mergeDeepLeft,
  mergeDeepRight_default as mergeDeepRight,
  mergeDeepWith_default as mergeDeepWith,
  mergeDeepWithKey_default as mergeDeepWithKey,
  mergeLeft_default as mergeLeft,
  mergeRight_default as mergeRight,
  mergeWith_default as mergeWith,
  mergeWithKey_default as mergeWithKey,
  min_default as min,
  minBy_default as minBy,
  modify_default as modify,
  modifyPath_default as modifyPath,
  modulo_default as modulo,
  move_default as move,
  multiply_default as multiply,
  nAry_default as nAry,
  negate_default as negate,
  none_default as none,
  not_default as not,
  nth_default as nth,
  nthArg_default as nthArg,
  o_default as o,
  objOf_default as objOf,
  of_default as of,
  omit_default as omit,
  on_default as on,
  once_default as once,
  or_default as or,
  otherwise_default as otherwise,
  over_default as over,
  pair_default as pair,
  partial_default as partial,
  partialObject_default as partialObject,
  partialRight_default as partialRight,
  partition_default as partition,
  path_default as path,
  pathEq_default as pathEq,
  pathOr_default as pathOr,
  pathSatisfies_default as pathSatisfies,
  paths_default as paths,
  pick_default as pick,
  pickAll_default as pickAll,
  pickBy_default as pickBy,
  pipe,
  pipeWith_default as pipeWith,
  pluck_default as pluck,
  prepend_default as prepend,
  product_default as product,
  project_default as project,
  promap_default as promap,
  prop_default as prop,
  propEq_default as propEq,
  propIs_default as propIs,
  propOr_default as propOr,
  propSatisfies_default as propSatisfies,
  props_default as props,
  range_default as range,
  reduce_default as reduce,
  reduceBy_default as reduceBy,
  reduceRight_default as reduceRight,
  reduceWhile_default as reduceWhile,
  reduced_default as reduced,
  reject_default as reject,
  remove_default as remove,
  repeat_default as repeat,
  replace_default as replace,
  reverse_default as reverse,
  scan_default as scan,
  sequence_default as sequence,
  set_default as set,
  slice_default as slice,
  sort_default as sort,
  sortBy_default as sortBy,
  sortWith_default as sortWith,
  split_default as split,
  splitAt_default as splitAt,
  splitEvery_default as splitEvery,
  splitWhen_default as splitWhen,
  splitWhenever_default as splitWhenever,
  startsWith_default as startsWith,
  subtract_default as subtract,
  sum_default as sum,
  swap_default as swap,
  symmetricDifference_default as symmetricDifference,
  symmetricDifferenceWith_default as symmetricDifferenceWith,
  tail_default as tail,
  take_default as take,
  takeLast_default as takeLast,
  takeLastWhile_default as takeLastWhile,
  takeWhile_default as takeWhile,
  tap_default as tap,
  test_default as test,
  thunkify_default as thunkify,
  times_default as times,
  toLower_default as toLower,
  toPairs_default as toPairs,
  toPairsIn_default as toPairsIn,
  toString_default as toString,
  toUpper_default as toUpper,
  transduce_default as transduce,
  transpose_default as transpose,
  traverse_default as traverse,
  trim_default as trim,
  tryCatch_default as tryCatch,
  type_default as type,
  unapply_default as unapply,
  unary_default as unary,
  uncurryN_default as uncurryN,
  unfold_default as unfold,
  union_default as union,
  unionWith_default as unionWith,
  uniq_default as uniq,
  uniqBy_default as uniqBy,
  uniqWith_default as uniqWith,
  unless_default as unless,
  unnest_default as unnest,
  until_default as until,
  unwind_default as unwind,
  update_default as update,
  useWith_default as useWith,
  values_default as values,
  valuesIn_default as valuesIn,
  view_default as view,
  when_default as when,
  where_default as where,
  whereAny_default as whereAny,
  whereEq_default as whereEq,
  without_default as without,
  xor_default as xor,
  xprod_default as xprod,
  zip_default as zip,
  zipObj_default as zipObj,
  zipWith_default as zipWith
};
//# sourceMappingURL=ramda.js.map
