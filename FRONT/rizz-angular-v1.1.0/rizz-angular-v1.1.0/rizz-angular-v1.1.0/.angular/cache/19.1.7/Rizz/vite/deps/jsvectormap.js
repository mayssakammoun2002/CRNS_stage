import {
  __commonJS
} from "./chunk-APYJOV5E.js";

// node_modules/jsvectormap/dist/js/jsvectormap.min.js
var require_jsvectormap_min = __commonJS({
  "node_modules/jsvectormap/dist/js/jsvectormap.min.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).jsVectorMap = e();
    }(exports, function() {
      "use strict";
      Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(t2) {
        for (var e2 = (this.document || this.ownerDocument).querySelectorAll(t2), i2 = e2.length; --i2 >= 0 && e2.item(i2) !== this; ) ;
        return i2 > -1;
      }), Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(t2) {
          if (null == t2) throw new TypeError("Cannot convert first argument to object");
          for (var e2 = Object(t2), i2 = 1; i2 < arguments.length; i2++) {
            var s2 = arguments[i2];
            if (null != s2) {
              s2 = Object(s2);
              for (var a2 = Object.keys(Object(s2)), r2 = 0, n2 = a2.length; r2 < n2; r2++) {
                var o2 = a2[r2], h2 = Object.getOwnPropertyDescriptor(s2, o2);
                void 0 !== h2 && h2.enumerable && (e2[o2] = s2[o2]);
              }
            }
          }
          return e2;
        }
      });
      var t = {}, e = 1, i = function(i2, s2, a2, r2) {
        void 0 === r2 && (r2 = {});
        var n2 = "jvm:" + s2 + "::" + e++;
        t[n2] = {
          selector: i2,
          handler: a2
        }, a2._uid = n2, i2.addEventListener(s2, a2, r2);
      }, s = function(e2, i2, s2) {
        var a2 = i2.split(":")[1];
        e2.removeEventListener(a2, s2), delete t[s2._uid];
      }, a = function() {
        return t;
      }, r = function() {
        function t2(t3) {
          return t3 instanceof Element ? (this.selector = t3, this) : (this.selector = document.querySelector(t3), this);
        }
        var e2 = t2.prototype;
        return e2.on = function(t3, e3, s2) {
          return void 0 === s2 && (s2 = {}), i(this.selector, t3, e3, s2), this;
        }, e2.delegate = function(t3, e3, i2) {
          for (var s2 in e3 = e3.split(" ")) this.on(e3[s2], function(e4) {
            var s3 = e4.target;
            s3.matches(t3) && i2.call(s3, e4);
          });
        }, e2.css = function(t3) {
          for (var e3 in t3) this.selector.style[e3] = t3[e3];
          return this;
        }, e2.text = function(t3) {
          return t3 ? (this.selector.textContent = t3, this) : this.selector.textContent;
        }, e2.attr = function(t3, e3) {
          return t3 && e3 ? (this.selector.setAttribute(t3, e3), this) : this.selector.getAttribute(t3);
        }, e2.addClass = function(t3) {
          return this.selector.classList ? (this.selector.classList.add(t3), this) : (-1 == this.selector.className.split(" ").indexOf(t3) && (this.selector.className += " " + t3), this);
        }, e2.append = function(t3) {
          return this.selector.appendChild(t3), this;
        }, e2.show = function() {
          this.css({
            display: "block"
          });
        }, e2.hide = function() {
          this.css({
            display: "none"
          });
        }, e2.height = function() {
          return this.selector.offsetHeight;
        }, e2.width = function() {
          return this.selector.offsetWidth;
        }, t2;
      }(), n = function(t2) {
        return /* @__PURE__ */ function(t3) {
          return !!t3 && "object" == typeof t3;
        }(t2) && !function(t3) {
          var e2 = Object.prototype.toString.call(t3);
          return "[object RegExp]" === e2 || "[object Date]" === e2 || function(t4) {
            return t4.$$typeof === o;
          }(t3);
        }(t2);
      };
      var o = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
      function h(t2, e2) {
        return false !== e2.clone && e2.isMergeableObject(t2) ? d((i2 = t2, Array.isArray(i2) ? [] : {}), t2, e2) : t2;
        var i2;
      }
      function l(t2, e2, i2) {
        return t2.concat(e2).map(function(t3) {
          return h(t3, i2);
        });
      }
      function c(t2) {
        return Object.keys(t2).concat(function(t3) {
          return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t3).filter(function(e2) {
            return t3.propertyIsEnumerable(e2);
          }) : [];
        }(t2));
      }
      function u(t2, e2) {
        try {
          return e2 in t2;
        } catch (t3) {
          return false;
        }
      }
      function p(t2, e2, i2) {
        var s2 = {};
        return i2.isMergeableObject(t2) && c(t2).forEach(function(e3) {
          s2[e3] = h(t2[e3], i2);
        }), c(e2).forEach(function(a2) {
          (function(t3, e3) {
            return u(t3, e3) && !(Object.hasOwnProperty.call(t3, e3) && Object.propertyIsEnumerable.call(t3, e3));
          })(t2, a2) || (u(t2, a2) && i2.isMergeableObject(e2[a2]) ? s2[a2] = function(t3, e3) {
            if (!e3.customMerge) return d;
            var i3 = e3.customMerge(t3);
            return "function" == typeof i3 ? i3 : d;
          }(a2, i2)(t2[a2], e2[a2], i2) : s2[a2] = h(e2[a2], i2));
        }), s2;
      }
      var d = function(t2, e2, i2) {
        (i2 = i2 || {}).arrayMerge = i2.arrayMerge || l, i2.isMergeableObject = i2.isMergeableObject || n, i2.cloneUnlessOtherwiseSpecified = h;
        var s2 = Array.isArray(e2);
        return s2 === Array.isArray(t2) ? s2 ? i2.arrayMerge(t2, e2, i2) : p(t2, e2, i2) : h(e2, i2);
      }, f = {
        isImageUrl: function(t2) {
          return /\.(jpg|gif|png)$/.test(t2);
        },
        createElement: function(t2, e2, i2, s2) {
          void 0 === s2 && (s2 = false);
          var a2 = document.createElement(t2);
          return i2 && (a2[s2 ? "innerHTML" : "textContent"] = i2), e2 && (a2.className = e2), a2;
        },
        removeElement: function(t2) {
          t2.parentNode.removeChild(t2);
        },
        $: function(t2) {
          return new r(t2);
        },
        hyphenate: function(t2) {
          return t2.replace(/[\w]([A-Z])/g, function(t3) {
            return t3[0] + "-" + t3[1];
          }).toLowerCase();
        },
        isFunc: function(t2) {
          return "function" == typeof t2;
        },
        isObj: function(t2) {
          return "object" == typeof t2;
        },
        isStr: function(t2) {
          return "string" == typeof t2;
        },
        isArr: function(t2) {
          return Array.isArray(t2);
        },
        merge: function(t2, e2) {
          return Object.assign(t2, e2);
        },
        mergeDeeply: function(t2, e2) {
          return d(t2, e2);
        },
        keys: function(t2) {
          return Object.keys(t2);
        }
      };
      function m(t2, e2) {
        t2.prototype = Object.create(e2.prototype), t2.prototype.constructor = t2, g(t2, e2);
      }
      function g(t2, e2) {
        return (g = Object.setPrototypeOf || function(t3, e3) {
          return t3.__proto__ = e3, t3;
        })(t2, e2);
      }
      var v = function() {
        function t2(t3, e3) {
          this._name = t3, this.node = this.createElement(t3), e3 && this.set(e3);
        }
        var e2 = t2.prototype;
        return e2.createElement = function(t3) {
          return document.createElementNS("http://www.w3.org/2000/svg", t3);
        }, e2.addClass = function(t3) {
          this.node.setAttribute("class", t3);
        }, e2.getBBox = function() {
          return this.node.getBBox();
        }, e2.set = function(t3, e3) {
          if (f.isObj(t3)) for (var i2 in t3) this.applyAttr(i2, t3[i2]);
          else this.applyAttr(t3, e3);
        }, e2.get = function(t3) {
          return this.style.initial[t3];
        }, e2.applyAttr = function(t3, e3) {
          this.node.setAttribute(f.hyphenate(t3), e3);
        }, e2.remove = function() {
          this.node.parentNode.removeChild(this.node);
        }, t2;
      }(), y = function(t2) {
        function e2(e3, i3, s2) {
          var a2;
          return void 0 === s2 && (s2 = {}), (a2 = t2.call(this, e3, i3) || this).isHovered = false, a2.isSelected = false, a2.style = s2, a2.style.current = {}, a2.updateStyle(), a2;
        }
        m(e2, t2);
        var i2 = e2.prototype;
        return i2.setStyle = function(t3, e3) {
          var i3;
          f.isObj(t3) ? f.merge(this.style.current, t3) : f.merge(this.style.current, ((i3 = {})[t3] = e3, i3));
          this.updateStyle();
        }, i2.updateStyle = function() {
          var t3 = {};
          f.merge(t3, this.style.initial), f.merge(t3, this.style.current), this.isHovered && f.merge(t3, this.style.hover), this.isSelected && (f.merge(t3, this.style.selected), this.isHovered && f.merge(t3, this.style.selectedHover)), this.set(t3);
        }, e2;
      }(v), b = function(t2) {
        function e2(e3, i2) {
          return t2.call(this, "text", e3, i2) || this;
        }
        return m(e2, t2), e2.prototype.applyAttr = function(e3, i2) {
          "text" === e3 ? this.node.textContent = i2 : t2.prototype.applyAttr.call(this, e3, i2);
        }, e2;
      }(y), w = function(t2) {
        function e2(e3, i2) {
          return t2.call(this, "image", e3, i2) || this;
        }
        return m(e2, t2), e2.prototype.applyAttr = function(e3, i2) {
          var s2;
          "image" === e3 ? (f.isObj(i2) ? (s2 = i2.url, this.offset = i2.offset || [0, 0]) : (s2 = i2, this.offset = [0, 0]), this.node.setAttributeNS("http://www.w3.org/1999/xlink", "href", s2), this.width = 23, this.height = 23, this.applyAttr("width", this.width), this.applyAttr("height", this.height), this.applyAttr("x", this.cx - this.width / 2 + this.offset[0]), this.applyAttr("y", this.cy - this.height / 2 + this.offset[1])) : "cx" == e3 ? (this.cx = i2, this.width && this.applyAttr("x", i2 - this.width / 2 + this.offset[0])) : "cy" == e3 ? (this.cy = i2, this.height && this.applyAttr("y", i2 - this.height / 2 + this.offset[1])) : t2.prototype.applyAttr.apply(this, arguments);
        }, e2;
      }(y), S = function(t2) {
        function e2(e3) {
          var i3;
          return (i3 = t2.call(this, "svg") || this)._container = e3, i3._defsElement = new v("defs"), i3._rootElement = new v("g", {
            id: "jvm-regions-group"
          }), i3.node.appendChild(i3._defsElement.node), i3.node.appendChild(i3._rootElement.node), i3._container.append(i3.node), i3;
        }
        m(e2, t2);
        var i2 = e2.prototype;
        return i2.setSize = function(t3, e3) {
          this.node.setAttribute("width", t3), this.node.setAttribute("height", e3);
        }, i2.applyTransformParams = function(t3, e3, i3) {
          this._rootElement.node.setAttribute("transform", "scale(" + t3 + ") translate(" + e3 + ", " + i3 + ")");
        }, i2.createPath = function(t3, e3) {
          var i3 = new y("path", t3, e3);
          return i3.node.setAttribute("fill-rule", "evenodd"), this.add(i3);
        }, i2.createCircle = function(t3, e3, i3) {
          var s2 = new y("circle", t3, e3);
          return this.add(s2, i3);
        }, i2.createLine = function(t3, e3, i3) {
          var s2 = new y("line", t3, e3);
          return this.add(s2, i3);
        }, i2.createText = function(t3, e3, i3) {
          var s2 = new b(t3, e3);
          return this.add(s2, i3);
        }, i2.createImage = function(t3, e3, i3) {
          var s2 = new w(t3, e3);
          return this.add(s2, i3);
        }, i2.createGroup = function(t3) {
          var e3 = new v("g");
          return this.node.appendChild(e3.node), t3 && (e3.node.id = t3), e3.canvas = this, e3;
        }, i2.add = function(t3, e3) {
          return (e3 = e3 || this._rootElement).node.appendChild(t3.node), t3;
        }, e2;
      }(v);
      function k(t2, e2, i2) {
        var s2 = f.$(e2), a2 = -1 === s2.attr("class").indexOf("jvm-region") ? "marker" : "region", r2 = "region" === a2 ? s2.attr("data-code") : s2.attr("data-index"), n2 = a2 + ":selected";
        return i2 && (n2 = a2 + ".tooltip:show"), {
          event: n2,
          type: a2,
          code: r2,
          element: "region" === a2 ? t2.regions[r2].element : t2.markers[r2].element,
          tooltipText: "region" === a2 ? t2.mapData.paths[r2].name || "" : t2.markers[r2].config.name || ""
        };
      }
      var x = function() {
        function t2() {
        }
        var e2 = t2.prototype;
        return e2.getLabelText = function(t3, e3) {
          if (e3) {
            if (f.isFunc(e3.render)) {
              var i2 = [];
              return this.config.marker && i2.push(this.config.marker), i2.push(t3), e3.render.apply(this, i2);
            }
            return t3;
          }
        }, e2.getLabelOffsets = function(t3, e3) {
          return f.isFunc(e3.offsets) ? e3.offsets(t3) : f.isArr(e3.offsets) ? e3.offsets[t3] : [0, 0];
        }, e2.setStyle = function(t3, e3) {
          this.shape.setStyle(t3, e3);
        }, e2.remove = function() {
          this.shape.remove(), this.label && this.label.remove();
        }, e2.hover = function(t3) {
          this._setStatus("isHovered", t3);
        }, e2.select = function(t3) {
          this._setStatus("isSelected", t3);
        }, e2._setStatus = function(t3, e3) {
          this.shape[t3] = e3, this.shape.updateStyle(), this[t3] = e3, this.label && (this.label[t3] = e3, this.label.updateStyle());
        }, t2;
      }(), M = function(t2) {
        function e2(e3) {
          var i2, s2 = e3.map, a2 = e3.code, r2 = e3.path, n2 = e3.style, o2 = e3.label, h2 = e3.labelStyle, l2 = e3.labelsGroup;
          (i2 = t2.call(this) || this).config = arguments[0], i2.canvas = s2.canvas, i2.map = s2, i2.shape = i2.canvas.createPath({
            d: r2,
            dataCode: a2
          }, n2), i2.shape.addClass("jvm-region jvm-element");
          var c2 = i2.shape.getBBox(), u2 = i2.getLabelText(a2, o2);
          if (o2 && u2) {
            var p2 = i2.getLabelOffsets(a2);
            i2.labelX = c2.x + c2.width / 2 + p2[0], i2.labelY = c2.y + c2.height / 2 + p2[1], i2.label = i2.canvas.createText({
              text: u2,
              textAnchor: "middle",
              alignmentBaseline: "central",
              dataCode: a2,
              x: i2.labelX,
              y: i2.labelY
            }, h2, l2), i2.label.addClass("jvm-region jvm-element");
          }
          return i2;
        }
        return m(e2, t2), e2.prototype.updateLabelPosition = function() {
          this.label && this.label.set({
            x: this.labelX * this.map.scale + this.map.transX * this.map.scale,
            y: this.labelY * this.map.scale + this.map.transY * this.map.scale
          });
        }, e2;
      }(x);
      var _ = function(t2) {
        function e2(e3) {
          var i2, s2 = e3.index, a2 = e3.map, r2 = e3.style, n2 = e3.x1, o2 = e3.y1, h2 = e3.x2, l2 = e3.y2, c2 = e3.group;
          return (i2 = t2.call(this) || this).shape = a2.canvas.createLine({
            x1: n2,
            y1: o2,
            x2: h2,
            y2: l2,
            dataIndex: s2
          }, r2, c2), i2.shape.addClass("jvm-line"), i2;
        }
        return m(e2, t2), e2;
      }(x);
      function j(t2, e2) {
        return t2.toLowerCase() + ":to:" + e2.toLowerCase();
      }
      var E = function(t2) {
        function e2(e3) {
          var i3, s2 = e3.index, a2 = e3.style, r2 = e3.label, n2 = e3.cx, o2 = e3.cy, h2 = e3.map, l2 = e3.group;
          return (i3 = t2.call(this) || this)._map = h2, i3._isImage = !!a2.initial.image, i3.config = arguments[0], i3.shape = h2.canvas[i3._isImage ? "createImage" : "createCircle"]({
            dataIndex: s2,
            cx: n2,
            cy: o2
          }, i3._getStyle(), l2), i3.shape.addClass("jvm-marker jvm-element"), i3._isImage && i3.updateLabelPosition(), r2 && i3._createLabel(i3.config), i3;
        }
        m(e2, t2);
        var i2 = e2.prototype;
        return i2.updateLabelPosition = function() {
          this.label && this.label.set({
            x: this._labelX * this._map.scale + this._offsets[0] + this._map.transX * this._map.scale + 5 + (this._isImage ? (this.shape.width || 0) / 2 : this.shape.node.r.baseVal.value),
            y: this._labelY * this._map.scale + this._map.transY * this._map.scale + this._offsets[1]
          });
        }, i2._createLabel = function(t3) {
          var e3 = t3.index, i3 = t3.map, s2 = t3.label, a2 = t3.labelsGroup, r2 = t3.cx, n2 = t3.cy, o2 = t3.marker, h2 = t3.isRecentlyCreated, l2 = this.getLabelText(e3, s2);
          this._labelX = r2 / i3.scale - i3.transX, this._labelY = n2 / i3.scale - i3.transY, this._offsets = h2 && o2.offsets ? o2.offsets : this.getLabelOffsets(e3, s2), this.label = i3.canvas.createText({
            text: l2,
            dataIndex: e3,
            x: this._labelX,
            y: this._labelY,
            dy: "0.6ex"
          }, i3.params.markerLabelStyle, a2), this.label.addClass("jvm-marker jvm-element"), h2 && this.updateLabelPosition();
        }, i2._getStyle = function() {
          var t3 = {};
          return this._isImage ? t3.initial = {
            image: this.config.style.initial.image
          } : t3 = this.config.style, t3;
        }, e2;
      }(x);
      var O = function() {
        function t2(t3) {
          void 0 === t3 && (t3 = {}), this._options = t3, this._map = this._options.map, this._series = this._options.series, this._body = f.createElement("div", "jvm-legend"), this._options.cssClass && this._body.setAttribute("class", this._options.cssClass), t3.vertical ? this._map.legendVertical.appendChild(this._body) : this._map.legendHorizontal.appendChild(this._body), this.render();
        }
        return t2.prototype.render = function() {
          var t3, e2, i2, s2 = this._series.scale.getTicks(), a2 = f.createElement("div", "jvm-legend-inner");
          if (this._body.innderHTML = "", this._options.title) {
            var r2 = f.createElement("div", "jvm-legend-title", this._options.title);
            this._body.appendChild(r2);
          }
          this._body.appendChild(a2);
          for (var n2 = 0; n2 < s2.length; n2++) {
            switch (t3 = f.createElement("div", "jvm-legend-tick"), e2 = f.createElement("div", "jvm-legend-tick-sample"), this._series.config.attribute) {
              case "fill":
                f.isImageUrl(s2[n2].value) ? e2.style.background = "url(" + s2[n2].value + ")" : e2.style.background = s2[n2].value;
                break;
              case "stroke":
                e2.style.background = s2[n2].value;
                break;
              case "image":
                e2.style.background = "url(" + (f.isObj(s2[n2].value) ? s2[n2].value.url : s2[n2].value) + ") no-repeat center center", e2.style.backgroundSize = "cover";
            }
            t3.appendChild(e2), i2 = s2[n2].label, this._options.labelRender && (i2 = this._options.labelRender(i2));
            var o2 = f.createElement("div", "jvm-legend-tick-text", i2);
            t3.appendChild(o2), a2.appendChild(t3);
          }
        }, t2;
      }(), C = function() {
        function t2(t3) {
          this._scale = t3;
        }
        var e2 = t2.prototype;
        return e2.getValue = function(t3) {
          return this._scale[t3];
        }, e2.getTicks = function() {
          var t3 = [];
          for (var e3 in this._scale) t3.push({
            label: e3,
            value: this._scale[e3]
          });
          return t3;
        }, t2;
      }(), X = function() {
        function t2(t3, e3, i2) {
          void 0 === t3 && (t3 = {}), this._map = i2, this._elements = e3, this._values = t3.values || {}, this.config = t3, this.config.attribute = t3.attribute || "fill", t3.attributes && this.setAttributes(t3.attributes), f.isObj(t3.scale) && (this.scale = new C(t3.scale)), this.config.legend && (this.legend = new O(f.merge({
            map: this._map,
            series: this
          }, this.config.legend))), this.setValues(this._values);
        }
        var e2 = t2.prototype;
        return e2.setValues = function(t3) {
          var e3 = {};
          for (var i2 in t3) t3[i2] && (e3[i2] = this.scale.getValue(t3[i2]));
          this.setAttributes(e3);
        }, e2.setAttributes = function(t3) {
          for (var e3 in t3) this._elements[e3] && this._elements[e3].element.setStyle(this.config.attribute, t3[e3]);
        }, e2.clear = function() {
          var t3, e3 = {};
          for (t3 in this._values) this._elements[t3] && (e3[t3] = this._elements[t3].element.shape.style.initial[this.config.attribute]);
          this.setAttributes(e3), this._values = {};
        }, t2;
      }();
      var Y = {
        mill: function(t2, e2, i2) {
          return {
            x: this.radius * (e2 - i2) * this.radDeg,
            y: -this.radius * Math.log(Math.tan((45 + 0.4 * t2) * this.radDeg)) / 0.8
          };
        },
        merc: function(t2, e2, i2) {
          return {
            x: this.radius * (e2 - i2) * this.radDeg,
            y: -this.radius * Math.log(Math.tan(Math.PI / 4 + t2 * Math.PI / 360))
          };
        },
        aea: function(t2, e2, i2) {
          var s2 = i2 * this.radDeg, a2 = 29.5 * this.radDeg, r2 = 45.5 * this.radDeg, n2 = t2 * this.radDeg, o2 = e2 * this.radDeg, h2 = (Math.sin(a2) + Math.sin(r2)) / 2, l2 = Math.cos(a2) * Math.cos(a2) + 2 * h2 * Math.sin(a2), c2 = h2 * (o2 - s2), u2 = Math.sqrt(l2 - 2 * h2 * Math.sin(n2)) / h2, p2 = Math.sqrt(l2 - 2 * h2 * Math.sin(0)) / h2;
          return {
            x: u2 * Math.sin(c2) * this.radius,
            y: -(p2 - u2 * Math.cos(c2)) * this.radius
          };
        },
        lcc: function(t2, e2, i2) {
          var s2 = i2 * this.radDeg, a2 = e2 * this.radDeg, r2 = 33 * this.radDeg, n2 = 45 * this.radDeg, o2 = t2 * this.radDeg, h2 = Math.log(Math.cos(r2) * (1 / Math.cos(n2))) / Math.log(Math.tan(Math.PI / 4 + n2 / 2) * (1 / Math.tan(Math.PI / 4 + r2 / 2))), l2 = Math.cos(r2) * Math.pow(Math.tan(Math.PI / 4 + r2 / 2), h2) / h2, c2 = l2 * Math.pow(1 / Math.tan(Math.PI / 4 + o2 / 2), h2), u2 = l2 * Math.pow(1 / Math.tan(Math.PI / 4 + 0), h2);
          return {
            x: c2 * Math.sin(h2 * (a2 - s2)) * this.radius,
            y: -(u2 - c2 * Math.cos(h2 * (a2 - s2))) * this.radius
          };
        }
      };
      Y.degRad = 180 / Math.PI, Y.radDeg = Math.PI / 180, Y.radius = 6381372;
      var L = function() {
        function t2(t3, e3) {
          var i2 = t3.scale, s2 = t3.values;
          this._scale = i2, this._values = s2, this._fromColor = this.hexToRgb(i2[0]), this._toColor = this.hexToRgb(i2[1]), this._map = e3, this.setMinMaxValues(s2), this.visualize();
        }
        var e2 = t2.prototype;
        return e2.setMinMaxValues = function(t3) {
          for (var e3 in this.min = Number.MAX_VALUE, this.max = 0, t3) (e3 = parseFloat(t3[e3])) > this.max && (this.max = e3), e3 < this.min && (this.min = e3);
        }, e2.visualize = function() {
          var t3, e3 = {};
          for (var i2 in this._values) t3 = parseFloat(this._values[i2]), isNaN(t3) || (e3[i2] = this.getValue(t3));
          this.setAttributes(e3);
        }, e2.setAttributes = function(t3) {
          for (var e3 in t3) this._map.regions[e3] && this._map.regions[e3].element.setStyle("fill", t3[e3]);
        }, e2.getValue = function(t3) {
          for (var e3, i2 = "#", s2 = 0; s2 < 3; s2++) i2 += (1 === (e3 = Math.round(this._fromColor[s2] + (this._toColor[s2] - this._fromColor[s2]) * ((t3 - this.min) / (this.max - this.min))).toString(16)).length ? "0" : "") + e3;
          return i2;
        }, e2.hexToRgb = function(t3) {
          var e3 = 0, i2 = 0, s2 = 0;
          return 4 == t3.length ? (e3 = "0x" + t3[1] + t3[1], i2 = "0x" + t3[2] + t3[2], s2 = "0x" + t3[3] + t3[3]) : 7 == t3.length && (e3 = "0x" + t3[1] + t3[2], i2 = "0x" + t3[3] + t3[4], s2 = "0x" + t3[5] + t3[6]), [parseInt(e3), parseInt(i2), parseInt(s2)];
        }, t2;
      }();
      var T = Object.freeze({
        __proto__: null,
        handleContainerEvents: function() {
          var t2, e2, i2 = this, s2 = false, a2 = this;
          this.params.draggable && (this.container.on("mousemove", function(r2) {
            return s2 && (a2.transX -= (t2 - r2.pageX) / a2.scale, a2.transY -= (e2 - r2.pageY) / a2.scale, a2.applyTransform(), t2 = r2.pageX, e2 = r2.pageY, i2.isBeingDragged = true), false;
          }).on("mousedown", function(i3) {
            return s2 = true, t2 = i3.pageX, e2 = i3.pageY, false;
          }), f.$("body").on("mouseup", function() {
            s2 = false;
          })), this.params.zoomOnScroll && this.container.on("wheel", function(t3) {
            var e3 = 0;
            e3 = (t3.deltaY || -t3.wheelDelta || t3.detail) >> 10 || 1, e3 *= 75;
            var s3 = i2.container.selector.getBoundingClientRect(), r2 = t3.pageX - s3.left - window.pageXOffset, n2 = t3.pageY - s3.top - window.pageYOffset, o2 = Math.pow(1 + a2.params.zoomOnScrollSpeed / 1e3, -1.5 * e3);
            a2.tooltip && a2.tooltip.hide(), a2.setScale(a2.scale * o2, r2, n2);
          }, {
            passive: true
          });
        },
        handleElementEvents: function() {
          var t2 = this, e2 = this;
          this.container.delegate(".jvm-element", "mousedown", function() {
            t2.isBeingDragged = false;
          }), this.container.delegate(".jvm-element", "mouseover mouseout", function(t3) {
            var i2 = k(e2, this, true), s2 = e2.params.showTooltip;
            "mouseover" === t3.type ? t3.defaultPrevented || (i2.element.hover(true), s2 && (e2.tooltip.text(i2.tooltipText), e2.tooltip.show(), e2.emit(i2.event, [e2.tooltip, i2.code]))) : (i2.element.hover(false), s2 && e2.tooltip.hide());
          }), this.container.delegate(".jvm-element", "mouseup", function(t3) {
            var i2 = k(e2, this);
            if (!e2.isBeingDragged && !t3.defaultPrevented && ("region" === i2.type && e2.params.regionsSelectable || "marker" === i2.type && e2.params.markersSelectable)) {
              var s2 = i2.element;
              e2.params[i2.type + "sSelectableOne"] && e2.clearSelected(i2.type + "s"), i2.element.isSelected ? s2.select(false) : s2.select(true), e2.emit(i2.event, [i2.code, s2.isSelected, e2.getSelected(i2.type + "s")]);
            }
          });
        },
        handleZoomButtons: function() {
          var t2 = this, e2 = this, s2 = f.createElement("div", "jvm-zoom-btn jvm-zoomin", "&#43;", true), a2 = f.createElement("div", "jvm-zoom-btn jvm-zoomout", "&#x2212", true);
          this.container.append(s2).append(a2), i(s2, "click", function() {
            t2.setScale(e2.scale * e2.params.zoomStep, e2.width / 2, e2.height / 2, false, e2.params.zoomAnimate);
          }), i(a2, "click", function() {
            t2.setScale(e2.scale / e2.params.zoomStep, e2.width / 2, e2.height / 2, false, e2.params.zoomAnimate);
          });
        },
        bindContainerTouchEvents: function() {
          var t2, e2, i2, s2, a2, r2, n2, o2 = this, h2 = function(h3) {
            var l2, c2, u2, p2, d2 = h3.touches;
            if ("touchstart" == h3.type && (n2 = 0), 1 == d2.length) 1 == n2 && (u2 = o2.transX, p2 = o2.transY, o2.transX -= (i2 - d2[0].pageX) / o2.scale, o2.transY -= (s2 - d2[0].pageY) / o2.scale, o2.tooltip.hide(), o2.applyTransform(), u2 == o2.transX && p2 == o2.transY || h3.preventDefault()), i2 = d2[0].pageX, s2 = d2[0].pageY;
            else if (2 == d2.length) if (2 == n2) c2 = Math.sqrt(Math.pow(d2[0].pageX - d2[1].pageX, 2) + Math.pow(d2[0].pageY - d2[1].pageY, 2)) / e2, o2.setScale(t2 * c2, a2, r2), o2.tooltip.hide(), h3.preventDefault();
            else {
              var f2 = o2.container.selector.getBoundingClientRect();
              l2 = {
                top: f2.top + window.scrollY,
                left: f2.left + window.scrollX
              }, a2 = d2[0].pageX > d2[1].pageX ? d2[1].pageX + (d2[0].pageX - d2[1].pageX) / 2 : d2[0].pageX + (d2[1].pageX - d2[0].pageX) / 2, r2 = d2[0].pageY > d2[1].pageY ? d2[1].pageY + (d2[0].pageY - d2[1].pageY) / 2 : d2[0].pageY + (d2[1].pageY - d2[0].pageY) / 2, a2 -= l2.left, r2 -= l2.top, t2 = o2.scale, e2 = Math.sqrt(Math.pow(d2[0].pageX - d2[1].pageX, 2) + Math.pow(d2[0].pageY - d2[1].pageY, 2));
            }
            n2 = d2.length;
          };
          this.container.on("touchstart", h2).on("touchmove", h2);
        },
        createRegions: function() {
          var t2, e2;
          for (t2 in this.regionLabelsGroup = this.regionLabelsGroup || this.canvas.createGroup("jvm-regions-labels-group"), this.mapData.paths) e2 = new M({
            map: this,
            code: t2,
            path: this.mapData.paths[t2].path,
            style: f.merge({}, this.params.regionStyle),
            labelStyle: this.params.regionLabelStyle,
            labelsGroup: this.regionLabelsGroup,
            label: this.params.labels && this.params.labels.regions
          }), this.regions[t2] = {
            config: this.mapData.paths[t2],
            element: e2
          };
        },
        createLines: function(t2, e2, i2) {
          var s2 = this;
          void 0 === i2 && (i2 = false);
          var a2, r2 = false, n2 = false;
          for (var o2 in this.linesGroup = this.linesGroup || this.canvas.createGroup("jvm-lines-group"), t2) {
            var h2 = t2[o2];
            for (var l2 in e2) {
              var c2 = i2 ? e2[l2].config : e2[l2];
              c2.name === h2.from && (r2 = this.getMarkerPosition(c2)), c2.name === h2.to && (n2 = this.getMarkerPosition(c2));
            }
            false !== r2 && false !== n2 && (a2 = new _({
              index: o2,
              map: this,
              style: f.mergeDeeply({
                initial: this.params.lineStyle
              }, {
                initial: h2.style || {}
              }),
              x1: r2.x,
              y1: r2.y,
              x2: n2.x,
              y2: n2.y,
              group: this.linesGroup
            }), i2 && Object.keys(this.lines).forEach(function(e3) {
              e3 === j(t2[0].from, t2[0].to) && s2.lines[e3].element.remove();
            }), this.lines[j(h2.from, h2.to)] = {
              element: a2,
              config: h2
            });
          }
        },
        createMarkers: function(t2, e2) {
          var i2, s2, a2, r2, n2 = this;
          for (var o2 in void 0 === t2 && (t2 = {}), void 0 === e2 && (e2 = false), this.markersGroup = this.markersGroup || this.canvas.createGroup("jvm-markers-group"), this.markerLabelsGroup = this.markerLabelsGroup || this.canvas.createGroup("jvm-markers-labels-group"), t2) {
            if (i2 = t2[o2], a2 = this.getMarkerPosition(i2), r2 = i2.coords.join(":"), e2) {
              if (f.keys(this.markers).filter(function(t3) {
                return n2.markers[t3]._uid === r2;
              }).length) continue;
              o2 = f.keys(this.markers).length;
            }
            false !== a2 && (s2 = new E({
              index: o2,
              map: this,
              style: f.mergeDeeply(this.params.markerStyle, {
                initial: i2.style || {}
              }),
              label: this.params.labels && this.params.labels.markers,
              labelsGroup: this.markerLabelsGroup,
              cx: a2.x,
              cy: a2.y,
              group: this.markersGroup,
              marker: i2,
              isRecentlyCreated: e2
            }), this.markers[o2] && this.removeMarkers([o2]), this.markers[o2] = {
              _uid: r2,
              config: i2,
              element: s2
            });
          }
        },
        createTooltip: function() {
          var t2 = this, e2 = f.createElement("div", "jvm-tooltip");
          this.tooltip = f.$(document.body.appendChild(e2)), this.container.on("mousemove", function(i2) {
            if ("block" === t2.tooltip.selector.style.display) {
              var s2 = t2.container.selector.querySelector("#jvm-regions-group").getBoundingClientRect(), a2 = e2.getBoundingClientRect(), r2 = a2.height, n2 = a2.width, o2 = i2.clientY <= s2.top + r2 + 5, h2 = i2.pageY - r2 - 5, l2 = i2.pageX - n2 - 5;
              o2 && (h2 += r2 + 5, l2 -= 10), i2.clientX < s2.left + n2 + 5 && (l2 = i2.pageX + 5 + 2, o2 && (l2 += 10)), t2.tooltip.css({
                top: h2 + "px",
                left: l2 + "px"
              });
            }
          });
        },
        createSeries: function() {
          for (var t2 in this.series = {
            markers: [],
            regions: []
          }, this.params.series) for (var e2 = 0; e2 < this.params.series[t2].length; e2++) this.series[t2][e2] = new X(this.params.series[t2][e2], this[t2], this);
        },
        applyTransform: function() {
          var t2, e2, i2, s2;
          this.defaultWidth * this.scale <= this.width ? (t2 = (this.width - this.defaultWidth * this.scale) / (2 * this.scale), i2 = (this.width - this.defaultWidth * this.scale) / (2 * this.scale)) : (t2 = 0, i2 = (this.width - this.defaultWidth * this.scale) / this.scale), this.defaultHeight * this.scale <= this.height ? (e2 = (this.height - this.defaultHeight * this.scale) / (2 * this.scale), s2 = (this.height - this.defaultHeight * this.scale) / (2 * this.scale)) : (e2 = 0, s2 = (this.height - this.defaultHeight * this.scale) / this.scale), this.transY > e2 ? this.transY = e2 : this.transY < s2 && (this.transY = s2), this.transX > t2 ? this.transX = t2 : this.transX < i2 && (this.transX = i2), this.canvas.applyTransformParams(this.scale, this.transX, this.transY), this.markers && this.repositionMarkers(), this.lines && this.repositionLines(), this.repositionLabels();
        },
        setFocus: function(t2) {
          var e2 = this;
          void 0 === t2 && (t2 = {});
          var i2, s2 = [];
          if (t2.region ? s2.push(t2.region) : t2.regions && (s2 = t2.regions), s2.length) return s2.forEach(function(t3) {
            if (e2.regions[t3]) {
              var s3 = e2.regions[t3].element.shape.getBBox();
              s3 && (i2 = void 0 === i2 ? s3 : {
                x: Math.min(i2.x, s3.x),
                y: Math.min(i2.y, s3.y),
                width: Math.max(i2.x + i2.width, s3.x + s3.width) - Math.min(i2.x, s3.x),
                height: Math.max(i2.y + i2.height, s3.y + s3.height) - Math.min(i2.y, s3.y)
              });
            }
          }), this.setScale(Math.min(this.width / i2.width, this.height / i2.height), -(i2.x + i2.width / 2), -(i2.y + i2.height / 2), true, t2.animate);
          if (t2.coords) {
            var a2 = this.coordsToPoint(t2.coords[0], t2.coords[1]), r2 = this.transX - a2.x / this.scale, n2 = this.transY - a2.y / this.scale;
            return this.setScale(t2.scale * this.baseScale, r2, n2, true, t2.animate);
          }
        },
        resize: function() {
          var t2 = this.baseScale;
          this.width / this.height > this.defaultWidth / this.defaultHeight ? (this.baseScale = this.height / this.defaultHeight, this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale)) : (this.baseScale = this.width / this.defaultWidth, this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale)), this.scale *= this.baseScale / t2, this.transX *= this.baseScale / t2, this.transY *= this.baseScale / t2;
        },
        setScale: function(t2, e2, i2, s2, a2) {
          var r2, n2, o2, h2, l2, c2, u2, p2, d2, f2, m2 = this, g2 = 0, v2 = Math.abs(Math.round(60 * (t2 - this.scale) / Math.max(t2, this.scale)));
          t2 > this.params.zoomMax * this.baseScale ? t2 = this.params.zoomMax * this.baseScale : t2 < this.params.zoomMin * this.baseScale && (t2 = this.params.zoomMin * this.baseScale), void 0 !== e2 && void 0 !== i2 && (r2 = t2 / this.scale, s2 ? (d2 = e2 + this.defaultWidth * (this.width / (this.defaultWidth * t2)) / 2, f2 = i2 + this.defaultHeight * (this.height / (this.defaultHeight * t2)) / 2) : (d2 = this.transX - (r2 - 1) / t2 * e2, f2 = this.transY - (r2 - 1) / t2 * i2)), a2 && v2 > 0 ? (o2 = this.scale, h2 = (t2 - o2) / v2, l2 = this.transX * this.scale, u2 = this.transY * this.scale, c2 = (d2 * t2 - l2) / v2, p2 = (f2 * t2 - u2) / v2, n2 = setInterval(function() {
            g2 += 1, m2.scale = o2 + h2 * g2, m2.transX = (l2 + c2 * g2) / m2.scale, m2.transY = (u2 + p2 * g2) / m2.scale, m2.applyTransform(), g2 == v2 && (clearInterval(n2), m2.emit("viewport:changed", [m2.scale, m2.transX, m2.transY]));
          }, 10)) : (this.transX = d2, this.transY = f2, this.scale = t2, this.applyTransform(), this.emit("viewport:changed", [this.scale, this.transX, this.transY]));
        },
        updateSize: function() {
          this.width = this.container.width(), this.height = this.container.height(), this.resize(), this.canvas.setSize(this.width, this.height), this.applyTransform();
        },
        coordsToPoint: function(t2, e2) {
          var i2, s2, a2, r2 = z.maps[this.params.map].projection, n2 = r2.centralMeridian;
          return i2 = Y[r2.type](t2, e2, n2), !!(s2 = this.getInsetForPoint(i2.x, i2.y)) && (a2 = s2.bbox, i2.x = (i2.x - a2[0].x) / (a2[1].x - a2[0].x) * s2.width * this.scale, i2.y = (i2.y - a2[0].y) / (a2[1].y - a2[0].y) * s2.height * this.scale, {
            x: i2.x + this.transX * this.scale + s2.left * this.scale,
            y: i2.y + this.transY * this.scale + s2.top * this.scale
          });
        },
        getInsetForPoint: function(t2, e2) {
          var i2, s2, a2 = z.maps[this.params.map].insets;
          for (i2 = 0; i2 < a2.length; i2++) if (t2 > (s2 = a2[i2].bbox)[0].x && t2 < s2[1].x && e2 > s2[0].y && e2 < s2[1].y) return a2[i2];
        },
        getMarkerPosition: function(t2) {
          var e2 = t2.coords;
          return z.maps[this.params.map].projection ? this.coordsToPoint.apply(this, e2) : {
            x: e2[0] * this.scale + this.transX * this.scale,
            y: e2[1] * this.scale + this.transY * this.scale
          };
        },
        repositionLines: function() {
          var t2 = false, e2 = false;
          for (var i2 in this.lines) {
            for (var s2 in this.markers) {
              var a2 = this.markers[s2];
              a2.config.name === this.lines[i2].config.from && (t2 = this.getMarkerPosition(a2.config)), a2.config.name === this.lines[i2].config.to && (e2 = this.getMarkerPosition(a2.config));
            }
            false !== t2 && false !== e2 && this.lines[i2].element.setStyle({
              x1: t2.x,
              y1: t2.y,
              x2: e2.x,
              y2: e2.y
            });
          }
        },
        repositionMarkers: function() {
          var t2;
          for (var e2 in this.markers) false !== (t2 = this.getMarkerPosition(this.markers[e2].config)) && this.markers[e2].element.setStyle({
            cx: t2.x,
            cy: t2.y
          });
        },
        repositionLabels: function() {
          var t2 = this.params.labels;
          if (t2) {
            if (t2.regions) for (var e2 in this.regions) this.regions[e2].element.updateLabelPosition();
            if (t2.markers) for (var i2 in this.markers) this.markers[i2].element.updateLabelPosition();
          }
        },
        visualizeData: function(t2) {
          f.isObj(t2) && (this.dataVisualization = new L(t2, this));
        }
      }), A = {
        onViewportChange: "viewport:changed",
        onRegionSelected: "region:selected",
        onMarkerSelected: "marker:selected",
        onRegionTooltipShow: "region.tooltip:show",
        onMarkerTooltipShow: "marker.tooltip:show",
        onLoaded: "map:loaded",
        onDestroyed: "map:destroyed"
      }, z = function() {
        function t2(e3) {
          if (void 0 === e3 && (e3 = {}), this.params = f.mergeDeeply(t2.defaults, e3), !t2.maps[this.params.map]) throw new Error("Attempt to use map which was not loaded: " + e3.map);
          this.mapData = t2.maps[this.params.map], this.regions = {}, this.markers = {}, this.lines = {}, this.defaultWidth = this.mapData.width, this.defaultHeight = this.mapData.height, this.height = 0, this.width = 0, this.scale = 1, this.baseScale = 1, this.transX = 0, this.transY = 0, this.baseTransX = 0, this.baseTransY = 0, this.isBeingDragged = false, this.selector = e3.selector, "loading" !== window.document.readyState ? this.init(e3.selector) : window.addEventListener("DOMContentLoaded", this.init.bind(this, e3.selector));
        }
        var e2 = t2.prototype;
        return e2.init = function(t3) {
          var e3 = this.params;
          this.container = f.$(t3).addClass("jvm-container"), this.canvas = new S(this.container, this.width, this.height), this.setBackgroundColor(e3.backgroundColor), this.handleContainerEvents(), this.createRegions(), this.updateSize(), this.createLines(e3.lines || {}, e3.markers || {}), this.createMarkers(e3.markers), this.handleElementEvents(), this.repositionLabels(), e3.showTooltip && this.createTooltip(), e3.zoomButtons && this.handleZoomButtons(), e3.selectedRegions && this.setSelected("regions", e3.selectedRegions), e3.selectedMarkers && this.setSelected("markers", e3.selectedMarkers), e3.focusOn && this.setFocus(e3.focusOn), e3.visualizeData && this.visualizeData(e3.visualizeData), e3.bindTouchEvents && ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) && this.bindContainerTouchEvents(), e3.series && (this.container.append(this.legendHorizontal = f.createElement("div", "jvm-series-container jvm-series-h")).append(this.legendVertical = f.createElement("div", "jvm-series-container jvm-series-v")), this.createSeries()), this.emit("map:loaded", [this]);
        }, e2.emit = function(t3, e3) {
          for (var i2 in A) A[i2] === t3 && f.isFunc(this.params[i2]) && this.params[i2].apply(this, e3);
        }, e2.setBackgroundColor = function(t3) {
          this.container.css({
            backgroundColor: t3
          });
        }, e2.getSelected = function(t3) {
          var e3, i2 = [];
          for (e3 in this[t3]) this[t3][e3].element.isSelected && i2.push(e3);
          return i2;
        }, e2.clearSelected = function(t3) {
          var e3 = this;
          this.getSelected(t3).forEach(function(i2) {
            e3[t3][i2].element.select(false);
          });
        }, e2.setSelected = function(t3, e3) {
          var i2 = this;
          e3.forEach(function(e4) {
            i2[t3][e4] && i2[t3][e4].element.select(true);
          });
        }, e2.getSelectedRegions = function() {
          return this.getSelected("regions");
        }, e2.clearSelectedRegions = function() {
          var t3 = this;
          this.getSelected("regions").forEach(function(e3) {
            t3.regions[e3].element.select(false);
          });
        }, e2.getSelectedMarkers = function() {
          return this.getSelected("markers");
        }, e2.clearSelectedMarkers = function() {
          var t3 = this;
          this.getSelected("markers").forEach(function(e3) {
            t3.markers[e3].element.select(false);
          });
        }, e2.addMarker = function(t3) {
          console.warn("`addMarker` method is depreacted, please use `addMarkers` instead."), this.createMarkers([t3], true);
        }, e2.addMarkers = function(t3) {
          if ("object" == typeof t3) return this.createMarkers([t3], true);
          this.createMarkers(t3, true);
        }, e2.removeMarkers = function(t3) {
          var e3 = this;
          t3 || (t3 = Object.keys(this.markers)), t3.forEach(function(t4) {
            e3.markers[t4].element.remove(), delete e3.markers[t4];
          });
        }, e2.addLine = function(t3, e3, i2) {
          void 0 === i2 && (i2 = {}), this.createLines([{
            from: t3,
            to: e3,
            style: i2
          }], this.markers, true);
        }, e2.reset = function() {
          for (var t3 in this.series) for (var e3 = 0; e3 < this.series[t3].length; e3++) this.series[t3][e3].clear();
          this.legendHorizontal && (f.removeElement(this.legendHorizontal), this.legendHorizontal = null), this.legendVertical && (f.removeElement(this.legendVertical), this.legendVertical = null), this.scale = this.baseScale, this.transX = this.baseTransX, this.transY = this.baseTransY, this.applyTransform(), this.clearSelectedMarkers(), this.clearSelectedRegions(), this.removeMarkers();
        }, e2.destroy = function(t3) {
          var e3 = this;
          void 0 === t3 && (t3 = true);
          var i2 = a(), r2 = this.tooltip.selector, n2 = Object.keys;
          f.removeElement(r2), n2(i2).forEach(function(t4) {
            s(i2[t4].selector, t4, i2[t4].handler);
          }), this.emit("map:destroyed"), t3 && n2(this).forEach(function(t4) {
            try {
              delete e3[t4];
            } catch (t5) {
            }
          });
        }, e2.extend = function(e3, i2) {
          t2.prototype[e3] = i2;
        }, e2.getUtils = function() {
          return f;
        }, t2;
      }();
      z.maps = {}, z.defaults = {
        map: "world",
        backgroundColor: "tranparent",
        draggable: true,
        zoomButtons: true,
        zoomOnScroll: true,
        zoomOnScrollSpeed: 3,
        zoomMax: 12,
        zoomMin: 1,
        zoomAnimate: true,
        showTooltip: true,
        zoomStep: 1.5,
        bindTouchEvents: true,
        lineStyle: {
          stroke: "#808080",
          strokeWidth: 1,
          strokeLinecap: "round"
        },
        markersSelectable: false,
        markersSelectableOne: false,
        markerStyle: {
          initial: {
            r: 7,
            fill: "#374151",
            fillOpacity: 1,
            stroke: "#FFF",
            strokeWidth: 5,
            strokeOpacity: 0.5
          },
          hover: {
            fill: "#3cc0ff",
            cursor: "pointer"
          },
          selected: {
            fill: "blue"
          },
          selectedHover: {}
        },
        markerLabelStyle: {
          initial: {
            fontFamily: "Verdana",
            fontSize: 12,
            fontWeight: 500,
            cursor: "default",
            fill: "#374151"
          },
          hover: {
            cursor: "pointer"
          },
          selected: {},
          selectedHover: {}
        },
        regionsSelectable: false,
        regionsSelectableOne: false,
        regionStyle: {
          initial: {
            fill: "#dee2e8",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0
          },
          hover: {
            fillOpacity: 0.7,
            cursor: "pointer"
          },
          selected: {
            fill: "#9ca3af"
          },
          selectedHover: {}
        },
        regionLabelStyle: {
          initial: {
            fontFamily: "Verdana",
            fontSize: "12",
            fontWeight: "bold",
            cursor: "default",
            fill: "#35373e"
          },
          hover: {
            cursor: "pointer"
          }
        }
      }, Object.assign(z.prototype, T);
      var D = function() {
        function t2(t3) {
          if (void 0 === t3 && (t3 = {}), !t3.selector) throw new Error("Selector is not given.");
          return new z(t3);
        }
        return t2.prototype.addMap = function(t3, e2) {
          z.maps[t3] = e2;
        }, t2;
      }();
      return window.jsVectorMap = D;
    });
  }
});
export default require_jsvectormap_min();
//# sourceMappingURL=jsvectormap.js.map
