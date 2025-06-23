import {
  __commonJS
} from "./chunk-APYJOV5E.js";

// node_modules/ev-emitter/ev-emitter.js
var require_ev_emitter = __commonJS({
  "node_modules/ev-emitter/ev-emitter.js"(exports, module) {
    (function(global, factory) {
      if (typeof define == "function" && define.amd) {
        define(factory);
      } else if (typeof module == "object" && module.exports) {
        module.exports = factory();
      } else {
        global.EvEmitter = factory();
      }
    })(typeof window != "undefined" ? window : exports, function() {
      "use strict";
      function EvEmitter() {
      }
      var proto = EvEmitter.prototype;
      proto.on = function(eventName, listener) {
        if (!eventName || !listener) {
          return;
        }
        var events = this._events = this._events || {};
        var listeners = events[eventName] = events[eventName] || [];
        if (listeners.indexOf(listener) == -1) {
          listeners.push(listener);
        }
        return this;
      };
      proto.once = function(eventName, listener) {
        if (!eventName || !listener) {
          return;
        }
        this.on(eventName, listener);
        var onceEvents = this._onceEvents = this._onceEvents || {};
        var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        onceListeners[listener] = true;
        return this;
      };
      proto.off = function(eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
          return;
        }
        var index = listeners.indexOf(listener);
        if (index != -1) {
          listeners.splice(index, 1);
        }
        return this;
      };
      proto.emitEvent = function(eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
          return;
        }
        listeners = listeners.slice(0);
        args = args || [];
        var onceListeners = this._onceEvents && this._onceEvents[eventName];
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          var isOnce = onceListeners && onceListeners[listener];
          if (isOnce) {
            this.off(eventName, listener);
            delete onceListeners[listener];
          }
          listener.apply(this, args);
        }
        return this;
      };
      proto.allOff = function() {
        delete this._events;
        delete this._onceEvents;
      };
      return EvEmitter;
    });
  }
});

