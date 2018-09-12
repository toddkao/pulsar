module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/BoundingBox.ts":
/*!***********************************!*\
  !*** ./src/common/BoundingBox.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoundingBox; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector */ "./src/common/Vector.ts");
/* harmony import */ var _Line__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Line */ "./src/common/Line.ts");



/*
* !WARNING!
* This class regards its point of origin at the top left corner.
* */
class BoundingBox {
    constructor(points) {
        this.points = points;
        this.findCorners();
        this.makeLines();
        this.findLimits();
    }
    get midpoints() {
        return this.limits;
    }
    get area() {
        return this.top.length * this.right.length;
    }
    get lines() {
        return [this.top, this.right, this.bottom, this.left];
    }
    get width() {
        return this.topRight.x - this.topLeft.x;
    }
    get height() {
        return this.topRight.y - this.bottomRight.y;
    }
    grow(n) {
        this.topLeft = this.topLeft.add(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]({ x: -n, y: n }));
        this.topRight = this.topRight.add(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]({ x: n, y: n }));
        this.bottomLeft = this.bottomLeft.add(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]({ x: -n, y: -n }));
        this.bottomRight = this.bottomRight.add(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]({ x: n, y: -n }));
    }
    clone() {
        return new BoundingBox(this.points);
    }
    findCorners() {
        const sortedX = Object(_util__WEBPACK_IMPORTED_MODULE_0__["immutableObjectSort"])(this.points, 'x');
        const sortedY = Object(_util__WEBPACK_IMPORTED_MODULE_0__["immutableObjectSort"])(this.points, 'y');
        const firstX = sortedX[0];
        const firstY = sortedY[0];
        const lastX = sortedX[sortedX.length - 1];
        const lastY = sortedY[sortedY.length - 1];
        this.topLeft = new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]({ x: firstX.x, y: lastY.y });
        this.topRight = new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]({ x: lastX.x, y: lastY.y });
        this.bottomRight = new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]({ x: lastX.x, y: firstY.y });
        this.bottomLeft = new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]({ x: firstX.x, y: firstY.y });
    }
    makeLines() {
        this.top = new _Line__WEBPACK_IMPORTED_MODULE_2__["default"](this.topLeft, this.topRight);
        this.right = new _Line__WEBPACK_IMPORTED_MODULE_2__["default"](this.topRight, this.bottomRight);
        this.bottom = new _Line__WEBPACK_IMPORTED_MODULE_2__["default"](this.bottomRight, this.bottomLeft);
        this.left = new _Line__WEBPACK_IMPORTED_MODULE_2__["default"](this.bottomLeft, this.topLeft);
    }
    findLimits() {
        const top = this.topLeft.midpoint(this.topRight);
        const bottom = this.bottomLeft.midpoint(this.bottomRight);
        const left = this.topLeft.midpoint(this.bottomLeft);
        const right = this.topRight.midpoint(this.bottomRight);
        this.limits = { top, bottom, left, right };
    }
}


/***/ }),

/***/ "./src/common/Clock.ts":
/*!*****************************!*\
  !*** ./src/common/Clock.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Clock; });
class Clock {
    constructor() {
        this.startTime = 0;
        this.oldTime = 0;
        this.elapsedTime = 0;
        this.running = false;
        this.timeFunction = typeof performance === 'undefined' ? Date : performance;
    }
    start() {
        this.running = true;
        this.startTime = this.timeFunction.now();
        this.oldTime = this.startTime;
        this.elapsedTime = 0;
    }
    stop() {
        this.running = false;
    }
    getDelta() {
        const newTime = this.timeFunction.now();
        const difference = (newTime - this.oldTime) / 1000;
        this.oldTime = newTime;
        this.elapsedTime += difference;
        return difference;
    }
    getElapsed() {
        return this.elapsedTime;
    }
}


/***/ }),

/***/ "./src/common/Line.ts":
/*!****************************!*\
  !*** ./src/common/Line.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Line; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");
/* harmony import */ var _triangulation_DisjoinedSet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../triangulation/DisjoinedSet */ "./src/triangulation/DisjoinedSet.ts");
/* harmony import */ var _LineIntersection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LineIntersection */ "./src/common/LineIntersection.ts");



class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.id = Object(_util__WEBPACK_IMPORTED_MODULE_0__["uniqueId"])();
    }
    get length() {
        return this.a.sub(this.b).magnitude();
    }
    get midpoint() {
        return this.a.midpoint(this.b);
    }
    clone() {
        return new Line(this.a, this.b);
    }
    equals(line) {
        const equalsNormal = this.a.equals(line.a) && this.b.equals(line.b);
        const equalsReverse = this.a.equals(line.b) && this.b.equals(line.a);
        return equalsNormal || equalsReverse;
    }
    intersects(line) {
        return new _LineIntersection__WEBPACK_IMPORTED_MODULE_2__["default"](this, line).intersects;
    }
    intersectionPoint(line) {
        return new _LineIntersection__WEBPACK_IMPORTED_MODULE_2__["default"](this, line).point;
    }
    makeDisjoinedSets() {
        this.a.set = new _triangulation_DisjoinedSet__WEBPACK_IMPORTED_MODULE_1__["default"](this.a);
        this.b.set = new _triangulation_DisjoinedSet__WEBPACK_IMPORTED_MODULE_1__["default"](this.b);
    }
    static PointsFromArray(lines) {
        return lines.reduce((accumulator, line) => {
            accumulator.push(...[line.a, line.b]);
            return accumulator;
        }, []);
    }
    static IsUnique(line, lines) {
        return (lines.find((currentLine) => {
            return line.id === currentLine.id ? false : line.equals(currentLine);
        }) === undefined);
    }
    static RemoveDuplicates(lines) {
        let clone = [...lines];
        clone.sort((a, b) => a.length - b.length);
        for (let i = clone.length - 1; i >= 1; i--) {
            const a = clone[i];
            const b = clone[i - 1];
            if (a.equals(b)) {
                clone.splice(i, 1);
            }
        }
        return clone;
    }
}


/***/ }),

/***/ "./src/common/LineIntersection.ts":
/*!****************************************!*\
  !*** ./src/common/LineIntersection.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LineIntersection; });
/* harmony import */ var _common_Matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Matrix */ "./src/common/Matrix.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");
/* harmony import */ var _common_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Vector */ "./src/common/Vector.ts");



// https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
class LineIntersection {
    constructor(line1, line2) {
        this.line1 = line1;
        this.line2 = line2;
        // points
        this.x1 = this.line1.a.x;
        this.y1 = this.line1.a.y;
        this.x2 = this.line1.b.x;
        this.y2 = this.line1.b.y;
        this.x3 = this.line2.a.x;
        this.y3 = this.line2.a.y;
        this.x4 = this.line2.b.x;
        this.y4 = this.line2.b.y;
        // shared matrices
        const e = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x1, 1, this.x2, 1);
        const f = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.y1, 1, this.y2, 1);
        const g = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x3, 1, this.x4, 1);
        const h = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.y3, 1, this.y4, 1);
        const efgh = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](e.determine(), f.determine(), g.determine(), h.determine());
        this.efghDeterminant = efgh.determine();
    }
    get intersects() {
        const areValidCoords = Object(_util__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(this.point.x) && Object(_util__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(this.point.y);
        return areValidCoords && this.isOnSegments();
    }
    get point() {
        const x = this.getX();
        const y = this.getY();
        return new _common_Vector__WEBPACK_IMPORTED_MODULE_2__["default"]({ x, y });
    }
    getX() {
        const a = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x1, this.y1, this.x2, this.y2);
        const b = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x1, 1, this.x2, 1);
        const c = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x3, this.y3, this.x4, this.y4);
        const d = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x3, 1, this.x4, 1);
        const abcd = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](a.determine(), b.determine(), c.determine(), d.determine());
        return abcd.determine() / this.efghDeterminant;
    }
    getY() {
        const a = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x1, this.y1, this.x2, this.y2);
        const b = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.y1, 1, this.y2, 1);
        const c = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x3, this.y3, this.x4, this.y4);
        const d = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.y3, 1, this.y4, 1);
        const abcd = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](a.determine(), b.determine(), c.determine(), d.determine());
        return abcd.determine() / this.efghDeterminant;
    }
    isOnSegments() {
        const a = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x1 - this.x3, this.x3 - this.x4, this.y1 - this.y3, this.y3 - this.y4);
        const b = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x1 - this.x2, this.x3 - this.x4, this.y1 - this.y2, this.y3 - this.y4);
        const c = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x1 - this.x2, this.x1 - this.x3, this.y1 - this.y2, this.y1 - this.y3);
        const d = new _common_Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix2"](this.x1 - this.x2, this.x3 - this.x4, this.y1 - this.y2, this.y3 - this.y4);
        const divisionAB = a.determine() / b.determine();
        const divisionCD = -(c.determine() / d.determine());
        const isOnSegmentA = divisionAB >= 0 && divisionAB <= 1;
        const isOnSegmentB = divisionCD >= 0 && divisionCD <= 1;
        return isOnSegmentA && isOnSegmentB;
    }
}


/***/ }),

/***/ "./src/common/Matrix.ts":
/*!******************************!*\
  !*** ./src/common/Matrix.ts ***!
  \******************************/
/*! exports provided: Matrix2, Matrix3, Matrix4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix2", function() { return Matrix2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix3", function() { return Matrix3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix4", function() { return Matrix4; });
class Matrix2 {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    determine() {
        return this.a * this.d - this.b * this.c;
    }
}
class Matrix3 extends Matrix2 {
    constructor(a, b, c, d, e, f, g, h, i) {
        super(a, b, c, d);
        this.e = e;
        this.f = f;
        this.g = g;
        this.h = h;
        this.i = i;
    }
    determine() {
        return (this.a * new Matrix2(this.e, this.f, this.h, this.i).determine() -
            this.b * new Matrix2(this.d, this.f, this.g, this.i).determine() +
            this.c * new Matrix2(this.d, this.e, this.g, this.h).determine());
    }
}
class Matrix4 extends Matrix3 {
    constructor(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        super(a, b, c, d, e, f, g, h, i);
        this.j = j;
        this.k = k;
        this.l = l;
        this.m = m;
        this.n = n;
        this.o = o;
        this.p = p;
    }
    determine() {
        return (this.a *
            new Matrix3(this.f, this.g, this.h, this.j, this.k, this.l, this.n, this.o, this.p).determine() -
            this.b *
                new Matrix3(this.e, this.g, this.h, this.i, this.k, this.l, this.m, this.o, this.p).determine() +
            this.c *
                new Matrix3(this.e, this.f, this.h, this.i, this.j, this.l, this.m, this.n, this.p).determine() -
            this.d *
                new Matrix3(this.e, this.f, this.g, this.i, this.j, this.k, this.m, this.n, this.o).determine());
    }
}



/***/ }),

/***/ "./src/common/Shape.ts":
/*!*****************************!*\
  !*** ./src/common/Shape.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Shape; });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/common/Vector.ts");
/* harmony import */ var _Line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Line */ "./src/common/Line.ts");
/* harmony import */ var _BoundingBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BoundingBox */ "./src/common/BoundingBox.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");




class Shape {
    constructor(points) {
        this.points = points;
        this.lines = Shape.makeLines(points);
        this.boundingBox = new _BoundingBox__WEBPACK_IMPORTED_MODULE_2__["default"](points);
    }
    containsPoint(point) {
        let intersects = 0;
        const checkPoint = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]({
            x: point.x,
            y: Number.MAX_SAFE_INTEGER,
        });
        const checkLine = new _Line__WEBPACK_IMPORTED_MODULE_1__["default"](point, checkPoint);
        this.lines.forEach((line) => {
            if (line.intersects(checkLine)) {
                intersects++;
            }
        });
        return Object(_util__WEBPACK_IMPORTED_MODULE_3__["isOdd"])(intersects);
    }
    get centroid() {
        return _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].FindPolyCentroid(this.points);
    }
    static makeLines(points) {
        const lines = [];
        const ccwPoints = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].ArrangePointsCCW(points);
        for (let i = 1; i < ccwPoints.length; i++) {
            const a = ccwPoints[i - 1];
            const b = ccwPoints[i];
            const ab = new _Line__WEBPACK_IMPORTED_MODULE_1__["default"](a, b);
            lines.push(ab);
        }
        const firstPoint = ccwPoints[0];
        const lastPoint = ccwPoints[ccwPoints.length - 1];
        const closingLine = new _Line__WEBPACK_IMPORTED_MODULE_1__["default"](firstPoint, lastPoint);
        lines.push(closingLine);
        return lines;
    }
}


/***/ }),

/***/ "./src/common/Triangle.ts":
/*!********************************!*\
  !*** ./src/common/Triangle.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Triangle; });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/common/Vector.ts");
/* harmony import */ var _Line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Line */ "./src/common/Line.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");
/* harmony import */ var _Matrix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Matrix */ "./src/common/Matrix.ts");




class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.id = Object(_util__WEBPACK_IMPORTED_MODULE_2__["uniqueId"])();
        const ab = new _Line__WEBPACK_IMPORTED_MODULE_1__["default"](a, b);
        const bc = new _Line__WEBPACK_IMPORTED_MODULE_1__["default"](b, c);
        const ca = new _Line__WEBPACK_IMPORTED_MODULE_1__["default"](c, a);
        this.lines = { ab, bc, ca };
    }
    get centroid() {
        return _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].FindPolyCentroid(this.points);
    }
    get points() {
        return [this.a, this.b, this.c];
    }
    get linesArray() {
        return [this.lines.ab, this.lines.bc, this.lines.ca];
    }
    equals(triangle) {
        const { ab, bc, ca } = this.lines;
        const sameAB = ab.equals(triangle.lines.ab) ||
            ab.equals(triangle.lines.bc) ||
            ab.equals(triangle.lines.ca);
        const sameBC = bc.equals(triangle.lines.ab) ||
            bc.equals(triangle.lines.bc) ||
            bc.equals(triangle.lines.ca);
        const sameCA = ca.equals(triangle.lines.ab) ||
            ca.equals(triangle.lines.bc) ||
            ca.equals(triangle.lines.ca);
        return sameAB && sameBC && sameCA;
    }
    isPointInCircumcircle(point) {
        const ax = this.a.x;
        const ay = this.a.y;
        const bx = this.b.x;
        const by = this.b.y;
        const cx = this.c.x;
        const cy = this.c.y;
        const a = ax;
        const b = ay;
        const c = ax * ax + ay * ay;
        const d = 1;
        const e = bx;
        const f = by;
        const g = bx * bx + by * by;
        const h = 1;
        const i = cx;
        const j = cy;
        const k = cx * cx + cy * cy;
        const l = 1;
        const m = point.x;
        const n = point.y;
        const o = point.x * point.x + point.y * point.y;
        const p = 1;
        const matrix = new _Matrix__WEBPACK_IMPORTED_MODULE_3__["Matrix4"](a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
        return matrix.determine() < 0;
    }
    hasPoint(point) {
        return this.a.equals(point) || this.b.equals(point) || this.c.equals(point);
    }
    hasAnyPoint(points) {
        return (points.filter((point) => {
            return this.hasPoint(point);
        }).length !== 0);
    }
    static LinesFromArray(triangles) {
        return triangles.reduce((accumulator, triangle) => {
            accumulator.push(...triangle.linesArray);
            return accumulator;
        }, []);
    }
    static GetUniqueLines(triangles) {
        const lines = Triangle.LinesFromArray(triangles);
        return lines.filter((line) => _Line__WEBPACK_IMPORTED_MODULE_1__["default"].IsUnique(line, lines));
    }
}


/***/ }),

/***/ "./src/common/Vector.ts":
/*!******************************!*\
  !*** ./src/common/Vector.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vector; });
/* harmony import */ var _util_radDeg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/radDeg */ "./src/util/radDeg.ts");

class Vector {
    constructor({ x, y } = { x: 0, y: 0 }) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new Vector({ x: this.x, y: this.y });
    }
    magnitude() {
        const x = this.x * this.x;
        const y = this.y * this.y;
        const magnitude = Math.sqrt(x + y);
        return magnitude;
    }
    dotProduct({ x, y }) {
        return this.x * x + this.y * y;
    }
    add(vector) {
        const x = this.x + vector.x;
        const y = this.y + vector.y;
        return new Vector({ x, y });
    }
    sub(vector) {
        const x = this.x + -vector.x;
        const y = this.y + -vector.y;
        return new Vector({ x, y });
    }
    multiplyScalar(scalar) {
        const x = this.x * scalar;
        const y = this.y * scalar;
        return new Vector({ x, y });
    }
    normalize() {
        const magnitude = this.magnitude();
        const x = this.x / magnitude;
        const y = this.y / magnitude;
        return new Vector({ x, y });
    }
    lerp(vector, alpha) {
        const x = this.x + (vector.x - this.x) * alpha;
        const y = this.y + (vector.y - this.y) * alpha;
        return new Vector({ x, y });
    }
    negative() {
        const x = -this.x;
        const y = -this.y;
        return new Vector({ x, y });
    }
    perpendicular() {
        const right = new Vector({ x: -this.y, y: this.x });
        const left = new Vector({ x: this.y, y: -this.x });
        return { left, right };
    }
    scale(length) {
        const normalized = this.normalize();
        const x = normalized.x * length;
        const y = normalized.y * length;
        return new Vector({ x, y });
    }
    angleDeg(vector) {
        const angle = this.angle(vector);
        return Object(_util_radDeg__WEBPACK_IMPORTED_MODULE_0__["RadToDeg"])(angle);
    }
    angleRad(vector) {
        return this.angle(vector);
    }
    bisector(vector) {
        const normalized = this.normalize();
        const normalizedVector = vector.normalize();
        const sum = normalized.add(normalizedVector);
        const magnitude = (this.magnitude() + vector.magnitude()) / 2;
        return sum.scale(magnitude);
    }
    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }
    distanceTo(vector) {
        return this.sub(vector).magnitude();
    }
    midpoint(vector) {
        const x = (this.x + vector.x) / 2;
        const y = (this.y + vector.y) / 2;
        return new Vector({ x, y });
    }
    static FindPolyCentroid(points) {
        let x = 0;
        let y = 0;
        points.forEach((point) => {
            x += point.x;
            y += point.y;
        });
        x /= points.length;
        y /= points.length;
        return new Vector({ x, y });
    }
    static ArrangePointsCCW(points) {
        const centroid = Vector.FindPolyCentroid(points);
        let clone = [...points];
        clone.sort((a, b) => {
            const angleA = Math.atan2(a.y - centroid.y, a.x - centroid.x);
            const angleB = Math.atan2(b.y - centroid.y, b.x - centroid.x);
            return angleA - angleB;
        });
        return clone;
    }
    static UniqueFromArray(points) {
        const isUnique = (vector, index, array) => {
            return (array.findIndex((vectorIndex) => {
                return vector.equals(vectorIndex);
            }) === index);
        };
        return points.filter(isUnique);
    }
    angle(vector) {
        const product = this.dotProduct(vector);
        const cosAngle = product / (this.magnitude() * vector.magnitude());
        return Math.acos(cosAngle);
    }
}


/***/ }),

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/*! exports provided: BoundingBox, Clock, Line, LineIntersection, Matrix2, Matrix3, Matrix4, Shape, Triangle, Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BoundingBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BoundingBox */ "./src/common/BoundingBox.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoundingBox", function() { return _BoundingBox__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Clock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Clock */ "./src/common/Clock.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Clock", function() { return _Clock__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Line__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Line */ "./src/common/Line.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return _Line__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _LineIntersection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LineIntersection */ "./src/common/LineIntersection.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LineIntersection", function() { return _LineIntersection__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Matrix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Matrix */ "./src/common/Matrix.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Matrix2", function() { return _Matrix__WEBPACK_IMPORTED_MODULE_4__["Matrix2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Matrix3", function() { return _Matrix__WEBPACK_IMPORTED_MODULE_4__["Matrix3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Matrix4", function() { return _Matrix__WEBPACK_IMPORTED_MODULE_4__["Matrix4"]; });

/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Shape */ "./src/common/Shape.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return _Shape__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Triangle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Triangle */ "./src/common/Triangle.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Triangle", function() { return _Triangle__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Vector */ "./src/common/Vector.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return _Vector__WEBPACK_IMPORTED_MODULE_7__["default"]; });












/***/ }),

/***/ "./src/ecs/Component.ts":
/*!******************************!*\
  !*** ./src/ecs/Component.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");

class Component {
    constructor() {
        this.id = Object(_util__WEBPACK_IMPORTED_MODULE_0__["uniqueId"])();
        this.updatePriority = null;
    }
    start() { }
    stop() { }
    update(tickData) { }
}


/***/ }),

/***/ "./src/ecs/Entity.ts":
/*!***************************!*\
  !*** ./src/ecs/Entity.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Entity; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");

class Entity {
    constructor() {
        this.id = Object(_util__WEBPACK_IMPORTED_MODULE_0__["uniqueId"])();
        this.components = [];
    }
    start() { }
    stop() { }
}


/***/ }),

/***/ "./src/ecs/Updater/EntityUpdater.ts":
/*!******************************************!*\
  !*** ./src/ecs/Updater/EntityUpdater.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EntityUpdater; });
class EntityUpdater {
    constructor(updater) {
        this.updater = updater;
        this.entities = [];
    }
    start() {
        this.entities.forEach((entity) => entity.start());
    }
    stop() {
        this.entities.forEach((entity) => entity.stop());
    }
    clear() {
        this.entities.length = 0;
    }
    add(entity) {
        entity.updater = this.updater;
        this.entities.push(entity);
        const callback = (component) => {
            component.entity = entity;
            return this.updater.addComponent(component);
        };
        return this.loopComponents(entity.components, callback);
    }
    remove({ components }) {
        const callback = component => this.updater.removeComponent(component);
        return this.loopComponents(components, callback);
    }
    toggle({ components }) {
        const callback = component => this.updater.toggleComponent(component);
        return this.loopComponents(components, callback);
    }
    loopComponents(components, callback) {
        return components.map((component) => {
            return {
                id: component.id,
                name: component.name,
                success: callback(component),
            };
        });
    }
}


/***/ }),

/***/ "./src/ecs/Updater/Invoke.ts":
/*!***********************************!*\
  !*** ./src/ecs/Updater/Invoke.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Invoke; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/ecs/Component.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/index.ts");


class Invoke extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(updater, component, timeout) {
        super();
        this.updater = updater;
        this.component = component;
        this.timeout = timeout;
        this.id = Object(_util__WEBPACK_IMPORTED_MODULE_1__["uniqueId"])();
        this.originalTimeout = timeout;
    }
    update(tickData) {
        this.timeout -= tickData.deltaTimeMS;
        if (this.timeout <= 0) {
            this.component.update(tickData);
            this.stop();
        }
    }
    stop() {
        return this.updater.remove(this);
    }
}


/***/ }),

/***/ "./src/ecs/Updater/InvokeRepeating.ts":
/*!********************************************!*\
  !*** ./src/ecs/Updater/InvokeRepeating.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvokeRepeating; });
/* harmony import */ var _Invoke__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Invoke */ "./src/ecs/Updater/Invoke.ts");

class InvokeRepeating extends _Invoke__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(updater, component, interval, times) {
        super(updater, component, interval);
        this.times = times;
        this.updated = 0;
    }
    update(tickData) {
        this.timeout -= tickData.deltaTimeMS;
        if (this.timeout <= 0) {
            if (++this.updated === this.times) {
                this.stop();
            }
            this.component.update(tickData);
            this.timeout = this.originalTimeout;
        }
    }
}


