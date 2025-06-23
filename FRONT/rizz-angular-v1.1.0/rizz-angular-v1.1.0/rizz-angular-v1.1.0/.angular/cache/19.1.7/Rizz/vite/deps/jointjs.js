import {
  require_backbone,
  require_jquery
} from "./chunk-TPQFLVQ3.js";
import {
  __export,
  __toESM
} from "./chunk-APYJOV5E.js";

// node_modules/jointjs/src/layout/index.mjs
var layout_exports = {};
__export(layout_exports, {
  DirectedGraph: () => DirectedGraph,
  Port: () => port_exports,
  PortLabel: () => portLabel_exports
});

// node_modules/jointjs/src/layout/ports/port.mjs
var port_exports = {};
__export(port_exports, {
  absolute: () => absolute,
  bottom: () => bottom,
  ellipse: () => ellipse2,
  ellipseSpread: () => ellipseSpread,
  fn: () => fn,
  left: () => left,
  line: () => line2,
  right: () => right,
  top: () => top
});

// node_modules/jointjs/src/dia/attributes/calc.mjs
var props = {
  x: "x",
  y: "y",
  width: "w",
  height: "h",
  minimum: "s",
  maximum: "l",
  diagonal: "d"
};
var propsList = Object.keys(props).map((key) => props[key]).join("");
var numberPattern = "[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?";
var findSpacesRegex = /\s/g;
var parseExpressionRegExp = new RegExp(`^(${numberPattern}\\*)?([${propsList}])(/${numberPattern})?([-+]{1,2}${numberPattern})?$`, "g");
function throwInvalid(expression) {
  throw new Error(`Invalid calc() expression: ${expression}`);
}
function evalCalcExpression(expression, bbox2) {
  const match = parseExpressionRegExp.exec(expression.replace(findSpacesRegex, ""));
  if (!match) throwInvalid(expression);
  parseExpressionRegExp.lastIndex = 0;
  const [, multiply, property2, divide, add] = match;
  const {
    x,
    y,
    width,
    height
  } = bbox2;
  let value = 0;
  switch (property2) {
    case props.width: {
      value = width;
      break;
    }
    case props.height: {
      value = height;
      break;
    }
    case props.x: {
      value = x;
      break;
    }
    case props.y: {
      value = y;
      break;
    }
    case props.minimum: {
      value = Math.min(height, width);
      break;
    }
    case props.maximum: {
      value = Math.max(height, width);
      break;
    }
    case props.diagonal: {
      value = Math.sqrt(height * height + width * width);
      break;
    }
  }
  if (multiply) {
    value *= parseFloat(multiply);
  }
  if (divide) {
    value /= parseFloat(divide.slice(1));
  }
  if (add) {
    value += evalAddExpression(add);
  }
  return value;
}
function evalAddExpression(addExpression) {
  if (!addExpression) return 0;
  const [sign] = addExpression;
  switch (sign) {
    case "+": {
      return parseFloat(addExpression.substr(1));
    }
    case "-": {
      return -parseFloat(addExpression.substr(1));
    }
  }
  return parseFloat(addExpression);
}
function isCalcAttribute(value) {
  return typeof value === "string" && value.includes("calc");
}
var calcStart = "calc(";
var calcStartOffset = calcStart.length;
function evalCalcAttribute(attributeValue, refBBox) {
  let value = attributeValue;
  let startSearchIndex = 0;
  do {
    let calcIndex = value.indexOf(calcStart, startSearchIndex);
    if (calcIndex === -1) return value;
    let calcEndIndex = calcIndex + calcStartOffset;
    let brackets = 1;
    findClosingBracket: do {
      switch (value[calcEndIndex]) {
        case "(": {
          brackets++;
          break;
        }
        case ")": {
          brackets--;
          if (brackets === 0) break findClosingBracket;
          break;
        }
        case void 0: {
          throwInvalid(value);
        }
      }
      calcEndIndex++;
    } while (true);
    let expression = value.slice(calcIndex + calcStartOffset, calcEndIndex);
    if (isCalcAttribute(expression)) {
      expression = evalCalcAttribute(expression, refBBox);
    }
    const calcValue = String(evalCalcExpression(expression, refBBox));
    value = value.slice(0, calcIndex) + calcValue + value.slice(calcEndIndex + 1);
    startSearchIndex = calcIndex + calcValue.length;
  } while (true);
}

// node_modules/jointjs/src/g/index.mjs
var g_exports = {};
__export(g_exports, {
  Curve: () => Curve,
  Ellipse: () => Ellipse,
  Line: () => Line,
  Path: () => Path,
  Point: () => Point,
  Polygon: () => Polygon,
  Polyline: () => Polyline,
  Rect: () => Rect,
  bezier: () => bezier,
  ellipse: () => ellipse,
  intersection: () => intersection,
  line: () => line,
  normalizeAngle: () => normalizeAngle,
  point: () => point,
  random: () => random,
  rect: () => rect,
  scale: () => scale,
  snapToGrid: () => snapToGrid,
  toDeg: () => toDeg,
  toRad: () => toRad,
  types: () => types
});

// node_modules/jointjs/src/g/geometry.helpers.mjs
var {
  round,
  floor,
  PI
} = Math;
var scale = {
  // Return the `value` from the `domain` interval scaled to the `range` interval.
  linear: function(domain, range, value) {
    var domainSpan = domain[1] - domain[0];
    var rangeSpan = range[1] - range[0];
    return (value - domain[0]) / domainSpan * rangeSpan + range[0] || 0;
  }
};
var normalizeAngle = function(angle) {
  return angle % 360 + (angle < 0 ? 360 : 0);
};
var snapToGrid = function(value, gridSize) {
  return gridSize * round(value / gridSize);
};
var toDeg = function(rad) {
  return 180 * rad / PI % 360;
};
var toRad = function(deg, over360) {
  over360 = over360 || false;
  deg = over360 ? deg : deg % 360;
  return deg * PI / 180;
};
var random = function(min5, max5) {
  if (max5 === void 0) {
    max5 = min5 === void 0 ? 1 : min5;
    min5 = 0;
  } else if (max5 < min5) {
    const temp = min5;
    min5 = max5;
    max5 = temp;
  }
  return floor(Math.random() * (max5 - min5 + 1) + min5);
};

// node_modules/jointjs/src/g/line.bearing.mjs
var {
  cos,
  sin,
  atan2
} = Math;
var bearing = function(p, q) {
  var lat1 = toRad(p.y);
  var lat2 = toRad(q.y);
  var lon1 = p.x;
  var lon2 = q.x;
  var dLon = toRad(lon2 - lon1);
  var y = sin(dLon) * cos(lat2);
  var x = cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(dLon);
  var brng = toDeg(atan2(y, x));
  var bearings = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"];
  var index = brng - 22.5;
  if (index < 0) index += 360;
  index = parseInt(index / 45);
  return bearings[index];
};

// node_modules/jointjs/src/g/line.squaredLength.mjs
var squaredLength = function(start, end) {
  var x0 = start.x;
  var y0 = start.y;
  var x1 = end.x;
  var y1 = end.y;
  return (x0 -= x1) * x0 + (y0 -= y1) * y0;
};

// node_modules/jointjs/src/g/line.length.mjs
var length = function(start, end) {
  return Math.sqrt(squaredLength(start, end));
};

// node_modules/jointjs/src/g/types.mjs
var types = {
  Point: 1,
  Line: 2,
  Ellipse: 3,
  Rect: 4,
  Polyline: 5,
  Polygon: 6,
  Curve: 7,
  Path: 8
};

// node_modules/jointjs/src/g/point.mjs
var {
  abs,
  cos: cos2,
  sin: sin2,
  sqrt,
  min,
  max,
  atan2: atan22,
  round: round2,
  pow,
  PI: PI2
} = Math;
var Point = function(x, y) {
  if (!(this instanceof Point)) {
    return new Point(x, y);
  }
  if (typeof x === "string") {
    var xy = x.split(x.indexOf("@") === -1 ? " " : "@");
    x = parseFloat(xy[0]);
    y = parseFloat(xy[1]);
  } else if (Object(x) === x) {
    y = x.y;
    x = x.x;
  }
  this.x = x === void 0 ? 0 : x;
  this.y = y === void 0 ? 0 : y;
};
Point.fromPolar = function(distance, angle, origin) {
  origin = new Point(origin);
  var x = abs(distance * cos2(angle));
  var y = abs(distance * sin2(angle));
  var deg = normalizeAngle(toDeg(angle));
  if (deg < 90) {
    y = -y;
  } else if (deg < 180) {
    x = -x;
    y = -y;
  } else if (deg < 270) {
    x = -x;
  }
  return new Point(origin.x + x, origin.y + y);
};
Point.random = function(x1, x2, y1, y2) {
  return new Point(random(x1, x2), random(y1, y2));
};
Point.prototype = {
  type: types.Point,
  chooseClosest: function(points) {
    var n = points.length;
    if (n === 1) return new Point(points[0]);
    var closest = null;
    var minSqrDistance = Infinity;
    for (var i = 0; i < n; i++) {
      var p = new Point(points[i]);
      var sqrDistance = this.squaredDistance(p);
      if (sqrDistance < minSqrDistance) {
        closest = p;
        minSqrDistance = sqrDistance;
      }
    }
    return closest;
  },
  // If point lies outside rectangle `r`, return the nearest point on the boundary of rect `r`,
  // otherwise return point itself.
  // (see Squeak Smalltalk, Point>>adhereTo:)
  adhereToRect: function(r) {
    if (r.containsPoint(this)) {
      return this;
    }
    this.x = min(max(this.x, r.x), r.x + r.width);
    this.y = min(max(this.y, r.y), r.y + r.height);
    return this;
  },
  // Compute the angle between vector from me to p1 and the vector from me to p2.
  // ordering of points p1 and p2 is important!
  // theta function's angle convention:
  // returns angles between 0 and 180 when the angle is counterclockwise
  // returns angles between 180 and 360 to convert clockwise angles into counterclockwise ones
  // returns NaN if any of the points p1, p2 is coincident with this point
  angleBetween: function(p1, p2) {
    var angleBetween = this.equals(p1) || this.equals(p2) ? NaN : this.theta(p2) - this.theta(p1);
    if (angleBetween < 0) {
      angleBetween += 360;
    }
    return angleBetween;
  },
  // Return the bearing between me and the given point.
  bearing: function(point2) {
    return bearing(this, point2);
  },
  // Returns change in angle from my previous position (-dx, -dy) to my new position
  // relative to ref point.
  changeInAngle: function(dx, dy, ref) {
    return this.clone().offset(-dx, -dy).theta(ref) - this.theta(ref);
  },
  clone: function() {
    return new Point(this);
  },
  // Returns the cross product of this point relative to two other points
  // this point is the common point
  // point p1 lies on the first vector, point p2 lies on the second vector
  // watch out for the ordering of points p1 and p2!
  // positive result indicates a clockwise ("right") turn from first to second vector
  // negative result indicates a counterclockwise ("left") turn from first to second vector
  // zero indicates that the first and second vector are collinear
  // note that the above directions are reversed from the usual answer on the Internet
  // that is because we are in a left-handed coord system (because the y-axis points downward)
  cross: function(p1, p2) {
    return p1 && p2 ? (p2.x - this.x) * (p1.y - this.y) - (p2.y - this.y) * (p1.x - this.x) : NaN;
  },
  difference: function(dx, dy) {
    if (Object(dx) === dx) {
      dy = dx.y;
      dx = dx.x;
    }
    return new Point(this.x - (dx || 0), this.y - (dy || 0));
  },
  // Returns distance between me and point `p`.
  distance: function(p) {
    return length(this, p);
  },
  // Returns the dot product of this point with given other point
  dot: function(p) {
    return p ? this.x * p.x + this.y * p.y : NaN;
  },
  equals: function(p) {
    return !!p && this.x === p.x && this.y === p.y;
  },
  // Linear interpolation
  lerp: function(p, t) {
    var x = this.x;
    var y = this.y;
    return new Point((1 - t) * x + t * p.x, (1 - t) * y + t * p.y);
  },
  magnitude: function() {
    return sqrt(this.x * this.x + this.y * this.y) || 0.01;
  },
  // Returns a manhattan (taxi-cab) distance between me and point `p`.
  manhattanDistance: function(p) {
    return abs(p.x - this.x) + abs(p.y - this.y);
  },
  // Move point on line starting from ref ending at me by
  // distance distance.
  move: function(ref, distance) {
    var theta = toRad(new Point(ref).theta(this));
    var offset = this.offset(cos2(theta) * distance, -sin2(theta) * distance);
    return offset;
  },
  // Scales x and y such that the distance between the point and the origin (0,0) is equal to the given length.
  normalize: function(length2) {
    var scale2 = (length2 || 1) / this.magnitude();
    return this.scale(scale2, scale2);
  },
  // Offset me by the specified amount.
  offset: function(dx, dy) {
    if (Object(dx) === dx) {
      dy = dx.y;
      dx = dx.x;
    }
    this.x += dx || 0;
    this.y += dy || 0;
    return this;
  },
  // Returns a point that is the reflection of me with
  // the center of inversion in ref point.
  reflection: function(ref) {
    return new Point(ref).move(this, this.distance(ref));
  },
  // Rotate point by angle around origin.
  // Angle is flipped because this is a left-handed coord system (y-axis points downward).
  rotate: function(origin, angle) {
    if (angle === 0) return this;
    origin = origin || new Point(0, 0);
    angle = toRad(normalizeAngle(-angle));
    var cosAngle = cos2(angle);
    var sinAngle = sin2(angle);
    var x = cosAngle * (this.x - origin.x) - sinAngle * (this.y - origin.y) + origin.x;
    var y = sinAngle * (this.x - origin.x) + cosAngle * (this.y - origin.y) + origin.y;
    this.x = x;
    this.y = y;
    return this;
  },
  round: function(precision) {
    let f = 1;
    if (precision) {
      switch (precision) {
        case 1:
          f = 10;
          break;
        case 2:
          f = 100;
          break;
        case 3:
          f = 1e3;
          break;
        default:
          f = pow(10, precision);
          break;
      }
    }
    this.x = round2(this.x * f) / f;
    this.y = round2(this.y * f) / f;
    return this;
  },
  // Scale point with origin.
  scale: function(sx, sy, origin) {
    origin = origin && new Point(origin) || new Point(0, 0);
    this.x = origin.x + sx * (this.x - origin.x);
    this.y = origin.y + sy * (this.y - origin.y);
    return this;
  },
  snapToGrid: function(gx, gy) {
    this.x = snapToGrid(this.x, gx);
    this.y = snapToGrid(this.y, gy || gx);
    return this;
  },
  squaredDistance: function(p) {
    return squaredLength(this, p);
  },
  // Compute the angle between me and `p` and the x axis.
  // (cartesian-to-polar coordinates conversion)
  // Return theta angle in degrees.
  theta: function(p) {
    p = new Point(p);
    var y = -(p.y - this.y);
    var x = p.x - this.x;
    var rad = atan22(y, x);
    if (rad < 0) {
      rad = 2 * PI2 + rad;
    }
    return 180 * rad / PI2;
  },
  toJSON: function() {
    return {
      x: this.x,
      y: this.y
    };
  },
  // Converts rectangular to polar coordinates.
  // An origin can be specified, otherwise it's 0@0.
  toPolar: function(o) {
    o = o && new Point(o) || new Point(0, 0);
    var x = this.x;
    var y = this.y;
    this.x = sqrt((x - o.x) * (x - o.x) + (y - o.y) * (y - o.y));
    this.y = toRad(o.theta(new Point(x, y)));
    return this;
  },
  toString: function() {
    return this.x + "@" + this.y;
  },
  serialize: function() {
    return this.x + "," + this.y;
  },
  update: function(x, y) {
    if (Object(x) === x) {
      y = x.y;
      x = x.x;
    }
    this.x = x || 0;
    this.y = y || 0;
    return this;
  },
  // Compute the angle between the vector from 0,0 to me and the vector from 0,0 to p.
  // Returns NaN if p is at 0,0.
  vectorAngle: function(p) {
    var zero = new Point(0, 0);
    return zero.angleBetween(this, p);
  }
};
Point.prototype.translate = Point.prototype.offset;
var point = Point;

// node_modules/jointjs/src/g/line.mjs
var {
  max: max2,
  min: min2
} = Math;
var Line = function(p1, p2) {
  if (!(this instanceof Line)) {
    return new Line(p1, p2);
  }
  if (p1 instanceof Line) {
    return new Line(p1.start, p1.end);
  }
  this.start = new Point(p1);
  this.end = new Point(p2);
};
Line.prototype = {
  type: types.Line,
  // @returns the angle of incline of the line.
  angle: function() {
    var horizontalPoint = new Point(this.start.x + 1, this.start.y);
    return this.start.angleBetween(this.end, horizontalPoint);
  },
  bbox: function() {
    var left4 = min2(this.start.x, this.end.x);
    var top4 = min2(this.start.y, this.end.y);
    var right4 = max2(this.start.x, this.end.x);
    var bottom4 = max2(this.start.y, this.end.y);
    return new Rect(left4, top4, right4 - left4, bottom4 - top4);
  },
  // @return the bearing (cardinal direction) of the line. For example N, W, or SE.
  // @returns {String} One of the following bearings : NE, E, SE, S, SW, W, NW, N.
  bearing: function() {
    return bearing(this.start, this.end);
  },
  clone: function() {
    return new Line(this.start, this.end);
  },
  // @return {point} the closest point on the line to point `p`
  closestPoint: function(p) {
    return this.pointAt(this.closestPointNormalizedLength(p));
  },
  closestPointLength: function(p) {
    return this.closestPointNormalizedLength(p) * this.length();
  },
  // @return {number} the normalized length of the closest point on the line to point `p`
  closestPointNormalizedLength: function(p) {
    var product = this.vector().dot(new Line(this.start, p).vector());
    var cpNormalizedLength = min2(1, max2(0, product / this.squaredLength()));
    if (cpNormalizedLength !== cpNormalizedLength) return 0;
    return cpNormalizedLength;
  },
  closestPointTangent: function(p) {
    return this.tangentAt(this.closestPointNormalizedLength(p));
  },
  // Returns `true` if the point lies on the line.
  containsPoint: function(p) {
    var start = this.start;
    var end = this.end;
    if (start.cross(p, end) !== 0) return false;
    var length2 = this.length();
    if (new Line(start, p).length() > length2) return false;
    if (new Line(p, end).length() > length2) return false;
    return true;
  },
  // Divides the line into two at requested `ratio` between 0 and 1.
  divideAt: function(ratio) {
    var dividerPoint = this.pointAt(ratio);
    return [new Line(this.start, dividerPoint), new Line(dividerPoint, this.end)];
  },
  // Divides the line into two at requested `length`.
  divideAtLength: function(length2) {
    var dividerPoint = this.pointAtLength(length2);
    return [new Line(this.start, dividerPoint), new Line(dividerPoint, this.end)];
  },
  equals: function(l) {
    return !!l && this.start.x === l.start.x && this.start.y === l.start.y && this.end.x === l.end.x && this.end.y === l.end.y;
  },
  // @return {point} Point where I'm intersecting a line.
  // @return [point] Points where I'm intersecting a rectangle.
  // @see Squeak Smalltalk, LineSegment>>intersectionWith:
  intersect: function(shape, opt) {
    if (shape && shape.intersectionWithLine) {
      var intersection3 = shape.intersectionWithLine(this, opt);
      if (intersection3 && shape instanceof Line) {
        intersection3 = intersection3[0];
      }
      return intersection3;
    }
    return null;
  },
  intersectionWithLine: function(line3) {
    var pt1Dir = new Point(this.end.x - this.start.x, this.end.y - this.start.y);
    var pt2Dir = new Point(line3.end.x - line3.start.x, line3.end.y - line3.start.y);
    var det = pt1Dir.x * pt2Dir.y - pt1Dir.y * pt2Dir.x;
    var deltaPt = new Point(line3.start.x - this.start.x, line3.start.y - this.start.y);
    var alpha = deltaPt.x * pt2Dir.y - deltaPt.y * pt2Dir.x;
    var beta = deltaPt.x * pt1Dir.y - deltaPt.y * pt1Dir.x;
    if (det === 0 || alpha * det < 0 || beta * det < 0) {
      return null;
    }
    if (det > 0) {
      if (alpha > det || beta > det) {
        return null;
      }
    } else {
      if (alpha < det || beta < det) {
        return null;
      }
    }
    return [new Point(this.start.x + alpha * pt1Dir.x / det, this.start.y + alpha * pt1Dir.y / det)];
  },
  isDifferentiable: function() {
    return !this.start.equals(this.end);
  },
  // @return {double} length of the line
  length: function() {
    return length(this.start, this.end);
  },
  // @return {point} my midpoint
  midpoint: function() {
    return new Point((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
  },
  parallel: function(distance) {
    const l = this.clone();
    if (!this.isDifferentiable()) return l;
    const {
      start,
      end
    } = l;
    const eRef = start.clone().rotate(end, 270);
    const sRef = end.clone().rotate(start, 90);
    start.move(sRef, distance);
    end.move(eRef, distance);
    return l;
  },
  // @return {point} my point at 't' <0,1>
  pointAt: function(t) {
    var start = this.start;
    var end = this.end;
    if (t <= 0) return start.clone();
    if (t >= 1) return end.clone();
    return start.lerp(end, t);
  },
  pointAtLength: function(length2) {
    var start = this.start;
    var end = this.end;
    var fromStart = true;
    if (length2 < 0) {
      fromStart = false;
      length2 = -length2;
    }
    var lineLength = this.length();
    if (length2 >= lineLength) return fromStart ? end.clone() : start.clone();
    return this.pointAt((fromStart ? length2 : lineLength - length2) / lineLength);
  },
  // @return {number} the offset of the point `p` from the line. + if the point `p` is on the right side of the line, - if on the left and 0 if on the line.
  pointOffset: function(p) {
    p = new Point(p);
    var start = this.start;
    var end = this.end;
    var determinant2 = (end.x - start.x) * (p.y - start.y) - (end.y - start.y) * (p.x - start.x);
    return determinant2 / this.length();
  },
  rotate: function(origin, angle) {
    this.start.rotate(origin, angle);
    this.end.rotate(origin, angle);
    return this;
  },
  round: function(precision) {
    this.start.round(precision);
    this.end.round(precision);
    return this;
  },
  scale: function(sx, sy, origin) {
    this.start.scale(sx, sy, origin);
    this.end.scale(sx, sy, origin);
    return this;
  },
  // @return {number} scale the line so that it has the requested length
  setLength: function(length2) {
    var currentLength = this.length();
    if (!currentLength) return this;
    var scaleFactor = length2 / currentLength;
    return this.scale(scaleFactor, scaleFactor, this.start);
  },
  // @return {integer} length without sqrt
  // @note for applications where the exact length is not necessary (e.g. compare only)
  squaredLength: function() {
    return squaredLength(this.start, this.end);
  },
  tangentAt: function(t) {
    if (!this.isDifferentiable()) return null;
    var start = this.start;
    var end = this.end;
    var tangentStart = this.pointAt(t);
    var tangentLine = new Line(start, end);
    tangentLine.translate(tangentStart.x - start.x, tangentStart.y - start.y);
    return tangentLine;
  },
  tangentAtLength: function(length2) {
    if (!this.isDifferentiable()) return null;
    var start = this.start;
    var end = this.end;
    var tangentStart = this.pointAtLength(length2);
    var tangentLine = new Line(start, end);
    tangentLine.translate(tangentStart.x - start.x, tangentStart.y - start.y);
    return tangentLine;
  },
  toString: function() {
    return this.start.toString() + " " + this.end.toString();
  },
  serialize: function() {
    return this.start.serialize() + " " + this.end.serialize();
  },
  translate: function(tx, ty) {
    this.start.translate(tx, ty);
    this.end.translate(tx, ty);
    return this;
  },
  // @return vector {point} of the line
  vector: function() {
    return new Point(this.end.x - this.start.x, this.end.y - this.start.y);
  }
};
Line.prototype.intersection = Line.prototype.intersect;
var line = Line;

// node_modules/jointjs/src/g/ellipse.mjs
var {
  sqrt: sqrt2,
  round: round3,
  pow: pow2
} = Math;
var Ellipse = function(c, a, b) {
  if (!(this instanceof Ellipse)) {
    return new Ellipse(c, a, b);
  }
  if (c instanceof Ellipse) {
    return new Ellipse(new Point(c.x, c.y), c.a, c.b);
  }
  c = new Point(c);
  this.x = c.x;
  this.y = c.y;
  this.a = a;
  this.b = b;
};
Ellipse.fromRect = function(rect2) {
  rect2 = new Rect(rect2);
  return new Ellipse(rect2.center(), rect2.width / 2, rect2.height / 2);
};
Ellipse.prototype = {
  type: types.Ellipse,
  bbox: function() {
    return new Rect(this.x - this.a, this.y - this.b, 2 * this.a, 2 * this.b);
  },
  /**
   * @returns {g.Point}
   */
  center: function() {
    return new Point(this.x, this.y);
  },
  clone: function() {
    return new Ellipse(this);
  },
  /**
   * @param {g.Point} p
   * @returns {boolean}
   */
  containsPoint: function(p) {
    return this.normalizedDistance(p) <= 1;
  },
  equals: function(ellipse3) {
    return !!ellipse3 && ellipse3.x === this.x && ellipse3.y === this.y && ellipse3.a === this.a && ellipse3.b === this.b;
  },
  // inflate by dx and dy
  // @param dx {delta_x} representing additional size to x
  // @param dy {delta_y} representing additional size to y -
  // dy param is not required -> in that case y is sized by dx
  inflate: function(dx, dy) {
    if (dx === void 0) {
      dx = 0;
    }
    if (dy === void 0) {
      dy = dx;
    }
    this.a += 2 * dx;
    this.b += 2 * dy;
    return this;
  },
  intersectionWithLine: function(line3) {
    var intersections = [];
    var a1 = line3.start;
    var a2 = line3.end;
    var rx = this.a;
    var ry = this.b;
    var dir = line3.vector();
    var diff2 = a1.difference(new Point(this));
    var mDir = new Point(dir.x / (rx * rx), dir.y / (ry * ry));
    var mDiff = new Point(diff2.x / (rx * rx), diff2.y / (ry * ry));
    var a = dir.dot(mDir);
    var b = dir.dot(mDiff);
    var c = diff2.dot(mDiff) - 1;
    var d = b * b - a * c;
    if (d < 0) {
      return null;
    } else if (d > 0) {
      var root = sqrt2(d);
      var ta = (-b - root) / a;
      var tb = (-b + root) / a;
      if ((ta < 0 || 1 < ta) && (tb < 0 || 1 < tb)) {
        return null;
      } else {
        if (0 <= ta && ta <= 1) intersections.push(a1.lerp(a2, ta));
        if (0 <= tb && tb <= 1) intersections.push(a1.lerp(a2, tb));
      }
    } else {
      var t = -b / a;
      if (0 <= t && t <= 1) {
        intersections.push(a1.lerp(a2, t));
      } else {
        return null;
      }
    }
    return intersections;
  },
  // Find point on me where line from my center to
  // point p intersects my boundary.
  // @param {number} angle If angle is specified, intersection with rotated ellipse is computed.
  intersectionWithLineFromCenterToPoint: function(p, angle) {
    p = new Point(p);
    if (angle) p.rotate(new Point(this.x, this.y), angle);
    var dx = p.x - this.x;
    var dy = p.y - this.y;
    var result2;
    if (dx === 0) {
      result2 = this.bbox().pointNearestToPoint(p);
      if (angle) return result2.rotate(new Point(this.x, this.y), -angle);
      return result2;
    }
    var m = dy / dx;
    var mSquared = m * m;
    var aSquared = this.a * this.a;
    var bSquared = this.b * this.b;
    var x = sqrt2(1 / (1 / aSquared + mSquared / bSquared));
    x = dx < 0 ? -x : x;
    var y = m * x;
    result2 = new Point(this.x + x, this.y + y);
    if (angle) return result2.rotate(new Point(this.x, this.y), -angle);
    return result2;
  },
  /**
   * @param {g.Point} point
   * @returns {number} result < 1 - inside ellipse, result == 1 - on ellipse boundary, result > 1 - outside
   */
  normalizedDistance: function(point2) {
    var x0 = point2.x;
    var y0 = point2.y;
    var a = this.a;
    var b = this.b;
    var x = this.x;
    var y = this.y;
    return (x0 - x) * (x0 - x) / (a * a) + (y0 - y) * (y0 - y) / (b * b);
  },
  round: function(precision) {
    let f = 1;
    if (precision) {
      switch (precision) {
        case 1:
          f = 10;
          break;
        case 2:
          f = 100;
          break;
        case 3:
          f = 1e3;
          break;
        default:
          f = pow2(10, precision);
          break;
      }
    }
    this.x = round3(this.x * f) / f;
    this.y = round3(this.y * f) / f;
    this.a = round3(this.a * f) / f;
    this.b = round3(this.b * f) / f;
    return this;
  },
  /** Compute angle between tangent and x axis
   * @param {g.Point} p Point of tangency, it has to be on ellipse boundaries.
   * @returns {number} angle between tangent and x axis
   */
  tangentTheta: function(p) {
    var refPointDelta = 30;
    var x0 = p.x;
    var y0 = p.y;
    var a = this.a;
    var b = this.b;
    var center2 = this.bbox().center();
    var m = center2.x;
    var n = center2.y;
    var q1 = x0 > center2.x + a / 2;
    var q3 = x0 < center2.x - a / 2;
    var y, x;
    if (q1 || q3) {
      y = x0 > center2.x ? y0 - refPointDelta : y0 + refPointDelta;
      x = a * a / (x0 - m) - a * a * (y0 - n) * (y - n) / (b * b * (x0 - m)) + m;
    } else {
      x = y0 > center2.y ? x0 + refPointDelta : x0 - refPointDelta;
      y = b * b / (y0 - n) - b * b * (x0 - m) * (x - m) / (a * a * (y0 - n)) + n;
    }
    return new Point(x, y).theta(p);
  },
  toString: function() {
    return new Point(this.x, this.y).toString() + " " + this.a + " " + this.b;
  }
};
var ellipse = Ellipse;

// node_modules/jointjs/src/g/rect.mjs
var {
  abs: abs2,
  cos: cos3,
  sin: sin3,
  min: min3,
  max: max3,
  round: round4,
  pow: pow3
} = Math;
var Rect = function(x, y, w, h) {
  if (!(this instanceof Rect)) {
    return new Rect(x, y, w, h);
  }
  if (Object(x) === x) {
    y = x.y;
    w = x.width;
    h = x.height;
    x = x.x;
  }
  this.x = x === void 0 ? 0 : x;
  this.y = y === void 0 ? 0 : y;
  this.width = w === void 0 ? 0 : w;
  this.height = h === void 0 ? 0 : h;
};
Rect.fromEllipse = function(e) {
  e = new Ellipse(e);
  return new Rect(e.x - e.a, e.y - e.b, 2 * e.a, 2 * e.b);
};
Rect.fromPointUnion = function(...points) {
  if (points.length === 0) return null;
  const p = new Point();
  let minX, minY, maxX, maxY;
  minX = minY = Infinity;
  maxX = maxY = -Infinity;
  for (let i = 0; i < points.length; i++) {
    p.update(points[i]);
    const x = p.x;
    const y = p.y;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return new Rect(minX, minY, maxX - minX, maxY - minY);
};
Rect.fromRectUnion = function(...rects) {
  if (rects.length === 0) return null;
  const r = new Rect();
  let minX, minY, maxX, maxY;
  minX = minY = Infinity;
  maxX = maxY = -Infinity;
  for (let i = 0; i < rects.length; i++) {
    r.update(rects[i]);
    const x = r.x;
    const y = r.y;
    const mX = x + r.width;
    const mY = y + r.height;
    if (x < minX) minX = x;
    if (mX > maxX) maxX = mX;
    if (y < minY) minY = y;
    if (mY > maxY) maxY = mY;
  }
  return new Rect(minX, minY, maxX - minX, maxY - minY);
};
Rect.prototype = {
  type: types.Rect,
  // Find my bounding box when I'm rotated with the center of rotation in the center of me.
  // @return r {rectangle} representing a bounding box
  bbox: function(angle) {
    return this.clone().rotateAroundCenter(angle);
  },
  rotateAroundCenter: function(angle) {
    if (!angle) return this;
    const {
      width,
      height
    } = this;
    const theta = toRad(angle);
    const st = abs2(sin3(theta));
    const ct = abs2(cos3(theta));
    const w = width * ct + height * st;
    const h = width * st + height * ct;
    this.x += (width - w) / 2;
    this.y += (height - h) / 2;
    this.width = w;
    this.height = h;
    return this;
  },
  bottomLeft: function() {
    return new Point(this.x, this.y + this.height);
  },
  bottomLine: function() {
    return new Line(this.bottomLeft(), this.bottomRight());
  },
  bottomMiddle: function() {
    return new Point(this.x + this.width / 2, this.y + this.height);
  },
  center: function() {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
  },
  clone: function() {
    return new Rect(this);
  },
  // @return {bool} true if point p is inside me.
  containsPoint: function(p) {
    if (!(p instanceof Point)) {
      p = new Point(p);
    }
    return p.x >= this.x && p.x <= this.x + this.width && p.y >= this.y && p.y <= this.y + this.height;
  },
  // @return {bool} true if rectangle `r` is inside me.
  containsRect: function(r) {
    var r0 = new Rect(this).normalize();
    var r1 = new Rect(r).normalize();
    var w0 = r0.width;
    var h0 = r0.height;
    var w1 = r1.width;
    var h1 = r1.height;
    if (!w0 || !h0 || !w1 || !h1) {
      return false;
    }
    var x0 = r0.x;
    var y0 = r0.y;
    var x1 = r1.x;
    var y1 = r1.y;
    w1 += x1;
    w0 += x0;
    h1 += y1;
    h0 += y0;
    return x0 <= x1 && w1 <= w0 && y0 <= y1 && h1 <= h0;
  },
  corner: function() {
    return new Point(this.x + this.width, this.y + this.height);
  },
  // @return {boolean} true if rectangles are equal.
  equals: function(r) {
    var mr = new Rect(this).normalize();
    var nr = new Rect(r).normalize();
    return mr.x === nr.x && mr.y === nr.y && mr.width === nr.width && mr.height === nr.height;
  },
  // inflate by dx and dy, recompute origin [x, y]
  // @param dx {delta_x} representing additional size to x
  // @param dy {delta_y} representing additional size to y -
  // dy param is not required -> in that case y is sized by dx
  inflate: function(dx, dy) {
    if (dx === void 0) {
      dx = 0;
    }
    if (dy === void 0) {
      dy = dx;
    }
    this.x -= dx;
    this.y -= dy;
    this.width += 2 * dx;
    this.height += 2 * dy;
    return this;
  },
  // @return {rect} if rectangles intersect, {null} if not.
  intersect: function(r) {
    var myOrigin = this.origin();
    var myCorner = this.corner();
    var rOrigin = r.origin();
    var rCorner = r.corner();
    if (rCorner.x <= myOrigin.x || rCorner.y <= myOrigin.y || rOrigin.x >= myCorner.x || rOrigin.y >= myCorner.y) return null;
    var x = max3(myOrigin.x, rOrigin.x);
    var y = max3(myOrigin.y, rOrigin.y);
    return new Rect(x, y, min3(myCorner.x, rCorner.x) - x, min3(myCorner.y, rCorner.y) - y);
  },
  intersectionWithLine: function(line3) {
    var r = this;
    var rectLines = [r.topLine(), r.rightLine(), r.bottomLine(), r.leftLine()];
    var points = [];
    var dedupeArr = [];
    var pt, i;
    var n = rectLines.length;
    for (i = 0; i < n; i++) {
      pt = line3.intersect(rectLines[i]);
      if (pt !== null && dedupeArr.indexOf(pt.toString()) < 0) {
        points.push(pt);
        dedupeArr.push(pt.toString());
      }
    }
    return points.length > 0 ? points : null;
  },
  // Find point on my boundary where line starting
  // from my center ending in point p intersects me.
  // @param {number} angle If angle is specified, intersection with rotated rectangle is computed.
  intersectionWithLineFromCenterToPoint: function(p, angle) {
    p = new Point(p);
    var center2 = new Point(this.x + this.width / 2, this.y + this.height / 2);
    var result2;
    if (angle) p.rotate(center2, angle);
    var sides = [this.topLine(), this.rightLine(), this.bottomLine(), this.leftLine()];
    var connector = new Line(center2, p);
    for (var i = sides.length - 1; i >= 0; --i) {
      var intersection3 = sides[i].intersection(connector);
      if (intersection3 !== null) {
        result2 = intersection3;
        break;
      }
    }
    if (result2 && angle) result2.rotate(center2, -angle);
    return result2;
  },
  leftLine: function() {
    return new Line(this.topLeft(), this.bottomLeft());
  },
  leftMiddle: function() {
    return new Point(this.x, this.y + this.height / 2);
  },
  maxRectScaleToFit: function(rect2, origin) {
    rect2 = new Rect(rect2);
    origin || (origin = rect2.center());
    var sx1, sx2, sx3, sx4, sy1, sy2, sy3, sy4;
    var ox = origin.x;
    var oy = origin.y;
    sx1 = sx2 = sx3 = sx4 = sy1 = sy2 = sy3 = sy4 = Infinity;
    var p1 = rect2.topLeft();
    if (p1.x < ox) {
      sx1 = (this.x - ox) / (p1.x - ox);
    }
    if (p1.y < oy) {
      sy1 = (this.y - oy) / (p1.y - oy);
    }
    var p2 = rect2.bottomRight();
    if (p2.x > ox) {
      sx2 = (this.x + this.width - ox) / (p2.x - ox);
    }
    if (p2.y > oy) {
      sy2 = (this.y + this.height - oy) / (p2.y - oy);
    }
    var p3 = rect2.topRight();
    if (p3.x > ox) {
      sx3 = (this.x + this.width - ox) / (p3.x - ox);
    }
    if (p3.y < oy) {
      sy3 = (this.y - oy) / (p3.y - oy);
    }
    var p4 = rect2.bottomLeft();
    if (p4.x < ox) {
      sx4 = (this.x - ox) / (p4.x - ox);
    }
    if (p4.y > oy) {
      sy4 = (this.y + this.height - oy) / (p4.y - oy);
    }
    return {
      sx: min3(sx1, sx2, sx3, sx4),
      sy: min3(sy1, sy2, sy3, sy4)
    };
  },
  maxRectUniformScaleToFit: function(rect2, origin) {
    var scale2 = this.maxRectScaleToFit(rect2, origin);
    return min3(scale2.sx, scale2.sy);
  },
  // Move and expand me.
  // @param r {rectangle} representing deltas
  moveAndExpand: function(r) {
    this.x += r.x || 0;
    this.y += r.y || 0;
    this.width += r.width || 0;
    this.height += r.height || 0;
    return this;
  },
  // Normalize the rectangle; i.e., make it so that it has a non-negative width and height.
  // If width < 0 the function swaps the left and right corners,
  // and it swaps the top and bottom corners if height < 0
  // like in http://qt-project.org/doc/qt-4.8/qrectf.html#normalized
  normalize: function() {
    var newx = this.x;
    var newy = this.y;
    var newwidth = this.width;
    var newheight = this.height;
    if (this.width < 0) {
      newx = this.x + this.width;
      newwidth = -this.width;
    }
    if (this.height < 0) {
      newy = this.y + this.height;
      newheight = -this.height;
    }
    this.x = newx;
    this.y = newy;
    this.width = newwidth;
    this.height = newheight;
    return this;
  },
  // Offset me by the specified amount.
  offset: function(dx, dy) {
    return Point.prototype.offset.call(this, dx, dy);
  },
  origin: function() {
    return new Point(this.x, this.y);
  },
  // @return {point} a point on my boundary nearest to the given point.
  // @see Squeak Smalltalk, Rectangle>>pointNearestTo:
  pointNearestToPoint: function(point2) {
    point2 = new Point(point2);
    if (this.containsPoint(point2)) {
      var side = this.sideNearestToPoint(point2);
      switch (side) {
        case "right":
          return new Point(this.x + this.width, point2.y);
        case "left":
          return new Point(this.x, point2.y);
        case "bottom":
          return new Point(point2.x, this.y + this.height);
        case "top":
          return new Point(point2.x, this.y);
      }
    }
    return point2.adhereToRect(this);
  },
  rightLine: function() {
    return new Line(this.topRight(), this.bottomRight());
  },
  rightMiddle: function() {
    return new Point(this.x + this.width, this.y + this.height / 2);
  },
  round: function(precision) {
    let f = 1;
    if (precision) {
      switch (precision) {
        case 1:
          f = 10;
          break;
        case 2:
          f = 100;
          break;
        case 3:
          f = 1e3;
          break;
        default:
          f = pow3(10, precision);
          break;
      }
    }
    this.x = round4(this.x * f) / f;
    this.y = round4(this.y * f) / f;
    this.width = round4(this.width * f) / f;
    this.height = round4(this.height * f) / f;
    return this;
  },
  // Scale rectangle with origin.
  scale: function(sx, sy, origin) {
    origin = this.origin().scale(sx, sy, origin);
    this.x = origin.x;
    this.y = origin.y;
    this.width *= sx;
    this.height *= sy;
    return this;
  },
  // @return {string} (left|right|top|bottom) side which is nearest to point
  // @see Squeak Smalltalk, Rectangle>>sideNearestTo:
  sideNearestToPoint: function(point2) {
    point2 = new Point(point2);
    var distToLeft = point2.x - this.x;
    var distToRight = this.x + this.width - point2.x;
    var distToTop = point2.y - this.y;
    var distToBottom = this.y + this.height - point2.y;
    var closest = distToLeft;
    var side = "left";
    if (distToRight < closest) {
      closest = distToRight;
      side = "right";
    }
    if (distToTop < closest) {
      closest = distToTop;
      side = "top";
    }
    if (distToBottom < closest) {
      side = "bottom";
    }
    return side;
  },
  snapToGrid: function(gx, gy) {
    var origin = this.origin().snapToGrid(gx, gy);
    var corner = this.corner().snapToGrid(gx, gy);
    this.x = origin.x;
    this.y = origin.y;
    this.width = corner.x - origin.x;
    this.height = corner.y - origin.y;
    return this;
  },
  toJSON: function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  },
  topLine: function() {
    return new Line(this.topLeft(), this.topRight());
  },
  topMiddle: function() {
    return new Point(this.x + this.width / 2, this.y);
  },
  topRight: function() {
    return new Point(this.x + this.width, this.y);
  },
  toString: function() {
    return this.origin().toString() + " " + this.corner().toString();
  },
  // @return {rect} representing the union of both rectangles.
  union: function(rect2) {
    return Rect.fromRectUnion(this, rect2);
  },
  update: function(x, y, w, h) {
    if (Object(x) === x) {
      y = x.y;
      w = x.width;
      h = x.height;
      x = x.x;
    }
    this.x = x || 0;
    this.y = y || 0;
    this.width = w || 0;
    this.height = h || 0;
    return this;
  }
};
Rect.prototype.bottomRight = Rect.prototype.corner;
Rect.prototype.topLeft = Rect.prototype.origin;
Rect.prototype.translate = Rect.prototype.offset;
var rect = Rect;

// node_modules/jointjs/src/g/points.mjs
function parsePoints(svgString) {
  const trimmedString = svgString.trim();
  if (trimmedString === "") return [];
  const points = [];
  const coords = trimmedString.split(/\b\s*,\s*|,\s*|\s+/);
  const numCoords = coords.length;
  for (let i = 0; i < numCoords; i += 2) {
    points.push({
      x: +coords[i],
      y: +coords[i + 1]
    });
  }
  return points;
}
function clonePoints(points) {
  const numPoints = points.length;
  if (numPoints === 0) return [];
  const newPoints = [];
  for (let i = 0; i < numPoints; i++) {
    const point2 = points[i].clone();
    newPoints.push(point2);
  }
  return newPoints;
}
function convexHull(points) {
  const {
    abs: abs4
  } = Math;
  var i;
  var n;
  var numPoints = points.length;
  if (numPoints === 0) return [];
  var startPoint;
  for (i = 0; i < numPoints; i++) {
    if (startPoint === void 0) {
      startPoint = points[i];
    } else if (points[i].y < startPoint.y) {
      startPoint = points[i];
    } else if (points[i].y === startPoint.y && points[i].x > startPoint.x) {
      startPoint = points[i];
    }
  }
  var sortedPointRecords = [];
  for (i = 0; i < numPoints; i++) {
    var angle = startPoint.theta(points[i]);
    if (angle === 0) {
      angle = 360;
    }
    var entry = [points[i], i, angle];
    sortedPointRecords.push(entry);
  }
  sortedPointRecords.sort(function(record1, record2) {
    var sortOutput = record1[2] - record2[2];
    if (sortOutput === 0) {
      sortOutput = record2[1] - record1[1];
    }
    return sortOutput;
  });
  if (sortedPointRecords.length > 2) {
    var startPointRecord = sortedPointRecords[sortedPointRecords.length - 1];
    sortedPointRecords.unshift(startPointRecord);
  }
  var insidePoints = {};
  var hullPointRecords = [];
  var currentPointRecord;
  var currentPoint;
  var lastHullPointRecord;
  var lastHullPoint;
  var secondLastHullPointRecord;
  var secondLastHullPoint;
  while (sortedPointRecords.length !== 0) {
    currentPointRecord = sortedPointRecords.pop();
    currentPoint = currentPointRecord[0];
    if (insidePoints.hasOwnProperty(currentPointRecord[0] + "@@" + currentPointRecord[1])) {
      continue;
    }
    var correctTurnFound = false;
    while (!correctTurnFound) {
      if (hullPointRecords.length < 2) {
        hullPointRecords.push(currentPointRecord);
        correctTurnFound = true;
      } else {
        lastHullPointRecord = hullPointRecords.pop();
        lastHullPoint = lastHullPointRecord[0];
        secondLastHullPointRecord = hullPointRecords.pop();
        secondLastHullPoint = secondLastHullPointRecord[0];
        var crossProduct = secondLastHullPoint.cross(lastHullPoint, currentPoint);
        if (crossProduct < 0) {
          hullPointRecords.push(secondLastHullPointRecord);
          hullPointRecords.push(lastHullPointRecord);
          hullPointRecords.push(currentPointRecord);
          correctTurnFound = true;
        } else if (crossProduct === 0) {
          var THRESHOLD = 1e-10;
          var angleBetween = lastHullPoint.angleBetween(secondLastHullPoint, currentPoint);
          if (abs4(angleBetween - 180) < THRESHOLD) {
            insidePoints[lastHullPointRecord[0] + "@@" + lastHullPointRecord[1]] = lastHullPoint;
            hullPointRecords.push(secondLastHullPointRecord);
          } else if (lastHullPoint.equals(currentPoint) || secondLastHullPoint.equals(lastHullPoint)) {
            insidePoints[lastHullPointRecord[0] + "@@" + lastHullPointRecord[1]] = lastHullPoint;
            hullPointRecords.push(secondLastHullPointRecord);
          } else if (abs4((angleBetween + 1) % 360 - 1) < THRESHOLD) {
            hullPointRecords.push(secondLastHullPointRecord);
            sortedPointRecords.push(lastHullPointRecord);
          }
        } else {
          insidePoints[lastHullPointRecord[0] + "@@" + lastHullPointRecord[1]] = lastHullPoint;
          hullPointRecords.push(secondLastHullPointRecord);
        }
      }
    }
  }
  if (hullPointRecords.length > 2) {
    hullPointRecords.pop();
  }
  var lowestHullIndex;
  var indexOfLowestHullIndexRecord = -1;
  n = hullPointRecords.length;
  for (i = 0; i < n; i++) {
    var currentHullIndex = hullPointRecords[i][1];
    if (lowestHullIndex === void 0 || currentHullIndex < lowestHullIndex) {
      lowestHullIndex = currentHullIndex;
      indexOfLowestHullIndexRecord = i;
    }
  }
  var hullPointRecordsReordered = [];
  if (indexOfLowestHullIndexRecord > 0) {
    var newFirstChunk = hullPointRecords.slice(indexOfLowestHullIndexRecord);
    var newSecondChunk = hullPointRecords.slice(0, indexOfLowestHullIndexRecord);
    hullPointRecordsReordered = newFirstChunk.concat(newSecondChunk);
  } else {
    hullPointRecordsReordered = hullPointRecords;
  }
  var hullPoints = [];
  n = hullPointRecordsReordered.length;
  for (i = 0; i < n; i++) {
    hullPoints.push(hullPointRecordsReordered[i][0]);
  }
  return hullPoints;
}

// node_modules/jointjs/src/g/polyline.mjs
var Polyline = function(points) {
  if (!(this instanceof Polyline)) {
    return new Polyline(points);
  }
  if (typeof points === "string") {
    return new Polyline.parse(points);
  }
  this.points = Array.isArray(points) ? points.map(Point) : [];
};
Polyline.parse = function(svgString) {
  return new Polyline(parsePoints(svgString));
};
Polyline.fromRect = function(rect2) {
  return new Polyline([rect2.topLeft(), rect2.topRight(), rect2.bottomRight(), rect2.bottomLeft(), rect2.topLeft()]);
};
Polyline.prototype = {
  type: types.Polyline,
  bbox: function() {
    var x1 = Infinity;
    var x2 = -Infinity;
    var y1 = Infinity;
    var y2 = -Infinity;
    var points = this.points;
    var numPoints = points.length;
    if (numPoints === 0) return null;
    for (var i = 0; i < numPoints; i++) {
      var point2 = points[i];
      var x = point2.x;
      var y = point2.y;
      if (x < x1) x1 = x;
      if (x > x2) x2 = x;
      if (y < y1) y1 = y;
      if (y > y2) y2 = y;
    }
    return new Rect(x1, y1, x2 - x1, y2 - y1);
  },
  clone: function() {
    return new Polyline(clonePoints(this.points));
  },
  closestPoint: function(p) {
    var cpLength = this.closestPointLength(p);
    return this.pointAtLength(cpLength);
  },
  closestPointLength: function(p) {
    var points = this.lengthPoints();
    var numPoints = points.length;
    if (numPoints === 0) return 0;
    if (numPoints === 1) return 0;
    var cpLength;
    var minSqrDistance = Infinity;
    var length2 = 0;
    var n = numPoints - 1;
    for (var i = 0; i < n; i++) {
      var line3 = new Line(points[i], points[i + 1]);
      var lineLength = line3.length();
      var cpNormalizedLength = line3.closestPointNormalizedLength(p);
      var cp = line3.pointAt(cpNormalizedLength);
      var sqrDistance = cp.squaredDistance(p);
      if (sqrDistance < minSqrDistance) {
        minSqrDistance = sqrDistance;
        cpLength = length2 + cpNormalizedLength * lineLength;
      }
      length2 += lineLength;
    }
    return cpLength;
  },
  closestPointNormalizedLength: function(p) {
    var cpLength = this.closestPointLength(p);
    if (cpLength === 0) return 0;
    var length2 = this.length();
    if (length2 === 0) return 0;
    return cpLength / length2;
  },
  closestPointTangent: function(p) {
    var cpLength = this.closestPointLength(p);
    return this.tangentAtLength(cpLength);
  },
  // Returns `true` if the area surrounded by the polyline contains the point `p`.
  // Implements the even-odd SVG algorithm (self-intersections are "outside").
  // (Uses horizontal rays to the right of `p` to look for intersections.)
  // Closes open polylines (always imagines a final closing segment).
  containsPoint: function(p) {
    var points = this.points;
    var numPoints = points.length;
    if (numPoints === 0) return false;
    var x = p.x;
    var y = p.y;
    var startIndex = numPoints - 1;
    var endIndex = 0;
    var numIntersections = 0;
    var segment = new Line();
    var ray = new Line();
    var rayEnd = new Point();
    for (; endIndex < numPoints; endIndex++) {
      var start = points[startIndex];
      var end = points[endIndex];
      if (p.equals(start)) return true;
      segment.start = start;
      segment.end = end;
      if (segment.containsPoint(p)) return true;
      if (y <= start.y && y > end.y || y > start.y && y <= end.y) {
        var xDifference = start.x - x > end.x - x ? start.x - x : end.x - x;
        if (xDifference >= 0) {
          rayEnd.x = x + xDifference;
          rayEnd.y = y;
          ray.start = p;
          ray.end = rayEnd;
          if (segment.intersect(ray)) {
            numIntersections++;
          }
        }
      }
      startIndex = endIndex;
    }
    return numIntersections % 2 === 1;
  },
  close: function() {
    const {
      start,
      end,
      points
    } = this;
    if (start && end && !start.equals(end)) {
      points.push(start.clone());
    }
    return this;
  },
  lengthPoints: function() {
    return this.points;
  },
  convexHull: function() {
    return new Polyline(convexHull(this.points));
  },
  // Checks whether two polylines are exactly the same.
  // If `p` is undefined or null, returns false.
  equals: function(p) {
    if (!p) return false;
    var points = this.points;
    var otherPoints = p.points;
    var numPoints = points.length;
    if (otherPoints.length !== numPoints) return false;
    for (var i = 0; i < numPoints; i++) {
      var point2 = points[i];
      var otherPoint = p.points[i];
      if (!point2.equals(otherPoint)) return false;
    }
    return true;
  },
  intersectionWithLine: function(l) {
    var line3 = new Line(l);
    var intersections = [];
    var points = this.lengthPoints();
    var l2 = new Line();
    for (var i = 0, n = points.length - 1; i < n; i++) {
      l2.start = points[i];
      l2.end = points[i + 1];
      var int = line3.intersectionWithLine(l2);
      if (int) intersections.push(int[0]);
    }
    return intersections.length > 0 ? intersections : null;
  },
  isDifferentiable: function() {
    var points = this.points;
    var numPoints = points.length;
    if (numPoints === 0) return false;
    var line3 = new Line();
    var n = numPoints - 1;
    for (var i = 0; i < n; i++) {
      line3.start = points[i];
      line3.end = points[i + 1];
      if (line3.isDifferentiable()) return true;
    }
    return false;
  },
  length: function() {
    var points = this.lengthPoints();
    var numPoints = points.length;
    if (numPoints === 0) return 0;
    var length2 = 0;
    var n = numPoints - 1;
    for (var i = 0; i < n; i++) {
      length2 += points[i].distance(points[i + 1]);
    }
    return length2;
  },
  pointAt: function(ratio) {
    var points = this.lengthPoints();
    var numPoints = points.length;
    if (numPoints === 0) return null;
    if (numPoints === 1) return points[0].clone();
    if (ratio <= 0) return points[0].clone();
    if (ratio >= 1) return points[numPoints - 1].clone();
    var polylineLength = this.length();
    var length2 = polylineLength * ratio;
    return this.pointAtLength(length2);
  },
  pointAtLength: function(length2) {
    var points = this.lengthPoints();
    var numPoints = points.length;
    if (numPoints === 0) return null;
    if (numPoints === 1) return points[0].clone();
    var fromStart = true;
    if (length2 < 0) {
      fromStart = false;
      length2 = -length2;
    }
    var l = 0;
    var n = numPoints - 1;
    for (var i = 0; i < n; i++) {
      var index = fromStart ? i : n - 1 - i;
      var a = points[index];
      var b = points[index + 1];
      var line3 = new Line(a, b);
      var d = a.distance(b);
      if (length2 <= l + d) {
        return line3.pointAtLength((fromStart ? 1 : -1) * (length2 - l));
      }
      l += d;
    }
    var lastPoint = fromStart ? points[numPoints - 1] : points[0];
    return lastPoint.clone();
  },
  round: function(precision) {
    var points = this.points;
    var numPoints = points.length;
    for (var i = 0; i < numPoints; i++) {
      points[i].round(precision);
    }
    return this;
  },
  scale: function(sx, sy, origin) {
    var points = this.points;
    var numPoints = points.length;
    for (var i = 0; i < numPoints; i++) {
      points[i].scale(sx, sy, origin);
    }
    return this;
  },
  simplify: function(opt = {}) {
    const points = this.points;
    if (points.length < 3) return this;
    const threshold = opt.threshold || 1e-10;
    let currentIndex = 0;
    while (points[currentIndex + 2]) {
      const firstIndex = currentIndex;
      const middleIndex = currentIndex + 1;
      const lastIndex = currentIndex + 2;
      const firstPoint = points[firstIndex];
      const middlePoint = points[middleIndex];
      const lastPoint = points[lastIndex];
      const chord = new Line(firstPoint, lastPoint);
      const closestPoint = chord.closestPoint(middlePoint);
      const closestPointDistance = closestPoint.distance(middlePoint);
      if (closestPointDistance <= threshold) {
        points.splice(middleIndex, 1);
      } else {
        currentIndex += 1;
      }
    }
    return this;
  },
  tangentAt: function(ratio) {
    var points = this.lengthPoints();
    var numPoints = points.length;
    if (numPoints === 0) return null;
    if (numPoints === 1) return null;
    if (ratio < 0) ratio = 0;
    if (ratio > 1) ratio = 1;
    var polylineLength = this.length();
    var length2 = polylineLength * ratio;
    return this.tangentAtLength(length2);
  },
  tangentAtLength: function(length2) {
    var points = this.lengthPoints();
    var numPoints = points.length;
    if (numPoints === 0) return null;
    if (numPoints === 1) return null;
    var fromStart = true;
    if (length2 < 0) {
      fromStart = false;
      length2 = -length2;
    }
    var lastValidLine;
    var l = 0;
    var n = numPoints - 1;
    for (var i = 0; i < n; i++) {
      var index = fromStart ? i : n - 1 - i;
      var a = points[index];
      var b = points[index + 1];
      var line3 = new Line(a, b);
      var d = a.distance(b);
      if (line3.isDifferentiable()) {
        if (length2 <= l + d) {
          return line3.tangentAtLength((fromStart ? 1 : -1) * (length2 - l));
        }
        lastValidLine = line3;
      }
      l += d;
    }
    if (lastValidLine) {
      var ratio = fromStart ? 1 : 0;
      return lastValidLine.tangentAt(ratio);
    }
    return null;
  },
  toString: function() {
    return this.points + "";
  },
  translate: function(tx, ty) {
    var points = this.points;
    var numPoints = points.length;
    for (var i = 0; i < numPoints; i++) {
      points[i].translate(tx, ty);
    }
    return this;
  },
  // Return svgString that can be used to recreate this line.
  serialize: function() {
    var points = this.points;
    var numPoints = points.length;
    if (numPoints === 0) return "";
    var output = "";
    for (var i = 0; i < numPoints; i++) {
      var point2 = points[i];
      output += point2.x + "," + point2.y + " ";
    }
    return output.trim();
  }
};
Object.defineProperty(Polyline.prototype, "start", {
  // Getter for the first point of the polyline.
  configurable: true,
  enumerable: true,
  get: function() {
    var points = this.points;
    var numPoints = points.length;
    if (numPoints === 0) return null;
    return this.points[0];
  }
});
Object.defineProperty(Polyline.prototype, "end", {
  // Getter for the last point of the polyline.
  configurable: true,
  enumerable: true,
  get: function() {
    var points = this.points;
    var numPoints = points.length;
    if (numPoints === 0) return null;
    return this.points[numPoints - 1];
  }
});

// node_modules/jointjs/src/g/curve.mjs
var {
  abs: abs3,
  sqrt: sqrt3,
  min: min4,
  max: max4,
  pow: pow4
} = Math;
var Curve = function(p1, p2, p3, p4) {
  if (!(this instanceof Curve)) {
    return new Curve(p1, p2, p3, p4);
  }
  if (p1 instanceof Curve) {
    return new Curve(p1.start, p1.controlPoint1, p1.controlPoint2, p1.end);
  }
  this.start = new Point(p1);
  this.controlPoint1 = new Point(p2);
  this.controlPoint2 = new Point(p3);
  this.end = new Point(p4);
};
Curve.throughPoints = /* @__PURE__ */ function() {
  function getCurveControlPoints(knots) {
    var firstControlPoints = [];
    var secondControlPoints = [];
    var n = knots.length - 1;
    var i;
    if (n == 1) {
      firstControlPoints[0] = new Point((2 * knots[0].x + knots[1].x) / 3, (2 * knots[0].y + knots[1].y) / 3);
      secondControlPoints[0] = new Point(2 * firstControlPoints[0].x - knots[0].x, 2 * firstControlPoints[0].y - knots[0].y);
      return [firstControlPoints, secondControlPoints];
    }
    var rhs = [];
    for (i = 1; i < n - 1; i++) {
      rhs[i] = 4 * knots[i].x + 2 * knots[i + 1].x;
    }
    rhs[0] = knots[0].x + 2 * knots[1].x;
    rhs[n - 1] = (8 * knots[n - 1].x + knots[n].x) / 2;
    var x = getFirstControlPoints(rhs);
    for (i = 1; i < n - 1; ++i) {
      rhs[i] = 4 * knots[i].y + 2 * knots[i + 1].y;
    }
    rhs[0] = knots[0].y + 2 * knots[1].y;
    rhs[n - 1] = (8 * knots[n - 1].y + knots[n].y) / 2;
    var y = getFirstControlPoints(rhs);
    for (i = 0; i < n; i++) {
      firstControlPoints.push(new Point(x[i], y[i]));
      if (i < n - 1) {
        secondControlPoints.push(new Point(2 * knots[i + 1].x - x[i + 1], 2 * knots[i + 1].y - y[i + 1]));
      } else {
        secondControlPoints.push(new Point((knots[n].x + x[n - 1]) / 2, (knots[n].y + y[n - 1]) / 2));
      }
    }
    return [firstControlPoints, secondControlPoints];
  }
  function getFirstControlPoints(rhs) {
    var n = rhs.length;
    var x = [];
    var tmp = [];
    var b = 2;
    x[0] = rhs[0] / b;
    for (var i = 1; i < n; i++) {
      tmp[i] = 1 / b;
      b = (i < n - 1 ? 4 : 3.5) - tmp[i];
      x[i] = (rhs[i] - x[i - 1]) / b;
    }
    for (i = 1; i < n; i++) {
      x[n - i - 1] -= tmp[n - i] * x[n - i];
    }
    return x;
  }
  return function(points) {
    if (!points || Array.isArray(points) && points.length < 2) {
      throw new Error("At least 2 points are required");
    }
    var controlPoints = getCurveControlPoints(points);
    var curves = [];
    var n = controlPoints[0].length;
    for (var i = 0; i < n; i++) {
      var controlPoint1 = new Point(controlPoints[0][i].x, controlPoints[0][i].y);
      var controlPoint2 = new Point(controlPoints[1][i].x, controlPoints[1][i].y);
      curves.push(new Curve(points[i], controlPoint1, controlPoint2, points[i + 1]));
    }
    return curves;
  };
}();
Curve.prototype = {
  type: types.Curve,
  // Returns a bbox that tightly envelops the curve.
  bbox: function() {
    var start = this.start;
    var controlPoint1 = this.controlPoint1;
    var controlPoint2 = this.controlPoint2;
    var end = this.end;
    var x0 = start.x;
    var y0 = start.y;
    var x1 = controlPoint1.x;
    var y1 = controlPoint1.y;
    var x2 = controlPoint2.x;
    var y2 = controlPoint2.y;
    var x3 = end.x;
    var y3 = end.y;
    var points = new Array();
    var tvalues = new Array();
    var bounds = [new Array(), new Array()];
    var a, b, c, t;
    var t1, t2;
    var b2ac, sqrtb2ac;
    for (var i = 0; i < 2; ++i) {
      if (i === 0) {
        b = 6 * x0 - 12 * x1 + 6 * x2;
        a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
        c = 3 * x1 - 3 * x0;
      } else {
        b = 6 * y0 - 12 * y1 + 6 * y2;
        a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
        c = 3 * y1 - 3 * y0;
      }
      if (abs3(a) < 1e-12) {
        if (abs3(b) < 1e-12) {
          continue;
        }
        t = -c / b;
        if (0 < t && t < 1) tvalues.push(t);
        continue;
      }
      b2ac = b * b - 4 * c * a;
      sqrtb2ac = sqrt3(b2ac);
      if (b2ac < 0) continue;
      t1 = (-b + sqrtb2ac) / (2 * a);
      if (0 < t1 && t1 < 1) tvalues.push(t1);
      t2 = (-b - sqrtb2ac) / (2 * a);
      if (0 < t2 && t2 < 1) tvalues.push(t2);
    }
    var j = tvalues.length;
    var jlen = j;
    var mt;
    var x, y;
    while (j--) {
      t = tvalues[j];
      mt = 1 - t;
      x = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
      bounds[0][j] = x;
      y = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
      bounds[1][j] = y;
      points[j] = {
        X: x,
        Y: y
      };
    }
    tvalues[jlen] = 0;
    tvalues[jlen + 1] = 1;
    points[jlen] = {
      X: x0,
      Y: y0
    };
    points[jlen + 1] = {
      X: x3,
      Y: y3
    };
    bounds[0][jlen] = x0;
    bounds[1][jlen] = y0;
    bounds[0][jlen + 1] = x3;
    bounds[1][jlen + 1] = y3;
    tvalues.length = jlen + 2;
    bounds[0].length = jlen + 2;
    bounds[1].length = jlen + 2;
    points.length = jlen + 2;
    var left4 = min4.apply(null, bounds[0]);
    var top4 = min4.apply(null, bounds[1]);
    var right4 = max4.apply(null, bounds[0]);
    var bottom4 = max4.apply(null, bounds[1]);
    return new Rect(left4, top4, right4 - left4, bottom4 - top4);
  },
  clone: function() {
    return new Curve(this.start, this.controlPoint1, this.controlPoint2, this.end);
  },
  // Returns the point on the curve closest to point `p`
  closestPoint: function(p, opt) {
    return this.pointAtT(this.closestPointT(p, opt));
  },
  closestPointLength: function(p, opt) {
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var subdivisions = opt.subdivisions === void 0 ? this.getSubdivisions({
      precision
    }) : opt.subdivisions;
    var localOpt = {
      precision,
      subdivisions
    };
    return this.lengthAtT(this.closestPointT(p, localOpt), localOpt);
  },
  closestPointNormalizedLength: function(p, opt) {
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var subdivisions = opt.subdivisions === void 0 ? this.getSubdivisions({
      precision
    }) : opt.subdivisions;
    var localOpt = {
      precision,
      subdivisions
    };
    var cpLength = this.closestPointLength(p, localOpt);
    if (!cpLength) return 0;
    var length2 = this.length(localOpt);
    if (length2 === 0) return 0;
    return cpLength / length2;
  },
  // Returns `t` of the point on the curve closest to point `p`
  closestPointT: function(p, opt) {
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var subdivisions = opt.subdivisions === void 0 ? this.getSubdivisions({
      precision
    }) : opt.subdivisions;
    var investigatedSubdivision;
    var investigatedSubdivisionStartT;
    var investigatedSubdivisionEndT;
    var distFromStart;
    var distFromEnd;
    var chordLength;
    var minSumDist;
    var n = subdivisions.length;
    var subdivisionSize = n ? 1 / n : 0;
    for (var i = 0; i < n; i++) {
      var currentSubdivision = subdivisions[i];
      var startDist = currentSubdivision.start.distance(p);
      var endDist = currentSubdivision.end.distance(p);
      var sumDist = startDist + endDist;
      if (!minSumDist || sumDist < minSumDist) {
        investigatedSubdivision = currentSubdivision;
        investigatedSubdivisionStartT = i * subdivisionSize;
        investigatedSubdivisionEndT = (i + 1) * subdivisionSize;
        distFromStart = startDist;
        distFromEnd = endDist;
        chordLength = currentSubdivision.start.distance(currentSubdivision.end);
        minSumDist = sumDist;
      }
    }
    var precisionRatio = pow4(10, -precision);
    while (true) {
      var startPrecisionRatio = distFromStart ? abs3(distFromStart - distFromEnd) / distFromStart : 0;
      var endPrecisionRatio = distFromEnd ? abs3(distFromStart - distFromEnd) / distFromEnd : 0;
      var hasRequiredPrecision = startPrecisionRatio < precisionRatio || endPrecisionRatio < precisionRatio;
      var hasMinimalStartDistance = distFromStart ? distFromStart < chordLength * precisionRatio : true;
      var hasMinimalEndDistance = distFromEnd ? distFromEnd < chordLength * precisionRatio : true;
      var hasMinimalDistance = hasMinimalStartDistance || hasMinimalEndDistance;
      if (hasRequiredPrecision || hasMinimalDistance) {
        return distFromStart <= distFromEnd ? investigatedSubdivisionStartT : investigatedSubdivisionEndT;
      }
      var divided = investigatedSubdivision.divide(0.5);
      subdivisionSize /= 2;
      var startDist1 = divided[0].start.distance(p);
      var endDist1 = divided[0].end.distance(p);
      var sumDist1 = startDist1 + endDist1;
      var startDist2 = divided[1].start.distance(p);
      var endDist2 = divided[1].end.distance(p);
      var sumDist2 = startDist2 + endDist2;
      if (sumDist1 <= sumDist2) {
        investigatedSubdivision = divided[0];
        investigatedSubdivisionEndT -= subdivisionSize;
        distFromStart = startDist1;
        distFromEnd = endDist1;
      } else {
        investigatedSubdivision = divided[1];
        investigatedSubdivisionStartT += subdivisionSize;
        distFromStart = startDist2;
        distFromEnd = endDist2;
      }
    }
  },
  closestPointTangent: function(p, opt) {
    return this.tangentAtT(this.closestPointT(p, opt));
  },
  // Returns `true` if the area surrounded by the curve contains the point `p`.
  // Implements the even-odd algorithm (self-intersections are "outside").
  // Closes open curves (always imagines a closing segment).
  // Precision may be adjusted by passing an `opt` object.
  containsPoint: function(p, opt) {
    var polyline = this.toPolyline(opt);
    return polyline.containsPoint(p);
  },
  // Divides the curve into two at requested `ratio` between 0 and 1 with precision better than `opt.precision`; optionally using `opt.subdivisions` provided.
  // For a function that uses `t`, use Curve.divideAtT().
  divideAt: function(ratio, opt) {
    if (ratio <= 0) return this.divideAtT(0);
    if (ratio >= 1) return this.divideAtT(1);
    var t = this.tAt(ratio, opt);
    return this.divideAtT(t);
  },
  // Divides the curve into two at requested `length` with precision better than requested `opt.precision`; optionally using `opt.subdivisions` provided.
  divideAtLength: function(length2, opt) {
    var t = this.tAtLength(length2, opt);
    return this.divideAtT(t);
  },
  // Divides the curve into two at point defined by `t` between 0 and 1.
  // Using de Casteljau's algorithm (http://math.stackexchange.com/a/317867).
  // Additional resource: https://pomax.github.io/bezierinfo/#decasteljau
  divideAtT: function(t) {
    var start = this.start;
    var controlPoint1 = this.controlPoint1;
    var controlPoint2 = this.controlPoint2;
    var end = this.end;
    if (t <= 0) {
      return [new Curve(start, start, start, start), new Curve(start, controlPoint1, controlPoint2, end)];
    }
    if (t >= 1) {
      return [new Curve(start, controlPoint1, controlPoint2, end), new Curve(end, end, end, end)];
    }
    var dividerPoints = this.getSkeletonPoints(t);
    var startControl1 = dividerPoints.startControlPoint1;
    var startControl2 = dividerPoints.startControlPoint2;
    var divider = dividerPoints.divider;
    var dividerControl1 = dividerPoints.dividerControlPoint1;
    var dividerControl2 = dividerPoints.dividerControlPoint2;
    return [new Curve(start, startControl1, startControl2, divider), new Curve(divider, dividerControl1, dividerControl2, end)];
  },
  // Returns the distance between the curve's start and end points.
  endpointDistance: function() {
    return this.start.distance(this.end);
  },
  // Checks whether two curves are exactly the same.
  equals: function(c) {
    return !!c && this.start.x === c.start.x && this.start.y === c.start.y && this.controlPoint1.x === c.controlPoint1.x && this.controlPoint1.y === c.controlPoint1.y && this.controlPoint2.x === c.controlPoint2.x && this.controlPoint2.y === c.controlPoint2.y && this.end.x === c.end.x && this.end.y === c.end.y;
  },
  // Returns five helper points necessary for curve division.
  getSkeletonPoints: function(t) {
    var start = this.start;
    var control1 = this.controlPoint1;
    var control2 = this.controlPoint2;
    var end = this.end;
    if (t <= 0) {
      return {
        startControlPoint1: start.clone(),
        startControlPoint2: start.clone(),
        divider: start.clone(),
        dividerControlPoint1: control1.clone(),
        dividerControlPoint2: control2.clone()
      };
    }
    if (t >= 1) {
      return {
        startControlPoint1: control1.clone(),
        startControlPoint2: control2.clone(),
        divider: end.clone(),
        dividerControlPoint1: end.clone(),
        dividerControlPoint2: end.clone()
      };
    }
    var midpoint1 = new Line(start, control1).pointAt(t);
    var midpoint2 = new Line(control1, control2).pointAt(t);
    var midpoint3 = new Line(control2, end).pointAt(t);
    var subControl1 = new Line(midpoint1, midpoint2).pointAt(t);
    var subControl2 = new Line(midpoint2, midpoint3).pointAt(t);
    var divider = new Line(subControl1, subControl2).pointAt(t);
    var output = {
      startControlPoint1: midpoint1,
      startControlPoint2: subControl1,
      divider,
      dividerControlPoint1: subControl2,
      dividerControlPoint2: midpoint3
    };
    return output;
  },
  // Returns a list of curves whose flattened length is better than `opt.precision`.
  // That is, observed difference in length between recursions is less than 10^(-3) = 0.001 = 0.1%
  // (Observed difference is not real precision, but close enough as long as special cases are covered)
  // As a rule of thumb, increasing `precision` by 1 requires 2 more iterations (= levels of division operations)
  // - Precision 0 (endpointDistance) - 0 iterations => total of 2^0 - 1 = 0 operations (1 subdivision)
  // - Precision 1 (<10% error) - 2 iterations => total of 2^2 - 1 = 3 operations (4 subdivisions)
  // - Precision 2 (<1% error) - 4 iterations => total of 2^4 - 1 = 15 operations requires 4 division operations on all elements (15 operations total) (16 subdivisions)
  // - Precision 3 (<0.1% error) - 6 iterations => total of 2^6 - 1 = 63 operations - acceptable when drawing (64 subdivisions)
  // - Precision 4 (<0.01% error) - 8 iterations => total of 2^8 - 1 = 255 operations - high resolution, can be used to interpolate `t` (256 subdivisions)
  // (Variation of 1 recursion worse or better is possible depending on the curve, doubling/halving the number of operations accordingly)
  getSubdivisions: function(opt) {
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var start = this.start;
    var control1 = this.controlPoint1;
    var control2 = this.controlPoint2;
    var end = this.end;
    var subdivisions = [new Curve(start, control1, control2, end)];
    if (precision === 0) return subdivisions;
    var isPoint = !this.isDifferentiable();
    if (isPoint) return subdivisions;
    var previousLength = this.endpointDistance();
    var precisionRatio = pow4(10, -precision);
    var minIterations = 2;
    var isLine = control1.cross(start, end) === 0 && control2.cross(start, end) === 0;
    if (isLine) {
      minIterations = 2 * precision;
    }
    var iteration = 0;
    while (true) {
      iteration += 1;
      var newSubdivisions = [];
      var numSubdivisions = subdivisions.length;
      for (var i = 0; i < numSubdivisions; i++) {
        var currentSubdivision = subdivisions[i];
        var divided = currentSubdivision.divide(0.5);
        newSubdivisions.push(divided[0], divided[1]);
      }
      var length2 = 0;
      var numNewSubdivisions = newSubdivisions.length;
      for (var j = 0; j < numNewSubdivisions; j++) {
        var currentNewSubdivision = newSubdivisions[j];
        length2 += currentNewSubdivision.endpointDistance();
      }
      if (iteration >= minIterations) {
        var observedPrecisionRatio = length2 !== 0 ? (length2 - previousLength) / length2 : 0;
        if (observedPrecisionRatio < precisionRatio) {
          return newSubdivisions;
        }
      }
      subdivisions = newSubdivisions;
      previousLength = length2;
    }
  },
  isDifferentiable: function() {
    var start = this.start;
    var control1 = this.controlPoint1;
    var control2 = this.controlPoint2;
    var end = this.end;
    return !(start.equals(control1) && control1.equals(control2) && control2.equals(end));
  },
  // Returns flattened length of the curve with precision better than `opt.precision`; or using `opt.subdivisions` provided.
  length: function(opt) {
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var subdivisions = opt.subdivisions === void 0 ? this.getSubdivisions({
      precision
    }) : opt.subdivisions;
    var length2 = 0;
    var n = subdivisions.length;
    for (var i = 0; i < n; i++) {
      var currentSubdivision = subdivisions[i];
      length2 += currentSubdivision.endpointDistance();
    }
    return length2;
  },
  // Returns distance along the curve up to `t` with precision better than requested `opt.precision`. (Not using `opt.subdivisions`.)
  lengthAtT: function(t, opt) {
    if (t <= 0) return 0;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var subCurve = this.divide(t)[0];
    var subCurveLength = subCurve.length({
      precision
    });
    return subCurveLength;
  },
  // Returns point at requested `ratio` between 0 and 1 with precision better than `opt.precision`; optionally using `opt.subdivisions` provided.
  // Mirrors Line.pointAt() function.
  // For a function that tracks `t`, use Curve.pointAtT().
  pointAt: function(ratio, opt) {
    if (ratio <= 0) return this.start.clone();
    if (ratio >= 1) return this.end.clone();
    var t = this.tAt(ratio, opt);
    return this.pointAtT(t);
  },
  // Returns point at requested `length` with precision better than requested `opt.precision`; optionally using `opt.subdivisions` provided.
  pointAtLength: function(length2, opt) {
    var t = this.tAtLength(length2, opt);
    return this.pointAtT(t);
  },
  // Returns the point at provided `t` between 0 and 1.
  // `t` does not track distance along curve as it does in Line objects.
  // Non-linear relationship, speeds up and slows down as curve warps!
  // For linear length-based solution, use Curve.pointAt().
  pointAtT: function(t) {
    if (t <= 0) return this.start.clone();
    if (t >= 1) return this.end.clone();
    return this.getSkeletonPoints(t).divider;
  },
  // Default precision
  PRECISION: 3,
  round: function(precision) {
    this.start.round(precision);
    this.controlPoint1.round(precision);
    this.controlPoint2.round(precision);
    this.end.round(precision);
    return this;
  },
  scale: function(sx, sy, origin) {
    this.start.scale(sx, sy, origin);
    this.controlPoint1.scale(sx, sy, origin);
    this.controlPoint2.scale(sx, sy, origin);
    this.end.scale(sx, sy, origin);
    return this;
  },
  // Returns a tangent line at requested `ratio` with precision better than requested `opt.precision`; or using `opt.subdivisions` provided.
  tangentAt: function(ratio, opt) {
    if (!this.isDifferentiable()) return null;
    if (ratio < 0) ratio = 0;
    else if (ratio > 1) ratio = 1;
    var t = this.tAt(ratio, opt);
    return this.tangentAtT(t);
  },
  // Returns a tangent line at requested `length` with precision better than requested `opt.precision`; or using `opt.subdivisions` provided.
  tangentAtLength: function(length2, opt) {
    if (!this.isDifferentiable()) return null;
    var t = this.tAtLength(length2, opt);
    return this.tangentAtT(t);
  },
  // Returns a tangent line at requested `t`.
  tangentAtT: function(t) {
    if (!this.isDifferentiable()) return null;
    if (t < 0) t = 0;
    else if (t > 1) t = 1;
    var skeletonPoints = this.getSkeletonPoints(t);
    var p1 = skeletonPoints.startControlPoint2;
    var p2 = skeletonPoints.dividerControlPoint1;
    var tangentStart = skeletonPoints.divider;
    var tangentLine = new Line(p1, p2);
    tangentLine.translate(tangentStart.x - p1.x, tangentStart.y - p1.y);
    return tangentLine;
  },
  // Returns `t` at requested `ratio` with precision better than requested `opt.precision`; optionally using `opt.subdivisions` provided.
  tAt: function(ratio, opt) {
    if (ratio <= 0) return 0;
    if (ratio >= 1) return 1;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var subdivisions = opt.subdivisions === void 0 ? this.getSubdivisions({
      precision
    }) : opt.subdivisions;
    var localOpt = {
      precision,
      subdivisions
    };
    var curveLength = this.length(localOpt);
    var length2 = curveLength * ratio;
    return this.tAtLength(length2, localOpt);
  },
  // Returns `t` at requested `length` with precision better than requested `opt.precision`; optionally using `opt.subdivisions` provided.
  // Uses `precision` to approximate length within `precision` (always underestimates)
  // Then uses a binary search to find the `t` of a subdivision endpoint that is close (within `precision`) to the `length`, if the curve was as long as approximated
  // As a rule of thumb, increasing `precision` by 1 causes the algorithm to go 2^(precision - 1) deeper
  // - Precision 0 (chooses one of the two endpoints) - 0 levels
  // - Precision 1 (chooses one of 5 points, <10% error) - 1 level
  // - Precision 2 (<1% error) - 3 levels
  // - Precision 3 (<0.1% error) - 7 levels
  // - Precision 4 (<0.01% error) - 15 levels
  tAtLength: function(length2, opt) {
    var fromStart = true;
    if (length2 < 0) {
      fromStart = false;
      length2 = -length2;
    }
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var subdivisions = opt.subdivisions === void 0 ? this.getSubdivisions({
      precision
    }) : opt.subdivisions;
    var localOpt = {
      precision,
      subdivisions
    };
    var investigatedSubdivision;
    var investigatedSubdivisionStartT;
    var investigatedSubdivisionEndT;
    var baselinePointDistFromStart;
    var baselinePointDistFromEnd;
    var l = 0;
    var n = subdivisions.length;
    var subdivisionSize = 1 / n;
    for (var i = 0; i < n; i++) {
      var index = fromStart ? i : n - 1 - i;
      var currentSubdivision = subdivisions[i];
      var d = currentSubdivision.endpointDistance();
      if (length2 <= l + d) {
        investigatedSubdivision = currentSubdivision;
        investigatedSubdivisionStartT = index * subdivisionSize;
        investigatedSubdivisionEndT = (index + 1) * subdivisionSize;
        baselinePointDistFromStart = fromStart ? length2 - l : d + l - length2;
        baselinePointDistFromEnd = fromStart ? d + l - length2 : length2 - l;
        break;
      }
      l += d;
    }
    if (!investigatedSubdivision) return fromStart ? 1 : 0;
    var curveLength = this.length(localOpt);
    var precisionRatio = pow4(10, -precision);
    while (true) {
      var observedPrecisionRatio;
      observedPrecisionRatio = curveLength !== 0 ? baselinePointDistFromStart / curveLength : 0;
      if (observedPrecisionRatio < precisionRatio) return investigatedSubdivisionStartT;
      observedPrecisionRatio = curveLength !== 0 ? baselinePointDistFromEnd / curveLength : 0;
      if (observedPrecisionRatio < precisionRatio) return investigatedSubdivisionEndT;
      var newBaselinePointDistFromStart;
      var newBaselinePointDistFromEnd;
      var divided = investigatedSubdivision.divide(0.5);
      subdivisionSize /= 2;
      var baseline1Length = divided[0].endpointDistance();
      var baseline2Length = divided[1].endpointDistance();
      if (baselinePointDistFromStart <= baseline1Length) {
        investigatedSubdivision = divided[0];
        investigatedSubdivisionEndT -= subdivisionSize;
        newBaselinePointDistFromStart = baselinePointDistFromStart;
        newBaselinePointDistFromEnd = baseline1Length - newBaselinePointDistFromStart;
      } else {
        investigatedSubdivision = divided[1];
        investigatedSubdivisionStartT += subdivisionSize;
        newBaselinePointDistFromStart = baselinePointDistFromStart - baseline1Length;
        newBaselinePointDistFromEnd = baseline2Length - newBaselinePointDistFromStart;
      }
      baselinePointDistFromStart = newBaselinePointDistFromStart;
      baselinePointDistFromEnd = newBaselinePointDistFromEnd;
    }
  },
  // Returns an array of points that represents the curve when flattened, up to `opt.precision`; or using `opt.subdivisions` provided.
  // Flattened length is no more than 10^(-precision) away from real curve length.
  toPoints: function(opt) {
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var subdivisions = opt.subdivisions === void 0 ? this.getSubdivisions({
      precision
    }) : opt.subdivisions;
    var points = [subdivisions[0].start.clone()];
    var n = subdivisions.length;
    for (var i = 0; i < n; i++) {
      var currentSubdivision = subdivisions[i];
      points.push(currentSubdivision.end.clone());
    }
    return points;
  },
  // Returns a polyline that represents the curve when flattened, up to `opt.precision`; or using `opt.subdivisions` provided.
  // Flattened length is no more than 10^(-precision) away from real curve length.
  toPolyline: function(opt) {
    return new Polyline(this.toPoints(opt));
  },
  toString: function() {
    return this.start + " " + this.controlPoint1 + " " + this.controlPoint2 + " " + this.end;
  },
  translate: function(tx, ty) {
    this.start.translate(tx, ty);
    this.controlPoint1.translate(tx, ty);
    this.controlPoint2.translate(tx, ty);
    this.end.translate(tx, ty);
    return this;
  }
};
Curve.prototype.divide = Curve.prototype.divideAtT;

// node_modules/jointjs/src/g/extend.mjs
function extend(obj) {
  var i;
  var n;
  var args = [];
  n = arguments.length;
  for (i = 1; i < n; i++) {
    args.push(arguments[i]);
  }
  if (!obj) throw new Error("Missing a parent object.");
  var child = Object.create(obj);
  n = args.length;
  for (i = 0; i < n; i++) {
    var src = args[i];
    var inheritedProperty;
    var key;
    for (key in src) {
      if (src.hasOwnProperty(key)) {
        delete child[key];
        inheritedProperty = Object.getOwnPropertyDescriptor(src, key);
        Object.defineProperty(child, key, inheritedProperty);
      }
    }
  }
  return child;
}

// node_modules/jointjs/src/g/path.mjs
var Path = function(arg) {
  if (!(this instanceof Path)) {
    return new Path(arg);
  }
  if (typeof arg === "string") {
    return new Path.parse(arg);
  }
  this.segments = [];
  var i;
  var n;
  if (!arg) {
  } else if (Array.isArray(arg) && arg.length !== 0) {
    arg = arg.reduce(function(acc, val) {
      return acc.concat(val);
    }, []);
    n = arg.length;
    if (arg[0].isSegment) {
      for (i = 0; i < n; i++) {
        var segment = arg[i];
        this.appendSegment(segment);
      }
    } else {
      var previousObj = null;
      for (i = 0; i < n; i++) {
        var obj = arg[i];
        if (!(obj instanceof Line || obj instanceof Curve)) {
          throw new Error("Cannot construct a path segment from the provided object.");
        }
        if (i === 0) this.appendSegment(Path.createSegment("M", obj.start));
        if (previousObj && !previousObj.end.equals(obj.start)) this.appendSegment(Path.createSegment("M", obj.start));
        if (obj instanceof Line) {
          this.appendSegment(Path.createSegment("L", obj.end));
        } else if (obj instanceof Curve) {
          this.appendSegment(Path.createSegment("C", obj.controlPoint1, obj.controlPoint2, obj.end));
        }
        previousObj = obj;
      }
    }
  } else if (arg.isSegment) {
    this.appendSegment(arg);
  } else if (arg instanceof Line) {
    this.appendSegment(Path.createSegment("M", arg.start));
    this.appendSegment(Path.createSegment("L", arg.end));
  } else if (arg instanceof Curve) {
    this.appendSegment(Path.createSegment("M", arg.start));
    this.appendSegment(Path.createSegment("C", arg.controlPoint1, arg.controlPoint2, arg.end));
  } else if (arg instanceof Polyline) {
    if (!(arg.points && arg.points.length !== 0)) return;
    n = arg.points.length;
    for (i = 0; i < n; i++) {
      var point2 = arg.points[i];
      if (i === 0) this.appendSegment(Path.createSegment("M", point2));
      else this.appendSegment(Path.createSegment("L", point2));
    }
  } else {
    throw new Error("Cannot construct a path from the provided object.");
  }
};
Path.parse = function(pathData) {
  if (!pathData) return new Path();
  var path = new Path();
  var commandRe = /(?:[a-zA-Z] *)(?:(?:-?\d+(?:\.\d+)?(?:e[-+]?\d+)? *,? *)|(?:-?\.\d+ *,? *))+|(?:[a-zA-Z] *)(?! |\d|-|\.)/g;
  var commands = pathData.match(commandRe);
  var numCommands = commands.length;
  for (var i = 0; i < numCommands; i++) {
    var command = commands[i];
    var argRe = /(?:[a-zA-Z])|(?:(?:-?\d+(?:\.\d+)?(?:e[-+]?\d+)?))|(?:(?:-?\.\d+))/g;
    var args = command.match(argRe);
    var segment = Path.createSegment.apply(this, args);
    path.appendSegment(segment);
  }
  return path;
};
Path.createSegment = function(type) {
  if (!type) throw new Error("Type must be provided.");
  var segmentConstructor = Path.segmentTypes[type];
  if (!segmentConstructor) throw new Error(type + " is not a recognized path segment type.");
  var args = [];
  var n = arguments.length;
  for (var i = 1; i < n; i++) {
    args.push(arguments[i]);
  }
  return applyToNew(segmentConstructor, args);
};
Path.prototype = {
  type: types.Path,
  // Accepts one segment or an array of segments as argument.
  // Throws an error if argument is not a segment or an array of segments.
  appendSegment: function(arg) {
    var segments = this.segments;
    var numSegments = segments.length;
    var currentSegment;
    var previousSegment = numSegments !== 0 ? segments[numSegments - 1] : null;
    var nextSegment = null;
    if (!Array.isArray(arg)) {
      if (!arg || !arg.isSegment) throw new Error("Segment required.");
      currentSegment = this.prepareSegment(arg, previousSegment, nextSegment);
      segments.push(currentSegment);
    } else {
      arg = arg.reduce(function(acc, val) {
        return acc.concat(val);
      }, []);
      if (!arg[0].isSegment) throw new Error("Segments required.");
      var n = arg.length;
      for (var i = 0; i < n; i++) {
        var currentArg = arg[i];
        currentSegment = this.prepareSegment(currentArg, previousSegment, nextSegment);
        segments.push(currentSegment);
        previousSegment = currentSegment;
      }
    }
  },
  // Returns the bbox of the path.
  // If path has no segments, returns null.
  // If path has only invisible segments, returns bbox of the end point of last segment.
  bbox: function() {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    var bbox2;
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      if (segment.isVisible) {
        var segmentBBox = segment.bbox();
        bbox2 = bbox2 ? bbox2.union(segmentBBox) : segmentBBox;
      }
    }
    if (bbox2) return bbox2;
    var lastSegment = segments[numSegments - 1];
    return new Rect(lastSegment.end.x, lastSegment.end.y, 0, 0);
  },
  // Returns a new path that is a clone of this path.
  clone: function() {
    var segments = this.segments;
    var numSegments = segments.length;
    var path = new Path();
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i].clone();
      path.appendSegment(segment);
    }
    return path;
  },
  closestPoint: function(p, opt) {
    var t = this.closestPointT(p, opt);
    if (!t) return null;
    return this.pointAtT(t);
  },
  closestPointLength: function(p, opt) {
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var localOpt = {
      precision,
      segmentSubdivisions
    };
    var t = this.closestPointT(p, localOpt);
    if (!t) return 0;
    return this.lengthAtT(t, localOpt);
  },
  closestPointNormalizedLength: function(p, opt) {
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var localOpt = {
      precision,
      segmentSubdivisions
    };
    var cpLength = this.closestPointLength(p, localOpt);
    if (cpLength === 0) return 0;
    var length2 = this.length(localOpt);
    if (length2 === 0) return 0;
    return cpLength / length2;
  },
  // Private function.
  closestPointT: function(p, opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var closestPointT;
    var minSquaredDistance = Infinity;
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      var subdivisions = segmentSubdivisions[i];
      if (segment.isVisible) {
        var segmentClosestPointT = segment.closestPointT(p, {
          precision,
          subdivisions
        });
        var segmentClosestPoint = segment.pointAtT(segmentClosestPointT);
        var squaredDistance = new Line(segmentClosestPoint, p).squaredLength();
        if (squaredDistance < minSquaredDistance) {
          closestPointT = {
            segmentIndex: i,
            value: segmentClosestPointT
          };
          minSquaredDistance = squaredDistance;
        }
      }
    }
    if (closestPointT) return closestPointT;
    return {
      segmentIndex: numSegments - 1,
      value: 1
    };
  },
  closestPointTangent: function(p, opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var closestPointTangent;
    var minSquaredDistance = Infinity;
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      var subdivisions = segmentSubdivisions[i];
      if (segment.isDifferentiable()) {
        var segmentClosestPointT = segment.closestPointT(p, {
          precision,
          subdivisions
        });
        var segmentClosestPoint = segment.pointAtT(segmentClosestPointT);
        var squaredDistance = new Line(segmentClosestPoint, p).squaredLength();
        if (squaredDistance < minSquaredDistance) {
          closestPointTangent = segment.tangentAtT(segmentClosestPointT);
          minSquaredDistance = squaredDistance;
        }
      }
    }
    if (closestPointTangent) return closestPointTangent;
    return null;
  },
  // Returns `true` if the area surrounded by the path contains the point `p`.
  // Implements the even-odd algorithm (self-intersections are "outside").
  // Closes open paths (always imagines a final closing segment).
  // Precision may be adjusted by passing an `opt` object.
  containsPoint: function(p, opt) {
    var polylines = this.toPolylines(opt);
    if (!polylines) return false;
    var numPolylines = polylines.length;
    var numIntersections = 0;
    for (var i = 0; i < numPolylines; i++) {
      var polyline = polylines[i];
      if (polyline.containsPoint(p)) {
        numIntersections++;
      }
    }
    return numIntersections % 2 === 1;
  },
  // Divides the path into two at requested `ratio` between 0 and 1 with precision better than `opt.precision`; optionally using `opt.subdivisions` provided.
  divideAt: function(ratio, opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    if (ratio < 0) ratio = 0;
    if (ratio > 1) ratio = 1;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var localOpt = {
      precision,
      segmentSubdivisions
    };
    var pathLength = this.length(localOpt);
    var length2 = pathLength * ratio;
    return this.divideAtLength(length2, localOpt);
  },
  // Divides the path into two at requested `length` with precision better than requested `opt.precision`; optionally using `opt.subdivisions` provided.
  divideAtLength: function(length2, opt) {
    var numSegments = this.segments.length;
    if (numSegments === 0) return null;
    var fromStart = true;
    if (length2 < 0) {
      fromStart = false;
      length2 = -length2;
    }
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var i;
    var segment;
    var l = 0;
    var divided;
    var dividedSegmentIndex;
    var lastValidSegment;
    var lastValidSegmentIndex;
    var t;
    for (i = 0; i < numSegments; i++) {
      var index = fromStart ? i : numSegments - 1 - i;
      segment = this.getSegment(index);
      var subdivisions = segmentSubdivisions[index];
      var d = segment.length({
        precision,
        subdivisions
      });
      if (segment.isDifferentiable()) {
        lastValidSegment = segment;
        lastValidSegmentIndex = index;
        if (length2 <= l + d) {
          dividedSegmentIndex = index;
          divided = segment.divideAtLength((fromStart ? 1 : -1) * (length2 - l), {
            precision,
            subdivisions
          });
          break;
        }
      }
      l += d;
    }
    if (!lastValidSegment) {
      return null;
    }
    if (!divided) {
      dividedSegmentIndex = lastValidSegmentIndex;
      t = fromStart ? 1 : 0;
      divided = lastValidSegment.divideAtT(t);
    }
    var pathCopy = this.clone();
    pathCopy.replaceSegment(dividedSegmentIndex, divided);
    var divisionStartIndex = dividedSegmentIndex;
    var divisionMidIndex = dividedSegmentIndex + 1;
    var divisionEndIndex = dividedSegmentIndex + 2;
    if (!divided[0].isDifferentiable()) {
      pathCopy.removeSegment(divisionStartIndex);
      divisionMidIndex -= 1;
      divisionEndIndex -= 1;
    }
    var movetoEnd = pathCopy.getSegment(divisionMidIndex).start;
    pathCopy.insertSegment(divisionMidIndex, Path.createSegment("M", movetoEnd));
    divisionEndIndex += 1;
    if (!divided[1].isDifferentiable()) {
      pathCopy.removeSegment(divisionEndIndex - 1);
      divisionEndIndex -= 1;
    }
    var secondPathSegmentIndexConversion = divisionEndIndex - divisionStartIndex - 1;
    for (i = divisionEndIndex; i < pathCopy.segments.length; i++) {
      var originalSegment = this.getSegment(i - secondPathSegmentIndexConversion);
      segment = pathCopy.getSegment(i);
      if (segment.type === "Z" && !originalSegment.subpathStartSegment.end.equals(segment.subpathStartSegment.end)) {
        var convertedSegment = Path.createSegment("L", originalSegment.end);
        pathCopy.replaceSegment(i, convertedSegment);
      }
    }
    var firstPath = new Path(pathCopy.segments.slice(0, divisionMidIndex));
    var secondPath = new Path(pathCopy.segments.slice(divisionMidIndex));
    return [firstPath, secondPath];
  },
  // Checks whether two paths are exactly the same.
  // If `p` is undefined or null, returns false.
  equals: function(p) {
    if (!p) return false;
    var segments = this.segments;
    var otherSegments = p.segments;
    var numSegments = segments.length;
    if (otherSegments.length !== numSegments) return false;
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      var otherSegment = otherSegments[i];
      if (segment.type !== otherSegment.type || !segment.equals(otherSegment)) return false;
    }
    return true;
  },
  // Accepts negative indices.
  // Throws an error if path has no segments.
  // Throws an error if index is out of range.
  getSegment: function(index) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) throw new Error("Path has no segments.");
    if (index < 0) index = numSegments + index;
    if (index >= numSegments || index < 0) throw new Error("Index out of range.");
    return segments[index];
  },
  // Returns an array of segment subdivisions, with precision better than requested `opt.precision`.
  getSegmentSubdivisions: function(opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = [];
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      var subdivisions = segment.getSubdivisions({
        precision
      });
      segmentSubdivisions.push(subdivisions);
    }
    return segmentSubdivisions;
  },
  // Returns an array of subpaths of this path.
  // Invalid paths are validated first.
  // Returns `[]` if path has no segments.
  getSubpaths: function() {
    const validatedPath = this.clone().validate();
    const segments = validatedPath.segments;
    const numSegments = segments.length;
    const subpaths = [];
    for (let i = 0; i < numSegments; i++) {
      const segment = segments[i];
      if (segment.isSubpathStart) {
        subpaths.push(new Path(segment));
      } else {
        subpaths[subpaths.length - 1].appendSegment(segment);
      }
    }
    return subpaths;
  },
  // Insert `arg` at given `index`.
  // `index = 0` means insert at the beginning.
  // `index = segments.length` means insert at the end.
  // Accepts negative indices, from `-1` to `-(segments.length + 1)`.
  // Accepts one segment or an array of segments as argument.
  // Throws an error if index is out of range.
  // Throws an error if argument is not a segment or an array of segments.
  insertSegment: function(index, arg) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (index < 0) index = numSegments + index + 1;
    if (index > numSegments || index < 0) throw new Error("Index out of range.");
    var currentSegment;
    var previousSegment = null;
    var nextSegment = null;
    if (numSegments !== 0) {
      if (index >= 1) {
        previousSegment = segments[index - 1];
        nextSegment = previousSegment.nextSegment;
      } else {
        nextSegment = segments[0];
      }
    }
    if (!Array.isArray(arg)) {
      if (!arg || !arg.isSegment) throw new Error("Segment required.");
      currentSegment = this.prepareSegment(arg, previousSegment, nextSegment);
      segments.splice(index, 0, currentSegment);
    } else {
      arg = arg.reduce(function(acc, val) {
        return acc.concat(val);
      }, []);
      if (!arg[0].isSegment) throw new Error("Segments required.");
      var n = arg.length;
      for (var i = 0; i < n; i++) {
        var currentArg = arg[i];
        currentSegment = this.prepareSegment(currentArg, previousSegment, nextSegment);
        segments.splice(index + i, 0, currentSegment);
        previousSegment = currentSegment;
      }
    }
  },
  intersectionWithLine: function(line3, opt) {
    var intersection3 = null;
    var polylines = this.toPolylines(opt);
    if (!polylines) return null;
    for (var i = 0, n = polylines.length; i < n; i++) {
      var polyline = polylines[i];
      var polylineIntersection = line3.intersect(polyline);
      if (polylineIntersection) {
        intersection3 || (intersection3 = []);
        if (Array.isArray(polylineIntersection)) {
          Array.prototype.push.apply(intersection3, polylineIntersection);
        } else {
          intersection3.push(polylineIntersection);
        }
      }
    }
    return intersection3;
  },
  isDifferentiable: function() {
    var segments = this.segments;
    var numSegments = segments.length;
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      if (segment.isDifferentiable()) return true;
    }
    return false;
  },
  // Checks whether current path segments are valid.
  // Note that d is allowed to be empty - should disable rendering of the path.
  isValid: function() {
    var segments = this.segments;
    var isValid = segments.length === 0 || segments[0].type === "M";
    return isValid;
  },
  // Returns length of the path, with precision better than requested `opt.precision`; or using `opt.segmentSubdivisions` provided.
  // If path has no segments, returns 0.
  length: function(opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return 0;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var length2 = 0;
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      var subdivisions = segmentSubdivisions[i];
      length2 += segment.length({
        subdivisions
      });
    }
    return length2;
  },
  // Private function.
  lengthAtT: function(t, opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return 0;
    var segmentIndex = t.segmentIndex;
    if (segmentIndex < 0) return 0;
    var tValue = t.value;
    if (segmentIndex >= numSegments) {
      segmentIndex = numSegments - 1;
      tValue = 1;
    } else if (tValue < 0) tValue = 0;
    else if (tValue > 1) tValue = 1;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var subdivisions;
    var length2 = 0;
    for (var i = 0; i < segmentIndex; i++) {
      var segment = segments[i];
      subdivisions = segmentSubdivisions[i];
      length2 += segment.length({
        precisison: precision,
        subdivisions
      });
    }
    segment = segments[segmentIndex];
    subdivisions = segmentSubdivisions[segmentIndex];
    length2 += segment.lengthAtT(tValue, {
      precisison: precision,
      subdivisions
    });
    return length2;
  },
  // Returns point at requested `ratio` between 0 and 1, with precision better than requested `opt.precision`; optionally using `opt.segmentSubdivisions` provided.
  pointAt: function(ratio, opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    if (ratio <= 0) return this.start.clone();
    if (ratio >= 1) return this.end.clone();
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var localOpt = {
      precision,
      segmentSubdivisions
    };
    var pathLength = this.length(localOpt);
    var length2 = pathLength * ratio;
    return this.pointAtLength(length2, localOpt);
  },
  // Returns point at requested `length`, with precision better than requested `opt.precision`; optionally using `opt.segmentSubdivisions` provided.
  // Accepts negative length.
  pointAtLength: function(length2, opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    if (length2 === 0) return this.start.clone();
    var fromStart = true;
    if (length2 < 0) {
      fromStart = false;
      length2 = -length2;
    }
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var lastVisibleSegment;
    var l = 0;
    for (var i = 0; i < numSegments; i++) {
      var index = fromStart ? i : numSegments - 1 - i;
      var segment = segments[index];
      var subdivisions = segmentSubdivisions[index];
      var d = segment.length({
        precision,
        subdivisions
      });
      if (segment.isVisible) {
        if (length2 <= l + d) {
          return segment.pointAtLength((fromStart ? 1 : -1) * (length2 - l), {
            precision,
            subdivisions
          });
        }
        lastVisibleSegment = segment;
      }
      l += d;
    }
    if (lastVisibleSegment) return fromStart ? lastVisibleSegment.end : lastVisibleSegment.start;
    var lastSegment = segments[numSegments - 1];
    return lastSegment.end.clone();
  },
  // Private function.
  pointAtT: function(t) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    var segmentIndex = t.segmentIndex;
    if (segmentIndex < 0) return segments[0].pointAtT(0);
    if (segmentIndex >= numSegments) return segments[numSegments - 1].pointAtT(1);
    var tValue = t.value;
    if (tValue < 0) tValue = 0;
    else if (tValue > 1) tValue = 1;
    return segments[segmentIndex].pointAtT(tValue);
  },
  // Default precision
  PRECISION: 3,
  // Helper method for adding segments.
  prepareSegment: function(segment, previousSegment, nextSegment) {
    segment.previousSegment = previousSegment;
    segment.nextSegment = nextSegment;
    if (previousSegment) previousSegment.nextSegment = segment;
    if (nextSegment) nextSegment.previousSegment = segment;
    var updateSubpathStart = segment;
    if (segment.isSubpathStart) {
      segment.subpathStartSegment = segment;
      updateSubpathStart = nextSegment;
    }
    if (updateSubpathStart) this.updateSubpathStartSegment(updateSubpathStart);
    return segment;
  },
  // Remove the segment at `index`.
  // Accepts negative indices, from `-1` to `-segments.length`.
  // Throws an error if path has no segments.
  // Throws an error if index is out of range.
  removeSegment: function(index) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) throw new Error("Path has no segments.");
    if (index < 0) index = numSegments + index;
    if (index >= numSegments || index < 0) throw new Error("Index out of range.");
    var removedSegment = segments.splice(index, 1)[0];
    var previousSegment = removedSegment.previousSegment;
    var nextSegment = removedSegment.nextSegment;
    if (previousSegment) previousSegment.nextSegment = nextSegment;
    if (nextSegment) nextSegment.previousSegment = previousSegment;
    if (removedSegment.isSubpathStart && nextSegment) this.updateSubpathStartSegment(nextSegment);
  },
  // Replace the segment at `index` with `arg`.
  // Accepts negative indices, from `-1` to `-segments.length`.
  // Accepts one segment or an array of segments as argument.
  // Throws an error if path has no segments.
  // Throws an error if index is out of range.
  // Throws an error if argument is not a segment or an array of segments.
  replaceSegment: function(index, arg) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) throw new Error("Path has no segments.");
    if (index < 0) index = numSegments + index;
    if (index >= numSegments || index < 0) throw new Error("Index out of range.");
    var currentSegment;
    var replacedSegment = segments[index];
    var previousSegment = replacedSegment.previousSegment;
    var nextSegment = replacedSegment.nextSegment;
    var updateSubpathStart = replacedSegment.isSubpathStart;
    if (!Array.isArray(arg)) {
      if (!arg || !arg.isSegment) throw new Error("Segment required.");
      currentSegment = this.prepareSegment(arg, previousSegment, nextSegment);
      segments.splice(index, 1, currentSegment);
      if (updateSubpathStart && currentSegment.isSubpathStart) updateSubpathStart = false;
    } else {
      arg = arg.reduce(function(acc, val) {
        return acc.concat(val);
      }, []);
      if (!arg[0].isSegment) throw new Error("Segments required.");
      segments.splice(index, 1);
      var n = arg.length;
      for (var i = 0; i < n; i++) {
        var currentArg = arg[i];
        currentSegment = this.prepareSegment(currentArg, previousSegment, nextSegment);
        segments.splice(index + i, 0, currentSegment);
        previousSegment = currentSegment;
        if (updateSubpathStart && currentSegment.isSubpathStart) updateSubpathStart = false;
      }
    }
    if (updateSubpathStart && nextSegment) this.updateSubpathStartSegment(nextSegment);
  },
  round: function(precision) {
    var segments = this.segments;
    var numSegments = segments.length;
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      segment.round(precision);
    }
    return this;
  },
  scale: function(sx, sy, origin) {
    var segments = this.segments;
    var numSegments = segments.length;
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      segment.scale(sx, sy, origin);
    }
    return this;
  },
  segmentAt: function(ratio, opt) {
    var index = this.segmentIndexAt(ratio, opt);
    if (!index) return null;
    return this.getSegment(index);
  },
  // Accepts negative length.
  segmentAtLength: function(length2, opt) {
    var index = this.segmentIndexAtLength(length2, opt);
    if (!index) return null;
    return this.getSegment(index);
  },
  segmentIndexAt: function(ratio, opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    if (ratio < 0) ratio = 0;
    if (ratio > 1) ratio = 1;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var localOpt = {
      precision,
      segmentSubdivisions
    };
    var pathLength = this.length(localOpt);
    var length2 = pathLength * ratio;
    return this.segmentIndexAtLength(length2, localOpt);
  },
  // Accepts negative length.
  segmentIndexAtLength: function(length2, opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    var fromStart = true;
    if (length2 < 0) {
      fromStart = false;
      length2 = -length2;
    }
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var lastVisibleSegmentIndex = null;
    var l = 0;
    for (var i = 0; i < numSegments; i++) {
      var index = fromStart ? i : numSegments - 1 - i;
      var segment = segments[index];
      var subdivisions = segmentSubdivisions[index];
      var d = segment.length({
        precision,
        subdivisions
      });
      if (segment.isVisible) {
        if (length2 <= l + d) return index;
        lastVisibleSegmentIndex = index;
      }
      l += d;
    }
    return lastVisibleSegmentIndex;
  },
  // Returns a string that can be used to reconstruct the path.
  // Additional error checking compared to toString (must start with M segment).
  serialize: function() {
    if (!this.isValid()) throw new Error("Invalid path segments.");
    return this.toString();
  },
  // Returns tangent line at requested `ratio` between 0 and 1, with precision better than requested `opt.precision`; optionally using `opt.segmentSubdivisions` provided.
  tangentAt: function(ratio, opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    if (ratio < 0) ratio = 0;
    if (ratio > 1) ratio = 1;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var localOpt = {
      precision,
      segmentSubdivisions
    };
    var pathLength = this.length(localOpt);
    var length2 = pathLength * ratio;
    return this.tangentAtLength(length2, localOpt);
  },
  // Returns tangent line at requested `length`, with precision better than requested `opt.precision`; optionally using `opt.segmentSubdivisions` provided.
  // Accepts negative length.
  tangentAtLength: function(length2, opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    var fromStart = true;
    if (length2 < 0) {
      fromStart = false;
      length2 = -length2;
    }
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var lastValidSegment;
    var l = 0;
    for (var i = 0; i < numSegments; i++) {
      var index = fromStart ? i : numSegments - 1 - i;
      var segment = segments[index];
      var subdivisions = segmentSubdivisions[index];
      var d = segment.length({
        precision,
        subdivisions
      });
      if (segment.isDifferentiable()) {
        if (length2 <= l + d) {
          return segment.tangentAtLength((fromStart ? 1 : -1) * (length2 - l), {
            precision,
            subdivisions
          });
        }
        lastValidSegment = segment;
      }
      l += d;
    }
    if (lastValidSegment) {
      var t = fromStart ? 1 : 0;
      return lastValidSegment.tangentAtT(t);
    }
    return null;
  },
  // Private function.
  tangentAtT: function(t) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    var segmentIndex = t.segmentIndex;
    if (segmentIndex < 0) return segments[0].tangentAtT(0);
    if (segmentIndex >= numSegments) return segments[numSegments - 1].tangentAtT(1);
    var tValue = t.value;
    if (tValue < 0) tValue = 0;
    else if (tValue > 1) tValue = 1;
    return segments[segmentIndex].tangentAtT(tValue);
  },
  toPoints: function(opt) {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    opt = opt || {};
    var precision = opt.precision === void 0 ? this.PRECISION : opt.precision;
    var segmentSubdivisions = opt.segmentSubdivisions === void 0 ? this.getSegmentSubdivisions({
      precision
    }) : opt.segmentSubdivisions;
    var points = [];
    var partialPoints = [];
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      if (segment.isVisible) {
        var currentSegmentSubdivisions = segmentSubdivisions[i];
        if (currentSegmentSubdivisions.length > 0) {
          var subdivisionPoints = currentSegmentSubdivisions.map(function(curve2) {
            return curve2.start;
          });
          Array.prototype.push.apply(partialPoints, subdivisionPoints);
        } else {
          partialPoints.push(segment.start);
        }
      } else if (partialPoints.length > 0) {
        partialPoints.push(segments[i - 1].end);
        points.push(partialPoints);
        partialPoints = [];
      }
    }
    if (partialPoints.length > 0) {
      partialPoints.push(this.end);
      points.push(partialPoints);
    }
    return points;
  },
  toPolylines: function(opt) {
    var polylines = [];
    var points = this.toPoints(opt);
    if (!points) return null;
    for (var i = 0, n = points.length; i < n; i++) {
      polylines.push(new Polyline(points[i]));
    }
    return polylines;
  },
  toString: function() {
    var segments = this.segments;
    var numSegments = segments.length;
    var pathData = "";
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      pathData += segment.serialize() + " ";
    }
    return pathData.trim();
  },
  translate: function(tx, ty) {
    var segments = this.segments;
    var numSegments = segments.length;
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      segment.translate(tx, ty);
    }
    return this;
  },
  // Helper method for updating subpath start of segments, starting with the one provided.
  updateSubpathStartSegment: function(segment) {
    var previousSegment = segment.previousSegment;
    while (segment && !segment.isSubpathStart) {
      if (previousSegment) segment.subpathStartSegment = previousSegment.subpathStartSegment;
      else segment.subpathStartSegment = null;
      previousSegment = segment;
      segment = segment.nextSegment;
    }
  },
  // If the path is not valid, insert M 0 0 at the beginning.
  // Path with no segments is considered valid, so nothing is inserted.
  validate: function() {
    if (!this.isValid()) this.insertSegment(0, Path.createSegment("M", 0, 0));
    return this;
  }
};
Object.defineProperty(Path.prototype, "start", {
  // Getter for the first visible endpoint of the path.
  configurable: true,
  enumerable: true,
  get: function() {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    for (var i = 0; i < numSegments; i++) {
      var segment = segments[i];
      if (segment.isVisible) return segment.start;
    }
    return segments[numSegments - 1].end;
  }
});
Object.defineProperty(Path.prototype, "end", {
  // Getter for the last visible endpoint of the path.
  configurable: true,
  enumerable: true,
  get: function() {
    var segments = this.segments;
    var numSegments = segments.length;
    if (numSegments === 0) return null;
    for (var i = numSegments - 1; i >= 0; i--) {
      var segment = segments[i];
      if (segment.isVisible) return segment.end;
    }
    return segments[numSegments - 1].end;
  }
});
function applyToNew(constructor, argsArray) {
  argsArray.unshift(null);
  return new (Function.prototype.bind.apply(constructor, argsArray))();
}
var segmentPrototype = {
  // virtual
  bbox: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  clone: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  closestPoint: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  closestPointLength: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  closestPointNormalizedLength: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // Redirect calls to closestPointNormalizedLength() function if closestPointT() is not defined for segment.
  closestPointT: function(p) {
    if (this.closestPointNormalizedLength) return this.closestPointNormalizedLength(p);
    throw new Error("Neither closestPointT() nor closestPointNormalizedLength() function is implemented.");
  },
  // virtual
  closestPointTangent: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  divideAt: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  divideAtLength: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // Redirect calls to divideAt() function if divideAtT() is not defined for segment.
  divideAtT: function(t) {
    if (this.divideAt) return this.divideAt(t);
    throw new Error("Neither divideAtT() nor divideAt() function is implemented.");
  },
  // virtual
  equals: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  getSubdivisions: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  isDifferentiable: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  isSegment: true,
  isSubpathStart: false,
  // true for Moveto segments
  isVisible: true,
  // false for Moveto segments
  // virtual
  length: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // Return a fraction of result of length() function if lengthAtT() is not defined for segment.
  lengthAtT: function(t) {
    if (t <= 0) return 0;
    var length2 = this.length();
    if (t >= 1) return length2;
    return length2 * t;
  },
  nextSegment: null,
  // needed for subpath start segment updating
  // virtual
  pointAt: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  pointAtLength: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // Redirect calls to pointAt() function if pointAtT() is not defined for segment.
  pointAtT: function(t) {
    if (this.pointAt) return this.pointAt(t);
    throw new Error("Neither pointAtT() nor pointAt() function is implemented.");
  },
  previousSegment: null,
  // needed to get segment start property
  // virtual
  round: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  subpathStartSegment: null,
  // needed to get Closepath segment end property
  // virtual
  scale: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  serialize: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  tangentAt: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  tangentAtLength: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // Redirect calls to tangentAt() function if tangentAtT() is not defined for segment.
  tangentAtT: function(t) {
    if (this.tangentAt) return this.tangentAt(t);
    throw new Error("Neither tangentAtT() nor tangentAt() function is implemented.");
  },
  // virtual
  toString: function() {
    throw new Error("Declaration missing for virtual function.");
  },
  // virtual
  translate: function() {
    throw new Error("Declaration missing for virtual function.");
  }
};
Object.defineProperty(segmentPrototype, "end", {
  configurable: true,
  enumerable: true,
  writable: true
});
Object.defineProperty(segmentPrototype, "start", {
  // get a reference to the end point of previous segment
  configurable: true,
  enumerable: true,
  get: function() {
    if (!this.previousSegment) throw new Error("Missing previous segment. (This segment cannot be the first segment of a path; OR segment has not yet been added to a path.)");
    return this.previousSegment.end;
  }
});
Object.defineProperty(segmentPrototype, "type", {
  configurable: true,
  enumerable: true,
  get: function() {
    throw new Error("Bad segment declaration. No type specified.");
  }
});
var Lineto = function() {
  var args = [];
  var n = arguments.length;
  for (var i = 0; i < n; i++) {
    args.push(arguments[i]);
  }
  if (!(this instanceof Lineto)) {
    return applyToNew(Lineto, args);
  }
  if (n === 0) {
    throw new Error("Lineto constructor expects a line, 1 point, or 2 coordinates (none provided).");
  }
  var outputArray;
  if (args[0] instanceof Line) {
    if (n === 1) {
      this.end = args[0].end.clone();
      return this;
    } else {
      throw new Error("Lineto constructor expects a line, 1 point, or 2 coordinates (" + n + " lines provided).");
    }
  } else if (typeof args[0] === "string" || typeof args[0] === "number") {
    if (n === 2) {
      this.end = new Point(+args[0], +args[1]);
      return this;
    } else if (n < 2) {
      throw new Error("Lineto constructor expects a line, 1 point, or 2 coordinates (" + n + " coordinates provided).");
    } else {
      var segmentCoords;
      outputArray = [];
      for (i = 0; i < n; i += 2) {
        segmentCoords = args.slice(i, i + 2);
        outputArray.push(applyToNew(Lineto, segmentCoords));
      }
      return outputArray;
    }
  } else {
    if (n === 1) {
      this.end = new Point(args[0]);
      return this;
    } else {
      var segmentPoint;
      outputArray = [];
      for (i = 0; i < n; i += 1) {
        segmentPoint = args[i];
        outputArray.push(new Lineto(segmentPoint));
      }
      return outputArray;
    }
  }
};
var linetoPrototype = {
  clone: function() {
    return new Lineto(this.end);
  },
  divideAt: function(ratio) {
    var line3 = new Line(this.start, this.end);
    var divided = line3.divideAt(ratio);
    return [new Lineto(divided[0]), new Lineto(divided[1])];
  },
  divideAtLength: function(length2) {
    var line3 = new Line(this.start, this.end);
    var divided = line3.divideAtLength(length2);
    return [new Lineto(divided[0]), new Lineto(divided[1])];
  },
  getSubdivisions: function() {
    return [];
  },
  isDifferentiable: function() {
    if (!this.previousSegment) return false;
    return !this.start.equals(this.end);
  },
  round: function(precision) {
    this.end.round(precision);
    return this;
  },
  scale: function(sx, sy, origin) {
    this.end.scale(sx, sy, origin);
    return this;
  },
  serialize: function() {
    var end = this.end;
    return this.type + " " + end.x + " " + end.y;
  },
  toString: function() {
    return this.type + " " + this.start + " " + this.end;
  },
  translate: function(tx, ty) {
    this.end.translate(tx, ty);
    return this;
  }
};
Object.defineProperty(linetoPrototype, "type", {
  configurable: true,
  enumerable: true,
  value: "L"
});
Lineto.prototype = extend(segmentPrototype, Line.prototype, linetoPrototype);
var Curveto = function() {
  var args = [];
  var n = arguments.length;
  for (var i = 0; i < n; i++) {
    args.push(arguments[i]);
  }
  if (!(this instanceof Curveto)) {
    return applyToNew(Curveto, args);
  }
  if (n === 0) {
    throw new Error("Curveto constructor expects a curve, 3 points, or 6 coordinates (none provided).");
  }
  var outputArray;
  if (args[0] instanceof Curve) {
    if (n === 1) {
      this.controlPoint1 = args[0].controlPoint1.clone();
      this.controlPoint2 = args[0].controlPoint2.clone();
      this.end = args[0].end.clone();
      return this;
    } else {
      throw new Error("Curveto constructor expects a curve, 3 points, or 6 coordinates (" + n + " curves provided).");
    }
  } else if (typeof args[0] === "string" || typeof args[0] === "number") {
    if (n === 6) {
      this.controlPoint1 = new Point(+args[0], +args[1]);
      this.controlPoint2 = new Point(+args[2], +args[3]);
      this.end = new Point(+args[4], +args[5]);
      return this;
    } else if (n < 6) {
      throw new Error("Curveto constructor expects a curve, 3 points, or 6 coordinates (" + n + " coordinates provided).");
    } else {
      var segmentCoords;
      outputArray = [];
      for (i = 0; i < n; i += 6) {
        segmentCoords = args.slice(i, i + 6);
        outputArray.push(applyToNew(Curveto, segmentCoords));
      }
      return outputArray;
    }
  } else {
    if (n === 3) {
      this.controlPoint1 = new Point(args[0]);
      this.controlPoint2 = new Point(args[1]);
      this.end = new Point(args[2]);
      return this;
    } else if (n < 3) {
      throw new Error("Curveto constructor expects a curve, 3 points, or 6 coordinates (" + n + " points provided).");
    } else {
      var segmentPoints;
      outputArray = [];
      for (i = 0; i < n; i += 3) {
        segmentPoints = args.slice(i, i + 3);
        outputArray.push(applyToNew(Curveto, segmentPoints));
      }
      return outputArray;
    }
  }
};
var curvetoPrototype = {
  clone: function() {
    return new Curveto(this.controlPoint1, this.controlPoint2, this.end);
  },
  divideAt: function(ratio, opt) {
    var curve2 = new Curve(this.start, this.controlPoint1, this.controlPoint2, this.end);
    var divided = curve2.divideAt(ratio, opt);
    return [new Curveto(divided[0]), new Curveto(divided[1])];
  },
  divideAtLength: function(length2, opt) {
    var curve2 = new Curve(this.start, this.controlPoint1, this.controlPoint2, this.end);
    var divided = curve2.divideAtLength(length2, opt);
    return [new Curveto(divided[0]), new Curveto(divided[1])];
  },
  divideAtT: function(t) {
    var curve2 = new Curve(this.start, this.controlPoint1, this.controlPoint2, this.end);
    var divided = curve2.divideAtT(t);
    return [new Curveto(divided[0]), new Curveto(divided[1])];
  },
  isDifferentiable: function() {
    if (!this.previousSegment) return false;
    var start = this.start;
    var control1 = this.controlPoint1;
    var control2 = this.controlPoint2;
    var end = this.end;
    return !(start.equals(control1) && control1.equals(control2) && control2.equals(end));
  },
  round: function(precision) {
    this.controlPoint1.round(precision);
    this.controlPoint2.round(precision);
    this.end.round(precision);
    return this;
  },
  scale: function(sx, sy, origin) {
    this.controlPoint1.scale(sx, sy, origin);
    this.controlPoint2.scale(sx, sy, origin);
    this.end.scale(sx, sy, origin);
    return this;
  },
  serialize: function() {
    var c1 = this.controlPoint1;
    var c2 = this.controlPoint2;
    var end = this.end;
    return this.type + " " + c1.x + " " + c1.y + " " + c2.x + " " + c2.y + " " + end.x + " " + end.y;
  },
  toString: function() {
    return this.type + " " + this.start + " " + this.controlPoint1 + " " + this.controlPoint2 + " " + this.end;
  },
  translate: function(tx, ty) {
    this.controlPoint1.translate(tx, ty);
    this.controlPoint2.translate(tx, ty);
    this.end.translate(tx, ty);
    return this;
  }
};
Object.defineProperty(curvetoPrototype, "type", {
  configurable: true,
  enumerable: true,
  value: "C"
});
Curveto.prototype = extend(segmentPrototype, Curve.prototype, curvetoPrototype);
var Moveto = function() {
  var args = [];
  var n = arguments.length;
  for (var i = 0; i < n; i++) {
    args.push(arguments[i]);
  }
  if (!(this instanceof Moveto)) {
    return applyToNew(Moveto, args);
  }
  if (n === 0) {
    throw new Error("Moveto constructor expects a line, a curve, 1 point, or 2 coordinates (none provided).");
  }
  var outputArray;
  if (args[0] instanceof Line) {
    if (n === 1) {
      this.end = args[0].end.clone();
      return this;
    } else {
      throw new Error("Moveto constructor expects a line, a curve, 1 point, or 2 coordinates (" + n + " lines provided).");
    }
  } else if (args[0] instanceof Curve) {
    if (n === 1) {
      this.end = args[0].end.clone();
      return this;
    } else {
      throw new Error("Moveto constructor expects a line, a curve, 1 point, or 2 coordinates (" + n + " curves provided).");
    }
  } else if (typeof args[0] === "string" || typeof args[0] === "number") {
    if (n === 2) {
      this.end = new Point(+args[0], +args[1]);
      return this;
    } else if (n < 2) {
      throw new Error("Moveto constructor expects a line, a curve, 1 point, or 2 coordinates (" + n + " coordinates provided).");
    } else {
      var segmentCoords;
      outputArray = [];
      for (i = 0; i < n; i += 2) {
        segmentCoords = args.slice(i, i + 2);
        if (i === 0) outputArray.push(applyToNew(Moveto, segmentCoords));
        else outputArray.push(applyToNew(Lineto, segmentCoords));
      }
      return outputArray;
    }
  } else {
    if (n === 1) {
      this.end = new Point(args[0]);
      return this;
    } else {
      var segmentPoint;
      outputArray = [];
      for (i = 0; i < n; i += 1) {
        segmentPoint = args[i];
        if (i === 0) outputArray.push(new Moveto(segmentPoint));
        else outputArray.push(new Lineto(segmentPoint));
      }
      return outputArray;
    }
  }
};
var movetoPrototype = {
  bbox: function() {
    return null;
  },
  clone: function() {
    return new Moveto(this.end);
  },
  closestPoint: function() {
    return this.end.clone();
  },
  closestPointNormalizedLength: function() {
    return 0;
  },
  closestPointLength: function() {
    return 0;
  },
  closestPointT: function() {
    return 1;
  },
  closestPointTangent: function() {
    return null;
  },
  divideAt: function() {
    return [this.clone(), this.clone()];
  },
  divideAtLength: function() {
    return [this.clone(), this.clone()];
  },
  equals: function(m) {
    return this.end.equals(m.end);
  },
  getSubdivisions: function() {
    return [];
  },
  isDifferentiable: function() {
    return false;
  },
  isSubpathStart: true,
  isVisible: false,
  length: function() {
    return 0;
  },
  lengthAtT: function() {
    return 0;
  },
  pointAt: function() {
    return this.end.clone();
  },
  pointAtLength: function() {
    return this.end.clone();
  },
  pointAtT: function() {
    return this.end.clone();
  },
  round: function(precision) {
    this.end.round(precision);
    return this;
  },
  scale: function(sx, sy, origin) {
    this.end.scale(sx, sy, origin);
    return this;
  },
  serialize: function() {
    var end = this.end;
    return this.type + " " + end.x + " " + end.y;
  },
  tangentAt: function() {
    return null;
  },
  tangentAtLength: function() {
    return null;
  },
  tangentAtT: function() {
    return null;
  },
  toString: function() {
    return this.type + " " + this.end;
  },
  translate: function(tx, ty) {
    this.end.translate(tx, ty);
    return this;
  }
};
Object.defineProperty(movetoPrototype, "start", {
  configurable: true,
  enumerable: true,
  get: function() {
    throw new Error("Illegal access. Moveto segments should not need a start property.");
  }
});
Object.defineProperty(movetoPrototype, "type", {
  configurable: true,
  enumerable: true,
  value: "M"
});
Moveto.prototype = extend(segmentPrototype, movetoPrototype);
var Closepath = function() {
  var args = [];
  var n = arguments.length;
  for (var i = 0; i < n; i++) {
    args.push(arguments[i]);
  }
  if (!(this instanceof Closepath)) {
    return applyToNew(Closepath, args);
  }
  if (n > 0) {
    throw new Error("Closepath constructor expects no arguments.");
  }
  return this;
};
var closepathPrototype = {
  clone: function() {
    return new Closepath();
  },
  divideAt: function(ratio) {
    var line3 = new Line(this.start, this.end);
    var divided = line3.divideAt(ratio);
    return [
      // if we didn't actually cut into the segment, first divided part can stay as Z
      divided[1].isDifferentiable() ? new Lineto(divided[0]) : this.clone(),
      new Lineto(divided[1])
    ];
  },
  divideAtLength: function(length2) {
    var line3 = new Line(this.start, this.end);
    var divided = line3.divideAtLength(length2);
    return [
      // if we didn't actually cut into the segment, first divided part can stay as Z
      divided[1].isDifferentiable() ? new Lineto(divided[0]) : this.clone(),
      new Lineto(divided[1])
    ];
  },
  getSubdivisions: function() {
    return [];
  },
  isDifferentiable: function() {
    if (!this.previousSegment || !this.subpathStartSegment) return false;
    return !this.start.equals(this.end);
  },
  round: function() {
    return this;
  },
  scale: function() {
    return this;
  },
  serialize: function() {
    return this.type;
  },
  toString: function() {
    return this.type + " " + this.start + " " + this.end;
  },
  translate: function() {
    return this;
  }
};
Object.defineProperty(closepathPrototype, "end", {
  // get a reference to the end point of subpath start segment
  configurable: true,
  enumerable: true,
  get: function() {
    if (!this.subpathStartSegment) throw new Error("Missing subpath start segment. (This segment needs a subpath start segment (e.g. Moveto); OR segment has not yet been added to a path.)");
    return this.subpathStartSegment.end;
  }
});
Object.defineProperty(closepathPrototype, "type", {
  configurable: true,
  enumerable: true,
  value: "Z"
});
Closepath.prototype = extend(segmentPrototype, Line.prototype, closepathPrototype);
var segmentTypes = Path.segmentTypes = {
  L: Lineto,
  C: Curveto,
  M: Moveto,
  Z: Closepath,
  z: Closepath
};
Path.regexSupportedData = new RegExp("^[\\s\\d" + Object.keys(segmentTypes).join("") + ",.]*$");
Path.isDataSupported = function(data) {
  if (typeof data !== "string") return false;
  return this.regexSupportedData.test(data);
};

// node_modules/jointjs/src/g/bezier.mjs
var bezier = {
  // Cubic Bezier curve path through points.
  // @deprecated
  // @param {array} points Array of points through which the smooth line will go.
  // @return {array} SVG Path commands as an array
  curveThroughPoints: function(points) {
    console.warn("deprecated");
    return new Path(Curve.throughPoints(points)).serialize();
  },
  // Get open-ended Bezier Spline Control Points.
  // @deprecated
  // @param knots Input Knot Bezier spline points (At least two points!).
  // @param firstControlPoints Output First Control points. Array of knots.length - 1 length.
  // @param secondControlPoints Output Second Control points. Array of knots.length - 1 length.
  getCurveControlPoints: function(knots) {
    console.warn("deprecated");
    var firstControlPoints = [];
    var secondControlPoints = [];
    var n = knots.length - 1;
    var i;
    if (n == 1) {
      firstControlPoints[0] = new Point((2 * knots[0].x + knots[1].x) / 3, (2 * knots[0].y + knots[1].y) / 3);
      secondControlPoints[0] = new Point(2 * firstControlPoints[0].x - knots[0].x, 2 * firstControlPoints[0].y - knots[0].y);
      return [firstControlPoints, secondControlPoints];
    }
    var rhs = [];
    for (i = 1; i < n - 1; i++) {
      rhs[i] = 4 * knots[i].x + 2 * knots[i + 1].x;
    }
    rhs[0] = knots[0].x + 2 * knots[1].x;
    rhs[n - 1] = (8 * knots[n - 1].x + knots[n].x) / 2;
    var x = this.getFirstControlPoints(rhs);
    for (i = 1; i < n - 1; ++i) {
      rhs[i] = 4 * knots[i].y + 2 * knots[i + 1].y;
    }
    rhs[0] = knots[0].y + 2 * knots[1].y;
    rhs[n - 1] = (8 * knots[n - 1].y + knots[n].y) / 2;
    var y = this.getFirstControlPoints(rhs);
    for (i = 0; i < n; i++) {
      firstControlPoints.push(new Point(x[i], y[i]));
      if (i < n - 1) {
        secondControlPoints.push(new Point(2 * knots[i + 1].x - x[i + 1], 2 * knots[i + 1].y - y[i + 1]));
      } else {
        secondControlPoints.push(new Point((knots[n].x + x[n - 1]) / 2, (knots[n].y + y[n - 1]) / 2));
      }
    }
    return [firstControlPoints, secondControlPoints];
  },
  // Divide a Bezier curve into two at point defined by value 't' <0,1>.
  // Using deCasteljau algorithm. http://math.stackexchange.com/a/317867
  // @deprecated
  // @param control points (start, control start, control end, end)
  // @return a function that accepts t and returns 2 curves.
  getCurveDivider: function(p0, p1, p2, p3) {
    console.warn("deprecated");
    var curve2 = new Curve(p0, p1, p2, p3);
    return function divideCurve(t) {
      var divided = curve2.divide(t);
      return [{
        p0: divided[0].start,
        p1: divided[0].controlPoint1,
        p2: divided[0].controlPoint2,
        p3: divided[0].end
      }, {
        p0: divided[1].start,
        p1: divided[1].controlPoint1,
        p2: divided[1].controlPoint2,
        p3: divided[1].end
      }];
    };
  },
  // Solves a tridiagonal system for one of coordinates (x or y) of first Bezier control points.
  // @deprecated
  // @param rhs Right hand side vector.
  // @return Solution vector.
  getFirstControlPoints: function(rhs) {
    console.warn("deprecated");
    var n = rhs.length;
    var x = [];
    var tmp = [];
    var b = 2;
    x[0] = rhs[0] / b;
    for (var i = 1; i < n; i++) {
      tmp[i] = 1 / b;
      b = (i < n - 1 ? 4 : 3.5) - tmp[i];
      x[i] = (rhs[i] - x[i - 1]) / b;
    }
    for (i = 1; i < n; i++) {
      x[n - i - 1] -= tmp[n - i] * x[n - i];
    }
    return x;
  },
  // Solves an inversion problem -- Given the (x, y) coordinates of a point which lies on
  // a parametric curve x = x(t)/w(t), y = y(t)/w(t), ﬁnd the parameter value t
  // which corresponds to that point.
  // @deprecated
  // @param control points (start, control start, control end, end)
  // @return a function that accepts a point and returns t.
  getInversionSolver: function(p0, p1, p2, p3) {
    console.warn("deprecated");
    var curve2 = new Curve(p0, p1, p2, p3);
    return function solveInversion(p) {
      return curve2.closestPointT(p);
    };
  }
};

// node_modules/jointjs/src/g/polygon.mjs
var Polygon = function(points) {
  if (!(this instanceof Polygon)) {
    return new Polygon(points);
  }
  if (typeof points === "string") {
    return new Polygon.parse(points);
  }
  this.points = Array.isArray(points) ? points.map(Point) : [];
};
Polygon.parse = function(svgString) {
  return new Polygon(parsePoints(svgString));
};
Polygon.fromRect = function(rect2) {
  return new Polygon([rect2.topLeft(), rect2.topRight(), rect2.bottomRight(), rect2.bottomLeft()]);
};
Polygon.prototype = extend(Polyline.prototype, {
  type: types.Polygon,
  clone: function() {
    return new Polygon(clonePoints(this.points));
  },
  convexHull: function() {
    return new Polygon(convexHull(this.points));
  },
  lengthPoints: function() {
    const {
      start,
      end,
      points
    } = this;
    if (points.length <= 1 || start.equals(end)) return points;
    return [...points, start.clone()];
  }
});

// node_modules/jointjs/src/g/intersection.mjs
var intersection_exports = {};
__export(intersection_exports, {
  ellipseWithEllipse: () => ellipseWithEllipse,
  ellipseWithLine: () => ellipseWithLine,
  exists: () => exists,
  lineWithLine: () => lineWithLine,
  pathWithEllipse: () => pathWithEllipse,
  pathWithLine: () => pathWithLine,
  pathWithPath: () => pathWithPath,
  pathWithPolygon: () => pathWithPolygon,
  pathWithPolyline: () => pathWithPolyline,
  pathWithRect: () => pathWithRect,
  polygonWithEllipse: () => polygonWithEllipse,
  polygonWithLine: () => polygonWithLine,
  polygonWithPolygon: () => polygonWithPolygon,
  polygonWithPolyline: () => polygonWithPolyline,
  polygonWithRect: () => polygonWithRect,
  polylineWithEllipse: () => polylineWithEllipse,
  polylineWithLine: () => polylineWithLine,
  polylineWithPolyline: () => polylineWithPolyline,
  polylineWithRect: () => polylineWithRect,
  rectWithEllipse: () => rectWithEllipse,
  rectWithLine: () => rectWithLine,
  rectWithRect: () => rectWithRect
});
function exists(shape1, shape2, shape1opt, shape2opt) {
  switch (shape1.type) {
    case types.Line: {
      switch (shape2.type) {
        case types.Line: {
          return lineWithLine(shape1, shape2);
        }
      }
      break;
    }
    case types.Ellipse: {
      switch (shape2.type) {
        case types.Line: {
          return ellipseWithLine(shape1, shape2);
        }
        case types.Ellipse: {
          return ellipseWithEllipse(shape1, shape2);
        }
      }
      break;
    }
    case types.Rect: {
      switch (shape2.type) {
        case types.Line: {
          return rectWithLine(shape1, shape2);
        }
        case types.Ellipse: {
          return rectWithEllipse(shape1, shape2);
        }
        case types.Rect: {
          return rectWithRect(shape1, shape2);
        }
      }
      break;
    }
    case types.Polyline: {
      switch (shape2.type) {
        case types.Line: {
          return polylineWithLine(shape1, shape2);
        }
        case types.Ellipse: {
          return polylineWithEllipse(shape1, shape2);
        }
        case types.Rect: {
          return polylineWithRect(shape1, shape2);
        }
        case types.Polyline: {
          return polylineWithPolyline(shape1, shape2);
        }
      }
      break;
    }
    case types.Polygon: {
      switch (shape2.type) {
        case types.Line: {
          return polygonWithLine(shape1, shape2);
        }
        case types.Ellipse: {
          return polygonWithEllipse(shape1, shape2);
        }
        case types.Rect: {
          return polygonWithRect(shape1, shape2);
        }
        case types.Polyline: {
          return polygonWithPolyline(shape1, shape2);
        }
        case types.Polygon: {
          return polygonWithPolygon(shape1, shape2);
        }
      }
      break;
    }
    case types.Path: {
      switch (shape2.type) {
        case types.Line: {
          return pathWithLine(shape1, shape2, shape1opt);
        }
        case types.Ellipse: {
          return pathWithEllipse(shape1, shape2, shape1opt);
        }
        case types.Rect: {
          return pathWithRect(shape1, shape2, shape1opt);
        }
        case types.Polyline: {
          return pathWithPolyline(shape1, shape2, shape1opt);
        }
        case types.Polygon: {
          return pathWithPolygon(shape1, shape2, shape1opt);
        }
        case types.Path: {
          return pathWithPath(shape1, shape2, shape1opt, shape2opt);
        }
      }
      break;
    }
  }
  switch (shape2.type) {
    case types.Ellipse:
    case types.Rect:
    case types.Polyline:
    case types.Polygon:
    case types.Path: {
      return exists(shape2, shape1, shape2opt, shape1opt);
    }
    default: {
      throw Error(`The intersection for ${shape1} and ${shape2} could not be found.`);
    }
  }
}
function lineWithLine(line1, line22) {
  const x1 = line1.start.x;
  const y1 = line1.start.y;
  const x2 = line1.end.x;
  const y2 = line1.end.y;
  const x3 = line22.start.x;
  const y3 = line22.start.y;
  const x4 = line22.end.x;
  const y4 = line22.end.y;
  const s1x = x2 - x1;
  const s1y = y2 - y1;
  const s2x = x4 - x3;
  const s2y = y4 - y3;
  const s3x = x1 - x3;
  const s3y = y1 - y3;
  const p = s1x * s2y - s2x * s1y;
  const s = (s1x * s3y - s1y * s3x) / p;
  const t = (s2x * s3y - s2y * s3x) / p;
  return s >= 0 && s <= 1 && t >= 0 && t <= 1;
}
function ellipseWithLine(ellipse3, line3) {
  const rex = ellipse3.a;
  const rey = ellipse3.b;
  const xe = ellipse3.x;
  const ye = ellipse3.y;
  const x1 = line3.start.x - xe;
  const x2 = line3.end.x - xe;
  const y1 = line3.start.y - ye;
  const y2 = line3.end.y - ye;
  const rex_2 = rex * rex;
  const rey_2 = rey * rey;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const A = dx * dx / rex_2 + dy * dy / rey_2;
  const B = 2 * x1 * dx / rex_2 + 2 * y1 * dy / rey_2;
  const C = x1 * x1 / rex_2 + y1 * y1 / rey_2 - 1;
  const D = B * B - 4 * A * C;
  if (D === 0) {
    const t = -B / 2 / A;
    return t >= 0 && t <= 1;
  } else if (D > 0) {
    const sqrt4 = Math.sqrt(D);
    const t1 = (-B + sqrt4) / 2 / A;
    const t2 = (-B - sqrt4) / 2 / A;
    return t1 >= 0 && t1 <= 1 || t2 >= 0 && t2 <= 1;
  }
  return false;
}
function ellipseWithEllipse(ellipse1, ellipse22) {
  return _ellipsesIntersection(ellipse1, 0, ellipse22, 0);
}
function rectWithLine(rect2, line3) {
  const {
    start,
    end
  } = line3;
  const {
    x,
    y,
    width,
    height
  } = rect2;
  if (start.x > x + width && end.x > x + width || start.x < x && end.x < x || start.y > y + height && end.y > y + height || start.y < y && end.y < y) {
    return false;
  }
  if (rect2.containsPoint(line3.start) || rect2.containsPoint(line3.end)) {
    return true;
  }
  return lineWithLine(rect2.topLine(), line3) || lineWithLine(rect2.rightLine(), line3) || lineWithLine(rect2.bottomLine(), line3) || lineWithLine(rect2.leftLine(), line3);
}
function rectWithEllipse(rect2, ellipse3) {
  if (!rectWithRect(rect2, Rect.fromEllipse(ellipse3))) return false;
  return polygonWithEllipse(Polygon.fromRect(rect2), ellipse3);
}
function rectWithRect(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
}
function polylineWithLine(polyline, line3) {
  return _polylineWithLine(polyline, line3, {
    interior: false
  });
}
function polylineWithEllipse(polyline, ellipse3) {
  return _polylineWithEllipse(polyline, ellipse3, {
    interior: false
  });
}
function polylineWithRect(polyline, rect2) {
  return _polylineWithRect(polyline, rect2, {
    interior: false
  });
}
function polylineWithPolyline(polyline1, polyline2) {
  return _polylineWithPolyline(polyline1, polyline2, {
    interior: false
  });
}
function polygonWithLine(polygon, line3) {
  return _polylineWithLine(polygon, line3, {
    interior: true
  });
}
function polygonWithEllipse(polygon, ellipse3) {
  return _polylineWithEllipse(polygon, ellipse3, {
    interior: true
  });
}
function polygonWithRect(polygon, rect2) {
  return _polylineWithRect(polygon, rect2, {
    interior: true
  });
}
function polygonWithPolyline(polygon, polyline) {
  return _polylineWithPolyline(polygon, polyline, {
    interior: true
  });
}
function polygonWithPolygon(polygon1, polygon2) {
  return _polylineWithPolygon(polygon1, polygon2, {
    interior: true
  });
}
function pathWithLine(path, line3, pathOpt) {
  return path.getSubpaths().some((subpath) => {
    const [polyline] = subpath.toPolylines(pathOpt);
    const {
      type
    } = subpath.getSegment(-1);
    if (type === "Z") {
      return polygonWithLine(polyline, line3);
    } else {
      return polylineWithLine(polyline, line3);
    }
  });
}
function pathWithEllipse(path, ellipse3, pathOpt) {
  return path.getSubpaths().some((subpath) => {
    const [polyline] = subpath.toPolylines(pathOpt);
    const {
      type
    } = subpath.getSegment(-1);
    if (type === "Z") {
      return polygonWithEllipse(polyline, ellipse3);
    } else {
      return polylineWithEllipse(polyline, ellipse3);
    }
  });
}
function pathWithRect(path, rect2, pathOpt) {
  return pathWithPolygon(path, Polygon.fromRect(rect2), pathOpt);
}
function pathWithPolyline(path, polyline, pathOpt) {
  return _pathWithPolyline(path, polyline, pathOpt, {
    interior: false
  });
}
function pathWithPolygon(path, polygon, pathOpt) {
  return _pathWithPolyline(path, polygon, pathOpt, {
    interior: true
  });
}
function pathWithPath(path1, path2, pathOpt1, pathOpt2) {
  return path1.getSubpaths().some((subpath) => {
    const [polyline1] = subpath.toPolylines(pathOpt1);
    const {
      type
    } = subpath.getSegment(-1);
    if (type === "Z") {
      return pathWithPolygon(path2, polyline1, pathOpt2);
    } else {
      return pathWithPolyline(path2, polyline1, pathOpt2);
    }
  });
}
function _polylineWithLine(polyline, line3, opt = {}) {
  const {
    interior = false
  } = opt;
  let thisPoints;
  if (interior) {
    if (polyline.containsPoint(line3.start)) {
      return true;
    }
    const {
      start,
      end,
      points
    } = polyline;
    thisPoints = end.equals(start) ? points : [...points, start];
  } else {
    thisPoints = polyline.points;
  }
  const {
    length: length2
  } = thisPoints;
  const segment = new Line();
  for (let i = 0; i < length2 - 1; i++) {
    segment.start = thisPoints[i];
    segment.end = thisPoints[i + 1];
    if (lineWithLine(line3, segment)) {
      return true;
    }
  }
  return false;
}
function _polylineWithEllipse(polyline, ellipse3, opt = {}) {
  const {
    start,
    end,
    points
  } = polyline;
  if (ellipse3.containsPoint(start)) {
    return true;
  }
  let thisPoints;
  const {
    interior = false
  } = opt;
  if (interior) {
    if (polyline.containsPoint(ellipse3.center())) {
      return true;
    }
    thisPoints = end.equals(start) ? points : [...points, start];
  } else {
    thisPoints = points;
  }
  const {
    length: length2
  } = thisPoints;
  const segment = new Line();
  for (let i = 0; i < length2 - 1; i++) {
    segment.start = thisPoints[i];
    segment.end = thisPoints[i + 1];
    if (ellipseWithLine(ellipse3, segment)) {
      return true;
    }
  }
  return false;
}
function _polylineWithRect(polyline, rect2, opt) {
  const polygon = Polygon.fromRect(rect2);
  return _polylineWithPolygon(polyline, polygon, opt);
}
function _pathWithPolyline(path, polyline1, pathOpt, opt) {
  return path.getSubpaths().some((subpath) => {
    const [polyline2] = subpath.toPolylines(pathOpt);
    const {
      type
    } = subpath.getSegment(-1);
    if (type === "Z") {
      return _polylineWithPolygon(polyline1, polyline2, opt);
    } else {
      return _polylineWithPolyline(polyline1, polyline2, opt);
    }
  });
}
function _polylineWithPolyline(polyline1, polyline2, opt = {}) {
  const {
    interior = false
  } = opt;
  let thisPolyline;
  if (interior) {
    const {
      start
    } = polyline2;
    if (polyline1.containsPoint(start)) {
      return true;
    }
    thisPolyline = polyline1.clone().close();
  } else {
    thisPolyline = polyline1;
  }
  const otherPoints = polyline2.points;
  const {
    length: length2
  } = otherPoints;
  const segment = new Line();
  for (let i = 0; i < length2 - 1; i++) {
    segment.start = otherPoints[i];
    segment.end = otherPoints[i + 1];
    if (polylineWithLine(thisPolyline, segment)) {
      return true;
    }
  }
  return false;
}
function _polylineWithPolygon(polyline, polygon, opt) {
  return polygon.containsPoint(polyline.start) || _polylineWithPolyline(polyline, polygon.clone().close(), opt);
}
function _ellipsesIntersection(e1, w1, e2, w2) {
  const {
    cos: cos4,
    sin: sin4
  } = Math;
  const sinW1 = sin4(w1);
  const cosW1 = cos4(w1);
  const sinW2 = sin4(w2);
  const cosW2 = cos4(w2);
  const sinW1s = sinW1 * sinW1;
  const cosW1s = cosW1 * cosW1;
  const sinCos1 = sinW1 * cosW1;
  const sinW2s = sinW2 * sinW2;
  const cosW2s = cosW2 * cosW2;
  const sinCos2 = sinW2 * cosW2;
  const a1s = e1.a * e1.a;
  const b1s = e1.b * e1.b;
  const a2s = e2.a * e2.a;
  const b2s = e2.b * e2.b;
  const A1 = a1s * sinW1s + b1s * cosW1s;
  const A2 = a2s * sinW2s + b2s * cosW2s;
  const B1 = a1s * cosW1s + b1s * sinW1s;
  const B2 = a2s * cosW2s + b2s * sinW2s;
  let C1 = 2 * (b1s - a1s) * sinCos1;
  let C2 = 2 * (b2s - a2s) * sinCos2;
  let D1 = -2 * A1 * e1.x - C1 * e1.y;
  let D2 = -2 * A2 * e2.x - C2 * e2.y;
  let E1 = -C1 * e1.x - 2 * B1 * e1.y;
  let E2 = -C2 * e2.x - 2 * B2 * e2.y;
  const F1 = A1 * e1.x * e1.x + B1 * e1.y * e1.y + C1 * e1.x * e1.y - a1s * b1s;
  const F2 = A2 * e2.x * e2.x + B2 * e2.y * e2.y + C2 * e2.x * e2.y - a2s * b2s;
  C1 = C1 / 2;
  C2 = C2 / 2;
  D1 = D1 / 2;
  D2 = D2 / 2;
  E1 = E1 / 2;
  E2 = E2 / 2;
  const l3 = det3([[A1, C1, D1], [C1, B1, E1], [D1, E1, F1]]);
  const l0 = det3([[A2, C2, D2], [C2, B2, E2], [D2, E2, F2]]);
  const l2 = 0.33333333 * (det3([[A2, C1, D1], [C2, B1, E1], [D2, E1, F1]]) + det3([[A1, C2, D1], [C1, B2, E1], [D1, E2, F1]]) + det3([[A1, C1, D2], [C1, B1, E2], [D1, E1, F2]]));
  const l1 = 0.33333333 * (det3([[A1, C2, D2], [C1, B2, E2], [D1, E2, F2]]) + det3([[A2, C1, D2], [C2, B1, E2], [D2, E1, F2]]) + det3([[A2, C2, D1], [C2, B2, E1], [D2, E2, F1]]));
  const delta1 = det2([[l3, l2], [l2, l1]]);
  const delta2 = det2([[l3, l1], [l2, l0]]);
  const delta3 = det2([[l2, l1], [l1, l0]]);
  const dP = det2([[2 * delta1, delta2], [delta2, 2 * delta3]]);
  if (dP > 0 && (l1 > 0 || l2 > 0)) {
    return false;
  }
  return true;
}
function det2(m) {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}
function det3(m) {
  return m[0][0] * m[1][1] * m[2][2] - m[0][0] * m[1][2] * m[2][1] - m[0][1] * m[1][0] * m[2][2] + m[0][1] * m[1][2] * m[2][0] + m[0][2] * m[1][0] * m[2][1] - m[0][2] * m[1][1] * m[2][0];
}

// node_modules/jointjs/src/g/index.mjs
var intersection = intersection_exports;

// node_modules/jointjs/src/util/index.mjs
var util_exports = {};
__export(util_exports, {
  addClassNamePrefix: () => addClassNamePrefix,
  assign: () => assign,
  bindAll: () => bindAll,
  breakText: () => breakText,
  camelCase: () => camelCase,
  cancelFrame: () => cancelFrame,
  cap: () => cap,
  clone: () => clone,
  cloneCells: () => cloneCells,
  cloneDeep: () => cloneDeep,
  dataUriToBlob: () => dataUriToBlob,
  debounce: () => debounce,
  deepMixin: () => deepMixin,
  deepSupplement: () => deepSupplement,
  defaults: () => defaults,
  defaultsDeep: () => defaultsDeep2,
  difference: () => difference,
  downloadBlob: () => downloadBlob,
  downloadDataUri: () => downloadDataUri,
  filter: () => filter,
  flattenDeep: () => flattenDeep,
  flattenObject: () => flattenObject,
  forIn: () => forIn,
  format: () => format,
  getByPath: () => getByPath,
  getElementBBox: () => getElementBBox,
  getRectPoint: () => getRectPoint,
  groupBy: () => groupBy,
  guid: () => guid,
  has: () => has,
  hashCode: () => hashCode,
  imageToDataUri: () => imageToDataUri,
  interpolate: () => interpolate,
  intersection: () => intersection2,
  invoke: () => invoke,
  invokeProperty: () => invokeProperty,
  isBoolean: () => isBoolean,
  isEmpty: () => isEmpty,
  isEqual: () => isEqual,
  isFunction: () => isFunction,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isPercentage: () => isPercentage,
  isPlainObject: () => isPlainObject,
  isString: () => isString,
  merge: () => merge,
  mixin: () => mixin,
  nextFrame: () => nextFrame,
  noop: () => noop,
  normalizeEvent: () => normalizeEvent,
  normalizeSides: () => normalizeSides,
  normalizeWheel: () => normalizeWheel,
  omit: () => omit,
  parseCssNumeric: () => parseCssNumeric,
  parseDOMJSON: () => parseDOMJSON,
  pick: () => pick,
  removeClassNamePrefix: () => removeClassNamePrefix,
  result: () => result,
  sanitizeHTML: () => sanitizeHTML,
  setAttributesBySelector: () => setAttributesBySelector,
  setByPath: () => setByPath,
  shapePerimeterConnectionPoint: () => shapePerimeterConnectionPoint,
  sortBy: () => sortBy,
  sortElements: () => sortElements,
  sortedIndex: () => sortedIndex,
  supplement: () => supplement,
  svg: () => svg,
  template: () => template,
  timing: () => timing,
  toArray: () => toArray,
  toKebabCase: () => toKebabCase,
  toggleFullScreen: () => toggleFullScreen,
  union: () => union,
  uniq: () => uniq,
  uniqueId: () => uniqueId,
  unsetByPath: () => unsetByPath,
  uuid: () => uuid,
  without: () => without,
  wrapWith: () => wrapWith,
  wrappers: () => wrappers
});

// node_modules/jointjs/src/dia/Cell.mjs
var import_backbone = __toESM(require_backbone(), 1);

// node_modules/jointjs/src/util/util.mjs
var import_jquery = __toESM(require_jquery(), 1);

// node_modules/jointjs/src/V/index.mjs
var V = function() {
  var hasSvg = typeof window === "object" && !!window.SVGAngle;
  if (!hasSvg) {
    return function() {
      throw new Error("SVG is required to use Vectorizer.");
    };
  }
  var ns = {
    svg: "http://www.w3.org/2000/svg",
    xmlns: "http://www.w3.org/2000/xmlns/",
    xml: "http://www.w3.org/XML/1998/namespace",
    xlink: "http://www.w3.org/1999/xlink",
    xhtml: "http://www.w3.org/1999/xhtml"
  };
  var SVGVersion = "1.1";
  var math = Math;
  var PI3 = math.PI;
  var atan23 = math.atan2;
  var sqrt4 = math.sqrt;
  var min5 = math.min;
  var max5 = math.max;
  var cos4 = math.cos;
  var sin4 = math.sin;
  var V2 = function(el, attrs, children) {
    if (!(this instanceof V2)) {
      return V2.apply(Object.create(V2.prototype), arguments);
    }
    if (!el) return;
    if (V2.isV(el)) {
      el = el.node;
    }
    attrs = attrs || {};
    if (V2.isString(el)) {
      el = el.trim();
      if (el.toLowerCase() === "svg") {
        el = V2.createSvgDocument();
      } else if (el[0] === "<") {
        var svgDoc = V2.createSvgDocument(el);
        if (svgDoc.childNodes.length > 1) {
          var arrayOfVels = [];
          var i, len;
          for (i = 0, len = svgDoc.childNodes.length; i < len; i++) {
            var childNode = svgDoc.childNodes[i];
            arrayOfVels.push(new V2(document.importNode(childNode, true)));
          }
          return arrayOfVels;
        }
        el = document.importNode(svgDoc.firstChild, true);
      } else {
        el = document.createElementNS(ns.svg, el);
      }
      V2.ensureId(el);
    }
    this.node = el;
    this.setAttributes(attrs);
    if (children) {
      this.append(children);
    }
    return this;
  };
  var VPrototype = V2.prototype;
  Object.defineProperty(VPrototype, "id", {
    enumerable: true,
    get: function() {
      return this.node.id;
    },
    set: function(id) {
      this.node.id = id;
    }
  });
  VPrototype.getTransformToElement = function(target) {
    var node = this.node;
    if (V2.isSVGGraphicsElement(target) && V2.isSVGGraphicsElement(node)) {
      var targetCTM = V2.toNode(target).getScreenCTM();
      var nodeCTM = node.getScreenCTM();
      if (targetCTM && nodeCTM) {
        return targetCTM.inverse().multiply(nodeCTM);
      }
    }
    return V2.createSVGMatrix();
  };
  VPrototype.transform = function(matrix, opt) {
    var node = this.node;
    if (V2.isUndefined(matrix)) {
      return V2.transformStringToMatrix(this.attr("transform"));
    }
    if (opt && opt.absolute) {
      return this.attr("transform", V2.matrixToTransformString(matrix));
    }
    var svgTransform = V2.createSVGTransform(matrix);
    node.transform.baseVal.appendItem(svgTransform);
    return this;
  };
  VPrototype.translate = function(tx, ty, opt) {
    opt = opt || {};
    ty = ty || 0;
    var transformAttr = this.attr("transform") || "";
    var transform = V2.parseTransformString(transformAttr);
    transformAttr = transform.value;
    if (V2.isUndefined(tx)) {
      return transform.translate;
    }
    transformAttr = transformAttr.replace(/translate\([^)]*\)/g, "").trim();
    var newTx = opt.absolute ? tx : transform.translate.tx + tx;
    var newTy = opt.absolute ? ty : transform.translate.ty + ty;
    var newTranslate = "translate(" + newTx + "," + newTy + ")";
    this.attr("transform", (newTranslate + " " + transformAttr).trim());
    return this;
  };
  VPrototype.rotate = function(angle, cx, cy, opt) {
    opt = opt || {};
    var transformAttr = this.attr("transform") || "";
    var transform = V2.parseTransformString(transformAttr);
    transformAttr = transform.value;
    if (V2.isUndefined(angle)) {
      return transform.rotate;
    }
    transformAttr = transformAttr.replace(/rotate\([^)]*\)/g, "").trim();
    angle %= 360;
    var newAngle = opt.absolute ? angle : transform.rotate.angle + angle;
    var newOrigin = cx !== void 0 && cy !== void 0 ? "," + cx + "," + cy : "";
    var newRotate = "rotate(" + newAngle + newOrigin + ")";
    this.attr("transform", (transformAttr + " " + newRotate).trim());
    return this;
  };
  VPrototype.scale = function(sx, sy) {
    sy = V2.isUndefined(sy) ? sx : sy;
    var transformAttr = this.attr("transform") || "";
    var transform = V2.parseTransformString(transformAttr);
    transformAttr = transform.value;
    if (V2.isUndefined(sx)) {
      return transform.scale;
    }
    transformAttr = transformAttr.replace(/scale\([^)]*\)/g, "").trim();
    var newScale = "scale(" + sx + "," + sy + ")";
    this.attr("transform", (transformAttr + " " + newScale).trim());
    return this;
  };
  VPrototype.bbox = function(withoutTransformations, target) {
    var box;
    var node = this.node;
    var ownerSVGElement = node.ownerSVGElement;
    if (!ownerSVGElement) {
      return new Rect(0, 0, 0, 0);
    }
    try {
      box = node.getBBox();
    } catch (e) {
      box = {
        x: node.clientLeft,
        y: node.clientTop,
        width: node.clientWidth,
        height: node.clientHeight
      };
    }
    if (withoutTransformations) {
      return new Rect(box);
    }
    var matrix = this.getTransformToElement(target || ownerSVGElement);
    return V2.transformRect(box, matrix);
  };
  VPrototype.getBBox = function(opt) {
    var options = {};
    var outputBBox;
    var node = this.node;
    var ownerSVGElement = node.ownerSVGElement;
    if (!ownerSVGElement || !V2.isSVGGraphicsElement(node)) {
      return new Rect(0, 0, 0, 0);
    }
    if (opt) {
      if (opt.target) {
        options.target = V2.toNode(opt.target);
      }
      if (opt.recursive) {
        options.recursive = opt.recursive;
      }
    }
    if (!options.recursive) {
      try {
        outputBBox = node.getBBox();
      } catch (e) {
        outputBBox = {
          x: node.clientLeft,
          y: node.clientTop,
          width: node.clientWidth,
          height: node.clientHeight
        };
      }
      if (!options.target) {
        return new Rect(outputBBox);
      } else {
        var matrix = this.getTransformToElement(options.target);
        return V2.transformRect(outputBBox, matrix);
      }
    } else {
      var children = this.children();
      var n = children.length;
      if (n === 0) {
        return this.getBBox({
          target: options.target,
          recursive: false
        });
      }
      if (!options.target) {
        options.target = this;
      }
      for (var i = 0; i < n; i++) {
        var currentChild = children[i];
        var childBBox;
        if (currentChild.children().length === 0) {
          childBBox = currentChild.getBBox({
            target: options.target,
            recursive: false
          });
        } else {
          childBBox = currentChild.getBBox({
            target: options.target,
            recursive: true
          });
        }
        if (!outputBBox) {
          outputBBox = childBBox;
        } else {
          outputBBox = outputBBox.union(childBBox);
        }
      }
      return outputBBox;
    }
  };
  function createTextPathNode(attrs, vel) {
    attrs || (attrs = {});
    var textPathElement = V2("textPath");
    var d = attrs.d;
    if (d && attrs["xlink:href"] === void 0) {
      var linkedPath = V2("path").attr("d", d).appendTo(vel.defs());
      textPathElement.attr("xlink:href", "#" + linkedPath.id);
    }
    if (V2.isObject(attrs)) {
      textPathElement.attr(attrs);
    }
    return textPathElement.node;
  }
  function annotateTextLine(lineNode, lineAnnotations, opt) {
    opt || (opt = {});
    var includeAnnotationIndices = opt.includeAnnotationIndices;
    var eol = opt.eol;
    var lineHeight = opt.lineHeight;
    var baseSize = opt.baseSize;
    var maxFontSize = 0;
    var fontMetrics = {};
    var lastJ = lineAnnotations.length - 1;
    for (var j = 0; j <= lastJ; j++) {
      var annotation = lineAnnotations[j];
      var fontSize = null;
      if (V2.isObject(annotation)) {
        var annotationAttrs = annotation.attrs;
        var vTSpan = V2("tspan", annotationAttrs);
        var tspanNode = vTSpan.node;
        var t = annotation.t;
        if (eol && j === lastJ) t += eol;
        tspanNode.textContent = t;
        var annotationClass = annotationAttrs["class"];
        if (annotationClass) vTSpan.addClass(annotationClass);
        if (includeAnnotationIndices) vTSpan.attr("annotations", annotation.annotations);
        fontSize = parseFloat(annotationAttrs["font-size"]);
        if (!isFinite(fontSize)) fontSize = baseSize;
        if (fontSize && fontSize > maxFontSize) maxFontSize = fontSize;
      } else {
        if (eol && j === lastJ) annotation += eol;
        tspanNode = document.createTextNode(annotation || " ");
        if (baseSize && baseSize > maxFontSize) maxFontSize = baseSize;
      }
      lineNode.appendChild(tspanNode);
    }
    if (maxFontSize) fontMetrics.maxFontSize = maxFontSize;
    if (lineHeight) {
      fontMetrics.lineHeight = lineHeight;
    } else if (maxFontSize) {
      fontMetrics.lineHeight = maxFontSize * 1.2;
    }
    return fontMetrics;
  }
  var emRegex = /em$/;
  function convertEmToPx(em, fontSize) {
    var numerical = parseFloat(em);
    if (emRegex.test(em)) return numerical * fontSize;
    return numerical;
  }
  function calculateDY(alignment, linesMetrics, baseSizePx, lineHeight) {
    if (!Array.isArray(linesMetrics)) return 0;
    var n = linesMetrics.length;
    if (!n) return 0;
    var lineMetrics = linesMetrics[0];
    var flMaxFont = convertEmToPx(lineMetrics.maxFontSize, baseSizePx) || baseSizePx;
    var rLineHeights = 0;
    var lineHeightPx = convertEmToPx(lineHeight, baseSizePx);
    for (var i = 1; i < n; i++) {
      lineMetrics = linesMetrics[i];
      var iLineHeight = convertEmToPx(lineMetrics.lineHeight, baseSizePx) || lineHeightPx;
      rLineHeights += iLineHeight;
    }
    var llMaxFont = convertEmToPx(lineMetrics.maxFontSize, baseSizePx) || baseSizePx;
    var dy;
    switch (alignment) {
      case "middle":
        dy = flMaxFont / 2 - 0.15 * llMaxFont - rLineHeights / 2;
        break;
      case "bottom":
        dy = -(0.25 * llMaxFont) - rLineHeights;
        break;
      default:
      case "top":
        dy = 0.8 * flMaxFont;
        break;
    }
    return dy;
  }
  VPrototype.text = function(content, opt) {
    if (content && typeof content !== "string") throw new Error("Vectorizer: text() expects the first argument to be a string.");
    content = V2.sanitizeText(content);
    opt || (opt = {});
    var displayEmpty = opt.displayEmpty;
    var eol = opt.eol;
    var textPath = opt.textPath;
    var verticalAnchor = opt.textVerticalAnchor;
    var namedVerticalAnchor = verticalAnchor === "middle" || verticalAnchor === "bottom" || verticalAnchor === "top";
    var x = opt.x;
    if (x === void 0) x = this.attr("x") || 0;
    var iai = opt.includeAnnotationIndices;
    var annotations = opt.annotations;
    if (annotations && !V2.isArray(annotations)) annotations = [annotations];
    var defaultLineHeight = opt.lineHeight;
    var autoLineHeight = defaultLineHeight === "auto";
    var lineHeight = autoLineHeight ? "1.5em" : defaultLineHeight || "1em";
    this.empty();
    this.attr({
      // Preserve spaces. In other words, we do not want consecutive spaces to get collapsed to one.
      "xml:space": "preserve",
      // An empty text gets rendered into the DOM in webkit-based browsers.
      // In order to unify this behaviour across all browsers
      // we rather hide the text element when it's empty.
      "display": content || displayEmpty ? null : "none"
    });
    var fontSize = parseFloat(this.attr("font-size"));
    if (!fontSize) {
      fontSize = 16;
      if (namedVerticalAnchor || annotations) this.attr("font-size", fontSize);
    }
    var doc = document;
    var containerNode;
    if (textPath) {
      if (typeof textPath === "string") textPath = {
        d: textPath
      };
      containerNode = createTextPathNode(textPath, this);
    } else {
      containerNode = doc.createDocumentFragment();
    }
    var offset = 0;
    var lines = content.split("\n");
    var linesMetrics = [];
    var annotatedY;
    for (var i = 0, lastI = lines.length - 1; i <= lastI; i++) {
      var dy = lineHeight;
      var lineClassName = "v-line";
      var lineNode = doc.createElementNS(ns.svg, "tspan");
      var line3 = lines[i];
      var lineMetrics;
      if (line3) {
        if (annotations) {
          var lineAnnotations = V2.annotateString(line3, annotations, {
            offset: -offset,
            includeAnnotationIndices: iai
          });
          lineMetrics = annotateTextLine(lineNode, lineAnnotations, {
            includeAnnotationIndices: iai,
            eol: i !== lastI && eol,
            lineHeight: autoLineHeight ? null : lineHeight,
            baseSize: fontSize
          });
          var iLineHeight = lineMetrics.lineHeight;
          if (iLineHeight && autoLineHeight && i !== 0) dy = iLineHeight;
          if (i === 0) annotatedY = lineMetrics.maxFontSize * 0.8;
        } else {
          if (eol && i !== lastI) line3 += eol;
          lineNode.textContent = line3;
        }
      } else {
        lineNode.textContent = "-";
        lineClassName += " v-empty-line";
        var lineNodeStyle = lineNode.style;
        lineNodeStyle.fillOpacity = 0;
        lineNodeStyle.strokeOpacity = 0;
        if (annotations) {
          lineMetrics = {};
          lineAnnotations = V2.findAnnotationsAtIndex(annotations, offset);
          let lineFontSize = fontSize;
          for (let j = lineAnnotations.length; j > 0; j--) {
            const attrs = lineAnnotations[j - 1].attrs;
            if (!attrs || !("font-size" in attrs)) continue;
            const fs = parseFloat(attrs["font-size"]);
            if (isFinite(fs)) {
              lineFontSize = fs;
              break;
            }
          }
          if (autoLineHeight) {
            if (i > 0) {
              dy = lineFontSize * 1.2;
            } else {
              annotatedY = lineFontSize * 0.8;
            }
          }
          lineNode.setAttribute("font-size", lineFontSize);
          lineMetrics.maxFontSize = lineFontSize;
        }
      }
      if (lineMetrics) linesMetrics.push(lineMetrics);
      if (i > 0) lineNode.setAttribute("dy", dy);
      if (i > 0 || textPath) lineNode.setAttribute("x", x);
      lineNode.className.baseVal = lineClassName;
      containerNode.appendChild(lineNode);
      offset += line3.length + 1;
    }
    if (namedVerticalAnchor) {
      if (annotations) {
        dy = calculateDY(verticalAnchor, linesMetrics, fontSize, lineHeight);
      } else if (verticalAnchor === "top") {
        dy = "0.8em";
      } else {
        var rh;
        if (lastI > 0) {
          rh = parseFloat(lineHeight) || 1;
          rh *= lastI;
          if (!emRegex.test(lineHeight)) rh /= fontSize;
        } else {
          rh = 0;
        }
        switch (verticalAnchor) {
          case "middle":
            dy = 0.3 - rh / 2 + "em";
            break;
          case "bottom":
            dy = -rh - 0.3 + "em";
            break;
        }
      }
    } else {
      if (verticalAnchor === 0) {
        dy = "0em";
      } else if (verticalAnchor) {
        dy = verticalAnchor;
      } else {
        dy = 0;
        if (this.attr("y") === null) this.attr("y", annotatedY || "0.8em");
      }
    }
    containerNode.firstChild.setAttribute("dy", dy);
    this.append(containerNode);
    return this;
  };
  VPrototype.removeAttr = function(name) {
    const trueName = attributeNames[name];
    const {
      ns: ns2,
      local
    } = V2.qualifyAttr(trueName);
    const el = this.node;
    if (ns2) {
      if (el.hasAttributeNS(ns2, local)) {
        el.removeAttributeNS(ns2, local);
      }
    } else if (el.hasAttribute(trueName)) {
      el.removeAttribute(trueName);
    }
    return this;
  };
  VPrototype.attr = function(name, value) {
    if (V2.isUndefined(name)) {
      var attributes2 = this.node.attributes;
      var attrs = {};
      for (var i = 0; i < attributes2.length; i++) {
        attrs[attributes2[i].name] = attributes2[i].value;
      }
      return attrs;
    }
    if (V2.isString(name) && V2.isUndefined(value)) {
      return this.node.getAttribute(attributeNames[name]);
    }
    if (typeof name === "object") {
      for (var attrName in name) {
        if (name.hasOwnProperty(attrName)) {
          this.setAttribute(attrName, name[attrName]);
        }
      }
    } else {
      this.setAttribute(name, value);
    }
    return this;
  };
  VPrototype.normalizePath = function() {
    var tagName = this.tagName();
    if (tagName === "PATH") {
      this.attr("d", V2.normalizePathData(this.attr("d")));
    }
    return this;
  };
  VPrototype.remove = function() {
    if (this.node.parentNode) {
      this.node.parentNode.removeChild(this.node);
    }
    return this;
  };
  VPrototype.empty = function() {
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
    return this;
  };
  VPrototype.setAttributes = function(attrs) {
    for (var key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        this.setAttribute(key, attrs[key]);
      }
    }
    return this;
  };
  VPrototype.append = function(els) {
    if (!V2.isArray(els)) {
      els = [els];
    }
    for (var i = 0, len = els.length; i < len; i++) {
      this.node.appendChild(V2.toNode(els[i]));
    }
    return this;
  };
  VPrototype.prepend = function(els) {
    var child = this.node.firstChild;
    return child ? V2(child).before(els) : this.append(els);
  };
  VPrototype.before = function(els) {
    var node = this.node;
    var parent2 = node.parentNode;
    if (parent2) {
      if (!V2.isArray(els)) {
        els = [els];
      }
      for (var i = 0, len = els.length; i < len; i++) {
        parent2.insertBefore(V2.toNode(els[i]), node);
      }
    }
    return this;
  };
  VPrototype.appendTo = function(node) {
    V2.toNode(node).appendChild(this.node);
    return this;
  };
  VPrototype.svg = function() {
    return this.node instanceof window.SVGSVGElement ? this : V2(this.node.ownerSVGElement);
  };
  VPrototype.tagName = function() {
    return this.node.tagName.toUpperCase();
  };
  VPrototype.defs = function() {
    var context = this.svg() || this;
    var defsNode = context.node.getElementsByTagName("defs")[0];
    if (defsNode) return V2(defsNode);
    return V2("defs").appendTo(context);
  };
  VPrototype.clone = function() {
    var clone2 = V2(this.node.cloneNode(
      true
      /* deep */
    ));
    clone2.node.id = V2.uniqueId();
    return clone2;
  };
  VPrototype.findOne = function(selector) {
    var found = this.node.querySelector(selector);
    return found ? V2(found) : void 0;
  };
  VPrototype.find = function(selector) {
    var vels = [];
    var nodes = this.node.querySelectorAll(selector);
    if (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        vels.push(V2(nodes[i]));
      }
    }
    return vels;
  };
  VPrototype.children = function() {
    var children = this.node.childNodes;
    var outputArray = [];
    for (var i = 0; i < children.length; i++) {
      var currentChild = children[i];
      if (currentChild.nodeType === 1) {
        outputArray.push(V2(children[i]));
      }
    }
    return outputArray;
  };
  VPrototype.parent = function() {
    return V2(this.node.parentNode) || null;
  }, // Find an index of an element inside its container.
  VPrototype.index = function() {
    var index = 0;
    var node = this.node.previousSibling;
    while (node) {
      if (node.nodeType === 1) index++;
      node = node.previousSibling;
    }
    return index;
  };
  VPrototype.findParentByClass = function(className2, terminator) {
    var ownerSVGElement = this.node.ownerSVGElement;
    var node = this.node.parentNode;
    while (node && node !== terminator && node !== ownerSVGElement) {
      var vel = V2(node);
      if (vel.hasClass(className2)) {
        return vel;
      }
      node = node.parentNode;
    }
    return null;
  };
  VPrototype.contains = function(el) {
    var a = this.node;
    var b = V2.toNode(el);
    var bup = b && b.parentNode;
    return a === bup || !!(bup && bup.nodeType === 1 && a.compareDocumentPosition(bup) & 16);
  };
  VPrototype.toLocalPoint = function(x, y) {
    var svg2 = this.svg().node;
    var p = svg2.createSVGPoint();
    p.x = x;
    p.y = y;
    try {
      var globalPoint = p.matrixTransform(svg2.getScreenCTM().inverse());
      var globalToLocalMatrix = this.getTransformToElement(svg2).inverse();
    } catch (e) {
      return p;
    }
    return globalPoint.matrixTransform(globalToLocalMatrix);
  };
  VPrototype.translateCenterToPoint = function(p) {
    var bbox2 = this.getBBox({
      target: this.svg()
    });
    var center2 = bbox2.center();
    this.translate(p.x - center2.x, p.y - center2.y);
    return this;
  };
  VPrototype.translateAndAutoOrient = function(position, reference, target) {
    position = new Point(position);
    reference = new Point(reference);
    target || (target = this.svg());
    var scale2 = this.scale();
    this.attr("transform", "");
    var bbox2 = this.getBBox({
      target
    }).scale(scale2.sx, scale2.sy);
    var translateToOrigin = V2.createSVGTransform();
    translateToOrigin.setTranslate(-bbox2.x - bbox2.width / 2, -bbox2.y - bbox2.height / 2);
    var rotateAroundOrigin = V2.createSVGTransform();
    var angle = position.angleBetween(reference, position.clone().offset(1, 0));
    if (angle) rotateAroundOrigin.setRotate(angle, 0, 0);
    var translateFromOrigin = V2.createSVGTransform();
    var finalPosition = position.clone().move(reference, bbox2.width / 2);
    translateFromOrigin.setTranslate(2 * position.x - finalPosition.x, 2 * position.y - finalPosition.y);
    var ctm = this.getTransformToElement(target);
    var transform = V2.createSVGTransform();
    transform.setMatrix(translateFromOrigin.matrix.multiply(rotateAroundOrigin.matrix.multiply(translateToOrigin.matrix.multiply(ctm.scale(scale2.sx, scale2.sy)))));
    this.attr("transform", V2.matrixToTransformString(transform.matrix));
    return this;
  };
  VPrototype.animateAlongPath = function(attrs, path) {
    path = V2.toNode(path);
    var id = V2.ensureId(path);
    var animateMotion = V2("animateMotion", attrs);
    var mpath = V2("mpath", {
      "xlink:href": "#" + id
    });
    animateMotion.append(mpath);
    this.append(animateMotion);
    try {
      animateMotion.node.beginElement();
    } catch (e) {
      if (document.documentElement.getAttribute("smiling") === "fake") {
        var animation = animateMotion.node;
        animation.animators = [];
        var animationID = animation.getAttribute("id");
        if (animationID) id2anim[animationID] = animation;
        var targets = getTargets(animation);
        for (var i = 0, len = targets.length; i < len; i++) {
          var target = targets[i];
          var animator = new Animator(animation, target, i);
          animators.push(animator);
          animation.animators[i] = animator;
          animator.register();
        }
      }
    }
    return this;
  };
  const noHTMLWhitespaceRegex = /[^\x20\t\r\n\f]+/g;
  function getTokenList(str) {
    if (!V2.isString(str)) return [];
    return str.trim().match(noHTMLWhitespaceRegex) || [];
  }
  VPrototype.hasClass = function(className2) {
    if (!V2.isString(className2)) return false;
    return this.node.classList.contains(className2.trim());
  };
  VPrototype.addClass = function(className2) {
    this.node.classList.add(...getTokenList(className2));
    return this;
  };
  VPrototype.removeClass = function(className2) {
    this.node.classList.remove(...getTokenList(className2));
    return this;
  };
  VPrototype.toggleClass = function(className2, toAdd) {
    const tokens = getTokenList(className2);
    for (let i = 0; i < tokens.length; i++) {
      this.node.classList.toggle(tokens[i], toAdd);
    }
    return this;
  };
  VPrototype.sample = function(interval) {
    interval = interval || 1;
    var node = this.node;
    var length2 = node.getTotalLength();
    var samples = [];
    var distance = 0;
    var sample;
    while (distance < length2) {
      sample = node.getPointAtLength(distance);
      samples.push({
        x: sample.x,
        y: sample.y,
        distance
      });
      distance += interval;
    }
    return samples;
  };
  VPrototype.convertToPath = function() {
    var path = V2("path");
    path.attr(this.attr());
    var d = this.convertToPathData();
    if (d) {
      path.attr("d", d);
    }
    return path;
  };
  VPrototype.convertToPathData = function() {
    var tagName = this.tagName();
    switch (tagName) {
      case "PATH":
        return this.attr("d");
      case "LINE":
        return V2.convertLineToPathData(this.node);
      case "POLYGON":
        return V2.convertPolygonToPathData(this.node);
      case "POLYLINE":
        return V2.convertPolylineToPathData(this.node);
      case "ELLIPSE":
        return V2.convertEllipseToPathData(this.node);
      case "CIRCLE":
        return V2.convertCircleToPathData(this.node);
      case "RECT":
        return V2.convertRectToPathData(this.node);
    }
    throw new Error(tagName + " cannot be converted to PATH.");
  };
  V2.prototype.toGeometryShape = function() {
    var x, y, width, height, cx, cy, r, rx, ry, points, d, x1, x2, y1, y2;
    switch (this.tagName()) {
      case "RECT":
        x = parseFloat(this.attr("x")) || 0;
        y = parseFloat(this.attr("y")) || 0;
        width = parseFloat(this.attr("width")) || 0;
        height = parseFloat(this.attr("height")) || 0;
        return new Rect(x, y, width, height);
      case "CIRCLE":
        cx = parseFloat(this.attr("cx")) || 0;
        cy = parseFloat(this.attr("cy")) || 0;
        r = parseFloat(this.attr("r")) || 0;
        return new Ellipse({
          x: cx,
          y: cy
        }, r, r);
      case "ELLIPSE":
        cx = parseFloat(this.attr("cx")) || 0;
        cy = parseFloat(this.attr("cy")) || 0;
        rx = parseFloat(this.attr("rx")) || 0;
        ry = parseFloat(this.attr("ry")) || 0;
        return new Ellipse({
          x: cx,
          y: cy
        }, rx, ry);
      case "POLYLINE":
        points = V2.getPointsFromSvgNode(this);
        return new Polyline(points);
      case "POLYGON":
        points = V2.getPointsFromSvgNode(this);
        if (points.length > 1) points.push(points[0]);
        return new Polyline(points);
      case "PATH":
        d = this.attr("d");
        if (!Path.isDataSupported(d)) d = V2.normalizePathData(d);
        return new Path(d);
      case "LINE":
        x1 = parseFloat(this.attr("x1")) || 0;
        y1 = parseFloat(this.attr("y1")) || 0;
        x2 = parseFloat(this.attr("x2")) || 0;
        y2 = parseFloat(this.attr("y2")) || 0;
        return new Line({
          x: x1,
          y: y1
        }, {
          x: x2,
          y: y2
        });
    }
    return this.getBBox();
  };
  VPrototype.findIntersection = function(ref, target) {
    var svg2 = this.svg().node;
    target = target || svg2;
    var bbox2 = this.getBBox({
      target
    });
    var center2 = bbox2.center();
    if (!bbox2.intersectionWithLineFromCenterToPoint(ref)) return void 0;
    var spot;
    var tagName = this.tagName();
    if (tagName === "RECT") {
      var gRect = new Rect(parseFloat(this.attr("x") || 0), parseFloat(this.attr("y") || 0), parseFloat(this.attr("width")), parseFloat(this.attr("height")));
      var rectMatrix = this.getTransformToElement(target);
      var rectMatrixComponents = V2.decomposeMatrix(rectMatrix);
      var resetRotation = svg2.createSVGTransform();
      resetRotation.setRotate(-rectMatrixComponents.rotation, center2.x, center2.y);
      var rect2 = V2.transformRect(gRect, resetRotation.matrix.multiply(rectMatrix));
      spot = new Rect(rect2).intersectionWithLineFromCenterToPoint(ref, rectMatrixComponents.rotation);
    } else if (tagName === "PATH" || tagName === "POLYGON" || tagName === "POLYLINE" || tagName === "CIRCLE" || tagName === "ELLIPSE") {
      var pathNode = tagName === "PATH" ? this : this.convertToPath();
      var samples = pathNode.sample();
      var minDistance = Infinity;
      var closestSamples = [];
      var i, sample, gp, centerDistance, refDistance, distance;
      for (i = 0; i < samples.length; i++) {
        sample = samples[i];
        gp = V2.createSVGPoint(sample.x, sample.y);
        gp = gp.matrixTransform(this.getTransformToElement(target));
        sample = new Point(gp);
        centerDistance = sample.distance(center2);
        refDistance = sample.distance(ref) * 1.1;
        distance = centerDistance + refDistance;
        if (distance < minDistance) {
          minDistance = distance;
          closestSamples = [{
            sample,
            refDistance
          }];
        } else if (distance < minDistance + 1) {
          closestSamples.push({
            sample,
            refDistance
          });
        }
      }
      closestSamples.sort(function(a, b) {
        return a.refDistance - b.refDistance;
      });
      if (closestSamples[0]) {
        spot = closestSamples[0].sample;
      }
    }
    return spot;
  };
  VPrototype.setAttribute = function(name, value) {
    const el = this.node;
    if (value === null) {
      this.removeAttr(name);
      return this;
    }
    const trueName = attributeNames[name];
    const {
      ns: ns2
    } = V2.qualifyAttr(trueName);
    if (ns2) {
      el.setAttributeNS(ns2, trueName, value);
    } else if (trueName === "id") {
      el.id = value;
    } else {
      el.setAttribute(trueName, value);
    }
    return this;
  };
  V2.createSvgDocument = function(content) {
    if (content) {
      const XMLString = `<svg xmlns="${ns.svg}" xmlns:xlink="${ns.xlink}" version="${SVGVersion}">${content}</svg>`;
      const {
        documentElement
      } = V2.parseXML(XMLString, {
        async: false
      });
      return documentElement;
    }
    const svg2 = document.createElementNS(ns.svg, "svg");
    svg2.setAttributeNS(ns.xmlns, "xmlns:xlink", ns.xlink);
    svg2.setAttribute("version", SVGVersion);
    return svg2;
  };
  V2.createSVGStyle = function(stylesheet) {
    const {
      node
    } = V2("style", {
      type: "text/css"
    }, [V2.createCDATASection(stylesheet)]);
    return node;
  }, V2.createCDATASection = function(data = "") {
    const xml = document.implementation.createDocument(null, "xml", null);
    return xml.createCDATASection(data);
  };
  V2.idCounter = 0;
  V2.uniqueId = function() {
    return "v-" + ++V2.idCounter;
  };
  V2.toNode = function(el) {
    return V2.isV(el) ? el.node : el.nodeName && el || el[0];
  };
  V2.ensureId = function(node) {
    node = V2.toNode(node);
    return node.id || (node.id = V2.uniqueId());
  };
  V2.sanitizeText = function(text) {
    return (text || "").replace(/ /g, " ");
  };
  V2.isUndefined = function(value) {
    return typeof value === "undefined";
  };
  V2.isString = function(value) {
    return typeof value === "string";
  };
  V2.isObject = function(value) {
    return value && typeof value === "object";
  };
  V2.isArray = Array.isArray;
  V2.parseXML = function(data, opt) {
    opt = opt || {};
    var xml;
    try {
      var parser = new DOMParser();
      if (!V2.isUndefined(opt.async)) {
        parser.async = opt.async;
      }
      xml = parser.parseFromString(data, "text/xml");
    } catch (error) {
      xml = void 0;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      throw new Error("Invalid XML: " + data);
    }
    return xml;
  };
  const _attributeNames = /* @__PURE__ */ Object.create(null);
  [
    "baseFrequency",
    "baseProfile",
    "clipPathUnits",
    "contentScriptType",
    "contentStyleType",
    "diffuseConstant",
    "edgeMode",
    "externalResourcesRequired",
    "filterRes",
    // deprecated
    "filterUnits",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    // deprecated
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan"
    // deprecated
  ].forEach((name) => _attributeNames[name] = name);
  const attributeNames = new Proxy(_attributeNames, {
    get(cache, name) {
      if (!V2.supportCamelCaseAttributes) return name;
      if (name in cache) {
        return cache[name];
      }
      return cache[name] = name.replace(/[A-Z]/g, "-$&").toLowerCase();
    }
  });
  Object.defineProperty(V2, "attributeNames", {
    value: attributeNames,
    writable: false
  });
  Object.defineProperty(V2, "supportCamelCaseAttributes", {
    value: false,
    writable: true
  });
  V2.qualifyAttr = function(name) {
    if (name.indexOf(":") !== -1) {
      var combinedKey = name.split(":");
      return {
        ns: ns[combinedKey[0]],
        local: combinedKey[1]
      };
    }
    return {
      ns: null,
      local: name
    };
  };
  V2.transformSeparatorRegex = /[ ,]+/;
  V2.transformRegex = /\b\w+\([^()]+\)/g;
  V2.transformFunctionRegex = /\b(\w+)\(([^()]+)\)/;
  V2.transformTranslateRegex = /\btranslate\(([^()]+)\)/;
  V2.transformRotateRegex = /\brotate\(([^()]+)\)/;
  V2.transformScaleRegex = /\bscale\(([^()]+)\)/;
  V2.transformStringToMatrix = function(transform) {
    let transformationMatrix = V2.createSVGMatrix();
    const transformMatches = transform && transform.match(V2.transformRegex);
    if (!transformMatches) {
      return transformationMatrix;
    }
    const numMatches = transformMatches.length;
    for (let i = 0; i < numMatches; i++) {
      const transformMatch = transformMatches[i];
      const transformFunctionMatch = transformMatch.match(V2.transformFunctionRegex);
      if (transformFunctionMatch) {
        let sx, sy, tx, ty, angle;
        let ctm = V2.createSVGMatrix();
        const transformFunction = transformFunctionMatch[1].toLowerCase();
        const args = transformFunctionMatch[2].split(V2.transformSeparatorRegex);
        switch (transformFunction) {
          case "scale":
            sx = parseFloat(args[0]);
            sy = args[1] === void 0 ? sx : parseFloat(args[1]);
            ctm = ctm.scaleNonUniform(sx, sy);
            break;
          case "translate":
            tx = parseFloat(args[0]);
            ty = parseFloat(args[1]);
            ctm = ctm.translate(tx, ty);
            break;
          case "rotate":
            angle = parseFloat(args[0]);
            tx = parseFloat(args[1]) || 0;
            ty = parseFloat(args[2]) || 0;
            if (tx !== 0 || ty !== 0) {
              ctm = ctm.translate(tx, ty).rotate(angle).translate(-tx, -ty);
            } else {
              ctm = ctm.rotate(angle);
            }
            break;
          case "skewx":
            angle = parseFloat(args[0]);
            ctm = ctm.skewX(angle);
            break;
          case "skewy":
            angle = parseFloat(args[0]);
            ctm = ctm.skewY(angle);
            break;
          case "matrix":
            ctm.a = parseFloat(args[0]);
            ctm.b = parseFloat(args[1]);
            ctm.c = parseFloat(args[2]);
            ctm.d = parseFloat(args[3]);
            ctm.e = parseFloat(args[4]);
            ctm.f = parseFloat(args[5]);
            break;
          default:
            continue;
        }
        transformationMatrix = transformationMatrix.multiply(ctm);
      }
    }
    return transformationMatrix;
  };
  V2.matrixToTransformString = function(matrix) {
    matrix || (matrix = true);
    return "matrix(" + (matrix.a !== void 0 ? matrix.a : 1) + "," + (matrix.b !== void 0 ? matrix.b : 0) + "," + (matrix.c !== void 0 ? matrix.c : 0) + "," + (matrix.d !== void 0 ? matrix.d : 1) + "," + (matrix.e !== void 0 ? matrix.e : 0) + "," + (matrix.f !== void 0 ? matrix.f : 0) + ")";
  };
  V2.parseTransformString = function(transform) {
    var translate, rotate, scale2;
    if (transform) {
      var separator = V2.transformSeparatorRegex;
      if (transform.trim().indexOf("matrix") >= 0) {
        var matrix = V2.transformStringToMatrix(transform);
        var decomposedMatrix = V2.decomposeMatrix(matrix);
        translate = [decomposedMatrix.translateX, decomposedMatrix.translateY];
        scale2 = [decomposedMatrix.scaleX, decomposedMatrix.scaleY];
        rotate = [decomposedMatrix.rotation];
        var transformations = [];
        if (translate[0] !== 0 || translate[1] !== 0) {
          transformations.push("translate(" + translate + ")");
        }
        if (scale2[0] !== 1 || scale2[1] !== 1) {
          transformations.push("scale(" + scale2 + ")");
        }
        if (rotate[0] !== 0) {
          transformations.push("rotate(" + rotate + ")");
        }
        transform = transformations.join(" ");
      } else {
        const translateMatch = transform.match(V2.transformTranslateRegex);
        if (translateMatch) {
          translate = translateMatch[1].split(separator);
        }
        const rotateMatch = transform.match(V2.transformRotateRegex);
        if (rotateMatch) {
          rotate = rotateMatch[1].split(separator);
        }
        const scaleMatch = transform.match(V2.transformScaleRegex);
        if (scaleMatch) {
          scale2 = scaleMatch[1].split(separator);
        }
      }
    }
    var sx = scale2 && scale2[0] ? parseFloat(scale2[0]) : 1;
    return {
      value: transform,
      translate: {
        tx: translate && translate[0] ? parseInt(translate[0], 10) : 0,
        ty: translate && translate[1] ? parseInt(translate[1], 10) : 0
      },
      rotate: {
        angle: rotate && rotate[0] ? parseInt(rotate[0], 10) : 0,
        cx: rotate && rotate[1] ? parseInt(rotate[1], 10) : void 0,
        cy: rotate && rotate[2] ? parseInt(rotate[2], 10) : void 0
      },
      scale: {
        sx,
        sy: scale2 && scale2[1] ? parseFloat(scale2[1]) : sx
      }
    };
  };
  V2.deltaTransformPoint = function(matrix, point2) {
    var dx = point2.x * matrix.a + point2.y * matrix.c + 0;
    var dy = point2.x * matrix.b + point2.y * matrix.d + 0;
    return {
      x: dx,
      y: dy
    };
  };
  V2.decomposeMatrix = function(matrix) {
    var px = V2.deltaTransformPoint(matrix, {
      x: 0,
      y: 1
    });
    var py = V2.deltaTransformPoint(matrix, {
      x: 1,
      y: 0
    });
    var skewX = 180 / PI3 * atan23(px.y, px.x) - 90;
    var skewY = 180 / PI3 * atan23(py.y, py.x);
    return {
      translateX: matrix.e,
      translateY: matrix.f,
      scaleX: sqrt4(matrix.a * matrix.a + matrix.b * matrix.b),
      scaleY: sqrt4(matrix.c * matrix.c + matrix.d * matrix.d),
      skewX,
      skewY,
      rotation: skewX
      // rotation is the same as skew x
    };
  };
  V2.matrixToScale = function(matrix) {
    var a, b, c, d;
    if (matrix) {
      a = V2.isUndefined(matrix.a) ? 1 : matrix.a;
      d = V2.isUndefined(matrix.d) ? 1 : matrix.d;
      b = matrix.b;
      c = matrix.c;
    } else {
      a = d = 1;
    }
    return {
      sx: b ? sqrt4(a * a + b * b) : a,
      sy: c ? sqrt4(c * c + d * d) : d
    };
  };
  V2.matrixToRotate = function(matrix) {
    var p = {
      x: 0,
      y: 1
    };
    if (matrix) {
      p = V2.deltaTransformPoint(matrix, p);
    }
    return {
      angle: normalizeAngle(toDeg(atan23(p.y, p.x)) - 90)
    };
  };
  V2.matrixToTranslate = function(matrix) {
    return {
      tx: matrix && matrix.e || 0,
      ty: matrix && matrix.f || 0
    };
  };
  V2.isV = function(object) {
    return object instanceof V2;
  };
  V2.isVElement = V2.isV;
  V2.isSVGGraphicsElement = function(node) {
    if (!node) return false;
    node = V2.toNode(node);
    return node instanceof SVGElement && typeof node.getScreenCTM === "function";
  };
  var svgDocument = V2("svg").node;
  V2.createSVGMatrix = function(matrix) {
    var svgMatrix = svgDocument.createSVGMatrix();
    for (var component in matrix) {
      svgMatrix[component] = matrix[component];
    }
    return svgMatrix;
  };
  V2.createSVGTransform = function(matrix) {
    if (!V2.isUndefined(matrix)) {
      if (!(matrix instanceof SVGMatrix)) {
        matrix = V2.createSVGMatrix(matrix);
      }
      return svgDocument.createSVGTransformFromMatrix(matrix);
    }
    return svgDocument.createSVGTransform();
  };
  V2.createSVGPoint = function(x, y) {
    var p = svgDocument.createSVGPoint();
    p.x = x;
    p.y = y;
    return p;
  };
  V2.transformRect = function(r, matrix) {
    var p = svgDocument.createSVGPoint();
    p.x = r.x;
    p.y = r.y;
    var corner1 = p.matrixTransform(matrix);
    p.x = r.x + r.width;
    p.y = r.y;
    var corner2 = p.matrixTransform(matrix);
    p.x = r.x + r.width;
    p.y = r.y + r.height;
    var corner3 = p.matrixTransform(matrix);
    p.x = r.x;
    p.y = r.y + r.height;
    var corner4 = p.matrixTransform(matrix);
    var minX = min5(corner1.x, corner2.x, corner3.x, corner4.x);
    var maxX = max5(corner1.x, corner2.x, corner3.x, corner4.x);
    var minY = min5(corner1.y, corner2.y, corner3.y, corner4.y);
    var maxY = max5(corner1.y, corner2.y, corner3.y, corner4.y);
    return new Rect(minX, minY, maxX - minX, maxY - minY);
  };
  V2.transformPoint = function(p, matrix) {
    return new Point(V2.createSVGPoint(p.x, p.y).matrixTransform(matrix));
  };
  V2.transformLine = function(l, matrix) {
    return new Line(V2.transformPoint(l.start, matrix), V2.transformPoint(l.end, matrix));
  };
  V2.transformPolyline = function(p, matrix) {
    var inPoints = p instanceof Polyline ? p.points : p;
    if (!V2.isArray(inPoints)) inPoints = [];
    var outPoints = [];
    for (var i = 0, n = inPoints.length; i < n; i++) outPoints[i] = V2.transformPoint(inPoints[i], matrix);
    return new Polyline(outPoints);
  };
  V2.styleToObject = function(styleString) {
    var ret = {};
    var styles = styleString.split(";");
    for (var i = 0; i < styles.length; i++) {
      var style = styles[i];
      var pair = style.split("=");
      ret[pair[0].trim()] = pair[1].trim();
    }
    return ret;
  };
  V2.createSlicePathData = function(innerRadius, outerRadius, startAngle, endAngle) {
    var svgArcMax = 2 * PI3 - 1e-6;
    var r0 = innerRadius;
    var r1 = outerRadius;
    var a0 = startAngle;
    var a1 = endAngle;
    var da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0);
    var df = da < PI3 ? "0" : "1";
    var c0 = cos4(a0);
    var s0 = sin4(a0);
    var c1 = cos4(a1);
    var s1 = sin4(a1);
    return da >= svgArcMax ? r0 ? "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "M0," + r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + -r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + r0 + "Z" : "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "Z" : r0 ? "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L" + r0 * c1 + "," + r0 * s1 + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0 + "Z" : "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L0,0Z";
  };
  V2.mergeAttrs = function(a, b) {
    for (var attr in b) {
      if (attr === "class") {
        a[attr] = a[attr] ? a[attr] + " " + b[attr] : b[attr];
      } else if (attr === "style") {
        if (V2.isObject(a[attr]) && V2.isObject(b[attr])) {
          a[attr] = V2.mergeAttrs(a[attr], b[attr]);
        } else if (V2.isObject(a[attr])) {
          a[attr] = V2.mergeAttrs(a[attr], V2.styleToObject(b[attr]));
        } else if (V2.isObject(b[attr])) {
          a[attr] = V2.mergeAttrs(V2.styleToObject(a[attr]), b[attr]);
        } else {
          a[attr] = V2.mergeAttrs(V2.styleToObject(a[attr]), V2.styleToObject(b[attr]));
        }
      } else {
        a[attr] = b[attr];
      }
    }
    return a;
  };
  V2.annotateString = function(t, annotations, opt) {
    annotations = annotations || [];
    opt = opt || {};
    var offset = opt.offset || 0;
    var compacted = [];
    var batch;
    var ret = [];
    var item;
    var prev;
    for (var i = 0; i < t.length; i++) {
      item = ret[i] = t[i];
      for (var j = 0; j < annotations.length; j++) {
        var annotation = annotations[j];
        var start = annotation.start + offset;
        var end = annotation.end + offset;
        if (i >= start && i < end) {
          if (V2.isObject(item)) {
            item.attrs = V2.mergeAttrs(V2.mergeAttrs({}, item.attrs), annotation.attrs);
          } else {
            item = ret[i] = {
              t: t[i],
              attrs: annotation.attrs
            };
          }
          if (opt.includeAnnotationIndices) {
            (item.annotations || (item.annotations = [])).push(j);
          }
        }
      }
      prev = ret[i - 1];
      if (!prev) {
        batch = item;
      } else if (V2.isObject(item) && V2.isObject(prev)) {
        if (JSON.stringify(item.attrs) === JSON.stringify(prev.attrs)) {
          batch.t += item.t;
        } else {
          compacted.push(batch);
          batch = item;
        }
      } else if (V2.isObject(item)) {
        compacted.push(batch);
        batch = item;
      } else if (V2.isObject(prev)) {
        compacted.push(batch);
        batch = item;
      } else {
        batch = (batch || "") + item;
      }
    }
    if (batch) {
      compacted.push(batch);
    }
    return compacted;
  };
  V2.findAnnotationsAtIndex = function(annotations, index) {
    var found = [];
    if (annotations) {
      annotations.forEach(function(annotation) {
        if (annotation.start < index && index <= annotation.end) {
          found.push(annotation);
        }
      });
    }
    return found;
  };
  V2.findAnnotationsBetweenIndexes = function(annotations, start, end) {
    var found = [];
    if (annotations) {
      annotations.forEach(function(annotation) {
        if (start >= annotation.start && start < annotation.end || end > annotation.start && end <= annotation.end || annotation.start >= start && annotation.end < end) {
          found.push(annotation);
        }
      });
    }
    return found;
  };
  V2.shiftAnnotations = function(annotations, index, offset) {
    if (annotations) {
      annotations.forEach(function(annotation) {
        if (annotation.start < index && annotation.end >= index) {
          annotation.end += offset;
        } else if (annotation.start >= index) {
          annotation.start += offset;
          annotation.end += offset;
        }
      });
    }
    return annotations;
  };
  V2.convertLineToPathData = function(line3) {
    line3 = V2(line3);
    var d = ["M", line3.attr("x1"), line3.attr("y1"), "L", line3.attr("x2"), line3.attr("y2")].join(" ");
    return d;
  };
  V2.convertPolygonToPathData = function(polygon) {
    var points = V2.getPointsFromSvgNode(polygon);
    if (points.length === 0) return null;
    return V2.svgPointsToPath(points) + " Z";
  };
  V2.convertPolylineToPathData = function(polyline) {
    var points = V2.getPointsFromSvgNode(polyline);
    if (points.length === 0) return null;
    return V2.svgPointsToPath(points);
  };
  V2.svgPointsToPath = function(points) {
    for (var i = 0, n = points.length; i < n; i++) {
      points[i] = points[i].x + " " + points[i].y;
    }
    return "M " + points.join(" L");
  };
  V2.getPointsFromSvgNode = function(node) {
    node = V2.toNode(node);
    var points = [];
    var nodePoints = node.points;
    if (nodePoints) {
      for (var i = 0, n = nodePoints.numberOfItems; i < n; i++) {
        points.push(nodePoints.getItem(i));
      }
    }
    return points;
  };
  V2.KAPPA = 0.551784;
  V2.convertCircleToPathData = function(circle) {
    circle = V2(circle);
    var cx = parseFloat(circle.attr("cx")) || 0;
    var cy = parseFloat(circle.attr("cy")) || 0;
    var r = parseFloat(circle.attr("r"));
    var cd = r * V2.KAPPA;
    var d = [
      "M",
      cx,
      cy - r,
      // Move to the first point.
      "C",
      cx + cd,
      cy - r,
      cx + r,
      cy - cd,
      cx + r,
      cy,
      // I. Quadrant.
      "C",
      cx + r,
      cy + cd,
      cx + cd,
      cy + r,
      cx,
      cy + r,
      // II. Quadrant.
      "C",
      cx - cd,
      cy + r,
      cx - r,
      cy + cd,
      cx - r,
      cy,
      // III. Quadrant.
      "C",
      cx - r,
      cy - cd,
      cx - cd,
      cy - r,
      cx,
      cy - r,
      // IV. Quadrant.
      "Z"
    ].join(" ");
    return d;
  };
  V2.convertEllipseToPathData = function(ellipse3) {
    ellipse3 = V2(ellipse3);
    var cx = parseFloat(ellipse3.attr("cx")) || 0;
    var cy = parseFloat(ellipse3.attr("cy")) || 0;
    var rx = parseFloat(ellipse3.attr("rx"));
    var ry = parseFloat(ellipse3.attr("ry")) || rx;
    var cdx = rx * V2.KAPPA;
    var cdy = ry * V2.KAPPA;
    var d = [
      "M",
      cx,
      cy - ry,
      // Move to the first point.
      "C",
      cx + cdx,
      cy - ry,
      cx + rx,
      cy - cdy,
      cx + rx,
      cy,
      // I. Quadrant.
      "C",
      cx + rx,
      cy + cdy,
      cx + cdx,
      cy + ry,
      cx,
      cy + ry,
      // II. Quadrant.
      "C",
      cx - cdx,
      cy + ry,
      cx - rx,
      cy + cdy,
      cx - rx,
      cy,
      // III. Quadrant.
      "C",
      cx - rx,
      cy - cdy,
      cx - cdx,
      cy - ry,
      cx,
      cy - ry,
      // IV. Quadrant.
      "Z"
    ].join(" ");
    return d;
  };
  V2.convertRectToPathData = function(rect2) {
    rect2 = V2(rect2);
    return V2.rectToPath({
      x: parseFloat(rect2.attr("x")) || 0,
      y: parseFloat(rect2.attr("y")) || 0,
      width: parseFloat(rect2.attr("width")) || 0,
      height: parseFloat(rect2.attr("height")) || 0,
      rx: parseFloat(rect2.attr("rx")) || 0,
      ry: parseFloat(rect2.attr("ry")) || 0
    });
  };
  V2.rectToPath = function(r) {
    var d;
    var x = r.x;
    var y = r.y;
    var width = r.width;
    var height = r.height;
    var topRx = min5(r.rx || r["top-rx"] || 0, width / 2);
    var bottomRx = min5(r.rx || r["bottom-rx"] || 0, width / 2);
    var topRy = min5(r.ry || r["top-ry"] || 0, height / 2);
    var bottomRy = min5(r.ry || r["bottom-ry"] || 0, height / 2);
    if (topRx || bottomRx || topRy || bottomRy) {
      d = ["M", x, y + topRy, "v", height - topRy - bottomRy, "a", bottomRx, bottomRy, 0, 0, 0, bottomRx, bottomRy, "h", width - 2 * bottomRx, "a", bottomRx, bottomRy, 0, 0, 0, bottomRx, -bottomRy, "v", -(height - bottomRy - topRy), "a", topRx, topRy, 0, 0, 0, -topRx, -topRy, "h", -(width - 2 * topRx), "a", topRx, topRy, 0, 0, 0, -topRx, topRy, "Z"];
    } else {
      d = ["M", x, y, "H", x + width, "V", y + height, "H", x, "V", y, "Z"];
    }
    return d.join(" ");
  };
  V2.normalizePathData = function() {
    var spaces = "	\n\v\f\r   ᠎             　\u2028\u2029";
    var pathCommand = new RegExp("([a-z])[" + spaces + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + spaces + "]*,?[" + spaces + "]*)+)", "ig");
    var pathValues = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + spaces + "]*,?[" + spaces + "]*", "ig");
    var math2 = Math;
    var PI4 = math2.PI;
    var sin5 = math2.sin;
    var cos5 = math2.cos;
    var tan = math2.tan;
    var asin = math2.asin;
    var sqrt5 = math2.sqrt;
    var abs4 = math2.abs;
    function q2c(x1, y1, ax, ay, x2, y2) {
      var _132 = 1 / 3;
      var _232 = 2 / 3;
      return [_132 * x1 + _232 * ax, _132 * y1 + _232 * ay, _132 * x2 + _232 * ax, _132 * y2 + _232 * ay, x2, y2];
    }
    function rotate(x, y, rad) {
      var X = x * cos5(rad) - y * sin5(rad);
      var Y = x * sin5(rad) + y * cos5(rad);
      return {
        x: X,
        y: Y
      };
    }
    function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
      var _120 = PI4 * 120 / 180;
      var rad = PI4 / 180 * (+angle || 0);
      var res = [];
      var xy;
      if (!recursive) {
        xy = rotate(x1, y1, -rad);
        x1 = xy.x;
        y1 = xy.y;
        xy = rotate(x2, y2, -rad);
        x2 = xy.x;
        y2 = xy.y;
        var x = (x1 - x2) / 2;
        var y = (y1 - y2) / 2;
        var h = x * x / (rx * rx) + y * y / (ry * ry);
        if (h > 1) {
          h = sqrt5(h);
          rx = h * rx;
          ry = h * ry;
        }
        var rx2 = rx * rx;
        var ry2 = ry * ry;
        var k = (large_arc_flag == sweep_flag ? -1 : 1) * sqrt5(abs4((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
        var cx = k * rx * y / ry + (x1 + x2) / 2;
        var cy = k * -ry * x / rx + (y1 + y2) / 2;
        var f1 = asin(((y1 - cy) / ry).toFixed(9));
        var f2 = asin(((y2 - cy) / ry).toFixed(9));
        f1 = x1 < cx ? PI4 - f1 : f1;
        f2 = x2 < cx ? PI4 - f2 : f2;
        if (f1 < 0) f1 = PI4 * 2 + f1;
        if (f2 < 0) f2 = PI4 * 2 + f2;
        if (sweep_flag && f1 > f2) f1 = f1 - PI4 * 2;
        if (!sweep_flag && f2 > f1) f2 = f2 - PI4 * 2;
      } else {
        f1 = recursive[0];
        f2 = recursive[1];
        cx = recursive[2];
        cy = recursive[3];
      }
      var df = f2 - f1;
      if (abs4(df) > _120) {
        var f2old = f2;
        var x2old = x2;
        var y2old = y2;
        f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
        x2 = cx + rx * cos5(f2);
        y2 = cy + ry * sin5(f2);
        res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
      }
      df = f2 - f1;
      var c1 = cos5(f1);
      var s1 = sin5(f1);
      var c2 = cos5(f2);
      var s2 = sin5(f2);
      var t = tan(df / 4);
      var hx = 4 / 3 * (rx * t);
      var hy = 4 / 3 * (ry * t);
      var m1 = [x1, y1];
      var m2 = [x1 + hx * s1, y1 - hy * c1];
      var m3 = [x2 + hx * s2, y2 - hy * c2];
      var m4 = [x2, y2];
      m2[0] = 2 * m1[0] - m2[0];
      m2[1] = 2 * m1[1] - m2[1];
      if (recursive) {
        return [m2, m3, m4].concat(res);
      } else {
        res = [m2, m3, m4].concat(res).join().split(",");
        var newres = [];
        var ii = res.length;
        for (var i = 0; i < ii; i++) {
          newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
        }
        return newres;
      }
    }
    function parsePathString(pathString) {
      if (!pathString) return null;
      var paramCounts = {
        a: 7,
        c: 6,
        h: 1,
        l: 2,
        m: 2,
        q: 4,
        s: 4,
        t: 2,
        v: 1,
        z: 0
      };
      var data = [];
      String(pathString).replace(pathCommand, function(a, b, c) {
        var params = [];
        var name = b.toLowerCase();
        c.replace(pathValues, function(a2, b2) {
          if (b2) params.push(+b2);
        });
        if (name === "m" && params.length > 2) {
          data.push([b].concat(params.splice(0, 2)));
          name = "l";
          b = b === "m" ? "l" : "L";
        }
        while (params.length >= paramCounts[name]) {
          data.push([b].concat(params.splice(0, paramCounts[name])));
          if (!paramCounts[name]) break;
        }
      });
      return data;
    }
    function pathToAbsolute(pathArray) {
      if (!Array.isArray(pathArray) || !Array.isArray(pathArray && pathArray[0])) {
        pathArray = parsePathString(pathArray);
      }
      if (!pathArray || !pathArray.length) return [["M", 0, 0]];
      var res = [];
      var x = 0;
      var y = 0;
      var mx = 0;
      var my = 0;
      var start = 0;
      var pa0;
      var ii = pathArray.length;
      for (var i = start; i < ii; i++) {
        var r = [];
        res.push(r);
        var pa = pathArray[i];
        pa0 = pa[0];
        if (pa0 != pa0.toUpperCase()) {
          r[0] = pa0.toUpperCase();
          var jj;
          var j;
          switch (r[0]) {
            case "A":
              r[1] = pa[1];
              r[2] = pa[2];
              r[3] = pa[3];
              r[4] = pa[4];
              r[5] = pa[5];
              r[6] = +pa[6] + x;
              r[7] = +pa[7] + y;
              break;
            case "V":
              r[1] = +pa[1] + y;
              break;
            case "H":
              r[1] = +pa[1] + x;
              break;
            case "M":
              mx = +pa[1] + x;
              my = +pa[2] + y;
              jj = pa.length;
              for (j = 1; j < jj; j++) {
                r[j] = +pa[j] + (j % 2 ? x : y);
              }
              break;
            default:
              jj = pa.length;
              for (j = 1; j < jj; j++) {
                r[j] = +pa[j] + (j % 2 ? x : y);
              }
              break;
          }
        } else {
          var kk = pa.length;
          for (var k = 0; k < kk; k++) {
            r[k] = pa[k];
          }
        }
        switch (r[0]) {
          case "Z":
            x = +mx;
            y = +my;
            break;
          case "H":
            x = r[1];
            break;
          case "V":
            y = r[1];
            break;
          case "M":
            mx = r[r.length - 2];
            my = r[r.length - 1];
            x = r[r.length - 2];
            y = r[r.length - 1];
            break;
          default:
            x = r[r.length - 2];
            y = r[r.length - 1];
            break;
        }
      }
      return res;
    }
    function normalize(path) {
      var p = pathToAbsolute(path);
      var attrs = {
        x: 0,
        y: 0,
        bx: 0,
        by: 0,
        X: 0,
        Y: 0,
        qx: null,
        qy: null
      };
      function processPath(path2, d, pcom2) {
        var nx, ny;
        if (!path2) return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
        if (!(path2[0] in {
          T: 1,
          Q: 1
        })) {
          d.qx = null;
          d.qy = null;
        }
        switch (path2[0]) {
          case "M":
            d.X = path2[1];
            d.Y = path2[2];
            break;
          case "A":
            if (parseFloat(path2[1]) === 0 || parseFloat(path2[2]) === 0) {
              path2 = ["L", path2[6], path2[7]];
            } else {
              path2 = ["C"].concat(a2c.apply(0, [d.x, d.y].concat(path2.slice(1))));
            }
            break;
          case "S":
            if (pcom2 === "C" || pcom2 === "S") {
              nx = d.x * 2 - d.bx;
              ny = d.y * 2 - d.by;
            } else {
              nx = d.x;
              ny = d.y;
            }
            path2 = ["C", nx, ny].concat(path2.slice(1));
            break;
          case "T":
            if (pcom2 === "Q" || pcom2 === "T") {
              d.qx = d.x * 2 - d.qx;
              d.qy = d.y * 2 - d.qy;
            } else {
              d.qx = d.x;
              d.qy = d.y;
            }
            path2 = ["C"].concat(q2c(d.x, d.y, d.qx, d.qy, path2[1], path2[2]));
            break;
          case "Q":
            d.qx = path2[1];
            d.qy = path2[2];
            path2 = ["C"].concat(q2c(d.x, d.y, path2[1], path2[2], path2[3], path2[4]));
            break;
          case "H":
            path2 = ["L"].concat(path2[1], d.y);
            break;
          case "V":
            path2 = ["L"].concat(d.x, path2[1]);
            break;
          case "L":
            break;
          case "Z":
            break;
        }
        return path2;
      }
      function fixArc(pp, i2) {
        if (pp[i2].length > 7) {
          pp[i2].shift();
          var pi = pp[i2];
          while (pi.length) {
            pcoms[i2] = "A";
            pp.splice(i2++, 0, ["C"].concat(pi.splice(0, 6)));
          }
          pp.splice(i2, 1);
          ii = p.length;
        }
      }
      var pcoms = [];
      var pfirst = "";
      var pcom = "";
      var ii = p.length;
      for (var i = 0; i < ii; i++) {
        if (p[i]) pfirst = p[i][0];
        if (pfirst !== "C") {
          pcoms[i] = pfirst;
          if (i > 0) pcom = pcoms[i - 1];
        }
        p[i] = processPath(p[i], attrs, pcom);
        if (pcoms[i] !== "A" && pfirst === "C") pcoms[i] = "C";
        fixArc(p, i);
        var seg = p[i];
        var seglen = seg.length;
        attrs.x = seg[seglen - 2];
        attrs.y = seg[seglen - 1];
        attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
        attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
      }
      if (!p[0][0] || p[0][0] !== "M") {
        p.unshift(["M", 0, 0]);
      }
      return p;
    }
    return function(pathData) {
      return normalize(pathData).join(",").split(",").join(" ");
    };
  }();
  V2.namespace = ns;
  V2.g = g_exports;
  return V2;
}();
var V_default = V;

// node_modules/jointjs/src/config/index.mjs
var config = {
  // When set to `true` the cell selectors could be defined as CSS selectors.
  // If not, only JSON Markup selectors are taken into account.
  // export let useCSSSelectors = true;
  useCSSSelectors: true,
  // The class name prefix config is for advanced use only.
  // Be aware that if you change the prefix, the JointJS CSS will no longer function properly.
  // export let classNamePrefix = 'joint-';
  // export let defaultTheme = 'default';
  classNamePrefix: "joint-",
  defaultTheme: "default",
  // The maximum delay required for two consecutive touchend events to be interpreted
  // as a double-tap.
  doubleTapInterval: 300
};

// node_modules/jointjs/src/util/utilHelpers.mjs
var argsTag = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag = "[object Function]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var nullTag = "[object Null]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var symbolTag = "[object Symbol]";
var undefinedTag = "[object Undefined]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var CLONEABLE_TAGS = {
  [argsTag]: true,
  [arrayTag]: true,
  [arrayBufferTag]: true,
  [dataViewTag]: true,
  [boolTag]: true,
  [dateTag]: true,
  [float32Tag]: true,
  [float64Tag]: true,
  [int8Tag]: true,
  [int16Tag]: true,
  [int32Tag]: true,
  [mapTag]: true,
  [numberTag]: true,
  [objectTag]: true,
  [regexpTag]: true,
  [setTag]: true,
  [stringTag]: true,
  [symbolTag]: true,
  [uint8Tag]: true,
  [uint8ClampedTag]: true,
  [uint16Tag]: true,
  [uint32Tag]: true,
  [errorTag]: false,
  [funcTag]: false,
  [weakMapTag]: false
};
var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange = "\\u0300-\\u036f";
var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange = "\\u20d0-\\u20ff";
var rsComboMarksExtendedRange = "\\u1ab0-\\u1aff";
var rsComboMarksSupplementRange = "\\u1dc0-\\u1dff";
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
var rsDingbatRange = "\\u2700-\\u27bf";
var rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
var rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
var rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
var rsPunctuationRange = "\\u2000-\\u206f";
var rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
var rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
var rsVarRange = "\\ufe0e\\ufe0f";
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos = "['’]";
var rsBreak = `[${rsBreakRange}]`;
var rsCombo = `[${rsComboRange}]`;
var rsDigit = "\\d";
var rsDingbat = `[${rsDingbatRange}]`;
var rsLower = `[${rsLowerRange}]`;
var rsMisc = `[^${rsAstralRange}${rsBreakRange + rsDigit + rsDingbatRange + rsLowerRange + rsUpperRange}]`;
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = `(?:${rsCombo}|${rsFitz})`;
var rsNonAstral = `[^${rsAstralRange}]`;
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsUpper = `[${rsUpperRange}]`;
var rsZWJ = "\\u200d";
var rsMiscLower = `(?:${rsLower}|${rsMisc})`;
var rsMiscUpper = `(?:${rsUpper}|${rsMisc})`;
var rsOptContrLower = `(?:${rsApos}(?:d|ll|m|re|s|t|ve))?`;
var rsOptContrUpper = `(?:${rsApos}(?:D|LL|M|RE|S|T|VE))?`;
var reOptMod = `${rsModifier}?`;
var rsOptVar = `[${rsVarRange}]?`;
var rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join("|")})${rsOptVar + reOptMod})*`;
var rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])";
var rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsEmoji = `(?:${[rsDingbat, rsRegional, rsSurrPair].join("|")})${rsSeq}`;
var reUnicodeWords = RegExp([`${rsUpper}?${rsLower}+${rsOptContrLower}(?=${[rsBreak, rsUpper, "$"].join("|")})`, `${rsMiscUpper}+${rsOptContrUpper}(?=${[rsBreak, rsUpper + rsMiscLower, "$"].join("|")})`, `${rsUpper}?${rsMiscLower}+${rsOptContrLower}`, `${rsUpper}+${rsOptContrUpper}`, rsOrdUpper, rsOrdLower, `${rsDigit}+`, rsEmoji].join("|"), "g");
var LARGE_ARRAY_SIZE = 200;
var HASH_UNDEFINED = "__hash_undefined__";
var reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;
var rsAstral = `[${rsAstralRange}]`;
var rsNonAstralCombo = `${rsNonAstral}${rsCombo}?`;
var rsSymbol = `(?:${[rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral].join("|")})`;
var reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`, "g");
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
var charCodeOfDot = ".".charCodeAt(0);
var reEscapeChar = /\\(\\)?/g;
var rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  `[^.[\\]]+|\\[(?:([^"'][^[]*)|(["'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))`,
  "g"
);
var reIsUint = /^(?:0|[1-9]\d*)$/;
var hasUnicodeWord = RegExp.prototype.test.bind(/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/);
var MAX_ARRAY_INDEX = 4294967295 - 1;
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
var hasUnicode = (string) => {
  return reUnicode.test(string);
};
var unicodeToArray = (string) => {
  return string.match(reUnicode) || [];
};
var asciiToArray = (string) => {
  return string.split("");
};
var stringToArray = (string) => {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
};
var values = (object) => {
  if (object == null) {
    return [];
  }
  return keys(object).map((key) => object[key]);
};
var keys = (object) => {
  return isArrayLike(object) ? arrayLikeKeys(object) : Object.keys(Object(object));
};
var baseKeys = (object) => {
  if (!isPrototype(object)) {
    return Object.keys(object);
  }
  var result2 = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != "constructor") {
      result2.push(key);
    }
  }
  return result2;
};
var arrayLikeKeys = (value, inherited) => {
  const isArr = Array.isArray(value);
  const isArg = !isArr && isObjectLike(value) && getTag(value) === argsTag;
  const isType = !isArr && !isArg && isTypedArray(value);
  const skipIndexes = isArr || isArg || isType;
  const length2 = value.length;
  const result2 = new Array(skipIndexes ? length2 : 0);
  let index = skipIndexes ? -1 : length2;
  while (++index < length2) {
    result2[index] = `${index}`;
  }
  for (const key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key === "length" || // Skip index properties.
    isIndex(key, length2)))) {
      result2.push(key);
    }
  }
  return result2;
};
var assocIndexOf = (array, key) => {
  let {
    length: length2
  } = array;
  while (length2--) {
    if (eq(array[length2][0], key)) {
      return length2;
    }
  }
  return -1;
};
var eq = (value, other) => {
  return value === other || value !== value && other !== other;
};
var isObjectLike = (value) => {
  return value != null && typeof value == "object";
};
var isIterateeCall = (value, index, object) => {
  if (!isObject(object)) {
    return false;
  }
  const type = typeof index;
  const isPossibleIteratee = type == "number" ? isArrayLike(object) && index > -1 && index < object.length : type == "string" && index in object;
  if (isPossibleIteratee) {
    return eq(object[index], value);
  }
  return false;
};
var isSet = (value) => {
  return isObjectLike(value) && getTag(value) == setTag;
};
var isMap = (value) => {
  return isObjectLike(value) && getTag(value) == mapTag;
};
var isPrototype = (value) => {
  const Ctor = value && value.constructor;
  const proto = typeof Ctor === "function" && Ctor.prototype || Object.prototype;
  return value === proto;
};
var assignValue = (object, key, value) => {
  const objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    object[key] = value;
  }
};
var copyObject = (source, props3, object) => {
  let index = -1;
  const length2 = props3.length;
  while (++index < length2) {
    const key = props3[index];
    assignValue(object, key, source[key]);
  }
  return object;
};
var isArrayLike = (value) => {
  return value != null && typeof value !== "function" && typeof value.length === "number" && value.length > -1 && value.length % 1 === 0;
};
var isSymbol = (value) => {
  return typeof value == "symbol" || isObjectLike(value) && getTag(value) === symbolTag;
};
var initCloneArray = (array) => {
  const length2 = array.length;
  let result2 = new array.constructor(length2);
  if (length2 && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result2.index = array.index;
    result2.input = array.input;
  }
  return result2;
};
var copyArray = (source, array) => {
  let index = -1;
  const length2 = source.length;
  array || (array = new Array(length2));
  while (++index < length2) {
    array[index] = source[index];
  }
  return array;
};
var getTag = (value) => {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return Object.prototype.toString.call(value);
};
var cloneArrayBuffer = (arrayBuffer) => {
  const result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result2).set(new Uint8Array(arrayBuffer));
  return result2;
};
var cloneTypedArray = (typedArray, isDeep) => {
  const buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
};
var cloneRegExp = (regexp) => {
  const result2 = new regexp.constructor(regexp.source, /\w*$/.exec(regexp));
  result2.lastIndex = regexp.lastIndex;
  return result2;
};
var initCloneObject = (object) => {
  return typeof object.constructor == "function" && !isPrototype(object) ? Object.create(Object.getPrototypeOf(object)) : {};
};
var getSymbols = (object) => {
  if (object == null) {
    return [];
  }
  object = Object(object);
  const symbols = Object.getOwnPropertySymbols(object);
  return symbols.filter((symbol) => propertyIsEnumerable.call(object, symbol));
};
var copySymbols = (source, object) => {
  return copyObject(source, getSymbols(source), object);
};
function cloneDataView(dataView, isDeep) {
  const buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var initCloneByTag = (object, tag, isDeep) => {
  const Constructor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object, isDeep);
    case boolTag:
    case dateTag:
      return new Constructor(+object);
    case dataViewTag:
      return cloneDataView(object, isDeep);
    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return cloneTypedArray(object, isDeep);
    case mapTag:
      return new Constructor(object);
    case numberTag:
    case stringTag:
      return new Constructor(object);
    case regexpTag:
      return cloneRegExp(object);
    case setTag:
      return new Constructor();
    case symbolTag:
      return Symbol.prototype.valueOf ? Object(Symbol.prototype.valueOf.call(object)) : {};
  }
};
var isTypedArray = (value) => {
  return isObjectLike(value) && reTypedTag.test(getTag(value));
};
var getAllKeys = (object) => {
  const result2 = Object.keys(object);
  if (!Array.isArray(object) && object != null) {
    result2.push(...getSymbols(Object(object)));
  }
  return result2;
};
var getSymbolsIn = (object) => {
  const result2 = [];
  while (object) {
    result2.push(...getSymbols(object));
    object = Object.getPrototypeOf(Object(object));
  }
  return result2;
};
var getAllKeysIn = (object) => {
  const result2 = [];
  for (const key in object) {
    result2.push(key);
  }
  if (!Array.isArray(object)) {
    result2.push(...getSymbolsIn(object));
  }
  return result2;
};
var getMapData = ({
  __data__
}, key) => {
  const data = __data__;
  return isKeyable(key) ? data[typeof key === "string" ? "string" : "hash"] : data.map;
};
var equalObjects = (object, other, equalFunc, stack) => {
  const objProps = getAllKeys(object);
  const objLength = objProps.length;
  const othProps = getAllKeys(other);
  const othLength = othProps.length;
  if (objLength != othLength) {
    return false;
  }
  let key;
  let index = objLength;
  while (index--) {
    key = objProps[index];
    if (!hasOwnProperty.call(other, key)) {
      return false;
    }
  }
  const objStacked = stack.get(object);
  const othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  let result2 = true;
  stack.set(object, other);
  stack.set(other, object);
  let compared;
  let skipCtor;
  while (++index < objLength) {
    key = objProps[index];
    const objValue = object[key];
    const othValue = other[key];
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, stack) : compared)) {
      result2 = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result2 && !skipCtor) {
    const objCtor = object.constructor;
    const othCtor = other.constructor;
    if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor === "function" && objCtor instanceof objCtor && typeof othCtor === "function" && othCtor instanceof othCtor)) {
      result2 = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result2;
};
var baseIsEqual = (value, other, stack) => {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, stack);
};
var baseIsEqualDeep = (object, other, equalFunc, stack) => {
  let objIsArr = Array.isArray(object);
  const othIsArr = Array.isArray(other);
  let objTag = objIsArr ? arrayTag : getTag(object);
  let othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  let objIsObj = objTag == objectTag;
  const othIsObj = othTag == objectTag;
  const isSameTag = objTag == othTag;
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, false, equalFunc, stack) : equalByTag(object, other, objTag, equalFunc, stack);
  }
  const objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__");
  const othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
  if (objIsWrapped || othIsWrapped) {
    const objUnwrapped = objIsWrapped ? object.value() : object;
    const othUnwrapped = othIsWrapped ? other.value() : other;
    stack || (stack = new Stack());
    return equalFunc(objUnwrapped, othUnwrapped, stack);
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, equalFunc, stack);
};
var equalArrays = (array, other, compareUnordered, equalFunc, stack) => {
  const isPartial = false;
  const arrLength = array.length;
  const othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  const arrStacked = stack.get(array);
  const othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  let index = -1;
  let result2 = true;
  const seen = compareUnordered ? new SetCache() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    let compared;
    const arrValue = array[index];
    const othValue = other[index];
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result2 = false;
      break;
    }
    if (seen) {
      if (!some(other, (othValue2, othIndex) => {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result2 = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, stack))) {
      result2 = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result2;
};
var some = (array, predicate) => {
  let index = -1;
  const length2 = array == null ? 0 : array.length;
  while (++index < length2) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
};
var cacheHas = (cache, key) => {
  return cache.has(key);
};
var compareArrayBufferTag = (object, other, equalFunc, stack) => {
  if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other), stack)) {
    return false;
  }
  return true;
};
var equalByTag = (object, other, tag, equalFunc, stack) => {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
      return compareArrayBufferTag(object, other, equalFunc, stack);
    case arrayBufferTag:
      return compareArrayBufferTag(object, other, equalFunc, stack);
    case boolTag:
    case dateTag:
    case numberTag:
      return eq(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == `${other}`;
    case mapTag:
      let convert = mapToArray;
    // Intentional fallthrough
    // eslint-disable-next-line no-fallthrough
    case setTag:
      convert || (convert = setToArray);
      if (object.size != other.size) {
        return false;
      }
      const stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      stack.set(object, other);
      const result2 = equalArrays(convert(object), convert(other), true, equalFunc, stack);
      stack["delete"](object);
      return result2;
    case symbolTag:
      return Symbol.prototype.valueOf.call(object) == Symbol.prototype.valueOf.call(other);
  }
  return false;
};
var mapToArray = (map) => {
  let index = -1;
  let result2 = Array(map.size);
  map.forEach((value, key) => {
    result2[++index] = [key, value];
  });
  return result2;
};
var setToArray = (set2) => {
  let index = -1;
  const result2 = new Array(set2.size);
  set2.forEach((value) => {
    result2[++index] = value;
  });
  return result2;
};
var isKey = (value, object) => {
  if (Array.isArray(value)) {
    return false;
  }
  const type = typeof value;
  if (type === "number" || type === "boolean" || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
};
var stringToPath = (string) => {
  const result2 = [];
  if (string.charCodeAt(0) === charCodeOfDot) {
    result2.push("");
  }
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match;
    if (quote) {
      key = subString.replace(reEscapeChar, "$1");
    } else if (expression) {
      key = expression.trim();
    }
    result2.push(key);
  });
  return result2;
};
var castPath = (path, object) => {
  if (Array.isArray(path)) {
    return path;
  }
  return isKey(path, object) ? [path] : stringToPath(`${path}`);
};
var get = (object, path) => {
  path = castPath(path, object);
  let index = 0;
  const length2 = path.length;
  while (object != null && index < length2) {
    object = object[toKey(path[index])];
    index++;
  }
  return index && index == length2 ? object : void 0;
};
function compareAscending(value, other) {
  if (value !== other) {
    const valIsDefined = value !== void 0;
    const valIsNull = value === null;
    const valIsReflexive = value === value;
    const valIsSymbol = isSymbol(value);
    const othIsDefined = other !== void 0;
    const othIsNull = other === null;
    const othIsReflexive = other === other;
    const othIsSymbol = isSymbol(other);
    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }
    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}
function compareMultiple(object, other, orders) {
  let index = -1;
  const objCriteria = object.criteria;
  const othCriteria = other.criteria;
  const length2 = objCriteria.length;
  const ordersLength = orders.length;
  while (++index < length2) {
    const order = index < ordersLength ? orders[index] : null;
    const cmpFn = order && typeof order === "function" ? order : compareAscending;
    const result2 = cmpFn(objCriteria[index], othCriteria[index]);
    if (result2) {
      if (order && typeof order !== "function") {
        return result2 * (order == "desc" ? -1 : 1);
      }
      return result2;
    }
  }
  return object.index - other.index;
}
var diff = (array, values2) => {
  let includes = (array2, value) => {
    const length2 = array2 == null ? 0 : array2.length;
    return !!length2 && array2.indexOf(value) > -1;
  };
  let isCommon = true;
  const result2 = [];
  const valuesLength = values2.length;
  if (!array.length) {
    return result2;
  }
  if (values2.length >= LARGE_ARRAY_SIZE) {
    includes = (cache, key) => cache.has(key);
    isCommon = false;
    values2 = new SetCache(values2);
  }
  outer: for (let key in array) {
    let value = array[key];
    const computed = value;
    value = value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values2[valuesIndex] === computed) {
          continue outer;
        }
      }
      result2.push(value);
    } else if (!includes(values2, computed)) {
      result2.push(value);
    }
  }
  return result2;
};
var intersect = (arrays) => {
  const includes = (array2, value) => {
    const length3 = array2 == null ? 0 : array2.length;
    return !!length3 && array2.indexOf(value) > -1;
  };
  const cacheHas2 = (cache, key) => cache.has(key);
  const length2 = arrays[0].length;
  const othLength = arrays.length;
  const caches = new Array(othLength);
  const result2 = [];
  let array;
  let maxLength = Infinity;
  let othIndex = othLength;
  while (othIndex--) {
    array = arrays[othIndex];
    maxLength = Math.min(array.length, maxLength);
    caches[othIndex] = length2 >= 120 && array.length >= 120 ? new SetCache(othIndex && array) : void 0;
  }
  array = arrays[0];
  let index = -1;
  const seen = caches[0];
  outer: while (++index < length2 && result2.length < maxLength) {
    let value = array[index];
    const computed = value;
    value = value !== 0 ? value : 0;
    if (!(seen ? cacheHas2(seen, computed) : includes(result2, computed))) {
      othIndex = othLength;
      while (--othIndex) {
        const cache = caches[othIndex];
        if (!(cache ? cacheHas2(cache, computed) : includes(arrays[othIndex], computed))) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(computed);
      }
      result2.push(value);
    }
  }
  return result2;
};
var toKey = (value) => {
  if (typeof value === "string" || isSymbol(value)) {
    return value;
  }
  const result2 = `${value}`;
  return result2 == "0" && 1 / value == -Infinity ? "-0" : result2;
};
var baseClone = (value, isDeep = false, isFlat = false, isFull = true, customizer, key, object, stack) => {
  let result2;
  if (customizer) {
    result2 = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result2 !== void 0) {
    return result2;
  }
  if (!isObject(value)) {
    return value;
  }
  const isArr = Array.isArray(value);
  const tag = getTag(value);
  if (isArr) {
    result2 = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result2);
    }
  } else {
    const isFunc = typeof value === "function";
    if (tag === objectTag || tag === argsTag || isFunc && !object) {
      result2 = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, copyObject(value, Object.keys(value), result2)) : copySymbols(value, Object.assign(result2, value));
      }
    } else {
      if (isFunc || !CLONEABLE_TAGS[tag]) {
        return object ? value : {};
      }
      result2 = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  const stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result2);
  if (isMap(value)) {
    value.forEach((subValue, key2) => {
      result2.set(key2, baseClone(subValue, isDeep, isFlat, isFull, customizer, key2, value, stack));
    });
    return result2;
  }
  if (isSet(value)) {
    value.forEach((subValue) => {
      result2.add(baseClone(subValue, isDeep, isFlat, isFull, customizer, subValue, value, stack));
    });
    return result2;
  }
  if (isTypedArray(value)) {
    return result2;
  }
  const keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  const props3 = isArr ? void 0 : keysFunc(value);
  (props3 || value).forEach((subValue, key2) => {
    if (props3) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result2, key2, baseClone(subValue, isDeep, isFlat, isFull, customizer, key2, value, stack));
  });
  return result2;
};
var copySymbolsIn = (source, object) => {
  return copyObject(source, getSymbolsIn(source), object);
};
var parent = (object, path) => {
  return path.length < 2 ? object : get(object, path.slice(0, -1));
};
var set = (object, path, value) => {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);
  const length2 = path.length;
  const lastIndex = length2 - 1;
  let index = -1;
  let nested = object;
  while (nested != null && ++index < length2) {
    const key = toKey(path[index]);
    let newValue = value;
    if (index != lastIndex) {
      const objValue = nested[key];
      newValue = void 0;
      if (newValue === void 0) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
};
var isIndex = (value, length2) => {
  const type = typeof value;
  length2 = length2 == null ? Number.MAX_SAFE_INTEGER : length2;
  return !!length2 && (type === "number" || type !== "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length2;
};
var unset = (object, path) => {
  path = castPath(path, object);
  object = parent(object, path);
  const lastSegment = path[path.length - 1];
  return object == null || delete object[toKey(lastSegment)];
};
var isKeyable = (value) => {
  const type = typeof value;
  return type === "string" || type === "number" || type === "symbol" || type === "boolean" ? value !== "__proto__" : value === null;
};
var keysIn = (object) => {
  const result2 = [];
  for (const key in object) {
    result2.push(key);
  }
  return result2;
};
var toPlainObject = (value) => {
  value = Object(value);
  const result2 = {};
  for (const key in value) {
    result2[key] = value[key];
  }
  return result2;
};
var safeGet = (object, key) => {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
};
function createAssigner(assigner, isMerge = false) {
  return (object, ...sources) => {
    let index = -1;
    let length2 = sources.length;
    let customizer = length2 > 1 ? sources[length2 - 1] : void 0;
    const guard = length2 > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer === "function" ? (length2--, customizer) : isMerge ? (a, b) => {
      if (Array.isArray(a) && !Array.isArray(b)) {
        return b;
      }
    } : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length2 < 3 ? void 0 : customizer;
      length2 = 1;
    }
    object = Object(object);
    while (++index < length2) {
      const source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  };
}
var baseMerge = (object, source, srcIndex, customizer, stack) => {
  if (object === source) {
    return;
  }
  forIn(source, (srcValue, key) => {
    if (isObject(srcValue)) {
      stack || (stack = new Stack());
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      let newValue = customizer ? customizer(object[key], srcValue, `${key}`, object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
};
var baseMergeDeep = (object, source, key, srcIndex, mergeFunc, customizer, stack) => {
  const objValue = safeGet(object, key);
  const srcValue = safeGet(source, key);
  const stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  let newValue = customizer ? customizer(objValue, srcValue, `${key}`, object, source, stack) : void 0;
  let isCommon = newValue === void 0;
  if (isCommon) {
    const isArr = Array.isArray(srcValue);
    const isTyped = !isArr && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isTyped) {
      if (Array.isArray(objValue)) {
        newValue = objValue;
      } else if (isObjectLike(objValue) && isArrayLike(objValue)) {
        newValue = copyArray(objValue);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (typeof objValue === "function" || !isObject(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
};
var assignMergeValue = (object, key, value) => {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    assignValue(object, key, value);
  }
};
function baseFor(object, iteratee, keysFunc) {
  const iterable = Object(object);
  const props3 = keysFunc(object);
  let {
    length: length2
  } = props3;
  let index = -1;
  while (length2--) {
    const key = props3[++index];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }
  return object;
}
var baseForOwn = (object, iteratee) => {
  return object && baseFor(object, iteratee, keys);
};
var baseEach = (collection, iteratee) => {
  if (collection == null) {
    return collection;
  }
  if (!isArrayLike(collection)) {
    return baseForOwn(collection, iteratee);
  }
  const length2 = collection.length;
  const iterable = Object(collection);
  let index = -1;
  while (++index < length2) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }
  return collection;
};
function last(array) {
  const length2 = array == null ? 0 : array.length;
  return length2 ? array[length2 - 1] : void 0;
}
var createSet = Set && 1 / setToArray(/* @__PURE__ */ new Set([void 0, -0]))[1] == 1 / 0 ? (values2) => new Set(values2) : () => {
};
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    stack.set(srcValue, objValue);
    baseMerge(objValue, srcValue, void 0, customDefaultsMerge, stack);
    stack["delete"](srcValue);
  }
  return objValue;
}
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = iteratees.map((iteratee) => {
      if (Array.isArray(iteratee)) {
        return (value) => get(value, iteratee.length === 1 ? iteratee[0] : iteratee);
      }
      return iteratee;
    });
  } else {
    iteratees = [(value) => value];
  }
  let criteriaIndex = -1;
  let eachIndex = -1;
  const result2 = isArrayLike(collection) ? new Array(collection.length) : [];
  baseEach(collection, (value) => {
    const criteria = iteratees.map((iteratee) => iteratee(value));
    result2[++eachIndex] = {
      criteria,
      index: ++criteriaIndex,
      value
    };
  });
  return baseSortBy(result2, (object, other) => compareMultiple(object, other, orders));
}
function baseSortBy(array, comparer) {
  let {
    length: length2
  } = array;
  array.sort(comparer);
  while (length2--) {
    array[length2] = array[length2].value;
  }
  return array;
}
function isStrictComparable(value) {
  return value === value && !isObject(value);
}
function matchesStrictComparable(key, srcValue) {
  return (object) => {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return (object) => {
    const objValue = get(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue);
  };
}
function baseMatches(source) {
  const matchData = getMatchData(source);
  if (matchData.length === 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return (object) => object === source || baseIsMatch(object, source, matchData);
}
function getMatchData(object) {
  const result2 = keys(object);
  let length2 = result2.length;
  while (length2--) {
    const key = result2[length2];
    const value = object[key];
    result2[length2] = [key, value, isStrictComparable(value)];
  }
  return result2;
}
function baseIsMatch(object, source, matchData, customizer) {
  let index = matchData.length;
  const length2 = index;
  const noCustomizer = !customizer;
  if (object == null) {
    return !length2;
  }
  let data;
  let result2;
  object = Object(object);
  while (index--) {
    data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length2) {
    data = matchData[index];
    const key = data[0];
    const objValue = object[key];
    const srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      const stack = new Stack();
      if (customizer) {
        result2 = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result2 === void 0 ? baseIsEqual(srcValue, objValue, stack) : result2)) {
        return false;
      }
    }
  }
  return true;
}
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
function baseProperty(key) {
  return (object) => object == null ? void 0 : object[key];
}
function basePropertyDeep(path) {
  return (object) => get(object, path);
}
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return (val) => val;
  }
  if (typeof value == "object") {
    return Array.isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}
function getIteratee() {
  const result2 = baseIteratee;
  return arguments.length ? result2(arguments[0], arguments[1]) : result2;
}
var arrayReduce = (array, iteratee, accumulator, initAccum) => {
  let index = -1;
  const length2 = array == null ? 0 : array.length;
  if (initAccum && length2) {
    accumulator = array[++index];
  }
  while (++index < length2) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
};
var baseReduce = (collection, iteratee, accumulator, initAccum, eachFunc) => {
  eachFunc(collection, (value, index, collection2) => {
    accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
  });
  return accumulator;
};
function reduce(collection, iteratee, accumulator) {
  const func = Array.isArray(collection) ? arrayReduce : baseReduce;
  const initAccum = arguments.length < 3;
  return func(collection, iteratee, accumulator, initAccum, baseEach);
}
var isFlattenable = (value) => {
  return Array.isArray(value) || isArguments(value) || !!(value && value[Symbol.isConcatSpreadable]);
};
function baseFlatten(array, depth, predicate, isStrict, result2) {
  let index = -1;
  const length2 = array.length;
  predicate || (predicate = isFlattenable);
  result2 || (result2 = []);
  while (++index < length2) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result2);
      } else {
        result2.push(...value);
      }
    } else if (!isStrict) {
      result2[result2.length] = value;
    }
  }
  return result2;
}
var isArguments = (value) => {
  return isObjectLike(value) && getTag(value) == "[object Arguments]";
};
var basePick = (object, paths) => {
  return basePickBy(object, paths, (value, path) => hasIn(object, path));
};
var basePickBy = (object, paths, predicate) => {
  let index = -1;
  const length2 = paths.length;
  const result2 = {};
  while (++index < length2) {
    const path = paths[index];
    const value = get(object, path);
    if (predicate(value, path)) {
      set(result2, castPath(path, object), value);
    }
  }
  return result2;
};
var isLength = (value) => {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
};
var baseHasIn = (object, key) => {
  return object != null && key in Object(object);
};
var hasPath = (object, path, hasFunc) => {
  path = castPath(path, object);
  var index = -1, length2 = path.length, result2 = false;
  while (++index < length2) {
    var key = toKey(path[index]);
    if (!(result2 = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result2 || ++index != length2) {
    return result2;
  }
  length2 = object == null ? 0 : object.length;
  return !!length2 && isLength(length2) && isIndex(key, length2) && (Array.isArray(object) || isArguments(object));
};
var asciiWords = (string) => {
  return string.match(reAsciiWord);
};
var unicodeWords = (string) => {
  return string.match(reUnicodeWords);
};
var words = (string, pattern) => {
  if (pattern === void 0) {
    const result2 = hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
    return result2 || [];
  }
  return string.match(pattern) || [];
};
var castSlice = (array, start, end) => {
  const {
    length: length2
  } = array;
  end = end === void 0 ? length2 : end;
  return !start && end >= length2 ? array : array.slice(start, end);
};
var upperFirst = createCaseFirst("toUpperCase");
function createCaseFirst(methodName) {
  return (string) => {
    if (!string) {
      return "";
    }
    const strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
    const chr = strSymbols ? strSymbols[0] : string[0];
    const trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var Stack = class {
  constructor(entries) {
    const data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  clear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  delete(key) {
    const data = this.__data__;
    const result2 = data["delete"](key);
    this.size = data.size;
    return result2;
  }
  get(key) {
    return this.__data__.get(key);
  }
  has(key) {
    return this.__data__.has(key);
  }
  set(key, value) {
    let data = this.__data__;
    if (data instanceof ListCache) {
      const pairs = data.__data__;
      if (pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
};
var ListCache = class {
  constructor(entries) {
    let index = -1;
    const length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length2) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  clear() {
    this.__data__ = [];
    this.size = 0;
  }
  delete(key) {
    const data = this.__data__;
    const index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    const lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      data.splice(index, 1);
    }
    --this.size;
    return true;
  }
  get(key) {
    const data = this.__data__;
    const index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  has(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  set(key, value) {
    const data = this.__data__;
    const index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
};
var MapCache = class {
  constructor(entries) {
    let index = -1;
    const length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length2) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  clear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": /* @__PURE__ */ new Map(),
      "string": new Hash()
    };
  }
  delete(key) {
    const result2 = getMapData(this, key)["delete"](key);
    this.size -= result2 ? 1 : 0;
    return result2;
  }
  get(key) {
    return getMapData(this, key).get(key);
  }
  has(key) {
    return getMapData(this, key).has(key);
  }
  set(key, value) {
    const data = getMapData(this, key);
    const size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
};
var Hash = class {
  constructor(entries) {
    let index = -1;
    const length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length2) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  clear() {
    this.__data__ = /* @__PURE__ */ Object.create(null);
    this.size = 0;
  }
  delete(key) {
    const result2 = this.has(key) && delete this.__data__[key];
    this.size -= result2 ? 1 : 0;
    return result2;
  }
  get(key) {
    const data = this.__data__;
    const result2 = data[key];
    return result2 === HASH_UNDEFINED ? void 0 : result2;
  }
  has(key) {
    const data = this.__data__;
    return data[key] !== void 0;
  }
  set(key, value) {
    const data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
};
var SetCache = class {
  constructor(values2) {
    let index = -1;
    const length2 = values2 == null ? 0 : values2.length;
    this.__data__ = new MapCache();
    while (++index < length2) {
      this.add(values2[index]);
    }
  }
  add(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  has(value) {
    return this.__data__.has(value);
  }
};
SetCache.prototype.push = SetCache.prototype.add;
var isBoolean = function(value) {
  var toString = Object.prototype.toString;
  return value === true || value === false || !!value && typeof value === "object" && toString.call(value) === boolTag;
};
var isObject = function(value) {
  return !!value && (typeof value === "object" || typeof value === "function");
};
var isNumber = function(value) {
  var toString = Object.prototype.toString;
  return typeof value === "number" || !!value && typeof value === "object" && toString.call(value) === numberTag;
};
var isString = function(value) {
  var toString = Object.prototype.toString;
  return typeof value === "string" || !!value && typeof value === "object" && toString.call(value) === stringTag;
};
var assign = createAssigner((object, source) => {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});
var mixin = assign;
var deepMixin = mixin;
var supplement = (object, ...sources) => {
  let index = -1;
  let length2 = sources.length;
  const guard = length2 > 2 ? sources[2] : void 0;
  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    length2 = 1;
  }
  while (++index < length2) {
    const source = sources[index];
    if (source == null) {
      continue;
    }
    const props3 = Object.keys(source);
    const propsLength = props3.length;
    let propsIndex = -1;
    while (++propsIndex < propsLength) {
      const key = props3[propsIndex];
      const value = object[key];
      if (value === void 0 || eq(value, Object.prototype[key]) && !hasOwnProperty.call(object, key)) {
        object[key] = source[key];
      }
    }
  }
  return object;
};
var defaults = supplement;
var deepSupplement = function defaultsDeep(...args) {
  args.push(void 0, customDefaultsMerge);
  return merge.apply(void 0, args);
};
var defaultsDeep2 = deepSupplement;
var invoke = (collection, path, ...args) => {
  let index = -1;
  const isFunc = typeof path === "function";
  const result2 = isArrayLike(collection) ? new Array(collection.length) : [];
  baseEach(collection, (value) => {
    result2[++index] = isFunc ? path.apply(value, args) : invokeProperty(value, path, ...args);
  });
  return result2;
};
var invokeProperty = (object, path, ...args) => {
  path = castPath(path, object);
  object = parent(object, path);
  const func = object == null ? object : object[toKey(last(path))];
  return func == null ? void 0 : func.apply(object, args);
};
var sortedIndex = (array, value, iteratee) => {
  let low = 0;
  let high = array == null ? 0 : array.length;
  if (high == 0) {
    return 0;
  }
  iteratee = getIteratee(iteratee, 2);
  value = iteratee(value);
  const valIsNaN = value !== value;
  const valIsNull = value === null;
  const valIsSymbol = isSymbol(value);
  const valIsUndefined = value === void 0;
  while (low < high) {
    let setLow;
    const mid = Math.floor((low + high) / 2);
    const computed = iteratee(array[mid]);
    const othIsDefined = computed !== void 0;
    const othIsNull = computed === null;
    const othIsReflexive = computed === computed;
    const othIsSymbol = isSymbol(computed);
    if (valIsNaN) {
      setLow = othIsReflexive;
    } else if (valIsUndefined) {
      setLow = othIsReflexive && othIsDefined;
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && !othIsNull;
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && !othIsSymbol;
    } else if (othIsNull || othIsSymbol) {
      setLow = false;
    } else {
      setLow = computed < value;
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return Math.min(high, MAX_ARRAY_INDEX);
};
var uniq = (array, iteratee) => {
  let index = -1;
  let includes = (array2, value) => {
    const length3 = array2 == null ? 0 : array2.length;
    return !!length3 && array2.indexOf(value) > -1;
  };
  iteratee = getIteratee(iteratee, 2);
  let isCommon = true;
  const {
    length: length2
  } = array;
  const result2 = [];
  let seen = result2;
  if (length2 >= LARGE_ARRAY_SIZE) {
    const set2 = iteratee ? null : createSet(array);
    if (set2) {
      return setToArray(set2);
    }
    isCommon = false;
    includes = (cache, key) => cache.has(key);
    seen = new SetCache();
  } else {
    seen = iteratee ? [] : result2;
  }
  outer: while (++index < length2) {
    let value = array[index];
    const computed = iteratee ? iteratee(value) : value;
    value = value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      let seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result2.push(value);
    } else if (!includes(seen, computed)) {
      if (seen !== result2) {
        seen.push(computed);
      }
      result2.push(value);
    }
  }
  return result2;
};
var clone = (value) => baseClone(value);
var cloneDeep = (value) => baseClone(value, true);
var isEmpty = (value) => {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) && (Array.isArray(value) || typeof value === "string" || typeof value.splice === "function" || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  const tag = getTag(value);
  if (tag == "[object Map]" || tag == "[object Set]") {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
};
var isEqual = (object, other) => baseIsEqual(object, other);
var isFunction = (value) => typeof value === "function";
var isPlainObject = (value) => {
  if (!isObjectLike(value) || getTag(value) != "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};
var toArray = (value) => {
  if (!value) {
    return [];
  }
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value);
  }
  if (Symbol.iterator && Symbol.iterator in Object(value)) {
    const iterator = value[Symbol.iterator]();
    let data;
    const result2 = [];
    while (!(data = iterator.next()).done) {
      result2.push(data.value);
    }
    return result2;
  }
  const tag = getTag(value);
  const func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
  return func(value);
};
function debounce(func, wait, opt) {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  let lastArgs;
  let lastThis;
  let maxWait;
  let result2;
  let timerId;
  let lastCallTime;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;
  const useRaf = !wait && wait !== 0 && window && typeof window.requestAnimationFrame === "function";
  wait = +wait || 0;
  if (isObject(opt)) {
    leading = !!opt.leading;
    maxing = "maxWait" in opt;
    maxWait = maxing ? Math.max(+opt.maxWait || 0, wait) : maxWait;
    trailing = "trailing" in opt ? !!opt.trailing : trailing;
  }
  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result2 = func.apply(thisArg, args);
    return result2;
  }
  function startTimer(pendingFunc, wait2) {
    if (useRaf) {
      window.cancelAnimationFrame(timerId);
      return window.requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, wait2);
  }
  function cancelTimer(id) {
    if (useRaf) {
      return window.cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = startTimer(timerExpired, wait);
    return leading ? invokeFunc(time) : result2;
  }
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = startTimer(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result2;
  }
  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = startTimer(timerExpired, wait);
    }
    return result2;
  }
  debounced.cancel = () => {
    if (timerId !== void 0) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  };
  debounced.flush = () => timerId === void 0 ? result2 : trailingEdge(Date.now());
  debounced.pending = () => timerId !== void 0;
  return debounced;
}
var groupBy = (collection, iteratee) => {
  iteratee = getIteratee(iteratee, 2);
  return reduce(collection, (result2, value, key) => {
    key = iteratee(value);
    if (hasOwnProperty.call(result2, key)) {
      result2[key].push(value);
    } else {
      assignValue(result2, key, [value]);
    }
    return result2;
  }, {});
};
var sortBy = (collection, iteratees = []) => {
  if (collection == null) {
    return [];
  }
  const length2 = iteratees.length;
  if (length2 > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length2 > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  if (!Array.isArray(iteratees)) {
    iteratees = [getIteratee(iteratees, 2)];
  }
  return baseOrderBy(collection, iteratees.flat(1), []);
};
var flattenDeep = (array) => {
  const length2 = array == null ? 0 : array.length;
  return length2 ? baseFlatten(array, Infinity) : [];
};
var without = (array, ...values2) => isArrayLike(array) ? diff(array, values2) : [];
var difference = (array, ...values2) => isObjectLike(array) && isArrayLike(array) ? diff(array, values2.flat(1)) : [];
var intersection2 = (...arrays) => {
  const mapped = arrays.map((array) => isObjectLike(array) && isArrayLike(array) ? array : []);
  return mapped.length && mapped[0] === arrays[0] ? intersect(mapped) : [];
};
var union = (...arrays) => {
  const array = arrays.flat(1);
  return uniq(array);
};
var has = (object, key) => {
  if (object == null) {
    return false;
  }
  if (typeof key === "string") {
    key = key.split(".");
  }
  let index = -1;
  let value = object;
  while (++index < key.length) {
    if (!value || !hasOwnProperty.call(value, key[index])) {
      return false;
    }
    value = value[key[index]];
  }
  return true;
};
var result = (object, path, defaultValue) => {
  path = castPath(path, object);
  let index = -1;
  let length2 = path.length;
  if (!length2) {
    length2 = 1;
    object = void 0;
  }
  while (++index < length2) {
    let value = object == null ? void 0 : object[toKey(path[index])];
    if (value === void 0) {
      index = length2;
      value = defaultValue;
    }
    object = typeof value === "function" ? value.call(object) : value;
  }
  return object;
};
var omit = (object, ...paths) => {
  let result2 = {};
  if (object == null) {
    return result2;
  }
  let isDeep = false;
  paths = paths.flat(1).map((path) => {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result2);
  if (isDeep) {
    result2 = baseClone(result2, true, true, true, (value) => isPlainObject(value) ? void 0 : value);
  }
  let length2 = paths.length;
  while (length2--) {
    unset(result2, paths[length2]);
  }
  return result2;
};
var pick = (object, ...paths) => {
  return object == null ? {} : basePick(object, paths.flat(Infinity));
};
var bindAll = (object, ...methodNames) => {
  methodNames.flat(1).forEach((key) => {
    key = toKey(key);
    assignValue(object, key, object[key].bind(object));
  });
  return object;
};
var forIn = (object, iteratee = (value) => value) => {
  let index = -1;
  const iterable = Object(object);
  const props3 = isArrayLike(object) ? arrayLikeKeys(object, true) : keysIn(object);
  let length2 = props3.length;
  while (length2--) {
    const key = props3[++index];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }
};
var camelCase = (string = "") => words(`${string}`.replace(/['\u2019]/g, "")).reduce((result2, word, index) => {
  word = word.toLowerCase();
  return result2 + (index ? upperFirst(word) : word);
}, "");
var idCounter = 0;
var uniqueId = (prefix = "") => {
  const id = ++idCounter;
  return `${prefix}` + id;
};
var merge = createAssigner((object, source, srcIndex, customizer) => {
  baseMerge(object, source, srcIndex, customizer);
}, true);

// node_modules/jointjs/src/util/util.mjs
var addClassNamePrefix = function(className2) {
  if (!className2) return className2;
  return className2.toString().split(" ").map(function(_className) {
    if (_className.substr(0, config.classNamePrefix.length) !== config.classNamePrefix) {
      _className = config.classNamePrefix + _className;
    }
    return _className;
  }).join(" ");
};
var removeClassNamePrefix = function(className2) {
  if (!className2) return className2;
  return className2.toString().split(" ").map(function(_className) {
    if (_className.substr(0, config.classNamePrefix.length) === config.classNamePrefix) {
      _className = _className.substr(config.classNamePrefix.length);
    }
    return _className;
  }).join(" ");
};
var parseDOMJSON = function(json, namespace) {
  const selectors = {};
  const groupSelectors = {};
  const svgNamespace = V_default.namespace.svg;
  const ns = namespace || svgNamespace;
  const fragment = document.createDocumentFragment();
  const parseNode = function(siblingsDef, parentNode, ns2) {
    for (let i = 0; i < siblingsDef.length; i++) {
      const nodeDef = siblingsDef[i];
      if (typeof nodeDef === "string") {
        const textNode = document.createTextNode(nodeDef);
        parentNode.appendChild(textNode);
        continue;
      }
      if (!nodeDef.hasOwnProperty("tagName")) throw new Error("json-dom-parser: missing tagName");
      const tagName = nodeDef.tagName;
      let node;
      if (nodeDef.hasOwnProperty("namespaceURI")) ns2 = nodeDef.namespaceURI;
      node = document.createElementNS(ns2, tagName);
      const svg2 = ns2 === svgNamespace;
      const wrapper = svg2 ? V_default : import_jquery.default;
      const attributes2 = nodeDef.attributes;
      if (attributes2) wrapper(node).attr(attributes2);
      const style = nodeDef.style;
      if (style) (0, import_jquery.default)(node).css(style);
      if (nodeDef.hasOwnProperty("className")) {
        const className2 = nodeDef.className;
        if (svg2) {
          node.className.baseVal = className2;
        } else {
          node.className = className2;
        }
      }
      if (nodeDef.hasOwnProperty("textContent")) {
        node.textContent = nodeDef.textContent;
      }
      if (nodeDef.hasOwnProperty("selector")) {
        const nodeSelector = nodeDef.selector;
        if (selectors[nodeSelector]) throw new Error("json-dom-parser: selector must be unique");
        selectors[nodeSelector] = node;
        wrapper(node).attr("joint-selector", nodeSelector);
      }
      if (nodeDef.hasOwnProperty("groupSelector")) {
        let nodeGroups = nodeDef.groupSelector;
        if (!Array.isArray(nodeGroups)) nodeGroups = [nodeGroups];
        for (let j = 0; j < nodeGroups.length; j++) {
          const nodeGroup = nodeGroups[j];
          let group = groupSelectors[nodeGroup];
          if (!group) group = groupSelectors[nodeGroup] = [];
          group.push(node);
        }
      }
      parentNode.appendChild(node);
      const childrenDef = nodeDef.children;
      if (Array.isArray(childrenDef)) {
        parseNode(childrenDef, node, ns2);
      }
    }
  };
  parseNode(json, fragment, ns);
  return {
    fragment,
    selectors,
    groupSelectors
  };
};
var hashCode = function(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    hash = (hash << 5) - hash + c;
    hash = hash & hash;
  }
  return hash;
};
var getByPath = function(obj, path, delimiter) {
  var keys2 = Array.isArray(path) ? path : path.split(delimiter || "/");
  var key;
  var i = 0;
  var length2 = keys2.length;
  while (i < length2) {
    key = keys2[i++];
    if (Object(obj) === obj && key in obj) {
      obj = obj[key];
    } else {
      return void 0;
    }
  }
  return obj;
};
var isGetSafe = function(obj, key) {
  if (typeof key !== "string" && typeof key !== "number") {
    key = String(key);
  }
  if (key === "constructor" && typeof obj[key] === "function") {
    return false;
  }
  if (key === "__proto__") {
    return false;
  }
  return true;
};
var setByPath = function(obj, path, value, delimiter) {
  const keys2 = Array.isArray(path) ? path : path.split(delimiter || "/");
  const last2 = keys2.length - 1;
  let diver = obj;
  let i = 0;
  for (; i < last2; i++) {
    const key = keys2[i];
    if (!isGetSafe(diver, key)) return obj;
    const value2 = diver[key];
    diver = value2 || (diver[key] = {});
  }
  diver[keys2[last2]] = value;
  return obj;
};
var unsetByPath = function(obj, path, delimiter) {
  const keys2 = Array.isArray(path) ? path : path.split(delimiter || "/");
  const last2 = keys2.length - 1;
  let diver = obj;
  let i = 0;
  for (; i < last2; i++) {
    const key = keys2[i];
    if (!isGetSafe(diver, key)) return obj;
    const value = diver[key];
    if (!value) return obj;
    diver = value;
  }
  delete diver[keys2[last2]];
  return obj;
};
var flattenObject = function(obj, delim, stop) {
  delim = delim || "/";
  var ret = {};
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    var shouldGoDeeper = typeof obj[key] === "object";
    if (shouldGoDeeper && stop && stop(obj[key])) {
      shouldGoDeeper = false;
    }
    if (shouldGoDeeper) {
      var flatObject = flattenObject(obj[key], delim, stop);
      for (var flatKey in flatObject) {
        if (!flatObject.hasOwnProperty(flatKey)) continue;
        ret[key + delim + flatKey] = flatObject[flatKey];
      }
    } else {
      ret[key] = obj[key];
    }
  }
  return ret;
};
var uuid = function() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    var v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
};
var guid = function(obj) {
  guid.id = guid.id || 1;
  if (obj === void 0) {
    return "j_" + guid.id++;
  }
  obj.id = obj.id === void 0 ? "j_" + guid.id++ : obj.id;
  return obj.id;
};
var toKebabCase = function(string) {
  return string.replace(/[A-Z]/g, "-$&").toLowerCase();
};
var normalizeEvent = function(evt) {
  if (evt.normalized) return evt;
  const {
    originalEvent,
    target
  } = evt;
  const touch = originalEvent && originalEvent.changedTouches && originalEvent.changedTouches[0];
  if (touch) {
    for (let property2 in touch) {
      if (evt[property2] === void 0) {
        evt[property2] = touch[property2];
      }
    }
  }
  if (target) {
    const useElement = target.correspondingUseElement;
    if (useElement) evt.target = useElement;
  }
  evt.normalized = true;
  return evt;
};
var normalizeWheel = function(evt) {
  const PIXEL_STEP = 10;
  const LINE_HEIGHT = 40;
  const PAGE_HEIGHT = 800;
  let sX = 0, sY = 0, pX = 0, pY = 0;
  if ("detail" in evt) {
    sY = evt.detail;
  }
  if ("wheelDelta" in evt) {
    sY = -evt.wheelDelta / 120;
  }
  if ("wheelDeltaY" in evt) {
    sY = -evt.wheelDeltaY / 120;
  }
  if ("wheelDeltaX" in evt) {
    sX = -evt.wheelDeltaX / 120;
  }
  if ("axis" in evt && evt.axis === evt.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }
  pX = "deltaX" in evt ? evt.deltaX : sX * PIXEL_STEP;
  pY = "deltaY" in evt ? evt.deltaY : sY * PIXEL_STEP;
  if ((pX || pY) && evt.deltaMode) {
    if (evt.deltaMode == 1) {
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }
  if (evt.deltaX === 0 && evt.deltaY !== 0 && evt.shiftKey) {
    pX = pY;
    pY = 0;
    sX = sY;
    sY = 0;
  }
  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1;
  }
  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1;
  }
  return {
    spinX: sX,
    spinY: sY,
    deltaX: pX,
    deltaY: pY
  };
};
var cap = function(val, max5) {
  return val > max5 ? max5 : val < -max5 ? -max5 : val;
};
var nextFrame = function() {
  var raf;
  if (typeof window !== "undefined") {
    raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  }
  if (!raf) {
    var lastTime = 0;
    raf = function(callback) {
      var currTime = (/* @__PURE__ */ new Date()).getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  return function(callback, context, ...rest) {
    return context !== void 0 ? raf(callback.bind(context, ...rest)) : raf(callback);
  };
}();
var cancelFrame = function() {
  var caf;
  var client = typeof window != "undefined";
  if (client) {
    caf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame || window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame;
  }
  caf = caf || clearTimeout;
  return client ? caf.bind(window) : caf;
}();
var shapePerimeterConnectionPoint = function(linkView, view, magnet, reference) {
  var bbox2;
  var spot;
  if (!magnet) {
    var scalable = view.$(".scalable")[0];
    var rotatable = view.$(".rotatable")[0];
    if (scalable && scalable.firstChild) {
      magnet = scalable.firstChild;
    } else if (rotatable && rotatable.firstChild) {
      magnet = rotatable.firstChild;
    }
  }
  if (magnet) {
    spot = V_default(magnet).findIntersection(reference, linkView.paper.cells);
    if (!spot) {
      bbox2 = V_default(magnet).getBBox({
        target: linkView.paper.cells
      });
    }
  } else {
    bbox2 = view.model.getBBox();
    spot = bbox2.intersectionWithLineFromCenterToPoint(reference);
  }
  return spot || bbox2.center();
};
var isPercentage = function(val) {
  return isString(val) && val.slice(-1) === "%";
};
var parseCssNumeric = function(val, restrictUnits) {
  function getUnit(validUnitExp2) {
    var matches = new RegExp("(?:\\d+(?:\\.\\d+)*)(" + validUnitExp2 + ")$").exec(val);
    if (!matches) return null;
    return matches[1];
  }
  var number = parseFloat(val);
  if (Number.isNaN(number)) return null;
  var output = {};
  output.value = number;
  var validUnitExp;
  if (restrictUnits == null) {
    validUnitExp = "[A-Za-z]*";
  } else if (Array.isArray(restrictUnits)) {
    if (restrictUnits.length === 0) return null;
    validUnitExp = restrictUnits.join("|");
  } else if (isString(restrictUnits)) {
    validUnitExp = restrictUnits;
  }
  var unit = getUnit(validUnitExp);
  if (unit === null) return null;
  output.unit = unit;
  return output;
};
var NO_SPACE = 0;
function splitWordWithEOL(word, eol) {
  const eolWords = word.split(eol);
  let n = 1;
  for (let j = 0, jl = eolWords.length - 1; j < jl; j++) {
    const replacement = [];
    if (j > 0 || eolWords[0] !== "") replacement.push(NO_SPACE);
    replacement.push(eol);
    if (j < jl - 1 || eolWords[jl] !== "") replacement.push(NO_SPACE);
    eolWords.splice(n, 0, ...replacement);
    n += replacement.length + 1;
  }
  return eolWords.filter((word2) => word2 !== "");
}
function getLineHeight(heightValue, textElement) {
  if (heightValue === null) {
    return textElement.getBBox().height;
  }
  switch (heightValue.unit) {
    case "em":
      return textElement.getBBox().height * heightValue.value;
    case "px":
    case "":
      return heightValue.value;
  }
}
var breakText = function(text, size, styles = {}, opt = {}) {
  var width = size.width;
  var height = size.height;
  var svgDocument = opt.svgDocument || V_default("svg").node;
  var textSpan = V_default("tspan").node;
  var textElement = V_default("text").attr(styles).append(textSpan).node;
  var textNode = document.createTextNode("");
  textElement.style.opacity = 0;
  textElement.style.display = "block";
  textSpan.style.display = "block";
  textSpan.appendChild(textNode);
  svgDocument.appendChild(textElement);
  if (!opt.svgDocument) {
    document.body.appendChild(svgDocument);
  }
  const preserveSpaces = opt.preserveSpaces;
  const space = " ";
  const separator = opt.separator || opt.separator === "" ? opt.separator : space;
  const separatorChar = typeof separator === "string" ? separator : space;
  var eol = opt.eol || "\n";
  var hyphen = opt.hyphen ? new RegExp(opt.hyphen) : /[^\w\d\u00C0-\u1FFF\u2800-\uFFFD]/;
  var maxLineCount = opt.maxLineCount;
  if (!isNumber(maxLineCount)) maxLineCount = Infinity;
  var words2 = text.split(separator);
  var full = [];
  var lines = [];
  var p, h;
  var lineHeight;
  if (preserveSpaces) {
    V_default(textSpan).attr("xml:space", "preserve");
  }
  for (var i = 0, l = 0, len = words2.length; i < len; i++) {
    var word = words2[i];
    if (!word && !preserveSpaces) continue;
    if (typeof word !== "string") continue;
    var isEol = false;
    if (eol && word.indexOf(eol) >= 0) {
      if (word.length > 1) {
        const eolWords = splitWordWithEOL(words2[i], eol);
        words2.splice(i, 1, ...eolWords);
        i--;
        len = words2.length;
        continue;
      } else {
        if (preserveSpaces && typeof words2[i - 1] === "string") {
          words2.splice(i, NO_SPACE, "", NO_SPACE);
          len += 2;
          i--;
          continue;
        }
        lines[++l] = !preserveSpaces || typeof words2[i + 1] === "string" ? "" : void 0;
        isEol = true;
      }
    }
    if (!isEol) {
      let data;
      if (preserveSpaces) {
        data = lines[l] !== void 0 ? lines[l] + separatorChar + word : word;
      } else {
        data = lines[l] ? lines[l] + separatorChar + word : word;
      }
      textNode.data = data;
      if (textSpan.getComputedTextLength() <= width) {
        lines[l] = data;
        if (p || h) {
          full[l++] = true;
          p = 0;
          h = 0;
        }
      } else {
        if (!lines[l] || p) {
          var partition = !!p;
          p = word.length - 1;
          if (partition || !p) {
            if (!p) {
              if (!lines[l]) {
                lines = [];
                break;
              }
              words2.splice(i, 2, word + words2[i + 1]);
              len--;
              full[l++] = true;
              i--;
              continue;
            }
            words2[i] = word.substring(0, p);
            const nextWord = words2[i + 1];
            words2[i + 1] = word.substring(p) + (nextWord === void 0 || nextWord === NO_SPACE ? "" : nextWord);
          } else {
            if (h) {
              words2.splice(i, 2, words2[i] + words2[i + 1]);
              h = 0;
            } else {
              var hyphenIndex = word.search(hyphen);
              if (hyphenIndex > -1 && hyphenIndex !== word.length - 1 && hyphenIndex !== 0) {
                h = hyphenIndex + 1;
                p = 0;
              }
              words2.splice(i, 1, word.substring(0, h || p), word.substring(h || p));
              len++;
            }
            if (l && !full[l - 1]) {
              l--;
            }
          }
          if (!preserveSpaces || lines[l] !== "") {
            i--;
          }
          continue;
        }
        l++;
        i--;
      }
    }
    var lastL = null;
    if (lines.length > maxLineCount) {
      lastL = maxLineCount - 1;
    } else if (height !== void 0) {
      if (lineHeight === void 0 && textNode.data !== "") {
        if (styles.lineHeight === "auto") {
          lineHeight = getLineHeight({
            value: 1.5,
            unit: "em"
          }, textElement);
        } else {
          const parsed = parseCssNumeric(styles.lineHeight, ["em", "px", ""]);
          lineHeight = getLineHeight(parsed, textElement);
        }
      }
      if (lineHeight * lines.length > height) {
        lastL = Math.floor(height / lineHeight) - 1;
      }
    }
    if (lastL !== null) {
      lines.splice(lastL + 1);
      var ellipsis = opt.ellipsis;
      if (!ellipsis || lastL < 0) break;
      if (typeof ellipsis !== "string") ellipsis = "…";
      var lastLine = lines[lastL];
      if (!lastLine && !isEol) break;
      var k = lastLine.length;
      var lastLineWithOmission, lastChar;
      do {
        lastChar = lastLine[k];
        lastLineWithOmission = lastLine.substring(0, k);
        if (!lastChar) {
          lastLineWithOmission += separatorChar;
        } else if (lastChar.match(separator)) {
          lastLineWithOmission += lastChar;
        }
        lastLineWithOmission += ellipsis;
        textNode.data = lastLineWithOmission;
        if (textSpan.getComputedTextLength() <= width) {
          lines[lastL] = lastLineWithOmission;
          break;
        }
        k--;
      } while (k >= 0);
      break;
    }
  }
  if (opt.svgDocument) {
    svgDocument.removeChild(textElement);
  } else {
    document.body.removeChild(svgDocument);
  }
  return lines.join(eol);
};
var sanitizeHTML = function(html) {
  var output = (0, import_jquery.default)(import_jquery.default.parseHTML("<div>" + html + "</div>", null, false));
  output.find("*").each(function() {
    var currentNode = this;
    import_jquery.default.each(currentNode.attributes, function() {
      var currentAttribute = this;
      var attrName = currentAttribute.name;
      var attrValue = currentAttribute.value;
      if (attrName.startsWith("on") || attrValue.startsWith("javascript:") || attrValue.startsWith("data:") || attrValue.startsWith("vbscript:")) {
        (0, import_jquery.default)(currentNode).removeAttr(attrName);
      }
    });
  });
  return output.html();
};
var downloadBlob = function(blob, fileName) {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    var url = window.URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};
var downloadDataUri = function(dataUri, fileName) {
  const blob = dataUriToBlob(dataUri);
  downloadBlob(blob, fileName);
};
var dataUriToBlob = function(dataUri) {
  dataUri = dataUri.replace(/\s/g, "");
  dataUri = decodeURIComponent(dataUri);
  var firstCommaIndex = dataUri.indexOf(",");
  var dataTypeString = dataUri.slice(0, firstCommaIndex);
  var mimeString = dataTypeString.split(":")[1].split(";")[0];
  var data = dataUri.slice(firstCommaIndex + 1);
  var decodedString;
  if (dataTypeString.indexOf("base64") >= 0) {
    decodedString = atob(data);
  } else {
    decodedString = unescape(encodeURIComponent(data));
  }
  var ia = new Uint8Array(decodedString.length);
  for (var i = 0; i < decodedString.length; i++) {
    ia[i] = decodedString.charCodeAt(i);
  }
  return new Blob([ia], {
    type: mimeString
  });
};
var imageToDataUri = function(url, callback) {
  if (!url || url.substr(0, "data:".length) === "data:") {
    return setTimeout(function() {
      callback(null, url);
    }, 0);
  }
  var modernHandler = function(xhr2, callback2) {
    if (xhr2.status === 200) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        var dataUri = evt.target.result;
        callback2(null, dataUri);
      };
      reader.onerror = function() {
        callback2(new Error("Failed to load image " + url));
      };
      reader.readAsDataURL(xhr2.response);
    } else {
      callback2(new Error("Failed to load image " + url));
    }
  };
  var legacyHandler = function(xhr2, callback2) {
    var Uint8ToString = function(u8a) {
      var CHUNK_SZ = 32768;
      var c = [];
      for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
      }
      return c.join("");
    };
    if (xhr2.status === 200) {
      var bytes = new Uint8Array(xhr2.response);
      var suffix = url.split(".").pop() || "png";
      var map = {
        "svg": "svg+xml"
      };
      var meta = "data:image/" + (map[suffix] || suffix) + ";base64,";
      var b64encoded = meta + btoa(Uint8ToString(bytes));
      callback2(null, b64encoded);
    } else {
      callback2(new Error("Failed to load image " + url));
    }
  };
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.addEventListener("error", function() {
    callback(new Error("Failed to load image " + url));
  });
  xhr.responseType = window.FileReader ? "blob" : "arraybuffer";
  xhr.addEventListener("load", function() {
    if (window.FileReader) {
      modernHandler(xhr, callback);
    } else {
      legacyHandler(xhr, callback);
    }
  });
  xhr.send();
};
var getElementBBox = function(el) {
  var $el = (0, import_jquery.default)(el);
  if ($el.length === 0) {
    throw new Error("Element not found");
  }
  var element = $el[0];
  var doc = element.ownerDocument;
  var clientBBox = element.getBoundingClientRect();
  var strokeWidthX = 0;
  var strokeWidthY = 0;
  if (element.ownerSVGElement) {
    var vel = V_default(element);
    var bbox2 = vel.getBBox({
      target: vel.svg()
    });
    strokeWidthX = clientBBox.width - bbox2.width;
    strokeWidthY = clientBBox.height - bbox2.height;
  }
  return {
    x: clientBBox.left + window.pageXOffset - doc.documentElement.offsetLeft + strokeWidthX / 2,
    y: clientBBox.top + window.pageYOffset - doc.documentElement.offsetTop + strokeWidthY / 2,
    width: clientBBox.width - strokeWidthX,
    height: clientBBox.height - strokeWidthY
  };
};
var sortElements = function(elements, comparator) {
  var $elements = (0, import_jquery.default)(elements);
  var placements = $elements.map(function() {
    var sortElement = this;
    var parentNode = sortElement.parentNode;
    var nextSibling = parentNode.insertBefore(document.createTextNode(""), sortElement.nextSibling);
    return function() {
      if (parentNode === this) {
        throw new Error("You can't sort elements if any one is a descendant of another.");
      }
      parentNode.insertBefore(this, nextSibling);
      parentNode.removeChild(nextSibling);
    };
  });
  return Array.prototype.sort.call($elements, comparator).each(function(i) {
    placements[i].call(this);
  });
};
var setAttributesBySelector = function(element, attrs) {
  var $element = (0, import_jquery.default)(element);
  forIn(attrs, function(attrs2, selector) {
    var $elements = $element.find(selector).addBack().filter(selector);
    if (has(attrs2, "class")) {
      $elements.addClass(attrs2["class"]);
      attrs2 = omit(attrs2, "class");
    }
    $elements.attr(attrs2);
  });
};
var normalizeSides = function(box) {
  if (Object(box) !== box) {
    var val = 0;
    if (isFinite(box)) val = +box;
    return {
      top: val,
      right: val,
      bottom: val,
      left: val
    };
  }
  var top4, right4, bottom4, left4;
  top4 = right4 = bottom4 = left4 = 0;
  if (isFinite(box.vertical)) top4 = bottom4 = +box.vertical;
  if (isFinite(box.horizontal)) right4 = left4 = +box.horizontal;
  if (isFinite(box.top)) top4 = +box.top;
  if (isFinite(box.right)) right4 = +box.right;
  if (isFinite(box.bottom)) bottom4 = +box.bottom;
  if (isFinite(box.left)) left4 = +box.left;
  return {
    top: top4,
    right: right4,
    bottom: bottom4,
    left: left4
  };
};
var timing = {
  linear: function(t) {
    return t;
  },
  quad: function(t) {
    return t * t;
  },
  cubic: function(t) {
    return t * t * t;
  },
  inout: function(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var t2 = t * t;
    var t3 = t2 * t;
    return 4 * (t < 0.5 ? t3 : 3 * (t - t2) + t3 - 0.75);
  },
  exponential: function(t) {
    return Math.pow(2, 10 * (t - 1));
  },
  bounce: function(t) {
    for (var a = 0, b = 1; 1; a += b, b /= 2) {
      if (t >= (7 - 4 * a) / 11) {
        var q = (11 - 6 * a - 11 * t) / 4;
        return -q * q + b * b;
      }
    }
  },
  reverse: function(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  },
  reflect: function(f) {
    return function(t) {
      return 0.5 * (t < 0.5 ? f(2 * t) : 2 - f(2 - 2 * t));
    };
  },
  clamp: function(f, n, x) {
    n = n || 0;
    x = x || 1;
    return function(t) {
      var r = f(t);
      return r < n ? n : r > x ? x : r;
    };
  },
  back: function(s) {
    if (!s) s = 1.70158;
    return function(t) {
      return t * t * ((s + 1) * t - s);
    };
  },
  elastic: function(x) {
    if (!x) x = 1.5;
    return function(t) {
      return Math.pow(2, 10 * (t - 1)) * Math.cos(20 * Math.PI * x / 3 * t);
    };
  }
};
var interpolate = {
  number: function(a, b) {
    var d = b - a;
    return function(t) {
      return a + d * t;
    };
  },
  object: function(a, b) {
    var s = Object.keys(a);
    return function(t) {
      var i, p;
      var r = {};
      for (i = s.length - 1; i != -1; i--) {
        p = s[i];
        r[p] = a[p] + (b[p] - a[p]) * t;
      }
      return r;
    };
  },
  hexColor: function(a, b) {
    var ca = parseInt(a.slice(1), 16);
    var cb = parseInt(b.slice(1), 16);
    var ra = ca & 255;
    var rd = (cb & 255) - ra;
    var ga = ca & 65280;
    var gd = (cb & 65280) - ga;
    var ba = ca & 16711680;
    var bd = (cb & 16711680) - ba;
    return function(t) {
      var r = ra + rd * t & 255;
      var g = ga + gd * t & 65280;
      var b2 = ba + bd * t & 16711680;
      return "#" + (1 << 24 | r | g | b2).toString(16).slice(1);
    };
  },
  unit: function(a, b) {
    var r = /(-?[0-9]*.[0-9]*)(px|em|cm|mm|in|pt|pc|%)/;
    var ma = r.exec(a);
    var mb = r.exec(b);
    var p = mb[1].indexOf(".");
    var f = p > 0 ? mb[1].length - p - 1 : 0;
    a = +ma[1];
    var d = +mb[1] - a;
    var u = ma[2];
    return function(t) {
      return (a + d * t).toFixed(f) + u;
    };
  }
};
var filter = {
  // `color` ... outline color ('blue')
  // `width`... outline width (1)
  // `opacity` ... outline opacity (1)
  // `margin` ... gap between outline and the element (2)
  outline: function(args) {
    var tpl = '<filter><feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/><feMorphology in="SourceAlpha" result="morphedOuter" operator="dilate" radius="${outerRadius}" /><feMorphology in="SourceAlpha" result="morphedInner" operator="dilate" radius="${innerRadius}" /><feComposite result="morphedOuterColored" in="colored" in2="morphedOuter" operator="in"/><feComposite operator="xor" in="morphedOuterColored" in2="morphedInner" result="outline"/><feMerge><feMergeNode in="outline"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    var margin = Number.isFinite(args.margin) ? args.margin : 2;
    var width = Number.isFinite(args.width) ? args.width : 1;
    return template(tpl)({
      color: args.color || "blue",
      opacity: Number.isFinite(args.opacity) ? args.opacity : 1,
      outerRadius: margin + width,
      innerRadius: margin
    });
  },
  // `color` ... color ('red')
  // `width`... width (1)
  // `blur` ... blur (0)
  // `opacity` ... opacity (1)
  highlight: function(args) {
    var tpl = '<filter><feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/><feMorphology result="morphed" in="SourceGraphic" operator="dilate" radius="${width}"/><feComposite result="composed" in="colored" in2="morphed" operator="in"/><feGaussianBlur result="blured" in="composed" stdDeviation="${blur}"/><feBlend in="SourceGraphic" in2="blured" mode="normal"/></filter>';
    return template(tpl)({
      color: args.color || "red",
      width: Number.isFinite(args.width) ? args.width : 1,
      blur: Number.isFinite(args.blur) ? args.blur : 0,
      opacity: Number.isFinite(args.opacity) ? args.opacity : 1
    });
  },
  // `x` ... horizontal blur (2)
  // `y` ... vertical blur (optional)
  blur: function(args) {
    var x = Number.isFinite(args.x) ? args.x : 2;
    return template('<filter><feGaussianBlur stdDeviation="${stdDeviation}"/></filter>')({
      stdDeviation: Number.isFinite(args.y) ? [x, args.y] : x
    });
  },
  // `dx` ... horizontal shift (0)
  // `dy` ... vertical shift (0)
  // `blur` ... blur (4)
  // `color` ... color ('black')
  // `opacity` ... opacity (1)
  dropShadow: function(args) {
    var tpl = "SVGFEDropShadowElement" in window ? '<filter><feDropShadow stdDeviation="${blur}" dx="${dx}" dy="${dy}" flood-color="${color}" flood-opacity="${opacity}"/></filter>' : '<filter><feGaussianBlur in="SourceAlpha" stdDeviation="${blur}"/><feOffset dx="${dx}" dy="${dy}" result="offsetblur"/><feFlood flood-color="${color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    return template(tpl)({
      dx: args.dx || 0,
      dy: args.dy || 0,
      opacity: Number.isFinite(args.opacity) ? args.opacity : 1,
      color: args.color || "black",
      blur: Number.isFinite(args.blur) ? args.blur : 4
    });
  },
  // `amount` ... the proportion of the conversion (1). A value of 1 (default) is completely grayscale. A value of 0 leaves the input unchanged.
  grayscale: function(args) {
    var amount = Number.isFinite(args.amount) ? args.amount : 1;
    return template('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${b} ${h} 0 0 0 0 0 1 0"/></filter>')({
      a: 0.2126 + 0.7874 * (1 - amount),
      b: 0.7152 - 0.7152 * (1 - amount),
      c: 0.0722 - 0.0722 * (1 - amount),
      d: 0.2126 - 0.2126 * (1 - amount),
      e: 0.7152 + 0.2848 * (1 - amount),
      f: 0.0722 - 0.0722 * (1 - amount),
      g: 0.2126 - 0.2126 * (1 - amount),
      h: 0.0722 + 0.9278 * (1 - amount)
    });
  },
  // `amount` ... the proportion of the conversion (1). A value of 1 (default) is completely sepia. A value of 0 leaves the input unchanged.
  sepia: function(args) {
    var amount = Number.isFinite(args.amount) ? args.amount : 1;
    return template('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${h} ${i} 0 0 0 0 0 1 0"/></filter>')({
      a: 0.393 + 0.607 * (1 - amount),
      b: 0.769 - 0.769 * (1 - amount),
      c: 0.189 - 0.189 * (1 - amount),
      d: 0.349 - 0.349 * (1 - amount),
      e: 0.686 + 0.314 * (1 - amount),
      f: 0.168 - 0.168 * (1 - amount),
      g: 0.272 - 0.272 * (1 - amount),
      h: 0.534 - 0.534 * (1 - amount),
      i: 0.131 + 0.869 * (1 - amount)
    });
  },
  // `amount` ... the proportion of the conversion (1). A value of 0 is completely un-saturated. A value of 1 (default) leaves the input unchanged.
  saturate: function(args) {
    var amount = Number.isFinite(args.amount) ? args.amount : 1;
    return template('<filter><feColorMatrix type="saturate" values="${amount}"/></filter>')({
      amount: 1 - amount
    });
  },
  // `angle` ...  the number of degrees around the color circle the input samples will be adjusted (0).
  hueRotate: function(args) {
    return template('<filter><feColorMatrix type="hueRotate" values="${angle}"/></filter>')({
      angle: args.angle || 0
    });
  },
  // `amount` ... the proportion of the conversion (1). A value of 1 (default) is completely inverted. A value of 0 leaves the input unchanged.
  invert: function(args) {
    var amount = Number.isFinite(args.amount) ? args.amount : 1;
    return template('<filter><feComponentTransfer><feFuncR type="table" tableValues="${amount} ${amount2}"/><feFuncG type="table" tableValues="${amount} ${amount2}"/><feFuncB type="table" tableValues="${amount} ${amount2}"/></feComponentTransfer></filter>')({
      amount,
      amount2: 1 - amount
    });
  },
  // `amount` ... proportion of the conversion (1). A value of 0 will create an image that is completely black. A value of 1 (default) leaves the input unchanged.
  brightness: function(args) {
    return template('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}"/><feFuncG type="linear" slope="${amount}"/><feFuncB type="linear" slope="${amount}"/></feComponentTransfer></filter>')({
      amount: Number.isFinite(args.amount) ? args.amount : 1
    });
  },
  // `amount` ... proportion of the conversion (1). A value of 0 will create an image that is completely black. A value of 1 (default) leaves the input unchanged.
  contrast: function(args) {
    var amount = Number.isFinite(args.amount) ? args.amount : 1;
    return template('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}" intercept="${amount2}"/><feFuncG type="linear" slope="${amount}" intercept="${amount2}"/><feFuncB type="linear" slope="${amount}" intercept="${amount2}"/></feComponentTransfer></filter>')({
      amount,
      amount2: 0.5 - amount / 2
    });
  }
};
var format = {
  // Formatting numbers via the Python Format Specification Mini-language.
  // See http://docs.python.org/release/3.1.3/library/string.html#format-specification-mini-language.
  // Heavilly inspired by the D3.js library implementation.
  number: function(specifier, value, locale) {
    locale = locale || {
      currency: ["$", ""],
      decimal: ".",
      thousands: ",",
      grouping: [3]
    };
    var re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
    var match = re.exec(specifier);
    var fill = match[1] || " ";
    var align2 = match[2] || ">";
    var sign = match[3] || "";
    var symbol = match[4] || "";
    var zfill = match[5];
    var width = +match[6];
    var comma = match[7];
    var precision = match[8];
    var type = match[9];
    var scale2 = 1;
    var prefix = "";
    var suffix = "";
    var integer = false;
    if (precision) precision = +precision.substring(1);
    if (zfill || fill === "0" && align2 === "=") {
      zfill = fill = "0";
      align2 = "=";
      if (comma) width -= Math.floor((width - 1) / 4);
    }
    switch (type) {
      case "n":
        comma = true;
        type = "g";
        break;
      case "%":
        scale2 = 100;
        suffix = "%";
        type = "f";
        break;
      case "p":
        scale2 = 100;
        suffix = "%";
        type = "r";
        break;
      case "b":
      case "o":
      case "x":
      case "X":
        if (symbol === "#") prefix = "0" + type.toLowerCase();
        break;
      case "c":
      case "d":
        integer = true;
        precision = 0;
        break;
      case "s":
        scale2 = -1;
        type = "r";
        break;
    }
    if (symbol === "$") {
      prefix = locale.currency[0];
      suffix = locale.currency[1];
    }
    if (type == "r" && !precision) type = "g";
    if (precision != null) {
      if (type == "g") precision = Math.max(1, Math.min(21, precision));
      else if (type == "e" || type == "f") precision = Math.max(0, Math.min(20, precision));
    }
    var zcomma = zfill && comma;
    if (integer && value % 1) return "";
    var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign;
    var fullSuffix = suffix;
    if (scale2 < 0) {
      var unit = this.prefix(value, precision);
      value = unit.scale(value);
      fullSuffix = unit.symbol + suffix;
    } else {
      value *= scale2;
    }
    value = this.convert(type, value, precision);
    var i = value.lastIndexOf(".");
    var before = i < 0 ? value : value.substring(0, i);
    var after = i < 0 ? "" : locale.decimal + value.substring(i + 1);
    function formatGroup(value2) {
      var i2 = value2.length;
      var t = [];
      var j = 0;
      var g = locale.grouping[0];
      while (i2 > 0 && g > 0) {
        t.push(value2.substring(i2 -= g, i2 + g));
        g = locale.grouping[j = (j + 1) % locale.grouping.length];
      }
      return t.reverse().join(locale.thousands);
    }
    if (!zfill && comma && locale.grouping) {
      before = formatGroup(before);
    }
    var length2 = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length);
    var padding = length2 < width ? new Array(length2 = width - length2 + 1).join(fill) : "";
    if (zcomma) before = formatGroup(padding + before);
    negative += prefix;
    value = before + after;
    return (align2 === "<" ? negative + value + padding : align2 === ">" ? padding + negative + value : align2 === "^" ? padding.substring(0, length2 >>= 1) + negative + value + padding.substring(length2) : negative + (zcomma ? value : padding + value)) + fullSuffix;
  },
  // Formatting string via the Python Format string.
  // See https://docs.python.org/2/library/string.html#format-string-syntax)
  string: function(formatString, value) {
    var fieldDelimiterIndex;
    var fieldDelimiter = "{";
    var endPlaceholder = false;
    var formattedStringArray = [];
    while ((fieldDelimiterIndex = formatString.indexOf(fieldDelimiter)) !== -1) {
      var pieceFormattedString, formatSpec, fieldName;
      pieceFormattedString = formatString.slice(0, fieldDelimiterIndex);
      if (endPlaceholder) {
        formatSpec = pieceFormattedString.split(":");
        fieldName = formatSpec.shift().split(".");
        pieceFormattedString = value;
        for (var i = 0; i < fieldName.length; i++) pieceFormattedString = pieceFormattedString[fieldName[i]];
        if (formatSpec.length) pieceFormattedString = this.number(formatSpec, pieceFormattedString);
      }
      formattedStringArray.push(pieceFormattedString);
      formatString = formatString.slice(fieldDelimiterIndex + 1);
      endPlaceholder = !endPlaceholder;
      fieldDelimiter = endPlaceholder ? "}" : "{";
    }
    formattedStringArray.push(formatString);
    return formattedStringArray.join("");
  },
  convert: function(type, value, precision) {
    switch (type) {
      case "b":
        return value.toString(2);
      case "c":
        return String.fromCharCode(value);
      case "o":
        return value.toString(8);
      case "x":
        return value.toString(16);
      case "X":
        return value.toString(16).toUpperCase();
      case "g":
        return value.toPrecision(precision);
      case "e":
        return value.toExponential(precision);
      case "f":
        return value.toFixed(precision);
      case "r":
        return (value = this.round(value, this.precision(value, precision))).toFixed(Math.max(0, Math.min(20, this.precision(value * (1 + 1e-15), precision))));
      default:
        return value + "";
    }
  },
  round: function(value, precision) {
    return precision ? Math.round(value * (precision = Math.pow(10, precision))) / precision : Math.round(value);
  },
  precision: function(value, precision) {
    return precision - (value ? Math.ceil(Math.log(value) / Math.LN10) : 1);
  },
  prefix: function(value, precision) {
    var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(function(d, i2) {
      var k = Math.pow(10, Math.abs(8 - i2) * 3);
      return {
        scale: i2 > 8 ? function(d2) {
          return d2 / k;
        } : function(d2) {
          return d2 * k;
        },
        symbol: d
      };
    });
    var i = 0;
    if (value) {
      if (value < 0) value *= -1;
      if (precision) value = this.round(value, this.precision(value, precision));
      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
      i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
    }
    return prefixes[8 + i / 3];
  }
};
var template = function(html) {
  var regex = /<%= ([^ ]+) %>|\$\{ ?([^{} ]+) ?\}|\{\{([^{} ]+)\}\}/g;
  return function(data) {
    data = data || {};
    return html.replace(regex, function(match) {
      var args = Array.from(arguments);
      var attr = args.slice(1, 4).find(function(_attr) {
        return !!_attr;
      });
      var attrArray = attr.split(".");
      var value = data[attrArray.shift()];
      while (value !== void 0 && attrArray.length) {
        value = value[attrArray.shift()];
      }
      return value !== void 0 ? value : "";
    });
  };
};
var toggleFullScreen = function(el) {
  var topDocument = window.top.document;
  el = el || topDocument.body;
  function prefixedResult(el2, prop) {
    var prefixes = ["webkit", "moz", "ms", "o", ""];
    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var propName = prefix ? prefix + prop : prop.substr(0, 1).toLowerCase() + prop.substr(1);
      if (el2[propName] !== void 0) {
        return isFunction(el2[propName]) ? el2[propName]() : el2[propName];
      }
    }
  }
  if (prefixedResult(topDocument, "FullscreenElement") || prefixedResult(topDocument, "FullScreenElement")) {
    prefixedResult(topDocument, "ExitFullscreen") || // Spec.
    prefixedResult(topDocument, "CancelFullScreen");
  } else {
    prefixedResult(el, "RequestFullscreen") || // Spec.
    prefixedResult(el, "RequestFullScreen");
  }
};
var noop = function() {
};

// node_modules/jointjs/src/util/cloneCells.mjs
function cloneCells(cells) {
  cells = uniq(cells);
  const cloneMap = toArray(cells).reduce(function(map, cell) {
    map[cell.id] = cell.clone();
    return map;
  }, {});
  toArray(cells).forEach(function(cell) {
    const clone2 = cloneMap[cell.id];
    if (clone2.isLink()) {
      const source = clone2.source();
      const target = clone2.target();
      if (source.id && cloneMap[source.id]) {
        clone2.prop("source/id", cloneMap[source.id].id);
      }
      if (target.id && cloneMap[target.id]) {
        clone2.prop("target/id", cloneMap[target.id].id);
      }
    }
    const parent2 = cell.get("parent");
    if (parent2 && cloneMap[parent2]) {
      clone2.set("parent", cloneMap[parent2].id);
    }
    const embeds = toArray(cell.get("embeds")).reduce(function(newEmbeds, embed) {
      if (cloneMap[embed]) {
        newEmbeds.push(cloneMap[embed].id);
      }
      return newEmbeds;
    }, []);
    if (!isEmpty(embeds)) {
      clone2.set("embeds", embeds);
    }
  });
  return cloneMap;
}

// node_modules/jointjs/src/dia/attributes/props.mjs
var validPropertiesList = ["checked", "selected", "disabled", "readOnly", "contentEditable", "value", "indeterminate"];
var validProperties = validPropertiesList.reduce((acc, key) => {
  acc[key] = true;
  return acc;
}, {});
var props2 = {
  qualify: function(properties) {
    return isPlainObject(properties);
  },
  set: function(properties, _, node) {
    Object.keys(properties).forEach(function(key) {
      if (validProperties[key] && key in node) {
        const value = properties[key];
        if (node.tagName === "SELECT" && Array.isArray(value)) {
          Array.from(node.options).forEach(function(option, index) {
            option.selected = value.includes(option.value);
          });
        } else {
          node[key] = value;
        }
      }
    });
  }
};
var props_default = props2;

// node_modules/jointjs/src/dia/attributes/index.mjs
var import_jquery2 = __toESM(require_jquery(), 1);
function setWrapper(attrName, dimension) {
  return function(value, refBBox) {
    var isValuePercentage = isPercentage(value);
    value = parseFloat(value);
    if (isValuePercentage) {
      value /= 100;
    }
    var attrs = {};
    if (isFinite(value)) {
      var attrValue = isValuePercentage || value >= 0 && value <= 1 ? value * refBBox[dimension] : Math.max(value + refBBox[dimension], 0);
      attrs[attrName] = attrValue;
    }
    return attrs;
  };
}
function positionWrapper(axis, dimension, origin) {
  return function(value, refBBox) {
    var valuePercentage = isPercentage(value);
    value = parseFloat(value);
    if (valuePercentage) {
      value /= 100;
    }
    var delta;
    if (isFinite(value)) {
      var refOrigin = refBBox[origin]();
      if (valuePercentage || value > 0 && value < 1) {
        delta = refOrigin[axis] + refBBox[dimension] * value;
      } else {
        delta = refOrigin[axis] + value;
      }
    }
    var point2 = Point();
    point2[axis] = delta || 0;
    return point2;
  };
}
function offsetWrapper(axis, dimension, corner) {
  return function(value, nodeBBox) {
    var delta;
    if (value === "middle") {
      delta = nodeBBox[dimension] / 2;
    } else if (value === corner) {
      delta = nodeBBox[dimension];
    } else if (isFinite(value)) {
      delta = value > -1 && value < 1 ? -nodeBBox[dimension] * value : -value;
    } else if (isPercentage(value)) {
      delta = nodeBBox[dimension] * parseFloat(value) / 100;
    } else {
      delta = 0;
    }
    var point2 = Point();
    point2[axis] = -(nodeBBox[axis] + delta);
    return point2;
  };
}
function shapeWrapper(shapeConstructor, opt) {
  var cacheName = "joint-shape";
  var resetOffset = opt && opt.resetOffset;
  return function(value, refBBox, node) {
    var $node = (0, import_jquery2.default)(node);
    var cache = $node.data(cacheName);
    if (!cache || cache.value !== value) {
      var cachedShape = shapeConstructor(value);
      cache = {
        value,
        shape: cachedShape,
        shapeBBox: cachedShape.bbox()
      };
      $node.data(cacheName, cache);
    }
    var shape = cache.shape.clone();
    var shapeBBox = cache.shapeBBox.clone();
    var shapeOrigin = shapeBBox.origin();
    var refOrigin = refBBox.origin();
    shapeBBox.x = refOrigin.x;
    shapeBBox.y = refOrigin.y;
    var fitScale = refBBox.maxRectScaleToFit(shapeBBox, refOrigin);
    var sx = shapeBBox.width === 0 || refBBox.width === 0 ? 1 : fitScale.sx;
    var sy = shapeBBox.height === 0 || refBBox.height === 0 ? 1 : fitScale.sy;
    shape.scale(sx, sy, shapeOrigin);
    if (resetOffset) {
      shape.translate(-shapeOrigin.x, -shapeOrigin.y);
    }
    return shape;
  };
}
function dWrapper(opt) {
  function pathConstructor(value) {
    return new Path(V_default.normalizePathData(value));
  }
  var shape = shapeWrapper(pathConstructor, opt);
  return function(value, refBBox, node) {
    var path = shape(value, refBBox, node);
    return {
      d: path.serialize()
    };
  };
}
function pointsWrapper(opt) {
  var shape = shapeWrapper(Polyline, opt);
  return function(value, refBBox, node) {
    var polyline = shape(value, refBBox, node);
    return {
      points: polyline.serialize()
    };
  };
}
function atConnectionWrapper(method, opt) {
  var zeroVector = new Point(1, 0);
  return function(value) {
    var p, angle;
    var tangent = this[method](value);
    if (tangent) {
      angle = opt.rotate ? tangent.vector().vectorAngle(zeroVector) : 0;
      p = tangent.start;
    } else {
      p = this.path.start;
      angle = 0;
    }
    if (angle === 0) return {
      transform: "translate(" + p.x + "," + p.y + ")"
    };
    return {
      transform: "translate(" + p.x + "," + p.y + ") rotate(" + angle + ")"
    };
  };
}
function setIfChangedWrapper(attribute) {
  return function setIfChanged(value, _, node) {
    const vel = V_default(node);
    if (vel.attr(attribute) === value) return;
    vel.attr(attribute, value);
  };
}
function isTextInUse(_value, _node, attrs) {
  return attrs.text !== void 0;
}
function isLinkView() {
  return this.model.isLink();
}
function contextMarker(context) {
  var marker = {};
  var stroke3 = context.stroke;
  if (typeof stroke3 === "string") {
    marker["stroke"] = stroke3;
    marker["fill"] = stroke3;
  }
  var strokeOpacity = context.strokeOpacity;
  if (strokeOpacity === void 0) strokeOpacity = context["stroke-opacity"];
  if (strokeOpacity === void 0) strokeOpacity = context.opacity;
  if (strokeOpacity !== void 0) {
    marker["stroke-opacity"] = strokeOpacity;
    marker["fill-opacity"] = strokeOpacity;
  }
  return marker;
}
function setPaintURL(def) {
  const {
    paper
  } = this;
  const url = def.type === "pattern" ? paper.definePattern(def) : paper.defineGradient(def);
  return `url(#${url})`;
}
var attributesNS = {
  xlinkShow: {
    set: "xlink:show"
  },
  xlinkRole: {
    set: "xlink:role"
  },
  xlinkType: {
    set: "xlink:type"
  },
  xlinkArcrole: {
    set: "xlink:arcrole"
  },
  xlinkTitle: {
    set: "xlink:title"
  },
  xlinkActuate: {
    set: "xlink:actuate"
  },
  xmlSpace: {
    set: "xml:space"
  },
  xmlBase: {
    set: "xml:base"
  },
  xmlLang: {
    set: "xml:lang"
  },
  preserveAspectRatio: {
    set: "preserveAspectRatio"
  },
  requiredExtension: {
    set: "requiredExtension"
  },
  requiredFeatures: {
    set: "requiredFeatures"
  },
  systemLanguage: {
    set: "systemLanguage"
  },
  externalResourcesRequired: {
    set: "externalResourceRequired"
  },
  href: {
    set: setIfChangedWrapper("href")
  },
  xlinkHref: {
    set: setIfChangedWrapper("xlink:href")
  },
  filter: {
    qualify: isPlainObject,
    set: function(filter2) {
      return "url(#" + this.paper.defineFilter(filter2) + ")";
    }
  },
  fill: {
    qualify: isPlainObject,
    set: setPaintURL
  },
  stroke: {
    qualify: isPlainObject,
    set: setPaintURL
  },
  sourceMarker: {
    qualify: isPlainObject,
    set: function(marker, refBBox, node, attrs) {
      marker = assign(contextMarker(attrs), marker);
      return {
        "marker-start": "url(#" + this.paper.defineMarker(marker) + ")"
      };
    }
  },
  targetMarker: {
    qualify: isPlainObject,
    set: function(marker, refBBox, node, attrs) {
      marker = assign(contextMarker(attrs), {
        "transform": "rotate(180)"
      }, marker);
      return {
        "marker-end": "url(#" + this.paper.defineMarker(marker) + ")"
      };
    }
  },
  vertexMarker: {
    qualify: isPlainObject,
    set: function(marker, refBBox, node, attrs) {
      marker = assign(contextMarker(attrs), marker);
      return {
        "marker-mid": "url(#" + this.paper.defineMarker(marker) + ")"
      };
    }
  },
  text: {
    qualify: function(_text, _node, attrs) {
      return !attrs.textWrap || !isPlainObject(attrs.textWrap);
    },
    set: function(text, refBBox, node, attrs) {
      const $node = (0, import_jquery2.default)(node);
      const cacheName = "joint-text";
      const cache = $node.data(cacheName);
      const {
        lineHeight,
        annotations,
        textVerticalAnchor,
        eol,
        displayEmpty
      } = attrs;
      let textPath = attrs.textPath;
      let x = attrs.x;
      if (isCalcAttribute(x)) {
        x = evalCalcAttribute(x, refBBox);
      }
      let fontSize = attrs["font-size"] || attrs["fontSize"];
      if (isCalcAttribute(fontSize)) {
        fontSize = evalCalcAttribute(fontSize, refBBox);
      }
      const textHash = JSON.stringify([text, lineHeight, annotations, textVerticalAnchor, eol, displayEmpty, textPath, x, fontSize]);
      if (cache === void 0 || cache !== textHash) {
        if (fontSize) node.setAttribute("font-size", fontSize);
        if (isObject(textPath)) {
          const pathSelector = textPath.selector;
          if (typeof pathSelector === "string") {
            const [pathNode] = this.findBySelector(pathSelector);
            if (pathNode instanceof SVGPathElement) {
              textPath = assign({
                "xlink:href": "#" + pathNode.id
              }, textPath);
            }
          }
        }
        V_default(node).text("" + text, {
          lineHeight,
          annotations,
          textPath,
          x,
          textVerticalAnchor,
          eol,
          displayEmpty
        });
        $node.data(cacheName, textHash);
      }
    }
  },
  textWrap: {
    qualify: isPlainObject,
    set: function(value, refBBox, node, attrs) {
      var size = {};
      var width = value.width || 0;
      if (isPercentage(width)) {
        size.width = refBBox.width * parseFloat(width) / 100;
      } else if (isCalcAttribute(width)) {
        size.width = Number(evalCalcAttribute(width, refBBox));
      } else {
        if (value.width === null) {
          size.width = Infinity;
        } else if (width <= 0) {
          size.width = refBBox.width + width;
        } else {
          size.width = width;
        }
      }
      var height = value.height || 0;
      if (isPercentage(height)) {
        size.height = refBBox.height * parseFloat(height) / 100;
      } else if (isCalcAttribute(height)) {
        size.height = Number(evalCalcAttribute(height, refBBox));
      } else {
        if (value.height === null) {
        } else if (height <= 0) {
          size.height = refBBox.height + height;
        } else {
          size.height = height;
        }
      }
      var wrappedText;
      var text = value.text;
      if (text === void 0) text = attrs.text;
      if (text !== void 0) {
        const breakTextFn = value.breakText || breakText;
        const fontSizeAttr = attrs["font-size"] || attrs.fontSize;
        wrappedText = breakTextFn("" + text, size, {
          "font-weight": attrs["font-weight"] || attrs.fontWeight,
          "font-size": isCalcAttribute(fontSizeAttr) ? evalCalcAttribute(fontSizeAttr, refBBox) : fontSizeAttr,
          "font-family": attrs["font-family"] || attrs.fontFamily,
          "lineHeight": attrs.lineHeight,
          "letter-spacing": "letter-spacing" in attrs ? attrs["letter-spacing"] : attrs.letterSpacing
        }, {
          // Provide an existing SVG Document here
          // instead of creating a temporary one over again.
          svgDocument: this.paper.svg,
          ellipsis: value.ellipsis,
          hyphen: value.hyphen,
          separator: value.separator,
          maxLineCount: value.maxLineCount,
          preserveSpaces: value.preserveSpaces
        });
      } else {
        wrappedText = "";
      }
      attributesNS.text.set.call(this, wrappedText, refBBox, node, attrs);
    }
  },
  title: {
    qualify: function(title, node) {
      return node instanceof SVGElement;
    },
    set: function(title, refBBox, node) {
      var $node = (0, import_jquery2.default)(node);
      var cacheName = "joint-title";
      var cache = $node.data(cacheName);
      if (cache === void 0 || cache !== title) {
        $node.data(cacheName, title);
        if (node.tagName === "title") {
          node.textContent = title;
          return;
        }
        var firstChild = node.firstElementChild;
        if (firstChild && firstChild.tagName === "title") {
          firstChild.textContent = title;
        } else {
          var titleNode = document.createElementNS(node.namespaceURI, "title");
          titleNode.textContent = title;
          node.insertBefore(titleNode, firstChild);
        }
      }
    }
  },
  lineHeight: {
    qualify: isTextInUse
  },
  textVerticalAnchor: {
    qualify: isTextInUse
  },
  textPath: {
    qualify: isTextInUse
  },
  annotations: {
    qualify: isTextInUse
  },
  eol: {
    qualify: isTextInUse
  },
  displayEmpty: {
    qualify: isTextInUse
  },
  // `port` attribute contains the `id` of the port that the underlying magnet represents.
  port: {
    set: function(port) {
      return port === null || port.id === void 0 ? port : port.id;
    }
  },
  // `style` attribute is special in the sense that it sets the CSS style of the subelement.
  style: {
    qualify: isPlainObject,
    set: function(styles, refBBox, node) {
      (0, import_jquery2.default)(node).css(styles);
    }
  },
  html: {
    set: function(html, refBBox, node) {
      (0, import_jquery2.default)(node).html(html + "");
    }
  },
  // Properties setter (set various properties on the node)
  props: props_default,
  ref: {
    // We do not set `ref` attribute directly on an element.
    // The attribute itself does not qualify for relative positioning.
  },
  // if `refX` is in [0, 1] then `refX` is a fraction of bounding box width
  // if `refX` is < 0 then `refX`'s absolute values is the right coordinate of the bounding box
  // otherwise, `refX` is the left coordinate of the bounding box
  refX: {
    position: positionWrapper("x", "width", "origin")
  },
  refY: {
    position: positionWrapper("y", "height", "origin")
  },
  // `ref-dx` and `ref-dy` define the offset of the subelement relative to the right and/or bottom
  // coordinate of the reference element.
  refDx: {
    position: positionWrapper("x", "width", "corner")
  },
  refDy: {
    position: positionWrapper("y", "height", "corner")
  },
  // 'ref-width'/'ref-height' defines the width/height of the subelement relatively to
  // the reference element size
  // val in 0..1         ref-width = 0.75 sets the width to 75% of the ref. el. width
  // val < 0 || val > 1  ref-height = -20 sets the height to the ref. el. height shorter by 20
  refWidth: {
    set: setWrapper("width", "width")
  },
  refHeight: {
    set: setWrapper("height", "height")
  },
  refRx: {
    set: setWrapper("rx", "width")
  },
  refRy: {
    set: setWrapper("ry", "height")
  },
  refRInscribed: {
    set: function(attrName) {
      var widthFn = setWrapper(attrName, "width");
      var heightFn = setWrapper(attrName, "height");
      return function(value, refBBox) {
        var fn2 = refBBox.height > refBBox.width ? widthFn : heightFn;
        return fn2(value, refBBox);
      };
    }("r")
  },
  refRCircumscribed: {
    set: function(value, refBBox) {
      var isValuePercentage = isPercentage(value);
      value = parseFloat(value);
      if (isValuePercentage) {
        value /= 100;
      }
      var diagonalLength = Math.sqrt(refBBox.height * refBBox.height + refBBox.width * refBBox.width);
      var rValue;
      if (isFinite(value)) {
        if (isValuePercentage || value >= 0 && value <= 1) rValue = value * diagonalLength;
        else rValue = Math.max(value + diagonalLength, 0);
      }
      return {
        r: rValue
      };
    }
  },
  refCx: {
    set: setWrapper("cx", "width")
  },
  refCy: {
    set: setWrapper("cy", "height")
  },
  // `x-alignment` when set to `middle` causes centering of the subelement around its new x coordinate.
  // `x-alignment` when set to `right` uses the x coordinate as referenced to the right of the bbox.
  xAlignment: {
    offset: offsetWrapper("x", "width", "right")
  },
  // `y-alignment` when set to `middle` causes centering of the subelement around its new y coordinate.
  // `y-alignment` when set to `bottom` uses the y coordinate as referenced to the bottom of the bbox.
  yAlignment: {
    offset: offsetWrapper("y", "height", "bottom")
  },
  resetOffset: {
    offset: function(val, nodeBBox) {
      return val ? {
        x: -nodeBBox.x,
        y: -nodeBBox.y
      } : {
        x: 0,
        y: 0
      };
    }
  },
  refDResetOffset: {
    set: dWrapper({
      resetOffset: true
    })
  },
  refDKeepOffset: {
    set: dWrapper({
      resetOffset: false
    })
  },
  refPointsResetOffset: {
    set: pointsWrapper({
      resetOffset: true
    })
  },
  refPointsKeepOffset: {
    set: pointsWrapper({
      resetOffset: false
    })
  },
  // LinkView Attributes
  connection: {
    qualify: isLinkView,
    set: function({
      stubs = 0
    }) {
      let d;
      if (isFinite(stubs) && stubs !== 0) {
        let offset;
        if (stubs < 0) {
          offset = (this.getConnectionLength() + stubs) / 2;
        } else {
          offset = stubs;
        }
        const path = this.getConnection();
        const segmentSubdivisions = this.getConnectionSubdivisions();
        const sourceParts = path.divideAtLength(offset, {
          segmentSubdivisions
        });
        const targetParts = path.divideAtLength(-offset, {
          segmentSubdivisions
        });
        if (sourceParts && targetParts) {
          d = `${sourceParts[0].serialize()} ${targetParts[1].serialize()}`;
        }
      }
      return {
        d: d || this.getSerializedConnection()
      };
    }
  },
  atConnectionLengthKeepGradient: {
    qualify: isLinkView,
    set: atConnectionWrapper("getTangentAtLength", {
      rotate: true
    })
  },
  atConnectionLengthIgnoreGradient: {
    qualify: isLinkView,
    set: atConnectionWrapper("getTangentAtLength", {
      rotate: false
    })
  },
  atConnectionRatioKeepGradient: {
    qualify: isLinkView,
    set: atConnectionWrapper("getTangentAtRatio", {
      rotate: true
    })
  },
  atConnectionRatioIgnoreGradient: {
    qualify: isLinkView,
    set: atConnectionWrapper("getTangentAtRatio", {
      rotate: false
    })
  }
};
attributesNS["xlink:href"] = attributesNS.xlinkHref;
[
  "transform",
  // g
  "d",
  // path
  "points",
  // polyline / polygon
  "cx",
  "cy",
  // circle / ellipse
  "x1",
  "x2",
  "y1",
  "y2",
  // line
  "x",
  "y",
  // rect / text / image
  "dx",
  "dy"
  // text
].forEach((attribute) => {
  attributesNS[attribute] = {
    qualify: isCalcAttribute,
    set: function setCalcAttribute(value, refBBox) {
      return {
        [attribute]: evalCalcAttribute(value, refBBox)
      };
    }
  };
});
[
  "width",
  "height",
  // rect / image
  "r",
  // circle
  "rx",
  "ry",
  // rect / ellipse
  "font-size",
  // text
  "stroke-width"
  // elements
].forEach((attribute) => {
  attributesNS[attribute] = {
    qualify: isCalcAttribute,
    set: function setCalcAttribute(value, refBBox) {
      return {
        [attribute]: Math.max(0, evalCalcAttribute(value, refBBox))
      };
    }
  };
});
attributesNS.refR = attributesNS.refRInscribed;
attributesNS.refD = attributesNS.refDResetOffset;
attributesNS.refPoints = attributesNS.refPointsResetOffset;
attributesNS.atConnectionLength = attributesNS.atConnectionLengthKeepGradient;
attributesNS.atConnectionRatio = attributesNS.atConnectionRatioKeepGradient;
attributesNS.fontSize = attributesNS["font-size"];
attributesNS.strokeWidth = attributesNS["stroke-width"];
attributesNS.refX2 = attributesNS.refX;
attributesNS.refY2 = attributesNS.refY;
attributesNS.refWidth2 = attributesNS.refWidth;
attributesNS.refHeight2 = attributesNS.refHeight;
attributesNS["ref-x"] = attributesNS.refX;
attributesNS["ref-y"] = attributesNS.refY;
attributesNS["ref-dy"] = attributesNS.refDy;
attributesNS["ref-dx"] = attributesNS.refDx;
attributesNS["ref-width"] = attributesNS.refWidth;
attributesNS["ref-height"] = attributesNS.refHeight;
attributesNS["x-alignment"] = attributesNS.xAlignment;
attributesNS["y-alignment"] = attributesNS.yAlignment;
var attributes = attributesNS;

// node_modules/jointjs/src/dia/Cell.mjs
var Cell = import_backbone.default.Model.extend({
  // This is the same as Backbone.Model with the only difference that is uses util.merge
  // instead of just _.extend. The reason is that we want to mixin attributes set in upper classes.
  constructor: function(attributes2, options) {
    var defaults2;
    var attrs = attributes2 || {};
    if (typeof this.preinitialize === "function") {
      this.preinitialize.apply(this, arguments);
    }
    this.cid = uniqueId("c");
    this.attributes = {};
    if (options && options.collection) this.collection = options.collection;
    if (options && options.parse) attrs = this.parse(attrs, options) || {};
    if (defaults2 = result(this, "defaults")) {
      attrs = merge({}, defaults2, attrs);
    }
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  },
  translate: function(dx, dy, opt) {
    throw new Error("Must define a translate() method.");
  },
  toJSON: function() {
    const defaults2 = result(this.constructor.prototype, "defaults");
    const defaultAttrs = defaults2.attrs || {};
    const attrs = this.attributes.attrs;
    const finalAttrs = {};
    forIn(attrs, function(attr, selector) {
      const defaultAttr = defaultAttrs[selector];
      forIn(attr, function(value, name) {
        if (isObject(value) && !Array.isArray(value)) {
          forIn(value, function(value2, name2) {
            if (!defaultAttr || !defaultAttr[name] || !isEqual(defaultAttr[name][name2], value2)) {
              finalAttrs[selector] = finalAttrs[selector] || {};
              (finalAttrs[selector][name] || (finalAttrs[selector][name] = {}))[name2] = value2;
            }
          });
        } else if (!defaultAttr || !isEqual(defaultAttr[name], value)) {
          finalAttrs[selector] = finalAttrs[selector] || {};
          finalAttrs[selector][name] = value;
        }
      });
    });
    const attributes2 = cloneDeep(omit(this.attributes, "attrs"));
    attributes2.attrs = finalAttrs;
    return attributes2;
  },
  initialize: function(options) {
    const idAttribute = this.getIdAttribute();
    if (!options || options[idAttribute] === void 0) {
      this.set(idAttribute, this.generateId(), {
        silent: true
      });
    }
    this._transitionIds = {};
    this._scheduledTransitionIds = {};
    this.processPorts();
    this.on("change:attrs", this.processPorts, this);
  },
  getIdAttribute: function() {
    return this.idAttribute || "id";
  },
  generateId: function() {
    return uuid();
  },
  /**
   * @deprecated
   */
  processPorts: function() {
    var previousPorts = this.ports;
    var ports = {};
    forIn(this.get("attrs"), function(attrs, selector) {
      if (attrs && attrs.port) {
        if (attrs.port.id !== void 0) {
          ports[attrs.port.id] = attrs.port;
        } else {
          ports[attrs.port] = {
            id: attrs.port
          };
        }
      }
    });
    var removedPorts = {};
    forIn(previousPorts, function(port, id) {
      if (!ports[id]) removedPorts[id] = true;
    });
    if (this.graph && !isEmpty(removedPorts)) {
      var inboundLinks = this.graph.getConnectedLinks(this, {
        inbound: true
      });
      inboundLinks.forEach(function(link) {
        if (removedPorts[link.get("target").port]) link.remove();
      });
      var outboundLinks = this.graph.getConnectedLinks(this, {
        outbound: true
      });
      outboundLinks.forEach(function(link) {
        if (removedPorts[link.get("source").port]) link.remove();
      });
    }
    this.ports = ports;
  },
  remove: function(opt = {}) {
    const {
      graph,
      collection
    } = this;
    if (!graph) {
      if (collection) collection.remove(this, opt);
      return this;
    }
    graph.startBatch("remove");
    const parentCell = this.getParentCell();
    if (parentCell) {
      parentCell.unembed(this, opt);
    }
    const embeddedCells = this.getEmbeddedCells();
    for (let i = 0, n = embeddedCells.length; i < n; i++) {
      const embed = embeddedCells[i];
      if (embed) {
        embed.remove(opt);
      }
    }
    this.trigger("remove", this, graph.attributes.cells, opt);
    graph.stopBatch("remove");
    return this;
  },
  toFront: function(opt) {
    var graph = this.graph;
    if (graph) {
      opt = defaults(opt || {}, {
        foregroundEmbeds: true
      });
      let cells;
      if (opt.deep) {
        cells = this.getEmbeddedCells({
          deep: true,
          breadthFirst: opt.breadthFirst !== false,
          sortSiblings: opt.foregroundEmbeds
        });
        cells.unshift(this);
      } else {
        cells = [this];
      }
      const sortedCells = opt.foregroundEmbeds ? cells : sortBy(cells, (cell) => cell.z());
      const maxZ = graph.maxZIndex();
      let z = maxZ - cells.length + 1;
      const collection = graph.get("cells");
      let shouldUpdate = collection.indexOf(sortedCells[0]) !== collection.length - cells.length;
      if (!shouldUpdate) {
        shouldUpdate = sortedCells.some(function(cell, index) {
          return cell.z() !== z + index;
        });
      }
      if (shouldUpdate) {
        this.startBatch("to-front");
        z = z + cells.length;
        sortedCells.forEach(function(cell, index) {
          cell.set("z", z + index, opt);
        });
        this.stopBatch("to-front");
      }
    }
    return this;
  },
  toBack: function(opt) {
    var graph = this.graph;
    if (graph) {
      opt = defaults(opt || {}, {
        foregroundEmbeds: true
      });
      let cells;
      if (opt.deep) {
        cells = this.getEmbeddedCells({
          deep: true,
          breadthFirst: opt.breadthFirst !== false,
          sortSiblings: opt.foregroundEmbeds
        });
        cells.unshift(this);
      } else {
        cells = [this];
      }
      const sortedCells = opt.foregroundEmbeds ? cells : sortBy(cells, (cell) => cell.z());
      let z = graph.minZIndex();
      var collection = graph.get("cells");
      let shouldUpdate = collection.indexOf(sortedCells[0]) !== 0;
      if (!shouldUpdate) {
        shouldUpdate = sortedCells.some(function(cell, index) {
          return cell.z() !== z + index;
        });
      }
      if (shouldUpdate) {
        this.startBatch("to-back");
        z -= cells.length;
        sortedCells.forEach(function(cell, index) {
          cell.set("z", z + index, opt);
        });
        this.stopBatch("to-back");
      }
    }
    return this;
  },
  parent: function(parent2, opt) {
    if (parent2 === void 0) return this.get("parent");
    return this.set("parent", parent2, opt);
  },
  embed: function(cell, opt) {
    const cells = Array.isArray(cell) ? cell : [cell];
    if (!this.canEmbed(cells)) {
      throw new Error("Recursive embedding not allowed.");
    }
    if (cells.some((c) => c.isEmbedded() && this.id !== c.parent())) {
      throw new Error("Embedding of already embedded cells is not allowed.");
    }
    this._embedCells(cells, opt);
    return this;
  },
  unembed: function(cell, opt) {
    const cells = Array.isArray(cell) ? cell : [cell];
    this._unembedCells(cells, opt);
    return this;
  },
  canEmbed: function(cell) {
    const cells = Array.isArray(cell) ? cell : [cell];
    return cells.every((c) => this !== c && !this.isEmbeddedIn(c));
  },
  _embedCells: function(cells, opt) {
    const batchName = "embed";
    this.startBatch(batchName);
    const embeds = assign([], this.get("embeds"));
    cells.forEach((cell) => {
      embeds[cell.isLink() ? "unshift" : "push"](cell.id);
      cell.parent(this.id, opt);
    });
    this.set("embeds", uniq(embeds), opt);
    this.stopBatch(batchName);
  },
  _unembedCells: function(cells, opt) {
    const batchName = "unembed";
    this.startBatch(batchName);
    cells.forEach((cell) => cell.unset("parent", opt));
    this.set("embeds", without(this.get("embeds"), ...cells.map((cell) => cell.id)), opt);
    this.stopBatch(batchName);
  },
  getParentCell: function() {
    var parentId = this.parent();
    var graph = this.graph;
    return parentId && graph && graph.getCell(parentId) || null;
  },
  // Return an array of ancestor cells.
  // The array is ordered from the parent of the cell
  // to the most distant ancestor.
  getAncestors: function() {
    var ancestors = [];
    if (!this.graph) {
      return ancestors;
    }
    var parentCell = this.getParentCell();
    while (parentCell) {
      ancestors.push(parentCell);
      parentCell = parentCell.getParentCell();
    }
    return ancestors;
  },
  getEmbeddedCells: function(opt) {
    opt = opt || {};
    if (!this.graph) {
      return [];
    }
    if (opt.deep) {
      if (opt.breadthFirst) {
        return this._getEmbeddedCellsBfs(opt.sortSiblings);
      } else {
        return this._getEmbeddedCellsDfs(opt.sortSiblings);
      }
    }
    const embeddedIds = this.get("embeds");
    if (isEmpty(embeddedIds)) {
      return [];
    }
    let cells = embeddedIds.map(this.graph.getCell, this.graph);
    if (opt.sortSiblings) {
      cells = sortBy(cells, (cell) => cell.z());
    }
    return cells;
  },
  _getEmbeddedCellsBfs: function(sortSiblings) {
    const cells = [];
    const queue = [];
    queue.push(this);
    while (queue.length > 0) {
      const current = queue.shift();
      cells.push(current);
      const embeddedCells = current.getEmbeddedCells({
        sortSiblings
      });
      queue.push(...embeddedCells);
    }
    cells.shift();
    return cells;
  },
  _getEmbeddedCellsDfs: function(sortSiblings) {
    const cells = [];
    const stack = [];
    stack.push(this);
    while (stack.length > 0) {
      const current = stack.pop();
      cells.push(current);
      const embeddedCells = current.getEmbeddedCells({
        sortSiblings
      });
      for (let i = embeddedCells.length - 1; i >= 0; --i) {
        stack.push(embeddedCells[i]);
      }
    }
    cells.shift();
    return cells;
  },
  isEmbeddedIn: function(cell, opt) {
    var cellId = isString(cell) ? cell : cell.id;
    var parentId = this.parent();
    opt = assign({
      deep: true
    }, opt);
    if (this.graph && opt.deep) {
      while (parentId) {
        if (parentId === cellId) {
          return true;
        }
        parentId = this.graph.getCell(parentId).parent();
      }
      return false;
    } else {
      return parentId === cellId;
    }
  },
  // Whether or not the cell is embedded in any other cell.
  isEmbedded: function() {
    return !!this.parent();
  },
  // Isolated cloning. Isolated cloning has two versions: shallow and deep (pass `{ deep: true }` in `opt`).
  // Shallow cloning simply clones the cell and returns a new cell with different ID.
  // Deep cloning clones the cell and all its embedded cells recursively.
  clone: function(opt) {
    opt = opt || {};
    if (!opt.deep) {
      var clone2 = import_backbone.default.Model.prototype.clone.apply(this, arguments);
      clone2.set(this.getIdAttribute(), this.generateId());
      clone2.unset("embeds");
      clone2.unset("parent");
      return clone2;
    } else {
      return toArray(cloneCells([this].concat(this.getEmbeddedCells({
        deep: true
      }))));
    }
  },
  // A convenient way to set nested properties.
  // This method merges the properties you'd like to set with the ones
  // stored in the cell and makes sure change events are properly triggered.
  // You can either set a nested property with one object
  // or use a property path.
  // The most simple use case is:
  // `cell.prop('name/first', 'John')` or
  // `cell.prop({ name: { first: 'John' } })`.
  // Nested arrays are supported too:
  // `cell.prop('series/0/data/0/degree', 50)` or
  // `cell.prop({ series: [ { data: [ { degree: 50 } ] } ] })`.
  prop: function(props3, value, opt) {
    var delim = "/";
    var _isString = isString(props3);
    if (_isString || Array.isArray(props3)) {
      if (arguments.length > 1) {
        var path;
        var pathArray;
        if (_isString) {
          path = props3;
          pathArray = path.split("/");
        } else {
          path = props3.join(delim);
          pathArray = props3.slice();
        }
        var property2 = pathArray[0];
        var pathArrayLength = pathArray.length;
        const options2 = opt || {};
        options2.propertyPath = path;
        options2.propertyValue = value;
        options2.propertyPathArray = pathArray;
        if (!("rewrite" in options2)) {
          options2.rewrite = false;
        }
        var update = {};
        var initializer = update;
        var prevProperty = property2;
        for (var i = 1; i < pathArrayLength; i++) {
          var pathItem = pathArray[i];
          var isArrayIndex = Number.isFinite(_isString ? Number(pathItem) : pathItem);
          initializer = initializer[prevProperty] = isArrayIndex ? [] : {};
          prevProperty = pathItem;
        }
        update = setByPath(update, pathArray, value, "/");
        var baseAttributes = merge({}, this.attributes);
        options2.rewrite && unsetByPath(baseAttributes, path, "/");
        var attributes2 = merge(baseAttributes, update);
        return this.set(property2, attributes2[property2], options2);
      } else {
        return getByPath(this.attributes, props3, delim);
      }
    }
    const options = value || {};
    options.propertyPath = null;
    options.propertyValue = props3;
    options.propertyPathArray = [];
    if (!("rewrite" in options)) {
      options.rewrite = false;
    }
    const changedAttributes = {};
    for (const key in props3) {
      const {
        changedValue
      } = merge({}, {
        changedValue: this.attributes[key]
      }, {
        changedValue: props3[key]
      });
      changedAttributes[key] = changedValue;
    }
    return this.set(changedAttributes, options);
  },
  // A convenient way to unset nested properties
  removeProp: function(path, opt) {
    opt = opt || {};
    var pathArray = Array.isArray(path) ? path : path.split("/");
    var property2 = pathArray[0];
    if (property2 === "attrs") opt.dirty = true;
    if (pathArray.length === 1) {
      return this.unset(path, opt);
    }
    var nestedPath = pathArray.slice(1);
    var propertyValue = this.get(property2);
    if (propertyValue === void 0 || propertyValue === null) return this;
    propertyValue = cloneDeep(propertyValue);
    unsetByPath(propertyValue, nestedPath, "/");
    return this.set(property2, propertyValue, opt);
  },
  // A convenient way to set nested attributes.
  attr: function(attrs, value, opt) {
    var args = Array.from(arguments);
    if (args.length === 0) {
      return this.get("attrs");
    }
    if (Array.isArray(attrs)) {
      args[0] = ["attrs"].concat(attrs);
    } else if (isString(attrs)) {
      args[0] = "attrs/" + attrs;
    } else {
      args[0] = {
        "attrs": attrs
      };
    }
    return this.prop.apply(this, args);
  },
  // A convenient way to unset nested attributes
  removeAttr: function(path, opt) {
    if (Array.isArray(path)) {
      return this.removeProp(["attrs"].concat(path));
    }
    return this.removeProp("attrs/" + path, opt);
  },
  transition: function(path, value, opt, delim) {
    delim = delim || "/";
    var defaults2 = {
      duration: 100,
      delay: 10,
      timingFunction: timing.linear,
      valueFunction: interpolate.number
    };
    opt = assign(defaults2, opt);
    var firstFrameTime = 0;
    var interpolatingFunction;
    var setter = function(runtime) {
      var id, progress, propertyValue;
      firstFrameTime = firstFrameTime || runtime;
      runtime -= firstFrameTime;
      progress = runtime / opt.duration;
      if (progress < 1) {
        this._transitionIds[path] = id = nextFrame(setter);
      } else {
        progress = 1;
        delete this._transitionIds[path];
      }
      propertyValue = interpolatingFunction(opt.timingFunction(progress));
      opt.transitionId = id;
      this.prop(path, propertyValue, opt);
      if (!id) this.trigger("transition:end", this, path);
    }.bind(this);
    const {
      _scheduledTransitionIds
    } = this;
    let initialId;
    var initiator = (callback) => {
      if (_scheduledTransitionIds[path]) {
        _scheduledTransitionIds[path] = without(_scheduledTransitionIds[path], initialId);
        if (_scheduledTransitionIds[path].length === 0) {
          delete _scheduledTransitionIds[path];
        }
      }
      this.stopPendingTransitions(path, delim);
      interpolatingFunction = opt.valueFunction(getByPath(this.attributes, path, delim), value);
      this._transitionIds[path] = nextFrame(callback);
      this.trigger("transition:start", this, path);
    };
    initialId = setTimeout(initiator, opt.delay, setter);
    _scheduledTransitionIds[path] || (_scheduledTransitionIds[path] = []);
    _scheduledTransitionIds[path].push(initialId);
    return initialId;
  },
  getTransitions: function() {
    return union(Object.keys(this._transitionIds), Object.keys(this._scheduledTransitionIds));
  },
  stopScheduledTransitions: function(path, delim = "/") {
    const {
      _scheduledTransitionIds = {}
    } = this;
    let transitions = Object.keys(_scheduledTransitionIds);
    if (path) {
      const pathArray = path.split(delim);
      transitions = transitions.filter((key) => {
        return isEqual(pathArray, key.split(delim).slice(0, pathArray.length));
      });
    }
    transitions.forEach((key) => {
      const transitionIds = _scheduledTransitionIds[key];
      transitionIds.forEach((transitionId) => clearTimeout(transitionId));
      delete _scheduledTransitionIds[key];
    });
    return this;
  },
  stopPendingTransitions(path, delim = "/") {
    const {
      _transitionIds = {}
    } = this;
    let transitions = Object.keys(_transitionIds);
    if (path) {
      const pathArray = path.split(delim);
      transitions = transitions.filter((key) => {
        return isEqual(pathArray, key.split(delim).slice(0, pathArray.length));
      });
    }
    transitions.forEach((key) => {
      const transitionId = _transitionIds[key];
      cancelFrame(transitionId);
      delete _transitionIds[key];
      this.trigger("transition:end", this, key);
    });
  },
  stopTransitions: function(path, delim = "/") {
    this.stopScheduledTransitions(path, delim);
    this.stopPendingTransitions(path, delim);
    return this;
  },
  // A shorcut making it easy to create constructs like the following:
  // `var el = (new joint.shapes.basic.Rect).addTo(graph)`.
  addTo: function(graph, opt) {
    graph.addCell(this, opt);
    return this;
  },
  // A shortcut for an equivalent call: `paper.findViewByModel(cell)`
  // making it easy to create constructs like the following:
  // `cell.findView(paper).highlight()`
  findView: function(paper) {
    return paper.findViewByModel(this);
  },
  isElement: function() {
    return false;
  },
  isLink: function() {
    return false;
  },
  startBatch: function(name, opt) {
    if (this.graph) {
      this.graph.startBatch(name, assign({}, opt, {
        cell: this
      }));
    }
    return this;
  },
  stopBatch: function(name, opt) {
    if (this.graph) {
      this.graph.stopBatch(name, assign({}, opt, {
        cell: this
      }));
    }
    return this;
  },
  getChangeFlag: function(attributes2) {
    var flag = 0;
    if (!attributes2) return flag;
    for (var key in attributes2) {
      if (!attributes2.hasOwnProperty(key) || !this.hasChanged(key)) continue;
      flag |= attributes2[key];
    }
    return flag;
  },
  angle: function() {
    return 0;
  },
  position: function() {
    return new Point(0, 0);
  },
  z: function() {
    return this.get("z") || 0;
  },
  getPointFromConnectedLink: function() {
    return new Point();
  },
  getBBox: function() {
    return new Rect(0, 0, 0, 0);
  },
  getPointRotatedAroundCenter(angle, x, y) {
    const point2 = new Point(x, y);
    if (angle) point2.rotate(this.getBBox().center(), angle);
    return point2;
  },
  getAbsolutePointFromRelative(x, y) {
    return this.getPointRotatedAroundCenter(
      -this.angle(),
      // Transform the relative position to absolute
      this.position().offset(x, y)
    );
  },
  getRelativePointFromAbsolute(x, y) {
    return this.getPointRotatedAroundCenter(this.angle(), x, y).difference(this.position());
  }
}, {
  getAttributeDefinition: function(attrName) {
    var defNS = this.attributes;
    var globalDefNS = attributes;
    return defNS && defNS[attrName] || globalDefNS[attrName];
  },
  define: function(type, defaults2, protoProps, staticProps) {
    protoProps = assign({
      defaults: defaultsDeep2({
        type
      }, defaults2, this.prototype.defaults)
    }, protoProps);
    var Cell2 = this.extend(protoProps, staticProps);
    if (typeof joint !== "undefined" && has(joint, "shapes")) {
      setByPath(joint.shapes, type, Cell2, ".");
    }
    return Cell2;
  }
});

// node_modules/jointjs/src/util/wrappers.mjs
var wrapWith = function(object, methods, wrapper) {
  if (isString(wrapper)) {
    if (!wrappers[wrapper]) {
      throw new Error('Unknown wrapper: "' + wrapper + '"');
    }
    wrapper = wrappers[wrapper];
  }
  if (!isFunction(wrapper)) {
    throw new Error("Wrapper must be a function.");
  }
  toArray(methods).forEach(function(method) {
    object[method] = wrapper(object[method]);
  });
};
var wrappers = {
  cells: function(fn2) {
    return function() {
      var args = Array.from(arguments);
      var n = args.length;
      var cells = n > 0 && args[0] || [];
      var opt = n > 1 && args[n - 1] || {};
      if (!Array.isArray(cells)) {
        if (opt instanceof Cell) {
          cells = args;
        } else if (cells instanceof Cell) {
          if (args.length > 1) {
            args.pop();
          }
          cells = args;
        }
      }
      if (opt instanceof Cell) {
        opt = {};
      }
      return fn2.call(this, cells, opt);
    };
  }
};

// node_modules/jointjs/src/util/svgTagTemplate.mjs
function svg(strings, ...expressions) {
  const svgParts = [];
  strings.forEach((part, index) => {
    svgParts.push(part);
    if (index in expressions) {
      svgParts.push(expressions[index]);
    }
  });
  const markup = parseFromSVGString(svgParts.join(""));
  return markup;
}
function parseFromSVGString(str) {
  const parser = new DOMParser();
  const markupString = `<svg>${str.trim()}</svg>`;
  const xmldocument = parser.parseFromString(markupString.replace(/@/g, ""), "application/xml");
  if (xmldocument.getElementsByTagName("parsererror")[0]) {
    throw new Error("Invalid SVG markup");
  }
  const document2 = parser.parseFromString(markupString, "text/html");
  const svg2 = document2.querySelector("svg");
  return build(svg2);
}
function buildNode(node) {
  const markupNode = {};
  const {
    tagName,
    attributes: attributes2,
    namespaceURI,
    style,
    childNodes
  } = node;
  markupNode.namespaceURI = namespaceURI;
  markupNode.tagName = namespaceURI === V_default.namespace.xhtml ? tagName.toLowerCase() : tagName;
  const stylesObject = {};
  for (var i = style.length; i--; ) {
    var nameString = style[i];
    stylesObject[nameString] = style.getPropertyValue(nameString);
  }
  markupNode.style = stylesObject;
  const selectorAttribute = attributes2.getNamedItem("@selector");
  if (selectorAttribute) {
    markupNode.selector = selectorAttribute.value;
    attributes2.removeNamedItem("@selector");
  }
  const groupSelectorAttribute = attributes2.getNamedItem("@group-selector");
  if (groupSelectorAttribute) {
    const groupSelectors = groupSelectorAttribute.value.split(",");
    markupNode.groupSelector = groupSelectors.map((s) => s.trim());
    attributes2.removeNamedItem("@group-selector");
  }
  const className2 = attributes2.getNamedItem("class");
  if (className2) {
    markupNode.className = className2.value;
  }
  const children = [];
  childNodes.forEach((node2) => {
    switch (node2.nodeType) {
      case Node.TEXT_NODE: {
        const trimmedText = node2.data.replace(/\s\s+/g, " ");
        if (trimmedText.trim()) {
          children.push(trimmedText);
        }
        break;
      }
      case Node.ELEMENT_NODE: {
        children.push(buildNode(node2));
        break;
      }
      default:
        break;
    }
  });
  if (children.length) {
    markupNode.children = children;
  }
  const nodeAttrs = {};
  Array.from(attributes2).forEach((nodeAttribute) => {
    const {
      name,
      value
    } = nodeAttribute;
    nodeAttrs[name] = value;
  });
  if (Object.keys(nodeAttrs).length > 0) {
    markupNode.attributes = nodeAttrs;
  }
  return markupNode;
}
function build(root) {
  const markup = [];
  Array.from(root.children).forEach((node) => {
    markup.push(buildNode(node));
  });
  return markup;
}

// node_modules/jointjs/src/util/getRectPoint.mjs
var Positions = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left",
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  CENTER: "center"
};
function getRectPoint(rect2, position) {
  const r = new Rect(rect2);
  switch (position) {
    case void 0:
      throw new Error("Position required");
    // Middle Points
    case Positions.LEFT:
    case "leftMiddle":
      return r.leftMiddle();
    case Positions.RIGHT:
    case "rightMiddle":
      return r.rightMiddle();
    case Positions.TOP:
    case "topMiddle":
      return r.topMiddle();
    case Positions.BOTTOM:
    case "bottomMiddle":
      return r.bottomMiddle();
    // Corners
    case Positions.TOP_LEFT:
    case "topLeft":
    case "origin":
      return r.topLeft();
    case Positions.TOP_RIGHT:
    case "topRight":
      return r.topRight();
    case Positions.BOTTOM_LEFT:
    case "bottomLeft":
      return r.bottomLeft();
    case Positions.BOTTOM_RIGHT:
    case "bottomRight":
    case "corner":
      return r.bottomRight();
    // Center
    case Positions.CENTER:
      return r.center();
    // TODO: calc(), percentage etc.
    default:
      throw new Error(`Unknown position: ${position}`);
  }
}

// node_modules/jointjs/src/layout/ports/port.mjs
function portTransformAttrs(point2, angle, opt) {
  var trans = point2.toJSON();
  trans.angle = angle || 0;
  return defaults({}, opt, trans);
}
function lineLayout(ports, p1, p2, elBBox) {
  return ports.map(function(port, index, ports2) {
    var p = this.pointAt((index + 0.5) / ports2.length);
    if (port.dx || port.dy) {
      p.offset(port.dx || 0, port.dy || 0);
    }
    return portTransformAttrs(p.round(), 0, argTransform(elBBox, port));
  }, line(p1, p2));
}
function ellipseLayout(ports, elBBox, startAngle, stepFn) {
  var center2 = elBBox.center();
  var ratio = elBBox.width / elBBox.height;
  var p1 = elBBox.topMiddle();
  var ellipse3 = Ellipse.fromRect(elBBox);
  return ports.map(function(port, index, ports2) {
    var angle = startAngle + stepFn(index, ports2.length);
    var p2 = p1.clone().rotate(center2, -angle).scale(ratio, 1, center2);
    var theta = port.compensateRotation ? -ellipse3.tangentTheta(p2) : 0;
    if (port.dx || port.dy) {
      p2.offset(port.dx || 0, port.dy || 0);
    }
    if (port.dr) {
      p2.move(center2, port.dr);
    }
    return portTransformAttrs(p2.round(), theta, argTransform(elBBox, port));
  });
}
function argTransform(bbox2, args) {
  let {
    x,
    y,
    angle
  } = args;
  if (isPercentage(x)) {
    x = parseFloat(x) / 100 * bbox2.width;
  } else if (isCalcAttribute(x)) {
    x = Number(evalCalcAttribute(x, bbox2));
  }
  if (isPercentage(y)) {
    y = parseFloat(y) / 100 * bbox2.height;
  } else if (isCalcAttribute(y)) {
    y = Number(evalCalcAttribute(y, bbox2));
  }
  return {
    x,
    y,
    angle
  };
}
function argPoint(bbox2, args) {
  const {
    x,
    y
  } = argTransform(bbox2, args);
  return new Point(x || 0, y || 0);
}
var absolute = function(ports, elBBox) {
  return ports.map((port) => {
    const transformation = argPoint(elBBox, port).round().toJSON();
    transformation.angle = port.angle || 0;
    return transformation;
  });
};
var fn = function(ports, elBBox, opt) {
  return opt.fn(ports, elBBox, opt);
};
var line2 = function(ports, elBBox, opt) {
  var start = argPoint(elBBox, opt.start || elBBox.origin());
  var end = argPoint(elBBox, opt.end || elBBox.corner());
  return lineLayout(ports, start, end, elBBox);
};
var left = function(ports, elBBox, opt) {
  return lineLayout(ports, elBBox.origin(), elBBox.bottomLeft(), elBBox);
};
var right = function(ports, elBBox, opt) {
  return lineLayout(ports, elBBox.topRight(), elBBox.corner(), elBBox);
};
var top = function(ports, elBBox, opt) {
  return lineLayout(ports, elBBox.origin(), elBBox.topRight(), elBBox);
};
var bottom = function(ports, elBBox, opt) {
  return lineLayout(ports, elBBox.bottomLeft(), elBBox.corner(), elBBox);
};
var ellipseSpread = function(ports, elBBox, opt) {
  var startAngle = opt.startAngle || 0;
  var stepAngle = opt.step || 360 / ports.length;
  return ellipseLayout(ports, elBBox, startAngle, function(index) {
    return index * stepAngle;
  });
};
var ellipse2 = function(ports, elBBox, opt) {
  var startAngle = opt.startAngle || 0;
  var stepAngle = opt.step || 20;
  return ellipseLayout(ports, elBBox, startAngle, function(index, count) {
    return (index + 0.5 - count / 2) * stepAngle;
  });
};

// node_modules/jointjs/src/layout/ports/portLabel.mjs
var portLabel_exports = {};
__export(portLabel_exports, {
  bottom: () => bottom2,
  inside: () => inside,
  insideOriented: () => insideOriented,
  left: () => left2,
  manual: () => manual,
  outside: () => outside,
  outsideOriented: () => outsideOriented,
  radial: () => radial,
  radialOriented: () => radialOriented,
  right: () => right2,
  top: () => top2
});
function labelAttributes(opt1, opt2) {
  return defaultsDeep2({}, opt1, opt2, {
    x: 0,
    y: 0,
    angle: 0,
    attrs: {}
  });
}
function getBBoxAngles(elBBox) {
  var center2 = elBBox.center();
  var tl = center2.theta(elBBox.origin());
  var bl = center2.theta(elBBox.bottomLeft());
  var br = center2.theta(elBBox.corner());
  var tr = center2.theta(elBBox.topRight());
  return [tl, tr, br, bl];
}
function outsideLayout(portPosition, elBBox, autoOrient, opt) {
  opt = defaults({}, opt, {
    offset: 15
  });
  var angle = elBBox.center().theta(portPosition);
  var tx, ty, y, textAnchor;
  var offset = opt.offset;
  var orientAngle = 0;
  const [topLeftAngle, bottomLeftAngle, bottomRightAngle, topRightAngle] = getBBoxAngles(elBBox);
  if (angle < bottomLeftAngle || angle > bottomRightAngle) {
    y = ".3em";
    tx = offset;
    ty = 0;
    textAnchor = "start";
  } else if (angle < topLeftAngle) {
    tx = 0;
    ty = -offset;
    if (autoOrient) {
      orientAngle = -90;
      textAnchor = "start";
      y = ".3em";
    } else {
      textAnchor = "middle";
      y = "0";
    }
  } else if (angle < topRightAngle) {
    y = ".3em";
    tx = -offset;
    ty = 0;
    textAnchor = "end";
  } else {
    tx = 0;
    ty = offset;
    if (autoOrient) {
      orientAngle = 90;
      textAnchor = "start";
      y = ".3em";
    } else {
      textAnchor = "middle";
      y = ".6em";
    }
  }
  var round6 = Math.round;
  return labelAttributes(opt, {
    x: round6(tx),
    y: round6(ty),
    angle: orientAngle,
    attrs: {
      labelText: {
        y,
        textAnchor
      }
    }
  });
}
function insideLayout(portPosition, elBBox, autoOrient, opt) {
  opt = defaults({}, opt, {
    offset: 15
  });
  var angle = elBBox.center().theta(portPosition);
  var tx, ty, y, textAnchor;
  var offset = opt.offset;
  var orientAngle = 0;
  const [topLeftAngle, bottomLeftAngle, bottomRightAngle, topRightAngle] = getBBoxAngles(elBBox);
  if (angle < bottomLeftAngle || angle > bottomRightAngle) {
    y = ".3em";
    tx = -offset;
    ty = 0;
    textAnchor = "end";
  } else if (angle < topLeftAngle) {
    tx = 0;
    ty = offset;
    if (autoOrient) {
      orientAngle = 90;
      textAnchor = "start";
      y = ".3em";
    } else {
      textAnchor = "middle";
      y = ".6em";
    }
  } else if (angle < topRightAngle) {
    y = ".3em";
    tx = offset;
    ty = 0;
    textAnchor = "start";
  } else {
    tx = 0;
    ty = -offset;
    if (autoOrient) {
      orientAngle = -90;
      textAnchor = "start";
      y = ".3em";
    } else {
      textAnchor = "middle";
      y = "0";
    }
  }
  var round6 = Math.round;
  return labelAttributes(opt, {
    x: round6(tx),
    y: round6(ty),
    angle: orientAngle,
    attrs: {
      labelText: {
        y,
        textAnchor
      }
    }
  });
}
function radialLayout(portCenterOffset, autoOrient, opt) {
  opt = defaults({}, opt, {
    offset: 20
  });
  var origin = point(0, 0);
  var angle = -portCenterOffset.theta(origin);
  var orientAngle = angle;
  var offset = portCenterOffset.clone().move(origin, opt.offset).difference(portCenterOffset).round();
  var y = ".3em";
  var textAnchor;
  if ((angle + 90) % 180 === 0) {
    textAnchor = autoOrient ? "end" : "middle";
    if (!autoOrient && angle === -270) {
      y = "0em";
    }
  } else if (angle > -270 && angle < -90) {
    textAnchor = "start";
    orientAngle = angle - 180;
  } else {
    textAnchor = "end";
  }
  var round6 = Math.round;
  return labelAttributes(opt, {
    x: round6(offset.x),
    y: round6(offset.y),
    angle: autoOrient ? orientAngle : 0,
    attrs: {
      labelText: {
        y,
        textAnchor
      }
    }
  });
}
var manual = function(_portPosition, _elBBox, opt) {
  return labelAttributes(opt);
};
var left2 = function(portPosition, elBBox, opt) {
  return labelAttributes(opt, {
    x: -15,
    attrs: {
      labelText: {
        y: ".3em",
        textAnchor: "end"
      }
    }
  });
};
var right2 = function(portPosition, elBBox, opt) {
  return labelAttributes(opt, {
    x: 15,
    attrs: {
      labelText: {
        y: ".3em",
        textAnchor: "start"
      }
    }
  });
};
var top2 = function(portPosition, elBBox, opt) {
  return labelAttributes(opt, {
    y: -15,
    attrs: {
      labelText: {
        y: "0",
        textAnchor: "middle"
      }
    }
  });
};
var bottom2 = function(portPosition, elBBox, opt) {
  return labelAttributes(opt, {
    y: 15,
    attrs: {
      labelText: {
        y: ".6em",
        textAnchor: "middle"
      }
    }
  });
};
var outsideOriented = function(portPosition, elBBox, opt) {
  return outsideLayout(portPosition, elBBox, true, opt);
};
var outside = function(portPosition, elBBox, opt) {
  return outsideLayout(portPosition, elBBox, false, opt);
};
var insideOriented = function(portPosition, elBBox, opt) {
  return insideLayout(portPosition, elBBox, true, opt);
};
var inside = function(portPosition, elBBox, opt) {
  return insideLayout(portPosition, elBBox, false, opt);
};
var radial = function(portPosition, elBBox, opt) {
  return radialLayout(portPosition.difference(elBBox.center()), false, opt);
};
var radialOriented = function(portPosition, elBBox, opt) {
  return radialLayout(portPosition.difference(elBBox.center()), true, opt);
};

// node_modules/jointjs/src/dia/index.mjs
var dia_exports = {};
__export(dia_exports, {
  Cell: () => Cell,
  CellView: () => CellView,
  Element: () => Element2,
  ElementView: () => ElementView,
  Graph: () => Graph,
  HighlighterView: () => HighlighterView,
  LayersNames: () => LayersNames,
  Link: () => Link,
  LinkView: () => LinkView,
  Paper: () => Paper,
  PaperLayer: () => PaperLayer,
  ToolView: () => ToolView,
  ToolsView: () => ToolsView,
  attributes: () => attributes
});

// node_modules/jointjs/src/dia/Graph.mjs
var import_backbone2 = __toESM(require_backbone(), 1);

// node_modules/jointjs/src/dia/Link.mjs
var Link = Cell.extend({
  // The default markup for links.
  markup: ['<path class="connection" stroke="black" d="M 0 0 0 0"/>', '<path class="marker-source" fill="black" stroke="black" d="M 0 0 0 0"/>', '<path class="marker-target" fill="black" stroke="black" d="M 0 0 0 0"/>', '<path class="connection-wrap" d="M 0 0 0 0"/>', '<g class="labels"/>', '<g class="marker-vertices"/>', '<g class="marker-arrowheads"/>', '<g class="link-tools"/>'].join(""),
  toolMarkup: ['<g class="link-tool">', '<g class="tool-remove" event="remove">', '<circle r="11" />', '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z" />', "<title>Remove link.</title>", "</g>", '<g class="tool-options" event="link:options">', '<circle r="11" transform="translate(25)"/>', '<path fill="white" transform="scale(.55) translate(29, -16)" d="M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z"/>', "<title>Link options.</title>", "</g>", "</g>"].join(""),
  doubleToolMarkup: void 0,
  // The default markup for showing/removing vertices. These elements are the children of the .marker-vertices element (see `this.markup`).
  // Only .marker-vertex and .marker-vertex-remove element have special meaning. The former is used for
  // dragging vertices (changing their position). The latter is used for removing vertices.
  vertexMarkup: ['<g class="marker-vertex-group" transform="translate(<%= x %>, <%= y %>)">', '<circle class="marker-vertex" idx="<%= idx %>" r="10" />', '<path class="marker-vertex-remove-area" idx="<%= idx %>" d="M16,5.333c-7.732,0-14,4.701-14,10.5c0,1.982,0.741,3.833,2.016,5.414L2,25.667l5.613-1.441c2.339,1.317,5.237,2.107,8.387,2.107c7.732,0,14-4.701,14-10.5C30,10.034,23.732,5.333,16,5.333z" transform="translate(5, -33)"/>', '<path class="marker-vertex-remove" idx="<%= idx %>" transform="scale(.8) translate(9.5, -37)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z">', "<title>Remove vertex.</title>", "</path>", "</g>"].join(""),
  arrowheadMarkup: ['<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">', '<path class="marker-arrowhead" end="<%= end %>" d="M 26 0 L 0 13 L 26 26 z" />', "</g>"].join(""),
  // may be overwritten by user to change default label (its markup, size, attrs, position)
  defaultLabel: void 0,
  // deprecated
  // may be overwritten by user to change default label markup
  // lower priority than defaultLabel.markup
  labelMarkup: void 0,
  // private
  _builtins: {
    defaultLabel: {
      // builtin default markup:
      // used if neither defaultLabel.markup
      // nor label.markup is set
      markup: [{
        tagName: "rect",
        selector: "rect"
        // faster than tagName CSS selector
      }, {
        tagName: "text",
        selector: "text"
        // faster than tagName CSS selector
      }],
      // builtin default attributes:
      // applied only if builtin default markup is used
      attrs: {
        text: {
          fill: "#000000",
          fontSize: 14,
          textAnchor: "middle",
          yAlignment: "middle",
          pointerEvents: "none"
        },
        rect: {
          ref: "text",
          fill: "#ffffff",
          rx: 3,
          ry: 3,
          refWidth: 1,
          refHeight: 1,
          refX: 0,
          refY: 0
        }
      },
      // builtin default position:
      // used if neither defaultLabel.position
      // nor label.position is set
      position: {
        distance: 0.5
      }
    }
  },
  defaults: {
    type: "link",
    source: {},
    target: {}
  },
  isLink: function() {
    return true;
  },
  disconnect: function(opt) {
    return this.set({
      source: {
        x: 0,
        y: 0
      },
      target: {
        x: 0,
        y: 0
      }
    }, opt);
  },
  source: function(source, args, opt) {
    if (source === void 0) {
      return clone(this.get("source"));
    }
    var setSource;
    var setOpt;
    var isCellProvided = source instanceof Cell;
    if (isCellProvided) {
      setSource = clone(args) || {};
      setSource.id = source.id;
      setOpt = opt;
      return this.set("source", setSource, setOpt);
    }
    var isPointProvided = !isPlainObject(source);
    if (isPointProvided) {
      setSource = clone(args) || {};
      setSource.x = source.x;
      setSource.y = source.y;
      setOpt = opt;
      return this.set("source", setSource, setOpt);
    }
    setSource = source;
    setOpt = args;
    return this.set("source", setSource, setOpt);
  },
  target: function(target, args, opt) {
    if (target === void 0) {
      return clone(this.get("target"));
    }
    var setTarget;
    var setOpt;
    var isCellProvided = target instanceof Cell;
    if (isCellProvided) {
      setTarget = clone(args) || {};
      setTarget.id = target.id;
      setOpt = opt;
      return this.set("target", setTarget, setOpt);
    }
    var isPointProvided = !isPlainObject(target);
    if (isPointProvided) {
      setTarget = clone(args) || {};
      setTarget.x = target.x;
      setTarget.y = target.y;
      setOpt = opt;
      return this.set("target", setTarget, setOpt);
    }
    setTarget = target;
    setOpt = args;
    return this.set("target", setTarget, setOpt);
  },
  router: function(name, args, opt) {
    if (name === void 0) {
      var router2 = this.get("router");
      if (!router2) {
        if (this.get("manhattan")) return {
          name: "orthogonal"
        };
        return null;
      }
      if (typeof router2 === "object") return clone(router2);
      return router2;
    }
    var isRouterProvided = typeof name === "object" || typeof name === "function";
    var localRouter = isRouterProvided ? name : {
      name,
      args
    };
    var localOpt = isRouterProvided ? args : opt;
    return this.set("router", localRouter, localOpt);
  },
  connector: function(name, args, opt) {
    if (name === void 0) {
      var connector = this.get("connector");
      if (!connector) {
        if (this.get("smooth")) return {
          name: "smooth"
        };
        return null;
      }
      if (typeof connector === "object") return clone(connector);
      return connector;
    }
    var isConnectorProvided = typeof name === "object" || typeof name === "function";
    var localConnector = isConnectorProvided ? name : {
      name,
      args
    };
    var localOpt = isConnectorProvided ? args : opt;
    return this.set("connector", localConnector, localOpt);
  },
  // Labels API
  // A convenient way to set labels. Currently set values will be mixined with `value` if used as a setter.
  label: function(idx, label, opt) {
    var labels = this.labels();
    idx = isFinite(idx) && idx !== null ? idx | 0 : 0;
    if (idx < 0) idx = labels.length + idx;
    if (arguments.length <= 1) return this.prop(["labels", idx]);
    return this.prop(["labels", idx], label, opt);
  },
  labels: function(labels, opt) {
    if (arguments.length === 0) {
      labels = this.get("labels");
      if (!Array.isArray(labels)) return [];
      return labels.slice();
    }
    if (!Array.isArray(labels)) labels = [];
    return this.set("labels", labels, opt);
  },
  hasLabels: function() {
    const {
      labels
    } = this.attributes;
    return Array.isArray(labels) && labels.length > 0;
  },
  insertLabel: function(idx, label, opt) {
    if (!label) throw new Error("dia.Link: no label provided");
    var labels = this.labels();
    var n = labels.length;
    idx = isFinite(idx) && idx !== null ? idx | 0 : n;
    if (idx < 0) idx = n + idx + 1;
    labels.splice(idx, 0, label);
    return this.labels(labels, opt);
  },
  // convenience function
  // add label to end of labels array
  appendLabel: function(label, opt) {
    return this.insertLabel(-1, label, opt);
  },
  removeLabel: function(idx, opt) {
    var labels = this.labels();
    idx = isFinite(idx) && idx !== null ? idx | 0 : -1;
    labels.splice(idx, 1);
    return this.labels(labels, opt);
  },
  // Vertices API
  vertex: function(idx, vertex, opt) {
    var vertices = this.vertices();
    idx = isFinite(idx) && idx !== null ? idx | 0 : 0;
    if (idx < 0) idx = vertices.length + idx;
    if (arguments.length <= 1) return this.prop(["vertices", idx]);
    var setVertex = this._normalizeVertex(vertex);
    return this.prop(["vertices", idx], setVertex, opt);
  },
  vertices: function(vertices, opt) {
    if (arguments.length === 0) {
      vertices = this.get("vertices");
      if (!Array.isArray(vertices)) return [];
      return vertices.slice();
    }
    if (!Array.isArray(vertices)) vertices = [];
    var setVertices = [];
    for (var i = 0; i < vertices.length; i++) {
      var vertex = vertices[i];
      var setVertex = this._normalizeVertex(vertex);
      setVertices.push(setVertex);
    }
    return this.set("vertices", setVertices, opt);
  },
  insertVertex: function(idx, vertex, opt) {
    if (!vertex) throw new Error("dia.Link: no vertex provided");
    var vertices = this.vertices();
    var n = vertices.length;
    idx = isFinite(idx) && idx !== null ? idx | 0 : n;
    if (idx < 0) idx = n + idx + 1;
    var setVertex = this._normalizeVertex(vertex);
    vertices.splice(idx, 0, setVertex);
    return this.vertices(vertices, opt);
  },
  removeVertex: function(idx, opt) {
    var vertices = this.vertices();
    idx = isFinite(idx) && idx !== null ? idx | 0 : -1;
    vertices.splice(idx, 1);
    return this.vertices(vertices, opt);
  },
  _normalizeVertex: function(vertex) {
    var isPointProvided = !isPlainObject(vertex);
    if (isPointProvided) return {
      x: vertex.x,
      y: vertex.y
    };
    return vertex;
  },
  // Transformations
  translate: function(tx, ty, opt) {
    opt = opt || {};
    opt.translateBy = opt.translateBy || this.id;
    opt.tx = tx;
    opt.ty = ty;
    return this.applyToPoints(function(p) {
      return {
        x: (p.x || 0) + tx,
        y: (p.y || 0) + ty
      };
    }, opt);
  },
  scale: function(sx, sy, origin, opt) {
    return this.applyToPoints(function(p) {
      return Point(p).scale(sx, sy, origin).toJSON();
    }, opt);
  },
  applyToPoints: function(fn2, opt) {
    if (!isFunction(fn2)) {
      throw new TypeError("dia.Link: applyToPoints expects its first parameter to be a function.");
    }
    var attrs = {};
    var {
      source,
      target
    } = this.attributes;
    if (!source.id) {
      attrs.source = fn2(source);
    }
    if (!target.id) {
      attrs.target = fn2(target);
    }
    var vertices = this.vertices();
    if (vertices.length > 0) {
      attrs.vertices = vertices.map(fn2);
    }
    return this.set(attrs, opt);
  },
  getSourcePoint: function() {
    var sourceCell = this.getSourceCell();
    if (!sourceCell) return new Point(this.source());
    return sourceCell.getPointFromConnectedLink(this, "source");
  },
  getTargetPoint: function() {
    var targetCell = this.getTargetCell();
    if (!targetCell) return new Point(this.target());
    return targetCell.getPointFromConnectedLink(this, "target");
  },
  getPointFromConnectedLink: function() {
    return this.getPolyline().pointAt(0.5);
  },
  getPolyline: function() {
    const points = [this.getSourcePoint(), ...this.vertices().map(Point), this.getTargetPoint()];
    return new Polyline(points);
  },
  getBBox: function() {
    return this.getPolyline().bbox();
  },
  reparent: function(opt) {
    var newParent;
    if (this.graph) {
      var source = this.getSourceElement();
      var target = this.getTargetElement();
      var prevParent = this.getParentCell();
      if (source && target) {
        if (source === target || source.isEmbeddedIn(target)) {
          newParent = target;
        } else if (target.isEmbeddedIn(source)) {
          newParent = source;
        } else {
          newParent = this.graph.getCommonAncestor(source, target);
        }
      }
      if (prevParent && (!newParent || newParent.id !== prevParent.id)) {
        prevParent.unembed(this, opt);
      }
      if (newParent) {
        newParent.embed(this, opt);
      }
    }
    return newParent;
  },
  hasLoop: function(opt) {
    opt = opt || {};
    var {
      source,
      target
    } = this.attributes;
    var sourceId = source.id;
    var targetId = target.id;
    if (!sourceId || !targetId) {
      return false;
    }
    var loop = sourceId === targetId;
    if (!loop && opt.deep && this.graph) {
      var sourceElement = this.getSourceCell();
      var targetElement = this.getTargetCell();
      loop = sourceElement.isEmbeddedIn(targetElement) || targetElement.isEmbeddedIn(sourceElement);
    }
    return loop;
  },
  // unlike source(), this method returns null if source is a point
  getSourceCell: function() {
    const {
      graph,
      attributes: attributes2
    } = this;
    var source = attributes2.source;
    return source && source.id && graph && graph.getCell(source.id) || null;
  },
  getSourceElement: function() {
    var cell = this;
    var visited = {};
    do {
      if (visited[cell.id]) return null;
      visited[cell.id] = true;
      cell = cell.getSourceCell();
    } while (cell && cell.isLink());
    return cell;
  },
  // unlike target(), this method returns null if target is a point
  getTargetCell: function() {
    const {
      graph,
      attributes: attributes2
    } = this;
    var target = attributes2.target;
    return target && target.id && graph && graph.getCell(target.id) || null;
  },
  getTargetElement: function() {
    var cell = this;
    var visited = {};
    do {
      if (visited[cell.id]) return null;
      visited[cell.id] = true;
      cell = cell.getTargetCell();
    } while (cell && cell.isLink());
    return cell;
  },
  // Returns the common ancestor for the source element,
  // target element and the link itself.
  getRelationshipAncestor: function() {
    var connectionAncestor;
    if (this.graph) {
      var cells = [
        this,
        this.getSourceElement(),
        // null if source is a point
        this.getTargetElement()
        // null if target is a point
      ].filter(function(item) {
        return !!item;
      });
      connectionAncestor = this.graph.getCommonAncestor.apply(this.graph, cells);
    }
    return connectionAncestor || null;
  },
  // Is source, target and the link itself embedded in a given cell?
  isRelationshipEmbeddedIn: function(cell) {
    var cellId = isString(cell) || isNumber(cell) ? cell : cell.id;
    var ancestor = this.getRelationshipAncestor();
    return !!ancestor && (ancestor.id === cellId || ancestor.isEmbeddedIn(cellId));
  },
  // Get resolved default label.
  _getDefaultLabel: function() {
    var defaultLabel = this.get("defaultLabel") || this.defaultLabel || {};
    var label = {};
    label.markup = defaultLabel.markup || this.get("labelMarkup") || this.labelMarkup;
    label.position = defaultLabel.position;
    label.attrs = defaultLabel.attrs;
    label.size = defaultLabel.size;
    return label;
  }
}, {
  endsEqual: function(a, b) {
    var portsEqual = a.port === b.port || !a.port && !b.port;
    return a.id === b.id && portsEqual;
  }
});

// node_modules/jointjs/src/dia/ports.mjs
var PortData = function(data) {
  var clonedData = cloneDeep(data) || {};
  this.ports = [];
  this.groups = {};
  this.portLayoutNamespace = port_exports;
  this.portLabelLayoutNamespace = portLabel_exports;
  this._init(clonedData);
};
PortData.prototype = {
  getPorts: function() {
    return this.ports;
  },
  getGroup: function(name) {
    return this.groups[name] || {};
  },
  getPortsByGroup: function(groupName) {
    return this.ports.filter(function(port) {
      return port.group === groupName;
    });
  },
  getGroupPortsMetrics: function(groupName, elBBox) {
    var group = this.getGroup(groupName);
    var ports = this.getPortsByGroup(groupName);
    var groupPosition = group.position || {};
    var groupPositionName = groupPosition.name;
    var namespace = this.portLayoutNamespace;
    if (!namespace[groupPositionName]) {
      groupPositionName = "left";
    }
    var groupArgs = groupPosition.args || {};
    var portsArgs = ports.map(function(port) {
      return port && port.position && port.position.args;
    });
    var groupPortTransformations = namespace[groupPositionName](portsArgs, elBBox, groupArgs);
    var accumulator = {
      ports,
      result: []
    };
    toArray(groupPortTransformations).reduce(function(res, portTransformation, index) {
      var port = res.ports[index];
      res.result.push({
        portId: port.id,
        portTransformation,
        labelTransformation: this._getPortLabelLayout(port, Point(portTransformation), elBBox),
        portAttrs: port.attrs,
        portSize: port.size,
        labelSize: port.label.size
      });
      return res;
    }.bind(this), accumulator);
    return accumulator.result;
  },
  _getPortLabelLayout: function(port, portPosition, elBBox) {
    var namespace = this.portLabelLayoutNamespace;
    var labelPosition = port.label.position.name || "left";
    if (namespace[labelPosition]) {
      return namespace[labelPosition](portPosition, elBBox, port.label.position.args);
    }
    return null;
  },
  _init: function(data) {
    if (isObject(data.groups)) {
      var groups = Object.keys(data.groups);
      for (var i = 0, n = groups.length; i < n; i++) {
        var key = groups[i];
        this.groups[key] = this._evaluateGroup(data.groups[key]);
      }
    }
    var ports = toArray(data.items);
    for (var j = 0, m = ports.length; j < m; j++) {
      this.ports.push(this._evaluatePort(ports[j]));
    }
  },
  _evaluateGroup: function(group) {
    return merge(group, {
      position: this._getPosition(group.position, true),
      label: this._getLabel(group, true)
    });
  },
  _evaluatePort: function(port) {
    var evaluated = assign({}, port);
    var group = this.getGroup(port.group);
    evaluated.markup = evaluated.markup || group.markup;
    evaluated.attrs = merge({}, group.attrs, evaluated.attrs);
    evaluated.position = this._createPositionNode(group, evaluated);
    evaluated.label = merge({}, group.label, this._getLabel(evaluated));
    evaluated.z = this._getZIndex(group, evaluated);
    evaluated.size = assign({}, group.size, evaluated.size);
    return evaluated;
  },
  _getZIndex: function(group, port) {
    if (isNumber(port.z)) {
      return port.z;
    }
    if (isNumber(group.z) || group.z === "auto") {
      return group.z;
    }
    return "auto";
  },
  _createPositionNode: function(group, port) {
    return merge({
      name: "left",
      args: {}
    }, group.position, {
      args: port.args
    });
  },
  _getPosition: function(position, setDefault) {
    var args = {};
    var positionName;
    if (isFunction(position)) {
      positionName = "fn";
      args.fn = position;
    } else if (isString(position)) {
      positionName = position;
    } else if (position === void 0) {
      positionName = setDefault ? "left" : null;
    } else if (Array.isArray(position)) {
      positionName = "absolute";
      args.x = position[0];
      args.y = position[1];
    } else if (isObject(position)) {
      positionName = position.name;
      assign(args, position.args);
    }
    var result2 = {
      args
    };
    if (positionName) {
      result2.name = positionName;
    }
    return result2;
  },
  _getLabel: function(item, setDefaults) {
    var label = item.label || {};
    var ret = label;
    ret.position = this._getPosition(label.position, setDefaults);
    return ret;
  }
};
var elementPortPrototype = {
  _initializePorts: function() {
    this._createPortData();
    this.on("change:ports", function() {
      this._processRemovedPort();
      this._createPortData();
    }, this);
  },
  /**
   * remove links tied wiht just removed element
   * @private
   */
  _processRemovedPort: function() {
    var current = this.get("ports") || {};
    var currentItemsMap = {};
    toArray(current.items).forEach(function(item) {
      currentItemsMap[item.id] = true;
    });
    var previous = this.previous("ports") || {};
    var removed = {};
    toArray(previous.items).forEach(function(item) {
      if (!currentItemsMap[item.id]) {
        removed[item.id] = true;
      }
    });
    var graph = this.graph;
    if (graph && !isEmpty(removed)) {
      var inboundLinks = graph.getConnectedLinks(this, {
        inbound: true
      });
      inboundLinks.forEach(function(link) {
        if (removed[link.get("target").port]) link.remove();
      });
      var outboundLinks = graph.getConnectedLinks(this, {
        outbound: true
      });
      outboundLinks.forEach(function(link) {
        if (removed[link.get("source").port]) link.remove();
      });
    }
  },
  /**
   * @returns {boolean}
   */
  hasPorts: function() {
    var ports = this.prop("ports/items");
    return Array.isArray(ports) && ports.length > 0;
  },
  /**
   * @param {string} id
   * @returns {boolean}
   */
  hasPort: function(id) {
    return this.getPortIndex(id) !== -1;
  },
  /**
   * @returns {Array<object>}
   */
  getPorts: function() {
    return cloneDeep(this.prop("ports/items")) || [];
  },
  /**
   * @returns {Array<object>}
   */
  getGroupPorts: function(groupName) {
    const groupPorts = toArray(this.prop(["ports", "items"])).filter((port) => port.group === groupName);
    return cloneDeep(groupPorts);
  },
  /**
   * @param {string} id
   * @returns {object}
   */
  getPort: function(id) {
    return cloneDeep(toArray(this.prop("ports/items")).find(function(port) {
      return port.id && port.id === id;
    }));
  },
  /**
   * @param {string} groupName
   * @returns {Object<portId, {x: number, y: number, angle: number}>}
   */
  getPortsPositions: function(groupName) {
    var portsMetrics = this._portSettingsData.getGroupPortsMetrics(groupName, Rect(this.size()));
    return portsMetrics.reduce(function(positions, metrics) {
      var transformation = metrics.portTransformation;
      positions[metrics.portId] = {
        x: transformation.x,
        y: transformation.y,
        angle: transformation.angle
      };
      return positions;
    }, {});
  },
  /**
   * @param {string|Port} port port id or port
   * @returns {number} port index
   */
  getPortIndex: function(port) {
    var id = isObject(port) ? port.id : port;
    if (!this._isValidPortId(id)) {
      return -1;
    }
    return toArray(this.prop("ports/items")).findIndex(function(item) {
      return item.id === id;
    });
  },
  /**
   * @param {object} port
   * @param {object} [opt]
   * @returns {joint.dia.Element}
   */
  addPort: function(port, opt) {
    if (!isObject(port) || Array.isArray(port)) {
      throw new Error("Element: addPort requires an object.");
    }
    var ports = assign([], this.prop("ports/items"));
    ports.push(port);
    this.prop("ports/items", ports, opt);
    return this;
  },
  /**
   * @param {string|Port|number} before
   * @param {object} port
   * @param {object} [opt]
   * @returns {joint.dia.Element}
   */
  insertPort: function(before, port, opt) {
    const index = typeof before === "number" ? before : this.getPortIndex(before);
    if (!isObject(port) || Array.isArray(port)) {
      throw new Error("dia.Element: insertPort requires an object.");
    }
    const ports = assign([], this.prop("ports/items"));
    ports.splice(index, 0, port);
    this.prop("ports/items", ports, opt);
    return this;
  },
  /**
   * @param {string} portId
   * @param {string|object=} path
   * @param {*=} value
   * @param {object=} opt
   * @returns {joint.dia.Element}
   */
  portProp: function(portId, path, value, opt) {
    var index = this.getPortIndex(portId);
    if (index === -1) {
      throw new Error("Element: unable to find port with id " + portId);
    }
    var args = Array.prototype.slice.call(arguments, 1);
    if (Array.isArray(path)) {
      args[0] = ["ports", "items", index].concat(path);
    } else if (isString(path)) {
      args[0] = ["ports/items/", index, "/", path].join("");
    } else {
      args = ["ports/items/" + index];
      if (isPlainObject(path)) {
        args.push(path);
        args.push(value);
      }
    }
    return this.prop.apply(this, args);
  },
  _validatePorts: function() {
    var portsAttr = this.get("ports") || {};
    var errorMessages = [];
    portsAttr = portsAttr || {};
    var ports = toArray(portsAttr.items);
    ports.forEach(function(p) {
      if (typeof p !== "object") {
        errorMessages.push("Element: invalid port ", p);
      }
      if (!this._isValidPortId(p.id)) {
        p.id = this.generatePortId();
      }
    }, this);
    if (uniq(ports, "id").length !== ports.length) {
      errorMessages.push("Element: found id duplicities in ports.");
    }
    return errorMessages;
  },
  generatePortId: function() {
    return this.generateId();
  },
  /**
   * @param {string} id port id
   * @returns {boolean}
   * @private
   */
  _isValidPortId: function(id) {
    return id !== null && id !== void 0 && !isObject(id);
  },
  addPorts: function(ports, opt) {
    if (ports.length) {
      this.prop("ports/items", assign([], this.prop("ports/items")).concat(ports), opt);
    }
    return this;
  },
  removePort: function(port, opt) {
    const options = opt || {};
    const index = this.getPortIndex(port);
    if (index !== -1) {
      const ports = assign([], this.prop(["ports", "items"]));
      ports.splice(index, 1);
      options.rewrite = true;
      this.startBatch("port-remove");
      this.prop(["ports", "items"], ports, options);
      this.stopBatch("port-remove");
    }
    return this;
  },
  removePorts: function(portsForRemoval, opt) {
    let options, newPorts;
    if (Array.isArray(portsForRemoval)) {
      options = opt || {};
      if (portsForRemoval.length === 0) return this.this;
      const currentPorts = assign([], this.prop(["ports", "items"]));
      newPorts = currentPorts.filter(function(cp) {
        return !portsForRemoval.some(function(rp) {
          const rpId = isObject(rp) ? rp.id : rp;
          return cp.id === rpId;
        });
      });
    } else {
      options = portsForRemoval || {};
      newPorts = [];
    }
    this.startBatch("port-remove");
    options.rewrite = true;
    this.prop(["ports", "items"], newPorts, options);
    this.stopBatch("port-remove");
    return this;
  },
  /**
   * @private
   */
  _createPortData: function() {
    var err = this._validatePorts();
    if (err.length > 0) {
      this.set("ports", this.previous("ports"));
      throw new Error(err.join(" "));
    }
    var prevPortData;
    if (this._portSettingsData) {
      prevPortData = this._portSettingsData.getPorts();
    }
    this._portSettingsData = new PortData(this.get("ports"));
    var curPortData = this._portSettingsData.getPorts();
    if (prevPortData) {
      var added = curPortData.filter(function(item) {
        if (!prevPortData.find(function(prevPort) {
          return prevPort.id === item.id;
        })) {
          return item;
        }
      });
      var removed = prevPortData.filter(function(item) {
        if (!curPortData.find(function(curPort) {
          return curPort.id === item.id;
        })) {
          return item;
        }
      });
      if (removed.length > 0) {
        this.trigger("ports:remove", this, removed);
      }
      if (added.length > 0) {
        this.trigger("ports:add", this, added);
      }
    }
  }
};
var elementViewPortPrototype = {
  portContainerMarkup: "g",
  portMarkup: [{
    tagName: "circle",
    selector: "circle",
    attributes: {
      "r": 10,
      "fill": "#FFFFFF",
      "stroke": "#000000"
    }
  }],
  portLabelMarkup: [{
    tagName: "text",
    selector: "text",
    attributes: {
      "fill": "#000000"
    }
  }],
  /** @type {Object<string, {portElement: Vectorizer, portLabelElement: Vectorizer}>} */
  _portElementsCache: null,
  /**
   * @private
   */
  _initializePorts: function() {
    this._cleanPortsCache();
  },
  /**
   * @typedef {Object} Port
   *
   * @property {string} id
   * @property {Object} position
   * @property {Object} label
   * @property {Object} attrs
   * @property {string} markup
   * @property {string} group
   */
  /**
   * @private
   */
  _refreshPorts: function() {
    this._removePorts();
    this._cleanPortsCache();
    this._renderPorts();
  },
  _cleanPortsCache: function() {
    this._portElementsCache = {};
  },
  /**
   * @private
   */
  _renderPorts: function() {
    var elementReferences = [];
    var elem = this._getContainerElement();
    for (var i = 0, count = elem.node.childNodes.length; i < count; i++) {
      elementReferences.push(elem.node.childNodes[i]);
    }
    var portsGropsByZ = groupBy(this.model._portSettingsData.getPorts(), "z");
    var withoutZKey = "auto";
    toArray(portsGropsByZ[withoutZKey]).forEach(function(port) {
      var portElement = this._getPortElement(port);
      elem.append(portElement);
      elementReferences.push(portElement);
    }, this);
    var groupNames = Object.keys(portsGropsByZ);
    for (var k = 0; k < groupNames.length; k++) {
      var groupName = groupNames[k];
      if (groupName !== withoutZKey) {
        var z = parseInt(groupName, 10);
        this._appendPorts(portsGropsByZ[groupName], z, elementReferences);
      }
    }
    this._updatePorts();
  },
  /**
   * @returns {V}
   * @private
   */
  _getContainerElement: function() {
    return this.rotatableNode || this.vel;
  },
  /**
   * @param {Array<Port>}ports
   * @param {number} z
   * @param refs
   * @private
   */
  _appendPorts: function(ports, z, refs) {
    var containerElement = this._getContainerElement();
    var portElements = toArray(ports).map(this._getPortElement, this);
    if (refs[z] || z < 0) {
      V_default(refs[Math.max(z, 0)]).before(portElements);
    } else {
      containerElement.append(portElements);
    }
  },
  /**
   * Try to get element from cache,
   * @param port
   * @returns {*}
   * @private
   */
  _getPortElement: function(port) {
    if (this._portElementsCache[port.id]) {
      return this._portElementsCache[port.id].portElement;
    }
    return this._createPortElement(port);
  },
  findPortNode: function(portId, selector) {
    const portCache = this._portElementsCache[portId];
    if (!portCache) return null;
    if (!selector) return portCache.portContentElement.node;
    const portRoot = portCache.portElement.node;
    const portSelectors = portCache.portSelectors;
    const [node = null] = this.findBySelector(selector, portRoot, portSelectors);
    return node;
  },
  /**
   * @private
   */
  _updatePorts: function() {
    this._updatePortGroup(void 0);
    var groupsNames = Object.keys(this.model._portSettingsData.groups);
    groupsNames.forEach(this._updatePortGroup, this);
  },
  /**
   * @private
   */
  _removePorts: function() {
    invoke(this._portElementsCache, "portElement.remove");
  },
  /**
   * @param {Port} port
   * @returns {V}
   * @private
   */
  _createPortElement: function(port) {
    let portElement;
    let labelElement;
    let labelSelectors;
    let portSelectors;
    var portContainerElement = V_default(this.portContainerMarkup).addClass("joint-port");
    var portMarkup = this._getPortMarkup(port);
    if (Array.isArray(portMarkup)) {
      var portDoc = this.parseDOMJSON(portMarkup, portContainerElement.node);
      var portFragment = portDoc.fragment;
      if (portFragment.childNodes.length > 1) {
        portElement = V_default("g").append(portFragment);
      } else {
        portElement = V_default(portFragment.firstChild);
      }
      portSelectors = portDoc.selectors;
    } else {
      portElement = V_default(portMarkup);
      if (Array.isArray(portElement)) {
        portElement = V_default("g").append(portElement);
      }
    }
    if (!portElement) {
      throw new Error("ElementView: Invalid port markup.");
    }
    portElement.attr({
      "port": port.id,
      "port-group": port.group
    });
    const labelMarkupDef = this._getPortLabelMarkup(port.label);
    if (Array.isArray(labelMarkupDef)) {
      const {
        fragment,
        selectors
      } = this.parseDOMJSON(labelMarkupDef, portContainerElement.node);
      const childCount = fragment.childNodes.length;
      if (childCount > 0) {
        labelSelectors = selectors;
        labelElement = childCount === 1 ? V_default(fragment.firstChild) : V_default("g").append(fragment);
      }
    } else {
      labelElement = V_default(labelMarkupDef);
      if (Array.isArray(labelElement)) {
        labelElement = V_default("g").append(labelElement);
      }
    }
    var portContainerSelectors;
    if (portSelectors && labelSelectors) {
      for (var key in labelSelectors) {
        if (portSelectors[key] && key !== this.selector) throw new Error("ElementView: selectors within port must be unique.");
      }
      portContainerSelectors = assign({}, portSelectors, labelSelectors);
    } else {
      portContainerSelectors = portSelectors || labelSelectors || {};
    }
    const portRootSelector = "portRoot";
    const labelRootSelector = "labelRoot";
    const labelTextSelector = "labelText";
    if (!(portRootSelector in portContainerSelectors)) {
      portContainerSelectors[portRootSelector] = portElement.node;
    }
    if (labelElement) {
      const labelNode = labelElement.node;
      if (!(labelRootSelector in portContainerSelectors)) {
        portContainerSelectors[labelRootSelector] = labelNode;
      }
      if (!(labelTextSelector in portContainerSelectors)) {
        const labelTextNode = labelElement.tagName() === "TEXT" ? labelNode : Array.from(labelNode.querySelectorAll("text"));
        portContainerSelectors[labelTextSelector] = labelTextNode;
        if (!labelSelectors) labelSelectors = {};
        labelSelectors[labelTextSelector] = labelTextNode;
      }
    }
    portContainerElement.append(portElement.addClass("joint-port-body"));
    if (labelElement) {
      portContainerElement.append(labelElement.addClass("joint-port-label"));
    }
    this._portElementsCache[port.id] = {
      portElement: portContainerElement,
      portLabelElement: labelElement,
      portSelectors: portContainerSelectors,
      portLabelSelectors: labelSelectors,
      portContentElement: portElement,
      portContentSelectors: portSelectors
    };
    return portContainerElement;
  },
  /**
   * @param {string=} groupName
   * @private
   */
  _updatePortGroup: function(groupName) {
    var elementBBox = Rect(this.model.size());
    var portsMetrics = this.model._portSettingsData.getGroupPortsMetrics(groupName, elementBBox);
    for (var i = 0, n = portsMetrics.length; i < n; i++) {
      var metrics = portsMetrics[i];
      var portId = metrics.portId;
      var cached = this._portElementsCache[portId] || {};
      var portTransformation = metrics.portTransformation;
      var labelTransformation = metrics.labelTransformation;
      if (labelTransformation && cached.portLabelElement) {
        this.updateDOMSubtreeAttributes(cached.portLabelElement.node, labelTransformation.attrs, {
          rootBBox: new Rect(metrics.labelSize),
          selectors: cached.portLabelSelectors
        });
        this.applyPortTransform(cached.portLabelElement, labelTransformation, -portTransformation.angle || 0);
      }
      this.updateDOMSubtreeAttributes(cached.portElement.node, metrics.portAttrs, {
        rootBBox: new Rect(metrics.portSize),
        selectors: cached.portSelectors
      });
      this.applyPortTransform(cached.portElement, portTransformation);
    }
  },
  /**
   * @param {Vectorizer} element
   * @param {{dx:number, dy:number, angle: number, attrs: Object, x:number: y:number}} transformData
   * @param {number=} initialAngle
   * @constructor
   */
  applyPortTransform: function(element, transformData, initialAngle) {
    var matrix = V_default.createSVGMatrix().rotate(initialAngle || 0).translate(transformData.x || 0, transformData.y || 0).rotate(transformData.angle || 0);
    element.transform(matrix, {
      absolute: true
    });
  },
  /**
   * @param {Port} port
   * @returns {string}
   * @private
   */
  _getPortMarkup: function(port) {
    return port.markup || this.model.get("portMarkup") || this.model.portMarkup || this.portMarkup;
  },
  /**
   * @param {Object} label
   * @returns {string}
   * @private
   */
  _getPortLabelMarkup: function(label) {
    return label.markup || this.model.get("portLabelMarkup") || this.model.portLabelMarkup || this.portLabelMarkup;
  }
};

// node_modules/jointjs/src/dia/Element.mjs
var Element2 = Cell.extend({
  defaults: {
    position: {
      x: 0,
      y: 0
    },
    size: {
      width: 1,
      height: 1
    },
    angle: 0
  },
  initialize: function() {
    this._initializePorts();
    Cell.prototype.initialize.apply(this, arguments);
  },
  /**
   * @abstract
   */
  _initializePorts: function() {
  },
  _refreshPorts: function() {
  },
  isElement: function() {
    return true;
  },
  position: function(x, y, opt) {
    const isSetter = isNumber(y);
    opt = (isSetter ? opt : x) || {};
    const {
      parentRelative,
      deep,
      restrictedArea
    } = opt;
    let parentPosition;
    if (parentRelative) {
      if (!this.graph) throw new Error("Element must be part of a graph.");
      const parent2 = this.getParentCell();
      if (parent2 && !parent2.isLink()) {
        parentPosition = parent2.get("position");
      }
    }
    if (isSetter) {
      if (parentPosition) {
        x += parentPosition.x;
        y += parentPosition.y;
      }
      if (deep || restrictedArea) {
        const {
          x: x0,
          y: y0
        } = this.get("position");
        this.translate(x - x0, y - y0, opt);
      } else {
        this.set("position", {
          x,
          y
        }, opt);
      }
      return this;
    } else {
      const elementPosition = Point(this.get("position"));
      return parentRelative ? elementPosition.difference(parentPosition) : elementPosition;
    }
  },
  translate: function(tx, ty, opt) {
    tx = tx || 0;
    ty = ty || 0;
    if (tx === 0 && ty === 0) {
      return this;
    }
    opt = opt || {};
    opt.translateBy = opt.translateBy || this.id;
    var position = this.get("position") || {
      x: 0,
      y: 0
    };
    var ra = opt.restrictedArea;
    if (ra && opt.translateBy === this.id) {
      if (typeof ra === "function") {
        var newPosition = ra.call(this, position.x + tx, position.y + ty, opt);
        tx = newPosition.x - position.x;
        ty = newPosition.y - position.y;
      } else {
        var bbox2 = this.getBBox({
          deep: true
        });
        var dx = position.x - bbox2.x;
        var dy = position.y - bbox2.y;
        var x = Math.max(ra.x + dx, Math.min(ra.x + ra.width + dx - bbox2.width, position.x + tx));
        var y = Math.max(ra.y + dy, Math.min(ra.y + ra.height + dy - bbox2.height, position.y + ty));
        tx = x - position.x;
        ty = y - position.y;
      }
    }
    var translatedPosition = {
      x: position.x + tx,
      y: position.y + ty
    };
    opt.tx = tx;
    opt.ty = ty;
    if (opt.transition) {
      if (!isObject(opt.transition)) opt.transition = {};
      this.transition("position", translatedPosition, assign({}, opt.transition, {
        valueFunction: interpolate.object
      }));
      invoke(this.getEmbeddedCells(), "translate", tx, ty, opt);
    } else {
      this.startBatch("translate", opt);
      this.set("position", translatedPosition, opt);
      invoke(this.getEmbeddedCells(), "translate", tx, ty, opt);
      this.stopBatch("translate", opt);
    }
    return this;
  },
  size: function(width, height, opt) {
    var currentSize = this.get("size");
    if (width === void 0) {
      return {
        width: currentSize.width,
        height: currentSize.height
      };
    }
    if (isObject(width)) {
      opt = height;
      height = isNumber(width.height) ? width.height : currentSize.height;
      width = isNumber(width.width) ? width.width : currentSize.width;
    }
    return this.resize(width, height, opt);
  },
  resize: function(width, height, opt) {
    opt = opt || {};
    this.startBatch("resize", opt);
    if (opt.direction) {
      var currentSize = this.get("size");
      switch (opt.direction) {
        case "left":
        case "right":
          height = currentSize.height;
          break;
        case "top":
        case "bottom":
          width = currentSize.width;
          break;
      }
      var angle = normalizeAngle(this.get("angle") || 0);
      var bbox2 = this.getBBox();
      var origin;
      if (angle) {
        var quadrant = {
          "top-right": 0,
          "right": 0,
          "top-left": 1,
          "top": 1,
          "bottom-left": 2,
          "left": 2,
          "bottom-right": 3,
          "bottom": 3
        }[opt.direction];
        if (opt.absolute) {
          quadrant += Math.floor((angle + 45) / 90);
          quadrant %= 4;
        }
        var fixedPoint = bbox2[["bottomLeft", "corner", "topRight", "origin"][quadrant]]();
        var imageFixedPoint = Point(fixedPoint).rotate(bbox2.center(), -angle);
        var radius = Math.sqrt(width * width + height * height) / 2;
        var alpha = quadrant * Math.PI / 2;
        alpha += Math.atan(quadrant % 2 == 0 ? height / width : width / height);
        alpha -= toRad(angle);
        var center2 = Point.fromPolar(radius, alpha, imageFixedPoint);
        origin = Point(center2).offset(width / -2, height / -2);
      } else {
        origin = bbox2.topLeft();
        switch (opt.direction) {
          case "top":
          case "top-right":
            origin.offset(0, bbox2.height - height);
            break;
          case "left":
          case "bottom-left":
            origin.offset(bbox2.width - width, 0);
            break;
          case "top-left":
            origin.offset(bbox2.width - width, bbox2.height - height);
            break;
        }
      }
      this.set("size", {
        width,
        height
      }, opt);
      this.position(origin.x, origin.y, opt);
    } else {
      this.set("size", {
        width,
        height
      }, opt);
    }
    this.stopBatch("resize", opt);
    return this;
  },
  scale: function(sx, sy, origin, opt) {
    var scaledBBox = this.getBBox().scale(sx, sy, origin);
    this.startBatch("scale", opt);
    this.position(scaledBBox.x, scaledBBox.y, opt);
    this.resize(scaledBBox.width, scaledBBox.height, opt);
    this.stopBatch("scale");
    return this;
  },
  fitEmbeds: function(opt) {
    return this.fitToChildren(opt);
  },
  fitToChildren: function(opt = {}) {
    const {
      graph
    } = this;
    if (!graph) throw new Error("Element must be part of a graph.");
    const childElements = this.getEmbeddedCells().filter((cell) => cell.isElement());
    if (childElements.length === 0) return this;
    this.startBatch("fit-embeds", opt);
    if (opt.deep) {
      invoke(childElements, "fitToChildren", opt);
    }
    this._fitToElements(Object.assign({
      elements: childElements
    }, opt));
    this.stopBatch("fit-embeds");
    return this;
  },
  fitParent: function(opt = {}) {
    const {
      graph
    } = this;
    if (!graph) throw new Error("Element must be part of a graph.");
    if (opt.deep && opt.terminator && (opt.terminator === this || opt.terminator === this.id)) return this;
    const parentElement = this.getParentCell();
    if (!parentElement || !parentElement.isElement()) return this;
    const siblingElements = parentElement.getEmbeddedCells().filter((cell) => cell.isElement());
    if (siblingElements.length === 0) return this;
    this.startBatch("fit-parent", opt);
    parentElement._fitToElements(Object.assign({
      elements: siblingElements
    }, opt));
    if (opt.deep) {
      parentElement.fitParent(opt);
    }
    this.stopBatch("fit-parent");
    return this;
  },
  // Assumption: This element is part of a graph.
  _fitToElements: function(opt = {}) {
    const elementsBBox = this.graph.getCellsBBox(opt.elements);
    if (!elementsBBox) return;
    const {
      expandOnly,
      shrinkOnly
    } = opt;
    if (expandOnly && shrinkOnly) return;
    let {
      x,
      y,
      width,
      height
    } = elementsBBox;
    const {
      left: left4,
      right: right4,
      top: top4,
      bottom: bottom4
    } = normalizeSides(opt.padding);
    x -= left4;
    y -= top4;
    width += left4 + right4;
    height += bottom4 + top4;
    let resultBBox = new Rect(x, y, width, height);
    if (expandOnly) {
      resultBBox = this.getBBox().union(resultBBox);
    } else if (shrinkOnly) {
      const intersectionBBox = this.getBBox().intersect(resultBBox);
      if (!intersectionBBox) return;
      resultBBox = intersectionBBox;
    }
    this.set({
      position: {
        x: resultBBox.x,
        y: resultBBox.y
      },
      size: {
        width: resultBBox.width,
        height: resultBBox.height
      }
    }, opt);
  },
  // Rotate element by `angle` degrees, optionally around `origin` point.
  // If `origin` is not provided, it is considered to be the center of the element.
  // If `absolute` is `true`, the `angle` is considered is absolute, i.e. it is not
  // the difference from the previous angle.
  rotate: function(angle, absolute2, origin, opt) {
    if (origin) {
      var center2 = this.getBBox().center();
      var size = this.get("size");
      var position = this.get("position");
      center2.rotate(origin, this.get("angle") - angle);
      var dx = center2.x - size.width / 2 - position.x;
      var dy = center2.y - size.height / 2 - position.y;
      this.startBatch("rotate", {
        angle,
        absolute: absolute2,
        origin
      });
      this.position(position.x + dx, position.y + dy, opt);
      this.rotate(angle, absolute2, null, opt);
      this.stopBatch("rotate");
    } else {
      this.set("angle", absolute2 ? angle : (this.get("angle") + angle) % 360, opt);
    }
    return this;
  },
  angle: function() {
    return normalizeAngle(this.get("angle") || 0);
  },
  getBBox: function(opt = {}) {
    const {
      graph,
      attributes: attributes2
    } = this;
    const {
      deep,
      rotate
    } = opt;
    if (deep && graph) {
      const elements = this.getEmbeddedCells({
        deep: true,
        breadthFirst: true
      });
      elements.push(this);
      return graph.getCellsBBox(elements, opt);
    }
    const {
      angle = 0,
      position: {
        x,
        y
      },
      size: {
        width,
        height
      }
    } = attributes2;
    const bbox2 = new Rect(x, y, width, height);
    if (rotate) {
      bbox2.rotateAroundCenter(angle);
    }
    return bbox2;
  },
  getPointFromConnectedLink: function(link, endType) {
    var bbox2 = this.getBBox();
    var center2 = bbox2.center();
    var endDef = link.get(endType);
    if (!endDef) return center2;
    var portId = endDef.port;
    if (!portId || !this.hasPort(portId)) return center2;
    var portGroup = this.portProp(portId, ["group"]);
    var portsPositions = this.getPortsPositions(portGroup);
    var portCenter = new Point(portsPositions[portId]).offset(bbox2.origin());
    var angle = this.angle();
    if (angle) portCenter.rotate(center2, -angle);
    return portCenter;
  }
});
assign(Element2.prototype, elementPortPrototype);

// node_modules/jointjs/src/dia/Graph.mjs
var GraphCells = import_backbone2.default.Collection.extend({
  initialize: function(models, opt) {
    if (opt.cellNamespace) {
      this.cellNamespace = opt.cellNamespace;
    } else {
      this.cellNamespace = typeof joint !== "undefined" && has(joint, "shapes") ? joint.shapes : null;
    }
    this.graph = opt.graph;
  },
  model: function(attrs, opt) {
    var collection = opt.collection;
    var namespace = collection.cellNamespace;
    var ModelClass = attrs.type === "link" ? Link : getByPath(namespace, attrs.type, ".") || Element2;
    var cell = new ModelClass(attrs, opt);
    if (!opt.dry) {
      cell.graph = collection.graph;
    }
    return cell;
  },
  // `comparator` makes it easy to sort cells based on their `z` index.
  comparator: function(model) {
    return model.get("z") || 0;
  }
});
var Graph = import_backbone2.default.Model.extend({
  initialize: function(attrs, opt) {
    opt = opt || {};
    var cells = new GraphCells([], {
      model: opt.cellModel,
      cellNamespace: opt.cellNamespace,
      graph: this
    });
    import_backbone2.default.Model.prototype.set.call(this, "cells", cells);
    cells.on("all", this.trigger, this);
    this.on("change:z", this._sortOnChangeZ, this);
    this._out = {};
    this._in = {};
    this._nodes = {};
    this._edges = {};
    this._batches = {};
    cells.on("add", this._restructureOnAdd, this);
    cells.on("remove", this._restructureOnRemove, this);
    cells.on("reset", this._restructureOnReset, this);
    cells.on("change:source", this._restructureOnChangeSource, this);
    cells.on("change:target", this._restructureOnChangeTarget, this);
    cells.on("remove", this._removeCell, this);
  },
  _sortOnChangeZ: function() {
    this.get("cells").sort();
  },
  _restructureOnAdd: function(cell) {
    if (cell.isLink()) {
      this._edges[cell.id] = true;
      var {
        source,
        target
      } = cell.attributes;
      if (source.id) {
        (this._out[source.id] || (this._out[source.id] = {}))[cell.id] = true;
      }
      if (target.id) {
        (this._in[target.id] || (this._in[target.id] = {}))[cell.id] = true;
      }
    } else {
      this._nodes[cell.id] = true;
    }
  },
  _restructureOnRemove: function(cell) {
    if (cell.isLink()) {
      delete this._edges[cell.id];
      var {
        source,
        target
      } = cell.attributes;
      if (source.id && this._out[source.id] && this._out[source.id][cell.id]) {
        delete this._out[source.id][cell.id];
      }
      if (target.id && this._in[target.id] && this._in[target.id][cell.id]) {
        delete this._in[target.id][cell.id];
      }
    } else {
      delete this._nodes[cell.id];
    }
  },
  _restructureOnReset: function(cells) {
    cells = cells.models;
    this._out = {};
    this._in = {};
    this._nodes = {};
    this._edges = {};
    cells.forEach(this._restructureOnAdd, this);
  },
  _restructureOnChangeSource: function(link) {
    var prevSource = link.previous("source");
    if (prevSource.id && this._out[prevSource.id]) {
      delete this._out[prevSource.id][link.id];
    }
    var source = link.attributes.source;
    if (source.id) {
      (this._out[source.id] || (this._out[source.id] = {}))[link.id] = true;
    }
  },
  _restructureOnChangeTarget: function(link) {
    var prevTarget = link.previous("target");
    if (prevTarget.id && this._in[prevTarget.id]) {
      delete this._in[prevTarget.id][link.id];
    }
    var target = link.get("target");
    if (target.id) {
      (this._in[target.id] || (this._in[target.id] = {}))[link.id] = true;
    }
  },
  // Return all outbound edges for the node. Return value is an object
  // of the form: [edgeId] -> true
  getOutboundEdges: function(node) {
    return this._out && this._out[node] || {};
  },
  // Return all inbound edges for the node. Return value is an object
  // of the form: [edgeId] -> true
  getInboundEdges: function(node) {
    return this._in && this._in[node] || {};
  },
  toJSON: function() {
    var json = import_backbone2.default.Model.prototype.toJSON.apply(this, arguments);
    json.cells = this.get("cells").toJSON();
    return json;
  },
  fromJSON: function(json, opt) {
    if (!json.cells) {
      throw new Error("Graph JSON must contain cells array.");
    }
    return this.set(json, opt);
  },
  set: function(key, val, opt) {
    var attrs;
    if (typeof key === "object") {
      attrs = key;
      opt = val;
    } else {
      (attrs = {})[key] = val;
    }
    if (attrs.hasOwnProperty("cells")) {
      this.resetCells(attrs.cells, opt);
      attrs = omit(attrs, "cells");
    }
    return import_backbone2.default.Model.prototype.set.call(this, attrs, opt);
  },
  clear: function(opt) {
    opt = assign({}, opt, {
      clear: true
    });
    var collection = this.get("cells");
    if (collection.length === 0) return this;
    this.startBatch("clear", opt);
    var cells = collection.sortBy(function(cell) {
      return cell.isLink() ? 1 : 2;
    });
    do {
      cells.shift().remove(opt);
    } while (cells.length > 0);
    this.stopBatch("clear");
    return this;
  },
  _prepareCell: function(cell, opt) {
    var attrs;
    if (cell instanceof import_backbone2.default.Model) {
      attrs = cell.attributes;
      if (!cell.graph && (!opt || !opt.dry)) {
        cell.graph = this;
      }
    } else {
      attrs = cell;
    }
    if (!isString(attrs.type)) {
      throw new TypeError("dia.Graph: cell type must be a string.");
    }
    return cell;
  },
  minZIndex: function() {
    var firstCell = this.get("cells").first();
    return firstCell ? firstCell.get("z") || 0 : 0;
  },
  maxZIndex: function() {
    var lastCell = this.get("cells").last();
    return lastCell ? lastCell.get("z") || 0 : 0;
  },
  addCell: function(cell, opt) {
    if (Array.isArray(cell)) {
      return this.addCells(cell, opt);
    }
    if (cell instanceof import_backbone2.default.Model) {
      if (!cell.has("z")) {
        cell.set("z", this.maxZIndex() + 1);
      }
    } else if (cell.z === void 0) {
      cell.z = this.maxZIndex() + 1;
    }
    this.get("cells").add(this._prepareCell(cell, opt), opt || {});
    return this;
  },
  addCells: function(cells, opt) {
    if (cells.length === 0) return this;
    cells = flattenDeep(cells);
    opt.maxPosition = opt.position = cells.length - 1;
    this.startBatch("add", opt);
    cells.forEach(function(cell) {
      this.addCell(cell, opt);
      opt.position--;
    }, this);
    this.stopBatch("add", opt);
    return this;
  },
  // When adding a lot of cells, it is much more efficient to
  // reset the entire cells collection in one go.
  // Useful for bulk operations and optimizations.
  resetCells: function(cells, opt) {
    var preparedCells = toArray(cells).map(function(cell) {
      return this._prepareCell(cell, opt);
    }, this);
    this.get("cells").reset(preparedCells, opt);
    return this;
  },
  removeCells: function(cells, opt) {
    if (cells.length) {
      this.startBatch("remove");
      invoke(cells, "remove", opt);
      this.stopBatch("remove");
    }
    return this;
  },
  _removeCell: function(cell, collection, options) {
    options = options || {};
    if (!options.clear) {
      if (options.disconnectLinks) {
        this.disconnectLinks(cell, options);
      } else {
        this.removeLinks(cell, options);
      }
    }
    this.get("cells").remove(cell, {
      silent: true
    });
    if (cell.graph === this) {
      cell.graph = null;
    }
  },
  // Get a cell by `id`.
  getCell: function(id) {
    return this.get("cells").get(id);
  },
  getCells: function() {
    return this.get("cells").toArray();
  },
  getElements: function() {
    return this.get("cells").filter((cell) => cell.isElement());
  },
  getLinks: function() {
    return this.get("cells").filter((cell) => cell.isLink());
  },
  getFirstCell: function() {
    return this.get("cells").first();
  },
  getLastCell: function() {
    return this.get("cells").last();
  },
  // Get all inbound and outbound links connected to the cell `model`.
  getConnectedLinks: function(model, opt) {
    opt = opt || {};
    var indirect = opt.indirect;
    var inbound = opt.inbound;
    var outbound = opt.outbound;
    if (inbound === void 0 && outbound === void 0) {
      inbound = outbound = true;
    }
    var links = [];
    var edges = {};
    if (outbound) {
      addOutbounds(this, model);
    }
    if (inbound) {
      addInbounds(this, model);
    }
    function addOutbounds(graph, model2) {
      forIn(graph.getOutboundEdges(model2.id), function(_, edge) {
        if (edges[edge]) return;
        var link = graph.getCell(edge);
        links.push(link);
        edges[edge] = true;
        if (indirect) {
          if (inbound) addInbounds(graph, link);
          if (outbound) addOutbounds(graph, link);
        }
      }.bind(graph));
      if (indirect && model2.isLink()) {
        var outCell = model2.getTargetCell();
        if (outCell && outCell.isLink()) {
          if (!edges[outCell.id]) {
            links.push(outCell);
            addOutbounds(graph, outCell);
          }
        }
      }
    }
    function addInbounds(graph, model2) {
      forIn(graph.getInboundEdges(model2.id), function(_, edge) {
        if (edges[edge]) return;
        var link = graph.getCell(edge);
        links.push(link);
        edges[edge] = true;
        if (indirect) {
          if (inbound) addInbounds(graph, link);
          if (outbound) addOutbounds(graph, link);
        }
      }.bind(graph));
      if (indirect && model2.isLink()) {
        var inCell = model2.getSourceCell();
        if (inCell && inCell.isLink()) {
          if (!edges[inCell.id]) {
            links.push(inCell);
            addInbounds(graph, inCell);
          }
        }
      }
    }
    if (opt.deep) {
      var embeddedCells = model.getEmbeddedCells({
        deep: true
      });
      var embeddedElements = {};
      embeddedCells.forEach(function(cell) {
        if (cell.isElement()) {
          embeddedElements[cell.id] = true;
        }
      });
      embeddedCells.forEach(function(cell) {
        if (cell.isLink()) return;
        if (outbound) {
          forIn(this.getOutboundEdges(cell.id), function(exists2, edge) {
            if (!edges[edge]) {
              var edgeCell = this.getCell(edge);
              var {
                source,
                target
              } = edgeCell.attributes;
              var sourceId = source.id;
              var targetId = target.id;
              if (!opt.includeEnclosed && sourceId && embeddedElements[sourceId] && targetId && embeddedElements[targetId]) {
                return;
              }
              links.push(this.getCell(edge));
              edges[edge] = true;
            }
          }.bind(this));
        }
        if (inbound) {
          forIn(this.getInboundEdges(cell.id), function(exists2, edge) {
            if (!edges[edge]) {
              var edgeCell = this.getCell(edge);
              var {
                source,
                target
              } = edgeCell.attributes;
              var sourceId = source.id;
              var targetId = target.id;
              if (!opt.includeEnclosed && sourceId && embeddedElements[sourceId] && targetId && embeddedElements[targetId]) {
                return;
              }
              links.push(this.getCell(edge));
              edges[edge] = true;
            }
          }.bind(this));
        }
      }, this);
    }
    return links;
  },
  getNeighbors: function(model, opt) {
    opt || (opt = {});
    var inbound = opt.inbound;
    var outbound = opt.outbound;
    if (inbound === void 0 && outbound === void 0) {
      inbound = outbound = true;
    }
    var neighbors = this.getConnectedLinks(model, opt).reduce(function(res, link) {
      var {
        source,
        target
      } = link.attributes;
      var loop = link.hasLoop(opt);
      if (inbound && has(source, "id") && !res[source.id]) {
        var sourceElement = this.getCell(source.id);
        if (sourceElement.isElement()) {
          if (loop || sourceElement && sourceElement !== model && (!opt.deep || !sourceElement.isEmbeddedIn(model))) {
            res[source.id] = sourceElement;
          }
        }
      }
      if (outbound && has(target, "id") && !res[target.id]) {
        var targetElement = this.getCell(target.id);
        if (targetElement.isElement()) {
          if (loop || targetElement && targetElement !== model && (!opt.deep || !targetElement.isEmbeddedIn(model))) {
            res[target.id] = targetElement;
          }
        }
      }
      return res;
    }.bind(this), {});
    if (model.isLink()) {
      if (inbound) {
        var sourceCell = model.getSourceCell();
        if (sourceCell && sourceCell.isElement() && !neighbors[sourceCell.id]) {
          neighbors[sourceCell.id] = sourceCell;
        }
      }
      if (outbound) {
        var targetCell = model.getTargetCell();
        if (targetCell && targetCell.isElement() && !neighbors[targetCell.id]) {
          neighbors[targetCell.id] = targetCell;
        }
      }
    }
    return toArray(neighbors);
  },
  getCommonAncestor: function() {
    var cellsAncestors = Array.from(arguments).map(function(cell) {
      var ancestors = [];
      var parentId = cell.get("parent");
      while (parentId) {
        ancestors.push(parentId);
        parentId = this.getCell(parentId).get("parent");
      }
      return ancestors;
    }, this);
    cellsAncestors = cellsAncestors.sort(function(a, b) {
      return a.length - b.length;
    });
    var commonAncestor = toArray(cellsAncestors.shift()).find(function(ancestor) {
      return cellsAncestors.every(function(cellAncestors) {
        return cellAncestors.includes(ancestor);
      });
    });
    return this.getCell(commonAncestor);
  },
  // Find the whole branch starting at `element`.
  // If `opt.deep` is `true`, take into account embedded elements too.
  // If `opt.breadthFirst` is `true`, use the Breadth-first search algorithm, otherwise use Depth-first search.
  getSuccessors: function(element, opt) {
    opt = opt || {};
    var res = [];
    this.search(element, function(el) {
      if (el !== element) {
        res.push(el);
      }
    }, assign({}, opt, {
      outbound: true
    }));
    return res;
  },
  cloneCells,
  // Clone the whole subgraph (including all the connected links whose source/target is in the subgraph).
  // If `opt.deep` is `true`, also take into account all the embedded cells of all the subgraph cells.
  // Return a map of the form: [original cell ID] -> [clone].
  cloneSubgraph: function(cells, opt) {
    var subgraph = this.getSubgraph(cells, opt);
    return this.cloneCells(subgraph);
  },
  // Return `cells` and all the connected links that connect cells in the `cells` array.
  // If `opt.deep` is `true`, return all the cells including all their embedded cells
  // and all the links that connect any of the returned cells.
  // For example, for a single shallow element, the result is that very same element.
  // For two elements connected with a link: `A --- L ---> B`, the result for
  // `getSubgraph([A, B])` is `[A, L, B]`. The same goes for `getSubgraph([L])`, the result is again `[A, L, B]`.
  getSubgraph: function(cells, opt) {
    opt = opt || {};
    var subgraph = [];
    var cellMap = {};
    var elements = [];
    var links = [];
    toArray(cells).forEach(function(cell) {
      if (!cellMap[cell.id]) {
        subgraph.push(cell);
        cellMap[cell.id] = cell;
        if (cell.isLink()) {
          links.push(cell);
        } else {
          elements.push(cell);
        }
      }
      if (opt.deep) {
        var embeds = cell.getEmbeddedCells({
          deep: true
        });
        embeds.forEach(function(embed) {
          if (!cellMap[embed.id]) {
            subgraph.push(embed);
            cellMap[embed.id] = embed;
            if (embed.isLink()) {
              links.push(embed);
            } else {
              elements.push(embed);
            }
          }
        });
      }
    });
    links.forEach(function(link) {
      var {
        source,
        target
      } = link.attributes;
      if (source.id && !cellMap[source.id]) {
        var sourceElement = this.getCell(source.id);
        subgraph.push(sourceElement);
        cellMap[sourceElement.id] = sourceElement;
        elements.push(sourceElement);
      }
      if (target.id && !cellMap[target.id]) {
        var targetElement = this.getCell(target.id);
        subgraph.push(this.getCell(target.id));
        cellMap[targetElement.id] = targetElement;
        elements.push(targetElement);
      }
    }, this);
    elements.forEach(function(element) {
      var links2 = this.getConnectedLinks(element, opt);
      links2.forEach(function(link) {
        var {
          source,
          target
        } = link.attributes;
        if (!cellMap[link.id] && source.id && cellMap[source.id] && target.id && cellMap[target.id]) {
          subgraph.push(link);
          cellMap[link.id] = link;
        }
      });
    }, this);
    return subgraph;
  },
  // Find all the predecessors of `element`. This is a reverse operation of `getSuccessors()`.
  // If `opt.deep` is `true`, take into account embedded elements too.
  // If `opt.breadthFirst` is `true`, use the Breadth-first search algorithm, otherwise use Depth-first search.
  getPredecessors: function(element, opt) {
    opt = opt || {};
    var res = [];
    this.search(element, function(el) {
      if (el !== element) {
        res.push(el);
      }
    }, assign({}, opt, {
      inbound: true
    }));
    return res;
  },
  // Perform search on the graph.
  // If `opt.breadthFirst` is `true`, use the Breadth-first Search algorithm, otherwise use Depth-first search.
  // By setting `opt.inbound` to `true`, you can reverse the direction of the search.
  // If `opt.deep` is `true`, take into account embedded elements too.
  // `iteratee` is a function of the form `function(element) {}`.
  // If `iteratee` explicitly returns `false`, the searching stops.
  search: function(element, iteratee, opt) {
    opt = opt || {};
    if (opt.breadthFirst) {
      this.bfs(element, iteratee, opt);
    } else {
      this.dfs(element, iteratee, opt);
    }
  },
  // Breadth-first search.
  // If `opt.deep` is `true`, take into account embedded elements too.
  // If `opt.inbound` is `true`, reverse the search direction (it's like reversing all the link directions).
  // `iteratee` is a function of the form `function(element, distance) {}`.
  // where `element` is the currently visited element and `distance` is the distance of that element
  // from the root `element` passed the `bfs()`, i.e. the element we started the search from.
  // Note that the `distance` is not the shortest or longest distance, it is simply the number of levels
  // crossed till we visited the `element` for the first time. It is especially useful for tree graphs.
  // If `iteratee` explicitly returns `false`, the searching stops.
  bfs: function(element, iteratee, opt = {}) {
    const visited = {};
    const distance = {};
    const queue = [];
    queue.push(element);
    distance[element.id] = 0;
    while (queue.length > 0) {
      var next = queue.shift();
      if (visited[next.id]) continue;
      visited[next.id] = true;
      if (iteratee.call(this, next, distance[next.id]) === false) continue;
      const neighbors = this.getNeighbors(next, opt);
      for (let i = 0, n = neighbors.length; i < n; i++) {
        const neighbor = neighbors[i];
        distance[neighbor.id] = distance[next.id] + 1;
        queue.push(neighbor);
      }
    }
  },
  // Depth-first search.
  // If `opt.deep` is `true`, take into account embedded elements too.
  // If `opt.inbound` is `true`, reverse the search direction (it's like reversing all the link directions).
  // `iteratee` is a function of the form `function(element, distance) {}`.
  // If `iteratee` explicitly returns `false`, the search stops.
  dfs: function(element, iteratee, opt = {}) {
    const visited = {};
    const distance = {};
    const queue = [];
    queue.push(element);
    distance[element.id] = 0;
    while (queue.length > 0) {
      const next = queue.pop();
      if (visited[next.id]) continue;
      visited[next.id] = true;
      if (iteratee.call(this, next, distance[next.id]) === false) continue;
      const neighbors = this.getNeighbors(next, opt);
      const lastIndex = queue.length;
      for (let i = 0, n = neighbors.length; i < n; i++) {
        const neighbor = neighbors[i];
        distance[neighbor.id] = distance[next.id] + 1;
        queue.splice(lastIndex, 0, neighbor);
      }
    }
  },
  // Get all the roots of the graph. Time complexity: O(|V|).
  getSources: function() {
    var sources = [];
    forIn(this._nodes, function(exists2, node) {
      if (!this._in[node] || isEmpty(this._in[node])) {
        sources.push(this.getCell(node));
      }
    }.bind(this));
    return sources;
  },
  // Get all the leafs of the graph. Time complexity: O(|V|).
  getSinks: function() {
    var sinks = [];
    forIn(this._nodes, function(exists2, node) {
      if (!this._out[node] || isEmpty(this._out[node])) {
        sinks.push(this.getCell(node));
      }
    }.bind(this));
    return sinks;
  },
  // Return `true` if `element` is a root. Time complexity: O(1).
  isSource: function(element) {
    return !this._in[element.id] || isEmpty(this._in[element.id]);
  },
  // Return `true` if `element` is a leaf. Time complexity: O(1).
  isSink: function(element) {
    return !this._out[element.id] || isEmpty(this._out[element.id]);
  },
  // Return `true` is `elementB` is a successor of `elementA`. Return `false` otherwise.
  isSuccessor: function(elementA, elementB) {
    var isSuccessor = false;
    this.search(elementA, function(element) {
      if (element === elementB && element !== elementA) {
        isSuccessor = true;
        return false;
      }
    }, {
      outbound: true
    });
    return isSuccessor;
  },
  // Return `true` is `elementB` is a predecessor of `elementA`. Return `false` otherwise.
  isPredecessor: function(elementA, elementB) {
    var isPredecessor = false;
    this.search(elementA, function(element) {
      if (element === elementB && element !== elementA) {
        isPredecessor = true;
        return false;
      }
    }, {
      inbound: true
    });
    return isPredecessor;
  },
  // Return `true` is `elementB` is a neighbor of `elementA`. Return `false` otherwise.
  // `opt.deep` controls whether to take into account embedded elements as well. See `getNeighbors()`
  // for more details.
  // If `opt.outbound` is set to `true`, return `true` only if `elementB` is a successor neighbor.
  // Similarly, if `opt.inbound` is set to `true`, return `true` only if `elementB` is a predecessor neighbor.
  isNeighbor: function(elementA, elementB, opt) {
    opt = opt || {};
    var inbound = opt.inbound;
    var outbound = opt.outbound;
    if (inbound === void 0 && outbound === void 0) {
      inbound = outbound = true;
    }
    var isNeighbor = false;
    this.getConnectedLinks(elementA, opt).forEach(function(link) {
      var {
        source,
        target
      } = link.attributes;
      if (inbound && has(source, "id") && source.id === elementB.id) {
        isNeighbor = true;
        return false;
      }
      if (outbound && has(target, "id") && target.id === elementB.id) {
        isNeighbor = true;
        return false;
      }
    });
    return isNeighbor;
  },
  // Disconnect links connected to the cell `model`.
  disconnectLinks: function(model, opt) {
    this.getConnectedLinks(model).forEach(function(link) {
      link.set(link.attributes.source.id === model.id ? "source" : "target", {
        x: 0,
        y: 0
      }, opt);
    });
  },
  // Remove links connected to the cell `model` completely.
  removeLinks: function(model, opt) {
    invoke(this.getConnectedLinks(model), "remove", opt);
  },
  // Find all elements at given point
  findModelsFromPoint: function(p) {
    return this.getElements().filter((el) => el.getBBox({
      rotate: true
    }).containsPoint(p));
  },
  // Find all elements in given area
  findModelsInArea: function(rect2, opt = {}) {
    const r = new Rect(rect2);
    const {
      strict = false
    } = opt;
    const method = strict ? "containsRect" : "intersect";
    return this.getElements().filter((el) => r[method](el.getBBox({
      rotate: true
    })));
  },
  // Find all elements under the given element.
  findModelsUnderElement: function(element, opt = {}) {
    const {
      searchBy = "bbox"
    } = opt;
    const bbox2 = element.getBBox().rotateAroundCenter(element.angle());
    const elements = searchBy === "bbox" ? this.findModelsInArea(bbox2) : this.findModelsFromPoint(getRectPoint(bbox2, searchBy));
    return elements.filter((el) => element.id !== el.id && !el.isEmbeddedIn(element));
  },
  // Return bounding box of all elements.
  getBBox: function() {
    return this.getCellsBBox(this.getCells());
  },
  // Return the bounding box of all cells in array provided.
  getCellsBBox: function(cells, opt = {}) {
    const {
      rotate = true
    } = opt;
    return toArray(cells).reduce(function(memo, cell) {
      const rect2 = cell.getBBox({
        rotate
      });
      if (!rect2) return memo;
      if (memo) {
        return memo.union(rect2);
      }
      return rect2;
    }, null);
  },
  translate: function(dx, dy, opt) {
    var cells = this.getCells().filter(function(cell) {
      return !cell.isEmbedded();
    });
    invoke(cells, "translate", dx, dy, opt);
    return this;
  },
  resize: function(width, height, opt) {
    return this.resizeCells(width, height, this.getCells(), opt);
  },
  resizeCells: function(width, height, cells, opt) {
    var bbox2 = this.getCellsBBox(cells);
    if (bbox2) {
      var sx = Math.max(width / bbox2.width, 0);
      var sy = Math.max(height / bbox2.height, 0);
      invoke(cells, "scale", sx, sy, bbox2.origin(), opt);
    }
    return this;
  },
  startBatch: function(name, data) {
    data = data || {};
    this._batches[name] = (this._batches[name] || 0) + 1;
    return this.trigger("batch:start", assign({}, data, {
      batchName: name
    }));
  },
  stopBatch: function(name, data) {
    data = data || {};
    this._batches[name] = (this._batches[name] || 0) - 1;
    return this.trigger("batch:stop", assign({}, data, {
      batchName: name
    }));
  },
  hasActiveBatch: function(name) {
    const batches = this._batches;
    let names;
    if (arguments.length === 0) {
      names = Object.keys(batches);
    } else if (Array.isArray(name)) {
      names = name;
    } else {
      names = [name];
    }
    return names.some((batch) => batches[batch] > 0);
  }
}, {
  validations: {
    multiLinks: function(graph, link) {
      var {
        source,
        target
      } = link.attributes;
      if (source.id && target.id) {
        var sourceModel = link.getSourceCell();
        if (sourceModel) {
          var connectedLinks = graph.getConnectedLinks(sourceModel, {
            outbound: true
          });
          var sameLinks = connectedLinks.filter(function(_link) {
            var {
              source: _source,
              target: _target
            } = _link.attributes;
            return _source && _source.id === source.id && (!_source.port || _source.port === source.port) && _target && _target.id === target.id && (!_target.port || _target.port === target.port);
          });
          if (sameLinks.length > 1) {
            return false;
          }
        }
      }
      return true;
    },
    linkPinning: function(_graph, link) {
      var {
        source,
        target
      } = link.attributes;
      return source.id && target.id;
    }
  }
});
wrapWith(Graph.prototype, ["resetCells", "addCells", "removeCells"], wrappers.cells);

// node_modules/jointjs/src/mvc/index.mjs
var mvc_exports = {};
__export(mvc_exports, {
  Listener: () => Listener,
  View: () => View,
  views: () => views
});

// node_modules/jointjs/src/mvc/View.mjs
var import_backbone3 = __toESM(require_backbone(), 1);
var import_jquery3 = __toESM(require_jquery(), 1);
var views = {};
var View = import_backbone3.default.View.extend({
  options: {},
  theme: null,
  themeClassNamePrefix: addClassNamePrefix("theme-"),
  requireSetThemeOverride: false,
  defaultTheme: config.defaultTheme,
  children: null,
  childNodes: null,
  DETACHABLE: true,
  UPDATE_PRIORITY: 2,
  FLAG_INSERT: 1 << 30,
  FLAG_REMOVE: 1 << 29,
  FLAG_INIT: 1 << 28,
  constructor: function(options) {
    this.requireSetThemeOverride = options && !!options.theme;
    this.options = assign({}, this.options, options);
    import_backbone3.default.View.call(this, options);
  },
  initialize: function() {
    views[this.cid] = this;
    this.setTheme(this.options.theme || this.defaultTheme);
    this.init();
  },
  unmount: function() {
    if (this.svgElement) {
      this.vel.remove();
    } else {
      this.$el.remove();
    }
  },
  isMounted: function() {
    return this.el.parentNode !== null;
  },
  renderChildren: function(children) {
    children || (children = result(this, "children"));
    if (children) {
      var isSVG = this.svgElement;
      var namespace = V_default.namespace[isSVG ? "svg" : "xhtml"];
      var doc = parseDOMJSON(children, namespace);
      (isSVG ? this.vel : this.$el).empty().append(doc.fragment);
      this.childNodes = doc.selectors;
    }
    return this;
  },
  findAttribute: function(attributeName, node) {
    var currentNode = node;
    while (currentNode && currentNode.nodeType === 1) {
      var attributeValue = currentNode.getAttribute(attributeName);
      if (attributeValue) return attributeValue;
      if (currentNode === this.el) return null;
      currentNode = currentNode.parentNode;
    }
    return null;
  },
  // Override the Backbone `_ensureElement()` method in order to create an
  // svg element (e.g., `<g>`) node that wraps all the nodes of the Cell view.
  // Expose class name setter as a separate method.
  _ensureElement: function() {
    if (!this.el) {
      var tagName = result(this, "tagName");
      var attrs = assign({}, result(this, "attributes"));
      var style = assign({}, result(this, "style"));
      if (this.id) attrs.id = result(this, "id");
      this.setElement(this._createElement(tagName));
      this._setAttributes(attrs);
      this._setStyle(style);
    } else {
      this.setElement(result(this, "el"));
    }
    this._ensureElClassName();
  },
  _setAttributes: function(attrs) {
    if (this.svgElement) {
      this.vel.attr(attrs);
    } else {
      this.$el.attr(attrs);
    }
  },
  _setStyle: function(style) {
    this.$el.css(style);
  },
  _createElement: function(tagName) {
    if (this.svgElement) {
      return document.createElementNS(V_default.namespace.svg, tagName);
    } else {
      return document.createElement(tagName);
    }
  },
  // Utilize an alternative DOM manipulation API by
  // adding an element reference wrapped in Vectorizer.
  _setElement: function(el) {
    this.$el = el instanceof import_backbone3.default.$ ? el : import_backbone3.default.$(el);
    this.el = this.$el[0];
    if (this.svgElement) this.vel = V_default(this.el);
  },
  _ensureElClassName: function() {
    var className2 = result(this, "className");
    if (!className2) return;
    var prefixedClassName = addClassNamePrefix(className2);
    if (this.svgElement) {
      this.vel.removeClass(className2).addClass(prefixedClassName);
    } else {
      this.$el.removeClass(className2).addClass(prefixedClassName);
    }
  },
  init: function() {
  },
  onRender: function() {
  },
  confirmUpdate: function() {
    return 0;
  },
  setTheme: function(theme, opt) {
    opt = opt || {};
    if (this.theme && this.requireSetThemeOverride && !opt.override) {
      return this;
    }
    this.removeThemeClassName();
    this.addThemeClassName(theme);
    this.onSetTheme(
      this.theme,
      theme
      /* newTheme */
    );
    this.theme = theme;
    return this;
  },
  addThemeClassName: function(theme) {
    theme = theme || this.theme;
    if (!theme) return this;
    var className2 = this.themeClassNamePrefix + theme;
    if (this.svgElement) {
      this.vel.addClass(className2);
    } else {
      this.$el.addClass(className2);
    }
    return this;
  },
  removeThemeClassName: function(theme) {
    theme = theme || this.theme;
    var className2 = this.themeClassNamePrefix + theme;
    if (this.svgElement) {
      this.vel.removeClass(className2);
    } else {
      this.$el.removeClass(className2);
    }
    return this;
  },
  onSetTheme: function(oldTheme, newTheme) {
  },
  remove: function() {
    this.onRemove();
    this.undelegateDocumentEvents();
    views[this.cid] = null;
    import_backbone3.default.View.prototype.remove.apply(this, arguments);
    return this;
  },
  onRemove: function() {
  },
  getEventNamespace: function() {
    return ".joint-event-ns-" + this.cid;
  },
  delegateElementEvents: function(element, events, data) {
    if (!events) return this;
    data || (data = {});
    var eventNS = this.getEventNamespace();
    for (var eventName in events) {
      var method = events[eventName];
      if (typeof method !== "function") method = this[method];
      if (!method) continue;
      (0, import_jquery3.default)(element).on(eventName + eventNS, data, method.bind(this));
    }
    return this;
  },
  undelegateElementEvents: function(element) {
    (0, import_jquery3.default)(element).off(this.getEventNamespace());
    return this;
  },
  delegateDocumentEvents: function(events, data) {
    events || (events = result(this, "documentEvents"));
    return this.delegateElementEvents(document, events, data);
  },
  undelegateDocumentEvents: function() {
    return this.undelegateElementEvents(document);
  },
  eventData: function(evt, data) {
    if (!evt) throw new Error("eventData(): event object required.");
    var currentData = evt.data;
    var key = "__" + this.cid + "__";
    if (data === void 0) {
      if (!currentData) return {};
      return currentData[key] || {};
    }
    currentData || (currentData = evt.data = {});
    currentData[key] || (currentData[key] = {});
    assign(currentData[key], data);
    return this;
  },
  stopPropagation: function(evt) {
    this.eventData(evt, {
      propagationStopped: true
    });
    return this;
  },
  isPropagationStopped: function(evt) {
    return !!this.eventData(evt).propagationStopped;
  }
}, {
  extend: function() {
    var args = Array.from(arguments);
    var protoProps = args[0] && assign({}, args[0]) || {};
    var staticProps = args[1] && assign({}, args[1]) || {};
    var renderFn = protoProps.render || this.prototype && this.prototype.render || null;
    protoProps.render = function() {
      if (typeof renderFn === "function") {
        renderFn.apply(this, arguments);
      }
      if (this.render.__render__ === renderFn) {
        this.onRender();
      }
      return this;
    };
    protoProps.render.__render__ = renderFn;
    return import_backbone3.default.View.extend.call(this, protoProps, staticProps);
  }
});
var DoubleTapEventName = "dbltap";
if (import_jquery3.default.event && !(DoubleTapEventName in import_jquery3.default.event.special)) {
  const maxDelay = config.doubleTapInterval;
  const minDelay = 30;
  import_jquery3.default.event.special[DoubleTapEventName] = {
    bindType: "touchend",
    delegateType: "touchend",
    handle: function(event, ...args) {
      const {
        handleObj,
        target
      } = event;
      const targetData = import_jquery3.default.data(target);
      const now = (/* @__PURE__ */ new Date()).getTime();
      const delta = "lastTouch" in targetData ? now - targetData.lastTouch : 0;
      if (delta < maxDelay && delta > minDelay) {
        targetData.lastTouch = null;
        event.type = handleObj.origType;
        handleObj.handler.call(this, event, ...args);
      } else {
        targetData.lastTouch = now;
      }
    }
  };
}

// node_modules/jointjs/src/mvc/Listener.mjs
var import_backbone4 = __toESM(require_backbone(), 1);
var Listener = class {
  constructor(...callbackArguments) {
    this.callbackArguments = callbackArguments;
  }
  listenTo(object, evt, ...args) {
    const {
      callbackArguments
    } = this;
    if (V_default.isObject(evt)) {
      const [context = null] = args;
      Object.entries(evt).forEach(([eventName, cb]) => {
        if (typeof cb !== "function") return;
        if (context || callbackArguments.length > 0) cb = cb.bind(context, ...callbackArguments);
        import_backbone4.default.Events.listenTo.call(this, object, eventName, cb);
      });
    } else if (typeof evt === "string" && typeof args[0] === "function") {
      let [cb, context = null] = args;
      if (context || callbackArguments.length > 0) cb = cb.bind(context, ...callbackArguments);
      import_backbone4.default.Events.listenTo.call(this, object, evt, cb);
    }
  }
  stopListening() {
    import_backbone4.default.Events.stopListening.call(this);
  }
};

// node_modules/jointjs/src/dia/PaperLayer.mjs
var LayersNames = {
  CELLS: "cells",
  BACK: "back",
  FRONT: "front",
  TOOLS: "tools",
  LABELS: "labels"
};
var PaperLayer = View.extend({
  tagName: "g",
  svgElement: true,
  pivotNodes: null,
  defaultTheme: null,
  options: {
    name: ""
  },
  className: function() {
    return addClassNamePrefix(`${this.options.name}-layer`);
  },
  init: function() {
    this.pivotNodes = {};
  },
  insertSortedNode: function(node, z) {
    this.el.insertBefore(node, this.insertPivot(z));
  },
  insertNode: function(node) {
    const {
      el
    } = this;
    if (node.parentNode !== el) {
      el.appendChild(node);
    }
  },
  insertPivot: function(z) {
    const {
      el,
      pivotNodes
    } = this;
    z = +z;
    z || (z = 0);
    let pivotNode = pivotNodes[z];
    if (pivotNode) return pivotNode;
    pivotNode = pivotNodes[z] = document.createComment("z-index:" + (z + 1));
    let neighborZ = -Infinity;
    for (let currentZ in pivotNodes) {
      currentZ = +currentZ;
      if (currentZ < z && currentZ > neighborZ) {
        neighborZ = currentZ;
        if (neighborZ === z - 1) continue;
      }
    }
    if (neighborZ !== -Infinity) {
      const neighborPivot = pivotNodes[neighborZ];
      el.insertBefore(pivotNode, neighborPivot.nextSibling);
    } else {
      el.insertBefore(pivotNode, el.firstChild);
    }
    return pivotNode;
  },
  removePivots: function() {
    const {
      el,
      pivotNodes
    } = this;
    for (let z in pivotNodes) el.removeChild(pivotNodes[z]);
    this.pivotNodes = {};
  }
});

// node_modules/jointjs/src/dia/CellView.mjs
var import_jquery4 = __toESM(require_jquery(), 1);

// node_modules/jointjs/src/dia/HighlighterView.mjs
function toArray2(obj) {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj;
  return [obj];
}
var HighlighterView = View.extend({
  tagName: "g",
  svgElement: true,
  className: "highlight",
  HIGHLIGHT_FLAG: 1,
  UPDATE_PRIORITY: 3,
  DETACHABLE: false,
  UPDATABLE: true,
  MOUNTABLE: true,
  cellView: null,
  nodeSelector: null,
  node: null,
  updateRequested: false,
  postponedUpdate: false,
  transformGroup: null,
  detachedTransformGroup: null,
  requestUpdate(cellView, nodeSelector) {
    const {
      paper
    } = cellView;
    this.cellView = cellView;
    this.nodeSelector = nodeSelector;
    if (paper) {
      this.updateRequested = true;
      paper.requestViewUpdate(this, this.HIGHLIGHT_FLAG, this.UPDATE_PRIORITY);
    }
  },
  confirmUpdate() {
    this.updateRequested = false;
    const {
      cellView,
      nodeSelector
    } = this;
    if (!cellView.isMounted()) {
      this.postponedUpdate = true;
      return 0;
    }
    this.update(cellView, nodeSelector);
    this.mount();
    this.transform();
    return 0;
  },
  findNode(cellView, nodeSelector = null) {
    let el;
    if (typeof nodeSelector === "string") {
      [el] = cellView.findBySelector(nodeSelector);
    } else if (isPlainObject(nodeSelector)) {
      const isLink = cellView.model.isLink();
      const {
        label = null,
        port,
        selector
      } = nodeSelector;
      if (isLink && label !== null) {
        el = cellView.findLabelNode(label, selector);
      } else if (!isLink && port) {
        el = cellView.findPortNode(port, selector);
      } else {
        [el] = cellView.findBySelector(selector);
      }
    } else if (nodeSelector) {
      el = V_default.toNode(nodeSelector);
      if (!(el instanceof SVGElement)) el = null;
    }
    return el ? el : null;
  },
  getNodeMatrix(cellView, node) {
    const {
      options
    } = this;
    const {
      layer
    } = options;
    const {
      rotatableNode
    } = cellView;
    const nodeMatrix = cellView.getNodeMatrix(node);
    if (rotatableNode) {
      if (layer) {
        if (rotatableNode.contains(node)) {
          return nodeMatrix;
        }
        return cellView.getRootRotateMatrix().inverse().multiply(nodeMatrix);
      } else {
        return cellView.getNodeRotateMatrix(node).multiply(nodeMatrix);
      }
    }
    return nodeMatrix;
  },
  mount() {
    const {
      MOUNTABLE,
      cellView,
      el,
      options,
      transformGroup,
      detachedTransformGroup,
      postponedUpdate,
      nodeSelector
    } = this;
    if (!MOUNTABLE || transformGroup) return;
    if (postponedUpdate) {
      this.update(cellView, nodeSelector);
      this.transform();
      return;
    }
    const {
      vel: cellViewRoot,
      paper
    } = cellView;
    const {
      layer: layerName
    } = options;
    if (layerName) {
      let vGroup;
      if (detachedTransformGroup) {
        vGroup = detachedTransformGroup;
        this.detachedTransformGroup = null;
      } else {
        vGroup = V_default("g").addClass("highlight-transform").append(el);
      }
      this.transformGroup = vGroup;
      paper.getLayerView(layerName).insertSortedNode(vGroup.node, options.z);
    } else {
      if (!el.parentNode || el.nextSibling) {
        cellViewRoot.append(el);
      }
    }
  },
  unmount() {
    const {
      MOUNTABLE,
      transformGroup,
      vel
    } = this;
    if (!MOUNTABLE) return;
    if (transformGroup) {
      this.transformGroup = null;
      this.detachedTransformGroup = transformGroup;
      transformGroup.remove();
    } else {
      vel.remove();
    }
  },
  transform() {
    const {
      transformGroup,
      cellView,
      updateRequested
    } = this;
    if (!transformGroup || cellView.model.isLink() || updateRequested) return;
    const translateMatrix = cellView.getRootTranslateMatrix();
    const rotateMatrix = cellView.getRootRotateMatrix();
    const transformMatrix = translateMatrix.multiply(rotateMatrix);
    transformGroup.attr("transform", V_default.matrixToTransformString(transformMatrix));
  },
  update() {
    const {
      node: prevNode,
      cellView,
      nodeSelector,
      updateRequested,
      id
    } = this;
    if (updateRequested) return;
    this.postponedUpdate = false;
    const node = this.node = this.findNode(cellView, nodeSelector);
    if (prevNode) {
      this.unhighlight(cellView, prevNode);
    }
    if (node) {
      this.highlight(cellView, node);
      this.mount();
    } else {
      this.unmount();
      cellView.notify("cell:highlight:invalid", id, this);
    }
  },
  onRemove() {
    const {
      node,
      cellView,
      id,
      constructor
    } = this;
    if (node) {
      this.unhighlight(cellView, node);
    }
    this.unmount();
    constructor._removeRef(cellView, id);
  },
  highlight(_cellView, _node) {
  },
  unhighlight(_cellView, _node) {
  },
  // Update Attributes
  listenToUpdateAttributes(cellView) {
    const attributes2 = result(this, "UPDATE_ATTRIBUTES");
    if (!Array.isArray(attributes2) || attributes2.length === 0) return;
    this.listenTo(cellView.model, "change", this.onCellAttributeChange);
  },
  onCellAttributeChange() {
    const {
      cellView
    } = this;
    if (!cellView) return;
    const {
      model,
      paper
    } = cellView;
    const attributes2 = result(this, "UPDATE_ATTRIBUTES");
    if (!attributes2.some((attribute) => model.hasChanged(attribute))) return;
    paper.requestViewUpdate(this, this.HIGHLIGHT_FLAG, this.UPDATE_PRIORITY);
  }
}, {
  _views: {},
  // Used internally by CellView highlight()
  highlight: function(cellView, node, opt) {
    const id = this.uniqueId(node, opt);
    this.add(cellView, node, id, opt);
  },
  // Used internally by CellView unhighlight()
  unhighlight: function(cellView, node, opt) {
    const id = this.uniqueId(node, opt);
    this.remove(cellView, id);
  },
  get(cellView, id = null) {
    const {
      cid
    } = cellView;
    const {
      _views
    } = this;
    const refs = _views[cid];
    if (id === null) {
      const views2 = [];
      if (!refs) return views2;
      for (let hid in refs) {
        const ref = refs[hid];
        if (ref instanceof this) {
          views2.push(ref);
        }
      }
      return views2;
    } else {
      if (!refs) return null;
      if (id in refs) {
        const ref = refs[id];
        if (ref instanceof this) return ref;
      }
      return null;
    }
  },
  add(cellView, nodeSelector, id, opt = {}) {
    if (!id) throw new Error("dia.HighlighterView: An ID required.");
    const previousView = HighlighterView.get(cellView, id);
    if (previousView) previousView.remove();
    const view = new this(opt);
    view.id = id;
    this._addRef(cellView, id, view);
    view.requestUpdate(cellView, nodeSelector);
    view.listenToUpdateAttributes(cellView);
    return view;
  },
  _addRef(cellView, id, view) {
    const {
      cid
    } = cellView;
    const {
      _views
    } = this;
    let refs = _views[cid];
    if (!refs) refs = _views[cid] = {};
    refs[id] = view;
  },
  _removeRef(cellView, id) {
    const {
      cid
    } = cellView;
    const {
      _views
    } = this;
    const refs = _views[cid];
    if (!refs) return;
    if (id) delete refs[id];
    for (let _ in refs) return;
    delete _views[cid];
  },
  remove(cellView, id = null) {
    toArray2(this.get(cellView, id)).forEach((view) => {
      view.remove();
    });
  },
  removeAll(paper, id = null) {
    const {
      _views
    } = this;
    for (let cid in _views) {
      for (let hid in _views[cid]) {
        const view = _views[cid][hid];
        if (view.cellView.paper === paper && view instanceof this && (id === null || hid === id)) {
          view.remove();
        }
      }
    }
  },
  update(cellView, id = null, dirty = false) {
    toArray2(this.get(cellView, id)).forEach((view) => {
      if (dirty || view.UPDATABLE) view.update();
    });
  },
  transform(cellView, id = null) {
    toArray2(this.get(cellView, id)).forEach((view) => {
      if (view.UPDATABLE) view.transform();
    });
  },
  unmount(cellView, id = null) {
    toArray2(this.get(cellView, id)).forEach((view) => view.unmount());
  },
  mount(cellView, id = null) {
    toArray2(this.get(cellView, id)).forEach((view) => view.mount());
  },
  uniqueId(node, opt = "") {
    return V_default.ensureId(node) + JSON.stringify(opt);
  }
});

// node_modules/jointjs/src/dia/CellView.mjs
var HighlightingTypes = {
  DEFAULT: "default",
  EMBEDDING: "embedding",
  CONNECTING: "connecting",
  MAGNET_AVAILABILITY: "magnetAvailability",
  ELEMENT_AVAILABILITY: "elementAvailability"
};
var Flags = {
  TOOLS: "TOOLS"
};
var CellView = View.extend({
  tagName: "g",
  svgElement: true,
  selector: "root",
  metrics: null,
  className: function() {
    var classNames = ["cell"];
    var type = this.model.get("type");
    if (type) {
      type.toLowerCase().split(".").forEach(function(value, index, list2) {
        classNames.push("type-" + list2.slice(0, index + 1).join("-"));
      });
    }
    return classNames.join(" ");
  },
  _presentationAttributes: null,
  _flags: null,
  setFlags: function() {
    var flags = {};
    var attributes2 = {};
    var shift = 0;
    var i, n, label;
    var presentationAttributes = result(this, "presentationAttributes");
    for (var attribute in presentationAttributes) {
      if (!presentationAttributes.hasOwnProperty(attribute)) continue;
      var labels = presentationAttributes[attribute];
      if (!Array.isArray(labels)) labels = [labels];
      for (i = 0, n = labels.length; i < n; i++) {
        label = labels[i];
        var flag = flags[label];
        if (!flag) {
          flag = flags[label] = 1 << shift++;
        }
        attributes2[attribute] |= flag;
      }
    }
    var initFlag = result(this, "initFlag");
    if (!Array.isArray(initFlag)) initFlag = [initFlag];
    for (i = 0, n = initFlag.length; i < n; i++) {
      label = initFlag[i];
      if (!flags[label]) flags[label] = 1 << shift++;
    }
    if (shift > 25) throw new Error("dia.CellView: Maximum number of flags exceeded.");
    this._flags = flags;
    this._presentationAttributes = attributes2;
  },
  hasFlag: function(flag, label) {
    return flag & this.getFlag(label);
  },
  removeFlag: function(flag, label) {
    return flag ^ flag & this.getFlag(label);
  },
  getFlag: function(label) {
    var flags = this._flags;
    if (!flags) return 0;
    var flag = 0;
    if (Array.isArray(label)) {
      for (var i = 0, n = label.length; i < n; i++) flag |= flags[label[i]];
    } else {
      flag |= flags[label];
    }
    return flag;
  },
  attributes: function() {
    var cell = this.model;
    return {
      "model-id": cell.id,
      "data-type": cell.attributes.type
    };
  },
  constructor: function(options) {
    options.id = options.id || guid(this);
    View.call(this, options);
  },
  initialize: function() {
    this.setFlags();
    View.prototype.initialize.apply(this, arguments);
    this.cleanNodesCache();
    this.$el.data("view", this);
    this.startListening();
  },
  startListening: function() {
    this.listenTo(this.model, "change", this.onAttributesChange);
  },
  onAttributesChange: function(model, opt) {
    var flag = model.getChangeFlag(this._presentationAttributes);
    if (opt.updateHandled || !flag) return;
    if (opt.dirty && this.hasFlag(flag, "UPDATE")) flag |= this.getFlag("RENDER");
    if (opt.tool) opt.async = false;
    this.requestUpdate(flag, opt);
  },
  requestUpdate: function(flags, opt) {
    const {
      paper
    } = this;
    if (paper && flags > 0) {
      paper.requestViewUpdate(this, flags, this.UPDATE_PRIORITY, opt);
    }
  },
  parseDOMJSON: function(markup, root) {
    var doc = parseDOMJSON(markup);
    var selectors = doc.selectors;
    var groups = doc.groupSelectors;
    for (var group in groups) {
      if (selectors[group]) throw new Error("dia.CellView: ambiguous group selector");
      selectors[group] = groups[group];
    }
    if (root) {
      var rootSelector = this.selector;
      if (selectors[rootSelector]) throw new Error("dia.CellView: ambiguous root selector.");
      selectors[rootSelector] = root;
    }
    return {
      fragment: doc.fragment,
      selectors
    };
  },
  // Return `true` if cell link is allowed to perform a certain UI `feature`.
  // Example: `can('vertexMove')`, `can('labelMove')`.
  can: function(feature) {
    var interactive = isFunction(this.options.interactive) ? this.options.interactive(this) : this.options.interactive;
    return isObject(interactive) && interactive[feature] !== false || isBoolean(interactive) && interactive !== false;
  },
  findBySelector: function(selector, root, selectors) {
    root || (root = this.el);
    selectors || (selectors = this.selectors);
    if (!selector || selector === ".") return [root];
    if (selectors) {
      var nodes = selectors[selector];
      if (nodes) {
        if (Array.isArray(nodes)) return nodes;
        return [nodes];
      }
    }
    if (config.useCSSSelectors) return (0, import_jquery4.default)(root).find(selector).toArray();
    return [];
  },
  notify: function(eventName) {
    if (this.paper) {
      var args = Array.prototype.slice.call(arguments, 1);
      this.trigger.apply(this, [eventName].concat(args));
      this.paper.trigger.apply(this.paper, [eventName, this].concat(args));
    }
  },
  getBBox: function(opt) {
    var bbox2;
    if (opt && opt.useModelGeometry) {
      var model = this.model;
      bbox2 = model.getBBox().bbox(model.angle());
    } else {
      bbox2 = this.getNodeBBox(this.el);
    }
    return this.paper.localToPaperRect(bbox2);
  },
  getNodeBBox: function(magnet) {
    const rect2 = this.getNodeBoundingRect(magnet);
    const transformMatrix = this.getRootTranslateMatrix().multiply(this.getNodeRotateMatrix(magnet));
    const magnetMatrix = this.getNodeMatrix(magnet);
    return V_default.transformRect(rect2, transformMatrix.multiply(magnetMatrix));
  },
  getNodeRotateMatrix(node) {
    if (!this.rotatableNode || this.rotatableNode.contains(node)) {
      return this.getRootRotateMatrix();
    }
    return V_default.createSVGMatrix();
  },
  getNodeUnrotatedBBox: function(magnet) {
    var rect2 = this.getNodeBoundingRect(magnet);
    var magnetMatrix = this.getNodeMatrix(magnet);
    var translateMatrix = this.getRootTranslateMatrix();
    return V_default.transformRect(rect2, translateMatrix.multiply(magnetMatrix));
  },
  getRootTranslateMatrix: function() {
    var model = this.model;
    var position = model.position();
    var mt = V_default.createSVGMatrix().translate(position.x, position.y);
    return mt;
  },
  getRootRotateMatrix: function() {
    var mr = V_default.createSVGMatrix();
    var model = this.model;
    var angle = model.angle();
    if (angle) {
      var bbox2 = model.getBBox();
      var cx = bbox2.width / 2;
      var cy = bbox2.height / 2;
      mr = mr.translate(cx, cy).rotate(angle).translate(-cx, -cy);
    }
    return mr;
  },
  _notifyHighlight: function(eventName, el, opt = {}) {
    const {
      el: rootNode
    } = this;
    let node;
    if (typeof el === "string") {
      [node = rootNode] = this.findBySelector(el);
    } else {
      [node = rootNode] = this.$(el);
    }
    opt.partial = node !== rootNode;
    if (opt.type === void 0) {
      let type;
      switch (true) {
        case opt.embedding:
          type = HighlightingTypes.EMBEDDING;
          break;
        case opt.connecting:
          type = HighlightingTypes.CONNECTING;
          break;
        case opt.magnetAvailability:
          type = HighlightingTypes.MAGNET_AVAILABILITY;
          break;
        case opt.elementAvailability:
          type = HighlightingTypes.ELEMENT_AVAILABILITY;
          break;
        default:
          type = HighlightingTypes.DEFAULT;
          break;
      }
      opt.type = type;
    }
    this.notify(eventName, node, opt);
    return this;
  },
  highlight: function(el, opt) {
    return this._notifyHighlight("cell:highlight", el, opt);
  },
  unhighlight: function(el, opt = {}) {
    return this._notifyHighlight("cell:unhighlight", el, opt);
  },
  // Find the closest element that has the `magnet` attribute set to `true`. If there was not such
  // an element found, return the root element of the cell view.
  findMagnet: function(el) {
    const root = this.el;
    let magnet = this.$(el)[0];
    if (!magnet) {
      magnet = root;
    }
    do {
      const magnetAttribute = magnet.getAttribute("magnet");
      const isMagnetRoot = magnet === root;
      if ((magnetAttribute || isMagnetRoot) && magnetAttribute !== "false") {
        return magnet;
      }
      if (isMagnetRoot) {
        return void 0;
      }
      magnet = magnet.parentNode;
    } while (magnet);
    return void 0;
  },
  findProxyNode: function(el, type) {
    el || (el = this.el);
    const nodeSelector = el.getAttribute(`${type}-selector`);
    if (nodeSelector) {
      const [proxyNode] = this.findBySelector(nodeSelector);
      if (proxyNode) return proxyNode;
    }
    return el;
  },
  // Construct a unique selector for the `el` element within this view.
  // `prevSelector` is being collected through the recursive call.
  // No value for `prevSelector` is expected when using this method.
  getSelector: function(el, prevSelector) {
    var selector;
    if (el === this.el) {
      if (typeof prevSelector === "string") selector = "> " + prevSelector;
      return selector;
    }
    if (el) {
      var nthChild = V_default(el).index() + 1;
      selector = el.tagName + ":nth-child(" + nthChild + ")";
      if (prevSelector) {
        selector += " > " + prevSelector;
      }
      selector = this.getSelector(el.parentNode, selector);
    }
    return selector;
  },
  addLinkFromMagnet: function(magnet, x, y) {
    var paper = this.paper;
    var graph = paper.model;
    var link = paper.getDefaultLink(this, magnet);
    link.set({
      source: this.getLinkEnd(magnet, x, y, link, "source"),
      target: {
        x,
        y
      }
    }).addTo(graph, {
      async: false,
      ui: true
    });
    return link.findView(paper);
  },
  getLinkEnd: function(magnet, ...args) {
    var model = this.model;
    var id = model.id;
    var port = this.findAttribute("port", magnet);
    var selector = magnet.getAttribute("joint-selector");
    var end = {
      id
    };
    if (selector != null) end.magnet = selector;
    if (port != null) {
      end.port = port;
      if (!model.hasPort(port) && !selector) {
        end.selector = this.getSelector(magnet);
      }
    } else if (selector == null && this.el !== magnet) {
      end.selector = this.getSelector(magnet);
    }
    return this.customizeLinkEnd(end, magnet, ...args);
  },
  customizeLinkEnd: function(end, magnet, x, y, link, endType) {
    const {
      paper
    } = this;
    const {
      connectionStrategy
    } = paper.options;
    if (typeof connectionStrategy === "function") {
      var strategy = connectionStrategy.call(paper, end, this, magnet, new Point(x, y), link, endType, paper);
      if (strategy) return strategy;
    }
    return end;
  },
  getMagnetFromLinkEnd: function(end) {
    var root = this.el;
    var port = end.port;
    var selector = end.magnet;
    var model = this.model;
    var magnet;
    if (port != null && model.isElement() && model.hasPort(port)) {
      magnet = this.findPortNode(port, selector) || root;
    } else {
      if (!selector) selector = end.selector;
      if (!selector && port != null) {
        selector = '[port="' + port + '"]';
      }
      magnet = this.findBySelector(selector, root, this.selectors)[0];
    }
    return this.findProxyNode(magnet, "magnet");
  },
  dragLinkStart: function(evt, magnet, x, y) {
    this.model.startBatch("add-link");
    const linkView = this.addLinkFromMagnet(magnet, x, y);
    linkView.notifyPointerdown(evt, x, y);
    linkView.eventData(evt, linkView.startArrowheadMove("target", {
      whenNotAllowed: "remove"
    }));
    this.eventData(evt, {
      linkView
    });
  },
  dragLink: function(evt, x, y) {
    var data = this.eventData(evt);
    var linkView = data.linkView;
    if (linkView) {
      linkView.pointermove(evt, x, y);
    } else {
      var paper = this.paper;
      var magnetThreshold = paper.options.magnetThreshold;
      var currentTarget = this.getEventTarget(evt);
      var targetMagnet = data.targetMagnet;
      if (magnetThreshold === "onleave") {
        if (targetMagnet === currentTarget || V_default(targetMagnet).contains(currentTarget)) return;
      } else {
        if (paper.eventData(evt).mousemoved <= magnetThreshold) return;
      }
      this.dragLinkStart(evt, targetMagnet, x, y);
    }
  },
  dragLinkEnd: function(evt, x, y) {
    var data = this.eventData(evt);
    var linkView = data.linkView;
    if (!linkView) return;
    linkView.pointerup(evt, x, y);
    this.model.stopBatch("add-link");
  },
  getAttributeDefinition: function(attrName) {
    return this.model.constructor.getAttributeDefinition(attrName);
  },
  setNodeAttributes: function(node, attrs) {
    if (!isEmpty(attrs)) {
      if (node instanceof SVGElement) {
        V_default(node).attr(attrs);
      } else {
        (0, import_jquery4.default)(node).attr(attrs);
      }
    }
  },
  processNodeAttributes: function(node, attrs) {
    var attrName, attrVal, def, i, n;
    var normalAttrs, setAttrs, positionAttrs, offsetAttrs;
    var relatives = [];
    for (attrName in attrs) {
      if (!attrs.hasOwnProperty(attrName)) continue;
      attrVal = attrs[attrName];
      def = this.getAttributeDefinition(attrName);
      if (def && (!isFunction(def.qualify) || def.qualify.call(this, attrVal, node, attrs, this))) {
        if (isString(def.set)) {
          normalAttrs || (normalAttrs = {});
          normalAttrs[def.set] = attrVal;
        }
        if (attrVal !== null) {
          relatives.push(attrName, def);
        }
      } else {
        normalAttrs || (normalAttrs = {});
        normalAttrs[toKebabCase(attrName)] = attrVal;
      }
    }
    for (i = 0, n = relatives.length; i < n; i += 2) {
      attrName = relatives[i];
      def = relatives[i + 1];
      attrVal = attrs[attrName];
      if (isFunction(def.set)) {
        setAttrs || (setAttrs = {});
        setAttrs[attrName] = attrVal;
      }
      if (isFunction(def.position)) {
        positionAttrs || (positionAttrs = {});
        positionAttrs[attrName] = attrVal;
      }
      if (isFunction(def.offset)) {
        offsetAttrs || (offsetAttrs = {});
        offsetAttrs[attrName] = attrVal;
      }
    }
    return {
      raw: attrs,
      normal: normalAttrs,
      set: setAttrs,
      position: positionAttrs,
      offset: offsetAttrs
    };
  },
  updateRelativeAttributes: function(node, attrs, refBBox, opt) {
    opt || (opt = {});
    var attrName, attrVal, def;
    var rawAttrs = attrs.raw || {};
    var nodeAttrs = attrs.normal || {};
    var setAttrs = attrs.set;
    var positionAttrs = attrs.position;
    var offsetAttrs = attrs.offset;
    for (attrName in setAttrs) {
      attrVal = setAttrs[attrName];
      def = this.getAttributeDefinition(attrName);
      var setResult = def.set.call(this, attrVal, refBBox.clone(), node, rawAttrs, this);
      if (isObject(setResult)) {
        assign(nodeAttrs, setResult);
      } else if (setResult !== void 0) {
        nodeAttrs[attrName] = setResult;
      }
    }
    if (node instanceof HTMLElement) {
      this.setNodeAttributes(node, nodeAttrs);
      return;
    }
    var nodeTransform = nodeAttrs.transform;
    var nodeMatrix = V_default.transformStringToMatrix(nodeTransform);
    var nodePosition = Point(nodeMatrix.e, nodeMatrix.f);
    if (nodeTransform) {
      nodeAttrs = omit(nodeAttrs, "transform");
      nodeMatrix.e = nodeMatrix.f = 0;
    }
    var sx, sy, translation;
    if (positionAttrs || offsetAttrs) {
      var nodeScale = this.getNodeScale(node, opt.scalableNode);
      sx = nodeScale.sx;
      sy = nodeScale.sy;
    }
    var positioned = false;
    for (attrName in positionAttrs) {
      attrVal = positionAttrs[attrName];
      def = this.getAttributeDefinition(attrName);
      translation = def.position.call(this, attrVal, refBBox.clone(), node, rawAttrs, this);
      if (translation) {
        nodePosition.offset(Point(translation).scale(sx, sy));
        positioned || (positioned = true);
      }
    }
    this.setNodeAttributes(node, nodeAttrs);
    var offseted = false;
    if (offsetAttrs) {
      var nodeBoundingRect = this.getNodeBoundingRect(node);
      if (nodeBoundingRect.width > 0 && nodeBoundingRect.height > 0) {
        var nodeBBox = V_default.transformRect(nodeBoundingRect, nodeMatrix).scale(1 / sx, 1 / sy);
        for (attrName in offsetAttrs) {
          attrVal = offsetAttrs[attrName];
          def = this.getAttributeDefinition(attrName);
          translation = def.offset.call(this, attrVal, nodeBBox, node, rawAttrs, this);
          if (translation) {
            nodePosition.offset(Point(translation).scale(sx, sy));
            offseted || (offseted = true);
          }
        }
      }
    }
    if (nodeTransform !== void 0 || positioned || offseted) {
      nodePosition.round(1);
      nodeMatrix.e = nodePosition.x;
      nodeMatrix.f = nodePosition.y;
      node.setAttribute("transform", V_default.matrixToTransformString(nodeMatrix));
    }
  },
  getNodeScale: function(node, scalableNode) {
    var sx, sy;
    if (scalableNode && scalableNode.contains(node)) {
      var scale2 = scalableNode.scale();
      sx = 1 / scale2.sx;
      sy = 1 / scale2.sy;
    } else {
      sx = 1;
      sy = 1;
    }
    return {
      sx,
      sy
    };
  },
  cleanNodesCache: function() {
    this.metrics = {};
  },
  nodeCache: function(magnet) {
    var metrics = this.metrics;
    if (!metrics) return {};
    var id = V_default.ensureId(magnet);
    var value = metrics[id];
    if (!value) value = metrics[id] = {};
    return value;
  },
  getNodeData: function(magnet) {
    var metrics = this.nodeCache(magnet);
    if (!metrics.data) metrics.data = {};
    return metrics.data;
  },
  getNodeBoundingRect: function(magnet) {
    var metrics = this.nodeCache(magnet);
    if (metrics.boundingRect === void 0) metrics.boundingRect = V_default(magnet).getBBox();
    return new Rect(metrics.boundingRect);
  },
  getNodeMatrix: function(magnet) {
    const metrics = this.nodeCache(magnet);
    if (metrics.magnetMatrix === void 0) {
      const {
        rotatableNode,
        el
      } = this;
      let target;
      if (rotatableNode && rotatableNode.contains(magnet)) {
        target = rotatableNode;
      } else {
        target = el;
      }
      metrics.magnetMatrix = V_default(magnet).getTransformToElement(target);
    }
    return V_default.createSVGMatrix(metrics.magnetMatrix);
  },
  getNodeShape: function(magnet) {
    var metrics = this.nodeCache(magnet);
    if (metrics.geometryShape === void 0) metrics.geometryShape = V_default(magnet).toGeometryShape();
    return metrics.geometryShape.clone();
  },
  isNodeConnection: function(node) {
    return this.model.isLink() && (!node || node === this.el);
  },
  findNodesAttributes: function(attrs, root, selectorCache, selectors) {
    var i, n, nodeAttrs, nodeId;
    var nodesAttrs = {};
    var mergeIds = [];
    for (var selector in attrs) {
      if (!attrs.hasOwnProperty(selector)) continue;
      nodeAttrs = attrs[selector];
      if (!isPlainObject(nodeAttrs)) continue;
      var selected = selectorCache[selector] = this.findBySelector(selector, root, selectors);
      for (i = 0, n = selected.length; i < n; i++) {
        var node = selected[i];
        nodeId = V_default.ensureId(node);
        var unique = selectors && selectors[selector] === node;
        var prevNodeAttrs = nodesAttrs[nodeId];
        if (prevNodeAttrs) {
          if (!prevNodeAttrs.array) {
            mergeIds.push(nodeId);
            prevNodeAttrs.array = true;
            prevNodeAttrs.attributes = [prevNodeAttrs.attributes];
            prevNodeAttrs.selectedLength = [prevNodeAttrs.selectedLength];
          }
          var attributes2 = prevNodeAttrs.attributes;
          var selectedLength = prevNodeAttrs.selectedLength;
          if (unique) {
            attributes2.unshift(nodeAttrs);
            selectedLength.unshift(-1);
          } else {
            var sortIndex = sortedIndex(selectedLength, n);
            attributes2.splice(sortIndex, 0, nodeAttrs);
            selectedLength.splice(sortIndex, 0, n);
          }
        } else {
          nodesAttrs[nodeId] = {
            attributes: nodeAttrs,
            selectedLength: unique ? -1 : n,
            node,
            array: false
          };
        }
      }
    }
    for (i = 0, n = mergeIds.length; i < n; i++) {
      nodeId = mergeIds[i];
      nodeAttrs = nodesAttrs[nodeId];
      nodeAttrs.attributes = merge({}, ...nodeAttrs.attributes.reverse());
    }
    return nodesAttrs;
  },
  getEventTarget: function(evt, opt = {}) {
    const {
      target,
      type,
      clientX = 0,
      clientY = 0
    } = evt;
    if (
      // Explicitly defined `fromPoint` option
      opt.fromPoint || // Touchmove/Touchend event's target is not reflecting the element under the coordinates as mousemove does.
      // It holds the element when a touchstart triggered.
      type === "touchmove" || type === "touchend" || // Pointermove/Pointerup event with the pointer captured
      "pointerId" in evt && target.hasPointerCapture(evt.pointerId)
    ) {
      return document.elementFromPoint(clientX, clientY);
    }
    return target;
  },
  // Default is to process the `model.attributes.attrs` object and set attributes on subelements based on the selectors,
  // unless `attrs` parameter was passed.
  updateDOMSubtreeAttributes: function(rootNode, attrs, opt) {
    opt || (opt = {});
    opt.rootBBox || (opt.rootBBox = Rect());
    opt.selectors || (opt.selectors = this.selectors);
    var selectorCache = {};
    var bboxCache = {};
    var relativeItems = [];
    var relativeRefItems = [];
    var item, node, nodeAttrs, nodeData, processedAttrs;
    var roAttrs = opt.roAttributes;
    var nodesAttrs = this.findNodesAttributes(roAttrs || attrs, rootNode, selectorCache, opt.selectors);
    var nodesAllAttrs = roAttrs ? this.findNodesAttributes(attrs, rootNode, selectorCache, opt.selectors) : nodesAttrs;
    for (var nodeId in nodesAttrs) {
      nodeData = nodesAttrs[nodeId];
      nodeAttrs = nodeData.attributes;
      node = nodeData.node;
      processedAttrs = this.processNodeAttributes(node, nodeAttrs);
      if (!processedAttrs.set && !processedAttrs.position && !processedAttrs.offset) {
        this.setNodeAttributes(node, processedAttrs.normal);
      } else {
        var nodeAllAttrs = nodesAllAttrs[nodeId] && nodesAllAttrs[nodeId].attributes;
        var refSelector = nodeAllAttrs && nodeAttrs.ref === void 0 ? nodeAllAttrs.ref : nodeAttrs.ref;
        var refNode;
        if (refSelector) {
          refNode = (selectorCache[refSelector] || this.findBySelector(refSelector, rootNode, opt.selectors))[0];
          if (!refNode) {
            throw new Error('dia.CellView: "' + refSelector + '" reference does not exist.');
          }
        } else {
          refNode = null;
        }
        item = {
          node,
          refNode,
          processedAttributes: processedAttrs,
          allAttributes: nodeAllAttrs
        };
        if (refNode) {
          var itemIndex = relativeRefItems.findIndex(function(item2) {
            return item2.refNode === node;
          });
          if (itemIndex > -1) {
            relativeRefItems.splice(itemIndex, 0, item);
          } else {
            relativeRefItems.push(item);
          }
        } else {
          relativeItems.push(item);
        }
      }
    }
    relativeItems.push(...relativeRefItems);
    for (let i = 0, n = relativeItems.length; i < n; i++) {
      item = relativeItems[i];
      node = item.node;
      refNode = item.refNode;
      const refNodeId = refNode ? V_default.ensureId(refNode) : "";
      let refBBox = bboxCache[refNodeId];
      if (!refBBox) {
        refBBox = bboxCache[refNodeId] = refNode ? V_default(refNode).getBBox({
          target: getCommonAncestorNode(node, refNode)
        }) : opt.rootBBox;
      }
      if (roAttrs) {
        processedAttrs = this.processNodeAttributes(node, item.allAttributes);
        this.mergeProcessedAttributes(processedAttrs, item.processedAttributes);
      } else {
        processedAttrs = item.processedAttributes;
      }
      this.updateRelativeAttributes(node, processedAttrs, refBBox, opt);
    }
  },
  mergeProcessedAttributes: function(processedAttrs, roProcessedAttrs) {
    processedAttrs.set || (processedAttrs.set = {});
    processedAttrs.position || (processedAttrs.position = {});
    processedAttrs.offset || (processedAttrs.offset = {});
    assign(processedAttrs.set, roProcessedAttrs.set);
    assign(processedAttrs.position, roProcessedAttrs.position);
    assign(processedAttrs.offset, roProcessedAttrs.offset);
    var transform = processedAttrs.normal && processedAttrs.normal.transform;
    if (transform !== void 0 && roProcessedAttrs.normal) {
      roProcessedAttrs.normal.transform = transform;
    }
    processedAttrs.normal = roProcessedAttrs.normal;
  },
  // Lifecycle methods
  // Called when the view is attached to the DOM,
  // as result of `cell.addTo(graph)` being called (isInitialMount === true)
  // or `paper.options.viewport` returning `true` (isInitialMount === false).
  onMount(isInitialMount) {
    if (isInitialMount) return;
    this.mountTools();
    HighlighterView.mount(this);
  },
  // Called when the view is detached from the DOM,
  // as result of `paper.options.viewport` returning `false`.
  onDetach() {
    this.unmountTools();
    HighlighterView.unmount(this);
  },
  // Called when the view is removed from the DOM
  // as result of `cell.remove()`.
  onRemove: function() {
    this.removeTools();
    this.removeHighlighters();
  },
  _toolsView: null,
  hasTools: function(name) {
    var toolsView = this._toolsView;
    if (!toolsView) return false;
    if (!name) return true;
    return toolsView.getName() === name;
  },
  addTools: function(toolsView) {
    this.removeTools();
    if (toolsView) {
      this._toolsView = toolsView;
      toolsView.configure({
        relatedView: this
      });
      toolsView.listenTo(this.paper, "tools:event", this.onToolEvent.bind(this));
    }
    return this;
  },
  unmountTools() {
    const toolsView = this._toolsView;
    if (toolsView) toolsView.unmount();
    return this;
  },
  mountTools() {
    const toolsView = this._toolsView;
    if (toolsView && !toolsView.isMounted()) toolsView.mount();
    return this;
  },
  updateTools: function(opt) {
    var toolsView = this._toolsView;
    if (toolsView) toolsView.update(opt);
    return this;
  },
  removeTools: function() {
    var toolsView = this._toolsView;
    if (toolsView) {
      toolsView.remove();
      this._toolsView = null;
    }
    return this;
  },
  hideTools: function() {
    var toolsView = this._toolsView;
    if (toolsView) toolsView.hide();
    return this;
  },
  showTools: function() {
    var toolsView = this._toolsView;
    if (toolsView) toolsView.show();
    return this;
  },
  onToolEvent: function(event) {
    switch (event) {
      case "remove":
        this.removeTools();
        break;
      case "hide":
        this.hideTools();
        break;
      case "show":
        this.showTools();
        break;
    }
  },
  removeHighlighters: function() {
    HighlighterView.remove(this);
  },
  updateHighlighters: function(dirty = false) {
    HighlighterView.update(this, null, dirty);
  },
  transformHighlighters: function() {
    HighlighterView.transform(this);
  },
  // Interaction. The controller part.
  // ---------------------------------
  preventDefaultInteraction(evt) {
    this.eventData(evt, {
      defaultInteractionPrevented: true
    });
  },
  isDefaultInteractionPrevented(evt) {
    const {
      defaultInteractionPrevented = false
    } = this.eventData(evt);
    return defaultInteractionPrevented;
  },
  // Interaction is handled by the paper and delegated to the view in interest.
  // `x` & `y` parameters passed to these functions represent the coordinates already snapped to the paper grid.
  // If necessary, real coordinates can be obtained from the `evt` event object.
  // These functions are supposed to be overridden by the views that inherit from `joint.dia.Cell`,
  // i.e. `joint.dia.Element` and `joint.dia.Link`.
  pointerdblclick: function(evt, x, y) {
    this.notify("cell:pointerdblclick", evt, x, y);
  },
  pointerclick: function(evt, x, y) {
    this.notify("cell:pointerclick", evt, x, y);
  },
  contextmenu: function(evt, x, y) {
    this.notify("cell:contextmenu", evt, x, y);
  },
  pointerdown: function(evt, x, y) {
    const {
      model
    } = this;
    const {
      graph
    } = model;
    if (graph) {
      model.startBatch("pointer");
      this.eventData(evt, {
        graph
      });
    }
    this.notify("cell:pointerdown", evt, x, y);
  },
  pointermove: function(evt, x, y) {
    this.notify("cell:pointermove", evt, x, y);
  },
  pointerup: function(evt, x, y) {
    const {
      graph
    } = this.eventData(evt);
    this.notify("cell:pointerup", evt, x, y);
    if (graph) {
      graph.stopBatch("pointer", {
        cell: this.model
      });
    }
  },
  mouseover: function(evt) {
    this.notify("cell:mouseover", evt);
  },
  mouseout: function(evt) {
    this.notify("cell:mouseout", evt);
  },
  mouseenter: function(evt) {
    this.notify("cell:mouseenter", evt);
  },
  mouseleave: function(evt) {
    this.notify("cell:mouseleave", evt);
  },
  mousewheel: function(evt, x, y, delta) {
    this.notify("cell:mousewheel", evt, x, y, delta);
  },
  onevent: function(evt, eventName, x, y) {
    this.notify(eventName, evt, x, y);
  },
  onmagnet: function() {
  },
  magnetpointerdblclick: function() {
  },
  magnetcontextmenu: function() {
  },
  checkMouseleave(evt) {
    const {
      paper,
      model
    } = this;
    if (paper.isAsync()) {
      if (model.isLink()) {
        const sourceElement = model.getSourceElement();
        if (sourceElement) {
          const sourceView = paper.findViewByModel(sourceElement);
          if (sourceView) {
            paper.dumpView(sourceView);
            paper.checkViewVisibility(sourceView);
          }
        }
        const targetElement = model.getTargetElement();
        if (targetElement) {
          const targetView = paper.findViewByModel(targetElement);
          if (targetView) {
            paper.dumpView(targetView);
            paper.checkViewVisibility(targetView);
          }
        }
      }
      paper.dumpView(this);
      paper.checkViewVisibility(this);
    }
    const target = this.getEventTarget(evt, {
      fromPoint: true
    });
    const view = paper.findView(target);
    if (view === this) return;
    this.mouseleave(evt);
    if (!view) return;
    view.mouseenter(evt);
  },
  setInteractivity: function(value) {
    this.options.interactive = value;
  }
}, {
  Flags,
  Highlighting: HighlightingTypes,
  addPresentationAttributes: function(presentationAttributes) {
    return merge({}, result(this.prototype, "presentationAttributes"), presentationAttributes, function(a, b) {
      if (!a || !b) return;
      if (typeof a === "string") a = [a];
      if (typeof b === "string") b = [b];
      if (Array.isArray(a) && Array.isArray(b)) return uniq(a.concat(b));
    });
  }
});
function getCommonAncestorNode(node1, node2) {
  let parent2 = node1;
  do {
    if (parent2.contains(node2)) return parent2;
    parent2 = parent2.parentNode;
  } while (parent2);
  return null;
}

// node_modules/jointjs/src/dia/ElementView.mjs
var Flags2 = {
  TOOLS: CellView.Flags.TOOLS,
  UPDATE: "UPDATE",
  TRANSLATE: "TRANSLATE",
  RESIZE: "RESIZE",
  PORTS: "PORTS",
  ROTATE: "ROTATE",
  RENDER: "RENDER"
};
var DragActions = {
  MOVE: "move",
  MAGNET: "magnet"
};
var ElementView = CellView.extend({
  /**
   * @abstract
   */
  _removePorts: function() {
  },
  /**
   *
   * @abstract
   */
  _renderPorts: function() {
  },
  className: function() {
    var classNames = CellView.prototype.className.apply(this).split(" ");
    classNames.push("element");
    return classNames.join(" ");
  },
  initialize: function() {
    CellView.prototype.initialize.apply(this, arguments);
    this._initializePorts();
  },
  presentationAttributes: {
    "attrs": [Flags2.UPDATE],
    "position": [Flags2.TRANSLATE, Flags2.TOOLS],
    "size": [Flags2.RESIZE, Flags2.PORTS, Flags2.TOOLS],
    "angle": [Flags2.ROTATE, Flags2.TOOLS],
    "markup": [Flags2.RENDER],
    "ports": [Flags2.PORTS]
  },
  initFlag: [Flags2.RENDER],
  UPDATE_PRIORITY: 0,
  confirmUpdate: function(flag, opt) {
    const {
      useCSSSelectors
    } = config;
    if (this.hasFlag(flag, Flags2.PORTS)) {
      this._removePorts();
      this._cleanPortsCache();
    }
    let transformHighlighters = false;
    if (this.hasFlag(flag, Flags2.RENDER)) {
      this.render();
      this.updateTools(opt);
      this.updateHighlighters(true);
      transformHighlighters = true;
      flag = this.removeFlag(flag, [Flags2.RENDER, Flags2.UPDATE, Flags2.RESIZE, Flags2.TRANSLATE, Flags2.ROTATE, Flags2.PORTS, Flags2.TOOLS]);
    } else {
      let updateHighlighters = false;
      if (this.hasFlag(flag, Flags2.RESIZE)) {
        this.resize(opt);
        updateHighlighters = true;
        flag = this.removeFlag(flag, [Flags2.RESIZE, Flags2.UPDATE]);
        if (useCSSSelectors) {
          flag = this.removeFlag(flag, Flags2.PORTS);
        }
      }
      if (this.hasFlag(flag, Flags2.UPDATE)) {
        this.update(this.model, null, opt);
        flag = this.removeFlag(flag, Flags2.UPDATE);
        updateHighlighters = true;
        if (useCSSSelectors) {
          flag = this.removeFlag(flag, Flags2.PORTS);
        }
      }
      if (this.hasFlag(flag, Flags2.TRANSLATE)) {
        this.translate();
        flag = this.removeFlag(flag, Flags2.TRANSLATE);
        transformHighlighters = true;
      }
      if (this.hasFlag(flag, Flags2.ROTATE)) {
        this.rotate();
        flag = this.removeFlag(flag, Flags2.ROTATE);
        transformHighlighters = true;
      }
      if (this.hasFlag(flag, Flags2.PORTS)) {
        this._renderPorts();
        updateHighlighters = true;
        flag = this.removeFlag(flag, Flags2.PORTS);
      }
      if (updateHighlighters) {
        this.updateHighlighters(false);
      }
    }
    if (transformHighlighters) {
      this.transformHighlighters();
    }
    if (this.hasFlag(flag, Flags2.TOOLS)) {
      this.updateTools(opt);
      flag = this.removeFlag(flag, Flags2.TOOLS);
    }
    return flag;
  },
  /**
   * @abstract
   */
  _initializePorts: function() {
  },
  update: function(_, renderingOnlyAttrs) {
    this.cleanNodesCache();
    const {
      useCSSSelectors
    } = config;
    if (useCSSSelectors) this._removePorts();
    var model = this.model;
    var modelAttrs = model.attr();
    this.updateDOMSubtreeAttributes(this.el, modelAttrs, {
      rootBBox: new Rect(model.size()),
      selectors: this.selectors,
      scalableNode: this.scalableNode,
      rotatableNode: this.rotatableNode,
      // Use rendering only attributes if they differs from the model attributes
      roAttributes: renderingOnlyAttrs === modelAttrs ? null : renderingOnlyAttrs
    });
    if (useCSSSelectors) {
      this._renderPorts();
    }
  },
  rotatableSelector: "rotatable",
  scalableSelector: "scalable",
  scalableNode: null,
  rotatableNode: null,
  // `prototype.markup` is rendered by default. Set the `markup` attribute on the model if the
  // default markup is not desirable.
  renderMarkup: function() {
    var element = this.model;
    var markup = element.get("markup") || element.markup;
    if (!markup) throw new Error("dia.ElementView: markup required");
    if (Array.isArray(markup)) return this.renderJSONMarkup(markup);
    if (typeof markup === "string") return this.renderStringMarkup(markup);
    throw new Error("dia.ElementView: invalid markup");
  },
  renderJSONMarkup: function(markup) {
    var doc = this.parseDOMJSON(markup, this.el);
    var selectors = this.selectors = doc.selectors;
    this.rotatableNode = V_default(selectors[this.rotatableSelector]) || null;
    this.scalableNode = V_default(selectors[this.scalableSelector]) || null;
    this.vel.append(doc.fragment);
  },
  renderStringMarkup: function(markup) {
    var vel = this.vel;
    vel.append(V_default(markup));
    this.rotatableNode = vel.findOne(".rotatable");
    this.scalableNode = vel.findOne(".scalable");
    var selectors = this.selectors = {};
    selectors[this.selector] = this.el;
  },
  render: function() {
    this.vel.empty();
    this.renderMarkup();
    if (this.scalableNode) {
      this.update();
    }
    this.resize();
    if (this.rotatableNode) {
      this.rotate();
      this.translate();
    } else {
      this.updateTransformation();
    }
    if (!config.useCSSSelectors) this._renderPorts();
    return this;
  },
  resize: function(opt) {
    if (this.scalableNode) return this.sgResize(opt);
    if (this.model.attributes.angle) this.rotate();
    this.update();
  },
  translate: function() {
    if (this.rotatableNode) return this.rgTranslate();
    this.updateTransformation();
  },
  rotate: function() {
    if (this.rotatableNode) {
      this.rgRotate();
      this.update();
      return;
    }
    this.updateTransformation();
  },
  updateTransformation: function() {
    var transformation = this.getTranslateString();
    var rotateString = this.getRotateString();
    if (rotateString) transformation += " " + rotateString;
    this.vel.attr("transform", transformation);
  },
  getTranslateString: function() {
    var position = this.model.attributes.position;
    return "translate(" + position.x + "," + position.y + ")";
  },
  getRotateString: function() {
    var attributes2 = this.model.attributes;
    var angle = attributes2.angle;
    if (!angle) return null;
    var size = attributes2.size;
    return "rotate(" + angle + "," + size.width / 2 + "," + size.height / 2 + ")";
  },
  // Rotatable & Scalable Group
  // always slower, kept mainly for backwards compatibility
  rgRotate: function() {
    this.rotatableNode.attr("transform", this.getRotateString());
  },
  rgTranslate: function() {
    this.vel.attr("transform", this.getTranslateString());
  },
  sgResize: function(opt) {
    var model = this.model;
    var angle = model.angle();
    var size = model.size();
    var scalable = this.scalableNode;
    var recursive = false;
    if (scalable.node.getElementsByTagName("path").length > 0) {
      recursive = true;
    }
    var scalableBBox = scalable.getBBox({
      recursive
    });
    var sx = size.width / (scalableBBox.width || 1);
    var sy = size.height / (scalableBBox.height || 1);
    scalable.attr("transform", "scale(" + sx + "," + sy + ")");
    var rotatable = this.rotatableNode;
    var rotation = rotatable && rotatable.attr("transform");
    if (rotation) {
      rotatable.attr("transform", rotation + " rotate(" + -angle + "," + size.width / 2 + "," + size.height / 2 + ")");
      var rotatableBBox = scalable.getBBox({
        target: this.paper.cells
      });
      model.set("position", {
        x: rotatableBBox.x,
        y: rotatableBBox.y
      }, assign({
        updateHandled: true
      }, opt));
      this.translate();
      this.rotate();
    }
    this.update();
  },
  // Embedding mode methods.
  // -----------------------
  prepareEmbedding: function(data = {}) {
    const element = data.model || this.model;
    const paper = data.paper || this.paper;
    const graph = paper.model;
    const initialZIndices = data.initialZIndices = {};
    const embeddedCells = element.getEmbeddedCells({
      deep: true
    });
    const connectedLinks = graph.getConnectedLinks(element, {
      deep: true,
      includeEnclosed: true
    });
    [element, ...embeddedCells, ...connectedLinks].forEach((cell) => initialZIndices[cell.id] = cell.attributes.z);
    element.startBatch("to-front");
    element.toFront({
      deep: true,
      ui: true
    });
    const maxZ = graph.getElements().reduce((max5, cell) => Math.max(max5, cell.attributes.z || 0), 0);
    connectedLinks.forEach((link) => {
      if (link.attributes.z <= maxZ) {
        link.set("z", maxZ + 1, {
          ui: true
        });
      }
    });
    element.stopBatch("to-front");
    const parentId = element.parent();
    if (parentId) {
      const parent2 = graph.getCell(parentId);
      parent2.unembed(element, {
        ui: true
      });
      data.initialParentId = parentId;
    } else {
      data.initialParentId = null;
    }
  },
  processEmbedding: function(data = {}, evt, x, y) {
    const model = data.model || this.model;
    const paper = data.paper || this.paper;
    const graph = paper.model;
    const {
      findParentBy,
      frontParentOnly,
      validateEmbedding
    } = paper.options;
    let candidates;
    if (isFunction(findParentBy)) {
      candidates = toArray(findParentBy.call(graph, this, evt, x, y));
    } else if (findParentBy === "pointer") {
      candidates = toArray(graph.findModelsFromPoint({
        x,
        y
      }));
    } else {
      candidates = graph.findModelsUnderElement(model, {
        searchBy: findParentBy
      });
    }
    candidates = candidates.filter((el) => {
      return el instanceof Cell && model.id !== el.id && !el.isEmbeddedIn(model);
    });
    if (frontParentOnly) {
      candidates = candidates.slice(-1);
    }
    let newCandidateView = null;
    const prevCandidateView = data.candidateEmbedView;
    for (let i = candidates.length - 1; i >= 0; i--) {
      const candidate = candidates[i];
      if (prevCandidateView && prevCandidateView.model.id == candidate.id) {
        newCandidateView = prevCandidateView;
        break;
      } else {
        const view = candidate.findView(paper);
        if (!isFunction(validateEmbedding) || validateEmbedding.call(paper, this, view)) {
          newCandidateView = view;
          break;
        }
      }
    }
    if (newCandidateView && newCandidateView != prevCandidateView) {
      this.clearEmbedding(data);
      data.candidateEmbedView = newCandidateView.highlight(newCandidateView.findProxyNode(null, "container"), {
        embedding: true
      });
    }
    if (!newCandidateView && prevCandidateView) {
      this.clearEmbedding(data);
    }
  },
  clearEmbedding: function(data) {
    data || (data = {});
    var candidateView = data.candidateEmbedView;
    if (candidateView) {
      candidateView.unhighlight(candidateView.findProxyNode(null, "container"), {
        embedding: true
      });
      data.candidateEmbedView = null;
    }
  },
  finalizeEmbedding: function(data = {}) {
    const candidateView = data.candidateEmbedView;
    const element = data.model || this.model;
    const paper = data.paper || this.paper;
    if (candidateView) {
      candidateView.model.embed(element, {
        ui: true
      });
      candidateView.unhighlight(candidateView.findProxyNode(null, "container"), {
        embedding: true
      });
      data.candidateEmbedView = null;
    } else {
      const {
        validateUnembedding
      } = paper.options;
      const {
        initialParentId
      } = data;
      if (initialParentId && typeof validateUnembedding === "function" && !validateUnembedding.call(paper, this)) {
        this._disallowUnembed(data);
        return;
      }
    }
    paper.model.getConnectedLinks(element, {
      deep: true
    }).forEach((link) => {
      link.reparent({
        ui: true
      });
    });
  },
  _disallowUnembed: function(data) {
    const {
      model,
      whenNotAllowed = "revert"
    } = data;
    const element = model || this.model;
    const paper = data.paper || this.paper;
    const graph = paper.model;
    switch (whenNotAllowed) {
      case "remove": {
        element.remove({
          ui: true
        });
        break;
      }
      case "revert": {
        const {
          initialParentId,
          initialPosition,
          initialZIndices
        } = data;
        if (initialPosition) {
          const {
            x,
            y
          } = initialPosition;
          element.position(x, y, {
            deep: true,
            ui: true
          });
        }
        if (initialZIndices) {
          Object.keys(initialZIndices).forEach((id) => {
            const cell = graph.getCell(id);
            if (cell) {
              cell.set("z", initialZIndices[id], {
                ui: true
              });
            }
          });
        }
        const parent2 = graph.getCell(initialParentId);
        if (parent2) {
          parent2.embed(element, {
            ui: true
          });
        }
        break;
      }
    }
  },
  getDelegatedView: function() {
    var view = this;
    var model = view.model;
    var paper = view.paper;
    while (view) {
      if (model.isLink()) break;
      if (!model.isEmbedded() || view.can("stopDelegation")) return view;
      model = model.getParentCell();
      view = paper.findViewByModel(model);
    }
    return null;
  },
  findProxyNode: function(el, type) {
    el || (el = this.el);
    const nodeSelector = el.getAttribute(`${type}-selector`);
    if (nodeSelector) {
      const port = this.findAttribute("port", el);
      if (port) {
        const proxyPortNode = this.findPortNode(port, nodeSelector);
        if (proxyPortNode) return proxyPortNode;
      } else {
        const [proxyNode] = this.findBySelector(nodeSelector);
        if (proxyNode) return proxyNode;
      }
    }
    return el;
  },
  // Interaction. The controller part.
  // ---------------------------------
  notifyPointerdown(evt, x, y) {
    CellView.prototype.pointerdown.call(this, evt, x, y);
    this.notify("element:pointerdown", evt, x, y);
  },
  notifyPointermove(evt, x, y) {
    CellView.prototype.pointermove.call(this, evt, x, y);
    this.notify("element:pointermove", evt, x, y);
  },
  notifyPointerup(evt, x, y) {
    this.notify("element:pointerup", evt, x, y);
    CellView.prototype.pointerup.call(this, evt, x, y);
  },
  pointerdblclick: function(evt, x, y) {
    CellView.prototype.pointerdblclick.apply(this, arguments);
    this.notify("element:pointerdblclick", evt, x, y);
  },
  pointerclick: function(evt, x, y) {
    CellView.prototype.pointerclick.apply(this, arguments);
    this.notify("element:pointerclick", evt, x, y);
  },
  contextmenu: function(evt, x, y) {
    CellView.prototype.contextmenu.apply(this, arguments);
    this.notify("element:contextmenu", evt, x, y);
  },
  pointerdown: function(evt, x, y) {
    this.notifyPointerdown(evt, x, y);
    this.dragStart(evt, x, y);
  },
  pointermove: function(evt, x, y) {
    const data = this.eventData(evt);
    const {
      targetMagnet,
      action,
      delegatedView
    } = data;
    if (targetMagnet) {
      this.magnetpointermove(evt, targetMagnet, x, y);
    }
    switch (action) {
      case DragActions.MAGNET:
        this.dragMagnet(evt, x, y);
        break;
      case DragActions.MOVE:
        (delegatedView || this).drag(evt, x, y);
      // eslint: no-fallthrough=false
      default:
        if (data.preventPointerEvents) break;
        this.notifyPointermove(evt, x, y);
        break;
    }
    this.eventData(evt, data);
  },
  pointerup: function(evt, x, y) {
    const data = this.eventData(evt);
    const {
      targetMagnet,
      action,
      delegatedView
    } = data;
    if (targetMagnet) {
      this.magnetpointerup(evt, targetMagnet, x, y);
    }
    switch (action) {
      case DragActions.MAGNET:
        this.dragMagnetEnd(evt, x, y);
        break;
      case DragActions.MOVE:
        (delegatedView || this).dragEnd(evt, x, y);
      // eslint: no-fallthrough=false
      default:
        if (data.preventPointerEvents) break;
        this.notifyPointerup(evt, x, y);
    }
    if (targetMagnet) {
      this.magnetpointerclick(evt, targetMagnet, x, y);
    }
    this.checkMouseleave(evt);
  },
  mouseover: function(evt) {
    CellView.prototype.mouseover.apply(this, arguments);
    this.notify("element:mouseover", evt);
  },
  mouseout: function(evt) {
    CellView.prototype.mouseout.apply(this, arguments);
    this.notify("element:mouseout", evt);
  },
  mouseenter: function(evt) {
    CellView.prototype.mouseenter.apply(this, arguments);
    this.notify("element:mouseenter", evt);
  },
  mouseleave: function(evt) {
    CellView.prototype.mouseleave.apply(this, arguments);
    this.notify("element:mouseleave", evt);
  },
  mousewheel: function(evt, x, y, delta) {
    CellView.prototype.mousewheel.apply(this, arguments);
    this.notify("element:mousewheel", evt, x, y, delta);
  },
  onmagnet: function(evt, x, y) {
    const {
      currentTarget: targetMagnet
    } = evt;
    this.magnetpointerdown(evt, targetMagnet, x, y);
    this.eventData(evt, {
      targetMagnet
    });
    this.dragMagnetStart(evt, x, y);
  },
  magnetpointerdown: function(evt, magnet, x, y) {
    this.notify("element:magnet:pointerdown", evt, magnet, x, y);
  },
  magnetpointermove: function(evt, magnet, x, y) {
    this.notify("element:magnet:pointermove", evt, magnet, x, y);
  },
  magnetpointerup: function(evt, magnet, x, y) {
    this.notify("element:magnet:pointerup", evt, magnet, x, y);
  },
  magnetpointerdblclick: function(evt, magnet, x, y) {
    this.notify("element:magnet:pointerdblclick", evt, magnet, x, y);
  },
  magnetcontextmenu: function(evt, magnet, x, y) {
    this.notify("element:magnet:contextmenu", evt, magnet, x, y);
  },
  // Drag Start Handlers
  dragStart: function(evt, x, y) {
    if (this.isDefaultInteractionPrevented(evt)) return;
    var view = this.getDelegatedView();
    if (!view || !view.can("elementMove")) return;
    this.eventData(evt, {
      action: DragActions.MOVE,
      delegatedView: view
    });
    const position = view.model.position();
    view.eventData(evt, {
      initialPosition: position,
      pointerOffset: position.difference(x, y),
      restrictedArea: this.paper.getRestrictedArea(view, x, y)
    });
  },
  dragMagnetStart: function(evt, x, y) {
    const {
      paper
    } = this;
    const isPropagationAlreadyStopped = evt.isPropagationStopped();
    if (isPropagationAlreadyStopped) {
      this.eventData(evt, {
        preventPointerEvents: true
      });
    }
    if (this.isDefaultInteractionPrevented(evt) || !this.can("addLinkFromMagnet")) {
      return;
    }
    const {
      targetMagnet = evt.currentTarget
    } = this.eventData(evt);
    evt.stopPropagation();
    if (!paper.options.validateMagnet.call(paper, this, targetMagnet, evt)) {
      if (isPropagationAlreadyStopped) {
        this.dragStart(evt, x, y);
      } else {
        this.pointerdown(evt, x, y);
      }
      return;
    }
    if (paper.options.magnetThreshold <= 0) {
      this.dragLinkStart(evt, targetMagnet, x, y);
    }
    this.eventData(evt, {
      action: DragActions.MAGNET
    });
  },
  // Drag Handlers
  drag: function(evt, x, y) {
    var paper = this.paper;
    var grid = paper.options.gridSize;
    var element = this.model;
    var data = this.eventData(evt);
    var {
      pointerOffset,
      restrictedArea,
      embedding
    } = data;
    var elX = snapToGrid(x + pointerOffset.x, grid);
    var elY = snapToGrid(y + pointerOffset.y, grid);
    element.position(elX, elY, {
      restrictedArea,
      deep: true,
      ui: true
    });
    if (paper.options.embeddingMode) {
      if (!embedding) {
        this.prepareEmbedding(data);
        embedding = true;
      }
      this.processEmbedding(data, evt, x, y);
    }
    this.eventData(evt, {
      embedding
    });
  },
  dragMagnet: function(evt, x, y) {
    this.dragLink(evt, x, y);
  },
  // Drag End Handlers
  dragEnd: function(evt, x, y) {
    var data = this.eventData(evt);
    if (data.embedding) this.finalizeEmbedding(data);
  },
  dragMagnetEnd: function(evt, x, y) {
    this.dragLinkEnd(evt, x, y);
  },
  magnetpointerclick: function(evt, magnet, x, y) {
    var paper = this.paper;
    if (paper.eventData(evt).mousemoved > paper.options.clickThreshold) return;
    this.notify("element:magnet:pointerclick", evt, magnet, x, y);
  }
}, {
  Flags: Flags2
});
assign(ElementView.prototype, elementViewPortPrototype);

// node_modules/jointjs/src/routers/index.mjs
var routers_exports = {};
__export(routers_exports, {
  manhattan: () => manhattan,
  metro: () => metro,
  normal: () => normal,
  oneSide: () => oneSide,
  orthogonal: () => orthogonal,
  rightAngle: () => rightAngle
});

// node_modules/jointjs/src/routers/normal.mjs
var normal = function(vertices, opt, linkView) {
  return vertices;
};

// node_modules/jointjs/src/routers/oneSide.mjs
var oneSide = function(vertices, opt, linkView) {
  var side = opt.side || "bottom";
  var padding = normalizeSides(opt.padding || 40);
  var sourceBBox = linkView.sourceBBox;
  var targetBBox = linkView.targetBBox;
  var sourcePoint = sourceBBox.center();
  var targetPoint = targetBBox.center();
  var coordinate, dimension, direction;
  switch (side) {
    case "bottom":
      direction = 1;
      coordinate = "y";
      dimension = "height";
      break;
    case "top":
      direction = -1;
      coordinate = "y";
      dimension = "height";
      break;
    case "left":
      direction = -1;
      coordinate = "x";
      dimension = "width";
      break;
    case "right":
      direction = 1;
      coordinate = "x";
      dimension = "width";
      break;
    default:
      throw new Error("Router: invalid side");
  }
  sourcePoint[coordinate] += direction * (sourceBBox[dimension] / 2 + padding[side]);
  targetPoint[coordinate] += direction * (targetBBox[dimension] / 2 + padding[side]);
  if (direction * (sourcePoint[coordinate] - targetPoint[coordinate]) > 0) {
    targetPoint[coordinate] = sourcePoint[coordinate];
  } else {
    sourcePoint[coordinate] = targetPoint[coordinate];
  }
  return [sourcePoint].concat(vertices, targetPoint);
};

// node_modules/jointjs/src/routers/orthogonal.mjs
var opposites = {
  N: "S",
  S: "N",
  E: "W",
  W: "E"
};
var radians = {
  N: -Math.PI / 2 * 3,
  S: -Math.PI / 2,
  E: 0,
  W: Math.PI
};
function freeJoin(p1, p2, bbox2) {
  var p = new Point(p1.x, p2.y);
  if (bbox2.containsPoint(p)) p = new Point(p2.x, p1.y);
  return p;
}
function getBBoxSize(bbox2, bearing2) {
  return bbox2[bearing2 === "W" || bearing2 === "E" ? "width" : "height"];
}
function getBearing(from, to) {
  if (from.x === to.x) return from.y > to.y ? "N" : "S";
  if (from.y === to.y) return from.x > to.x ? "W" : "E";
  return null;
}
function getPointBox(p) {
  return new Rect(p.x, p.y, 0, 0);
}
function getPaddingBox(opt) {
  var sides = normalizeSides(opt.padding || opt.elementPadding || 20);
  return {
    x: -sides.left,
    y: -sides.top,
    width: sides.left + sides.right,
    height: sides.top + sides.bottom
  };
}
function getSourceBBox(linkView, opt) {
  return linkView.sourceBBox.clone().moveAndExpand(getPaddingBox(opt));
}
function getTargetBBox(linkView, opt) {
  return linkView.targetBBox.clone().moveAndExpand(getPaddingBox(opt));
}
function getSourceAnchor(linkView, opt) {
  if (linkView.sourceAnchor) return linkView.sourceAnchor;
  var sourceBBox = getSourceBBox(linkView, opt);
  return sourceBBox.center();
}
function getTargetAnchor(linkView, opt) {
  if (linkView.targetAnchor) return linkView.targetAnchor;
  var targetBBox = getTargetBBox(linkView, opt);
  return targetBBox.center();
}
function vertexVertex(from, to, bearing2) {
  var p1 = new Point(from.x, to.y);
  var p2 = new Point(to.x, from.y);
  var d1 = getBearing(from, p1);
  var d2 = getBearing(from, p2);
  var opposite = opposites[bearing2];
  var p = d1 === bearing2 || d1 !== opposite && (d2 === opposite || d2 !== bearing2) ? p1 : p2;
  return {
    points: [p],
    direction: getBearing(p, to)
  };
}
function elementVertex(from, to, fromBBox) {
  var p = freeJoin(from, to, fromBBox);
  return {
    points: [p],
    direction: getBearing(p, to)
  };
}
function vertexElement(from, to, toBBox, bearing2) {
  var route = {};
  var points = [new Point(from.x, to.y), new Point(to.x, from.y)];
  var freePoints = points.filter(function(pt) {
    return !toBBox.containsPoint(pt);
  });
  var freeBearingPoints = freePoints.filter(function(pt) {
    return getBearing(pt, from) !== bearing2;
  });
  var p;
  if (freeBearingPoints.length > 0) {
    p = freeBearingPoints.filter(function(pt) {
      return getBearing(from, pt) === bearing2;
    }).pop();
    p = p || freeBearingPoints[0];
    route.points = [p];
    route.direction = getBearing(p, to);
  } else {
    p = difference(points, freePoints)[0];
    var p2 = new Point(to).move(p, -getBBoxSize(toBBox, bearing2) / 2);
    var p1 = freeJoin(p2, from, toBBox);
    route.points = [p1, p2];
    route.direction = getBearing(p2, to);
  }
  return route;
}
function elementElement(from, to, fromBBox, toBBox) {
  var route = elementVertex(to, from, toBBox);
  var p1 = route.points[0];
  if (fromBBox.containsPoint(p1)) {
    route = elementVertex(from, to, fromBBox);
    var p2 = route.points[0];
    if (toBBox.containsPoint(p2)) {
      var fromBorder = new Point(from).move(p2, -getBBoxSize(fromBBox, getBearing(from, p2)) / 2);
      var toBorder = new Point(to).move(p1, -getBBoxSize(toBBox, getBearing(to, p1)) / 2);
      var mid = new Line(fromBorder, toBorder).midpoint();
      var startRoute = elementVertex(from, mid, fromBBox);
      var endRoute = vertexVertex(mid, to, startRoute.direction);
      route.points = [startRoute.points[0], endRoute.points[0]];
      route.direction = endRoute.direction;
    }
  }
  return route;
}
function insideElement(from, to, fromBBox, toBBox, bearing2) {
  var route = {};
  var boundary2 = fromBBox.union(toBBox).inflate(1);
  var reversed = boundary2.center().distance(to) > boundary2.center().distance(from);
  var start = reversed ? to : from;
  var end = reversed ? from : to;
  var p1, p2, p3;
  if (bearing2) {
    p1 = Point.fromPolar(boundary2.width + boundary2.height, radians[bearing2], start);
    p1 = boundary2.pointNearestToPoint(p1).move(p1, -1);
  } else {
    p1 = boundary2.pointNearestToPoint(start).move(start, 1);
  }
  p2 = freeJoin(p1, end, boundary2);
  if (p1.round().equals(p2.round())) {
    p2 = Point.fromPolar(boundary2.width + boundary2.height, toRad(p1.theta(start)) + Math.PI / 2, end);
    p2 = boundary2.pointNearestToPoint(p2).move(end, 1).round();
    p3 = freeJoin(p1, p2, boundary2);
    route.points = reversed ? [p2, p3, p1] : [p1, p3, p2];
  } else {
    route.points = reversed ? [p2, p1] : [p1, p2];
  }
  route.direction = reversed ? getBearing(p1, to) : getBearing(p2, to);
  return route;
}
function orthogonal(vertices, opt, linkView) {
  var sourceBBox = getSourceBBox(linkView, opt);
  var targetBBox = getTargetBBox(linkView, opt);
  var sourceAnchor = getSourceAnchor(linkView, opt);
  var targetAnchor = getTargetAnchor(linkView, opt);
  sourceBBox = sourceBBox.union(getPointBox(sourceAnchor));
  targetBBox = targetBBox.union(getPointBox(targetAnchor));
  vertices = toArray(vertices).map(Point);
  vertices.unshift(sourceAnchor);
  vertices.push(targetAnchor);
  var bearing2;
  var orthogonalVertices = [];
  for (var i = 0, max5 = vertices.length - 1; i < max5; i++) {
    var route = null;
    var from = vertices[i];
    var to = vertices[i + 1];
    var isOrthogonal = !!getBearing(from, to);
    if (i === 0) {
      if (i + 1 === max5) {
        if (sourceBBox.intersect(targetBBox.clone().inflate(1))) {
          route = insideElement(from, to, sourceBBox, targetBBox);
        } else if (!isOrthogonal) {
          route = elementElement(from, to, sourceBBox, targetBBox);
        }
      } else {
        if (sourceBBox.containsPoint(to)) {
          route = insideElement(from, to, sourceBBox, getPointBox(to).moveAndExpand(getPaddingBox(opt)));
        } else if (!isOrthogonal) {
          route = elementVertex(from, to, sourceBBox);
        }
      }
    } else if (i + 1 === max5) {
      var isOrthogonalLoop = isOrthogonal && getBearing(to, from) === bearing2;
      if (targetBBox.containsPoint(from) || isOrthogonalLoop) {
        route = insideElement(from, to, getPointBox(from).moveAndExpand(getPaddingBox(opt)), targetBBox, bearing2);
      } else if (!isOrthogonal) {
        route = vertexElement(from, to, targetBBox, bearing2);
      }
    } else if (!isOrthogonal) {
      route = vertexVertex(from, to, bearing2);
    }
    if (route) {
      Array.prototype.push.apply(orthogonalVertices, route.points);
      bearing2 = route.direction;
    } else {
      bearing2 = getBearing(from, to);
    }
    if (i + 1 < max5) {
      orthogonalVertices.push(to);
    }
  }
  return orthogonalVertices;
}

// node_modules/jointjs/src/routers/manhattan.mjs
var config2 = {
  // size of the step to find a route (the grid of the manhattan pathfinder)
  step: 10,
  // the number of route finding loops that cause the router to abort
  // returns fallback route instead
  maximumLoops: 2e3,
  // the number of decimal places to round floating point coordinates
  precision: 1,
  // maximum change of direction
  maxAllowedDirectionChange: 90,
  // should the router use perpendicular linkView option?
  // does not connect anchor of element but rather a point close-by that is orthogonal
  // this looks much better
  perpendicular: true,
  // should the source and/or target not be considered as obstacles?
  excludeEnds: [],
  // 'source', 'target'
  // should certain types of elements not be considered as obstacles?
  excludeTypes: ["basic.Text"],
  // possible starting directions from an element
  startDirections: ["top", "right", "bottom", "left"],
  // possible ending directions to an element
  endDirections: ["top", "right", "bottom", "left"],
  // specify the directions used above and what they mean
  directionMap: {
    top: {
      x: 0,
      y: -1
    },
    right: {
      x: 1,
      y: 0
    },
    bottom: {
      x: 0,
      y: 1
    },
    left: {
      x: -1,
      y: 0
    }
  },
  // cost of an orthogonal step
  cost: function() {
    return this.step;
  },
  // an array of directions to find next points on the route
  // different from start/end directions
  directions: function() {
    var step = this.step;
    var cost = this.cost();
    return [{
      offsetX: step,
      offsetY: 0,
      cost
    }, {
      offsetX: -step,
      offsetY: 0,
      cost
    }, {
      offsetX: 0,
      offsetY: step,
      cost
    }, {
      offsetX: 0,
      offsetY: -step,
      cost
    }];
  },
  // a penalty received for direction change
  penalties: function() {
    return {
      0: 0,
      45: this.step / 2,
      90: this.step / 2
    };
  },
  // padding applied on the element bounding boxes
  paddingBox: function() {
    var step = this.step;
    return {
      x: -step,
      y: -step,
      width: 2 * step,
      height: 2 * step
    };
  },
  // A function that determines whether a given point is an obstacle or not.
  // If used, the `padding`, `excludeEnds`and `excludeTypes` options are ignored.
  // (point: dia.Point) => boolean;
  isPointObstacle: null,
  // a router to use when the manhattan router fails
  // (one of the partial routes returns null)
  fallbackRouter: function(vertices, opt, linkView) {
    if (!isFunction(orthogonal)) {
      throw new Error("Manhattan requires the orthogonal router as default fallback.");
    }
    return orthogonal(vertices, assign({}, config2, opt), linkView);
  },
  /* Deprecated */
  // a simple route used in situations when main routing method fails
  // (exceed max number of loop iterations, inaccessible)
  fallbackRoute: function(from, to, opt) {
    return null;
  },
  // if a function is provided, it's used to route the link while dragging an end
  // i.e. function(from, to, opt) { return []; }
  draggingRoute: null
};
function ObstacleMap(opt) {
  this.map = {};
  this.options = opt;
  this.mapGridSize = 100;
}
ObstacleMap.prototype.build = function(graph, link) {
  var opt = this.options;
  var excludedEnds = toArray(opt.excludeEnds).reduce(function(res, item) {
    var end = link.get(item);
    if (end) {
      var cell = graph.getCell(end.id);
      if (cell) {
        res.push(cell);
      }
    }
    return res;
  }, []);
  var excludedAncestors = [];
  var source = graph.getCell(link.get("source").id);
  if (source) {
    excludedAncestors = union(excludedAncestors, source.getAncestors().map(function(cell) {
      return cell.id;
    }));
  }
  var target = graph.getCell(link.get("target").id);
  if (target) {
    excludedAncestors = union(excludedAncestors, target.getAncestors().map(function(cell) {
      return cell.id;
    }));
  }
  var mapGridSize = this.mapGridSize;
  graph.getElements().reduce(function(map, element) {
    var isExcludedType = toArray(opt.excludeTypes).includes(element.get("type"));
    var isExcludedEnd = excludedEnds.find(function(excluded) {
      return excluded.id === element.id;
    });
    var isExcludedAncestor = excludedAncestors.includes(element.id);
    var isExcluded = isExcludedType || isExcludedEnd || isExcludedAncestor;
    if (!isExcluded) {
      var bbox2 = element.getBBox().moveAndExpand(opt.paddingBox);
      var origin = bbox2.origin().snapToGrid(mapGridSize);
      var corner = bbox2.corner().snapToGrid(mapGridSize);
      for (var x = origin.x; x <= corner.x; x += mapGridSize) {
        for (var y = origin.y; y <= corner.y; y += mapGridSize) {
          var gridKey = x + "@" + y;
          map[gridKey] = map[gridKey] || [];
          map[gridKey].push(bbox2);
        }
      }
    }
    return map;
  }, this.map);
  return this;
};
ObstacleMap.prototype.isPointAccessible = function(point2) {
  var mapKey = point2.clone().snapToGrid(this.mapGridSize).toString();
  return toArray(this.map[mapKey]).every(function(obstacle) {
    return !obstacle.containsPoint(point2);
  });
};
function SortedSet() {
  this.items = [];
  this.hash = {};
  this.values = {};
  this.OPEN = 1;
  this.CLOSE = 2;
}
SortedSet.prototype.add = function(item, value) {
  if (this.hash[item]) {
    this.items.splice(this.items.indexOf(item), 1);
  } else {
    this.hash[item] = this.OPEN;
  }
  this.values[item] = value;
  var index = sortedIndex(this.items, item, function(i) {
    return this.values[i];
  }.bind(this));
  this.items.splice(index, 0, item);
};
SortedSet.prototype.remove = function(item) {
  this.hash[item] = this.CLOSE;
};
SortedSet.prototype.isOpen = function(item) {
  return this.hash[item] === this.OPEN;
};
SortedSet.prototype.isClose = function(item) {
  return this.hash[item] === this.CLOSE;
};
SortedSet.prototype.isEmpty = function() {
  return this.items.length === 0;
};
SortedSet.prototype.pop = function() {
  var item = this.items.shift();
  this.remove(item);
  return item;
};
function getSourceBBox2(linkView, opt) {
  if (opt && opt.paddingBox) return linkView.sourceBBox.clone().moveAndExpand(opt.paddingBox);
  return linkView.sourceBBox.clone();
}
function getTargetBBox2(linkView, opt) {
  if (opt && opt.paddingBox) return linkView.targetBBox.clone().moveAndExpand(opt.paddingBox);
  return linkView.targetBBox.clone();
}
function getSourceAnchor2(linkView, opt) {
  if (linkView.sourceAnchor) return linkView.sourceAnchor;
  var sourceBBox = getSourceBBox2(linkView, opt);
  return sourceBBox.center();
}
function getTargetAnchor2(linkView, opt) {
  if (linkView.targetAnchor) return linkView.targetAnchor;
  var targetBBox = getTargetBBox2(linkView, opt);
  return targetBBox.center();
}
function getDirectionAngle(start, end, numDirections, grid, opt) {
  var quadrant = 360 / numDirections;
  var angleTheta = start.theta(fixAngleEnd(start, end, grid, opt));
  var normalizedAngle = normalizeAngle(angleTheta + quadrant / 2);
  return quadrant * Math.floor(normalizedAngle / quadrant);
}
function fixAngleEnd(start, end, grid, opt) {
  var step = opt.step;
  var diffX = end.x - start.x;
  var diffY = end.y - start.y;
  var gridStepsX = diffX / grid.x;
  var gridStepsY = diffY / grid.y;
  var distanceX = gridStepsX * step;
  var distanceY = gridStepsY * step;
  return new Point(start.x + distanceX, start.y + distanceY);
}
function getDirectionChange(angle1, angle2) {
  var directionChange = Math.abs(angle1 - angle2);
  return directionChange > 180 ? 360 - directionChange : directionChange;
}
function getGridOffsets(directions, grid, opt) {
  var step = opt.step;
  toArray(opt.directions).forEach(function(direction) {
    direction.gridOffsetX = direction.offsetX / step * grid.x;
    direction.gridOffsetY = direction.offsetY / step * grid.y;
  });
}
function getGrid(step, source, target) {
  return {
    source: source.clone(),
    x: getGridDimension(target.x - source.x, step),
    y: getGridDimension(target.y - source.y, step)
  };
}
function getGridDimension(diff2, step) {
  if (!diff2) return step;
  var absDiff = Math.abs(diff2);
  var numSteps = Math.round(absDiff / step);
  if (!numSteps) return absDiff;
  var roundedDiff = numSteps * step;
  var remainder = absDiff - roundedDiff;
  var stepCorrection = remainder / numSteps;
  return step + stepCorrection;
}
function snapToGrid2(point2, grid) {
  var source = grid.source;
  var snappedX = snapToGrid(point2.x - source.x, grid.x) + source.x;
  var snappedY = snapToGrid(point2.y - source.y, grid.y) + source.y;
  return new Point(snappedX, snappedY);
}
function round5(point2, precision) {
  return point2.round(precision);
}
function align(point2, grid, precision) {
  return round5(snapToGrid2(point2.clone(), grid), precision);
}
function getKey(point2) {
  return point2.clone().toString();
}
function normalizePoint(point2) {
  return new Point(point2.x === 0 ? 0 : Math.abs(point2.x) / point2.x, point2.y === 0 ? 0 : Math.abs(point2.y) / point2.y);
}
function reconstructRoute(parents, points, tailPoint, from, to, grid, opt) {
  var route = [];
  var prevDiff = normalizePoint(to.difference(tailPoint));
  var currentKey = getKey(tailPoint);
  var parent2 = parents[currentKey];
  var point2;
  while (parent2) {
    point2 = points[currentKey];
    var diff2 = normalizePoint(point2.difference(parent2));
    if (!diff2.equals(prevDiff)) {
      route.unshift(point2);
      prevDiff = diff2;
    }
    currentKey = getKey(parent2);
    parent2 = parents[currentKey];
  }
  var leadPoint = points[currentKey];
  var fromDiff = normalizePoint(leadPoint.difference(from));
  if (!fromDiff.equals(prevDiff)) {
    route.unshift(leadPoint);
  }
  return route;
}
function estimateCost(from, endPoints) {
  var min5 = Infinity;
  for (var i = 0, len = endPoints.length; i < len; i++) {
    var cost = from.manhattanDistance(endPoints[i]);
    if (cost < min5) min5 = cost;
  }
  return min5;
}
function getRectPoints(anchor2, bbox2, directionList, grid, opt) {
  var precision = opt.precision;
  var directionMap = opt.directionMap;
  var anchorCenterVector = anchor2.difference(bbox2.center());
  var keys2 = isObject(directionMap) ? Object.keys(directionMap) : [];
  var dirList = toArray(directionList);
  var rectPoints = keys2.reduce(function(res, key) {
    if (dirList.includes(key)) {
      var direction = directionMap[key];
      var endpoint = new Point(anchor2.x + direction.x * (Math.abs(anchorCenterVector.x) + bbox2.width), anchor2.y + direction.y * (Math.abs(anchorCenterVector.y) + bbox2.height));
      var intersectionLine = new Line(anchor2, endpoint);
      var intersections = intersectionLine.intersect(bbox2) || [];
      var numIntersections = intersections.length;
      var farthestIntersectionDistance;
      var farthestIntersection = null;
      for (var i = 0; i < numIntersections; i++) {
        var currentIntersection = intersections[i];
        var distance = anchor2.squaredDistance(currentIntersection);
        if (farthestIntersectionDistance === void 0 || distance > farthestIntersectionDistance) {
          farthestIntersectionDistance = distance;
          farthestIntersection = currentIntersection;
        }
      }
      if (farthestIntersection) {
        var point2 = align(farthestIntersection, grid, precision);
        if (bbox2.containsPoint(point2)) {
          point2 = align(point2.offset(direction.x * grid.x, direction.y * grid.y), grid, precision);
        }
        res.push(point2);
      }
    }
    return res;
  }, []);
  if (!bbox2.containsPoint(anchor2)) {
    rectPoints.push(align(anchor2, grid, precision));
  }
  return rectPoints;
}
function findRoute(from, to, isPointObstacle, opt) {
  var precision = opt.precision;
  var sourceAnchor, targetAnchor;
  if (from instanceof Rect) {
    sourceAnchor = round5(getSourceAnchor2(this, opt).clone(), precision);
  } else {
    sourceAnchor = round5(from.clone(), precision);
  }
  if (to instanceof Rect) {
    targetAnchor = round5(getTargetAnchor2(this, opt).clone(), precision);
  } else {
    targetAnchor = round5(to.clone(), precision);
  }
  var grid = getGrid(opt.step, sourceAnchor, targetAnchor);
  var start, end;
  var startPoints, endPoints;
  if (from instanceof Rect) {
    start = sourceAnchor;
    startPoints = getRectPoints(start, from, opt.startDirections, grid, opt);
  } else {
    start = sourceAnchor;
    startPoints = [start];
  }
  if (to instanceof Rect) {
    end = targetAnchor;
    endPoints = getRectPoints(targetAnchor, to, opt.endDirections, grid, opt);
  } else {
    end = targetAnchor;
    endPoints = [end];
  }
  startPoints = startPoints.filter((p) => !isPointObstacle(p));
  endPoints = endPoints.filter((p) => !isPointObstacle(p));
  if (startPoints.length > 0 && endPoints.length > 0) {
    var openSet = new SortedSet();
    var points = {};
    var parents = {};
    var costs = {};
    for (var i = 0, n = startPoints.length; i < n; i++) {
      var startPoint = startPoints[i];
      var key = getKey(startPoint);
      openSet.add(key, estimateCost(startPoint, endPoints));
      points[key] = startPoint;
      costs[key] = 0;
    }
    var previousRouteDirectionAngle = opt.previousDirectionAngle;
    var isPathBeginning = previousRouteDirectionAngle === void 0;
    var direction, directionChange;
    var directions = opt.directions;
    getGridOffsets(directions, grid, opt);
    var numDirections = directions.length;
    var endPointsKeys = toArray(endPoints).reduce(function(res, endPoint) {
      var key2 = getKey(endPoint);
      res.push(key2);
      return res;
    }, []);
    var loopsRemaining = opt.maximumLoops;
    while (!openSet.isEmpty() && loopsRemaining > 0) {
      var currentKey = openSet.pop();
      var currentPoint = points[currentKey];
      var currentParent = parents[currentKey];
      var currentCost = costs[currentKey];
      var isRouteBeginning = currentParent === void 0;
      var isStart = currentPoint.equals(start);
      var previousDirectionAngle;
      if (!isRouteBeginning) previousDirectionAngle = getDirectionAngle(currentParent, currentPoint, numDirections, grid, opt);
      else if (!isPathBeginning) previousDirectionAngle = previousRouteDirectionAngle;
      else if (!isStart) previousDirectionAngle = getDirectionAngle(start, currentPoint, numDirections, grid, opt);
      else previousDirectionAngle = null;
      var samePoints = startPoints.length === endPoints.length;
      if (samePoints) {
        for (var j = 0; j < startPoints.length; j++) {
          if (!startPoints[j].equals(endPoints[j])) {
            samePoints = false;
            break;
          }
        }
      }
      var skipEndCheck = isRouteBeginning && samePoints;
      if (!skipEndCheck && endPointsKeys.indexOf(currentKey) >= 0) {
        opt.previousDirectionAngle = previousDirectionAngle;
        return reconstructRoute(parents, points, currentPoint, start, end, grid, opt);
      }
      for (i = 0; i < numDirections; i++) {
        direction = directions[i];
        var directionAngle = direction.angle;
        directionChange = getDirectionChange(previousDirectionAngle, directionAngle);
        if (!(isPathBeginning && isStart) && directionChange > opt.maxAllowedDirectionChange) continue;
        var neighborPoint = align(currentPoint.clone().offset(direction.gridOffsetX, direction.gridOffsetY), grid, precision);
        var neighborKey = getKey(neighborPoint);
        if (openSet.isClose(neighborKey) || isPointObstacle(neighborPoint)) continue;
        if (endPointsKeys.indexOf(neighborKey) >= 0) {
          var isNeighborEnd = neighborPoint.equals(end);
          if (!isNeighborEnd) {
            var endDirectionAngle = getDirectionAngle(neighborPoint, end, numDirections, grid, opt);
            var endDirectionChange = getDirectionChange(directionAngle, endDirectionAngle);
            if (endDirectionChange > opt.maxAllowedDirectionChange) continue;
          }
        }
        var neighborCost = direction.cost;
        var neighborPenalty = isStart ? 0 : opt.penalties[directionChange];
        var costFromStart = currentCost + neighborCost + neighborPenalty;
        if (!openSet.isOpen(neighborKey) || costFromStart < costs[neighborKey]) {
          points[neighborKey] = neighborPoint;
          parents[neighborKey] = currentPoint;
          costs[neighborKey] = costFromStart;
          openSet.add(neighborKey, costFromStart + estimateCost(neighborPoint, endPoints));
        }
      }
      loopsRemaining--;
    }
  }
  return opt.fallbackRoute.call(this, start, end, opt);
}
function resolveOptions(opt) {
  opt.directions = result(opt, "directions");
  opt.penalties = result(opt, "penalties");
  opt.paddingBox = result(opt, "paddingBox");
  opt.padding = result(opt, "padding");
  if (opt.padding) {
    var sides = normalizeSides(opt.padding);
    opt.paddingBox = {
      x: -sides.left,
      y: -sides.top,
      width: sides.left + sides.right,
      height: sides.top + sides.bottom
    };
  }
  toArray(opt.directions).forEach(function(direction) {
    var point1 = new Point(0, 0);
    var point2 = new Point(direction.offsetX, direction.offsetY);
    direction.angle = normalizeAngle(point1.theta(point2));
  });
}
function router(vertices, opt, linkView) {
  resolveOptions(opt);
  linkView.options.perpendicular = !!opt.perpendicular;
  var sourceBBox = getSourceBBox2(linkView, opt);
  var targetBBox = getTargetBBox2(linkView, opt);
  var sourceAnchor = getSourceAnchor2(linkView, opt);
  let isPointObstacle;
  if (typeof opt.isPointObstacle === "function") {
    isPointObstacle = opt.isPointObstacle;
  } else {
    const map = new ObstacleMap(opt);
    map.build(linkView.paper.model, linkView.model);
    isPointObstacle = (point2) => !map.isPointAccessible(point2);
  }
  var oldVertices = toArray(vertices).map(Point);
  var newVertices = [];
  var tailPoint = sourceAnchor;
  var to, from;
  for (var i = 0, len = oldVertices.length; i <= len; i++) {
    var partialRoute = null;
    from = to || sourceBBox;
    to = oldVertices[i];
    if (!to) {
      to = targetBBox;
      var isEndingAtPoint = !linkView.model.get("source").id || !linkView.model.get("target").id;
      if (isEndingAtPoint && isFunction(opt.draggingRoute)) {
        var dragFrom = from === sourceBBox ? sourceAnchor : from;
        var dragTo = to.origin();
        partialRoute = opt.draggingRoute.call(linkView, dragFrom, dragTo, opt);
      }
    }
    partialRoute = partialRoute || findRoute.call(linkView, from, to, isPointObstacle, opt);
    if (partialRoute === null) {
      return opt.fallbackRouter(vertices, opt, linkView);
    }
    var leadPoint = partialRoute[0];
    if (leadPoint && leadPoint.equals(tailPoint)) partialRoute.shift();
    tailPoint = partialRoute[partialRoute.length - 1] || tailPoint;
    Array.prototype.push.apply(newVertices, partialRoute);
  }
  return newVertices;
}
var manhattan = function(vertices, opt, linkView) {
  return router(vertices, assign({}, config2, opt), linkView);
};

// node_modules/jointjs/src/routers/metro.mjs
var config3 = {
  maxAllowedDirectionChange: 45,
  // cost of a diagonal step
  diagonalCost: function() {
    var step = this.step;
    return Math.ceil(Math.sqrt(step * step << 1));
  },
  // an array of directions to find next points on the route
  // different from start/end directions
  directions: function() {
    var step = this.step;
    var cost = this.cost();
    var diagonalCost = this.diagonalCost();
    return [{
      offsetX: step,
      offsetY: 0,
      cost
    }, {
      offsetX: step,
      offsetY: step,
      cost: diagonalCost
    }, {
      offsetX: 0,
      offsetY: step,
      cost
    }, {
      offsetX: -step,
      offsetY: step,
      cost: diagonalCost
    }, {
      offsetX: -step,
      offsetY: 0,
      cost
    }, {
      offsetX: -step,
      offsetY: -step,
      cost: diagonalCost
    }, {
      offsetX: 0,
      offsetY: -step,
      cost
    }, {
      offsetX: step,
      offsetY: -step,
      cost: diagonalCost
    }];
  },
  // a simple route used in situations when main routing method fails
  // (exceed max number of loop iterations, inaccessible)
  fallbackRoute: function(from, to, opt) {
    var theta = from.theta(to);
    var route = [];
    var a = {
      x: to.x,
      y: from.y
    };
    var b = {
      x: from.x,
      y: to.y
    };
    if (theta % 180 > 90) {
      var t = a;
      a = b;
      b = t;
    }
    var p1 = theta % 90 < 45 ? a : b;
    var l1 = new Line(from, p1);
    var alpha = 90 * Math.ceil(theta / 90);
    var p2 = Point.fromPolar(l1.squaredLength(), toRad(alpha + 135), p1);
    var l2 = new Line(to, p2);
    var intersectionPoint = l1.intersection(l2);
    var point2 = intersectionPoint ? intersectionPoint : to;
    var directionFrom = intersectionPoint ? point2 : from;
    var quadrant = 360 / opt.directions.length;
    var angleTheta = directionFrom.theta(to);
    var normalizedAngle = normalizeAngle(angleTheta + quadrant / 2);
    var directionAngle = quadrant * Math.floor(normalizedAngle / quadrant);
    opt.previousDirectionAngle = directionAngle;
    if (point2) route.push(point2.round());
    route.push(to);
    return route;
  }
};
var metro = function(vertices, opt, linkView) {
  if (!isFunction(manhattan)) {
    throw new Error("Metro requires the manhattan router.");
  }
  return manhattan(vertices, assign({}, config3, opt), linkView);
};

// node_modules/jointjs/src/routers/rightAngle.mjs
var Directions = {
  AUTO: "auto",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
  ANCHOR_SIDE: "anchor-side",
  MAGNET_SIDE: "magnet-side"
};
var DEFINED_DIRECTIONS = [Directions.LEFT, Directions.RIGHT, Directions.TOP, Directions.BOTTOM];
var OPPOSITE_DIRECTIONS = {
  [Directions.LEFT]: Directions.RIGHT,
  [Directions.RIGHT]: Directions.LEFT,
  [Directions.TOP]: Directions.BOTTOM,
  [Directions.BOTTOM]: Directions.TOP
};
var VERTICAL_DIRECTIONS = [Directions.TOP, Directions.BOTTOM];
var ANGLE_DIRECTION_MAP = {
  0: Directions.RIGHT,
  180: Directions.LEFT,
  270: Directions.TOP,
  90: Directions.BOTTOM
};
function getSegmentAngle(line3) {
  return line3.angle();
}
function simplifyPoints(points) {
  return new Polyline(points).simplify({
    threshold: 1
  }).points;
}
function resolveSides(source, target) {
  const {
    point: sourcePoint,
    x0: sx0,
    y0: sy0,
    view: sourceView,
    bbox: sourceBBox,
    direction: sourceDirection
  } = source;
  const {
    point: targetPoint,
    x0: tx0,
    y0: ty0,
    view: targetView,
    bbox: targetBBox,
    direction: targetDirection
  } = target;
  let sourceSide;
  if (!sourceView) {
    const sourceLinkAnchorBBox = new Rect(sx0, sy0, 0, 0);
    sourceSide = DEFINED_DIRECTIONS.includes(sourceDirection) ? sourceDirection : sourceLinkAnchorBBox.sideNearestToPoint(targetPoint);
  } else if (sourceView.model.isLink()) {
    sourceSide = getDirectionForLinkConnection(targetPoint, sourcePoint, sourceView);
  } else if (sourceDirection === Directions.ANCHOR_SIDE) {
    sourceSide = sourceBBox.sideNearestToPoint(sourcePoint);
  } else if (sourceDirection === Directions.MAGNET_SIDE) {
    sourceSide = sourceView.model.getBBox().sideNearestToPoint(sourcePoint);
  } else {
    sourceSide = sourceDirection;
  }
  let targetSide;
  if (!targetView) {
    const targetLinkAnchorBBox = new Rect(tx0, ty0, 0, 0);
    targetSide = DEFINED_DIRECTIONS.includes(targetDirection) ? targetDirection : targetLinkAnchorBBox.sideNearestToPoint(sourcePoint);
  } else if (targetView.model.isLink()) {
    targetSide = getDirectionForLinkConnection(sourcePoint, targetPoint, targetView);
  } else if (targetDirection === Directions.ANCHOR_SIDE) {
    targetSide = targetBBox.sideNearestToPoint(targetPoint);
  } else if (targetDirection === Directions.MAGNET_SIDE) {
    targetSide = targetView.model.getBBox().sideNearestToPoint(targetPoint);
  } else {
    targetSide = targetDirection;
  }
  return [sourceSide, targetSide];
}
function resolveForTopSourceSide(source, target, nextInLine) {
  const {
    x0: sx0,
    y0: sy0,
    width,
    height,
    point: anchor2,
    margin
  } = source;
  const sx1 = sx0 + width;
  const sy1 = sy0 + height;
  const smx0 = sx0 - margin;
  const smx1 = sx1 + margin;
  const smy0 = sy0 - margin;
  const {
    x: ax
  } = anchor2;
  const {
    x0: tx,
    y0: ty
  } = target;
  if (tx === ax && ty < sy0) return Directions.BOTTOM;
  if (tx < ax && ty < smy0) return Directions.RIGHT;
  if (tx > ax && ty < smy0) return Directions.LEFT;
  if (tx < smx0 && ty >= sy0) return Directions.TOP;
  if (tx > smx1 && ty >= sy0) return Directions.TOP;
  if (tx >= smx0 && tx <= ax && ty > sy1) {
    if (nextInLine.point.x < tx) {
      return Directions.RIGHT;
    }
    return Directions.LEFT;
  }
  if (tx <= smx1 && tx >= ax && ty > sy1) {
    if (nextInLine.point.x < tx) {
      return Directions.RIGHT;
    }
    return Directions.LEFT;
  }
  return Directions.TOP;
}
function resolveForBottomSourceSide(source, target, nextInLine) {
  const {
    x0: sx0,
    y0: sy0,
    width,
    height,
    point: anchor2,
    margin
  } = source;
  const sx1 = sx0 + width;
  const sy1 = sy0 + height;
  const smx0 = sx0 - margin;
  const smx1 = sx1 + margin;
  const smy1 = sy1 + margin;
  const {
    x: ax
  } = anchor2;
  const {
    x0: tx,
    y0: ty
  } = target;
  if (tx === ax && ty > sy1) return Directions.TOP;
  if (tx < ax && ty > smy1) return Directions.RIGHT;
  if (tx > ax && ty > smy1) return Directions.LEFT;
  if (tx < smx0 && ty <= sy1) return Directions.BOTTOM;
  if (tx > smx1 && ty <= sy1) return Directions.BOTTOM;
  if (tx >= smx0 && tx <= ax && ty < sy0) {
    if (nextInLine.point.x < tx) {
      return Directions.RIGHT;
    }
    return Directions.LEFT;
  }
  if (tx <= smx1 && tx >= ax && ty < sy0) {
    if (nextInLine.point.x < tx) {
      return Directions.RIGHT;
    }
    return Directions.LEFT;
  }
  return Directions.BOTTOM;
}
function resolveForLeftSourceSide(source, target, nextInLine) {
  const {
    y0: sy0,
    x0: sx0,
    width,
    height,
    point: anchor2,
    margin
  } = source;
  const sx1 = sx0 + width;
  const sy1 = sy0 + height;
  const smx0 = sx0 - margin;
  const smy0 = sy0 - margin;
  const smy1 = sy1 + margin;
  const {
    x: ax,
    y: ay
  } = anchor2;
  const {
    x0: tx,
    y0: ty
  } = target;
  if (tx < ax && ty === ay) return Directions.RIGHT;
  if (tx <= smx0 && ty < ay) return Directions.BOTTOM;
  if (tx <= smx0 && ty > ay) return Directions.TOP;
  if (tx >= sx0 && ty <= smy0) return Directions.LEFT;
  if (tx >= sx0 && ty >= smy1) return Directions.LEFT;
  if (tx > sx1 && ty >= smy0 && ty <= ay) {
    if (nextInLine.point.y < ty) {
      return Directions.BOTTOM;
    }
    return Directions.TOP;
  }
  if (tx > sx1 && ty <= smy1 && ty >= ay) {
    if (nextInLine.point.y < ty) {
      return Directions.BOTTOM;
    }
    return Directions.TOP;
  }
  return Directions.LEFT;
}
function resolveForRightSourceSide(source, target, nextInLine) {
  const {
    y0: sy0,
    x0: sx0,
    width,
    height,
    point: anchor2,
    margin
  } = source;
  const sx1 = sx0 + width;
  const sy1 = sy0 + height;
  const smx1 = sx1 + margin;
  const smy0 = sy0 - margin;
  const smy1 = sy1 + margin;
  const {
    x: ax,
    y: ay
  } = anchor2;
  const {
    x0: tx,
    y0: ty
  } = target;
  if (tx > ax && ty === ay) return Directions.LEFT;
  if (tx >= smx1 && ty < ay) return Directions.BOTTOM;
  if (tx >= smx1 && ty > ay) return Directions.TOP;
  if (tx <= sx1 && ty <= smy0) return Directions.RIGHT;
  if (tx <= sx1 && ty >= smy1) return Directions.RIGHT;
  if (tx < sx0 && ty >= smy0 && ty <= ay) {
    if (nextInLine.point.y < ty) {
      return Directions.BOTTOM;
    }
    return Directions.TOP;
  }
  if (tx < sx0 && ty <= smy1 && ty >= ay) {
    if (nextInLine.point.y < ty) {
      return Directions.BOTTOM;
    }
    return Directions.TOP;
  }
  return Directions.RIGHT;
}
function resolveInitialDirection(source, target, nextInLine) {
  const [sourceSide] = resolveSides(source, target);
  switch (sourceSide) {
    case Directions.TOP:
      return resolveForTopSourceSide(source, target, nextInLine);
    case Directions.RIGHT:
      return resolveForRightSourceSide(source, target, nextInLine);
    case Directions.BOTTOM:
      return resolveForBottomSourceSide(source, target, nextInLine);
    case Directions.LEFT:
      return resolveForLeftSourceSide(source, target, nextInLine);
  }
}
function getDirectionForLinkConnection(linkOrigin, connectionPoint, linkView) {
  const tangent = linkView.getTangentAtLength(linkView.getClosestPointLength(connectionPoint));
  const roundedAngle = Math.round(getSegmentAngle(tangent) / 90) * 90;
  if (roundedAngle % 180 === 0 && linkOrigin.y === connectionPoint.y) {
    return linkOrigin.x < connectionPoint.x ? Directions.LEFT : Directions.RIGHT;
  } else if (linkOrigin.x === connectionPoint.x) {
    return linkOrigin.y < connectionPoint.y ? Directions.TOP : Directions.BOTTOM;
  }
  switch (roundedAngle) {
    case 0:
    case 180:
    case 360:
      return linkOrigin.y < connectionPoint.y ? Directions.TOP : Directions.BOTTOM;
    case 90:
    case 270:
      return linkOrigin.x < connectionPoint.x ? Directions.LEFT : Directions.RIGHT;
  }
}
function pointDataFromAnchor(view, point2, bbox2, direction, isPort, fallBackAnchor, margin) {
  if (direction === Directions.AUTO) {
    direction = isPort ? Directions.MAGNET_SIDE : Directions.ANCHOR_SIDE;
  }
  const isElement = view && view.model.isElement();
  const {
    x: x0,
    y: y0,
    width = 0,
    height = 0
  } = isElement ? Rect.fromRectUnion(bbox2, view.model.getBBox()) : fallBackAnchor;
  return {
    point: point2,
    x0,
    y0,
    view,
    bbox: bbox2,
    width,
    height,
    direction,
    margin: isElement ? margin : 0
  };
}
function pointDataFromVertex({
  x,
  y
}) {
  const point2 = new Point(x, y);
  return {
    point: point2,
    x0: point2.x,
    y0: point2.y,
    view: null,
    bbox: new Rect(x, y, 0, 0),
    width: 0,
    height: 0,
    direction: null,
    margin: 0
  };
}
function getOutsidePoint(side, pointData, margin) {
  const outsidePoint = pointData.point.clone();
  const {
    x0,
    y0,
    width,
    height
  } = pointData;
  switch (side) {
    case "left":
      outsidePoint.x = x0 - margin;
      break;
    case "right":
      outsidePoint.x = x0 + width + margin;
      break;
    case "top":
      outsidePoint.y = y0 - margin;
      break;
    case "bottom":
      outsidePoint.y = y0 + height + margin;
      break;
  }
  return outsidePoint;
}
function routeBetweenPoints(source, target) {
  const {
    point: sourcePoint,
    x0: sx0,
    y0: sy0,
    view: sourceView,
    width: sourceWidth,
    height: sourceHeight,
    margin: sourceMargin
  } = source;
  const {
    point: targetPoint,
    x0: tx0,
    y0: ty0,
    width: targetWidth,
    height: targetHeight,
    margin: targetMargin
  } = target;
  const tx1 = tx0 + targetWidth;
  const ty1 = ty0 + targetHeight;
  const sx1 = sx0 + sourceWidth;
  const sy1 = sy0 + sourceHeight;
  const isSourceEl = sourceView && sourceView.model.isElement();
  const smx0 = sx0 - sourceMargin;
  const smx1 = sx1 + sourceMargin;
  const smy0 = sy0 - sourceMargin;
  const smy1 = sy1 + sourceMargin;
  const tmx0 = tx0 - targetMargin;
  const tmx1 = tx1 + targetMargin;
  const tmy0 = ty0 - targetMargin;
  const tmy1 = ty1 + targetMargin;
  const [sourceSide, targetSide] = resolveSides(source, target);
  const sourceOutsidePoint = getOutsidePoint(sourceSide, {
    point: sourcePoint,
    x0: sx0,
    y0: sy0,
    width: sourceWidth,
    height: sourceHeight
  }, sourceMargin);
  const targetOutsidePoint = getOutsidePoint(targetSide, {
    point: targetPoint,
    x0: tx0,
    y0: ty0,
    width: targetWidth,
    height: targetHeight
  }, targetMargin);
  const {
    x: sox,
    y: soy
  } = sourceOutsidePoint;
  const {
    x: tox,
    y: toy
  } = targetOutsidePoint;
  const tcx = (tx0 + tx1) / 2;
  const tcy = (ty0 + ty1) / 2;
  const scx = (sx0 + sx1) / 2;
  const scy = (sy0 + sy1) / 2;
  const middleOfVerticalSides = (scx < tcx ? sx1 + tx0 : tx1 + sx0) / 2;
  const middleOfHorizontalSides = (scy < tcy ? sy1 + ty0 : ty1 + sy0) / 2;
  if (sourceSide === "left" && targetSide === "right") {
    if (smx0 <= tmx1) {
      let y = middleOfHorizontalSides;
      if (sx1 <= tx0) {
        if (ty1 >= smy0 && toy < soy) {
          y = Math.min(tmy0, smy0);
        } else if (ty0 <= smy1 && toy >= soy) {
          y = Math.max(tmy1, smy1);
        }
      }
      return [{
        x: sox,
        y: soy
      }, {
        x: sox,
        y
      }, {
        x: tox,
        y
      }, {
        x: tox,
        y: toy
      }];
    }
    const x = (sox + tox) / 2;
    return [{
      x,
      y: soy
    }, {
      x,
      y: toy
    }];
  } else if (sourceSide === "right" && targetSide === "left") {
    if (smx1 >= tmx0) {
      let y = middleOfHorizontalSides;
      if (sox > tx1) {
        if (ty1 >= smy0 && toy < soy) {
          y = Math.min(tmy0, smy0);
        } else if (ty0 <= smy1 && toy >= soy) {
          y = Math.max(tmy1, smy1);
        }
      }
      return [{
        x: sox,
        y: soy
      }, {
        x: sox,
        y
      }, {
        x: tox,
        y
      }, {
        x: tox,
        y: toy
      }];
    }
    const x = (sox + tox) / 2;
    return [{
      x,
      y: soy
    }, {
      x,
      y: toy
    }];
  } else if (sourceSide === "top" && targetSide === "bottom") {
    if (soy < toy) {
      let x = middleOfVerticalSides;
      let y2 = soy;
      if (soy < ty0) {
        if (tx1 >= smx0 && tox < sox) {
          x = Math.min(tmx0, smx0);
        } else if (tx0 <= smx1 && tox >= sox) {
          x = Math.max(tmx1, smx1);
        }
      }
      return [{
        x: sox,
        y: y2
      }, {
        x,
        y: y2
      }, {
        x,
        y: toy
      }, {
        x: tox,
        y: toy
      }];
    }
    const y = (soy + toy) / 2;
    return [{
      x: sox,
      y
    }, {
      x: tox,
      y
    }];
  } else if (sourceSide === "bottom" && targetSide === "top") {
    if (soy - sourceMargin > toy) {
      let x = middleOfVerticalSides;
      let y2 = soy;
      if (soy > ty1) {
        if (tx1 >= smx0 && tox < sox) {
          x = Math.min(tmx0, smx0);
        } else if (tx0 <= smx1 && tox >= sox) {
          x = Math.max(tmx1, smx1);
        }
      }
      return [{
        x: sox,
        y: y2
      }, {
        x,
        y: y2
      }, {
        x,
        y: toy
      }, {
        x: tox,
        y: toy
      }];
    }
    const y = (soy + toy) / 2;
    return [{
      x: sox,
      y
    }, {
      x: tox,
      y
    }];
  } else if (sourceSide === "top" && targetSide === "top") {
    let x;
    let y1 = Math.min((sy1 + ty0) / 2, toy);
    let y2 = Math.min((sy0 + ty1) / 2, soy);
    if (toy < soy) {
      if (sox >= tmx1 || sox <= tmx0) {
        return [{
          x: sox,
          y: Math.min(soy, toy)
        }, {
          x: tox,
          y: Math.min(soy, toy)
        }];
      } else if (tox > sox) {
        x = Math.min(sox, tmx0);
      } else {
        x = Math.max(sox, tmx1);
      }
    } else {
      if (tox >= smx1 || tox <= smx0) {
        return [{
          x: sox,
          y: Math.min(soy, toy)
        }, {
          x: tox,
          y: Math.min(soy, toy)
        }];
      } else if (tox >= sox) {
        x = Math.max(tox, smx1);
      } else {
        x = Math.min(tox, smx0);
      }
    }
    return [{
      x: sox,
      y: y2
    }, {
      x,
      y: y2
    }, {
      x,
      y: y1
    }, {
      x: tox,
      y: y1
    }];
  } else if (sourceSide === "bottom" && targetSide === "bottom") {
    let x;
    let y1 = Math.max((sy0 + ty1) / 2, toy);
    let y2 = Math.max((sy1 + ty0) / 2, soy);
    if (toy > soy) {
      if (sox >= tmx1 || sox <= tmx0) {
        return [{
          x: sox,
          y: Math.max(soy, toy)
        }, {
          x: tox,
          y: Math.max(soy, toy)
        }];
      } else if (tox > sox) {
        x = Math.min(sox, tmx0);
      } else {
        x = Math.max(sox, tmx1);
      }
    } else {
      if (tox >= smx1 || tox <= smx0) {
        return [{
          x: sox,
          y: Math.max(soy, toy)
        }, {
          x: tox,
          y: Math.max(soy, toy)
        }];
      } else if (tox >= sox) {
        x = Math.max(tox, smx1);
      } else {
        x = Math.min(tox, smx0);
      }
    }
    return [{
      x: sox,
      y: y2
    }, {
      x,
      y: y2
    }, {
      x,
      y: y1
    }, {
      x: tox,
      y: y1
    }];
  } else if (sourceSide === "left" && targetSide === "left") {
    let y;
    let x1 = Math.min((sx1 + tx0) / 2, tox);
    let x2 = Math.min((sx0 + tx1) / 2, sox);
    if (tox > sox) {
      if (toy <= soy) {
        y = Math.min(smy0, toy);
      } else {
        y = Math.max(smy1, toy);
      }
    } else {
      if (toy >= soy) {
        y = Math.min(tmy0, soy);
      } else {
        y = Math.max(tmy1, soy);
      }
    }
    return [{
      x: x2,
      y: soy
    }, {
      x: x2,
      y
    }, {
      x: x1,
      y
    }, {
      x: x1,
      y: toy
    }];
  } else if (sourceSide === "right" && targetSide === "right") {
    let y;
    let x1 = Math.max((sx0 + tx1) / 2, tox);
    let x2 = Math.max((sx1 + tx0) / 2, sox);
    if (tox < sox) {
      if (toy <= soy) {
        y = Math.min(smy0, toy);
      } else {
        y = Math.max(smy1, toy);
      }
    } else {
      if (toy >= soy) {
        y = Math.min(tmy0, soy);
      } else {
        y = Math.max(tmy1, soy);
      }
    }
    return [{
      x: x2,
      y: soy
    }, {
      x: x2,
      y
    }, {
      x: x1,
      y
    }, {
      x: x1,
      y: toy
    }];
  } else if (sourceSide === "top" && targetSide === "right") {
    if (soy > toy) {
      if (sox < tox) {
        let y = middleOfHorizontalSides;
        if ((y > tcy || !isSourceEl) && y < tmy1 && sox < tx0) {
          y = tmy0;
        }
        return [{
          x: sox,
          y
        }, {
          x: tox,
          y
        }, {
          x: tox,
          y: toy
        }];
      }
      return [{
        x: sox,
        y: toy
      }];
    }
    const x = Math.max(middleOfVerticalSides, tmx1);
    if (tox < sox && toy > sy0 && toy < sy1) {
      return [{
        x: sox,
        y: soy
      }, {
        x,
        y: soy
      }, {
        x,
        y: toy
      }];
    }
    if (x > smx0 && toy > sy0 || tx0 > sx1) {
      const y = Math.min(sy0 - sourceMargin, ty0 - targetMargin);
      const x2 = Math.max(sx1 + sourceMargin, tx1 + targetMargin);
      return [{
        x: sox,
        y
      }, {
        x: x2,
        y
      }, {
        x: x2,
        y: toy
      }];
    }
    return [{
      x: sox,
      y: soy
    }, {
      x: Math.max(x, tox),
      y: soy
    }, {
      x: Math.max(x, tox),
      y: toy
    }];
  } else if (sourceSide === "top" && targetSide === "left") {
    if (soy > toy) {
      if (sox > tox) {
        let y = middleOfHorizontalSides;
        if ((y > tcy || !isSourceEl) && y < tmy1 && sox > tx1) {
          y = tmy0;
        }
        return [{
          x: sox,
          y
        }, {
          x: tox,
          y
        }, {
          x: tox,
          y: toy
        }];
      }
      return [{
        x: sox,
        y: toy
      }];
    }
    const x = Math.min(tmx0, middleOfVerticalSides);
    if (sox < tox && sy1 >= toy) {
      return [{
        x: sox,
        y: soy
      }, {
        x,
        y: soy
      }, {
        x,
        y: toy
      }];
    }
    if (x < smx1 && soy < ty1) {
      const y = Math.min(smy0, tmy0);
      const x2 = Math.min(smx0, tmx0);
      return [{
        x: sox,
        y
      }, {
        x: x2,
        y
      }, {
        x: x2,
        y: toy
      }];
    }
    return [{
      x: sox,
      y: soy
    }, {
      x,
      y: soy
    }, {
      x,
      y: toy
    }];
  } else if (sourceSide === "bottom" && targetSide === "right") {
    if (soy < toy) {
      if (sox < tox) {
        let y = middleOfHorizontalSides;
        if ((y < tcy || !isSourceEl) && y > tmy0 && sox < tx0) {
          y = tmy1;
        }
        return [{
          x: sox,
          y
        }, {
          x: tox,
          y
        }, {
          x: tox,
          y: toy
        }];
      }
      return [{
        x: sox,
        y: toy
      }];
    } else {
      if (sx0 < tox) {
        const y = Math.max(smy1, tmy1);
        const x2 = Math.max(smx1, tmx1);
        return [{
          x: sox,
          y
        }, {
          x: x2,
          y
        }, {
          x: x2,
          y: toy
        }];
      }
    }
    const x = middleOfVerticalSides;
    return [{
      x: sox,
      y: soy
    }, {
      x,
      y: soy
    }, {
      x,
      y: toy
    }];
  } else if (sourceSide === "bottom" && targetSide === "left") {
    if (soy < toy) {
      if (sox > tox) {
        let y = middleOfHorizontalSides;
        if ((y < tcy || !isSourceEl) && y > tmy0 && sox > tx1) {
          y = tmy1;
        }
        return [{
          x: sox,
          y
        }, {
          x: tox,
          y
        }, {
          x: tox,
          y: toy
        }];
      }
      return [{
        x: sox,
        y: toy
      }];
    } else {
      if (sx1 > tox) {
        const y = Math.max(smy1, tmy1);
        const x2 = Math.min(smx0, tmx0);
        return [{
          x: sox,
          y
        }, {
          x: x2,
          y
        }, {
          x: x2,
          y: toy
        }];
      }
    }
    const x = middleOfVerticalSides;
    return [{
      x: sox,
      y: soy
    }, {
      x,
      y: soy
    }, {
      x,
      y: toy
    }];
  } else if (sourceSide === "left" && targetSide === "bottom") {
    if (sox >= tox && soy >= tmy1) {
      return [{
        x: tox,
        y: soy
      }];
    }
    if (sox >= tx1 && soy < toy) {
      const x2 = middleOfVerticalSides;
      return [{
        x: x2,
        y: soy
      }, {
        x: x2,
        y: toy
      }, {
        x: tox,
        y: toy
      }];
    }
    if (tox < sx1 && ty1 <= sy0) {
      const y2 = middleOfHorizontalSides;
      return [{
        x: sox,
        y: soy
      }, {
        x: sox,
        y: y2
      }, {
        x: tox,
        y: y2
      }];
    }
    const x = Math.min(tmx0, sox);
    const y = Math.max(smy1, tmy1);
    return [{
      x,
      y: soy
    }, {
      x,
      y
    }, {
      x: tox,
      y
    }];
  } else if (sourceSide === "left" && targetSide === "top") {
    if (sox > tox && soy < tmy0) {
      return [{
        x: tox,
        y: soy
      }];
    }
    if (sox >= tx1) {
      if (soy > toy) {
        const x2 = middleOfVerticalSides;
        return [{
          x: x2,
          y: soy
        }, {
          x: x2,
          y: toy
        }, {
          x: tox,
          y: toy
        }];
      }
    }
    if (tox <= sx1 && toy > soy) {
      const y2 = middleOfHorizontalSides;
      return [{
        x: sox,
        y: soy
      }, {
        x: sox,
        y: y2
      }, {
        x: tox,
        y: y2
      }];
    }
    const x = toy < soy ? Math.min(smx0, tmx0) : smx0;
    const y = Math.min(smy0, tmy0);
    return [{
      x,
      y: soy
    }, {
      x,
      y
    }, {
      x: tox,
      y
    }];
  } else if (sourceSide === "right" && targetSide === "top") {
    if (sox <= tox && soy < tmy0) {
      return [{
        x: tox,
        y: soy
      }];
    }
    if (sx1 < tx0 && soy > toy) {
      let x2 = middleOfVerticalSides;
      return [{
        x: x2,
        y: soy
      }, {
        x: x2,
        y: toy
      }, {
        x: tox,
        y: toy
      }];
    }
    if (tox < sox && ty0 > sy1) {
      const y2 = middleOfHorizontalSides;
      return [{
        x: sox,
        y: soy
      }, {
        x: sox,
        y: y2
      }, {
        x: tox,
        y: y2
      }];
    }
    const x = Math.max(smx1, tmx1);
    const y = Math.min(smy0, tmy0);
    return [{
      x,
      y: soy
    }, {
      x,
      y
    }, {
      x: tox,
      y
    }];
  } else if (sourceSide === "right" && targetSide === "bottom") {
    if (sox <= tox && soy >= tmy1) {
      return [{
        x: tox,
        y: soy
      }];
    }
    if (sox <= tmx0 && soy < toy) {
      const x2 = middleOfVerticalSides;
      return [{
        x: x2,
        y: soy
      }, {
        x: x2,
        y: toy
      }, {
        x: tox,
        y: toy
      }];
    }
    if (tox > sx0 && ty1 < sy0) {
      const y2 = middleOfHorizontalSides;
      return [{
        x: sox,
        y: soy
      }, {
        x: sox,
        y: y2
      }, {
        x: tox,
        y: y2
      }];
    }
    const x = Math.max(tmx1, sox);
    const y = Math.max(smy1, tmy1);
    return [{
      x,
      y: soy
    }, {
      x,
      y
    }, {
      x: tox,
      y
    }];
  }
}
function rightAngleRouter(vertices, opt, linkView) {
  const {
    sourceDirection = Directions.AUTO,
    targetDirection = Directions.AUTO
  } = opt;
  const margin = opt.margin || 20;
  const useVertices = opt.useVertices || false;
  const isSourcePort = !!linkView.model.source().port;
  const sourcePoint = pointDataFromAnchor(linkView.sourceView, linkView.sourceAnchor, linkView.sourceBBox, sourceDirection, isSourcePort, linkView.sourceAnchor, margin);
  const isTargetPort = !!linkView.model.target().port;
  const targetPoint = pointDataFromAnchor(linkView.targetView, linkView.targetAnchor, linkView.targetBBox, targetDirection, isTargetPort, linkView.targetAnchor, margin);
  let resultVertices = [];
  if (!useVertices || vertices.length === 0) {
    return simplifyPoints(routeBetweenPoints(sourcePoint, targetPoint));
  }
  const verticesData = vertices.map((v) => pointDataFromVertex(v));
  const [firstVertex] = verticesData;
  if (sourcePoint.view && sourcePoint.view.model.isElement() && sourcePoint.view.model.getBBox().inflate(margin).containsPoint(firstVertex.point)) {
    const [fromDirection] = resolveSides(sourcePoint, firstVertex);
    const toDirection = fromDirection;
    const dummySource = pointDataFromVertex(sourcePoint.point);
    dummySource.margin = margin;
    dummySource.direction = fromDirection;
    firstVertex.direction = toDirection;
    resultVertices.push(...routeBetweenPoints(dummySource, firstVertex), firstVertex.point);
  } else {
    const next = verticesData[1] || targetPoint;
    const direction = resolveInitialDirection(sourcePoint, firstVertex, next);
    firstVertex.direction = direction;
    resultVertices.push(...routeBetweenPoints(sourcePoint, firstVertex), firstVertex.point);
  }
  for (let i = 0; i < verticesData.length - 1; i++) {
    const from = verticesData[i];
    const to = verticesData[i + 1];
    const segment = new Line(from.point, to.point);
    const segmentAngle = getSegmentAngle(segment);
    if (segmentAngle % 90 === 0) {
      const toDirection2 = ANGLE_DIRECTION_MAP[segmentAngle];
      const accessDirection = OPPOSITE_DIRECTIONS[toDirection2];
      if (toDirection2 !== from.direction) {
        resultVertices.push(from.point, to.point);
        to.direction = accessDirection;
      } else {
        const angle = normalizeAngle(segmentAngle - 90);
        let dx = 0;
        let dy = 0;
        if (angle === 90) {
          dy = -margin;
        } else if (angle === 180) {
          dx = -margin;
        } else if (angle === 270) {
          dy = margin;
        } else if (angle === 0) {
          dx = margin;
        }
        const p1 = {
          x: from.point.x + dx,
          y: from.point.y + dy
        };
        const p2 = {
          x: to.point.x + dx,
          y: to.point.y + dy
        };
        const segment2 = new Line(to.point, p2);
        to.direction = ANGLE_DIRECTION_MAP[getSegmentAngle(segment2)];
        resultVertices.push(from.point, p1, p2, to.point);
      }
      continue;
    }
    const [fromDirection, toDirection] = resolveDirection(from, to);
    from.direction = fromDirection;
    to.direction = toDirection;
    resultVertices.push(...routeBetweenPoints(from, to), to.point);
  }
  const lastVertex = verticesData[verticesData.length - 1];
  if (targetPoint.view && targetPoint.view.model.isElement()) {
    if (targetPoint.view.model.getBBox().inflate(margin).containsPoint(lastVertex.point)) {
      const [fromDirection] = resolveDirection(lastVertex, targetPoint);
      const dummyTarget = pointDataFromVertex(targetPoint.point);
      const [, toDirection] = resolveSides(lastVertex, targetPoint);
      dummyTarget.margin = margin;
      dummyTarget.direction = toDirection;
      lastVertex.direction = fromDirection;
      resultVertices.push(...routeBetweenPoints(lastVertex, dummyTarget));
    } else {
      const simplified = simplifyPoints(resultVertices);
      const segment = new Line(simplified[simplified.length - 2], lastVertex.point);
      const definedDirection = ANGLE_DIRECTION_MAP[Math.round(getSegmentAngle(segment))];
      lastVertex.direction = definedDirection;
      let lastSegmentRoute = routeBetweenPoints(lastVertex, targetPoint);
      const [p1, p2] = simplifyPoints([...lastSegmentRoute, targetPoint.point]);
      const lastSegment = new Line(p1, p2);
      const roundedLastSegmentAngle = Math.round(getSegmentAngle(lastSegment));
      const lastSegmentDirection = ANGLE_DIRECTION_MAP[roundedLastSegmentAngle];
      if (lastSegmentDirection !== definedDirection && definedDirection === OPPOSITE_DIRECTIONS[lastSegmentDirection]) {
        lastVertex.margin = margin;
        lastSegmentRoute = routeBetweenPoints(lastVertex, targetPoint);
      }
      resultVertices.push(...lastSegmentRoute);
    }
  } else {
    const [vertexDirection] = resolveDirection(lastVertex, targetPoint);
    lastVertex.direction = vertexDirection;
    resultVertices.push(...routeBetweenPoints(lastVertex, targetPoint));
  }
  return simplifyPoints(resultVertices);
}
function resolveDirection(from, to) {
  const accessDirection = from.direction;
  const isDirectionVertical = VERTICAL_DIRECTIONS.includes(accessDirection);
  let sourceDirection = from.direction;
  let targetDirection = to.direction;
  if (isDirectionVertical) {
    const isToAbove = from.point.y > to.point.y;
    const dx = to.point.x - from.point.x;
    if (accessDirection === Directions.BOTTOM) {
      sourceDirection = isToAbove ? OPPOSITE_DIRECTIONS[accessDirection] : dx >= 0 ? Directions.RIGHT : Directions.LEFT;
      if (dx > 0) {
        targetDirection = isToAbove ? Directions.LEFT : Directions.TOP;
      } else if (dx < 0) {
        targetDirection = isToAbove ? Directions.RIGHT : Directions.TOP;
      }
    } else {
      sourceDirection = isToAbove ? dx >= 0 ? Directions.RIGHT : Directions.LEFT : OPPOSITE_DIRECTIONS[accessDirection];
      if (dx > 0) {
        targetDirection = isToAbove ? Directions.BOTTOM : Directions.LEFT;
      } else if (dx < 0) {
        targetDirection = isToAbove ? Directions.BOTTOM : Directions.RIGHT;
      }
    }
  } else {
    const isToLeft = from.point.x > to.point.x;
    const dy = to.point.y - from.point.y;
    if (accessDirection === Directions.RIGHT) {
      sourceDirection = isToLeft ? OPPOSITE_DIRECTIONS[accessDirection] : dy >= 0 ? Directions.BOTTOM : Directions.TOP;
      if (dy > 0) {
        targetDirection = isToLeft ? Directions.TOP : Directions.LEFT;
      } else if (dy < 0) {
        targetDirection = isToLeft ? Directions.BOTTOM : Directions.LEFT;
      }
    } else {
      sourceDirection = isToLeft ? dy >= 0 ? Directions.BOTTOM : Directions.TOP : OPPOSITE_DIRECTIONS[accessDirection];
      if (dy > 0) {
        targetDirection = isToLeft ? Directions.RIGHT : Directions.TOP;
      } else if (dy < 0) {
        targetDirection = isToLeft ? Directions.RIGHT : Directions.BOTTOM;
      }
    }
  }
  return [sourceDirection, targetDirection];
}
rightAngleRouter.Directions = Directions;
var rightAngle = rightAngleRouter;

// node_modules/jointjs/src/connectors/index.mjs
var connectors_exports = {};
__export(connectors_exports, {
  curve: () => curve,
  jumpover: () => jumpover,
  normal: () => normal2,
  rounded: () => rounded,
  smooth: () => smooth,
  straight: () => straight
});

// node_modules/jointjs/src/connectors/straight.mjs
var CornerTypes = {
  POINT: "point",
  CUBIC: "cubic",
  LINE: "line",
  GAP: "gap"
};
var DEFINED_CORNER_TYPES = Object.values(CornerTypes);
var CORNER_RADIUS = 10;
var PRECISION = 1;
var straight = function(sourcePoint, targetPoint, routePoints = [], opt = {}) {
  const {
    cornerType = CornerTypes.POINT,
    cornerRadius = CORNER_RADIUS,
    cornerPreserveAspectRatio = false,
    precision = PRECISION,
    raw = false
  } = opt;
  if (DEFINED_CORNER_TYPES.indexOf(cornerType) === -1) {
    throw new Error("Invalid `cornerType` provided to `straight` connector.");
  }
  let path;
  if (cornerType === CornerTypes.POINT || !cornerRadius) {
    const points = [sourcePoint].concat(routePoints).concat([targetPoint]);
    const polyline = new Polyline(points);
    path = new Path(polyline);
  } else {
    path = new Path();
    path.appendSegment(Path.createSegment("M", sourcePoint));
    let nextDistance;
    const routePointsLength = routePoints.length;
    for (let i = 0; i < routePointsLength; i++) {
      const curr = new Point(routePoints[i]);
      const prev = routePoints[i - 1] || sourcePoint;
      const next = routePoints[i + 1] || targetPoint;
      const prevDistance = nextDistance || curr.distance(prev) / 2;
      nextDistance = curr.distance(next) / 2;
      let startMove, endMove;
      if (!cornerPreserveAspectRatio) {
        startMove = -Math.min(cornerRadius, prevDistance);
        endMove = -Math.min(cornerRadius, nextDistance);
      } else {
        startMove = endMove = -Math.min(cornerRadius, prevDistance, nextDistance);
      }
      const cornerStart = curr.clone().move(prev, startMove).round(precision);
      const cornerEnd = curr.clone().move(next, endMove).round(precision);
      path.appendSegment(Path.createSegment("L", cornerStart));
      switch (cornerType) {
        case CornerTypes.CUBIC: {
          const _132 = 1 / 3;
          const _232 = 2 / 3;
          const control1 = new Point(_132 * cornerStart.x + _232 * curr.x, _232 * curr.y + _132 * cornerStart.y);
          const control2 = new Point(_132 * cornerEnd.x + _232 * curr.x, _232 * curr.y + _132 * cornerEnd.y);
          path.appendSegment(Path.createSegment("C", control1, control2, cornerEnd));
          break;
        }
        case CornerTypes.LINE: {
          path.appendSegment(Path.createSegment("L", cornerEnd));
          break;
        }
        case CornerTypes.GAP: {
          path.appendSegment(Path.createSegment("M", cornerEnd));
          break;
        }
      }
    }
    path.appendSegment(Path.createSegment("L", targetPoint));
  }
  return raw ? path : path.serialize();
};

// node_modules/jointjs/src/connectors/jumpover.mjs
var JUMP_SIZE = 5;
var JUMP_TYPES = ["arc", "gap", "cubic"];
var RADIUS = 0;
var CLOSE_PROXIMITY_PADDING = 1;
var IGNORED_CONNECTORS = ["smooth"];
var _13 = 1 / 3;
var _23 = 2 / 3;
function sortPointsAscending(p1, p2) {
  let {
    x: x1,
    y: y1
  } = p1;
  let {
    x: x2,
    y: y2
  } = p2;
  if (x1 > x2) {
    let swap = x1;
    x1 = x2;
    x2 = swap;
    swap = y1;
    y1 = y2;
    y2 = swap;
  }
  if (y1 > y2) {
    let swap = x1;
    x1 = x2;
    x2 = swap;
    swap = y1;
    y1 = y2;
    y2 = swap;
  }
  return [new Point(x1, y1), new Point(x2, y2)];
}
function overlapExists(line1, line22) {
  const [{
    x: x1,
    y: y1
  }, {
    x: x2,
    y: y2
  }] = sortPointsAscending(line1.start, line1.end);
  const [{
    x: x3,
    y: y3
  }, {
    x: x4,
    y: y4
  }] = sortPointsAscending(line22.start, line22.end);
  const xMatch = x1 <= x4 && x3 <= x2;
  const yMatch = y1 <= y4 && y3 <= y2;
  return xMatch && yMatch;
}
function createLines(sourcePoint, targetPoint, route) {
  var points = [].concat(sourcePoint, route, targetPoint);
  return points.reduce(function(resultLines, point2, idx) {
    var nextPoint = points[idx + 1];
    if (nextPoint != null) {
      resultLines[idx] = line(point2, nextPoint);
    }
    return resultLines;
  }, []);
}
function setupUpdating(jumpOverLinkView) {
  var paper = jumpOverLinkView.paper;
  var updateList = paper._jumpOverUpdateList;
  if (updateList == null) {
    updateList = paper._jumpOverUpdateList = [];
    var graph = paper.model;
    graph.on("batch:stop", function() {
      if (this.hasActiveBatch()) return;
      updateJumpOver(paper);
    });
    graph.on("reset", function() {
      updateList = paper._jumpOverUpdateList = [];
    });
  }
  if (updateList.indexOf(jumpOverLinkView) < 0) {
    updateList.push(jumpOverLinkView);
    jumpOverLinkView.listenToOnce(jumpOverLinkView.model, "change:connector remove", function() {
      updateList.splice(updateList.indexOf(jumpOverLinkView), 1);
    });
  }
}
function updateJumpOver(paper) {
  var updateList = paper._jumpOverUpdateList;
  for (var i = 0; i < updateList.length; i++) {
    const linkView = updateList[i];
    const updateFlag = linkView.getFlag(linkView.constructor.Flags.CONNECTOR);
    linkView.requestUpdate(updateFlag);
  }
}
function findLineIntersections(line3, crossCheckLines) {
  return toArray(crossCheckLines).reduce(function(res, crossCheckLine) {
    var intersection3 = line3.intersection(crossCheckLine);
    if (intersection3) {
      res.push(intersection3);
    }
    return res;
  }, []);
}
function sortPoints(p1, p2) {
  return line(p1, p2).squaredLength();
}
function createJumps(line3, intersections, jumpSize) {
  return intersections.reduce(function(resultLines, point2, idx) {
    if (point2.skip === true) {
      return resultLines;
    }
    var lastLine = resultLines.pop() || line3;
    var jumpStart = point(point2).move(lastLine.start, -jumpSize);
    var jumpEnd = point(point2).move(lastLine.start, +jumpSize);
    var nextPoint = intersections[idx + 1];
    if (nextPoint != null) {
      var distance = jumpEnd.distance(nextPoint);
      if (distance <= jumpSize) {
        jumpEnd = nextPoint.move(lastLine.start, distance);
        nextPoint.skip = true;
      }
    } else {
      var endDistance = jumpStart.distance(lastLine.end);
      if (endDistance < jumpSize * 2 + CLOSE_PROXIMITY_PADDING) {
        resultLines.push(lastLine);
        return resultLines;
      }
    }
    var startDistance = jumpEnd.distance(lastLine.start);
    if (startDistance < jumpSize * 2 + CLOSE_PROXIMITY_PADDING) {
      resultLines.push(lastLine);
      return resultLines;
    }
    var jumpLine = line(jumpStart, jumpEnd);
    jumpLine.isJump = true;
    resultLines.push(line(lastLine.start, jumpStart), jumpLine, line(jumpEnd, lastLine.end));
    return resultLines;
  }, []);
}
function buildPath(lines, jumpSize, jumpType, radius) {
  var path = new Path();
  var segment;
  segment = Path.createSegment("M", lines[0].start);
  path.appendSegment(segment);
  toArray(lines).forEach(function(line3, index) {
    if (line3.isJump) {
      var angle, diff2;
      var control1, control2;
      if (jumpType === "arc") {
        angle = -90;
        diff2 = line3.start.difference(line3.end);
        var xAxisRotate = Number(diff2.x < 0 || diff2.x === 0 && diff2.y < 0);
        if (xAxisRotate) angle += 180;
        var midpoint = line3.midpoint();
        var centerLine = new Line(midpoint, line3.end).rotate(midpoint, angle);
        var halfLine;
        halfLine = new Line(line3.start, midpoint);
        control1 = halfLine.pointAt(2 / 3).rotate(line3.start, angle);
        control2 = centerLine.pointAt(1 / 3).rotate(centerLine.end, -angle);
        segment = Path.createSegment("C", control1, control2, centerLine.end);
        path.appendSegment(segment);
        halfLine = new Line(midpoint, line3.end);
        control1 = centerLine.pointAt(1 / 3).rotate(centerLine.end, angle);
        control2 = halfLine.pointAt(1 / 3).rotate(line3.end, -angle);
        segment = Path.createSegment("C", control1, control2, line3.end);
        path.appendSegment(segment);
      } else if (jumpType === "gap") {
        segment = Path.createSegment("M", line3.end);
        path.appendSegment(segment);
      } else if (jumpType === "cubic") {
        angle = line3.start.theta(line3.end);
        var xOffset = jumpSize * 0.6;
        var yOffset = jumpSize * 1.35;
        diff2 = line3.start.difference(line3.end);
        xAxisRotate = Number(diff2.x < 0 || diff2.x === 0 && diff2.y < 0);
        if (xAxisRotate) yOffset *= -1;
        control1 = Point(line3.start.x + xOffset, line3.start.y + yOffset).rotate(line3.start, angle);
        control2 = Point(line3.end.x - xOffset, line3.end.y + yOffset).rotate(line3.end, angle);
        segment = Path.createSegment("C", control1, control2, line3.end);
        path.appendSegment(segment);
      }
    } else {
      var nextLine = lines[index + 1];
      if (radius == 0 || !nextLine || nextLine.isJump) {
        segment = Path.createSegment("L", line3.end);
        path.appendSegment(segment);
      } else {
        buildRoundedSegment(radius, path, line3.end, line3.start, nextLine.end);
      }
    }
  });
  return path;
}
function buildRoundedSegment(offset, path, curr, prev, next) {
  var prevDistance = curr.distance(prev) / 2;
  var nextDistance = curr.distance(next) / 2;
  var startMove = -Math.min(offset, prevDistance);
  var endMove = -Math.min(offset, nextDistance);
  var roundedStart = curr.clone().move(prev, startMove).round();
  var roundedEnd = curr.clone().move(next, endMove).round();
  var control1 = new Point(_13 * roundedStart.x + _23 * curr.x, _23 * curr.y + _13 * roundedStart.y);
  var control2 = new Point(_13 * roundedEnd.x + _23 * curr.x, _23 * curr.y + _13 * roundedEnd.y);
  var segment;
  segment = Path.createSegment("L", roundedStart);
  path.appendSegment(segment);
  segment = Path.createSegment("C", control1, control2, roundedEnd);
  path.appendSegment(segment);
}
var jumpover = function(sourcePoint, targetPoint, route, opt) {
  setupUpdating(this);
  var raw = opt.raw;
  var jumpSize = opt.size || JUMP_SIZE;
  var jumpType = opt.jump && ("" + opt.jump).toLowerCase();
  var radius = opt.radius || RADIUS;
  var ignoreConnectors = opt.ignoreConnectors || IGNORED_CONNECTORS;
  if (JUMP_TYPES.indexOf(jumpType) === -1) {
    jumpType = JUMP_TYPES[0];
  }
  var paper = this.paper;
  var graph = paper.model;
  var allLinks = graph.getLinks();
  if (allLinks.length === 1) {
    return buildPath(createLines(sourcePoint, targetPoint, route), jumpSize, jumpType, radius);
  }
  var thisModel = this.model;
  var thisIndex = allLinks.indexOf(thisModel);
  var defaultConnector = paper.options.defaultConnector || {};
  var links = allLinks.filter(function(link, idx) {
    var connector = link.get("connector") || defaultConnector;
    if (toArray(ignoreConnectors).includes(connector.name)) {
      return false;
    }
    if (idx > thisIndex) {
      return connector.name !== "jumpover";
    }
    return true;
  });
  var linkViews = links.map(function(link) {
    return paper.findViewByModel(link);
  });
  var thisLines = createLines(sourcePoint, targetPoint, route);
  var linkLines = linkViews.map(function(linkView) {
    if (linkView == null) {
      return [];
    }
    if (linkView === this) {
      return thisLines;
    }
    return createLines(linkView.sourcePoint, linkView.targetPoint, linkView.route);
  }, this);
  var jumpingLines = thisLines.reduce(function(resultLines, thisLine) {
    var intersections = links.reduce(function(res, link, i) {
      if (link !== thisModel) {
        const linkLinesToTest = linkLines[i].slice();
        const overlapIndex = linkLinesToTest.findIndex((line3) => overlapExists(thisLine, line3));
        if (overlapIndex > -1 && thisLine.containsPoint(linkLinesToTest[overlapIndex].end)) {
          linkLinesToTest.splice(overlapIndex + 1, 1);
        }
        const lineIntersections = findLineIntersections(thisLine, linkLinesToTest);
        res.push.apply(res, lineIntersections);
      }
      return res;
    }, []).sort(function(a, b) {
      return sortPoints(thisLine.start, a) - sortPoints(thisLine.start, b);
    });
    if (intersections.length > 0) {
      resultLines.push.apply(resultLines, createJumps(thisLine, intersections, jumpSize));
    } else {
      resultLines.push(thisLine);
    }
    return resultLines;
  }, []);
  var path = buildPath(jumpingLines, jumpSize, jumpType, radius);
  return raw ? path : path.serialize();
};

// node_modules/jointjs/src/connectors/normal.mjs
var normal2 = function(sourcePoint, targetPoint, route = [], opt = {}) {
  const {
    raw
  } = opt;
  const localOpt = {
    cornerType: "point",
    raw
  };
  return straight(sourcePoint, targetPoint, route, localOpt);
};

// node_modules/jointjs/src/connectors/rounded.mjs
var CORNER_RADIUS2 = 10;
var PRECISION2 = 0;
var rounded = function(sourcePoint, targetPoint, route = [], opt = {}) {
  const {
    radius = CORNER_RADIUS2,
    raw
  } = opt;
  const localOpt = {
    cornerType: "cubic",
    cornerRadius: radius,
    precision: PRECISION2,
    raw
  };
  return straight(sourcePoint, targetPoint, route, localOpt);
};

// node_modules/jointjs/src/connectors/smooth.mjs
var smooth = function(sourcePoint, targetPoint, route, opt) {
  var raw = opt && opt.raw;
  var path;
  if (route && route.length !== 0) {
    var points = [sourcePoint].concat(route).concat([targetPoint]);
    var curves = Curve.throughPoints(points);
    path = new Path(curves);
  } else {
    path = new Path();
    var segment;
    segment = Path.createSegment("M", sourcePoint);
    path.appendSegment(segment);
    if (Math.abs(sourcePoint.x - targetPoint.x) >= Math.abs(sourcePoint.y - targetPoint.y)) {
      var controlPointX = (sourcePoint.x + targetPoint.x) / 2;
      segment = Path.createSegment("C", controlPointX, sourcePoint.y, controlPointX, targetPoint.y, targetPoint.x, targetPoint.y);
      path.appendSegment(segment);
    } else {
      var controlPointY = (sourcePoint.y + targetPoint.y) / 2;
      segment = Path.createSegment("C", sourcePoint.x, controlPointY, targetPoint.x, controlPointY, targetPoint.x, targetPoint.y);
      path.appendSegment(segment);
    }
  }
  return raw ? path : path.serialize();
};

// node_modules/jointjs/src/connectors/curve.mjs
var Directions2 = {
  AUTO: "auto",
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  CLOSEST_POINT: "closest-point",
  OUTWARDS: "outwards"
};
var TangentDirections = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
  AUTO: "auto",
  CLOSEST_POINT: "closest-point",
  OUTWARDS: "outwards"
};
var curve = function(sourcePoint, targetPoint, route = [], opt = {}, linkView) {
  const raw = Boolean(opt.raw);
  const {
    direction = Directions2.AUTO,
    precision = 3
  } = opt;
  const options = {
    coeff: opt.distanceCoefficient || 0.6,
    angleTangentCoefficient: opt.angleTangentCoefficient || 80,
    tau: opt.tension || 0.5,
    sourceTangent: opt.sourceTangent ? new Point(opt.sourceTangent) : null,
    targetTangent: opt.targetTangent ? new Point(opt.targetTangent) : null,
    rotate: Boolean(opt.rotate)
  };
  if (typeof opt.sourceDirection === "string") options.sourceDirection = opt.sourceDirection;
  else if (typeof opt.sourceDirection === "number") options.sourceDirection = new Point(1, 0).rotate(null, opt.sourceDirection);
  else options.sourceDirection = opt.sourceDirection ? new Point(opt.sourceDirection).normalize() : null;
  if (typeof opt.targetDirection === "string") options.targetDirection = opt.targetDirection;
  else if (typeof opt.targetDirection === "number") options.targetDirection = new Point(1, 0).rotate(null, opt.targetDirection);
  else options.targetDirection = opt.targetDirection ? new Point(opt.targetDirection).normalize() : null;
  const completeRoute = [sourcePoint, ...route, targetPoint].map((p) => new Point(p));
  let sourceTangent;
  if (options.sourceTangent) {
    sourceTangent = options.sourceTangent;
  } else {
    const sourceDirection = getSourceTangentDirection(linkView, completeRoute, direction, options);
    const tangentLength = completeRoute[0].distance(completeRoute[1]) * options.coeff;
    const pointsVector = completeRoute[1].difference(completeRoute[0]).normalize();
    const angle = angleBetweenVectors(sourceDirection, pointsVector);
    if (angle > Math.PI / 4) {
      const updatedLength = tangentLength + (angle - Math.PI / 4) * options.angleTangentCoefficient;
      sourceTangent = sourceDirection.clone().scale(updatedLength, updatedLength);
    } else {
      sourceTangent = sourceDirection.clone().scale(tangentLength, tangentLength);
    }
  }
  let targetTangent;
  if (options.targetTangent) {
    targetTangent = options.targetTangent;
  } else {
    const targetDirection = getTargetTangentDirection(linkView, completeRoute, direction, options);
    const last2 = completeRoute.length - 1;
    const tangentLength = completeRoute[last2 - 1].distance(completeRoute[last2]) * options.coeff;
    const pointsVector = completeRoute[last2 - 1].difference(completeRoute[last2]).normalize();
    const angle = angleBetweenVectors(targetDirection, pointsVector);
    if (angle > Math.PI / 4) {
      const updatedLength = tangentLength + (angle - Math.PI / 4) * options.angleTangentCoefficient;
      targetTangent = targetDirection.clone().scale(updatedLength, updatedLength);
    } else {
      targetTangent = targetDirection.clone().scale(tangentLength, tangentLength);
    }
  }
  const catmullRomCurves = createCatmullRomCurves(completeRoute, sourceTangent, targetTangent, options);
  const bezierCurves = catmullRomCurves.map((curve2) => catmullRomToBezier(curve2, options));
  const path = new Path(bezierCurves).round(precision);
  return raw ? path : path.serialize();
};
curve.Directions = Directions2;
curve.TangentDirections = TangentDirections;
function getHorizontalSourceDirection(linkView, route, options) {
  const {
    sourceBBox
  } = linkView;
  let sourceSide;
  let rotation;
  if (!linkView.sourceView) {
    if (sourceBBox.x > route[1].x) sourceSide = "right";
    else sourceSide = "left";
  } else {
    rotation = linkView.sourceView.model.angle();
    if (options.rotate && rotation) {
      const unrotatedBBox = linkView.sourceView.getNodeUnrotatedBBox(linkView.sourceView.el);
      const sourcePoint = route[0].clone();
      sourcePoint.rotate(sourceBBox.center(), rotation);
      sourceSide = unrotatedBBox.sideNearestToPoint(sourcePoint);
    } else {
      sourceSide = sourceBBox.sideNearestToPoint(route[0]);
    }
  }
  let direction;
  switch (sourceSide) {
    case "left":
      direction = new Point(-1, 0);
      break;
    case "right":
    default:
      direction = new Point(1, 0);
      break;
  }
  if (options.rotate && rotation) {
    direction.rotate(null, -rotation);
  }
  return direction;
}
function getHorizontalTargetDirection(linkView, route, options) {
  const {
    targetBBox
  } = linkView;
  let targetSide;
  let rotation;
  if (!linkView.targetView) {
    if (targetBBox.x > route[route.length - 2].x) targetSide = "left";
    else targetSide = "right";
  } else {
    rotation = linkView.targetView.model.angle();
    if (options.rotate && rotation) {
      const unrotatedBBox = linkView.targetView.getNodeUnrotatedBBox(linkView.targetView.el);
      const targetPoint = route[route.length - 1].clone();
      targetPoint.rotate(targetBBox.center(), rotation);
      targetSide = unrotatedBBox.sideNearestToPoint(targetPoint);
    } else {
      targetSide = targetBBox.sideNearestToPoint(route[route.length - 1]);
    }
  }
  let direction;
  switch (targetSide) {
    case "left":
      direction = new Point(-1, 0);
      break;
    case "right":
    default:
      direction = new Point(1, 0);
      break;
  }
  if (options.rotate && rotation) {
    direction.rotate(null, -rotation);
  }
  return direction;
}
function getVerticalSourceDirection(linkView, route, options) {
  const {
    sourceBBox
  } = linkView;
  let sourceSide;
  let rotation;
  if (!linkView.sourceView) {
    if (sourceBBox.y > route[1].y) sourceSide = "bottom";
    else sourceSide = "top";
  } else {
    rotation = linkView.sourceView.model.angle();
    if (options.rotate && rotation) {
      const unrotatedBBox = linkView.sourceView.getNodeUnrotatedBBox(linkView.sourceView.el);
      const sourcePoint = route[0].clone();
      sourcePoint.rotate(sourceBBox.center(), rotation);
      sourceSide = unrotatedBBox.sideNearestToPoint(sourcePoint);
    } else {
      sourceSide = sourceBBox.sideNearestToPoint(route[0]);
    }
  }
  let direction;
  switch (sourceSide) {
    case "top":
      direction = new Point(0, -1);
      break;
    case "bottom":
    default:
      direction = new Point(0, 1);
      break;
  }
  if (options.rotate && rotation) {
    direction.rotate(null, -rotation);
  }
  return direction;
}
function getVerticalTargetDirection(linkView, route, options) {
  const {
    targetBBox
  } = linkView;
  let targetSide;
  let rotation;
  if (!linkView.targetView) {
    if (targetBBox.y > route[route.length - 2].y) targetSide = "top";
    else targetSide = "bottom";
  } else {
    rotation = linkView.targetView.model.angle();
    if (options.rotate && rotation) {
      const unrotatedBBox = linkView.targetView.getNodeUnrotatedBBox(linkView.targetView.el);
      const targetPoint = route[route.length - 1].clone();
      targetPoint.rotate(targetBBox.center(), rotation);
      targetSide = unrotatedBBox.sideNearestToPoint(targetPoint);
    } else {
      targetSide = targetBBox.sideNearestToPoint(route[route.length - 1]);
    }
  }
  let direction;
  switch (targetSide) {
    case "top":
      direction = new Point(0, -1);
      break;
    case "bottom":
    default:
      direction = new Point(0, 1);
      break;
  }
  if (options.rotate && rotation) {
    direction.rotate(null, -rotation);
  }
  return direction;
}
function getAutoSourceDirection(linkView, route, options) {
  const {
    sourceBBox
  } = linkView;
  let sourceSide;
  let rotation;
  if (!linkView.sourceView) {
    sourceSide = sourceBBox.sideNearestToPoint(route[1]);
  } else {
    rotation = linkView.sourceView.model.angle();
    if (options.rotate && rotation) {
      const unrotatedBBox = linkView.sourceView.getNodeUnrotatedBBox(linkView.sourceView.el);
      const sourcePoint = route[0].clone();
      sourcePoint.rotate(sourceBBox.center(), rotation);
      sourceSide = unrotatedBBox.sideNearestToPoint(sourcePoint);
    } else {
      sourceSide = sourceBBox.sideNearestToPoint(route[0]);
    }
  }
  let direction;
  switch (sourceSide) {
    case "top":
      direction = new Point(0, -1);
      break;
    case "bottom":
      direction = new Point(0, 1);
      break;
    case "right":
      direction = new Point(1, 0);
      break;
    case "left":
      direction = new Point(-1, 0);
      break;
  }
  if (options.rotate && rotation) {
    direction.rotate(null, -rotation);
  }
  return direction;
}
function getAutoTargetDirection(linkView, route, options) {
  const {
    targetBBox
  } = linkView;
  let targetSide;
  let rotation;
  if (!linkView.targetView) {
    targetSide = targetBBox.sideNearestToPoint(route[route.length - 2]);
  } else {
    rotation = linkView.targetView.model.angle();
    if (options.rotate && rotation) {
      const unrotatedBBox = linkView.targetView.getNodeUnrotatedBBox(linkView.targetView.el);
      const targetPoint = route[route.length - 1].clone();
      targetPoint.rotate(targetBBox.center(), rotation);
      targetSide = unrotatedBBox.sideNearestToPoint(targetPoint);
    } else {
      targetSide = targetBBox.sideNearestToPoint(route[route.length - 1]);
    }
  }
  let direction;
  switch (targetSide) {
    case "top":
      direction = new Point(0, -1);
      break;
    case "bottom":
      direction = new Point(0, 1);
      break;
    case "right":
      direction = new Point(1, 0);
      break;
    case "left":
      direction = new Point(-1, 0);
      break;
  }
  if (options.rotate && rotation) {
    direction.rotate(null, -rotation);
  }
  return direction;
}
function getClosestPointSourceDirection(linkView, route, options) {
  return route[1].difference(route[0]).normalize();
}
function getClosestPointTargetDirection(linkView, route, options) {
  const last2 = route.length - 1;
  return route[last2 - 1].difference(route[last2]).normalize();
}
function getOutwardsSourceDirection(linkView, route, options) {
  const {
    sourceBBox
  } = linkView;
  const sourceCenter = sourceBBox.center();
  return route[0].difference(sourceCenter).normalize();
}
function getOutwardsTargetDirection(linkView, route, options) {
  const {
    targetBBox
  } = linkView;
  const targetCenter = targetBBox.center();
  return route[route.length - 1].difference(targetCenter).normalize();
}
function getSourceTangentDirection(linkView, route, direction, options) {
  if (options.sourceDirection) {
    switch (options.sourceDirection) {
      case TangentDirections.UP:
        return new Point(0, -1);
      case TangentDirections.DOWN:
        return new Point(0, 1);
      case TangentDirections.LEFT:
        return new Point(-1, 0);
      case TangentDirections.RIGHT:
        return new Point(1, 0);
      case TangentDirections.AUTO:
        return getAutoSourceDirection(linkView, route, options);
      case TangentDirections.CLOSEST_POINT:
        return getClosestPointSourceDirection(linkView, route, options);
      case TangentDirections.OUTWARDS:
        return getOutwardsSourceDirection(linkView, route, options);
      default:
        return options.sourceDirection;
    }
  }
  switch (direction) {
    case Directions2.HORIZONTAL:
      return getHorizontalSourceDirection(linkView, route, options);
    case Directions2.VERTICAL:
      return getVerticalSourceDirection(linkView, route, options);
    case Directions2.CLOSEST_POINT:
      return getClosestPointSourceDirection(linkView, route, options);
    case Directions2.OUTWARDS:
      return getOutwardsSourceDirection(linkView, route, options);
    case Directions2.AUTO:
    default:
      return getAutoSourceDirection(linkView, route, options);
  }
}
function getTargetTangentDirection(linkView, route, direction, options) {
  if (options.targetDirection) {
    switch (options.targetDirection) {
      case TangentDirections.UP:
        return new Point(0, -1);
      case TangentDirections.DOWN:
        return new Point(0, 1);
      case TangentDirections.LEFT:
        return new Point(-1, 0);
      case TangentDirections.RIGHT:
        return new Point(1, 0);
      case TangentDirections.AUTO:
        return getAutoTargetDirection(linkView, route, options);
      case TangentDirections.CLOSEST_POINT:
        return getClosestPointTargetDirection(linkView, route, options);
      case TangentDirections.OUTWARDS:
        return getOutwardsTargetDirection(linkView, route, options);
      default:
        return options.targetDirection;
    }
  }
  switch (direction) {
    case Directions2.HORIZONTAL:
      return getHorizontalTargetDirection(linkView, route, options);
    case Directions2.VERTICAL:
      return getVerticalTargetDirection(linkView, route, options);
    case Directions2.CLOSEST_POINT:
      return getClosestPointTargetDirection(linkView, route, options);
    case Directions2.OUTWARDS:
      return getOutwardsTargetDirection(linkView, route, options);
    case Directions2.AUTO:
    default:
      return getAutoTargetDirection(linkView, route, options);
  }
}
function rotateVector(vector, angle) {
  const cos4 = Math.cos(angle);
  const sin4 = Math.sin(angle);
  const x = cos4 * vector.x - sin4 * vector.y;
  const y = sin4 * vector.x + cos4 * vector.y;
  vector.x = x;
  vector.y = y;
}
function angleBetweenVectors(v1, v2) {
  let cos4 = v1.dot(v2) / (v1.magnitude() * v2.magnitude());
  if (cos4 < -1) cos4 = -1;
  if (cos4 > 1) cos4 = 1;
  return Math.acos(cos4);
}
function determinant(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
}
function createCatmullRomCurves(points, sourceTangent, targetTangent, options) {
  const {
    tau,
    coeff
  } = options;
  const distances = [];
  const tangents = [];
  const catmullRomCurves = [];
  const n = points.length - 1;
  for (let i = 0; i < n; i++) {
    distances[i] = points[i].distance(points[i + 1]);
  }
  tangents[0] = sourceTangent;
  tangents[n] = targetTangent;
  for (let i = 1; i < n; i++) {
    let tpPrev;
    let tpNext;
    if (i === 1) {
      tpPrev = points[i - 1].clone().offset(tangents[i - 1].x, tangents[i - 1].y);
    } else {
      tpPrev = points[i - 1].clone();
    }
    if (i === n - 1) {
      tpNext = points[i + 1].clone().offset(tangents[i + 1].x, tangents[i + 1].y);
    } else {
      tpNext = points[i + 1].clone();
    }
    const v1 = tpPrev.difference(points[i]).normalize();
    const v2 = tpNext.difference(points[i]).normalize();
    const vAngle = angleBetweenVectors(v1, v2);
    let rot = (Math.PI - vAngle) / 2;
    let t;
    const vectorDeterminant = determinant(v1, v2);
    let pointsDeterminant;
    pointsDeterminant = determinant(points[i].difference(points[i + 1]), points[i].difference(points[i - 1]));
    if (vectorDeterminant < 0) {
      rot = -rot;
    }
    if (vAngle < Math.PI / 2 && (rot < 0 && pointsDeterminant < 0 || rot > 0 && pointsDeterminant > 0)) {
      rot = rot - Math.PI;
    }
    t = v2.clone();
    rotateVector(t, rot);
    const t1 = t.clone();
    const t2 = t.clone();
    const scaleFactor1 = distances[i - 1] * coeff;
    const scaleFactor2 = distances[i] * coeff;
    t1.scale(scaleFactor1, scaleFactor1);
    t2.scale(scaleFactor2, scaleFactor2);
    tangents[i] = [t1, t2];
  }
  for (let i = 0; i < n; i++) {
    let p0;
    let p3;
    if (i === 0) {
      p0 = points[i + 1].difference(tangents[i].x / tau, tangents[i].y / tau);
    } else {
      p0 = points[i + 1].difference(tangents[i][1].x / tau, tangents[i][1].y / tau);
    }
    if (i === n - 1) {
      p3 = points[i].clone().offset(tangents[i + 1].x / tau, tangents[i + 1].y / tau);
    } else {
      p3 = points[i].difference(tangents[i + 1][0].x / tau, tangents[i + 1][0].y / tau);
    }
    catmullRomCurves[i] = [p0, points[i], points[i + 1], p3];
  }
  return catmullRomCurves;
}
function catmullRomToBezier(points, options) {
  const {
    tau
  } = options;
  const bcp1 = new Point();
  bcp1.x = points[1].x + (points[2].x - points[0].x) / (6 * tau);
  bcp1.y = points[1].y + (points[2].y - points[0].y) / (6 * tau);
  const bcp2 = new Point();
  bcp2.x = points[2].x + (points[3].x - points[1].x) / (6 * tau);
  bcp2.y = points[2].y + (points[3].y - points[1].y) / (6 * tau);
  return new Curve(points[1], bcp1, bcp2, points[2]);
}

// node_modules/jointjs/src/dia/LinkView.mjs
var import_jquery5 = __toESM(require_jquery(), 1);
var Flags3 = {
  TOOLS: CellView.Flags.TOOLS,
  RENDER: "RENDER",
  UPDATE: "UPDATE",
  LEGACY_TOOLS: "LEGACY_TOOLS",
  LABELS: "LABELS",
  VERTICES: "VERTICES",
  SOURCE: "SOURCE",
  TARGET: "TARGET",
  CONNECTOR: "CONNECTOR"
};
var LinkView = CellView.extend({
  className: function() {
    var classNames = CellView.prototype.className.apply(this).split(" ");
    classNames.push("link");
    return classNames.join(" ");
  },
  options: {
    shortLinkLength: 105,
    doubleLinkTools: false,
    longLinkLength: 155,
    linkToolsOffset: 40,
    doubleLinkToolsOffset: 65,
    sampleInterval: 50
  },
  _labelCache: null,
  _labelSelectors: null,
  _markerCache: null,
  _V: null,
  _dragData: null,
  // deprecated
  metrics: null,
  decimalsRounding: 2,
  initialize: function() {
    CellView.prototype.initialize.apply(this, arguments);
    this._labelCache = {};
    this._labelSelectors = {};
    this._markerCache = {};
    this._V = {};
    this.cleanNodesCache();
  },
  presentationAttributes: {
    markup: [Flags3.RENDER],
    attrs: [Flags3.UPDATE],
    router: [Flags3.UPDATE],
    connector: [Flags3.CONNECTOR],
    smooth: [Flags3.UPDATE],
    manhattan: [Flags3.UPDATE],
    toolMarkup: [Flags3.LEGACY_TOOLS],
    labels: [Flags3.LABELS],
    labelMarkup: [Flags3.LABELS],
    vertices: [Flags3.VERTICES, Flags3.UPDATE],
    vertexMarkup: [Flags3.VERTICES],
    source: [Flags3.SOURCE, Flags3.UPDATE],
    target: [Flags3.TARGET, Flags3.UPDATE]
  },
  initFlag: [Flags3.RENDER, Flags3.SOURCE, Flags3.TARGET, Flags3.TOOLS],
  UPDATE_PRIORITY: 1,
  confirmUpdate: function(flags, opt) {
    opt || (opt = {});
    if (this.hasFlag(flags, Flags3.SOURCE)) {
      if (!this.updateEndProperties("source")) return flags;
      flags = this.removeFlag(flags, Flags3.SOURCE);
    }
    if (this.hasFlag(flags, Flags3.TARGET)) {
      if (!this.updateEndProperties("target")) return flags;
      flags = this.removeFlag(flags, Flags3.TARGET);
    }
    const {
      paper,
      sourceView,
      targetView
    } = this;
    if (paper && (sourceView && !paper.isViewMounted(sourceView) || targetView && !paper.isViewMounted(targetView))) {
      return flags;
    }
    if (this.hasFlag(flags, Flags3.RENDER)) {
      this.render();
      this.updateHighlighters(true);
      this.updateTools(opt);
      flags = this.removeFlag(flags, [Flags3.RENDER, Flags3.UPDATE, Flags3.VERTICES, Flags3.LABELS, Flags3.TOOLS, Flags3.LEGACY_TOOLS, Flags3.CONNECTOR]);
      return flags;
    }
    let updateHighlighters = false;
    if (this.hasFlag(flags, Flags3.VERTICES)) {
      this.renderVertexMarkers();
      flags = this.removeFlag(flags, Flags3.VERTICES);
    }
    const {
      model
    } = this;
    const {
      attributes: attributes2
    } = model;
    let updateLabels = this.hasFlag(flags, Flags3.LABELS);
    let updateLegacyTools = this.hasFlag(flags, Flags3.LEGACY_TOOLS);
    if (updateLabels) {
      this.onLabelsChange(model, attributes2.labels, opt);
      flags = this.removeFlag(flags, Flags3.LABELS);
      updateHighlighters = true;
    }
    if (updateLegacyTools) {
      this.renderTools();
      flags = this.removeFlag(flags, Flags3.LEGACY_TOOLS);
    }
    const updateAll = this.hasFlag(flags, Flags3.UPDATE);
    const updateConnector = this.hasFlag(flags, Flags3.CONNECTOR);
    if (updateAll || updateConnector) {
      if (!updateAll) {
        this.updatePath();
        this.updateDOM();
      } else if (opt.translateBy && model.isRelationshipEmbeddedIn(opt.translateBy)) {
        this.translate(opt.tx, opt.ty);
      } else {
        this.update();
      }
      this.updateTools(opt);
      flags = this.removeFlag(flags, [Flags3.UPDATE, Flags3.TOOLS, Flags3.CONNECTOR]);
      updateLabels = false;
      updateLegacyTools = false;
      updateHighlighters = true;
    }
    if (updateLabels) {
      this.updateLabelPositions();
    }
    if (updateLegacyTools) {
      this.updateToolsPosition();
    }
    if (updateHighlighters) {
      this.updateHighlighters();
    }
    if (this.hasFlag(flags, Flags3.TOOLS)) {
      this.updateTools(opt);
      flags = this.removeFlag(flags, Flags3.TOOLS);
    }
    return flags;
  },
  requestConnectionUpdate: function(opt) {
    this.requestUpdate(this.getFlag(Flags3.UPDATE), opt);
  },
  isLabelsRenderRequired: function(opt = {}) {
    const previousLabels = this.model.previous("labels");
    if (!previousLabels) return true;
    if ("propertyPathArray" in opt && "propertyValue" in opt) {
      var pathArray = opt.propertyPathArray || [];
      var pathLength = pathArray.length;
      if (pathLength > 1) {
        var labelExists = !!previousLabels[pathArray[1]];
        if (labelExists) {
          if (pathLength === 2) {
            return "markup" in Object(opt.propertyValue);
          } else if (pathArray[2] !== "markup") {
            return false;
          }
        }
      }
    }
    return true;
  },
  onLabelsChange: function(_link, _labels, opt) {
    if (this.isLabelsRenderRequired(opt)) {
      this.renderLabels();
    } else {
      this.updateLabels();
    }
  },
  // Rendering.
  // ----------
  render: function() {
    this.vel.empty();
    this.unmountLabels();
    this._V = {};
    this.renderMarkup();
    this.renderLabels();
    this.update();
    return this;
  },
  renderMarkup: function() {
    var link = this.model;
    var markup = link.get("markup") || link.markup;
    if (!markup) throw new Error("dia.LinkView: markup required");
    if (Array.isArray(markup)) return this.renderJSONMarkup(markup);
    if (typeof markup === "string") return this.renderStringMarkup(markup);
    throw new Error("dia.LinkView: invalid markup");
  },
  renderJSONMarkup: function(markup) {
    var doc = this.parseDOMJSON(markup, this.el);
    this.selectors = doc.selectors;
    this.vel.append(doc.fragment);
  },
  renderStringMarkup: function(markup) {
    var children = V_default(markup);
    if (!Array.isArray(children)) children = [children];
    var cache = this._V;
    for (var i = 0, n = children.length; i < n; i++) {
      var child = children[i];
      var className2 = child.attr("class");
      if (className2) {
        className2 = removeClassNamePrefix(className2);
        cache[import_jquery5.default.camelCase(className2)] = child;
      }
    }
    this.renderTools();
    this.renderVertexMarkers();
    this.renderArrowheadMarkers();
    this.vel.append(children);
  },
  _getLabelMarkup: function(labelMarkup2) {
    if (!labelMarkup2) return void 0;
    if (Array.isArray(labelMarkup2)) return this.parseDOMJSON(labelMarkup2, null);
    if (typeof labelMarkup2 === "string") return this._getLabelStringMarkup(labelMarkup2);
    throw new Error("dia.linkView: invalid label markup");
  },
  _getLabelStringMarkup: function(labelMarkup2) {
    var children = V_default(labelMarkup2);
    var fragment = document.createDocumentFragment();
    if (!Array.isArray(children)) {
      fragment.appendChild(children.node);
    } else {
      for (var i = 0, n = children.length; i < n; i++) {
        var currentChild = children[i].node;
        fragment.appendChild(currentChild);
      }
    }
    return {
      fragment,
      selectors: {}
    };
  },
  // Label markup fragment may come wrapped in <g class="label" />, or not.
  // If it doesn't, add the <g /> container here.
  _normalizeLabelMarkup: function(markup) {
    if (!markup) return void 0;
    var fragment = markup.fragment;
    if (!(markup.fragment instanceof DocumentFragment) || !markup.fragment.hasChildNodes()) throw new Error("dia.LinkView: invalid label markup.");
    var vNode;
    var childNodes = fragment.childNodes;
    if (childNodes.length > 1 || childNodes[0].nodeName.toUpperCase() !== "G") {
      vNode = V_default("g").append(fragment);
    } else {
      vNode = V_default(childNodes[0]);
    }
    vNode.addClass("label");
    return {
      node: vNode.node,
      selectors: markup.selectors
    };
  },
  renderLabels: function() {
    var cache = this._V;
    var vLabels = cache.labels;
    var labelCache = this._labelCache = {};
    var labelSelectors = this._labelSelectors = {};
    var model = this.model;
    var labels = model.attributes.labels || [];
    var labelsCount = labels.length;
    if (labelsCount === 0) {
      if (vLabels) vLabels.remove();
      return this;
    }
    if (vLabels) {
      vLabels.empty();
    } else {
      vLabels = cache.labels = V_default("g").addClass("labels");
      if (this.options.labelsLayer) {
        vLabels.addClass(addClassNamePrefix(result(this, "className")));
        vLabels.attr("model-id", model.id);
      }
    }
    for (var i = 0; i < labelsCount; i++) {
      var label = labels[i];
      var labelMarkup2 = this._normalizeLabelMarkup(this._getLabelMarkup(label.markup));
      var labelNode;
      var selectors;
      if (labelMarkup2) {
        labelNode = labelMarkup2.node;
        selectors = labelMarkup2.selectors;
      } else {
        var builtinDefaultLabel = model._builtins.defaultLabel;
        var builtinDefaultLabelMarkup = this._normalizeLabelMarkup(this._getLabelMarkup(builtinDefaultLabel.markup));
        var defaultLabel = model._getDefaultLabel();
        var defaultLabelMarkup = this._normalizeLabelMarkup(this._getLabelMarkup(defaultLabel.markup));
        var defaultMarkup = defaultLabelMarkup || builtinDefaultLabelMarkup;
        labelNode = defaultMarkup.node;
        selectors = defaultMarkup.selectors;
      }
      labelNode.setAttribute("label-idx", i);
      vLabels.append(labelNode);
      labelCache[i] = labelNode;
      var rootSelector = this.selector;
      if (selectors[rootSelector]) throw new Error("dia.LinkView: ambiguous label root selector.");
      selectors[rootSelector] = labelNode;
      labelSelectors[i] = selectors;
    }
    if (!vLabels.parent()) {
      this.mountLabels();
    }
    this.updateLabels();
    return this;
  },
  mountLabels: function() {
    const {
      el,
      paper,
      model,
      _V,
      options
    } = this;
    const {
      labels: vLabels
    } = _V;
    if (!vLabels || !model.hasLabels()) return;
    const {
      node
    } = vLabels;
    if (options.labelsLayer) {
      paper.getLayerView(options.labelsLayer).insertSortedNode(node, model.get("z"));
    } else {
      if (node.parentNode !== el) {
        el.appendChild(node);
      }
    }
  },
  unmountLabels: function() {
    const {
      options,
      _V
    } = this;
    if (!_V) return;
    const {
      labels: vLabels
    } = _V;
    if (vLabels && options.labelsLayer) {
      vLabels.remove();
    }
  },
  findLabelNode: function(labelIndex, selector) {
    const labelRoot = this._labelCache[labelIndex];
    if (!labelRoot) return null;
    const labelSelectors = this._labelSelectors[labelIndex];
    const [node = null] = this.findBySelector(selector, labelRoot, labelSelectors);
    return node;
  },
  // merge default label attrs into label attrs (or use built-in default label attrs if neither is provided)
  // keep `undefined` or `null` because `{}` means something else
  _mergeLabelAttrs: function(hasCustomMarkup, labelAttrs, defaultLabelAttrs, builtinDefaultLabelAttrs) {
    if (labelAttrs === null) return null;
    if (labelAttrs === void 0) {
      if (defaultLabelAttrs === null) return null;
      if (defaultLabelAttrs === void 0) {
        if (hasCustomMarkup) return void 0;
        return builtinDefaultLabelAttrs;
      }
      if (hasCustomMarkup) return defaultLabelAttrs;
      return merge({}, builtinDefaultLabelAttrs, defaultLabelAttrs);
    }
    if (hasCustomMarkup) return merge({}, defaultLabelAttrs, labelAttrs);
    return merge({}, builtinDefaultLabelAttrs, defaultLabelAttrs, labelAttrs);
  },
  // merge default label size into label size (no built-in default)
  // keep `undefined` or `null` because `{}` means something else
  _mergeLabelSize: function(labelSize, defaultLabelSize) {
    if (labelSize === null) return null;
    if (labelSize === void 0) {
      if (defaultLabelSize === null) return null;
      if (defaultLabelSize === void 0) return void 0;
      return defaultLabelSize;
    }
    return merge({}, defaultLabelSize, labelSize);
  },
  updateLabels: function() {
    if (!this._V.labels) return this;
    var model = this.model;
    var labels = model.get("labels") || [];
    var canLabelMove = this.can("labelMove");
    var builtinDefaultLabel = model._builtins.defaultLabel;
    var builtinDefaultLabelAttrs = builtinDefaultLabel.attrs;
    var defaultLabel = model._getDefaultLabel();
    var defaultLabelMarkup = defaultLabel.markup;
    var defaultLabelAttrs = defaultLabel.attrs;
    var defaultLabelSize = defaultLabel.size;
    for (var i = 0, n = labels.length; i < n; i++) {
      var labelNode = this._labelCache[i];
      labelNode.setAttribute("cursor", canLabelMove ? "move" : "default");
      var selectors = this._labelSelectors[i];
      var label = labels[i];
      var labelMarkup2 = label.markup;
      var labelAttrs = label.attrs;
      var labelSize = label.size;
      var attrs = this._mergeLabelAttrs(labelMarkup2 || defaultLabelMarkup, labelAttrs, defaultLabelAttrs, builtinDefaultLabelAttrs);
      var size = this._mergeLabelSize(labelSize, defaultLabelSize);
      this.updateDOMSubtreeAttributes(labelNode, attrs, {
        rootBBox: new Rect(size),
        selectors
      });
    }
    return this;
  },
  renderTools: function() {
    if (!this._V.linkTools) return this;
    var $tools = (0, import_jquery5.default)(this._V.linkTools.node).empty();
    var toolTemplate = template(this.model.get("toolMarkup") || this.model.toolMarkup);
    var tool = V_default(toolTemplate());
    $tools.append(tool.node);
    this._toolCache = tool;
    if (this.options.doubleLinkTools) {
      var tool2;
      if (this.model.get("doubleToolMarkup") || this.model.doubleToolMarkup) {
        toolTemplate = template(this.model.get("doubleToolMarkup") || this.model.doubleToolMarkup);
        tool2 = V_default(toolTemplate());
      } else {
        tool2 = tool.clone();
      }
      $tools.append(tool2.node);
      this._tool2Cache = tool2;
    }
    return this;
  },
  renderVertexMarkers: function() {
    if (!this._V.markerVertices) return this;
    var $markerVertices = (0, import_jquery5.default)(this._V.markerVertices.node).empty();
    var markupTemplate = template(this.model.get("vertexMarkup") || this.model.vertexMarkup);
    this.model.vertices().forEach(function(vertex, idx) {
      $markerVertices.append(V_default(markupTemplate(assign({
        idx
      }, vertex))).node);
    });
    return this;
  },
  renderArrowheadMarkers: function() {
    if (!this._V.markerArrowheads) return this;
    var $markerArrowheads = (0, import_jquery5.default)(this._V.markerArrowheads.node);
    $markerArrowheads.empty();
    var markupTemplate = template(this.model.get("arrowheadMarkup") || this.model.arrowheadMarkup);
    this._V.sourceArrowhead = V_default(markupTemplate({
      end: "source"
    }));
    this._V.targetArrowhead = V_default(markupTemplate({
      end: "target"
    }));
    $markerArrowheads.append(this._V.sourceArrowhead.node, this._V.targetArrowhead.node);
    return this;
  },
  // remove vertices that lie on (or nearly on) straight lines within the link
  // return the number of removed points
  removeRedundantLinearVertices: function(opt) {
    const SIMPLIFY_THRESHOLD = 1e-3;
    const link = this.model;
    const vertices = link.vertices();
    const routePoints = [this.sourceAnchor, ...vertices, this.targetAnchor];
    const numRoutePoints = routePoints.length;
    const polyline = new Polyline(routePoints);
    polyline.simplify({
      threshold: SIMPLIFY_THRESHOLD
    });
    const polylinePoints = polyline.points.map((point2) => point2.toJSON());
    const numPolylinePoints = polylinePoints.length;
    if (numRoutePoints === numPolylinePoints) return 0;
    link.vertices(polylinePoints.slice(1, numPolylinePoints - 1), opt);
    return numRoutePoints - numPolylinePoints;
  },
  updateDefaultConnectionPath: function() {
    var cache = this._V;
    if (cache.connection) {
      cache.connection.attr("d", this.getSerializedConnection());
    }
    if (cache.connectionWrap) {
      cache.connectionWrap.attr("d", this.getSerializedConnection());
    }
    if (cache.markerSource && cache.markerTarget) {
      this._translateAndAutoOrientArrows(cache.markerSource, cache.markerTarget);
    }
  },
  getEndView: function(type) {
    switch (type) {
      case "source":
        return this.sourceView || null;
      case "target":
        return this.targetView || null;
      default:
        throw new Error("dia.LinkView: type parameter required.");
    }
  },
  getEndAnchor: function(type) {
    switch (type) {
      case "source":
        return new Point(this.sourceAnchor);
      case "target":
        return new Point(this.targetAnchor);
      default:
        throw new Error("dia.LinkView: type parameter required.");
    }
  },
  getEndConnectionPoint: function(type) {
    switch (type) {
      case "source":
        return new Point(this.sourcePoint);
      case "target":
        return new Point(this.targetPoint);
      default:
        throw new Error("dia.LinkView: type parameter required.");
    }
  },
  getEndMagnet: function(type) {
    switch (type) {
      case "source":
        var sourceView = this.sourceView;
        if (!sourceView) break;
        return this.sourceMagnet || sourceView.el;
      case "target":
        var targetView = this.targetView;
        if (!targetView) break;
        return this.targetMagnet || targetView.el;
      default:
        throw new Error("dia.LinkView: type parameter required.");
    }
    return null;
  },
  // Updating.
  // ---------
  update: function() {
    this.updateRoute();
    this.updatePath();
    this.updateDOM();
    return this;
  },
  translate: function(tx = 0, ty = 0) {
    const {
      route,
      path
    } = this;
    if (!route || !path) return;
    const polyline = new Polyline(route);
    polyline.translate(tx, ty);
    this.route = polyline.points;
    this._translateConnectionPoints(tx, ty);
    path.translate(tx, ty);
    this.updateDOM();
  },
  updateDOM() {
    const {
      el,
      model,
      selectors
    } = this;
    this.cleanNodesCache();
    this.updateDOMSubtreeAttributes(el, model.attr(), {
      selectors
    });
    this.updateDefaultConnectionPath();
    this.updateLabelPositions();
    this.updateToolsPosition();
    this.updateArrowheadMarkers();
    this.options.perpendicular = null;
  },
  updateRoute: function() {
    const {
      model
    } = this;
    const vertices = model.vertices();
    const anchors = this.findAnchors(vertices);
    const sourceAnchor = this.sourceAnchor = anchors.source;
    const targetAnchor = this.targetAnchor = anchors.target;
    const route = this.findRoute(vertices);
    this.route = route;
    var connectionPoints = this.findConnectionPoints(route, sourceAnchor, targetAnchor);
    this.sourcePoint = connectionPoints.source;
    this.targetPoint = connectionPoints.target;
  },
  updatePath: function() {
    const {
      route,
      sourcePoint,
      targetPoint
    } = this;
    const markerPoints = this.findMarkerPoints(route, sourcePoint, targetPoint);
    const path = this.findPath(route, markerPoints.source || sourcePoint, markerPoints.target || targetPoint);
    this.path = path;
  },
  findMarkerPoints: function(route, sourcePoint, targetPoint) {
    var firstWaypoint = route[0];
    var lastWaypoint = route[route.length - 1];
    var cache = this._markerCache;
    var sourceMarkerPoint, targetMarkerPoint;
    if (this._V.markerSource) {
      cache.sourceBBox = cache.sourceBBox || this._V.markerSource.getBBox();
      sourceMarkerPoint = Point(sourcePoint).move(firstWaypoint || targetPoint, cache.sourceBBox.width * this._V.markerSource.scale().sx * -1).round();
    }
    if (this._V.markerTarget) {
      cache.targetBBox = cache.targetBBox || this._V.markerTarget.getBBox();
      targetMarkerPoint = Point(targetPoint).move(lastWaypoint || sourcePoint, cache.targetBBox.width * this._V.markerTarget.scale().sx * -1).round();
    }
    cache.sourcePoint = sourceMarkerPoint || sourcePoint.clone();
    cache.targetPoint = targetMarkerPoint || targetPoint.clone();
    return {
      source: sourceMarkerPoint,
      target: targetMarkerPoint
    };
  },
  findAnchorsOrdered: function(firstEndType, firstRef, secondEndType, secondRef) {
    var firstAnchor, secondAnchor;
    var firstAnchorRef, secondAnchorRef;
    var model = this.model;
    var firstDef = model.get(firstEndType);
    var secondDef = model.get(secondEndType);
    var firstView = this.getEndView(firstEndType);
    var secondView = this.getEndView(secondEndType);
    var firstMagnet = this.getEndMagnet(firstEndType);
    var secondMagnet = this.getEndMagnet(secondEndType);
    if (firstView) {
      if (firstRef) {
        firstAnchorRef = new Point(firstRef);
      } else if (secondView) {
        firstAnchorRef = secondMagnet;
      } else {
        firstAnchorRef = new Point(secondDef);
      }
      firstAnchor = this.getAnchor(firstDef.anchor, firstView, firstMagnet, firstAnchorRef, firstEndType);
    } else {
      firstAnchor = new Point(firstDef);
    }
    if (secondView) {
      secondAnchorRef = new Point(secondRef || firstAnchor);
      secondAnchor = this.getAnchor(secondDef.anchor, secondView, secondMagnet, secondAnchorRef, secondEndType);
    } else {
      secondAnchor = new Point(secondDef);
    }
    var res = {};
    res[firstEndType] = firstAnchor;
    res[secondEndType] = secondAnchor;
    return res;
  },
  findAnchors: function(vertices) {
    var model = this.model;
    var firstVertex = vertices[0];
    var lastVertex = vertices[vertices.length - 1];
    if (model.target().priority && !model.source().priority) {
      return this.findAnchorsOrdered("target", lastVertex, "source", firstVertex);
    }
    return this.findAnchorsOrdered("source", firstVertex, "target", lastVertex);
  },
  findConnectionPoints: function(route, sourceAnchor, targetAnchor) {
    var firstWaypoint = route[0];
    var lastWaypoint = route[route.length - 1];
    var model = this.model;
    var sourceDef = model.get("source");
    var targetDef = model.get("target");
    var sourceView = this.sourceView;
    var targetView = this.targetView;
    var paperOptions = this.paper.options;
    var sourceMagnet, targetMagnet;
    var sourcePoint;
    if (sourceView && !sourceView.isNodeConnection(this.sourceMagnet)) {
      sourceMagnet = this.sourceMagnet || sourceView.el;
      var sourceConnectionPointDef = sourceDef.connectionPoint || paperOptions.defaultConnectionPoint;
      var sourcePointRef = firstWaypoint || targetAnchor;
      var sourceLine = new Line(sourcePointRef, sourceAnchor);
      sourcePoint = this.getConnectionPoint(sourceConnectionPointDef, sourceView, sourceMagnet, sourceLine, "source");
    } else {
      sourcePoint = sourceAnchor;
    }
    var targetPoint;
    if (targetView && !targetView.isNodeConnection(this.targetMagnet)) {
      targetMagnet = this.targetMagnet || targetView.el;
      var targetConnectionPointDef = targetDef.connectionPoint || paperOptions.defaultConnectionPoint;
      var targetPointRef = lastWaypoint || sourceAnchor;
      var targetLine = new Line(targetPointRef, targetAnchor);
      targetPoint = this.getConnectionPoint(targetConnectionPointDef, targetView, targetMagnet, targetLine, "target");
    } else {
      targetPoint = targetAnchor;
    }
    return {
      source: sourcePoint,
      target: targetPoint
    };
  },
  getAnchor: function(anchorDef, cellView, magnet, ref, endType) {
    var isConnection = cellView.isNodeConnection(magnet);
    var paperOptions = this.paper.options;
    if (!anchorDef) {
      if (isConnection) {
        anchorDef = paperOptions.defaultLinkAnchor;
      } else {
        if (paperOptions.perpendicularLinks || this.options.perpendicular) {
          anchorDef = {
            name: "perpendicular"
          };
        } else {
          anchorDef = paperOptions.defaultAnchor;
        }
      }
    }
    if (!anchorDef) throw new Error("Anchor required.");
    var anchorFn;
    if (typeof anchorDef === "function") {
      anchorFn = anchorDef;
    } else {
      var anchorName = anchorDef.name;
      var anchorNamespace = isConnection ? "linkAnchorNamespace" : "anchorNamespace";
      anchorFn = paperOptions[anchorNamespace][anchorName];
      if (typeof anchorFn !== "function") throw new Error("Unknown anchor: " + anchorName);
    }
    var anchor2 = anchorFn.call(this, cellView, magnet, ref, anchorDef.args || {}, endType, this);
    if (!anchor2) return new Point();
    return anchor2.round(this.decimalsRounding);
  },
  getConnectionPoint: function(connectionPointDef, view, magnet, line3, endType) {
    var connectionPoint;
    var anchor2 = line3.end;
    var paperOptions = this.paper.options;
    if (typeof paperOptions.linkConnectionPoint === "function") {
      var linkConnectionMagnet = magnet === view.el ? void 0 : magnet;
      connectionPoint = paperOptions.linkConnectionPoint(this, view, linkConnectionMagnet, line3.start, endType);
      if (connectionPoint) return connectionPoint;
    }
    if (!connectionPointDef) return anchor2;
    var connectionPointFn;
    if (typeof connectionPointDef === "function") {
      connectionPointFn = connectionPointDef;
    } else {
      var connectionPointName = connectionPointDef.name;
      connectionPointFn = paperOptions.connectionPointNamespace[connectionPointName];
      if (typeof connectionPointFn !== "function") throw new Error("Unknown connection point: " + connectionPointName);
    }
    connectionPoint = connectionPointFn.call(this, line3, view, magnet, connectionPointDef.args || {}, endType, this);
    if (!connectionPoint) return anchor2;
    return connectionPoint.round(this.decimalsRounding);
  },
  _translateConnectionPoints: function(tx, ty) {
    var cache = this._markerCache;
    cache.sourcePoint.offset(tx, ty);
    cache.targetPoint.offset(tx, ty);
    this.sourcePoint.offset(tx, ty);
    this.targetPoint.offset(tx, ty);
    this.sourceAnchor.offset(tx, ty);
    this.targetAnchor.offset(tx, ty);
  },
  // combine default label position with built-in default label position
  _getDefaultLabelPositionProperty: function() {
    var model = this.model;
    var builtinDefaultLabel = model._builtins.defaultLabel;
    var builtinDefaultLabelPosition = builtinDefaultLabel.position;
    var defaultLabel = model._getDefaultLabel();
    var defaultLabelPosition = this._normalizeLabelPosition(defaultLabel.position);
    return merge({}, builtinDefaultLabelPosition, defaultLabelPosition);
  },
  // if label position is a number, normalize it to a position object
  // this makes sure that label positions can be merged properly
  _normalizeLabelPosition: function(labelPosition) {
    if (typeof labelPosition === "number") return {
      distance: labelPosition,
      offset: null,
      angle: 0,
      args: null
    };
    return labelPosition;
  },
  // expects normalized position properties
  // e.g. `this._normalizeLabelPosition(labelPosition)` and `this._getDefaultLabelPositionProperty()`
  _mergeLabelPositionProperty: function(normalizedLabelPosition, normalizedDefaultLabelPosition) {
    if (normalizedLabelPosition === null) return null;
    if (normalizedLabelPosition === void 0) {
      if (normalizedDefaultLabelPosition === null) return null;
      return normalizedDefaultLabelPosition;
    }
    return merge({}, normalizedDefaultLabelPosition, normalizedLabelPosition);
  },
  updateLabelPositions: function() {
    if (!this._V.labels) return this;
    var path = this.path;
    if (!path) return this;
    var model = this.model;
    var labels = model.get("labels") || [];
    if (!labels.length) return this;
    var defaultLabelPosition = this._getDefaultLabelPositionProperty();
    for (var idx = 0, n = labels.length; idx < n; idx++) {
      var labelNode = this._labelCache[idx];
      if (!labelNode) continue;
      var label = labels[idx];
      var labelPosition = this._normalizeLabelPosition(label.position);
      var position = this._mergeLabelPositionProperty(labelPosition, defaultLabelPosition);
      var transformationMatrix = this._getLabelTransformationMatrix(position);
      labelNode.setAttribute("transform", V_default.matrixToTransformString(transformationMatrix));
      this._cleanLabelMatrices(idx);
    }
    return this;
  },
  _cleanLabelMatrices: function(index) {
    const {
      metrics,
      _labelSelectors
    } = this;
    const selectors = _labelSelectors[index];
    if (!selectors) return;
    for (let selector in selectors) {
      const {
        id
      } = selectors[selector];
      if (id && id in metrics) delete metrics[id].magnetMatrix;
    }
  },
  updateToolsPosition: function() {
    if (!this._V.linkTools) return this;
    var scale2 = "";
    var offset = this.options.linkToolsOffset;
    var connectionLength2 = this.getConnectionLength();
    if (!Number.isNaN(connectionLength2)) {
      if (connectionLength2 < this.options.shortLinkLength) {
        scale2 = "scale(.5)";
        offset /= 2;
      }
      var toolPosition = this.getPointAtLength(offset);
      this._toolCache.attr("transform", "translate(" + toolPosition.x + ", " + toolPosition.y + ") " + scale2);
      if (this.options.doubleLinkTools && connectionLength2 >= this.options.longLinkLength) {
        var doubleLinkToolsOffset = this.options.doubleLinkToolsOffset || offset;
        toolPosition = this.getPointAtLength(connectionLength2 - doubleLinkToolsOffset);
        this._tool2Cache.attr("transform", "translate(" + toolPosition.x + ", " + toolPosition.y + ") " + scale2);
        this._tool2Cache.attr("display", "inline");
      } else if (this.options.doubleLinkTools) {
        this._tool2Cache.attr("display", "none");
      }
    }
    return this;
  },
  updateArrowheadMarkers: function() {
    if (!this._V.markerArrowheads) return this;
    if (import_jquery5.default.css(this._V.markerArrowheads.node, "display") === "none") return this;
    var sx = this.getConnectionLength() < this.options.shortLinkLength ? 0.5 : 1;
    this._V.sourceArrowhead.scale(sx);
    this._V.targetArrowhead.scale(sx);
    this._translateAndAutoOrientArrows(this._V.sourceArrowhead, this._V.targetArrowhead);
    return this;
  },
  updateEndProperties: function(endType) {
    const {
      model,
      paper
    } = this;
    const endViewProperty = `${endType}View`;
    const endDef = model.get(endType);
    const endId = endDef && endDef.id;
    if (!endId) {
      this[endViewProperty] = null;
      this.updateEndMagnet(endType);
      return true;
    }
    const endModel = paper.getModelById(endId);
    if (!endModel) throw new Error("LinkView: invalid " + endType + " cell.");
    const endView = endModel.findView(paper);
    if (!endView) {
      return false;
    }
    this[endViewProperty] = endView;
    this.updateEndMagnet(endType);
    return true;
  },
  updateEndMagnet: function(endType) {
    const endMagnetProperty = `${endType}Magnet`;
    const endView = this.getEndView(endType);
    if (endView) {
      let connectedMagnet = endView.getMagnetFromLinkEnd(this.model.get(endType));
      if (connectedMagnet === endView.el) connectedMagnet = null;
      this[endMagnetProperty] = connectedMagnet;
    } else {
      this[endMagnetProperty] = null;
    }
  },
  _translateAndAutoOrientArrows: function(sourceArrow, targetArrow) {
    var route = toArray(this.route);
    if (sourceArrow) {
      sourceArrow.translateAndAutoOrient(this.sourcePoint, route[0] || this.targetPoint, this.paper.cells);
    }
    if (targetArrow) {
      targetArrow.translateAndAutoOrient(this.targetPoint, route[route.length - 1] || this.sourcePoint, this.paper.cells);
    }
  },
  _getLabelPositionProperty: function(idx) {
    return this.model.label(idx).position || {};
  },
  _getLabelPositionAngle: function(idx) {
    var labelPosition = this._getLabelPositionProperty(idx);
    return labelPosition.angle || 0;
  },
  _getLabelPositionArgs: function(idx) {
    var labelPosition = this._getLabelPositionProperty(idx);
    return labelPosition.args;
  },
  _getDefaultLabelPositionArgs: function() {
    var defaultLabel = this.model._getDefaultLabel();
    var defaultLabelPosition = defaultLabel.position || {};
    return defaultLabelPosition.args;
  },
  // merge default label position args into label position args
  // keep `undefined` or `null` because `{}` means something else
  _mergeLabelPositionArgs: function(labelPositionArgs, defaultLabelPositionArgs) {
    if (labelPositionArgs === null) return null;
    if (labelPositionArgs === void 0) {
      if (defaultLabelPositionArgs === null) return null;
      return defaultLabelPositionArgs;
    }
    return merge({}, defaultLabelPositionArgs, labelPositionArgs);
  },
  // Add default label at given position at end of `labels` array.
  // Four signatures:
  // - obj, obj = point, opt
  // - obj, num, obj = point, angle, opt
  // - num, num, obj = x, y, opt
  // - num, num, num, obj = x, y, angle, opt
  // Assigns relative coordinates by default:
  // `opt.absoluteDistance` forces absolute coordinates.
  // `opt.reverseDistance` forces reverse absolute coordinates (if absoluteDistance = true).
  // `opt.absoluteOffset` forces absolute coordinates for offset.
  // Additional args:
  // `opt.keepGradient` auto-adjusts the angle of the label to match path gradient at position.
  // `opt.ensureLegibility` rotates labels so they are never upside-down.
  addLabel: function(p1, p2, p3, p4) {
    var localX;
    var localY;
    var localAngle = 0;
    var localOpt;
    if (typeof p1 !== "number") {
      localX = p1.x;
      localY = p1.y;
      if (typeof p2 === "number") {
        localAngle = p2;
        localOpt = p3;
      } else {
        localOpt = p2;
      }
    } else {
      localX = p1;
      localY = p2;
      if (typeof p3 === "number") {
        localAngle = p3;
        localOpt = p4;
      } else {
        localOpt = p3;
      }
    }
    var defaultLabelPositionArgs = this._getDefaultLabelPositionArgs();
    var labelPositionArgs = localOpt;
    var positionArgs = this._mergeLabelPositionArgs(labelPositionArgs, defaultLabelPositionArgs);
    var label = {
      position: this.getLabelPosition(localX, localY, localAngle, positionArgs)
    };
    var idx = -1;
    this.model.insertLabel(idx, label, localOpt);
    return idx;
  },
  // Add a new vertex at calculated index to the `vertices` array.
  addVertex: function(x, y, opt) {
    var isPointProvided = typeof x !== "number";
    var localX = isPointProvided ? x.x : x;
    var localY = isPointProvided ? x.y : y;
    var localOpt = isPointProvided ? y : opt;
    var vertex = {
      x: localX,
      y: localY
    };
    var idx = this.getVertexIndex(localX, localY);
    this.model.insertVertex(idx, vertex, localOpt);
    return idx;
  },
  // Send a token (an SVG element, usually a circle) along the connection path.
  // Example: `link.findView(paper).sendToken(V('circle', { r: 7, fill: 'green' }).node)`
  // `opt.duration` is optional and is a time in milliseconds that the token travels from the source to the target of the link. Default is `1000`.
  // `opt.directon` is optional and it determines whether the token goes from source to target or other way round (`reverse`)
  // `opt.connection` is an optional selector to the connection path.
  // `callback` is optional and is a function to be called once the token reaches the target.
  sendToken: function(token, opt, callback) {
    function onAnimationEnd(vToken2, callback2) {
      return function() {
        vToken2.remove();
        if (typeof callback2 === "function") {
          callback2();
        }
      };
    }
    var duration, isReversed, selector;
    if (isObject(opt)) {
      duration = opt.duration;
      isReversed = opt.direction === "reverse";
      selector = opt.connection;
    } else {
      duration = opt;
      isReversed = false;
      selector = null;
    }
    duration = duration || 1e3;
    var animationAttributes = {
      dur: duration + "ms",
      repeatCount: 1,
      calcMode: "linear",
      fill: "freeze"
    };
    if (isReversed) {
      animationAttributes.keyPoints = "1;0";
      animationAttributes.keyTimes = "0;1";
    }
    var vToken = V_default(token);
    var connection;
    if (typeof selector === "string") {
      connection = this.findBySelector(selector, this.el, this.selectors)[0];
    } else {
      var cache = this._V;
      connection = cache.connection ? cache.connection.node : this.el.querySelector("path");
    }
    if (!(connection instanceof SVGPathElement)) {
      throw new Error("dia.LinkView: token animation requires a valid connection path.");
    }
    vToken.appendTo(this.paper.cells).animateAlongPath(animationAttributes, connection);
    setTimeout(onAnimationEnd(vToken, callback), duration);
  },
  findRoute: function(vertices) {
    vertices || (vertices = []);
    var namespace = this.paper.options.routerNamespace || routers_exports;
    var router2 = this.model.router();
    var defaultRouter = this.paper.options.defaultRouter;
    if (!router2) {
      if (defaultRouter) router2 = defaultRouter;
      else return vertices.map(Point);
    }
    var routerFn = isFunction(router2) ? router2 : namespace[router2.name];
    if (!isFunction(routerFn)) {
      throw new Error('dia.LinkView: unknown router: "' + router2.name + '".');
    }
    var args = router2.args || {};
    var route = routerFn.call(
      this,
      // context
      vertices,
      // vertices
      args,
      // options
      this
      // linkView
    );
    if (!route) return vertices.map(Point);
    return route;
  },
  // Return the `d` attribute value of the `<path>` element representing the link
  // between `source` and `target`.
  findPath: function(route, sourcePoint, targetPoint) {
    var namespace = this.paper.options.connectorNamespace || connectors_exports;
    var connector = this.model.connector();
    var defaultConnector = this.paper.options.defaultConnector;
    if (!connector) {
      connector = defaultConnector || {};
    }
    var connectorFn = isFunction(connector) ? connector : namespace[connector.name];
    if (!isFunction(connectorFn)) {
      throw new Error('dia.LinkView: unknown connector: "' + connector.name + '".');
    }
    var args = clone(connector.args || {});
    args.raw = true;
    var path = connectorFn.call(
      this,
      // context
      sourcePoint,
      // start point
      targetPoint,
      // end point
      route,
      // vertices
      args,
      // options
      this
      // linkView
    );
    if (typeof path === "string") {
      path = new Path(V_default.normalizePathData(path));
    }
    return path;
  },
  // Public API.
  // -----------
  getConnection: function() {
    var path = this.path;
    if (!path) return null;
    return path.clone();
  },
  getSerializedConnection: function() {
    var path = this.path;
    if (!path) return null;
    var metrics = this.metrics;
    if (metrics.hasOwnProperty("data")) return metrics.data;
    var data = path.serialize();
    metrics.data = data;
    return data;
  },
  getConnectionSubdivisions: function() {
    var path = this.path;
    if (!path) return null;
    var metrics = this.metrics;
    if (metrics.hasOwnProperty("segmentSubdivisions")) return metrics.segmentSubdivisions;
    var subdivisions = path.getSegmentSubdivisions();
    metrics.segmentSubdivisions = subdivisions;
    return subdivisions;
  },
  getConnectionLength: function() {
    var path = this.path;
    if (!path) return 0;
    var metrics = this.metrics;
    if (metrics.hasOwnProperty("length")) return metrics.length;
    var length2 = path.length({
      segmentSubdivisions: this.getConnectionSubdivisions()
    });
    metrics.length = length2;
    return length2;
  },
  getPointAtLength: function(length2) {
    var path = this.path;
    if (!path) return null;
    return path.pointAtLength(length2, {
      segmentSubdivisions: this.getConnectionSubdivisions()
    });
  },
  getPointAtRatio: function(ratio) {
    var path = this.path;
    if (!path) return null;
    if (isPercentage(ratio)) ratio = parseFloat(ratio) / 100;
    return path.pointAt(ratio, {
      segmentSubdivisions: this.getConnectionSubdivisions()
    });
  },
  getTangentAtLength: function(length2) {
    var path = this.path;
    if (!path) return null;
    return path.tangentAtLength(length2, {
      segmentSubdivisions: this.getConnectionSubdivisions()
    });
  },
  getTangentAtRatio: function(ratio) {
    var path = this.path;
    if (!path) return null;
    return path.tangentAt(ratio, {
      segmentSubdivisions: this.getConnectionSubdivisions()
    });
  },
  getClosestPoint: function(point2) {
    var path = this.path;
    if (!path) return null;
    return path.closestPoint(point2, {
      segmentSubdivisions: this.getConnectionSubdivisions()
    });
  },
  getClosestPointLength: function(point2) {
    var path = this.path;
    if (!path) return null;
    return path.closestPointLength(point2, {
      segmentSubdivisions: this.getConnectionSubdivisions()
    });
  },
  getClosestPointRatio: function(point2) {
    var path = this.path;
    if (!path) return null;
    return path.closestPointNormalizedLength(point2, {
      segmentSubdivisions: this.getConnectionSubdivisions()
    });
  },
  // Get label position object based on two provided coordinates, x and y.
  // (Used behind the scenes when user moves labels around.)
  // Two signatures:
  // - num, num, obj = x, y, options
  // - num, num, num, obj = x, y, angle, options
  // Accepts distance/offset options = `absoluteDistance: boolean`, `reverseDistance: boolean`, `absoluteOffset: boolean`
  // - `absoluteOffset` is necessary in order to move beyond connection endpoints
  // Additional options = `keepGradient: boolean`, `ensureLegibility: boolean`
  getLabelPosition: function(x, y, p3, p4) {
    var position = {};
    var localAngle = 0;
    var localOpt;
    if (typeof p3 === "number") {
      localAngle = p3;
      localOpt = p4;
    } else {
      localOpt = p3;
    }
    if (localOpt) position.args = localOpt;
    var isDistanceRelative = !(localOpt && localOpt.absoluteDistance);
    var isDistanceAbsoluteReverse = localOpt && localOpt.absoluteDistance && localOpt.reverseDistance;
    var isOffsetAbsolute = localOpt && localOpt.absoluteOffset;
    var path = this.path;
    var pathOpt = {
      segmentSubdivisions: this.getConnectionSubdivisions()
    };
    var labelPoint = new Point(x, y);
    var t = path.closestPointT(labelPoint, pathOpt);
    var labelDistance = path.lengthAtT(t, pathOpt);
    if (isDistanceRelative) labelDistance = labelDistance / this.getConnectionLength() || 0;
    if (isDistanceAbsoluteReverse) labelDistance = -1 * (this.getConnectionLength() - labelDistance) || 1;
    position.distance = labelDistance;
    var tangent;
    if (!isOffsetAbsolute) tangent = path.tangentAtT(t);
    var labelOffset;
    if (tangent) {
      labelOffset = tangent.pointOffset(labelPoint);
    } else {
      var closestPoint = path.pointAtT(t);
      var labelOffsetDiff = labelPoint.difference(closestPoint);
      labelOffset = {
        x: labelOffsetDiff.x,
        y: labelOffsetDiff.y
      };
    }
    position.offset = labelOffset;
    position.angle = localAngle;
    return position;
  },
  _getLabelTransformationMatrix: function(labelPosition) {
    var labelDistance;
    var labelAngle = 0;
    var args = {};
    if (typeof labelPosition === "number") {
      labelDistance = labelPosition;
    } else if (typeof labelPosition.distance === "number") {
      args = labelPosition.args || {};
      labelDistance = labelPosition.distance;
      labelAngle = labelPosition.angle || 0;
    } else {
      throw new Error("dia.LinkView: invalid label position distance.");
    }
    var isDistanceRelative = labelDistance > 0 && labelDistance <= 1;
    var labelOffset = 0;
    var labelOffsetCoordinates = {
      x: 0,
      y: 0
    };
    if (labelPosition.offset) {
      var positionOffset = labelPosition.offset;
      if (typeof positionOffset === "number") labelOffset = positionOffset;
      if (positionOffset.x) labelOffsetCoordinates.x = positionOffset.x;
      if (positionOffset.y) labelOffsetCoordinates.y = positionOffset.y;
    }
    var isOffsetAbsolute = labelOffsetCoordinates.x !== 0 || labelOffsetCoordinates.y !== 0 || labelOffset === 0;
    var isKeepGradient = args.keepGradient;
    var isEnsureLegibility = args.ensureLegibility;
    var path = this.path;
    var pathOpt = {
      segmentSubdivisions: this.getConnectionSubdivisions()
    };
    var distance = isDistanceRelative ? labelDistance * this.getConnectionLength() : labelDistance;
    var tangent = path.tangentAtLength(distance, pathOpt);
    var translation;
    var angle = labelAngle;
    if (tangent) {
      if (isOffsetAbsolute) {
        translation = tangent.start.clone();
        translation.offset(labelOffsetCoordinates);
      } else {
        var normal3 = tangent.clone();
        normal3.rotate(tangent.start, -90);
        normal3.setLength(labelOffset);
        translation = normal3.end;
      }
      if (isKeepGradient) {
        angle = tangent.angle() + labelAngle;
        if (isEnsureLegibility) {
          angle = normalizeAngle((angle + 90) % 180 - 90);
        }
      }
    } else {
      translation = path.start.clone();
      if (isOffsetAbsolute) translation.offset(labelOffsetCoordinates);
    }
    return V_default.createSVGMatrix().translate(translation.x, translation.y).rotate(angle);
  },
  getLabelCoordinates: function(labelPosition) {
    var transformationMatrix = this._getLabelTransformationMatrix(labelPosition);
    return new Point(transformationMatrix.e, transformationMatrix.f);
  },
  getVertexIndex: function(x, y) {
    var model = this.model;
    var vertices = model.vertices();
    var vertexLength = this.getClosestPointLength(new Point(x, y));
    var idx = 0;
    for (var n = vertices.length; idx < n; idx++) {
      var currentVertex = vertices[idx];
      var currentVertexLength = this.getClosestPointLength(currentVertex);
      if (vertexLength < currentVertexLength) break;
    }
    return idx;
  },
  // Interaction. The controller part.
  // ---------------------------------
  notifyPointerdown(evt, x, y) {
    CellView.prototype.pointerdown.call(this, evt, x, y);
    this.notify("link:pointerdown", evt, x, y);
  },
  notifyPointermove(evt, x, y) {
    CellView.prototype.pointermove.call(this, evt, x, y);
    this.notify("link:pointermove", evt, x, y);
  },
  notifyPointerup(evt, x, y) {
    this.notify("link:pointerup", evt, x, y);
    CellView.prototype.pointerup.call(this, evt, x, y);
  },
  pointerdblclick: function(evt, x, y) {
    CellView.prototype.pointerdblclick.apply(this, arguments);
    this.notify("link:pointerdblclick", evt, x, y);
  },
  pointerclick: function(evt, x, y) {
    CellView.prototype.pointerclick.apply(this, arguments);
    this.notify("link:pointerclick", evt, x, y);
  },
  contextmenu: function(evt, x, y) {
    CellView.prototype.contextmenu.apply(this, arguments);
    this.notify("link:contextmenu", evt, x, y);
  },
  pointerdown: function(evt, x, y) {
    this.notifyPointerdown(evt, x, y);
    var className2 = evt.target.getAttribute("class");
    switch (className2) {
      case "marker-vertex":
        this.dragVertexStart(evt, x, y);
        return;
      case "marker-vertex-remove":
      case "marker-vertex-remove-area":
        this.dragVertexRemoveStart(evt, x, y);
        return;
      case "marker-arrowhead":
        this.dragArrowheadStart(evt, x, y);
        return;
      case "connection":
      case "connection-wrap":
        this.dragConnectionStart(evt, x, y);
        return;
      case "marker-source":
      case "marker-target":
        return;
    }
    this.dragStart(evt, x, y);
  },
  pointermove: function(evt, x, y) {
    var dragData = this._dragData;
    if (dragData) this.eventData(evt, dragData);
    var data = this.eventData(evt);
    switch (data.action) {
      case "vertex-move":
        this.dragVertex(evt, x, y);
        break;
      case "label-move":
        this.dragLabel(evt, x, y);
        break;
      case "arrowhead-move":
        this.dragArrowhead(evt, x, y);
        break;
      case "move":
        this.drag(evt, x, y);
        break;
    }
    if (dragData) assign(dragData, this.eventData(evt));
    this.notifyPointermove(evt, x, y);
  },
  pointerup: function(evt, x, y) {
    var dragData = this._dragData;
    if (dragData) {
      this.eventData(evt, dragData);
      this._dragData = null;
    }
    var data = this.eventData(evt);
    switch (data.action) {
      case "vertex-move":
        this.dragVertexEnd(evt, x, y);
        break;
      case "label-move":
        this.dragLabelEnd(evt, x, y);
        break;
      case "arrowhead-move":
        this.dragArrowheadEnd(evt, x, y);
        break;
      case "move":
        this.dragEnd(evt, x, y);
    }
    this.notifyPointerup(evt, x, y);
    this.checkMouseleave(evt);
  },
  mouseover: function(evt) {
    CellView.prototype.mouseover.apply(this, arguments);
    this.notify("link:mouseover", evt);
  },
  mouseout: function(evt) {
    CellView.prototype.mouseout.apply(this, arguments);
    this.notify("link:mouseout", evt);
  },
  mouseenter: function(evt) {
    CellView.prototype.mouseenter.apply(this, arguments);
    this.notify("link:mouseenter", evt);
  },
  mouseleave: function(evt) {
    CellView.prototype.mouseleave.apply(this, arguments);
    this.notify("link:mouseleave", evt);
  },
  mousewheel: function(evt, x, y, delta) {
    CellView.prototype.mousewheel.apply(this, arguments);
    this.notify("link:mousewheel", evt, x, y, delta);
  },
  onevent: function(evt, eventName, x, y) {
    var linkTool = V_default(evt.target).findParentByClass("link-tool", this.el);
    if (linkTool) {
      evt.stopPropagation();
      if (this.can("useLinkTools")) {
        if (eventName === "remove") {
          this.model.remove({
            ui: true
          });
          return;
        } else {
          this.notify(eventName, evt, x, y);
        }
      }
      this.notifyPointerdown(evt, x, y);
      this.paper.delegateDragEvents(this, evt.data);
    } else {
      CellView.prototype.onevent.apply(this, arguments);
    }
  },
  onlabel: function(evt, x, y) {
    this.notifyPointerdown(evt, x, y);
    this.dragLabelStart(evt, x, y);
    var stopPropagation = this.eventData(evt).stopPropagation;
    if (stopPropagation) evt.stopPropagation();
  },
  // Drag Start Handlers
  dragConnectionStart: function(evt, x, y) {
    if (!this.can("vertexAdd")) return;
    var vertexIdx = this.addVertex({
      x,
      y
    }, {
      ui: true
    });
    this.eventData(evt, {
      action: "vertex-move",
      vertexIdx
    });
  },
  dragLabelStart: function(evt, x, y) {
    if (this.can("labelMove")) {
      if (this.isDefaultInteractionPrevented(evt)) return;
      var labelNode = evt.currentTarget;
      var labelIdx = parseInt(labelNode.getAttribute("label-idx"), 10);
      var defaultLabelPosition = this._getDefaultLabelPositionProperty();
      var initialLabelPosition = this._normalizeLabelPosition(this._getLabelPositionProperty(labelIdx));
      var position = this._mergeLabelPositionProperty(initialLabelPosition, defaultLabelPosition);
      var coords = this.getLabelCoordinates(position);
      var dx = coords.x - x;
      var dy = coords.y - y;
      var positionAngle = this._getLabelPositionAngle(labelIdx);
      var labelPositionArgs = this._getLabelPositionArgs(labelIdx);
      var defaultLabelPositionArgs = this._getDefaultLabelPositionArgs();
      var positionArgs = this._mergeLabelPositionArgs(labelPositionArgs, defaultLabelPositionArgs);
      this.eventData(evt, {
        action: "label-move",
        labelIdx,
        dx,
        dy,
        positionAngle,
        positionArgs,
        stopPropagation: true
      });
    } else {
      this.eventData(evt, {
        stopPropagation: true
      });
    }
    this.paper.delegateDragEvents(this, evt.data);
  },
  dragVertexStart: function(evt, x, y) {
    if (!this.can("vertexMove")) return;
    var vertexNode = evt.target;
    var vertexIdx = parseInt(vertexNode.getAttribute("idx"), 10);
    this.eventData(evt, {
      action: "vertex-move",
      vertexIdx
    });
  },
  dragVertexRemoveStart: function(evt, x, y) {
    if (!this.can("vertexRemove")) return;
    var removeNode = evt.target;
    var vertexIdx = parseInt(removeNode.getAttribute("idx"), 10);
    this.model.removeVertex(vertexIdx);
  },
  dragArrowheadStart: function(evt, x, y) {
    if (!this.can("arrowheadMove")) return;
    var arrowheadNode = evt.target;
    var arrowheadType = arrowheadNode.getAttribute("end");
    var data = this.startArrowheadMove(arrowheadType, {
      ignoreBackwardsCompatibility: true
    });
    this.eventData(evt, data);
  },
  dragStart: function(evt, x, y) {
    if (this.isDefaultInteractionPrevented(evt)) return;
    if (!this.can("linkMove")) return;
    this.eventData(evt, {
      action: "move",
      dx: x,
      dy: y
    });
  },
  // Drag Handlers
  dragLabel: function(evt, x, y) {
    var data = this.eventData(evt);
    var label = {
      position: this.getLabelPosition(x + data.dx, y + data.dy, data.positionAngle, data.positionArgs)
    };
    if (this.paper.options.snapLabels) delete label.position.offset;
    const setOptions = {
      ui: true
    };
    if (this.paper.isAsync() && evt.type === "touchmove") {
      setOptions.async = false;
    }
    this.model.label(data.labelIdx, label, setOptions);
  },
  dragVertex: function(evt, x, y) {
    var data = this.eventData(evt);
    this.model.vertex(data.vertexIdx, {
      x,
      y
    }, {
      ui: true
    });
  },
  dragArrowhead: function(evt, x, y) {
    if (this.paper.options.snapLinks) {
      const isSnapped = this._snapArrowhead(evt, x, y);
      if (!isSnapped && this.paper.options.snapLinksSelf) {
        this._snapArrowheadSelf(evt, x, y);
      }
    } else {
      if (this.paper.options.snapLinksSelf) {
        this._snapArrowheadSelf(evt, x, y);
      } else {
        this._connectArrowhead(this.getEventTarget(evt), x, y, this.eventData(evt));
      }
    }
  },
  drag: function(evt, x, y) {
    var data = this.eventData(evt);
    this.model.translate(x - data.dx, y - data.dy, {
      ui: true
    });
    this.eventData(evt, {
      dx: x,
      dy: y
    });
  },
  // Drag End Handlers
  dragLabelEnd: function() {
  },
  dragVertexEnd: function() {
  },
  dragArrowheadEnd: function(evt, x, y) {
    var data = this.eventData(evt);
    var paper = this.paper;
    if (paper.options.snapLinks) {
      this._snapArrowheadEnd(data);
    } else {
      this._connectArrowheadEnd(data, x, y);
    }
    if (!paper.linkAllowed(this)) {
      this._disallow(data);
    } else {
      this._finishEmbedding(data);
      this._notifyConnectEvent(data, evt);
    }
    this._afterArrowheadMove(data);
  },
  dragEnd: function() {
  },
  _disallow: function(data) {
    switch (data.whenNotAllowed) {
      case "remove":
        this.model.remove({
          ui: true
        });
        break;
      case "revert":
      default:
        this.model.set(data.arrowhead, data.initialEnd, {
          ui: true
        });
        break;
    }
  },
  _finishEmbedding: function(data) {
    if (this.paper.options.embeddingMode && this.model.reparent()) {
      data.z = null;
    }
  },
  _notifyConnectEvent: function(data, evt) {
    var arrowhead = data.arrowhead;
    var initialEnd = data.initialEnd;
    var currentEnd = this.model.prop(arrowhead);
    var endChanged = currentEnd && !Link.endsEqual(initialEnd, currentEnd);
    if (endChanged) {
      var paper = this.paper;
      if (initialEnd.id) {
        this.notify("link:disconnect", evt, paper.findViewByModel(initialEnd.id), data.initialMagnet, arrowhead);
      }
      if (currentEnd.id) {
        this.notify("link:connect", evt, paper.findViewByModel(currentEnd.id), data.magnetUnderPointer, arrowhead);
      }
    }
  },
  _snapToPoints: function(snapPoint, points, radius) {
    let closestPointX = null;
    let closestDistanceX = Infinity;
    let closestPointY = null;
    let closestDistanceY = Infinity;
    let x = snapPoint.x;
    let y = snapPoint.y;
    for (let i = 0; i < points.length; i++) {
      const distX = Math.abs(points[i].x - snapPoint.x);
      if (distX < closestDistanceX) {
        closestDistanceX = distX;
        closestPointX = points[i];
      }
      const distY = Math.abs(points[i].y - snapPoint.y);
      if (distY < closestDistanceY) {
        closestDistanceY = distY;
        closestPointY = points[i];
      }
    }
    if (closestDistanceX < radius) {
      x = closestPointX.x;
    }
    if (closestDistanceY < radius) {
      y = closestPointY.y;
    }
    return {
      x,
      y
    };
  },
  _snapArrowheadSelf: function(evt, x, y) {
    const {
      paper,
      model
    } = this;
    const {
      snapLinksSelf
    } = paper.options;
    const data = this.eventData(evt);
    const radius = snapLinksSelf.radius || 20;
    const anchor2 = this.getEndAnchor(data.arrowhead === "source" ? "target" : "source");
    const vertices = model.vertices();
    const points = [anchor2, ...vertices];
    const snapPoint = this._snapToPoints({
      x,
      y
    }, points, radius);
    const point2 = paper.localToClientPoint(snapPoint);
    this._connectArrowhead(document.elementFromPoint(point2.x, point2.y), snapPoint.x, snapPoint.y, this.eventData(evt));
  },
  _snapArrowhead: function(evt, x, y) {
    const {
      paper
    } = this;
    const {
      snapLinks,
      connectionStrategy
    } = paper.options;
    const data = this.eventData(evt);
    let isSnapped = false;
    var r = snapLinks.radius || 50;
    var viewsInArea = paper.findViewsInArea({
      x: x - r,
      y: y - r,
      width: 2 * r,
      height: 2 * r
    });
    var prevClosestView = data.closestView || null;
    var prevClosestMagnet = data.closestMagnet || null;
    var prevMagnetProxy = data.magnetProxy || null;
    data.closestView = data.closestMagnet = data.magnetProxy = null;
    var minDistance = Number.MAX_VALUE;
    var pointer = new Point(x, y);
    viewsInArea.forEach(function(view) {
      const candidates = [];
      if (view.el.getAttribute("magnet") !== "false") {
        candidates.push({
          bbox: view.model.getBBox(),
          magnet: view.el
        });
      }
      view.$("[magnet]").toArray().forEach((magnet) => {
        candidates.push({
          bbox: view.getNodeBBox(magnet),
          magnet
        });
      });
      candidates.forEach((candidate) => {
        const {
          magnet,
          bbox: bbox2
        } = candidate;
        const distance = bbox2.center().squaredDistance(pointer);
        if (distance < minDistance) {
          const isAlreadyValidated = prevClosestMagnet === magnet;
          if (isAlreadyValidated || paper.options.validateConnection.apply(paper, data.validateConnectionArgs(view, view.el === magnet ? null : magnet))) {
            minDistance = distance;
            data.closestView = view;
            data.closestMagnet = magnet;
          }
        }
      });
    }, this);
    var end;
    var magnetProxy = null;
    var closestView = data.closestView;
    var closestMagnet = data.closestMagnet;
    if (closestMagnet) {
      magnetProxy = data.magnetProxy = closestView.findProxyNode(closestMagnet, "highlighter");
    }
    var endType = data.arrowhead;
    var newClosestMagnet = prevClosestMagnet !== closestMagnet;
    if (prevClosestView && newClosestMagnet) {
      prevClosestView.unhighlight(prevMagnetProxy, {
        connecting: true,
        snapping: true
      });
    }
    if (closestView) {
      const {
        prevEnd,
        prevX,
        prevY
      } = data;
      data.prevX = x;
      data.prevY = y;
      isSnapped = true;
      if (!newClosestMagnet) {
        if (typeof connectionStrategy !== "function" || prevX === x && prevY === y) {
          return isSnapped;
        }
      }
      end = closestView.getLinkEnd(closestMagnet, x, y, this.model, endType);
      if (!newClosestMagnet && isEqual(prevEnd, end)) {
        return isSnapped;
      }
      data.prevEnd = end;
      if (newClosestMagnet) {
        closestView.highlight(magnetProxy, {
          connecting: true,
          snapping: true
        });
      }
    } else {
      end = {
        x,
        y
      };
    }
    this.model.set(endType, end || {
      x,
      y
    }, {
      ui: true
    });
    if (prevClosestView) {
      this.notify("link:snap:disconnect", evt, prevClosestView, prevClosestMagnet, endType);
    }
    if (closestView) {
      this.notify("link:snap:connect", evt, closestView, closestMagnet, endType);
    }
    return isSnapped;
  },
  _snapArrowheadEnd: function(data) {
    var closestView = data.closestView;
    var closestMagnet = data.closestMagnet;
    if (closestView && closestMagnet) {
      closestView.unhighlight(data.magnetProxy, {
        connecting: true,
        snapping: true
      });
      data.magnetUnderPointer = closestView.findMagnet(closestMagnet);
    }
    data.closestView = data.closestMagnet = null;
  },
  _connectArrowhead: function(target, x, y, data) {
    const {
      paper,
      model
    } = this;
    if (data.eventTarget !== target) {
      if (data.magnetProxy) {
        data.viewUnderPointer.unhighlight(data.magnetProxy, {
          connecting: true
        });
      }
      const viewUnderPointer = data.viewUnderPointer = paper.findView(target);
      if (viewUnderPointer) {
        const magnetUnderPointer = data.magnetUnderPointer = viewUnderPointer.findMagnet(target);
        const magnetProxy = data.magnetProxy = viewUnderPointer.findProxyNode(magnetUnderPointer, "highlighter");
        if (magnetUnderPointer && this.paper.options.validateConnection.apply(paper, data.validateConnectionArgs(viewUnderPointer, magnetUnderPointer))) {
          if (magnetProxy) {
            viewUnderPointer.highlight(magnetProxy, {
              connecting: true
            });
          }
        } else {
          data.magnetUnderPointer = null;
          data.magnetProxy = null;
        }
      } else {
        data.magnetUnderPointer = null;
        data.magnetProxy = null;
      }
    }
    data.eventTarget = target;
    model.set(data.arrowhead, {
      x,
      y
    }, {
      ui: true
    });
  },
  _connectArrowheadEnd: function(data = {}, x, y) {
    const {
      model
    } = this;
    const {
      viewUnderPointer,
      magnetUnderPointer,
      magnetProxy,
      arrowhead
    } = data;
    if (!magnetUnderPointer || !magnetProxy || !viewUnderPointer) return;
    viewUnderPointer.unhighlight(magnetProxy, {
      connecting: true
    });
    const end = viewUnderPointer.getLinkEnd(magnetUnderPointer, x, y, model, arrowhead);
    model.set(arrowhead, end, {
      ui: true
    });
  },
  _beforeArrowheadMove: function(data) {
    data.z = this.model.get("z");
    this.model.toFront();
    var style = this.el.style;
    data.pointerEvents = style.pointerEvents;
    style.pointerEvents = "none";
    if (this.paper.options.markAvailable) {
      this._markAvailableMagnets(data);
    }
  },
  _afterArrowheadMove: function(data) {
    if (data.z !== null) {
      this.model.set("z", data.z, {
        ui: true
      });
      data.z = null;
    }
    this.el.style.pointerEvents = data.pointerEvents;
    if (this.paper.options.markAvailable) {
      this._unmarkAvailableMagnets(data);
    }
  },
  _createValidateConnectionArgs: function(arrowhead) {
    var args = [];
    args[4] = arrowhead;
    args[5] = this;
    var oppositeArrowhead;
    var i = 0;
    var j = 0;
    if (arrowhead === "source") {
      i = 2;
      oppositeArrowhead = "target";
    } else {
      j = 2;
      oppositeArrowhead = "source";
    }
    var end = this.model.get(oppositeArrowhead);
    if (end.id) {
      var view = args[i] = this.paper.findViewByModel(end.id);
      var magnet = view.getMagnetFromLinkEnd(end);
      if (magnet === view.el) magnet = void 0;
      args[i + 1] = magnet;
    }
    function validateConnectionArgs(cellView, magnet2) {
      args[j] = cellView;
      args[j + 1] = cellView.el === magnet2 ? void 0 : magnet2;
      return args;
    }
    return validateConnectionArgs;
  },
  _markAvailableMagnets: function(data) {
    function isMagnetAvailable(view2, magnet) {
      var paper2 = view2.paper;
      var validate = paper2.options.validateConnection;
      return validate.apply(paper2, this.validateConnectionArgs(view2, magnet));
    }
    var paper = this.paper;
    var elements = paper.model.getCells();
    data.marked = {};
    for (var i = 0, n = elements.length; i < n; i++) {
      var view = elements[i].findView(paper);
      if (!view) {
        continue;
      }
      var magnets = Array.prototype.slice.call(view.el.querySelectorAll("[magnet]"));
      if (view.el.getAttribute("magnet") !== "false") {
        magnets.push(view.el);
      }
      var availableMagnets = magnets.filter(isMagnetAvailable.bind(data, view));
      if (availableMagnets.length > 0) {
        for (var j = 0, m = availableMagnets.length; j < m; j++) {
          view.highlight(availableMagnets[j], {
            magnetAvailability: true
          });
        }
        view.highlight(null, {
          elementAvailability: true
        });
        data.marked[view.model.id] = availableMagnets;
      }
    }
  },
  _unmarkAvailableMagnets: function(data) {
    var markedKeys = Object.keys(data.marked);
    var id;
    var markedMagnets;
    for (var i = 0, n = markedKeys.length; i < n; i++) {
      id = markedKeys[i];
      markedMagnets = data.marked[id];
      var view = this.paper.findViewByModel(id);
      if (view) {
        for (var j = 0, m = markedMagnets.length; j < m; j++) {
          view.unhighlight(markedMagnets[j], {
            magnetAvailability: true
          });
        }
        view.unhighlight(null, {
          elementAvailability: true
        });
      }
    }
    data.marked = null;
  },
  startArrowheadMove: function(end, opt) {
    opt || (opt = {});
    var data = {
      action: "arrowhead-move",
      arrowhead: end,
      whenNotAllowed: opt.whenNotAllowed || "revert",
      initialMagnet: this[end + "Magnet"] || (this[end + "View"] ? this[end + "View"].el : null),
      initialEnd: clone(this.model.get(end)),
      validateConnectionArgs: this._createValidateConnectionArgs(end)
    };
    this._beforeArrowheadMove(data);
    if (opt.ignoreBackwardsCompatibility !== true) {
      this._dragData = data;
    }
    return data;
  },
  // Lifecycle methods
  onMount: function() {
    CellView.prototype.onMount.apply(this, arguments);
    this.mountLabels();
  },
  onDetach: function() {
    CellView.prototype.onDetach.apply(this, arguments);
    this.unmountLabels();
  },
  onRemove: function() {
    CellView.prototype.onRemove.apply(this, arguments);
    this.unmountLabels();
  }
}, {
  Flags: Flags3
});
Object.defineProperty(LinkView.prototype, "sourceBBox", {
  enumerable: true,
  get: function() {
    var sourceView = this.sourceView;
    if (!sourceView) {
      var sourceDef = this.model.source();
      return new Rect(sourceDef.x, sourceDef.y);
    }
    var sourceMagnet = this.sourceMagnet;
    if (sourceView.isNodeConnection(sourceMagnet)) {
      return new Rect(this.sourceAnchor);
    }
    return sourceView.getNodeBBox(sourceMagnet || sourceView.el);
  }
});
Object.defineProperty(LinkView.prototype, "targetBBox", {
  enumerable: true,
  get: function() {
    var targetView = this.targetView;
    if (!targetView) {
      var targetDef = this.model.target();
      return new Rect(targetDef.x, targetDef.y);
    }
    var targetMagnet = this.targetMagnet;
    if (targetView.isNodeConnection(targetMagnet)) {
      return new Rect(this.targetAnchor);
    }
    return targetView.getNodeBBox(targetMagnet || targetView.el);
  }
});

// node_modules/jointjs/src/highlighters/index.mjs
var highlighters_exports = {};
__export(highlighters_exports, {
  addClass: () => addClass,
  list: () => list,
  mask: () => mask,
  opacity: () => opacity,
  stroke: () => stroke
});

// node_modules/jointjs/src/highlighters/stroke.mjs
var stroke = HighlighterView.extend({
  tagName: "path",
  className: "highlight-stroke",
  attributes: {
    "pointer-events": "none",
    "vector-effect": "non-scaling-stroke",
    "fill": "none"
  },
  options: {
    padding: 3,
    rx: 0,
    ry: 0,
    useFirstSubpath: false,
    attrs: {
      "stroke-width": 3,
      "stroke": "#FEB663"
    }
  },
  getPathData(cellView, node) {
    const {
      options
    } = this;
    const {
      useFirstSubpath
    } = options;
    let d;
    try {
      const vNode = V_default(node);
      d = vNode.convertToPathData().trim();
      if (vNode.tagName() === "PATH" && useFirstSubpath) {
        const secondSubpathIndex = d.search(/.M/i) + 1;
        if (secondSubpathIndex > 0) {
          d = d.substr(0, secondSubpathIndex);
        }
      }
    } catch (error) {
      const nodeBBox = cellView.getNodeBoundingRect(node);
      d = V_default.rectToPath(assign({}, options, nodeBBox.toJSON()));
    }
    return d;
  },
  highlightConnection(cellView) {
    this.vel.attr("d", cellView.getSerializedConnection());
  },
  highlightNode(cellView, node) {
    const {
      vel,
      options
    } = this;
    const {
      padding,
      layer
    } = options;
    let highlightMatrix = this.getNodeMatrix(cellView, node);
    if (padding) {
      if (!layer && node === cellView.el) {
        vel.remove();
      }
      let nodeBBox = cellView.getNodeBoundingRect(node);
      const cx = nodeBBox.x + nodeBBox.width / 2;
      const cy = nodeBBox.y + nodeBBox.height / 2;
      nodeBBox = V_default.transformRect(nodeBBox, highlightMatrix);
      const width = Math.max(nodeBBox.width, 1);
      const height = Math.max(nodeBBox.height, 1);
      const sx = (width + padding) / width;
      const sy = (height + padding) / height;
      const paddingMatrix = V_default.createSVGMatrix({
        a: sx,
        b: 0,
        c: 0,
        d: sy,
        e: cx - sx * cx,
        f: cy - sy * cy
      });
      highlightMatrix = highlightMatrix.multiply(paddingMatrix);
    }
    vel.attr({
      "d": this.getPathData(cellView, node),
      "transform": V_default.matrixToTransformString(highlightMatrix)
    });
  },
  highlight(cellView, node) {
    const {
      vel,
      options
    } = this;
    vel.attr(options.attrs);
    if (cellView.isNodeConnection(node)) {
      this.highlightConnection(cellView);
    } else {
      this.highlightNode(cellView, node);
    }
  }
});

// node_modules/jointjs/src/highlighters/mask.mjs
var MASK_CLIP = 20;
function forEachDescendant(vel, fn2) {
  const descendants = vel.children();
  while (descendants.length > 0) {
    const descendant = descendants.shift();
    if (fn2(descendant)) {
      descendants.push(...descendant.children());
    }
  }
}
var mask = HighlighterView.extend({
  tagName: "rect",
  className: "highlight-mask",
  attributes: {
    "pointer-events": "none"
  },
  options: {
    padding: 3,
    maskClip: MASK_CLIP,
    deep: false,
    attrs: {
      "stroke": "#FEB663",
      "stroke-width": 3,
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter"
    }
  },
  VISIBLE: "white",
  INVISIBLE: "black",
  MASK_ROOT_ATTRIBUTE_BLACKLIST: ["marker-start", "marker-end", "marker-mid", "transform", "stroke-dasharray", "class"],
  MASK_CHILD_ATTRIBUTE_BLACKLIST: ["stroke", "fill", "stroke-width", "stroke-opacity", "stroke-dasharray", "fill-opacity", "marker-start", "marker-end", "marker-mid", "class"],
  // TODO: change the list to a function callback
  MASK_REPLACE_TAGS: ["FOREIGNOBJECT", "IMAGE", "USE", "TEXT", "TSPAN", "TEXTPATH"],
  // TODO: change the list to a function callback
  MASK_REMOVE_TAGS: ["TEXT", "TSPAN", "TEXTPATH"],
  transformMaskChild(cellView, childEl) {
    const {
      MASK_CHILD_ATTRIBUTE_BLACKLIST,
      MASK_REPLACE_TAGS,
      MASK_REMOVE_TAGS
    } = this;
    const childTagName = childEl.tagName();
    if (!V_default.isSVGGraphicsElement(childEl) || MASK_REMOVE_TAGS.includes(childTagName)) {
      childEl.remove();
      return false;
    }
    if (MASK_REPLACE_TAGS.includes(childTagName)) {
      const originalChild = cellView.vel.findOne(`#${childEl.id}`);
      if (originalChild) {
        const {
          node: originalNode
        } = originalChild;
        let childBBox = cellView.getNodeBoundingRect(originalNode);
        if (cellView.model.isElement()) {
          childBBox = V_default.transformRect(childBBox, cellView.getNodeMatrix(originalNode));
        }
        const replacement = V_default("rect", childBBox.toJSON());
        const {
          x: ox,
          y: oy
        } = childBBox.center();
        const {
          angle,
          cx = ox,
          cy = oy
        } = originalChild.rotate();
        if (angle) replacement.rotate(angle, cx, cy);
        childEl.parent().append(replacement);
      }
      childEl.remove();
      return false;
    }
    MASK_CHILD_ATTRIBUTE_BLACKLIST.forEach((attrName) => {
      if (attrName === "fill" && childEl.attr("fill") === "none") return;
      childEl.removeAttr(attrName);
    });
    return true;
  },
  transformMaskRoot(_cellView, rootEl) {
    const {
      MASK_ROOT_ATTRIBUTE_BLACKLIST
    } = this;
    MASK_ROOT_ATTRIBUTE_BLACKLIST.forEach((attrName) => {
      rootEl.removeAttr(attrName);
    });
  },
  getMaskShape(cellView, vel) {
    const {
      options,
      MASK_REPLACE_TAGS
    } = this;
    const {
      deep
    } = options;
    const tagName = vel.tagName();
    let maskRoot;
    if (tagName === "G") {
      if (!deep) return null;
      maskRoot = vel.clone();
      forEachDescendant(maskRoot, (maskChild) => this.transformMaskChild(cellView, maskChild));
    } else {
      if (MASK_REPLACE_TAGS.includes(tagName)) return null;
      maskRoot = vel.clone();
    }
    this.transformMaskRoot(cellView, maskRoot);
    return maskRoot;
  },
  getMaskId() {
    return `highlight-mask-${this.cid}`;
  },
  getMask(cellView, vNode) {
    const {
      VISIBLE,
      INVISIBLE,
      options
    } = this;
    const {
      padding,
      attrs
    } = options;
    const strokeWidth = "stroke-width" in attrs ? attrs["stroke-width"] : 1;
    const hasNodeFill = vNode.attr("fill") !== "none";
    let magnetStrokeWidth = parseFloat(vNode.attr("stroke-width"));
    if (isNaN(magnetStrokeWidth)) magnetStrokeWidth = 1;
    const minStrokeWidth = magnetStrokeWidth + padding * 2;
    const maxStrokeWidth = minStrokeWidth + strokeWidth * 2;
    let maskEl = this.getMaskShape(cellView, vNode);
    if (!maskEl) {
      const nodeBBox = cellView.getNodeBoundingRect(vNode.node);
      nodeBBox.inflate(nodeBBox.width ? 0 : 0.5, nodeBBox.height ? 0 : 0.5);
      maskEl = V_default("rect", nodeBBox.toJSON());
    }
    maskEl.attr(attrs);
    return V_default("mask", {
      "id": this.getMaskId()
    }).append([maskEl.clone().attr({
      "fill": hasNodeFill ? VISIBLE : "none",
      "stroke": VISIBLE,
      "stroke-width": maxStrokeWidth
    }), maskEl.clone().attr({
      "fill": hasNodeFill ? INVISIBLE : "none",
      "stroke": INVISIBLE,
      "stroke-width": minStrokeWidth
    })]);
  },
  removeMask(paper) {
    const maskNode = paper.svg.getElementById(this.getMaskId());
    if (maskNode) {
      paper.defs.removeChild(maskNode);
    }
  },
  addMask(paper, maskEl) {
    paper.defs.appendChild(maskEl.node);
  },
  highlight(cellView, node) {
    const {
      options,
      vel
    } = this;
    const {
      padding,
      attrs,
      maskClip = MASK_CLIP,
      layer
    } = options;
    const color = "stroke" in attrs ? attrs["stroke"] : "#000000";
    if (!layer && node === cellView.el) {
      vel.remove();
    }
    const highlighterBBox = cellView.getNodeBoundingRect(node).inflate(padding + maskClip);
    const highlightMatrix = this.getNodeMatrix(cellView, node);
    const maskEl = this.getMask(cellView, V_default(node));
    this.addMask(cellView.paper, maskEl);
    vel.attr(highlighterBBox.toJSON());
    vel.attr({
      "transform": V_default.matrixToTransformString(highlightMatrix),
      "mask": `url(#${maskEl.id})`,
      "fill": color
    });
  },
  unhighlight(cellView) {
    this.removeMask(cellView.paper);
  }
});

// node_modules/jointjs/src/highlighters/opacity.mjs
var opacity = HighlighterView.extend({
  UPDATABLE: false,
  MOUNTABLE: false,
  opacityClassName: addClassNamePrefix("highlight-opacity"),
  highlight: function(_cellView, node) {
    V_default(node).addClass(this.opacityClassName);
  },
  unhighlight: function(_cellView, node) {
    V_default(node).removeClass(this.opacityClassName);
  }
});

// node_modules/jointjs/src/highlighters/addClass.mjs
var className = addClassNamePrefix("highlighted");
var addClass = HighlighterView.extend({
  UPDATABLE: false,
  MOUNTABLE: false,
  options: {
    className
  },
  highlight: function(_cellView, node) {
    V_default(node).addClass(this.options.className);
  },
  unhighlight: function(_cellView, node) {
    V_default(node).removeClass(this.options.className);
  }
}, {
  // Backwards Compatibility
  className
});

// node_modules/jointjs/src/highlighters/list.mjs
var Directions3 = {
  ROW: "row",
  COLUMN: "column"
};
var list = HighlighterView.extend({
  tagName: "g",
  MOUNTABLE: true,
  UPDATE_ATTRIBUTES: function() {
    return [this.options.attribute];
  },
  _prevItems: null,
  highlight(elementView, node) {
    const element = elementView.model;
    const {
      attribute,
      size = 20,
      gap = 5,
      direction = Directions3.ROW
    } = this.options;
    if (!attribute) throw new Error("List: attribute is required");
    const normalizedSize = typeof size === "number" ? {
      width: size,
      height: size
    } : size;
    const isRowDirection = direction === Directions3.ROW;
    const itemWidth = isRowDirection ? normalizedSize.width : normalizedSize.height;
    let items = element.get(attribute);
    if (!Array.isArray(items)) items = [];
    const prevItems = this._prevItems || [];
    const comparison = items.map((item, index) => isEqual(prevItems[index], items[index]));
    if (prevItems.length !== items.length || comparison.some((unchanged) => !unchanged)) {
      const prevEls = this.vel.children();
      const itemsEls = items.map((item, index) => {
        const prevEl = index in prevEls ? prevEls[index].node : null;
        if (comparison[index]) return prevEl;
        const itemEl = this.createListItem(item, normalizedSize, prevEl);
        if (!itemEl) return null;
        if (!(itemEl instanceof SVGElement)) throw new Error("List: item must be an SVGElement");
        itemEl.dataset.index = index;
        itemEl.dataset.attribute = attribute;
        const offset = index * (itemWidth + gap);
        itemEl.setAttribute("transform", isRowDirection ? `translate(${offset}, 0)` : `translate(0, ${offset})`);
        return itemEl;
      });
      this.vel.empty().append(itemsEls);
      this._prevItems = items;
    }
    const itemsCount = items.length;
    const length2 = itemsCount === 0 ? 0 : itemsCount * itemWidth + (itemsCount - 1) * gap;
    const listSize = isRowDirection ? {
      width: length2,
      height: normalizedSize.height
    } : {
      width: normalizedSize.width,
      height: length2
    };
    this.position(element, listSize);
  },
  position(element, listSize) {
    const {
      vel,
      options
    } = this;
    const {
      margin = 5,
      position = "top-left"
    } = options;
    const {
      width,
      height
    } = element.size();
    const {
      left: left4,
      right: right4,
      top: top4,
      bottom: bottom4
    } = normalizeSides(margin);
    const bbox2 = new Rect(left4, top4, width - (left4 + right4), height - (top4 + bottom4));
    let {
      x,
      y
    } = getRectPoint(bbox2, position);
    switch (position) {
      case Positions.CENTER:
      case Positions.TOP:
      case Positions.BOTTOM: {
        x -= listSize.width / 2;
        break;
      }
      case Positions.RIGHT:
      case Positions.BOTTOM_RIGHT:
      case Positions.TOP_RIGHT: {
        x -= listSize.width;
        break;
      }
    }
    switch (position) {
      case Positions.CENTER:
      case Positions.RIGHT:
      case Positions.LEFT: {
        y -= listSize.height / 2;
        break;
      }
      case Positions.BOTTOM:
      case Positions.BOTTOM_RIGHT:
      case Positions.BOTTOM_LEFT: {
        y -= listSize.height;
        break;
      }
    }
    vel.attr("transform", `translate(${x}, ${y})`);
  }
}, {
  Directions: Directions3,
  Positions
});

// node_modules/jointjs/src/linkAnchors/index.mjs
var linkAnchors_exports = {};
__export(linkAnchors_exports, {
  connectionClosest: () => connectionClosest,
  connectionLength: () => connectionLength,
  connectionPerpendicular: () => connectionPerpendicular,
  connectionRatio: () => connectionRatio,
  resolveRef: () => resolveRef
});
function connectionRatio(view, _magnet, _refPoint, opt) {
  var ratio = "ratio" in opt ? opt.ratio : 0.5;
  return view.getPointAtRatio(ratio);
}
function connectionLength(view, _magnet, _refPoint, opt) {
  var length2 = "length" in opt ? opt.length : 20;
  return view.getPointAtLength(length2);
}
function _connectionPerpendicular(view, _magnet, refPoint, opt) {
  var OFFSET = 1e6;
  var path = view.getConnection();
  var segmentSubdivisions = view.getConnectionSubdivisions();
  var verticalLine = new Line(refPoint.clone().offset(0, OFFSET), refPoint.clone().offset(0, -OFFSET));
  var horizontalLine = new Line(refPoint.clone().offset(OFFSET, 0), refPoint.clone().offset(-OFFSET, 0));
  var verticalIntersections = verticalLine.intersect(path, {
    segmentSubdivisions
  });
  var horizontalIntersections = horizontalLine.intersect(path, {
    segmentSubdivisions
  });
  var intersections = [];
  if (verticalIntersections) Array.prototype.push.apply(intersections, verticalIntersections);
  if (horizontalIntersections) Array.prototype.push.apply(intersections, horizontalIntersections);
  if (intersections.length > 0) return refPoint.chooseClosest(intersections);
  if ("fallbackAt" in opt) {
    return getPointAtLink(view, opt.fallbackAt);
  }
  return connectionClosest(view, _magnet, refPoint, opt);
}
function _connectionClosest(view, _magnet, refPoint, _opt) {
  var closestPoint = view.getClosestPoint(refPoint);
  if (!closestPoint) return new Point();
  return closestPoint;
}
function resolveRef(fn2) {
  return function(view, magnet, ref, opt) {
    if (ref instanceof Element) {
      var refView = this.paper.findView(ref);
      var refPoint;
      if (refView) {
        if (refView.isNodeConnection(ref)) {
          var distance = "fixedAt" in opt ? opt.fixedAt : "50%";
          refPoint = getPointAtLink(refView, distance);
        } else {
          refPoint = refView.getNodeBBox(ref).center();
        }
      } else {
        refPoint = new Point();
      }
      return fn2.call(this, view, magnet, refPoint, opt);
    }
    return fn2.apply(this, arguments);
  };
}
function getPointAtLink(view, value) {
  var parsedValue = parseFloat(value);
  if (isPercentage(value)) {
    return view.getPointAtRatio(parsedValue / 100);
  } else {
    return view.getPointAtLength(parsedValue);
  }
}
var connectionPerpendicular = resolveRef(_connectionPerpendicular);
var connectionClosest = resolveRef(_connectionClosest);

// node_modules/jointjs/src/connectionPoints/index.mjs
var connectionPoints_exports = {};
__export(connectionPoints_exports, {
  anchor: () => anchor,
  bbox: () => bbox,
  boundary: () => boundary,
  rectangle: () => rectangle
});
function offsetPoint(p1, p2, offset) {
  if (isPlainObject(offset)) {
    const {
      x,
      y
    } = offset;
    if (isFinite(y)) {
      const line3 = new Line(p2, p1);
      const {
        start,
        end
      } = line3.parallel(y);
      p2 = start;
      p1 = end;
    }
    offset = x;
  }
  if (!isFinite(offset)) return p1;
  var length2 = p1.distance(p2);
  if (offset === 0 && length2 > 0) return p1;
  return p1.move(p2, -Math.min(offset, length2 - 1));
}
function stroke2(magnet) {
  var stroke3 = magnet.getAttribute("stroke-width");
  if (stroke3 === null) return 0;
  return parseFloat(stroke3) || 0;
}
function alignLine(line3, type, offset = 0) {
  let coordinate, a, b, direction;
  const {
    start,
    end
  } = line3;
  switch (type) {
    case "left":
      coordinate = "x";
      a = end;
      b = start;
      direction = -1;
      break;
    case "right":
      coordinate = "x";
      a = start;
      b = end;
      direction = 1;
      break;
    case "top":
      coordinate = "y";
      a = end;
      b = start;
      direction = -1;
      break;
    case "bottom":
      coordinate = "y";
      a = start;
      b = end;
      direction = 1;
      break;
    default:
      return;
  }
  if (start[coordinate] < end[coordinate]) {
    a[coordinate] = b[coordinate];
  } else {
    b[coordinate] = a[coordinate];
  }
  if (isFinite(offset)) {
    a[coordinate] += direction * offset;
    b[coordinate] += direction * offset;
  }
}
function anchorConnectionPoint(line3, _view, _magnet, opt) {
  let {
    offset,
    alignOffset,
    align: align2
  } = opt;
  if (align2) alignLine(line3, align2, alignOffset);
  return offsetPoint(line3.end, line3.start, offset);
}
function bboxIntersection(line3, view, magnet, opt) {
  var bbox2 = view.getNodeBBox(magnet);
  if (opt.stroke) bbox2.inflate(stroke2(magnet) / 2);
  var intersections = line3.intersect(bbox2);
  var cp = intersections ? line3.start.chooseClosest(intersections) : line3.end;
  return offsetPoint(cp, line3.start, opt.offset);
}
function rectangleIntersection(line3, view, magnet, opt) {
  var angle = view.model.angle();
  if (angle === 0) {
    return bboxIntersection(line3, view, magnet, opt);
  }
  var bboxWORotation = view.getNodeUnrotatedBBox(magnet);
  if (opt.stroke) bboxWORotation.inflate(stroke2(magnet) / 2);
  var center2 = bboxWORotation.center();
  var lineWORotation = line3.clone().rotate(center2, angle);
  var intersections = lineWORotation.setLength(1e6).intersect(bboxWORotation);
  var cp = intersections ? lineWORotation.start.chooseClosest(intersections).rotate(center2, -angle) : line3.end;
  return offsetPoint(cp, line3.start, opt.offset);
}
function findShapeNode(magnet) {
  if (!magnet) return null;
  var node = magnet;
  do {
    var tagName = node.tagName;
    if (typeof tagName !== "string") return null;
    tagName = tagName.toUpperCase();
    if (tagName === "G") {
      node = node.firstElementChild;
    } else if (tagName === "TITLE") {
      node = node.nextElementSibling;
    } else break;
  } while (node);
  return node;
}
var BNDR_SUBDIVISIONS = "segmentSubdivisons";
var BNDR_SHAPE_BBOX = "shapeBBox";
function boundaryIntersection(line3, view, magnet, opt) {
  var node, intersection3;
  var selector = opt.selector;
  var anchor2 = line3.end;
  if (typeof selector === "string") {
    node = view.findBySelector(selector)[0];
  } else if (selector === false) {
    node = magnet;
  } else if (Array.isArray(selector)) {
    node = getByPath(magnet, selector);
  } else {
    node = findShapeNode(magnet);
  }
  if (!V_default.isSVGGraphicsElement(node)) {
    if (node === magnet || !V_default.isSVGGraphicsElement(magnet)) return anchor2;
    node = magnet;
  }
  var localShape = view.getNodeShape(node);
  var magnetMatrix = view.getNodeMatrix(node);
  var translateMatrix = view.getRootTranslateMatrix();
  var rotateMatrix = view.getRootRotateMatrix();
  var targetMatrix = translateMatrix.multiply(rotateMatrix).multiply(magnetMatrix);
  var localMatrix = targetMatrix.inverse();
  var localLine = V_default.transformLine(line3, localMatrix);
  var localRef = localLine.start.clone();
  var data = view.getNodeData(node);
  if (opt.insideout === false) {
    if (!data[BNDR_SHAPE_BBOX]) data[BNDR_SHAPE_BBOX] = localShape.bbox();
    var localBBox = data[BNDR_SHAPE_BBOX];
    if (localBBox.containsPoint(localRef)) return anchor2;
  }
  var pathOpt;
  if (localShape instanceof Path) {
    var precision = opt.precision || 2;
    if (!data[BNDR_SUBDIVISIONS]) data[BNDR_SUBDIVISIONS] = localShape.getSegmentSubdivisions({
      precision
    });
    pathOpt = {
      precision,
      segmentSubdivisions: data[BNDR_SUBDIVISIONS]
    };
  }
  if (opt.extrapolate === true) localLine.setLength(1e6);
  intersection3 = localLine.intersect(localShape, pathOpt);
  if (intersection3) {
    if (V_default.isArray(intersection3)) intersection3 = localRef.chooseClosest(intersection3);
  } else if (opt.sticky === true) {
    if (localShape instanceof Rect) {
      intersection3 = localShape.pointNearestToPoint(localRef);
    } else if (localShape instanceof Ellipse) {
      intersection3 = localShape.intersectionWithLineFromCenterToPoint(localRef);
    } else {
      intersection3 = localShape.closestPoint(localRef, pathOpt);
    }
  }
  var cp = intersection3 ? V_default.transformPoint(intersection3, targetMatrix) : anchor2;
  var cpOffset = opt.offset || 0;
  if (opt.stroke) cpOffset += stroke2(node) / 2;
  return offsetPoint(cp, line3.start, cpOffset);
}
var anchor = anchorConnectionPoint;
var bbox = bboxIntersection;
var rectangle = rectangleIntersection;
var boundary = boundaryIntersection;

// node_modules/jointjs/src/anchors/index.mjs
var anchors_exports = {};
__export(anchors_exports, {
  bottom: () => bottom3,
  bottomLeft: () => bottomLeft,
  bottomRight: () => bottomRight,
  center: () => center,
  left: () => left3,
  midSide: () => midSide,
  modelCenter: () => modelCenter,
  perpendicular: () => perpendicular,
  right: () => right3,
  top: () => top3,
  topLeft: () => topLeft,
  topRight: () => topRight
});
function bboxWrapper(method) {
  return function(view, magnet, ref, opt) {
    var rotate = !!opt.rotate;
    var bbox2 = rotate ? view.getNodeUnrotatedBBox(magnet) : view.getNodeBBox(magnet);
    var anchor2 = bbox2[method]();
    var dx = opt.dx;
    if (dx) {
      var dxPercentage = isPercentage(dx);
      dx = parseFloat(dx);
      if (isFinite(dx)) {
        if (dxPercentage) {
          dx /= 100;
          dx *= bbox2.width;
        }
        anchor2.x += dx;
      }
    }
    var dy = opt.dy;
    if (dy) {
      var dyPercentage = isPercentage(dy);
      dy = parseFloat(dy);
      if (isFinite(dy)) {
        if (dyPercentage) {
          dy /= 100;
          dy *= bbox2.height;
        }
        anchor2.y += dy;
      }
    }
    return rotate ? anchor2.rotate(view.model.getBBox().center(), -view.model.angle()) : anchor2;
  };
}
function _perpendicular(view, magnet, refPoint, opt) {
  var angle = view.model.angle();
  var bbox2 = view.getNodeBBox(magnet);
  var anchor2 = bbox2.center();
  var topLeft2 = bbox2.origin();
  var bottomRight2 = bbox2.corner();
  var padding = opt.padding;
  if (!isFinite(padding)) padding = 0;
  if (topLeft2.y + padding <= refPoint.y && refPoint.y <= bottomRight2.y - padding) {
    var dy = refPoint.y - anchor2.y;
    anchor2.x += angle === 0 || angle === 180 ? 0 : dy * 1 / Math.tan(toRad(angle));
    anchor2.y += dy;
  } else if (topLeft2.x + padding <= refPoint.x && refPoint.x <= bottomRight2.x - padding) {
    var dx = refPoint.x - anchor2.x;
    anchor2.y += angle === 90 || angle === 270 ? 0 : dx * Math.tan(toRad(angle));
    anchor2.x += dx;
  }
  return anchor2;
}
function _midSide(view, magnet, refPoint, opt) {
  var rotate = !!opt.rotate;
  var bbox2, angle, center2;
  if (rotate) {
    bbox2 = view.getNodeUnrotatedBBox(magnet);
    center2 = view.model.getBBox().center();
    angle = view.model.angle();
  } else {
    bbox2 = view.getNodeBBox(magnet);
  }
  var padding = opt.padding;
  if (isFinite(padding)) bbox2.inflate(padding);
  if (rotate) refPoint.rotate(center2, angle);
  var side = bbox2.sideNearestToPoint(refPoint);
  var anchor2;
  switch (side) {
    case "left":
      anchor2 = bbox2.leftMiddle();
      break;
    case "right":
      anchor2 = bbox2.rightMiddle();
      break;
    case "top":
      anchor2 = bbox2.topMiddle();
      break;
    case "bottom":
      anchor2 = bbox2.bottomMiddle();
      break;
  }
  return rotate ? anchor2.rotate(center2, -angle) : anchor2;
}
function _modelCenter(view, _magnet, _refPoint, opt, endType) {
  return view.model.getPointFromConnectedLink(this.model, endType).offset(opt.dx, opt.dy);
}
var center = bboxWrapper("center");
var top3 = bboxWrapper("topMiddle");
var bottom3 = bboxWrapper("bottomMiddle");
var left3 = bboxWrapper("leftMiddle");
var right3 = bboxWrapper("rightMiddle");
var topLeft = bboxWrapper("origin");
var topRight = bboxWrapper("topRight");
var bottomLeft = bboxWrapper("bottomLeft");
var bottomRight = bboxWrapper("corner");
var perpendicular = resolveRef(_perpendicular);
var midSide = resolveRef(_midSide);
var modelCenter = _modelCenter;

// node_modules/jointjs/src/dia/Paper.mjs
var import_jquery6 = __toESM(require_jquery(), 1);
var import_backbone5 = __toESM(require_backbone(), 1);
var sortingTypes = {
  NONE: "sorting-none",
  APPROX: "sorting-approximate",
  EXACT: "sorting-exact"
};
var WHEEL_CAP = 50;
var WHEEL_WAIT_MS = 20;
var MOUNT_BATCH_SIZE = 1e3;
var UPDATE_BATCH_SIZE = Infinity;
var MIN_PRIORITY = 9007199254740991;
var HighlightingTypes2 = CellView.Highlighting;
var defaultHighlighting = {
  [HighlightingTypes2.DEFAULT]: {
    name: "stroke",
    options: {
      padding: 3
    }
  },
  [HighlightingTypes2.MAGNET_AVAILABILITY]: {
    name: "addClass",
    options: {
      className: "available-magnet"
    }
  },
  [HighlightingTypes2.ELEMENT_AVAILABILITY]: {
    name: "addClass",
    options: {
      className: "available-cell"
    }
  }
};
var defaultLayers = [{
  name: LayersNames.BACK
}, {
  name: LayersNames.CELLS
}, {
  name: LayersNames.LABELS
}, {
  name: LayersNames.FRONT
}, {
  name: LayersNames.TOOLS
}];
var Paper = View.extend({
  className: "paper",
  options: {
    width: 800,
    height: 600,
    origin: {
      x: 0,
      y: 0
    },
    // x,y coordinates in top-left corner
    gridSize: 1,
    // Whether or not to draw the grid lines on the paper's DOM element.
    // e.g drawGrid: true, drawGrid: { color: 'red', thickness: 2 }
    drawGrid: false,
    // If not set, the size of the visual grid is the same as the `gridSize`.
    drawGridSize: null,
    // Whether or not to draw the background on the paper's DOM element.
    // e.g. background: { color: 'lightblue', image: '/paper-background.png', repeat: 'flip-xy' }
    background: false,
    perpendicularLinks: false,
    elementView: ElementView,
    linkView: LinkView,
    snapLabels: false,
    // false, true
    snapLinks: false,
    // false, true, { radius: value }
    snapLinksSelf: false,
    // false, true, { radius: value }
    // Should the link labels be rendered into its own layer?
    // `false` - the labels are part of the links
    // `true` - the labels are appended to LayersName.LABELS
    // [LayersName] - the labels are appended to the layer specified
    labelsLayer: false,
    // When set to FALSE, an element may not have more than 1 link with the same source and target element.
    multiLinks: true,
    // For adding custom guard logic.
    guard: function(evt, view) {
      return false;
    },
    highlighting: defaultHighlighting,
    // Prevent the default context menu from being displayed.
    preventContextMenu: true,
    // Prevent the default action for blank:pointer<action>.
    preventDefaultBlankAction: true,
    // Prevent the default action for cell:pointer<action>.
    preventDefaultViewAction: true,
    // Restrict the translation of elements by given bounding box.
    // Option accepts a boolean:
    //  true - the translation is restricted to the paper area
    //  false - no restrictions
    // A method:
    // restrictTranslate: function(elementView) {
    //     var parentId = elementView.model.get('parent');
    //     return parentId && this.model.getCell(parentId).getBBox();
    // },
    // Or a bounding box:
    // restrictTranslate: { x: 10, y: 10, width: 790, height: 590 }
    restrictTranslate: false,
    // Marks all available magnets with 'available-magnet' class name and all available cells with
    // 'available-cell' class name. Marks them when dragging a link is started and unmark
    // when the dragging is stopped.
    markAvailable: false,
    // Defines what link model is added to the graph after an user clicks on an active magnet.
    // Value could be the Backbone.model or a function returning the Backbone.model
    // defaultLink: function(elementView, magnet) { return condition ? new customLink1() : new customLink2() }
    defaultLink: new Link(),
    // A connector that is used by links with no connector defined on the model.
    // e.g. { name: 'rounded', args: { radius: 5 }} or a function
    defaultConnector: {
      name: "normal"
    },
    // A router that is used by links with no router defined on the model.
    // e.g. { name: 'oneSide', args: { padding: 10 }} or a function
    defaultRouter: {
      name: "normal"
    },
    defaultAnchor: {
      name: "center"
    },
    defaultLinkAnchor: {
      name: "connectionRatio"
    },
    defaultConnectionPoint: {
      name: "bbox"
    },
    /* CONNECTING */
    connectionStrategy: null,
    // Check whether to add a new link to the graph when user clicks on an a magnet.
    validateMagnet: function(_cellView, magnet, _evt) {
      return magnet.getAttribute("magnet") !== "passive";
    },
    // Check whether to allow or disallow the link connection while an arrowhead end (source/target)
    // being changed.
    validateConnection: function(cellViewS, _magnetS, cellViewT, _magnetT, end, _linkView) {
      return (end === "target" ? cellViewT : cellViewS) instanceof ElementView;
    },
    /* EMBEDDING */
    // Enables embedding. Re-parent the dragged element with elements under it and makes sure that
    // all links and elements are visible taken the level of embedding into account.
    embeddingMode: false,
    // Check whether to allow or disallow the element embedding while an element being translated.
    validateEmbedding: function(childView, parentView) {
      return true;
    },
    // Check whether to allow or disallow an embedded element to be unembedded / to become a root.
    validateUnembedding: function(childView) {
      return true;
    },
    // Determines the way how a cell finds a suitable parent when it's dragged over the paper.
    // The cell with the highest z-index (visually on the top) will be chosen.
    findParentBy: "bbox",
    // 'bbox'|'center'|'origin'|'corner'|'topRight'|'bottomLeft'
    // If enabled only the element on the very front is taken into account for the embedding.
    // If disabled the elements under the dragged view are tested one by one
    // (from front to back) until a valid parent found.
    frontParentOnly: true,
    // Interactive flags. See online docs for the complete list of interactive flags.
    interactive: {
      labelMove: false
    },
    // When set to true the links can be pinned to the paper.
    // i.e. link source/target can be a point e.g. link.get('source') ==> { x: 100, y: 100 };
    linkPinning: true,
    // Custom validation after an interaction with a link ends.
    // Recognizes a function. If `false` is returned, the link is disallowed (removed or reverted)
    // (linkView, paper) => boolean
    allowLink: null,
    // Allowed number of mousemove events after which the pointerclick event will be still triggered.
    clickThreshold: 0,
    // Number of required mousemove events before the first pointermove event will be triggered.
    moveThreshold: 0,
    // Number of required mousemove events before a link is created out of the magnet.
    // Or string `onleave` so the link is created when the pointer leaves the magnet
    magnetThreshold: 0,
    // Rendering Options
    sorting: sortingTypes.EXACT,
    frozen: false,
    autoFreeze: false,
    // no docs yet
    onViewUpdate: function(view, flag, priority, opt, paper) {
      if (flag & (view.FLAG_INSERT | view.FLAG_REMOVE) || opt.mounting || opt.isolate) return;
      paper.requestConnectedLinksUpdate(view, priority, opt);
    },
    // no docs yet
    onViewPostponed: function(view, flag, paper) {
      return paper.forcePostponedViewUpdate(view, flag);
    },
    beforeRender: null,
    // function(opt, paper) { },
    afterRender: null,
    // function(stats, opt, paper) {
    viewport: null,
    // Default namespaces
    cellViewNamespace: null,
    routerNamespace: null,
    connectorNamespace: null,
    highlighterNamespace: highlighters_exports,
    anchorNamespace: anchors_exports,
    linkAnchorNamespace: linkAnchors_exports,
    connectionPointNamespace: connectionPoints_exports,
    overflow: false
  },
  events: {
    "dblclick": "pointerdblclick",
    "dbltap": "pointerdblclick",
    "contextmenu": "contextmenu",
    "mousedown": "pointerdown",
    "touchstart": "pointerdown",
    "mouseover": "mouseover",
    "mouseout": "mouseout",
    "mouseenter": "mouseenter",
    "mouseleave": "mouseleave",
    "wheel": "mousewheel",
    "mouseenter .joint-cell": "mouseenter",
    "mouseleave .joint-cell": "mouseleave",
    "mouseenter .joint-tools": "mouseenter",
    "mouseleave .joint-tools": "mouseleave",
    "dblclick .joint-cell [magnet]": "magnetpointerdblclick",
    "contextmenu .joint-cell [magnet]": "magnetcontextmenu",
    "mousedown .joint-link .label": "onlabel",
    // interaction with link label
    "touchstart .joint-link .label": "onlabel",
    "dragstart .joint-cell image": "onImageDragStart"
    // firefox fix
  },
  documentEvents: {
    "mousemove": "pointermove",
    "touchmove": "pointermove",
    "mouseup": "pointerup",
    "touchend": "pointerup",
    "touchcancel": "pointerup"
  },
  svg: null,
  viewport: null,
  defs: null,
  tools: null,
  $background: null,
  layers: null,
  $grid: null,
  $document: null,
  // For storing the current transformation matrix (CTM) of the paper's viewport.
  _viewportMatrix: null,
  // For verifying whether the CTM is up-to-date. The viewport transform attribute
  // could have been manipulated directly.
  _viewportTransformString: null,
  // Updates data (priorities, unmounted views etc.)
  _updates: null,
  // Paper Layers
  _layers: null,
  SORT_DELAYING_BATCHES: ["add", "to-front", "to-back"],
  UPDATE_DELAYING_BATCHES: ["translate"],
  // If you interact with these elements,
  // the default interaction such as `element move` is prevented.
  FORM_CONTROL_TAG_NAMES: ["TEXTAREA", "INPUT", "BUTTON", "SELECT", "OPTION"],
  // If you interact with these elements, the events are not propagated to the paper
  // i.e. paper events such as `element:pointerdown` are not triggered.
  GUARDED_TAG_NAMES: [
    // Guard <select> for consistency. When you click on it:
    // Chrome: triggers `pointerdown`, `pointerup`, `pointerclick` to open
    // Firefox: triggers `pointerdown` on open, `pointerup` (and `pointerclick` only if you haven't moved).
    //          on close. However, if you open and then close by clicking elsewhere on the page,
    //           no other event is triggered.
    // Safari: when you open it, it triggers `pointerdown`. That's it.
    "SELECT"
  ],
  MIN_SCALE: 1e-6,
  init: function() {
    const {
      options,
      el
    } = this;
    if (!options.cellViewNamespace) {
      options.cellViewNamespace = typeof joint !== "undefined" && has(joint, "shapes") ? joint.shapes : null;
    }
    const model = this.model = options.model || new Graph();
    this._layers = {};
    this.setGrid(options.drawGrid);
    this.cloneOptions();
    this.render();
    this._setDimensions();
    this.startListening();
    this._views = {};
    this._mw_evt_buffer = {
      event: null,
      deltas: []
    };
    this.$document = (0, import_jquery6.default)(el.ownerDocument);
    this.resetViews(model.attributes.cells.models);
    if (!this.isFrozen() && this.isAsync()) this.updateViewsAsync();
  },
  _resetUpdates: function() {
    return this._updates = {
      id: null,
      priorities: [{}, {}, {}],
      unmountedCids: [],
      mountedCids: [],
      unmounted: {},
      mounted: {},
      count: 0,
      keyFrozen: false,
      freezeKey: null,
      sort: false,
      disabled: false,
      idle: false
    };
  },
  startListening: function() {
    var model = this.model;
    this.listenTo(model, "add", this.onCellAdded).listenTo(model, "remove", this.onCellRemoved).listenTo(model, "change", this.onCellChange).listenTo(model, "reset", this.onGraphReset).listenTo(model, "sort", this.onGraphSort).listenTo(model, "batch:stop", this.onGraphBatchStop);
    this.on("cell:highlight", this.onCellHighlight).on("cell:unhighlight", this.onCellUnhighlight).on("scale translate", this.update);
  },
  onCellAdded: function(cell, _, opt) {
    var position = opt.position;
    if (this.isAsync() || !isNumber(position)) {
      this.renderView(cell, opt);
    } else {
      if (opt.maxPosition === position) this.freeze({
        key: "addCells"
      });
      this.renderView(cell, opt);
      if (position === 0) this.unfreeze({
        key: "addCells"
      });
    }
  },
  onCellRemoved: function(cell, _, opt) {
    const view = this.findViewByModel(cell);
    if (view) this.requestViewUpdate(view, view.FLAG_REMOVE, view.UPDATE_PRIORITY, opt);
  },
  onCellChange: function(cell, opt) {
    if (cell === this.model.attributes.cells) return;
    if (cell.hasChanged("z") && this.options.sorting === sortingTypes.APPROX) {
      const view = this.findViewByModel(cell);
      if (view) this.requestViewUpdate(view, view.FLAG_INSERT, view.UPDATE_PRIORITY, opt);
    }
  },
  onGraphReset: function(collection, opt) {
    this.resetLayers();
    this.resetViews(collection.models, opt);
  },
  onGraphSort: function() {
    if (this.model.hasActiveBatch(this.SORT_DELAYING_BATCHES)) return;
    this.sortViews();
  },
  onGraphBatchStop: function(data) {
    if (this.isFrozen()) return;
    var name = data && data.batchName;
    var graph = this.model;
    if (!this.isAsync()) {
      var updateDelayingBatches = this.UPDATE_DELAYING_BATCHES;
      if (updateDelayingBatches.includes(name) && !graph.hasActiveBatch(updateDelayingBatches)) {
        this.updateViews(data);
      }
    }
    var sortDelayingBatches = this.SORT_DELAYING_BATCHES;
    if (sortDelayingBatches.includes(name) && !graph.hasActiveBatch(sortDelayingBatches)) {
      this.sortViews();
    }
  },
  cloneOptions: function() {
    const {
      options
    } = this;
    const {
      defaultConnector,
      defaultRouter,
      defaultConnectionPoint,
      defaultAnchor,
      defaultLinkAnchor,
      origin,
      highlighting,
      cellViewNamespace,
      interactive
    } = options;
    if (!cellViewNamespace && typeof joint !== "undefined" && has(joint, "shapes")) {
      options.cellViewNamespace = joint.shapes;
    }
    if (!isFunction(defaultConnector)) {
      options.defaultConnector = cloneDeep(defaultConnector);
    }
    if (!isFunction(defaultRouter)) {
      options.defaultRouter = cloneDeep(defaultRouter);
    }
    if (!isFunction(defaultConnectionPoint)) {
      options.defaultConnectionPoint = cloneDeep(defaultConnectionPoint);
    }
    if (!isFunction(defaultAnchor)) {
      options.defaultAnchor = cloneDeep(defaultAnchor);
    }
    if (!isFunction(defaultLinkAnchor)) {
      options.defaultLinkAnchor = cloneDeep(defaultLinkAnchor);
    }
    if (isPlainObject(interactive)) {
      options.interactive = assign({}, interactive);
    }
    if (isPlainObject(highlighting)) {
      options.highlighting = defaultsDeep2({}, highlighting, defaultHighlighting);
    }
    options.origin = assign({}, origin);
  },
  children: function() {
    var ns = V_default.namespace;
    return [{
      namespaceURI: ns.xhtml,
      tagName: "div",
      className: addClassNamePrefix("paper-background"),
      selector: "background"
    }, {
      namespaceURI: ns.xhtml,
      tagName: "div",
      className: addClassNamePrefix("paper-grid"),
      selector: "grid"
    }, {
      namespaceURI: ns.svg,
      tagName: "svg",
      attributes: {
        "width": "100%",
        "height": "100%",
        "xmlns:xlink": ns.xlink
      },
      selector: "svg",
      children: [{
        // Append `<defs>` element to the SVG document. This is useful for filters and gradients.
        // It's desired to have the defs defined before the viewport (e.g. to make a PDF document pick up defs properly).
        tagName: "defs",
        selector: "defs"
      }, {
        tagName: "g",
        className: addClassNamePrefix("layers"),
        selector: "layers"
      }]
    }];
  },
  hasLayerView(layerName) {
    return layerName in this._layers;
  },
  getLayerView(layerName) {
    const {
      _layers
    } = this;
    if (layerName in _layers) return _layers[layerName];
    throw new Error(`dia.Paper: Unknown layer "${layerName}"`);
  },
  getLayerNode(layerName) {
    return this.getLayerView(layerName).el;
  },
  render: function() {
    this.renderChildren();
    const {
      childNodes,
      options
    } = this;
    const {
      svg: svg2,
      defs,
      layers,
      background,
      grid
    } = childNodes;
    svg2.style.overflow = options.overflow ? "visible" : "hidden";
    this.svg = svg2;
    this.defs = defs;
    this.layers = layers;
    this.$background = (0, import_jquery6.default)(background);
    this.$grid = (0, import_jquery6.default)(grid);
    this.renderLayers();
    V_default.ensureId(svg2);
    if (options.background) {
      this.drawBackground(options.background);
    }
    if (options.drawGrid) {
      this.drawGrid();
    }
    return this;
  },
  renderLayers: function(layers = defaultLayers) {
    this.removeLayers();
    layers.forEach(({
      name,
      sorted
    }) => {
      const layerView = new PaperLayer({
        name
      });
      this.layers.appendChild(layerView.el);
      this._layers[name] = layerView;
    });
    const cellsLayerView = this.getLayerView(LayersNames.CELLS);
    const toolsLayerView = this.getLayerView(LayersNames.TOOLS);
    const labelsLayerView = this.getLayerView(LayersNames.LABELS);
    this.tools = toolsLayerView.el;
    this.cells = this.viewport = cellsLayerView.el;
    cellsLayerView.vel.addClass(addClassNamePrefix("viewport"));
    labelsLayerView.vel.addClass(addClassNamePrefix("viewport"));
  },
  removeLayers: function() {
    const {
      _layers
    } = this;
    Object.keys(_layers).forEach((name) => {
      _layers[name].remove();
      delete _layers[name];
    });
  },
  resetLayers: function() {
    const {
      _layers
    } = this;
    Object.keys(_layers).forEach((name) => {
      _layers[name].removePivots();
    });
  },
  update: function() {
    if (this.options.drawGrid) {
      this.drawGrid();
    }
    if (this._background) {
      this.updateBackgroundImage(this._background);
    }
    return this;
  },
  matrix: function(ctm) {
    var viewport = this.layers;
    if (ctm === void 0) {
      var transformString = viewport.getAttribute("transform");
      if ((this._viewportTransformString || null) === transformString) {
        ctm = this._viewportMatrix;
      } else {
        ctm = viewport.getCTM();
        this._viewportMatrix = ctm;
        this._viewportTransformString = transformString;
      }
      return V_default.createSVGMatrix(ctm);
    }
    ctm = V_default.createSVGMatrix(ctm);
    var ctmString = V_default.matrixToTransformString(ctm);
    viewport.setAttribute("transform", ctmString);
    this._viewportMatrix = ctm;
    this._viewportTransformString = viewport.getAttribute("transform");
    return this;
  },
  clientMatrix: function() {
    return V_default.createSVGMatrix(this.cells.getScreenCTM());
  },
  requestConnectedLinksUpdate: function(view, priority, opt) {
    if (view instanceof CellView) {
      var model = view.model;
      var links = this.model.getConnectedLinks(model);
      for (var j = 0, n = links.length; j < n; j++) {
        var link = links[j];
        var linkView = this.findViewByModel(link);
        if (!linkView) continue;
        var flagLabels = ["UPDATE"];
        if (link.getTargetCell() === model) flagLabels.push("TARGET");
        if (link.getSourceCell() === model) flagLabels.push("SOURCE");
        var nextPriority = Math.max(priority + 1, linkView.UPDATE_PRIORITY);
        this.scheduleViewUpdate(linkView, linkView.getFlag(flagLabels), nextPriority, opt);
      }
    }
  },
  forcePostponedViewUpdate: function(view, flag) {
    if (!view || !(view instanceof CellView)) return false;
    var model = view.model;
    if (model.isElement()) return false;
    if ((flag & view.getFlag(["SOURCE", "TARGET"])) === 0) {
      var dumpOptions = {
        silent: true
      };
      var sourceFlag = 0;
      var sourceView = this.findViewByModel(model.getSourceCell());
      if (sourceView && !this.isViewMounted(sourceView)) {
        sourceFlag = this.dumpView(sourceView, dumpOptions);
        view.updateEndMagnet("source");
      }
      var targetFlag = 0;
      var targetView = this.findViewByModel(model.getTargetCell());
      if (targetView && !this.isViewMounted(targetView)) {
        targetFlag = this.dumpView(targetView, dumpOptions);
        view.updateEndMagnet("target");
      }
      if (sourceFlag === 0 && targetFlag === 0) {
        return !this.dumpView(view, dumpOptions);
      }
    }
    return false;
  },
  requestViewUpdate: function(view, flag, priority, opt) {
    opt || (opt = {});
    this.scheduleViewUpdate(view, flag, priority, opt);
    var isAsync = this.isAsync();
    if (this.isFrozen() || isAsync && opt.async !== false) return;
    if (this.model.hasActiveBatch(this.UPDATE_DELAYING_BATCHES)) return;
    var stats = this.updateViews(opt);
    if (isAsync) this.notifyAfterRender(stats, opt);
  },
  scheduleViewUpdate: function(view, type, priority, opt) {
    const {
      _updates: updates,
      options
    } = this;
    if (updates.idle) {
      if (options.autoFreeze) {
        updates.idle = false;
        this.unfreeze();
      }
    }
    const {
      FLAG_REMOVE,
      FLAG_INSERT,
      UPDATE_PRIORITY,
      cid
    } = view;
    let priorityUpdates = updates.priorities[priority];
    if (!priorityUpdates) priorityUpdates = updates.priorities[priority] = {};
    if (priority > UPDATE_PRIORITY) {
      for (let i = priority - 1; i >= UPDATE_PRIORITY; i--) {
        const prevPriorityUpdates = updates.priorities[i];
        if (!prevPriorityUpdates || !(cid in prevPriorityUpdates)) continue;
        priorityUpdates[cid] |= prevPriorityUpdates[cid];
        delete prevPriorityUpdates[cid];
      }
    }
    let currentType = priorityUpdates[cid] || 0;
    if ((currentType & type) === type) return;
    if (!currentType) updates.count++;
    if (type & FLAG_REMOVE && currentType & FLAG_INSERT) {
      priorityUpdates[cid] ^= FLAG_INSERT;
    } else if (type & FLAG_INSERT && currentType & FLAG_REMOVE) {
      priorityUpdates[cid] ^= FLAG_REMOVE;
    }
    priorityUpdates[cid] |= type;
    const viewUpdateFn = options.onViewUpdate;
    if (typeof viewUpdateFn === "function") viewUpdateFn.call(this, view, type, priority, opt || {}, this);
  },
  dumpViewUpdate: function(view) {
    if (!view) return 0;
    var updates = this._updates;
    var cid = view.cid;
    var priorityUpdates = updates.priorities[view.UPDATE_PRIORITY];
    var flag = this.registerMountedView(view) | priorityUpdates[cid];
    delete priorityUpdates[cid];
    return flag;
  },
  dumpView: function(view, opt = {}) {
    const flag = this.dumpViewUpdate(view);
    if (!flag) return 0;
    const shouldNotify = !opt.silent;
    if (shouldNotify) this.notifyBeforeRender(opt);
    const leftover = this.updateView(view, flag, opt);
    if (shouldNotify) {
      const stats = {
        updated: 1,
        priority: view.UPDATE_PRIORITY
      };
      this.notifyAfterRender(stats, opt);
    }
    return leftover;
  },
  updateView: function(view, flag, opt) {
    if (!view) return 0;
    const {
      FLAG_REMOVE,
      FLAG_INSERT,
      FLAG_INIT,
      model
    } = view;
    if (view instanceof CellView) {
      if (flag & FLAG_REMOVE) {
        this.removeView(model);
        return 0;
      }
      if (flag & FLAG_INSERT) {
        const isInitialInsert = !!(flag & FLAG_INIT);
        if (isInitialInsert) {
          flag ^= FLAG_INIT;
        }
        this.insertView(view, isInitialInsert);
        flag ^= FLAG_INSERT;
      }
    }
    if (!flag) return 0;
    return view.confirmUpdate(flag, opt || {});
  },
  requireView: function(model, opt) {
    var view = this.findViewByModel(model);
    if (!view) return null;
    this.dumpView(view, opt);
    return view;
  },
  registerUnmountedView: function(view) {
    var cid = view.cid;
    var updates = this._updates;
    if (cid in updates.unmounted) return 0;
    var flag = updates.unmounted[cid] |= view.FLAG_INSERT;
    updates.unmountedCids.push(cid);
    delete updates.mounted[cid];
    return flag;
  },
  registerMountedView: function(view) {
    var cid = view.cid;
    var updates = this._updates;
    if (cid in updates.mounted) return 0;
    updates.mounted[cid] = true;
    updates.mountedCids.push(cid);
    var flag = updates.unmounted[cid] || 0;
    delete updates.unmounted[cid];
    return flag;
  },
  isViewMounted: function(view) {
    if (!view) return false;
    var cid = view.cid;
    var updates = this._updates;
    return cid in updates.mounted;
  },
  dumpViews: function(opt) {
    var passingOpt = defaults({}, opt, {
      viewport: null
    });
    this.checkViewport(passingOpt);
    this.updateViews(passingOpt);
  },
  // Synchronous views update
  updateViews: function(opt) {
    this.notifyBeforeRender(opt);
    let batchStats;
    let updateCount = 0;
    let batchCount = 0;
    let priority = MIN_PRIORITY;
    do {
      batchCount++;
      batchStats = this.updateViewsBatch(opt);
      updateCount += batchStats.updated;
      priority = Math.min(batchStats.priority, priority);
    } while (!batchStats.empty);
    const stats = {
      updated: updateCount,
      batches: batchCount,
      priority
    };
    this.notifyAfterRender(stats, opt);
    return stats;
  },
  hasScheduledUpdates: function() {
    const priorities = this._updates.priorities;
    const priorityIndexes = Object.keys(priorities);
    let i = priorityIndexes.length;
    while (i > 0 && i--) {
      for (let _key in priorities[priorityIndexes[i]]) return true;
    }
    return false;
  },
  updateViewsAsync: function(opt, data) {
    opt || (opt = {});
    data || (data = {
      processed: 0,
      priority: MIN_PRIORITY
    });
    const {
      _updates: updates,
      options
    } = this;
    const id = updates.id;
    if (id) {
      cancelFrame(id);
      if (data.processed === 0 && this.hasScheduledUpdates()) {
        this.notifyBeforeRender(opt);
      }
      const stats = this.updateViewsBatch(opt);
      const passingOpt = defaults({}, opt, {
        mountBatchSize: MOUNT_BATCH_SIZE - stats.mounted,
        unmountBatchSize: MOUNT_BATCH_SIZE - stats.unmounted
      });
      const checkStats = this.checkViewport(passingOpt);
      const unmountCount = checkStats.unmounted;
      const mountCount = checkStats.mounted;
      let processed = data.processed;
      const total = updates.count;
      if (stats.updated > 0) {
        processed += stats.updated + stats.unmounted;
        stats.processed = processed;
        data.priority = Math.min(stats.priority, data.priority);
        if (stats.empty && mountCount === 0) {
          stats.unmounted += unmountCount;
          stats.mounted += mountCount;
          stats.priority = data.priority;
          this.notifyAfterRender(stats, opt);
          data.processed = 0;
          data.priority = MIN_PRIORITY;
          updates.count = 0;
        } else {
          data.processed = processed;
        }
      } else {
        if (!updates.idle) {
          if (options.autoFreeze) {
            this.freeze();
            updates.idle = true;
            this.trigger("render:idle", opt);
          }
        }
      }
      const progressFn = opt.progress;
      if (total && typeof progressFn === "function") {
        progressFn.call(this, stats.empty, processed, total, stats, this);
      }
      if (updates.id !== id) return;
    }
    if (updates.disabled) {
      throw new Error("dia.Paper: can not unfreeze the paper after it was removed");
    }
    updates.id = nextFrame(this.updateViewsAsync, this, opt, data);
  },
  notifyBeforeRender: function(opt = {}) {
    let beforeFn = opt.beforeRender;
    if (typeof beforeFn !== "function") {
      beforeFn = this.options.beforeRender;
      if (typeof beforeFn !== "function") return;
    }
    beforeFn.call(this, opt, this);
  },
  notifyAfterRender: function(stats, opt = {}) {
    let afterFn = opt.afterRender;
    if (typeof afterFn !== "function") {
      afterFn = this.options.afterRender;
    }
    if (typeof afterFn === "function") {
      afterFn.call(this, stats, opt, this);
    }
    this.trigger("render:done", stats, opt);
  },
  updateViewsBatch: function(opt) {
    opt || (opt = {});
    var batchSize = opt.batchSize || UPDATE_BATCH_SIZE;
    var updates = this._updates;
    var updateCount = 0;
    var postponeCount = 0;
    var unmountCount = 0;
    var mountCount = 0;
    var maxPriority = MIN_PRIORITY;
    var empty = true;
    var options = this.options;
    var priorities = updates.priorities;
    var viewportFn = "viewport" in opt ? opt.viewport : options.viewport;
    if (typeof viewportFn !== "function") viewportFn = null;
    var postponeViewFn = options.onViewPostponed;
    if (typeof postponeViewFn !== "function") postponeViewFn = null;
    var priorityIndexes = Object.keys(priorities);
    main: for (var i = 0, n = priorityIndexes.length; i < n; i++) {
      var priority = +priorityIndexes[i];
      var priorityUpdates = priorities[priority];
      for (var cid in priorityUpdates) {
        if (updateCount >= batchSize) {
          empty = false;
          break main;
        }
        var view = views[cid];
        if (!view) {
          delete priorityUpdates[cid];
          continue;
        }
        var currentFlag = priorityUpdates[cid];
        if ((currentFlag & view.FLAG_REMOVE) === 0) {
          var isDetached = cid in updates.unmounted;
          if (view.DETACHABLE && viewportFn && !viewportFn.call(this, view, !isDetached, this)) {
            if (!isDetached) {
              this.registerUnmountedView(view);
              this.detachView(view);
            }
            updates.unmounted[cid] |= currentFlag;
            delete priorityUpdates[cid];
            unmountCount++;
            continue;
          }
          if (isDetached) {
            currentFlag |= view.FLAG_INSERT;
            mountCount++;
          }
          currentFlag |= this.registerMountedView(view);
        }
        var leftoverFlag = this.updateView(view, currentFlag, opt);
        if (leftoverFlag > 0) {
          priorityUpdates[cid] = leftoverFlag;
          if (!postponeViewFn || !postponeViewFn.call(this, view, leftoverFlag, this) || priorityUpdates[cid]) {
            postponeCount++;
            empty = false;
            continue;
          }
        }
        if (maxPriority > priority) maxPriority = priority;
        updateCount++;
        delete priorityUpdates[cid];
      }
    }
    return {
      priority: maxPriority,
      updated: updateCount,
      postponed: postponeCount,
      unmounted: unmountCount,
      mounted: mountCount,
      empty
    };
  },
  getUnmountedViews: function() {
    const updates = this._updates;
    const unmountedCids = Object.keys(updates.unmounted);
    const n = unmountedCids.length;
    const unmountedViews = new Array(n);
    for (var i = 0; i < n; i++) {
      unmountedViews[i] = views[unmountedCids[i]];
    }
    return unmountedViews;
  },
  getMountedViews: function() {
    const updates = this._updates;
    const mountedCids = Object.keys(updates.mounted);
    const n = mountedCids.length;
    const mountedViews = new Array(n);
    for (var i = 0; i < n; i++) {
      mountedViews[i] = views[mountedCids[i]];
    }
    return mountedViews;
  },
  checkUnmountedViews: function(viewportFn, opt) {
    opt || (opt = {});
    var mountCount = 0;
    if (typeof viewportFn !== "function") viewportFn = null;
    var batchSize = "mountBatchSize" in opt ? opt.mountBatchSize : Infinity;
    var updates = this._updates;
    var unmountedCids = updates.unmountedCids;
    var unmounted = updates.unmounted;
    for (var i = 0, n = Math.min(unmountedCids.length, batchSize); i < n; i++) {
      var cid = unmountedCids[i];
      if (!(cid in unmounted)) continue;
      var view = views[cid];
      if (!view) continue;
      if (view.DETACHABLE && viewportFn && !viewportFn.call(this, view, false, this)) {
        unmountedCids.push(cid);
        continue;
      }
      mountCount++;
      var flag = this.registerMountedView(view);
      if (flag) this.scheduleViewUpdate(view, flag, view.UPDATE_PRIORITY, {
        mounting: true
      });
    }
    unmountedCids.splice(0, i);
    return mountCount;
  },
  checkMountedViews: function(viewportFn, opt) {
    opt || (opt = {});
    var unmountCount = 0;
    if (typeof viewportFn !== "function") return unmountCount;
    var batchSize = "unmountBatchSize" in opt ? opt.unmountBatchSize : Infinity;
    var updates = this._updates;
    var mountedCids = updates.mountedCids;
    var mounted = updates.mounted;
    for (var i = 0, n = Math.min(mountedCids.length, batchSize); i < n; i++) {
      var cid = mountedCids[i];
      if (!(cid in mounted)) continue;
      var view = views[cid];
      if (!view) continue;
      if (!view.DETACHABLE || viewportFn.call(this, view, true, this)) {
        mountedCids.push(cid);
        continue;
      }
      unmountCount++;
      var flag = this.registerUnmountedView(view);
      if (flag) this.detachView(view);
    }
    mountedCids.splice(0, i);
    return unmountCount;
  },
  checkViewVisibility: function(cellView, opt = {}) {
    let viewportFn = "viewport" in opt ? opt.viewport : this.options.viewport;
    if (typeof viewportFn !== "function") viewportFn = null;
    const updates = this._updates;
    const {
      mounted,
      unmounted
    } = updates;
    const visible = !cellView.DETACHABLE || !viewportFn || viewportFn.call(this, cellView, false, this);
    let isUnmounted = false;
    let isMounted = false;
    if (cellView.cid in mounted && !visible) {
      const flag2 = this.registerUnmountedView(cellView);
      if (flag2) this.detachView(cellView);
      const i = updates.mountedCids.indexOf(cellView.cid);
      updates.mountedCids.splice(i, 1);
      isUnmounted = true;
    }
    if (!isUnmounted && cellView.cid in unmounted && visible) {
      const i = updates.unmountedCids.indexOf(cellView.cid);
      updates.unmountedCids.splice(i, 1);
      var flag = this.registerMountedView(cellView);
      if (flag) this.scheduleViewUpdate(cellView, flag, cellView.UPDATE_PRIORITY, {
        mounting: true
      });
      isMounted = true;
    }
    return {
      mounted: isMounted ? 1 : 0,
      unmounted: isUnmounted ? 1 : 0
    };
  },
  checkViewport: function(opt) {
    var passingOpt = defaults({}, opt, {
      mountBatchSize: Infinity,
      unmountBatchSize: Infinity
    });
    var viewportFn = "viewport" in passingOpt ? passingOpt.viewport : this.options.viewport;
    var unmountedCount = this.checkMountedViews(viewportFn, passingOpt);
    if (unmountedCount > 0) {
      var unmountedCids = this._updates.unmountedCids;
      passingOpt.mountBatchSize = Math.min(unmountedCids.length - unmountedCount, passingOpt.mountBatchSize);
    }
    var mountedCount = this.checkUnmountedViews(viewportFn, passingOpt);
    return {
      mounted: mountedCount,
      unmounted: unmountedCount
    };
  },
  freeze: function(opt) {
    opt || (opt = {});
    var updates = this._updates;
    var key = opt.key;
    var isFrozen = this.options.frozen;
    var freezeKey = updates.freezeKey;
    if (key && key !== freezeKey) {
      if (isFrozen && freezeKey) return;
      updates.freezeKey = key;
      updates.keyFrozen = isFrozen;
    }
    this.options.frozen = true;
    var id = updates.id;
    updates.id = null;
    if (this.isAsync() && id) cancelFrame(id);
  },
  unfreeze: function(opt) {
    opt || (opt = {});
    var updates = this._updates;
    var key = opt.key;
    var freezeKey = updates.freezeKey;
    if (key && freezeKey && key !== freezeKey) return;
    updates.freezeKey = null;
    if (key && key === freezeKey && updates.keyFrozen) return;
    if (this.isAsync()) {
      this.freeze();
      this.updateViewsAsync(opt);
    } else {
      this.updateViews(opt);
    }
    this.options.frozen = updates.keyFrozen = false;
    if (updates.sort) {
      this.sortViews();
      updates.sort = false;
    }
  },
  isAsync: function() {
    return !!this.options.async;
  },
  isFrozen: function() {
    return !!this.options.frozen;
  },
  isExactSorting: function() {
    return this.options.sorting === sortingTypes.EXACT;
  },
  onRemove: function() {
    this.freeze();
    this._updates.disabled = true;
    this.removeLayers();
    this.removeViews();
  },
  getComputedSize: function() {
    var options = this.options;
    var w = options.width;
    var h = options.height;
    if (!isNumber(w)) w = this.el.clientWidth;
    if (!isNumber(h)) h = this.el.clientHeight;
    return {
      width: w,
      height: h
    };
  },
  setDimensions: function(width, height) {
    const {
      options
    } = this;
    const {
      width: currentWidth,
      height: currentHeight
    } = options;
    let w = width === void 0 ? currentWidth : width;
    let h = height === void 0 ? currentHeight : height;
    if (currentWidth === w && currentHeight === h) return;
    options.width = w;
    options.height = h;
    this._setDimensions();
    const computedSize = this.getComputedSize();
    this.trigger("resize", computedSize.width, computedSize.height);
  },
  _setDimensions: function() {
    const {
      options
    } = this;
    let w = options.width;
    let h = options.height;
    if (isNumber(w)) w = Math.round(w);
    if (isNumber(h)) h = Math.round(h);
    this.$el.css({
      width: w === null ? "" : w,
      height: h === null ? "" : h
    });
  },
  setOrigin: function(ox, oy) {
    return this.translate(ox || 0, oy || 0);
  },
  // Expand/shrink the paper to fit the content.
  // Alternatively signature function(opt)
  fitToContent: function(gridWidth, gridHeight, padding, opt) {
    if (isObject(gridWidth)) {
      opt = gridWidth;
    } else {
      opt = assign({
        gridWidth,
        gridHeight,
        padding
      }, opt);
    }
    const {
      x,
      y,
      width,
      height
    } = this.getFitToContentArea(opt);
    const {
      sx,
      sy
    } = this.scale();
    this.setOrigin(-x * sx, -y * sy);
    this.setDimensions(width * sx, height * sy);
    return new Rect(x, y, width, height);
  },
  getFitToContentArea: function(opt = {}) {
    const gridWidth = opt.gridWidth || 1;
    const gridHeight = opt.gridHeight || 1;
    const padding = normalizeSides(opt.padding || 0);
    const minWidth = Math.max(opt.minWidth || 0, gridWidth);
    const minHeight = Math.max(opt.minHeight || 0, gridHeight);
    const maxWidth = opt.maxWidth || Number.MAX_VALUE;
    const maxHeight = opt.maxHeight || Number.MAX_VALUE;
    const newOrigin = opt.allowNewOrigin;
    const area = "contentArea" in opt ? new Rect(opt.contentArea) : this.getContentArea(opt);
    const {
      sx,
      sy
    } = this.scale();
    area.x *= sx;
    area.y *= sy;
    area.width *= sx;
    area.height *= sy;
    let calcWidth = Math.ceil((area.width + area.x) / gridWidth);
    let calcHeight = Math.ceil((area.height + area.y) / gridHeight);
    if (!opt.allowNegativeBottomRight) {
      calcWidth = Math.max(calcWidth, 1);
      calcHeight = Math.max(calcHeight, 1);
    }
    calcWidth *= gridWidth;
    calcHeight *= gridHeight;
    let tx = 0;
    if (newOrigin === "negative" && area.x < 0 || newOrigin === "positive" && area.x >= 0 || newOrigin === "any") {
      tx = Math.ceil(-area.x / gridWidth) * gridWidth;
      tx += padding.left;
      calcWidth += tx;
    }
    let ty = 0;
    if (newOrigin === "negative" && area.y < 0 || newOrigin === "positive" && area.y >= 0 || newOrigin === "any") {
      ty = Math.ceil(-area.y / gridHeight) * gridHeight;
      ty += padding.top;
      calcHeight += ty;
    }
    calcWidth += padding.right;
    calcHeight += padding.bottom;
    calcWidth = Math.max(calcWidth, minWidth);
    calcHeight = Math.max(calcHeight, minHeight);
    calcWidth = Math.min(calcWidth, maxWidth);
    calcHeight = Math.min(calcHeight, maxHeight);
    return new Rect(-tx / sx, -ty / sy, calcWidth / sx, calcHeight / sy);
  },
  transformToFitContent: function(opt) {
    opt || (opt = {});
    let contentBBox, contentLocalOrigin;
    if ("contentArea" in opt) {
      const contentArea = opt.contentArea;
      contentBBox = this.localToPaperRect(contentArea);
      contentLocalOrigin = new Point(contentArea);
    } else {
      contentBBox = this.getContentBBox(opt);
      contentLocalOrigin = this.paperToLocalPoint(contentBBox);
    }
    if (!contentBBox.width || !contentBBox.height) return;
    defaults(opt, {
      padding: 0,
      preserveAspectRatio: true,
      scaleGrid: null,
      minScale: 0,
      maxScale: Number.MAX_VALUE,
      verticalAlign: "top",
      horizontalAlign: "left"
      //minScaleX
      //minScaleY
      //maxScaleX
      //maxScaleY
      //fittingBBox
    });
    const padding = normalizeSides(opt.padding);
    const minScaleX = opt.minScaleX || opt.minScale;
    const maxScaleX = opt.maxScaleX || opt.maxScale;
    const minScaleY = opt.minScaleY || opt.minScale;
    const maxScaleY = opt.maxScaleY || opt.maxScale;
    let fittingBBox;
    if (opt.fittingBBox) {
      fittingBBox = opt.fittingBBox;
    } else {
      const currentTranslate = this.translate();
      const computedSize = this.getComputedSize();
      fittingBBox = {
        x: currentTranslate.tx,
        y: currentTranslate.ty,
        width: computedSize.width,
        height: computedSize.height
      };
    }
    fittingBBox = new Rect(fittingBBox).moveAndExpand({
      x: padding.left,
      y: padding.top,
      width: -padding.left - padding.right,
      height: -padding.top - padding.bottom
    });
    const currentScale = this.scale();
    let newSx = fittingBBox.width / contentBBox.width * currentScale.sx;
    let newSy = fittingBBox.height / contentBBox.height * currentScale.sy;
    if (opt.preserveAspectRatio) {
      newSx = newSy = Math.min(newSx, newSy);
    }
    if (opt.scaleGrid) {
      const gridSize = opt.scaleGrid;
      newSx = gridSize * Math.floor(newSx / gridSize);
      newSy = gridSize * Math.floor(newSy / gridSize);
    }
    newSx = Math.min(maxScaleX, Math.max(minScaleX, newSx));
    newSy = Math.min(maxScaleY, Math.max(minScaleY, newSy));
    const scaleDiff = {
      x: newSx / currentScale.sx,
      y: newSy / currentScale.sy
    };
    const origin = this.options.origin;
    let newOx = fittingBBox.x - contentLocalOrigin.x * newSx - origin.x;
    let newOy = fittingBBox.y - contentLocalOrigin.y * newSy - origin.y;
    switch (opt.verticalAlign) {
      case "middle":
        newOy = newOy + (fittingBBox.height - contentBBox.height * scaleDiff.y) / 2;
        break;
      case "bottom":
        newOy = newOy + (fittingBBox.height - contentBBox.height * scaleDiff.y);
        break;
      case "top":
      default:
        break;
    }
    switch (opt.horizontalAlign) {
      case "middle":
        newOx = newOx + (fittingBBox.width - contentBBox.width * scaleDiff.x) / 2;
        break;
      case "right":
        newOx = newOx + (fittingBBox.width - contentBBox.width * scaleDiff.x);
        break;
      case "left":
      default:
        break;
    }
    this.scale(newSx, newSy);
    this.translate(newOx, newOy);
  },
  scaleContentToFit: function(opt) {
    this.transformToFitContent(opt);
  },
  // Return the dimensions of the content area in local units (without transformations).
  getContentArea: function(opt) {
    if (opt && opt.useModelGeometry) {
      return this.model.getBBox() || new Rect();
    }
    return V_default(this.cells).getBBox();
  },
  // Return the dimensions of the content bbox in the paper units (as it appears on screen).
  getContentBBox: function(opt) {
    return this.localToPaperRect(this.getContentArea(opt));
  },
  // Returns a geometry rectangle representing the entire
  // paper area (coordinates from the left paper border to the right one
  // and the top border to the bottom one).
  getArea: function() {
    return this.paperToLocalRect(this.getComputedSize());
  },
  getRestrictedArea: function(...args) {
    const {
      restrictTranslate
    } = this.options;
    let restrictedArea;
    if (isFunction(restrictTranslate)) {
      restrictedArea = restrictTranslate.apply(this, args);
    } else if (restrictTranslate === true) {
      restrictedArea = this.getArea();
    } else if (!restrictTranslate) {
      restrictedArea = null;
    } else {
      restrictedArea = new Rect(restrictTranslate);
    }
    return restrictedArea;
  },
  createViewForModel: function(cell) {
    const {
      options
    } = this;
    var optionalViewClass;
    var defaultViewClass;
    var namespace = options.cellViewNamespace;
    var type = cell.get("type") + "View";
    var namespaceViewClass = getByPath(namespace, type, ".");
    if (cell.isLink()) {
      optionalViewClass = options.linkView;
      defaultViewClass = LinkView;
    } else {
      optionalViewClass = options.elementView;
      defaultViewClass = ElementView;
    }
    var ViewClass = optionalViewClass.prototype instanceof import_backbone5.default.View ? namespaceViewClass || optionalViewClass : optionalViewClass.call(this, cell) || namespaceViewClass || defaultViewClass;
    return new ViewClass({
      model: cell,
      interactive: options.interactive,
      labelsLayer: options.labelsLayer === true ? LayersNames.LABELS : options.labelsLayer
    });
  },
  removeView: function(cell) {
    const {
      id
    } = cell;
    const {
      _views,
      _updates
    } = this;
    const view = _views[id];
    if (view) {
      var {
        cid
      } = view;
      const {
        mounted,
        unmounted
      } = _updates;
      view.remove();
      delete _views[id];
      delete mounted[cid];
      delete unmounted[cid];
    }
    return view;
  },
  renderView: function(cell, opt) {
    const {
      id
    } = cell;
    const views2 = this._views;
    let view, flag;
    let create = true;
    if (id in views2) {
      view = views2[id];
      if (view.model === cell) {
        flag = view.FLAG_INSERT;
        create = false;
      } else {
        this.removeView(cell);
      }
    }
    if (create) {
      view = views2[id] = this.createViewForModel(cell);
      view.paper = this;
      flag = this.registerUnmountedView(view) | this.FLAG_INIT | view.getFlag(result(view, "initFlag"));
    }
    this.requestViewUpdate(view, flag, view.UPDATE_PRIORITY, opt);
    return view;
  },
  onImageDragStart: function() {
    return false;
  },
  resetViews: function(cells, opt) {
    opt || (opt = {});
    cells || (cells = []);
    this._resetUpdates();
    this.removeViews();
    const key = this.options.autoFreeze ? null : "reset";
    this.freeze({
      key
    });
    for (var i = 0, n = cells.length; i < n; i++) {
      this.renderView(cells[i], opt);
    }
    this.unfreeze({
      key
    });
    this.sortViews();
  },
  removeViews: function() {
    invoke(this._views, "remove");
    this._views = {};
  },
  sortViews: function() {
    if (!this.isExactSorting()) {
      return;
    }
    if (this.isFrozen()) {
      this._updates.sort = true;
      return;
    }
    this.sortViewsExact();
  },
  sortViewsExact: function() {
    var $cells = (0, import_jquery6.default)(this.cells).children("[model-id]");
    var cells = this.model.get("cells");
    sortElements($cells, function(a, b) {
      var cellA = cells.get(a.getAttribute("model-id"));
      var cellB = cells.get(b.getAttribute("model-id"));
      var zA = cellA.attributes.z || 0;
      var zB = cellB.attributes.z || 0;
      return zA === zB ? 0 : zA < zB ? -1 : 1;
    });
  },
  insertView: function(view, isInitialInsert) {
    const layerView = this.getLayerView(LayersNames.CELLS);
    const {
      el,
      model
    } = view;
    switch (this.options.sorting) {
      case sortingTypes.APPROX:
        layerView.insertSortedNode(el, model.get("z"));
        break;
      case sortingTypes.EXACT:
      default:
        layerView.insertNode(el);
        break;
    }
    view.onMount(isInitialInsert);
  },
  detachView(view) {
    view.unmount();
    view.onDetach();
  },
  scale: function(sx, sy, ox, oy) {
    if (sx === void 0) {
      return V_default.matrixToScale(this.matrix());
    }
    if (sy === void 0) {
      sy = sx;
    }
    if (ox === void 0) {
      ox = 0;
      oy = 0;
    }
    var translate = this.translate();
    if (ox || oy || translate.tx || translate.ty) {
      var newTx = translate.tx - ox * (sx - 1);
      var newTy = translate.ty - oy * (sy - 1);
      this.translate(newTx, newTy);
    }
    sx = Math.max(sx || 0, this.MIN_SCALE);
    sy = Math.max(sy || 0, this.MIN_SCALE);
    var ctm = this.matrix();
    ctm.a = sx;
    ctm.d = sy;
    this.matrix(ctm);
    this.trigger("scale", sx, sy, ox, oy);
    return this;
  },
  // Experimental - do not use in production.
  rotate: function(angle, cx, cy) {
    if (angle === void 0) {
      return V_default.matrixToRotate(this.matrix());
    }
    if (cx === void 0) {
      var bbox2 = this.cells.getBBox();
      cx = bbox2.width / 2;
      cy = bbox2.height / 2;
    }
    var ctm = this.matrix().translate(cx, cy).rotate(angle).translate(-cx, -cy);
    this.matrix(ctm);
    return this;
  },
  translate: function(tx, ty) {
    if (tx === void 0) {
      return V_default.matrixToTranslate(this.matrix());
    }
    const {
      options
    } = this;
    const {
      origin,
      drawGrid
    } = options;
    tx || (tx = 0);
    ty || (ty = 0);
    const ctm = this.matrix();
    if (ctm.e === tx && ctm.f === ty) return this;
    ctm.e = tx;
    ctm.f = ty;
    this.matrix(ctm);
    const {
      tx: ox,
      ty: oy
    } = this.translate();
    origin.x = ox;
    origin.y = oy;
    this.trigger("translate", ox, oy);
    if (drawGrid) {
      this.drawGrid();
    }
    return this;
  },
  // Find the first view climbing up the DOM tree starting at element `el`. Note that `el` can also
  // be a selector or a jQuery object.
  findView: function($el) {
    var el = isString($el) ? this.cells.querySelector($el) : $el instanceof import_jquery6.default ? $el[0] : $el;
    var id = this.findAttribute("model-id", el);
    if (id) return this._views[id];
    return void 0;
  },
  // Find a view for a model `cell`. `cell` can also be a string or number representing a model `id`.
  findViewByModel: function(cell) {
    var id = isString(cell) || isNumber(cell) ? cell : cell && cell.id;
    return this._views[id];
  },
  // Find all views at given point
  findViewsFromPoint: function(p) {
    p = new Point(p);
    var views2 = this.model.getElements().map(this.findViewByModel, this);
    return views2.filter(function(view) {
      return view && view.vel.getBBox({
        target: this.cells
      }).containsPoint(p);
    }, this);
  },
  // Find all views in given area
  findViewsInArea: function(rect2, opt) {
    opt = defaults(opt || {}, {
      strict: false
    });
    rect2 = new Rect(rect2);
    var views2 = this.model.getElements().map(this.findViewByModel, this);
    var method = opt.strict ? "containsRect" : "intersect";
    return views2.filter(function(view) {
      return view && rect2[method](view.vel.getBBox({
        target: this.cells
      }));
    }, this);
  },
  removeTools: function() {
    this.dispatchToolsEvent("remove");
    return this;
  },
  hideTools: function() {
    this.dispatchToolsEvent("hide");
    return this;
  },
  showTools: function() {
    this.dispatchToolsEvent("show");
    return this;
  },
  dispatchToolsEvent: function(event, ...args) {
    if (typeof event !== "string") return;
    this.trigger("tools:event", event, ...args);
  },
  getModelById: function(id) {
    return this.model.getCell(id);
  },
  snapToGrid: function(x, y) {
    return this.clientToLocalPoint(x, y).snapToGrid(this.options.gridSize);
  },
  localToPaperPoint: function(x, y) {
    var localPoint = new Point(x, y);
    var paperPoint = V_default.transformPoint(localPoint, this.matrix());
    return paperPoint;
  },
  localToPaperRect: function(x, y, width, height) {
    var localRect = new Rect(x, y, width, height);
    var paperRect = V_default.transformRect(localRect, this.matrix());
    return paperRect;
  },
  paperToLocalPoint: function(x, y) {
    var paperPoint = new Point(x, y);
    var localPoint = V_default.transformPoint(paperPoint, this.matrix().inverse());
    return localPoint;
  },
  paperToLocalRect: function(x, y, width, height) {
    var paperRect = new Rect(x, y, width, height);
    var localRect = V_default.transformRect(paperRect, this.matrix().inverse());
    return localRect;
  },
  localToClientPoint: function(x, y) {
    var localPoint = new Point(x, y);
    var clientPoint = V_default.transformPoint(localPoint, this.clientMatrix());
    return clientPoint;
  },
  localToClientRect: function(x, y, width, height) {
    var localRect = new Rect(x, y, width, height);
    var clientRect = V_default.transformRect(localRect, this.clientMatrix());
    return clientRect;
  },
  // Transform client coordinates to the paper local coordinates.
  // Useful when you have a mouse event object and you'd like to get coordinates
  // inside the paper that correspond to `evt.clientX` and `evt.clientY` point.
  // Example: var localPoint = paper.clientToLocalPoint({ x: evt.clientX, y: evt.clientY });
  clientToLocalPoint: function(x, y) {
    var clientPoint = new Point(x, y);
    var localPoint = V_default.transformPoint(clientPoint, this.clientMatrix().inverse());
    return localPoint;
  },
  clientToLocalRect: function(x, y, width, height) {
    var clientRect = new Rect(x, y, width, height);
    var localRect = V_default.transformRect(clientRect, this.clientMatrix().inverse());
    return localRect;
  },
  localToPagePoint: function(x, y) {
    return this.localToPaperPoint(x, y).offset(this.pageOffset());
  },
  localToPageRect: function(x, y, width, height) {
    return this.localToPaperRect(x, y, width, height).offset(this.pageOffset());
  },
  pageToLocalPoint: function(x, y) {
    var pagePoint = new Point(x, y);
    var paperPoint = pagePoint.difference(this.pageOffset());
    return this.paperToLocalPoint(paperPoint);
  },
  pageToLocalRect: function(x, y, width, height) {
    var pageOffset = this.pageOffset();
    var paperRect = new Rect(x, y, width, height);
    paperRect.x -= pageOffset.x;
    paperRect.y -= pageOffset.y;
    return this.paperToLocalRect(paperRect);
  },
  clientOffset: function() {
    var clientRect = this.svg.getBoundingClientRect();
    return new Point(clientRect.left, clientRect.top);
  },
  pageOffset: function() {
    return this.clientOffset().offset(window.scrollX, window.scrollY);
  },
  linkAllowed: function(linkView) {
    if (!(linkView instanceof LinkView)) {
      throw new Error("Must provide a linkView.");
    }
    var link = linkView.model;
    var paperOptions = this.options;
    var graph = this.model;
    var ns = graph.constructor.validations;
    if (!paperOptions.multiLinks) {
      if (!ns.multiLinks.call(this, graph, link)) return false;
    }
    if (!paperOptions.linkPinning) {
      if (!ns.linkPinning.call(this, graph, link)) return false;
    }
    if (typeof paperOptions.allowLink === "function") {
      if (!paperOptions.allowLink.call(this, linkView, this)) return false;
    }
    return true;
  },
  getDefaultLink: function(cellView, magnet) {
    return isFunction(this.options.defaultLink) ? this.options.defaultLink.call(this, cellView, magnet) : this.options.defaultLink.clone();
  },
  // Cell highlighting.
  // ------------------
  resolveHighlighter: function(opt = {}) {
    let {
      highlighter: highlighterDef,
      type
    } = opt;
    const {
      highlighting,
      highlighterNamespace
    } = this.options;
    if (highlighterDef === void 0) {
      if (!highlighting) return false;
      if (type) {
        highlighterDef = highlighting[type];
        if (highlighterDef === false) return false;
      }
      if (!highlighterDef) {
        highlighterDef = highlighting["default"];
      }
    }
    if (!highlighterDef) return false;
    if (isString(highlighterDef)) {
      highlighterDef = {
        name: highlighterDef
      };
    }
    const name = highlighterDef.name;
    const highlighter = highlighterNamespace[name];
    if (!highlighter) {
      throw new Error('Unknown highlighter ("' + name + '")');
    }
    if (typeof highlighter.highlight !== "function") {
      throw new Error('Highlighter ("' + name + '") is missing required highlight() method');
    }
    if (typeof highlighter.unhighlight !== "function") {
      throw new Error('Highlighter ("' + name + '") is missing required unhighlight() method');
    }
    return {
      highlighter,
      options: highlighterDef.options || {},
      name
    };
  },
  onCellHighlight: function(cellView, magnetEl, opt) {
    const highlighterDescriptor = this.resolveHighlighter(opt);
    if (!highlighterDescriptor) return;
    const {
      highlighter,
      options
    } = highlighterDescriptor;
    highlighter.highlight(cellView, magnetEl, options);
  },
  onCellUnhighlight: function(cellView, magnetEl, opt) {
    const highlighterDescriptor = this.resolveHighlighter(opt);
    if (!highlighterDescriptor) return;
    const {
      highlighter,
      options
    } = highlighterDescriptor;
    highlighter.unhighlight(cellView, magnetEl, options);
  },
  // Interaction.
  // ------------
  pointerdblclick: function(evt) {
    evt.preventDefault();
    evt = normalizeEvent(evt);
    var view = this.findView(evt.target);
    if (this.guard(evt, view)) return;
    var localPoint = this.snapToGrid(evt.clientX, evt.clientY);
    if (view) {
      view.pointerdblclick(evt, localPoint.x, localPoint.y);
    } else {
      this.trigger("blank:pointerdblclick", evt, localPoint.x, localPoint.y);
    }
  },
  pointerclick: function(evt) {
    var data = this.eventData(evt);
    if (data.mousemoved <= this.options.clickThreshold) {
      evt = normalizeEvent(evt);
      var view = this.findView(evt.target);
      if (this.guard(evt, view)) return;
      var localPoint = this.snapToGrid(evt.clientX, evt.clientY);
      if (view) {
        view.pointerclick(evt, localPoint.x, localPoint.y);
      } else {
        this.trigger("blank:pointerclick", evt, localPoint.x, localPoint.y);
      }
    }
  },
  contextmenu: function(evt) {
    if (this.options.preventContextMenu) evt.preventDefault();
    if (this.contextMenuFired) {
      this.contextMenuFired = false;
      return;
    }
    evt = normalizeEvent(evt);
    this.contextMenuTrigger(evt);
  },
  contextMenuTrigger: function(evt) {
    var view = this.findView(evt.target);
    if (this.guard(evt, view)) return;
    var localPoint = this.snapToGrid(evt.clientX, evt.clientY);
    if (view) {
      view.contextmenu(evt, localPoint.x, localPoint.y);
    } else {
      this.trigger("blank:contextmenu", evt, localPoint.x, localPoint.y);
    }
  },
  pointerdown: function(evt) {
    evt = normalizeEvent(evt);
    const {
      target,
      button
    } = evt;
    const view = this.findView(target);
    const isContextMenu = button === 2;
    if (view) {
      if (!isContextMenu && this.guard(evt, view)) return;
      const isTargetFormNode = this.FORM_CONTROL_TAG_NAMES.includes(target.tagName);
      if (this.options.preventDefaultViewAction && !isTargetFormNode) {
        evt.preventDefault();
      }
      if (isTargetFormNode) {
        view.preventDefaultInteraction(evt);
      }
      const eventEvt = this.customEventTrigger(evt, view);
      if (eventEvt) {
        if (eventEvt.isPropagationStopped()) return;
        evt.data = eventEvt.data;
      }
      const magnetNode = target.closest("[magnet]");
      if (magnetNode && view.el !== magnetNode && view.el.contains(magnetNode)) {
        const magnetEvt = normalizeEvent(import_jquery6.default.Event(evt.originalEvent, {
          data: evt.data,
          // Originally the event listener was attached to the magnet element.
          currentTarget: magnetNode
        }));
        this.onmagnet(magnetEvt);
        if (magnetEvt.isDefaultPrevented()) {
          evt.preventDefault();
        }
        if (magnetEvt.isPropagationStopped()) {
          if (isContextMenu) return;
          this.delegateDragEvents(view, magnetEvt.data);
          return;
        }
        evt.data = magnetEvt.data;
      }
    }
    if (isContextMenu) {
      this.contextMenuFired = true;
      const contextmenuEvt = import_jquery6.default.Event(evt.originalEvent, {
        type: "contextmenu",
        data: evt.data
      });
      this.contextMenuTrigger(contextmenuEvt);
    } else {
      const localPoint = this.snapToGrid(evt.clientX, evt.clientY);
      if (view) {
        view.pointerdown(evt, localPoint.x, localPoint.y);
      } else {
        if (this.options.preventDefaultBlankAction) {
          evt.preventDefault();
        }
        this.trigger("blank:pointerdown", evt, localPoint.x, localPoint.y);
      }
      this.delegateDragEvents(view, evt.data);
    }
  },
  pointermove: function(evt) {
    var data = this.eventData(evt);
    if (!data.mousemoved) {
      data.mousemoved = 0;
      this.undelegateEvents();
    }
    var mousemoved = ++data.mousemoved;
    if (mousemoved <= this.options.moveThreshold) return;
    evt = normalizeEvent(evt);
    var localPoint = this.snapToGrid(evt.clientX, evt.clientY);
    var view = data.sourceView;
    if (view) {
      view.pointermove(evt, localPoint.x, localPoint.y);
    } else {
      this.trigger("blank:pointermove", evt, localPoint.x, localPoint.y);
    }
    this.eventData(evt, data);
  },
  pointerup: function(evt) {
    this.undelegateDocumentEvents();
    var normalizedEvt = normalizeEvent(evt);
    var localPoint = this.snapToGrid(normalizedEvt.clientX, normalizedEvt.clientY);
    var view = this.eventData(evt).sourceView;
    if (view) {
      view.pointerup(normalizedEvt, localPoint.x, localPoint.y);
    } else {
      this.trigger("blank:pointerup", normalizedEvt, localPoint.x, localPoint.y);
    }
    if (!normalizedEvt.isPropagationStopped()) {
      this.pointerclick(import_jquery6.default.Event(evt.originalEvent, {
        type: "click",
        data: evt.data
      }));
    }
    this.delegateEvents();
  },
  mouseover: function(evt) {
    evt = normalizeEvent(evt);
    var view = this.findView(evt.target);
    if (this.guard(evt, view)) return;
    if (view) {
      view.mouseover(evt);
    } else {
      if (this.el === evt.target) return;
      this.trigger("blank:mouseover", evt);
    }
  },
  mouseout: function(evt) {
    evt = normalizeEvent(evt);
    var view = this.findView(evt.target);
    if (this.guard(evt, view)) return;
    if (view) {
      view.mouseout(evt);
    } else {
      if (this.el === evt.target) return;
      this.trigger("blank:mouseout", evt);
    }
  },
  mouseenter: function(evt) {
    evt = normalizeEvent(evt);
    const {
      target,
      // The EventTarget the pointing device entered to
      relatedTarget,
      // The EventTarget the pointing device exited from
      currentTarget
      // The EventTarget on which the event listener was registered
    } = evt;
    const view = this.findView(target);
    if (this.guard(evt, view)) return;
    const relatedView = this.findView(relatedTarget);
    if (view) {
      if (relatedView === view) {
        return;
      }
      view.mouseenter(evt);
      if (this.el.contains(relatedTarget)) {
        return;
      }
    }
    if (relatedView) {
      return;
    }
    if (currentTarget === this.el) {
      this.trigger("paper:mouseenter", evt);
    }
  },
  mouseleave: function(evt) {
    evt = normalizeEvent(evt);
    const {
      target,
      // The EventTarget the pointing device exited from
      relatedTarget,
      // The EventTarget the pointing device entered to
      currentTarget
      // The EventTarget on which the event listener was registered
    } = evt;
    const view = this.findView(target);
    if (this.guard(evt, view)) return;
    const relatedView = this.findView(relatedTarget);
    if (view) {
      if (relatedView === view) {
        return;
      }
      view.mouseleave(evt);
      if (this.el.contains(relatedTarget)) {
        return;
      }
    }
    if (relatedView) {
      return;
    }
    if (currentTarget === this.el) {
      this.trigger("paper:mouseleave", evt);
    }
  },
  _processMouseWheelEvtBuf: debounce(function() {
    const {
      event,
      deltas
    } = this._mw_evt_buffer;
    const deltaY = deltas.reduce((acc, deltaY2) => acc + cap(deltaY2, WHEEL_CAP), 0);
    const scale2 = Math.pow(0.995, deltaY);
    const {
      x,
      y
    } = this.clientToLocalPoint(event.clientX, event.clientY);
    this.trigger("paper:pinch", event, x, y, scale2);
    this._mw_evt_buffer = {
      event: null,
      deltas: []
    };
  }, WHEEL_WAIT_MS, {
    maxWait: WHEEL_WAIT_MS
  }),
  mousewheel: function(evt) {
    evt = normalizeEvent(evt);
    const view = this.findView(evt.target);
    if (this.guard(evt, view)) return;
    const originalEvent = evt.originalEvent;
    const localPoint = this.snapToGrid(originalEvent.clientX, originalEvent.clientY);
    const {
      deltaX,
      deltaY
    } = normalizeWheel(originalEvent);
    const pinchHandlers = this._events["paper:pinch"];
    if (evt.ctrlKey && pinchHandlers && pinchHandlers.length > 0) {
      originalEvent.preventDefault();
      this._mw_evt_buffer.event = originalEvent;
      this._mw_evt_buffer.deltas.push(deltaY);
      this._processMouseWheelEvtBuf();
    } else {
      const delta = Math.max(-1, Math.min(1, originalEvent.wheelDelta));
      if (view) {
        view.mousewheel(evt, localPoint.x, localPoint.y, delta);
      } else {
        this.trigger("blank:mousewheel", evt, localPoint.x, localPoint.y, delta);
      }
      this.trigger("paper:pan", evt, deltaX, deltaY);
    }
  },
  onevent: function(evt) {
    var eventNode = evt.currentTarget;
    var eventName = eventNode.getAttribute("event");
    if (eventName) {
      var view = this.findView(eventNode);
      if (view) {
        evt = normalizeEvent(evt);
        if (this.guard(evt, view)) return;
        var localPoint = this.snapToGrid(evt.clientX, evt.clientY);
        view.onevent(evt, eventName, localPoint.x, localPoint.y);
      }
    }
  },
  magnetEvent: function(evt, handler) {
    var magnetNode = evt.currentTarget;
    var magnetValue = magnetNode.getAttribute("magnet");
    if (magnetValue) {
      var view = this.findView(magnetNode);
      if (view) {
        evt = normalizeEvent(evt);
        if (this.guard(evt, view)) return;
        var localPoint = this.snapToGrid(evt.clientX, evt.clientY);
        handler.call(this, view, evt, magnetNode, localPoint.x, localPoint.y);
      }
    }
  },
  onmagnet: function(evt) {
    if (evt.button === 2) {
      this.contextMenuFired = true;
      this.magnetContextMenuFired = true;
      const contextmenuEvt = import_jquery6.default.Event(evt.originalEvent, {
        type: "contextmenu",
        data: evt.data,
        currentTarget: evt.currentTarget
      });
      this.magnetContextMenuTrigger(contextmenuEvt);
      if (contextmenuEvt.isPropagationStopped()) {
        evt.stopPropagation();
      }
    } else {
      this.magnetEvent(evt, function(view, evt2, _, x, y) {
        view.onmagnet(evt2, x, y);
      });
    }
  },
  magnetpointerdblclick: function(evt) {
    this.magnetEvent(evt, function(view, evt2, magnet, x, y) {
      view.magnetpointerdblclick(evt2, magnet, x, y);
    });
  },
  magnetcontextmenu: function(evt) {
    if (this.options.preventContextMenu) evt.preventDefault();
    if (this.magnetContextMenuFired) {
      this.magnetContextMenuFired = false;
      return;
    }
    this.magnetContextMenuTrigger(evt);
  },
  magnetContextMenuTrigger: function(evt) {
    this.magnetEvent(evt, function(view, evt2, magnet, x, y) {
      view.magnetcontextmenu(evt2, magnet, x, y);
    });
  },
  onlabel: function(evt) {
    var labelNode = evt.currentTarget;
    var view = this.findView(labelNode);
    if (!view) return;
    evt = normalizeEvent(evt);
    if (this.guard(evt, view)) return;
    const eventEvt = this.customEventTrigger(evt, view, labelNode);
    if (eventEvt) {
      if (eventEvt.isPropagationStopped()) return;
      evt.data = eventEvt.data;
    }
    var localPoint = this.snapToGrid(evt.clientX, evt.clientY);
    view.onlabel(evt, localPoint.x, localPoint.y);
  },
  getPointerArgs(evt) {
    const normalizedEvt = normalizeEvent(evt);
    const {
      x,
      y
    } = this.snapToGrid(normalizedEvt.clientX, normalizedEvt.clientY);
    return [normalizedEvt, x, y];
  },
  delegateDragEvents: function(view, data) {
    data || (data = {});
    this.eventData({
      data
    }, {
      sourceView: view || null,
      mousemoved: 0
    });
    this.delegateDocumentEvents(null, data);
  },
  // Guard the specified event. If the event should be ignored, guard returns `true`.
  // Otherwise, it returns `false`.
  guard: function(evt, view) {
    if (evt.type === "mousedown" && evt.button === 2) {
      return true;
    }
    if (this.options.guard && this.options.guard(evt, view)) {
      return true;
    }
    if (evt.data && evt.data.guarded !== void 0) {
      return evt.data.guarded;
    }
    const {
      target
    } = evt;
    if (this.GUARDED_TAG_NAMES.includes(target.tagName)) {
      return true;
    }
    if (view && view.model && view.model instanceof Cell) {
      return false;
    }
    if (this.svg === target || this.el === target || import_jquery6.default.contains(this.svg, target)) {
      return false;
    }
    return true;
  },
  setGridSize: function(gridSize) {
    const {
      options
    } = this;
    options.gridSize = gridSize;
    if (options.drawGrid && !options.drawGridSize) {
      this.drawGrid();
    }
    return this;
  },
  clearGrid: function() {
    if (this.$grid) {
      this.$grid.css("backgroundImage", "none");
    }
    return this;
  },
  _getGridRefs: function() {
    if (!this._gridCache) {
      this._gridCache = {
        root: V_default("svg", {
          width: "100%",
          height: "100%"
        }, V_default("defs")),
        patterns: {},
        add: function(id, vel) {
          V_default(this.root.node.childNodes[0]).append(vel);
          this.patterns[id] = vel;
          this.root.append(V_default("rect", {
            width: "100%",
            height: "100%",
            fill: "url(#" + id + ")"
          }));
        },
        get: function(id) {
          return this.patterns[id];
        },
        exist: function(id) {
          return this.patterns[id] !== void 0;
        }
      };
    }
    return this._gridCache;
  },
  setGrid: function(drawGrid) {
    this.clearGrid();
    this._gridCache = null;
    this._gridSettings = [];
    var optionsList = Array.isArray(drawGrid) ? drawGrid : [drawGrid || {}];
    optionsList.forEach(function(item) {
      this._gridSettings.push.apply(this._gridSettings, this._resolveDrawGridOption(item));
    }, this);
    return this;
  },
  _resolveDrawGridOption: function(opt) {
    var namespace = this.constructor.gridPatterns;
    if (isString(opt) && Array.isArray(namespace[opt])) {
      return namespace[opt].map(function(item) {
        return assign({}, item);
      });
    }
    var options = opt || {
      args: [{}]
    };
    var isArray = Array.isArray(options);
    var name = options.name;
    if (!isArray && !name && !options.markup) {
      name = "dot";
    }
    if (name && Array.isArray(namespace[name])) {
      var pattern = namespace[name].map(function(item) {
        return assign({}, item);
      });
      var args = Array.isArray(options.args) ? options.args : [options.args || {}];
      defaults(args[0], omit(opt, "args"));
      for (var i = 0; i < args.length; i++) {
        if (pattern[i]) {
          assign(pattern[i], args[i]);
        }
      }
      return pattern;
    }
    return isArray ? options : [options];
  },
  drawGrid: function(opt) {
    const gridSize = this.options.drawGridSize || this.options.gridSize;
    if (gridSize <= 1) {
      return this.clearGrid();
    }
    var localOptions = Array.isArray(opt) ? opt : [opt];
    var ctm = this.matrix();
    var refs = this._getGridRefs();
    this._gridSettings.forEach(function(gridLayerSetting, index) {
      var id = "pattern_" + index;
      var options = merge(gridLayerSetting, localOptions[index], {
        sx: ctm.a || 1,
        sy: ctm.d || 1,
        ox: ctm.e || 0,
        oy: ctm.f || 0
      });
      options.width = gridSize * (ctm.a || 1) * (options.scaleFactor || 1);
      options.height = gridSize * (ctm.d || 1) * (options.scaleFactor || 1);
      if (!refs.exist(id)) {
        refs.add(id, V_default("pattern", {
          id,
          patternUnits: "userSpaceOnUse"
        }, V_default(options.markup)));
      }
      var patternDefVel = refs.get(id);
      if (isFunction(options.update)) {
        options.update(patternDefVel.node.childNodes[0], options);
      }
      var x = options.ox % options.width;
      if (x < 0) x += options.width;
      var y = options.oy % options.height;
      if (y < 0) y += options.height;
      patternDefVel.attr({
        x,
        y,
        width: options.width,
        height: options.height
      });
    });
    var patternUri = new XMLSerializer().serializeToString(refs.root.node);
    patternUri = "url(data:image/svg+xml;base64," + btoa(patternUri) + ")";
    this.$grid.css("backgroundImage", patternUri);
    return this;
  },
  updateBackgroundImage: function(opt) {
    opt = opt || {};
    var backgroundPosition = opt.position || "center";
    var backgroundSize = opt.size || "auto auto";
    var currentScale = this.scale();
    var currentTranslate = this.translate();
    if (isObject(backgroundPosition)) {
      var x = currentTranslate.tx + currentScale.sx * (backgroundPosition.x || 0);
      var y = currentTranslate.ty + currentScale.sy * (backgroundPosition.y || 0);
      backgroundPosition = x + "px " + y + "px";
    }
    if (isObject(backgroundSize)) {
      backgroundSize = new Rect(backgroundSize).scale(currentScale.sx, currentScale.sy);
      backgroundSize = backgroundSize.width + "px " + backgroundSize.height + "px";
    }
    this.$background.css({
      backgroundSize,
      backgroundPosition
    });
  },
  drawBackgroundImage: function(img, opt) {
    if (!(img instanceof HTMLImageElement)) {
      this.$background.css("backgroundImage", "");
      return;
    }
    if (!this._background || this._background.id !== opt.id) {
      return;
    }
    opt = opt || {};
    var backgroundImage;
    var backgroundSize = opt.size;
    var backgroundRepeat = opt.repeat || "no-repeat";
    var backgroundOpacity = opt.opacity || 1;
    var backgroundQuality = Math.abs(opt.quality) || 1;
    var backgroundPattern = this.constructor.backgroundPatterns[camelCase(backgroundRepeat)];
    if (isFunction(backgroundPattern)) {
      img.width *= backgroundQuality;
      img.height *= backgroundQuality;
      var canvas = backgroundPattern(img, opt);
      if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("dia.Paper: background pattern must return an HTML Canvas instance");
      }
      backgroundImage = canvas.toDataURL("image/png");
      backgroundRepeat = "repeat";
      if (isObject(backgroundSize)) {
        backgroundSize.width *= canvas.width / img.width;
        backgroundSize.height *= canvas.height / img.height;
      } else if (backgroundSize === void 0) {
        opt.size = {
          width: canvas.width / backgroundQuality,
          height: canvas.height / backgroundQuality
        };
      }
    } else {
      backgroundImage = img.src;
      if (backgroundSize === void 0) {
        opt.size = {
          width: img.width,
          height: img.height
        };
      }
    }
    this.$background.css({
      opacity: backgroundOpacity,
      backgroundRepeat,
      backgroundImage: "url(" + backgroundImage + ")"
    });
    this.updateBackgroundImage(opt);
  },
  updateBackgroundColor: function(color) {
    this.$el.css("backgroundColor", color || "");
  },
  drawBackground: function(opt) {
    opt = opt || {};
    this.updateBackgroundColor(opt.color);
    if (opt.image) {
      opt = this._background = cloneDeep(opt);
      guid(opt);
      var img = document.createElement("img");
      img.onload = this.drawBackgroundImage.bind(this, img, opt);
      img.src = opt.image;
    } else {
      this.drawBackgroundImage(null);
      this._background = null;
    }
    return this;
  },
  setInteractivity: function(value) {
    this.options.interactive = value;
    invoke(this._views, "setInteractivity", value);
  },
  // Paper definitions.
  // ------------------
  isDefined: function(defId) {
    return !!this.svg.getElementById(defId);
  },
  defineFilter: function(filter2) {
    if (!isObject(filter2)) {
      throw new TypeError("dia.Paper: defineFilter() requires 1. argument to be an object.");
    }
    var filterId = filter2.id;
    var name = filter2.name;
    if (!filterId) {
      filterId = name + this.svg.id + hashCode(JSON.stringify(filter2));
    }
    if (!this.isDefined(filterId)) {
      var namespace = filter;
      var filterSVGString = namespace[name] && namespace[name](filter2.args || {});
      if (!filterSVGString) {
        throw new Error("Non-existing filter " + name);
      }
      var filterAttrs = assign({
        filterUnits: "objectBoundingBox",
        x: -1,
        y: -1,
        width: 3,
        height: 3
      }, filter2.attrs, {
        id: filterId
      });
      V_default(filterSVGString, filterAttrs).appendTo(this.defs);
    }
    return filterId;
  },
  defineGradient: function(gradient) {
    if (!isObject(gradient)) {
      throw new TypeError("dia.Paper: defineGradient() requires 1. argument to be an object.");
    }
    const {
      svg: svg2,
      defs
    } = this;
    const {
      type,
      // Generate a hash code from the stringified filter definition. This gives us
      // a unique filter ID for different definitions.
      id = type + svg2.id + hashCode(JSON.stringify(gradient)),
      stops,
      attrs = {}
    } = gradient;
    if (this.isDefined(id)) return id;
    const stopVEls = toArray(stops).map(({
      offset,
      color,
      opacity: opacity2
    }) => {
      return V_default("stop").attr({
        "offset": offset,
        "stop-color": color,
        "stop-opacity": Number.isFinite(opacity2) ? opacity2 : 1
      });
    });
    const gradientVEl = V_default(type, attrs, stopVEls);
    gradientVEl.id = id;
    gradientVEl.appendTo(defs);
    return id;
  },
  definePattern: function(pattern) {
    if (!isObject(pattern)) {
      throw new TypeError("dia.Paper: definePattern() requires 1. argument to be an object.");
    }
    const {
      svg: svg2,
      defs
    } = this;
    const {
      // Generate a hash code from the stringified filter definition. This gives us
      // a unique filter ID for different definitions.
      id = svg2.id + hashCode(JSON.stringify(pattern)),
      markup,
      attrs = {}
    } = pattern;
    if (!markup) {
      throw new TypeError("dia.Paper: definePattern() requires markup.");
    }
    if (this.isDefined(id)) return id;
    const patternVEl = V_default("pattern", {
      patternUnits: "userSpaceOnUse"
    });
    patternVEl.id = id;
    patternVEl.attr(attrs);
    if (typeof markup === "string") {
      patternVEl.append(V_default(markup));
    } else {
      const {
        fragment
      } = parseDOMJSON(markup);
      patternVEl.append(fragment);
    }
    patternVEl.appendTo(defs);
    return id;
  },
  defineMarker: function(marker) {
    if (!isObject(marker)) {
      throw new TypeError("dia.Paper: defineMarker() requires the first argument to be an object.");
    }
    const {
      svg: svg2,
      defs
    } = this;
    const {
      // Generate a hash code from the stringified filter definition. This gives us
      // a unique filter ID for different definitions.
      id = svg2.id + hashCode(JSON.stringify(marker)),
      // user-provided markup
      // (e.g. defined when creating link via `attrs/line/sourceMarker/markup`)
      markup,
      // user-provided attributes
      // (e.g. defined when creating link via `attrs/line/sourceMarker/attrs`)
      // note: `transform` attrs are ignored by browsers
      attrs = {},
      // deprecated - use `attrs/markerUnits` instead (which has higher priority)
      markerUnits = "userSpaceOnUse"
    } = marker;
    if (this.isDefined(id)) return id;
    const markerVEl = V_default("marker", {
      orient: "auto",
      overflow: "visible",
      markerUnits
    });
    markerVEl.id = id;
    markerVEl.attr(attrs);
    let markerContentVEl;
    if (markup) {
      let markupVEl;
      if (typeof markup === "string") {
        markupVEl = V_default(markup);
        markupVEl = Array.isArray(markupVEl) ? markupVEl : [markupVEl];
      } else {
        const {
          fragment
        } = parseDOMJSON(markup);
        markupVEl = V_default(fragment).children();
      }
      if (markupVEl.length > 1) {
        markerContentVEl = V_default("g").append(markupVEl);
      } else {
        markerContentVEl = markupVEl[0];
      }
    } else {
      const {
        type = "path"
      } = marker;
      markerContentVEl = V_default(type);
    }
    const markerAttrs = omit(marker, "type", "id", "markup", "attrs", "markerUnits");
    const markerAttrsKeys = Object.keys(markerAttrs);
    markerAttrsKeys.forEach((key) => {
      const value = markerAttrs[key];
      const markupValue = markerContentVEl.attr(key);
      if (markupValue == null) {
        markerContentVEl.attr(key, value);
      } else {
        switch (key) {
          case "transform":
            markerContentVEl.attr(key, value + " " + markupValue);
            break;
        }
      }
    });
    markerContentVEl.appendTo(markerVEl);
    markerVEl.appendTo(defs);
    return id;
  },
  customEventTrigger: function(evt, view, rootNode = view.el) {
    const eventNode = evt.target.closest("[event]");
    if (eventNode && rootNode !== eventNode && view.el.contains(eventNode)) {
      const eventEvt = normalizeEvent(import_jquery6.default.Event(evt.originalEvent, {
        data: evt.data,
        // Originally the event listener was attached to the event element.
        currentTarget: eventNode
      }));
      this.onevent(eventEvt);
      if (eventEvt.isDefaultPrevented()) {
        evt.preventDefault();
      }
      return eventEvt;
    }
    return null;
  }
}, {
  sorting: sortingTypes,
  Layers: LayersNames,
  backgroundPatterns: {
    flipXy: function(img) {
      var canvas = document.createElement("canvas");
      var imgWidth = img.width;
      var imgHeight = img.height;
      canvas.width = 2 * imgWidth;
      canvas.height = 2 * imgHeight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      ctx.setTransform(-1, 0, 0, -1, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      ctx.setTransform(-1, 0, 0, 1, canvas.width, 0);
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      ctx.setTransform(1, 0, 0, -1, 0, canvas.height);
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      return canvas;
    },
    flipX: function(img) {
      var canvas = document.createElement("canvas");
      var imgWidth = img.width;
      var imgHeight = img.height;
      canvas.width = imgWidth * 2;
      canvas.height = imgHeight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      ctx.translate(2 * imgWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      return canvas;
    },
    flipY: function(img) {
      var canvas = document.createElement("canvas");
      var imgWidth = img.width;
      var imgHeight = img.height;
      canvas.width = imgWidth;
      canvas.height = imgHeight * 2;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      ctx.translate(0, 2 * imgHeight);
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      return canvas;
    },
    watermark: function(img, opt) {
      opt = opt || {};
      var imgWidth = img.width;
      var imgHeight = img.height;
      var canvas = document.createElement("canvas");
      canvas.width = imgWidth * 3;
      canvas.height = imgHeight * 3;
      var ctx = canvas.getContext("2d");
      var angle = isNumber(opt.watermarkAngle) ? -opt.watermarkAngle : -20;
      var radians2 = toRad(angle);
      var stepX = canvas.width / 4;
      var stepY = canvas.height / 4;
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          if ((i + j) % 2 > 0) {
            ctx.setTransform(1, 0, 0, 1, (2 * i - 1) * stepX, (2 * j - 1) * stepY);
            ctx.rotate(radians2);
            ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
          }
        }
      }
      return canvas;
    }
  },
  gridPatterns: {
    dot: [{
      color: "#AAAAAA",
      thickness: 1,
      markup: "rect",
      update: function(el, opt) {
        V_default(el).attr({
          width: opt.thickness * opt.sx,
          height: opt.thickness * opt.sy,
          fill: opt.color
        });
      }
    }],
    fixedDot: [{
      color: "#AAAAAA",
      thickness: 1,
      markup: "rect",
      update: function(el, opt) {
        var size = opt.sx <= 1 ? opt.thickness * opt.sx : opt.thickness;
        V_default(el).attr({
          width: size,
          height: size,
          fill: opt.color
        });
      }
    }],
    mesh: [{
      color: "#AAAAAA",
      thickness: 1,
      markup: "path",
      update: function(el, opt) {
        var d;
        var width = opt.width;
        var height = opt.height;
        var thickness = opt.thickness;
        if (width - thickness >= 0 && height - thickness >= 0) {
          d = ["M", width, 0, "H0 M0 0 V0", height].join(" ");
        } else {
          d = "M 0 0 0 0";
        }
        V_default(el).attr({
          "d": d,
          stroke: opt.color,
          "stroke-width": opt.thickness
        });
      }
    }],
    doubleMesh: [{
      color: "#AAAAAA",
      thickness: 1,
      markup: "path",
      update: function(el, opt) {
        var d;
        var width = opt.width;
        var height = opt.height;
        var thickness = opt.thickness;
        if (width - thickness >= 0 && height - thickness >= 0) {
          d = ["M", width, 0, "H0 M0 0 V0", height].join(" ");
        } else {
          d = "M 0 0 0 0";
        }
        V_default(el).attr({
          "d": d,
          stroke: opt.color,
          "stroke-width": opt.thickness
        });
      }
    }, {
      color: "#000000",
      thickness: 3,
      scaleFactor: 4,
      markup: "path",
      update: function(el, opt) {
        var d;
        var width = opt.width;
        var height = opt.height;
        var thickness = opt.thickness;
        if (width - thickness >= 0 && height - thickness >= 0) {
          d = ["M", width, 0, "H0 M0 0 V0", height].join(" ");
        } else {
          d = "M 0 0 0 0";
        }
        V_default(el).attr({
          "d": d,
          stroke: opt.color,
          "stroke-width": opt.thickness
        });
      }
    }]
  }
});

// node_modules/jointjs/src/dia/ToolView.mjs
var ToolView = View.extend({
  name: null,
  tagName: "g",
  className: "tool",
  svgElement: true,
  _visible: true,
  init: function() {
    var name = this.name;
    if (name) this.vel.attr("data-tool-name", name);
  },
  configure: function(view, toolsView) {
    this.relatedView = view;
    this.paper = view.paper;
    this.parentView = toolsView;
    this.simulateRelatedView(this.el);
    this.delegateEvents();
    return this;
  },
  simulateRelatedView: function(el) {
    if (el) el.setAttribute("model-id", this.relatedView.model.id);
  },
  getName: function() {
    return this.name;
  },
  show: function() {
    this.el.style.display = "";
    this._visible = true;
  },
  hide: function() {
    this.el.style.display = "none";
    this._visible = false;
  },
  isVisible: function() {
    return !!this._visible;
  },
  focus: function() {
    var opacity2 = this.options.focusOpacity;
    if (isFinite(opacity2)) this.el.style.opacity = opacity2;
    this.parentView.focusTool(this);
  },
  blur: function() {
    this.el.style.opacity = "";
    this.parentView.blurTool(this);
  },
  update: function() {
  },
  guard: function(evt) {
    const {
      paper,
      relatedView
    } = this;
    if (!paper || !relatedView) return true;
    return paper.guard(evt, relatedView);
  }
});

// node_modules/jointjs/src/dia/ToolsView.mjs
var ToolsView = View.extend({
  tagName: "g",
  className: "tools",
  svgElement: true,
  tools: null,
  isRendered: false,
  options: {
    tools: null,
    relatedView: null,
    name: null
    // layer?: LayersNames.TOOLS
    // z?: number
  },
  configure: function(options) {
    options = assign(this.options, options);
    var tools = options.tools;
    if (!Array.isArray(tools)) return this;
    var relatedView = options.relatedView;
    if (!(relatedView instanceof CellView)) return this;
    var views2 = this.tools = [];
    for (var i = 0, n = tools.length; i < n; i++) {
      var tool = tools[i];
      if (!(tool instanceof ToolView)) continue;
      tool.configure(relatedView, this);
      this.vel.append(tool.el);
      views2.push(tool);
    }
    this.isRendered = false;
    relatedView.requestUpdate(relatedView.getFlag("TOOLS"));
    return this;
  },
  getName: function() {
    return this.options.name;
  },
  update: function(opt) {
    opt || (opt = {});
    var tools = this.tools;
    if (!tools) return this;
    var isRendered = this.isRendered;
    for (var i = 0, n = tools.length; i < n; i++) {
      var tool = tools[i];
      if (!isRendered) {
        tool.render();
      } else if (opt.tool !== tool.cid && tool.isVisible()) {
        tool.update();
      }
    }
    if (!this.isMounted()) {
      this.mount();
    }
    if (!isRendered) {
      this.blurTool();
      this.isRendered = true;
    }
    return this;
  },
  focusTool: function(focusedTool) {
    var tools = this.tools;
    if (!tools) return this;
    for (var i = 0, n = tools.length; i < n; i++) {
      var tool = tools[i];
      if (focusedTool === tool) {
        tool.show();
      } else {
        tool.hide();
      }
    }
    return this;
  },
  blurTool: function(blurredTool) {
    var tools = this.tools;
    if (!tools) return this;
    for (var i = 0, n = tools.length; i < n; i++) {
      var tool = tools[i];
      if (tool !== blurredTool && !tool.isVisible()) {
        tool.show();
        tool.update();
      }
    }
    return this;
  },
  hide: function() {
    return this.focusTool(null);
  },
  show: function() {
    return this.blurTool(null);
  },
  onRemove: function() {
    var tools = this.tools;
    if (!tools) return this;
    for (var i = 0, n = tools.length; i < n; i++) {
      tools[i].remove();
    }
    this.tools = null;
  },
  mount: function() {
    const {
      options,
      el
    } = this;
    const {
      relatedView,
      layer = LayersNames.TOOLS,
      z
    } = options;
    if (relatedView) {
      if (layer) {
        relatedView.paper.getLayerView(layer).insertSortedNode(el, z);
      } else {
        relatedView.el.appendChild(el);
      }
    }
    return this;
  }
});

// node_modules/jointjs/src/layout/DirectedGraph/DirectedGraph.mjs
var DirectedGraph = {
  exportElement: function(element) {
    return element.size();
  },
  exportLink: function(link) {
    var labelSize = link.get("labelSize") || {};
    var edge = {
      // The number of ranks to keep between the source and target of the edge.
      minLen: link.get("minLen") || 1,
      // The weight to assign edges. Higher weight edges are generally
      // made shorter and straighter than lower weight edges.
      weight: link.get("weight") || 1,
      // Where to place the label relative to the edge.
      // l = left, c = center r = right.
      labelpos: link.get("labelPosition") || "c",
      // How many pixels to move the label away from the edge.
      // Applies only when labelpos is l or r.
      labeloffset: link.get("labelOffset") || 0,
      // The width of the edge label in pixels.
      width: labelSize.width || 0,
      // The height of the edge label in pixels.
      height: labelSize.height || 0
    };
    return edge;
  },
  importElement: function(opt, v, gl) {
    var element = this.getCell(v);
    var glNode = gl.node(v);
    if (opt.setPosition) {
      opt.setPosition(element, glNode);
    } else {
      element.set("position", {
        x: glNode.x - glNode.width / 2,
        y: glNode.y - glNode.height / 2
      });
    }
  },
  importLink: function(opt, edgeObj, gl) {
    const SIMPLIFY_THRESHOLD = 1e-3;
    const link = this.getCell(edgeObj.name);
    const glEdge = gl.edge(edgeObj);
    const points = glEdge.points || [];
    const polyline = new Polyline(points);
    if (opt.setVertices || opt.setLinkVertices) {
      if (isFunction(opt.setVertices)) {
        opt.setVertices(link, points);
      } else {
        polyline.simplify({
          threshold: SIMPLIFY_THRESHOLD
        });
        const polylinePoints = polyline.points.map((point2) => point2.toJSON());
        const numPolylinePoints = polylinePoints.length;
        link.set("vertices", polylinePoints.slice(1, numPolylinePoints - 1));
      }
    }
    if (opt.setLabels && "x" in glEdge && "y" in glEdge) {
      const labelPosition = {
        x: glEdge.x,
        y: glEdge.y
      };
      if (isFunction(opt.setLabels)) {
        opt.setLabels(link, labelPosition, points);
      } else {
        const length2 = polyline.closestPointLength(labelPosition);
        const closestPoint = polyline.pointAtLength(length2);
        const distance = length2 / polyline.length();
        const offset = new Point(labelPosition).difference(closestPoint).toJSON();
        link.label(0, {
          position: {
            distance,
            offset
          }
        });
      }
    }
  },
  layout: function(graphOrCells, opt) {
    var graph;
    if (graphOrCells instanceof Graph) {
      graph = graphOrCells;
    } else {
      graph = new Graph().resetCells(graphOrCells, {
        dry: true,
        sort: false
      });
    }
    graphOrCells = null;
    opt = defaults(opt || {}, {
      resizeClusters: true,
      clusterPadding: 10,
      exportElement: this.exportElement,
      exportLink: this.exportLink
    });
    const dagreUtil = opt.dagre || (typeof dagre !== "undefined" ? dagre : void 0);
    if (dagreUtil === void 0) throw new Error('The the "dagre" utility is a mandatory dependency.');
    var glGraph = DirectedGraph.toGraphLib(graph, {
      graphlib: opt.graphlib,
      directed: true,
      // We are about to use edge naming feature.
      multigraph: true,
      // We are able to layout graphs with embeds.
      compound: true,
      setNodeLabel: opt.exportElement,
      setEdgeLabel: opt.exportLink,
      setEdgeName: function(link) {
        return link.id;
      }
    });
    var glLabel = {};
    var marginX = opt.marginX || 0;
    var marginY = opt.marginY || 0;
    if (opt.rankDir) glLabel.rankdir = opt.rankDir;
    if (opt.align) glLabel.align = opt.align;
    if (opt.nodeSep) glLabel.nodesep = opt.nodeSep;
    if (opt.edgeSep) glLabel.edgesep = opt.edgeSep;
    if (opt.rankSep) glLabel.ranksep = opt.rankSep;
    if (opt.ranker) glLabel.ranker = opt.ranker;
    if (marginX) glLabel.marginx = marginX;
    if (marginY) glLabel.marginy = marginY;
    glGraph.setGraph(glLabel);
    dagreUtil.layout(glGraph, {
      debugTiming: !!opt.debugTiming
    });
    graph.startBatch("layout");
    DirectedGraph.fromGraphLib(glGraph, {
      importNode: this.importElement.bind(graph, opt),
      importEdge: this.importLink.bind(graph, opt)
    });
    if (opt.resizeClusters) {
      var clusters = glGraph.nodes().filter(function(v) {
        return glGraph.children(v).length > 0;
      }).map(graph.getCell.bind(graph)).sort(function(aCluster, bCluster) {
        return bCluster.getAncestors().length - aCluster.getAncestors().length;
      });
      invoke(clusters, "fitToChildren", {
        padding: opt.clusterPadding
      });
    }
    graph.stopBatch("layout");
    var glSize = glGraph.graph();
    return new Rect(marginX, marginY, Math.abs(glSize.width - 2 * marginX), Math.abs(glSize.height - 2 * marginY));
  },
  fromGraphLib: function(glGraph, opt) {
    opt = opt || {};
    var importNode = opt.importNode || noop;
    var importEdge = opt.importEdge || noop;
    var graph = this instanceof Graph ? this : new Graph();
    glGraph.nodes().forEach(function(node) {
      importNode.call(graph, node, glGraph, graph, opt);
    });
    glGraph.edges().forEach(function(edge) {
      importEdge.call(graph, edge, glGraph, graph, opt);
    });
    return graph;
  },
  // Create new graphlib graph from existing JointJS graph.
  toGraphLib: function(graph, opt) {
    opt = opt || {};
    const graphlibUtil = opt.graphlib || (typeof graphlib !== "undefined" ? graphlib : void 0);
    if (graphlibUtil === void 0) throw new Error('The the "graphlib" utility is a mandatory dependency.');
    var glGraphType = pick(opt, "directed", "compound", "multigraph");
    var glGraph = new graphlibUtil.Graph(glGraphType);
    var setNodeLabel = opt.setNodeLabel || noop;
    var setEdgeLabel = opt.setEdgeLabel || noop;
    var setEdgeName = opt.setEdgeName || noop;
    var collection = graph.get("cells");
    for (var i = 0, n = collection.length; i < n; i++) {
      var cell = collection.at(i);
      if (cell.isLink()) {
        var source = cell.get("source");
        var target = cell.get("target");
        if (!source.id || !target.id) break;
        glGraph.setEdge(source.id, target.id, setEdgeLabel(cell), setEdgeName(cell));
      } else {
        glGraph.setNode(cell.id, setNodeLabel(cell));
        if (glGraph.isCompound() && cell.has("parent")) {
          var parentId = cell.get("parent");
          if (collection.has(parentId)) {
            glGraph.setParent(cell.id, parentId);
          }
        }
      }
    }
    return glGraph;
  }
};
Graph.prototype.toGraphLib = function(opt) {
  return DirectedGraph.toGraphLib(this, opt);
};
Graph.prototype.fromGraphLib = function(glGraph, opt) {
  return DirectedGraph.fromGraphLib.call(this, glGraph, opt);
};

// node_modules/jointjs/src/shapes/index.mjs
var shapes_exports = {};
__export(shapes_exports, {
  basic: () => basic_exports,
  chess: () => chess_exports,
  devs: () => devs_exports,
  erd: () => erd_exports,
  fsa: () => fsa_exports,
  logic: () => logic_exports,
  org: () => org_exports,
  pn: () => pn_exports,
  standard: () => standard_exports,
  uml: () => uml_exports
});

// node_modules/jointjs/src/shapes/basic.mjs
var basic_exports = {};
__export(basic_exports, {
  Circle: () => Circle,
  Ellipse: () => Ellipse2,
  Generic: () => Generic,
  Image: () => Image,
  Path: () => Path2,
  Polygon: () => Polygon2,
  Polyline: () => Polyline2,
  Rect: () => Rect2,
  Rhombus: () => Rhombus,
  Text: () => Text,
  TextBlock: () => TextBlock,
  TextBlockView: () => TextBlockView,
  TextView: () => TextView
});

// node_modules/jointjs/src/env/index.mjs
var env = {
  _results: {},
  _tests: {
    svgforeignobject: function() {
      return !!document.createElementNS && /SVGForeignObject/.test({}.toString.call(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")));
    }
  },
  addTest: function(name, fn2) {
    return this._tests[name] = fn2;
  },
  test: function(name) {
    var fn2 = this._tests[name];
    if (!fn2) {
      throw new Error('Test not defined ("' + name + '"). Use `joint.env.addTest(name, fn) to add a new test.`');
    }
    var result2 = this._results[name];
    if (typeof result2 !== "undefined") {
      return result2;
    }
    try {
      result2 = fn2();
    } catch (error) {
      result2 = false;
    }
    this._results[name] = result2;
    return result2;
  }
};

// node_modules/jointjs/src/shapes/basic.mjs
var Generic = Element2.define("basic.Generic", {
  attrs: {
    ".": {
      fill: "#ffffff",
      stroke: "none"
    }
  }
});
var Rect2 = Generic.define("basic.Rect", {
  attrs: {
    "rect": {
      fill: "#ffffff",
      stroke: "#000000",
      width: 100,
      height: 60
    },
    "text": {
      fill: "#000000",
      text: "",
      "font-size": 14,
      "ref-x": 0.5,
      "ref-y": 0.5,
      "text-anchor": "middle",
      "y-alignment": "middle",
      "font-family": "Arial, helvetica, sans-serif"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>'
});
var TextView = ElementView.extend({
  presentationAttributes: ElementView.addPresentationAttributes({
    // The element view is not automatically re-scaled to fit the model size
    // when the attribute 'attrs' is changed.
    attrs: ["SCALE"]
  }),
  confirmUpdate: function() {
    var flags = ElementView.prototype.confirmUpdate.apply(this, arguments);
    if (this.hasFlag(flags, "SCALE")) {
      this.resize();
      flags = this.removeFlag(flags, "SCALE");
    }
    return flags;
  }
});
var Text = Generic.define("basic.Text", {
  attrs: {
    "text": {
      "font-size": 18,
      fill: "#000000"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><text/></g></g>'
});
var Circle = Generic.define("basic.Circle", {
  size: {
    width: 60,
    height: 60
  },
  attrs: {
    "circle": {
      fill: "#ffffff",
      stroke: "#000000",
      r: 30,
      cx: 30,
      cy: 30
    },
    "text": {
      "font-size": 14,
      text: "",
      "text-anchor": "middle",
      "ref-x": 0.5,
      "ref-y": 0.5,
      "y-alignment": "middle",
      fill: "#000000",
      "font-family": "Arial, helvetica, sans-serif"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><circle/></g><text/></g>'
});
var Ellipse2 = Generic.define("basic.Ellipse", {
  size: {
    width: 60,
    height: 40
  },
  attrs: {
    "ellipse": {
      fill: "#ffffff",
      stroke: "#000000",
      rx: 30,
      ry: 20,
      cx: 30,
      cy: 20
    },
    "text": {
      "font-size": 14,
      text: "",
      "text-anchor": "middle",
      "ref-x": 0.5,
      "ref-y": 0.5,
      "y-alignment": "middle",
      fill: "#000000",
      "font-family": "Arial, helvetica, sans-serif"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><ellipse/></g><text/></g>'
});
var Polygon2 = Generic.define("basic.Polygon", {
  size: {
    width: 60,
    height: 40
  },
  attrs: {
    "polygon": {
      fill: "#ffffff",
      stroke: "#000000"
    },
    "text": {
      "font-size": 14,
      text: "",
      "text-anchor": "middle",
      "ref-x": 0.5,
      "ref-dy": 20,
      "y-alignment": "middle",
      fill: "#000000",
      "font-family": "Arial, helvetica, sans-serif"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><polygon/></g><text/></g>'
});
var Polyline2 = Generic.define("basic.Polyline", {
  size: {
    width: 60,
    height: 40
  },
  attrs: {
    "polyline": {
      fill: "#ffffff",
      stroke: "#000000"
    },
    "text": {
      "font-size": 14,
      text: "",
      "text-anchor": "middle",
      "ref-x": 0.5,
      "ref-dy": 20,
      "y-alignment": "middle",
      fill: "#000000",
      "font-family": "Arial, helvetica, sans-serif"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><polyline/></g><text/></g>'
});
var Image = Generic.define("basic.Image", {
  attrs: {
    "text": {
      "font-size": 14,
      text: "",
      "text-anchor": "middle",
      "ref-x": 0.5,
      "ref-dy": 20,
      "y-alignment": "middle",
      fill: "#000000",
      "font-family": "Arial, helvetica, sans-serif"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><image/></g><text/></g>'
});
var Path2 = Generic.define("basic.Path", {
  size: {
    width: 60,
    height: 60
  },
  attrs: {
    "path": {
      fill: "#ffffff",
      stroke: "#000000"
    },
    "text": {
      "font-size": 14,
      text: "",
      "text-anchor": "middle",
      "ref": "path",
      "ref-x": 0.5,
      "ref-dy": 10,
      fill: "#000000",
      "font-family": "Arial, helvetica, sans-serif"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><path/></g><text/></g>'
});
var Rhombus = Path2.define("basic.Rhombus", {
  attrs: {
    "path": {
      d: "M 30 0 L 60 30 30 60 0 30 z"
    },
    "text": {
      "ref-y": 0.5,
      "ref-dy": null,
      "y-alignment": "middle"
    }
  }
});
var svgForeignObjectSupported = env.test("svgforeignobject");
var TextBlock = Generic.define("basic.TextBlock", {
  // see joint.css for more element styles
  attrs: {
    rect: {
      fill: "#ffffff",
      stroke: "#000000",
      width: 80,
      height: 100
    },
    text: {
      fill: "#000000",
      "font-size": 14,
      "font-family": "Arial, helvetica, sans-serif"
    },
    ".content": {
      text: "",
      "ref-x": 0.5,
      "ref-y": 0.5,
      "y-alignment": "middle",
      "x-alignment": "middle"
    }
  },
  content: ""
}, {
  markup: ['<g class="rotatable">', '<g class="scalable"><rect/></g>', svgForeignObjectSupported ? '<foreignObject class="fobj"><body xmlns="http://www.w3.org/1999/xhtml"><div class="content"/></body></foreignObject>' : '<text class="content"/>', "</g>"].join(""),
  initialize: function() {
    this.listenTo(this, "change:size", this.updateSize);
    this.listenTo(this, "change:content", this.updateContent);
    this.updateSize(this, this.get("size"));
    this.updateContent(this, this.get("content"));
    Generic.prototype.initialize.apply(this, arguments);
  },
  updateSize: function(cell, size) {
    this.attr({
      ".fobj": assign({}, size),
      div: {
        style: assign({}, size)
      }
    });
  },
  updateContent: function(cell, content) {
    if (svgForeignObjectSupported) {
      this.attr({
        ".content": {
          html: sanitizeHTML(content)
        }
      });
    } else {
      this.attr({
        ".content": {
          text: content
        }
      });
    }
  },
  // Here for backwards compatibility:
  setForeignObjectSize: function() {
    this.updateSize.apply(this, arguments);
  },
  // Here for backwards compatibility:
  setDivContent: function() {
    this.updateContent.apply(this, arguments);
  }
});
var TextBlockView = ElementView.extend({
  presentationAttributes: svgForeignObjectSupported ? ElementView.prototype.presentationAttributes : ElementView.addPresentationAttributes({
    content: ["CONTENT"],
    size: ["CONTENT"]
  }),
  initFlag: ["RENDER", "CONTENT"],
  confirmUpdate: function() {
    var flags = ElementView.prototype.confirmUpdate.apply(this, arguments);
    if (this.hasFlag(flags, "CONTENT")) {
      this.updateContent(this.model);
      flags = this.removeFlag(flags, "CONTENT");
    }
    return flags;
  },
  update: function(_, renderingOnlyAttrs) {
    var model = this.model;
    if (!svgForeignObjectSupported) {
      var noTextAttrs = omit(renderingOnlyAttrs || model.get("attrs"), ".content");
      ElementView.prototype.update.call(this, model, noTextAttrs);
      if (!renderingOnlyAttrs || has(renderingOnlyAttrs, ".content")) {
        this.updateContent(model, renderingOnlyAttrs);
      }
    } else {
      ElementView.prototype.update.call(this, model, renderingOnlyAttrs);
    }
  },
  updateContent: function(cell, renderingOnlyAttrs) {
    var textAttrs = merge({}, (renderingOnlyAttrs || cell.get("attrs"))[".content"]);
    textAttrs = omit(textAttrs, "text");
    var text = breakText(cell.get("content"), cell.get("size"), textAttrs, {
      // measuring sandbox svg document
      svgDocument: this.paper.svg
    });
    var attrs = setByPath({}, ".content", textAttrs, "/");
    attrs[".content"].text = text;
    ElementView.prototype.update.call(this, cell, attrs);
  }
});

// node_modules/jointjs/src/shapes/standard.mjs
var standard_exports = {};
__export(standard_exports, {
  BorderedImage: () => BorderedImage,
  Circle: () => Circle2,
  Cylinder: () => Cylinder,
  DoubleLink: () => DoubleLink,
  Ellipse: () => Ellipse3,
  EmbeddedImage: () => EmbeddedImage,
  HeaderedRectangle: () => HeaderedRectangle,
  Image: () => Image2,
  InscribedImage: () => InscribedImage,
  Link: () => Link2,
  Path: () => Path3,
  Polygon: () => Polygon3,
  Polyline: () => Polyline3,
  Rectangle: () => Rectangle,
  ShadowLink: () => ShadowLink,
  TextBlock: () => TextBlock2
});
var Rectangle = Element2.define("standard.Rectangle", {
  attrs: {
    body: {
      refWidth: "100%",
      refHeight: "100%",
      strokeWidth: 2,
      stroke: "#000000",
      fill: "#FFFFFF"
    },
    label: {
      textVerticalAnchor: "middle",
      textAnchor: "middle",
      refX: "50%",
      refY: "50%",
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "rect",
    selector: "body"
  }, {
    tagName: "text",
    selector: "label"
  }]
});
var Circle2 = Element2.define("standard.Circle", {
  attrs: {
    body: {
      refCx: "50%",
      refCy: "50%",
      refR: "50%",
      strokeWidth: 2,
      stroke: "#333333",
      fill: "#FFFFFF"
    },
    label: {
      textVerticalAnchor: "middle",
      textAnchor: "middle",
      refX: "50%",
      refY: "50%",
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "circle",
    selector: "body"
  }, {
    tagName: "text",
    selector: "label"
  }]
});
var Ellipse3 = Element2.define("standard.Ellipse", {
  attrs: {
    body: {
      refCx: "50%",
      refCy: "50%",
      refRx: "50%",
      refRy: "50%",
      strokeWidth: 2,
      stroke: "#333333",
      fill: "#FFFFFF"
    },
    label: {
      textVerticalAnchor: "middle",
      textAnchor: "middle",
      refX: "50%",
      refY: "50%",
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "ellipse",
    selector: "body"
  }, {
    tagName: "text",
    selector: "label"
  }]
});
var Path3 = Element2.define("standard.Path", {
  attrs: {
    body: {
      refD: "M 0 0 L 10 0 10 10 0 10 Z",
      strokeWidth: 2,
      stroke: "#333333",
      fill: "#FFFFFF"
    },
    label: {
      textVerticalAnchor: "middle",
      textAnchor: "middle",
      refX: "50%",
      refY: "50%",
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "path",
    selector: "body"
  }, {
    tagName: "text",
    selector: "label"
  }]
});
var Polygon3 = Element2.define("standard.Polygon", {
  attrs: {
    body: {
      refPoints: "0 0 10 0 10 10 0 10",
      strokeWidth: 2,
      stroke: "#333333",
      fill: "#FFFFFF"
    },
    label: {
      textVerticalAnchor: "middle",
      textAnchor: "middle",
      refX: "50%",
      refY: "50%",
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "polygon",
    selector: "body"
  }, {
    tagName: "text",
    selector: "label"
  }]
});
var Polyline3 = Element2.define("standard.Polyline", {
  attrs: {
    body: {
      refPoints: "0 0 10 0 10 10 0 10 0 0",
      strokeWidth: 2,
      stroke: "#333333",
      fill: "#FFFFFF"
    },
    label: {
      textVerticalAnchor: "middle",
      textAnchor: "middle",
      refX: "50%",
      refY: "50%",
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "polyline",
    selector: "body"
  }, {
    tagName: "text",
    selector: "label"
  }]
});
var Image2 = Element2.define("standard.Image", {
  attrs: {
    image: {
      refWidth: "100%",
      refHeight: "100%"
      // xlinkHref: '[URL]'
    },
    label: {
      textVerticalAnchor: "top",
      textAnchor: "middle",
      refX: "50%",
      refY: "100%",
      refY2: 10,
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "image",
    selector: "image"
  }, {
    tagName: "text",
    selector: "label"
  }]
});
var BorderedImage = Element2.define("standard.BorderedImage", {
  attrs: {
    border: {
      refWidth: "100%",
      refHeight: "100%",
      stroke: "#333333",
      strokeWidth: 2
    },
    background: {
      refWidth: -1,
      refHeight: -1,
      x: 0.5,
      y: 0.5,
      fill: "#FFFFFF"
    },
    image: {
      // xlinkHref: '[URL]'
      refWidth: -1,
      refHeight: -1,
      x: 0.5,
      y: 0.5
    },
    label: {
      textVerticalAnchor: "top",
      textAnchor: "middle",
      refX: "50%",
      refY: "100%",
      refY2: 10,
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "rect",
    selector: "background",
    attributes: {
      "stroke": "none"
    }
  }, {
    tagName: "image",
    selector: "image"
  }, {
    tagName: "rect",
    selector: "border",
    attributes: {
      "fill": "none"
    }
  }, {
    tagName: "text",
    selector: "label"
  }]
});
var EmbeddedImage = Element2.define("standard.EmbeddedImage", {
  attrs: {
    body: {
      refWidth: "100%",
      refHeight: "100%",
      stroke: "#333333",
      fill: "#FFFFFF",
      strokeWidth: 2
    },
    image: {
      // xlinkHref: '[URL]'
      refWidth: "30%",
      refHeight: -20,
      x: 10,
      y: 10,
      preserveAspectRatio: "xMidYMin"
    },
    label: {
      textVerticalAnchor: "top",
      textAnchor: "left",
      refX: "30%",
      refX2: 20,
      // 10 + 10
      refY: 10,
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "rect",
    selector: "body"
  }, {
    tagName: "image",
    selector: "image"
  }, {
    tagName: "text",
    selector: "label"
  }]
});
var InscribedImage = Element2.define("standard.InscribedImage", {
  attrs: {
    border: {
      refRx: "50%",
      refRy: "50%",
      refCx: "50%",
      refCy: "50%",
      stroke: "#333333",
      strokeWidth: 2
    },
    background: {
      refRx: "50%",
      refRy: "50%",
      refCx: "50%",
      refCy: "50%",
      fill: "#FFFFFF"
    },
    image: {
      // The image corners touch the border when its size is Math.sqrt(2) / 2 = 0.707.. ~= 70%
      refWidth: "68%",
      refHeight: "68%",
      // The image offset is calculated as (100% - 68%) / 2
      refX: "16%",
      refY: "16%",
      preserveAspectRatio: "xMidYMid"
      // xlinkHref: '[URL]'
    },
    label: {
      textVerticalAnchor: "top",
      textAnchor: "middle",
      refX: "50%",
      refY: "100%",
      refY2: 10,
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "ellipse",
    selector: "background"
  }, {
    tagName: "image",
    selector: "image"
  }, {
    tagName: "ellipse",
    selector: "border",
    attributes: {
      "fill": "none"
    }
  }, {
    tagName: "text",
    selector: "label"
  }]
});
var HeaderedRectangle = Element2.define("standard.HeaderedRectangle", {
  attrs: {
    body: {
      refWidth: "100%",
      refHeight: "100%",
      strokeWidth: 2,
      stroke: "#000000",
      fill: "#FFFFFF"
    },
    header: {
      refWidth: "100%",
      height: 30,
      strokeWidth: 2,
      stroke: "#000000",
      fill: "#FFFFFF"
    },
    headerText: {
      textVerticalAnchor: "middle",
      textAnchor: "middle",
      refX: "50%",
      refY: 15,
      fontSize: 16,
      fill: "#333333"
    },
    bodyText: {
      textVerticalAnchor: "middle",
      textAnchor: "middle",
      refX: "50%",
      refY: "50%",
      refY2: 15,
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "rect",
    selector: "body"
  }, {
    tagName: "rect",
    selector: "header"
  }, {
    tagName: "text",
    selector: "headerText"
  }, {
    tagName: "text",
    selector: "bodyText"
  }]
});
var CYLINDER_TILT = 10;
var Cylinder = Element2.define("standard.Cylinder", {
  attrs: {
    body: {
      lateralArea: CYLINDER_TILT,
      fill: "#FFFFFF",
      stroke: "#333333",
      strokeWidth: 2
    },
    top: {
      refCx: "50%",
      cy: CYLINDER_TILT,
      refRx: "50%",
      ry: CYLINDER_TILT,
      fill: "#FFFFFF",
      stroke: "#333333",
      strokeWidth: 2
    },
    label: {
      textVerticalAnchor: "middle",
      textAnchor: "middle",
      refX: "50%",
      refY: "100%",
      refY2: 15,
      fontSize: 14,
      fill: "#333333"
    }
  }
}, {
  markup: [{
    tagName: "path",
    selector: "body"
  }, {
    tagName: "ellipse",
    selector: "top"
  }, {
    tagName: "text",
    selector: "label"
  }],
  topRy: function(t, opt) {
    if (t === void 0) return this.attr("body/lateralArea");
    var isPercentageSetter = isPercentage(t);
    var bodyAttrs = {
      lateralArea: t
    };
    var topAttrs = isPercentageSetter ? {
      refCy: t,
      refRy: t,
      cy: null,
      ry: null
    } : {
      refCy: null,
      refRy: null,
      cy: t,
      ry: t
    };
    return this.attr({
      body: bodyAttrs,
      top: topAttrs
    }, opt);
  }
}, {
  attributes: {
    lateralArea: {
      set: function(t, refBBox) {
        var isPercentageSetter = isPercentage(t);
        if (isPercentageSetter) t = parseFloat(t) / 100;
        var x = refBBox.x;
        var y = refBBox.y;
        var w = refBBox.width;
        var h = refBBox.height;
        var rx = w / 2;
        var ry = isPercentageSetter ? h * t : t;
        var kappa = V_default.KAPPA;
        var cx = kappa * rx;
        var cy = kappa * (isPercentageSetter ? h * t : t);
        var xLeft = x;
        var xCenter = x + w / 2;
        var xRight = x + w;
        var ySideTop = y + ry;
        var yCurveTop = ySideTop - ry;
        var ySideBottom = y + h - ry;
        var yCurveBottom = y + h;
        var data = ["M", xLeft, ySideTop, "L", xLeft, ySideBottom, "C", x, ySideBottom + cy, xCenter - cx, yCurveBottom, xCenter, yCurveBottom, "C", xCenter + cx, yCurveBottom, xRight, ySideBottom + cy, xRight, ySideBottom, "L", xRight, ySideTop, "C", xRight, ySideTop - cy, xCenter + cx, yCurveTop, xCenter, yCurveTop, "C", xCenter - cx, yCurveTop, xLeft, ySideTop - cy, xLeft, ySideTop, "Z"];
        return {
          d: data.join(" ")
        };
      }
    }
  }
});
var foLabelMarkup = {
  tagName: "foreignObject",
  selector: "foreignObject",
  attributes: {
    "overflow": "hidden"
  },
  children: [{
    tagName: "div",
    namespaceURI: "http://www.w3.org/1999/xhtml",
    selector: "label",
    style: {
      width: "100%",
      height: "100%",
      position: "static",
      backgroundColor: "transparent",
      textAlign: "center",
      margin: 0,
      padding: "0px 5px",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }]
};
var svgLabelMarkup = {
  tagName: "text",
  selector: "label",
  attributes: {
    "text-anchor": "middle"
  }
};
var labelMarkup = env.test("svgforeignobject") ? foLabelMarkup : svgLabelMarkup;
var TextBlock2 = Element2.define("standard.TextBlock", {
  attrs: {
    body: {
      refWidth: "100%",
      refHeight: "100%",
      stroke: "#333333",
      fill: "#ffffff",
      strokeWidth: 2
    },
    foreignObject: {
      refWidth: "100%",
      refHeight: "100%"
    },
    label: {
      style: {
        fontSize: 14
      }
    }
  }
}, {
  markup: [{
    tagName: "rect",
    selector: "body"
  }, labelMarkup]
}, {
  attributes: {
    text: {
      set: function(text, refBBox, node, attrs) {
        if (node instanceof HTMLElement) {
          node.textContent = text;
        } else {
          var style = attrs.style || {};
          var wrapValue = {
            text,
            width: -5,
            height: "100%"
          };
          var wrapAttrs = assign({
            textVerticalAnchor: "middle"
          }, style);
          attributes.textWrap.set.call(this, wrapValue, refBBox, node, wrapAttrs);
          return {
            fill: style.color || null
          };
        }
      },
      position: function(text, refBBox, node) {
        if (node instanceof SVGElement) return refBBox.center();
      }
    }
  }
});
var Link2 = Link.define("standard.Link", {
  attrs: {
    line: {
      connection: true,
      stroke: "#333333",
      strokeWidth: 2,
      strokeLinejoin: "round",
      targetMarker: {
        "type": "path",
        "d": "M 10 -5 0 0 10 5 z"
      }
    },
    wrapper: {
      connection: true,
      strokeWidth: 10,
      strokeLinejoin: "round"
    }
  }
}, {
  markup: [{
    tagName: "path",
    selector: "wrapper",
    attributes: {
      "fill": "none",
      "cursor": "pointer",
      "stroke": "transparent",
      "stroke-linecap": "round"
    }
  }, {
    tagName: "path",
    selector: "line",
    attributes: {
      "fill": "none",
      "pointer-events": "none"
    }
  }]
});
var DoubleLink = Link.define("standard.DoubleLink", {
  attrs: {
    line: {
      connection: true,
      stroke: "#DDDDDD",
      strokeWidth: 4,
      strokeLinejoin: "round",
      targetMarker: {
        type: "path",
        stroke: "#000000",
        d: "M 10 -3 10 -10 -2 0 10 10 10 3"
      }
    },
    outline: {
      connection: true,
      stroke: "#000000",
      strokeWidth: 6,
      strokeLinejoin: "round"
    }
  }
}, {
  markup: [{
    tagName: "path",
    selector: "outline",
    attributes: {
      "fill": "none",
      "cursor": "pointer"
    }
  }, {
    tagName: "path",
    selector: "line",
    attributes: {
      "fill": "none",
      "pointer-events": "none"
    }
  }]
});
var ShadowLink = Link.define("standard.ShadowLink", {
  attrs: {
    line: {
      connection: true,
      stroke: "#FF0000",
      strokeWidth: 20,
      strokeLinejoin: "round",
      targetMarker: {
        "type": "path",
        "stroke": "none",
        "d": "M 0 -10 -10 0 0 10 z"
      },
      sourceMarker: {
        "type": "path",
        "stroke": "none",
        "d": "M -10 -10 0 0 -10 10 0 10 0 -10 z"
      }
    },
    shadow: {
      connection: true,
      refX: 3,
      refY: 6,
      stroke: "#000000",
      strokeOpacity: 0.2,
      strokeWidth: 20,
      strokeLinejoin: "round",
      targetMarker: {
        "type": "path",
        "d": "M 0 -10 -10 0 0 10 z",
        "stroke": "none"
      },
      sourceMarker: {
        "type": "path",
        "stroke": "none",
        "d": "M -10 -10 0 0 -10 10 0 10 0 -10 z"
      }
    }
  }
}, {
  markup: [{
    tagName: "path",
    selector: "shadow",
    attributes: {
      "fill": "none",
      "pointer-events": "none"
    }
  }, {
    tagName: "path",
    selector: "line",
    attributes: {
      "fill": "none",
      "cursor": "pointer"
    }
  }]
});

// node_modules/jointjs/src/shapes/devs.mjs
var devs_exports = {};
__export(devs_exports, {
  Atomic: () => Atomic,
  Coupled: () => Coupled,
  Link: () => Link3,
  Model: () => Model
});
var Model = Generic.define("devs.Model", {
  inPorts: [],
  outPorts: [],
  size: {
    width: 80,
    height: 80
  },
  attrs: {
    ".": {
      magnet: false
    },
    ".label": {
      text: "Model",
      "ref-x": 0.5,
      "ref-y": 10,
      "font-size": 18,
      "text-anchor": "middle",
      fill: "#000"
    },
    ".body": {
      "ref-width": "100%",
      "ref-height": "100%",
      stroke: "#000"
    }
  },
  ports: {
    groups: {
      "in": {
        position: {
          name: "left"
        },
        attrs: {
          ".port-label": {
            fill: "#000"
          },
          ".port-body": {
            fill: "#fff",
            stroke: "#000",
            r: 10,
            magnet: true
          }
        },
        label: {
          position: {
            name: "left",
            args: {
              y: 10
            }
          }
        }
      },
      "out": {
        position: {
          name: "right"
        },
        attrs: {
          ".port-label": {
            fill: "#000"
          },
          ".port-body": {
            fill: "#fff",
            stroke: "#000",
            r: 10,
            magnet: true
          }
        },
        label: {
          position: {
            name: "right",
            args: {
              y: 10
            }
          }
        }
      }
    }
  }
}, {
  markup: '<g class="rotatable"><rect class="body"/><text class="label"/></g>',
  portMarkup: '<circle class="port-body"/>',
  portLabelMarkup: '<text class="port-label"/>',
  initialize: function() {
    Generic.prototype.initialize.apply(this, arguments);
    this.on("change:inPorts change:outPorts", this.updatePortItems, this);
    this.updatePortItems();
  },
  updatePortItems: function(model, changed, opt) {
    var inPorts = uniq(this.get("inPorts"));
    var outPorts = difference(uniq(this.get("outPorts")), inPorts);
    var inPortItems = this.createPortItems("in", inPorts);
    var outPortItems = this.createPortItems("out", outPorts);
    this.prop("ports/items", inPortItems.concat(outPortItems), assign({
      rewrite: true
    }, opt));
  },
  createPortItem: function(group, port) {
    return {
      id: port,
      group,
      attrs: {
        ".port-label": {
          text: port
        }
      }
    };
  },
  createPortItems: function(group, ports) {
    return toArray(ports).map(this.createPortItem.bind(this, group));
  },
  _addGroupPort: function(port, group, opt) {
    var ports = this.get(group);
    return this.set(group, Array.isArray(ports) ? ports.concat(port) : [port], opt);
  },
  addOutPort: function(port, opt) {
    return this._addGroupPort(port, "outPorts", opt);
  },
  addInPort: function(port, opt) {
    return this._addGroupPort(port, "inPorts", opt);
  },
  _removeGroupPort: function(port, group, opt) {
    return this.set(group, without(this.get(group), port), opt);
  },
  removeOutPort: function(port, opt) {
    return this._removeGroupPort(port, "outPorts", opt);
  },
  removeInPort: function(port, opt) {
    return this._removeGroupPort(port, "inPorts", opt);
  },
  _changeGroup: function(group, properties, opt) {
    return this.prop("ports/groups/" + group, isObject(properties) ? properties : {}, opt);
  },
  changeInGroup: function(properties, opt) {
    return this._changeGroup("in", properties, opt);
  },
  changeOutGroup: function(properties, opt) {
    return this._changeGroup("out", properties, opt);
  }
});
var Atomic = Model.define("devs.Atomic", {
  size: {
    width: 80,
    height: 80
  },
  attrs: {
    ".label": {
      text: "Atomic"
    }
  }
});
var Coupled = Model.define("devs.Coupled", {
  size: {
    width: 200,
    height: 300
  },
  attrs: {
    ".label": {
      text: "Coupled"
    }
  }
});
var Link3 = Link.define("devs.Link", {
  attrs: {
    ".connection": {
      "stroke-width": 2
    }
  }
});

// node_modules/jointjs/src/shapes/logic.mjs
var logic_exports = {};
__export(logic_exports, {
  And: () => And,
  Gate: () => Gate,
  Gate11: () => Gate11,
  Gate21: () => Gate21,
  IO: () => IO,
  Input: () => Input,
  Nand: () => Nand,
  Nor: () => Nor,
  Not: () => Not,
  Or: () => Or,
  Output: () => Output,
  Repeater: () => Repeater,
  Wire: () => Wire,
  Xnor: () => Xnor,
  Xor: () => Xor
});
var Gate = Generic.define("logic.Gate", {
  size: {
    width: 80,
    height: 40
  },
  attrs: {
    ".": {
      magnet: false
    },
    ".body": {
      width: 100,
      height: 50
    },
    circle: {
      r: 7,
      stroke: "black",
      fill: "transparent",
      "stroke-width": 2
    }
  }
}, {
  operation: function() {
    return true;
  }
});
var IO = Gate.define("logic.IO", {
  size: {
    width: 60,
    height: 30
  },
  attrs: {
    ".body": {
      fill: "white",
      stroke: "black",
      "stroke-width": 2
    },
    ".wire": {
      ref: ".body",
      "ref-y": 0.5,
      stroke: "black"
    },
    text: {
      fill: "black",
      ref: ".body",
      "ref-x": 0.5,
      "ref-y": 0.5,
      "y-alignment": "middle",
      "text-anchor": "middle",
      "font-weight": "bold",
      "font-variant": "small-caps",
      "text-transform": "capitalize",
      "font-size": "14px"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><path class="wire"/><circle/><text/></g>'
});
var Input = IO.define("logic.Input", {
  attrs: {
    ".wire": {
      "ref-dx": 0,
      d: "M 0 0 L 23 0"
    },
    circle: {
      ref: ".body",
      "ref-dx": 30,
      "ref-y": 0.5,
      magnet: true,
      "class": "output",
      port: "out"
    },
    text: {
      text: "input"
    }
  }
});
var Output = IO.define("logic.Output", {
  attrs: {
    ".wire": {
      "ref-x": 0,
      d: "M 0 0 L -23 0"
    },
    circle: {
      ref: ".body",
      "ref-x": -30,
      "ref-y": 0.5,
      magnet: "passive",
      "class": "input",
      port: "in"
    },
    text: {
      text: "output"
    }
  }
});
var Gate11 = Gate.define("logic.Gate11", {
  attrs: {
    ".input": {
      ref: ".body",
      "ref-x": -2,
      "ref-y": 0.5,
      magnet: "passive",
      port: "in"
    },
    ".output": {
      ref: ".body",
      "ref-dx": 2,
      "ref-y": 0.5,
      magnet: true,
      port: "out"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><image class="body"/></g><circle class="input"/><circle class="output"/></g>'
});
var Gate21 = Gate.define("logic.Gate21", {
  attrs: {
    ".input1": {
      ref: ".body",
      "ref-x": -2,
      "ref-y": 0.3,
      magnet: "passive",
      port: "in1"
    },
    ".input2": {
      ref: ".body",
      "ref-x": -2,
      "ref-y": 0.7,
      magnet: "passive",
      port: "in2"
    },
    ".output": {
      ref: ".body",
      "ref-dx": 2,
      "ref-y": 0.5,
      magnet: true,
      port: "out"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><image class="body"/></g><circle class="input input1"/><circle  class="input input2"/><circle class="output"/></g>'
});
var Repeater = Gate11.define("logic.Repeater", {
  attrs: {
    image: {
      "xlink:href": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik5PVCBBTlNJLnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0Ij4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDEwIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3MTQiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjAuNSA6IDAuMzMzMzMzMzMgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgwNiIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgxOSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ4IDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjc3NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI3NSA6IDQwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjE1MCA6IDYwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA2MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUzMjc1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjUwIDogMzMuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEwMCA6IDUwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmU1NTMzIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMyIDogMjEuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjY0IDogMzIgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDMyIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI1NTciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxNi42NjY2NjcgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAyNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMjUgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjgiCiAgICAgaW5rc2NhcGU6Y3g9Ijg0LjY4NTM1MiIKICAgICBpbmtzY2FwZTpjeT0iMTUuMjg4NjI4IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9InRydWUiCiAgICAgaW5rc2NhcGU6Z3JpZC1iYm94PSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtcG9pbnRzPSJ0cnVlIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwMDAwIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM5OSIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4NzQiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjMzIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgaWQ9IkdyaWRGcm9tUHJlMDQ2U2V0dGluZ3MiCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBvcmlnaW54PSIwcHgiCiAgICAgICBvcmlnaW55PSIwcHgiCiAgICAgICBzcGFjaW5neD0iMXB4IgogICAgICAgc3BhY2luZ3k9IjFweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgZW1wY29sb3I9IiMwMDAwZmYiCiAgICAgICBvcGFjaXR5PSIwLjIiCiAgICAgICBlbXBvcGFjaXR5PSIwLjQiCiAgICAgICBlbXBzcGFjaW5nPSI1IgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk5ODg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gNzIuMTU2OTEsMjUgTCA5NSwyNSIKICAgICAgIGlkPSJwYXRoMzA1OSIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAyOS4wNDM0NzgsMjUgTCA1LjA0MzQ3ODEsMjUiCiAgICAgICBpZD0icGF0aDMwNjEiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWpvaW46bWl0ZXI7bWFya2VyOm5vbmU7c3Ryb2tlLW9wYWNpdHk6MTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgZD0iTSAyOC45Njg3NSwyLjU5Mzc1IEwgMjguOTY4NzUsNSBMIDI4Ljk2ODc1LDQ1IEwgMjguOTY4NzUsNDcuNDA2MjUgTCAzMS4xMjUsNDYuMzQzNzUgTCA3Mi4xNTYyNSwyNi4zNDM3NSBMIDcyLjE1NjI1LDIzLjY1NjI1IEwgMzEuMTI1LDMuNjU2MjUgTCAyOC45Njg3NSwyLjU5Mzc1IHogTSAzMS45Njg3NSw3LjQwNjI1IEwgNjguMDkzNzUsMjUgTCAzMS45Njg3NSw0Mi41OTM3NSBMIDMxLjk2ODc1LDcuNDA2MjUgeiIKICAgICAgIGlkPSJwYXRoMjYzOCIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjYyIgLz4KICA8L2c+Cjwvc3ZnPgo="
    }
  }
}, {
  operation: function(input) {
    return input;
  }
});
var Not = Gate11.define("logic.Not", {
  attrs: {
    image: {
      "xlink:href": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik5PVCBBTlNJLnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0Ij4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDEwIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3MTQiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjAuNSA6IDAuMzMzMzMzMzMgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgwNiIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgxOSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ4IDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjc3NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI3NSA6IDQwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjE1MCA6IDYwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA2MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUzMjc1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjUwIDogMzMuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEwMCA6IDUwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmU1NTMzIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMyIDogMjEuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjY0IDogMzIgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDMyIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI1NTciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxNi42NjY2NjcgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAyNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMjUgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjgiCiAgICAgaW5rc2NhcGU6Y3g9Ijg0LjY4NTM1MiIKICAgICBpbmtzY2FwZTpjeT0iMTUuMjg4NjI4IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9InRydWUiCiAgICAgaW5rc2NhcGU6Z3JpZC1iYm94PSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtcG9pbnRzPSJ0cnVlIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwMDAwIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM5OSIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4NzQiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjMzIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgaWQ9IkdyaWRGcm9tUHJlMDQ2U2V0dGluZ3MiCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBvcmlnaW54PSIwcHgiCiAgICAgICBvcmlnaW55PSIwcHgiCiAgICAgICBzcGFjaW5neD0iMXB4IgogICAgICAgc3BhY2luZ3k9IjFweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgZW1wY29sb3I9IiMwMDAwZmYiCiAgICAgICBvcGFjaXR5PSIwLjIiCiAgICAgICBlbXBvcGFjaXR5PSIwLjQiCiAgICAgICBlbXBzcGFjaW5nPSI1IgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk5ODg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gNzkuMTU2OTEsMjUgTCA5NSwyNSIKICAgICAgIGlkPSJwYXRoMzA1OSIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAyOS4wNDM0NzgsMjUgTCA1LjA0MzQ3ODEsMjUiCiAgICAgICBpZD0icGF0aDMwNjEiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWpvaW46bWl0ZXI7bWFya2VyOm5vbmU7c3Ryb2tlLW9wYWNpdHk6MTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgZD0iTSAyOC45Njg3NSwyLjU5Mzc1IEwgMjguOTY4NzUsNSBMIDI4Ljk2ODc1LDQ1IEwgMjguOTY4NzUsNDcuNDA2MjUgTCAzMS4xMjUsNDYuMzQzNzUgTCA3Mi4xNTYyNSwyNi4zNDM3NSBMIDcyLjE1NjI1LDIzLjY1NjI1IEwgMzEuMTI1LDMuNjU2MjUgTCAyOC45Njg3NSwyLjU5Mzc1IHogTSAzMS45Njg3NSw3LjQwNjI1IEwgNjguMDkzNzUsMjUgTCAzMS45Njg3NSw0Mi41OTM3NSBMIDMxLjk2ODc1LDcuNDA2MjUgeiIKICAgICAgIGlkPSJwYXRoMjYzOCIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjYyIgLz4KICAgIDxwYXRoCiAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lam9pbjptaXRlcjttYXJrZXI6bm9uZTtzdHJva2Utb3BhY2l0eToxO3Zpc2liaWxpdHk6dmlzaWJsZTtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiCiAgICAgICBpZD0icGF0aDI2NzEiCiAgICAgICBzb2RpcG9kaTpjeD0iNzYiCiAgICAgICBzb2RpcG9kaTpjeT0iMjUiCiAgICAgICBzb2RpcG9kaTpyeD0iNCIKICAgICAgIHNvZGlwb2RpOnJ5PSI0IgogICAgICAgZD0iTSA4MCwyNSBBIDQsNCAwIDEgMSA3MiwyNSBBIDQsNCAwIDEgMSA4MCwyNSB6IgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEsMCkiIC8+CiAgPC9nPgo8L3N2Zz4K"
    }
  }
}, {
  operation: function(input) {
    return !input;
  }
});
var Or = Gate21.define("logic.Or", {
  attrs: {
    image: {
      "xlink:href": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik9SIEFOU0kuc3ZnIgogICBpbmtzY2FwZTpvdXRwdXRfZXh0ZW5zaW9uPSJvcmcuaW5rc2NhcGUub3V0cHV0LnN2Zy5pbmtzY2FwZSI+CiAgPGRlZnMKICAgICBpZD0iZGVmczQiPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjUwIDogMTUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjI1IDogMTAgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjcxNCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfej0iMSA6IDAuNSA6IDEiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMC41IDogMC4zMzMzMzMzMyA6IDEiCiAgICAgICBpZD0icGVyc3BlY3RpdmUyODA2IiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUyODE5IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjM3Mi4wNDcyNCA6IDM1MC43ODczOSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSI3NDQuMDk0NDggOiA1MjYuMTgxMDkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDUyNi4xODEwOSA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUyNzc3IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49Ijc1IDogNDAgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iMTUwIDogNjAgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDYwIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTMyNzUiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iNTAgOiAzMy4zMzMzMzMgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iMTAwIDogNTAgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDUwIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTU1MzMiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMzIgOiAyMS4zMzMzMzMgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNjQgOiAzMiA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMzIgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjU1NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDE2LjY2NjY2NyA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDI1IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAyNSA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iNCIKICAgICBpbmtzY2FwZTpjeD0iMTEzLjAwMDM5IgogICAgIGlua3NjYXBlOmN5PSIxMi44OTM3MzEiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImcyNTYwIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTpncmlkLWJib3g9InRydWUiCiAgICAgaW5rc2NhcGU6Z3JpZC1wb2ludHM9InRydWUiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAwMDAiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxMzk5IgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijg3NCIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMzciCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii00IgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgaWQ9IkdyaWRGcm9tUHJlMDQ2U2V0dGluZ3MiCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBvcmlnaW54PSIwcHgiCiAgICAgICBvcmlnaW55PSIwcHgiCiAgICAgICBzcGFjaW5neD0iMXB4IgogICAgICAgc3BhY2luZ3k9IjFweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgZW1wY29sb3I9IiMwMDAwZmYiCiAgICAgICBvcGFjaXR5PSIwLjIiCiAgICAgICBlbXBvcGFjaXR5PSIwLjQiCiAgICAgICBlbXBzcGFjaW5nPSI1IgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gNzAsMjUgYyAyMCwwIDI1LDAgMjUsMCIKICAgICAgIGlkPSJwYXRoMzA1OSIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAzMSwxNSA1LDE1IgogICAgICAgaWQ9InBhdGgzMDYxIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk5ODg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gMzIsMzUgNSwzNSIKICAgICAgIGlkPSJwYXRoMzk0NCIgLz4KICAgIDxnCiAgICAgICBpZD0iZzI1NjAiCiAgICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2LjUsLTM5LjUpIj4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJNIC0yLjQwNjI1LDQ0LjUgTCAtMC40MDYyNSw0Ni45Mzc1IEMgLTAuNDA2MjUsNDYuOTM3NSA1LjI1LDUzLjkzNzU0OSA1LjI1LDY0LjUgQyA1LjI1LDc1LjA2MjQ1MSAtMC40MDYyNSw4Mi4wNjI1IC0wLjQwNjI1LDgyLjA2MjUgTCAtMi40MDYyNSw4NC41IEwgMC43NSw4NC41IEwgMTQuNzUsODQuNSBDIDE3LjE1ODA3Niw4NC41MDAwMDEgMjIuNDM5Njk5LDg0LjUyNDUxNCAyOC4zNzUsODIuMDkzNzUgQyAzNC4zMTAzMDEsNzkuNjYyOTg2IDQwLjkxMTUzNiw3NC43NTA0ODQgNDYuMDYyNSw2NS4yMTg3NSBMIDQ0Ljc1LDY0LjUgTCA0Ni4wNjI1LDYzLjc4MTI1IEMgMzUuNzU5Mzg3LDQ0LjcxNTU5IDE5LjUwNjU3NCw0NC41IDE0Ljc1LDQ0LjUgTCAwLjc1LDQ0LjUgTCAtMi40MDYyNSw0NC41IHogTSAzLjQ2ODc1LDQ3LjUgTCAxNC43NSw0Ny41IEMgMTkuNDM0MTczLDQ3LjUgMzMuMDM2ODUsNDcuMzY5NzkzIDQyLjcxODc1LDY0LjUgQyAzNy45NTE5NjQsNzIuOTI5MDc1IDMyLjE5NzQ2OSw3Ny4xODM5MSAyNyw3OS4zMTI1IEMgMjEuNjM5MzM5LDgxLjUwNzkyNCAxNy4xNTgwNzUsODEuNTAwMDAxIDE0Ljc1LDgxLjUgTCAzLjUsODEuNSBDIDUuMzczNTg4NCw3OC4zOTE1NjYgOC4yNSw3Mi40NTA2NSA4LjI1LDY0LjUgQyA4LjI1LDU2LjUyNjY0NiA1LjM0MTQ2ODYsNTAuNTk5ODE1IDMuNDY4NzUsNDcuNSB6IgogICAgICAgICBpZD0icGF0aDQ5NzMiCiAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NzY2NjY3NjY2NjY2NjY2NzY2NzYyIgLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo="
    }
  }
}, {
  operation: function(input1, input2) {
    return input1 || input2;
  }
});
var And = Gate21.define("logic.And", {
  attrs: {
    image: {
      "xlink:href": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9IkFORCBBTlNJLnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0Ij4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDEwIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3MTQiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjAuNSA6IDAuMzMzMzMzMzMgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgwNiIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgxOSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ4IDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjc3NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI3NSA6IDQwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjE1MCA6IDYwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA2MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUzMjc1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjUwIDogMzMuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEwMCA6IDUwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmU1NTMzIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMyIDogMjEuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjY0IDogMzIgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDMyIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgPC9kZWZzPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0iYmFzZSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSI4IgogICAgIGlua3NjYXBlOmN4PSI1Ni42OTgzNDgiCiAgICAgaW5rc2NhcGU6Y3k9IjI1LjMyNjg5OSIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpncmlkLXBvaW50cz0idHJ1ZSIKICAgICBncmlkdG9sZXJhbmNlPSIxMDAwMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzOTkiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODc0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIzMyIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIGlkPSJHcmlkRnJvbVByZTA0NlNldHRpbmdzIgogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgb3JpZ2lueD0iMHB4IgogICAgICAgb3JpZ2lueT0iMHB4IgogICAgICAgc3BhY2luZ3g9IjFweCIKICAgICAgIHNwYWNpbmd5PSIxcHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIGVtcGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4yIgogICAgICAgZW1wb3BhY2l0eT0iMC40IgogICAgICAgZW1wc3BhY2luZz0iNSIKICAgICAgIHZpc2libGU9InRydWUiCiAgICAgICBlbmFibGVkPSJ0cnVlIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDcwLDI1IGMgMjAsMCAyNSwwIDI1LDAiCiAgICAgICBpZD0icGF0aDMwNTkiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gMzEsMTUgNSwxNSIKICAgICAgIGlkPSJwYXRoMzA2MSIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjk5OTk5OTg4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDMyLDM1IDUsMzUiCiAgICAgICBpZD0icGF0aDM5NDQiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZvbnQtc2l6ZTptZWRpdW07Zm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zdHJldGNoOm5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtYWxpZ246c3RhcnQ7dGV4dC1kZWNvcmF0aW9uOm5vbmU7bGluZS1oZWlnaHQ6bm9ybWFsO2xldHRlci1zcGFjaW5nOm5vcm1hbDt3b3JkLXNwYWNpbmc6bm9ybWFsO3RleHQtdHJhbnNmb3JtOm5vbmU7ZGlyZWN0aW9uOmx0cjtibG9jay1wcm9ncmVzc2lvbjp0Yjt3cml0aW5nLW1vZGU6bHItdGI7dGV4dC1hbmNob3I6c3RhcnQ7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDozO21hcmtlcjpub25lO3Zpc2liaWxpdHk6dmlzaWJsZTtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGU7Zm9udC1mYW1pbHk6Qml0c3RyZWFtIFZlcmEgU2FuczstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOkJpdHN0cmVhbSBWZXJhIFNhbnMiCiAgICAgICBkPSJNIDMwLDUgTCAzMCw2LjQyODU3MTQgTCAzMCw0My41NzE0MjkgTCAzMCw0NSBMIDMxLjQyODU3MSw0NSBMIDUwLjQ3NjE5LDQ1IEMgNjEuNzQ0MDk4LDQ1IDcwLjQ3NjE5LDM1Ljk5OTk1NSA3MC40NzYxOSwyNSBDIDcwLjQ3NjE5LDE0LjAwMDA0NSA2MS43NDQwOTksNS4wMDAwMDAyIDUwLjQ3NjE5LDUgQyA1MC40NzYxOSw1IDUwLjQ3NjE5LDUgMzEuNDI4NTcxLDUgTCAzMCw1IHogTSAzMi44NTcxNDMsNy44NTcxNDI5IEMgNDAuODM0MjY0LDcuODU3MTQyOSA0NS45MTgzNjgsNy44NTcxNDI5IDQ4LjA5NTIzOCw3Ljg1NzE0MjkgQyA0OS4yODU3MTQsNy44NTcxNDI5IDQ5Ljg4MDk1Miw3Ljg1NzE0MjkgNTAuMTc4NTcxLDcuODU3MTQyOSBDIDUwLjMyNzM4MSw3Ljg1NzE0MjkgNTAuNDA5MjI3LDcuODU3MTQyOSA1MC40NDY0MjksNy44NTcxNDI5IEMgNTAuNDY1MDI5LDcuODU3MTQyOSA1MC40NzE1NDMsNy44NTcxNDI5IDUwLjQ3NjE5LDcuODU3MTQyOSBDIDYwLjIzNjg1Myw3Ljg1NzE0MyA2Ny4xNDI4NTcsMTUuNDk3MDk4IDY3LjE0Mjg1NywyNSBDIDY3LjE0Mjg1NywzNC41MDI5MDIgNTkuNzYwNjYyLDQyLjE0Mjg1NyA1MCw0Mi4xNDI4NTcgTCAzMi44NTcxNDMsNDIuMTQyODU3IEwgMzIuODU3MTQzLDcuODU3MTQyOSB6IgogICAgICAgaWQ9InBhdGgyODg0IgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2NzY2NjY3Nzc3NzY2NjIiAvPgogIDwvZz4KPC9zdmc+Cg=="
    }
  }
}, {
  operation: function(input1, input2) {
    return input1 && input2;
  }
});
var Nor = Gate21.define("logic.Nor", {
  attrs: {
    image: {
      "xlink:href": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik5PUiBBTlNJLnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0Ij4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDEwIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3MTQiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjAuNSA6IDAuMzMzMzMzMzMgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgwNiIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgxOSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ4IDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjc3NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI3NSA6IDQwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjE1MCA6IDYwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA2MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUzMjc1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjUwIDogMzMuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEwMCA6IDUwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmU1NTMzIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMyIDogMjEuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjY0IDogMzIgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDMyIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI1NTciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxNi42NjY2NjcgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAyNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMjUgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjEiCiAgICAgaW5rc2NhcGU6Y3g9Ijc4LjY3NzY0NCIKICAgICBpbmtzY2FwZTpjeT0iMjIuMTAyMzQ0IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9InRydWUiCiAgICAgaW5rc2NhcGU6Z3JpZC1iYm94PSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtcG9pbnRzPSJ0cnVlIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwMDAwIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM5OSIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4NzQiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjM3IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItNCIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIGlkPSJHcmlkRnJvbVByZTA0NlNldHRpbmdzIgogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgb3JpZ2lueD0iMHB4IgogICAgICAgb3JpZ2lueT0iMHB4IgogICAgICAgc3BhY2luZ3g9IjFweCIKICAgICAgIHNwYWNpbmd5PSIxcHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIGVtcGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4yIgogICAgICAgZW1wb3BhY2l0eT0iMC40IgogICAgICAgZW1wc3BhY2luZz0iNSIKICAgICAgIHZpc2libGU9InRydWUiCiAgICAgICBlbmFibGVkPSJ0cnVlIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDc5LDI1IEMgOTksMjUgOTUsMjUgOTUsMjUiCiAgICAgICBpZD0icGF0aDMwNTkiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gMzEsMTUgNSwxNSIKICAgICAgIGlkPSJwYXRoMzA2MSIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjk5OTk5OTg4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDMyLDM1IDUsMzUiCiAgICAgICBpZD0icGF0aDM5NDQiIC8+CiAgICA8ZwogICAgICAgaWQ9ImcyNTYwIgogICAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi41LC0zOS41KSI+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0iTSAtMi40MDYyNSw0NC41IEwgLTAuNDA2MjUsNDYuOTM3NSBDIC0wLjQwNjI1LDQ2LjkzNzUgNS4yNSw1My45Mzc1NDkgNS4yNSw2NC41IEMgNS4yNSw3NS4wNjI0NTEgLTAuNDA2MjUsODIuMDYyNSAtMC40MDYyNSw4Mi4wNjI1IEwgLTIuNDA2MjUsODQuNSBMIDAuNzUsODQuNSBMIDE0Ljc1LDg0LjUgQyAxNy4xNTgwNzYsODQuNTAwMDAxIDIyLjQzOTY5OSw4NC41MjQ1MTQgMjguMzc1LDgyLjA5Mzc1IEMgMzQuMzEwMzAxLDc5LjY2Mjk4NiA0MC45MTE1MzYsNzQuNzUwNDg0IDQ2LjA2MjUsNjUuMjE4NzUgTCA0NC43NSw2NC41IEwgNDYuMDYyNSw2My43ODEyNSBDIDM1Ljc1OTM4Nyw0NC43MTU1OSAxOS41MDY1NzQsNDQuNSAxNC43NSw0NC41IEwgMC43NSw0NC41IEwgLTIuNDA2MjUsNDQuNSB6IE0gMy40Njg3NSw0Ny41IEwgMTQuNzUsNDcuNSBDIDE5LjQzNDE3Myw0Ny41IDMzLjAzNjg1LDQ3LjM2OTc5MyA0Mi43MTg3NSw2NC41IEMgMzcuOTUxOTY0LDcyLjkyOTA3NSAzMi4xOTc0NjksNzcuMTgzOTEgMjcsNzkuMzEyNSBDIDIxLjYzOTMzOSw4MS41MDc5MjQgMTcuMTU4MDc1LDgxLjUwMDAwMSAxNC43NSw4MS41IEwgMy41LDgxLjUgQyA1LjM3MzU4ODQsNzguMzkxNTY2IDguMjUsNzIuNDUwNjUgOC4yNSw2NC41IEMgOC4yNSw1Ni41MjY2NDYgNS4zNDE0Njg2LDUwLjU5OTgxNSAzLjQ2ODc1LDQ3LjUgeiIKICAgICAgICAgaWQ9InBhdGg0OTczIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjc2NjY2NzY2NjY2NjY2Njc2Njc2MiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWpvaW46bWl0ZXI7bWFya2VyOm5vbmU7c3Ryb2tlLW9wYWNpdHk6MTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgICBpZD0icGF0aDI2MDQiCiAgICAgICAgIHNvZGlwb2RpOmN4PSI3NSIKICAgICAgICAgc29kaXBvZGk6Y3k9IjI1IgogICAgICAgICBzb2RpcG9kaTpyeD0iNCIKICAgICAgICAgc29kaXBvZGk6cnk9IjQiCiAgICAgICAgIGQ9Ik0gNzksMjUgQSA0LDQgMCAxIDEgNzEsMjUgQSA0LDQgMCAxIDEgNzksMjUgeiIKICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2LjUsMzkuNSkiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"
    }
  }
}, {
  operation: function(input1, input2) {
    return !(input1 || input2);
  }
});
var Nand = Gate21.define("logic.Nand", {
  attrs: {
    image: {
      "xlink:href": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik5BTkQgQU5TSS5zdmciCiAgIGlua3NjYXBlOm91dHB1dF9leHRlbnNpb249Im9yZy5pbmtzY2FwZS5vdXRwdXQuc3ZnLmlua3NjYXBlIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzNCI+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMTUgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxMCA6IDEiCiAgICAgICBpZD0icGVyc3BlY3RpdmUyNzE0IiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDAuNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIwLjUgOiAwLjMzMzMzMzMzIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI4MDYiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI4MTkiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMzcyLjA0NzI0IDogMzUwLjc4NzM5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9Ijc0NC4wOTQ0OCA6IDUyNi4xODEwOSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNTI2LjE4MTA5IDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3NzciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iNzUgOiA0MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxNTAgOiA2MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNjAgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMzI3NSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI1MCA6IDMzLjMzMzMzMyA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxMDAgOiA1MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNTAgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlNTUzMyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzMiA6IDIxLjMzMzMzMyA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSI2NCA6IDMyIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAzMiA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMTYiCiAgICAgaW5rc2NhcGU6Y3g9Ijc4LjI4MzMwNyIKICAgICBpbmtzY2FwZTpjeT0iMTYuNDQyODQzIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9InRydWUiCiAgICAgaW5rc2NhcGU6Z3JpZC1iYm94PSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtcG9pbnRzPSJ0cnVlIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwMDAwIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM5OSIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4NzQiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjMzIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgaWQ9IkdyaWRGcm9tUHJlMDQ2U2V0dGluZ3MiCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBvcmlnaW54PSIwcHgiCiAgICAgICBvcmlnaW55PSIwcHgiCiAgICAgICBzcGFjaW5neD0iMXB4IgogICAgICAgc3BhY2luZ3k9IjFweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgZW1wY29sb3I9IiMwMDAwZmYiCiAgICAgICBvcGFjaXR5PSIwLjIiCiAgICAgICBlbXBvcGFjaXR5PSIwLjQiCiAgICAgICBlbXBzcGFjaW5nPSI1IgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gNzksMjUgQyA5MS44LDI1IDk1LDI1IDk1LDI1IgogICAgICAgaWQ9InBhdGgzMDU5IgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDMxLDE1IDUsMTUiCiAgICAgICBpZD0icGF0aDMwNjEiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS45OTk5OTk4ODtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAzMiwzNSA1LDM1IgogICAgICAgaWQ9InBhdGgzOTQ0IiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmb250LXNpemU6bWVkaXVtO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3RyZXRjaDpub3JtYWw7dGV4dC1pbmRlbnQ6MDt0ZXh0LWFsaWduOnN0YXJ0O3RleHQtZGVjb3JhdGlvbjpub25lO2xpbmUtaGVpZ2h0Om5vcm1hbDtsZXR0ZXItc3BhY2luZzpub3JtYWw7d29yZC1zcGFjaW5nOm5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO2RpcmVjdGlvbjpsdHI7YmxvY2stcHJvZ3Jlc3Npb246dGI7d3JpdGluZy1tb2RlOmxyLXRiO3RleHQtYW5jaG9yOnN0YXJ0O2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MzttYXJrZXI6bm9uZTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlO2ZvbnQtZmFtaWx5OkJpdHN0cmVhbSBWZXJhIFNhbnM7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjpCaXRzdHJlYW0gVmVyYSBTYW5zIgogICAgICAgZD0iTSAzMCw1IEwgMzAsNi40Mjg1NzE0IEwgMzAsNDMuNTcxNDI5IEwgMzAsNDUgTCAzMS40Mjg1NzEsNDUgTCA1MC40NzYxOSw0NSBDIDYxLjc0NDA5OCw0NSA3MC40NzYxOSwzNS45OTk5NTUgNzAuNDc2MTksMjUgQyA3MC40NzYxOSwxNC4wMDAwNDUgNjEuNzQ0MDk5LDUuMDAwMDAwMiA1MC40NzYxOSw1IEMgNTAuNDc2MTksNSA1MC40NzYxOSw1IDMxLjQyODU3MSw1IEwgMzAsNSB6IE0gMzIuODU3MTQzLDcuODU3MTQyOSBDIDQwLjgzNDI2NCw3Ljg1NzE0MjkgNDUuOTE4MzY4LDcuODU3MTQyOSA0OC4wOTUyMzgsNy44NTcxNDI5IEMgNDkuMjg1NzE0LDcuODU3MTQyOSA0OS44ODA5NTIsNy44NTcxNDI5IDUwLjE3ODU3MSw3Ljg1NzE0MjkgQyA1MC4zMjczODEsNy44NTcxNDI5IDUwLjQwOTIyNyw3Ljg1NzE0MjkgNTAuNDQ2NDI5LDcuODU3MTQyOSBDIDUwLjQ2NTAyOSw3Ljg1NzE0MjkgNTAuNDcxNTQzLDcuODU3MTQyOSA1MC40NzYxOSw3Ljg1NzE0MjkgQyA2MC4yMzY4NTMsNy44NTcxNDMgNjcuMTQyODU3LDE1LjQ5NzA5OCA2Ny4xNDI4NTcsMjUgQyA2Ny4xNDI4NTcsMzQuNTAyOTAyIDU5Ljc2MDY2Miw0Mi4xNDI4NTcgNTAsNDIuMTQyODU3IEwgMzIuODU3MTQzLDQyLjE0Mjg1NyBMIDMyLjg1NzE0Myw3Ljg1NzE0MjkgeiIKICAgICAgIGlkPSJwYXRoMjg4NCIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2Njc2NjY2Nzc3Nzc2NjYyIgLz4KICAgIDxwYXRoCiAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lam9pbjptaXRlcjttYXJrZXI6bm9uZTtzdHJva2Utb3BhY2l0eToxO3Zpc2liaWxpdHk6dmlzaWJsZTtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiCiAgICAgICBpZD0icGF0aDQwMDgiCiAgICAgICBzb2RpcG9kaTpjeD0iNzUiCiAgICAgICBzb2RpcG9kaTpjeT0iMjUiCiAgICAgICBzb2RpcG9kaTpyeD0iNCIKICAgICAgIHNvZGlwb2RpOnJ5PSI0IgogICAgICAgZD0iTSA3OSwyNSBBIDQsNCAwIDEgMSA3MSwyNSBBIDQsNCAwIDEgMSA3OSwyNSB6IiAvPgogIDwvZz4KPC9zdmc+Cg=="
    }
  }
}, {
  operation: function(input1, input2) {
    return !(input1 && input2);
  }
});
var Xor = Gate21.define("logic.Xor", {
  attrs: {
    image: {
      "xlink:href": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9IlhPUiBBTlNJLnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0Ij4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDEwIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3MTQiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjAuNSA6IDAuMzMzMzMzMzMgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgwNiIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgxOSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ4IDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjc3NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI3NSA6IDQwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjE1MCA6IDYwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA2MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUzMjc1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjUwIDogMzMuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEwMCA6IDUwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmU1NTMzIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMyIDogMjEuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjY0IDogMzIgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDMyIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI1NTciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxNi42NjY2NjcgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAyNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMjUgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjUuNjU2ODU0MiIKICAgICBpbmtzY2FwZTpjeD0iMjUuOTM4MTE2IgogICAgIGlua3NjYXBlOmN5PSIxNy4yMzAwNSIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpncmlkLXBvaW50cz0idHJ1ZSIKICAgICBncmlkdG9sZXJhbmNlPSIxMDAwMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzOTkiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODc0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIzMyIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIGlkPSJHcmlkRnJvbVByZTA0NlNldHRpbmdzIgogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgb3JpZ2lueD0iMHB4IgogICAgICAgb3JpZ2lueT0iMHB4IgogICAgICAgc3BhY2luZ3g9IjFweCIKICAgICAgIHNwYWNpbmd5PSIxcHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIGVtcGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4yIgogICAgICAgZW1wb3BhY2l0eT0iMC40IgogICAgICAgZW1wc3BhY2luZz0iNSIKICAgICAgIHZpc2libGU9InRydWUiCiAgICAgICBlbmFibGVkPSJ0cnVlIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDcwLDI1IGMgMjAsMCAyNSwwIDI1LDAiCiAgICAgICBpZD0icGF0aDMwNTkiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk5ODg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gMzAuMzg1NzE3LDE1IEwgNC45OTk5OTk4LDE1IgogICAgICAgaWQ9InBhdGgzMDYxIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk5NzY7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gMzEuMzYyMDkxLDM1IEwgNC45OTk5OTk4LDM1IgogICAgICAgaWQ9InBhdGgzOTQ0IiAvPgogICAgPGcKICAgICAgIGlkPSJnMjU2MCIKICAgICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjYuNSwtMzkuNSkiPgogICAgICA8cGF0aAogICAgICAgICBpZD0icGF0aDM1MTYiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0iTSAtMi4yNSw4MS41MDAwMDUgQyAtMy44NDczNzQsODQuMTQ0NDA1IC00LjUsODQuNTAwMDA1IC00LjUsODQuNTAwMDA1IEwgLTguMTU2MjUsODQuNTAwMDA1IEwgLTYuMTU2MjUsODIuMDYyNTA1IEMgLTYuMTU2MjUsODIuMDYyNTA1IC0wLjUsNzUuMDYyNDUxIC0wLjUsNjQuNSBDIC0wLjUsNTMuOTM3NTQ5IC02LjE1NjI1LDQ2LjkzNzUgLTYuMTU2MjUsNDYuOTM3NSBMIC04LjE1NjI1LDQ0LjUgTCAtNC41LDQ0LjUgQyAtMy43MTg3NSw0NS40Mzc1IC0zLjA3ODEyNSw0Ni4xNTYyNSAtMi4yODEyNSw0Ny41IEMgLTAuNDA4NTMxLDUwLjU5OTgxNSAyLjUsNTYuNTI2NjQ2IDIuNSw2NC41IEMgMi41LDcyLjQ1MDY1IC0wLjM5NjY5Nyw3OC4zNzk0MjUgLTIuMjUsODEuNTAwMDA1IHoiCiAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY3NjY2Njc2MiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0iTSAtMi40MDYyNSw0NC41IEwgLTAuNDA2MjUsNDYuOTM3NSBDIC0wLjQwNjI1LDQ2LjkzNzUgNS4yNSw1My45Mzc1NDkgNS4yNSw2NC41IEMgNS4yNSw3NS4wNjI0NTEgLTAuNDA2MjUsODIuMDYyNSAtMC40MDYyNSw4Mi4wNjI1IEwgLTIuNDA2MjUsODQuNSBMIDAuNzUsODQuNSBMIDE0Ljc1LDg0LjUgQyAxNy4xNTgwNzYsODQuNTAwMDAxIDIyLjQzOTY5OSw4NC41MjQ1MTQgMjguMzc1LDgyLjA5Mzc1IEMgMzQuMzEwMzAxLDc5LjY2Mjk4NiA0MC45MTE1MzYsNzQuNzUwNDg0IDQ2LjA2MjUsNjUuMjE4NzUgTCA0NC43NSw2NC41IEwgNDYuMDYyNSw2My43ODEyNSBDIDM1Ljc1OTM4Nyw0NC43MTU1OSAxOS41MDY1NzQsNDQuNSAxNC43NSw0NC41IEwgMC43NSw0NC41IEwgLTIuNDA2MjUsNDQuNSB6IE0gMy40Njg3NSw0Ny41IEwgMTQuNzUsNDcuNSBDIDE5LjQzNDE3Myw0Ny41IDMzLjAzNjg1LDQ3LjM2OTc5MyA0Mi43MTg3NSw2NC41IEMgMzcuOTUxOTY0LDcyLjkyOTA3NSAzMi4xOTc0NjksNzcuMTgzOTEgMjcsNzkuMzEyNSBDIDIxLjYzOTMzOSw4MS41MDc5MjQgMTcuMTU4MDc1LDgxLjUwMDAwMSAxNC43NSw4MS41IEwgMy41LDgxLjUgQyA1LjM3MzU4ODQsNzguMzkxNTY2IDguMjUsNzIuNDUwNjUgOC4yNSw2NC41IEMgOC4yNSw1Ni41MjY2NDYgNS4zNDE0Njg2LDUwLjU5OTgxNSAzLjQ2ODc1LDQ3LjUgeiIKICAgICAgICAgaWQ9InBhdGg0OTczIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjc2NjY2NzY2NjY2NjY2Njc2Njc2MiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"
    }
  }
}, {
  operation: function(input1, input2) {
    return (!input1 || input2) && (input1 || !input2);
  }
});
var Xnor = Gate21.define("logic.Xnor", {
  attrs: {
    image: {
      "xlink:href": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9IlhOT1IgQU5TSS5zdmciCiAgIGlua3NjYXBlOm91dHB1dF9leHRlbnNpb249Im9yZy5pbmtzY2FwZS5vdXRwdXQuc3ZnLmlua3NjYXBlIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzNCI+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMTUgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxMCA6IDEiCiAgICAgICBpZD0icGVyc3BlY3RpdmUyNzE0IiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDAuNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIwLjUgOiAwLjMzMzMzMzMzIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI4MDYiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI4MTkiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMzcyLjA0NzI0IDogMzUwLjc4NzM5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9Ijc0NC4wOTQ0OCA6IDUyNi4xODEwOSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNTI2LjE4MTA5IDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3NzciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iNzUgOiA0MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxNTAgOiA2MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNjAgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMzI3NSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI1MCA6IDMzLjMzMzMzMyA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxMDAgOiA1MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNTAgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlNTUzMyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzMiA6IDIxLjMzMzMzMyA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSI2NCA6IDMyIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAzMiA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUyNTU3IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjI1IDogMTYuNjY2NjY3IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjUwIDogMjUgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDI1IDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgPC9kZWZzPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0iYmFzZSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSI0IgogICAgIGlua3NjYXBlOmN4PSI5NS43MjM2NiIKICAgICBpbmtzY2FwZTpjeT0iLTI2Ljc3NTAyMyIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpncmlkLXBvaW50cz0idHJ1ZSIKICAgICBncmlkdG9sZXJhbmNlPSIxMDAwMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzOTkiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODc0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIzMyIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIGlkPSJHcmlkRnJvbVByZTA0NlNldHRpbmdzIgogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgb3JpZ2lueD0iMHB4IgogICAgICAgb3JpZ2lueT0iMHB4IgogICAgICAgc3BhY2luZ3g9IjFweCIKICAgICAgIHNwYWNpbmd5PSIxcHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIGVtcGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4yIgogICAgICAgZW1wb3BhY2l0eT0iMC40IgogICAgICAgZW1wc3BhY2luZz0iNSIKICAgICAgIHZpc2libGU9InRydWUiCiAgICAgICBlbmFibGVkPSJ0cnVlIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyLjAwMDAwMDI0O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDc4LjMzMzMzMiwyNSBDIDkxLjY2NjY2NiwyNSA5NSwyNSA5NSwyNSIKICAgICAgIGlkPSJwYXRoMzA1OSIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS45OTk5OTk4ODtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAzMC4zODU3MTcsMTUgTCA0Ljk5OTk5OTgsMTUiCiAgICAgICBpZD0icGF0aDMwNjEiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS45OTk5OTk3NjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAzMS4zNjIwOTEsMzUgTCA0Ljk5OTk5OTgsMzUiCiAgICAgICBpZD0icGF0aDM5NDQiIC8+CiAgICA8ZwogICAgICAgaWQ9ImcyNTYwIgogICAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi41LC0zOS41KSI+CiAgICAgIDxwYXRoCiAgICAgICAgIGlkPSJwYXRoMzUxNiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJNIC0yLjI1LDgxLjUwMDAwNSBDIC0zLjg0NzM3NCw4NC4xNDQ0MDUgLTQuNSw4NC41MDAwMDUgLTQuNSw4NC41MDAwMDUgTCAtOC4xNTYyNSw4NC41MDAwMDUgTCAtNi4xNTYyNSw4Mi4wNjI1MDUgQyAtNi4xNTYyNSw4Mi4wNjI1MDUgLTAuNSw3NS4wNjI0NTEgLTAuNSw2NC41IEMgLTAuNSw1My45Mzc1NDkgLTYuMTU2MjUsNDYuOTM3NSAtNi4xNTYyNSw0Ni45Mzc1IEwgLTguMTU2MjUsNDQuNSBMIC00LjUsNDQuNSBDIC0zLjcxODc1LDQ1LjQzNzUgLTMuMDc4MTI1LDQ2LjE1NjI1IC0yLjI4MTI1LDQ3LjUgQyAtMC40MDg1MzEsNTAuNTk5ODE1IDIuNSw1Ni41MjY2NDYgMi41LDY0LjUgQyAyLjUsNzIuNDUwNjUgLTAuMzk2Njk3LDc4LjM3OTQyNSAtMi4yNSw4MS41MDAwMDUgeiIKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2Njc2NjY2NzYyIgLz4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJNIC0yLjQwNjI1LDQ0LjUgTCAtMC40MDYyNSw0Ni45Mzc1IEMgLTAuNDA2MjUsNDYuOTM3NSA1LjI1LDUzLjkzNzU0OSA1LjI1LDY0LjUgQyA1LjI1LDc1LjA2MjQ1MSAtMC40MDYyNSw4Mi4wNjI1IC0wLjQwNjI1LDgyLjA2MjUgTCAtMi40MDYyNSw4NC41IEwgMC43NSw4NC41IEwgMTQuNzUsODQuNSBDIDE3LjE1ODA3Niw4NC41MDAwMDEgMjIuNDM5Njk5LDg0LjUyNDUxNCAyOC4zNzUsODIuMDkzNzUgQyAzNC4zMTAzMDEsNzkuNjYyOTg2IDQwLjkxMTUzNiw3NC43NTA0ODQgNDYuMDYyNSw2NS4yMTg3NSBMIDQ0Ljc1LDY0LjUgTCA0Ni4wNjI1LDYzLjc4MTI1IEMgMzUuNzU5Mzg3LDQ0LjcxNTU5IDE5LjUwNjU3NCw0NC41IDE0Ljc1LDQ0LjUgTCAwLjc1LDQ0LjUgTCAtMi40MDYyNSw0NC41IHogTSAzLjQ2ODc1LDQ3LjUgTCAxNC43NSw0Ny41IEMgMTkuNDM0MTczLDQ3LjUgMzMuMDM2ODUsNDcuMzY5NzkzIDQyLjcxODc1LDY0LjUgQyAzNy45NTE5NjQsNzIuOTI5MDc1IDMyLjE5NzQ2OSw3Ny4xODM5MSAyNyw3OS4zMTI1IEMgMjEuNjM5MzM5LDgxLjUwNzkyNCAxNy4xNTgwNzUsODEuNTAwMDAxIDE0Ljc1LDgxLjUgTCAzLjUsODEuNSBDIDUuMzczNTg4NCw3OC4zOTE1NjYgOC4yNSw3Mi40NTA2NSA4LjI1LDY0LjUgQyA4LjI1LDU2LjUyNjY0NiA1LjM0MTQ2ODYsNTAuNTk5ODE1IDMuNDY4NzUsNDcuNSB6IgogICAgICAgICBpZD0icGF0aDQ5NzMiCiAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NzY2NjY3NjY2NjY2NjY2NzY2NzYyIgLz4KICAgIDwvZz4KICAgIDxwYXRoCiAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lam9pbjptaXRlcjttYXJrZXI6bm9uZTtzdHJva2Utb3BhY2l0eToxO3Zpc2liaWxpdHk6dmlzaWJsZTtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiCiAgICAgICBpZD0icGF0aDM1NTEiCiAgICAgICBzb2RpcG9kaTpjeD0iNzUiCiAgICAgICBzb2RpcG9kaTpjeT0iMjUiCiAgICAgICBzb2RpcG9kaTpyeD0iNCIKICAgICAgIHNvZGlwb2RpOnJ5PSI0IgogICAgICAgZD0iTSA3OSwyNSBBIDQsNCAwIDEgMSA3MSwyNSBBIDQsNCAwIDEgMSA3OSwyNSB6IiAvPgogIDwvZz4KPC9zdmc+Cg=="
    }
  }
}, {
  operation: function(input1, input2) {
    return (!input1 || !input2) && (input1 || input2);
  }
});
var Wire = Link.define("logic.Wire", {
  attrs: {
    ".connection": {
      "stroke-width": 2
    },
    ".marker-vertex": {
      r: 7
    }
  },
  router: {
    name: "orthogonal"
  },
  connector: {
    name: "rounded",
    args: {
      radius: 10
    }
  }
}, {
  arrowheadMarkup: ['<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">', '<circle class="marker-arrowhead" end="<%= end %>" r="7"/>', "</g>"].join(""),
  vertexMarkup: ['<g class="marker-vertex-group" transform="translate(<%= x %>, <%= y %>)">', '<circle class="marker-vertex" idx="<%= idx %>" r="10" />', '<g class="marker-vertex-remove-group">', '<path class="marker-vertex-remove-area" idx="<%= idx %>" d="M16,5.333c-7.732,0-14,4.701-14,10.5c0,1.982,0.741,3.833,2.016,5.414L2,25.667l5.613-1.441c2.339,1.317,5.237,2.107,8.387,2.107c7.732,0,14-4.701,14-10.5C30,10.034,23.732,5.333,16,5.333z" transform="translate(5, -33)"/>', '<path class="marker-vertex-remove" idx="<%= idx %>" transform="scale(.8) translate(9.5, -37)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z">', "<title>Remove vertex.</title>", "</path>", "</g>", "</g>"].join("")
});

// node_modules/jointjs/src/shapes/chess.mjs
var chess_exports = {};
__export(chess_exports, {
  BishopBlack: () => BishopBlack,
  BishopWhite: () => BishopWhite,
  KingBlack: () => KingBlack,
  KingWhite: () => KingWhite,
  KnightBlack: () => KnightBlack,
  KnightWhite: () => KnightWhite,
  PawnBlack: () => PawnBlack,
  PawnWhite: () => PawnWhite,
  QueenBlack: () => QueenBlack,
  QueenWhite: () => QueenWhite,
  RookBlack: () => RookBlack,
  RookWhite: () => RookWhite
});
var KingWhite = Generic.define("chess.KingWhite", {
  size: {
    width: 42,
    height: 38
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"><path      d="M 22.5,11.63 L 22.5,6"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />    <path      d="M 20,8 L 25,8"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />    <path      d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"      style="fill:#ffffff; stroke:#000000; stroke-linecap:butt; stroke-linejoin:miter;" />    <path      d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "      style="fill:#ffffff; stroke:#000000;" />    <path      d="M 11.5,30 C 17,27 27,27 32.5,30"      style="fill:none; stroke:#000000;" />    <path      d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"      style="fill:none; stroke:#000000;" />    <path      d="M 11.5,37 C 17,34 27,34 32.5,37"      style="fill:none; stroke:#000000;" />  </g></g></g>'
});
var KingBlack = Generic.define("chess.KingBlack", {
  size: {
    width: 42,
    height: 38
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path       d="M 22.5,11.63 L 22.5,6"       style="fill:none; stroke:#000000; stroke-linejoin:miter;"       id="path6570" />    <path       d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"       style="fill:#000000;fill-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;" />    <path       d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "       style="fill:#000000; stroke:#000000;" />    <path       d="M 20,8 L 25,8"       style="fill:none; stroke:#000000; stroke-linejoin:miter;" />    <path       d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"       style="fill:none; stroke:#ffffff;" />    <path       d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"       style="fill:none; stroke:#ffffff;" />  </g></g></g>'
});
var QueenWhite = Generic.define("chess.QueenWhite", {
  size: {
    width: 42,
    height: 38
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(-1,-1)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(15.5,-5.5)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(32,-1)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(7,-4.5)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(24,-4)" />    <path      d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "      style="stroke-linecap:butt;" />    <path      d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "      style="stroke-linecap:butt;" />    <path      d="M 11.5,30 C 15,29 30,29 33.5,30"      style="fill:none;" />    <path      d="M 12,33.5 C 18,32.5 27,32.5 33,33.5"      style="fill:none;" />  </g></g></g>'
});
var QueenBlack = Generic.define("chess.QueenBlack", {
  size: {
    width: 42,
    height: 38
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <g style="fill:#000000; stroke:none;">      <circle cx="6"    cy="12" r="2.75" />      <circle cx="14"   cy="9"  r="2.75" />      <circle cx="22.5" cy="8"  r="2.75" />      <circle cx="31"   cy="9"  r="2.75" />      <circle cx="39"   cy="12" r="2.75" />    </g>    <path       d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"       style="stroke-linecap:butt; stroke:#000000;" />    <path       d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"       style="stroke-linecap:butt;" />    <path       d="M 11,38.5 A 35,35 1 0 0 34,38.5"       style="fill:none; stroke:#000000; stroke-linecap:butt;" />    <path       d="M 11,29 A 35,35 1 0 1 34,29"       style="fill:none; stroke:#ffffff;" />    <path       d="M 12.5,31.5 L 32.5,31.5"       style="fill:none; stroke:#ffffff;" />    <path       d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"       style="fill:none; stroke:#ffffff;" />    <path       d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"       style="fill:none; stroke:#ffffff;" />  </g></g></g>'
});
var RookWhite = Generic.define("chess.RookWhite", {
  size: {
    width: 32,
    height: 34
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "      style="stroke-linecap:butt;" />    <path      d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "      style="stroke-linecap:butt;" />    <path      d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"      style="stroke-linecap:butt;" />    <path      d="M 34,14 L 31,17 L 14,17 L 11,14" />    <path      d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"      style="stroke-linecap:butt; stroke-linejoin:miter;" />    <path      d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />    <path      d="M 11,14 L 34,14"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />  </g></g></g>'
});
var RookBlack = Generic.define("chess.RookBlack", {
  size: {
    width: 32,
    height: 34
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "      style="stroke-linecap:butt;" />    <path      d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "      style="stroke-linecap:butt;" />    <path      d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "      style="stroke-linecap:butt;" />    <path      d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "      style="stroke-linecap:butt;stroke-linejoin:miter;" />    <path      d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "      style="stroke-linecap:butt;" />    <path      d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "      style="stroke-linecap:butt;" />    <path      d="M 12,35.5 L 33,35.5 L 33,35.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 13,31.5 L 32,31.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 14,29.5 L 31,29.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 14,16.5 L 31,16.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 11,14 L 34,14"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />  </g></g></g>'
});
var BishopWhite = Generic.define("chess.BishopWhite", {
  size: {
    width: 38,
    height: 38
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <g style="fill:#ffffff; stroke:#000000; stroke-linecap:butt;">       <path        d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />      <path        d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />      <path        d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />    </g>    <path      d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />  </g></g></g>'
});
var BishopBlack = Generic.define("chess.BishopBlack", {
  size: {
    width: 38,
    height: 38
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <g style="fill:#000000; stroke:#000000; stroke-linecap:butt;">       <path        d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />      <path        d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />      <path        d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />    </g>    <path       d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"       style="fill:none; stroke:#ffffff; stroke-linejoin:miter;" />  </g></g></g>'
});
var KnightWhite = Generic.define("chess.KnightWhite", {
  size: {
    width: 38,
    height: 37
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"      style="fill:#ffffff; stroke:#000000;" />    <path      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"      style="fill:#ffffff; stroke:#000000;" />    <path      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"      style="fill:#000000; stroke:#000000;" />    <path      d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"      style="fill:#000000; stroke:#000000;" />  </g></g></g>'
});
var KnightBlack = Generic.define("chess.KnightBlack", {
  size: {
    width: 38,
    height: 37
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"      style="fill:#000000; stroke:#000000;" />    <path      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"      style="fill:#000000; stroke:#000000;" />    <path      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"      style="fill:#ffffff; stroke:#ffffff;" />    <path      d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"      style="fill:#ffffff; stroke:#ffffff;" />    <path      d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "      style="fill:#ffffff; stroke:none;" />  </g></g></g>'
});
var PawnWhite = Generic.define("chess.PawnWhite", {
  size: {
    width: 28,
    height: 33
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "  style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" /></g></g>'
});
var PawnBlack = Generic.define("chess.PawnBlack", {
  size: {
    width: 28,
    height: 33
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "  style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" /></g></g>'
});

// node_modules/jointjs/src/shapes/erd.mjs
var erd_exports = {};
__export(erd_exports, {
  Attribute: () => Attribute,
  Derived: () => Derived,
  Entity: () => Entity,
  ISA: () => ISA,
  IdentifyingRelationship: () => IdentifyingRelationship,
  Key: () => Key,
  Line: () => Line2,
  Multivalued: () => Multivalued,
  Normal: () => Normal,
  Relationship: () => Relationship,
  WeakEntity: () => WeakEntity
});
var Entity = Element2.define("erd.Entity", {
  size: {
    width: 150,
    height: 60
  },
  attrs: {
    ".outer": {
      fill: "#2ECC71",
      stroke: "#27AE60",
      "stroke-width": 2,
      points: "100,0 100,60 0,60 0,0"
    },
    ".inner": {
      fill: "#2ECC71",
      stroke: "#27AE60",
      "stroke-width": 2,
      points: "95,5 95,55 5,55 5,5",
      display: "none"
    },
    text: {
      text: "Entity",
      "font-family": "Arial",
      "font-size": 14,
      "ref-x": 0.5,
      "ref-y": 0.5,
      "y-alignment": "middle",
      "text-anchor": "middle"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>'
});
var WeakEntity = Entity.define("erd.WeakEntity", {
  attrs: {
    ".inner": {
      display: "auto"
    },
    text: {
      text: "Weak Entity"
    }
  }
});
var Relationship = Element2.define("erd.Relationship", {
  size: {
    width: 80,
    height: 80
  },
  attrs: {
    ".outer": {
      fill: "#3498DB",
      stroke: "#2980B9",
      "stroke-width": 2,
      points: "40,0 80,40 40,80 0,40"
    },
    ".inner": {
      fill: "#3498DB",
      stroke: "#2980B9",
      "stroke-width": 2,
      points: "40,5 75,40 40,75 5,40",
      display: "none"
    },
    text: {
      text: "Relationship",
      "font-family": "Arial",
      "font-size": 12,
      "ref-x": 0.5,
      "ref-y": 0.5,
      "y-alignment": "middle",
      "text-anchor": "middle"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>'
});
var IdentifyingRelationship = Relationship.define("erd.IdentifyingRelationship", {
  attrs: {
    ".inner": {
      display: "auto"
    },
    text: {
      text: "Identifying"
    }
  }
});
var Attribute = Element2.define("erd.Attribute", {
  size: {
    width: 100,
    height: 50
  },
  attrs: {
    "ellipse": {
      transform: "translate(50, 25)"
    },
    ".outer": {
      stroke: "#D35400",
      "stroke-width": 2,
      cx: 0,
      cy: 0,
      rx: 50,
      ry: 25,
      fill: "#E67E22"
    },
    ".inner": {
      stroke: "#D35400",
      "stroke-width": 2,
      cx: 0,
      cy: 0,
      rx: 45,
      ry: 20,
      fill: "#E67E22",
      display: "none"
    },
    text: {
      "font-family": "Arial",
      "font-size": 14,
      "ref-x": 0.5,
      "ref-y": 0.5,
      "y-alignment": "middle",
      "text-anchor": "middle"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><ellipse class="outer"/><ellipse class="inner"/></g><text/></g>'
});
var Multivalued = Attribute.define("erd.Multivalued", {
  attrs: {
    ".inner": {
      display: "block"
    },
    text: {
      text: "multivalued"
    }
  }
});
var Derived = Attribute.define("erd.Derived", {
  attrs: {
    ".outer": {
      "stroke-dasharray": "3,5"
    },
    text: {
      text: "derived"
    }
  }
});
var Key = Attribute.define("erd.Key", {
  attrs: {
    ellipse: {
      "stroke-width": 4
    },
    text: {
      text: "key",
      "font-weight": "800",
      "text-decoration": "underline"
    }
  }
});
var Normal = Attribute.define("erd.Normal", {
  attrs: {
    text: {
      text: "Normal"
    }
  }
});
var ISA = Element2.define("erd.ISA", {
  type: "erd.ISA",
  size: {
    width: 100,
    height: 50
  },
  attrs: {
    polygon: {
      points: "0,0 50,50 100,0",
      fill: "#F1C40F",
      stroke: "#F39C12",
      "stroke-width": 2
    },
    text: {
      text: "ISA",
      "font-size": 18,
      "ref-x": 0.5,
      "ref-y": 0.3,
      "y-alignment": "middle",
      "text-anchor": "middle"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><polygon/></g><text/></g>'
});
var Line2 = Link.define("erd.Line", {}, {
  cardinality: function(value) {
    this.set("labels", [{
      position: -20,
      attrs: {
        text: {
          dy: -8,
          text: value
        }
      }
    }]);
  }
});

// node_modules/jointjs/src/shapes/fsa.mjs
var fsa_exports = {};
__export(fsa_exports, {
  Arrow: () => Arrow,
  EndState: () => EndState,
  StartState: () => StartState,
  State: () => State
});
var State = Circle.define("fsa.State", {
  attrs: {
    circle: {
      "stroke-width": 3
    },
    text: {
      "font-weight": "800"
    }
  }
});
var StartState = Element2.define("fsa.StartState", {
  size: {
    width: 20,
    height: 20
  },
  attrs: {
    circle: {
      transform: "translate(10, 10)",
      r: 10,
      fill: "#000000"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><circle/></g></g>'
});
var EndState = Element2.define("fsa.EndState", {
  size: {
    width: 20,
    height: 20
  },
  attrs: {
    ".outer": {
      transform: "translate(10, 10)",
      r: 10,
      fill: "#ffffff",
      stroke: "#000000"
    },
    ".inner": {
      transform: "translate(10, 10)",
      r: 6,
      fill: "#000000"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>'
});
var Arrow = Link.define("fsa.Arrow", {
  attrs: {
    ".marker-target": {
      d: "M 10 0 L 0 5 L 10 10 z"
    }
  },
  smooth: true
});

// node_modules/jointjs/src/shapes/org.mjs
var org_exports = {};
__export(org_exports, {
  Arrow: () => Arrow2,
  Member: () => Member
});
var Member = Element2.define("org.Member", {
  size: {
    width: 180,
    height: 70
  },
  attrs: {
    rect: {
      width: 170,
      height: 60
    },
    ".card": {
      fill: "#FFFFFF",
      stroke: "#000000",
      "stroke-width": 2,
      "pointer-events": "visiblePainted",
      rx: 10,
      ry: 10
    },
    image: {
      width: 48,
      height: 48,
      ref: ".card",
      "ref-x": 10,
      "ref-y": 5
    },
    ".rank": {
      "text-decoration": "underline",
      ref: ".card",
      "ref-x": 0.9,
      "ref-y": 0.2,
      "font-family": "Courier New",
      "font-size": 14,
      "text-anchor": "end"
    },
    ".name": {
      "font-weight": "800",
      ref: ".card",
      "ref-x": 0.9,
      "ref-y": 0.6,
      "font-family": "Courier New",
      "font-size": 14,
      "text-anchor": "end"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><rect class="card"/><image/></g><text class="rank"/><text class="name"/></g>'
});
var Arrow2 = Link.define("org.Arrow", {
  source: {
    selector: ".card"
  },
  target: {
    selector: ".card"
  },
  attrs: {
    ".connection": {
      stroke: "#585858",
      "stroke-width": 3
    }
  },
  z: -1
});

// node_modules/jointjs/src/shapes/pn.mjs
var pn_exports = {};
__export(pn_exports, {
  Link: () => Link4,
  Place: () => Place,
  PlaceView: () => PlaceView,
  Transition: () => Transition
});
var Place = Generic.define("pn.Place", {
  size: {
    width: 50,
    height: 50
  },
  attrs: {
    ".root": {
      r: 25,
      fill: "#ffffff",
      stroke: "#000000",
      transform: "translate(25, 25)"
    },
    ".label": {
      "text-anchor": "middle",
      "ref-x": 0.5,
      "ref-y": -20,
      ref: ".root",
      fill: "#000000",
      "font-size": 12
    },
    ".tokens > circle": {
      fill: "#000000",
      r: 5
    },
    ".tokens.one > circle": {
      transform: "translate(25, 25)"
    },
    ".tokens.two > circle:nth-child(1)": {
      transform: "translate(19, 25)"
    },
    ".tokens.two > circle:nth-child(2)": {
      transform: "translate(31, 25)"
    },
    ".tokens.three > circle:nth-child(1)": {
      transform: "translate(18, 29)"
    },
    ".tokens.three > circle:nth-child(2)": {
      transform: "translate(25, 19)"
    },
    ".tokens.three > circle:nth-child(3)": {
      transform: "translate(32, 29)"
    },
    ".tokens.alot > text": {
      transform: "translate(25, 18)",
      "text-anchor": "middle",
      fill: "#000000"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><circle class="root"/><g class="tokens" /></g><text class="label"/></g>'
});
var PlaceView = ElementView.extend({
  presentationAttributes: ElementView.addPresentationAttributes({
    tokens: ["TOKENS"]
  }),
  initFlag: ElementView.prototype.initFlag.concat(["TOKENS"]),
  confirmUpdate: function(...args) {
    let flags = ElementView.prototype.confirmUpdate.call(this, ...args);
    if (this.hasFlag(flags, "TOKENS")) {
      this.renderTokens();
      this.update();
      flags = this.removeFlag(flags, "TOKENS");
    }
    return flags;
  },
  renderTokens: function() {
    const vTokens = this.vel.findOne(".tokens").empty();
    ["one", "two", "three", "alot"].forEach(function(className2) {
      vTokens.removeClass(className2);
    });
    var tokens = this.model.get("tokens");
    if (!tokens) return;
    switch (tokens) {
      case 1:
        vTokens.addClass("one");
        vTokens.append(V_default("circle"));
        break;
      case 2:
        vTokens.addClass("two");
        vTokens.append([V_default("circle"), V_default("circle")]);
        break;
      case 3:
        vTokens.addClass("three");
        vTokens.append([V_default("circle"), V_default("circle"), V_default("circle")]);
        break;
      default:
        vTokens.addClass("alot");
        vTokens.append(V_default("text").text(tokens + ""));
        break;
    }
  }
});
var Transition = Generic.define("pn.Transition", {
  size: {
    width: 12,
    height: 50
  },
  attrs: {
    "rect": {
      width: 12,
      height: 50,
      fill: "#000000",
      stroke: "#000000"
    },
    ".label": {
      "text-anchor": "middle",
      "ref-x": 0.5,
      "ref-y": -20,
      ref: "rect",
      fill: "#000000",
      "font-size": 12
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><rect class="root"/></g></g><text class="label"/>'
});
var Link4 = Link.define("pn.Link", {
  attrs: {
    ".marker-target": {
      d: "M 10 0 L 0 5 L 10 10 z"
    }
  }
});

// node_modules/jointjs/src/shapes/uml.mjs
var uml_exports = {};
__export(uml_exports, {
  Abstract: () => Abstract,
  AbstractView: () => AbstractView,
  Aggregation: () => Aggregation,
  Association: () => Association,
  Class: () => Class,
  ClassView: () => ClassView,
  Composition: () => Composition,
  EndState: () => EndState2,
  Generalization: () => Generalization,
  Implementation: () => Implementation,
  Interface: () => Interface,
  InterfaceView: () => InterfaceView,
  StartState: () => StartState2,
  State: () => State2,
  Transition: () => Transition2
});
var Class = Generic.define("uml.Class", {
  attrs: {
    rect: {
      "width": 200
    },
    ".uml-class-name-rect": {
      "stroke": "black",
      "stroke-width": 2,
      "fill": "#3498db"
    },
    ".uml-class-attrs-rect": {
      "stroke": "black",
      "stroke-width": 2,
      "fill": "#2980b9"
    },
    ".uml-class-methods-rect": {
      "stroke": "black",
      "stroke-width": 2,
      "fill": "#2980b9"
    },
    ".uml-class-name-text": {
      "ref": ".uml-class-name-rect",
      "ref-y": 0.5,
      "ref-x": 0.5,
      "text-anchor": "middle",
      "y-alignment": "middle",
      "font-weight": "bold",
      "fill": "black",
      "font-size": 12,
      "font-family": "Times New Roman"
    },
    ".uml-class-attrs-text": {
      "ref": ".uml-class-attrs-rect",
      "ref-y": 5,
      "ref-x": 5,
      "fill": "black",
      "font-size": 12,
      "font-family": "Times New Roman"
    },
    ".uml-class-methods-text": {
      "ref": ".uml-class-methods-rect",
      "ref-y": 5,
      "ref-x": 5,
      "fill": "black",
      "font-size": 12,
      "font-family": "Times New Roman"
    }
  },
  name: [],
  attributes: [],
  methods: []
}, {
  markup: ['<g class="rotatable">', '<g class="scalable">', '<rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-methods-rect"/>', "</g>", '<text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-methods-text"/>', "</g>"].join(""),
  initialize: function() {
    this.on("change:name change:attributes change:methods", function() {
      this.updateRectangles();
      this.trigger("uml-update");
    }, this);
    this.updateRectangles();
    Generic.prototype.initialize.apply(this, arguments);
  },
  getClassName: function() {
    return this.get("name");
  },
  updateRectangles: function() {
    var attrs = this.get("attrs");
    var rects = [{
      type: "name",
      text: this.getClassName()
    }, {
      type: "attrs",
      text: this.get("attributes")
    }, {
      type: "methods",
      text: this.get("methods")
    }];
    var offsetY = 0;
    rects.forEach(function(rect2) {
      var lines = Array.isArray(rect2.text) ? rect2.text : [rect2.text];
      var rectHeight = lines.length * 20 + 20;
      attrs[".uml-class-" + rect2.type + "-text"].text = lines.join("\n");
      attrs[".uml-class-" + rect2.type + "-rect"].height = rectHeight;
      attrs[".uml-class-" + rect2.type + "-rect"].transform = "translate(0," + offsetY + ")";
      offsetY += rectHeight;
    });
  }
});
var ClassView = ElementView.extend({
  initialize: function() {
    ElementView.prototype.initialize.apply(this, arguments);
    this.listenTo(this.model, "uml-update", function() {
      this.update();
      this.resize();
    });
  }
});
var Abstract = Class.define("uml.Abstract", {
  attrs: {
    ".uml-class-name-rect": {
      fill: "#e74c3c"
    },
    ".uml-class-attrs-rect": {
      fill: "#c0392b"
    },
    ".uml-class-methods-rect": {
      fill: "#c0392b"
    }
  }
}, {
  getClassName: function() {
    return ["<<Abstract>>", this.get("name")];
  }
});
var AbstractView = ClassView;
var Interface = Class.define("uml.Interface", {
  attrs: {
    ".uml-class-name-rect": {
      fill: "#f1c40f"
    },
    ".uml-class-attrs-rect": {
      fill: "#f39c12"
    },
    ".uml-class-methods-rect": {
      fill: "#f39c12"
    }
  }
}, {
  getClassName: function() {
    return ["<<Interface>>", this.get("name")];
  }
});
var InterfaceView = ClassView;
var Generalization = Link.define("uml.Generalization", {
  attrs: {
    ".marker-target": {
      d: "M 20 0 L 0 10 L 20 20 z",
      fill: "white"
    }
  }
});
var Implementation = Link.define("uml.Implementation", {
  attrs: {
    ".marker-target": {
      d: "M 20 0 L 0 10 L 20 20 z",
      fill: "white"
    },
    ".connection": {
      "stroke-dasharray": "3,3"
    }
  }
});
var Aggregation = Link.define("uml.Aggregation", {
  attrs: {
    ".marker-target": {
      d: "M 40 10 L 20 20 L 0 10 L 20 0 z",
      fill: "white"
    }
  }
});
var Composition = Link.define("uml.Composition", {
  attrs: {
    ".marker-target": {
      d: "M 40 10 L 20 20 L 0 10 L 20 0 z",
      fill: "black"
    }
  }
});
var Association = Link.define("uml.Association");
var State2 = Generic.define("uml.State", {
  attrs: {
    ".uml-state-body": {
      "width": 200,
      "height": 200,
      "rx": 10,
      "ry": 10,
      "fill": "#ecf0f1",
      "stroke": "#bdc3c7",
      "stroke-width": 3
    },
    ".uml-state-separator": {
      "stroke": "#bdc3c7",
      "stroke-width": 2
    },
    ".uml-state-name": {
      "ref": ".uml-state-body",
      "ref-x": 0.5,
      "ref-y": 5,
      "text-anchor": "middle",
      "fill": "#000000",
      "font-family": "Courier New",
      "font-size": 14
    },
    ".uml-state-events": {
      "ref": ".uml-state-separator",
      "ref-x": 5,
      "ref-y": 5,
      "fill": "#000000",
      "font-family": "Courier New",
      "font-size": 14
    }
  },
  name: "State",
  events: []
}, {
  markup: ['<g class="rotatable">', '<g class="scalable">', '<rect class="uml-state-body"/>', "</g>", '<path class="uml-state-separator"/>', '<text class="uml-state-name"/>', '<text class="uml-state-events"/>', "</g>"].join(""),
  initialize: function() {
    this.on({
      "change:name": this.updateName,
      "change:events": this.updateEvents,
      "change:size": this.updatePath
    }, this);
    this.updateName();
    this.updateEvents();
    this.updatePath();
    Generic.prototype.initialize.apply(this, arguments);
  },
  updateName: function() {
    this.attr(".uml-state-name/text", this.get("name"));
  },
  updateEvents: function() {
    this.attr(".uml-state-events/text", this.get("events").join("\n"));
  },
  updatePath: function() {
    var d = "M 0 20 L " + this.get("size").width + " 20";
    this.attr(".uml-state-separator/d", d, {
      silent: true
    });
  }
});
var StartState2 = Circle.define("uml.StartState", {
  type: "uml.StartState",
  attrs: {
    circle: {
      "fill": "#34495e",
      "stroke": "#2c3e50",
      "stroke-width": 2,
      "rx": 1
    }
  }
});
var EndState2 = Generic.define("uml.EndState", {
  size: {
    width: 20,
    height: 20
  },
  attrs: {
    "circle.outer": {
      transform: "translate(10, 10)",
      r: 10,
      fill: "#ffffff",
      stroke: "#2c3e50"
    },
    "circle.inner": {
      transform: "translate(10, 10)",
      r: 6,
      fill: "#34495e"
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>'
});
var Transition2 = Link.define("uml.Transition", {
  attrs: {
    ".marker-target": {
      d: "M 10 0 L 0 5 L 10 10 z",
      fill: "#34495e",
      stroke: "#2c3e50"
    },
    ".connection": {
      stroke: "#2c3e50"
    }
  }
});

// node_modules/jointjs/src/connectionStrategies/index.mjs
var connectionStrategies_exports = {};
__export(connectionStrategies_exports, {
  pinAbsolute: () => pinAbsolute,
  pinRelative: () => pinRelative,
  useDefaults: () => useDefaults
});
function abs2rel(absolute2, max5) {
  if (max5 === 0) return "0%";
  const dp = 1e3;
  const relative = Math.round(absolute2 / max5 * 100 * dp) / dp;
  return `${relative}%`;
}
function pin(relative) {
  return function(end, view, magnet, coords) {
    var fn2 = view.isNodeConnection(magnet) ? pinnedLinkEnd : pinnedElementEnd;
    return fn2(relative, end, view, magnet, coords);
  };
}
function pinnedElementEnd(relative, end, view, magnet, coords) {
  var angle = view.model.angle();
  var bbox2 = view.getNodeUnrotatedBBox(magnet);
  var origin = view.model.getBBox().center();
  coords.rotate(origin, angle);
  var dx = coords.x - bbox2.x;
  var dy = coords.y - bbox2.y;
  if (relative) {
    dx = abs2rel(dx, bbox2.width);
    dy = abs2rel(dy, bbox2.height);
  }
  end.anchor = {
    name: "topLeft",
    args: {
      dx,
      dy,
      rotate: true
    }
  };
  return end;
}
function pinnedLinkEnd(relative, end, view, _magnet, coords) {
  var connection = view.getConnection();
  if (!connection) return end;
  var length2 = connection.closestPointLength(coords);
  if (relative) {
    var totalLength = connection.length();
    end.anchor = {
      name: "connectionRatio",
      args: {
        ratio: length2 / totalLength
      }
    };
  } else {
    end.anchor = {
      name: "connectionLength",
      args: {
        length: length2
      }
    };
  }
  return end;
}
var useDefaults = noop;
var pinAbsolute = pin(false);
var pinRelative = pin(true);

// node_modules/jointjs/src/linkTools/index.mjs
var linkTools_exports = {};
__export(linkTools_exports, {
  Boundary: () => Boundary,
  Button: () => Button,
  Connect: () => Connect,
  HoverConnect: () => HoverConnect,
  Remove: () => Remove,
  Segments: () => Segments,
  SourceAnchor: () => SourceAnchor,
  SourceArrowhead: () => SourceArrowhead,
  TargetAnchor: () => TargetAnchor,
  TargetArrowhead: () => TargetArrowhead,
  Vertices: () => Vertices
});

// node_modules/jointjs/src/linkTools/Vertices.mjs
var VertexHandle = View.extend({
  tagName: "circle",
  svgElement: true,
  className: "marker-vertex",
  events: {
    mousedown: "onPointerDown",
    touchstart: "onPointerDown",
    dblclick: "onDoubleClick",
    dbltap: "onDoubleClick"
  },
  documentEvents: {
    mousemove: "onPointerMove",
    touchmove: "onPointerMove",
    mouseup: "onPointerUp",
    touchend: "onPointerUp",
    touchcancel: "onPointerUp"
  },
  attributes: {
    "r": 6,
    "fill": "#33334F",
    "stroke": "#FFFFFF",
    "stroke-width": 2,
    "cursor": "move"
  },
  position: function(x, y) {
    const {
      vel,
      options
    } = this;
    const {
      scale: scale2
    } = options;
    let matrix = V_default.createSVGMatrix().translate(x, y);
    if (scale2) matrix = matrix.scale(scale2);
    vel.transform(matrix, {
      absolute: true
    });
  },
  onPointerDown: function(evt) {
    if (this.options.guard(evt)) return;
    evt.stopPropagation();
    evt.preventDefault();
    this.options.paper.undelegateEvents();
    this.delegateDocumentEvents(null, evt.data);
    this.trigger("will-change", this, evt);
  },
  onPointerMove: function(evt) {
    this.trigger("changing", this, evt);
  },
  onDoubleClick: function(evt) {
    this.trigger("remove", this, evt);
  },
  onPointerUp: function(evt) {
    this.trigger("changed", this, evt);
    this.undelegateDocumentEvents();
    this.options.paper.delegateEvents();
  }
});
var Vertices = ToolView.extend({
  name: "vertices",
  options: {
    handleClass: VertexHandle,
    snapRadius: 20,
    redundancyRemoval: true,
    vertexAdding: true,
    stopPropagation: true,
    scale: null
  },
  children: [{
    tagName: "path",
    selector: "connection",
    className: "joint-vertices-path",
    attributes: {
      "fill": "none",
      "stroke": "transparent",
      "stroke-width": 10,
      "cursor": "cell"
    }
  }],
  handles: null,
  events: {
    "mousedown .joint-vertices-path": "onPathPointerDown",
    "touchstart .joint-vertices-path": "onPathPointerDown"
  },
  onRender: function() {
    if (this.options.vertexAdding) {
      this.renderChildren();
      this.updatePath();
    }
    this.resetHandles();
    this.renderHandles();
    return this;
  },
  update: function() {
    var relatedView = this.relatedView;
    var vertices = relatedView.model.vertices();
    if (vertices.length === this.handles.length) {
      this.updateHandles();
    } else {
      this.resetHandles();
      this.renderHandles();
    }
    if (this.options.vertexAdding) {
      this.updatePath();
    }
    return this;
  },
  resetHandles: function() {
    var handles = this.handles;
    this.handles = [];
    this.stopListening();
    if (!Array.isArray(handles)) return;
    for (var i = 0, n = handles.length; i < n; i++) {
      handles[i].remove();
    }
  },
  renderHandles: function() {
    var relatedView = this.relatedView;
    var vertices = relatedView.model.vertices();
    for (var i = 0, n = vertices.length; i < n; i++) {
      var vertex = vertices[i];
      var handle = new this.options.handleClass({
        index: i,
        paper: this.paper,
        scale: this.options.scale,
        guard: (evt) => this.guard(evt)
      });
      handle.render();
      handle.position(vertex.x, vertex.y);
      this.simulateRelatedView(handle.el);
      handle.vel.appendTo(this.el);
      this.handles.push(handle);
      this.startHandleListening(handle);
    }
  },
  updateHandles: function() {
    var relatedView = this.relatedView;
    var vertices = relatedView.model.vertices();
    for (var i = 0, n = vertices.length; i < n; i++) {
      var vertex = vertices[i];
      var handle = this.handles[i];
      if (!handle) return;
      handle.position(vertex.x, vertex.y);
    }
  },
  updatePath: function() {
    var connection = this.childNodes.connection;
    if (connection) connection.setAttribute("d", this.relatedView.getSerializedConnection());
  },
  startHandleListening: function(handle) {
    var relatedView = this.relatedView;
    if (relatedView.can("vertexMove")) {
      this.listenTo(handle, "will-change", this.onHandleWillChange);
      this.listenTo(handle, "changing", this.onHandleChanging);
      this.listenTo(handle, "changed", this.onHandleChanged);
    }
    if (relatedView.can("vertexRemove")) {
      this.listenTo(handle, "remove", this.onHandleRemove);
    }
  },
  getNeighborPoints: function(index) {
    var linkView = this.relatedView;
    var vertices = linkView.model.vertices();
    var prev = index > 0 ? vertices[index - 1] : linkView.sourceAnchor;
    var next = index < vertices.length - 1 ? vertices[index + 1] : linkView.targetAnchor;
    return {
      prev: new Point(prev),
      next: new Point(next)
    };
  },
  onHandleWillChange: function(_handle, evt) {
    this.focus();
    const {
      relatedView,
      options
    } = this;
    relatedView.model.startBatch("vertex-move", {
      ui: true,
      tool: this.cid
    });
    if (!options.stopPropagation) relatedView.notifyPointerdown(...relatedView.paper.getPointerArgs(evt));
  },
  onHandleChanging: function(handle, evt) {
    const {
      options,
      relatedView: linkView
    } = this;
    var index = handle.options.index;
    var [normalizedEvent, x, y] = linkView.paper.getPointerArgs(evt);
    var vertex = {
      x,
      y
    };
    this.snapVertex(vertex, index);
    linkView.model.vertex(index, vertex, {
      ui: true,
      tool: this.cid
    });
    handle.position(vertex.x, vertex.y);
    if (!options.stopPropagation) linkView.notifyPointermove(normalizedEvent, x, y);
  },
  onHandleChanged: function(_handle, evt) {
    const {
      options,
      relatedView: linkView
    } = this;
    if (options.vertexAdding) this.updatePath();
    if (!options.redundancyRemoval) return;
    var verticesRemoved = linkView.removeRedundantLinearVertices({
      ui: true,
      tool: this.cid
    });
    if (verticesRemoved) this.render();
    this.blur();
    linkView.model.stopBatch("vertex-move", {
      ui: true,
      tool: this.cid
    });
    if (this.eventData(evt).vertexAdded) {
      linkView.model.stopBatch("vertex-add", {
        ui: true,
        tool: this.cid
      });
    }
    var [normalizedEvt, x, y] = linkView.paper.getPointerArgs(evt);
    if (!options.stopPropagation) linkView.notifyPointerup(normalizedEvt, x, y);
    linkView.checkMouseleave(normalizedEvt);
  },
  snapVertex: function(vertex, index) {
    var snapRadius = this.options.snapRadius;
    if (snapRadius > 0) {
      var neighbors = this.getNeighborPoints(index);
      var prev = neighbors.prev;
      var next = neighbors.next;
      if (Math.abs(vertex.x - prev.x) < snapRadius) {
        vertex.x = prev.x;
      } else if (Math.abs(vertex.x - next.x) < snapRadius) {
        vertex.x = next.x;
      }
      if (Math.abs(vertex.y - prev.y) < snapRadius) {
        vertex.y = neighbors.prev.y;
      } else if (Math.abs(vertex.y - next.y) < snapRadius) {
        vertex.y = next.y;
      }
    }
  },
  onHandleRemove: function(handle, evt) {
    var index = handle.options.index;
    var linkView = this.relatedView;
    linkView.model.removeVertex(index, {
      ui: true
    });
    if (this.options.vertexAdding) this.updatePath();
    linkView.checkMouseleave(normalizeEvent(evt));
  },
  onPathPointerDown: function(evt) {
    if (this.guard(evt)) return;
    evt.stopPropagation();
    evt.preventDefault();
    var normalizedEvent = normalizeEvent(evt);
    var vertex = this.paper.snapToGrid(normalizedEvent.clientX, normalizedEvent.clientY).toJSON();
    var relatedView = this.relatedView;
    relatedView.model.startBatch("vertex-add", {
      ui: true,
      tool: this.cid
    });
    var index = relatedView.getVertexIndex(vertex.x, vertex.y);
    this.snapVertex(vertex, index);
    relatedView.model.insertVertex(index, vertex, {
      ui: true,
      tool: this.cid
    });
    this.update();
    var handle = this.handles[index];
    this.eventData(normalizedEvent, {
      vertexAdded: true
    });
    handle.onPointerDown(normalizedEvent);
  },
  onRemove: function() {
    this.resetHandles();
  }
}, {
  VertexHandle
  // keep as class property
});

// node_modules/jointjs/src/linkTools/helpers.mjs
function getViewBBox(view, useModelGeometry) {
  const {
    model
  } = view;
  if (useModelGeometry) return model.getBBox();
  return model.isLink() ? view.getConnection().bbox() : view.getNodeUnrotatedBBox(view.el);
}
function getAnchor(coords, view, magnet) {
  var end = pinRelative.call(this.paper, {}, view, magnet, coords, this.model);
  return end.anchor;
}
function snapAnchor(coords, view, magnet, type, relatedView, toolView) {
  var snapRadius = toolView.options.snapRadius;
  var isSource = type === "source";
  var refIndex = isSource ? 0 : -1;
  var ref = this.model.vertex(refIndex) || this.getEndAnchor(isSource ? "target" : "source");
  if (ref) {
    if (Math.abs(ref.x - coords.x) < snapRadius) coords.x = ref.x;
    if (Math.abs(ref.y - coords.y) < snapRadius) coords.y = ref.y;
  }
  return coords;
}

// node_modules/jointjs/src/linkTools/Segments.mjs
var SegmentHandle = View.extend({
  tagName: "g",
  svgElement: true,
  className: "marker-segment",
  events: {
    mousedown: "onPointerDown",
    touchstart: "onPointerDown"
  },
  documentEvents: {
    mousemove: "onPointerMove",
    touchmove: "onPointerMove",
    mouseup: "onPointerUp",
    touchend: "onPointerUp",
    touchcancel: "onPointerUp"
  },
  children: [{
    tagName: "line",
    selector: "line",
    attributes: {
      "stroke": "#33334F",
      "stroke-width": 2,
      "fill": "none",
      "pointer-events": "none"
    }
  }, {
    tagName: "rect",
    selector: "handle",
    attributes: {
      "width": 20,
      "height": 8,
      "x": -10,
      "y": -4,
      "rx": 4,
      "ry": 4,
      "fill": "#33334F",
      "stroke": "#FFFFFF",
      "stroke-width": 2
    }
  }],
  onRender: function() {
    this.renderChildren();
  },
  position: function(x, y, angle, view) {
    const {
      scale: scale2
    } = this.options;
    let matrix = V_default.createSVGMatrix().translate(x, y).rotate(angle);
    if (scale2) matrix = matrix.scale(scale2);
    var handle = this.childNodes.handle;
    handle.setAttribute("transform", V_default.matrixToTransformString(matrix));
    handle.setAttribute("cursor", angle % 180 === 0 ? "row-resize" : "col-resize");
    var viewPoint = view.getClosestPoint(new Point(x, y));
    var line3 = this.childNodes.line;
    line3.setAttribute("x1", x);
    line3.setAttribute("y1", y);
    line3.setAttribute("x2", viewPoint.x);
    line3.setAttribute("y2", viewPoint.y);
  },
  onPointerDown: function(evt) {
    if (this.options.guard(evt)) return;
    this.trigger("change:start", this, evt);
    evt.stopPropagation();
    evt.preventDefault();
    this.options.paper.undelegateEvents();
    this.delegateDocumentEvents(null, evt.data);
  },
  onPointerMove: function(evt) {
    this.trigger("changing", this, evt);
  },
  onPointerUp: function(evt) {
    this.undelegateDocumentEvents();
    this.options.paper.delegateEvents();
    this.trigger("change:end", this, evt);
  },
  show: function() {
    this.el.style.display = "";
  },
  hide: function() {
    this.el.style.display = "none";
  }
});
var Segments = ToolView.extend({
  name: "segments",
  precision: 0.5,
  options: {
    handleClass: SegmentHandle,
    segmentLengthThreshold: 40,
    redundancyRemoval: true,
    anchor: getAnchor,
    snapRadius: 10,
    snapHandle: true,
    stopPropagation: true
  },
  handles: null,
  onRender: function() {
    this.resetHandles();
    var relatedView = this.relatedView;
    var vertices = relatedView.model.vertices();
    vertices.unshift(relatedView.sourcePoint);
    vertices.push(relatedView.targetPoint);
    for (var i = 0, n = vertices.length; i < n - 1; i++) {
      var vertex = vertices[i];
      var nextVertex = vertices[i + 1];
      var handle = this.renderHandle(vertex, nextVertex);
      this.simulateRelatedView(handle.el);
      this.handles.push(handle);
      handle.options.index = i;
    }
    return this;
  },
  renderHandle: function(vertex, nextVertex) {
    var handle = new this.options.handleClass({
      paper: this.paper,
      scale: this.options.scale,
      guard: (evt) => this.guard(evt)
    });
    handle.render();
    this.updateHandle(handle, vertex, nextVertex);
    handle.vel.appendTo(this.el);
    this.startHandleListening(handle);
    return handle;
  },
  update: function() {
    this.render();
    return this;
  },
  startHandleListening: function(handle) {
    this.listenTo(handle, "change:start", this.onHandleChangeStart);
    this.listenTo(handle, "changing", this.onHandleChanging);
    this.listenTo(handle, "change:end", this.onHandleChangeEnd);
  },
  resetHandles: function() {
    var handles = this.handles;
    this.handles = [];
    this.stopListening();
    if (!Array.isArray(handles)) return;
    for (var i = 0, n = handles.length; i < n; i++) {
      handles[i].remove();
    }
  },
  shiftHandleIndexes: function(value) {
    var handles = this.handles;
    for (var i = 0, n = handles.length; i < n; i++) handles[i].options.index += value;
  },
  resetAnchor: function(type, anchor2) {
    var relatedModel = this.relatedView.model;
    if (anchor2) {
      relatedModel.prop([type, "anchor"], anchor2, {
        rewrite: true,
        ui: true,
        tool: this.cid
      });
    } else {
      relatedModel.removeProp([type, "anchor"], {
        ui: true,
        tool: this.cid
      });
    }
  },
  snapHandle: function(handle, position, data) {
    var index = handle.options.index;
    var linkView = this.relatedView;
    var link = linkView.model;
    var vertices = link.vertices();
    var axis = handle.options.axis;
    var prev = vertices[index - 2] || data.sourceAnchor;
    var next = vertices[index + 1] || data.targetAnchor;
    var snapRadius = this.options.snapRadius;
    if (Math.abs(position[axis] - prev[axis]) < snapRadius) {
      position[axis] = prev[axis];
    } else if (Math.abs(position[axis] - next[axis]) < snapRadius) {
      position[axis] = next[axis];
    }
    return position;
  },
  onHandleChanging: function(handle, evt) {
    const {
      options
    } = this;
    var data = this.eventData(evt);
    var relatedView = this.relatedView;
    var paper = relatedView.paper;
    var index = handle.options.index - 1;
    var normalizedEvent = normalizeEvent(evt);
    var coords = paper.snapToGrid(normalizedEvent.clientX, normalizedEvent.clientY);
    var position = this.snapHandle(handle, coords.clone(), data);
    var axis = handle.options.axis;
    var offset = this.options.snapHandle ? 0 : coords[axis] - position[axis];
    var link = relatedView.model;
    var vertices = cloneDeep(link.vertices());
    var anchorFn = this.options.anchor;
    if (typeof anchorFn !== "function") anchorFn = null;
    const handleIndex = handle.options.index;
    const vertexPoints = [relatedView.sourcePoint.clone(), ...vertices, relatedView.targetPoint.clone()];
    let indexOffset = 0;
    if (handleIndex - 1 >= 0) {
      const v1 = vertexPoints[handleIndex - 1];
      const v2 = vertexPoints[handleIndex];
      const theta = new Line(v1, v2).vector().theta();
      if (theta % 90 !== 0) {
        vertices.splice(handleIndex - 1, 0, data.originalVertices[handleIndex - 1]);
        indexOffset++;
        this.shiftHandleIndexes(1);
      }
    }
    var vertex = vertices[index + indexOffset];
    var nextVertex = vertices[index + 1 + indexOffset];
    if (handleIndex + 2 < vertexPoints.length) {
      const v1 = vertexPoints[handleIndex + 1];
      const v2 = vertexPoints[handleIndex + 2];
      const theta = new Line(v1, v2).vector().theta();
      if (theta % 90 !== 0) {
        const isSingleVertex = data.originalVertices.length === 1;
        const origVIndex = isSingleVertex ? 0 : handleIndex;
        const additionalOffset = data.firstHandleShifted && !isSingleVertex ? 1 : 0;
        let nextVIndex = 1 + indexOffset;
        vertices.splice(handleIndex + nextVIndex, 0, data.originalVertices[origVIndex - additionalOffset]);
      }
    }
    var sourceView = relatedView.sourceView;
    var sourceBBox = relatedView.sourceBBox;
    var changeSourceAnchor = false;
    var deleteSourceAnchor = false;
    if (!vertex) {
      vertex = relatedView.sourceAnchor.toJSON();
      vertex[axis] = position[axis];
      if (sourceBBox.containsPoint(vertex)) {
        vertex[axis] = position[axis];
        changeSourceAnchor = true;
      } else {
        vertices.unshift(vertex);
        this.shiftHandleIndexes(1);
        data.firstHandleShifted = true;
        deleteSourceAnchor = true;
      }
    } else if (index === 0) {
      if (sourceBBox.containsPoint(vertex)) {
        vertices.shift();
        this.shiftHandleIndexes(-1);
        changeSourceAnchor = true;
      } else {
        vertex[axis] = position[axis];
        deleteSourceAnchor = true;
      }
    } else {
      vertex[axis] = position[axis];
    }
    if (anchorFn && sourceView) {
      if (changeSourceAnchor) {
        var sourceAnchorPosition = data.sourceAnchor.clone();
        sourceAnchorPosition[axis] = position[axis];
        var sourceAnchor = anchorFn.call(relatedView, sourceAnchorPosition, sourceView, relatedView.sourceMagnet || sourceView.el, "source", relatedView);
        this.resetAnchor("source", sourceAnchor);
      }
      if (deleteSourceAnchor) {
        this.resetAnchor("source", data.sourceAnchorDef);
      }
    }
    var targetView = relatedView.targetView;
    var targetBBox = relatedView.targetBBox;
    var changeTargetAnchor = false;
    var deleteTargetAnchor = false;
    if (!nextVertex) {
      nextVertex = relatedView.targetAnchor.toJSON();
      nextVertex[axis] = position[axis];
      if (targetBBox.containsPoint(nextVertex)) {
        changeTargetAnchor = true;
      } else {
        vertices.push(nextVertex);
        deleteTargetAnchor = true;
      }
    } else if (index === vertices.length - 2) {
      if (targetBBox.containsPoint(nextVertex)) {
        vertices.pop();
        changeTargetAnchor = true;
      } else {
        nextVertex[axis] = position[axis];
        deleteTargetAnchor = true;
      }
    } else {
      nextVertex[axis] = position[axis];
    }
    if (anchorFn && targetView) {
      if (changeTargetAnchor) {
        var targetAnchorPosition = data.targetAnchor.clone();
        targetAnchorPosition[axis] = position[axis];
        var targetAnchor = anchorFn.call(relatedView, targetAnchorPosition, targetView, relatedView.targetMagnet || targetView.el, "target", relatedView);
        this.resetAnchor("target", targetAnchor);
      }
      if (deleteTargetAnchor) {
        this.resetAnchor("target", data.targetAnchorDef);
      }
    }
    if (vertices.some((v) => !v)) {
      throw new Error("Segments: incompatible router in use");
    }
    link.vertices(vertices, {
      ui: true,
      tool: this.cid
    });
    this.updateHandle(handle, vertex, nextVertex, offset);
    if (!options.stopPropagation) relatedView.notifyPointermove(normalizedEvent, coords.x, coords.y);
  },
  onHandleChangeStart: function(handle, evt) {
    const {
      options,
      handles,
      relatedView: linkView
    } = this;
    const {
      model,
      paper
    } = linkView;
    var index = handle.options.index;
    if (!Array.isArray(handles)) return;
    for (var i = 0, n = handles.length; i < n; i++) {
      if (i !== index) handles[i].hide();
    }
    this.focus();
    this.eventData(evt, {
      sourceAnchor: linkView.sourceAnchor.clone(),
      targetAnchor: linkView.targetAnchor.clone(),
      sourceAnchorDef: clone(model.prop(["source", "anchor"])),
      targetAnchorDef: clone(model.prop(["target", "anchor"])),
      originalVertices: cloneDeep(model.vertices()),
      firstHandleShifted: false
    });
    model.startBatch("segment-move", {
      ui: true,
      tool: this.cid
    });
    if (!options.stopPropagation) linkView.notifyPointerdown(...paper.getPointerArgs(evt));
  },
  onHandleChangeEnd: function(_handle, evt) {
    const {
      options,
      relatedView: linkView
    } = this;
    const {
      paper,
      model
    } = linkView;
    if (options.redundancyRemoval) {
      linkView.removeRedundantLinearVertices({
        ui: true,
        tool: this.cid
      });
    }
    const normalizedEvent = normalizeEvent(evt);
    const coords = paper.snapToGrid(normalizedEvent.clientX, normalizedEvent.clientY);
    this.render();
    this.blur();
    model.stopBatch("segment-move", {
      ui: true,
      tool: this.cid
    });
    if (!options.stopPropagation) linkView.notifyPointerup(normalizedEvent, coords.x, coords.y);
    linkView.checkMouseleave(normalizedEvent);
  },
  updateHandle: function(handle, vertex, nextVertex, offset) {
    var vertical = Math.abs(vertex.x - nextVertex.x) < this.precision;
    var horizontal = Math.abs(vertex.y - nextVertex.y) < this.precision;
    if (vertical || horizontal) {
      var segmentLine = new Line(vertex, nextVertex);
      var length2 = segmentLine.length();
      if (length2 < this.options.segmentLengthThreshold) {
        handle.hide();
      } else {
        var position = segmentLine.midpoint();
        var axis = vertical ? "x" : "y";
        position[axis] += offset || 0;
        var angle = segmentLine.vector().vectorAngle(new Point(1, 0));
        handle.position(position.x, position.y, angle, this.relatedView);
        handle.show();
        handle.options.axis = axis;
      }
    } else {
      handle.hide();
    }
  },
  onRemove: function() {
    this.resetHandles();
  }
}, {
  SegmentHandle
  // keep as class property
});

// node_modules/jointjs/src/linkTools/Arrowhead.mjs
var Arrowhead = ToolView.extend({
  tagName: "path",
  xAxisVector: new Point(1, 0),
  events: {
    mousedown: "onPointerDown",
    touchstart: "onPointerDown"
  },
  documentEvents: {
    mousemove: "onPointerMove",
    touchmove: "onPointerMove",
    mouseup: "onPointerUp",
    touchend: "onPointerUp",
    touchcancel: "onPointerUp"
  },
  options: {
    scale: null
  },
  onRender: function() {
    this.update();
  },
  update: function() {
    var ratio = this.ratio;
    var view = this.relatedView;
    var tangent = view.getTangentAtRatio(ratio);
    var position, angle;
    if (tangent) {
      position = tangent.start;
      angle = tangent.vector().vectorAngle(this.xAxisVector) || 0;
    } else {
      position = view.getPointAtRatio(ratio);
      angle = 0;
    }
    if (!position) return this;
    var matrix = V_default.createSVGMatrix().translate(position.x, position.y).rotate(angle);
    const {
      scale: scale2
    } = this.options;
    if (scale2) matrix = matrix.scale(scale2);
    this.vel.transform(matrix, {
      absolute: true
    });
    return this;
  },
  onPointerDown: function(evt) {
    if (this.guard(evt)) return;
    evt.stopPropagation();
    evt.preventDefault();
    var relatedView = this.relatedView;
    relatedView.model.startBatch("arrowhead-move", {
      ui: true,
      tool: this.cid
    });
    if (relatedView.can("arrowheadMove")) {
      relatedView.startArrowheadMove(this.arrowheadType);
      this.delegateDocumentEvents();
      relatedView.paper.undelegateEvents();
    }
    this.focus();
    this.el.style.pointerEvents = "none";
  },
  onPointerMove: function(evt) {
    var normalizedEvent = normalizeEvent(evt);
    var coords = this.paper.snapToGrid(normalizedEvent.clientX, normalizedEvent.clientY);
    this.relatedView.pointermove(normalizedEvent, coords.x, coords.y);
  },
  onPointerUp: function(evt) {
    this.undelegateDocumentEvents();
    var relatedView = this.relatedView;
    var paper = relatedView.paper;
    var normalizedEvent = normalizeEvent(evt);
    var coords = paper.snapToGrid(normalizedEvent.clientX, normalizedEvent.clientY);
    relatedView.pointerup(normalizedEvent, coords.x, coords.y);
    paper.delegateEvents();
    this.blur();
    this.el.style.pointerEvents = "";
    relatedView.model.stopBatch("arrowhead-move", {
      ui: true,
      tool: this.cid
    });
  }
});
var TargetArrowhead = Arrowhead.extend({
  name: "target-arrowhead",
  ratio: 1,
  arrowheadType: "target",
  attributes: {
    "d": "M -10 -8 10 0 -10 8 Z",
    "fill": "#33334F",
    "stroke": "#FFFFFF",
    "stroke-width": 2,
    "cursor": "move",
    "class": "target-arrowhead"
  }
});
var SourceArrowhead = Arrowhead.extend({
  name: "source-arrowhead",
  ratio: 0,
  arrowheadType: "source",
  attributes: {
    "d": "M 10 -8 -10 0 10 8 Z",
    "fill": "#33334F",
    "stroke": "#FFFFFF",
    "stroke-width": 2,
    "cursor": "move",
    "class": "source-arrowhead"
  }
});

// node_modules/jointjs/src/linkTools/Boundary.mjs
var Boundary = ToolView.extend({
  name: "boundary",
  tagName: "rect",
  options: {
    padding: 10,
    useModelGeometry: false
  },
  attributes: {
    "fill": "none",
    "stroke": "#33334F",
    "stroke-width": 0.5,
    "stroke-dasharray": "5, 5",
    "pointer-events": "none"
  },
  onRender: function() {
    this.update();
  },
  update: function() {
    const {
      relatedView: view,
      options,
      vel
    } = this;
    const {
      useModelGeometry,
      rotate
    } = options;
    const padding = normalizeSides(options.padding);
    let bbox2 = getViewBBox(view, useModelGeometry).moveAndExpand({
      x: -padding.left,
      y: -padding.top,
      width: padding.left + padding.right,
      height: padding.top + padding.bottom
    });
    var model = view.model;
    if (model.isElement()) {
      var angle = model.angle();
      if (angle) {
        if (rotate) {
          var origin = model.getBBox().center();
          vel.rotate(angle, origin.x, origin.y, {
            absolute: true
          });
        } else {
          bbox2 = bbox2.bbox(angle);
        }
      }
    }
    vel.attr(bbox2.toJSON());
    return this;
  }
});

// node_modules/jointjs/src/linkTools/Anchor.mjs
var Anchor = ToolView.extend({
  tagName: "g",
  type: null,
  children: [{
    tagName: "circle",
    selector: "anchor",
    attributes: {
      "cursor": "pointer"
    }
  }, {
    tagName: "rect",
    selector: "area",
    attributes: {
      "pointer-events": "none",
      "fill": "none",
      "stroke": "#33334F",
      "stroke-dasharray": "2,4",
      "rx": 5,
      "ry": 5
    }
  }],
  events: {
    mousedown: "onPointerDown",
    touchstart: "onPointerDown",
    dblclick: "onPointerDblClick",
    dbltap: "onPointerDblClick"
  },
  documentEvents: {
    mousemove: "onPointerMove",
    touchmove: "onPointerMove",
    mouseup: "onPointerUp",
    touchend: "onPointerUp",
    touchcancel: "onPointerUp"
  },
  options: {
    snap: snapAnchor,
    anchor: getAnchor,
    scale: null,
    resetAnchor: true,
    customAnchorAttributes: {
      "stroke-width": 4,
      "stroke": "#33334F",
      "fill": "#FFFFFF",
      "r": 5
    },
    defaultAnchorAttributes: {
      "stroke-width": 2,
      "stroke": "#FFFFFF",
      "fill": "#33334F",
      "r": 6
    },
    areaPadding: 6,
    snapRadius: 10,
    restrictArea: true,
    redundancyRemoval: true
  },
  onRender: function() {
    this.renderChildren();
    this.toggleArea(false);
    this.update();
  },
  update: function() {
    var type = this.type;
    var relatedView = this.relatedView;
    var view = relatedView.getEndView(type);
    if (view) {
      this.updateAnchor();
      this.updateArea();
      this.el.style.display = "";
    } else {
      this.el.style.display = "none";
    }
    return this;
  },
  updateAnchor: function() {
    var childNodes = this.childNodes;
    if (!childNodes) return;
    var anchorNode = childNodes.anchor;
    if (!anchorNode) return;
    var relatedView = this.relatedView;
    var type = this.type;
    var position = relatedView.getEndAnchor(type);
    var options = this.options;
    var customAnchor = relatedView.model.prop([type, "anchor"]);
    let transformString = `translate(${position.x},${position.y})`;
    if (options.scale) {
      transformString += ` scale(${options.scale})`;
    }
    anchorNode.setAttribute("transform", transformString);
    var anchorAttributes = customAnchor ? options.customAnchorAttributes : options.defaultAnchorAttributes;
    for (var attrName in anchorAttributes) {
      anchorNode.setAttribute(attrName, anchorAttributes[attrName]);
    }
  },
  updateArea: function() {
    var childNodes = this.childNodes;
    if (!childNodes) return;
    var areaNode = childNodes.area;
    if (!areaNode) return;
    var relatedView = this.relatedView;
    var type = this.type;
    var view = relatedView.getEndView(type);
    var model = view.model;
    var magnet = relatedView.getEndMagnet(type);
    var padding = this.options.areaPadding;
    if (!isFinite(padding)) padding = 0;
    var bbox2, angle, center2;
    if (view.isNodeConnection(magnet)) {
      bbox2 = view.getNodeBBox(magnet);
      angle = 0;
      center2 = bbox2.center();
    } else {
      bbox2 = view.getNodeUnrotatedBBox(magnet);
      angle = model.angle();
      center2 = bbox2.center();
      if (angle) center2.rotate(model.getBBox().center(), -angle);
    }
    bbox2.inflate(padding);
    areaNode.setAttribute("x", -bbox2.width / 2);
    areaNode.setAttribute("y", -bbox2.height / 2);
    areaNode.setAttribute("width", bbox2.width);
    areaNode.setAttribute("height", bbox2.height);
    areaNode.setAttribute("transform", "translate(" + center2.x + "," + center2.y + ") rotate(" + angle + ")");
  },
  toggleArea: function(visible) {
    var childNodes = this.childNodes;
    if (!childNodes) return;
    var areaNode = childNodes.area;
    if (!areaNode) return;
    areaNode.style.display = visible ? "" : "none";
  },
  onPointerDown: function(evt) {
    if (this.guard(evt)) return;
    evt.stopPropagation();
    evt.preventDefault();
    this.paper.undelegateEvents();
    this.delegateDocumentEvents();
    this.focus();
    this.toggleArea(this.options.restrictArea);
    this.relatedView.model.startBatch("anchor-move", {
      ui: true,
      tool: this.cid
    });
  },
  resetAnchor: function(anchor2) {
    var type = this.type;
    var relatedModel = this.relatedView.model;
    if (anchor2) {
      relatedModel.prop([type, "anchor"], anchor2, {
        rewrite: true,
        ui: true,
        tool: this.cid
      });
    } else {
      relatedModel.removeProp([type, "anchor"], {
        ui: true,
        tool: this.cid
      });
    }
  },
  onPointerMove: function(evt) {
    var relatedView = this.relatedView;
    var type = this.type;
    var view = relatedView.getEndView(type);
    var model = view.model;
    var magnet = relatedView.getEndMagnet(type);
    var normalizedEvent = normalizeEvent(evt);
    var coords = this.paper.clientToLocalPoint(normalizedEvent.clientX, normalizedEvent.clientY);
    var snapFn = this.options.snap;
    if (typeof snapFn === "function") {
      coords = snapFn.call(relatedView, coords, view, magnet, type, relatedView, this);
      coords = new Point(coords);
    }
    if (this.options.restrictArea) {
      if (view.isNodeConnection(magnet)) {
        var pointAtConnection = view.getClosestPoint(coords);
        if (pointAtConnection) coords = pointAtConnection;
      } else {
        var bbox2 = view.getNodeUnrotatedBBox(magnet);
        var angle = model.angle();
        var origin = model.getBBox().center();
        var rotatedCoords = coords.clone().rotate(origin, angle);
        if (!bbox2.containsPoint(rotatedCoords)) {
          coords = bbox2.pointNearestToPoint(rotatedCoords).rotate(origin, -angle);
        }
      }
    }
    var anchor2;
    var anchorFn = this.options.anchor;
    if (typeof anchorFn === "function") {
      anchor2 = anchorFn.call(relatedView, coords, view, magnet, type, relatedView);
    }
    this.resetAnchor(anchor2);
    this.update();
  },
  onPointerUp: function(evt) {
    const normalizedEvent = normalizeEvent(evt);
    this.paper.delegateEvents();
    this.undelegateDocumentEvents();
    this.blur();
    this.toggleArea(false);
    var linkView = this.relatedView;
    if (this.options.redundancyRemoval) linkView.removeRedundantLinearVertices({
      ui: true,
      tool: this.cid
    });
    linkView.checkMouseleave(normalizedEvent);
    linkView.model.stopBatch("anchor-move", {
      ui: true,
      tool: this.cid
    });
  },
  onPointerDblClick: function() {
    var anchor2 = this.options.resetAnchor;
    if (anchor2 === false) return;
    if (anchor2 === true) anchor2 = null;
    this.resetAnchor(cloneDeep(anchor2));
    this.update();
  }
});
var SourceAnchor = Anchor.extend({
  name: "source-anchor",
  type: "source"
});
var TargetAnchor = Anchor.extend({
  name: "target-anchor",
  type: "target"
});

// node_modules/jointjs/src/linkTools/Button.mjs
var Button = ToolView.extend({
  name: "button",
  events: {
    "mousedown": "onPointerDown",
    "touchstart": "onPointerDown"
  },
  options: {
    distance: 0,
    offset: 0,
    scale: null,
    rotate: false
  },
  onRender: function() {
    this.renderChildren(this.options.markup);
    this.update();
  },
  update: function() {
    this.position();
    return this;
  },
  position: function() {
    const {
      vel
    } = this;
    vel.transform(this.getCellMatrix(), {
      absolute: true
    });
  },
  getCellMatrix() {
    return this.relatedView.model.isLink() ? this.getLinkMatrix() : this.getElementMatrix();
  },
  getElementMatrix() {
    const {
      relatedView: view,
      options
    } = this;
    let {
      x = 0,
      y = 0,
      offset = {},
      useModelGeometry,
      rotate,
      scale: scale2
    } = options;
    let bbox2 = getViewBBox(view, useModelGeometry);
    const angle = view.model.angle();
    if (!rotate) bbox2 = bbox2.bbox(angle);
    const {
      x: offsetX = 0,
      y: offsetY = 0
    } = offset;
    if (isPercentage(x)) {
      x = parseFloat(x) / 100 * bbox2.width;
    } else if (isCalcAttribute(x)) {
      x = Number(evalCalcAttribute(x, bbox2));
    }
    if (isPercentage(y)) {
      y = parseFloat(y) / 100 * bbox2.height;
    } else if (isCalcAttribute(y)) {
      y = Number(evalCalcAttribute(y, bbox2));
    }
    let matrix = V_default.createSVGMatrix().translate(bbox2.x + bbox2.width / 2, bbox2.y + bbox2.height / 2);
    if (rotate) matrix = matrix.rotate(angle);
    matrix = matrix.translate(x + offsetX - bbox2.width / 2, y + offsetY - bbox2.height / 2);
    if (scale2) matrix = matrix.scale(scale2);
    return matrix;
  },
  getLinkMatrix() {
    const {
      relatedView: view,
      options
    } = this;
    const {
      offset = 0,
      distance = 0,
      rotate,
      scale: scale2
    } = options;
    let tangent, position, angle;
    if (isPercentage(distance)) {
      tangent = view.getTangentAtRatio(parseFloat(distance) / 100);
    } else {
      tangent = view.getTangentAtLength(distance);
    }
    if (tangent) {
      position = tangent.start;
      angle = tangent.vector().vectorAngle(new Point(1, 0)) || 0;
    } else {
      position = view.getConnection().start;
      angle = 0;
    }
    let matrix = V_default.createSVGMatrix().translate(position.x, position.y).rotate(angle).translate(0, offset);
    if (!rotate) matrix = matrix.rotate(-angle);
    if (scale2) matrix = matrix.scale(scale2);
    return matrix;
  },
  onPointerDown: function(evt) {
    if (this.guard(evt)) return;
    evt.stopPropagation();
    evt.preventDefault();
    var actionFn = this.options.action;
    if (typeof actionFn === "function") {
      actionFn.call(this.relatedView, evt, this.relatedView, this);
    }
  }
});
var Remove = Button.extend({
  children: [{
    tagName: "circle",
    selector: "button",
    attributes: {
      "r": 7,
      "fill": "#FF1D00",
      "cursor": "pointer"
    }
  }, {
    tagName: "path",
    selector: "icon",
    attributes: {
      "d": "M -3 -3 3 3 M -3 3 3 -3",
      "fill": "none",
      "stroke": "#FFFFFF",
      "stroke-width": 2,
      "pointer-events": "none"
    }
  }],
  options: {
    distance: 60,
    offset: 0,
    action: function(evt, view, tool) {
      view.model.remove({
        ui: true,
        tool: tool.cid
      });
    }
  }
});

// node_modules/jointjs/src/linkTools/Connect.mjs
var Connect = Button.extend({
  name: "connect",
  documentEvents: {
    mousemove: "drag",
    touchmove: "drag",
    mouseup: "dragend",
    touchend: "dragend",
    touchcancel: "dragend"
  },
  children: [{
    tagName: "circle",
    selector: "button",
    attributes: {
      "r": 7,
      "fill": "#333333",
      "cursor": "pointer"
    }
  }, {
    tagName: "path",
    selector: "icon",
    attributes: {
      "d": "M -4 -1 L 0 -1 L 0 -4 L 4 0 L 0 4 0 1 -4 1 z",
      "fill": "#FFFFFF",
      "stroke": "none",
      "stroke-width": 2,
      "pointer-events": "none"
    }
  }],
  options: {
    distance: 80,
    offset: 0,
    magnet: (view) => view.el,
    action: (evt, _view, tool) => tool.dragstart(evt)
  },
  getMagnetNode: function() {
    const {
      options,
      relatedView
    } = this;
    const {
      magnet
    } = options;
    let magnetNode;
    switch (typeof magnet) {
      case "function": {
        magnetNode = magnet.call(this, relatedView, this);
        break;
      }
      case "string": {
        [magnetNode] = relatedView.findBySelector(magnet);
        break;
      }
      default: {
        magnetNode = magnet;
        break;
      }
    }
    if (!magnetNode) magnetNode = relatedView.el;
    if (magnetNode instanceof SVGElement) return magnetNode;
    throw new Error("Connect: magnet must be an SVGElement");
  },
  dragstart: function(evt) {
    const {
      paper,
      relatedView
    } = this;
    const normalizedEvent = normalizeEvent(evt);
    const {
      x,
      y
    } = paper.clientToLocalPoint(normalizedEvent.clientX, normalizedEvent.clientY);
    relatedView.dragLinkStart(normalizedEvent, this.getMagnetNode(), x, y);
    paper.undelegateEvents();
    this.delegateDocumentEvents(null, normalizedEvent.data);
    this.focus();
  },
  drag: function(evt) {
    const {
      paper,
      relatedView
    } = this;
    const normalizedEvent = normalizeEvent(evt);
    const {
      x,
      y
    } = paper.snapToGrid(normalizedEvent.clientX, normalizedEvent.clientY);
    relatedView.dragLink(normalizedEvent, x, y);
  },
  dragend: function(evt) {
    const {
      paper,
      relatedView
    } = this;
    const normalizedEvent = normalizeEvent(evt);
    const {
      x,
      y
    } = paper.snapToGrid(normalizedEvent.clientX, normalizedEvent.clientY);
    relatedView.dragLinkEnd(normalizedEvent, x, y);
    this.undelegateDocumentEvents();
    paper.delegateEvents();
    this.blur();
    relatedView.checkMouseleave(normalizedEvent);
  }
});

// node_modules/jointjs/src/linkTools/HoverConnect.mjs
var import_jquery7 = __toESM(require_jquery(), 1);
var HoverConnect = Connect.extend({
  name: "hover-connect",
  defaultMarkup: [{
    tagName: "circle",
    attributes: {
      "r": 7,
      "fill": "#333333",
      "cursor": "pointer"
    }
  }, {
    tagName: "path",
    attributes: {
      "d": "M -4 -1 L 0 -1 L 0 -4 L 4 0 L 0 4 0 1 -4 1 z",
      "fill": "#FFFFFF",
      "stroke": "none",
      "stroke-width": 2
    }
  }],
  children() {
    const {
      options,
      defaultMarkup
    } = this;
    return [{
      tagName: "path",
      selector: "track",
      attributes: {
        "fill": "none",
        "stroke": "transparent",
        "stroke-width": options.trackWidth || 15,
        "cursor": "pointer"
      }
    }, {
      tagName: "g",
      selector: "button",
      attributes: {
        "pointer-events": "none",
        "display": "none"
      },
      children: options.markup || defaultMarkup
    }];
  },
  events: Object.assign({
    mousemove: "onMousemove",
    mouseenter: "onMouseenter",
    mouseleave: "onMouseleave"
  }, Connect.prototype.events),
  onRender: function() {
    this.renderChildren();
    this.update();
  },
  trackPath: null,
  update() {
    const {
      childNodes
    } = this;
    this.trackPath = this.getTrackPath();
    Connect.prototype.update.apply(this, arguments);
    childNodes.track.setAttribute("d", this.trackPath.serialize());
  },
  position() {
    const {
      el,
      childNodes
    } = this;
    childNodes.button.setAttribute("transform", V_default.matrixToTransformString(this.getButtonMatrix()));
    el.setAttribute("transform", V_default.matrixToTransformString(this.getTrackMatrix()));
  },
  getButtonMatrix() {
    const {
      options,
      trackPath
    } = this;
    const {
      offset = 0,
      distance = 0,
      rotate,
      scale: scale2
    } = options;
    let tangent, position, angle;
    if (isPercentage(distance)) {
      tangent = trackPath.tangentAtRatio(parseFloat(distance) / 100);
    } else {
      tangent = trackPath.tangentAtLength(distance);
    }
    if (tangent) {
      position = tangent.start;
      angle = tangent.vector().vectorAngle(new Point(1, 0)) || 0;
    } else {
      position = trackPath.start;
      angle = 0;
    }
    let matrix = V_default.createSVGMatrix().translate(position.x, position.y).rotate(angle).translate(0, offset);
    if (!rotate) matrix = matrix.rotate(-angle);
    if (scale2) matrix = matrix.scale(scale2);
    return matrix;
  },
  getTrackPath() {
    return this.relatedView.getConnection();
  },
  getTrackMatrix() {
    return V_default.createSVGMatrix();
  },
  getTrackRatioFromEvent(evt) {
    const {
      relatedView,
      trackPath
    } = this;
    const localPoint = relatedView.paper.clientToLocalPoint(evt.clientX, evt.clientY);
    const trackPoint = V_default.transformPoint(localPoint, this.getTrackMatrix().inverse());
    return trackPath.closestPointLength(trackPoint);
  },
  canShowButton() {
    return import_jquery7.default._data(this.paper.el, "events");
  },
  showButton() {
    this.childNodes.button.style.display = "block";
  },
  hideButton() {
    this.childNodes.button.style.display = "";
  },
  onMousemove(evt) {
    const {
      trackPath
    } = this;
    if (!trackPath) return;
    const {
      options
    } = this;
    options.distance = this.getTrackRatioFromEvent(evt);
    this.position();
  },
  onMouseenter() {
    if (!this.canShowButton()) return;
    this.showButton();
  },
  onMouseleave() {
    this.hideButton();
  }
});

// node_modules/jointjs/src/elementTools/index.mjs
var elementTools_exports = {};
__export(elementTools_exports, {
  Boundary: () => Boundary,
  Button: () => Button,
  Connect: () => Connect,
  Control: () => Control,
  HoverConnect: () => HoverConnect2,
  Remove: () => Remove
});

// node_modules/jointjs/src/elementTools/Control.mjs
var Control = ToolView.extend({
  tagName: "g",
  children: [{
    tagName: "circle",
    selector: "handle",
    attributes: {
      "cursor": "pointer",
      "stroke-width": 2,
      "stroke": "#FFFFFF",
      "fill": "#33334F",
      "r": 6
    }
  }, {
    tagName: "rect",
    selector: "extras",
    attributes: {
      "pointer-events": "none",
      "fill": "none",
      "stroke": "#33334F",
      "stroke-dasharray": "2,4",
      "rx": 5,
      "ry": 5
    }
  }],
  events: {
    mousedown: "onPointerDown",
    touchstart: "onPointerDown",
    dblclick: "onPointerDblClick",
    dbltap: "onPointerDblClick"
  },
  documentEvents: {
    mousemove: "onPointerMove",
    touchmove: "onPointerMove",
    mouseup: "onPointerUp",
    touchend: "onPointerUp",
    touchcancel: "onPointerUp"
  },
  options: {
    handleAttributes: null,
    selector: "root",
    padding: 6,
    scale: null
  },
  getPosition: function() {
  },
  setPosition: function() {
  },
  resetPosition: function() {
  },
  onRender: function() {
    this.renderChildren();
    this.toggleExtras(false);
    this.update();
  },
  update: function() {
    const {
      handle,
      extras
    } = this.childNodes;
    if (handle) {
      this.updateHandle(handle);
    } else {
      throw new Error("Control: markup selector `handle` is required");
    }
    if (extras) {
      this.updateExtras(extras);
    }
    return this;
  },
  updateHandle: function(handleNode) {
    const {
      relatedView,
      options
    } = this;
    const {
      model
    } = relatedView;
    const relativePos = this.getPosition(relatedView, this);
    const absolutePos = model.getAbsolutePointFromRelative(relativePos);
    const {
      handleAttributes,
      scale: scale2
    } = options;
    let transformString = `translate(${absolutePos.x},${absolutePos.y})`;
    if (scale2) {
      transformString += ` scale(${scale2})`;
    }
    handleNode.setAttribute("transform", transformString);
    if (handleAttributes) {
      for (let attrName in handleAttributes) {
        handleNode.setAttribute(attrName, handleAttributes[attrName]);
      }
    }
  },
  updateExtras: function(extrasNode) {
    const {
      relatedView,
      options
    } = this;
    const {
      selector
    } = this.options;
    if (!selector) {
      this.toggleExtras(false);
      return;
    }
    const [magnet] = relatedView.findBySelector(selector);
    if (!magnet) throw new Error("Control: invalid selector.");
    let padding = options.padding;
    if (!isFinite(padding)) padding = 0;
    const bbox2 = relatedView.getNodeUnrotatedBBox(magnet);
    const model = relatedView.model;
    const angle = model.angle();
    const center2 = bbox2.center();
    if (angle) center2.rotate(model.getBBox().center(), -angle);
    bbox2.inflate(padding);
    extrasNode.setAttribute("x", -bbox2.width / 2);
    extrasNode.setAttribute("y", -bbox2.height / 2);
    extrasNode.setAttribute("width", bbox2.width);
    extrasNode.setAttribute("height", bbox2.height);
    extrasNode.setAttribute("transform", `translate(${center2.x},${center2.y}) rotate(${angle})`);
  },
  toggleExtras: function(visible) {
    const {
      extras
    } = this.childNodes;
    if (!extras) return;
    extras.style.display = visible ? "" : "none";
  },
  onPointerDown: function(evt) {
    const {
      relatedView,
      paper
    } = this;
    if (this.guard(evt)) return;
    evt.stopPropagation();
    evt.preventDefault();
    paper.undelegateEvents();
    this.delegateDocumentEvents();
    this.focus();
    this.toggleExtras(true);
    relatedView.model.startBatch("control-move", {
      ui: true,
      tool: this.cid
    });
  },
  onPointerMove: function(evt) {
    const {
      relatedView,
      paper
    } = this;
    const {
      model
    } = relatedView;
    const {
      clientX,
      clientY
    } = normalizeEvent(evt);
    const coords = paper.clientToLocalPoint(clientX, clientY);
    const relativeCoords = model.getRelativePointFromAbsolute(coords);
    this.setPosition(relatedView, relativeCoords, this);
    this.update();
  },
  onPointerUp: function(_evt) {
    const {
      relatedView,
      paper
    } = this;
    paper.delegateEvents();
    this.undelegateDocumentEvents();
    this.blur();
    this.toggleExtras(false);
    relatedView.model.stopBatch("control-move", {
      ui: true,
      tool: this.cid
    });
  },
  onPointerDblClick: function() {
    const {
      relatedView
    } = this;
    this.resetPosition(relatedView, this);
    this.update();
  }
});

// node_modules/jointjs/src/elementTools/HoverConnect.mjs
var HoverConnect2 = HoverConnect.extend({
  getTrackPath() {
    const {
      relatedView: view,
      options
    } = this;
    let {
      useModelGeometry,
      trackPath = "M 0 0 H calc(w) V calc(h) H 0 Z"
    } = options;
    if (typeof trackPath === "function") {
      trackPath = trackPath.call(this, view);
    }
    if (isCalcAttribute(trackPath)) {
      const bbox2 = getViewBBox(view, useModelGeometry);
      trackPath = evalCalcAttribute(trackPath, bbox2);
    }
    return new Path(V_default.normalizePathData(trackPath));
  },
  getTrackMatrix() {
    const {
      relatedView: view,
      options
    } = this;
    let {
      useModelGeometry,
      rotate
    } = options;
    let bbox2 = getViewBBox(view, useModelGeometry);
    const angle = view.model.angle();
    if (!rotate) bbox2 = bbox2.bbox(angle);
    let matrix = V_default.createSVGMatrix().translate(bbox2.x + bbox2.width / 2, bbox2.y + bbox2.height / 2);
    if (rotate) matrix = matrix.rotate(angle);
    matrix = matrix.translate(-bbox2.width / 2, -bbox2.height / 2);
    return matrix;
  }
});

// node_modules/jointjs/dist/version.mjs
var version = "3.7.7";

// node_modules/jointjs/src/core.mjs
var Vectorizer = V_default;
var setTheme = function(theme, opt) {
  opt = opt || {};
  invoke(views, "setTheme", theme, opt);
  View.prototype.defaultTheme = theme;
};
export {
  V_default as V,
  Vectorizer,
  anchors_exports as anchors,
  config,
  connectionPoints_exports as connectionPoints,
  connectionStrategies_exports as connectionStrategies,
  connectors_exports as connectors,
  dia_exports as dia,
  elementTools_exports as elementTools,
  env,
  g_exports as g,
  highlighters_exports as highlighters,
  layout_exports as layout,
  linkAnchors_exports as linkAnchors,
  linkTools_exports as linkTools,
  mvc_exports as mvc,
  routers_exports as routers,
  setTheme,
  shapes_exports as shapes,
  util_exports as util,
  version
};
//# sourceMappingURL=jointjs.js.map
