import {
  BasePlugin
} from "./chunk-NSZ4VRGI.js";
import {
  __async,
  __commonJS,
  __objRest,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-APYJOV5E.js";

// node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/requires-port/index.js"(exports, module) {
    "use strict";
    module.exports = function required(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port) return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    };
  }
});

// node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "node_modules/querystringify/index.js"(exports) {
    "use strict";
    var has2 = Object.prototype.hasOwnProperty;
    var undef;
    function decode2(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    function encode2(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser.exec(query)) {
        var key = decode2(part[1]), value = decode2(part[2]);
        if (key === null || value === null || key in result) continue;
        result[key] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix) prefix = "?";
      for (key in obj) {
        if (has2.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode2(key);
          value = encode2(value);
          if (key === null || value === null) continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    exports.stringify = querystringify;
    exports.parse = querystring;
  }
});

// node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "node_modules/url-parse/index.js"(exports, module) {
    "use strict";
    var required = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      },
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1]
      // Set left over.
    ];
    var ignore = {
      hash: 1,
      query: 1
    };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined") globalVar = window;
      else if (typeof global !== "undefined") globalVar = global;
      else if (typeof self !== "undefined") globalVar = self;
      else globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore) delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore) continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    function resolve(relative, base) {
      if (relative === "") return base;
      var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
      while (i--) {
        if (path[i] === ".") {
          path.splice(i, 1);
        } else if (path[i] === "..") {
          path.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0) unshift = true;
          path.splice(i, 1);
          up--;
        }
      }
      if (unshift) path.unshift("");
      if (last === "." || last === "..") path.push("");
      return path.join("/");
    }
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser) parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || relative && location.slashes;
      url.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url);
          continue;
        }
        parse = instruction[0];
        key = instruction[1];
        if (parse !== parse) {
          url[key] = address;
        } else if ("string" === typeof parse) {
          index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse.exec(address)) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }
        url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4]) url[key] = url[key].toLowerCase();
      }
      if (parser) url.query = parser(url.query);
      if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
        url.pathname = resolve(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
        url.pathname = "/" + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = "";
      }
      url.username = url.password = "";
      if (url.auth) {
        index = url.auth.indexOf(":");
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
      }
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
    }
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case "port":
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = "";
          } else if (value) {
            url.host = url.hostname + ":" + value;
          }
          break;
        case "hostname":
          url[part] = value;
          if (url.port) value += ":" + url.port;
          url.host = value;
          break;
        case "host":
          url[part] = value;
          if (port.test(value)) {
            value = value.split(":");
            url.port = value.pop();
            url.hostname = value.join(":");
          } else {
            url.hostname = value;
            url.port = "";
          }
          break;
        case "protocol":
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case "username":
        case "password":
          url[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password ? url.username + ":" + url.password : url.username;
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
      return url;
    }
    function toString(stringify) {
      if (!stringify || "function" !== typeof stringify) stringify = qs.stringify;
      var query, url = this, host = url.host, protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":") protocol += ":";
      var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
      if (url.username) {
        result += url.username;
        if (url.password) result += ":" + url.password;
        result += "@";
      } else if (url.password) {
        result += ":" + url.password;
        result += "@";
      } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
        host += ":";
      }
      result += host + url.pathname;
      query = "object" === typeof url.query ? stringify(url.query) : url.query;
      if (query) result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url.hash) result += url.hash;
      return result;
    }
    Url.prototype = {
      set,
      toString
    };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module.exports = Url;
  }
});

