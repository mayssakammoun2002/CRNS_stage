import {
  l
} from "./chunk-XMU66BJW.js";

// node_modules/preact/hooks/dist/hooks.module.js
var t;
var r;
var u;
var i;
var o = 0;
var f = [];
var c = [];
var e = l.__b;
var a = l.__r;
var v = l.diffed;
var l2 = l.__c;
var m = l.unmount;
function d(t2, u2) {
  l.__h && l.__h(r, t2, o || u2), o = 0;
  var i2 = r.__H || (r.__H = {
    __: [],
    __h: []
  });
  return t2 >= i2.__.length && i2.__.push({
    __V: c
  }), i2.__[t2];
}
function p(n) {
  return o = 1, y(B, n);
}
function y(n, u2, i2) {
  var o2 = d(t++, 2);
  if (o2.t = n, !o2.__c && (o2.__ = [i2 ? i2(u2) : B(void 0, u2), function(n2) {
    var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
    t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
  }], o2.__c = r, !r.u)) {
    r.u = true;
    var f2 = r.shouldComponentUpdate;
    r.shouldComponentUpdate = function(n2, t2, r2) {
      if (!o2.__c.__H) return true;
      var u3 = o2.__c.__H.__.filter(function(n3) {
        return n3.__c;
      });
      if (u3.every(function(n3) {
        return !n3.__N;
      })) return !f2 || f2.call(this, n2, t2, r2);
      var i3 = false;
      return u3.forEach(function(n3) {
        if (n3.__N) {
          var t3 = n3.__[0];
          n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
        }
      }), !(!i3 && o2.__c.props === n2) && (!f2 || f2.call(this, n2, t2, r2));
    };
  }
  return o2.__N || o2.__;
}
function h(u2, i2) {
  var o2 = d(t++, 3);
  !l.__s && z(o2.__H, i2) && (o2.__ = u2, o2.i = i2, r.__H.__h.push(o2));
}
function _(n) {
  return o = 5, F(function() {
    return {
      current: n
    };
  }, []);
}
function F(n, r2) {
  var u2 = d(t++, 7);
  return z(u2.__H, r2) ? (u2.__V = n(), u2.i = r2, u2.__h = n, u2.__V) : u2.__;
}
function T(n, t2) {
  return o = 8, F(function() {
    return n;
  }, t2);
}
function b() {
  for (var t2; t2 = f.shift(); ) if (t2.__P && t2.__H) try {
    t2.__H.__h.forEach(k), t2.__H.__h.forEach(w), t2.__H.__h = [];
  } catch (r2) {
    t2.__H.__h = [], l.__e(r2, t2.__v);
  }
}
l.__b = function(n) {
  r = null, e && e(n);
}, l.__r = function(n) {
  a && a(n), t = 0;
  var i2 = (r = n.__c).__H;
  i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
    n2.__N && (n2.__ = n2.__N), n2.__V = c, n2.__N = n2.i = void 0;
  })) : (i2.__h.forEach(k), i2.__h.forEach(w), i2.__h = [])), u = r;
}, l.diffed = function(t2) {
  v && v(t2);
  var o2 = t2.__c;
  o2 && o2.__H && (o2.__H.__h.length && (1 !== f.push(o2) && i === l.requestAnimationFrame || ((i = l.requestAnimationFrame) || j)(b)), o2.__H.__.forEach(function(n) {
    n.i && (n.__H = n.i), n.__V !== c && (n.__ = n.__V), n.i = void 0, n.__V = c;
  })), u = r = null;
}, l.__c = function(t2, r2) {
  r2.some(function(t3) {
    try {
      t3.__h.forEach(k), t3.__h = t3.__h.filter(function(n) {
        return !n.__ || w(n);
      });
    } catch (u2) {
      r2.some(function(n) {
        n.__h && (n.__h = []);
      }), r2 = [], l.__e(u2, t3.__v);
    }
  }), l2 && l2(t2, r2);
}, l.unmount = function(t2) {
  m && m(t2);
  var r2, u2 = t2.__c;
  u2 && u2.__H && (u2.__H.__.forEach(function(n) {
    try {
      k(n);
    } catch (n2) {
      r2 = n2;
    }
  }), u2.__H = void 0, r2 && l.__e(r2, u2.__v));
};
var g = "function" == typeof requestAnimationFrame;
function j(n) {
  var t2, r2 = function() {
    clearTimeout(u2), g && cancelAnimationFrame(t2), setTimeout(n);
  }, u2 = setTimeout(r2, 100);
  g && (t2 = requestAnimationFrame(r2));
}
function k(n) {
  var t2 = r, u2 = n.__c;
  "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
}
function w(n) {
  var t2 = r;
  n.__c = n.__(), r = t2;
}
function z(n, t2) {
  return !n || n.length !== t2.length || t2.some(function(t3, r2) {
    return t3 !== n[r2];
  });
}
function B(n, t2) {
  return "function" == typeof t2 ? t2(n) : t2;
}

export {
  p,
  h,
  _,
  F,
  T
};
//# sourceMappingURL=chunk-TD5KMGFZ.js.map