// node_modules/unipointer/unipointer.js
var require_unipointer = __commonJS({
  "node_modules/unipointer/unipointer.js"(exports, module) {
    (function(window2, factory) {
      if (typeof define == "function" && define.amd) {
        define(["ev-emitter/ev-emitter"], function(EvEmitter) {
          return factory(window2, EvEmitter);
        });
      } else if (typeof module == "object" && module.exports) {
        module.exports = factory(window2, require_ev_emitter());
      } else {
        window2.Unipointer = factory(window2, window2.EvEmitter);
      }
    })(window, function factory(window2, EvEmitter) {
      "use strict";
      function noop() {
      }
      function Unipointer() {
      }
      var proto = Unipointer.prototype = Object.create(EvEmitter.prototype);
      proto.bindStartEvent = function(elem) {
        this._bindStartEvent(elem, true);
      };
      proto.unbindStartEvent = function(elem) {
        this._bindStartEvent(elem, false);
      };
      proto._bindStartEvent = function(elem, isAdd) {
        isAdd = isAdd === void 0 ? true : isAdd;
        var bindMethod = isAdd ? "addEventListener" : "removeEventListener";
        var startEvent = "mousedown";
        if ("ontouchstart" in window2) {
          startEvent = "touchstart";
        } else if (window2.PointerEvent) {
          startEvent = "pointerdown";
        }
        elem[bindMethod](startEvent, this);
      };
      proto.handleEvent = function(event) {
        var method = "on" + event.type;
        if (this[method]) {
          this[method](event);
        }
      };
      proto.getTouch = function(touches) {
        for (var i = 0; i < touches.length; i++) {
          var touch = touches[i];
          if (touch.identifier == this.pointerIdentifier) {
            return touch;
          }
        }
      };
      proto.onmousedown = function(event) {
        var button = event.button;
        if (button && button !== 0 && button !== 1) {
          return;
        }
        this._pointerDown(event, event);
      };
      proto.ontouchstart = function(event) {
        this._pointerDown(event, event.changedTouches[0]);
      };
      proto.onpointerdown = function(event) {
        this._pointerDown(event, event);
      };
      proto._pointerDown = function(event, pointer) {
        if (event.button || this.isPointerDown) {
          return;
        }
        this.isPointerDown = true;
        this.pointerIdentifier = pointer.pointerId !== void 0 ? (
          // pointerId for pointer events, touch.indentifier for touch events
          pointer.pointerId
        ) : pointer.identifier;
        this.pointerDown(event, pointer);
      };
      proto.pointerDown = function(event, pointer) {
        this._bindPostStartEvents(event);
        this.emitEvent("pointerDown", [event, pointer]);
      };
      var postStartEvents = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
      };
      proto._bindPostStartEvents = function(event) {
        if (!event) {
          return;
        }
        var events = postStartEvents[event.type];
        events.forEach(function(eventName) {
          window2.addEventListener(eventName, this);
        }, this);
        this._boundPointerEvents = events;
      };
      proto._unbindPostStartEvents = function() {
        if (!this._boundPointerEvents) {
          return;
        }
        this._boundPointerEvents.forEach(function(eventName) {
          window2.removeEventListener(eventName, this);
        }, this);
        delete this._boundPointerEvents;
      };
      proto.onmousemove = function(event) {
        this._pointerMove(event, event);
      };
      proto.onpointermove = function(event) {
        if (event.pointerId == this.pointerIdentifier) {
          this._pointerMove(event, event);
        }
      };
      proto.ontouchmove = function(event) {
        var touch = this.getTouch(event.changedTouches);
        if (touch) {
          this._pointerMove(event, touch);
        }
      };
      proto._pointerMove = function(event, pointer) {
        this.pointerMove(event, pointer);
      };
      proto.pointerMove = function(event, pointer) {
        this.emitEvent("pointerMove", [event, pointer]);
      };
      proto.onmouseup = function(event) {
        this._pointerUp(event, event);
      };
      proto.onpointerup = function(event) {
        if (event.pointerId == this.pointerIdentifier) {
          this._pointerUp(event, event);
        }
      };
      proto.ontouchend = function(event) {
        var touch = this.getTouch(event.changedTouches);
        if (touch) {
          this._pointerUp(event, touch);
        }
      };
      proto._pointerUp = function(event, pointer) {
        this._pointerDone();
        this.pointerUp(event, pointer);
      };
      proto.pointerUp = function(event, pointer) {
        this.emitEvent("pointerUp", [event, pointer]);
      };
      proto._pointerDone = function() {
        this._pointerReset();
        this._unbindPostStartEvents();
        this.pointerDone();
      };
      proto._pointerReset = function() {
        this.isPointerDown = false;
        delete this.pointerIdentifier;
      };
      proto.pointerDone = noop;
      proto.onpointercancel = function(event) {
        if (event.pointerId == this.pointerIdentifier) {
          this._pointerCancel(event, event);
        }
      };
      proto.ontouchcancel = function(event) {
        var touch = this.getTouch(event.changedTouches);
        if (touch) {
          this._pointerCancel(event, touch);
        }
      };
      proto._pointerCancel = function(event, pointer) {
        this._pointerDone();
        this.pointerCancel(event, pointer);
      };
      proto.pointerCancel = function(event, pointer) {
        this.emitEvent("pointerCancel", [event, pointer]);
      };
      Unipointer.getPointerPoint = function(pointer) {
        return {
          x: pointer.pageX,
          y: pointer.pageY
        };
      };
      return Unipointer;
    });
  }
});

