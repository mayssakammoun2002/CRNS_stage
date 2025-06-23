import {
  require_raphael_min
} from "./chunk-AUYSCLCO.js";
import {
  __commonJS
} from "./chunk-APYJOV5E.js";

// node_modules/justgage/justgage.js
var require_justgage = __commonJS({
  "node_modules/justgage/justgage.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(["raphael"], function(raphael) {
          return root.JustGage = factory(raphael);
        });
      } else if (typeof module === "object" && module.exports) {
        module.exports = root.JustGage = factory(require_raphael_min());
      } else {
        root.JustGage = factory(Raphael);
      }
    })(typeof window !== "undefined" ? window : exports, function(Raphael2) {
      const JustGage = function(config) {
        const obj = this;
        obj.events = {};
        if (isUndefined(config)) {
          console.log("* justgage: Make sure to pass options to the constructor!");
          return false;
        }
        if (!isUndefined(config.id)) {
          obj.node = document.getElementById(config.id);
          if (!obj.node) {
            console.log("* justgage: No element with id : %s found", config.id);
            return false;
          }
        } else if (!isUndefined(config.parentNode)) {
          obj.node = config.parentNode;
        } else {
          console.log("* justgage: Make sure to pass the existing element id or parentNode to the constructor.");
          return false;
        }
        const dataset = obj.node.dataset ? obj.node.dataset : {};
        const defaults = !isUndefined(config.defaults) ? config.defaults : false;
        if (defaults !== false) {
          config = extend({}, config, defaults);
          delete config.defaults;
        }
        obj.config = {
          // id : string
          // this is container element id
          id: config.id,
          // classId : string
          // this is the class id utilize when generating styles
          classId: uuid(),
          // value : float
          // value gauge is showing
          value: kvLookup("value", config, dataset, 0, "float"),
          // defaults : bool
          // defaults parameter to use
          defaults: kvLookup("defaults", config, dataset, 0, false),
          // parentNode : node object
          // this is container element
          parentNode: kvLookup("parentNode", config, dataset, null),
          // width : int
          // gauge width
          width: kvLookup("width", config, dataset, null),
          // height : int
          // gauge height
          height: kvLookup("height", config, dataset, null),
          // valueFontColor : string
          // color of label showing current value
          valueFontColor: kvLookup("valueFontColor", config, dataset, "#010101"),
          // valueFontFamily : string
          // color of label showing current value
          valueFontFamily: kvLookup("valueFontFamily", config, dataset, "Arial"),
          // symbol : string
          // special symbol to show next to value
          symbol: kvLookup("symbol", config, dataset, ""),
          // min : float
          // min value
          min: kvLookup("min", config, dataset, 0, "float"),
          // minTxt : string
          // min value text
          minTxt: kvLookup("minTxt", config, dataset, false),
          // max : float
          // max value
          max: kvLookup("max", config, dataset, 100, "float"),
          // maxTxt : string
          // max value text
          maxTxt: kvLookup("maxTxt", config, dataset, false),
          // reverse : bool
          // reverse min and max
          reverse: kvLookup("reverse", config, dataset, false),
          // humanFriendlyDecimal : int
          // number of decimal places for our human friendly number to contain
          humanFriendlyDecimal: kvLookup("humanFriendlyDecimal", config, dataset, 0),
          // textRenderer: func
          // function applied before rendering text
          textRenderer: kvLookup("textRenderer", config, dataset, null),
          // onAnimationEnd: func
          // function applied after animation is done
          onAnimationEnd: kvLookup("onAnimationEnd", config, dataset, null),
          // gaugeWidthScale : float
          // width of the gauge element
          gaugeWidthScale: kvLookup("gaugeWidthScale", config, dataset, 1),
          // gaugeColor : string
          // background color of gauge element
          gaugeColor: kvLookup("gaugeColor", config, dataset, "#edebeb"),
          // label : string
          // text to show below value
          label: kvLookup("label", config, dataset, ""),
          // labelFontColor : string
          // color of label showing label under value
          labelFontColor: kvLookup("labelFontColor", config, dataset, "#b3b3b3"),
          // valueFontFamily : string
          // font-family for label as well as min/max value
          labelFontFamily: kvLookup("labelFontFamily", config, dataset, "Arial"),
          // shadowOpacity : int
          // 0 ~ 1
          shadowOpacity: kvLookup("shadowOpacity", config, dataset, 0.2),
          // shadowSize: int
          // inner shadow size
          shadowSize: kvLookup("shadowSize", config, dataset, 5),
          // shadowVerticalOffset : int
          // how much shadow is offset from top
          shadowVerticalOffset: kvLookup("shadowVerticalOffset", config, dataset, 3),
          // levelColors : string[]
          // colors of indicator, from lower to upper, in RGB format
          levelColors: kvLookup("levelColors", config, dataset, ["#a9d70b", "#f9c802", "#ff0000"], "array", ","),
          // startAnimationTime : int
          // length of initial animation
          startAnimationTime: kvLookup("startAnimationTime", config, dataset, 700),
          // startAnimationType : string
          // type of initial animation (linear, >, <,  <>, bounce)
          startAnimationType: kvLookup("startAnimationType", config, dataset, ">"),
          // refreshAnimationTime : int
          // length of refresh animation
          refreshAnimationTime: kvLookup("refreshAnimationTime", config, dataset, 700),
          // refreshAnimationType : string
          // type of refresh animation (linear, >, <,  <>, bounce)
          refreshAnimationType: kvLookup("refreshAnimationType", config, dataset, ">"),
          // donutStartAngle : int
          // angle to start from when in donut mode
          donutStartAngle: kvLookup("donutStartAngle", config, dataset, 90),
          // valueMinFontSize : int
          // absolute minimum font size for the value
          valueMinFontSize: kvLookup("valueMinFontSize", config, dataset, 16),
          // labelMinFontSize
          // absolute minimum font size for the label
          labelMinFontSize: kvLookup("labelMinFontSize", config, dataset, 10),
          // minLabelMinFontSize
          // absolute minimum font size for the minimum label
          minLabelMinFontSize: kvLookup("minLabelMinFontSize", config, dataset, 10),
          // maxLabelMinFontSize
          // absolute minimum font size for the maximum label
          maxLabelMinFontSize: kvLookup("maxLabelMinFontSize", config, dataset, 10),
          // hideValue : bool
          // hide value text
          hideValue: kvLookup("hideValue", config, dataset, false),
          // hideMinMax : bool
          // hide min and max values
          hideMinMax: kvLookup("hideMinMax", config, dataset, false),
          // showInnerShadow : bool
          // show inner shadow
          showInnerShadow: kvLookup("showInnerShadow", config, dataset, false),
          // humanFriendly : bool
          // convert large numbers for min, max, value to human friendly (e.g. 1234567 -> 1.23M)
          humanFriendly: kvLookup("humanFriendly", config, dataset, false),
          // noGradient : bool
          // whether to use gradual color change for value, or sector-based
          noGradient: kvLookup("noGradient", config, dataset, false),
          // donut : bool
          // show full donut gauge
          donut: kvLookup("donut", config, dataset, false),
          // differential : bool
          // Gauge will fill starting from the center, rather than from the min value
          differential: kvLookup("differential", config, dataset, false),
          // relativeGaugeSize : bool
          // whether gauge size should follow changes in container element size
          relativeGaugeSize: kvLookup("relativeGaugeSize", config, dataset, false),
          // counter : bool
          // animate level number change
          counter: kvLookup("counter", config, dataset, false),
          // decimals : int
          // number of digits after floating point
          decimals: kvLookup("decimals", config, dataset, 0),
          // customSectors : object
          // custom sectors colors. Expects an object with props
          // percents : bool hi/lo are percents values
          // ranges : array of objects : {hi, lo, color}
          customSectors: kvLookup("customSectors", config, dataset, {}),
          // formatNumber: boolean
          // formats numbers with commas where appropriate
          formatNumber: kvLookup("formatNumber", config, dataset, false),
          // pointer : bool
          // show value pointer
          pointer: kvLookup("pointer", config, dataset, false),
          // pointerOptions : object
          // define pointer look
          pointerOptions: kvLookup("pointerOptions", config, dataset, {}),
          // displayRemaining: boolean
          // replace display number with the number remaining to reach max
          displayRemaining: kvLookup("displayRemaining", config, dataset, false)
        };
        let canvasW, canvasH, widgetW, widgetH, aspect, dx, dy, valueFontSize, valueX, valueY, labelFontSize, labelX, labelY, minFontSize, minX, minY, maxFontSize, maxX, maxY;
        if (obj.config.value > obj.config.max) obj.config.value = obj.config.max;
        if (obj.config.value < obj.config.min) obj.config.value = obj.config.min;
        obj.originalValue = kvLookup("value", config, dataset, -1, "float");
        if (obj.config.id !== null && document.getElementById(obj.config.id) !== null) {
          obj.canvas = Raphael2(obj.config.id, "100%", "100%");
        } else if (obj.config.parentNode !== null) {
          obj.canvas = Raphael2(obj.config.parentNode, "100%", "100%");
        }
        if (obj.config.relativeGaugeSize === true) {
          if (obj.config.donut === true) {
            obj.canvas.setViewBox(0, 0, 200, 200, true);
            canvasW = 200;
            canvasH = 200;
          } else {
            obj.canvas.setViewBox(0, 0, 200, 100, true);
            canvasW = 200;
            canvasH = 100;
          }
        } else if (obj.config.width !== null && obj.config.height !== null) {
          canvasW = obj.config.width;
          canvasH = obj.config.height;
        } else if (obj.config.parentNode !== null) {
          obj.canvas.setViewBox(0, 0, 200, 100, true);
          canvasW = 200;
          canvasH = 100;
        } else {
          canvasW = getStyle(document.getElementById(obj.config.id), "width").slice(0, -2) * 1;
          canvasH = getStyle(document.getElementById(obj.config.id), "height").slice(0, -2) * 1;
        }
        if (obj.config.donut === true) {
          if (canvasW > canvasH) {
            widgetH = canvasH;
            widgetW = widgetH;
          } else if (canvasW < canvasH) {
            widgetW = canvasW;
            widgetH = widgetW;
          } else {
            widgetW = canvasW;
            widgetH = widgetW;
          }
          dx = (canvasW - widgetW) / 2;
          dy = (canvasH - widgetH) / 2;
          valueFontSize = widgetH / 6.4 > 16 ? widgetH / 5.4 : 18;
          valueX = dx + widgetW / 2;
          if (obj.config.label !== "") {
            valueY = dy + widgetH / 1.85;
          } else {
            valueY = dy + widgetH / 1.7;
          }
          labelFontSize = widgetH / 16 > 10 ? widgetH / 16 : 10;
          labelX = dx + widgetW / 2;
          labelY = valueY + labelFontSize;
          minFontSize = widgetH / 16 > 10 ? widgetH / 16 : 10;
          minX = dx + widgetW / 10 + widgetW / 6.666666666666667 * obj.config.gaugeWidthScale / 2;
          minY = labelY;
          maxFontSize = widgetH / 16 > 10 ? widgetH / 16 : 10;
          maxX = dx + widgetW - widgetW / 10 - widgetW / 6.666666666666667 * obj.config.gaugeWidthScale / 2;
          maxY = labelY;
        } else {
          if (canvasW > canvasH) {
            widgetH = canvasH;
            widgetW = widgetH * 2;
            if (widgetW > canvasW) {
              aspect = widgetW / canvasW;
              widgetW = widgetW / aspect;
              widgetH = widgetH / aspect;
            }
          } else if (canvasW < canvasH) {
            widgetW = canvasW;
            widgetH = widgetW / 2;
          } else {
            widgetW = canvasW;
            widgetH = widgetW * 0.5;
          }
          dx = (canvasW - widgetW) / 2;
          dy = (canvasH - widgetH) / 2;
          valueFontSize = widgetH / 6.5 > obj.config.valueMinFontSize ? widgetH / 6.5 : obj.config.valueMinFontSize;
          valueX = dx + widgetW / 2;
          valueY = dy + widgetH / 1.275;
          labelFontSize = widgetH / 16 > obj.config.labelMinFontSize ? widgetH / 16 : obj.config.labelMinFontSize;
          labelX = dx + widgetW / 2;
          labelY = valueY + valueFontSize / 2 + 5;
          minFontSize = widgetH / 16 > obj.config.minLabelMinFontSize ? widgetH / 16 : obj.config.minLabelMinFontSize;
          minX = dx + widgetW / 10 + widgetW / 6.666666666666667 * obj.config.gaugeWidthScale / 2;
          minY = labelY;
          maxFontSize = widgetH / 16 > obj.config.maxLabelMinFontSize ? widgetH / 16 : obj.config.maxLabelMinFontSize;
          maxX = dx + widgetW - widgetW / 10 - widgetW / 6.666666666666667 * obj.config.gaugeWidthScale / 2;
          maxY = labelY;
        }
        obj.params = {
          canvasW,
          canvasH,
          widgetW,
          widgetH,
          dx,
          dy,
          valueFontSize,
          valueX,
          valueY,
          labelFontSize,
          labelX,
          labelY,
          minFontSize,
          minX,
          minY,
          maxFontSize,
          maxX,
          maxY
        };
        obj.canvas.customAttributes.pki = function(value, isDiff) {
          let min2 = obj.config.min;
          let max2 = obj.config.max;
          const w = obj.params.widgetW;
          const h = obj.params.widgetH;
          const dx2 = obj.params.dx;
          const dy2 = obj.params.dy;
          const gws = obj.config.gaugeWidthScale;
          const donut = obj.config.donut;
          let alpha;
          let Ro;
          let Ri;
          let Cx;
          let Cy;
          let So;
          let Si;
          let Xo;
          let Yo;
          let Xi;
          let Yi;
          let path;
          if (min2 < 0 && !isDiff) {
            max2 -= min2;
            value -= min2;
            min2 = 0;
          }
          if (donut) {
            alpha = (1 - 2 * (value - min2) / (max2 - min2)) * Math.PI;
            Ro = w / 2 - w / 30;
            Ri = Ro - w / 6.666666666666667 * gws;
            Cx = w / 2 + dx2;
            Cy = h / 2 + dy2;
            Xo = Cx + Ro * Math.cos(alpha);
            Yo = Cy - Ro * Math.sin(alpha);
            Xi = Cx + Ri * Math.cos(alpha);
            Yi = Cy - Ri * Math.sin(alpha);
            path = "M" + (Cx - Ri) + "," + Cy + " ";
            path += "L" + (Cx - Ro) + "," + Cy + " ";
            if (value - min2 > (max2 - min2) / 2) {
              path += "A" + Ro + "," + Ro + " 0 0 1 " + (Cx + Ro) + "," + Cy + " ";
            }
            path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
            path += "L" + Xi + "," + Yi + " ";
            if (value - min2 > (max2 - min2) / 2) {
              path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx + Ri) + "," + Cy + " ";
            }
            path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
            path += "Z ";
            return {
              path
            };
          } else if (isDiff) {
            alpha = (1 - (value - min2) / (max2 - min2)) * Math.PI;
            Ro = w / 2 - w / 10;
            Ri = Ro - w / 6.666666666666667 * gws;
            Cx = w / 2 + dx2;
            Cy = h / 1.25 + dy2;
            Xo = Cx + Ro * Math.cos(alpha);
            Yo = Cy - Ro * Math.sin(alpha);
            Xi = Cx + Ri * Math.cos(alpha);
            Yi = Cy - Ri * Math.sin(alpha);
            const middle = min2 + (max2 - min2) / 2;
            So = value < middle ? 1 : 0;
            Si = value < middle ? 0 : 1;
            path = "M" + Cx + "," + (Cy - Ri) + " ";
            path += "L" + Cx + "," + (Cy - Ro) + " ";
            path += "A" + Ro + "," + Ro + " 0 0 " + Si + " " + Xo + "," + Yo + " ";
            path += "L" + Xi + "," + Yi + " ";
            path += "A" + Ri + "," + Ri + " 0 0 " + So + " " + Cx + "," + (Cy - Ri) + " ";
            path += "Z ";
            return {
              path
            };
          } else {
            alpha = (1 - (value - min2) / (max2 - min2)) * Math.PI;
            Ro = w / 2 - w / 10;
            Ri = Ro - w / 6.666666666666667 * gws;
            Cx = w / 2 + dx2;
            Cy = h / 1.25 + dy2;
            Xo = Cx + Ro * Math.cos(alpha);
            Yo = Cy - Ro * Math.sin(alpha);
            Xi = Cx + Ri * Math.cos(alpha);
            Yi = Cy - Ri * Math.sin(alpha);
            path = "M" + (Cx - Ri) + "," + Cy + " ";
            path += "L" + (Cx - Ro) + "," + Cy + " ";
            path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
            path += "L" + Xi + "," + Yi + " ";
            path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
            path += "Z ";
            return {
              path
            };
          }
        };
        obj.canvas.customAttributes.ndl = function(value) {
          const min2 = obj.config.min;
          const max2 = obj.config.max;
          const w = obj.params.widgetW;
          const h = obj.params.widgetH;
          const dx2 = obj.params.dx;
          const dy2 = obj.params.dy;
          const gws = obj.config.gaugeWidthScale;
          const donut = obj.config.donut;
          let dlt = w * 3.5 / 100;
          let dlb = w / 15;
          let dw = w / 100;
          if (obj.config.pointerOptions.toplength != null && obj.config.pointerOptions.toplength !== void 0) dlt = obj.config.pointerOptions.toplength;
          if (obj.config.pointerOptions.bottomlength != null && obj.config.pointerOptions.bottomlength !== void 0) dlb = obj.config.pointerOptions.bottomlength;
          if (obj.config.pointerOptions.bottomwidth != null && obj.config.pointerOptions.bottomwidth !== void 0) dw = obj.config.pointerOptions.bottomwidth;
          let alpha, Ro, Ri, Cy, Xo, Yo, Xi, Yi, Xc, Yc, Xz, Yz, Xa, Ya, Xb, Yb, path;
          if (donut) {
            alpha = (1 - 2 * (value - min2) / (max2 - min2)) * Math.PI;
            Ro = w / 2 - w / 30;
            Ri = Ro - w / 6.666666666666667 * gws;
            Cy = h / 2 + dy2;
            Xo = w / 2 + dx2 + Ro * Math.cos(alpha);
            Yo = h - (h - Cy) - Ro * Math.sin(alpha);
            Xi = w / 2 + dx2 + Ri * Math.cos(alpha);
            Yi = h - (h - Cy) - Ri * Math.sin(alpha);
            Xc = Xo + dlt * Math.cos(alpha);
            Yc = Yo - dlt * Math.sin(alpha);
            Xz = Xi - dlb * Math.cos(alpha);
            Yz = Yi + dlb * Math.sin(alpha);
            Xa = Xz + dw * Math.sin(alpha);
            Ya = Yz + dw * Math.cos(alpha);
            Xb = Xz - dw * Math.sin(alpha);
            Yb = Yz - dw * Math.cos(alpha);
            path = "M" + Xa + "," + Ya + " ";
            path += "L" + Xb + "," + Yb + " ";
            path += "L" + Xc + "," + Yc + " ";
            path += "Z ";
            return {
              path
            };
          } else {
            alpha = (1 - (value - min2) / (max2 - min2)) * Math.PI;
            Ro = w / 2 - w / 10;
            Ri = Ro - w / 6.666666666666667 * gws;
            Cy = h / 1.25 + dy2;
            Xo = w / 2 + dx2 + Ro * Math.cos(alpha);
            Yo = h - (h - Cy) - Ro * Math.sin(alpha);
            Xi = w / 2 + dx2 + Ri * Math.cos(alpha);
            Yi = h - (h - Cy) - Ri * Math.sin(alpha);
            Xc = Xo + dlt * Math.cos(alpha);
            Yc = Yo - dlt * Math.sin(alpha);
            Xz = Xi - dlb * Math.cos(alpha);
            Yz = Yi + dlb * Math.sin(alpha);
            Xa = Xz + dw * Math.sin(alpha);
            Ya = Yz + dw * Math.cos(alpha);
            Xb = Xz - dw * Math.sin(alpha);
            Yb = Yz - dw * Math.cos(alpha);
            path = "M" + Xa + "," + Ya + " ";
            path += "L" + Xb + "," + Yb + " ";
            path += "L" + Xc + "," + Yc + " ";
            path += "Z ";
            return {
              path
            };
          }
        };
        obj.gauge = obj.canvas.path().attr({
          stroke: "none",
          fill: obj.config.gaugeColor,
          pki: [obj.config.max]
        });
        obj.level = obj.canvas.path().attr({
          stroke: "none",
          fill: getColor(obj.config.value, (obj.config.value - obj.config.min) / (obj.config.max - obj.config.min), obj.config.levelColors, obj.config.noGradient, obj.config.customSectors),
          pki: [obj.config.differential ? 0 : obj.config.min, obj.config.differential]
        });
        if (obj.config.donut) {
          obj.level.transform("r" + obj.config.donutStartAngle + ", " + (obj.params.widgetW / 2 + obj.params.dx) + ", " + (obj.params.widgetH / 2 + obj.params.dy));
        }
        if (obj.config.pointer) {
          obj.needle = obj.canvas.path().attr({
            stroke: !isUndefined(obj.config.pointerOptions.stroke) ? obj.config.pointerOptions.stroke : "none",
            "stroke-width": !isUndefined(obj.config.pointerOptions.stroke_width) ? obj.config.pointerOptions.stroke_width : 0,
            "stroke-linecap": !isUndefined(obj.config.pointerOptions.stroke_linecap) ? obj.config.pointerOptions.stroke_linecap : "square",
            fill: !isUndefined(obj.config.pointerOptions.color) ? obj.config.pointerOptions.color : "#000000",
            ndl: [obj.config.min]
          });
          if (obj.config.donut) {
            obj.needle.transform("r" + obj.config.donutStartAngle + ", " + (obj.params.widgetW / 2 + obj.params.dx) + ", " + (obj.params.widgetH / 2 + obj.params.dy));
          }
        }
        obj.txtValue = obj.canvas.text(obj.params.valueX, obj.params.valueY, 0);
        obj.txtValue.attr({
          "font-size": obj.params.valueFontSize,
          "font-weight": "bold",
          "font-family": obj.config.valueFontFamily,
          fill: obj.config.valueFontColor,
          "fill-opacity": "0"
        });
        setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
        obj.txtLabel = obj.canvas.text(obj.params.labelX, obj.params.labelY, obj.config.label);
        obj.txtLabel.attr({
          "font-size": obj.params.labelFontSize,
          "font-weight": "normal",
          "font-family": obj.config.labelFontFamily,
          fill: obj.config.labelFontColor,
          "fill-opacity": "0"
        });
        setDy(obj.txtLabel, obj.params.labelFontSize, obj.params.labelY);
        let min = obj.config.min;
        if (obj.config.reverse) {
          min = obj.config.max;
        }
        obj.txtMinimum = min;
        if (obj.config.minTxt) {
          obj.txtMinimum = obj.config.minTxt;
        } else if (obj.config.humanFriendly) {
          obj.txtMinimum = humanFriendlyNumber(min, obj.config.humanFriendlyDecimal);
        } else if (obj.config.formatNumber) {
          obj.txtMinimum = formatNumber(min);
        }
        obj.txtMin = obj.canvas.text(obj.params.minX, obj.params.minY, obj.txtMinimum);
        obj.txtMin.attr({
          "font-size": obj.params.minFontSize,
          "font-weight": "normal",
          "font-family": obj.config.labelFontFamily,
          fill: obj.config.labelFontColor,
          "fill-opacity": obj.config.hideMinMax || obj.config.donut ? "0" : "1"
        });
        setDy(obj.txtMin, obj.params.minFontSize, obj.params.minY);
        let max = obj.config.max;
        if (obj.config.reverse) {
          max = obj.config.min;
        }
        obj.txtMaximum = max;
        if (obj.config.maxTxt) {
          obj.txtMaximum = obj.config.maxTxt;
        } else if (obj.config.humanFriendly) {
          obj.txtMaximum = humanFriendlyNumber(max, obj.config.humanFriendlyDecimal);
        } else if (obj.config.formatNumber) {
          obj.txtMaximum = formatNumber(max);
        }
        obj.txtMax = obj.canvas.text(obj.params.maxX, obj.params.maxY, obj.txtMaximum);
        obj.txtMax.attr({
          "font-size": obj.params.maxFontSize,
          "font-weight": "normal",
          "font-family": obj.config.labelFontFamily,
          fill: obj.config.labelFontColor,
          "fill-opacity": obj.config.hideMinMax || obj.config.donut ? "0" : "1"
        });
        setDy(obj.txtMax, obj.params.maxFontSize, obj.params.maxY);
        const defs = obj.canvas.canvas.childNodes[1];
        const svg = "http://www.w3.org/2000/svg";
        if (ie !== void 0 && ie < 9) {
        } else if (ie !== void 0) {
          onCreateElementNsReady(function() {
            obj.generateShadow(svg, defs);
          });
        } else {
          obj.generateShadow(svg, defs);
        }
        if (obj.config.textRenderer && obj.config.textRenderer(obj.originalValue) !== false) {
          obj.originalValue = obj.config.textRenderer(obj.originalValue);
        } else if (obj.config.humanFriendly) {
          obj.originalValue = humanFriendlyNumber(obj.originalValue, obj.config.humanFriendlyDecimal) + obj.config.symbol;
        } else if (obj.config.formatNumber) {
          obj.originalValue = formatNumber(obj.originalValue) + obj.config.symbol;
        } else if (obj.config.displayRemaining) {
          obj.originalValue = ((obj.config.max - obj.originalValue) * 1).toFixed(obj.config.decimals) + obj.config.symbol;
        } else {
          obj.originalValue = (obj.originalValue * 1).toFixed(obj.config.decimals) + obj.config.symbol;
        }
        if (obj.config.counter === true) {
          const onFrame = function() {
            let currentValue = obj.level.attr("pki")[0];
            if (obj.config.reverse) {
              currentValue = obj.config.max * 1 + obj.config.min * 1 - obj.level.attr("pki")[0] * 1;
            }
            if (obj.config.textRenderer && obj.config.textRenderer(Math.floor(currentValue)) !== false) {
              obj.txtValue.attr("text", obj.config.textRenderer(Math.floor(currentValue)));
            } else if (obj.config.humanFriendly) {
              obj.txtValue.attr("text", humanFriendlyNumber(Math.floor(currentValue), obj.config.humanFriendlyDecimal) + obj.config.symbol);
            } else if (obj.config.formatNumber) {
              obj.txtValue.attr("text", formatNumber(Math.floor(currentValue)) + obj.config.symbol);
            } else if (obj.config.displayRemaining) {
              obj.txtValue.attr("text", ((obj.config.max - currentValue) * 1).toFixed(obj.config.decimals) + obj.config.symbol);
            } else {
              obj.txtValue.attr("text", (currentValue * 1).toFixed(obj.config.decimals) + obj.config.symbol);
            }
            setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
            currentValue = null;
          };
          const onFinish = function() {
            obj.txtValue.attr({
              text: obj.originalValue
            });
            setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
          };
          this.bindEvent("raphael.anim.finish", onFinish);
          this.bindEvent("raphael.anim.frame", onFrame);
        } else {
          const onStart = function() {
            obj.txtValue.attr({
              text: obj.originalValue
            });
            setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
          };
          this.bindEvent("raphael.anim.start", onStart);
        }
        let rvl = obj.config.value;
        if (obj.config.reverse) {
          rvl = obj.config.max * 1 + obj.config.min * 1 - obj.config.value * 1;
        }
        obj.level.animate({
          pki: [rvl, obj.config.differential]
        }, obj.config.startAnimationTime, obj.config.startAnimationType, obj.config.onAnimationEnd);
        if (obj.config.pointer) {
          obj.needle.animate({
            ndl: [rvl]
          }, obj.config.startAnimationTime, obj.config.startAnimationType);
        }
        obj.txtValue.animate({
          "fill-opacity": obj.config.hideValue ? "0" : "1"
        }, obj.config.startAnimationTime, obj.config.startAnimationType);
        obj.txtLabel.animate({
          "fill-opacity": "1"
        }, obj.config.startAnimationTime, obj.config.startAnimationType);
      };
      JustGage.prototype.bindEvent = function(eventName, func) {
        eventName += "." + this.level.id;
        if (this.events[eventName]) {
          Raphael2.eve.off(eventName, this.events[eventName]);
        }
        Raphael2.eve.on(eventName, func);
        this.events[eventName] = func;
      };
      JustGage.prototype.refresh = function(val, max, min, label) {
        const obj = this;
        let displayVal;
        max = isNumber(max) ? max : null;
        min = isNumber(min) ? min : null;
        label = label || null;
        if (label !== null) {
          obj.config.label = label;
          obj.txtLabel.attr({
            text: obj.config.label
          });
          setDy(obj.txtLabel, obj.params.labelFontSize, obj.params.labelY);
        }
        if (min !== null) {
          obj.config.min = min;
          obj.txtMinimum = obj.config.min;
          if (obj.config.minTxt) {
            obj.txtMinimum = obj.config.minTxt;
          } else if (obj.config.humanFriendly) {
            obj.txtMinimum = humanFriendlyNumber(obj.config.min, obj.config.humanFriendlyDecimal);
          } else if (obj.config.formatNumber) {
            obj.txtMinimum = formatNumber(obj.config.min);
          }
          if (!obj.config.reverse) {
            obj.txtMin.attr({
              text: obj.txtMinimum
            });
            setDy(obj.txtMin, obj.params.minFontSize, obj.params.minY);
          } else {
            obj.txtMax.attr({
              text: obj.txtMinimum
            });
            setDy(obj.txtMax, obj.params.minFontSize, obj.params.minY);
          }
        }
        if (max !== null) {
          obj.config.max = max;
          obj.txtMaximum = obj.config.max;
          if (obj.config.maxTxt) {
            obj.txtMaximum = obj.config.maxTxt;
          } else if (obj.config.humanFriendly) {
            obj.txtMaximum = humanFriendlyNumber(obj.config.max, obj.config.humanFriendlyDecimal);
          } else if (obj.config.formatNumber) {
            obj.txtMaximum = formatNumber(obj.config.max);
          }
          if (!obj.config.reverse) {
            obj.txtMax.attr({
              text: obj.txtMaximum
            });
            setDy(obj.txtMax, obj.params.maxFontSize, obj.params.maxY);
          } else {
            obj.txtMin.attr({
              text: obj.txtMaximum
            });
            setDy(obj.txtMin, obj.params.maxFontSize, obj.params.maxY);
          }
        }
        displayVal = val;
        if (val * 1 > obj.config.max * 1) {
          val = obj.config.max * 1;
        }
        if (val * 1 < obj.config.min * 1) {
          val = obj.config.min * 1;
        }
        const color = getColor(val, (val - obj.config.min) / (obj.config.max - obj.config.min), obj.config.levelColors, obj.config.noGradient, obj.config.customSectors);
        if (obj.config.textRenderer && obj.config.textRenderer(displayVal) !== false) {
          displayVal = obj.config.textRenderer(displayVal);
        } else if (obj.config.humanFriendly) {
          displayVal = humanFriendlyNumber(displayVal, obj.config.humanFriendlyDecimal) + obj.config.symbol;
        } else if (obj.config.formatNumber) {
          displayVal = formatNumber((displayVal * 1).toFixed(obj.config.decimals)) + obj.config.symbol;
        } else if (obj.config.displayRemaining) {
          displayVal = ((obj.config.max - displayVal) * 1).toFixed(obj.config.decimals) + obj.config.symbol;
        } else {
          displayVal = (displayVal * 1).toFixed(obj.config.decimals) + obj.config.symbol;
        }
        obj.originalValue = displayVal;
        obj.config.value = val * 1;
        if (!obj.config.counter) {
          obj.txtValue.attr({
            text: displayVal
          });
          setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
        }
        let rvl = obj.config.value;
        if (obj.config.reverse) {
          rvl = obj.config.max * 1 + obj.config.min * 1 - obj.config.value * 1;
        }
        obj.level.animate({
          pki: [rvl, obj.config.differential],
          fill: color
        }, obj.config.refreshAnimationTime, obj.config.refreshAnimationType, obj.config.onAnimationEnd);
        if (obj.config.pointer) {
          obj.needle.animate({
            ndl: [rvl]
          }, obj.config.refreshAnimationTime, obj.config.refreshAnimationType);
        }
      };
      JustGage.prototype.update = function(options, val) {
        const obj = this;
        if (options instanceof Object) {
          for (const option in options) {
            val = options[option];
            updateProp(obj, option, val);
          }
        } else {
          updateProp(obj, options, val);
        }
      };
      function updateProp(obj, option, val) {
        switch (option) {
          case "valueFontColor":
            if (!isHexColor(val)) {
              console.log("* justgage: the updated valueFontColor value is not a valid hex color");
              break;
            }
            obj.txtValue.attr({
              fill: val
            });
            break;
          case "labelFontColor":
            if (!isHexColor(val)) {
              console.log("* justgage: the updated labelFontColor value is not a valid hex color");
              break;
            }
            obj.txtMin.attr({
              fill: val
            });
            obj.txtMax.attr({
              fill: val
            });
            obj.txtLabel.attr({
              fill: val
            });
            break;
          default:
            console.log(`* justgage: "${option}" is not a supported update setting`);
        }
      }
      JustGage.prototype.destroy = function() {
        if (this.node && this.node.parentNode) this.node.innerHTML = "";
        for (const event in this.events) {
          Raphael2.eve.off(event, this.events[event]);
        }
        this.events = {};
      };
      JustGage.prototype.generateShadow = function(svg, defs) {
        const obj = this;
        const sid = "inner-shadow-" + (obj.config.id || obj.config.classId);
        const gaussFilter = document.createElementNS(svg, "filter");
        gaussFilter.setAttribute("id", sid);
        defs.appendChild(gaussFilter);
        const feOffset = document.createElementNS(svg, "feOffset");
        feOffset.setAttribute("dx", 0);
        feOffset.setAttribute("dy", obj.config.shadowVerticalOffset);
        gaussFilter.appendChild(feOffset);
        const feGaussianBlur = document.createElementNS(svg, "feGaussianBlur");
        feGaussianBlur.setAttribute("result", "offset-blur");
        feGaussianBlur.setAttribute("stdDeviation", obj.config.shadowSize);
        gaussFilter.appendChild(feGaussianBlur);
        const feComposite1 = document.createElementNS(svg, "feComposite");
        feComposite1.setAttribute("operator", "out");
        feComposite1.setAttribute("in", "SourceGraphic");
        feComposite1.setAttribute("in2", "offset-blur");
        feComposite1.setAttribute("result", "inverse");
        gaussFilter.appendChild(feComposite1);
        const feFlood = document.createElementNS(svg, "feFlood");
        feFlood.setAttribute("flood-color", "black");
        feFlood.setAttribute("flood-opacity", obj.config.shadowOpacity);
        feFlood.setAttribute("result", "color");
        gaussFilter.appendChild(feFlood);
        const feComposite2 = document.createElementNS(svg, "feComposite");
        feComposite2.setAttribute("operator", "in");
        feComposite2.setAttribute("in", "color");
        feComposite2.setAttribute("in2", "inverse");
        feComposite2.setAttribute("result", "shadow");
        gaussFilter.appendChild(feComposite2);
        const feComposite3 = document.createElementNS(svg, "feComposite");
        feComposite3.setAttribute("operator", "over");
        feComposite3.setAttribute("in", "shadow");
        feComposite3.setAttribute("in2", "SourceGraphic");
        gaussFilter.appendChild(feComposite3);
        if (obj.config.showInnerShadow) {
          obj.canvas.canvas.childNodes[2].setAttribute("filter", "url(#" + sid + ")");
          obj.canvas.canvas.childNodes[3].setAttribute("filter", "url(#" + sid + ")");
        }
      };
      function kvLookup(key, tablea, tableb, defval, datatype, delimiter) {
        let val = defval;
        let canConvert = false;
        if (!isUndefined(key)) {
          if (!isUndefined(tableb) && typeof tableb === "object" && key in tableb) {
            val = tableb[key];
            canConvert = true;
          } else if (!isUndefined(tablea) && typeof tablea === "object" && key in tablea) {
            val = tablea[key];
            canConvert = true;
          } else {
            val = defval;
          }
          if (canConvert === true) {
            if (!isUndefined(datatype)) {
              switch (datatype) {
                case "int":
                  val = parseInt(val, 10);
                  break;
                case "float":
                  val = parseFloat(val);
                  break;
                default:
                  break;
              }
            }
          }
        }
        return val;
      }
      function isUndefined(v) {
        return v === null || v === void 0;
      }
      function getColor(val, pct, col, noGradient, custSec) {
        let percentage, rval, gval, bval, lower, upper, range, rangePct, pctLower, pctUpper, color;
        const cust = custSec && custSec.ranges && custSec.ranges.length > 0;
        noGradient = noGradient || cust;
        if (cust) {
          if (custSec.percents === true) val = pct * 100;
          for (let i = 0; i < custSec.ranges.length; i++) {
            if (val >= custSec.ranges[i].lo && val <= custSec.ranges[i].hi) {
              return custSec.ranges[i].color;
            }
          }
        }
        const no = col.length;
        if (no === 1) return col[0];
        const inc = noGradient ? 1 / no : 1 / (no - 1);
        const colors = [];
        for (let i = 0; i < col.length; i++) {
          percentage = noGradient ? inc * (i + 1) : inc * i;
          rval = parseInt(cutHex(col[i]).substring(0, 2), 16);
          gval = parseInt(cutHex(col[i]).substring(2, 4), 16);
          bval = parseInt(cutHex(col[i]).substring(4, 6), 16);
          colors[i] = {
            pct: percentage,
            color: {
              r: rval,
              g: gval,
              b: bval
            }
          };
        }
        if (pct === 0) {
          return "rgb(" + [colors[0].color.r, colors[0].color.g, colors[0].color.b].join(",") + ")";
        }
        for (let j = 0; j < colors.length; j++) {
          if (pct <= colors[j].pct) {
            if (noGradient) {
              return "rgb(" + [colors[j].color.r, colors[j].color.g, colors[j].color.b].join(",") + ")";
            } else {
              lower = colors[j - 1];
              upper = colors[j];
              range = upper.pct - lower.pct;
              rangePct = (pct - lower.pct) / range;
              pctLower = 1 - rangePct;
              pctUpper = rangePct;
              color = {
                r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
                g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
                b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
              };
              return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
            }
          }
        }
      }
      function setDy(elem, fontSize, txtYpos) {
        if ((!ie || ie > 9) && elem.node.firstChild.attributes.dy) {
          elem.node.firstChild.attributes.dy.value = 0;
        }
      }
      function cutHex(str) {
        return str.charAt(0) === "#" ? str.substring(1, 7) : str;
      }
      function isHexColor(val) {
        const regExp = /^#([0-9A-Fa-f]{3}){1,2}$/;
        return typeof val === "string" && regExp.test(val);
      }
      function humanFriendlyNumber(n, d) {
        const d2 = Math.pow(10, d);
        const s = " KMGTPE";
        let i = 0;
        const c = 1e3;
        while ((n >= c || n <= -c) && ++i < s.length) n = n / c;
        i = i >= s.length ? s.length - 1 : i;
        return Math.round(n * d2) / d2 + s[i];
      }
      function formatNumber(x) {
        const parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
      function getStyle(oElm, strCssRule) {
        let strValue = "";
        if (document.defaultView && document.defaultView.getComputedStyle) {
          strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
        } else if (oElm.currentStyle) {
          strCssRule = strCssRule.replace(/-(\w)/g, function(strMatch, p1) {
            return p1.toUpperCase();
          });
          strValue = oElm.currentStyle[strCssRule];
        }
        return strValue;
      }
      function onCreateElementNsReady(func) {
        if (document.createElementNS !== void 0) {
          func();
        } else {
          setTimeout(function() {
            onCreateElementNsReady(func);
          }, 100);
        }
      }
      const ie = function() {
        let v = 3;
        const div = document.createElement("div");
        const all = div.getElementsByTagName("i");
        while (all[0]) {
          div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->";
        }
        return v > 4 ? v : void 0;
      }();
      function extend(out) {
        out = out || {};
        for (let i = 1; i < arguments.length; i++) {
          if (!arguments[i]) {
            continue;
          }
          for (const key in arguments[i]) {
            if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
              out[key] = arguments[i][key];
            }
          }
        }
        return out;
      }
      function isNumber(n) {
        return n !== null && n !== void 0 && !isNaN(n);
      }
      function uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === "x" ? r : r & 3 | 8;
          return v.toString(16);
        });
      }
      return JustGage;
    });
  }
});

// node_modules/justgage/index.js
var require_justgage2 = __commonJS({
  "node_modules/justgage/index.js"(exports, module) {
    module.exports = require_justgage();
  }
});
export default require_justgage2();
//# sourceMappingURL=justgage.js.map
