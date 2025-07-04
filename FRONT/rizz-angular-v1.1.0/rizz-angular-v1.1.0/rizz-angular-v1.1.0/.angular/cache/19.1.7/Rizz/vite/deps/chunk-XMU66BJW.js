// node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var i;
var t;
var r;
var o;
var f;
var e;
var c = {};
var s = [];
var a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function h(n2, l2) {
  for (var u2 in l2) n2[u2] = l2[u2];
  return n2;
}
function v(n2) {
  var l2 = n2.parentNode;
  l2 && l2.removeChild(n2);
}
function y(l2, u2, i2) {
  var t2, r2, o2, f2 = {};
  for (o2 in u2) "key" == o2 ? t2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : f2[o2] = u2[o2];
  if (arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : i2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === f2[o2] && (f2[o2] = l2.defaultProps[o2]);
  return p(l2, f2, t2, r2, null);
}
function p(n2, i2, t2, r2, o2) {
  var f2 = {
    type: n2,
    props: i2,
    key: t2,
    ref: r2,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: null == o2 ? ++u : o2
  };
  return null == o2 && null != l.vnode && l.vnode(f2), f2;
}
function d() {
  return {
    current: null
  };
}
function _(n2) {
  return n2.children;
}
function k(n2, l2, u2, i2, t2) {
  var r2;
  for (r2 in u2) "children" === r2 || "key" === r2 || r2 in l2 || g(n2, r2, null, u2[r2], i2);
  for (r2 in l2) t2 && "function" != typeof l2[r2] || "children" === r2 || "key" === r2 || "value" === r2 || "checked" === r2 || u2[r2] === l2[r2] || g(n2, r2, l2[r2], u2[r2], i2);
}
function b(n2, l2, u2) {
  "-" === l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || a.test(l2) ? u2 : u2 + "px";
}
function g(n2, l2, u2, i2, t2) {
  var r2;
  n: if ("style" === l2) {
    if ("string" == typeof u2) n2.style.cssText = u2;
    else {
      if ("string" == typeof i2 && (n2.style.cssText = i2 = ""), i2) for (l2 in i2) u2 && l2 in u2 || b(n2.style, l2, "");
      if (u2) for (l2 in u2) i2 && u2[l2] === i2[l2] || b(n2.style, l2, u2[l2]);
    }
  } else if ("o" === l2[0] && "n" === l2[1]) r2 = l2 !== (l2 = l2.replace(/Capture$/, "")), l2 = l2.toLowerCase() in n2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? i2 || n2.addEventListener(l2, r2 ? w : m, r2) : n2.removeEventListener(l2, r2 ? w : m, r2);
  else if ("dangerouslySetInnerHTML" !== l2) {
    if (t2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" !== l2 && "height" !== l2 && "href" !== l2 && "list" !== l2 && "form" !== l2 && "tabIndex" !== l2 && "download" !== l2 && l2 in n2) try {
      n2[l2] = null == u2 ? "" : u2;
      break n;
    } catch (n3) {
    }
    "function" == typeof u2 || (null == u2 || false === u2 && -1 == l2.indexOf("-") ? n2.removeAttribute(l2) : n2.setAttribute(l2, u2));
  }
}
function m(n2) {
  t = true;
  try {
    return this.l[n2.type + false](l.event ? l.event(n2) : n2);
  } finally {
    t = false;
  }
}
function w(n2) {
  t = true;
  try {
    return this.l[n2.type + true](l.event ? l.event(n2) : n2);
  } finally {
    t = false;
  }
}
function x(n2, l2) {
  this.props = n2, this.context = l2;
}
function A(n2, l2) {
  if (null == l2) return n2.__ ? A(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
  for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
  return "function" == typeof n2.type ? A(n2) : null;
}
function P(n2) {
  var l2, u2;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) {
      n2.__e = n2.__c.base = u2.__e;
      break;
    }
    return P(n2);
  }
}
function C(n2) {
  t ? setTimeout(n2) : f(n2);
}
function T(n2) {
  (!n2.__d && (n2.__d = true) && r.push(n2) && !$.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || C)($);
}
function $() {
  var n2, l2, u2, i2, t2, o2, f2, e2;
  for (r.sort(function(n3, l3) {
    return n3.__v.__b - l3.__v.__b;
  }); n2 = r.shift(); ) n2.__d && (l2 = r.length, i2 = void 0, t2 = void 0, f2 = (o2 = (u2 = n2).__v).__e, (e2 = u2.__P) && (i2 = [], (t2 = h({}, o2)).__v = o2.__v + 1, M(e2, o2, t2, u2.__n, void 0 !== e2.ownerSVGElement, null != o2.__h ? [f2] : null, i2, null == f2 ? A(o2) : f2, o2.__h), N(i2, o2), o2.__e != f2 && P(o2)), r.length > l2 && r.sort(function(n3, l3) {
    return n3.__v.__b - l3.__v.__b;
  }));
  $.__r = 0;
}
function H(n2, l2, u2, i2, t2, r2, o2, f2, e2, a2) {
  var h2, v2, y2, d2, k2, b2, g2, m2 = i2 && i2.__k || s, w2 = m2.length;
  for (u2.__k = [], h2 = 0; h2 < l2.length; h2++) if (null != (d2 = u2.__k[h2] = null == (d2 = l2[h2]) || "boolean" == typeof d2 ? null : "string" == typeof d2 || "number" == typeof d2 || "bigint" == typeof d2 ? p(null, d2, null, null, d2) : Array.isArray(d2) ? p(_, {
    children: d2
  }, null, null, null) : d2.__b > 0 ? p(d2.type, d2.props, d2.key, d2.ref ? d2.ref : null, d2.__v) : d2)) {
    if (d2.__ = u2, d2.__b = u2.__b + 1, null === (y2 = m2[h2]) || y2 && d2.key == y2.key && d2.type === y2.type) m2[h2] = void 0;
    else for (v2 = 0; v2 < w2; v2++) {
      if ((y2 = m2[v2]) && d2.key == y2.key && d2.type === y2.type) {
        m2[v2] = void 0;
        break;
      }
      y2 = null;
    }
    M(n2, d2, y2 = y2 || c, t2, r2, o2, f2, e2, a2), k2 = d2.__e, (v2 = d2.ref) && y2.ref != v2 && (g2 || (g2 = []), y2.ref && g2.push(y2.ref, null, d2), g2.push(v2, d2.__c || k2, d2)), null != k2 ? (null == b2 && (b2 = k2), "function" == typeof d2.type && d2.__k === y2.__k ? d2.__d = e2 = I(d2, e2, n2) : e2 = z(n2, d2, y2, m2, k2, e2), "function" == typeof u2.type && (u2.__d = e2)) : e2 && y2.__e == e2 && e2.parentNode != n2 && (e2 = A(y2));
  }
  for (u2.__e = b2, h2 = w2; h2--; ) null != m2[h2] && ("function" == typeof u2.type && null != m2[h2].__e && m2[h2].__e == u2.__d && (u2.__d = L(i2).nextSibling), q(m2[h2], m2[h2]));
  if (g2) for (h2 = 0; h2 < g2.length; h2++) S(g2[h2], g2[++h2], g2[++h2]);
}
function I(n2, l2, u2) {
  for (var i2, t2 = n2.__k, r2 = 0; t2 && r2 < t2.length; r2++) (i2 = t2[r2]) && (i2.__ = n2, l2 = "function" == typeof i2.type ? I(i2, l2, u2) : z(u2, i2, i2, t2, i2.__e, l2));
  return l2;
}
function j(n2, l2) {
  return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (Array.isArray(n2) ? n2.some(function(n3) {
    j(n3, l2);
  }) : l2.push(n2)), l2;
}
function z(n2, l2, u2, i2, t2, r2) {
  var o2, f2, e2;
  if (void 0 !== l2.__d) o2 = l2.__d, l2.__d = void 0;
  else if (null == u2 || t2 != r2 || null == t2.parentNode) n: if (null == r2 || r2.parentNode !== n2) n2.appendChild(t2), o2 = null;
  else {
    for (f2 = r2, e2 = 0; (f2 = f2.nextSibling) && e2 < i2.length; e2 += 1) if (f2 == t2) break n;
    n2.insertBefore(t2, r2), o2 = r2;
  }
  return void 0 !== o2 ? o2 : t2.nextSibling;
}
function L(n2) {
  var l2, u2, i2;
  if (null == n2.type || "string" == typeof n2.type) return n2.__e;
  if (n2.__k) {
    for (l2 = n2.__k.length - 1; l2 >= 0; l2--) if ((u2 = n2.__k[l2]) && (i2 = L(u2))) return i2;
  }
  return null;
}
function M(n2, u2, i2, t2, r2, o2, f2, e2, c2) {
  var s2, a2, v2, y2, p2, d2, k2, b2, g2, m2, w2, A2, P2, C2, T2, $2 = u2.type;
  if (void 0 !== u2.constructor) return null;
  null != i2.__h && (c2 = i2.__h, e2 = u2.__e = i2.__e, u2.__h = null, o2 = [e2]), (s2 = l.__b) && s2(u2);
  try {
    n: if ("function" == typeof $2) {
      if (b2 = u2.props, g2 = (s2 = $2.contextType) && t2[s2.__c], m2 = s2 ? g2 ? g2.props.value : s2.__ : t2, i2.__c ? k2 = (a2 = u2.__c = i2.__c).__ = a2.__E : ("prototype" in $2 && $2.prototype.render ? u2.__c = a2 = new $2(b2, m2) : (u2.__c = a2 = new x(b2, m2), a2.constructor = $2, a2.render = B), g2 && g2.sub(a2), a2.props = b2, a2.state || (a2.state = {}), a2.context = m2, a2.__n = t2, v2 = a2.__d = true, a2.__h = [], a2._sb = []), null == a2.__s && (a2.__s = a2.state), null != $2.getDerivedStateFromProps && (a2.__s == a2.state && (a2.__s = h({}, a2.__s)), h(a2.__s, $2.getDerivedStateFromProps(b2, a2.__s))), y2 = a2.props, p2 = a2.state, a2.__v = u2, v2) null == $2.getDerivedStateFromProps && null != a2.componentWillMount && a2.componentWillMount(), null != a2.componentDidMount && a2.__h.push(a2.componentDidMount);
      else {
        if (null == $2.getDerivedStateFromProps && b2 !== y2 && null != a2.componentWillReceiveProps && a2.componentWillReceiveProps(b2, m2), !a2.__e && null != a2.shouldComponentUpdate && false === a2.shouldComponentUpdate(b2, a2.__s, m2) || u2.__v === i2.__v) {
          for (u2.__v !== i2.__v && (a2.props = b2, a2.state = a2.__s, a2.__d = false), u2.__e = i2.__e, u2.__k = i2.__k, u2.__k.forEach(function(n3) {
            n3 && (n3.__ = u2);
          }), w2 = 0; w2 < a2._sb.length; w2++) a2.__h.push(a2._sb[w2]);
          a2._sb = [], a2.__h.length && f2.push(a2);
          break n;
        }
        null != a2.componentWillUpdate && a2.componentWillUpdate(b2, a2.__s, m2), null != a2.componentDidUpdate && a2.__h.push(function() {
          a2.componentDidUpdate(y2, p2, d2);
        });
      }
      if (a2.context = m2, a2.props = b2, a2.__P = n2, A2 = l.__r, P2 = 0, "prototype" in $2 && $2.prototype.render) {
        for (a2.state = a2.__s, a2.__d = false, A2 && A2(u2), s2 = a2.render(a2.props, a2.state, a2.context), C2 = 0; C2 < a2._sb.length; C2++) a2.__h.push(a2._sb[C2]);
        a2._sb = [];
      } else do {
        a2.__d = false, A2 && A2(u2), s2 = a2.render(a2.props, a2.state, a2.context), a2.state = a2.__s;
      } while (a2.__d && ++P2 < 25);
      a2.state = a2.__s, null != a2.getChildContext && (t2 = h(h({}, t2), a2.getChildContext())), v2 || null == a2.getSnapshotBeforeUpdate || (d2 = a2.getSnapshotBeforeUpdate(y2, p2)), T2 = null != s2 && s2.type === _ && null == s2.key ? s2.props.children : s2, H(n2, Array.isArray(T2) ? T2 : [T2], u2, i2, t2, r2, o2, f2, e2, c2), a2.base = u2.__e, u2.__h = null, a2.__h.length && f2.push(a2), k2 && (a2.__E = a2.__ = null), a2.__e = false;
    } else null == o2 && u2.__v === i2.__v ? (u2.__k = i2.__k, u2.__e = i2.__e) : u2.__e = O(i2.__e, u2, i2, t2, r2, o2, f2, c2);
    (s2 = l.diffed) && s2(u2);
  } catch (n3) {
    u2.__v = null, (c2 || null != o2) && (u2.__e = e2, u2.__h = !!c2, o2[o2.indexOf(e2)] = null), l.__e(n3, u2, i2);
  }
}
function N(n2, u2) {
  l.__c && l.__c(u2, n2), n2.some(function(u3) {
    try {
      n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
        n3.call(u3);
      });
    } catch (n3) {
      l.__e(n3, u3.__v);
    }
  });
}
function O(l2, u2, i2, t2, r2, o2, f2, e2) {
  var s2, a2, h2, y2 = i2.props, p2 = u2.props, d2 = u2.type, _2 = 0;
  if ("svg" === d2 && (r2 = true), null != o2) {
    for (; _2 < o2.length; _2++) if ((s2 = o2[_2]) && "setAttribute" in s2 == !!d2 && (d2 ? s2.localName === d2 : 3 === s2.nodeType)) {
      l2 = s2, o2[_2] = null;
      break;
    }
  }
  if (null == l2) {
    if (null === d2) return document.createTextNode(p2);
    l2 = r2 ? document.createElementNS("http://www.w3.org/2000/svg", d2) : document.createElement(d2, p2.is && p2), o2 = null, e2 = false;
  }
  if (null === d2) y2 === p2 || e2 && l2.data === p2 || (l2.data = p2);
  else {
    if (o2 = o2 && n.call(l2.childNodes), a2 = (y2 = i2.props || c).dangerouslySetInnerHTML, h2 = p2.dangerouslySetInnerHTML, !e2) {
      if (null != o2) for (y2 = {}, _2 = 0; _2 < l2.attributes.length; _2++) y2[l2.attributes[_2].name] = l2.attributes[_2].value;
      (h2 || a2) && (h2 && (a2 && h2.__html == a2.__html || h2.__html === l2.innerHTML) || (l2.innerHTML = h2 && h2.__html || ""));
    }
    if (k(l2, p2, y2, r2, e2), h2) u2.__k = [];
    else if (_2 = u2.props.children, H(l2, Array.isArray(_2) ? _2 : [_2], u2, i2, t2, r2 && "foreignObject" !== d2, o2, f2, o2 ? o2[0] : i2.__k && A(i2, 0), e2), null != o2) for (_2 = o2.length; _2--; ) null != o2[_2] && v(o2[_2]);
    e2 || ("value" in p2 && void 0 !== (_2 = p2.value) && (_2 !== l2.value || "progress" === d2 && !_2 || "option" === d2 && _2 !== y2.value) && g(l2, "value", _2, y2.value, false), "checked" in p2 && void 0 !== (_2 = p2.checked) && _2 !== l2.checked && g(l2, "checked", _2, y2.checked, false));
  }
  return l2;
}
function S(n2, u2, i2) {
  try {
    "function" == typeof n2 ? n2(u2) : n2.current = u2;
  } catch (n3) {
    l.__e(n3, i2);
  }
}
function q(n2, u2, i2) {
  var t2, r2;
  if (l.unmount && l.unmount(n2), (t2 = n2.ref) && (t2.current && t2.current !== n2.__e || S(t2, null, u2)), null != (t2 = n2.__c)) {
    if (t2.componentWillUnmount) try {
      t2.componentWillUnmount();
    } catch (n3) {
      l.__e(n3, u2);
    }
    t2.base = t2.__P = null, n2.__c = void 0;
  }
  if (t2 = n2.__k) for (r2 = 0; r2 < t2.length; r2++) t2[r2] && q(t2[r2], u2, i2 || "function" != typeof n2.type);
  i2 || null == n2.__e || v(n2.__e), n2.__ = n2.__e = n2.__d = void 0;
}
function B(n2, l2, u2) {
  return this.constructor(n2, u2);
}
function D(u2, i2, t2) {
  var r2, o2, f2;
  l.__ && l.__(u2, i2), o2 = (r2 = "function" == typeof t2) ? null : t2 && t2.__k || i2.__k, f2 = [], M(i2, u2 = (!r2 && t2 || i2).__k = y(_, null, [u2]), o2 || c, c, void 0 !== i2.ownerSVGElement, !r2 && t2 ? [t2] : o2 ? null : i2.firstChild ? n.call(i2.childNodes) : null, f2, !r2 && t2 ? t2 : o2 ? o2.__e : i2.firstChild, r2), N(f2, u2);
}
function F(l2, u2, i2) {
  var t2, r2, o2, f2 = h({}, l2.props);
  for (o2 in u2) "key" == o2 ? t2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : f2[o2] = u2[o2];
  return arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : i2), p(l2.type, f2, t2 || l2.key, r2 || l2.ref, null);
}
function G(n2, l2) {
  var u2 = {
    __c: l2 = "__cC" + e++,
    __: n2,
    Consumer: function(n3, l3) {
      return n3.children(l3);
    },
    Provider: function(n3) {
      var u3, i2;
      return this.getChildContext || (u3 = [], (i2 = {})[l2] = this, this.getChildContext = function() {
        return i2;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value !== n4.value && u3.some(function(n5) {
          n5.__e = true, T(n5);
        });
      }, this.sub = function(n4) {
        u3.push(n4);
        var l3 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u3.splice(u3.indexOf(n4), 1), l3 && l3.call(n4);
        };
      }), n3.children;
    }
  };
  return u2.Provider.__ = u2.Consumer.contextType = u2;
}
n = s.slice, l = {
  __e: function(n2, l2, u2, i2) {
    for (var t2, r2, o2; l2 = l2.__; ) if ((t2 = l2.__c) && !t2.__) try {
      if ((r2 = t2.constructor) && null != r2.getDerivedStateFromError && (t2.setState(r2.getDerivedStateFromError(n2)), o2 = t2.__d), null != t2.componentDidCatch && (t2.componentDidCatch(n2, i2 || {}), o2 = t2.__d), o2) return t2.__E = t2;
    } catch (l3) {
      n2 = l3;
    }
    throw n2;
  }
}, u = 0, i = function(n2) {
  return null != n2 && void 0 === n2.constructor;
}, t = false, x.prototype.setState = function(n2, l2) {
  var u2;
  u2 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n2 && (n2 = n2(h({}, u2), this.props)), n2 && h(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), T(this));
}, x.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), T(this));
}, x.prototype.render = _, r = [], f = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, $.__r = 0, e = 0;

export {
  l,
  i,
  y,
  d,
  _,
  x,
  j,
  D,
  F,
  G
};
//# sourceMappingURL=chunk-XMU66BJW.js.map