// node_modules/js-base64/base64.mjs
var version = "3.7.7";
var VERSION = version;
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
  let u32, c0, c1, c2, asc = "";
  const pad = bin.length % 3;
  for (let i = 0; i < bin.length; ) {
    if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255) throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i = 0, l = u8a.length; i < l; i += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
  }
  return _btoa(strs.join(""));
};
var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
var cb_utob = (c) => {
  if (c.length < 2) {
    var cc = c.charCodeAt(0);
    return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u) => u.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var encodeURI = (src) => encode(src, true);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc) => {
  asc = asc.replace(/\s+/g, "");
  if (!b64re.test(asc)) throw new TypeError("malformed base64.");
  asc += "==".slice(2 - (asc.length & 3));
  let u24, bin = "", r1, r2;
  for (let i = 0; i < asc.length; ) {
    u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
    bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
  }
  return bin;
};
var _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
var toUint8Array = (a) => _toUint8Array(_unURI(a));
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));
var isValid = (src) => {
  if (typeof src !== "string") return false;
  const s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
  return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
var _noEnum = (v) => {
  return {
    value: v,
    enumerable: false,
    writable: true,
    configurable: true
  };
};
var extendString = function() {
  const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
  _add("fromBase64", function() {
    return decode(this);
  });
  _add("toBase64", function(urlsafe) {
    return encode(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return encode(this, true);
  });
  _add("toBase64URL", function() {
    return encode(this, true);
  });
  _add("toUint8Array", function() {
    return toUint8Array(this);
  });
};
var extendUint8Array = function() {
  const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
  _add("toBase64", function(urlsafe) {
    return fromUint8Array(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return fromUint8Array(this, true);
  });
  _add("toBase64URL", function() {
    return fromUint8Array(this, true);
  });
};
var extendBuiltins = () => {
  extendString();
  extendUint8Array();
};
var gBase64 = {
  version,
  VERSION,
  atob: _atob,
  atobPolyfill,
  btoa: _btoa,
  btoaPolyfill,
  fromBase64: decode,
  toBase64: encode,
  encode,
  encodeURI,
  encodeURL: encodeURI,
  utob,
  btou,
  decode,
  isValid,
  fromUint8Array,
  toUint8Array,
  extendString,
  extendUint8Array,
  extendBuiltins
};

// node_modules/tus-js-client/lib.esm/upload.js
var import_url_parse = __toESM(require_url_parse());

// node_modules/tus-js-client/lib.esm/error.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2)) return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2) _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _isNativeFunction(fn) {
  try {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  } catch (e) {
    return typeof fn === "function";
  }
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
var DetailedError = function(_Error) {
  _inherits(DetailedError2, _Error);
  var _super = _createSuper(DetailedError2);
  function DetailedError2(message) {
    var _this;
    var causingErr = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var req = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var res = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    _classCallCheck(this, DetailedError2);
    _this = _super.call(this, message);
    _this.originalRequest = req;
    _this.originalResponse = res;
    _this.causingError = causingErr;
    if (causingErr != null) {
      message += ", caused by ".concat(causingErr.toString());
    }
    if (req != null) {
      var requestId = req.getHeader("X-Request-ID") || "n/a";
      var method = req.getMethod();
      var url = req.getURL();
      var status = res ? res.getStatus() : "n/a";
      var body = res ? res.getBody() || "" : "n/a";
      message += ", originated from request (method: ".concat(method, ", url: ").concat(url, ", response code: ").concat(status, ", response text: ").concat(body, ", request id: ").concat(requestId, ")");
    }
    _this.message = message;
    return _this;
  }
  return _createClass(DetailedError2);
}(_wrapNativeSuper(Error));
var error_default = DetailedError;

// node_modules/tus-js-client/lib.esm/logger.js
var isEnabled = false;
function log(msg) {
  if (!isEnabled) return;
  console.log(msg);
}

// node_modules/tus-js-client/lib.esm/uuid.js
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    var v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}

// node_modules/tus-js-client/lib.esm/upload.js
function _regeneratorRuntime() {
  "use strict";
  _regeneratorRuntime = function _regeneratorRuntime3() {
    return e;
  };
  var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function(t2, e2, r2) {
    t2[e2] = r2.value;
  }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag";
  function define(t2, e2, r2) {
    return Object.defineProperty(t2, e2, {
      value: r2,
      enumerable: true,
      configurable: true,
      writable: true
    }), t2[e2];
  }
  try {
    define({}, "");
  } catch (t2) {
    define = function define2(t3, e2, r2) {
      return t3[e2] = r2;
    };
  }
  function wrap(t2, e2, r2, n2) {
    var i2 = e2 && e2.prototype instanceof Generator ? e2 : Generator, a2 = Object.create(i2.prototype), c2 = new Context(n2 || []);
    return o(a2, "_invoke", {
      value: makeInvokeMethod(t2, r2, c2)
    }), a2;
  }
  function tryCatch(t2, e2, r2) {
    try {
      return {
        type: "normal",
        arg: t2.call(e2, r2)
      };
    } catch (t3) {
      return {
        type: "throw",
        arg: t3
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var p = {};
  define(p, a, function() {
    return this;
  });
  var d = Object.getPrototypeOf, v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t2) {
    ["next", "throw", "return"].forEach(function(e2) {
      define(t2, e2, function(t3) {
        return this._invoke(e2, t3);
      });
    });
  }
  function AsyncIterator(t2, e2) {
    function invoke(r3, o2, i2, a2) {
      var c2 = tryCatch(t2[r3], t2, o2);
      if ("throw" !== c2.type) {
        var u2 = c2.arg, h2 = u2.value;
        return h2 && "object" == _typeof2(h2) && n.call(h2, "__await") ? e2.resolve(h2.__await).then(function(t3) {
          invoke("next", t3, i2, a2);
        }, function(t3) {
          invoke("throw", t3, i2, a2);
        }) : e2.resolve(h2).then(function(t3) {
          u2.value = t3, i2(u2);
        }, function(t3) {
          return invoke("throw", t3, i2, a2);
        });
      }
      a2(c2.arg);
    }
    var r2;
    o(this, "_invoke", {
      value: function value(t3, n2) {
        function callInvokeWithMethodAndArg() {
          return new e2(function(e3, r3) {
            invoke(t3, n2, e3, r3);
          });
        }
        return r2 = r2 ? r2.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e2, r2, n2) {
    var o2 = h;
    return function(i2, a2) {
      if (o2 === f) throw new Error("Generator is already running");
      if (o2 === s) {
        if ("throw" === i2) throw a2;
        return {
          value: t,
          done: true
        };
      }
      for (n2.method = i2, n2.arg = a2; ; ) {
        var c2 = n2.delegate;
        if (c2) {
          var u2 = maybeInvokeDelegate(c2, n2);
          if (u2) {
            if (u2 === y) continue;
            return u2;
          }
        }
        if ("next" === n2.method) n2.sent = n2._sent = n2.arg;
        else if ("throw" === n2.method) {
          if (o2 === h) throw o2 = s, n2.arg;
          n2.dispatchException(n2.arg);
        } else "return" === n2.method && n2.abrupt("return", n2.arg);
        o2 = f;
        var p2 = tryCatch(e2, r2, n2);
        if ("normal" === p2.type) {
          if (o2 = n2.done ? s : l, p2.arg === y) continue;
          return {
            value: p2.arg,
            done: n2.done
          };
        }
        "throw" === p2.type && (o2 = s, n2.method = "throw", n2.arg = p2.arg);
      }
    };
  }
  function maybeInvokeDelegate(e2, r2) {
    var n2 = r2.method, o2 = e2.iterator[n2];
    if (o2 === t) return r2.delegate = null, "throw" === n2 && e2.iterator["return"] && (r2.method = "return", r2.arg = t, maybeInvokeDelegate(e2, r2), "throw" === r2.method) || "return" !== n2 && (r2.method = "throw", r2.arg = new TypeError("The iterator does not provide a '" + n2 + "' method")), y;
    var i2 = tryCatch(o2, e2.iterator, r2.arg);
    if ("throw" === i2.type) return r2.method = "throw", r2.arg = i2.arg, r2.delegate = null, y;
    var a2 = i2.arg;
    return a2 ? a2.done ? (r2[e2.resultName] = a2.value, r2.next = e2.nextLoc, "return" !== r2.method && (r2.method = "next", r2.arg = t), r2.delegate = null, y) : a2 : (r2.method = "throw", r2.arg = new TypeError("iterator result is not an object"), r2.delegate = null, y);
  }
  function pushTryEntry(t2) {
    var e2 = {
      tryLoc: t2[0]
    };
    1 in t2 && (e2.catchLoc = t2[1]), 2 in t2 && (e2.finallyLoc = t2[2], e2.afterLoc = t2[3]), this.tryEntries.push(e2);
  }
  function resetTryEntry(t2) {
    var e2 = t2.completion || {};
    e2.type = "normal", delete e2.arg, t2.completion = e2;
  }
  function Context(t2) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t2.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(e2) {
    if (e2 || "" === e2) {
      var r2 = e2[a];
      if (r2) return r2.call(e2);
      if ("function" == typeof e2.next) return e2;
      if (!isNaN(e2.length)) {
        var o2 = -1, i2 = function next() {
          for (; ++o2 < e2.length; ) if (n.call(e2, o2)) return next.value = e2[o2], next.done = false, next;
          return next.value = t, next.done = true, next;
        };
        return i2.next = i2;
      }
    }
    throw new TypeError(_typeof2(e2) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function(t2) {
    var e2 = "function" == typeof t2 && t2.constructor;
    return !!e2 && (e2 === GeneratorFunction || "GeneratorFunction" === (e2.displayName || e2.name));
  }, e.mark = function(t2) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t2, GeneratorFunctionPrototype) : (t2.__proto__ = GeneratorFunctionPrototype, define(t2, u, "GeneratorFunction")), t2.prototype = Object.create(g), t2;
  }, e.awrap = function(t2) {
    return {
      __await: t2
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function() {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function(t2, r2, n2, o2, i2) {
    void 0 === i2 && (i2 = Promise);
    var a2 = new AsyncIterator(wrap(t2, r2, n2, o2), i2);
    return e.isGeneratorFunction(r2) ? a2 : a2.next().then(function(t3) {
      return t3.done ? t3.value : a2.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function() {
    return this;
  }), define(g, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(t2) {
    var e2 = Object(t2), r2 = [];
    for (var n2 in e2) r2.push(n2);
    return r2.reverse(), function next() {
      for (; r2.length; ) {
        var t3 = r2.pop();
        if (t3 in e2) return next.value = t3, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e2) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e2) for (var r2 in this) "t" === r2.charAt(0) && n.call(this, r2) && !isNaN(+r2.slice(1)) && (this[r2] = t);
    },
    stop: function stop() {
      this.done = true;
      var t2 = this.tryEntries[0].completion;
      if ("throw" === t2.type) throw t2.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e2) {
      if (this.done) throw e2;
      var r2 = this;
      function handle(n2, o3) {
        return a2.type = "throw", a2.arg = e2, r2.next = n2, o3 && (r2.method = "next", r2.arg = t), !!o3;
      }
      for (var o2 = this.tryEntries.length - 1; o2 >= 0; --o2) {
        var i2 = this.tryEntries[o2], a2 = i2.completion;
        if ("root" === i2.tryLoc) return handle("end");
        if (i2.tryLoc <= this.prev) {
          var c2 = n.call(i2, "catchLoc"), u2 = n.call(i2, "finallyLoc");
          if (c2 && u2) {
            if (this.prev < i2.catchLoc) return handle(i2.catchLoc, true);
            if (this.prev < i2.finallyLoc) return handle(i2.finallyLoc);
          } else if (c2) {
            if (this.prev < i2.catchLoc) return handle(i2.catchLoc, true);
          } else {
            if (!u2) throw new Error("try statement without catch or finally");
            if (this.prev < i2.finallyLoc) return handle(i2.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t2, e2) {
      for (var r2 = this.tryEntries.length - 1; r2 >= 0; --r2) {
        var o2 = this.tryEntries[r2];
        if (o2.tryLoc <= this.prev && n.call(o2, "finallyLoc") && this.prev < o2.finallyLoc) {
          var i2 = o2;
          break;
        }
      }
      i2 && ("break" === t2 || "continue" === t2) && i2.tryLoc <= e2 && e2 <= i2.finallyLoc && (i2 = null);
      var a2 = i2 ? i2.completion : {};
      return a2.type = t2, a2.arg = e2, i2 ? (this.method = "next", this.next = i2.finallyLoc, y) : this.complete(a2);
    },
    complete: function complete(t2, e2) {
      if ("throw" === t2.type) throw t2.arg;
      return "break" === t2.type || "continue" === t2.type ? this.next = t2.arg : "return" === t2.type ? (this.rval = this.arg = t2.arg, this.method = "return", this.next = "end") : "normal" === t2.type && e2 && (this.next = e2), y;
    },
    finish: function finish(t2) {
      for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
        var r2 = this.tryEntries[e2];
        if (r2.finallyLoc === t2) return this.complete(r2.completion, r2.afterLoc), resetTryEntry(r2), y;
      }
    },
    "catch": function _catch(t2) {
      for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
        var r2 = this.tryEntries[e2];
        if (r2.tryLoc === t2) {
          var n2 = r2.completion;
          if ("throw" === n2.type) {
            var o2 = n2.arg;
            resetTryEntry(r2);
          }
          return o2;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e2, r2, n2) {
      return this.delegate = {
        iterator: values(e2),
        resultName: r2,
        nextLoc: n2
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function asyncGeneratorStep(gen, resolve, reject, _next3, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next3, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self2, args);
      function _next3(value) {
        asyncGeneratorStep(gen, resolve, reject, _next3, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next3, _throw, "throw", err);
      }
      _next3(void 0);
    });
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len2) {
  if (len2 == null || len2 > arr.length) len2 = arr.length;
  for (var i = 0, arr2 = new Array(len2); i < len2; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey2(arg) {
  var key = _toPrimitive2(arg, "string");
  return _typeof2(key) === "symbol" ? key : String(key);
}
function _toPrimitive2(input, hint) {
  if (_typeof2(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof2(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var defaultOptions = {
  endpoint: null,
  uploadUrl: null,
  metadata: {},
  fingerprint: null,
  uploadSize: null,
  onProgress: null,
  onChunkComplete: null,
  onSuccess: null,
  onError: null,
  onUploadUrlAvailable: null,
  overridePatchMethod: false,
  headers: {},
  addRequestId: false,
  onBeforeRequest: null,
  onAfterResponse: null,
  onShouldRetry: defaultOnShouldRetry,
  chunkSize: Infinity,
  retryDelays: [0, 1e3, 3e3, 5e3],
  parallelUploads: 1,
  parallelUploadBoundaries: null,
  storeFingerprintForResuming: true,
  removeFingerprintOnSuccess: false,
  uploadLengthDeferred: false,
  uploadDataDuringCreation: false,
  urlStorage: null,
  fileReader: null,
  httpStack: null
};
var BaseUpload = function() {
  function BaseUpload2(file, options) {
    _classCallCheck2(this, BaseUpload2);
    if ("resume" in options) {
      console.log("tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead.");
    }
    this.options = options;
    this.options.chunkSize = Number(this.options.chunkSize);
    this._urlStorage = this.options.urlStorage;
    this.file = file;
    this.url = null;
    this._req = null;
    this._fingerprint = null;
    this._urlStorageKey = null;
    this._offset = null;
    this._aborted = false;
    this._size = null;
    this._source = null;
    this._retryAttempt = 0;
    this._retryTimeout = null;
    this._offsetBeforeRetry = 0;
    this._parallelUploads = null;
    this._parallelUploadUrls = null;
  }
  _createClass2(BaseUpload2, [{
    key: "findPreviousUploads",
    value: function findPreviousUploads() {
      var _this = this;
      return this.options.fingerprint(this.file, this.options).then(function(fingerprint2) {
        return _this._urlStorage.findUploadsByFingerprint(fingerprint2);
      });
    }
  }, {
    key: "resumeFromPreviousUpload",
    value: function resumeFromPreviousUpload(previousUpload) {
      this.url = previousUpload.uploadUrl || null;
      this._parallelUploadUrls = previousUpload.parallelUploadUrls || null;
      this._urlStorageKey = previousUpload.urlStorageKey;
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;
      var file = this.file;
      if (!file) {
        this._emitError(new Error("tus: no file or stream to upload provided"));
        return;
      }
      if (!this.options.endpoint && !this.options.uploadUrl && !this.url) {
        this._emitError(new Error("tus: neither an endpoint or an upload URL is provided"));
        return;
      }
      var retryDelays = this.options.retryDelays;
      if (retryDelays != null && Object.prototype.toString.call(retryDelays) !== "[object Array]") {
        this._emitError(new Error("tus: the `retryDelays` option must either be an array or null"));
        return;
      }
      if (this.options.parallelUploads > 1) {
        for (var _i = 0, _arr = ["uploadUrl", "uploadSize", "uploadLengthDeferred"]; _i < _arr.length; _i++) {
          var optionName = _arr[_i];
          if (this.options[optionName]) {
            this._emitError(new Error("tus: cannot use the ".concat(optionName, " option when parallelUploads is enabled")));
            return;
          }
        }
      }
      if (this.options.parallelUploadBoundaries) {
        if (this.options.parallelUploads <= 1) {
          this._emitError(new Error("tus: cannot use the `parallelUploadBoundaries` option when `parallelUploads` is disabled"));
          return;
        }
        if (this.options.parallelUploads !== this.options.parallelUploadBoundaries.length) {
          this._emitError(new Error("tus: the `parallelUploadBoundaries` must have the same length as the value of `parallelUploads`"));
          return;
        }
      }
      this.options.fingerprint(file, this.options).then(function(fingerprint2) {
        if (fingerprint2 == null) {
          log("No fingerprint was calculated meaning that the upload cannot be stored in the URL storage.");
        } else {
          log("Calculated fingerprint: ".concat(fingerprint2));
        }
        _this2._fingerprint = fingerprint2;
        if (_this2._source) {
          return _this2._source;
        }
        return _this2.options.fileReader.openFile(file, _this2.options.chunkSize);
      }).then(function(source) {
        _this2._source = source;
        if (_this2.options.uploadLengthDeferred) {
          _this2._size = null;
        } else if (_this2.options.uploadSize != null) {
          _this2._size = Number(_this2.options.uploadSize);
          if (Number.isNaN(_this2._size)) {
            _this2._emitError(new Error("tus: cannot convert `uploadSize` option into a number"));
            return;
          }
        } else {
          _this2._size = _this2._source.size;
          if (_this2._size == null) {
            _this2._emitError(new Error("tus: cannot automatically derive upload's size from input. Specify it manually using the `uploadSize` option or use the `uploadLengthDeferred` option"));
            return;
          }
        }
        if (_this2.options.parallelUploads > 1 || _this2._parallelUploadUrls != null) {
          _this2._startParallelUpload();
        } else {
          _this2._startSingleUpload();
        }
      })["catch"](function(err) {
        _this2._emitError(err);
      });
    }
    /**
     * Initiate the uploading procedure for a parallelized upload, where one file is split into
     * multiple request which are run in parallel.
     *
     * @api private
     */
  }, {
    key: "_startParallelUpload",
    value: function _startParallelUpload() {
      var _this$options$paralle, _this3 = this;
      var totalSize = this._size;
      var totalProgress = 0;
      this._parallelUploads = [];
      var partCount = this._parallelUploadUrls != null ? this._parallelUploadUrls.length : this.options.parallelUploads;
      var parts = (_this$options$paralle = this.options.parallelUploadBoundaries) !== null && _this$options$paralle !== void 0 ? _this$options$paralle : splitSizeIntoParts(this._source.size, partCount);
      if (this._parallelUploadUrls) {
        parts.forEach(function(part, index) {
          part.uploadUrl = _this3._parallelUploadUrls[index] || null;
        });
      }
      this._parallelUploadUrls = new Array(parts.length);
      var uploads = parts.map(function(part, index) {
        var lastPartProgress = 0;
        return _this3._source.slice(part.start, part.end).then(function(_ref) {
          var value = _ref.value;
          return new Promise(function(resolve, reject) {
            var options = _objectSpread(_objectSpread({}, _this3.options), {}, {
              // If available, the partial upload should be resumed from a previous URL.
              uploadUrl: part.uploadUrl || null,
              // We take manually care of resuming for partial uploads, so they should
              // not be stored in the URL storage.
              storeFingerprintForResuming: false,
              removeFingerprintOnSuccess: false,
              // Reset the parallelUploads option to not cause recursion.
              parallelUploads: 1,
              // Reset this option as we are not doing a parallel upload.
              parallelUploadBoundaries: null,
              metadata: {},
              // Add the header to indicate the this is a partial upload.
              headers: _objectSpread(_objectSpread({}, _this3.options.headers), {}, {
                "Upload-Concat": "partial"
              }),
              // Reject or resolve the promise if the upload errors or completes.
              onSuccess: resolve,
              onError: reject,
              // Based in the progress for this partial upload, calculate the progress
              // for the entire final upload.
              onProgress: function onProgress(newPartProgress) {
                totalProgress = totalProgress - lastPartProgress + newPartProgress;
                lastPartProgress = newPartProgress;
                _this3._emitProgress(totalProgress, totalSize);
              },
              // Wait until every partial upload has an upload URL, so we can add
              // them to the URL storage.
              onUploadUrlAvailable: function onUploadUrlAvailable() {
                _this3._parallelUploadUrls[index] = upload.url;
                if (_this3._parallelUploadUrls.filter(function(u) {
                  return Boolean(u);
                }).length === parts.length) {
                  _this3._saveUploadInUrlStorage();
                }
              }
            });
            var upload = new BaseUpload2(value, options);
            upload.start();
            _this3._parallelUploads.push(upload);
          });
        });
      });
      var req;
      Promise.all(uploads).then(function() {
        req = _this3._openRequest("POST", _this3.options.endpoint);
        req.setHeader("Upload-Concat", "final;".concat(_this3._parallelUploadUrls.join(" ")));
        var metadata = encodeMetadata(_this3.options.metadata);
        if (metadata !== "") {
          req.setHeader("Upload-Metadata", metadata);
        }
        return _this3._sendRequest(req, null);
      }).then(function(res) {
        if (!inStatusCategory(res.getStatus(), 200)) {
          _this3._emitHttpError(req, res, "tus: unexpected response while creating upload");
          return;
        }
        var location = res.getHeader("Location");
        if (location == null) {
          _this3._emitHttpError(req, res, "tus: invalid or missing Location header");
          return;
        }
        _this3.url = resolveUrl(_this3.options.endpoint, location);
        log("Created upload at ".concat(_this3.url));
        _this3._emitSuccess();
      })["catch"](function(err) {
        _this3._emitError(err);
      });
    }
    /**
     * Initiate the uploading procedure for a non-parallel upload. Here the entire file is
     * uploaded in a sequential matter.
     *
     * @api private
     */
  }, {
    key: "_startSingleUpload",
    value: function _startSingleUpload() {
      this._aborted = false;
      if (this.url != null) {
        log("Resuming upload from previous URL: ".concat(this.url));
        this._resumeUpload();
        return;
      }
      if (this.options.uploadUrl != null) {
        log("Resuming upload from provided URL: ".concat(this.options.uploadUrl));
        this.url = this.options.uploadUrl;
        this._resumeUpload();
        return;
      }
      log("Creating a new upload");
      this._createUpload();
    }
    /**
     * Abort any running request and stop the current upload. After abort is called, no event
     * handler will be invoked anymore. You can use the `start` method to resume the upload
     * again.
     * If `shouldTerminate` is true, the `terminate` function will be called to remove the
     * current upload from the server.
     *
     * @param {boolean} shouldTerminate True if the upload should be deleted from the server.
     * @return {Promise} The Promise will be resolved/rejected when the requests finish.
     */
  }, {
    key: "abort",
    value: function abort(shouldTerminate) {
      var _this4 = this;
      if (this._parallelUploads != null) {
        this._parallelUploads.forEach(function(upload) {
          upload.abort(shouldTerminate);
        });
      }
      if (this._req !== null) {
        this._req.abort();
      }
      this._aborted = true;
      if (this._retryTimeout != null) {
        clearTimeout(this._retryTimeout);
        this._retryTimeout = null;
      }
      if (!shouldTerminate || this.url == null) {
        return Promise.resolve();
      }
      return BaseUpload2.terminate(this.url, this.options).then(function() {
        return _this4._removeFromUrlStorage();
      });
    }
  }, {
    key: "_emitHttpError",
    value: function _emitHttpError(req, res, message, causingErr) {
      this._emitError(new error_default(message, causingErr, req, res));
    }
  }, {
    key: "_emitError",
    value: function _emitError(err) {
      var _this5 = this;
      if (this._aborted) return;
      if (this.options.retryDelays != null) {
        var shouldResetDelays = this._offset != null && this._offset > this._offsetBeforeRetry;
        if (shouldResetDelays) {
          this._retryAttempt = 0;
        }
        if (shouldRetry(err, this._retryAttempt, this.options)) {
          var delay = this.options.retryDelays[this._retryAttempt++];
          this._offsetBeforeRetry = this._offset;
          this._retryTimeout = setTimeout(function() {
            _this5.start();
          }, delay);
          return;
        }
      }
      if (typeof this.options.onError === "function") {
        this.options.onError(err);
      } else {
        throw err;
      }
    }
    /**
     * Publishes notification if the upload has been successfully completed.
     *
     * @api private
     */
  }, {
    key: "_emitSuccess",
    value: function _emitSuccess() {
      if (this.options.removeFingerprintOnSuccess) {
        this._removeFromUrlStorage();
      }
      if (typeof this.options.onSuccess === "function") {
        this.options.onSuccess();
      }
    }
    /**
     * Publishes notification when data has been sent to the server. This
     * data may not have been accepted by the server yet.
     *
     * @param {number} bytesSent  Number of bytes sent to the server.
     * @param {number} bytesTotal Total number of bytes to be sent to the server.
     * @api private
     */
  }, {
    key: "_emitProgress",
    value: function _emitProgress(bytesSent, bytesTotal) {
      if (typeof this.options.onProgress === "function") {
        this.options.onProgress(bytesSent, bytesTotal);
      }
    }
    /**
     * Publishes notification when a chunk of data has been sent to the server
     * and accepted by the server.
     * @param {number} chunkSize  Size of the chunk that was accepted by the server.
     * @param {number} bytesAccepted Total number of bytes that have been
     *                                accepted by the server.
     * @param {number} bytesTotal Total number of bytes to be sent to the server.
     * @api private
     */
  }, {
    key: "_emitChunkComplete",
    value: function _emitChunkComplete(chunkSize, bytesAccepted, bytesTotal) {
      if (typeof this.options.onChunkComplete === "function") {
        this.options.onChunkComplete(chunkSize, bytesAccepted, bytesTotal);
      }
    }
    /**
     * Create a new upload using the creation extension by sending a POST
     * request to the endpoint. After successful creation the file will be
     * uploaded
     *
     * @api private
     */
  }, {
    key: "_createUpload",
    value: function _createUpload() {
      var _this6 = this;
      if (!this.options.endpoint) {
        this._emitError(new Error("tus: unable to create upload because no endpoint is provided"));
        return;
      }
      var req = this._openRequest("POST", this.options.endpoint);
      if (this.options.uploadLengthDeferred) {
        req.setHeader("Upload-Defer-Length", 1);
      } else {
        req.setHeader("Upload-Length", this._size);
      }
      var metadata = encodeMetadata(this.options.metadata);
      if (metadata !== "") {
        req.setHeader("Upload-Metadata", metadata);
      }
      var promise;
      if (this.options.uploadDataDuringCreation && !this.options.uploadLengthDeferred) {
        this._offset = 0;
        promise = this._addChunkToRequest(req);
      } else {
        promise = this._sendRequest(req, null);
      }
      promise.then(function(res) {
        if (!inStatusCategory(res.getStatus(), 200)) {
          _this6._emitHttpError(req, res, "tus: unexpected response while creating upload");
          return;
        }
        var location = res.getHeader("Location");
        if (location == null) {
          _this6._emitHttpError(req, res, "tus: invalid or missing Location header");
          return;
        }
        _this6.url = resolveUrl(_this6.options.endpoint, location);
        log("Created upload at ".concat(_this6.url));
        if (typeof _this6.options.onUploadUrlAvailable === "function") {
          _this6.options.onUploadUrlAvailable();
        }
        if (_this6._size === 0) {
          _this6._emitSuccess();
          _this6._source.close();
          return;
        }
        _this6._saveUploadInUrlStorage().then(function() {
          if (_this6.options.uploadDataDuringCreation) {
            _this6._handleUploadResponse(req, res);
          } else {
            _this6._offset = 0;
            _this6._performUpload();
          }
        });
      })["catch"](function(err) {
        _this6._emitHttpError(req, null, "tus: failed to create upload", err);
      });
    }
    /*
     * Try to resume an existing upload. First a HEAD request will be sent
     * to retrieve the offset. If the request fails a new upload will be
     * created. In the case of a successful response the file will be uploaded.
     *
     * @api private
     */
  }, {
    key: "_resumeUpload",
    value: function _resumeUpload() {
      var _this7 = this;
      var req = this._openRequest("HEAD", this.url);
      var promise = this._sendRequest(req, null);
      promise.then(function(res) {
        var status = res.getStatus();
        if (!inStatusCategory(status, 200)) {
          if (status === 423) {
            _this7._emitHttpError(req, res, "tus: upload is currently locked; retry later");
            return;
          }
          if (inStatusCategory(status, 400)) {
            _this7._removeFromUrlStorage();
          }
          if (!_this7.options.endpoint) {
            _this7._emitHttpError(req, res, "tus: unable to resume upload (new upload cannot be created without an endpoint)");
            return;
          }
          _this7.url = null;
          _this7._createUpload();
          return;
        }
        var offset = parseInt(res.getHeader("Upload-Offset"), 10);
        if (Number.isNaN(offset)) {
          _this7._emitHttpError(req, res, "tus: invalid or missing offset value");
          return;
        }
        var length = parseInt(res.getHeader("Upload-Length"), 10);
        if (Number.isNaN(length) && !_this7.options.uploadLengthDeferred) {
          _this7._emitHttpError(req, res, "tus: invalid or missing length value");
          return;
        }
        if (typeof _this7.options.onUploadUrlAvailable === "function") {
          _this7.options.onUploadUrlAvailable();
        }
        _this7._saveUploadInUrlStorage().then(function() {
          if (offset === length) {
            _this7._emitProgress(length, length);
            _this7._emitSuccess();
            return;
          }
          _this7._offset = offset;
          _this7._performUpload();
        });
      })["catch"](function(err) {
        _this7._emitHttpError(req, null, "tus: failed to resume upload", err);
      });
    }
    /**
     * Start uploading the file using PATCH requests. The file will be divided
     * into chunks as specified in the chunkSize option. During the upload
     * the onProgress event handler may be invoked multiple times.
     *
     * @api private
     */
  }, {
    key: "_performUpload",
    value: function _performUpload() {
      var _this8 = this;
      if (this._aborted) {
        return;
      }
      var req;
      if (this.options.overridePatchMethod) {
        req = this._openRequest("POST", this.url);
        req.setHeader("X-HTTP-Method-Override", "PATCH");
      } else {
        req = this._openRequest("PATCH", this.url);
      }
      req.setHeader("Upload-Offset", this._offset);
      var promise = this._addChunkToRequest(req);
      promise.then(function(res) {
        if (!inStatusCategory(res.getStatus(), 200)) {
          _this8._emitHttpError(req, res, "tus: unexpected response while uploading chunk");
          return;
        }
        _this8._handleUploadResponse(req, res);
      })["catch"](function(err) {
        if (_this8._aborted) {
          return;
        }
        _this8._emitHttpError(req, null, "tus: failed to upload chunk at offset ".concat(_this8._offset), err);
      });
    }
    /**
     * _addChunktoRequest reads a chunk from the source and sends it using the
     * supplied request object. It will not handle the response.
     *
     * @api private
     */
  }, {
    key: "_addChunkToRequest",
    value: function _addChunkToRequest(req) {
      var _this9 = this;
      var start = this._offset;
      var end = this._offset + this.options.chunkSize;
      req.setProgressHandler(function(bytesSent) {
        _this9._emitProgress(start + bytesSent, _this9._size);
      });
      req.setHeader("Content-Type", "application/offset+octet-stream");
      if ((end === Infinity || end > this._size) && !this.options.uploadLengthDeferred) {
        end = this._size;
      }
      return this._source.slice(start, end).then(function(_ref2) {
        var value = _ref2.value, done = _ref2.done;
        var valueSize = value && value.size ? value.size : 0;
        if (_this9.options.uploadLengthDeferred && done) {
          _this9._size = _this9._offset + valueSize;
          req.setHeader("Upload-Length", _this9._size);
        }
        var newSize = _this9._offset + valueSize;
        if (!_this9.options.uploadLengthDeferred && done && newSize !== _this9._size) {
          return Promise.reject(new Error("upload was configured with a size of ".concat(_this9._size, " bytes, but the source is done after ").concat(newSize, " bytes")));
        }
        if (value === null) {
          return _this9._sendRequest(req);
        }
        _this9._emitProgress(_this9._offset, _this9._size);
        return _this9._sendRequest(req, value);
      });
    }
    /**
     * _handleUploadResponse is used by requests that haven been sent using _addChunkToRequest
     * and already have received a response.
     *
     * @api private
     */
  }, {
    key: "_handleUploadResponse",
    value: function _handleUploadResponse(req, res) {
      var offset = parseInt(res.getHeader("Upload-Offset"), 10);
      if (Number.isNaN(offset)) {
        this._emitHttpError(req, res, "tus: invalid or missing offset value");
        return;
      }
      this._emitProgress(offset, this._size);
      this._emitChunkComplete(offset - this._offset, offset, this._size);
      this._offset = offset;
      if (offset === this._size) {
        this._emitSuccess();
        this._source.close();
        return;
      }
      this._performUpload();
    }
    /**
     * Create a new HTTP request object with the given method and URL.
     *
     * @api private
     */
  }, {
    key: "_openRequest",
    value: function _openRequest(method, url) {
      var req = openRequest(method, url, this.options);
      this._req = req;
      return req;
    }
    /**
     * Remove the entry in the URL storage, if it has been saved before.
     *
     * @api private
     */
  }, {
    key: "_removeFromUrlStorage",
    value: function _removeFromUrlStorage() {
      var _this10 = this;
      if (!this._urlStorageKey) return;
      this._urlStorage.removeUpload(this._urlStorageKey)["catch"](function(err) {
        _this10._emitError(err);
      });
      this._urlStorageKey = null;
    }
    /**
     * Add the upload URL to the URL storage, if possible.
     *
     * @api private
     */
  }, {
    key: "_saveUploadInUrlStorage",
    value: function _saveUploadInUrlStorage() {
      var _this11 = this;
      if (!this.options.storeFingerprintForResuming || !this._fingerprint || this._urlStorageKey !== null) {
        return Promise.resolve();
      }
      var storedUpload = {
        size: this._size,
        metadata: this.options.metadata,
        creationTime: (/* @__PURE__ */ new Date()).toString()
      };
      if (this._parallelUploads) {
        storedUpload.parallelUploadUrls = this._parallelUploadUrls;
      } else {
        storedUpload.uploadUrl = this.url;
      }
      return this._urlStorage.addUpload(this._fingerprint, storedUpload).then(function(urlStorageKey) {
        _this11._urlStorageKey = urlStorageKey;
      });
    }
    /**
     * Send a request with the provided body.
     *
     * @api private
     */
  }, {
    key: "_sendRequest",
    value: function _sendRequest(req) {
      var body = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      return sendRequest(req, body, this.options);
    }
  }], [{
    key: "terminate",
    value: function terminate(url) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var req = openRequest("DELETE", url, options);
      return sendRequest(req, null, options).then(function(res) {
        if (res.getStatus() === 204) {
          return;
        }
        throw new error_default("tus: unexpected response while terminating upload", null, req, res);
      })["catch"](function(err) {
        if (!(err instanceof error_default)) {
          err = new error_default("tus: failed to terminate upload", err, req, null);
        }
        if (!shouldRetry(err, 0, options)) {
          throw err;
        }
        var delay = options.retryDelays[0];
        var remainingDelays = options.retryDelays.slice(1);
        var newOptions = _objectSpread(_objectSpread({}, options), {}, {
          retryDelays: remainingDelays
        });
        return new Promise(function(resolve) {
          return setTimeout(resolve, delay);
        }).then(function() {
          return BaseUpload2.terminate(url, newOptions);
        });
      });
    }
  }]);
  return BaseUpload2;
}();
function encodeMetadata(metadata) {
  return Object.entries(metadata).map(function(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0], value = _ref4[1];
    return "".concat(key, " ").concat(gBase64.encode(String(value)));
  }).join(",");
}
function inStatusCategory(status, category) {
  return status >= category && status < category + 100;
}
function openRequest(method, url, options) {
  var req = options.httpStack.createRequest(method, url);
  req.setHeader("Tus-Resumable", "1.0.0");
  var headers = options.headers || {};
  Object.entries(headers).forEach(function(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2), name = _ref6[0], value = _ref6[1];
    req.setHeader(name, value);
  });
  if (options.addRequestId) {
    var requestId = uuid();
    req.setHeader("X-Request-ID", requestId);
  }
  return req;
}
function sendRequest(_x, _x2, _x3) {
  return _sendRequest2.apply(this, arguments);
}
function _sendRequest2() {
  _sendRequest2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(req, body, options) {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(typeof options.onBeforeRequest === "function")) {
            _context.next = 3;
            break;
          }
          _context.next = 3;
          return options.onBeforeRequest(req);
        case 3:
          _context.next = 5;
          return req.send(body);
        case 5:
          res = _context.sent;
          if (!(typeof options.onAfterResponse === "function")) {
            _context.next = 9;
            break;
          }
          _context.next = 9;
          return options.onAfterResponse(req, res);
        case 9:
          return _context.abrupt("return", res);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _sendRequest2.apply(this, arguments);
}
function isOnline() {
  var online = true;
  if (typeof window !== "undefined" && // eslint-disable-next-line no-undef
  "navigator" in window && // eslint-disable-next-line no-undef
  window.navigator.onLine === false) {
    online = false;
  }
  return online;
}
function shouldRetry(err, retryAttempt, options) {
  if (options.retryDelays == null || retryAttempt >= options.retryDelays.length || err.originalRequest == null) {
    return false;
  }
  if (options && typeof options.onShouldRetry === "function") {
    return options.onShouldRetry(err, retryAttempt, options);
  }
  return defaultOnShouldRetry(err);
}
function defaultOnShouldRetry(err) {
  var status = err.originalResponse ? err.originalResponse.getStatus() : 0;
  return (!inStatusCategory(status, 400) || status === 409 || status === 423) && isOnline();
}
function resolveUrl(origin, link) {
  return new import_url_parse.default(link, origin).toString();
}
function splitSizeIntoParts(totalSize, partCount) {
  var partSize = Math.floor(totalSize / partCount);
  var parts = [];
  for (var i = 0; i < partCount; i++) {
    parts.push({
      start: partSize * i,
      end: partSize * (i + 1)
    });
  }
  parts[partCount - 1].end = totalSize;
  return parts;
}
BaseUpload.defaultOptions = defaultOptions;
var upload_default = BaseUpload;

// node_modules/tus-js-client/lib.esm/noopUrlStorage.js
function _typeof3(o) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof3(o);
}
function _classCallCheck3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey3(descriptor.key), descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties3(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties3(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey3(arg) {
  var key = _toPrimitive3(arg, "string");
  return _typeof3(key) === "symbol" ? key : String(key);
}
function _toPrimitive3(input, hint) {
  if (_typeof3(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof3(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var NoopUrlStorage = function() {
  function NoopUrlStorage2() {
    _classCallCheck3(this, NoopUrlStorage2);
  }
  _createClass3(NoopUrlStorage2, [{
    key: "listAllUploads",
    value: function listAllUploads() {
      return Promise.resolve([]);
    }
  }, {
    key: "findUploadsByFingerprint",
    value: function findUploadsByFingerprint(fingerprint2) {
      return Promise.resolve([]);
    }
  }, {
    key: "removeUpload",
    value: function removeUpload(urlStorageKey) {
      return Promise.resolve();
    }
  }, {
    key: "addUpload",
    value: function addUpload(fingerprint2, upload) {
      return Promise.resolve(null);
    }
  }]);
  return NoopUrlStorage2;
}();

// node_modules/tus-js-client/lib.esm/browser/urlStorage.js
function _typeof4(o) {
  "@babel/helpers - typeof";
  return _typeof4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof4(o);
}
function _classCallCheck4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties4(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey4(descriptor.key), descriptor);
  }
}
function _createClass4(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties4(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties4(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey4(arg) {
  var key = _toPrimitive4(arg, "string");
  return _typeof4(key) === "symbol" ? key : String(key);
}
function _toPrimitive4(input, hint) {
  if (_typeof4(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof4(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var hasStorage = false;
try {
  hasStorage = "localStorage" in window;
  key = "tusSupport";
  originalValue = localStorage.getItem(key);
  localStorage.setItem(key, originalValue);
  if (originalValue === null) localStorage.removeItem(key);
} catch (e) {
  if (e.code === e.SECURITY_ERR || e.code === e.QUOTA_EXCEEDED_ERR) {
    hasStorage = false;
  } else {
    throw e;
  }
}
var key;
var originalValue;
var canStoreURLs = hasStorage;
var WebStorageUrlStorage = function() {
  function WebStorageUrlStorage2() {
    _classCallCheck4(this, WebStorageUrlStorage2);
  }
  _createClass4(WebStorageUrlStorage2, [{
    key: "findAllUploads",
    value: function findAllUploads() {
      var results = this._findEntries("tus::");
      return Promise.resolve(results);
    }
  }, {
    key: "findUploadsByFingerprint",
    value: function findUploadsByFingerprint(fingerprint2) {
      var results = this._findEntries("tus::".concat(fingerprint2, "::"));
      return Promise.resolve(results);
    }
  }, {
    key: "removeUpload",
    value: function removeUpload(urlStorageKey) {
      localStorage.removeItem(urlStorageKey);
      return Promise.resolve();
    }
  }, {
    key: "addUpload",
    value: function addUpload(fingerprint2, upload) {
      var id4 = Math.round(Math.random() * 1e12);
      var key = "tus::".concat(fingerprint2, "::").concat(id4);
      localStorage.setItem(key, JSON.stringify(upload));
      return Promise.resolve(key);
    }
  }, {
    key: "_findEntries",
    value: function _findEntries(prefix) {
      var results = [];
      for (var i = 0; i < localStorage.length; i++) {
        var _key = localStorage.key(i);
        if (_key.indexOf(prefix) !== 0) continue;
        try {
          var upload = JSON.parse(localStorage.getItem(_key));
          upload.urlStorageKey = _key;
          results.push(upload);
        } catch (e) {
        }
      }
      return results;
    }
  }]);
  return WebStorageUrlStorage2;
}();

// node_modules/tus-js-client/lib.esm/browser/httpStack.js
function _typeof5(o) {
  "@babel/helpers - typeof";
  return _typeof5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof5(o);
}
function _classCallCheck5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties5(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey5(descriptor.key), descriptor);
  }
}
function _createClass5(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties5(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties5(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey5(arg) {
  var key = _toPrimitive5(arg, "string");
  return _typeof5(key) === "symbol" ? key : String(key);
}
function _toPrimitive5(input, hint) {
  if (_typeof5(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof5(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var XHRHttpStack = function() {
  function XHRHttpStack2() {
    _classCallCheck5(this, XHRHttpStack2);
  }
  _createClass5(XHRHttpStack2, [{
    key: "createRequest",
    value: function createRequest(method, url) {
      return new Request(method, url);
    }
  }, {
    key: "getName",
    value: function getName() {
      return "XHRHttpStack";
    }
  }]);
  return XHRHttpStack2;
}();
var Request = function() {
  function Request2(method, url) {
    _classCallCheck5(this, Request2);
    this._xhr = new XMLHttpRequest();
    this._xhr.open(method, url, true);
    this._method = method;
    this._url = url;
    this._headers = {};
  }
  _createClass5(Request2, [{
    key: "getMethod",
    value: function getMethod() {
      return this._method;
    }
  }, {
    key: "getURL",
    value: function getURL() {
      return this._url;
    }
  }, {
    key: "setHeader",
    value: function setHeader(header, value) {
      this._xhr.setRequestHeader(header, value);
      this._headers[header] = value;
    }
  }, {
    key: "getHeader",
    value: function getHeader(header) {
      return this._headers[header];
    }
  }, {
    key: "setProgressHandler",
    value: function setProgressHandler(progressHandler) {
      if (!("upload" in this._xhr)) {
        return;
      }
      this._xhr.upload.onprogress = function(e) {
        if (!e.lengthComputable) {
          return;
        }
        progressHandler(e.loaded);
      };
    }
  }, {
    key: "send",
    value: function send() {
      var _this = this;
      var body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      return new Promise(function(resolve, reject) {
        _this._xhr.onload = function() {
          resolve(new Response(_this._xhr));
        };
        _this._xhr.onerror = function(err) {
          reject(err);
        };
        _this._xhr.send(body);
      });
    }
  }, {
    key: "abort",
    value: function abort() {
      this._xhr.abort();
      return Promise.resolve();
    }
  }, {
    key: "getUnderlyingObject",
    value: function getUnderlyingObject() {
      return this._xhr;
    }
  }]);
  return Request2;
}();
var Response = function() {
  function Response2(xhr) {
    _classCallCheck5(this, Response2);
    this._xhr = xhr;
  }
  _createClass5(Response2, [{
    key: "getStatus",
    value: function getStatus() {
      return this._xhr.status;
    }
  }, {
    key: "getHeader",
    value: function getHeader(header) {
      return this._xhr.getResponseHeader(header);
    }
  }, {
    key: "getBody",
    value: function getBody() {
      return this._xhr.responseText;
    }
  }, {
    key: "getUnderlyingObject",
    value: function getUnderlyingObject() {
      return this._xhr;
    }
  }]);
  return Response2;
}();

// node_modules/tus-js-client/lib.esm/browser/isReactNative.js
var isReactNative = function isReactNative2() {
  return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
};
var isReactNative_default = isReactNative;

// node_modules/tus-js-client/lib.esm/browser/uriToBlob.js
function uriToBlob(uri) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function() {
      var blob = xhr.response;
      resolve(blob);
    };
    xhr.onerror = function(err) {
      reject(err);
    };
    xhr.open("GET", uri);
    xhr.send();
  });
}

// node_modules/tus-js-client/lib.esm/browser/sources/isCordova.js
var isCordova = function isCordova2() {
  return typeof window !== "undefined" && (typeof window.PhoneGap !== "undefined" || typeof window.Cordova !== "undefined" || typeof window.cordova !== "undefined");
};
var isCordova_default = isCordova;

// node_modules/tus-js-client/lib.esm/browser/sources/readAsByteArray.js
function readAsByteArray(chunk) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function() {
      var value = new Uint8Array(reader.result);
      resolve({
        value
      });
    };
    reader.onerror = function(err) {
      reject(err);
    };
    reader.readAsArrayBuffer(chunk);
  });
}

// node_modules/tus-js-client/lib.esm/browser/sources/FileSource.js
function _typeof6(o) {
  "@babel/helpers - typeof";
  return _typeof6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof6(o);
}
function _classCallCheck6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties6(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey6(descriptor.key), descriptor);
  }
}
function _createClass6(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties6(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties6(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey6(arg) {
  var key = _toPrimitive6(arg, "string");
  return _typeof6(key) === "symbol" ? key : String(key);
}
function _toPrimitive6(input, hint) {
  if (_typeof6(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof6(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var FileSource = function() {
  function FileSource2(file) {
    _classCallCheck6(this, FileSource2);
    this._file = file;
    this.size = file.size;
  }
  _createClass6(FileSource2, [{
    key: "slice",
    value: function slice(start, end) {
      if (isCordova_default()) {
        return readAsByteArray(this._file.slice(start, end));
      }
      var value = this._file.slice(start, end);
      var done = end >= this.size;
      return Promise.resolve({
        value,
        done
      });
    }
  }, {
    key: "close",
    value: function close() {
    }
  }]);
  return FileSource2;
}();

// node_modules/tus-js-client/lib.esm/browser/sources/StreamSource.js
function _typeof7(o) {
  "@babel/helpers - typeof";
  return _typeof7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof7(o);
}
function _classCallCheck7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties7(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey7(descriptor.key), descriptor);
  }
}
function _createClass7(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties7(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties7(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey7(arg) {
  var key = _toPrimitive7(arg, "string");
  return _typeof7(key) === "symbol" ? key : String(key);
}
function _toPrimitive7(input, hint) {
  if (_typeof7(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof7(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function len(blobOrArray) {
  if (blobOrArray === void 0) return 0;
  if (blobOrArray.size !== void 0) return blobOrArray.size;
  return blobOrArray.length;
}
function concat(a, b) {
  if (a.concat) {
    return a.concat(b);
  }
  if (a instanceof Blob) {
    return new Blob([a, b], {
      type: a.type
    });
  }
  if (a.set) {
    var c = new a.constructor(a.length + b.length);
    c.set(a);
    c.set(b, a.length);
    return c;
  }
  throw new Error("Unknown data type");
}
var StreamSource = function() {
  function StreamSource2(reader) {
    _classCallCheck7(this, StreamSource2);
    this._buffer = void 0;
    this._bufferOffset = 0;
    this._reader = reader;
    this._done = false;
  }
  _createClass7(StreamSource2, [{
    key: "slice",
    value: function slice(start, end) {
      if (start < this._bufferOffset) {
        return Promise.reject(new Error("Requested data is before the reader's current offset"));
      }
      return this._readUntilEnoughDataOrDone(start, end);
    }
  }, {
    key: "_readUntilEnoughDataOrDone",
    value: function _readUntilEnoughDataOrDone(start, end) {
      var _this = this;
      var hasEnoughData = end <= this._bufferOffset + len(this._buffer);
      if (this._done || hasEnoughData) {
        var value = this._getDataFromBuffer(start, end);
        var done = value == null ? this._done : false;
        return Promise.resolve({
          value,
          done
        });
      }
      return this._reader.read().then(function(_ref) {
        var value2 = _ref.value, done2 = _ref.done;
        if (done2) {
          _this._done = true;
        } else if (_this._buffer === void 0) {
          _this._buffer = value2;
        } else {
          _this._buffer = concat(_this._buffer, value2);
        }
        return _this._readUntilEnoughDataOrDone(start, end);
      });
    }
  }, {
    key: "_getDataFromBuffer",
    value: function _getDataFromBuffer(start, end) {
      if (start > this._bufferOffset) {
        this._buffer = this._buffer.slice(start - this._bufferOffset);
        this._bufferOffset = start;
      }
      var hasAllDataBeenRead = len(this._buffer) === 0;
      if (this._done && hasAllDataBeenRead) {
        return null;
      }
      return this._buffer.slice(0, end - start);
    }
  }, {
    key: "close",
    value: function close() {
      if (this._reader.cancel) {
        this._reader.cancel();
      }
    }
  }]);
  return StreamSource2;
}();

// node_modules/tus-js-client/lib.esm/browser/fileReader.js
function _typeof8(o) {
  "@babel/helpers - typeof";
  return _typeof8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof8(o);
}
function _regeneratorRuntime2() {
  "use strict";
  _regeneratorRuntime2 = function _regeneratorRuntime3() {
    return e;
  };
  var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function(t2, e2, r2) {
    t2[e2] = r2.value;
  }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag";
  function define(t2, e2, r2) {
    return Object.defineProperty(t2, e2, {
      value: r2,
      enumerable: true,
      configurable: true,
      writable: true
    }), t2[e2];
  }
  try {
    define({}, "");
  } catch (t2) {
    define = function define2(t3, e2, r2) {
      return t3[e2] = r2;
    };
  }
  function wrap(t2, e2, r2, n2) {
    var i2 = e2 && e2.prototype instanceof Generator ? e2 : Generator, a2 = Object.create(i2.prototype), c2 = new Context(n2 || []);
    return o(a2, "_invoke", {
      value: makeInvokeMethod(t2, r2, c2)
    }), a2;
  }
  function tryCatch(t2, e2, r2) {
    try {
      return {
        type: "normal",
        arg: t2.call(e2, r2)
      };
    } catch (t3) {
      return {
        type: "throw",
        arg: t3
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var p = {};
  define(p, a, function() {
    return this;
  });
  var d = Object.getPrototypeOf, v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t2) {
    ["next", "throw", "return"].forEach(function(e2) {
      define(t2, e2, function(t3) {
        return this._invoke(e2, t3);
      });
    });
  }
  function AsyncIterator(t2, e2) {
    function invoke(r3, o2, i2, a2) {
      var c2 = tryCatch(t2[r3], t2, o2);
      if ("throw" !== c2.type) {
        var u2 = c2.arg, h2 = u2.value;
        return h2 && "object" == _typeof8(h2) && n.call(h2, "__await") ? e2.resolve(h2.__await).then(function(t3) {
          invoke("next", t3, i2, a2);
        }, function(t3) {
          invoke("throw", t3, i2, a2);
        }) : e2.resolve(h2).then(function(t3) {
          u2.value = t3, i2(u2);
        }, function(t3) {
          return invoke("throw", t3, i2, a2);
        });
      }
      a2(c2.arg);
    }
    var r2;
    o(this, "_invoke", {
      value: function value(t3, n2) {
        function callInvokeWithMethodAndArg() {
          return new e2(function(e3, r3) {
            invoke(t3, n2, e3, r3);
          });
        }
        return r2 = r2 ? r2.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e2, r2, n2) {
    var o2 = h;
    return function(i2, a2) {
      if (o2 === f) throw new Error("Generator is already running");
      if (o2 === s) {
        if ("throw" === i2) throw a2;
        return {
          value: t,
          done: true
        };
      }
      for (n2.method = i2, n2.arg = a2; ; ) {
        var c2 = n2.delegate;
        if (c2) {
          var u2 = maybeInvokeDelegate(c2, n2);
          if (u2) {
            if (u2 === y) continue;
            return u2;
          }
        }
        if ("next" === n2.method) n2.sent = n2._sent = n2.arg;
        else if ("throw" === n2.method) {
          if (o2 === h) throw o2 = s, n2.arg;
          n2.dispatchException(n2.arg);
        } else "return" === n2.method && n2.abrupt("return", n2.arg);
        o2 = f;
        var p2 = tryCatch(e2, r2, n2);
        if ("normal" === p2.type) {
          if (o2 = n2.done ? s : l, p2.arg === y) continue;
          return {
            value: p2.arg,
            done: n2.done
          };
        }
        "throw" === p2.type && (o2 = s, n2.method = "throw", n2.arg = p2.arg);
      }
    };
  }
  function maybeInvokeDelegate(e2, r2) {
    var n2 = r2.method, o2 = e2.iterator[n2];
    if (o2 === t) return r2.delegate = null, "throw" === n2 && e2.iterator["return"] && (r2.method = "return", r2.arg = t, maybeInvokeDelegate(e2, r2), "throw" === r2.method) || "return" !== n2 && (r2.method = "throw", r2.arg = new TypeError("The iterator does not provide a '" + n2 + "' method")), y;
    var i2 = tryCatch(o2, e2.iterator, r2.arg);
    if ("throw" === i2.type) return r2.method = "throw", r2.arg = i2.arg, r2.delegate = null, y;
    var a2 = i2.arg;
    return a2 ? a2.done ? (r2[e2.resultName] = a2.value, r2.next = e2.nextLoc, "return" !== r2.method && (r2.method = "next", r2.arg = t), r2.delegate = null, y) : a2 : (r2.method = "throw", r2.arg = new TypeError("iterator result is not an object"), r2.delegate = null, y);
  }
  function pushTryEntry(t2) {
    var e2 = {
      tryLoc: t2[0]
    };
    1 in t2 && (e2.catchLoc = t2[1]), 2 in t2 && (e2.finallyLoc = t2[2], e2.afterLoc = t2[3]), this.tryEntries.push(e2);
  }
  function resetTryEntry(t2) {
    var e2 = t2.completion || {};
    e2.type = "normal", delete e2.arg, t2.completion = e2;
  }
  function Context(t2) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t2.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(e2) {
    if (e2 || "" === e2) {
      var r2 = e2[a];
      if (r2) return r2.call(e2);
      if ("function" == typeof e2.next) return e2;
      if (!isNaN(e2.length)) {
        var o2 = -1, i2 = function next() {
          for (; ++o2 < e2.length; ) if (n.call(e2, o2)) return next.value = e2[o2], next.done = false, next;
          return next.value = t, next.done = true, next;
        };
        return i2.next = i2;
      }
    }
    throw new TypeError(_typeof8(e2) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function(t2) {
    var e2 = "function" == typeof t2 && t2.constructor;
    return !!e2 && (e2 === GeneratorFunction || "GeneratorFunction" === (e2.displayName || e2.name));
  }, e.mark = function(t2) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t2, GeneratorFunctionPrototype) : (t2.__proto__ = GeneratorFunctionPrototype, define(t2, u, "GeneratorFunction")), t2.prototype = Object.create(g), t2;
  }, e.awrap = function(t2) {
    return {
      __await: t2
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function() {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function(t2, r2, n2, o2, i2) {
    void 0 === i2 && (i2 = Promise);
    var a2 = new AsyncIterator(wrap(t2, r2, n2, o2), i2);
    return e.isGeneratorFunction(r2) ? a2 : a2.next().then(function(t3) {
      return t3.done ? t3.value : a2.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function() {
    return this;
  }), define(g, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(t2) {
    var e2 = Object(t2), r2 = [];
    for (var n2 in e2) r2.push(n2);
    return r2.reverse(), function next() {
      for (; r2.length; ) {
        var t3 = r2.pop();
        if (t3 in e2) return next.value = t3, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e2) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e2) for (var r2 in this) "t" === r2.charAt(0) && n.call(this, r2) && !isNaN(+r2.slice(1)) && (this[r2] = t);
    },
    stop: function stop() {
      this.done = true;
      var t2 = this.tryEntries[0].completion;
      if ("throw" === t2.type) throw t2.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e2) {
      if (this.done) throw e2;
      var r2 = this;
      function handle(n2, o3) {
        return a2.type = "throw", a2.arg = e2, r2.next = n2, o3 && (r2.method = "next", r2.arg = t), !!o3;
      }
      for (var o2 = this.tryEntries.length - 1; o2 >= 0; --o2) {
        var i2 = this.tryEntries[o2], a2 = i2.completion;
        if ("root" === i2.tryLoc) return handle("end");
        if (i2.tryLoc <= this.prev) {
          var c2 = n.call(i2, "catchLoc"), u2 = n.call(i2, "finallyLoc");
          if (c2 && u2) {
            if (this.prev < i2.catchLoc) return handle(i2.catchLoc, true);
            if (this.prev < i2.finallyLoc) return handle(i2.finallyLoc);
          } else if (c2) {
            if (this.prev < i2.catchLoc) return handle(i2.catchLoc, true);
          } else {
            if (!u2) throw new Error("try statement without catch or finally");
            if (this.prev < i2.finallyLoc) return handle(i2.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t2, e2) {
      for (var r2 = this.tryEntries.length - 1; r2 >= 0; --r2) {
        var o2 = this.tryEntries[r2];
        if (o2.tryLoc <= this.prev && n.call(o2, "finallyLoc") && this.prev < o2.finallyLoc) {
          var i2 = o2;
          break;
        }
      }
      i2 && ("break" === t2 || "continue" === t2) && i2.tryLoc <= e2 && e2 <= i2.finallyLoc && (i2 = null);
      var a2 = i2 ? i2.completion : {};
      return a2.type = t2, a2.arg = e2, i2 ? (this.method = "next", this.next = i2.finallyLoc, y) : this.complete(a2);
    },
    complete: function complete(t2, e2) {
      if ("throw" === t2.type) throw t2.arg;
      return "break" === t2.type || "continue" === t2.type ? this.next = t2.arg : "return" === t2.type ? (this.rval = this.arg = t2.arg, this.method = "return", this.next = "end") : "normal" === t2.type && e2 && (this.next = e2), y;
    },
    finish: function finish(t2) {
      for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
        var r2 = this.tryEntries[e2];
        if (r2.finallyLoc === t2) return this.complete(r2.completion, r2.afterLoc), resetTryEntry(r2), y;
      }
    },
    "catch": function _catch(t2) {
      for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
        var r2 = this.tryEntries[e2];
        if (r2.tryLoc === t2) {
          var n2 = r2.completion;
          if ("throw" === n2.type) {
            var o2 = n2.arg;
            resetTryEntry(r2);
          }
          return o2;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e2, r2, n2) {
      return this.delegate = {
        iterator: values(e2),
        resultName: r2,
        nextLoc: n2
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function asyncGeneratorStep2(gen, resolve, reject, _next3, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next3, _throw);
  }
}
function _asyncToGenerator2(fn) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self2, args);
      function _next3(value) {
        asyncGeneratorStep2(gen, resolve, reject, _next3, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep2(gen, resolve, reject, _next3, _throw, "throw", err);
      }
      _next3(void 0);
    });
  };
}
function _classCallCheck8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties8(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey8(descriptor.key), descriptor);
  }
}
function _createClass8(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties8(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties8(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey8(arg) {
  var key = _toPrimitive8(arg, "string");
  return _typeof8(key) === "symbol" ? key : String(key);
}
function _toPrimitive8(input, hint) {
  if (_typeof8(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof8(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var FileReader2 = function() {
  function FileReader3() {
    _classCallCheck8(this, FileReader3);
  }
  _createClass8(FileReader3, [{
    key: "openFile",
    value: function() {
      var _openFile = _asyncToGenerator2(_regeneratorRuntime2().mark(function _callee(input, chunkSize) {
        var blob;
        return _regeneratorRuntime2().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(isReactNative_default() && input && typeof input.uri !== "undefined")) {
                _context.next = 11;
                break;
              }
              _context.prev = 1;
              _context.next = 4;
              return uriToBlob(input.uri);
            case 4:
              blob = _context.sent;
              return _context.abrupt("return", new FileSource(blob));
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              throw new Error("tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. ".concat(_context.t0));
            case 11:
              if (!(typeof input.slice === "function" && typeof input.size !== "undefined")) {
                _context.next = 13;
                break;
              }
              return _context.abrupt("return", Promise.resolve(new FileSource(input)));
            case 13:
              if (!(typeof input.read === "function")) {
                _context.next = 18;
                break;
              }
              chunkSize = Number(chunkSize);
              if (Number.isFinite(chunkSize)) {
                _context.next = 17;
                break;
              }
              return _context.abrupt("return", Promise.reject(new Error("cannot create source for stream without a finite value for the `chunkSize` option")));
            case 17:
              return _context.abrupt("return", Promise.resolve(new StreamSource(input, chunkSize)));
            case 18:
              return _context.abrupt("return", Promise.reject(new Error("source object may only be an instance of File, Blob, or Reader in this environment")));
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 8]]);
      }));
      function openFile(_x, _x2) {
        return _openFile.apply(this, arguments);
      }
      return openFile;
    }()
  }]);
  return FileReader3;
}();

// node_modules/tus-js-client/lib.esm/browser/fileSignature.js
function fingerprint(file, options) {
  if (isReactNative_default()) {
    return Promise.resolve(reactNativeFingerprint(file, options));
  }
  return Promise.resolve(["tus-br", file.name, file.type, file.size, file.lastModified, options.endpoint].join("-"));
}
function reactNativeFingerprint(file, options) {
  var exifHash = file.exif ? hashCode(JSON.stringify(file.exif)) : "noexif";
  return ["tus-rn", file.name || "noname", file.size || "nosize", exifHash, options.endpoint].join("/");
}
function hashCode(str) {
  var hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (var i = 0; i < str.length; i++) {
    var _char = str.charCodeAt(i);
    hash = (hash << 5) - hash + _char;
    hash &= hash;
  }
  return hash;
}

// node_modules/tus-js-client/lib.esm/browser/index.js
function _typeof9(o) {
  "@babel/helpers - typeof";
  return _typeof9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof9(o);
}
function _classCallCheck9(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties9(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey9(descriptor.key), descriptor);
  }
}
function _createClass9(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties9(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties9(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inherits2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf2(subClass, superClass);
}
function _setPrototypeOf2(o, p) {
  _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf2(o, p);
}
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn2(this, result);
  };
}
function _possibleConstructorReturn2(self2, call) {
  if (call && (_typeof9(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized2(self2);
}
function _assertThisInitialized2(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _isNativeReflectConstruct2() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf2(o) {
  _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf2(o);
}
function ownKeys2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys2(Object(t), true).forEach(function(r2) {
      _defineProperty2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty2(obj, key, value) {
  key = _toPropertyKey9(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey9(arg) {
  var key = _toPrimitive9(arg, "string");
  return _typeof9(key) === "symbol" ? key : String(key);
}
function _toPrimitive9(input, hint) {
  if (_typeof9(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof9(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var defaultOptions2 = _objectSpread2(_objectSpread2({}, upload_default.defaultOptions), {}, {
  httpStack: new XHRHttpStack(),
  fileReader: new FileReader2(),
  urlStorage: canStoreURLs ? new WebStorageUrlStorage() : new NoopUrlStorage(),
  fingerprint
});
var Upload = function(_BaseUpload) {
  _inherits2(Upload2, _BaseUpload);
  var _super = _createSuper2(Upload2);
  function Upload2() {
    var file = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck9(this, Upload2);
    options = _objectSpread2(_objectSpread2({}, defaultOptions2), options);
    return _super.call(this, file, options);
  }
  _createClass9(Upload2, null, [{
    key: "terminate",
    value: function terminate(url) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      options = _objectSpread2(_objectSpread2({}, defaultOptions2), options);
      return upload_default.terminate(url, options);
    }
  }]);
  return Upload2;
}(upload_default);
var _window = window;
var XMLHttpRequest2 = _window.XMLHttpRequest;
var Blob2 = _window.Blob;
var isSupported = XMLHttpRequest2 && Blob2 && typeof Blob2.prototype.slice === "function";

// node_modules/@uppy/core/lib/EventManager.js
function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id = 0;
function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}
var _uppy = _classPrivateFieldLooseKey("uppy");
var _events = _classPrivateFieldLooseKey("events");
var EventManager = class {
  constructor(uppy) {
    Object.defineProperty(this, _uppy, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _events, {
      writable: true,
      value: []
    });
    _classPrivateFieldLooseBase(this, _uppy)[_uppy] = uppy;
  }
  /** @deprecated */
  on(event, fn) {
    _classPrivateFieldLooseBase(this, _events)[_events].push([event, fn]);
    return _classPrivateFieldLooseBase(this, _uppy)[_uppy].on(event, fn);
  }
  remove() {
    for (const [event, fn] of _classPrivateFieldLooseBase(this, _events)[_events].splice(0)) {
      _classPrivateFieldLooseBase(this, _uppy)[_uppy].off(event, fn);
    }
  }
  onFilePause(fileID, cb) {
    this.on("upload-pause", (targetFileID, isPaused) => {
      if (fileID === targetFileID) {
        cb(isPaused);
      }
    });
  }
  onFileRemove(fileID, cb) {
    this.on("file-removed", (file) => {
      if (fileID === file.id) cb(file.id);
    });
  }
  onPause(fileID, cb) {
    this.on("upload-pause", (targetFileID, isPaused) => {
      if (fileID === targetFileID) {
        cb(isPaused);
      }
    });
  }
  onRetry(fileID, cb) {
    this.on("upload-retry", (targetFileID) => {
      if (fileID === targetFileID) {
        cb();
      }
    });
  }
  onRetryAll(fileID, cb) {
    this.on("retry-all", () => {
      if (!_classPrivateFieldLooseBase(this, _uppy)[_uppy].getFile(fileID)) return;
      cb();
    });
  }
  onPauseAll(fileID, cb) {
    this.on("pause-all", () => {
      if (!_classPrivateFieldLooseBase(this, _uppy)[_uppy].getFile(fileID)) return;
      cb();
    });
  }
  onCancelAll(fileID, eventHandler) {
    var _this = this;
    this.on("cancel-all", function() {
      if (!_classPrivateFieldLooseBase(_this, _uppy)[_uppy].getFile(fileID)) return;
      eventHandler(...arguments);
    });
  }
  onResumeAll(fileID, cb) {
    this.on("resume-all", () => {
      if (!_classPrivateFieldLooseBase(this, _uppy)[_uppy].getFile(fileID)) return;
      cb();
    });
  }
};

// node_modules/@uppy/utils/lib/NetworkError.js
var NetworkError = class extends Error {
  constructor(error, xhr) {
    if (xhr === void 0) {
      xhr = null;
    }
    super(`This looks like a network error, the endpoint might be blocked by an internet provider or a firewall.`);
    this.cause = error;
    this.isNetworkError = true;
    this.request = xhr;
  }
};
var NetworkError_default = NetworkError;

// node_modules/@uppy/utils/lib/isNetworkError.js
function isNetworkError(xhr) {
  if (!xhr) {
    return false;
  }
  return xhr.readyState !== 0 && xhr.readyState !== 4 || xhr.status === 0;
}
var isNetworkError_default = isNetworkError;

// node_modules/@uppy/utils/lib/RateLimitedQueue.js
function _classPrivateFieldLooseBase2(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id2 = 0;
function _classPrivateFieldLooseKey2(name) {
  return "__private_" + id2++ + "_" + name;
}
function createCancelError(cause) {
  return new Error("Cancelled", {
    cause
  });
}
function abortOn(signal) {
  if (signal != null) {
    var _this$then;
    const abortPromise = () => this.abort(signal.reason);
    signal.addEventListener("abort", abortPromise, {
      once: true
    });
    const removeAbortListener = () => {
      signal.removeEventListener("abort", abortPromise);
    };
    (_this$then = this.then) == null || _this$then.call(this, removeAbortListener, removeAbortListener);
  }
  return this;
}
var _activeRequests = _classPrivateFieldLooseKey2("activeRequests");
var _queuedHandlers = _classPrivateFieldLooseKey2("queuedHandlers");
var _paused = _classPrivateFieldLooseKey2("paused");
var _pauseTimer = _classPrivateFieldLooseKey2("pauseTimer");
var _downLimit = _classPrivateFieldLooseKey2("downLimit");
var _upperLimit = _classPrivateFieldLooseKey2("upperLimit");
var _rateLimitingTimer = _classPrivateFieldLooseKey2("rateLimitingTimer");
var _call = _classPrivateFieldLooseKey2("call");
var _queueNext = _classPrivateFieldLooseKey2("queueNext");
var _next = _classPrivateFieldLooseKey2("next");
var _queue = _classPrivateFieldLooseKey2("queue");
var _dequeue = _classPrivateFieldLooseKey2("dequeue");
var _resume = _classPrivateFieldLooseKey2("resume");
var _increaseLimit = _classPrivateFieldLooseKey2("increaseLimit");
var RateLimitedQueue = class {
  constructor(limit) {
    Object.defineProperty(this, _dequeue, {
      value: _dequeue2
    });
    Object.defineProperty(this, _queue, {
      value: _queue2
    });
    Object.defineProperty(this, _next, {
      value: _next2
    });
    Object.defineProperty(this, _queueNext, {
      value: _queueNext2
    });
    Object.defineProperty(this, _call, {
      value: _call2
    });
    Object.defineProperty(this, _activeRequests, {
      writable: true,
      value: 0
    });
    Object.defineProperty(this, _queuedHandlers, {
      writable: true,
      value: []
    });
    Object.defineProperty(this, _paused, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _pauseTimer, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _downLimit, {
      writable: true,
      value: 1
    });
    Object.defineProperty(this, _upperLimit, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _rateLimitingTimer, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _resume, {
      writable: true,
      value: () => this.resume()
    });
    Object.defineProperty(this, _increaseLimit, {
      writable: true,
      value: () => {
        if (_classPrivateFieldLooseBase2(this, _paused)[_paused]) {
          _classPrivateFieldLooseBase2(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase2(this, _increaseLimit)[_increaseLimit], 0);
          return;
        }
        _classPrivateFieldLooseBase2(this, _downLimit)[_downLimit] = this.limit;
        this.limit = Math.ceil((_classPrivateFieldLooseBase2(this, _upperLimit)[_upperLimit] + _classPrivateFieldLooseBase2(this, _downLimit)[_downLimit]) / 2);
        for (let i = _classPrivateFieldLooseBase2(this, _downLimit)[_downLimit]; i <= this.limit; i++) {
          _classPrivateFieldLooseBase2(this, _queueNext)[_queueNext]();
        }
        if (_classPrivateFieldLooseBase2(this, _upperLimit)[_upperLimit] - _classPrivateFieldLooseBase2(this, _downLimit)[_downLimit] > 3) {
          _classPrivateFieldLooseBase2(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase2(this, _increaseLimit)[_increaseLimit], 2e3);
        } else {
          _classPrivateFieldLooseBase2(this, _downLimit)[_downLimit] = Math.floor(_classPrivateFieldLooseBase2(this, _downLimit)[_downLimit] / 2);
        }
      }
    });
    if (typeof limit !== "number" || limit === 0) {
      this.limit = Infinity;
    } else {
      this.limit = limit;
    }
  }
  run(fn, queueOptions) {
    if (!_classPrivateFieldLooseBase2(this, _paused)[_paused] && _classPrivateFieldLooseBase2(this, _activeRequests)[_activeRequests] < this.limit) {
      return _classPrivateFieldLooseBase2(this, _call)[_call](fn);
    }
    return _classPrivateFieldLooseBase2(this, _queue)[_queue](fn, queueOptions);
  }
  wrapSyncFunction(fn, queueOptions) {
    var _this = this;
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      const queuedRequest = _this.run(() => {
        fn(...args);
        queueMicrotask(() => queuedRequest.done());
        return () => {
        };
      }, queueOptions);
      return {
        abortOn,
        abort() {
          queuedRequest.abort();
        }
      };
    };
  }
  wrapPromiseFunction(fn, queueOptions) {
    var _this2 = this;
    return function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      let queuedRequest;
      const outerPromise = new Promise((resolve, reject) => {
        queuedRequest = _this2.run(() => {
          let cancelError;
          let innerPromise;
          try {
            innerPromise = Promise.resolve(fn(...args));
          } catch (err) {
            innerPromise = Promise.reject(err);
          }
          innerPromise.then((result) => {
            if (cancelError) {
              reject(cancelError);
            } else {
              queuedRequest.done();
              resolve(result);
            }
          }, (err) => {
            if (cancelError) {
              reject(cancelError);
            } else {
              queuedRequest.done();
              reject(err);
            }
          });
          return (cause) => {
            cancelError = createCancelError(cause);
          };
        }, queueOptions);
      });
      outerPromise.abort = (cause) => {
        queuedRequest.abort(cause);
      };
      outerPromise.abortOn = abortOn;
      return outerPromise;
    };
  }
  resume() {
    _classPrivateFieldLooseBase2(this, _paused)[_paused] = false;
    clearTimeout(_classPrivateFieldLooseBase2(this, _pauseTimer)[_pauseTimer]);
    for (let i = 0; i < this.limit; i++) {
      _classPrivateFieldLooseBase2(this, _queueNext)[_queueNext]();
    }
  }
  /**
   * Freezes the queue for a while or indefinitely.
   *
   * @param {number | null } [duration] Duration for the pause to happen, in milliseconds.
   *                                    If omitted, the queue won't resume automatically.
   */
  pause(duration) {
    if (duration === void 0) {
      duration = null;
    }
    _classPrivateFieldLooseBase2(this, _paused)[_paused] = true;
    clearTimeout(_classPrivateFieldLooseBase2(this, _pauseTimer)[_pauseTimer]);
    if (duration != null) {
      _classPrivateFieldLooseBase2(this, _pauseTimer)[_pauseTimer] = setTimeout(_classPrivateFieldLooseBase2(this, _resume)[_resume], duration);
    }
  }
  /**
   * Pauses the queue for a duration, and lower the limit of concurrent requests
   * when the queue resumes. When the queue resumes, it tries to progressively
   * increase the limit in `this.#increaseLimit` until another call is made to
   * `this.rateLimit`.
   * Call this function when using the RateLimitedQueue for network requests and
   * the remote server responds with 429 HTTP code.
   *
   * @param {number} duration in milliseconds.
   */
  rateLimit(duration) {
    clearTimeout(_classPrivateFieldLooseBase2(this, _rateLimitingTimer)[_rateLimitingTimer]);
    this.pause(duration);
    if (this.limit > 1 && Number.isFinite(this.limit)) {
      _classPrivateFieldLooseBase2(this, _upperLimit)[_upperLimit] = this.limit - 1;
      this.limit = _classPrivateFieldLooseBase2(this, _downLimit)[_downLimit];
      _classPrivateFieldLooseBase2(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase2(this, _increaseLimit)[_increaseLimit], duration);
    }
  }
  get isPaused() {
    return _classPrivateFieldLooseBase2(this, _paused)[_paused];
  }
};
function _call2(fn) {
  _classPrivateFieldLooseBase2(this, _activeRequests)[_activeRequests] += 1;
  let done = false;
  let cancelActive;
  try {
    cancelActive = fn();
  } catch (err) {
    _classPrivateFieldLooseBase2(this, _activeRequests)[_activeRequests] -= 1;
    throw err;
  }
  return {
    abort: (cause) => {
      if (done) return;
      done = true;
      _classPrivateFieldLooseBase2(this, _activeRequests)[_activeRequests] -= 1;
      cancelActive == null || cancelActive(cause);
      _classPrivateFieldLooseBase2(this, _queueNext)[_queueNext]();
    },
    done: () => {
      if (done) return;
      done = true;
      _classPrivateFieldLooseBase2(this, _activeRequests)[_activeRequests] -= 1;
      _classPrivateFieldLooseBase2(this, _queueNext)[_queueNext]();
    }
  };
}
function _queueNext2() {
  queueMicrotask(() => _classPrivateFieldLooseBase2(this, _next)[_next]());
}
function _next2() {
  if (_classPrivateFieldLooseBase2(this, _paused)[_paused] || _classPrivateFieldLooseBase2(this, _activeRequests)[_activeRequests] >= this.limit) {
    return;
  }
  if (_classPrivateFieldLooseBase2(this, _queuedHandlers)[_queuedHandlers].length === 0) {
    return;
  }
  const next = _classPrivateFieldLooseBase2(this, _queuedHandlers)[_queuedHandlers].shift();
  if (next == null) {
    throw new Error("Invariant violation: next is null");
  }
  const handler = _classPrivateFieldLooseBase2(this, _call)[_call](next.fn);
  next.abort = handler.abort;
  next.done = handler.done;
}
function _queue2(fn, options) {
  const handler = {
    fn,
    priority: (options == null ? void 0 : options.priority) || 0,
    abort: () => {
      _classPrivateFieldLooseBase2(this, _dequeue)[_dequeue](handler);
    },
    done: () => {
      throw new Error("Cannot mark a queued request as done: this indicates a bug");
    }
  };
  const index = _classPrivateFieldLooseBase2(this, _queuedHandlers)[_queuedHandlers].findIndex((other) => {
    return handler.priority > other.priority;
  });
  if (index === -1) {
    _classPrivateFieldLooseBase2(this, _queuedHandlers)[_queuedHandlers].push(handler);
  } else {
    _classPrivateFieldLooseBase2(this, _queuedHandlers)[_queuedHandlers].splice(index, 0, handler);
  }
  return handler;
}
function _dequeue2(handler) {
  const index = _classPrivateFieldLooseBase2(this, _queuedHandlers)[_queuedHandlers].indexOf(handler);
  if (index !== -1) {
    _classPrivateFieldLooseBase2(this, _queuedHandlers)[_queuedHandlers].splice(index, 1);
  }
}
var internalRateLimitedQueue = Symbol("__queue");

// node_modules/@uppy/utils/lib/hasProperty.js
function has(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

// node_modules/@uppy/utils/lib/fileFilters.js
function filterNonFailedFiles(files) {
  const hasError = (file) => "error" in file && !!file.error;
  return files.filter((file) => !hasError(file));
}
function filterFilesToEmitUploadStarted(files) {
  return files.filter((file) => {
    var _file$progress;
    return !((_file$progress = file.progress) != null && _file$progress.uploadStarted) || !file.isRestored;
  });
}

// node_modules/@uppy/tus/lib/getFingerprint.js
function isCordova3() {
  return typeof window !== "undefined" && // @ts-expect-error may exist
  (typeof window.PhoneGap !== "undefined" || // @ts-expect-error may exist
  typeof window.Cordova !== "undefined" || // @ts-expect-error may exist
  typeof window.cordova !== "undefined");
}
function isReactNative3() {
  return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
}
function getFingerprint(uppyFile) {
  return (file, options) => {
    if (isCordova3() || isReactNative3()) {
      return defaultOptions2.fingerprint(file, options);
    }
    const uppyFingerprint = ["tus", uppyFile.id, options.endpoint].join("-");
    return Promise.resolve(uppyFingerprint);
  };
}

// node_modules/@uppy/tus/lib/index.js
function _classPrivateFieldLooseBase3(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id3 = 0;
function _classPrivateFieldLooseKey3(name) {
  return "__private_" + id3++ + "_" + name;
}
var packageJson = {
  "version": "3.5.5"
};
var tusDefaultOptions = {
  endpoint: "",
  uploadUrl: null,
  metadata: {},
  uploadSize: null,
  onProgress: null,
  onChunkComplete: null,
  onSuccess: null,
  onError: null,
  overridePatchMethod: false,
  headers: {},
  addRequestId: false,
  chunkSize: Infinity,
  retryDelays: [100, 1e3, 3e3, 5e3],
  parallelUploads: 1,
  removeFingerprintOnSuccess: false,
  uploadLengthDeferred: false,
  uploadDataDuringCreation: false
};
var defaultOptions3 = {
  limit: 20,
  retryDelays: tusDefaultOptions.retryDelays,
  withCredentials: false
};
var _retryDelayIterator = _classPrivateFieldLooseKey3("retryDelayIterator");
var _uploadLocalFile = _classPrivateFieldLooseKey3("uploadLocalFile");
var _getCompanionClientArgs = _classPrivateFieldLooseKey3("getCompanionClientArgs");
var _uploadFiles = _classPrivateFieldLooseKey3("uploadFiles");
var _handleUpload = _classPrivateFieldLooseKey3("handleUpload");
var Tus = class extends BasePlugin {
  constructor(uppy, _opts) {
    var _this$opts$rateLimite, _this$opts$retryDelay;
    super(uppy, __spreadValues(__spreadValues({}, defaultOptions3), _opts));
    Object.defineProperty(this, _uploadFiles, {
      value: _uploadFiles2
    });
    Object.defineProperty(this, _getCompanionClientArgs, {
      value: _getCompanionClientArgs2
    });
    Object.defineProperty(this, _uploadLocalFile, {
      value: _uploadLocalFile2
    });
    Object.defineProperty(this, _retryDelayIterator, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _handleUpload, {
      writable: true,
      value: (fileIDs) => __async(this, null, function* () {
        if (fileIDs.length === 0) {
          this.uppy.log("[Tus] No files to upload");
          return;
        }
        if (this.opts.limit === 0) {
          this.uppy.log("[Tus] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/tus/#limit-0", "warning");
        }
        this.uppy.log("[Tus] Uploading...");
        const filesToUpload = this.uppy.getFilesByIds(fileIDs);
        yield _classPrivateFieldLooseBase3(this, _uploadFiles)[_uploadFiles](filesToUpload);
      })
    });
    this.type = "uploader";
    this.id = this.opts.id || "Tus";
    if ((_opts == null ? void 0 : _opts.allowedMetaFields) === void 0 && "metaFields" in this.opts) {
      throw new Error("The `metaFields` option has been renamed to `allowedMetaFields`.");
    }
    if ("autoRetry" in _opts) {
      throw new Error("The `autoRetry` option was deprecated and has been removed.");
    }
    this.requests = (_this$opts$rateLimite = this.opts.rateLimitedQueue) != null ? _this$opts$rateLimite : new RateLimitedQueue(this.opts.limit);
    _classPrivateFieldLooseBase3(this, _retryDelayIterator)[_retryDelayIterator] = (_this$opts$retryDelay = this.opts.retryDelays) == null ? void 0 : _this$opts$retryDelay.values();
    this.uploaders = /* @__PURE__ */ Object.create(null);
    this.uploaderEvents = /* @__PURE__ */ Object.create(null);
    this.handleResetProgress = this.handleResetProgress.bind(this);
  }
  handleResetProgress() {
    const files = __spreadValues({}, this.uppy.getState().files);
    Object.keys(files).forEach((fileID) => {
      var _files$fileID;
      if ((_files$fileID = files[fileID]) != null && (_files$fileID = _files$fileID.tus) != null && _files$fileID.uploadUrl) {
        const tusState = __spreadValues({}, files[fileID].tus);
        delete tusState.uploadUrl;
        files[fileID] = __spreadProps(__spreadValues({}, files[fileID]), {
          tus: tusState
        });
      }
    });
    this.uppy.setState({
      files
    });
  }
  /**
   * Clean up all references for a file's upload: the tus.Upload instance,
   * any events related to the file, and the Companion WebSocket connection.
   */
  resetUploaderReferences(fileID, opts) {
    const uploader = this.uploaders[fileID];
    if (uploader) {
      uploader.abort();
      if (opts != null && opts.abort) {
        uploader.abort(true);
      }
      this.uploaders[fileID] = null;
    }
    if (this.uploaderEvents[fileID]) {
      this.uploaderEvents[fileID].remove();
      this.uploaderEvents[fileID] = null;
    }
  }
  /**
   * Store the uploadUrl on the file options, so that when Golden Retriever
   * restores state, we will continue uploading to the correct URL.
   */
  onReceiveUploadUrl(file, uploadURL) {
    const currentFile = this.uppy.getFile(file.id);
    if (!currentFile) return;
    if (!currentFile.tus || currentFile.tus.uploadUrl !== uploadURL) {
      this.uppy.log("[Tus] Storing upload url");
      this.uppy.setFileState(currentFile.id, {
        tus: __spreadProps(__spreadValues({}, currentFile.tus), {
          uploadUrl: uploadURL
        })
      });
    }
  }
  install() {
    this.uppy.setState({
      capabilities: __spreadProps(__spreadValues({}, this.uppy.getState().capabilities), {
        resumableUploads: true
      })
    });
    this.uppy.addUploader(_classPrivateFieldLooseBase3(this, _handleUpload)[_handleUpload]);
    this.uppy.on("reset-progress", this.handleResetProgress);
  }
  uninstall() {
    this.uppy.setState({
      capabilities: __spreadProps(__spreadValues({}, this.uppy.getState().capabilities), {
        resumableUploads: false
      })
    });
    this.uppy.removeUploader(_classPrivateFieldLooseBase3(this, _handleUpload)[_handleUpload]);
  }
};
function _uploadLocalFile2(file) {
  var _this = this;
  this.resetUploaderReferences(file.id);
  return new Promise((resolve, reject) => {
    let queuedRequest;
    let qRequest;
    let upload;
    const opts = __spreadValues(__spreadValues({}, this.opts), file.tus || {});
    if (typeof opts.headers === "function") {
      opts.headers = opts.headers(file);
    }
    const _a = opts, {
      onShouldRetry,
      onBeforeRequest
    } = _a, commonOpts = __objRest(_a, [
      "onShouldRetry",
      "onBeforeRequest"
    ]);
    const uploadOptions = __spreadValues(__spreadValues({}, tusDefaultOptions), commonOpts);
    uploadOptions.fingerprint = getFingerprint(file);
    uploadOptions.onBeforeRequest = (req) => __async(this, null, function* () {
      const xhr = req.getUnderlyingObject();
      xhr.withCredentials = !!opts.withCredentials;
      let userProvidedPromise;
      if (typeof onBeforeRequest === "function") {
        userProvidedPromise = onBeforeRequest(req, file);
      }
      if (has(queuedRequest, "shouldBeRequeued")) {
        if (!queuedRequest.shouldBeRequeued) return Promise.reject();
        let done;
        const p = new Promise((res) => {
          done = res;
        });
        queuedRequest = this.requests.run(() => {
          if (file.isPaused) {
            queuedRequest.abort();
          }
          done();
          return () => {
          };
        });
        yield Promise.all([p, userProvidedPromise]);
        return void 0;
      }
      return userProvidedPromise;
    });
    uploadOptions.onError = (err) => {
      var _queuedRequest;
      this.uppy.log(err);
      const xhr = err.originalRequest != null ? err.originalRequest.getUnderlyingObject() : null;
      if (isNetworkError_default(xhr)) {
        err = new NetworkError_default(err, xhr);
      }
      this.resetUploaderReferences(file.id);
      (_queuedRequest = queuedRequest) == null || _queuedRequest.abort();
      this.uppy.emit("upload-error", file, err);
      if (typeof opts.onError === "function") {
        opts.onError(err);
      }
      reject(err);
    };
    uploadOptions.onProgress = (bytesUploaded, bytesTotal) => {
      this.onReceiveUploadUrl(file, upload.url);
      if (typeof opts.onProgress === "function") {
        opts.onProgress(bytesUploaded, bytesTotal);
      }
      this.uppy.emit("upload-progress", this.uppy.getFile(file.id), {
        // TODO: remove `uploader` in next major
        // @ts-expect-error untyped
        uploader: this,
        bytesUploaded,
        bytesTotal
      });
    };
    uploadOptions.onSuccess = () => {
      var _upload$url;
      const uploadResp = {
        uploadURL: (_upload$url = upload.url) != null ? _upload$url : void 0,
        status: 200,
        body: {}
      };
      this.resetUploaderReferences(file.id);
      queuedRequest.done();
      this.uppy.emit("upload-success", this.uppy.getFile(file.id), uploadResp);
      if (upload.url) {
        const {
          name
        } = upload.file;
        this.uppy.log(`Download ${name} from ${upload.url}`);
      }
      if (typeof opts.onSuccess === "function") {
        opts.onSuccess();
      }
      resolve(upload);
    };
    const defaultOnShouldRetry2 = (err) => {
      var _err$originalResponse;
      const status = err == null || (_err$originalResponse = err.originalResponse) == null ? void 0 : _err$originalResponse.getStatus();
      if (status === 429) {
        if (!this.requests.isPaused) {
          var _classPrivateFieldLoo;
          const next = (_classPrivateFieldLoo = _classPrivateFieldLooseBase3(this, _retryDelayIterator)[_retryDelayIterator]) == null ? void 0 : _classPrivateFieldLoo.next();
          if (next == null || next.done) {
            return false;
          }
          this.requests.rateLimit(next.value);
        }
      } else if (status != null && status > 400 && status < 500 && status !== 409 && status !== 423) {
        return false;
      } else if (typeof navigator !== "undefined" && navigator.onLine === false) {
        if (!this.requests.isPaused) {
          this.requests.pause();
          window.addEventListener("online", () => {
            this.requests.resume();
          }, {
            once: true
          });
        }
      }
      queuedRequest.abort();
      queuedRequest = {
        shouldBeRequeued: true,
        abort() {
          this.shouldBeRequeued = false;
        },
        done() {
          throw new Error("Cannot mark a queued request as done: this indicates a bug");
        },
        fn() {
          throw new Error("Cannot run a queued request: this indicates a bug");
        }
      };
      return true;
    };
    if (onShouldRetry != null) {
      uploadOptions.onShouldRetry = (error, retryAttempt) => onShouldRetry(error, retryAttempt, opts, defaultOnShouldRetry2);
    } else {
      uploadOptions.onShouldRetry = defaultOnShouldRetry2;
    }
    const copyProp = (obj, srcProp, destProp) => {
      if (has(obj, srcProp) && !has(obj, destProp)) {
        obj[destProp] = obj[srcProp];
      }
    };
    const meta = {};
    const allowedMetaFields = Array.isArray(opts.allowedMetaFields) ? opts.allowedMetaFields : Object.keys(file.meta);
    allowedMetaFields.forEach((item) => {
      meta[item] = String(file.meta[item]);
    });
    copyProp(meta, "type", "filetype");
    copyProp(meta, "name", "filename");
    uploadOptions.metadata = meta;
    upload = new Upload(file.data, uploadOptions);
    this.uploaders[file.id] = upload;
    const eventManager = new EventManager(this.uppy);
    this.uploaderEvents[file.id] = eventManager;
    qRequest = () => {
      if (!file.isPaused) {
        upload.start();
      }
      return () => {
      };
    };
    upload.findPreviousUploads().then((previousUploads) => {
      const previousUpload = previousUploads[0];
      if (previousUpload) {
        this.uppy.log(`[Tus] Resuming upload of ${file.id} started at ${previousUpload.creationTime}`);
        upload.resumeFromPreviousUpload(previousUpload);
      }
    });
    queuedRequest = this.requests.run(qRequest);
    eventManager.onFileRemove(file.id, (targetFileID) => {
      queuedRequest.abort();
      this.resetUploaderReferences(file.id, {
        abort: !!upload.url
      });
      resolve(`upload ${targetFileID} was removed`);
    });
    eventManager.onPause(file.id, (isPaused) => {
      queuedRequest.abort();
      if (isPaused) {
        upload.abort();
      } else {
        queuedRequest = this.requests.run(qRequest);
      }
    });
    eventManager.onPauseAll(file.id, () => {
      queuedRequest.abort();
      upload.abort();
    });
    eventManager.onCancelAll(file.id, function(_temp) {
      let {
        reason
      } = _temp === void 0 ? {} : _temp;
      if (reason === "user") {
        queuedRequest.abort();
        _this.resetUploaderReferences(file.id, {
          abort: !!upload.url
        });
      }
      resolve(`upload ${file.id} was canceled`);
    });
    eventManager.onResumeAll(file.id, () => {
      queuedRequest.abort();
      if (file.error) {
        upload.abort();
      }
      queuedRequest = this.requests.run(qRequest);
    });
  }).catch((err) => {
    this.uppy.emit("upload-error", file, err);
    throw err;
  });
}
function _getCompanionClientArgs2(file) {
  var _file$remote;
  const opts = __spreadValues({}, this.opts);
  if (file.tus) {
    Object.assign(opts, file.tus);
  }
  if (typeof opts.headers === "function") {
    opts.headers = opts.headers(file);
  }
  return __spreadProps(__spreadValues({}, (_file$remote = file.remote) == null ? void 0 : _file$remote.body), {
    endpoint: opts.endpoint,
    uploadUrl: opts.uploadUrl,
    protocol: "tus",
    size: file.data.size,
    headers: opts.headers,
    metadata: file.meta
  });
}
function _uploadFiles2(files) {
  return __async(this, null, function* () {
    const filesFiltered = filterNonFailedFiles(files);
    const filesToEmit = filterFilesToEmitUploadStarted(filesFiltered);
    this.uppy.emit("upload-start", filesToEmit);
    yield Promise.allSettled(filesFiltered.map((file) => {
      if (file.isRemote) {
        const getQueue = () => this.requests;
        const controller = new AbortController();
        const removedHandler = (removedFile) => {
          if (removedFile.id === file.id) controller.abort();
        };
        this.uppy.on("file-removed", removedHandler);
        const uploadPromise = this.uppy.getRequestClientForFile(file).uploadRemoteFile(file, _classPrivateFieldLooseBase3(this, _getCompanionClientArgs)[_getCompanionClientArgs](file), {
          signal: controller.signal,
          getQueue
        });
        this.requests.wrapSyncFunction(() => {
          this.uppy.off("file-removed", removedHandler);
        }, {
          priority: -1
        })();
        return uploadPromise;
      }
      return _classPrivateFieldLooseBase3(this, _uploadLocalFile)[_uploadLocalFile](file);
    }));
  });
}
Tus.VERSION = packageJson.version;
export {
  Tus as default
};
/*! Bundled license information:

tus-js-client/lib.esm/upload.js:
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE *)

tus-js-client/lib.esm/browser/fileReader.js:
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE *)
*/
//# sourceMappingURL=@uppy_tus.js.map