/***/ }),

/***/ "./src/ecs/Updater/Updater.ts":
/*!************************************!*\
  !*** ./src/ecs/Updater/Updater.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Updater; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "./src/common/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util/index.ts");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Component */ "./src/ecs/Component.ts");
/* harmony import */ var _EntityUpdater__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EntityUpdater */ "./src/ecs/Updater/EntityUpdater.ts");
/* harmony import */ var _Invoke__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Invoke */ "./src/ecs/Updater/Invoke.ts");
/* harmony import */ var _InvokeRepeating__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InvokeRepeating */ "./src/ecs/Updater/InvokeRepeating.ts");






class Updater {
    constructor() {
        this.onUpdateComplete = new _Component__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.components = [];
        this.running = false;
        this.clock = new _common__WEBPACK_IMPORTED_MODULE_0__["Clock"]();
        this.entityUpdater = new _EntityUpdater__WEBPACK_IMPORTED_MODULE_3__["default"](this);
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.clock.start();
            this.entityUpdater.start();
            this.components.forEach((component) => component.start());
            this.update();
            return true;
        }
        return false;
    }
    stop() {
        if (this.running) {
            this.running = false;
            cancelAnimationFrame(this.frameId);
            this.clock.stop();
            this.entityUpdater.stop();
            this.components.forEach((component) => component.stop());
            return true;
        }
        return false;
    }
    clear() {
        this.stop();
        this.entityUpdater.clear();
        this.components.length = 0;
    }
    add(behaviour) {
        if (behaviour instanceof _Component__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            return this.addComponent(behaviour);
        }
        else {
            return this.entityUpdater.add(behaviour);
        }
    }
    remove(behaviour) {
        if (behaviour instanceof _Component__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            return this.removeComponent(behaviour);
        }
        else {
            return this.entityUpdater.remove(behaviour);
        }
    }
    toggle(behaviour) {
        if (behaviour instanceof _Component__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            return this.toggleComponent(behaviour);
        }
        else {
            return this.entityUpdater.toggle(behaviour);
        }
    }
    isUpdatingComponent(component) {
        return Object(_util__WEBPACK_IMPORTED_MODULE_1__["contains"])(this.components, component);
    }
    addComponent(component) {
        if (!this.isUpdatingComponent(component)) {
            component.updater = this;
            this.pushToQueue(component);
            return true;
        }
        return false;
    }
    removeComponent(component) {
        return Object(_util__WEBPACK_IMPORTED_MODULE_1__["removeFromArray"])(this.components, component);
    }
    toggleComponent(component) {
        if (!this.addComponent(component)) {
            this.removeComponent(component);
            return false;
        }
        return true;
    }
    invoke(component, time) {
        const invoke = new _Invoke__WEBPACK_IMPORTED_MODULE_4__["default"](this, component, time);
        this.add(invoke);
    }
    invokeRepeating(component, time, times = Infinity) {
        const invoke = new _InvokeRepeating__WEBPACK_IMPORTED_MODULE_5__["default"](this, component, time, times);
        this.add(invoke);
    }
    getTickData() {
        const deltaTime = this.clock.getDelta();
        const deltaTimeMS = deltaTime * 1000;
        const elapsedTime = this.clock.getElapsed();
        return { deltaTime, deltaTimeMS, elapsedTime };
    }
    pushToQueue(component) {
        if (typeof component.updatePriority === 'number') {
            this.components.splice(component.updatePriority, 0, component);
        }
        else {
            this.components.push(component);
        }
    }
    update() {
        this.frameId = requestAnimationFrame(() => this.update());
        const tickData = this.getTickData();
        this.components.forEach((component) => {
            component.update(tickData);
        });
        this.onUpdateComplete.update(tickData);
    }
}


/***/ }),

/***/ "./src/ecs/index.ts":
/*!**************************!*\
  !*** ./src/ecs/index.ts ***!
  \**************************/
/*! exports provided: Component, Entity, Updater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/ecs/Component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _Component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Entity */ "./src/ecs/Entity.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _Entity__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Updater_Updater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Updater/Updater */ "./src/ecs/Updater/Updater.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Updater", function() { return _Updater_Updater__WEBPACK_IMPORTED_MODULE_2__["default"]; });







/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Grid, Navigator, NavigatorTile, Triangulation, Hull, Vector, Line, Triangle, Shape, BoundingBox, QuadTree, uniqueId, sort, immutableObjectSort, contains, RadToDeg, DegToRad, removeFromArray, Entity, Component, Updater, randomPoint, randomPoints, randomInt, randomFloat, randomColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pathfinding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathfinding */ "./src/pathfinding/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return _pathfinding__WEBPACK_IMPORTED_MODULE_0__["Grid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navigator", function() { return _pathfinding__WEBPACK_IMPORTED_MODULE_0__["Navigator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavigatorTile", function() { return _pathfinding__WEBPACK_IMPORTED_MODULE_0__["NavigatorTile"]; });

/* harmony import */ var _triangulation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./triangulation */ "./src/triangulation/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Triangulation", function() { return _triangulation__WEBPACK_IMPORTED_MODULE_1__["Triangulation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hull", function() { return _triangulation__WEBPACK_IMPORTED_MODULE_1__["Hull"]; });

/* harmony import */ var _quadtree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./quadtree */ "./src/quadtree/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuadTree", function() { return _quadtree__WEBPACK_IMPORTED_MODULE_2__["QuadTree"]; });

/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common */ "./src/common/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return _common__WEBPACK_IMPORTED_MODULE_3__["Vector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return _common__WEBPACK_IMPORTED_MODULE_3__["Line"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Triangle", function() { return _common__WEBPACK_IMPORTED_MODULE_3__["Triangle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return _common__WEBPACK_IMPORTED_MODULE_3__["Shape"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoundingBox", function() { return _common__WEBPACK_IMPORTED_MODULE_3__["BoundingBox"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./src/util/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uniqueId", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["uniqueId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sort", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["sort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "immutableObjectSort", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["immutableObjectSort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["contains"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadToDeg", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["RadToDeg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DegToRad", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["DegToRad"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeFromArray", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["removeFromArray"]; });

/* harmony import */ var _ecs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ecs */ "./src/ecs/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _ecs__WEBPACK_IMPORTED_MODULE_5__["Entity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _ecs__WEBPACK_IMPORTED_MODULE_5__["Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Updater", function() { return _ecs__WEBPACK_IMPORTED_MODULE_5__["Updater"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomPoint", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["randomPoint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomPoints", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["randomPoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomInt", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["randomInt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomFloat", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["randomFloat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomColor", function() { return _util__WEBPACK_IMPORTED_MODULE_4__["randomColor"]; });











/***/ }),

/***/ "./src/pathfinding/Grid.ts":
/*!*********************************!*\
  !*** ./src/pathfinding/Grid.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Grid; });
/* harmony import */ var _Obstacles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Obstacles */ "./src/pathfinding/Obstacles.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");
/* harmony import */ var _NavigatorTile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavigatorTile */ "./src/pathfinding/NavigatorTile.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common */ "./src/common/index.ts");




const defaultSize = { width: 10, height: 10 };
class Grid {
    constructor(size = defaultSize) {
        this.size = size;
        this.onTileCreate = () => { };
        this.obstacles = new _Obstacles__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        this.tiles = [];
        this.rows = [];
    }
    /** Returns a random tile, can be an obstacle or not. */
    randomTile() {
        const x = Object(_util__WEBPACK_IMPORTED_MODULE_1__["randomInt"])(0, this.size.width - 1);
        const y = Object(_util__WEBPACK_IMPORTED_MODULE_1__["randomInt"])(0, this.size.height - 1);
        return this.findTile({ x, y });
    }
    /** Returns a random non-obstacle tile, if it exists. */
    randomFreeTile() {
        return this.obstacles.getRandomOpen();
    }
    /** Returns a tile at the specified coordinates. */
    findTile({ x, y }) {
        const row = this.rows[y];
        return row && row.length > x ? row[x] : null;
    }
    makeGrid() {
        for (let y = 0; y < this.size.height; y++) {
            const row = [];
            for (let x = 0; x < this.size.width; x++) {
                const pos = new _common__WEBPACK_IMPORTED_MODULE_3__["Vector"]({ x, y });
                const tile = new _NavigatorTile__WEBPACK_IMPORTED_MODULE_2__["default"](pos);
                this.onTileCreate(tile);
                this.tiles.push(tile);
                row.push(tile);
            }
            this.rows.push(row);
        }
    }
}


/***/ }),

/***/ "./src/pathfinding/Navigator.ts":
/*!**************************************!*\
  !*** ./src/pathfinding/Navigator.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navigator; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");

class Navigator {
    constructor({ grid, begin, end, onExplore, onComplete, maxSteps, }) {
        this.id = Object(_util__WEBPACK_IMPORTED_MODULE_0__["uniqueId"])();
        this._path = [];
        this.verticalCost = 1;
        this.diagonalCost = 1.4;
        this.tiles = [];
        this.open = [];
        this.closed = [];
        this.registeredTiles = [];
        this.steps = 0;
        this.grid = grid;
        this.begin = begin;
        this.end = end;
        this.onExplore = onExplore || (() => { });
        this.onComplete = onComplete || (() => { });
        this.maxSteps = maxSteps !== undefined ? maxSteps : Infinity;
    }
    get path() {
        return this._path;
    }
    /** Begin the pathfinding process. Does not start if destination is an obstacle. */
    start() {
        if (this.end.isObstacle) {
            return false;
        }
        this.closed.push(this.begin);
        const beginNavData = this.begin.getNavigatorData(this);
        this.addToExplored(this.begin);
        beginNavData.gVal = 0;
        this.calculateG(this.begin);
        return true;
    }
    deregisterNavigatorData() {
        this.registeredTiles.forEach((tile) => tile.deregisterNavigatorData(this));
    }
    calculateH(tile) {
        const colVal = Math.abs(tile.position.x - this.end.position.x);
        const rowVal = Math.abs(tile.position.y - this.end.position.y);
        return colVal + rowVal;
    }
    calculateG(tile) {
        const tileNavData = tile.getNavigatorData(this);
        this.addToExplored(tile);
        if (++this.steps === this.maxSteps) {
            this.done([]);
            return;
        }
        for (let i = 0; i < Navigator.neighborsCount; i++) {
            const x = tile.position.x + Navigator.getColOffset(i);
            const y = tile.position.y + Navigator.getRowOffset(i);
            const exploring = this.grid.findTile({ x, y });
            if (!exploring) {
                continue;
            }
            const exploringNavData = exploring.getNavigatorData(this);
            this.addToExplored(exploring);
            if (exploring.isObstacle) {
                continue;
            }
            if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["contains"])(this.closed, exploring)) {
                continue;
            }
            if (tile.id === exploring.id) {
                this.closed.push(exploring);
            }
            else {
                if (!this.getParent(tile, exploring, tileNavData, exploringNavData)) {
                    continue;
                }
                if (!Object(_util__WEBPACK_IMPORTED_MODULE_0__["contains"])(this.open, exploring)) {
                    this.open.push(exploring);
                }
                if (tile.isDiagonal(exploring)) {
                    exploringNavData.gVal = tileNavData.gVal + this.diagonalCost;
                }
                else {
                    exploringNavData.gVal = tileNavData.gVal + this.verticalCost;
                }
            }
            exploringNavData.fVal = this.calculateF(exploring, exploringNavData);
        }
        const next = this.chooseNext();
        if (next) {
            this.onExplore(next);
            this.calculateG(next);
        }
        else {
            const path = this.getPath();
            this.done(path);
        }
    }
    done(path) {
        this.deregisterNavigatorData();
        this.onComplete(path);
    }
    calculateF(tile, data) {
        const hVal = this.calculateH(tile);
        return data.gVal + hVal;
    }
    static getRowOffset(iteration) {
        /*
           iteration = 0, 1, or 2: [-1][-1][-1]
           iteration = 3, 4, or 5: [ 0][ 0][ 0]
           iteration = 6, 7, or 8: [+1][+1][+1]
         */
        return Navigator.neighborsCount + -Math.floor((32 - iteration) / 3);
    }
    static getColOffset(iteration) {
        /*
           iteration = 0, 1, or 2: [-1][ 0][+1]
           iteration = 3, 4, or 5: [-1][ 0][+1]
           iteration = 6, 7, or 8: [-1][ 0][+1]
         */
        return (iteration % 3) - 1;
    }
    getParent(tile, checkTile, tileNavData, checkNavData) {
        if (!checkNavData.parent) {
            checkNavData.parent = tile;
            return tile;
        }
        const moveCost = tile.isDiagonal(checkTile)
            ? this.diagonalCost
            : this.verticalCost;
        if (tileNavData.gVal + moveCost < checkNavData.gVal) {
            checkNavData.parent = tile;
            return tile;
        }
        return null;
    }
    chooseNext() {
        this.open.sort((a, b) => {
            const aNavData = a.getNavigatorData(this);
            const bNavData = b.getNavigatorData(this);
            return aNavData.fVal - bNavData.fVal;
        });
        const next = this.open[0];
        if (!next) {
            return null;
        }
        this.open.shift();
        this.closed.push(next);
        if (next.id === this.end.id) {
            return null;
        }
        return next;
    }
    getPath() {
        this._path = [];
        let current = this.end;
        while (current.id !== this.begin.id) {
            const currentNavData = current.getNavigatorData(this);
            this._path.push(current);
            if (currentNavData.parent) {
                current = currentNavData.parent;
            }
            else {
                return [];
            }
        }
        this._path.reverse();
        return this._path;
    }
    addToExplored(tile) {
        if (!Object(_util__WEBPACK_IMPORTED_MODULE_0__["contains"])(this.registeredTiles, tile)) {
            this.registeredTiles.push(tile);
        }
    }
}
Navigator.neighborsCount = 9;


/***/ }),

/***/ "./src/pathfinding/NavigatorData.ts":
/*!******************************************!*\
  !*** ./src/pathfinding/NavigatorData.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavigatorData; });
class NavigatorData {
    constructor(navigator) {
        this.navigator = navigator;
        this.id = navigator.id;
    }
}


/***/ }),

/***/ "./src/pathfinding/NavigatorTile.ts":
/*!******************************************!*\
  !*** ./src/pathfinding/NavigatorTile.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavigatorTile; });
/* harmony import */ var _NavigatorData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NavigatorData */ "./src/pathfinding/NavigatorData.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");


class NavigatorTile {
    constructor(position) {
        this.position = position;
        this.id = Object(_util__WEBPACK_IMPORTED_MODULE_1__["uniqueId"])();
        this.isObstacle = false;
        this.navigators = [];
    }
    registerNavigatorData(navigator) {
        const navigationData = new _NavigatorData__WEBPACK_IMPORTED_MODULE_0__["default"](navigator);
        if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["contains"])(this.navigators, navigationData)) {
            return false;
        }
        this.navigators.push(navigationData);
        return true;
    }
    deregisterNavigatorData(navigator) {
        const navData = this.getNavigatorData(navigator);
        return Object(_util__WEBPACK_IMPORTED_MODULE_1__["removeFromArray"])(this.navigators, navData);
    }
    getNavigatorData(navigator) {
        const index = Object(_util__WEBPACK_IMPORTED_MODULE_1__["findIndex"])(this.navigators, navigator);
        if (index !== -1) {
            return this.navigators[index];
        }
        const data = new _NavigatorData__WEBPACK_IMPORTED_MODULE_0__["default"](navigator);
        this.navigators.push(data);
        return data;
    }
    isDiagonal({ position }) {
        return this.position.x !== position.x && this.position.y !== position.y;
    }
}


/***/ }),

/***/ "./src/pathfinding/Obstacles.ts":
/*!**************************************!*\
  !*** ./src/pathfinding/Obstacles.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Obstacles; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");

class Obstacles {
    constructor(grid) {
        this.grid = grid;
        this.openList = [];
        this.closedList = [];
        this.openList = grid.tiles;
    }
    get list() {
        return this.closedList;
    }
    add(tile) {
        tile.isObstacle = true;
        return this.manipulate(true, tile);
    }
    remove(tile) {
        tile.isObstacle = false;
        return this.manipulate(false, tile);
    }
    addRandom(count = 1) {
        return this.manipulateMultipleRandom(true, count);
    }
    removeRandom(count = 1) {
        return this.manipulateMultipleRandom(false, count);
    }
    getRandomOpen() {
        return this.getRandom(true);
    }
    getRandom(open) {
        const list = open ? this.openList : this.closedList;
        const random = Object(_util__WEBPACK_IMPORTED_MODULE_0__["randomInt"])(0, list.length - 1);
        const tile = list[random];
        return tile ? tile : null;
    }
    manipulateMultipleRandom(add, count) {
        const tiles = [];
        if (count > 0) {
            for (let i = 0; i < count; i++) {
                const tile = this.manipulateSingleRandom(add);
                tiles.push(tile);
            }
            return count === 1 ? tiles[0] : tiles;
        }
        return null;
    }
    manipulateSingleRandom(add) {
        const tile = this.getRandom(add);
        if (tile) {
            this.manipulate(add, tile);
            return tile;
        }
        return null;
    }
    manipulate(add, tile) {
        const isInvalid = add ? tile.isObstacle : !tile.isObstacle;
        if (isInvalid) {
            return false;
        }
        let list;
        let otherList;
        if (add) {
            list = this.openList;
            otherList = this.closedList;
        }
        else {
            list = this.closedList;
            otherList = this.openList;
        }
        if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["contains"])(list, tile)) {
            tile.isObstacle = add;
            const index = Object(_util__WEBPACK_IMPORTED_MODULE_0__["findIndex"])(list, tile);
            list.splice(index, 1);
            otherList.push(tile);
            return true;
        }
        return false;
    }
}


/***/ }),

/***/ "./src/pathfinding/index.ts":
/*!**********************************!*\
  !*** ./src/pathfinding/index.ts ***!
  \**********************************/
/*! exports provided: Grid, Navigator, NavigatorData, NavigatorTile, Obstacles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grid */ "./src/pathfinding/Grid.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return _Grid__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Navigator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navigator */ "./src/pathfinding/Navigator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navigator", function() { return _Navigator__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _NavigatorData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavigatorData */ "./src/pathfinding/NavigatorData.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavigatorData", function() { return _NavigatorData__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _NavigatorTile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NavigatorTile */ "./src/pathfinding/NavigatorTile.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavigatorTile", function() { return _NavigatorTile__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Obstacles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Obstacles */ "./src/pathfinding/Obstacles.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Obstacles", function() { return _Obstacles__WEBPACK_IMPORTED_MODULE_4__["default"]; });









/***/ }),

/***/ "./src/quadtree/QuadTree.ts":
/*!**********************************!*\
  !*** ./src/quadtree/QuadTree.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuadTree; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "./src/common/index.ts");

class QuadTree {
    constructor(shape, points) {
        this.shape = shape;
        this.points = points;
        this.children = [];
        this.containedPoints = [];
        this.capacity = 1;
        this.start(points);
    }
    start(points) {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if (!this.shape.containsPoint(point))
                continue;
            if (this.containedPoints.length < this.capacity) {
                point.quadTree = this;
                this.containedPoints.push(point);
            }
            else {
                this.containedPoints.length = 0;
                this.divide(points);
                break;
            }
        }
    }
    findChildThatContains(point) {
        const contains = this.shape.containsPoint(point);
        const hasChildren = this.children.length > 0;
        if (contains) {
            if (hasChildren) {
                return this.children.find((child) => {
                    return child.findChildThatContains(point) !== null;
                });
            }
            else {
                return this;
            }
        }
        return null;
    }
    divide(points) {
        const { topLeft, topRight, bottomLeft, bottomRight, } = this.shape.boundingBox;
        const { top, bottom, left, right } = this.shape.boundingBox.midpoints;
        const centroid = _common__WEBPACK_IMPORTED_MODULE_0__["Vector"].FindPolyCentroid([
            top,
            bottom,
            left,
            right,
        ]);
        const shape1 = new _common__WEBPACK_IMPORTED_MODULE_0__["Shape"]([topLeft, top, centroid, left]);
        const quad1 = new QuadTree(shape1, points);
        const shape2 = new _common__WEBPACK_IMPORTED_MODULE_0__["Shape"]([top, topRight, right, centroid]);
        const quad2 = new QuadTree(shape2, points);
        const shape3 = new _common__WEBPACK_IMPORTED_MODULE_0__["Shape"]([centroid, right, bottomRight, bottom]);
        const quad3 = new QuadTree(shape3, points);
        const shape4 = new _common__WEBPACK_IMPORTED_MODULE_0__["Shape"]([centroid, bottom, bottomLeft, left]);
        const quad4 = new QuadTree(shape4, points);
        this.children.push(quad1, quad2, quad3, quad4);
        this.children.forEach((child) => {
            child.parent = this;
        });
    }
}


/***/ }),

/***/ "./src/quadtree/index.ts":
/*!*******************************!*\
  !*** ./src/quadtree/index.ts ***!
  \*******************************/
/*! exports provided: QuadTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QuadTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuadTree */ "./src/quadtree/QuadTree.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuadTree", function() { return _QuadTree__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/triangulation/DisjoinedSet.ts":
/*!*******************************************!*\
  !*** ./src/triangulation/DisjoinedSet.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DisjoinedSet; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util/index.ts");

class DisjoinedSet {
    constructor(point) {
        this.id = Object(_util__WEBPACK_IMPORTED_MODULE_0__["uniqueId"])();
        this.points = [point];
    }
    equals({ id }) {
        return this.id === id;
    }
    merge({ points }) {
        points.forEach((point) => {
            point.set = this;
            this.points.push(point);
        });
        return this;
    }
}


/***/ }),

/***/ "./src/triangulation/Hull.ts":
/*!***********************************!*\
  !*** ./src/triangulation/Hull.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Hull; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "./src/common/index.ts");

class Hull {
    constructor({ triangles }) {
        this.lines = [];
        this.triangles = triangles;
    }
    get points() {
        return this._points;
    }
    start() {
        const uniqueLines = _common__WEBPACK_IMPORTED_MODULE_0__["Triangle"].GetUniqueLines(this.triangles);
        const uniquePoints = _common__WEBPACK_IMPORTED_MODULE_0__["Line"].PointsFromArray(uniqueLines);
        const ccwPoints = _common__WEBPACK_IMPORTED_MODULE_0__["Vector"].ArrangePointsCCW(uniquePoints);
        this._points = _common__WEBPACK_IMPORTED_MODULE_0__["Vector"].UniqueFromArray(ccwPoints);
        for (let i = 1; i < this._points.length; i++) {
            const line = new _common__WEBPACK_IMPORTED_MODULE_0__["Line"](this._points[i - 1], this._points[i]);
            this.lines.push(line);
        }
        const closingLine = new _common__WEBPACK_IMPORTED_MODULE_0__["Line"](this._points[this._points.length - 1], this._points[0]);
        this.lines.push(closingLine);
    }
}


/***/ }),

