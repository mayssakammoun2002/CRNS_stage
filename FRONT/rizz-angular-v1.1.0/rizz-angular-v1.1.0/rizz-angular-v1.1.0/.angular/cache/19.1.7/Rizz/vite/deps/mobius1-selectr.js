import {
  __commonJS
} from "./chunk-APYJOV5E.js";

// node_modules/mobius1-selectr/dist/selectr.min.js
var require_selectr_min = __commonJS({
  "node_modules/mobius1-selectr/dist/selectr.min.js"(exports, module) {
    (function(g, k) {
      "function" === typeof define && define.amd ? define([], k) : "object" === typeof exports ? module.exports = k("Selectr") : g.Selectr = k("Selectr");
    })(exports, function(g) {
      function k(a, c) {
        return a.hasOwnProperty(c) && (true === a[c] || a[c].length);
      }
      function n(a, c, e) {
        a.parentNode ? a.parentNode.parentNode || c.appendChild(a.parentNode) : c.appendChild(a);
        b.removeClass(a, "excluded");
        e || (a.innerHTML = a.textContent);
      }
      var l = function() {
      };
      l.prototype = {
        on: function(a, c) {
          this._events = this._events || {};
          this._events[a] = this._events[a] || [];
          this._events[a].push(c);
        },
        off: function(a, c) {
          this._events = this._events || {};
          false !== a in this._events && this._events[a].splice(this._events[a].indexOf(c), 1);
        },
        emit: function(a) {
          this._events = this._events || {};
          if (false !== a in this._events) for (var c = 0; c < this._events[a].length; c++) this._events[a][c].apply(this, Array.prototype.slice.call(arguments, 1));
        }
      };
      l.mixin = function(a) {
        for (var c = ["on", "off", "emit"], b2 = 0; b2 < c.length; b2++) "function" === typeof a ? a.prototype[c[b2]] = l.prototype[c[b2]] : a[c[b2]] = l.prototype[c[b2]];
        return a;
      };
      var b = {
        extend: function(a, c) {
          for (var e in c) if (c.hasOwnProperty(e)) {
            var d = c[e];
            d && "[object Object]" === Object.prototype.toString.call(d) ? (a[e] = a[e] || {}, b.extend(a[e], d)) : a[e] = d;
          }
          return a;
        },
        each: function(a, c, b2) {
          if ("[object Object]" === Object.prototype.toString.call(a)) for (var d in a) Object.prototype.hasOwnProperty.call(a, d) && c.call(b2, d, a[d], a);
          else {
            d = 0;
            for (var e = a.length; d < e; d++) c.call(b2, d, a[d], a);
          }
        },
        createElement: function(a, c) {
          var b2 = document, d = b2.createElement(a);
          if (c && "[object Object]" === Object.prototype.toString.call(c)) for (var f in c) if (f in d) d[f] = c[f];
          else if ("html" === f) d.innerHTML = c[f];
          else if ("text" === f) {
            var h = b2.createTextNode(c[f]);
            d.appendChild(h);
          } else d.setAttribute(f, c[f]);
          return d;
        },
        hasClass: function(a, b2) {
          if (a) return a.classList ? a.classList.contains(b2) : !!a.className && !!a.className.match(new RegExp("(\\s|^)" + b2 + "(\\s|$)"));
        },
        addClass: function(a, c) {
          b.hasClass(a, c) || (a.classList ? a.classList.add(c) : a.className = a.className.trim() + " " + c);
        },
        removeClass: function(a, c) {
          b.hasClass(a, c) && (a.classList ? a.classList.remove(c) : a.className = a.className.replace(new RegExp("(^|\\s)" + c.split(" ").join("|") + "(\\s|$)", "gi"), " "));
        },
        closest: function(a, c) {
          return a && a !== document.body && (c(a) ? a : b.closest(a.parentNode, c));
        },
        isInt: function(a) {
          return "number" === typeof a && isFinite(a) && Math.floor(a) === a;
        },
        debounce: function(a, b2, e) {
          var d;
          return function() {
            var c = this, h = arguments, g2 = e && !d;
            clearTimeout(d);
            d = setTimeout(function() {
              d = null;
              e || a.apply(c, h);
            }, b2);
            g2 && a.apply(c, h);
          };
        },
        rect: function(a, b2) {
          var c = window, d = a.getBoundingClientRect(), f = b2 ? c.pageXOffset : 0;
          c = b2 ? c.pageYOffset : 0;
          return {
            bottom: d.bottom + c,
            height: d.height,
            left: d.left + f,
            right: d.right + f,
            top: d.top + c,
            width: d.width
          };
        },
        includes: function(a, b2) {
          return -1 < a.indexOf(b2);
        },
        startsWith: function(a, b2) {
          return a.substr(0, b2.length) === b2;
        },
        truncate: function(a) {
          for (; a.firstChild; ) a.removeChild(a.firstChild);
        }
      }, p = function() {
        if (this.items.length) {
          var a = document.createDocumentFragment();
          if (this.config.pagination) {
            var c = this.pages.slice(0, this.pageIndex);
            b.each(c, function(c2, d) {
              b.each(d, function(d2, b2) {
                n(b2, a, this.customOption);
              }, this);
            }, this);
          } else b.each(this.items, function(b2, d) {
            n(d, a, this.customOption);
          }, this);
          a.childElementCount && (b.removeClass(this.items[this.navIndex], "active"), this.navIndex = (a.querySelector(".selectr-option.selected") || a.querySelector(".selectr-option")).idx, b.addClass(this.items[this.navIndex], "active"));
          this.tree.appendChild(a);
        }
      }, t = function(a) {
        this.container.contains(a.target) || !this.opened && !b.hasClass(this.container, "notice") || this.close();
      }, m = function(a, c) {
        var e = this.customOption ? this.config.renderOption(c || a) : a.textContent;
        e = b.createElement("li", {
          "class": "selectr-option",
          html: e,
          role: "treeitem",
          "aria-selected": false
        });
        e.idx = a.idx;
        this.items.push(e);
        a.defaultSelected && this.defaultSelected.push(a.idx);
        a.disabled && (e.disabled = true, b.addClass(e, "disabled"));
        return e;
      }, u = function() {
        this.requiresPagination = this.config.pagination && 0 < this.config.pagination;
        k(this.config, "width") && (b.isInt(this.config.width) ? this.width = this.config.width + "px" : "auto" === this.config.width ? this.width = "100%" : b.includes(this.config.width, "%") && (this.width = this.config.width));
        this.container = b.createElement("div", {
          "class": "selectr-container"
        });
        this.config.customClass && b.addClass(this.container, this.config.customClass);
        this.mobileDevice ? b.addClass(this.container, "selectr-mobile") : b.addClass(this.container, "selectr-desktop");
        this.el.tabIndex = -1;
        this.config.nativeDropdown || this.mobileDevice ? b.addClass(this.el, "selectr-visible") : b.addClass(this.el, "selectr-hidden");
        this.selected = b.createElement("div", {
          "class": "selectr-selected",
          disabled: this.disabled,
          tabIndex: 0,
          "aria-expanded": false
        });
        this.label = b.createElement(this.el.multiple ? "ul" : "span", {
          "class": "selectr-label"
        });
        var a = b.createElement("div", {
          "class": "selectr-options-container"
        });
        this.tree = b.createElement("ul", {
          "class": "selectr-options",
          role: "tree",
          "aria-hidden": true,
          "aria-expanded": false
        });
        this.notice = b.createElement("div", {
          "class": "selectr-notice"
        });
        this.el.setAttribute("aria-hidden", true);
        this.disabled && (this.el.disabled = true);
        this.el.multiple && (b.addClass(this.label, "selectr-tags"), b.addClass(this.container, "multiple"), this.tags = [], this.selectedValues = this.getSelectedProperties("value"), this.selectedIndexes = this.getSelectedProperties("idx"));
        this.selected.appendChild(this.label);
        this.config.clearable && (this.selectClear = b.createElement("button", {
          "class": "selectr-clear",
          type: "button"
        }), this.container.appendChild(this.selectClear), b.addClass(this.container, "clearable"));
        if (this.config.taggable) {
          var c = b.createElement("li", {
            "class": "input-tag"
          });
          this.input = b.createElement("input", {
            "class": "selectr-tag-input",
            placeholder: this.config.tagPlaceholder,
            tagIndex: 0,
            autocomplete: "off",
            autocorrect: "off",
            autocapitalize: "off",
            spellcheck: "false",
            role: "textbox",
            type: "search"
          });
          c.appendChild(this.input);
          this.label.appendChild(c);
          b.addClass(this.container, "taggable");
          this.tagSeperators = [","];
          this.config.tagSeperators && (this.tagSeperators = this.tagSeperators.concat(this.config.tagSeperators));
        }
        this.config.searchable && (this.input = b.createElement("input", {
          "class": "selectr-input",
          tagIndex: -1,
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          spellcheck: "false",
          role: "textbox",
          type: "search"
        }), this.inputClear = b.createElement("button", {
          "class": "selectr-input-clear",
          type: "button"
        }), this.inputContainer = b.createElement("div", {
          "class": "selectr-input-container"
        }), this.inputContainer.appendChild(this.input), this.inputContainer.appendChild(this.inputClear), a.appendChild(this.inputContainer));
        a.appendChild(this.notice);
        a.appendChild(this.tree);
        this.items = [];
        this.options = [];
        this.el.options.length && (this.options = [].slice.call(this.el.options));
        var e = false, d = 0;
        this.el.children.length && b.each(this.el.children, function(a2, c2) {
          "OPTGROUP" === c2.nodeName ? (e = b.createElement("ul", {
            "class": "selectr-optgroup",
            role: "group",
            html: "<li class='selectr-optgroup--label'>" + c2.label + "</li>"
          }), b.each(c2.children, function(a3, b2) {
            b2.idx = d;
            e.appendChild(m.call(this, b2, e));
            d++;
          }, this)) : (c2.idx = d, m.call(this, c2), d++);
        }, this);
        if (this.config.data && Array.isArray(this.config.data)) {
          this.data = [];
          var f = false, h;
          e = false;
          d = 0;
          b.each(this.config.data, function(a2, c2) {
            k(c2, "children") ? (f = b.createElement("optgroup", {
              label: c2.text
            }), e = b.createElement("ul", {
              "class": "selectr-optgroup",
              role: "group",
              html: "<li class='selectr-optgroup--label'>" + c2.text + "</li>"
            }), b.each(c2.children, function(a3, b2) {
              h = new Option(b2.text, b2.value, false, b2.hasOwnProperty("selected") && true === b2.selected);
              h.disabled = k(b2, "disabled");
              this.options.push(h);
              f.appendChild(h);
              h.idx = d;
              e.appendChild(m.call(this, h, b2));
              this.data[d] = b2;
              d++;
            }, this), this.el.appendChild(f)) : (h = new Option(c2.text, c2.value, false, c2.hasOwnProperty("selected") && true === c2.selected), h.disabled = k(c2, "disabled"), this.options.push(h), h.idx = d, m.call(this, h, c2), this.data[d] = c2, d++);
          }, this);
        }
        this.setSelected(true);
        for (var g2 = this.navIndex = 0; g2 < this.items.length; g2++) if (c = this.items[g2], !b.hasClass(c, "disabled")) {
          b.addClass(c, "active");
          this.navIndex = g2;
          break;
        }
        this.requiresPagination && (this.pageIndex = 1, this.paginate());
        this.container.appendChild(this.selected);
        this.container.appendChild(a);
        this.placeEl = b.createElement("div", {
          "class": "selectr-placeholder"
        });
        this.setPlaceholder();
        this.selected.appendChild(this.placeEl);
        this.disabled && this.disable();
        this.el.parentNode.insertBefore(this.container, this.el);
        this.container.appendChild(this.el);
      }, v = function(a) {
        a = a || window.event;
        if (this.items.length && this.opened && b.includes([13, 38, 40], a.which)) {
          a.preventDefault();
          if (13 === a.which) return this.noResults || this.config.taggable && 0 < this.input.value.length ? false : this.change(this.navIndex);
          var c = this.items[this.navIndex], e = this.navIndex;
          switch (a.which) {
            case 38:
              var d = 0;
              0 < this.navIndex && this.navIndex--;
              break;
            case 40:
              d = 1, this.navIndex < this.items.length - 1 && this.navIndex++;
          }
          for (this.navigating = true; b.hasClass(this.items[this.navIndex], "disabled") || b.hasClass(this.items[this.navIndex], "excluded"); ) {
            if (0 < this.navIndex && this.navIndex < this.items.length - 1) d ? this.navIndex++ : this.navIndex--;
            else {
              this.navIndex = e;
              break;
            }
            if (this.searching) {
              if (this.navIndex > this.tree.lastElementChild.idx) {
                this.navIndex = this.tree.lastElementChild.idx;
                break;
              } else if (this.navIndex < this.tree.firstElementChild.idx) {
                this.navIndex = this.tree.firstElementChild.idx;
                break;
              }
            }
          }
          a = b.rect(this.items[this.navIndex]);
          d ? (0 === this.navIndex ? this.tree.scrollTop = 0 : a.top + a.height > this.optsRect.top + this.optsRect.height && (this.tree.scrollTop += a.top + a.height - (this.optsRect.top + this.optsRect.height)), this.navIndex === this.tree.childElementCount - 1 && this.requiresPagination && r.call(this)) : 0 === this.navIndex ? this.tree.scrollTop = 0 : 0 > a.top - this.optsRect.top && (this.tree.scrollTop += a.top - this.optsRect.top);
          c && b.removeClass(c, "active");
          b.addClass(this.items[this.navIndex], "active");
        } else this.navigating = false;
      }, w = function(a) {
        var c = this, e = document.createDocumentFragment(), d = this.options[a.idx], f = this.data ? this.data[a.idx] : d;
        f = this.customSelected ? this.config.renderSelection(f) : d.textContent;
        f = b.createElement("li", {
          "class": "selectr-tag",
          html: f
        });
        var h = b.createElement("button", {
          "class": "selectr-tag-remove",
          type: "button"
        });
        f.appendChild(h);
        f.idx = a.idx;
        f.tag = d.value;
        this.tags.push(f);
        if (this.config.sortSelected) {
          a = this.tags.slice();
          var g2 = function(a2, b2) {
            a2.replace(/(\d+)|(\D+)/g, function(a3, d2, c2) {
              b2.push([d2 || Infinity, c2 || ""]);
            });
          };
          a.sort(function(a2, b2) {
            var d2 = [], e2 = [];
            if (true === c.config.sortSelected) {
              var f2 = a2.tag;
              var h2 = b2.tag;
            } else "text" === c.config.sortSelected && (f2 = a2.textContent, h2 = b2.textContent);
            g2(f2, d2);
            for (g2(h2, e2); d2.length && e2.length; ) if (f2 = d2.shift(), h2 = e2.shift(), f2 = f2[0] - h2[0] || f2[1].localeCompare(h2[1])) return f2;
            return d2.length - e2.length;
          });
          b.each(a, function(a2, b2) {
            e.appendChild(b2);
          });
          this.label.innerHTML = "";
        } else e.appendChild(f);
        this.config.taggable ? this.label.insertBefore(e, this.input.parentNode) : this.label.appendChild(e);
      }, x = function(a) {
        var c = false;
        b.each(this.tags, function(b2, d) {
          d.idx === a.idx && (c = d);
        }, this);
        c && (this.label.removeChild(c), this.tags.splice(this.tags.indexOf(c), 1));
      }, r = function() {
        var a = this.tree;
        if (a.scrollTop >= a.scrollHeight - a.offsetHeight && this.pageIndex < this.pages.length) {
          var c = document.createDocumentFragment();
          b.each(this.pages[this.pageIndex], function(a2, b2) {
            n(b2, c, this.customOption);
          }, this);
          a.appendChild(c);
          this.pageIndex++;
          this.emit("selectr.paginate", {
            items: this.items.length,
            total: this.data.length,
            page: this.pageIndex,
            pages: this.pages.length
          });
        }
      }, q = function() {
        if (this.config.searchable || this.config.taggable) this.input.value = null, this.searching = false, this.config.searchable && b.removeClass(this.inputContainer, "active"), b.hasClass(this.container, "notice") && (b.removeClass(this.container, "notice"), b.addClass(this.container, "open"), this.input.focus()), b.each(this.items, function(a, c) {
          b.removeClass(c, "excluded");
          this.customOption || (c.innerHTML = c.textContent);
        }, this);
      };
      g = function(a, b2) {
        this.defaultConfig = {
          defaultSelected: true,
          width: "auto",
          disabled: false,
          searchable: true,
          clearable: false,
          sortSelected: false,
          allowDeselect: false,
          closeOnScroll: false,
          nativeDropdown: false,
          nativeKeyboard: false,
          placeholder: "Select an option...",
          taggable: false,
          tagPlaceholder: "Enter a tag...",
          messages: {
            noResults: "No results.",
            noOptions: "No options available.",
            maxSelections: "A maximum of {max} items can be selected.",
            tagDuplicate: "That tag is already in use."
          }
        };
        if (!a) throw Error("You must supply either a HTMLSelectElement or a CSS3 selector string.");
        this.el = a;
        "string" === typeof a && (this.el = document.querySelector(a));
        if (null === this.el) throw Error("The element you passed to Selectr can not be found.");
        if ("select" !== this.el.nodeName.toLowerCase()) throw Error("The element you passed to Selectr is not a HTMLSelectElement.");
        this.render(b2);
      };
      g.prototype.render = function(a) {
        if (!this.rendered) {
          this.el.selectr = this;
          this.config = b.extend(this.defaultConfig, a);
          this.originalType = this.el.type;
          this.originalIndex = this.el.tabIndex;
          this.defaultSelected = [];
          this.originalOptionCount = this.el.options.length;
          if (this.config.multiple || this.config.taggable) this.el.multiple = true;
          this.disabled = k(this.config, "disabled");
          this.opened = false;
          this.config.taggable && (this.config.searchable = false);
          this.mobileDevice = this.navigating = false;
          /Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent) && (this.mobileDevice = true);
          this.customOption = this.config.hasOwnProperty("renderOption") && "function" === typeof this.config.renderOption;
          this.customSelected = this.config.hasOwnProperty("renderSelection") && "function" === typeof this.config.renderSelection;
          this.supportsEventPassiveOption = this.detectEventPassiveOption();
          l.mixin(this);
          u.call(this);
          this.bindEvents();
          this.update();
          this.optsRect = b.rect(this.tree);
          this.rendered = true;
          this.el.multiple || (this.el.selectedIndex = this.selectedIndex);
          var c = this;
          setTimeout(function() {
            c.emit("selectr.init");
          }, 20);
        }
      };
      g.prototype.getSelected = function() {
        return this.el.querySelectorAll("option:checked");
      };
      g.prototype.getSelectedProperties = function(a) {
        var b2 = this.getSelected();
        return [].slice.call(b2).map(function(b3) {
          return b3[a];
        }).filter(function(a2) {
          return null !== a2 && void 0 !== a2;
        });
      };
      g.prototype.detectEventPassiveOption = function() {
        var a = false;
        try {
          var b2 = Object.defineProperty({}, "passive", {
            get: function() {
              a = true;
            }
          });
          window.addEventListener("test", null, b2);
        } catch (e) {
        }
        return a;
      };
      g.prototype.bindEvents = function() {
        var a = this;
        this.events = {};
        this.events.dismiss = t.bind(this);
        this.events.navigate = v.bind(this);
        this.events.reset = this.reset.bind(this);
        if (this.config.nativeDropdown || this.mobileDevice) {
          this.container.addEventListener("touchstart", function(b2) {
            b2.changedTouches[0].target === a.el && a.toggle();
          }, this.supportsEventPassiveOption ? {
            passive: true
          } : false);
          this.container.addEventListener("click", function(b2) {
            b2.target === a.el && a.toggle();
          });
          var c = function(a2, b2) {
            for (var d = [], c2 = a2.slice(0), e2, f = 0; f < b2.length; f++) e2 = c2.indexOf(b2[f]), -1 < e2 ? c2.splice(e2, 1) : d.push(b2[f]);
            return [d, c2];
          };
          this.el.addEventListener("change", function(d) {
            a.el.multiple ? (d = a.getSelectedProperties("idx"), d = c(a.selectedIndexes, d), b.each(d[0], function(b2, d2) {
              a.select(d2);
            }, a), b.each(d[1], function(b2, d2) {
              a.deselect(d2);
            }, a)) : -1 < a.el.selectedIndex && a.select(a.el.selectedIndex);
          });
        }
        this.container.addEventListener("keydown", function(b2) {
          "Escape" === b2.key && a.close();
          "Enter" === b2.key && a.selected === document.activeElement && "undefined" !== typeof a.el.form.submit && a.el.form.submit();
          " " !== b2.key && "ArrowUp" !== b2.key && "ArrowDown" !== b2.key || a.selected !== document.activeElement || (setTimeout(function() {
            a.toggle();
          }, 200), a.config.nativeDropdown && setTimeout(function() {
            a.el.focus();
          }, 200));
        });
        this.selected.addEventListener("click", function(b2) {
          a.disabled || a.toggle();
          b2.preventDefault();
        });
        if (this.config.nativeKeyboard) {
          var e = "";
          this.selected.addEventListener("keydown", function(b2) {
            if (!(a.disabled || a.selected !== document.activeElement || b2.altKey || b2.ctrlKey || b2.metaKey)) {
              if (" " === b2.key || !a.opened && -1 < ["Enter", "ArrowUp", "ArrowDown"].indexOf(b2.key)) a.toggle(), b2.preventDefault(), b2.stopPropagation();
              else if (2 >= b2.key.length && String[String.fromCodePoint ? "fromCodePoint" : "fromCharCode"](b2.key[String.codePointAt ? "codePointAt" : "charCodeAt"](0)) === b2.key) {
                if (a.config.multiple) a.open(), a.config.searchable && (a.input.value = b2.key, a.input.focus(), a.search(null, true));
                else {
                  e += b2.key;
                  var c2 = a.search(e, true);
                  c2 && c2.length && (a.clear(), a.setValue(c2[0].value));
                  setTimeout(function() {
                    e = "";
                  }, 1e3);
                }
                b2.preventDefault();
                b2.stopPropagation();
              }
            }
          });
          this.container.addEventListener("keyup", function(b2) {
            a.opened && "Escape" === b2.key && (a.close(), b2.stopPropagation(), a.selected.focus());
          });
        }
        this.label.addEventListener("click", function(c2) {
          b.hasClass(c2.target, "selectr-tag-remove") && a.deselect(c2.target.parentNode.idx);
        });
        this.selectClear && this.selectClear.addEventListener("click", this.clear.bind(this));
        this.tree.addEventListener("mousedown", function(a2) {
          a2.preventDefault();
        });
        this.tree.addEventListener("click", function(c2) {
          var d = b.closest(c2.target, function(a2) {
            return a2 && b.hasClass(a2, "selectr-option");
          });
          d && !b.hasClass(d, "disabled") && (b.hasClass(d, "selected") ? (a.el.multiple || !a.el.multiple && a.config.allowDeselect) && a.deselect(d.idx) : a.select(d.idx), a.opened && !a.el.multiple && a.close());
          c2.preventDefault();
          c2.stopPropagation();
        });
        this.tree.addEventListener("mouseover", function(c2) {
          b.hasClass(c2.target, "selectr-option") && !b.hasClass(c2.target, "disabled") && (b.removeClass(a.items[a.navIndex], "active"), b.addClass(c2.target, "active"), a.navIndex = [].slice.call(a.items).indexOf(c2.target));
        });
        this.config.searchable && (this.input.addEventListener("focus", function(b2) {
          a.searching = true;
        }), this.input.addEventListener("blur", function(b2) {
          a.searching = false;
        }), this.input.addEventListener("keyup", function(c2) {
          a.search();
          a.config.taggable || (this.value.length ? b.addClass(this.parentNode, "active") : b.removeClass(this.parentNode, "active"));
        }), this.inputClear.addEventListener("click", function(b2) {
          a.input.value = null;
          q.call(a);
          a.tree.childElementCount || p.call(a);
        }));
        this.config.taggable && this.input.addEventListener("keyup", function(c2) {
          a.search();
          if (a.config.taggable && this.value.length) {
            var d = this.value.trim();
            if (13 === c2.which || b.includes(a.tagSeperators, c2.key)) b.each(a.tagSeperators, function(a2, b2) {
              d = d.replace(b2, "");
            }), a.add({
              value: d,
              text: d,
              selected: true
            }, true) ? (a.close(), q.call(a)) : (this.value = "", a.setMessage(a.config.messages.tagDuplicate));
          }
        });
        this.update = b.debounce(function() {
          a.opened && a.config.closeOnScroll && a.close();
          a.width && (a.container.style.width = a.width);
          a.invert();
        }, 50);
        this.requiresPagination && (this.paginateItems = b.debounce(function() {
          r.call(this);
        }, 50), this.tree.addEventListener("scroll", this.paginateItems.bind(this)));
        document.addEventListener("click", this.events.dismiss);
        window.addEventListener("keydown", this.events.navigate);
        window.addEventListener("resize", this.update);
        window.addEventListener("scroll", this.update);
        this.on("selectr.destroy", function() {
          document.removeEventListener("click", this.events.dismiss);
          window.removeEventListener("keydown", this.events.navigate);
          window.removeEventListener("resize", this.update);
          window.removeEventListener("scroll", this.update);
        });
        this.el.form && (this.el.form.addEventListener("reset", this.events.reset), this.on("selectr.destroy", function() {
          this.el.form.removeEventListener("reset", this.events.reset);
        }));
      };
      g.prototype.setSelected = function(a) {
        this.config.data || this.el.multiple || !this.el.options.length || (0 !== this.el.selectedIndex || this.el.options[0].defaultSelected || this.config.defaultSelected || (this.el.selectedIndex = -1), this.selectedIndex = this.el.selectedIndex, -1 < this.selectedIndex && this.select(this.selectedIndex));
        this.config.multiple && "select-one" === this.originalType && !this.config.data && this.el.options[0].selected && !this.el.options[0].defaultSelected && (this.el.options[0].selected = false);
        b.each(this.options, function(a2, b2) {
          b2.selected && b2.defaultSelected && this.select(b2.idx);
        }, this);
        this.config.selectedValue && this.setValue(this.config.selectedValue);
        if (this.config.data) {
          !this.el.multiple && this.config.defaultSelected && 0 > this.el.selectedIndex && this.select(0);
          var c = 0;
          b.each(this.config.data, function(a2, d) {
            k(d, "children") ? b.each(d.children, function(a3, b2) {
              b2.hasOwnProperty("selected") && true === b2.selected && this.select(c);
              c++;
            }, this) : (d.hasOwnProperty("selected") && true === d.selected && this.select(c), c++);
          }, this);
        }
      };
      g.prototype.destroy = function() {
        this.rendered && (this.emit("selectr.destroy"), "select-one" === this.originalType && (this.el.multiple = false), this.config.data && (this.el.innerHTML = ""), b.removeClass(this.el, "selectr-hidden"), this.container.parentNode.replaceChild(this.el, this.container), this.rendered = false, delete this.el.selectr);
      };
      g.prototype.change = function(a) {
        var c = this.items[a], e = this.options[a];
        e.disabled || (e.selected && b.hasClass(c, "selected") ? this.deselect(a) : this.select(a), this.opened && !this.el.multiple && this.close());
      };
      g.prototype.select = function(a) {
        var c = this.items[a], e = [].slice.call(this.el.options), d = this.options[a];
        if (this.el.multiple) {
          if (b.includes(this.selectedIndexes, a)) return false;
          if (this.config.maxSelections && this.tags.length === this.config.maxSelections) return this.setMessage(this.config.messages.maxSelections.replace("{max}", this.config.maxSelections), true), false;
          this.selectedValues.push(d.value);
          this.selectedIndexes.push(a);
          w.call(this, c);
        } else {
          var f = this.data ? this.data[a] : d;
          this.label.innerHTML = this.customSelected ? this.config.renderSelection(f) : d.textContent;
          this.selectedValue = d.value;
          this.selectedIndex = a;
          b.each(this.options, function(c2, d2) {
            var e2 = this.items[c2];
            c2 !== a && (e2 && b.removeClass(e2, "selected"), d2.selected = false, d2.removeAttribute("selected"));
          }, this);
        }
        b.includes(e, d) || this.el.add(d);
        c.setAttribute("aria-selected", true);
        b.addClass(c, "selected");
        b.addClass(this.container, "has-selected");
        d.selected = true;
        d.setAttribute("selected", "");
        this.emit("selectr.change", d);
        this.emit("selectr.select", d);
        "createEvent" in document ? (c = document.createEvent("HTMLEvents"), c.initEvent("change", true, true), this.el.dispatchEvent(c)) : this.el.fireEvent("onchange");
      };
      g.prototype.deselect = function(a, c) {
        var e = this.items[a], d = this.options[a];
        if (this.el.multiple) {
          var f = this.selectedIndexes.indexOf(a);
          this.selectedIndexes.splice(f, 1);
          f = this.selectedValues.indexOf(d.value);
          this.selectedValues.splice(f, 1);
          x.call(this, e);
          this.tags.length || b.removeClass(this.container, "has-selected");
        } else {
          if (!c && !this.config.clearable && !this.config.allowDeselect) return false;
          this.label.innerHTML = "";
          this.selectedValue = null;
          this.el.selectedIndex = this.selectedIndex = -1;
          b.removeClass(this.container, "has-selected");
        }
        this.items[a].setAttribute("aria-selected", false);
        b.removeClass(this.items[a], "selected");
        d.selected = false;
        d.removeAttribute("selected");
        this.emit("selectr.change", null);
        this.emit("selectr.deselect", d);
        "createEvent" in document ? (e = document.createEvent("HTMLEvents"), e.initEvent("change", true, true), this.el.dispatchEvent(e)) : this.el.fireEvent("onchange");
      };
      g.prototype.setValue = function(a) {
        var c = Array.isArray(a);
        c || (a = a.toString().trim());
        if (!this.el.multiple && c) return false;
        b.each(this.options, function(b2, d) {
          (c && -1 < a.indexOf(d.value) || d.value === a) && this.change(d.idx);
        }, this);
      };
      g.prototype.getValue = function(a, c) {
        if (this.el.multiple) {
          if (a) {
            if (this.selectedIndexes.length) {
              var e = {
                values: []
              };
              b.each(this.selectedIndexes, function(a2, b2) {
                var c2 = this.options[b2];
                e.values[a2] = {
                  value: c2.value,
                  text: c2.textContent
                };
              }, this);
            }
          } else e = this.selectedValues.slice();
        } else if (a) {
          var d = this.options[this.selectedIndex];
          e = {
            value: d.value,
            text: d.textContent
          };
        } else e = this.selectedValue;
        a && c && (e = JSON.stringify(e));
        return e;
      };
      g.prototype.add = function(a, c) {
        if (a) {
          this.data = this.data || [];
          this.items = this.items || [];
          this.options = this.options || [];
          if (Array.isArray(a)) b.each(a, function(a2, b2) {
            this.add(b2, c);
          }, this);
          else if ("[object Object]" === Object.prototype.toString.call(a)) {
            if (c) {
              var e = false;
              b.each(this.options, function(b2, c2) {
                c2.value.toLowerCase() === a.value.toLowerCase() && (e = true);
              });
              if (e) return false;
            }
            var d = b.createElement("option", a);
            this.data.push(a);
            this.options.push(d);
            d.idx = 0 < this.options.length ? this.options.length - 1 : 0;
            m.call(this, d);
            a.selected && this.select(d.idx);
            this.setPlaceholder();
            return d;
          }
          this.config.pagination && this.paginate();
          return true;
        }
      };
      g.prototype.remove = function(a) {
        var c = [];
        Array.isArray(a) ? b.each(a, function(a2, e2) {
          b.isInt(e2) ? c.push(this.getOptionByIndex(e2)) : "string" === typeof e2 && c.push(this.getOptionByValue(e2));
        }, this) : b.isInt(a) ? c.push(this.getOptionByIndex(a)) : "string" === typeof a && c.push(this.getOptionByValue(a));
        if (c.length) {
          var e;
          b.each(c, function(a2, c2) {
            e = c2.idx;
            this.el.remove(c2);
            this.options.splice(e, 1);
            var d = this.items[e].parentNode;
            d && d.removeChild(this.items[e]);
            this.items.splice(e, 1);
            b.each(this.options, function(a3, b2) {
              b2.idx = a3;
              this.items[a3].idx = a3;
            }, this);
          }, this);
          this.setPlaceholder();
          this.config.pagination && this.paginate();
        }
      };
      g.prototype.removeAll = function() {
        this.clear(true);
        b.each(this.el.options, function(a, b2) {
          this.el.remove(b2);
        }, this);
        b.truncate(this.tree);
        this.items = [];
        this.options = [];
        this.data = [];
        this.navIndex = 0;
        this.requiresPagination && (this.requiresPagination = false, this.pageIndex = 1, this.pages = []);
        this.setPlaceholder();
      };
      g.prototype.search = function(a, c) {
        if (!this.navigating) {
          var e = false;
          a || (a = this.input.value, e = true, this.removeMessage(), b.truncate(this.tree));
          var d = [], f = document.createDocumentFragment();
          a = a.trim().toLowerCase();
          if (0 < a.length) {
            var g2 = c ? b.startsWith : b.includes;
            b.each(this.options, function(c2, h) {
              var k3 = this.items[h.idx];
              if (g2(h.textContent.trim().toLowerCase(), a) && !h.disabled) {
                if (d.push({
                  text: h.textContent,
                  value: h.value
                }), e && (n(k3, f, this.customOption), b.removeClass(k3, "excluded"), !this.customOption)) {
                  var l3 = (l3 = new RegExp(a, "i").exec(h.textContent)) ? h.textContent.replace(l3[0], "<span class='selectr-match'>" + l3[0] + "</span>") : false;
                  k3.innerHTML = l3;
                }
              } else e && b.addClass(k3, "excluded");
            }, this);
            if (e) {
              if (f.childElementCount) {
                var k2 = this.items[this.navIndex], l2 = f.querySelector(".selectr-option:not(.excluded)");
                this.noResults = false;
                b.removeClass(k2, "active");
                this.navIndex = l2.idx;
                b.addClass(l2, "active");
              } else this.config.taggable || (this.noResults = true, this.setMessage(this.config.messages.noResults));
              this.tree.appendChild(f);
            }
          } else p.call(this);
          return d;
        }
      };
      g.prototype.toggle = function() {
        this.disabled || (this.opened ? this.close() : this.open());
      };
      g.prototype.open = function() {
        var a = this;
        if (!this.options.length) return false;
        this.opened || this.emit("selectr.open");
        this.opened = true;
        this.mobileDevice || this.config.nativeDropdown ? (b.addClass(this.container, "native-open"), this.config.data && b.each(this.options, function(a2, b2) {
          this.el.add(b2);
        }, this)) : (b.addClass(this.container, "open"), p.call(this), this.invert(), this.tree.scrollTop = 0, b.removeClass(this.container, "notice"), this.selected.setAttribute("aria-expanded", true), this.tree.setAttribute("aria-hidden", false), this.tree.setAttribute("aria-expanded", true), this.config.searchable && !this.config.taggable && setTimeout(function() {
          a.input.focus();
          a.input.tabIndex = 0;
        }, 10));
      };
      g.prototype.close = function() {
        this.opened && this.emit("selectr.close");
        this.navigating = this.opened = false;
        if (this.mobileDevice || this.config.nativeDropdown) b.removeClass(this.container, "native-open");
        else {
          var a = b.hasClass(this.container, "notice");
          this.config.searchable && !a && (this.input.blur(), this.input.tabIndex = -1, this.searching = false);
          a && (b.removeClass(this.container, "notice"), this.notice.textContent = "");
          b.removeClass(this.container, "open");
          b.removeClass(this.container, "native-open");
          this.selected.setAttribute("aria-expanded", false);
          this.tree.setAttribute("aria-hidden", true);
          this.tree.setAttribute("aria-expanded", false);
          b.truncate(this.tree);
          q.call(this);
          this.selected.focus();
        }
      };
      g.prototype.enable = function() {
        this.disabled = false;
        this.el.disabled = false;
        this.selected.tabIndex = this.originalIndex;
        this.el.multiple && b.each(this.tags, function(a, b2) {
          b2.lastElementChild.tabIndex = 0;
        });
        b.removeClass(this.container, "selectr-disabled");
      };
      g.prototype.disable = function(a) {
        a || (this.el.disabled = true);
        this.selected.tabIndex = -1;
        this.el.multiple && b.each(this.tags, function(a2, b2) {
          b2.lastElementChild.tabIndex = -1;
        });
        this.disabled = true;
        b.addClass(this.container, "selectr-disabled");
      };
      g.prototype.reset = function() {
        this.disabled || (this.clear(), this.setSelected(true), b.each(this.defaultSelected, function(a, b2) {
          this.select(b2);
        }, this), this.emit("selectr.reset"));
      };
      g.prototype.clear = function(a) {
        this.el.multiple ? this.selectedIndexes.length && (a = this.selectedIndexes.slice(), b.each(a, function(a2, b2) {
          this.deselect(b2);
        }, this)) : -1 < this.selectedIndex && this.deselect(this.selectedIndex, a);
        this.emit("selectr.clear");
      };
      g.prototype.serialise = function(a) {
        var c = [];
        b.each(this.options, function(a2, b2) {
          var d = {
            value: b2.value,
            text: b2.textContent
          };
          b2.selected && (d.selected = true);
          b2.disabled && (d.disabled = true);
          c[a2] = d;
        });
        return a ? JSON.stringify(c) : c;
      };
      g.prototype.serialize = function(a) {
        return this.serialise(a);
      };
      g.prototype.setPlaceholder = function(a) {
        a = a || this.config.placeholder || this.el.getAttribute("placeholder");
        this.options.length || (a = this.config.messages.noOptions);
        this.placeEl.innerHTML = a;
      };
      g.prototype.paginate = function() {
        if (this.items.length) {
          var a = this;
          return this.pages = this.items.map(function(b2, e) {
            return 0 === e % a.config.pagination ? a.items.slice(e, e + a.config.pagination) : null;
          }).filter(function(a2) {
            return a2;
          });
        }
      };
      g.prototype.setMessage = function(a, c) {
        c && this.close();
        b.addClass(this.container, "notice");
        this.notice.textContent = a;
      };
      g.prototype.removeMessage = function() {
        b.removeClass(this.container, "notice");
        this.notice.innerHTML = "";
      };
      g.prototype.invert = function() {
        var a = b.rect(this.selected);
        a.top + a.height + this.tree.parentNode.offsetHeight > window.innerHeight ? (b.addClass(this.container, "inverted"), this.isInverted = true) : (b.removeClass(this.container, "inverted"), this.isInverted = false);
        this.optsRect = b.rect(this.tree);
      };
      g.prototype.getOptionByIndex = function(a) {
        return this.options[a];
      };
      g.prototype.getOptionByValue = function(a) {
        for (var b2 = false, e = 0, d = this.options.length; e < d; e++) if (this.options[e].value.trim() === a.toString().trim()) {
          b2 = this.options[e];
          break;
        }
        return b2;
      };
      return g;
    });
  }
});
export default require_selectr_min();
//# sourceMappingURL=mobius1-selectr.js.map