// node_modules/huebee/huebee.js
var require_huebee = __commonJS({
  "node_modules/huebee/huebee.js"(exports, module) {
    (function(window2, factory) {
      if (typeof define == "function" && define.amd) {
        define(["ev-emitter/ev-emitter", "unipointer/unipointer"], function(EvEmitter, Unipointer) {
          return factory(window2, EvEmitter, Unipointer);
        });
      } else if (typeof module == "object" && module.exports) {
        module.exports = factory(window2, require_ev_emitter(), require_unipointer());
      } else {
        window2.Huebee = factory(window2, window2.EvEmitter, window2.Unipointer);
      }
    })(window, function factory(window2, EvEmitter, Unipointer) {
      function Huebee(anchor, options) {
        anchor = getQueryElement(anchor);
        if (!anchor) {
          throw new Error("Bad element for Huebee: " + anchor);
        }
        this.anchor = anchor;
        this.options = {};
        this.option(Huebee.defaults);
        this.option(options);
        this.create();
      }
      Huebee.defaults = {
        hues: 12,
        hue0: 0,
        shades: 5,
        saturations: 3,
        notation: "shortHex",
        setText: true,
        setBGColor: true
      };
      var proto = Huebee.prototype = Object.create(EvEmitter.prototype);
      proto.option = function(options) {
        this.options = extend(this.options, options);
      };
      var GUID = 0;
      var instances = {};
      proto.create = function() {
        var guid = this.guid = ++GUID;
        this.anchor.huebeeGUID = guid;
        instances[guid] = this;
        this.setBGElems = this.getSetElems(this.options.setBGColor);
        this.setTextElems = this.getSetElems(this.options.setText);
        this.outsideCloseIt = this.outsideClose.bind(this);
        this.onDocKeydown = this.docKeydown.bind(this);
        this.closeIt = this.close.bind(this);
        this.openIt = this.open.bind(this);
        this.onElemTransitionend = this.elemTransitionend.bind(this);
        this.isInputAnchor = this.anchor.nodeName == "INPUT";
        if (!this.options.staticOpen) {
          this.anchor.addEventListener("click", this.openIt);
          this.anchor.addEventListener("focus", this.openIt);
        }
        if (this.isInputAnchor) {
          this.anchor.addEventListener("input", this.inputInput.bind(this));
        }
        var element = this.element = document.createElement("div");
        element.className = "huebee ";
        element.className += this.options.staticOpen ? "is-static-open " : "is-hidden ";
        element.className += this.options.className || "";
        var container = this.container = document.createElement("div");
        container.className = "huebee__container";
        function onContainerPointerStart(event) {
          if (event.target == container) {
            event.preventDefault();
          }
        }
        container.addEventListener("mousedown", onContainerPointerStart);
        container.addEventListener("touchstart", onContainerPointerStart);
        this.createCanvas();
        this.cursor = document.createElement("div");
        this.cursor.className = "huebee__cursor is-hidden";
        container.appendChild(this.cursor);
        this.createCloseButton();
        element.appendChild(container);
        if (!this.options.staticOpen) {
          var parentStyle = getComputedStyle(this.anchor.parentNode);
          if (parentStyle.position != "relative" && parentStyle.position != "absolute") {
            this.anchor.parentNode.style.position = "relative";
          }
        }
        var customLength = this.getCustomLength();
        this.satY = customLength ? Math.ceil(customLength / this.options.hues) + 1 : 0;
        this.updateColors();
        this.setAnchorColor();
        if (this.options.staticOpen) {
          this.open();
        }
      };
      proto.getSetElems = function(option) {
        if (option === true) {
          return [this.anchor];
        } else if (typeof option == "string") {
          return document.querySelectorAll(option);
        }
      };
      proto.getCustomLength = function() {
        var customColors = this.options.customColors;
        return customColors && customColors.length || 0;
      };
      proto.createCanvas = function() {
        var canvas = this.canvas = document.createElement("canvas");
        canvas.className = "huebee__canvas";
        this.ctx = canvas.getContext("2d");
        var canvasPointer = this.canvasPointer = new Unipointer();
        canvasPointer._bindStartEvent(canvas);
        canvasPointer.on("pointerDown", this.canvasPointerDown.bind(this));
        canvasPointer.on("pointerMove", this.canvasPointerMove.bind(this));
        this.container.appendChild(canvas);
      };
      var svgURI = "http://www.w3.org/2000/svg";
      proto.createCloseButton = function() {
        if (this.options.staticOpen) {
          return;
        }
        var svg = document.createElementNS(svgURI, "svg");
        svg.setAttribute("class", "huebee__close-button");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        var path = document.createElementNS(svgURI, "path");
        path.setAttribute("d", "M 7,7 L 17,17 M 17,7 L 7,17");
        path.setAttribute("class", "huebee__close-button__x");
        svg.appendChild(path);
        svg.addEventListener("click", this.closeIt);
        this.container.appendChild(svg);
      };
      proto.updateColors = function() {
        this.swatches = {};
        this.colorGrid = {};
        this.updateColorModer();
        var shades = this.options.shades;
        var sats = this.options.saturations;
        var hues = this.options.hues;
        if (this.getCustomLength()) {
          var customI = 0;
          this.options.customColors.forEach(function(color2) {
            var x = customI % hues;
            var y = Math.floor(customI / hues);
            var swatch2 = getSwatch(color2);
            if (swatch2) {
              this.addSwatch(swatch2, x, y);
              customI++;
            }
          }.bind(this));
        }
        var i;
        for (i = 0; i < sats; i++) {
          var sat = 1 - i / sats;
          var yOffset = shades * i + this.satY;
          this.updateSaturationGrid(i, sat, yOffset);
        }
        var grayCount = this.getGrayCount();
        for (i = 0; i < grayCount; i++) {
          var lum = 1 - i / (shades + 1);
          var color = this.colorModer(0, 0, lum);
          var swatch = getSwatch(color);
          this.addSwatch(swatch, hues + 1, i);
        }
      };
      proto.getGrayCount = function() {
        return this.options.shades ? this.options.shades + 2 : 0;
      };
      proto.updateSaturationGrid = function(i, sat, yOffset) {
        var shades = this.options.shades;
        var hues = this.options.hues;
        var hue0 = this.options.hue0;
        for (var row = 0; row < shades; row++) {
          for (var col = 0; col < hues; col++) {
            var hue = Math.round(col * 360 / hues + hue0) % 360;
            var lum = 1 - (row + 1) / (shades + 1);
            var color = this.colorModer(hue, sat, lum);
            var swatch = getSwatch(color);
            var gridY = row + yOffset;
            this.addSwatch(swatch, col, gridY);
          }
        }
      };
      proto.addSwatch = function(swatch, gridX, gridY) {
        this.swatches[gridX + "," + gridY] = swatch;
        this.colorGrid[swatch.color.toUpperCase()] = {
          x: gridX,
          y: gridY
        };
      };
      var colorModers = {
        hsl: function(h, s, l) {
          s = Math.round(s * 100);
          l = Math.round(l * 100);
          return "hsl(" + h + ", " + s + "%, " + l + "%)";
        },
        hex: hsl2hex,
        shortHex: function(h, s, l) {
          var hex = hsl2hex(h, s, l);
          return roundHex(hex);
        }
      };
      proto.updateColorModer = function() {
        this.colorModer = colorModers[this.options.notation] || colorModers.shortHex;
      };
      proto.renderColors = function() {
        var gridSize = this.gridSize * 2;
        for (var position in this.swatches) {
          var swatch = this.swatches[position];
          var duple = position.split(",");
          var gridX = duple[0];
          var gridY = duple[1];
          this.ctx.fillStyle = swatch.color;
          this.ctx.fillRect(gridX * gridSize, gridY * gridSize, gridSize, gridSize);
        }
      };
      proto.setAnchorColor = function() {
        if (this.isInputAnchor) {
          this.setColor(this.anchor.value);
        }
      };
      var docElem = document.documentElement;
      proto.open = function() {
        if (this.isOpen) {
          return;
        }
        var anchor = this.anchor;
        var elem = this.element;
        if (!this.options.staticOpen) {
          elem.style.left = anchor.offsetLeft + "px";
          elem.style.top = anchor.offsetTop + anchor.offsetHeight + "px";
        }
        this.bindOpenEvents(true);
        elem.removeEventListener("transitionend", this.onElemTransitionend);
        anchor.parentNode.insertBefore(elem, anchor.nextSibling);
        var duration = getComputedStyle(elem).transitionDuration;
        this.hasTransition = duration && duration != "none" && parseFloat(duration);
        this.isOpen = true;
        this.updateSizes();
        this.renderColors();
        this.setAnchorColor();
        var h = elem.offsetHeight;
        elem.classList.remove("is-hidden");
      };
      proto.bindOpenEvents = function(isAdd) {
        if (this.options.staticOpen) {
          return;
        }
        var method = (isAdd ? "add" : "remove") + "EventListener";
        docElem[method]("mousedown", this.outsideCloseIt);
        docElem[method]("touchstart", this.outsideCloseIt);
        document[method]("focusin", this.outsideCloseIt);
        document[method]("keydown", this.onDocKeydown);
        this.anchor[method]("blur", this.closeIt);
      };
      proto.updateSizes = function() {
        var hues = this.options.hues;
        var shades = this.options.shades;
        var sats = this.options.saturations;
        var grayCount = this.getGrayCount();
        var customLength = this.getCustomLength();
        this.cursorBorder = parseInt(getComputedStyle(this.cursor).borderTopWidth, 10);
        this.gridSize = Math.round(this.cursor.offsetWidth - this.cursorBorder * 2);
        this.canvasOffset = {
          x: this.canvas.offsetLeft,
          y: this.canvas.offsetTop
        };
        var cols, rows;
        if (customLength && !grayCount) {
          cols = Math.min(customLength, hues);
          rows = Math.ceil(customLength / hues);
        } else {
          cols = hues + 2;
          rows = Math.max(shades * sats + this.satY, grayCount);
        }
        var width = this.canvas.width = cols * this.gridSize * 2;
        this.canvas.height = rows * this.gridSize * 2;
        this.canvas.style.width = width / 2 + "px";
      };
      proto.outsideClose = function(event) {
        var isAnchor = this.anchor.contains(event.target);
        var isElement = this.element.contains(event.target);
        if (!isAnchor && !isElement) {
          this.close();
        }
      };
      var closeKeydowns = {
        13: true,
        // enter
        27: true
        // esc
      };
      proto.docKeydown = function(event) {
        if (closeKeydowns[event.keyCode]) {
          this.close();
        }
      };
      var supportsTransitions = typeof docElem.style.transform == "string";
      proto.close = function() {
        if (!this.isOpen) {
          return;
        }
        if (supportsTransitions && this.hasTransition) {
          this.element.addEventListener("transitionend", this.onElemTransitionend);
        } else {
          this.remove();
        }
        this.element.classList.add("is-hidden");
        this.bindOpenEvents(false);
        this.isOpen = false;
      };
      proto.remove = function() {
        var parent = this.element.parentNode;
        if (parent.contains(this.element)) {
          parent.removeChild(this.element);
        }
      };
      proto.elemTransitionend = function(event) {
        if (event.target != this.element) {
          return;
        }
        this.element.removeEventListener("transitionend", this.onElemTransitionend);
        this.remove();
      };
      proto.inputInput = function() {
        this.setColor(this.anchor.value);
      };
      proto.canvasPointerDown = function(event, pointer) {
        event.preventDefault();
        this.updateOffset();
        this.canvasPointerChange(pointer);
      };
      proto.updateOffset = function() {
        var boundingRect = this.canvas.getBoundingClientRect();
        this.offset = {
          x: boundingRect.left + window2.pageXOffset,
          y: boundingRect.top + window2.pageYOffset
        };
      };
      proto.canvasPointerMove = function(event, pointer) {
        this.canvasPointerChange(pointer);
      };
      proto.canvasPointerChange = function(pointer) {
        var x = Math.round(pointer.pageX - this.offset.x);
        var y = Math.round(pointer.pageY - this.offset.y);
        var gridSize = this.gridSize;
        var sx = Math.floor(x / gridSize);
        var sy = Math.floor(y / gridSize);
        var swatch = this.swatches[sx + "," + sy];
        this.setSwatch(swatch);
      };
      proto.setColor = function(color) {
        var swatch = getSwatch(color);
        this.setSwatch(swatch);
      };
      proto.setSwatch = function(swatch) {
        var color = swatch && swatch.color;
        if (!swatch) {
          return;
        }
        var wasSameColor = color == this.color;
        this.color = color;
        this.hue = swatch.hue;
        this.sat = swatch.sat;
        this.lum = swatch.lum;
        var lightness = this.lum - Math.cos((this.hue + 70) / 180 * Math.PI) * 0.15;
        this.isLight = lightness > 0.5;
        var gridPosition = this.colorGrid[color.toUpperCase()];
        this.updateCursor(gridPosition);
        this.setTexts();
        this.setBackgrounds();
        if (!wasSameColor) {
          this.emitEvent("change", [color, swatch.hue, swatch.sat, swatch.lum]);
        }
      };
      proto.setTexts = function() {
        if (!this.setTextElems) {
          return;
        }
        for (var i = 0; i < this.setTextElems.length; i++) {
          var elem = this.setTextElems[i];
          var property = elem.nodeName == "INPUT" ? "value" : "textContent";
          elem[property] = this.color;
        }
      };
      proto.setBackgrounds = function() {
        if (!this.setBGElems) {
          return;
        }
        var textColor = this.isLight ? "#222" : "white";
        for (var i = 0; i < this.setBGElems.length; i++) {
          var elem = this.setBGElems[i];
          elem.style.backgroundColor = this.color;
          elem.style.color = textColor;
        }
      };
      proto.updateCursor = function(position) {
        if (!this.isOpen) {
          return;
        }
        var classMethod = position ? "remove" : "add";
        this.cursor.classList[classMethod]("is-hidden");
        if (!position) {
          return;
        }
        var gridSize = this.gridSize;
        var offset = this.canvasOffset;
        var border = this.cursorBorder;
        this.cursor.style.left = position.x * gridSize + offset.x - border + "px";
        this.cursor.style.top = position.y * gridSize + offset.y - border + "px";
      };
      var console = window2.console;
      function htmlInit() {
        var elems = document.querySelectorAll("[data-huebee]");
        for (var i = 0; i < elems.length; i++) {
          var elem = elems[i];
          var attr = elem.getAttribute("data-huebee");
          var options;
          try {
            options = attr && JSON.parse(attr);
          } catch (error) {
            if (console) {
              console.error("Error parsing data-huebee on " + elem.className + ": " + error);
            }
            continue;
          }
          new Huebee(elem, options);
        }
      }
      var readyState = document.readyState;
      if (readyState == "complete" || readyState == "interactive") {
        htmlInit();
      } else {
        document.addEventListener("DOMContentLoaded", htmlInit);
      }
      Huebee.data = function(elem) {
        elem = getQueryElement(elem);
        var id = elem && elem.huebeeGUID;
        return id && instances[id];
      };
      var proxyCtx;
      function getSwatch(color) {
        if (!proxyCtx) {
          var proxyCanvas = document.createElement("canvas");
          proxyCanvas.width = proxyCanvas.height = 1;
          proxyCtx = proxyCanvas.getContext("2d");
        }
        proxyCtx.clearRect(0, 0, 1, 1);
        proxyCtx.fillStyle = "#010203";
        proxyCtx.fillStyle = color;
        proxyCtx.fillRect(0, 0, 1, 1);
        var data = proxyCtx.getImageData(0, 0, 1, 1).data;
        data = [data[0], data[1], data[2], data[3]];
        if (data.join(",") == "1,2,3,255") {
          return;
        }
        var hsl = rgb2hsl.apply(this, data);
        return {
          color: color.trim(),
          hue: hsl[0],
          sat: hsl[1],
          lum: hsl[2]
        };
      }
      function extend(a, b) {
        for (var prop in b) {
          a[prop] = b[prop];
        }
        return a;
      }
      function getQueryElement(elem) {
        if (typeof elem == "string") {
          elem = document.querySelector(elem);
        }
        return elem;
      }
      function hsl2hex(h, s, l) {
        var rgb = hsl2rgb(h, s, l);
        return rgb2hex(rgb);
      }
      function hsl2rgb(h, s, l) {
        var C = (1 - Math.abs(2 * l - 1)) * s;
        var hp = h / 60;
        var X = C * (1 - Math.abs(hp % 2 - 1));
        var rgb, m;
        switch (Math.floor(hp)) {
          case 0:
            rgb = [C, X, 0];
            break;
          case 1:
            rgb = [X, C, 0];
            break;
          case 2:
            rgb = [0, C, X];
            break;
          case 3:
            rgb = [0, X, C];
            break;
          case 4:
            rgb = [X, 0, C];
            break;
          case 5:
            rgb = [C, 0, X];
            break;
          default:
            rgb = [0, 0, 0];
        }
        m = l - C / 2;
        rgb = rgb.map(function(v) {
          return v + m;
        });
        return rgb;
      }
      function rgb2hsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        var M = Math.max(r, g, b);
        var m = Math.min(r, g, b);
        var C = M - m;
        var L = 0.5 * (M + m);
        var S = C === 0 ? 0 : C / (1 - Math.abs(2 * L - 1));
        var h;
        if (C === 0) {
          h = 0;
        } else if (M === r) {
          h = (g - b) / C % 6;
        } else if (M === g) {
          h = (b - r) / C + 2;
        } else if (M === b) {
          h = (r - g) / C + 4;
        }
        var H = 60 * h;
        return [H, parseFloat(S), parseFloat(L)];
      }
      function rgb2hex(rgb) {
        var hex = rgb.map(function(value) {
          value = Math.round(value * 255);
          var hexNum = value.toString(16).toUpperCase();
          hexNum = hexNum.length < 2 ? "0" + hexNum : hexNum;
          return hexNum;
        });
        return "#" + hex.join("");
      }
      function roundHex(hex) {
        return "#" + hex[1] + hex[3] + hex[5];
      }
      return Huebee;
    });
  }
});
export default require_huebee();
/*! Bundled license information:

unipointer/unipointer.js:
  (*!
   * Unipointer v2.4.0
   * base class for doing one thing with pointer event
   * MIT license
   *)

huebee/huebee.js:
  (*!
   * Huebee v2.1.1
   * 1-click color picker
   * MIT license
   * https://huebee.buzz
   * Copyright 2020 Metafizzy
   *)
*/
//# sourceMappingURL=huebee.js.map