/***/ "./src/triangulation/MinimumSpanningTree.ts":
/*!**************************************************!*\
  !*** ./src/triangulation/MinimumSpanningTree.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MinimumSpanningTree; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "./src/common/index.ts");

class MinimumSpanningTree {
    constructor({ lines }) {
        this.lines = [];
        this._nonMinSpanLines = [];
        this.uniqueLines = [];
        this.triangulationLines = [];
        this.triangulationLines = lines;
    }
    get nonMinSpanLines() {
        return this._nonMinSpanLines;
    }
    start() {
        this.getLines();
        this.uniqueLines.forEach((line) => line.makeDisjoinedSets());
        this.uniqueLines.forEach((line, i) => {
            if (!line.a.set.equals(line.b.set)) {
                line.b.set = line.a.set.merge(line.b.set);
                this.lines.push(line);
                this._nonMinSpanLines[i] = null;
            }
        });
        this._nonMinSpanLines = this._nonMinSpanLines.filter((line) => line);
    }
    getLines() {
        let lines = _common__WEBPACK_IMPORTED_MODULE_0__["Line"].RemoveDuplicates(this.triangulationLines);
        this.uniqueLines = [...lines];
        this._nonMinSpanLines = [...lines];
    }
}


/***/ }),

/***/ "./src/triangulation/Triangulation.ts":
/*!********************************************!*\
  !*** ./src/triangulation/Triangulation.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Triangulation; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "./src/common/index.ts");
/* harmony import */ var _Hull__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hull */ "./src/triangulation/Hull.ts");
/* harmony import */ var _MinimumSpanningTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MinimumSpanningTree */ "./src/triangulation/MinimumSpanningTree.ts");



class Triangulation {
    constructor(points) {
        this.points = points;
        this.lines = [];
        this.triangles = [];
        this.holderTriangle = Triangulation.MakeHolderTriangle();
        this.triangles.push(this.holderTriangle);
        this.hull = new _Hull__WEBPACK_IMPORTED_MODULE_1__["default"](this);
        this.MST = new _MinimumSpanningTree__WEBPACK_IMPORTED_MODULE_2__["default"](this);
    }
    start() {
        this.points.forEach((point) => {
            const badTriangles = [];
            for (let i = this.triangles.length - 1; i >= 0; i--) {
                const triangle = this.triangles[i];
                if (triangle.isPointInCircumcircle(point)) {
                    this.triangles.splice(i, 1);
                    badTriangles.push(triangle);
                }
            }
            const uniqueLines = _common__WEBPACK_IMPORTED_MODULE_0__["Triangle"].GetUniqueLines(badTriangles);
            uniqueLines.forEach((line) => {
                const triangle = new _common__WEBPACK_IMPORTED_MODULE_0__["Triangle"](point, line.a, line.b);
                this.triangles.push(triangle);
            });
        });
        this.cleanHolderTriangle();
        this.addFinishedTriangulationLines();
    }
    static MakeHolderTriangle() {
        const side = Number.MAX_SAFE_INTEGER;
        const a = new _common__WEBPACK_IMPORTED_MODULE_0__["Vector"]({ x: side / 2, y: -side });
        const b = new _common__WEBPACK_IMPORTED_MODULE_0__["Vector"]({ x: -side, y: side });
        const c = new _common__WEBPACK_IMPORTED_MODULE_0__["Vector"]({ x: side, y: side });
        return new _common__WEBPACK_IMPORTED_MODULE_0__["Triangle"](a, b, c);
    }
    cleanHolderTriangle() {
        const { a, b, c } = this.holderTriangle;
        for (let i = this.triangles.length - 1; i >= 0; i--) {
            const triangle = this.triangles[i];
            if (triangle.hasAnyPoint([a, b, c])) {
                this.triangles.splice(i, 1);
            }
        }
    }
    addFinishedTriangulationLines() {
        this.triangles.forEach((triangle) => {
            this.lines.push(...triangle.linesArray);
        });
    }
}


/***/ }),

/***/ "./src/triangulation/index.ts":
/*!************************************!*\
  !*** ./src/triangulation/index.ts ***!
  \************************************/
/*! exports provided: DisjoinedSet, Hull, MinimumSpanningTree, Triangulation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DisjoinedSet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DisjoinedSet */ "./src/triangulation/DisjoinedSet.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DisjoinedSet", function() { return _DisjoinedSet__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Hull__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hull */ "./src/triangulation/Hull.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hull", function() { return _Hull__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _MinimumSpanningTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MinimumSpanningTree */ "./src/triangulation/MinimumSpanningTree.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MinimumSpanningTree", function() { return _MinimumSpanningTree__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Triangulation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Triangulation */ "./src/triangulation/Triangulation.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Triangulation", function() { return _Triangulation__WEBPACK_IMPORTED_MODULE_3__["default"]; });








/***/ }),

/***/ "./src/util/clone.ts":
/*!***************************!*\
  !*** ./src/util/clone.ts ***!
  \***************************/
/*! exports provided: cloneObject, cloneObjectArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneObject", function() { return cloneObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneObjectArray", function() { return cloneObjectArray; });
const cloneObject = (object) => (Object.assign({}, object));
const cloneObjectArray = (array) => array.map(cloneObject);



/***/ }),

/***/ "./src/util/id.ts":
/*!************************!*\
  !*** ./src/util/id.ts ***!
  \************************/
/*! exports provided: contains, findIndex, removeFromArray, removeFromArrayAtIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return contains; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFromArray", function() { return removeFromArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFromArrayAtIndex", function() { return removeFromArrayAtIndex; });
const contains = (array, element) => {
    return findIndex(array, element) !== -1;
};
const findIndex = (array, find) => {
    return array.findIndex((element) => element.id === find.id);
};
const removeFromArray = (array, find) => {
    const index = findIndex(array, find);
    return removeFromArrayAtIndex(array, index);
};
const removeFromArrayAtIndex = (array, index) => {
    if (index >= 0 && index < array.length) {
        array.splice(index, 1);
        return true;
    }
    return false;
};



/***/ }),

/***/ "./src/util/index.ts":
/*!***************************!*\
  !*** ./src/util/index.ts ***!
  \***************************/
/*! exports provided: cloneObject, cloneObjectArray, contains, findIndex, removeFromArray, RadToDeg, DegToRad, isOdd, isEven, isNumeric, randomInt, randomFloat, randomColor, sort, immutableObjectSort, toFloat, uniqueId, randomPoint, randomPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clone */ "./src/util/clone.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneObject", function() { return _clone__WEBPACK_IMPORTED_MODULE_0__["cloneObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneObjectArray", function() { return _clone__WEBPACK_IMPORTED_MODULE_0__["cloneObjectArray"]; });

/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id */ "./src/util/id.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return _id__WEBPACK_IMPORTED_MODULE_1__["contains"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return _id__WEBPACK_IMPORTED_MODULE_1__["findIndex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeFromArray", function() { return _id__WEBPACK_IMPORTED_MODULE_1__["removeFromArray"]; });

/* harmony import */ var _radDeg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./radDeg */ "./src/util/radDeg.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadToDeg", function() { return _radDeg__WEBPACK_IMPORTED_MODULE_2__["RadToDeg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DegToRad", function() { return _radDeg__WEBPACK_IMPORTED_MODULE_2__["DegToRad"]; });

/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./number */ "./src/util/number.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isOdd", function() { return _number__WEBPACK_IMPORTED_MODULE_3__["isOdd"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEven", function() { return _number__WEBPACK_IMPORTED_MODULE_3__["isEven"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNumeric", function() { return _number__WEBPACK_IMPORTED_MODULE_3__["isNumeric"]; });

/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./random */ "./src/util/random.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomInt", function() { return _random__WEBPACK_IMPORTED_MODULE_4__["randomInt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomFloat", function() { return _random__WEBPACK_IMPORTED_MODULE_4__["randomFloat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomColor", function() { return _random__WEBPACK_IMPORTED_MODULE_4__["randomColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomPoint", function() { return _random__WEBPACK_IMPORTED_MODULE_4__["randomPoint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomPoints", function() { return _random__WEBPACK_IMPORTED_MODULE_4__["randomPoints"]; });

/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sort */ "./src/util/sort.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sort", function() { return _sort__WEBPACK_IMPORTED_MODULE_5__["sort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "immutableObjectSort", function() { return _sort__WEBPACK_IMPORTED_MODULE_5__["immutableObjectSort"]; });

/* harmony import */ var _toFloat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./toFloat */ "./src/util/toFloat.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toFloat", function() { return _toFloat__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _uniqueID__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./uniqueID */ "./src/util/uniqueID.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uniqueId", function() { return _uniqueID__WEBPACK_IMPORTED_MODULE_7__["default"]; });












/***/ }),

/***/ "./src/util/number.ts":
/*!****************************!*\
  !*** ./src/util/number.ts ***!
  \****************************/
/*! exports provided: isOdd, isEven, isNumeric */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOdd", function() { return isOdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEven", function() { return isEven; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumeric", function() { return isNumeric; });
const isOdd = (n) => Math.abs(n % 2) === 1;
const isEven = (n) => n % 2 === 0;
const isNumeric = (n) => {
    return !isNaN(parseFloat(n.toString())) && isFinite(n);
};



/***/ }),

/***/ "./src/util/radDeg.ts":
/*!****************************!*\
  !*** ./src/util/radDeg.ts ***!
  \****************************/
/*! exports provided: RadToDeg, DegToRad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadToDeg", function() { return RadToDeg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DegToRad", function() { return DegToRad; });
const RadToDeg = (rad) => rad * (180 / Math.PI);
const DegToRad = (deg) => deg * (Math.PI / 180);



/***/ }),

/***/ "./src/util/random.ts":
/*!****************************!*\
  !*** ./src/util/random.ts ***!
  \****************************/
/*! exports provided: randomInt, randomFloat, randomColor, randomPoint, randomPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInt", function() { return randomInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomFloat", function() { return randomFloat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomColor", function() { return randomColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomPoint", function() { return randomPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomPoints", function() { return randomPoints; });
/* harmony import */ var _common_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Vector */ "./src/common/Vector.ts");

const randomInt = (min, max) => {
    return Math.round(randomFloat(min, max));
};
const randomFloat = (min, max) => {
    return Math.random() * (max - min) + min;
};
const randomColor = () => {
    const r = randomInt(0, 255);
    const g = randomInt(0, 255);
    const b = randomInt(0, 255);
    return `rgb(${r},${g},${b})`;
};
const randomPoint = ({ topLeft, topRight, bottomLeft, }) => {
    const x = randomInt(topLeft.x, topRight.x);
    const y = randomInt(bottomLeft.y, topLeft.y);
    return new _common_Vector__WEBPACK_IMPORTED_MODULE_0__["default"]({ x, y });
};
const randomPoints = (count, box) => {
    const points = [];
    for (let i = 0; i < count; i++) {
        points.push(randomPoint(box));
    }
    return points;
};



/***/ }),

/***/ "./src/util/sort.ts":
/*!**************************!*\
  !*** ./src/util/sort.ts ***!
  \**************************/
/*! exports provided: sort, immutableObjectSort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sort", function() { return sort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "immutableObjectSort", function() { return immutableObjectSort; });
/* harmony import */ var _clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clone */ "./src/util/clone.ts");

const sort = (array, prop) => {
    return array.sort((a, b) => a[prop] - b[prop]);
};
const immutableObjectSort = (array, prop) => {
    const clone = Object(_clone__WEBPACK_IMPORTED_MODULE_0__["cloneObjectArray"])(array);
    return sort(clone, prop);
};



/***/ }),

/***/ "./src/util/toFloat.ts":
/*!*****************************!*\
  !*** ./src/util/toFloat.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const floatPrecision = 2;
const toFloat = (number) => {
    return Number(number.toFixed(floatPrecision));
};
/* harmony default export */ __webpack_exports__["default"] = (toFloat);


/***/ }),

/***/ "./src/util/uniqueID.ts":
/*!******************************!*\
  !*** ./src/util/uniqueID.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let id = 0;
const uniqueId = () => id++;
/* harmony default export */ __webpack_exports__["default"] = (uniqueId);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2NvbW1vbi9Cb3VuZGluZ0JveC50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvY29tbW9uL0Nsb2NrLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9jb21tb24vTGluZS50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvY29tbW9uL0xpbmVJbnRlcnNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2NvbW1vbi9NYXRyaXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2NvbW1vbi9TaGFwZS50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvY29tbW9uL1RyaWFuZ2xlLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9jb21tb24vVmVjdG9yLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9jb21tb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2Vjcy9Db21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2Vjcy9FbnRpdHkudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2Vjcy9VcGRhdGVyL0VudGl0eVVwZGF0ZXIudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2Vjcy9VcGRhdGVyL0ludm9rZS50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvZWNzL1VwZGF0ZXIvSW52b2tlUmVwZWF0aW5nLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9lY3MvVXBkYXRlci9VcGRhdGVyLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9lY3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9wYXRoZmluZGluZy9HcmlkLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9wYXRoZmluZGluZy9OYXZpZ2F0b3IudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3BhdGhmaW5kaW5nL05hdmlnYXRvckRhdGEudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3BhdGhmaW5kaW5nL05hdmlnYXRvclRpbGUudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3BhdGhmaW5kaW5nL09ic3RhY2xlcy50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvcGF0aGZpbmRpbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3F1YWR0cmVlL1F1YWRUcmVlLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9xdWFkdHJlZS9pbmRleC50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvdHJpYW5ndWxhdGlvbi9EaXNqb2luZWRTZXQudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3RyaWFuZ3VsYXRpb24vSHVsbC50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvdHJpYW5ndWxhdGlvbi9NaW5pbXVtU3Bhbm5pbmdUcmVlLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy90cmlhbmd1bGF0aW9uL1RyaWFuZ3VsYXRpb24udHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3RyaWFuZ3VsYXRpb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvY2xvbmUudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvaWQudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvbnVtYmVyLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy91dGlsL3JhZERlZy50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvdXRpbC9yYW5kb20udHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvc29ydC50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvdXRpbC90b0Zsb2F0LnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy91dGlsL3VuaXF1ZUlELnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QyxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLCtDQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLCtDQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLCtDQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLCtDQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVPLFNBQVM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksNkNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksNkNBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksNkNBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksNkNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU8sVUFBVTtRQUNoQixNQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMs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QUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpCLGtCQUFrQjtRQUNsQixNQUFNLENBQUMsR0FBWSxJQUFJLHNEQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsR0FBWSxJQUFJLHNEQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsR0FBWSxJQUFJLHNEQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsR0FBWSxJQUFJLHNEQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLElBQUksR0FBWSxJQUFJLHNEQUFPLENBQy9CLENBQUMsQ0FBQyxTQUFTLEVB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QVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sTUFBTSxHQUNWLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUM1QixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFL0IsT0FBTyxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBRUQscUJBQXFCLENBQUMsS0FBYTtRQUNqQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQixNQUFNLENBQUMsR0FBVyxFQUFFLENBQUM7UUFDckIsTUFBTSxDQUFDLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxHQUFXLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNwQyxNQUFNLENBQUMsR0FBVyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQVcsRUFBRSxDQUFDO1FB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RUFBRTtJQUNoRSxNQUFNLEtBQUssR0FBVSwrREFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDO0FBRW1DOzs7Ozs7Ozs7Ozs7O0FDWHJDO0FBQUEsTUFBTSxjQUFjLEdBQVcsQ0FBQyxDQUFDO0FBRWpDLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBYyxFQUFVLEVBQUU7SUFDekMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQztBQUVhLHNFQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNOdkI7QUFBQSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFFWCxNQUFNLFFBQVEsR0FBRyxHQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUVyQix1RUFBUSxFQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBsaW1pdHMgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGltbXV0YWJsZU9iamVjdFNvcnQgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xuaW1wb3J0IExpbmUgZnJvbSAnLi9MaW5lJztcblxuLypcbiogIVdBUk5JTkchXG4qIFRoaXMgY2xhc3MgcmVnYXJkcyBpdHMgcG9pbnQgb2Ygb3JpZ2luIGF0IHRoZSB0b3AgbGVmdCBjb3JuZXIuXG4qICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdW5kaW5nQm94IHtcbiAgLy8gcG9pbnRzXG4gIHRvcExlZnQ6IFZlY3RvcjtcbiAgdG9wUmlnaHQ6IFZlY3RvcjtcbiAgYm90dG9tUmlnaHQ6IFZlY3RvcjtcbiAgYm90dG9tTGVmdDogVmVjdG9yO1xuXG4gIC8vIGxpbmVzXG4gIHByaXZhdGUgdG9wOiBMaW5lO1xuICBwcml2YXRlIHJpZ2h0OiBMaW5lO1xuICBwcml2YXRlIGJvdHRvbTogTGluZTtcbiAgcHJpdmF0ZSBsZWZ0OiBMaW5lO1xuXG4gIGxpbWl0czogbGltaXRzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcG9pbnRzOiBWZWN0b3JbXSkge1xuICAgIHRoaXMuZmluZENvcm5lcnMoKTtcbiAgICB0aGlzLm1ha2VMaW5lcygpO1xuICAgIHRoaXMuZmluZExpbWl0cygpO1xuICB9XG5cbiAgZ2V0IG1pZHBvaW50cygpOiBsaW1pdHMge1xuICAgIHJldHVybiB0aGlzLmxpbWl0cztcbiAgfVxuXG4gIGdldCBhcmVhKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudG9wLmxlbmd0aCAqIHRoaXMucmlnaHQubGVuZ3RoO1xuICB9XG5cbiAgZ2V0IGxpbmVzKCk6IExpbmVbXSB7XG4gICAgcmV0dXJuIFt0aGlzLnRvcCwgdGhpcy5yaWdodCwgdGhpcy5ib3R0b20sIHRoaXMubGVmdF07XG4gIH1cblxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b3BSaWdodC54IC0gdGhpcy50b3BMZWZ0Lng7XG4gIH1cblxuICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudG9wUmlnaHQueSAtIHRoaXMuYm90dG9tUmlnaHQueTtcbiAgfVxuXG4gIGdyb3cobjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50b3BMZWZ0ID0gdGhpcy50b3BMZWZ0LmFkZChuZXcgVmVjdG9yKHsgeDogLW4sIHk6IG4gfSkpO1xuICAgIHRoaXMudG9wUmlnaHQgPSB0aGlzLnRvcFJpZ2h0LmFkZChuZXcgVmVjdG9yKHsgeDogbiwgeTogbiB9KSk7XG4gICAgdGhpcy5ib3R0b21MZWZ0ID0gdGhpcy5ib3R0b21MZWZ0LmFkZChuZXcgVmVjdG9yKHsgeDogLW4sIHk6IC1uIH0pKTtcbiAgICB0aGlzLmJvdHRvbVJpZ2h0ID0gdGhpcy5ib3R0b21SaWdodC5hZGQobmV3IFZlY3Rvcih7IHg6IG4sIHk6IC1uIH0pKTtcbiAgfVxuXG4gIGNsb25lKCk6IEJvdW5kaW5nQm94IHtcbiAgICByZXR1cm4gbmV3IEJvdW5kaW5nQm94KHRoaXMucG9pbnRzKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZENvcm5lcnMoKTogdm9pZCB7XG4gICAgY29uc3Qgc29ydGVkWDogVmVjdG9yW10gPSBpbW11dGFibGVPYmplY3RTb3J0KHRoaXMucG9pbnRzLCAneCcpO1xuICAgIGNvbnN0IHNvcnRlZFk6IFZlY3RvcltdID0gaW1tdXRhYmxlT2JqZWN0U29ydCh0aGlzLnBvaW50cywgJ3knKTtcblxuICAgIGNvbnN0IGZpcnN0WCA9IHNvcnRlZFhbMF07XG4gICAgY29uc3QgZmlyc3RZID0gc29ydGVkWVswXTtcbiAgICBjb25zdCBsYXN0WCA9IHNvcnRlZFhbc29ydGVkWC5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBsYXN0WSA9IHNvcnRlZFlbc29ydGVkWS5sZW5ndGggLSAxXTtcblxuICAgIHRoaXMudG9wTGVmdCA9IG5ldyBWZWN0b3IoeyB4OiBmaXJzdFgueCwgeTogbGFzdFkueSB9KTtcbiAgICB0aGlzLnRvcFJpZ2h0ID0gbmV3IFZlY3Rvcih7IHg6IGxhc3RYLngsIHk6IGxhc3RZLnkgfSk7XG4gICAgdGhpcy5ib3R0b21SaWdodCA9IG5ldyBWZWN0b3IoeyB4OiBsYXN0WC54LCB5OiBmaXJzdFkueSB9KTtcbiAgICB0aGlzLmJvdHRvbUxlZnQgPSBuZXcgVmVjdG9yKHsgeDogZmlyc3RYLngsIHk6IGZpcnN0WS55IH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlTGluZXMoKTogdm9pZCB7XG4gICAgdGhpcy50b3AgPSBuZXcgTGluZSh0aGlzLnRvcExlZnQsIHRoaXMudG9wUmlnaHQpO1xuICAgIHRoaXMucmlnaHQgPSBuZXcgTGluZSh0aGlzLnRvcFJpZ2h0LCB0aGlzLmJvdHRvbVJpZ2h0KTtcbiAgICB0aGlzLmJvdHRvbSA9IG5ldyBMaW5lKHRoaXMuYm90dG9tUmlnaHQsIHRoaXMuYm90dG9tTGVmdCk7XG4gICAgdGhpcy5sZWZ0ID0gbmV3IExpbmUodGhpcy5ib3R0b21MZWZ0LCB0aGlzLnRvcExlZnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kTGltaXRzKCk6IHZvaWQge1xuICAgIGNvbnN0IHRvcDogVmVjdG9yID0gdGhpcy50b3BMZWZ0Lm1pZHBvaW50KHRoaXMudG9wUmlnaHQpO1xuICAgIGNvbnN0IGJvdHRvbTogVmVjdG9yID0gdGhpcy5ib3R0b21MZWZ0Lm1pZHBvaW50KHRoaXMuYm90dG9tUmlnaHQpO1xuICAgIGNvbnN0IGxlZnQ6IFZlY3RvciA9IHRoaXMudG9wTGVmdC5taWRwb2ludCh0aGlzLmJvdHRvbUxlZnQpO1xuICAgIGNvbnN0IHJpZ2h0OiBWZWN0b3IgPSB0aGlzLnRvcFJpZ2h0Lm1pZHBvaW50KHRoaXMuYm90dG9tUmlnaHQpO1xuICAgIHRoaXMubGltaXRzID0geyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQgfTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xvY2sge1xuICBwcml2YXRlIHN0YXJ0VGltZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBvbGRUaW1lOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGVsYXBzZWRUaW1lOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHJ1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSByZWFkb25seSB0aW1lRnVuY3Rpb246IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRpbWVGdW5jdGlvbiA9IHR5cGVvZiBwZXJmb3JtYW5jZSA9PT0gJ3VuZGVmaW5lZCcgPyBEYXRlIDogcGVyZm9ybWFuY2U7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy50aW1lRnVuY3Rpb24ubm93KCk7XG4gICAgdGhpcy5vbGRUaW1lID0gdGhpcy5zdGFydFRpbWU7XG4gICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XG4gIH1cblxuICBzdG9wKCk6IHZvaWQge1xuICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0RGVsdGEoKTogbnVtYmVyIHtcbiAgICBjb25zdCBuZXdUaW1lOiBudW1iZXIgPSB0aGlzLnRpbWVGdW5jdGlvbi5ub3coKTtcbiAgICBjb25zdCBkaWZmZXJlbmNlOiBudW1iZXIgPSAobmV3VGltZSAtIHRoaXMub2xkVGltZSkgLyAxMDAwO1xuICAgIHRoaXMub2xkVGltZSA9IG5ld1RpbWU7XG4gICAgdGhpcy5lbGFwc2VkVGltZSArPSBkaWZmZXJlbmNlO1xuXG4gICAgcmV0dXJuIGRpZmZlcmVuY2U7XG4gIH1cblxuICBnZXRFbGFwc2VkKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxhcHNlZFRpbWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IGlkIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB1bmlxdWVJZCB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IERpc2pvaW5lZFNldCBmcm9tICcuLi90cmlhbmd1bGF0aW9uL0Rpc2pvaW5lZFNldCc7XG5pbXBvcnQgTGluZUludGVyc2VjdGlvbiBmcm9tICcuL0xpbmVJbnRlcnNlY3Rpb24nO1xuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmUgaW1wbGVtZW50cyBpZCB7XG4gIGlkOiBudW1iZXIgPSB1bmlxdWVJZCgpO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSBhOiBWZWN0b3IsIHJlYWRvbmx5IGI6IFZlY3Rvcikge31cblxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYS5zdWIodGhpcy5iKS5tYWduaXR1ZGUoKTtcbiAgfVxuXG4gIGdldCBtaWRwb2ludCgpOiBWZWN0b3Ige1xuICAgIHJldHVybiB0aGlzLmEubWlkcG9pbnQodGhpcy5iKTtcbiAgfVxuXG4gIGNsb25lKCk6IExpbmUge1xuICAgIHJldHVybiBuZXcgTGluZSh0aGlzLmEsIHRoaXMuYik7XG4gIH1cblxuICBlcXVhbHMobGluZTogTGluZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVxdWFsc05vcm1hbDogYm9vbGVhbiA9XG4gICAgICB0aGlzLmEuZXF1YWxzKGxpbmUuYSkgJiYgdGhpcy5iLmVxdWFscyhsaW5lLmIpO1xuICAgIGNvbnN0IGVxdWFsc1JldmVyc2U6IGJvb2xlYW4gPVxuICAgICAgdGhpcy5hLmVxdWFscyhsaW5lLmIpICYmIHRoaXMuYi5lcXVhbHMobGluZS5hKTtcbiAgICByZXR1cm4gZXF1YWxzTm9ybWFsIHx8IGVxdWFsc1JldmVyc2U7XG4gIH1cblxuICBpbnRlcnNlY3RzKGxpbmU6IExpbmUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbmV3IExpbmVJbnRlcnNlY3Rpb24odGhpcywgbGluZSkuaW50ZXJzZWN0cztcbiAgfVxuXG4gIGludGVyc2VjdGlvblBvaW50KGxpbmU6IExpbmUpOiBWZWN0b3Ige1xuICAgIHJldHVybiBuZXcgTGluZUludGVyc2VjdGlvbih0aGlzLCBsaW5lKS5wb2ludDtcbiAgfVxuXG4gIG1ha2VEaXNqb2luZWRTZXRzKCk6IHZvaWQge1xuICAgIHRoaXMuYS5zZXQgPSBuZXcgRGlzam9pbmVkU2V0KHRoaXMuYSk7XG4gICAgdGhpcy5iLnNldCA9IG5ldyBEaXNqb2luZWRTZXQodGhpcy5iKTtcbiAgfVxuXG4gIHN0YXRpYyBQb2ludHNGcm9tQXJyYXkobGluZXM6IExpbmVbXSk6IFZlY3RvcltdIHtcbiAgICByZXR1cm4gbGluZXMucmVkdWNlKChhY2N1bXVsYXRvcjogVmVjdG9yW10sIGxpbmU6IExpbmUpID0+IHtcbiAgICAgIGFjY3VtdWxhdG9yLnB1c2goLi4uW2xpbmUuYSwgbGluZS5iXSk7XG4gICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgc3RhdGljIElzVW5pcXVlKGxpbmU6IExpbmUsIGxpbmVzOiBMaW5lW10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgbGluZXMuZmluZCgoY3VycmVudExpbmU6IExpbmUpID0+IHtcbiAgICAgICAgcmV0dXJuIGxpbmUuaWQgPT09IGN1cnJlbnRMaW5lLmlkID8gZmFsc2UgOiBsaW5lLmVxdWFscyhjdXJyZW50TGluZSk7XG4gICAgICB9KSA9PT0gdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBSZW1vdmVEdXBsaWNhdGVzKGxpbmVzOiBMaW5lW10pOiBMaW5lW10ge1xuICAgIGxldCBjbG9uZTogTGluZVtdID0gWy4uLmxpbmVzXTtcblxuICAgIGNsb25lLnNvcnQoKGE6IExpbmUsIGI6IExpbmUpID0+IGEubGVuZ3RoIC0gYi5sZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgaSA9IGNsb25lLmxlbmd0aCAtIDE7IGkgPj0gMTsgaS0tKSB7XG4gICAgICBjb25zdCBhID0gY2xvbmVbaV07XG4gICAgICBjb25zdCBiID0gY2xvbmVbaSAtIDFdO1xuXG4gICAgICBpZiAoYS5lcXVhbHMoYikpIHtcbiAgICAgICAgY2xvbmUuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbG9uZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTWF0cml4MiB9IGZyb20gJy4uL2NvbW1vbi9NYXRyaXgnO1xuaW1wb3J0IHsgaXNOdW1lcmljIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgTGluZSBmcm9tICcuL0xpbmUnO1xuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9jb21tb24vVmVjdG9yJztcblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGluZSVFMiU4MCU5M2xpbmVfaW50ZXJzZWN0aW9uXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVJbnRlcnNlY3Rpb24ge1xuICBwcml2YXRlIHJlYWRvbmx5IHgxOiBudW1iZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgeTE6IG51bWJlcjtcbiAgcHJpdmF0ZSByZWFkb25seSB4MjogbnVtYmVyO1xuICBwcml2YXRlIHJlYWRvbmx5IHkyOiBudW1iZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgeDM6IG51bWJlcjtcbiAgcHJpdmF0ZSByZWFkb25seSB5MzogbnVtYmVyO1xuICBwcml2YXRlIHJlYWRvbmx5IHg0OiBudW1iZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgeTQ6IG51bWJlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBlZmdoRGV0ZXJtaW5hbnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxpbmUxOiBMaW5lLCBwcml2YXRlIGxpbmUyOiBMaW5lKSB7XG4gICAgLy8gcG9pbnRzXG4gICAgdGhpcy54MSA9IHRoaXMubGluZTEuYS54O1xuICAgIHRoaXMueTEgPSB0aGlzLmxpbmUxLmEueTtcbiAgICB0aGlzLngyID0gdGhpcy5saW5lMS5iLng7XG4gICAgdGhpcy55MiA9IHRoaXMubGluZTEuYi55O1xuICAgIHRoaXMueDMgPSB0aGlzLmxpbmUyLmEueDtcbiAgICB0aGlzLnkzID0gdGhpcy5saW5lMi5hLnk7XG4gICAgdGhpcy54NCA9IHRoaXMubGluZTIuYi54O1xuICAgIHRoaXMueTQgPSB0aGlzLmxpbmUyLmIueTtcblxuICAgIC8vIHNoYXJlZCBtYXRyaWNlc1xuICAgIGNvbnN0IGU6IE1hdHJpeDIgPSBuZXcgTWF0cml4Mih0aGlzLngxLCAxLCB0aGlzLngyLCAxKTtcbiAgICBjb25zdCBmOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIodGhpcy55MSwgMSwgdGhpcy55MiwgMSk7XG4gICAgY29uc3QgZzogTWF0cml4MiA9IG5ldyBNYXRyaXgyKHRoaXMueDMsIDEsIHRoaXMueDQsIDEpO1xuICAgIGNvbnN0IGg6IE1hdHJpeDIgPSBuZXcgTWF0cml4Mih0aGlzLnkzLCAxLCB0aGlzLnk0LCAxKTtcbiAgICBjb25zdCBlZmdoOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIoXG4gICAgICBlLmRldGVybWluZSgpLFxuICAgICAgZi5kZXRlcm1pbmUoKSxcbiAgICAgIGcuZGV0ZXJtaW5lKCksXG4gICAgICBoLmRldGVybWluZSgpXG4gICAgKTtcbiAgICB0aGlzLmVmZ2hEZXRlcm1pbmFudCA9IGVmZ2guZGV0ZXJtaW5lKCk7XG4gIH1cblxuICBnZXQgaW50ZXJzZWN0cygpOiBib29sZWFuIHtcbiAgICBjb25zdCBhcmVWYWxpZENvb3JkczogYm9vbGVhbiA9XG4gICAgICBpc051bWVyaWModGhpcy5wb2ludC54KSAmJiBpc051bWVyaWModGhpcy5wb2ludC55KTtcbiAgICByZXR1cm4gYXJlVmFsaWRDb29yZHMgJiYgdGhpcy5pc09uU2VnbWVudHMoKTtcbiAgfVxuXG4gIGdldCBwb2ludCgpOiBWZWN0b3Ige1xuICAgIGNvbnN0IHggPSB0aGlzLmdldFgoKTtcbiAgICBjb25zdCB5ID0gdGhpcy5nZXRZKCk7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoeyB4LCB5IH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRYKCk6IG51bWJlciB7XG4gICAgY29uc3QgYTogTWF0cml4MiA9IG5ldyBNYXRyaXgyKHRoaXMueDEsIHRoaXMueTEsIHRoaXMueDIsIHRoaXMueTIpO1xuICAgIGNvbnN0IGI6IE1hdHJpeDIgPSBuZXcgTWF0cml4Mih0aGlzLngxLCAxLCB0aGlzLngyLCAxKTtcbiAgICBjb25zdCBjOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIodGhpcy54MywgdGhpcy55MywgdGhpcy54NCwgdGhpcy55NCk7XG4gICAgY29uc3QgZDogTWF0cml4MiA9IG5ldyBNYXRyaXgyKHRoaXMueDMsIDEsIHRoaXMueDQsIDEpO1xuICAgIGNvbnN0IGFiY2Q6IE1hdHJpeDIgPSBuZXcgTWF0cml4MihcbiAgICAgIGEuZGV0ZXJtaW5lKCksXG4gICAgICBiLmRldGVybWluZSgpLFxuICAgICAgYy5kZXRlcm1pbmUoKSxcbiAgICAgIGQuZGV0ZXJtaW5lKClcbiAgICApO1xuXG4gICAgcmV0dXJuIGFiY2QuZGV0ZXJtaW5lKCkgLyB0aGlzLmVmZ2hEZXRlcm1pbmFudDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0WSgpOiBudW1iZXIge1xuICAgIGNvbnN0IGE6IE1hdHJpeDIgPSBuZXcgTWF0cml4Mih0aGlzLngxLCB0aGlzLnkxLCB0aGlzLngyLCB0aGlzLnkyKTtcbiAgICBjb25zdCBiOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIodGhpcy55MSwgMSwgdGhpcy55MiwgMSk7XG4gICAgY29uc3QgYzogTWF0cml4MiA9IG5ldyBNYXRyaXgyKHRoaXMueDMsIHRoaXMueTMsIHRoaXMueDQsIHRoaXMueTQpO1xuICAgIGNvbnN0IGQ6IE1hdHJpeDIgPSBuZXcgTWF0cml4Mih0aGlzLnkzLCAxLCB0aGlzLnk0LCAxKTtcbiAgICBjb25zdCBhYmNkOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIoXG4gICAgICBhLmRldGVybWluZSgpLFxuICAgICAgYi5kZXRlcm1pbmUoKSxcbiAgICAgIGMuZGV0ZXJtaW5lKCksXG4gICAgICBkLmRldGVybWluZSgpXG4gICAgKTtcblxuICAgIHJldHVybiBhYmNkLmRldGVybWluZSgpIC8gdGhpcy5lZmdoRGV0ZXJtaW5hbnQ7XG4gIH1cblxuICBwcml2YXRlIGlzT25TZWdtZW50cygpOiBib29sZWFuIHtcbiAgICBjb25zdCBhOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIoXG4gICAgICB0aGlzLngxIC0gdGhpcy54MyxcbiAgICAgIHRoaXMueDMgLSB0aGlzLng0LFxuICAgICAgdGhpcy55MSAtIHRoaXMueTMsXG4gICAgICB0aGlzLnkzIC0gdGhpcy55NFxuICAgICk7XG4gICAgY29uc3QgYjogTWF0cml4MiA9IG5ldyBNYXRyaXgyKFxuICAgICAgdGhpcy54MSAtIHRoaXMueDIsXG4gICAgICB0aGlzLngzIC0gdGhpcy54NCxcbiAgICAgIHRoaXMueTEgLSB0aGlzLnkyLFxuICAgICAgdGhpcy55MyAtIHRoaXMueTRcbiAgICApO1xuICAgIGNvbnN0IGM6IE1hdHJpeDIgPSBuZXcgTWF0cml4MihcbiAgICAgIHRoaXMueDEgLSB0aGlzLngyLFxuICAgICAgdGhpcy54MSAtIHRoaXMueDMsXG4gICAgICB0aGlzLnkxIC0gdGhpcy55MixcbiAgICAgIHRoaXMueTEgLSB0aGlzLnkzXG4gICAgKTtcbiAgICBjb25zdCBkOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIoXG4gICAgICB0aGlzLngxIC0gdGhpcy54MixcbiAgICAgIHRoaXMueDMgLSB0aGlzLng0LFxuICAgICAgdGhpcy55MSAtIHRoaXMueTIsXG4gICAgICB0aGlzLnkzIC0gdGhpcy55NFxuICAgICk7XG5cbiAgICBjb25zdCBkaXZpc2lvbkFCOiBudW1iZXIgPSBhLmRldGVybWluZSgpIC8gYi5kZXRlcm1pbmUoKTtcbiAgICBjb25zdCBkaXZpc2lvbkNEOiBudW1iZXIgPSAtKGMuZGV0ZXJtaW5lKCkgLyBkLmRldGVybWluZSgpKTtcblxuICAgIGNvbnN0IGlzT25TZWdtZW50QTogYm9vbGVhbiA9IGRpdmlzaW9uQUIgPj0gMCAmJiBkaXZpc2lvbkFCIDw9IDE7XG4gICAgY29uc3QgaXNPblNlZ21lbnRCOiBib29sZWFuID0gZGl2aXNpb25DRCA+PSAwICYmIGRpdmlzaW9uQ0QgPD0gMTtcblxuICAgIHJldHVybiBpc09uU2VnbWVudEEgJiYgaXNPblNlZ21lbnRCO1xuICB9XG59XG4iLCJjbGFzcyBNYXRyaXgyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgYTogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGI6IG51bWJlcixcbiAgICByZWFkb25seSBjOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgZDogbnVtYmVyXG4gICkge31cblxuICBkZXRlcm1pbmUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hICogdGhpcy5kIC0gdGhpcy5iICogdGhpcy5jO1xuICB9XG59XG5cbmNsYXNzIE1hdHJpeDMgZXh0ZW5kcyBNYXRyaXgyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgYTogbnVtYmVyLFxuICAgIGI6IG51bWJlcixcbiAgICBjOiBudW1iZXIsXG4gICAgZDogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGU6IG51bWJlcixcbiAgICByZWFkb25seSBmOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgZzogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGg6IG51bWJlcixcbiAgICByZWFkb25seSBpOiBudW1iZXJcbiAgKSB7XG4gICAgc3VwZXIoYSwgYiwgYywgZCk7XG4gIH1cblxuICBkZXRlcm1pbmUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5hICogbmV3IE1hdHJpeDIodGhpcy5lLCB0aGlzLmYsIHRoaXMuaCwgdGhpcy5pKS5kZXRlcm1pbmUoKSAtXG4gICAgICB0aGlzLmIgKiBuZXcgTWF0cml4Mih0aGlzLmQsIHRoaXMuZiwgdGhpcy5nLCB0aGlzLmkpLmRldGVybWluZSgpICtcbiAgICAgIHRoaXMuYyAqIG5ldyBNYXRyaXgyKHRoaXMuZCwgdGhpcy5lLCB0aGlzLmcsIHRoaXMuaCkuZGV0ZXJtaW5lKClcbiAgICApO1xuICB9XG59XG5cbmNsYXNzIE1hdHJpeDQgZXh0ZW5kcyBNYXRyaXgzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgYTogbnVtYmVyLFxuICAgIGI6IG51bWJlcixcbiAgICBjOiBudW1iZXIsXG4gICAgZDogbnVtYmVyLFxuICAgIGU6IG51bWJlcixcbiAgICBmOiBudW1iZXIsXG4gICAgZzogbnVtYmVyLFxuICAgIGg6IG51bWJlcixcbiAgICBpOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgajogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGs6IG51bWJlcixcbiAgICByZWFkb25seSBsOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgbTogbnVtYmVyLFxuICAgIHJlYWRvbmx5IG46IG51bWJlcixcbiAgICByZWFkb25seSBvOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgcDogbnVtYmVyXG4gICkge1xuICAgIHN1cGVyKGEsIGIsIGMsIGQsIGUsIGYsIGcsIGgsIGkpO1xuICB9XG5cbiAgZGV0ZXJtaW5lKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYSAqXG4gICAgICAgIG5ldyBNYXRyaXgzKFxuICAgICAgICAgIHRoaXMuZixcbiAgICAgICAgICB0aGlzLmcsXG4gICAgICAgICAgdGhpcy5oLFxuICAgICAgICAgIHRoaXMuaixcbiAgICAgICAgICB0aGlzLmssXG4gICAgICAgICAgdGhpcy5sLFxuICAgICAgICAgIHRoaXMubixcbiAgICAgICAgICB0aGlzLm8sXG4gICAgICAgICAgdGhpcy5wXG4gICAgICAgICkuZGV0ZXJtaW5lKCkgLVxuICAgICAgdGhpcy5iICpcbiAgICAgICAgbmV3IE1hdHJpeDMoXG4gICAgICAgICAgdGhpcy5lLFxuICAgICAgICAgIHRoaXMuZyxcbiAgICAgICAgICB0aGlzLmgsXG4gICAgICAgICAgdGhpcy5pLFxuICAgICAgICAgIHRoaXMuayxcbiAgICAgICAgICB0aGlzLmwsXG4gICAgICAgICAgdGhpcy5tLFxuICAgICAgICAgIHRoaXMubyxcbiAgICAgICAgICB0aGlzLnBcbiAgICAgICAgKS5kZXRlcm1pbmUoKSArXG4gICAgICB0aGlzLmMgKlxuICAgICAgICBuZXcgTWF0cml4MyhcbiAgICAgICAgICB0aGlzLmUsXG4gICAgICAgICAgdGhpcy5mLFxuICAgICAgICAgIHRoaXMuaCxcbiAgICAgICAgICB0aGlzLmksXG4gICAgICAgICAgdGhpcy5qLFxuICAgICAgICAgIHRoaXMubCxcbiAgICAgICAgICB0aGlzLm0sXG4gICAgICAgICAgdGhpcy5uLFxuICAgICAgICAgIHRoaXMucFxuICAgICAgICApLmRldGVybWluZSgpIC1cbiAgICAgIHRoaXMuZCAqXG4gICAgICAgIG5ldyBNYXRyaXgzKFxuICAgICAgICAgIHRoaXMuZSxcbiAgICAgICAgICB0aGlzLmYsXG4gICAgICAgICAgdGhpcy5nLFxuICAgICAgICAgIHRoaXMuaSxcbiAgICAgICAgICB0aGlzLmosXG4gICAgICAgICAgdGhpcy5rLFxuICAgICAgICAgIHRoaXMubSxcbiAgICAgICAgICB0aGlzLm4sXG4gICAgICAgICAgdGhpcy5vXG4gICAgICAgICkuZGV0ZXJtaW5lKClcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7IE1hdHJpeDIsIE1hdHJpeDMsIE1hdHJpeDQgfTtcbiIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xuaW1wb3J0IExpbmUgZnJvbSAnLi9MaW5lJztcbmltcG9ydCBCb3VuZGluZ0JveCBmcm9tICcuL0JvdW5kaW5nQm94JztcbmltcG9ydCB7IGlzT2RkIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIHtcbiAgcmVhZG9ubHkgbGluZXM6IExpbmVbXTtcbiAgcmVhZG9ubHkgYm91bmRpbmdCb3g6IEJvdW5kaW5nQm94O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBwb2ludHM6IFZlY3RvcltdKSB7XG4gICAgdGhpcy5saW5lcyA9IFNoYXBlLm1ha2VMaW5lcyhwb2ludHMpO1xuICAgIHRoaXMuYm91bmRpbmdCb3ggPSBuZXcgQm91bmRpbmdCb3gocG9pbnRzKTtcbiAgfVxuXG4gIGNvbnRhaW5zUG9pbnQocG9pbnQ6IFZlY3Rvcik6IGJvb2xlYW4ge1xuICAgIGxldCBpbnRlcnNlY3RzOiBudW1iZXIgPSAwO1xuICAgIGNvbnN0IGNoZWNrUG9pbnQ6IFZlY3RvciA9IG5ldyBWZWN0b3Ioe1xuICAgICAgeDogcG9pbnQueCxcbiAgICAgIHk6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLFxuICAgIH0pO1xuICAgIGNvbnN0IGNoZWNrTGluZTogTGluZSA9IG5ldyBMaW5lKHBvaW50LCBjaGVja1BvaW50KTtcblxuICAgIHRoaXMubGluZXMuZm9yRWFjaCgobGluZTogTGluZSkgPT4ge1xuICAgICAgaWYgKGxpbmUuaW50ZXJzZWN0cyhjaGVja0xpbmUpKSB7XG4gICAgICAgIGludGVyc2VjdHMrKztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBpc09kZChpbnRlcnNlY3RzKTtcbiAgfVxuXG4gIGdldCBjZW50cm9pZCgpOiBWZWN0b3Ige1xuICAgIHJldHVybiBWZWN0b3IuRmluZFBvbHlDZW50cm9pZCh0aGlzLnBvaW50cyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBtYWtlTGluZXMocG9pbnRzOiBWZWN0b3JbXSk6IExpbmVbXSB7XG4gICAgY29uc3QgbGluZXM6IExpbmVbXSA9IFtdO1xuICAgIGNvbnN0IGNjd1BvaW50czogVmVjdG9yW10gPSBWZWN0b3IuQXJyYW5nZVBvaW50c0NDVyhwb2ludHMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjY3dQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGE6IFZlY3RvciA9IGNjd1BvaW50c1tpIC0gMV07XG4gICAgICBjb25zdCBiOiBWZWN0b3IgPSBjY3dQb2ludHNbaV07XG4gICAgICBjb25zdCBhYjogTGluZSA9IG5ldyBMaW5lKGEsIGIpO1xuICAgICAgbGluZXMucHVzaChhYik7XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RQb2ludDogVmVjdG9yID0gY2N3UG9pbnRzWzBdO1xuICAgIGNvbnN0IGxhc3RQb2ludDogVmVjdG9yID0gY2N3UG9pbnRzW2Njd1BvaW50cy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBjbG9zaW5nTGluZTogTGluZSA9IG5ldyBMaW5lKGZpcnN0UG9pbnQsIGxhc3RQb2ludCk7XG5cbiAgICBsaW5lcy5wdXNoKGNsb3NpbmdMaW5lKTtcblxuICAgIHJldHVybiBsaW5lcztcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XG5pbXBvcnQgTGluZSBmcm9tICcuL0xpbmUnO1xuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IHVuaXF1ZUlkIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgeyBNYXRyaXg0IH0gZnJvbSAnLi9NYXRyaXgnO1xuXG50eXBlIHRyaWFuZ2xlTGluZXMgPSB7IGFiOiBMaW5lOyBiYzogTGluZTsgY2E6IExpbmUgfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJpYW5nbGUgaW1wbGVtZW50cyBpZCB7XG4gIGlkOiBudW1iZXIgPSB1bmlxdWVJZCgpO1xuICByZWFkb25seSBsaW5lczogdHJpYW5nbGVMaW5lcztcblxuICBjb25zdHJ1Y3RvcihyZWFkb25seSBhOiBWZWN0b3IsIHJlYWRvbmx5IGI6IFZlY3RvciwgcmVhZG9ubHkgYzogVmVjdG9yKSB7XG4gICAgY29uc3QgYWI6IExpbmUgPSBuZXcgTGluZShhLCBiKTtcbiAgICBjb25zdCBiYzogTGluZSA9IG5ldyBMaW5lKGIsIGMpO1xuICAgIGNvbnN0IGNhOiBMaW5lID0gbmV3IExpbmUoYywgYSk7XG5cbiAgICB0aGlzLmxpbmVzID0geyBhYiwgYmMsIGNhIH07XG4gIH1cblxuICBnZXQgY2VudHJvaWQoKTogVmVjdG9yIHtcbiAgICByZXR1cm4gVmVjdG9yLkZpbmRQb2x5Q2VudHJvaWQodGhpcy5wb2ludHMpO1xuICB9XG5cbiAgZ2V0IHBvaW50cygpOiBWZWN0b3JbXSB7XG4gICAgcmV0dXJuIFt0aGlzLmEsIHRoaXMuYiwgdGhpcy5jXTtcbiAgfVxuXG4gIGdldCBsaW5lc0FycmF5KCk6IExpbmVbXSB7XG4gICAgcmV0dXJuIFt0aGlzLmxpbmVzLmFiLCB0aGlzLmxpbmVzLmJjLCB0aGlzLmxpbmVzLmNhXTtcbiAgfVxuXG4gIGVxdWFscyh0cmlhbmdsZTogVHJpYW5nbGUpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IGFiLCBiYywgY2EgfSA9IHRoaXMubGluZXM7XG4gICAgY29uc3Qgc2FtZUFCOiBib29sZWFuID1cbiAgICAgIGFiLmVxdWFscyh0cmlhbmdsZS5saW5lcy5hYikgfHxcbiAgICAgIGFiLmVxdWFscyh0cmlhbmdsZS5saW5lcy5iYykgfHxcbiAgICAgIGFiLmVxdWFscyh0cmlhbmdsZS5saW5lcy5jYSk7XG4gICAgY29uc3Qgc2FtZUJDOiBib29sZWFuID1cbiAgICAgIGJjLmVxdWFscyh0cmlhbmdsZS5saW5lcy5hYikgfHxcbiAgICAgIGJjLmVxdWFscyh0cmlhbmdsZS5saW5lcy5iYykgfHxcbiAgICAgIGJjLmVxdWFscyh0cmlhbmdsZS5saW5lcy5jYSk7XG4gICAgY29uc3Qgc2FtZUNBOiBib29sZWFuID1cbiAgICAgIGNhLmVxdWFscyh0cmlhbmdsZS5saW5lcy5hYikgfHxcbiAgICAgIGNhLmVxdWFscyh0cmlhbmdsZS5saW5lcy5iYykgfHxcbiAgICAgIGNhLmVxdWFscyh0cmlhbmdsZS5saW5lcy5jYSk7XG5cbiAgICByZXR1cm4gc2FtZUFCICYmIHNhbWVCQyAmJiBzYW1lQ0E7XG4gIH1cblxuICBpc1BvaW50SW5DaXJjdW1jaXJjbGUocG9pbnQ6IFZlY3Rvcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGF4ID0gdGhpcy5hLng7XG4gICAgY29uc3QgYXkgPSB0aGlzLmEueTtcbiAgICBjb25zdCBieCA9IHRoaXMuYi54O1xuICAgIGNvbnN0IGJ5ID0gdGhpcy5iLnk7XG4gICAgY29uc3QgY3ggPSB0aGlzLmMueDtcbiAgICBjb25zdCBjeSA9IHRoaXMuYy55O1xuXG4gICAgY29uc3QgYTogbnVtYmVyID0gYXg7XG4gICAgY29uc3QgYjogbnVtYmVyID0gYXk7XG4gICAgY29uc3QgYzogbnVtYmVyID0gYXggKiBheCArIGF5ICogYXk7XG4gICAgY29uc3QgZDogbnVtYmVyID0gMTtcbiAgICBjb25zdCBlOiBudW1iZXIgPSBieDtcbiAgICBjb25zdCBmOiBudW1iZXIgPSBieTtcbiAgICBjb25zdCBnOiBudW1iZXIgPSBieCAqIGJ4ICsgYnkgKiBieTtcbiAgICBjb25zdCBoOiBudW1iZXIgPSAxO1xuICAgIGNvbnN0IGk6IG51bWJlciA9IGN4O1xuICAgIGNvbnN0IGo6IG51bWJlciA9IGN5O1xuICAgIGNvbnN0IGs6IG51bWJlciA9IGN4ICogY3ggKyBjeSAqIGN5O1xuICAgIGNvbnN0IGw6IG51bWJlciA9IDE7XG4gICAgY29uc3QgbTogbnVtYmVyID0gcG9pbnQueDtcbiAgICBjb25zdCBuOiBudW1iZXIgPSBwb2ludC55O1xuICAgIGNvbnN0IG86IG51bWJlciA9IHBvaW50LnggKiBwb2ludC54ICsgcG9pbnQueSAqIHBvaW50Lnk7XG4gICAgY29uc3QgcDogbnVtYmVyID0gMTtcblxuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4NCA9IG5ldyBNYXRyaXg0KFxuICAgICAgYSxcbiAgICAgIGIsXG4gICAgICBjLFxuICAgICAgZCxcbiAgICAgIGUsXG4gICAgICBmLFxuICAgICAgZyxcbiAgICAgIGgsXG4gICAgICBpLFxuICAgICAgaixcbiAgICAgIGssXG4gICAgICBsLFxuICAgICAgbSxcbiAgICAgIG4sXG4gICAgICBvLFxuICAgICAgcFxuICAgICk7XG4gICAgcmV0dXJuIG1hdHJpeC5kZXRlcm1pbmUoKSA8IDA7XG4gIH1cblxuICBoYXNQb2ludChwb2ludDogVmVjdG9yKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYS5lcXVhbHMocG9pbnQpIHx8IHRoaXMuYi5lcXVhbHMocG9pbnQpIHx8IHRoaXMuYy5lcXVhbHMocG9pbnQpO1xuICB9XG5cbiAgaGFzQW55UG9pbnQocG9pbnRzOiBWZWN0b3JbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBwb2ludHMuZmlsdGVyKChwb2ludDogVmVjdG9yKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1BvaW50KHBvaW50KTtcbiAgICAgIH0pLmxlbmd0aCAhPT0gMFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgTGluZXNGcm9tQXJyYXkodHJpYW5nbGVzOiBUcmlhbmdsZVtdKTogTGluZVtdIHtcbiAgICByZXR1cm4gdHJpYW5nbGVzLnJlZHVjZSgoYWNjdW11bGF0b3I6IExpbmVbXSwgdHJpYW5nbGU6IFRyaWFuZ2xlKSA9PiB7XG4gICAgICBhY2N1bXVsYXRvci5wdXNoKC4uLnRyaWFuZ2xlLmxpbmVzQXJyYXkpO1xuICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIHN0YXRpYyBHZXRVbmlxdWVMaW5lcyh0cmlhbmdsZXM6IFRyaWFuZ2xlW10pOiBMaW5lW10ge1xuICAgIGNvbnN0IGxpbmVzOiBMaW5lW10gPSBUcmlhbmdsZS5MaW5lc0Zyb21BcnJheSh0cmlhbmdsZXMpO1xuICAgIHJldHVybiBsaW5lcy5maWx0ZXIoKGxpbmU6IExpbmUpID0+IExpbmUuSXNVbmlxdWUobGluZSwgbGluZXMpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgcG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERpc2pvaW5lZFNldCB9IGZyb20gJy4uL3RyaWFuZ3VsYXRpb24nO1xuaW1wb3J0IHsgUXVhZFRyZWUgfSBmcm9tICcuLi9xdWFkdHJlZSc7XG5pbXBvcnQgeyBSYWRUb0RlZyB9IGZyb20gJy4uL3V0aWwvcmFkRGVnJztcbmltcG9ydCB0b0Zsb2F0IGZyb20gJy4uL3V0aWwvdG9GbG9hdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XG4gIHNldDogRGlzam9pbmVkU2V0O1xuICBxdWFkVHJlZTogUXVhZFRyZWU7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHsgeCwgeSB9OiBwb2ludCA9IHsgeDogMCwgeTogMCB9KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgY2xvbmUoKTogVmVjdG9yIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih7IHg6IHRoaXMueCwgeTogdGhpcy55IH0pO1xuICB9XG5cbiAgbWFnbml0dWRlKCk6IG51bWJlciB7XG4gICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54ICogdGhpcy54O1xuICAgIGNvbnN0IHk6IG51bWJlciA9IHRoaXMueSAqIHRoaXMueTtcbiAgICBjb25zdCBtYWduaXR1ZGU6IG51bWJlciA9IE1hdGguc3FydCh4ICsgeSk7XG4gICAgcmV0dXJuIG1hZ25pdHVkZTtcbiAgfVxuXG4gIGRvdFByb2R1Y3QoeyB4LCB5IH06IFZlY3Rvcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5O1xuICB9XG5cbiAgYWRkKHZlY3RvcjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLnggKyB2ZWN0b3IueDtcbiAgICBjb25zdCB5OiBudW1iZXIgPSB0aGlzLnkgKyB2ZWN0b3IueTtcblxuICAgIHJldHVybiBuZXcgVmVjdG9yKHsgeCwgeSB9KTtcbiAgfVxuXG4gIHN1Yih2ZWN0b3I6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54ICsgLXZlY3Rvci54O1xuICAgIGNvbnN0IHk6IG51bWJlciA9IHRoaXMueSArIC12ZWN0b3IueTtcblxuICAgIHJldHVybiBuZXcgVmVjdG9yKHsgeCwgeSB9KTtcbiAgfVxuXG4gIG11bHRpcGx5U2NhbGFyKHNjYWxhcjogbnVtYmVyKTogVmVjdG9yIHtcbiAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLnggKiBzY2FsYXI7XG4gICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy55ICogc2NhbGFyO1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoeyB4LCB5IH0pO1xuICB9XG5cbiAgbm9ybWFsaXplKCk6IFZlY3RvciB7XG4gICAgY29uc3QgbWFnbml0dWRlOiBudW1iZXIgPSB0aGlzLm1hZ25pdHVkZSgpO1xuICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueCAvIG1hZ25pdHVkZTtcbiAgICBjb25zdCB5OiBudW1iZXIgPSB0aGlzLnkgLyBtYWduaXR1ZGU7XG5cbiAgICByZXR1cm4gbmV3IFZlY3Rvcih7IHgsIHkgfSk7XG4gIH1cblxuICBsZXJwKHZlY3RvcjogVmVjdG9yLCBhbHBoYTogbnVtYmVyKTogVmVjdG9yIHtcbiAgICBjb25zdCB4ID0gdGhpcy54ICsgKHZlY3Rvci54IC0gdGhpcy54KSAqIGFscGhhO1xuICAgIGNvbnN0IHkgPSB0aGlzLnkgKyAodmVjdG9yLnkgLSB0aGlzLnkpICogYWxwaGE7XG5cbiAgICByZXR1cm4gbmV3IFZlY3Rvcih7IHgsIHkgfSk7XG4gIH1cblxuICBuZWdhdGl2ZSgpOiBWZWN0b3Ige1xuICAgIGNvbnN0IHg6IG51bWJlciA9IC10aGlzLng7XG4gICAgY29uc3QgeTogbnVtYmVyID0gLXRoaXMueTtcblxuICAgIHJldHVybiBuZXcgVmVjdG9yKHsgeCwgeSB9KTtcbiAgfVxuXG4gIHBlcnBlbmRpY3VsYXIoKTogeyBsZWZ0OiBWZWN0b3I7IHJpZ2h0OiBWZWN0b3IgfSB7XG4gICAgY29uc3QgcmlnaHQ6IFZlY3RvciA9IG5ldyBWZWN0b3IoeyB4OiAtdGhpcy55LCB5OiB0aGlzLnggfSk7XG4gICAgY29uc3QgbGVmdDogVmVjdG9yID0gbmV3IFZlY3Rvcih7IHg6IHRoaXMueSwgeTogLXRoaXMueCB9KTtcblxuICAgIHJldHVybiB7IGxlZnQsIHJpZ2h0IH07XG4gIH1cblxuICBzY2FsZShsZW5ndGg6IG51bWJlcik6IFZlY3RvciB7XG4gICAgY29uc3Qgbm9ybWFsaXplZDogVmVjdG9yID0gdGhpcy5ub3JtYWxpemUoKTtcbiAgICBjb25zdCB4OiBudW1iZXIgPSBub3JtYWxpemVkLnggKiBsZW5ndGg7XG4gICAgY29uc3QgeTogbnVtYmVyID0gbm9ybWFsaXplZC55ICogbGVuZ3RoO1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoeyB4LCB5IH0pO1xuICB9XG5cbiAgYW5nbGVEZWcodmVjdG9yOiBWZWN0b3IpOiBudW1iZXIge1xuICAgIGNvbnN0IGFuZ2xlOiBudW1iZXIgPSB0aGlzLmFuZ2xlKHZlY3Rvcik7XG4gICAgcmV0dXJuIFJhZFRvRGVnKGFuZ2xlKTtcbiAgfVxuXG4gIGFuZ2xlUmFkKHZlY3RvcjogVmVjdG9yKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hbmdsZSh2ZWN0b3IpO1xuICB9XG5cbiAgYmlzZWN0b3IodmVjdG9yOiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQ6IFZlY3RvciA9IHRoaXMubm9ybWFsaXplKCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFZlY3RvcjogVmVjdG9yID0gdmVjdG9yLm5vcm1hbGl6ZSgpO1xuICAgIGNvbnN0IHN1bTogVmVjdG9yID0gbm9ybWFsaXplZC5hZGQobm9ybWFsaXplZFZlY3Rvcik7XG4gICAgY29uc3QgbWFnbml0dWRlOiBudW1iZXIgPSAodGhpcy5tYWduaXR1ZGUoKSArIHZlY3Rvci5tYWduaXR1ZGUoKSkgLyAyO1xuXG4gICAgcmV0dXJuIHN1bS5zY2FsZShtYWduaXR1ZGUpO1xuICB9XG5cbiAgZXF1YWxzKHZlY3RvcjogVmVjdG9yKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMueCA9PT0gdmVjdG9yLnggJiYgdGhpcy55ID09PSB2ZWN0b3IueTtcbiAgfVxuXG4gIGRpc3RhbmNlVG8odmVjdG9yOiBWZWN0b3IpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN1Yih2ZWN0b3IpLm1hZ25pdHVkZSgpO1xuICB9XG5cbiAgbWlkcG9pbnQodmVjdG9yOiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgIGNvbnN0IHg6IG51bWJlciA9ICh0aGlzLnggKyB2ZWN0b3IueCkgLyAyO1xuICAgIGNvbnN0IHk6IG51bWJlciA9ICh0aGlzLnkgKyB2ZWN0b3IueSkgLyAyO1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoeyB4LCB5IH0pO1xuICB9XG5cbiAgc3RhdGljIEZpbmRQb2x5Q2VudHJvaWQocG9pbnRzOiBWZWN0b3JbXSk6IFZlY3RvciB7XG4gICAgbGV0IHggPSAwO1xuICAgIGxldCB5ID0gMDtcblxuICAgIHBvaW50cy5mb3JFYWNoKChwb2ludDogVmVjdG9yKSA9PiB7XG4gICAgICB4ICs9IHBvaW50Lng7XG4gICAgICB5ICs9IHBvaW50Lnk7XG4gICAgfSk7XG5cbiAgICB4IC89IHBvaW50cy5sZW5ndGg7XG4gICAgeSAvPSBwb2ludHMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoeyB4LCB5IH0pO1xuICB9XG5cbiAgc3RhdGljIEFycmFuZ2VQb2ludHNDQ1cocG9pbnRzOiBWZWN0b3JbXSk6IFZlY3RvcltdIHtcbiAgICBjb25zdCBjZW50cm9pZDogVmVjdG9yID0gVmVjdG9yLkZpbmRQb2x5Q2VudHJvaWQocG9pbnRzKTtcbiAgICBsZXQgY2xvbmU6IFZlY3RvcltdID0gWy4uLnBvaW50c107XG5cbiAgICBjbG9uZS5zb3J0KChhOiBWZWN0b3IsIGI6IFZlY3RvcikgPT4ge1xuICAgICAgY29uc3QgYW5nbGVBOiBudW1iZXIgPSBNYXRoLmF0YW4yKGEueSAtIGNlbnRyb2lkLnksIGEueCAtIGNlbnRyb2lkLngpO1xuICAgICAgY29uc3QgYW5nbGVCOiBudW1iZXIgPSBNYXRoLmF0YW4yKGIueSAtIGNlbnRyb2lkLnksIGIueCAtIGNlbnRyb2lkLngpO1xuICAgICAgcmV0dXJuIGFuZ2xlQSAtIGFuZ2xlQjtcbiAgICB9KTtcblxuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIHN0YXRpYyBVbmlxdWVGcm9tQXJyYXkocG9pbnRzOiBWZWN0b3JbXSk6IFZlY3RvcltdIHtcbiAgICBjb25zdCBpc1VuaXF1ZSA9ICh2ZWN0b3I6IFZlY3RvciwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFZlY3RvcltdKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBhcnJheS5maW5kSW5kZXgoKHZlY3RvckluZGV4OiBWZWN0b3IpID0+IHtcbiAgICAgICAgICByZXR1cm4gdmVjdG9yLmVxdWFscyh2ZWN0b3JJbmRleCk7XG4gICAgICAgIH0pID09PSBpbmRleFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHBvaW50cy5maWx0ZXIoaXNVbmlxdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhbmdsZSh2ZWN0b3I6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgY29uc3QgcHJvZHVjdDogbnVtYmVyID0gdGhpcy5kb3RQcm9kdWN0KHZlY3Rvcik7XG4gICAgY29uc3QgY29zQW5nbGU6IG51bWJlciA9IHByb2R1Y3QgLyAodGhpcy5tYWduaXR1ZGUoKSAqIHZlY3Rvci5tYWduaXR1ZGUoKSk7XG4gICAgcmV0dXJuIE1hdGguYWNvcyhjb3NBbmdsZSk7XG4gIH1cbn1cbiIsImltcG9ydCBCb3VuZGluZ0JveCBmcm9tICcuL0JvdW5kaW5nQm94JztcbmltcG9ydCBDbG9jayBmcm9tICcuL0Nsb2NrJztcbmltcG9ydCBMaW5lIGZyb20gJy4vTGluZSc7XG5pbXBvcnQgTGluZUludGVyc2VjdGlvbiBmcm9tICcuL0xpbmVJbnRlcnNlY3Rpb24nO1xuaW1wb3J0IHsgTWF0cml4MiwgTWF0cml4MywgTWF0cml4NCB9IGZyb20gJy4vTWF0cml4JztcbmltcG9ydCBTaGFwZSBmcm9tICcuL1NoYXBlJztcbmltcG9ydCBUcmlhbmdsZSBmcm9tICcuL1RyaWFuZ2xlJztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xuXG5leHBvcnQge1xuICBCb3VuZGluZ0JveCxcbiAgQ2xvY2ssXG4gIExpbmUsXG4gIExpbmVJbnRlcnNlY3Rpb24sXG4gIE1hdHJpeDIsXG4gIE1hdHJpeDMsXG4gIE1hdHJpeDQsXG4gIFNoYXBlLFxuICBUcmlhbmdsZSxcbiAgVmVjdG9yLFxufTtcbiIsImltcG9ydCBVcGRhdGVyIGZyb20gJy4vVXBkYXRlci9VcGRhdGVyJztcbmltcG9ydCB7IGlkLCB0aWNrRGF0YSwgVXBkYXRlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB1bmlxdWVJZCB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IEVudGl0eSBmcm9tICcuL0VudGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudCBpbXBsZW1lbnRzIGlkLCBVcGRhdGUge1xuICByZWFkb25seSBpZDogbnVtYmVyID0gdW5pcXVlSWQoKTtcbiAgbmFtZTogc3RyaW5nO1xuICB1cGRhdGVyOiBVcGRhdGVyO1xuICBlbnRpdHk6IEVudGl0eTtcbiAgdXBkYXRlUHJpb3JpdHk6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIHN0YXJ0KCk6IHZvaWQge31cblxuICBzdG9wKCk6IHZvaWQge31cblxuICB1cGRhdGUodGlja0RhdGE6IHRpY2tEYXRhKTogdm9pZCB7fVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL0NvbXBvbmVudCc7XG5pbXBvcnQgVXBkYXRlciBmcm9tICcuL1VwZGF0ZXIvVXBkYXRlcic7XG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdW5pcXVlSWQgfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSWQoKTtcbiAgbmFtZTogc3RyaW5nO1xuICB1cGRhdGVyOiBVcGRhdGVyO1xuICByZWFkb25seSBjb21wb25lbnRzOiBDb21wb25lbnRbXSA9IFtdO1xuXG4gIHN0YXJ0KCk6IHZvaWQge31cblxuICBzdG9wKCk6IHZvaWQge31cbn1cbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi4vRW50aXR5JztcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vQ29tcG9uZW50JztcbmltcG9ydCBVcGRhdGVyIGZyb20gJy4vVXBkYXRlcic7XG5pbXBvcnQgeyB1cGRhdGVyUmVwb3J0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XG5cbnR5cGUgY29tcG9uZW50Q2FsbGJhY2sgPSAoY29tcG9uZW50OiBDb21wb25lbnQpID0+IGJvb2xlYW47XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eVVwZGF0ZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IGVudGl0aWVzOiBFbnRpdHlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgdXBkYXRlcjogVXBkYXRlcikge31cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLmVudGl0aWVzLmZvckVhY2goKGVudGl0eTogRW50aXR5KSA9PiBlbnRpdHkuc3RhcnQoKSk7XG4gIH1cblxuICBzdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5OiBFbnRpdHkpID0+IGVudGl0eS5zdG9wKCkpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5lbnRpdGllcy5sZW5ndGggPSAwO1xuICB9XG5cbiAgYWRkKGVudGl0eTogRW50aXR5KTogdXBkYXRlclJlcG9ydFtdIHtcbiAgICBlbnRpdHkudXBkYXRlciA9IHRoaXMudXBkYXRlcjtcbiAgICB0aGlzLmVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICBjb25zdCBjYWxsYmFjazogY29tcG9uZW50Q2FsbGJhY2sgPSAoY29tcG9uZW50OiBDb21wb25lbnQpID0+IHtcbiAgICAgIGNvbXBvbmVudC5lbnRpdHkgPSBlbnRpdHk7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVyLmFkZENvbXBvbmVudChjb21wb25lbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIHRoaXMubG9vcENvbXBvbmVudHMoZW50aXR5LmNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHJlbW92ZSh7IGNvbXBvbmVudHMgfTogRW50aXR5KTogdXBkYXRlclJlcG9ydFtdIHtcbiAgICBjb25zdCBjYWxsYmFjazogY29tcG9uZW50Q2FsbGJhY2sgPSBjb21wb25lbnQgPT5cbiAgICAgIHRoaXMudXBkYXRlci5yZW1vdmVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICByZXR1cm4gdGhpcy5sb29wQ29tcG9uZW50cyhjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gIH1cblxuICB0b2dnbGUoeyBjb21wb25lbnRzIH06IEVudGl0eSk6IHVwZGF0ZXJSZXBvcnRbXSB7XG4gICAgY29uc3QgY2FsbGJhY2s6IGNvbXBvbmVudENhbGxiYWNrID0gY29tcG9uZW50ID0+XG4gICAgICB0aGlzLnVwZGF0ZXIudG9nZ2xlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgcmV0dXJuIHRoaXMubG9vcENvbXBvbmVudHMoY29tcG9uZW50cywgY2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSBsb29wQ29tcG9uZW50cyhcbiAgICBjb21wb25lbnRzOiBDb21wb25lbnRbXSxcbiAgICBjYWxsYmFjazogY29tcG9uZW50Q2FsbGJhY2tcbiAgKTogdXBkYXRlclJlcG9ydFtdIHtcbiAgICByZXR1cm4gY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudDogQ29tcG9uZW50KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogY29tcG9uZW50LmlkLFxuICAgICAgICBuYW1lOiBjb21wb25lbnQubmFtZSxcbiAgICAgICAgc3VjY2VzczogY2FsbGJhY2soY29tcG9uZW50KSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vQ29tcG9uZW50JztcbmltcG9ydCBVcGRhdGVyIGZyb20gJy4vVXBkYXRlcic7XG5pbXBvcnQgeyBpZCwgVXBkYXRlLCB0aWNrRGF0YSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdW5pcXVlSWQgfSBmcm9tICcuLi8uLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52b2tlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgaWQ6IG51bWJlciA9IHVuaXF1ZUlkKCk7XG4gIG9yaWdpbmFsVGltZW91dDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IHVwZGF0ZXI6IFVwZGF0ZXIsXG4gICAgcmVhZG9ubHkgY29tcG9uZW50OiBDb21wb25lbnQsXG4gICAgcHVibGljIHRpbWVvdXQ6IG51bWJlclxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMub3JpZ2luYWxUaW1lb3V0ID0gdGltZW91dDtcbiAgfVxuXG4gIHVwZGF0ZSh0aWNrRGF0YTogdGlja0RhdGEpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVvdXQgLT0gdGlja0RhdGEuZGVsdGFUaW1lTVM7XG5cbiAgICBpZiAodGhpcy50aW1lb3V0IDw9IDApIHtcbiAgICAgIHRoaXMuY29tcG9uZW50LnVwZGF0ZSh0aWNrRGF0YSk7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG4gIH1cblxuICBzdG9wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVwZGF0ZXIucmVtb3ZlKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBpZCwgVXBkYXRlLCB0aWNrRGF0YSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdW5pcXVlSWQgfSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vQ29tcG9uZW50JztcbmltcG9ydCBVcGRhdGVyIGZyb20gJy4vVXBkYXRlcic7XG5pbXBvcnQgSW52b2tlIGZyb20gJy4vSW52b2tlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52b2tlUmVwZWF0aW5nIGV4dGVuZHMgSW52b2tlIHtcbiAgcHJpdmF0ZSB1cGRhdGVkOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHVwZGF0ZXI6IFVwZGF0ZXIsXG4gICAgY29tcG9uZW50OiBDb21wb25lbnQsXG4gICAgaW50ZXJ2YWw6IG51bWJlcixcbiAgICBwcml2YXRlIHRpbWVzOiBudW1iZXJcbiAgKSB7XG4gICAgc3VwZXIodXBkYXRlciwgY29tcG9uZW50LCBpbnRlcnZhbCk7XG4gIH1cblxuICB1cGRhdGUodGlja0RhdGE6IHRpY2tEYXRhKSB7XG4gICAgdGhpcy50aW1lb3V0IC09IHRpY2tEYXRhLmRlbHRhVGltZU1TO1xuXG4gICAgaWYgKHRoaXMudGltZW91dCA8PSAwKSB7XG4gICAgICBpZiAoKyt0aGlzLnVwZGF0ZWQgPT09IHRoaXMudGltZXMpIHtcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbXBvbmVudC51cGRhdGUodGlja0RhdGEpO1xuICAgICAgdGhpcy50aW1lb3V0ID0gdGhpcy5vcmlnaW5hbFRpbWVvdXQ7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDbG9jayB9IGZyb20gJy4uLy4uL2NvbW1vbic7XG5pbXBvcnQgeyBjb250YWlucywgcmVtb3ZlRnJvbUFycmF5IH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQgeyB1cGRhdGVyUmVwb3J0LCB0aWNrRGF0YSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi9Db21wb25lbnQnO1xuaW1wb3J0IEVudGl0eSBmcm9tICcuLi9FbnRpdHknO1xuaW1wb3J0IEVudGl0eVVwZGF0ZXIgZnJvbSAnLi9FbnRpdHlVcGRhdGVyJztcbmltcG9ydCBJbnZva2UgZnJvbSAnLi9JbnZva2UnO1xuaW1wb3J0IEludm9rZVJlcGVhdGluZyBmcm9tICcuL0ludm9rZVJlcGVhdGluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwZGF0ZXIge1xuICBvblVwZGF0ZUNvbXBsZXRlOiBDb21wb25lbnQgPSBuZXcgQ29tcG9uZW50KCk7XG5cbiAgcHJpdmF0ZSBjb21wb25lbnRzOiBDb21wb25lbnRbXSA9IFtdO1xuICBwcml2YXRlIHJ1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBjbG9jazogQ2xvY2sgPSBuZXcgQ2xvY2soKTtcbiAgcHJpdmF0ZSBlbnRpdHlVcGRhdGVyOiBFbnRpdHlVcGRhdGVyID0gbmV3IEVudGl0eVVwZGF0ZXIodGhpcyk7XG4gIHByaXZhdGUgZnJhbWVJZDogbnVtYmVyO1xuXG4gIHN0YXJ0KCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XG4gICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgdGhpcy5jbG9jay5zdGFydCgpO1xuICAgICAgdGhpcy5lbnRpdHlVcGRhdGVyLnN0YXJ0KCk7XG4gICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50OiBDb21wb25lbnQpID0+IGNvbXBvbmVudC5zdGFydCgpKTtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RvcCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWVJZCk7XG4gICAgICB0aGlzLmNsb2NrLnN0b3AoKTtcbiAgICAgIHRoaXMuZW50aXR5VXBkYXRlci5zdG9wKCk7XG4gICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50OiBDb21wb25lbnQpID0+IGNvbXBvbmVudC5zdG9wKCkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcCgpO1xuICAgIHRoaXMuZW50aXR5VXBkYXRlci5jbGVhcigpO1xuICAgIHRoaXMuY29tcG9uZW50cy5sZW5ndGggPSAwO1xuICB9XG5cbiAgYWRkKGVudGl0eTogRW50aXR5KTogdXBkYXRlclJlcG9ydFtdO1xuICBhZGQoY29tcG9uZW50OiBDb21wb25lbnQpOiBib29sZWFuO1xuICBhZGQoYmVoYXZpb3VyOiBFbnRpdHkgfCBDb21wb25lbnQpOiBib29sZWFuIHwgdXBkYXRlclJlcG9ydFtdIHtcbiAgICBpZiAoYmVoYXZpb3VyIGluc3RhbmNlb2YgQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRDb21wb25lbnQoYmVoYXZpb3VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZW50aXR5VXBkYXRlci5hZGQoYmVoYXZpb3VyKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUoZW50aXR5OiBFbnRpdHkpOiB1cGRhdGVyUmVwb3J0W107XG4gIHJlbW92ZShjb21wb25lbnQ6IENvbXBvbmVudCk6IGJvb2xlYW47XG4gIHJlbW92ZShiZWhhdmlvdXI6IEVudGl0eSB8IENvbXBvbmVudCk6IGJvb2xlYW4gfCB1cGRhdGVyUmVwb3J0W10ge1xuICAgIGlmIChiZWhhdmlvdXIgaW5zdGFuY2VvZiBDb21wb25lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbW92ZUNvbXBvbmVudChiZWhhdmlvdXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnRpdHlVcGRhdGVyLnJlbW92ZShiZWhhdmlvdXIpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZShlbnRpdHk6IEVudGl0eSk6IHVwZGF0ZXJSZXBvcnRbXTtcbiAgdG9nZ2xlKGNvbXBvbmVudDogQ29tcG9uZW50KTogYm9vbGVhbjtcbiAgdG9nZ2xlKGJlaGF2aW91cjogRW50aXR5IHwgQ29tcG9uZW50KTogYm9vbGVhbiB8IHVwZGF0ZXJSZXBvcnRbXSB7XG4gICAgaWYgKGJlaGF2aW91ciBpbnN0YW5jZW9mIENvbXBvbmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlQ29tcG9uZW50KGJlaGF2aW91cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVudGl0eVVwZGF0ZXIudG9nZ2xlKGJlaGF2aW91cik7XG4gICAgfVxuICB9XG5cbiAgaXNVcGRhdGluZ0NvbXBvbmVudChjb21wb25lbnQ6IENvbXBvbmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb250YWlucyh0aGlzLmNvbXBvbmVudHMsIGNvbXBvbmVudCk7XG4gIH1cblxuICBhZGRDb21wb25lbnQoY29tcG9uZW50OiBDb21wb25lbnQpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuaXNVcGRhdGluZ0NvbXBvbmVudChjb21wb25lbnQpKSB7XG4gICAgICBjb21wb25lbnQudXBkYXRlciA9IHRoaXM7XG4gICAgICB0aGlzLnB1c2hUb1F1ZXVlKGNvbXBvbmVudCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudDogQ29tcG9uZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlbW92ZUZyb21BcnJheSh0aGlzLmNvbXBvbmVudHMsIGNvbXBvbmVudCk7XG4gIH1cblxuICB0b2dnbGVDb21wb25lbnQoY29tcG9uZW50OiBDb21wb25lbnQpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWRkQ29tcG9uZW50KGNvbXBvbmVudCkpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaW52b2tlKGNvbXBvbmVudDogQ29tcG9uZW50LCB0aW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBpbnZva2U6IEludm9rZSA9IG5ldyBJbnZva2UodGhpcywgY29tcG9uZW50LCB0aW1lKTtcbiAgICB0aGlzLmFkZChpbnZva2UpO1xuICB9XG5cbiAgaW52b2tlUmVwZWF0aW5nKFxuICAgIGNvbXBvbmVudDogQ29tcG9uZW50LFxuICAgIHRpbWU6IG51bWJlcixcbiAgICB0aW1lczogbnVtYmVyID0gSW5maW5pdHlcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgaW52b2tlOiBJbnZva2VSZXBlYXRpbmcgPSBuZXcgSW52b2tlUmVwZWF0aW5nKFxuICAgICAgdGhpcyxcbiAgICAgIGNvbXBvbmVudCxcbiAgICAgIHRpbWUsXG4gICAgICB0aW1lc1xuICAgICk7XG4gICAgdGhpcy5hZGQoaW52b2tlKTtcbiAgfVxuXG4gIGdldFRpY2tEYXRhKCk6IHRpY2tEYXRhIHtcbiAgICBjb25zdCBkZWx0YVRpbWU6IG51bWJlciA9IHRoaXMuY2xvY2suZ2V0RGVsdGEoKTtcbiAgICBjb25zdCBkZWx0YVRpbWVNUzogbnVtYmVyID0gZGVsdGFUaW1lICogMTAwMDtcbiAgICBjb25zdCBlbGFwc2VkVGltZTogbnVtYmVyID0gdGhpcy5jbG9jay5nZXRFbGFwc2VkKCk7XG4gICAgcmV0dXJuIHsgZGVsdGFUaW1lLCBkZWx0YVRpbWVNUywgZWxhcHNlZFRpbWUgfTtcbiAgfVxuXG4gIHByaXZhdGUgcHVzaFRvUXVldWUoY29tcG9uZW50OiBDb21wb25lbnQpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudC51cGRhdGVQcmlvcml0eSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50cy5zcGxpY2UoY29tcG9uZW50LnVwZGF0ZVByaW9yaXR5LCAwLCBjb21wb25lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcblxuICAgIGNvbnN0IHRpY2tEYXRhOiB0aWNrRGF0YSA9IHRoaXMuZ2V0VGlja0RhdGEoKTtcblxuICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQ6IENvbXBvbmVudCkgPT4ge1xuICAgICAgY29tcG9uZW50LnVwZGF0ZSh0aWNrRGF0YSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uVXBkYXRlQ29tcGxldGUudXBkYXRlKHRpY2tEYXRhKTtcbiAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL0NvbXBvbmVudCc7XG5pbXBvcnQgRW50aXR5IGZyb20gJy4vRW50aXR5JztcbmltcG9ydCBVcGRhdGVyIGZyb20gJy4vVXBkYXRlci9VcGRhdGVyJztcblxuZXhwb3J0IHsgQ29tcG9uZW50LCBFbnRpdHksIFVwZGF0ZXIgfTtcbiIsImltcG9ydCB7IEdyaWQsIE5hdmlnYXRvciwgTmF2aWdhdG9yVGlsZSB9IGZyb20gJy4vcGF0aGZpbmRpbmcnO1xuaW1wb3J0IHsgVHJpYW5ndWxhdGlvbiwgSHVsbCB9IGZyb20gJy4vdHJpYW5ndWxhdGlvbic7XG5pbXBvcnQgeyBRdWFkVHJlZSB9IGZyb20gJy4vcXVhZHRyZWUnO1xuaW1wb3J0IHsgVmVjdG9yLCBMaW5lLCBUcmlhbmdsZSwgU2hhcGUsIEJvdW5kaW5nQm94IH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtcbiAgdW5pcXVlSWQsXG4gIHNvcnQsXG4gIGltbXV0YWJsZU9iamVjdFNvcnQsXG4gIGNvbnRhaW5zLFxuICBSYWRUb0RlZyxcbiAgRGVnVG9SYWQsXG4gIHJlbW92ZUZyb21BcnJheSxcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IEVudGl0eSwgQ29tcG9uZW50LCBVcGRhdGVyIH0gZnJvbSAnLi9lY3MnO1xuaW1wb3J0IHtcbiAgdGlja0RhdGEsXG4gIHBvaW50LFxuICBzaXplLFxuICBsaW1pdHMsXG4gIHJvdyxcbiAgbmF2aWdhdG9yU2V0dGluZ3MsXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICByYW5kb21Qb2ludCxcbiAgcmFuZG9tUG9pbnRzLFxuICByYW5kb21JbnQsXG4gIHJhbmRvbUZsb2F0LFxuICByYW5kb21Db2xvcixcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IHtcbiAgR3JpZCxcbiAgTmF2aWdhdG9yLFxuICBOYXZpZ2F0b3JUaWxlLFxuICBUcmlhbmd1bGF0aW9uLFxuICBIdWxsLFxuICBWZWN0b3IsXG4gIExpbmUsXG4gIFRyaWFuZ2xlLFxuICBTaGFwZSxcbiAgQm91bmRpbmdCb3gsXG4gIFF1YWRUcmVlLFxuICB1bmlxdWVJZCxcbiAgc29ydCxcbiAgaW1tdXRhYmxlT2JqZWN0U29ydCxcbiAgY29udGFpbnMsXG4gIFJhZFRvRGVnLFxuICBEZWdUb1JhZCxcbiAgcmVtb3ZlRnJvbUFycmF5LFxuICBFbnRpdHksXG4gIENvbXBvbmVudCxcbiAgVXBkYXRlcixcbiAgdGlja0RhdGEsXG4gIHBvaW50LFxuICBzaXplLFxuICBsaW1pdHMsXG4gIHJvdyxcbiAgbmF2aWdhdG9yU2V0dGluZ3MsXG4gIHJhbmRvbVBvaW50LFxuICByYW5kb21Qb2ludHMsXG4gIHJhbmRvbUludCxcbiAgcmFuZG9tRmxvYXQsXG4gIHJhbmRvbUNvbG9yLFxufTtcbiIsImltcG9ydCBPYnN0YWNsZXMgZnJvbSAnLi9PYnN0YWNsZXMnO1xuaW1wb3J0IHsgcmFuZG9tSW50IH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuaW1wb3J0IHsgcm93LCBwb2ludCwgc2l6ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgZGVmYXVsdFNpemU6IHNpemUgPSB7IHdpZHRoOiAxMCwgaGVpZ2h0OiAxMCB9O1xudHlwZSBvblRpbGVDcmVhdGUgPSAodGlsZTogTmF2aWdhdG9yVGlsZSkgPT4gdm9pZDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCB7XG4gIG9uVGlsZUNyZWF0ZTogb25UaWxlQ3JlYXRlID0gKCkgPT4ge307XG4gIHJlYWRvbmx5IG9ic3RhY2xlczogT2JzdGFjbGVzID0gbmV3IE9ic3RhY2xlcyh0aGlzKTtcbiAgcmVhZG9ubHkgdGlsZXM6IE5hdmlnYXRvclRpbGVbXSA9IFtdO1xuICByZWFkb25seSByb3dzOiByb3dbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2l6ZTogc2l6ZSA9IGRlZmF1bHRTaXplKSB7fVxuXG4gIC8qKiBSZXR1cm5zIGEgcmFuZG9tIHRpbGUsIGNhbiBiZSBhbiBvYnN0YWNsZSBvciBub3QuICovXG4gIHJhbmRvbVRpbGUoKTogTmF2aWdhdG9yVGlsZSB7XG4gICAgY29uc3QgeCA9IHJhbmRvbUludCgwLCB0aGlzLnNpemUud2lkdGggLSAxKTtcbiAgICBjb25zdCB5ID0gcmFuZG9tSW50KDAsIHRoaXMuc2l6ZS5oZWlnaHQgLSAxKTtcblxuICAgIHJldHVybiB0aGlzLmZpbmRUaWxlKHsgeCwgeSB9KTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIGEgcmFuZG9tIG5vbi1vYnN0YWNsZSB0aWxlLCBpZiBpdCBleGlzdHMuICovXG4gIHJhbmRvbUZyZWVUaWxlKCk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5vYnN0YWNsZXMuZ2V0UmFuZG9tT3BlbigpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgYSB0aWxlIGF0IHRoZSBzcGVjaWZpZWQgY29vcmRpbmF0ZXMuICovXG4gIGZpbmRUaWxlKHsgeCwgeSB9OiBwb2ludCk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICBjb25zdCByb3c6IHJvdyA9IHRoaXMucm93c1t5XTtcbiAgICByZXR1cm4gcm93ICYmIHJvdy5sZW5ndGggPiB4ID8gcm93W3hdIDogbnVsbDtcbiAgfVxuXG4gIG1ha2VHcmlkKCk6IHZvaWQge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5zaXplLmhlaWdodDsgeSsrKSB7XG4gICAgICBjb25zdCByb3c6IHJvdyA9IFtdO1xuXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuc2l6ZS53aWR0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IHBvczogVmVjdG9yID0gbmV3IFZlY3Rvcih7IHgsIHkgfSk7XG4gICAgICAgIGNvbnN0IHRpbGU6IE5hdmlnYXRvclRpbGUgPSBuZXcgTmF2aWdhdG9yVGlsZShwb3MpO1xuICAgICAgICB0aGlzLm9uVGlsZUNyZWF0ZSh0aWxlKTtcbiAgICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUpO1xuICAgICAgICByb3cucHVzaCh0aWxlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yb3dzLnB1c2gocm93KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBHcmlkIGZyb20gJy4vR3JpZCc7XG5pbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuaW1wb3J0IE5hdmlnYXRvckRhdGEgZnJvbSAnLi9OYXZpZ2F0b3JEYXRhJztcbmltcG9ydCB7IHJvdywgaWQsIG5hdmlnYXRvclNldHRpbmdzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB1bmlxdWVJZCwgY29udGFpbnMgfSBmcm9tICcuLi91dGlsJztcblxudHlwZSBvbkV4cGxvcmUgPSAodGlsZTogTmF2aWdhdG9yVGlsZSkgPT4gdm9pZDtcbnR5cGUgb25Db21wbGV0ZSA9IChwYXRoOiBOYXZpZ2F0b3JUaWxlW10pID0+IHZvaWQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmlnYXRvciBpbXBsZW1lbnRzIGlkIHtcbiAgaWQ6IG51bWJlciA9IHVuaXF1ZUlkKCk7XG4gIHByaXZhdGUgX3BhdGg6IHJvdyA9IFtdO1xuICBwcml2YXRlIHZlcnRpY2FsQ29zdDogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBkaWFnb25hbENvc3Q6IG51bWJlciA9IDEuNDtcbiAgcHJpdmF0ZSBzdGF0aWMgbmVpZ2hib3JzQ291bnQ6IG51bWJlciA9IDk7XG4gIHByaXZhdGUgdGlsZXM6IHJvdyA9IFtdO1xuICBwcml2YXRlIG9wZW46IHJvdyA9IFtdO1xuICBwcml2YXRlIGNsb3NlZDogcm93ID0gW107XG4gIHByaXZhdGUgcmVnaXN0ZXJlZFRpbGVzOiBOYXZpZ2F0b3JUaWxlW10gPSBbXTtcblxuICBwcml2YXRlIGdyaWQ6IEdyaWQ7XG4gIHByaXZhdGUgYmVnaW46IE5hdmlnYXRvclRpbGU7XG4gIHByaXZhdGUgZW5kOiBOYXZpZ2F0b3JUaWxlO1xuICBwcml2YXRlIG9uRXhwbG9yZTogKHRpbGU6IE5hdmlnYXRvclRpbGUpID0+IHZvaWQ7XG4gIHByaXZhdGUgb25Db21wbGV0ZTogKHBhdGg6IE5hdmlnYXRvclRpbGVbXSkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBtYXhTdGVwczogbnVtYmVyO1xuICBwcml2YXRlIHN0ZXBzOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBncmlkLFxuICAgIGJlZ2luLFxuICAgIGVuZCxcbiAgICBvbkV4cGxvcmUsXG4gICAgb25Db21wbGV0ZSxcbiAgICBtYXhTdGVwcyxcbiAgfTogbmF2aWdhdG9yU2V0dGluZ3MpIHtcbiAgICB0aGlzLmdyaWQgPSBncmlkO1xuICAgIHRoaXMuYmVnaW4gPSBiZWdpbjtcbiAgICB0aGlzLmVuZCA9IGVuZDtcbiAgICB0aGlzLm9uRXhwbG9yZSA9IG9uRXhwbG9yZSB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMub25Db21wbGV0ZSA9IG9uQ29tcGxldGUgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLm1heFN0ZXBzID0gbWF4U3RlcHMgIT09IHVuZGVmaW5lZCA/IG1heFN0ZXBzIDogSW5maW5pdHk7XG4gIH1cblxuICBnZXQgcGF0aCgpOiByb3cge1xuICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICB9XG5cbiAgLyoqIEJlZ2luIHRoZSBwYXRoZmluZGluZyBwcm9jZXNzLiBEb2VzIG5vdCBzdGFydCBpZiBkZXN0aW5hdGlvbiBpcyBhbiBvYnN0YWNsZS4gKi9cbiAgc3RhcnQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZW5kLmlzT2JzdGFjbGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZWQucHVzaCh0aGlzLmJlZ2luKTtcbiAgICBjb25zdCBiZWdpbk5hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSB0aGlzLmJlZ2luLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgdGhpcy5hZGRUb0V4cGxvcmVkKHRoaXMuYmVnaW4pO1xuXG4gICAgYmVnaW5OYXZEYXRhLmdWYWwgPSAwO1xuICAgIHRoaXMuY2FsY3VsYXRlRyh0aGlzLmJlZ2luKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZGVyZWdpc3Rlck5hdmlnYXRvckRhdGEoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RlcmVkVGlsZXMuZm9yRWFjaCgodGlsZTogTmF2aWdhdG9yVGlsZSkgPT5cbiAgICAgIHRpbGUuZGVyZWdpc3Rlck5hdmlnYXRvckRhdGEodGhpcylcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVIKHRpbGU6IE5hdmlnYXRvclRpbGUpOiBudW1iZXIge1xuICAgIGNvbnN0IGNvbFZhbDogbnVtYmVyID0gTWF0aC5hYnModGlsZS5wb3NpdGlvbi54IC0gdGhpcy5lbmQucG9zaXRpb24ueCk7XG4gICAgY29uc3Qgcm93VmFsOiBudW1iZXIgPSBNYXRoLmFicyh0aWxlLnBvc2l0aW9uLnkgLSB0aGlzLmVuZC5wb3NpdGlvbi55KTtcbiAgICByZXR1cm4gY29sVmFsICsgcm93VmFsO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVHKHRpbGU6IE5hdmlnYXRvclRpbGUpOiB2b2lkIHtcbiAgICBjb25zdCB0aWxlTmF2RGF0YSA9IHRpbGUuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICB0aGlzLmFkZFRvRXhwbG9yZWQodGlsZSk7XG5cbiAgICBpZiAoKyt0aGlzLnN0ZXBzID09PSB0aGlzLm1heFN0ZXBzKSB7XG4gICAgICB0aGlzLmRvbmUoW10pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTmF2aWdhdG9yLm5laWdoYm9yc0NvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IHg6IG51bWJlciA9IHRpbGUucG9zaXRpb24ueCArIE5hdmlnYXRvci5nZXRDb2xPZmZzZXQoaSk7XG4gICAgICBjb25zdCB5OiBudW1iZXIgPSB0aWxlLnBvc2l0aW9uLnkgKyBOYXZpZ2F0b3IuZ2V0Um93T2Zmc2V0KGkpO1xuICAgICAgY29uc3QgZXhwbG9yaW5nOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCA9IHRoaXMuZ3JpZC5maW5kVGlsZSh7IHgsIHkgfSk7XG5cbiAgICAgIGlmICghZXhwbG9yaW5nKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHBsb3JpbmdOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gZXhwbG9yaW5nLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgICB0aGlzLmFkZFRvRXhwbG9yZWQoZXhwbG9yaW5nKTtcblxuICAgICAgaWYgKGV4cGxvcmluZy5pc09ic3RhY2xlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29udGFpbnModGhpcy5jbG9zZWQsIGV4cGxvcmluZykpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aWxlLmlkID09PSBleHBsb3JpbmcuaWQpIHtcbiAgICAgICAgdGhpcy5jbG9zZWQucHVzaChleHBsb3JpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLmdldFBhcmVudCh0aWxlLCBleHBsb3JpbmcsIHRpbGVOYXZEYXRhLCBleHBsb3JpbmdOYXZEYXRhKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb250YWlucyh0aGlzLm9wZW4sIGV4cGxvcmluZykpIHtcbiAgICAgICAgICB0aGlzLm9wZW4ucHVzaChleHBsb3JpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbGUuaXNEaWFnb25hbChleHBsb3JpbmcpKSB7XG4gICAgICAgICAgZXhwbG9yaW5nTmF2RGF0YS5nVmFsID0gdGlsZU5hdkRhdGEuZ1ZhbCArIHRoaXMuZGlhZ29uYWxDb3N0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmluZ05hdkRhdGEuZ1ZhbCA9IHRpbGVOYXZEYXRhLmdWYWwgKyB0aGlzLnZlcnRpY2FsQ29zdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBleHBsb3JpbmdOYXZEYXRhLmZWYWwgPSB0aGlzLmNhbGN1bGF0ZUYoZXhwbG9yaW5nLCBleHBsb3JpbmdOYXZEYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0ID0gdGhpcy5jaG9vc2VOZXh0KCk7XG5cbiAgICBpZiAobmV4dCkge1xuICAgICAgdGhpcy5vbkV4cGxvcmUobmV4dCk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUcobmV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhdGg6IE5hdmlnYXRvclRpbGVbXSA9IHRoaXMuZ2V0UGF0aCgpO1xuICAgICAgdGhpcy5kb25lKHBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZG9uZShwYXRoOiBOYXZpZ2F0b3JUaWxlW10pIHtcbiAgICB0aGlzLmRlcmVnaXN0ZXJOYXZpZ2F0b3JEYXRhKCk7XG4gICAgdGhpcy5vbkNvbXBsZXRlKHBhdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVGKHRpbGU6IE5hdmlnYXRvclRpbGUsIGRhdGE6IE5hdmlnYXRvckRhdGEpOiBudW1iZXIge1xuICAgIGNvbnN0IGhWYWwgPSB0aGlzLmNhbGN1bGF0ZUgodGlsZSk7XG4gICAgcmV0dXJuIGRhdGEuZ1ZhbCArIGhWYWw7XG4gIH1cblxuICBzdGF0aWMgZ2V0Um93T2Zmc2V0KGl0ZXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAvKlxuICAgICAgIGl0ZXJhdGlvbiA9IDAsIDEsIG9yIDI6IFstMV1bLTFdWy0xXVxuICAgICAgIGl0ZXJhdGlvbiA9IDMsIDQsIG9yIDU6IFsgMF1bIDBdWyAwXVxuICAgICAgIGl0ZXJhdGlvbiA9IDYsIDcsIG9yIDg6IFsrMV1bKzFdWysxXVxuICAgICAqL1xuICAgIHJldHVybiBOYXZpZ2F0b3IubmVpZ2hib3JzQ291bnQgKyAtTWF0aC5mbG9vcigoMzIgLSBpdGVyYXRpb24pIC8gMyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29sT2Zmc2V0KGl0ZXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAvKlxuICAgICAgIGl0ZXJhdGlvbiA9IDAsIDEsIG9yIDI6IFstMV1bIDBdWysxXVxuICAgICAgIGl0ZXJhdGlvbiA9IDMsIDQsIG9yIDU6IFstMV1bIDBdWysxXVxuICAgICAgIGl0ZXJhdGlvbiA9IDYsIDcsIG9yIDg6IFstMV1bIDBdWysxXVxuICAgICAqL1xuICAgIHJldHVybiAoaXRlcmF0aW9uICUgMykgLSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXJlbnQoXG4gICAgdGlsZTogTmF2aWdhdG9yVGlsZSxcbiAgICBjaGVja1RpbGU6IE5hdmlnYXRvclRpbGUsXG4gICAgdGlsZU5hdkRhdGE6IE5hdmlnYXRvckRhdGEsXG4gICAgY2hlY2tOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhXG4gICk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICBpZiAoIWNoZWNrTmF2RGF0YS5wYXJlbnQpIHtcbiAgICAgIGNoZWNrTmF2RGF0YS5wYXJlbnQgPSB0aWxlO1xuICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfVxuXG4gICAgY29uc3QgbW92ZUNvc3QgPSB0aWxlLmlzRGlhZ29uYWwoY2hlY2tUaWxlKVxuICAgICAgPyB0aGlzLmRpYWdvbmFsQ29zdFxuICAgICAgOiB0aGlzLnZlcnRpY2FsQ29zdDtcblxuICAgIGlmICh0aWxlTmF2RGF0YS5nVmFsICsgbW92ZUNvc3QgPCBjaGVja05hdkRhdGEuZ1ZhbCkge1xuICAgICAgY2hlY2tOYXZEYXRhLnBhcmVudCA9IHRpbGU7XG4gICAgICByZXR1cm4gdGlsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgY2hvb3NlTmV4dCgpOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgdGhpcy5vcGVuLnNvcnQoKGE6IE5hdmlnYXRvclRpbGUsIGI6IE5hdmlnYXRvclRpbGUpID0+IHtcbiAgICAgIGNvbnN0IGFOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gYS5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgICAgY29uc3QgYk5hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSBiLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG5cbiAgICAgIHJldHVybiBhTmF2RGF0YS5mVmFsIC0gYk5hdkRhdGEuZlZhbDtcbiAgICB9KTtcbiAgICBjb25zdCBuZXh0OiBOYXZpZ2F0b3JUaWxlIHwgdW5kZWZpbmVkID0gdGhpcy5vcGVuWzBdO1xuXG4gICAgaWYgKCFuZXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLm9wZW4uc2hpZnQoKTtcbiAgICB0aGlzLmNsb3NlZC5wdXNoKG5leHQpO1xuXG4gICAgaWYgKG5leHQuaWQgPT09IHRoaXMuZW5kLmlkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGF0aCgpOiBOYXZpZ2F0b3JUaWxlW10ge1xuICAgIHRoaXMuX3BhdGggPSBbXTtcbiAgICBsZXQgY3VycmVudDogTmF2aWdhdG9yVGlsZSA9IHRoaXMuZW5kO1xuXG4gICAgd2hpbGUgKGN1cnJlbnQuaWQgIT09IHRoaXMuYmVnaW4uaWQpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnROYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gY3VycmVudC5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgICAgdGhpcy5fcGF0aC5wdXNoKGN1cnJlbnQpO1xuXG4gICAgICBpZiAoY3VycmVudE5hdkRhdGEucGFyZW50KSB7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50TmF2RGF0YS5wYXJlbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fcGF0aC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gIH1cblxuICBwcml2YXRlIGFkZFRvRXhwbG9yZWQodGlsZTogTmF2aWdhdG9yVGlsZSk6IHZvaWQge1xuICAgIGlmICghY29udGFpbnModGhpcy5yZWdpc3RlcmVkVGlsZXMsIHRpbGUpKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyZWRUaWxlcy5wdXNoKHRpbGUpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaWQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IHVuaXF1ZUlkIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgTmF2aWdhdG9yIGZyb20gJy4vTmF2aWdhdG9yJztcbmltcG9ydCBOYXZpZ2F0b3JUaWxlIGZyb20gJy4vTmF2aWdhdG9yVGlsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmlnYXRvckRhdGEgaW1wbGVtZW50cyBpZCB7XG4gIGlkOiBudW1iZXI7XG4gIGhWYWw6IG51bWJlcjsgLy8gZGlzdGFuY2UgZnJvbSBlbmRcbiAgZ1ZhbDogbnVtYmVyOyAvLyBkaXN0YW5jZSBmcm9tIHN0YXJ0XG4gIGZWYWw6IG51bWJlcjsgLy8gZ0Nvc3QgKyBoQ29zdFxuICBwYXJlbnQ6IE5hdmlnYXRvclRpbGU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG5hdmlnYXRvcjogTmF2aWdhdG9yKSB7XG4gICAgdGhpcy5pZCA9IG5hdmlnYXRvci5pZDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgaWQsIHBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgTmF2aWdhdG9yIGZyb20gJy4vTmF2aWdhdG9yJztcbmltcG9ydCBOYXZpZ2F0b3JEYXRhIGZyb20gJy4vTmF2aWdhdG9yRGF0YSc7XG5pbXBvcnQgeyBjb250YWlucywgdW5pcXVlSWQsIHJlbW92ZUZyb21BcnJheSwgZmluZEluZGV4IH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuLi9jb21tb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0b3JUaWxlIGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSWQoKTtcbiAgaXNPYnN0YWNsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgbmF2aWdhdG9yczogTmF2aWdhdG9yRGF0YVtdID0gW107XG5cbiAgY29uc3RydWN0b3IocmVhZG9ubHkgcG9zaXRpb246IFZlY3Rvcikge31cblxuICByZWdpc3Rlck5hdmlnYXRvckRhdGEobmF2aWdhdG9yOiBOYXZpZ2F0b3IpOiBib29sZWFuIHtcbiAgICBjb25zdCBuYXZpZ2F0aW9uRGF0YTogTmF2aWdhdG9yRGF0YSA9IG5ldyBOYXZpZ2F0b3JEYXRhKG5hdmlnYXRvcik7XG5cbiAgICBpZiAoY29udGFpbnModGhpcy5uYXZpZ2F0b3JzLCBuYXZpZ2F0aW9uRGF0YSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLm5hdmlnYXRvcnMucHVzaChuYXZpZ2F0aW9uRGF0YSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBkZXJlZ2lzdGVyTmF2aWdhdG9yRGF0YShuYXZpZ2F0b3I6IE5hdmlnYXRvcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSB0aGlzLmdldE5hdmlnYXRvckRhdGEobmF2aWdhdG9yKTtcbiAgICByZXR1cm4gcmVtb3ZlRnJvbUFycmF5KHRoaXMubmF2aWdhdG9ycywgbmF2RGF0YSk7XG4gIH1cblxuICBnZXROYXZpZ2F0b3JEYXRhKG5hdmlnYXRvcjogTmF2aWdhdG9yKTogTmF2aWdhdG9yRGF0YSB7XG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IGZpbmRJbmRleCh0aGlzLm5hdmlnYXRvcnMsIG5hdmlnYXRvcik7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0b3JzW2luZGV4XTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhOiBOYXZpZ2F0b3JEYXRhID0gbmV3IE5hdmlnYXRvckRhdGEobmF2aWdhdG9yKTtcbiAgICB0aGlzLm5hdmlnYXRvcnMucHVzaChkYXRhKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGlzRGlhZ29uYWwoeyBwb3NpdGlvbiB9OiBOYXZpZ2F0b3JUaWxlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueCAhPT0gcG9zaXRpb24ueCAmJiB0aGlzLnBvc2l0aW9uLnkgIT09IHBvc2l0aW9uLnk7XG4gIH1cbn1cbiIsImltcG9ydCBHcmlkIGZyb20gJy4vR3JpZCc7XG5pbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuaW1wb3J0IHsgY29udGFpbnMsIGZpbmRJbmRleCwgcmFuZG9tSW50IH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgeyByb3cgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzdGFjbGVzIHtcbiAgcHJpdmF0ZSByZWFkb25seSBvcGVuTGlzdDogTmF2aWdhdG9yVGlsZVtdID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgY2xvc2VkTGlzdDogTmF2aWdhdG9yVGlsZVtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBHcmlkKSB7XG4gICAgdGhpcy5vcGVuTGlzdCA9IGdyaWQudGlsZXM7XG4gIH1cblxuICBnZXQgbGlzdCgpOiBOYXZpZ2F0b3JUaWxlW10ge1xuICAgIHJldHVybiB0aGlzLmNsb3NlZExpc3Q7XG4gIH1cblxuICBhZGQodGlsZTogTmF2aWdhdG9yVGlsZSk6IGJvb2xlYW4ge1xuICAgIHRpbGUuaXNPYnN0YWNsZSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZSh0cnVlLCB0aWxlKTtcbiAgfVxuXG4gIHJlbW92ZSh0aWxlOiBOYXZpZ2F0b3JUaWxlKTogYm9vbGVhbiB7XG4gICAgdGlsZS5pc09ic3RhY2xlID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZShmYWxzZSwgdGlsZSk7XG4gIH1cblxuICBhZGRSYW5kb20oY291bnQ6IG51bWJlciA9IDEpOiBOYXZpZ2F0b3JUaWxlIHwgcm93IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZU11bHRpcGxlUmFuZG9tKHRydWUsIGNvdW50KTtcbiAgfVxuXG4gIHJlbW92ZVJhbmRvbShjb3VudDogbnVtYmVyID0gMSk6IE5hdmlnYXRvclRpbGUgfCByb3cgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTXVsdGlwbGVSYW5kb20oZmFsc2UsIGNvdW50KTtcbiAgfVxuXG4gIGdldFJhbmRvbU9wZW4oKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmdldFJhbmRvbSh0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmFuZG9tKG9wZW46IGJvb2xlYW4pOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3QgbGlzdCA9IG9wZW4gPyB0aGlzLm9wZW5MaXN0IDogdGhpcy5jbG9zZWRMaXN0O1xuICAgIGNvbnN0IHJhbmRvbTogbnVtYmVyID0gcmFuZG9tSW50KDAsIGxpc3QubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgdGlsZSA9IGxpc3RbcmFuZG9tXTtcbiAgICByZXR1cm4gdGlsZSA/IHRpbGUgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBtYW5pcHVsYXRlTXVsdGlwbGVSYW5kb20oXG4gICAgYWRkOiBib29sZWFuLFxuICAgIGNvdW50OiBudW1iZXJcbiAgKTogTmF2aWdhdG9yVGlsZSB8IHJvdyB8IG51bGwge1xuICAgIGNvbnN0IHRpbGVzOiByb3cgPSBbXTtcblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCB0aWxlOiBOYXZpZ2F0b3JUaWxlID0gdGhpcy5tYW5pcHVsYXRlU2luZ2xlUmFuZG9tKGFkZCk7XG4gICAgICAgIHRpbGVzLnB1c2godGlsZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb3VudCA9PT0gMSA/IHRpbGVzWzBdIDogdGlsZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIG1hbmlwdWxhdGVTaW5nbGVSYW5kb20oYWRkOiBib29sZWFuKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIGNvbnN0IHRpbGUgPSB0aGlzLmdldFJhbmRvbShhZGQpO1xuXG4gICAgaWYgKHRpbGUpIHtcbiAgICAgIHRoaXMubWFuaXB1bGF0ZShhZGQsIHRpbGUpO1xuICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIG1hbmlwdWxhdGUoYWRkOiBib29sZWFuLCB0aWxlOiBOYXZpZ2F0b3JUaWxlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaXNJbnZhbGlkOiBib29sZWFuID0gYWRkID8gdGlsZS5pc09ic3RhY2xlIDogIXRpbGUuaXNPYnN0YWNsZTtcblxuICAgIGlmIChpc0ludmFsaWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgbGlzdDogTmF2aWdhdG9yVGlsZVtdO1xuICAgIGxldCBvdGhlckxpc3Q6IE5hdmlnYXRvclRpbGVbXTtcblxuICAgIGlmIChhZGQpIHtcbiAgICAgIGxpc3QgPSB0aGlzLm9wZW5MaXN0O1xuICAgICAgb3RoZXJMaXN0ID0gdGhpcy5jbG9zZWRMaXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0ID0gdGhpcy5jbG9zZWRMaXN0O1xuICAgICAgb3RoZXJMaXN0ID0gdGhpcy5vcGVuTGlzdDtcbiAgICB9XG5cbiAgICBpZiAoY29udGFpbnMobGlzdCwgdGlsZSkpIHtcbiAgICAgIHRpbGUuaXNPYnN0YWNsZSA9IGFkZDtcbiAgICAgIGNvbnN0IGluZGV4ID0gZmluZEluZGV4KGxpc3QsIHRpbGUpO1xuICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgb3RoZXJMaXN0LnB1c2godGlsZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBHcmlkIGZyb20gJy4vR3JpZCc7XG5pbXBvcnQgTmF2aWdhdG9yIGZyb20gJy4vTmF2aWdhdG9yJztcbmltcG9ydCBOYXZpZ2F0b3JEYXRhIGZyb20gJy4vTmF2aWdhdG9yRGF0YSc7XG5pbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuaW1wb3J0IE9ic3RhY2xlcyBmcm9tICcuL09ic3RhY2xlcyc7XG5cbmV4cG9ydCB7IEdyaWQsIE5hdmlnYXRvciwgTmF2aWdhdG9yRGF0YSwgTmF2aWdhdG9yVGlsZSwgT2JzdGFjbGVzIH07XG4iLCJpbXBvcnQgeyBWZWN0b3IsIFNoYXBlIH0gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVhZFRyZWUge1xuICBjaGlsZHJlbjogUXVhZFRyZWVbXSA9IFtdO1xuICBjb250YWluZWRQb2ludHM6IFZlY3RvcltdID0gW107XG5cbiAgcGFyZW50OiBRdWFkVHJlZTtcbiAgcHJpdmF0ZSBjYXBhY2l0eTogbnVtYmVyID0gMTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2hhcGU6IFNoYXBlLCBwcml2YXRlIHBvaW50czogVmVjdG9yW10pIHtcbiAgICB0aGlzLnN0YXJ0KHBvaW50cyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0KHBvaW50czogVmVjdG9yW10pOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcG9pbnQ6IFZlY3RvciA9IHBvaW50c1tpXTtcblxuICAgICAgaWYgKCF0aGlzLnNoYXBlLmNvbnRhaW5zUG9pbnQocG9pbnQpKSBjb250aW51ZTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVkUG9pbnRzLmxlbmd0aCA8IHRoaXMuY2FwYWNpdHkpIHtcbiAgICAgICAgcG9pbnQucXVhZFRyZWUgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbnRhaW5lZFBvaW50cy5wdXNoKHBvaW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVkUG9pbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZGl2aWRlKHBvaW50cyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpbmRDaGlsZFRoYXRDb250YWlucyhwb2ludDogVmVjdG9yKTogUXVhZFRyZWUge1xuICAgIGNvbnN0IGNvbnRhaW5zOiBib29sZWFuID0gdGhpcy5zaGFwZS5jb250YWluc1BvaW50KHBvaW50KTtcbiAgICBjb25zdCBoYXNDaGlsZHJlbjogYm9vbGVhbiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcblxuICAgIGlmIChjb250YWlucykge1xuICAgICAgaWYgKGhhc0NoaWxkcmVuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbmQoKGNoaWxkOiBRdWFkVHJlZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBjaGlsZC5maW5kQ2hpbGRUaGF0Q29udGFpbnMocG9pbnQpICE9PSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZGl2aWRlKHBvaW50czogVmVjdG9yW10pOiB2b2lkIHtcbiAgICBjb25zdCB7XG4gICAgICB0b3BMZWZ0LFxuICAgICAgdG9wUmlnaHQsXG4gICAgICBib3R0b21MZWZ0LFxuICAgICAgYm90dG9tUmlnaHQsXG4gICAgfSA9IHRoaXMuc2hhcGUuYm91bmRpbmdCb3g7XG4gICAgY29uc3QgeyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQgfSA9IHRoaXMuc2hhcGUuYm91bmRpbmdCb3gubWlkcG9pbnRzO1xuICAgIGNvbnN0IGNlbnRyb2lkOiBWZWN0b3IgPSBWZWN0b3IuRmluZFBvbHlDZW50cm9pZChbXG4gICAgICB0b3AsXG4gICAgICBib3R0b20sXG4gICAgICBsZWZ0LFxuICAgICAgcmlnaHQsXG4gICAgXSk7XG5cbiAgICBjb25zdCBzaGFwZTE6IFNoYXBlID0gbmV3IFNoYXBlKFt0b3BMZWZ0LCB0b3AsIGNlbnRyb2lkLCBsZWZ0XSk7XG4gICAgY29uc3QgcXVhZDE6IFF1YWRUcmVlID0gbmV3IFF1YWRUcmVlKHNoYXBlMSwgcG9pbnRzKTtcblxuICAgIGNvbnN0IHNoYXBlMjogU2hhcGUgPSBuZXcgU2hhcGUoW3RvcCwgdG9wUmlnaHQsIHJpZ2h0LCBjZW50cm9pZF0pO1xuICAgIGNvbnN0IHF1YWQyOiBRdWFkVHJlZSA9IG5ldyBRdWFkVHJlZShzaGFwZTIsIHBvaW50cyk7XG5cbiAgICBjb25zdCBzaGFwZTM6IFNoYXBlID0gbmV3IFNoYXBlKFtjZW50cm9pZCwgcmlnaHQsIGJvdHRvbVJpZ2h0LCBib3R0b21dKTtcbiAgICBjb25zdCBxdWFkMzogUXVhZFRyZWUgPSBuZXcgUXVhZFRyZWUoc2hhcGUzLCBwb2ludHMpO1xuXG4gICAgY29uc3Qgc2hhcGU0OiBTaGFwZSA9IG5ldyBTaGFwZShbY2VudHJvaWQsIGJvdHRvbSwgYm90dG9tTGVmdCwgbGVmdF0pO1xuICAgIGNvbnN0IHF1YWQ0OiBRdWFkVHJlZSA9IG5ldyBRdWFkVHJlZShzaGFwZTQsIHBvaW50cyk7XG5cbiAgICB0aGlzLmNoaWxkcmVuLnB1c2gocXVhZDEsIHF1YWQyLCBxdWFkMywgcXVhZDQpO1xuXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZDogUXVhZFRyZWUpID0+IHtcbiAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBRdWFkVHJlZSBmcm9tICcuL1F1YWRUcmVlJztcblxuZXhwb3J0IHsgUXVhZFRyZWUgfTtcbiIsImltcG9ydCB7IGlkIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB1bmlxdWVJZCB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzam9pbmVkU2V0IGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSWQoKTtcbiAgcmVhZG9ubHkgcG9pbnRzOiBWZWN0b3JbXTtcblxuICBjb25zdHJ1Y3Rvcihwb2ludDogVmVjdG9yKSB7XG4gICAgdGhpcy5wb2ludHMgPSBbcG9pbnRdO1xuICB9XG5cbiAgZXF1YWxzKHsgaWQgfTogRGlzam9pbmVkU2V0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaWQgPT09IGlkO1xuICB9XG5cbiAgbWVyZ2UoeyBwb2ludHMgfTogRGlzam9pbmVkU2V0KTogRGlzam9pbmVkU2V0IHtcbiAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQ6IFZlY3RvcikgPT4ge1xuICAgICAgcG9pbnQuc2V0ID0gdGhpcztcbiAgICAgIHRoaXMucG9pbnRzLnB1c2gocG9pbnQpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZlY3RvciwgTGluZSwgVHJpYW5nbGUgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IFRyaWFuZ3VsYXRpb24gZnJvbSAnLi9Ucmlhbmd1bGF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHVsbCB7XG4gIHJlYWRvbmx5IGxpbmVzOiBMaW5lW10gPSBbXTtcbiAgcHJpdmF0ZSBfcG9pbnRzOiBWZWN0b3JbXTtcbiAgcHJpdmF0ZSByZWFkb25seSB0cmlhbmdsZXM6IFRyaWFuZ2xlW107XG5cbiAgY29uc3RydWN0b3IoeyB0cmlhbmdsZXMgfTogVHJpYW5ndWxhdGlvbikge1xuICAgIHRoaXMudHJpYW5nbGVzID0gdHJpYW5nbGVzO1xuICB9XG5cbiAgZ2V0IHBvaW50cygpOiBWZWN0b3JbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3BvaW50cztcbiAgfVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIGNvbnN0IHVuaXF1ZUxpbmVzOiBMaW5lW10gPSBUcmlhbmdsZS5HZXRVbmlxdWVMaW5lcyh0aGlzLnRyaWFuZ2xlcyk7XG4gICAgY29uc3QgdW5pcXVlUG9pbnRzOiBWZWN0b3JbXSA9IExpbmUuUG9pbnRzRnJvbUFycmF5KHVuaXF1ZUxpbmVzKTtcbiAgICBjb25zdCBjY3dQb2ludHM6IFZlY3RvcltdID0gVmVjdG9yLkFycmFuZ2VQb2ludHNDQ1codW5pcXVlUG9pbnRzKTtcbiAgICB0aGlzLl9wb2ludHMgPSBWZWN0b3IuVW5pcXVlRnJvbUFycmF5KGNjd1BvaW50cyk7XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuX3BvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGluZTogTGluZSA9IG5ldyBMaW5lKHRoaXMuX3BvaW50c1tpIC0gMV0sIHRoaXMuX3BvaW50c1tpXSk7XG4gICAgICB0aGlzLmxpbmVzLnB1c2gobGluZSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2luZ0xpbmU6IExpbmUgPSBuZXcgTGluZShcbiAgICAgIHRoaXMuX3BvaW50c1t0aGlzLl9wb2ludHMubGVuZ3RoIC0gMV0sXG4gICAgICB0aGlzLl9wb2ludHNbMF1cbiAgICApO1xuICAgIHRoaXMubGluZXMucHVzaChjbG9zaW5nTGluZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IExpbmUgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IFRyaWFuZ3VsYXRpb24gZnJvbSAnLi9Ucmlhbmd1bGF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWluaW11bVNwYW5uaW5nVHJlZSB7XG4gIHJlYWRvbmx5IGxpbmVzOiBMaW5lW10gPSBbXTtcbiAgcHJpdmF0ZSBfbm9uTWluU3BhbkxpbmVzOiBMaW5lW10gPSBbXTtcbiAgcHJpdmF0ZSB1bmlxdWVMaW5lczogTGluZVtdID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgdHJpYW5ndWxhdGlvbkxpbmVzOiBMaW5lW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcih7IGxpbmVzIH06IFRyaWFuZ3VsYXRpb24pIHtcbiAgICB0aGlzLnRyaWFuZ3VsYXRpb25MaW5lcyA9IGxpbmVzO1xuICB9XG5cbiAgZ2V0IG5vbk1pblNwYW5MaW5lcygpOiBMaW5lW10ge1xuICAgIHJldHVybiB0aGlzLl9ub25NaW5TcGFuTGluZXM7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLmdldExpbmVzKCk7XG5cbiAgICB0aGlzLnVuaXF1ZUxpbmVzLmZvckVhY2goKGxpbmU6IExpbmUpID0+IGxpbmUubWFrZURpc2pvaW5lZFNldHMoKSk7XG5cbiAgICB0aGlzLnVuaXF1ZUxpbmVzLmZvckVhY2goKGxpbmU6IExpbmUsIGk6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKCFsaW5lLmEuc2V0LmVxdWFscyhsaW5lLmIuc2V0KSkge1xuICAgICAgICBsaW5lLmIuc2V0ID0gbGluZS5hLnNldC5tZXJnZShsaW5lLmIuc2V0KTtcbiAgICAgICAgdGhpcy5saW5lcy5wdXNoKGxpbmUpO1xuICAgICAgICB0aGlzLl9ub25NaW5TcGFuTGluZXNbaV0gPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fbm9uTWluU3BhbkxpbmVzID0gdGhpcy5fbm9uTWluU3BhbkxpbmVzLmZpbHRlcigobGluZTogTGluZSkgPT4gbGluZSk7XG4gIH1cblxuICBwcml2YXRlIGdldExpbmVzKCk6IHZvaWQge1xuICAgIGxldCBsaW5lczogTGluZVtdID0gTGluZS5SZW1vdmVEdXBsaWNhdGVzKHRoaXMudHJpYW5ndWxhdGlvbkxpbmVzKTtcbiAgICB0aGlzLnVuaXF1ZUxpbmVzID0gWy4uLmxpbmVzXTtcbiAgICB0aGlzLl9ub25NaW5TcGFuTGluZXMgPSBbLi4ubGluZXNdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IsIExpbmUsIFRyaWFuZ2xlIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBIdWxsIGZyb20gJy4vSHVsbCc7XG5pbXBvcnQgTWluaW11bVNwYW5uaW5nVHJlZSBmcm9tICcuL01pbmltdW1TcGFubmluZ1RyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmlhbmd1bGF0aW9uIHtcbiAgcmVhZG9ubHkgbGluZXM6IExpbmVbXSA9IFtdO1xuICByZWFkb25seSB0cmlhbmdsZXM6IFRyaWFuZ2xlW10gPSBbXTtcbiAgcmVhZG9ubHkgTVNUOiBNaW5pbXVtU3Bhbm5pbmdUcmVlO1xuICByZWFkb25seSBodWxsOiBIdWxsO1xuICBwcml2YXRlIGhvbGRlclRyaWFuZ2xlOiBUcmlhbmdsZSA9IFRyaWFuZ3VsYXRpb24uTWFrZUhvbGRlclRyaWFuZ2xlKCk7XG5cbiAgY29uc3RydWN0b3IocmVhZG9ubHkgcG9pbnRzOiBWZWN0b3JbXSkge1xuICAgIHRoaXMudHJpYW5nbGVzLnB1c2godGhpcy5ob2xkZXJUcmlhbmdsZSk7XG4gICAgdGhpcy5odWxsID0gbmV3IEh1bGwodGhpcyk7XG4gICAgdGhpcy5NU1QgPSBuZXcgTWluaW11bVNwYW5uaW5nVHJlZSh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMucG9pbnRzLmZvckVhY2goKHBvaW50OiBWZWN0b3IpID0+IHtcbiAgICAgIGNvbnN0IGJhZFRyaWFuZ2xlczogVHJpYW5nbGVbXSA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy50cmlhbmdsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgdHJpYW5nbGU6IFRyaWFuZ2xlID0gdGhpcy50cmlhbmdsZXNbaV07XG5cbiAgICAgICAgaWYgKHRyaWFuZ2xlLmlzUG9pbnRJbkNpcmN1bWNpcmNsZShwb2ludCkpIHtcbiAgICAgICAgICB0aGlzLnRyaWFuZ2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYmFkVHJpYW5nbGVzLnB1c2godHJpYW5nbGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVuaXF1ZUxpbmVzOiBMaW5lW10gPSBUcmlhbmdsZS5HZXRVbmlxdWVMaW5lcyhiYWRUcmlhbmdsZXMpO1xuXG4gICAgICB1bmlxdWVMaW5lcy5mb3JFYWNoKChsaW5lOiBMaW5lKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyaWFuZ2xlOiBUcmlhbmdsZSA9IG5ldyBUcmlhbmdsZShwb2ludCwgbGluZS5hLCBsaW5lLmIpO1xuICAgICAgICB0aGlzLnRyaWFuZ2xlcy5wdXNoKHRyaWFuZ2xlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jbGVhbkhvbGRlclRyaWFuZ2xlKCk7XG4gICAgdGhpcy5hZGRGaW5pc2hlZFRyaWFuZ3VsYXRpb25MaW5lcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgTWFrZUhvbGRlclRyaWFuZ2xlKCk6IFRyaWFuZ2xlIHtcbiAgICBjb25zdCBzaWRlOiBudW1iZXIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICBjb25zdCBhOiBWZWN0b3IgPSBuZXcgVmVjdG9yKHsgeDogc2lkZSAvIDIsIHk6IC1zaWRlIH0pO1xuICAgIGNvbnN0IGI6IFZlY3RvciA9IG5ldyBWZWN0b3IoeyB4OiAtc2lkZSwgeTogc2lkZSB9KTtcbiAgICBjb25zdCBjOiBWZWN0b3IgPSBuZXcgVmVjdG9yKHsgeDogc2lkZSwgeTogc2lkZSB9KTtcblxuICAgIHJldHVybiBuZXcgVHJpYW5nbGUoYSwgYiwgYyk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFuSG9sZGVyVHJpYW5nbGUoKTogdm9pZCB7XG4gICAgY29uc3QgeyBhLCBiLCBjIH0gPSB0aGlzLmhvbGRlclRyaWFuZ2xlO1xuXG4gICAgZm9yIChsZXQgaSA9IHRoaXMudHJpYW5nbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCB0cmlhbmdsZSA9IHRoaXMudHJpYW5nbGVzW2ldO1xuXG4gICAgICBpZiAodHJpYW5nbGUuaGFzQW55UG9pbnQoW2EsIGIsIGNdKSkge1xuICAgICAgICB0aGlzLnRyaWFuZ2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRGaW5pc2hlZFRyaWFuZ3VsYXRpb25MaW5lcygpOiB2b2lkIHtcbiAgICB0aGlzLnRyaWFuZ2xlcy5mb3JFYWNoKCh0cmlhbmdsZTogVHJpYW5nbGUpID0+IHtcbiAgICAgIHRoaXMubGluZXMucHVzaCguLi50cmlhbmdsZS5saW5lc0FycmF5KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IERpc2pvaW5lZFNldCBmcm9tICcuL0Rpc2pvaW5lZFNldCc7XG5pbXBvcnQgSHVsbCBmcm9tICcuL0h1bGwnO1xuaW1wb3J0IE1pbmltdW1TcGFubmluZ1RyZWUgZnJvbSAnLi9NaW5pbXVtU3Bhbm5pbmdUcmVlJztcbmltcG9ydCBUcmlhbmd1bGF0aW9uIGZyb20gJy4vVHJpYW5ndWxhdGlvbic7XG5cbmV4cG9ydCB7IERpc2pvaW5lZFNldCwgSHVsbCwgTWluaW11bVNwYW5uaW5nVHJlZSwgVHJpYW5ndWxhdGlvbiB9O1xuIiwiY29uc3QgY2xvbmVPYmplY3QgPSAob2JqZWN0OiBhbnkpID0+ICh7IC4uLm9iamVjdCB9KTtcblxuY29uc3QgY2xvbmVPYmplY3RBcnJheSA9IChhcnJheTogYW55KSA9PiBhcnJheS5tYXAoY2xvbmVPYmplY3QpO1xuXG5leHBvcnQgeyBjbG9uZU9iamVjdCwgY2xvbmVPYmplY3RBcnJheSB9O1xuIiwiaW1wb3J0IHsgaWQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuY29uc3QgY29udGFpbnMgPSAoYXJyYXk6IGlkW10sIGVsZW1lbnQ6IGlkKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBmaW5kSW5kZXgoYXJyYXksIGVsZW1lbnQpICE9PSAtMTtcbn07XG5cbmNvbnN0IGZpbmRJbmRleCA9IChhcnJheTogaWRbXSwgZmluZDogaWQpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gYXJyYXkuZmluZEluZGV4KChlbGVtZW50OiBpZCkgPT4gZWxlbWVudC5pZCA9PT0gZmluZC5pZCk7XG59O1xuXG5jb25zdCByZW1vdmVGcm9tQXJyYXkgPSAoYXJyYXk6IGlkW10sIGZpbmQ6IGlkKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IGluZGV4OiBudW1iZXIgPSBmaW5kSW5kZXgoYXJyYXksIGZpbmQpO1xuICByZXR1cm4gcmVtb3ZlRnJvbUFycmF5QXRJbmRleChhcnJheSwgaW5kZXgpO1xufTtcblxuY29uc3QgcmVtb3ZlRnJvbUFycmF5QXRJbmRleCA9IChhcnJheTogaWRbXSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IGFycmF5Lmxlbmd0aCkge1xuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgeyBjb250YWlucywgZmluZEluZGV4LCByZW1vdmVGcm9tQXJyYXksIHJlbW92ZUZyb21BcnJheUF0SW5kZXggfTtcbiIsImltcG9ydCB7IGNsb25lT2JqZWN0LCBjbG9uZU9iamVjdEFycmF5IH0gZnJvbSAnLi9jbG9uZSc7XG5pbXBvcnQgeyBjb250YWlucywgZmluZEluZGV4LCByZW1vdmVGcm9tQXJyYXkgfSBmcm9tICcuL2lkJztcbmltcG9ydCB7IFJhZFRvRGVnLCBEZWdUb1JhZCB9IGZyb20gJy4vcmFkRGVnJztcbmltcG9ydCB7IGlzT2RkLCBpc0V2ZW4sIGlzTnVtZXJpYyB9IGZyb20gJy4vbnVtYmVyJztcbmltcG9ydCB7XG4gIHJhbmRvbUludCxcbiAgcmFuZG9tRmxvYXQsXG4gIHJhbmRvbUNvbG9yLFxuICByYW5kb21Qb2ludCxcbiAgcmFuZG9tUG9pbnRzLFxufSBmcm9tICcuL3JhbmRvbSc7XG5pbXBvcnQgeyBzb3J0LCBpbW11dGFibGVPYmplY3RTb3J0IH0gZnJvbSAnLi9zb3J0JztcbmltcG9ydCB0b0Zsb2F0IGZyb20gJy4vdG9GbG9hdCc7XG5pbXBvcnQgdW5pcXVlSWQgZnJvbSAnLi91bmlxdWVJRCc7XG5cbmV4cG9ydCB7XG4gIGNsb25lT2JqZWN0LFxuICBjbG9uZU9iamVjdEFycmF5LFxuICBjb250YWlucyxcbiAgZmluZEluZGV4LFxuICByZW1vdmVGcm9tQXJyYXksXG4gIFJhZFRvRGVnLFxuICBEZWdUb1JhZCxcbiAgaXNPZGQsXG4gIGlzRXZlbixcbiAgaXNOdW1lcmljLFxuICByYW5kb21JbnQsXG4gIHJhbmRvbUZsb2F0LFxuICByYW5kb21Db2xvcixcbiAgc29ydCxcbiAgaW1tdXRhYmxlT2JqZWN0U29ydCxcbiAgdG9GbG9hdCxcbiAgdW5pcXVlSWQsXG4gIHJhbmRvbVBvaW50LFxuICByYW5kb21Qb2ludHMsXG59O1xuIiwiY29uc3QgaXNPZGQgPSAobjogbnVtYmVyKSA9PiBNYXRoLmFicyhuICUgMikgPT09IDE7XG5cbmNvbnN0IGlzRXZlbiA9IChuOiBudW1iZXIpOiBib29sZWFuID0+IG4gJSAyID09PSAwO1xuXG5jb25zdCBpc051bWVyaWMgPSAobjogbnVtYmVyKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuLnRvU3RyaW5nKCkpKSAmJiBpc0Zpbml0ZShuKTtcbn07XG5cbmV4cG9ydCB7IGlzT2RkLCBpc0V2ZW4sIGlzTnVtZXJpYyB9O1xuIiwiY29uc3QgUmFkVG9EZWcgPSAocmFkOiBudW1iZXIpOiBudW1iZXIgPT4gcmFkICogKDE4MCAvIE1hdGguUEkpO1xuXG5jb25zdCBEZWdUb1JhZCA9IChkZWc6IG51bWJlcik6IG51bWJlciA9PiBkZWcgKiAoTWF0aC5QSSAvIDE4MCk7XG5cbmV4cG9ydCB7IFJhZFRvRGVnLCBEZWdUb1JhZCB9O1xuIiwiaW1wb3J0IFZlY3RvciBmcm9tICcuLi9jb21tb24vVmVjdG9yJztcbmltcG9ydCBCb3VuZGluZ0JveCBmcm9tICcuLi9jb21tb24vQm91bmRpbmdCb3gnO1xuXG5jb25zdCByYW5kb21JbnQgPSAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIE1hdGgucm91bmQocmFuZG9tRmxvYXQobWluLCBtYXgpKTtcbn07XG5cbmNvbnN0IHJhbmRvbUZsb2F0ID0gKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG59O1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgY29uc3QgciA9IHJhbmRvbUludCgwLCAyNTUpO1xuICBjb25zdCBnID0gcmFuZG9tSW50KDAsIDI1NSk7XG4gIGNvbnN0IGIgPSByYW5kb21JbnQoMCwgMjU1KTtcbiAgcmV0dXJuIGByZ2IoJHtyfSwke2d9LCR7Yn0pYDtcbn07XG5cbmNvbnN0IHJhbmRvbVBvaW50ID0gKHtcbiAgdG9wTGVmdCxcbiAgdG9wUmlnaHQsXG4gIGJvdHRvbUxlZnQsXG59OiBCb3VuZGluZ0JveCk6IFZlY3RvciA9PiB7XG4gIGNvbnN0IHggPSByYW5kb21JbnQodG9wTGVmdC54LCB0b3BSaWdodC54KTtcbiAgY29uc3QgeSA9IHJhbmRvbUludChib3R0b21MZWZ0LnksIHRvcExlZnQueSk7XG5cbiAgcmV0dXJuIG5ldyBWZWN0b3IoeyB4LCB5IH0pO1xufTtcblxuY29uc3QgcmFuZG9tUG9pbnRzID0gKGNvdW50OiBudW1iZXIsIGJveDogQm91bmRpbmdCb3gpOiBWZWN0b3JbXSA9PiB7XG4gIGNvbnN0IHBvaW50czogVmVjdG9yW10gPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICBwb2ludHMucHVzaChyYW5kb21Qb2ludChib3gpKTtcbiAgfVxuXG4gIHJldHVybiBwb2ludHM7XG59O1xuXG5leHBvcnQgeyByYW5kb21JbnQsIHJhbmRvbUZsb2F0LCByYW5kb21Db2xvciwgcmFuZG9tUG9pbnQsIHJhbmRvbVBvaW50cyB9O1xuIiwiaW1wb3J0IHsgY2xvbmVPYmplY3RBcnJheSB9IGZyb20gJy4vY2xvbmUnO1xuXG5jb25zdCBzb3J0ID0gKGFycmF5OiBhbnlbXSwgcHJvcDogc3RyaW5nKTogYW55W10gPT4ge1xuICByZXR1cm4gYXJyYXkuc29ydCgoYTogYW55LCBiOiBhbnkpID0+IGFbcHJvcF0gLSBiW3Byb3BdKTtcbn07XG5cbmNvbnN0IGltbXV0YWJsZU9iamVjdFNvcnQgPSAoYXJyYXk6IGFueVtdLCBwcm9wOiBzdHJpbmcpOiBhbnlbXSA9PiB7XG4gIGNvbnN0IGNsb25lOiBhbnlbXSA9IGNsb25lT2JqZWN0QXJyYXkoYXJyYXkpO1xuICByZXR1cm4gc29ydChjbG9uZSwgcHJvcCk7XG59O1xuXG5leHBvcnQgeyBzb3J0LCBpbW11dGFibGVPYmplY3RTb3J0IH07XG4iLCJjb25zdCBmbG9hdFByZWNpc2lvbjogbnVtYmVyID0gMjtcblxuY29uc3QgdG9GbG9hdCA9IChudW1iZXI6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIHJldHVybiBOdW1iZXIobnVtYmVyLnRvRml4ZWQoZmxvYXRQcmVjaXNpb24pKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvRmxvYXQ7XG4iLCJsZXQgaWQgPSAwO1xuXG5jb25zdCB1bmlxdWVJZCA9ICgpOiBudW1iZXIgPT4gaWQrKztcblxuZXhwb3J0IGRlZmF1bHQgdW5pcXVlSWQ7XG4iXSwic291cmNlUm9vdCI6IiJ9