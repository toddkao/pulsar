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

/***/ "./node_modules/worker-loader/dist/cjs.js?publicPath=dist/&name=worker.js!./src/worker/worker.ts":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/worker-loader/dist/cjs.js?publicPath=dist/&name=worker.js!./src/worker/worker.ts ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
  return new Worker("dist/" + "worker.js");
};

/***/ }),

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
/* harmony import */ var _worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worker */ "./src/worker/index.ts");
/* harmony import */ var _pathfinding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pathfinding */ "./src/pathfinding/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return _pathfinding__WEBPACK_IMPORTED_MODULE_1__["Grid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navigator", function() { return _pathfinding__WEBPACK_IMPORTED_MODULE_1__["Navigator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavigatorTile", function() { return _pathfinding__WEBPACK_IMPORTED_MODULE_1__["NavigatorTile"]; });

/* harmony import */ var _triangulation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./triangulation */ "./src/triangulation/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Triangulation", function() { return _triangulation__WEBPACK_IMPORTED_MODULE_2__["Triangulation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hull", function() { return _triangulation__WEBPACK_IMPORTED_MODULE_2__["Hull"]; });

/* harmony import */ var _quadtree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./quadtree */ "./src/quadtree/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuadTree", function() { return _quadtree__WEBPACK_IMPORTED_MODULE_3__["QuadTree"]; });

/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common */ "./src/common/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return _common__WEBPACK_IMPORTED_MODULE_4__["Vector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return _common__WEBPACK_IMPORTED_MODULE_4__["Line"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Triangle", function() { return _common__WEBPACK_IMPORTED_MODULE_4__["Triangle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return _common__WEBPACK_IMPORTED_MODULE_4__["Shape"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoundingBox", function() { return _common__WEBPACK_IMPORTED_MODULE_4__["BoundingBox"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./src/util/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uniqueId", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["uniqueId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sort", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["sort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "immutableObjectSort", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["immutableObjectSort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["contains"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadToDeg", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["RadToDeg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DegToRad", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["DegToRad"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeFromArray", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["removeFromArray"]; });

/* harmony import */ var _ecs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ecs */ "./src/ecs/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _ecs__WEBPACK_IMPORTED_MODULE_6__["Entity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _ecs__WEBPACK_IMPORTED_MODULE_6__["Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Updater", function() { return _ecs__WEBPACK_IMPORTED_MODULE_6__["Updater"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomPoint", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["randomPoint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomPoints", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["randomPoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomInt", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["randomInt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomFloat", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["randomFloat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomColor", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["randomColor"]; });












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


/***/ }),

/***/ "./src/worker/index.ts":
/*!*****************************!*\
  !*** ./src/worker/index.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var worker_loader_publicPath_dist_name_worker_js_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-loader?publicPath=dist/&name=worker.js!./worker */ "./node_modules/worker-loader/dist/cjs.js?publicPath=dist/&name=worker.js!./src/worker/worker.ts");
/* harmony import */ var worker_loader_publicPath_dist_name_worker_js_worker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(worker_loader_publicPath_dist_name_worker_js_worker__WEBPACK_IMPORTED_MODULE_0__);
///<reference path="../typings/worker.d.ts" />

const worker = new worker_loader_publicPath_dist_name_worker_js_worker__WEBPACK_IMPORTED_MODULE_0___default.a();
console.log(worker);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3dvcmtlci93b3JrZXIudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2NvbW1vbi9Cb3VuZGluZ0JveC50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvY29tbW9uL0Nsb2NrLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9jb21tb24vTGluZS50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvY29tbW9uL0xpbmVJbnRlcnNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2NvbW1vbi9NYXRyaXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2NvbW1vbi9TaGFwZS50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvY29tbW9uL1RyaWFuZ2xlLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9jb21tb24vVmVjdG9yLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9jb21tb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2Vjcy9Db21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2Vjcy9FbnRpdHkudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2Vjcy9VcGRhdGVyL0VudGl0eVVwZGF0ZXIudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2Vjcy9VcGRhdGVyL0ludm9rZS50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvZWNzL1VwZGF0ZXIvSW52b2tlUmVwZWF0aW5nLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9lY3MvVXBkYXRlci9VcGRhdGVyLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9lY3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9wYXRoZmluZGluZy9HcmlkLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9wYXRoZmluZGluZy9OYXZpZ2F0b3IudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3BhdGhmaW5kaW5nL05hdmlnYXRvckRhdGEudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3BhdGhmaW5kaW5nL05hdmlnYXRvclRpbGUudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3BhdGhmaW5kaW5nL09ic3RhY2xlcy50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvcGF0aGZpbmRpbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3F1YWR0cmVlL1F1YWRUcmVlLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9xdWFkdHJlZS9pbmRleC50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvdHJpYW5ndWxhdGlvbi9EaXNqb2luZWRTZXQudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3RyaWFuZ3VsYXRpb24vSHVsbC50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvdHJpYW5ndWxhdGlvbi9NaW5pbXVtU3Bhbm5pbmdUcmVlLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy90cmlhbmd1bGF0aW9uL1RyaWFuZ3VsYXRpb24udHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3RyaWFuZ3VsYXRpb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvY2xvbmUudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvaWQudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvbnVtYmVyLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy91dGlsL3JhZERlZy50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvdXRpbC9yYW5kb20udHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvc29ydC50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvdXRpbC90b0Zsb2F0LnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy91dGlsL3VuaXF1ZUlELnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy93b3JrZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4QztBQUNoQjtBQUNKO0FBRTFCOzs7SUFHSTtBQUVXO0lBZWIsWUFBNkIsTUFBZ0I7UUFBaEIsV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBUztRQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSwrQ0FBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLCtDQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLCtDQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSwrQ0FBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELEtBQUs7UUFDSCxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sV0FBVztRQUNqQixNQUFNLE9BQU8sR0FBYSxpRUFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sT0FBTyxHQUFhLGlFQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFaEUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksK0NBQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksK0NBQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksK0NBQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksK0NBQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU8sU0FBUztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSw2Q0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSw2Q0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSw2Q0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFE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VUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNsRCxTQUFTO1FBQ1QsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekIsa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxHQUFZLElBQUksc0RBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxHQUFZLElBQUksc0RBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxHQUFZLElBQUksc0RBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxHQUFZLElBQUksc0RBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sSUFBSSxHQUFZLElBQUksc0RBQU8sQ0FDL0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUNiLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFDYixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQ2IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUNkLENBQUM7UUFDRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osTUFBTSxjQUFjLEdBQ2xCLHVEQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSx1REFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsT0FBTyxjQUFjLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxzREFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVPLElBQUk7UUFDVixNQUFNLENBQUMsR0FBWSxJQUFJLHNEQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxHQUFZLElBQUksc0RBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxHQUFZLElBQUksc0RBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLEdBQVksSUFBSSxzREFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxJQUFJLEdBQVksSUFBSSxzREFBTyxDQUMvQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQ2IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUNiLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFDYixDQUFDLENBQUMsU0FBUyxFQUFFLENBQ2QsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDakQsQ0FBQztJQUVPLElBQUk7UUFDVixNQUFNLENBQUMsR0FBWSxJQUFJLHNEQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxHQUFZLElBQUksc0RBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxHQUFZLElBQUksc0RBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLEdBQVksSUFBSSxzREFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxJQUFJLEdBQVksSUFBSSxzREFBTyxDQUMvQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQ2IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUNiLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFDYixDQUFDLENBQUMsU0FBUyxFQUFFLENBQ2QsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDakQsQ0FBQztJQUVPLFlBQVk7UUFDbEIsTUFBTSxDQUFDLEdBQVksSUFBSSxzREFBTyxDQUM1QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQ2pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQ2xCLENBQUM7UUFDRixNQUFNLENBQUMsR0FBWSxJQUFJLHNEQUFPLENBQzVCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQ2pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FDbEIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxHQUFZLElBQUksc0RBQU8sQ0FDNUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQ2pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUNsQixDQUFDO1FBQ0YsTUFBTSxDQUFDLEdBQVksSUFBSSxzREFBTyxDQUM1QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQ2pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQ2xCLENBQUM7UUFFRixNQUFNLFVBQVUsR0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pELE1BQU0sVUFBVSxHQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFFNUQsTUFBTSxZQUFZLEdBQVksVUFBVSxJQUFJLENBQUMsSUFBSSxVQUFVLElBQUksQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sWUFBWSxHQUFZLFVBQVUsSUFBSSxDQUFDLElBQUksVUFBVSxJQUFJLENBQUMsQ0FBQztRQUVqRSxPQUFPLFlBQVksSUFBSSxZQUFZLENBQUM7SUFDdEMsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7O0FDdkhEO0FBQUE7QUFBQTtBQUFBO0FBQUE7SUFDRSxZQUNXLENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVM7UUFIVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQ1QsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUNULE1BQUMsR0FBRCxDQUFDLENBQVE7UUFDVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO0lBQ2pCLENBQUM7SUFFSixTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRjtBQUVELGFBQWMsU0FBUSxPQUFPO0lBQzNCLFlBQ0UsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNBLENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTO1FBRWxCLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQU5ULE1BQUMsR0FBRCxDQUFDLENBQVE7UUFDVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQ1QsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUNULE1BQUMsR0FBRCxDQUFDLENBQVE7UUFDVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO0lBR3BCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxDQUNMLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtZQUNoRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7WUFDaEUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQ2pFLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxhQUFjLFNBQVEsT0FBTztJQUMzQixZQUNFLENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNBLENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVM7UUFFbEIsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFSeEIsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUNULE1BQUMsR0FBRCxDQUFDLENBQVE7UUFDVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQ1QsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUNULE1BQUMsR0FBRCxDQUFDLENBQVE7UUFDVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQ1QsTUFBQyxHQUFELENBQUMsQ0FBUTtJQUdwQixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sQ0FDTCxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksT0FBTyxDQUNULElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxDQUNQLENBQUMsU0FBUyxFQUFFO1lBQ2YsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxPQUFPLENBQ1QsSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLENBQ1AsQ0FBQyxTQUFTLEVBQUU7WUFDZixJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLE9BQU8sQ0FDVCxJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsQ0FDUCxDQUFDLFNBQVMsRUFBRTtZQUNmLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksT0FBTyxDQUNULElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxDQUNQLENBQUMsU0FBUyxFQUFFLENBQ2hCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFb0M7Ozs7Ozs7Ozs7Ozs7QUNqSHJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4QjtBQUNKO0FBQ2M7QUFDUjtBQUVqQjtJQUliLFlBQTRCLE1BQWdCO1FBQWhCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxvREFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBYTtRQUN6QixJQUFJLFVBQVUsR0FBVyxDQUFDLENBQUM7UUFDM0IsTUFBTSxVQUFVLEdBQVcsSUFBSSwrQ0FBTSxDQUFDO1lBQ3BDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNWLENBQUMsRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1NBQzNCLENBQUMsQ0FBQztRQUNILE1BQU0sU0FBUyxHQUFTLElBQUksNkNBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzlCLFVBQVUsRUFBRSxDQUFDO2FBQ2Q7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sbURBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTywrQ0FBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFnQjtRQUN2QyxNQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7UUFDekIsTUFBTSxTQUFTLEdBQWEsK0NBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxNQUFNLENBQUMsR0FBVyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxHQUFXLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLEVBQUUsR0FBUyxJQUFJLDZDQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDaEI7UUFFRCxNQUFNLFVBQVUsR0FBVyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxTQUFTLEdBQVcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUQsTUFBTSxXQUFXLEdBQVMsSUFBSSw2Q0FBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUxRCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXhCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7O0FDdEREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4QjtBQUNKO0FBRVM7QUFDQTtBQUlwQjtJQUliLFlBQXFCLENBQVMsRUFBVyxDQUFTLEVBQVcsQ0FBUztRQUFqRCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVcsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUFXLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFIdEUsT0FBRSxHQUFXLHNEQUFRLEVBQUUsQ0FBQztRQUl0QixNQUFNLEVBQUUsR0FBUyxJQUFJLDZDQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sRUFBRSxHQUFTLElBQUksNkNBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsTUFBTSxFQUFFLEdBQVMsSUFBSSw2Q0FBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTywrQ0FBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxNQUFNLENBQUMsUUFBa0I7UUFDdkIsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsQyxNQUFNLE1BQU0sR0FDVixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sTUFBTSxHQUNWLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUM1QixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsTUFBTSxNQUFNLEdBQ1YsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUM1QixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUvQixPQUFPLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxLQUFhO1FBQ2pDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBCLE1BQU0sQ0FBQyxHQUFXLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsR0FBVyxFQUFFLENBQUM7UUFDckIsTUFBTSxDQUFDLEdBQVcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxHQUFXLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsR0FBVyxFQUFFLENBQUM7UUFDckIsTUFBTSxDQUFDLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxHQUFXLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNwQyxNQUFNLENBQUMsR0FBVyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxHQUFXLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsR0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDcEMsTUFBTSxDQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxHQUFXLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLEdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsR0FBVyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxHQUFXLENBQUMsQ0FBQztRQUVwQixNQUFNLE1BQU0sR0FBWSxJQUFJLCtDQUFPLENBQ2pDLENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsQ0FDRixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBZ0I7UUFDMUIsT0FBTyxDQUNMLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FDaEIsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQXFCO1FBQ3pDLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQW1CLEVBQUUsUUFBa0IsRUFBRSxFQUFFO1lBQ2xFLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBcUI7UUFDekMsTUFBTSxLQUFLLEdBQVcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLDZDQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7OztBQ3BIRDtBQUFBO0FBQUE7QUFBMEM7QUFHM0I7SUFNYixZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBWSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELEtBQUs7UUFDSCxPQUFPLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxTQUFTO1FBQ1AsTUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFXLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQyxNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBVTtRQUN6QixPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxHQUFHLENBQUMsTUFBYztRQUNoQixNQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRXBDLE9BQU8sSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsR0FBRyxDQUFDLE1BQWM7UUFDaEIsTUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFckMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBYztRQUMzQixNQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNsQyxNQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUVsQyxPQUFPLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFNBQVM7UUFDUCxNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsTUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDckMsTUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFFckMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLENBQUMsTUFBYyxFQUFFLEtBQWE7UUFDaEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMvQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRS9DLE9BQU8sSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sQ0FBQyxHQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsR0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFMUIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxhQUFhO1FBQ1gsTUFBTSxLQUFLLEdBQVcsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RCxNQUFNLElBQUksR0FBVyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNELE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFjO1FBQ2xCLE1BQU0sVUFBVSxHQUFXLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QyxNQUFNLENBQUMsR0FBVyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBVyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUV4QyxPQUFPLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFjO1FBQ3JCLE1BQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsT0FBTyw2REFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBYztRQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFjO1FBQ3JCLE1BQU0sVUFBVSxHQUFXLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QyxNQUFNLGdCQUFnQixHQUFXLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwRCxNQUFNLEdBQUcsR0FBVyxVQUFVLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckQsTUFBTSxTQUFTLEdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRFLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQWM7UUFDbkIsT0FBTyxJQUFJLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYztRQUN2QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFjO1FBQ3JCLE1BQU0sQ0FBQyxHQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxHQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTFDLE9BQU8sSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQWdCO1FBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVWLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtZQUMvQixDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFFSCxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNuQixDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUVuQixPQUFPLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFnQjtRQUN0QyxNQUFNLFFBQVEsR0FBVyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsSUFBSSxLQUFLLEdBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBRWxDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLEVBQUU7WUFDbEMsTUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsTUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsT0FBTyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFnQjtRQUNyQyxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQWMsRUFBRSxLQUFhLEVBQUUsS0FBZSxFQUFFLEVBQUU7WUFDbEUsT0FBTyxDQUNMLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFtQixFQUFFLEVBQUU7Z0JBQ3RDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQ2IsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8sS0FBSyxDQUFDLE1BQWM7UUFDMUIsTUFBTSxPQUFPLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFNLFFBQVEsR0FBVyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDM0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7OztBQ3hLRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdDO0FBQ1o7QUFDRjtBQUN3QjtBQUNHO0FBQ3pCO0FBQ007QUFDSjtBQWE1Qjs7Ozs7Ozs7Ozs7OztBQ2xCRjtBQUFBO0FBQUE7QUFBbUM7QUFHcEI7SUFBZjtRQUNXLE9BQUUsR0FBVyxzREFBUSxFQUFFLENBQUM7UUFJakMsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO0lBT3ZDLENBQUM7SUFMQyxLQUFLLEtBQVUsQ0FBQztJQUVoQixJQUFJLEtBQVUsQ0FBQztJQUVmLE1BQU0sQ0FBQyxRQUFrQixJQUFTLENBQUM7Q0FDcEM7Ozs7Ozs7Ozs7Ozs7QUNkRDtBQUFBO0FBQUE7QUFBbUM7QUFFcEI7SUFBZjtRQUNFLE9BQUUsR0FBVyxzREFBUSxFQUFFLENBQUM7UUFHZixlQUFVLEdBQWdCLEVBQUUsQ0FBQztJQUt4QyxDQUFDO0lBSEMsS0FBSyxLQUFVLENBQUM7SUFFaEIsSUFBSSxLQUFVLENBQUM7Q0FDaEI7Ozs7Ozs7Ozs7Ozs7QUNQRDtBQUFBO0FBQWU7SUFHYixZQUE2QixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBRjVCLGFBQVEsR0FBYSxFQUFFLENBQUM7SUFFTyxDQUFDO0lBRWpELEtBQUs7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELEdBQUcsQ0FBQyxNQUFjO1FBQ2hCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixNQUFNLFFBQVEsR0FBc0IsQ0FBQyxTQUFvQixFQUFFLEVBQUU7WUFDM0QsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDMUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFVO1FBQzNCLE1BQU0sUUFBUSxHQUFzQixTQUFTLENBQUMsRUFBRSxDQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQVU7UUFDM0IsTUFBTSxRQUFRLEdBQXNCLFNBQVMsQ0FBQyxFQUFFLENBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLGNBQWMsQ0FDcEIsVUFBdUIsRUFDdkIsUUFBMkI7UUFFM0IsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1lBQzdDLE9BQU87Z0JBQ0wsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUNoQixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3BCLE9BQU8sRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDO2FBQzdCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7OztBQzFERDtBQUFBO0FBQUE7QUFBQTtBQUFxQztBQUdDO0FBRXZCLFlBQWEsU0FBUSxrREFBUztJQUkzQyxZQUNXLE9BQWdCLEVBQ2hCLFNBQW9CLEVBQ3RCLE9BQWU7UUFFdEIsS0FBSyxFQUFFLENBQUM7UUFKQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQU54QixPQUFFLEdBQVcsc0RBQVEsRUFBRSxDQUFDO1FBU3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBa0I7UUFDdkIsSUFBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDO1FBRXJDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7O0FDMUJEO0FBQUE7QUFBQTtBQUE4QjtBQUVmLHFCQUFzQixTQUFRLCtDQUFNO0lBR2pELFlBQ0UsT0FBZ0IsRUFDaEIsU0FBb0IsRUFDcEIsUUFBZ0IsRUFDUixLQUFhO1FBRXJCLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRjVCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFOZixZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBUzVCLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBa0I7UUFDdkIsSUFBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDO1FBRXJDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUU7WUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDakMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDckM7SUFDSCxDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7QUM3QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFxQztBQUNrQjtBQUVsQjtBQUVPO0FBQ2Q7QUFDa0I7QUFFakM7SUFBZjtRQUNFLHFCQUFnQixHQUFjLElBQUksa0RBQVMsRUFBRSxDQUFDO1FBRXRDLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBQzdCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsVUFBSyxHQUFVLElBQUksNkNBQUssRUFBRSxDQUFDO1FBQzNCLGtCQUFhLEdBQWtCLElBQUksc0RBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQXFJakUsQ0FBQztJQWxJQyxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUlELEdBQUcsQ0FBQyxTQUE2QjtRQUMvQixJQUFJLFNBQVMsWUFBWSxrREFBUyxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7SUFJRCxNQUFNLENBQUMsU0FBNkI7UUFDbEMsSUFBSSxTQUFTLFlBQVksa0RBQVMsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDeEM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBSUQsTUFBTSxDQUFDLFNBQTZCO1FBQ2xDLElBQUksU0FBUyxZQUFZLGtEQUFTLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3hDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVELG1CQUFtQixDQUFDLFNBQW9CO1FBQ3RDLE9BQU8sc0RBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxZQUFZLENBQUMsU0FBb0I7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN4QyxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlLENBQUMsU0FBb0I7UUFDbEMsT0FBTyw2REFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELGVBQWUsQ0FBQyxTQUFvQjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBb0IsRUFBRSxJQUFZO1FBQ3ZDLE1BQU0sTUFBTSxHQUFXLElBQUksK0NBQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELGVBQWUsQ0FDYixTQUFvQixFQUNwQixJQUFZLEVBQ1osUUFBZ0IsUUFBUTtRQUV4QixNQUFNLE1BQU0sR0FBb0IsSUFBSSx3REFBZSxDQUNqRCxJQUFJLEVBQ0osU0FBUyxFQUNULElBQUksRUFDSixLQUFLLENBQ04sQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hELE1BQU0sV0FBVyxHQUFXLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDN0MsTUFBTSxXQUFXLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRU8sV0FBVyxDQUFDLFNBQW9CO1FBQ3RDLElBQUksT0FBTyxTQUFTLENBQUMsY0FBYyxLQUFLLFFBQVEsRUFBRTtZQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNoRTthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRU8sTUFBTTtRQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFMUQsTUFBTSxRQUFRLEdBQWEsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTlDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1lBQy9DLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7OztBQ3BKRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvQztBQUNOO0FBQ1U7QUFFRjs7Ozs7Ozs7Ozs7OztBQ0p0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBa0I7QUFDNkM7QUFDVDtBQUNoQjtBQUNnQztBQVN0RDtBQUNtQztBQWVuQztBQW1DZDs7Ozs7Ozs7Ozs7OztBQ2hFRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0M7QUFDQTtBQUNRO0FBRVQ7QUFFbkMsTUFBTSxXQUFXLEdBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztBQUdyQztJQU1iLFlBQW9CLE9BQWEsV0FBVztRQUF4QixTQUFJLEdBQUosSUFBSSxDQUFvQjtRQUw1QyxpQkFBWSxHQUFpQixHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDN0IsY0FBUyxHQUFjLElBQUksa0RBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxVQUFLLEdBQW9CLEVBQUUsQ0FBQztRQUM1QixTQUFJLEdBQVUsRUFBRSxDQUFDO0lBRXFCLENBQUM7SUFFaEQsd0RBQXdEO0lBQ3hELFVBQVU7UUFDUixNQUFNLENBQUMsR0FBRyx1REFBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsR0FBRyx1REFBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELG1EQUFtRDtJQUNuRCxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFTO1FBQ3RCLE1BQU0sR0FBRyxHQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQy9DLENBQUM7SUFFRCxRQUFRO1FBQ04sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sR0FBRyxHQUFRLEVBQUUsQ0FBQztZQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLE1BQU0sR0FBRyxHQUFXLElBQUksOENBQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLElBQUksR0FBa0IsSUFBSSxzREFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7O0FDL0NEO0FBQUE7QUFBQTtBQUE2QztBQUs5QjtJQW1CYixZQUFZLEVBQ1YsSUFBSSxFQUNKLEtBQUssRUFDTCxHQUFHLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEdBQ1U7UUF6QnBCLE9BQUUsR0FBVyxzREFBUSxFQUFFLENBQUM7UUFDaEIsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQUUzQixVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLG9CQUFlLEdBQW9CLEVBQUUsQ0FBQztRQVF0QyxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBVXhCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDL0QsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsbUZBQW1GO0lBQ25GLEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsTUFBTSxZQUFZLEdBQWtCLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0IsWUFBWSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sdUJBQXVCO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBbUIsRUFBRSxFQUFFLENBQ25ELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztJQUNKLENBQUM7SUFFTyxVQUFVLENBQUMsSUFBbUI7UUFDcEMsTUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxNQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRU8sVUFBVSxDQUFDLElBQW1CO1FBQ3BDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNkLE9BQU87U0FDUjtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pELE1BQU0sQ0FBQyxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUQsTUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RCxNQUFNLFNBQVMsR0FBeUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVyRSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLFNBQVM7YUFDVjtZQUVELE1BQU0sZ0JBQWdCLEdBQWtCLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTlCLElBQUksU0FBUyxDQUFDLFVBQVUsRUFBRTtnQkFDeEIsU0FBUzthQUNWO1lBRUQsSUFBSSxzREFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUU7Z0JBQ3BDLFNBQVM7YUFDVjtZQUVELElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUMsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM3QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFO29CQUNuRSxTQUFTO2lCQUNWO2dCQUVELElBQUksQ0FBQyxzREFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMzQjtnQkFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQzlCLGdCQUFnQixDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7aUJBQzlEO3FCQUFNO29CQUNMLGdCQUFnQixDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7aUJBQzlEO2FBQ0Y7WUFFRCxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztTQUN0RTtRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUUvQixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjthQUFNO1lBQ0wsTUFBTSxJQUFJLEdBQW9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQztJQUVPLElBQUksQ0FBQyxJQUFxQjtRQUNoQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxVQUFVLENBQUMsSUFBbUIsRUFBRSxJQUFtQjtRQUN6RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBaUI7UUFDbkM7Ozs7V0FJRztRQUNILE9BQU8sU0FBUyxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBaUI7UUFDbkM7Ozs7V0FJRztRQUNILE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTyxTQUFTLENBQ2YsSUFBbUIsRUFDbkIsU0FBd0IsRUFDeEIsV0FBMEIsRUFDMUIsWUFBMkI7UUFFM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDeEIsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUV0QixJQUFJLFdBQVcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUU7WUFDbkQsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFnQixFQUFFLENBQWdCLEVBQUUsRUFBRTtZQUNwRCxNQUFNLFFBQVEsR0FBa0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELE1BQU0sUUFBUSxHQUFrQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekQsT0FBTyxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBOEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxPQUFPO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxPQUFPLEdBQWtCLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFdEMsT0FBTyxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ25DLE1BQU0sY0FBYyxHQUFrQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFekIsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUN6QixPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0Y7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRU8sYUFBYSxDQUFDLElBQW1CO1FBQ3ZDLElBQUksQ0FBQyxzREFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOztBQTFOYyx3QkFBYyxHQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ1Q1QztBQUFBO0FBQWU7SUFPYixZQUE0QixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQzlDLElBQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUN6QixDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7QUNiRDtBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUM2QjtBQUcxRDtJQU1iLFlBQXFCLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFMckMsT0FBRSxHQUFXLHNEQUFRLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBRXBCLGVBQVUsR0FBb0IsRUFBRSxDQUFDO0lBRUQsQ0FBQztJQUV6QyxxQkFBcUIsQ0FBQyxTQUFvQjtRQUN4QyxNQUFNLGNBQWMsR0FBa0IsSUFBSSxzREFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5FLElBQUksc0RBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxFQUFFO1lBQzdDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxTQUFvQjtRQUMxQyxNQUFNLE9BQU8sR0FBa0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sNkRBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxTQUFvQjtRQUNuQyxNQUFNLEtBQUssR0FBVyx1REFBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFNUQsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBRUQsTUFBTSxJQUFJLEdBQWtCLElBQUksc0RBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQWlCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7OztBQzNDRDtBQUFBO0FBQUE7QUFBeUQ7QUFHMUM7SUFJYixZQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUhiLGFBQVEsR0FBb0IsRUFBRSxDQUFDO1FBQy9CLGVBQVUsR0FBb0IsRUFBRSxDQUFDO1FBR2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBbUI7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQW1CO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxRQUFnQixDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWdCLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTyxTQUFTLENBQUMsSUFBYTtRQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEQsTUFBTSxNQUFNLEdBQVcsdURBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFTyx3QkFBd0IsQ0FDOUIsR0FBWSxFQUNaLEtBQWE7UUFFYixNQUFNLEtBQUssR0FBUSxFQUFFLENBQUM7UUFFdEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLEdBQWtCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtZQUVELE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDdkM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxHQUFZO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakMsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sVUFBVSxDQUFDLEdBQVksRUFBRSxJQUFtQjtRQUNsRCxNQUFNLFNBQVMsR0FBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVwRSxJQUFJLFNBQVMsRUFBRTtZQUNiLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLElBQXFCLENBQUM7UUFDMUIsSUFBSSxTQUEwQixDQUFDO1FBRS9CLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDckIsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDN0I7YUFBTTtZQUNMLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3ZCLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxzREFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUN0QixNQUFNLEtBQUssR0FBRyx1REFBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7OztBQ3ZHRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwQjtBQUNVO0FBQ1E7QUFDQTtBQUNSO0FBRWdDOzs7Ozs7Ozs7Ozs7O0FDTnBFO0FBQUE7QUFBQTtBQUEwQztBQUUzQjtJQU9iLFlBQW1CLEtBQVksRUFBVSxNQUFnQjtRQUF0QyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQU56RCxhQUFRLEdBQWUsRUFBRSxDQUFDO1FBQzFCLG9CQUFlLEdBQWEsRUFBRSxDQUFDO1FBR3ZCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRU8sS0FBSyxDQUFDLE1BQWdCO1FBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sS0FBSyxHQUFXLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO2dCQUFFLFNBQVM7WUFFL0MsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMvQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixNQUFNO2FBQ1A7U0FDRjtJQUNILENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxLQUFhO1FBQ2pDLE1BQU0sUUFBUSxHQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELE1BQU0sV0FBVyxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUV0RCxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksV0FBVyxFQUFFO2dCQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFlLEVBQUUsRUFBRTtvQkFDNUMsT0FBTyxLQUFLLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFnQjtRQUNyQixNQUFNLEVBQ0osT0FBTyxFQUNQLFFBQVEsRUFDUixVQUFVLEVBQ1YsV0FBVyxHQUNaLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDM0IsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN0RSxNQUFNLFFBQVEsR0FBVyw4Q0FBTSxDQUFDLGdCQUFnQixDQUFDO1lBQy9DLEdBQUc7WUFDSCxNQUFNO1lBQ04sSUFBSTtZQUNKLEtBQUs7U0FDTixDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBVSxJQUFJLDZDQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sS0FBSyxHQUFhLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyRCxNQUFNLE1BQU0sR0FBVSxJQUFJLDZDQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sS0FBSyxHQUFhLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyRCxNQUFNLE1BQU0sR0FBVSxJQUFJLDZDQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sS0FBSyxHQUFhLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyRCxNQUFNLE1BQU0sR0FBVSxJQUFJLDZDQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sS0FBSyxHQUFhLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWUsRUFBRSxFQUFFO1lBQ3hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7O0FDaEZEO0FBQUE7QUFBQTtBQUFBO0FBQWtDO0FBRWQ7Ozs7Ozs7Ozs7Ozs7QUNEcEI7QUFBQTtBQUFBO0FBQW1DO0FBR3BCO0lBSWIsWUFBWSxLQUFhO1FBSHpCLE9BQUUsR0FBVyxzREFBUSxFQUFFLENBQUM7UUFJdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBZ0I7UUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO1lBQy9CLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7QUN4QkQ7QUFBQTtBQUFBO0FBQW1EO0FBR3BDO0lBS2IsWUFBWSxFQUFFLFNBQVMsRUFBaUI7UUFKL0IsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUsxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxLQUFLO1FBQ0gsTUFBTSxXQUFXLEdBQVcsZ0RBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sWUFBWSxHQUFhLDRDQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sU0FBUyxHQUFhLDhDQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLE9BQU8sR0FBRyw4Q0FBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVqRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsTUFBTSxJQUFJLEdBQVMsSUFBSSw0Q0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtRQUVELE1BQU0sV0FBVyxHQUFTLElBQUksNENBQUksQ0FDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FDaEIsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7OztBQ2pDRDtBQUFBO0FBQUE7QUFBaUM7QUFHbEI7SUFNYixZQUFZLEVBQUUsS0FBSyxFQUFpQjtRQUwzQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLHFCQUFnQixHQUFXLEVBQUUsQ0FBQztRQUM5QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUNoQix1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFHL0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBRW5FLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBVSxFQUFFLENBQVMsRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVPLFFBQVE7UUFDZCxJQUFJLEtBQUssR0FBVyw0Q0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7O0FDdENEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUQ7QUFDekI7QUFDOEI7QUFFekM7SUFPYixZQUFxQixNQUFnQjtRQUFoQixXQUFNLEdBQU4sTUFBTSxDQUFVO1FBTjVCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUc1QixtQkFBYyxHQUFhLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBR3BFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksNkNBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksNERBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO1lBQ3BDLE1BQU0sWUFBWSxHQUFlLEVBQUUsQ0FBQztZQUVwQyxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuRCxNQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU3QyxJQUFJLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM1QixZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM3QjthQUNGO1lBRUQsTUFBTSxXQUFXLEdBQVcsZ0RBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFbEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVUsRUFBRSxFQUFFO2dCQUNqQyxNQUFNLFFBQVEsR0FBYSxJQUFJLGdEQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVPLE1BQU0sQ0FBQyxrQkFBa0I7UUFDL0IsTUFBTSxJQUFJLEdBQVcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQzdDLE1BQU0sQ0FBQyxHQUFXLElBQUksOENBQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLEdBQVcsSUFBSSw4Q0FBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxHQUFXLElBQUksOENBQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFbkQsT0FBTyxJQUFJLGdEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFFeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5DLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sNkJBQTZCO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBa0IsRUFBRSxFQUFFO1lBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7O0FDcEVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTBDO0FBQ2hCO0FBQzhCO0FBQ1o7QUFFc0I7Ozs7Ozs7Ozs7Ozs7QUNMbEU7QUFBQTtBQUFBO0FBQUEsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLG1CQUFNLE1BQU0sRUFBRyxDQUFDO0FBRXJELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFdkI7Ozs7Ozs7Ozs7Ozs7QUNGekM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBVyxFQUFFLE9BQVcsRUFBVyxFQUFFO0lBQ3JELE9BQU8sU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQVcsRUFBRSxJQUFRLEVBQVUsRUFBRTtJQUNsRCxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFXLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLENBQUMsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBVyxFQUFFLElBQVEsRUFBVyxFQUFFO0lBQ3pELE1BQU0sS0FBSyxHQUFXLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0MsT0FBTyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLEtBQVcsRUFBRSxLQUFhLEVBQVcsRUFBRTtJQUNyRSxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDdEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRXNFOzs7Ozs7Ozs7Ozs7O0FDeEJ4RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdEO0FBQ0k7QUFDZDtBQUNNO0FBT2xDO0FBQ2lDO0FBQ25CO0FBQ0U7QUFzQmhDOzs7Ozs7Ozs7Ozs7O0FDbkNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVuRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQVMsRUFBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFbkQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFTLEVBQVcsRUFBRTtJQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDLENBQUM7QUFFa0M7Ozs7Ozs7Ozs7Ozs7QUNScEM7QUFBQTtBQUFBO0FBQUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFaEUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFFbEM7Ozs7Ozs7Ozs7Ozs7QUNKOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0M7QUFHdEMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFVLEVBQUU7SUFDckQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQVUsRUFBRTtJQUN2RCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO0lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUIsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1QixNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHLENBQUMsRUFDbkIsT0FBTyxFQUNQLFFBQVEsRUFDUixVQUFVLEdBQ0UsRUFBVSxFQUFFO0lBQ3hCLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0MsT0FBTyxJQUFJLHNEQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLEtBQWEsRUFBRSxHQUFnQixFQUFZLEVBQUU7SUFDakUsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBRTVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMvQjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUV3RTs7Ozs7Ozs7Ozs7OztBQ3ZDMUU7QUFBQTtBQUFBO0FBQUE7QUFBMkM7QUFFM0MsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFZLEVBQUUsSUFBWSxFQUFTLEVBQUU7SUFDakQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUMsQ0FBQztBQUVGLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxLQUFZLEVBQUUsSUFBWSxFQUFTLEVBQUU7SUFDaEUsTUFBTSxLQUFLLEdBQVUsK0RBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQztBQUVtQzs7Ozs7Ozs7Ozs7OztBQ1hyQztBQUFBLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQztBQUVqQyxNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQWMsRUFBVSxFQUFFO0lBQ3pDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUM7QUFFYSxzRUFBTyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDTnZCO0FBQUEsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRVgsTUFBTSxRQUFRLEdBQUcsR0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7QUFFckIsdUVBQVEsRUFBQzs7Ozs7Ozs7Ozs7OztBQ0p4QjtBQUFBO0FBQUE7QUFBQSw4Q0FBOEM7QUFDOEI7QUFFNUUsTUFBTSxNQUFNLEdBQVcsSUFBSSwwRkFBTSxFQUFFLENBQUM7QUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBXb3JrZXIoXCJkaXN0L1wiICsgXCJ3b3JrZXIuanNcIik7XG59OyIsImltcG9ydCB7IGxpbWl0cyB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgaW1tdXRhYmxlT2JqZWN0U29ydCB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XG5pbXBvcnQgTGluZSBmcm9tICcuL0xpbmUnO1xuXG4vKlxuKiAhV0FSTklORyFcbiogVGhpcyBjbGFzcyByZWdhcmRzIGl0cyBwb2ludCBvZiBvcmlnaW4gYXQgdGhlIHRvcCBsZWZ0IGNvcm5lci5cbiogKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmRpbmdCb3gge1xuICAvLyBwb2ludHNcbiAgdG9wTGVmdDogVmVjdG9yO1xuICB0b3BSaWdodDogVmVjdG9yO1xuICBib3R0b21SaWdodDogVmVjdG9yO1xuICBib3R0b21MZWZ0OiBWZWN0b3I7XG5cbiAgLy8gbGluZXNcbiAgcHJpdmF0ZSB0b3A6IExpbmU7XG4gIHByaXZhdGUgcmlnaHQ6IExpbmU7XG4gIHByaXZhdGUgYm90dG9tOiBMaW5lO1xuICBwcml2YXRlIGxlZnQ6IExpbmU7XG5cbiAgbGltaXRzOiBsaW1pdHM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBwb2ludHM6IFZlY3RvcltdKSB7XG4gICAgdGhpcy5maW5kQ29ybmVycygpO1xuICAgIHRoaXMubWFrZUxpbmVzKCk7XG4gICAgdGhpcy5maW5kTGltaXRzKCk7XG4gIH1cblxuICBnZXQgbWlkcG9pbnRzKCk6IGxpbWl0cyB7XG4gICAgcmV0dXJuIHRoaXMubGltaXRzO1xuICB9XG5cbiAgZ2V0IGFyZWEoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b3AubGVuZ3RoICogdGhpcy5yaWdodC5sZW5ndGg7XG4gIH1cblxuICBnZXQgbGluZXMoKTogTGluZVtdIHtcbiAgICByZXR1cm4gW3RoaXMudG9wLCB0aGlzLnJpZ2h0LCB0aGlzLmJvdHRvbSwgdGhpcy5sZWZ0XTtcbiAgfVxuXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnRvcFJpZ2h0LnggLSB0aGlzLnRvcExlZnQueDtcbiAgfVxuXG4gIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b3BSaWdodC55IC0gdGhpcy5ib3R0b21SaWdodC55O1xuICB9XG5cbiAgZ3JvdyhuOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnRvcExlZnQgPSB0aGlzLnRvcExlZnQuYWRkKG5ldyBWZWN0b3IoeyB4OiAtbiwgeTogbiB9KSk7XG4gICAgdGhpcy50b3BSaWdodCA9IHRoaXMudG9wUmlnaHQuYWRkKG5ldyBWZWN0b3IoeyB4OiBuLCB5OiBuIH0pKTtcbiAgICB0aGlzLmJvdHRvbUxlZnQgPSB0aGlzLmJvdHRvbUxlZnQuYWRkKG5ldyBWZWN0b3IoeyB4OiAtbiwgeTogLW4gfSkpO1xuICAgIHRoaXMuYm90dG9tUmlnaHQgPSB0aGlzLmJvdHRvbVJpZ2h0LmFkZChuZXcgVmVjdG9yKHsgeDogbiwgeTogLW4gfSkpO1xuICB9XG5cbiAgY2xvbmUoKTogQm91bmRpbmdCb3gge1xuICAgIHJldHVybiBuZXcgQm91bmRpbmdCb3godGhpcy5wb2ludHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kQ29ybmVycygpOiB2b2lkIHtcbiAgICBjb25zdCBzb3J0ZWRYOiBWZWN0b3JbXSA9IGltbXV0YWJsZU9iamVjdFNvcnQodGhpcy5wb2ludHMsICd4Jyk7XG4gICAgY29uc3Qgc29ydGVkWTogVmVjdG9yW10gPSBpbW11dGFibGVPYmplY3RTb3J0KHRoaXMucG9pbnRzLCAneScpO1xuXG4gICAgY29uc3QgZmlyc3RYID0gc29ydGVkWFswXTtcbiAgICBjb25zdCBmaXJzdFkgPSBzb3J0ZWRZWzBdO1xuICAgIGNvbnN0IGxhc3RYID0gc29ydGVkWFtzb3J0ZWRYLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGxhc3RZID0gc29ydGVkWVtzb3J0ZWRZLmxlbmd0aCAtIDFdO1xuXG4gICAgdGhpcy50b3BMZWZ0ID0gbmV3IFZlY3Rvcih7IHg6IGZpcnN0WC54LCB5OiBsYXN0WS55IH0pO1xuICAgIHRoaXMudG9wUmlnaHQgPSBuZXcgVmVjdG9yKHsgeDogbGFzdFgueCwgeTogbGFzdFkueSB9KTtcbiAgICB0aGlzLmJvdHRvbVJpZ2h0ID0gbmV3IFZlY3Rvcih7IHg6IGxhc3RYLngsIHk6IGZpcnN0WS55IH0pO1xuICAgIHRoaXMuYm90dG9tTGVmdCA9IG5ldyBWZWN0b3IoeyB4OiBmaXJzdFgueCwgeTogZmlyc3RZLnkgfSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VMaW5lcygpOiB2b2lkIHtcbiAgICB0aGlzLnRvcCA9IG5ldyBMaW5lKHRoaXMudG9wTGVmdCwgdGhpcy50b3BSaWdodCk7XG4gICAgdGhpcy5yaWdodCA9IG5ldyBMaW5lKHRoaXMudG9wUmlnaHQsIHRoaXMuYm90dG9tUmlnaHQpO1xuICAgIHRoaXMuYm90dG9tID0gbmV3IExpbmUodGhpcy5ib3R0b21SaWdodCwgdGhpcy5ib3R0b21MZWZ0KTtcbiAgICB0aGlzLmxlZnQgPSBuZXcgTGluZSh0aGlzLmJvdHRvbUxlZnQsIHRoaXMudG9wTGVmdCk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRMaW1pdHMoKTogdm9pZCB7XG4gICAgY29uc3QgdG9wOiBWZWN0b3IgPSB0aGlzLnRvcExlZnQubWlkcG9pbnQodGhpcy50b3BSaWdodCk7XG4gICAgY29uc3QgYm90dG9tOiBWZWN0b3IgPSB0aGlzLmJvdHRvbUxlZnQubWlkcG9pbnQodGhpcy5ib3R0b21SaWdodCk7XG4gICAgY29uc3QgbGVmdDogVmVjdG9yID0gdGhpcy50b3BMZWZ0Lm1pZHBvaW50KHRoaXMuYm90dG9tTGVmdCk7XG4gICAgY29uc3QgcmlnaHQ6IFZlY3RvciA9IHRoaXMudG9wUmlnaHQubWlkcG9pbnQodGhpcy5ib3R0b21SaWdodCk7XG4gICAgdGhpcy5saW1pdHMgPSB7IHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodCB9O1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDbG9jayB7XG4gIHByaXZhdGUgc3RhcnRUaW1lOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIG9sZFRpbWU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgZWxhcHNlZFRpbWU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgcnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHJlYWRvbmx5IHRpbWVGdW5jdGlvbjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGltZUZ1bmN0aW9uID0gdHlwZW9mIHBlcmZvcm1hbmNlID09PSAndW5kZWZpbmVkJyA/IERhdGUgOiBwZXJmb3JtYW5jZTtcbiAgfVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLnRpbWVGdW5jdGlvbi5ub3coKTtcbiAgICB0aGlzLm9sZFRpbWUgPSB0aGlzLnN0YXJ0VGltZTtcbiAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcbiAgfVxuXG4gIHN0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gIH1cblxuICBnZXREZWx0YSgpOiBudW1iZXIge1xuICAgIGNvbnN0IG5ld1RpbWU6IG51bWJlciA9IHRoaXMudGltZUZ1bmN0aW9uLm5vdygpO1xuICAgIGNvbnN0IGRpZmZlcmVuY2U6IG51bWJlciA9IChuZXdUaW1lIC0gdGhpcy5vbGRUaW1lKSAvIDEwMDA7XG4gICAgdGhpcy5vbGRUaW1lID0gbmV3VGltZTtcbiAgICB0aGlzLmVsYXBzZWRUaW1lICs9IGRpZmZlcmVuY2U7XG5cbiAgICByZXR1cm4gZGlmZmVyZW5jZTtcbiAgfVxuXG4gIGdldEVsYXBzZWQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGFwc2VkVGltZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgaWQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IHVuaXF1ZUlkIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgRGlzam9pbmVkU2V0IGZyb20gJy4uL3RyaWFuZ3VsYXRpb24vRGlzam9pbmVkU2V0JztcbmltcG9ydCBMaW5lSW50ZXJzZWN0aW9uIGZyb20gJy4vTGluZUludGVyc2VjdGlvbic7XG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZSBpbXBsZW1lbnRzIGlkIHtcbiAgaWQ6IG51bWJlciA9IHVuaXF1ZUlkKCk7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGE6IFZlY3RvciwgcmVhZG9ubHkgYjogVmVjdG9yKSB7fVxuXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hLnN1Yih0aGlzLmIpLm1hZ25pdHVkZSgpO1xuICB9XG5cbiAgZ2V0IG1pZHBvaW50KCk6IFZlY3RvciB7XG4gICAgcmV0dXJuIHRoaXMuYS5taWRwb2ludCh0aGlzLmIpO1xuICB9XG5cbiAgY2xvbmUoKTogTGluZSB7XG4gICAgcmV0dXJuIG5ldyBMaW5lKHRoaXMuYSwgdGhpcy5iKTtcbiAgfVxuXG4gIGVxdWFscyhsaW5lOiBMaW5lKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZXF1YWxzTm9ybWFsOiBib29sZWFuID1cbiAgICAgIHRoaXMuYS5lcXVhbHMobGluZS5hKSAmJiB0aGlzLmIuZXF1YWxzKGxpbmUuYik7XG4gICAgY29uc3QgZXF1YWxzUmV2ZXJzZTogYm9vbGVhbiA9XG4gICAgICB0aGlzLmEuZXF1YWxzKGxpbmUuYikgJiYgdGhpcy5iLmVxdWFscyhsaW5lLmEpO1xuICAgIHJldHVybiBlcXVhbHNOb3JtYWwgfHwgZXF1YWxzUmV2ZXJzZTtcbiAgfVxuXG4gIGludGVyc2VjdHMobGluZTogTGluZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBuZXcgTGluZUludGVyc2VjdGlvbih0aGlzLCBsaW5lKS5pbnRlcnNlY3RzO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uUG9pbnQobGluZTogTGluZSk6IFZlY3RvciB7XG4gICAgcmV0dXJuIG5ldyBMaW5lSW50ZXJzZWN0aW9uKHRoaXMsIGxpbmUpLnBvaW50O1xuICB9XG5cbiAgbWFrZURpc2pvaW5lZFNldHMoKTogdm9pZCB7XG4gICAgdGhpcy5hLnNldCA9IG5ldyBEaXNqb2luZWRTZXQodGhpcy5hKTtcbiAgICB0aGlzLmIuc2V0ID0gbmV3IERpc2pvaW5lZFNldCh0aGlzLmIpO1xuICB9XG5cbiAgc3RhdGljIFBvaW50c0Zyb21BcnJheShsaW5lczogTGluZVtdKTogVmVjdG9yW10ge1xuICAgIHJldHVybiBsaW5lcy5yZWR1Y2UoKGFjY3VtdWxhdG9yOiBWZWN0b3JbXSwgbGluZTogTGluZSkgPT4ge1xuICAgICAgYWNjdW11bGF0b3IucHVzaCguLi5bbGluZS5hLCBsaW5lLmJdKTtcbiAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICB9LCBbXSk7XG4gIH1cblxuICBzdGF0aWMgSXNVbmlxdWUobGluZTogTGluZSwgbGluZXM6IExpbmVbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBsaW5lcy5maW5kKChjdXJyZW50TGluZTogTGluZSkgPT4ge1xuICAgICAgICByZXR1cm4gbGluZS5pZCA9PT0gY3VycmVudExpbmUuaWQgPyBmYWxzZSA6IGxpbmUuZXF1YWxzKGN1cnJlbnRMaW5lKTtcbiAgICAgIH0pID09PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIFJlbW92ZUR1cGxpY2F0ZXMobGluZXM6IExpbmVbXSk6IExpbmVbXSB7XG4gICAgbGV0IGNsb25lOiBMaW5lW10gPSBbLi4ubGluZXNdO1xuXG4gICAgY2xvbmUuc29ydCgoYTogTGluZSwgYjogTGluZSkgPT4gYS5sZW5ndGggLSBiLmxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gY2xvbmUubGVuZ3RoIC0gMTsgaSA+PSAxOyBpLS0pIHtcbiAgICAgIGNvbnN0IGEgPSBjbG9uZVtpXTtcbiAgICAgIGNvbnN0IGIgPSBjbG9uZVtpIC0gMV07XG5cbiAgICAgIGlmIChhLmVxdWFscyhiKSkge1xuICAgICAgICBjbG9uZS5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNYXRyaXgyIH0gZnJvbSAnLi4vY29tbW9uL01hdHJpeCc7XG5pbXBvcnQgeyBpc051bWVyaWMgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCBMaW5lIGZyb20gJy4vTGluZSc7XG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL2NvbW1vbi9WZWN0b3InO1xuXG4vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MaW5lJUUyJTgwJTkzbGluZV9pbnRlcnNlY3Rpb25cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZUludGVyc2VjdGlvbiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgeDE6IG51bWJlcjtcbiAgcHJpdmF0ZSByZWFkb25seSB5MTogbnVtYmVyO1xuICBwcml2YXRlIHJlYWRvbmx5IHgyOiBudW1iZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgeTI6IG51bWJlcjtcbiAgcHJpdmF0ZSByZWFkb25seSB4MzogbnVtYmVyO1xuICBwcml2YXRlIHJlYWRvbmx5IHkzOiBudW1iZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgeDQ6IG51bWJlcjtcbiAgcHJpdmF0ZSByZWFkb25seSB5NDogbnVtYmVyO1xuICBwcml2YXRlIHJlYWRvbmx5IGVmZ2hEZXRlcm1pbmFudDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGluZTE6IExpbmUsIHByaXZhdGUgbGluZTI6IExpbmUpIHtcbiAgICAvLyBwb2ludHNcbiAgICB0aGlzLngxID0gdGhpcy5saW5lMS5hLng7XG4gICAgdGhpcy55MSA9IHRoaXMubGluZTEuYS55O1xuICAgIHRoaXMueDIgPSB0aGlzLmxpbmUxLmIueDtcbiAgICB0aGlzLnkyID0gdGhpcy5saW5lMS5iLnk7XG4gICAgdGhpcy54MyA9IHRoaXMubGluZTIuYS54O1xuICAgIHRoaXMueTMgPSB0aGlzLmxpbmUyLmEueTtcbiAgICB0aGlzLng0ID0gdGhpcy5saW5lMi5iLng7XG4gICAgdGhpcy55NCA9IHRoaXMubGluZTIuYi55O1xuXG4gICAgLy8gc2hhcmVkIG1hdHJpY2VzXG4gICAgY29uc3QgZTogTWF0cml4MiA9IG5ldyBNYXRyaXgyKHRoaXMueDEsIDEsIHRoaXMueDIsIDEpO1xuICAgIGNvbnN0IGY6IE1hdHJpeDIgPSBuZXcgTWF0cml4Mih0aGlzLnkxLCAxLCB0aGlzLnkyLCAxKTtcbiAgICBjb25zdCBnOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIodGhpcy54MywgMSwgdGhpcy54NCwgMSk7XG4gICAgY29uc3QgaDogTWF0cml4MiA9IG5ldyBNYXRyaXgyKHRoaXMueTMsIDEsIHRoaXMueTQsIDEpO1xuICAgIGNvbnN0IGVmZ2g6IE1hdHJpeDIgPSBuZXcgTWF0cml4MihcbiAgICAgIGUuZGV0ZXJtaW5lKCksXG4gICAgICBmLmRldGVybWluZSgpLFxuICAgICAgZy5kZXRlcm1pbmUoKSxcbiAgICAgIGguZGV0ZXJtaW5lKClcbiAgICApO1xuICAgIHRoaXMuZWZnaERldGVybWluYW50ID0gZWZnaC5kZXRlcm1pbmUoKTtcbiAgfVxuXG4gIGdldCBpbnRlcnNlY3RzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFyZVZhbGlkQ29vcmRzOiBib29sZWFuID1cbiAgICAgIGlzTnVtZXJpYyh0aGlzLnBvaW50LngpICYmIGlzTnVtZXJpYyh0aGlzLnBvaW50LnkpO1xuICAgIHJldHVybiBhcmVWYWxpZENvb3JkcyAmJiB0aGlzLmlzT25TZWdtZW50cygpO1xuICB9XG5cbiAgZ2V0IHBvaW50KCk6IFZlY3RvciB7XG4gICAgY29uc3QgeCA9IHRoaXMuZ2V0WCgpO1xuICAgIGNvbnN0IHkgPSB0aGlzLmdldFkoKTtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih7IHgsIHkgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBhOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIodGhpcy54MSwgdGhpcy55MSwgdGhpcy54MiwgdGhpcy55Mik7XG4gICAgY29uc3QgYjogTWF0cml4MiA9IG5ldyBNYXRyaXgyKHRoaXMueDEsIDEsIHRoaXMueDIsIDEpO1xuICAgIGNvbnN0IGM6IE1hdHJpeDIgPSBuZXcgTWF0cml4Mih0aGlzLngzLCB0aGlzLnkzLCB0aGlzLng0LCB0aGlzLnk0KTtcbiAgICBjb25zdCBkOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIodGhpcy54MywgMSwgdGhpcy54NCwgMSk7XG4gICAgY29uc3QgYWJjZDogTWF0cml4MiA9IG5ldyBNYXRyaXgyKFxuICAgICAgYS5kZXRlcm1pbmUoKSxcbiAgICAgIGIuZGV0ZXJtaW5lKCksXG4gICAgICBjLmRldGVybWluZSgpLFxuICAgICAgZC5kZXRlcm1pbmUoKVxuICAgICk7XG5cbiAgICByZXR1cm4gYWJjZC5kZXRlcm1pbmUoKSAvIHRoaXMuZWZnaERldGVybWluYW50O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRZKCk6IG51bWJlciB7XG4gICAgY29uc3QgYTogTWF0cml4MiA9IG5ldyBNYXRyaXgyKHRoaXMueDEsIHRoaXMueTEsIHRoaXMueDIsIHRoaXMueTIpO1xuICAgIGNvbnN0IGI6IE1hdHJpeDIgPSBuZXcgTWF0cml4Mih0aGlzLnkxLCAxLCB0aGlzLnkyLCAxKTtcbiAgICBjb25zdCBjOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIodGhpcy54MywgdGhpcy55MywgdGhpcy54NCwgdGhpcy55NCk7XG4gICAgY29uc3QgZDogTWF0cml4MiA9IG5ldyBNYXRyaXgyKHRoaXMueTMsIDEsIHRoaXMueTQsIDEpO1xuICAgIGNvbnN0IGFiY2Q6IE1hdHJpeDIgPSBuZXcgTWF0cml4MihcbiAgICAgIGEuZGV0ZXJtaW5lKCksXG4gICAgICBiLmRldGVybWluZSgpLFxuICAgICAgYy5kZXRlcm1pbmUoKSxcbiAgICAgIGQuZGV0ZXJtaW5lKClcbiAgICApO1xuXG4gICAgcmV0dXJuIGFiY2QuZGV0ZXJtaW5lKCkgLyB0aGlzLmVmZ2hEZXRlcm1pbmFudDtcbiAgfVxuXG4gIHByaXZhdGUgaXNPblNlZ21lbnRzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGE6IE1hdHJpeDIgPSBuZXcgTWF0cml4MihcbiAgICAgIHRoaXMueDEgLSB0aGlzLngzLFxuICAgICAgdGhpcy54MyAtIHRoaXMueDQsXG4gICAgICB0aGlzLnkxIC0gdGhpcy55MyxcbiAgICAgIHRoaXMueTMgLSB0aGlzLnk0XG4gICAgKTtcbiAgICBjb25zdCBiOiBNYXRyaXgyID0gbmV3IE1hdHJpeDIoXG4gICAgICB0aGlzLngxIC0gdGhpcy54MixcbiAgICAgIHRoaXMueDMgLSB0aGlzLng0LFxuICAgICAgdGhpcy55MSAtIHRoaXMueTIsXG4gICAgICB0aGlzLnkzIC0gdGhpcy55NFxuICAgICk7XG4gICAgY29uc3QgYzogTWF0cml4MiA9IG5ldyBNYXRyaXgyKFxuICAgICAgdGhpcy54MSAtIHRoaXMueDIsXG4gICAgICB0aGlzLngxIC0gdGhpcy54MyxcbiAgICAgIHRoaXMueTEgLSB0aGlzLnkyLFxuICAgICAgdGhpcy55MSAtIHRoaXMueTNcbiAgICApO1xuICAgIGNvbnN0IGQ6IE1hdHJpeDIgPSBuZXcgTWF0cml4MihcbiAgICAgIHRoaXMueDEgLSB0aGlzLngyLFxuICAgICAgdGhpcy54MyAtIHRoaXMueDQsXG4gICAgICB0aGlzLnkxIC0gdGhpcy55MixcbiAgICAgIHRoaXMueTMgLSB0aGlzLnk0XG4gICAgKTtcblxuICAgIGNvbnN0IGRpdmlzaW9uQUI6IG51bWJlciA9IGEuZGV0ZXJtaW5lKCkgLyBiLmRldGVybWluZSgpO1xuICAgIGNvbnN0IGRpdmlzaW9uQ0Q6IG51bWJlciA9IC0oYy5kZXRlcm1pbmUoKSAvIGQuZGV0ZXJtaW5lKCkpO1xuXG4gICAgY29uc3QgaXNPblNlZ21lbnRBOiBib29sZWFuID0gZGl2aXNpb25BQiA+PSAwICYmIGRpdmlzaW9uQUIgPD0gMTtcbiAgICBjb25zdCBpc09uU2VnbWVudEI6IGJvb2xlYW4gPSBkaXZpc2lvbkNEID49IDAgJiYgZGl2aXNpb25DRCA8PSAxO1xuXG4gICAgcmV0dXJuIGlzT25TZWdtZW50QSAmJiBpc09uU2VnbWVudEI7XG4gIH1cbn1cbiIsImNsYXNzIE1hdHJpeDIge1xuICBjb25zdHJ1Y3RvcihcbiAgICByZWFkb25seSBhOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgYjogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGM6IG51bWJlcixcbiAgICByZWFkb25seSBkOiBudW1iZXJcbiAgKSB7fVxuXG4gIGRldGVybWluZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmEgKiB0aGlzLmQgLSB0aGlzLmIgKiB0aGlzLmM7XG4gIH1cbn1cblxuY2xhc3MgTWF0cml4MyBleHRlbmRzIE1hdHJpeDIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhOiBudW1iZXIsXG4gICAgYjogbnVtYmVyLFxuICAgIGM6IG51bWJlcixcbiAgICBkOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgZTogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGY6IG51bWJlcixcbiAgICByZWFkb25seSBnOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgaDogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGk6IG51bWJlclxuICApIHtcbiAgICBzdXBlcihhLCBiLCBjLCBkKTtcbiAgfVxuXG4gIGRldGVybWluZSgpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmEgKiBuZXcgTWF0cml4Mih0aGlzLmUsIHRoaXMuZiwgdGhpcy5oLCB0aGlzLmkpLmRldGVybWluZSgpIC1cbiAgICAgIHRoaXMuYiAqIG5ldyBNYXRyaXgyKHRoaXMuZCwgdGhpcy5mLCB0aGlzLmcsIHRoaXMuaSkuZGV0ZXJtaW5lKCkgK1xuICAgICAgdGhpcy5jICogbmV3IE1hdHJpeDIodGhpcy5kLCB0aGlzLmUsIHRoaXMuZywgdGhpcy5oKS5kZXRlcm1pbmUoKVxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgTWF0cml4NCBleHRlbmRzIE1hdHJpeDMge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhOiBudW1iZXIsXG4gICAgYjogbnVtYmVyLFxuICAgIGM6IG51bWJlcixcbiAgICBkOiBudW1iZXIsXG4gICAgZTogbnVtYmVyLFxuICAgIGY6IG51bWJlcixcbiAgICBnOiBudW1iZXIsXG4gICAgaDogbnVtYmVyLFxuICAgIGk6IG51bWJlcixcbiAgICByZWFkb25seSBqOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgazogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGw6IG51bWJlcixcbiAgICByZWFkb25seSBtOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgbjogbnVtYmVyLFxuICAgIHJlYWRvbmx5IG86IG51bWJlcixcbiAgICByZWFkb25seSBwOiBudW1iZXJcbiAgKSB7XG4gICAgc3VwZXIoYSwgYiwgYywgZCwgZSwgZiwgZywgaCwgaSk7XG4gIH1cblxuICBkZXRlcm1pbmUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5hICpcbiAgICAgICAgbmV3IE1hdHJpeDMoXG4gICAgICAgICAgdGhpcy5mLFxuICAgICAgICAgIHRoaXMuZyxcbiAgICAgICAgICB0aGlzLmgsXG4gICAgICAgICAgdGhpcy5qLFxuICAgICAgICAgIHRoaXMuayxcbiAgICAgICAgICB0aGlzLmwsXG4gICAgICAgICAgdGhpcy5uLFxuICAgICAgICAgIHRoaXMubyxcbiAgICAgICAgICB0aGlzLnBcbiAgICAgICAgKS5kZXRlcm1pbmUoKSAtXG4gICAgICB0aGlzLmIgKlxuICAgICAgICBuZXcgTWF0cml4MyhcbiAgICAgICAgICB0aGlzLmUsXG4gICAgICAgICAgdGhpcy5nLFxuICAgICAgICAgIHRoaXMuaCxcbiAgICAgICAgICB0aGlzLmksXG4gICAgICAgICAgdGhpcy5rLFxuICAgICAgICAgIHRoaXMubCxcbiAgICAgICAgICB0aGlzLm0sXG4gICAgICAgICAgdGhpcy5vLFxuICAgICAgICAgIHRoaXMucFxuICAgICAgICApLmRldGVybWluZSgpICtcbiAgICAgIHRoaXMuYyAqXG4gICAgICAgIG5ldyBNYXRyaXgzKFxuICAgICAgICAgIHRoaXMuZSxcbiAgICAgICAgICB0aGlzLmYsXG4gICAgICAgICAgdGhpcy5oLFxuICAgICAgICAgIHRoaXMuaSxcbiAgICAgICAgICB0aGlzLmosXG4gICAgICAgICAgdGhpcy5sLFxuICAgICAgICAgIHRoaXMubSxcbiAgICAgICAgICB0aGlzLm4sXG4gICAgICAgICAgdGhpcy5wXG4gICAgICAgICkuZGV0ZXJtaW5lKCkgLVxuICAgICAgdGhpcy5kICpcbiAgICAgICAgbmV3IE1hdHJpeDMoXG4gICAgICAgICAgdGhpcy5lLFxuICAgICAgICAgIHRoaXMuZixcbiAgICAgICAgICB0aGlzLmcsXG4gICAgICAgICAgdGhpcy5pLFxuICAgICAgICAgIHRoaXMuaixcbiAgICAgICAgICB0aGlzLmssXG4gICAgICAgICAgdGhpcy5tLFxuICAgICAgICAgIHRoaXMubixcbiAgICAgICAgICB0aGlzLm9cbiAgICAgICAgKS5kZXRlcm1pbmUoKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHsgTWF0cml4MiwgTWF0cml4MywgTWF0cml4NCB9O1xuIiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XG5pbXBvcnQgTGluZSBmcm9tICcuL0xpbmUnO1xuaW1wb3J0IEJvdW5kaW5nQm94IGZyb20gJy4vQm91bmRpbmdCb3gnO1xuaW1wb3J0IHsgaXNPZGQgfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcGUge1xuICByZWFkb25seSBsaW5lczogTGluZVtdO1xuICByZWFkb25seSBib3VuZGluZ0JveDogQm91bmRpbmdCb3g7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHBvaW50czogVmVjdG9yW10pIHtcbiAgICB0aGlzLmxpbmVzID0gU2hhcGUubWFrZUxpbmVzKHBvaW50cyk7XG4gICAgdGhpcy5ib3VuZGluZ0JveCA9IG5ldyBCb3VuZGluZ0JveChwb2ludHMpO1xuICB9XG5cbiAgY29udGFpbnNQb2ludChwb2ludDogVmVjdG9yKTogYm9vbGVhbiB7XG4gICAgbGV0IGludGVyc2VjdHM6IG51bWJlciA9IDA7XG4gICAgY29uc3QgY2hlY2tQb2ludDogVmVjdG9yID0gbmV3IFZlY3Rvcih7XG4gICAgICB4OiBwb2ludC54LFxuICAgICAgeTogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsXG4gICAgfSk7XG4gICAgY29uc3QgY2hlY2tMaW5lOiBMaW5lID0gbmV3IExpbmUocG9pbnQsIGNoZWNrUG9pbnQpO1xuXG4gICAgdGhpcy5saW5lcy5mb3JFYWNoKChsaW5lOiBMaW5lKSA9PiB7XG4gICAgICBpZiAobGluZS5pbnRlcnNlY3RzKGNoZWNrTGluZSkpIHtcbiAgICAgICAgaW50ZXJzZWN0cysrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlzT2RkKGludGVyc2VjdHMpO1xuICB9XG5cbiAgZ2V0IGNlbnRyb2lkKCk6IFZlY3RvciB7XG4gICAgcmV0dXJuIFZlY3Rvci5GaW5kUG9seUNlbnRyb2lkKHRoaXMucG9pbnRzKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIG1ha2VMaW5lcyhwb2ludHM6IFZlY3RvcltdKTogTGluZVtdIHtcbiAgICBjb25zdCBsaW5lczogTGluZVtdID0gW107XG4gICAgY29uc3QgY2N3UG9pbnRzOiBWZWN0b3JbXSA9IFZlY3Rvci5BcnJhbmdlUG9pbnRzQ0NXKHBvaW50cyk7XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNjd1BvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYTogVmVjdG9yID0gY2N3UG9pbnRzW2kgLSAxXTtcbiAgICAgIGNvbnN0IGI6IFZlY3RvciA9IGNjd1BvaW50c1tpXTtcbiAgICAgIGNvbnN0IGFiOiBMaW5lID0gbmV3IExpbmUoYSwgYik7XG4gICAgICBsaW5lcy5wdXNoKGFiKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBvaW50OiBWZWN0b3IgPSBjY3dQb2ludHNbMF07XG4gICAgY29uc3QgbGFzdFBvaW50OiBWZWN0b3IgPSBjY3dQb2ludHNbY2N3UG9pbnRzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGNsb3NpbmdMaW5lOiBMaW5lID0gbmV3IExpbmUoZmlyc3RQb2ludCwgbGFzdFBvaW50KTtcblxuICAgIGxpbmVzLnB1c2goY2xvc2luZ0xpbmUpO1xuXG4gICAgcmV0dXJuIGxpbmVzO1xuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcbmltcG9ydCBMaW5lIGZyb20gJy4vTGluZSc7XG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdW5pcXVlSWQgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IE1hdHJpeDQgfSBmcm9tICcuL01hdHJpeCc7XG5cbnR5cGUgdHJpYW5nbGVMaW5lcyA9IHsgYWI6IExpbmU7IGJjOiBMaW5lOyBjYTogTGluZSB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmlhbmdsZSBpbXBsZW1lbnRzIGlkIHtcbiAgaWQ6IG51bWJlciA9IHVuaXF1ZUlkKCk7XG4gIHJlYWRvbmx5IGxpbmVzOiB0cmlhbmdsZUxpbmVzO1xuXG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGE6IFZlY3RvciwgcmVhZG9ubHkgYjogVmVjdG9yLCByZWFkb25seSBjOiBWZWN0b3IpIHtcbiAgICBjb25zdCBhYjogTGluZSA9IG5ldyBMaW5lKGEsIGIpO1xuICAgIGNvbnN0IGJjOiBMaW5lID0gbmV3IExpbmUoYiwgYyk7XG4gICAgY29uc3QgY2E6IExpbmUgPSBuZXcgTGluZShjLCBhKTtcblxuICAgIHRoaXMubGluZXMgPSB7IGFiLCBiYywgY2EgfTtcbiAgfVxuXG4gIGdldCBjZW50cm9pZCgpOiBWZWN0b3Ige1xuICAgIHJldHVybiBWZWN0b3IuRmluZFBvbHlDZW50cm9pZCh0aGlzLnBvaW50cyk7XG4gIH1cblxuICBnZXQgcG9pbnRzKCk6IFZlY3RvcltdIHtcbiAgICByZXR1cm4gW3RoaXMuYSwgdGhpcy5iLCB0aGlzLmNdO1xuICB9XG5cbiAgZ2V0IGxpbmVzQXJyYXkoKTogTGluZVtdIHtcbiAgICByZXR1cm4gW3RoaXMubGluZXMuYWIsIHRoaXMubGluZXMuYmMsIHRoaXMubGluZXMuY2FdO1xuICB9XG5cbiAgZXF1YWxzKHRyaWFuZ2xlOiBUcmlhbmdsZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgYWIsIGJjLCBjYSB9ID0gdGhpcy5saW5lcztcbiAgICBjb25zdCBzYW1lQUI6IGJvb2xlYW4gPVxuICAgICAgYWIuZXF1YWxzKHRyaWFuZ2xlLmxpbmVzLmFiKSB8fFxuICAgICAgYWIuZXF1YWxzKHRyaWFuZ2xlLmxpbmVzLmJjKSB8fFxuICAgICAgYWIuZXF1YWxzKHRyaWFuZ2xlLmxpbmVzLmNhKTtcbiAgICBjb25zdCBzYW1lQkM6IGJvb2xlYW4gPVxuICAgICAgYmMuZXF1YWxzKHRyaWFuZ2xlLmxpbmVzLmFiKSB8fFxuICAgICAgYmMuZXF1YWxzKHRyaWFuZ2xlLmxpbmVzLmJjKSB8fFxuICAgICAgYmMuZXF1YWxzKHRyaWFuZ2xlLmxpbmVzLmNhKTtcbiAgICBjb25zdCBzYW1lQ0E6IGJvb2xlYW4gPVxuICAgICAgY2EuZXF1YWxzKHRyaWFuZ2xlLmxpbmVzLmFiKSB8fFxuICAgICAgY2EuZXF1YWxzKHRyaWFuZ2xlLmxpbmVzLmJjKSB8fFxuICAgICAgY2EuZXF1YWxzKHRyaWFuZ2xlLmxpbmVzLmNhKTtcblxuICAgIHJldHVybiBzYW1lQUIgJiYgc2FtZUJDICYmIHNhbWVDQTtcbiAgfVxuXG4gIGlzUG9pbnRJbkNpcmN1bWNpcmNsZShwb2ludDogVmVjdG9yKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYXggPSB0aGlzLmEueDtcbiAgICBjb25zdCBheSA9IHRoaXMuYS55O1xuICAgIGNvbnN0IGJ4ID0gdGhpcy5iLng7XG4gICAgY29uc3QgYnkgPSB0aGlzLmIueTtcbiAgICBjb25zdCBjeCA9IHRoaXMuYy54O1xuICAgIGNvbnN0IGN5ID0gdGhpcy5jLnk7XG5cbiAgICBjb25zdCBhOiBudW1iZXIgPSBheDtcbiAgICBjb25zdCBiOiBudW1iZXIgPSBheTtcbiAgICBjb25zdCBjOiBudW1iZXIgPSBheCAqIGF4ICsgYXkgKiBheTtcbiAgICBjb25zdCBkOiBudW1iZXIgPSAxO1xuICAgIGNvbnN0IGU6IG51bWJlciA9IGJ4O1xuICAgIGNvbnN0IGY6IG51bWJlciA9IGJ5O1xuICAgIGNvbnN0IGc6IG51bWJlciA9IGJ4ICogYnggKyBieSAqIGJ5O1xuICAgIGNvbnN0IGg6IG51bWJlciA9IDE7XG4gICAgY29uc3QgaTogbnVtYmVyID0gY3g7XG4gICAgY29uc3QgajogbnVtYmVyID0gY3k7XG4gICAgY29uc3QgazogbnVtYmVyID0gY3ggKiBjeCArIGN5ICogY3k7XG4gICAgY29uc3QgbDogbnVtYmVyID0gMTtcbiAgICBjb25zdCBtOiBudW1iZXIgPSBwb2ludC54O1xuICAgIGNvbnN0IG46IG51bWJlciA9IHBvaW50Lnk7XG4gICAgY29uc3QgbzogbnVtYmVyID0gcG9pbnQueCAqIHBvaW50LnggKyBwb2ludC55ICogcG9pbnQueTtcbiAgICBjb25zdCBwOiBudW1iZXIgPSAxO1xuXG4gICAgY29uc3QgbWF0cml4OiBNYXRyaXg0ID0gbmV3IE1hdHJpeDQoXG4gICAgICBhLFxuICAgICAgYixcbiAgICAgIGMsXG4gICAgICBkLFxuICAgICAgZSxcbiAgICAgIGYsXG4gICAgICBnLFxuICAgICAgaCxcbiAgICAgIGksXG4gICAgICBqLFxuICAgICAgayxcbiAgICAgIGwsXG4gICAgICBtLFxuICAgICAgbixcbiAgICAgIG8sXG4gICAgICBwXG4gICAgKTtcbiAgICByZXR1cm4gbWF0cml4LmRldGVybWluZSgpIDwgMDtcbiAgfVxuXG4gIGhhc1BvaW50KHBvaW50OiBWZWN0b3IpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hLmVxdWFscyhwb2ludCkgfHwgdGhpcy5iLmVxdWFscyhwb2ludCkgfHwgdGhpcy5jLmVxdWFscyhwb2ludCk7XG4gIH1cblxuICBoYXNBbnlQb2ludChwb2ludHM6IFZlY3RvcltdKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHBvaW50cy5maWx0ZXIoKHBvaW50OiBWZWN0b3IpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzUG9pbnQocG9pbnQpO1xuICAgICAgfSkubGVuZ3RoICE9PSAwXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBMaW5lc0Zyb21BcnJheSh0cmlhbmdsZXM6IFRyaWFuZ2xlW10pOiBMaW5lW10ge1xuICAgIHJldHVybiB0cmlhbmdsZXMucmVkdWNlKChhY2N1bXVsYXRvcjogTGluZVtdLCB0cmlhbmdsZTogVHJpYW5nbGUpID0+IHtcbiAgICAgIGFjY3VtdWxhdG9yLnB1c2goLi4udHJpYW5nbGUubGluZXNBcnJheSk7XG4gICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgc3RhdGljIEdldFVuaXF1ZUxpbmVzKHRyaWFuZ2xlczogVHJpYW5nbGVbXSk6IExpbmVbXSB7XG4gICAgY29uc3QgbGluZXM6IExpbmVbXSA9IFRyaWFuZ2xlLkxpbmVzRnJvbUFycmF5KHRyaWFuZ2xlcyk7XG4gICAgcmV0dXJuIGxpbmVzLmZpbHRlcigobGluZTogTGluZSkgPT4gTGluZS5Jc1VuaXF1ZShsaW5lLCBsaW5lcykpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBwb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRGlzam9pbmVkU2V0IH0gZnJvbSAnLi4vdHJpYW5ndWxhdGlvbic7XG5pbXBvcnQgeyBRdWFkVHJlZSB9IGZyb20gJy4uL3F1YWR0cmVlJztcbmltcG9ydCB7IFJhZFRvRGVnIH0gZnJvbSAnLi4vdXRpbC9yYWREZWcnO1xuaW1wb3J0IHRvRmxvYXQgZnJvbSAnLi4vdXRpbC90b0Zsb2F0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcbiAgc2V0OiBEaXNqb2luZWRTZXQ7XG4gIHF1YWRUcmVlOiBRdWFkVHJlZTtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoeyB4LCB5IH06IHBvaW50ID0geyB4OiAwLCB5OiAwIH0pIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBjbG9uZSgpOiBWZWN0b3Ige1xuICAgIHJldHVybiBuZXcgVmVjdG9yKHsgeDogdGhpcy54LCB5OiB0aGlzLnkgfSk7XG4gIH1cblxuICBtYWduaXR1ZGUoKTogbnVtYmVyIHtcbiAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLnggKiB0aGlzLng7XG4gICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy55ICogdGhpcy55O1xuICAgIGNvbnN0IG1hZ25pdHVkZTogbnVtYmVyID0gTWF0aC5zcXJ0KHggKyB5KTtcbiAgICByZXR1cm4gbWFnbml0dWRlO1xuICB9XG5cbiAgZG90UHJvZHVjdCh7IHgsIHkgfTogVmVjdG9yKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54ICogeCArIHRoaXMueSAqIHk7XG4gIH1cblxuICBhZGQodmVjdG9yOiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueCArIHZlY3Rvci54O1xuICAgIGNvbnN0IHk6IG51bWJlciA9IHRoaXMueSArIHZlY3Rvci55O1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoeyB4LCB5IH0pO1xuICB9XG5cbiAgc3ViKHZlY3RvcjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLnggKyAtdmVjdG9yLng7XG4gICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy55ICsgLXZlY3Rvci55O1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoeyB4LCB5IH0pO1xuICB9XG5cbiAgbXVsdGlwbHlTY2FsYXIoc2NhbGFyOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueCAqIHNjYWxhcjtcbiAgICBjb25zdCB5OiBudW1iZXIgPSB0aGlzLnkgKiBzY2FsYXI7XG5cbiAgICByZXR1cm4gbmV3IFZlY3Rvcih7IHgsIHkgfSk7XG4gIH1cblxuICBub3JtYWxpemUoKTogVmVjdG9yIHtcbiAgICBjb25zdCBtYWduaXR1ZGU6IG51bWJlciA9IHRoaXMubWFnbml0dWRlKCk7XG4gICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54IC8gbWFnbml0dWRlO1xuICAgIGNvbnN0IHk6IG51bWJlciA9IHRoaXMueSAvIG1hZ25pdHVkZTtcblxuICAgIHJldHVybiBuZXcgVmVjdG9yKHsgeCwgeSB9KTtcbiAgfVxuXG4gIGxlcnAodmVjdG9yOiBWZWN0b3IsIGFscGhhOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgIGNvbnN0IHggPSB0aGlzLnggKyAodmVjdG9yLnggLSB0aGlzLngpICogYWxwaGE7XG4gICAgY29uc3QgeSA9IHRoaXMueSArICh2ZWN0b3IueSAtIHRoaXMueSkgKiBhbHBoYTtcblxuICAgIHJldHVybiBuZXcgVmVjdG9yKHsgeCwgeSB9KTtcbiAgfVxuXG4gIG5lZ2F0aXZlKCk6IFZlY3RvciB7XG4gICAgY29uc3QgeDogbnVtYmVyID0gLXRoaXMueDtcbiAgICBjb25zdCB5OiBudW1iZXIgPSAtdGhpcy55O1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoeyB4LCB5IH0pO1xuICB9XG5cbiAgcGVycGVuZGljdWxhcigpOiB7IGxlZnQ6IFZlY3RvcjsgcmlnaHQ6IFZlY3RvciB9IHtcbiAgICBjb25zdCByaWdodDogVmVjdG9yID0gbmV3IFZlY3Rvcih7IHg6IC10aGlzLnksIHk6IHRoaXMueCB9KTtcbiAgICBjb25zdCBsZWZ0OiBWZWN0b3IgPSBuZXcgVmVjdG9yKHsgeDogdGhpcy55LCB5OiAtdGhpcy54IH0pO1xuXG4gICAgcmV0dXJuIHsgbGVmdCwgcmlnaHQgfTtcbiAgfVxuXG4gIHNjYWxlKGxlbmd0aDogbnVtYmVyKTogVmVjdG9yIHtcbiAgICBjb25zdCBub3JtYWxpemVkOiBWZWN0b3IgPSB0aGlzLm5vcm1hbGl6ZSgpO1xuICAgIGNvbnN0IHg6IG51bWJlciA9IG5vcm1hbGl6ZWQueCAqIGxlbmd0aDtcbiAgICBjb25zdCB5OiBudW1iZXIgPSBub3JtYWxpemVkLnkgKiBsZW5ndGg7XG5cbiAgICByZXR1cm4gbmV3IFZlY3Rvcih7IHgsIHkgfSk7XG4gIH1cblxuICBhbmdsZURlZyh2ZWN0b3I6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgY29uc3QgYW5nbGU6IG51bWJlciA9IHRoaXMuYW5nbGUodmVjdG9yKTtcbiAgICByZXR1cm4gUmFkVG9EZWcoYW5nbGUpO1xuICB9XG5cbiAgYW5nbGVSYWQodmVjdG9yOiBWZWN0b3IpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmFuZ2xlKHZlY3Rvcik7XG4gIH1cblxuICBiaXNlY3Rvcih2ZWN0b3I6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgY29uc3Qgbm9ybWFsaXplZDogVmVjdG9yID0gdGhpcy5ub3JtYWxpemUoKTtcbiAgICBjb25zdCBub3JtYWxpemVkVmVjdG9yOiBWZWN0b3IgPSB2ZWN0b3Iubm9ybWFsaXplKCk7XG4gICAgY29uc3Qgc3VtOiBWZWN0b3IgPSBub3JtYWxpemVkLmFkZChub3JtYWxpemVkVmVjdG9yKTtcbiAgICBjb25zdCBtYWduaXR1ZGU6IG51bWJlciA9ICh0aGlzLm1hZ25pdHVkZSgpICsgdmVjdG9yLm1hZ25pdHVkZSgpKSAvIDI7XG5cbiAgICByZXR1cm4gc3VtLnNjYWxlKG1hZ25pdHVkZSk7XG4gIH1cblxuICBlcXVhbHModmVjdG9yOiBWZWN0b3IpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy54ID09PSB2ZWN0b3IueCAmJiB0aGlzLnkgPT09IHZlY3Rvci55O1xuICB9XG5cbiAgZGlzdGFuY2VUbyh2ZWN0b3I6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc3ViKHZlY3RvcikubWFnbml0dWRlKCk7XG4gIH1cblxuICBtaWRwb2ludCh2ZWN0b3I6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgY29uc3QgeDogbnVtYmVyID0gKHRoaXMueCArIHZlY3Rvci54KSAvIDI7XG4gICAgY29uc3QgeTogbnVtYmVyID0gKHRoaXMueSArIHZlY3Rvci55KSAvIDI7XG5cbiAgICByZXR1cm4gbmV3IFZlY3Rvcih7IHgsIHkgfSk7XG4gIH1cblxuICBzdGF0aWMgRmluZFBvbHlDZW50cm9pZChwb2ludHM6IFZlY3RvcltdKTogVmVjdG9yIHtcbiAgICBsZXQgeCA9IDA7XG4gICAgbGV0IHkgPSAwO1xuXG4gICAgcG9pbnRzLmZvckVhY2goKHBvaW50OiBWZWN0b3IpID0+IHtcbiAgICAgIHggKz0gcG9pbnQueDtcbiAgICAgIHkgKz0gcG9pbnQueTtcbiAgICB9KTtcblxuICAgIHggLz0gcG9pbnRzLmxlbmd0aDtcbiAgICB5IC89IHBvaW50cy5sZW5ndGg7XG5cbiAgICByZXR1cm4gbmV3IFZlY3Rvcih7IHgsIHkgfSk7XG4gIH1cblxuICBzdGF0aWMgQXJyYW5nZVBvaW50c0NDVyhwb2ludHM6IFZlY3RvcltdKTogVmVjdG9yW10ge1xuICAgIGNvbnN0IGNlbnRyb2lkOiBWZWN0b3IgPSBWZWN0b3IuRmluZFBvbHlDZW50cm9pZChwb2ludHMpO1xuICAgIGxldCBjbG9uZTogVmVjdG9yW10gPSBbLi4ucG9pbnRzXTtcblxuICAgIGNsb25lLnNvcnQoKGE6IFZlY3RvciwgYjogVmVjdG9yKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZUE6IG51bWJlciA9IE1hdGguYXRhbjIoYS55IC0gY2VudHJvaWQueSwgYS54IC0gY2VudHJvaWQueCk7XG4gICAgICBjb25zdCBhbmdsZUI6IG51bWJlciA9IE1hdGguYXRhbjIoYi55IC0gY2VudHJvaWQueSwgYi54IC0gY2VudHJvaWQueCk7XG4gICAgICByZXR1cm4gYW5nbGVBIC0gYW5nbGVCO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgc3RhdGljIFVuaXF1ZUZyb21BcnJheShwb2ludHM6IFZlY3RvcltdKTogVmVjdG9yW10ge1xuICAgIGNvbnN0IGlzVW5pcXVlID0gKHZlY3RvcjogVmVjdG9yLCBpbmRleDogbnVtYmVyLCBhcnJheTogVmVjdG9yW10pID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGFycmF5LmZpbmRJbmRleCgodmVjdG9ySW5kZXg6IFZlY3RvcikgPT4ge1xuICAgICAgICAgIHJldHVybiB2ZWN0b3IuZXF1YWxzKHZlY3RvckluZGV4KTtcbiAgICAgICAgfSkgPT09IGluZGV4XG4gICAgICApO1xuICAgIH07XG5cbiAgICByZXR1cm4gcG9pbnRzLmZpbHRlcihpc1VuaXF1ZSk7XG4gIH1cblxuICBwcml2YXRlIGFuZ2xlKHZlY3RvcjogVmVjdG9yKTogbnVtYmVyIHtcbiAgICBjb25zdCBwcm9kdWN0OiBudW1iZXIgPSB0aGlzLmRvdFByb2R1Y3QodmVjdG9yKTtcbiAgICBjb25zdCBjb3NBbmdsZTogbnVtYmVyID0gcHJvZHVjdCAvICh0aGlzLm1hZ25pdHVkZSgpICogdmVjdG9yLm1hZ25pdHVkZSgpKTtcbiAgICByZXR1cm4gTWF0aC5hY29zKGNvc0FuZ2xlKTtcbiAgfVxufVxuIiwiaW1wb3J0IEJvdW5kaW5nQm94IGZyb20gJy4vQm91bmRpbmdCb3gnO1xuaW1wb3J0IENsb2NrIGZyb20gJy4vQ2xvY2snO1xuaW1wb3J0IExpbmUgZnJvbSAnLi9MaW5lJztcbmltcG9ydCBMaW5lSW50ZXJzZWN0aW9uIGZyb20gJy4vTGluZUludGVyc2VjdGlvbic7XG5pbXBvcnQgeyBNYXRyaXgyLCBNYXRyaXgzLCBNYXRyaXg0IH0gZnJvbSAnLi9NYXRyaXgnO1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUnO1xuaW1wb3J0IFRyaWFuZ2xlIGZyb20gJy4vVHJpYW5nbGUnO1xuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XG5cbmV4cG9ydCB7XG4gIEJvdW5kaW5nQm94LFxuICBDbG9jayxcbiAgTGluZSxcbiAgTGluZUludGVyc2VjdGlvbixcbiAgTWF0cml4MixcbiAgTWF0cml4MyxcbiAgTWF0cml4NCxcbiAgU2hhcGUsXG4gIFRyaWFuZ2xlLFxuICBWZWN0b3IsXG59O1xuIiwiaW1wb3J0IFVwZGF0ZXIgZnJvbSAnLi9VcGRhdGVyL1VwZGF0ZXInO1xuaW1wb3J0IHsgaWQsIHRpY2tEYXRhLCBVcGRhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IHVuaXF1ZUlkIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgRW50aXR5IGZyb20gJy4vRW50aXR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IGltcGxlbWVudHMgaWQsIFVwZGF0ZSB7XG4gIHJlYWRvbmx5IGlkOiBudW1iZXIgPSB1bmlxdWVJZCgpO1xuICBuYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZXI6IFVwZGF0ZXI7XG4gIGVudGl0eTogRW50aXR5O1xuICB1cGRhdGVQcmlvcml0eTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgc3RhcnQoKTogdm9pZCB7fVxuXG4gIHN0b3AoKTogdm9pZCB7fVxuXG4gIHVwZGF0ZSh0aWNrRGF0YTogdGlja0RhdGEpOiB2b2lkIHt9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vQ29tcG9uZW50JztcbmltcG9ydCBVcGRhdGVyIGZyb20gJy4vVXBkYXRlci9VcGRhdGVyJztcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB1bmlxdWVJZCB9IGZyb20gJy4uL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHkgaW1wbGVtZW50cyBpZCB7XG4gIGlkOiBudW1iZXIgPSB1bmlxdWVJZCgpO1xuICBuYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZXI6IFVwZGF0ZXI7XG4gIHJlYWRvbmx5IGNvbXBvbmVudHM6IENvbXBvbmVudFtdID0gW107XG5cbiAgc3RhcnQoKTogdm9pZCB7fVxuXG4gIHN0b3AoKTogdm9pZCB7fVxufVxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuLi9FbnRpdHknO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi9Db21wb25lbnQnO1xuaW1wb3J0IFVwZGF0ZXIgZnJvbSAnLi9VcGRhdGVyJztcbmltcG9ydCB7IHVwZGF0ZXJSZXBvcnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzJztcblxudHlwZSBjb21wb25lbnRDYWxsYmFjayA9IChjb21wb25lbnQ6IENvbXBvbmVudCkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5VXBkYXRlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZW50aXRpZXM6IEVudGl0eVtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSB1cGRhdGVyOiBVcGRhdGVyKSB7fVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5OiBFbnRpdHkpID0+IGVudGl0eS5zdGFydCgpKTtcbiAgfVxuXG4gIHN0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHk6IEVudGl0eSkgPT4gZW50aXR5LnN0b3AoKSk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmVudGl0aWVzLmxlbmd0aCA9IDA7XG4gIH1cblxuICBhZGQoZW50aXR5OiBFbnRpdHkpOiB1cGRhdGVyUmVwb3J0W10ge1xuICAgIGVudGl0eS51cGRhdGVyID0gdGhpcy51cGRhdGVyO1xuICAgIHRoaXMuZW50aXRpZXMucHVzaChlbnRpdHkpO1xuICAgIGNvbnN0IGNhbGxiYWNrOiBjb21wb25lbnRDYWxsYmFjayA9IChjb21wb25lbnQ6IENvbXBvbmVudCkgPT4ge1xuICAgICAgY29tcG9uZW50LmVudGl0eSA9IGVudGl0eTtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZXIuYWRkQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5sb29wQ29tcG9uZW50cyhlbnRpdHkuY29tcG9uZW50cywgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVtb3ZlKHsgY29tcG9uZW50cyB9OiBFbnRpdHkpOiB1cGRhdGVyUmVwb3J0W10ge1xuICAgIGNvbnN0IGNhbGxiYWNrOiBjb21wb25lbnRDYWxsYmFjayA9IGNvbXBvbmVudCA9PlxuICAgICAgdGhpcy51cGRhdGVyLnJlbW92ZUNvbXBvbmVudChjb21wb25lbnQpO1xuICAgIHJldHVybiB0aGlzLmxvb3BDb21wb25lbnRzKGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHRvZ2dsZSh7IGNvbXBvbmVudHMgfTogRW50aXR5KTogdXBkYXRlclJlcG9ydFtdIHtcbiAgICBjb25zdCBjYWxsYmFjazogY29tcG9uZW50Q2FsbGJhY2sgPSBjb21wb25lbnQgPT5cbiAgICAgIHRoaXMudXBkYXRlci50b2dnbGVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICByZXR1cm4gdGhpcy5sb29wQ29tcG9uZW50cyhjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gIH1cblxuICBwcml2YXRlIGxvb3BDb21wb25lbnRzKFxuICAgIGNvbXBvbmVudHM6IENvbXBvbmVudFtdLFxuICAgIGNhbGxiYWNrOiBjb21wb25lbnRDYWxsYmFja1xuICApOiB1cGRhdGVyUmVwb3J0W10ge1xuICAgIHJldHVybiBjb21wb25lbnRzLm1hcCgoY29tcG9uZW50OiBDb21wb25lbnQpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBjb21wb25lbnQuaWQsXG4gICAgICAgIG5hbWU6IGNvbXBvbmVudC5uYW1lLFxuICAgICAgICBzdWNjZXNzOiBjYWxsYmFjayhjb21wb25lbnQpLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi9Db21wb25lbnQnO1xuaW1wb3J0IFVwZGF0ZXIgZnJvbSAnLi9VcGRhdGVyJztcbmltcG9ydCB7IGlkLCBVcGRhdGUsIHRpY2tEYXRhIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB1bmlxdWVJZCB9IGZyb20gJy4uLy4uL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZva2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSWQoKTtcbiAgb3JpZ2luYWxUaW1lb3V0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgdXBkYXRlcjogVXBkYXRlcixcbiAgICByZWFkb25seSBjb21wb25lbnQ6IENvbXBvbmVudCxcbiAgICBwdWJsaWMgdGltZW91dDogbnVtYmVyXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5vcmlnaW5hbFRpbWVvdXQgPSB0aW1lb3V0O1xuICB9XG5cbiAgdXBkYXRlKHRpY2tEYXRhOiB0aWNrRGF0YSk6IHZvaWQge1xuICAgIHRoaXMudGltZW91dCAtPSB0aWNrRGF0YS5kZWx0YVRpbWVNUztcblxuICAgIGlmICh0aGlzLnRpbWVvdXQgPD0gMCkge1xuICAgICAgdGhpcy5jb21wb25lbnQudXBkYXRlKHRpY2tEYXRhKTtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlci5yZW1vdmUodGhpcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGlkLCBVcGRhdGUsIHRpY2tEYXRhIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB1bmlxdWVJZCB9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi9Db21wb25lbnQnO1xuaW1wb3J0IFVwZGF0ZXIgZnJvbSAnLi9VcGRhdGVyJztcbmltcG9ydCBJbnZva2UgZnJvbSAnLi9JbnZva2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZva2VSZXBlYXRpbmcgZXh0ZW5kcyBJbnZva2Uge1xuICBwcml2YXRlIHVwZGF0ZWQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdXBkYXRlcjogVXBkYXRlcixcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudCxcbiAgICBpbnRlcnZhbDogbnVtYmVyLFxuICAgIHByaXZhdGUgdGltZXM6IG51bWJlclxuICApIHtcbiAgICBzdXBlcih1cGRhdGVyLCBjb21wb25lbnQsIGludGVydmFsKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aWNrRGF0YTogdGlja0RhdGEpIHtcbiAgICB0aGlzLnRpbWVvdXQgLT0gdGlja0RhdGEuZGVsdGFUaW1lTVM7XG5cbiAgICBpZiAodGhpcy50aW1lb3V0IDw9IDApIHtcbiAgICAgIGlmICgrK3RoaXMudXBkYXRlZCA9PT0gdGhpcy50aW1lcykge1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29tcG9uZW50LnVwZGF0ZSh0aWNrRGF0YSk7XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLm9yaWdpbmFsVGltZW91dDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENsb2NrIH0gZnJvbSAnLi4vLi4vY29tbW9uJztcbmltcG9ydCB7IGNvbnRhaW5zLCByZW1vdmVGcm9tQXJyYXkgfSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7IHVwZGF0ZXJSZXBvcnQsIHRpY2tEYXRhIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uL0NvbXBvbmVudCc7XG5pbXBvcnQgRW50aXR5IGZyb20gJy4uL0VudGl0eSc7XG5pbXBvcnQgRW50aXR5VXBkYXRlciBmcm9tICcuL0VudGl0eVVwZGF0ZXInO1xuaW1wb3J0IEludm9rZSBmcm9tICcuL0ludm9rZSc7XG5pbXBvcnQgSW52b2tlUmVwZWF0aW5nIGZyb20gJy4vSW52b2tlUmVwZWF0aW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBkYXRlciB7XG4gIG9uVXBkYXRlQ29tcGxldGU6IENvbXBvbmVudCA9IG5ldyBDb21wb25lbnQoKTtcblxuICBwcml2YXRlIGNvbXBvbmVudHM6IENvbXBvbmVudFtdID0gW107XG4gIHByaXZhdGUgcnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGNsb2NrOiBDbG9jayA9IG5ldyBDbG9jaygpO1xuICBwcml2YXRlIGVudGl0eVVwZGF0ZXI6IEVudGl0eVVwZGF0ZXIgPSBuZXcgRW50aXR5VXBkYXRlcih0aGlzKTtcbiAgcHJpdmF0ZSBmcmFtZUlkOiBudW1iZXI7XG5cbiAgc3RhcnQoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgICB0aGlzLmNsb2NrLnN0YXJ0KCk7XG4gICAgICB0aGlzLmVudGl0eVVwZGF0ZXIuc3RhcnQoKTtcbiAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQ6IENvbXBvbmVudCkgPT4gY29tcG9uZW50LnN0YXJ0KCkpO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdG9wKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZUlkKTtcbiAgICAgIHRoaXMuY2xvY2suc3RvcCgpO1xuICAgICAgdGhpcy5lbnRpdHlVcGRhdGVyLnN0b3AoKTtcbiAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQ6IENvbXBvbmVudCkgPT4gY29tcG9uZW50LnN0b3AoKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wKCk7XG4gICAgdGhpcy5lbnRpdHlVcGRhdGVyLmNsZWFyKCk7XG4gICAgdGhpcy5jb21wb25lbnRzLmxlbmd0aCA9IDA7XG4gIH1cblxuICBhZGQoZW50aXR5OiBFbnRpdHkpOiB1cGRhdGVyUmVwb3J0W107XG4gIGFkZChjb21wb25lbnQ6IENvbXBvbmVudCk6IGJvb2xlYW47XG4gIGFkZChiZWhhdmlvdXI6IEVudGl0eSB8IENvbXBvbmVudCk6IGJvb2xlYW4gfCB1cGRhdGVyUmVwb3J0W10ge1xuICAgIGlmIChiZWhhdmlvdXIgaW5zdGFuY2VvZiBDb21wb25lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZENvbXBvbmVudChiZWhhdmlvdXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnRpdHlVcGRhdGVyLmFkZChiZWhhdmlvdXIpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZShlbnRpdHk6IEVudGl0eSk6IHVwZGF0ZXJSZXBvcnRbXTtcbiAgcmVtb3ZlKGNvbXBvbmVudDogQ29tcG9uZW50KTogYm9vbGVhbjtcbiAgcmVtb3ZlKGJlaGF2aW91cjogRW50aXR5IHwgQ29tcG9uZW50KTogYm9vbGVhbiB8IHVwZGF0ZXJSZXBvcnRbXSB7XG4gICAgaWYgKGJlaGF2aW91ciBpbnN0YW5jZW9mIENvbXBvbmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQ29tcG9uZW50KGJlaGF2aW91cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVudGl0eVVwZGF0ZXIucmVtb3ZlKGJlaGF2aW91cik7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlKGVudGl0eTogRW50aXR5KTogdXBkYXRlclJlcG9ydFtdO1xuICB0b2dnbGUoY29tcG9uZW50OiBDb21wb25lbnQpOiBib29sZWFuO1xuICB0b2dnbGUoYmVoYXZpb3VyOiBFbnRpdHkgfCBDb21wb25lbnQpOiBib29sZWFuIHwgdXBkYXRlclJlcG9ydFtdIHtcbiAgICBpZiAoYmVoYXZpb3VyIGluc3RhbmNlb2YgQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy50b2dnbGVDb21wb25lbnQoYmVoYXZpb3VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZW50aXR5VXBkYXRlci50b2dnbGUoYmVoYXZpb3VyKTtcbiAgICB9XG4gIH1cblxuICBpc1VwZGF0aW5nQ29tcG9uZW50KGNvbXBvbmVudDogQ29tcG9uZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbnRhaW5zKHRoaXMuY29tcG9uZW50cywgY29tcG9uZW50KTtcbiAgfVxuXG4gIGFkZENvbXBvbmVudChjb21wb25lbnQ6IENvbXBvbmVudCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5pc1VwZGF0aW5nQ29tcG9uZW50KGNvbXBvbmVudCkpIHtcbiAgICAgIGNvbXBvbmVudC51cGRhdGVyID0gdGhpcztcbiAgICAgIHRoaXMucHVzaFRvUXVldWUoY29tcG9uZW50KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZW1vdmVDb21wb25lbnQoY29tcG9uZW50OiBDb21wb25lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVtb3ZlRnJvbUFycmF5KHRoaXMuY29tcG9uZW50cywgY29tcG9uZW50KTtcbiAgfVxuXG4gIHRvZ2dsZUNvbXBvbmVudChjb21wb25lbnQ6IENvbXBvbmVudCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hZGRDb21wb25lbnQoY29tcG9uZW50KSkge1xuICAgICAgdGhpcy5yZW1vdmVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpbnZva2UoY29tcG9uZW50OiBDb21wb25lbnQsIHRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGludm9rZTogSW52b2tlID0gbmV3IEludm9rZSh0aGlzLCBjb21wb25lbnQsIHRpbWUpO1xuICAgIHRoaXMuYWRkKGludm9rZSk7XG4gIH1cblxuICBpbnZva2VSZXBlYXRpbmcoXG4gICAgY29tcG9uZW50OiBDb21wb25lbnQsXG4gICAgdGltZTogbnVtYmVyLFxuICAgIHRpbWVzOiBudW1iZXIgPSBJbmZpbml0eVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBpbnZva2U6IEludm9rZVJlcGVhdGluZyA9IG5ldyBJbnZva2VSZXBlYXRpbmcoXG4gICAgICB0aGlzLFxuICAgICAgY29tcG9uZW50LFxuICAgICAgdGltZSxcbiAgICAgIHRpbWVzXG4gICAgKTtcbiAgICB0aGlzLmFkZChpbnZva2UpO1xuICB9XG5cbiAgZ2V0VGlja0RhdGEoKTogdGlja0RhdGEge1xuICAgIGNvbnN0IGRlbHRhVGltZTogbnVtYmVyID0gdGhpcy5jbG9jay5nZXREZWx0YSgpO1xuICAgIGNvbnN0IGRlbHRhVGltZU1TOiBudW1iZXIgPSBkZWx0YVRpbWUgKiAxMDAwO1xuICAgIGNvbnN0IGVsYXBzZWRUaW1lOiBudW1iZXIgPSB0aGlzLmNsb2NrLmdldEVsYXBzZWQoKTtcbiAgICByZXR1cm4geyBkZWx0YVRpbWUsIGRlbHRhVGltZU1TLCBlbGFwc2VkVGltZSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBwdXNoVG9RdWV1ZShjb21wb25lbnQ6IENvbXBvbmVudCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgY29tcG9uZW50LnVwZGF0ZVByaW9yaXR5ID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5jb21wb25lbnRzLnNwbGljZShjb21wb25lbnQudXBkYXRlUHJpb3JpdHksIDAsIGNvbXBvbmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5mcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMudXBkYXRlKCkpO1xuXG4gICAgY29uc3QgdGlja0RhdGE6IHRpY2tEYXRhID0gdGhpcy5nZXRUaWNrRGF0YSgpO1xuXG4gICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudDogQ29tcG9uZW50KSA9PiB7XG4gICAgICBjb21wb25lbnQudXBkYXRlKHRpY2tEYXRhKTtcbiAgICB9KTtcblxuICAgIHRoaXMub25VcGRhdGVDb21wbGV0ZS51cGRhdGUodGlja0RhdGEpO1xuICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vQ29tcG9uZW50JztcbmltcG9ydCBFbnRpdHkgZnJvbSAnLi9FbnRpdHknO1xuaW1wb3J0IFVwZGF0ZXIgZnJvbSAnLi9VcGRhdGVyL1VwZGF0ZXInO1xuXG5leHBvcnQgeyBDb21wb25lbnQsIEVudGl0eSwgVXBkYXRlciB9O1xuIiwiaW1wb3J0ICcuL3dvcmtlcic7XG5pbXBvcnQgeyBHcmlkLCBOYXZpZ2F0b3IsIE5hdmlnYXRvclRpbGUgfSBmcm9tICcuL3BhdGhmaW5kaW5nJztcbmltcG9ydCB7IFRyaWFuZ3VsYXRpb24sIEh1bGwgfSBmcm9tICcuL3RyaWFuZ3VsYXRpb24nO1xuaW1wb3J0IHsgUXVhZFRyZWUgfSBmcm9tICcuL3F1YWR0cmVlJztcbmltcG9ydCB7IFZlY3RvciwgTGluZSwgVHJpYW5nbGUsIFNoYXBlLCBCb3VuZGluZ0JveCB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7XG4gIHVuaXF1ZUlkLFxuICBzb3J0LFxuICBpbW11dGFibGVPYmplY3RTb3J0LFxuICBjb250YWlucyxcbiAgUmFkVG9EZWcsXG4gIERlZ1RvUmFkLFxuICByZW1vdmVGcm9tQXJyYXksXG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBFbnRpdHksIENvbXBvbmVudCwgVXBkYXRlciB9IGZyb20gJy4vZWNzJztcbmltcG9ydCB7XG4gIHRpY2tEYXRhLFxuICBwb2ludCxcbiAgc2l6ZSxcbiAgbGltaXRzLFxuICByb3csXG4gIG5hdmlnYXRvclNldHRpbmdzLFxufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtcbiAgcmFuZG9tUG9pbnQsXG4gIHJhbmRvbVBvaW50cyxcbiAgcmFuZG9tSW50LFxuICByYW5kb21GbG9hdCxcbiAgcmFuZG9tQ29sb3IsXG59IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB7XG4gIEdyaWQsXG4gIE5hdmlnYXRvcixcbiAgTmF2aWdhdG9yVGlsZSxcbiAgVHJpYW5ndWxhdGlvbixcbiAgSHVsbCxcbiAgVmVjdG9yLFxuICBMaW5lLFxuICBUcmlhbmdsZSxcbiAgU2hhcGUsXG4gIEJvdW5kaW5nQm94LFxuICBRdWFkVHJlZSxcbiAgdW5pcXVlSWQsXG4gIHNvcnQsXG4gIGltbXV0YWJsZU9iamVjdFNvcnQsXG4gIGNvbnRhaW5zLFxuICBSYWRUb0RlZyxcbiAgRGVnVG9SYWQsXG4gIHJlbW92ZUZyb21BcnJheSxcbiAgRW50aXR5LFxuICBDb21wb25lbnQsXG4gIFVwZGF0ZXIsXG4gIHRpY2tEYXRhLFxuICBwb2ludCxcbiAgc2l6ZSxcbiAgbGltaXRzLFxuICByb3csXG4gIG5hdmlnYXRvclNldHRpbmdzLFxuICByYW5kb21Qb2ludCxcbiAgcmFuZG9tUG9pbnRzLFxuICByYW5kb21JbnQsXG4gIHJhbmRvbUZsb2F0LFxuICByYW5kb21Db2xvcixcbn07XG4iLCJpbXBvcnQgT2JzdGFjbGVzIGZyb20gJy4vT2JzdGFjbGVzJztcbmltcG9ydCB7IHJhbmRvbUludCB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi9OYXZpZ2F0b3JUaWxlJztcbmltcG9ydCB7IHJvdywgcG9pbnQsIHNpemUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IGRlZmF1bHRTaXplOiBzaXplID0geyB3aWR0aDogMTAsIGhlaWdodDogMTAgfTtcbnR5cGUgb25UaWxlQ3JlYXRlID0gKHRpbGU6IE5hdmlnYXRvclRpbGUpID0+IHZvaWQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQge1xuICBvblRpbGVDcmVhdGU6IG9uVGlsZUNyZWF0ZSA9ICgpID0+IHt9O1xuICByZWFkb25seSBvYnN0YWNsZXM6IE9ic3RhY2xlcyA9IG5ldyBPYnN0YWNsZXModGhpcyk7XG4gIHJlYWRvbmx5IHRpbGVzOiBOYXZpZ2F0b3JUaWxlW10gPSBbXTtcbiAgcmVhZG9ubHkgcm93czogcm93W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNpemU6IHNpemUgPSBkZWZhdWx0U2l6ZSkge31cblxuICAvKiogUmV0dXJucyBhIHJhbmRvbSB0aWxlLCBjYW4gYmUgYW4gb2JzdGFjbGUgb3Igbm90LiAqL1xuICByYW5kb21UaWxlKCk6IE5hdmlnYXRvclRpbGUge1xuICAgIGNvbnN0IHggPSByYW5kb21JbnQoMCwgdGhpcy5zaXplLndpZHRoIC0gMSk7XG4gICAgY29uc3QgeSA9IHJhbmRvbUludCgwLCB0aGlzLnNpemUuaGVpZ2h0IC0gMSk7XG5cbiAgICByZXR1cm4gdGhpcy5maW5kVGlsZSh7IHgsIHkgfSk7XG4gIH1cblxuICAvKiogUmV0dXJucyBhIHJhbmRvbSBub24tb2JzdGFjbGUgdGlsZSwgaWYgaXQgZXhpc3RzLiAqL1xuICByYW5kb21GcmVlVGlsZSgpOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMub2JzdGFjbGVzLmdldFJhbmRvbU9wZW4oKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIGEgdGlsZSBhdCB0aGUgc3BlY2lmaWVkIGNvb3JkaW5hdGVzLiAqL1xuICBmaW5kVGlsZSh7IHgsIHkgfTogcG9pbnQpOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3Qgcm93OiByb3cgPSB0aGlzLnJvd3NbeV07XG4gICAgcmV0dXJuIHJvdyAmJiByb3cubGVuZ3RoID4geCA/IHJvd1t4XSA6IG51bGw7XG4gIH1cblxuICBtYWtlR3JpZCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuc2l6ZS5oZWlnaHQ7IHkrKykge1xuICAgICAgY29uc3Qgcm93OiByb3cgPSBbXTtcblxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnNpemUud2lkdGg7IHgrKykge1xuICAgICAgICBjb25zdCBwb3M6IFZlY3RvciA9IG5ldyBWZWN0b3IoeyB4LCB5IH0pO1xuICAgICAgICBjb25zdCB0aWxlOiBOYXZpZ2F0b3JUaWxlID0gbmV3IE5hdmlnYXRvclRpbGUocG9zKTtcbiAgICAgICAgdGhpcy5vblRpbGVDcmVhdGUodGlsZSk7XG4gICAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgcm93LnB1c2godGlsZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucm93cy5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tICcuL0dyaWQnO1xuaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi9OYXZpZ2F0b3JUaWxlJztcbmltcG9ydCBOYXZpZ2F0b3JEYXRhIGZyb20gJy4vTmF2aWdhdG9yRGF0YSc7XG5pbXBvcnQgeyByb3csIGlkLCBuYXZpZ2F0b3JTZXR0aW5ncyB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdW5pcXVlSWQsIGNvbnRhaW5zIH0gZnJvbSAnLi4vdXRpbCc7XG5cbnR5cGUgb25FeHBsb3JlID0gKHRpbGU6IE5hdmlnYXRvclRpbGUpID0+IHZvaWQ7XG50eXBlIG9uQ29tcGxldGUgPSAocGF0aDogTmF2aWdhdG9yVGlsZVtdKSA9PiB2b2lkO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0b3IgaW1wbGVtZW50cyBpZCB7XG4gIGlkOiBudW1iZXIgPSB1bmlxdWVJZCgpO1xuICBwcml2YXRlIF9wYXRoOiByb3cgPSBbXTtcbiAgcHJpdmF0ZSB2ZXJ0aWNhbENvc3Q6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgZGlhZ29uYWxDb3N0OiBudW1iZXIgPSAxLjQ7XG4gIHByaXZhdGUgc3RhdGljIG5laWdoYm9yc0NvdW50OiBudW1iZXIgPSA5O1xuICBwcml2YXRlIHRpbGVzOiByb3cgPSBbXTtcbiAgcHJpdmF0ZSBvcGVuOiByb3cgPSBbXTtcbiAgcHJpdmF0ZSBjbG9zZWQ6IHJvdyA9IFtdO1xuICBwcml2YXRlIHJlZ2lzdGVyZWRUaWxlczogTmF2aWdhdG9yVGlsZVtdID0gW107XG5cbiAgcHJpdmF0ZSBncmlkOiBHcmlkO1xuICBwcml2YXRlIGJlZ2luOiBOYXZpZ2F0b3JUaWxlO1xuICBwcml2YXRlIGVuZDogTmF2aWdhdG9yVGlsZTtcbiAgcHJpdmF0ZSBvbkV4cGxvcmU6ICh0aWxlOiBOYXZpZ2F0b3JUaWxlKSA9PiB2b2lkO1xuICBwcml2YXRlIG9uQ29tcGxldGU6IChwYXRoOiBOYXZpZ2F0b3JUaWxlW10pID0+IHZvaWQ7XG4gIHByaXZhdGUgbWF4U3RlcHM6IG51bWJlcjtcbiAgcHJpdmF0ZSBzdGVwczogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgZ3JpZCxcbiAgICBiZWdpbixcbiAgICBlbmQsXG4gICAgb25FeHBsb3JlLFxuICAgIG9uQ29tcGxldGUsXG4gICAgbWF4U3RlcHMsXG4gIH06IG5hdmlnYXRvclNldHRpbmdzKSB7XG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgICB0aGlzLmJlZ2luID0gYmVnaW47XG4gICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgdGhpcy5vbkV4cGxvcmUgPSBvbkV4cGxvcmUgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBvbkNvbXBsZXRlIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy5tYXhTdGVwcyA9IG1heFN0ZXBzICE9PSB1bmRlZmluZWQgPyBtYXhTdGVwcyA6IEluZmluaXR5O1xuICB9XG5cbiAgZ2V0IHBhdGgoKTogcm93IHtcbiAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgfVxuXG4gIC8qKiBCZWdpbiB0aGUgcGF0aGZpbmRpbmcgcHJvY2Vzcy4gRG9lcyBub3Qgc3RhcnQgaWYgZGVzdGluYXRpb24gaXMgYW4gb2JzdGFjbGUuICovXG4gIHN0YXJ0KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmVuZC5pc09ic3RhY2xlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VkLnB1c2godGhpcy5iZWdpbik7XG4gICAgY29uc3QgYmVnaW5OYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gdGhpcy5iZWdpbi5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgIHRoaXMuYWRkVG9FeHBsb3JlZCh0aGlzLmJlZ2luKTtcblxuICAgIGJlZ2luTmF2RGF0YS5nVmFsID0gMDtcbiAgICB0aGlzLmNhbGN1bGF0ZUcodGhpcy5iZWdpbik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGRlcmVnaXN0ZXJOYXZpZ2F0b3JEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJlZFRpbGVzLmZvckVhY2goKHRpbGU6IE5hdmlnYXRvclRpbGUpID0+XG4gICAgICB0aWxlLmRlcmVnaXN0ZXJOYXZpZ2F0b3JEYXRhKHRoaXMpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlSCh0aWxlOiBOYXZpZ2F0b3JUaWxlKTogbnVtYmVyIHtcbiAgICBjb25zdCBjb2xWYWw6IG51bWJlciA9IE1hdGguYWJzKHRpbGUucG9zaXRpb24ueCAtIHRoaXMuZW5kLnBvc2l0aW9uLngpO1xuICAgIGNvbnN0IHJvd1ZhbDogbnVtYmVyID0gTWF0aC5hYnModGlsZS5wb3NpdGlvbi55IC0gdGhpcy5lbmQucG9zaXRpb24ueSk7XG4gICAgcmV0dXJuIGNvbFZhbCArIHJvd1ZhbDtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlRyh0aWxlOiBOYXZpZ2F0b3JUaWxlKTogdm9pZCB7XG4gICAgY29uc3QgdGlsZU5hdkRhdGEgPSB0aWxlLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgdGhpcy5hZGRUb0V4cGxvcmVkKHRpbGUpO1xuXG4gICAgaWYgKCsrdGhpcy5zdGVwcyA9PT0gdGhpcy5tYXhTdGVwcykge1xuICAgICAgdGhpcy5kb25lKFtdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5hdmlnYXRvci5uZWlnaGJvcnNDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCB4OiBudW1iZXIgPSB0aWxlLnBvc2l0aW9uLnggKyBOYXZpZ2F0b3IuZ2V0Q29sT2Zmc2V0KGkpO1xuICAgICAgY29uc3QgeTogbnVtYmVyID0gdGlsZS5wb3NpdGlvbi55ICsgTmF2aWdhdG9yLmdldFJvd09mZnNldChpKTtcbiAgICAgIGNvbnN0IGV4cGxvcmluZzogTmF2aWdhdG9yVGlsZSB8IG51bGwgPSB0aGlzLmdyaWQuZmluZFRpbGUoeyB4LCB5IH0pO1xuXG4gICAgICBpZiAoIWV4cGxvcmluZykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhwbG9yaW5nTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IGV4cGxvcmluZy5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgICAgdGhpcy5hZGRUb0V4cGxvcmVkKGV4cGxvcmluZyk7XG5cbiAgICAgIGlmIChleHBsb3JpbmcuaXNPYnN0YWNsZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRhaW5zKHRoaXMuY2xvc2VkLCBleHBsb3JpbmcpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGlsZS5pZCA9PT0gZXhwbG9yaW5nLmlkKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkLnB1c2goZXhwbG9yaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRQYXJlbnQodGlsZSwgZXhwbG9yaW5nLCB0aWxlTmF2RGF0YSwgZXhwbG9yaW5nTmF2RGF0YSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29udGFpbnModGhpcy5vcGVuLCBleHBsb3JpbmcpKSB7XG4gICAgICAgICAgdGhpcy5vcGVuLnB1c2goZXhwbG9yaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aWxlLmlzRGlhZ29uYWwoZXhwbG9yaW5nKSkge1xuICAgICAgICAgIGV4cGxvcmluZ05hdkRhdGEuZ1ZhbCA9IHRpbGVOYXZEYXRhLmdWYWwgKyB0aGlzLmRpYWdvbmFsQ29zdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3JpbmdOYXZEYXRhLmdWYWwgPSB0aWxlTmF2RGF0YS5nVmFsICsgdGhpcy52ZXJ0aWNhbENvc3Q7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXhwbG9yaW5nTmF2RGF0YS5mVmFsID0gdGhpcy5jYWxjdWxhdGVGKGV4cGxvcmluZywgZXhwbG9yaW5nTmF2RGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dCA9IHRoaXMuY2hvb3NlTmV4dCgpO1xuXG4gICAgaWYgKG5leHQpIHtcbiAgICAgIHRoaXMub25FeHBsb3JlKG5leHQpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVHKG5leHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXRoOiBOYXZpZ2F0b3JUaWxlW10gPSB0aGlzLmdldFBhdGgoKTtcbiAgICAgIHRoaXMuZG9uZShwYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRvbmUocGF0aDogTmF2aWdhdG9yVGlsZVtdKSB7XG4gICAgdGhpcy5kZXJlZ2lzdGVyTmF2aWdhdG9yRGF0YSgpO1xuICAgIHRoaXMub25Db21wbGV0ZShwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlRih0aWxlOiBOYXZpZ2F0b3JUaWxlLCBkYXRhOiBOYXZpZ2F0b3JEYXRhKTogbnVtYmVyIHtcbiAgICBjb25zdCBoVmFsID0gdGhpcy5jYWxjdWxhdGVIKHRpbGUpO1xuICAgIHJldHVybiBkYXRhLmdWYWwgKyBoVmFsO1xuICB9XG5cbiAgc3RhdGljIGdldFJvd09mZnNldChpdGVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgLypcbiAgICAgICBpdGVyYXRpb24gPSAwLCAxLCBvciAyOiBbLTFdWy0xXVstMV1cbiAgICAgICBpdGVyYXRpb24gPSAzLCA0LCBvciA1OiBbIDBdWyAwXVsgMF1cbiAgICAgICBpdGVyYXRpb24gPSA2LCA3LCBvciA4OiBbKzFdWysxXVsrMV1cbiAgICAgKi9cbiAgICByZXR1cm4gTmF2aWdhdG9yLm5laWdoYm9yc0NvdW50ICsgLU1hdGguZmxvb3IoKDMyIC0gaXRlcmF0aW9uKSAvIDMpO1xuICB9XG5cbiAgc3RhdGljIGdldENvbE9mZnNldChpdGVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgLypcbiAgICAgICBpdGVyYXRpb24gPSAwLCAxLCBvciAyOiBbLTFdWyAwXVsrMV1cbiAgICAgICBpdGVyYXRpb24gPSAzLCA0LCBvciA1OiBbLTFdWyAwXVsrMV1cbiAgICAgICBpdGVyYXRpb24gPSA2LCA3LCBvciA4OiBbLTFdWyAwXVsrMV1cbiAgICAgKi9cbiAgICByZXR1cm4gKGl0ZXJhdGlvbiAlIDMpIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFyZW50KFxuICAgIHRpbGU6IE5hdmlnYXRvclRpbGUsXG4gICAgY2hlY2tUaWxlOiBOYXZpZ2F0b3JUaWxlLFxuICAgIHRpbGVOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhLFxuICAgIGNoZWNrTmF2RGF0YTogTmF2aWdhdG9yRGF0YVxuICApOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgaWYgKCFjaGVja05hdkRhdGEucGFyZW50KSB7XG4gICAgICBjaGVja05hdkRhdGEucGFyZW50ID0gdGlsZTtcbiAgICAgIHJldHVybiB0aWxlO1xuICAgIH1cblxuICAgIGNvbnN0IG1vdmVDb3N0ID0gdGlsZS5pc0RpYWdvbmFsKGNoZWNrVGlsZSlcbiAgICAgID8gdGhpcy5kaWFnb25hbENvc3RcbiAgICAgIDogdGhpcy52ZXJ0aWNhbENvc3Q7XG5cbiAgICBpZiAodGlsZU5hdkRhdGEuZ1ZhbCArIG1vdmVDb3N0IDwgY2hlY2tOYXZEYXRhLmdWYWwpIHtcbiAgICAgIGNoZWNrTmF2RGF0YS5wYXJlbnQgPSB0aWxlO1xuICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNob29zZU5leHQoKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIHRoaXMub3Blbi5zb3J0KChhOiBOYXZpZ2F0b3JUaWxlLCBiOiBOYXZpZ2F0b3JUaWxlKSA9PiB7XG4gICAgICBjb25zdCBhTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IGEuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICAgIGNvbnN0IGJOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gYi5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuXG4gICAgICByZXR1cm4gYU5hdkRhdGEuZlZhbCAtIGJOYXZEYXRhLmZWYWw7XG4gICAgfSk7XG4gICAgY29uc3QgbmV4dDogTmF2aWdhdG9yVGlsZSB8IHVuZGVmaW5lZCA9IHRoaXMub3BlblswXTtcblxuICAgIGlmICghbmV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuLnNoaWZ0KCk7XG4gICAgdGhpcy5jbG9zZWQucHVzaChuZXh0KTtcblxuICAgIGlmIChuZXh0LmlkID09PSB0aGlzLmVuZC5pZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICBwcml2YXRlIGdldFBhdGgoKTogTmF2aWdhdG9yVGlsZVtdIHtcbiAgICB0aGlzLl9wYXRoID0gW107XG4gICAgbGV0IGN1cnJlbnQ6IE5hdmlnYXRvclRpbGUgPSB0aGlzLmVuZDtcblxuICAgIHdoaWxlIChjdXJyZW50LmlkICE9PSB0aGlzLmJlZ2luLmlkKSB7XG4gICAgICBjb25zdCBjdXJyZW50TmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IGN1cnJlbnQuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICAgIHRoaXMuX3BhdGgucHVzaChjdXJyZW50KTtcblxuICAgICAgaWYgKGN1cnJlbnROYXZEYXRhLnBhcmVudCkge1xuICAgICAgICBjdXJyZW50ID0gY3VycmVudE5hdkRhdGEucGFyZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3BhdGgucmV2ZXJzZSgpO1xuICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUb0V4cGxvcmVkKHRpbGU6IE5hdmlnYXRvclRpbGUpOiB2b2lkIHtcbiAgICBpZiAoIWNvbnRhaW5zKHRoaXMucmVnaXN0ZXJlZFRpbGVzLCB0aWxlKSkge1xuICAgICAgdGhpcy5yZWdpc3RlcmVkVGlsZXMucHVzaCh0aWxlKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGlkIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB1bmlxdWVJZCB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IE5hdmlnYXRvciBmcm9tICcuL05hdmlnYXRvcic7XG5pbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0b3JEYXRhIGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyO1xuICBoVmFsOiBudW1iZXI7IC8vIGRpc3RhbmNlIGZyb20gZW5kXG4gIGdWYWw6IG51bWJlcjsgLy8gZGlzdGFuY2UgZnJvbSBzdGFydFxuICBmVmFsOiBudW1iZXI7IC8vIGdDb3N0ICsgaENvc3RcbiAgcGFyZW50OiBOYXZpZ2F0b3JUaWxlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBuYXZpZ2F0b3I6IE5hdmlnYXRvcikge1xuICAgIHRoaXMuaWQgPSBuYXZpZ2F0b3IuaWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IGlkLCBwb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IE5hdmlnYXRvciBmcm9tICcuL05hdmlnYXRvcic7XG5pbXBvcnQgTmF2aWdhdG9yRGF0YSBmcm9tICcuL05hdmlnYXRvckRhdGEnO1xuaW1wb3J0IHsgY29udGFpbnMsIHVuaXF1ZUlkLCByZW1vdmVGcm9tQXJyYXksIGZpbmRJbmRleCB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdG9yVGlsZSBpbXBsZW1lbnRzIGlkIHtcbiAgaWQ6IG51bWJlciA9IHVuaXF1ZUlkKCk7XG4gIGlzT2JzdGFjbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIG5hdmlnYXRvcnM6IE5hdmlnYXRvckRhdGFbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHBvc2l0aW9uOiBWZWN0b3IpIHt9XG5cbiAgcmVnaXN0ZXJOYXZpZ2F0b3JEYXRhKG5hdmlnYXRvcjogTmF2aWdhdG9yKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbmF2aWdhdGlvbkRhdGE6IE5hdmlnYXRvckRhdGEgPSBuZXcgTmF2aWdhdG9yRGF0YShuYXZpZ2F0b3IpO1xuXG4gICAgaWYgKGNvbnRhaW5zKHRoaXMubmF2aWdhdG9ycywgbmF2aWdhdGlvbkRhdGEpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5uYXZpZ2F0b3JzLnB1c2gobmF2aWdhdGlvbkRhdGEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZGVyZWdpc3Rlck5hdmlnYXRvckRhdGEobmF2aWdhdG9yOiBOYXZpZ2F0b3IpOiBib29sZWFuIHtcbiAgICBjb25zdCBuYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gdGhpcy5nZXROYXZpZ2F0b3JEYXRhKG5hdmlnYXRvcik7XG4gICAgcmV0dXJuIHJlbW92ZUZyb21BcnJheSh0aGlzLm5hdmlnYXRvcnMsIG5hdkRhdGEpO1xuICB9XG5cbiAgZ2V0TmF2aWdhdG9yRGF0YShuYXZpZ2F0b3I6IE5hdmlnYXRvcik6IE5hdmlnYXRvckRhdGEge1xuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSBmaW5kSW5kZXgodGhpcy5uYXZpZ2F0b3JzLCBuYXZpZ2F0b3IpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMubmF2aWdhdG9yc1tpbmRleF07XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YTogTmF2aWdhdG9yRGF0YSA9IG5ldyBOYXZpZ2F0b3JEYXRhKG5hdmlnYXRvcik7XG4gICAgdGhpcy5uYXZpZ2F0b3JzLnB1c2goZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBpc0RpYWdvbmFsKHsgcG9zaXRpb24gfTogTmF2aWdhdG9yVGlsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLnggIT09IHBvc2l0aW9uLnggJiYgdGhpcy5wb3NpdGlvbi55ICE9PSBwb3NpdGlvbi55O1xuICB9XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tICcuL0dyaWQnO1xuaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi9OYXZpZ2F0b3JUaWxlJztcbmltcG9ydCB7IGNvbnRhaW5zLCBmaW5kSW5kZXgsIHJhbmRvbUludCB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHsgcm93IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic3RhY2xlcyB7XG4gIHByaXZhdGUgcmVhZG9ubHkgb3Blbkxpc3Q6IE5hdmlnYXRvclRpbGVbXSA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IGNsb3NlZExpc3Q6IE5hdmlnYXRvclRpbGVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogR3JpZCkge1xuICAgIHRoaXMub3Blbkxpc3QgPSBncmlkLnRpbGVzO1xuICB9XG5cbiAgZ2V0IGxpc3QoKTogTmF2aWdhdG9yVGlsZVtdIHtcbiAgICByZXR1cm4gdGhpcy5jbG9zZWRMaXN0O1xuICB9XG5cbiAgYWRkKHRpbGU6IE5hdmlnYXRvclRpbGUpOiBib29sZWFuIHtcbiAgICB0aWxlLmlzT2JzdGFjbGUgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGUodHJ1ZSwgdGlsZSk7XG4gIH1cblxuICByZW1vdmUodGlsZTogTmF2aWdhdG9yVGlsZSk6IGJvb2xlYW4ge1xuICAgIHRpbGUuaXNPYnN0YWNsZSA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGUoZmFsc2UsIHRpbGUpO1xuICB9XG5cbiAgYWRkUmFuZG9tKGNvdW50OiBudW1iZXIgPSAxKTogTmF2aWdhdG9yVGlsZSB8IHJvdyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVNdWx0aXBsZVJhbmRvbSh0cnVlLCBjb3VudCk7XG4gIH1cblxuICByZW1vdmVSYW5kb20oY291bnQ6IG51bWJlciA9IDEpOiBOYXZpZ2F0b3JUaWxlIHwgcm93IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZU11bHRpcGxlUmFuZG9tKGZhbHNlLCBjb3VudCk7XG4gIH1cblxuICBnZXRSYW5kb21PcGVuKCk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5nZXRSYW5kb20odHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdldFJhbmRvbShvcGVuOiBib29sZWFuKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIGNvbnN0IGxpc3QgPSBvcGVuID8gdGhpcy5vcGVuTGlzdCA6IHRoaXMuY2xvc2VkTGlzdDtcbiAgICBjb25zdCByYW5kb206IG51bWJlciA9IHJhbmRvbUludCgwLCBsaXN0Lmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IHRpbGUgPSBsaXN0W3JhbmRvbV07XG4gICAgcmV0dXJuIHRpbGUgPyB0aWxlIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgbWFuaXB1bGF0ZU11bHRpcGxlUmFuZG9tKFxuICAgIGFkZDogYm9vbGVhbixcbiAgICBjb3VudDogbnVtYmVyXG4gICk6IE5hdmlnYXRvclRpbGUgfCByb3cgfCBudWxsIHtcbiAgICBjb25zdCB0aWxlczogcm93ID0gW107XG5cbiAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgdGlsZTogTmF2aWdhdG9yVGlsZSA9IHRoaXMubWFuaXB1bGF0ZVNpbmdsZVJhbmRvbShhZGQpO1xuICAgICAgICB0aWxlcy5wdXNoKHRpbGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY291bnQgPT09IDEgPyB0aWxlc1swXSA6IHRpbGVzO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBtYW5pcHVsYXRlU2luZ2xlUmFuZG9tKGFkZDogYm9vbGVhbik6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICBjb25zdCB0aWxlID0gdGhpcy5nZXRSYW5kb20oYWRkKTtcblxuICAgIGlmICh0aWxlKSB7XG4gICAgICB0aGlzLm1hbmlwdWxhdGUoYWRkLCB0aWxlKTtcbiAgICAgIHJldHVybiB0aWxlO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBtYW5pcHVsYXRlKGFkZDogYm9vbGVhbiwgdGlsZTogTmF2aWdhdG9yVGlsZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzSW52YWxpZDogYm9vbGVhbiA9IGFkZCA/IHRpbGUuaXNPYnN0YWNsZSA6ICF0aWxlLmlzT2JzdGFjbGU7XG5cbiAgICBpZiAoaXNJbnZhbGlkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IGxpc3Q6IE5hdmlnYXRvclRpbGVbXTtcbiAgICBsZXQgb3RoZXJMaXN0OiBOYXZpZ2F0b3JUaWxlW107XG5cbiAgICBpZiAoYWRkKSB7XG4gICAgICBsaXN0ID0gdGhpcy5vcGVuTGlzdDtcbiAgICAgIG90aGVyTGlzdCA9IHRoaXMuY2xvc2VkTGlzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdCA9IHRoaXMuY2xvc2VkTGlzdDtcbiAgICAgIG90aGVyTGlzdCA9IHRoaXMub3Blbkxpc3Q7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRhaW5zKGxpc3QsIHRpbGUpKSB7XG4gICAgICB0aWxlLmlzT2JzdGFjbGUgPSBhZGQ7XG4gICAgICBjb25zdCBpbmRleCA9IGZpbmRJbmRleChsaXN0LCB0aWxlKTtcbiAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIG90aGVyTGlzdC5wdXNoKHRpbGUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tICcuL0dyaWQnO1xuaW1wb3J0IE5hdmlnYXRvciBmcm9tICcuL05hdmlnYXRvcic7XG5pbXBvcnQgTmF2aWdhdG9yRGF0YSBmcm9tICcuL05hdmlnYXRvckRhdGEnO1xuaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi9OYXZpZ2F0b3JUaWxlJztcbmltcG9ydCBPYnN0YWNsZXMgZnJvbSAnLi9PYnN0YWNsZXMnO1xuXG5leHBvcnQgeyBHcmlkLCBOYXZpZ2F0b3IsIE5hdmlnYXRvckRhdGEsIE5hdmlnYXRvclRpbGUsIE9ic3RhY2xlcyB9O1xuIiwiaW1wb3J0IHsgVmVjdG9yLCBTaGFwZSB9IGZyb20gJy4uL2NvbW1vbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1YWRUcmVlIHtcbiAgY2hpbGRyZW46IFF1YWRUcmVlW10gPSBbXTtcbiAgY29udGFpbmVkUG9pbnRzOiBWZWN0b3JbXSA9IFtdO1xuXG4gIHBhcmVudDogUXVhZFRyZWU7XG4gIHByaXZhdGUgY2FwYWNpdHk6IG51bWJlciA9IDE7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNoYXBlOiBTaGFwZSwgcHJpdmF0ZSBwb2ludHM6IFZlY3RvcltdKSB7XG4gICAgdGhpcy5zdGFydChwb2ludHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydChwb2ludHM6IFZlY3RvcltdKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBvaW50OiBWZWN0b3IgPSBwb2ludHNbaV07XG5cbiAgICAgIGlmICghdGhpcy5zaGFwZS5jb250YWluc1BvaW50KHBvaW50KSkgY29udGludWU7XG5cbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lZFBvaW50cy5sZW5ndGggPCB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICAgIHBvaW50LnF1YWRUcmVlID0gdGhpcztcbiAgICAgICAgdGhpcy5jb250YWluZWRQb2ludHMucHVzaChwb2ludCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbnRhaW5lZFBvaW50cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmRpdmlkZShwb2ludHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaW5kQ2hpbGRUaGF0Q29udGFpbnMocG9pbnQ6IFZlY3Rvcik6IFF1YWRUcmVlIHtcbiAgICBjb25zdCBjb250YWluczogYm9vbGVhbiA9IHRoaXMuc2hhcGUuY29udGFpbnNQb2ludChwb2ludCk7XG4gICAgY29uc3QgaGFzQ2hpbGRyZW46IGJvb2xlYW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoY29udGFpbnMpIHtcbiAgICAgIGlmIChoYXNDaGlsZHJlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maW5kKChjaGlsZDogUXVhZFRyZWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQuZmluZENoaWxkVGhhdENvbnRhaW5zKHBvaW50KSAhPT0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGRpdmlkZShwb2ludHM6IFZlY3RvcltdKTogdm9pZCB7XG4gICAgY29uc3Qge1xuICAgICAgdG9wTGVmdCxcbiAgICAgIHRvcFJpZ2h0LFxuICAgICAgYm90dG9tTGVmdCxcbiAgICAgIGJvdHRvbVJpZ2h0LFxuICAgIH0gPSB0aGlzLnNoYXBlLmJvdW5kaW5nQm94O1xuICAgIGNvbnN0IHsgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0IH0gPSB0aGlzLnNoYXBlLmJvdW5kaW5nQm94Lm1pZHBvaW50cztcbiAgICBjb25zdCBjZW50cm9pZDogVmVjdG9yID0gVmVjdG9yLkZpbmRQb2x5Q2VudHJvaWQoW1xuICAgICAgdG9wLFxuICAgICAgYm90dG9tLFxuICAgICAgbGVmdCxcbiAgICAgIHJpZ2h0LFxuICAgIF0pO1xuXG4gICAgY29uc3Qgc2hhcGUxOiBTaGFwZSA9IG5ldyBTaGFwZShbdG9wTGVmdCwgdG9wLCBjZW50cm9pZCwgbGVmdF0pO1xuICAgIGNvbnN0IHF1YWQxOiBRdWFkVHJlZSA9IG5ldyBRdWFkVHJlZShzaGFwZTEsIHBvaW50cyk7XG5cbiAgICBjb25zdCBzaGFwZTI6IFNoYXBlID0gbmV3IFNoYXBlKFt0b3AsIHRvcFJpZ2h0LCByaWdodCwgY2VudHJvaWRdKTtcbiAgICBjb25zdCBxdWFkMjogUXVhZFRyZWUgPSBuZXcgUXVhZFRyZWUoc2hhcGUyLCBwb2ludHMpO1xuXG4gICAgY29uc3Qgc2hhcGUzOiBTaGFwZSA9IG5ldyBTaGFwZShbY2VudHJvaWQsIHJpZ2h0LCBib3R0b21SaWdodCwgYm90dG9tXSk7XG4gICAgY29uc3QgcXVhZDM6IFF1YWRUcmVlID0gbmV3IFF1YWRUcmVlKHNoYXBlMywgcG9pbnRzKTtcblxuICAgIGNvbnN0IHNoYXBlNDogU2hhcGUgPSBuZXcgU2hhcGUoW2NlbnRyb2lkLCBib3R0b20sIGJvdHRvbUxlZnQsIGxlZnRdKTtcbiAgICBjb25zdCBxdWFkNDogUXVhZFRyZWUgPSBuZXcgUXVhZFRyZWUoc2hhcGU0LCBwb2ludHMpO1xuXG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKHF1YWQxLCBxdWFkMiwgcXVhZDMsIHF1YWQ0KTtcblxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQ6IFF1YWRUcmVlKSA9PiB7XG4gICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUXVhZFRyZWUgZnJvbSAnLi9RdWFkVHJlZSc7XG5cbmV4cG9ydCB7IFF1YWRUcmVlIH07XG4iLCJpbXBvcnQgeyBpZCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdW5pcXVlSWQgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gJy4uL2NvbW1vbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2pvaW5lZFNldCBpbXBsZW1lbnRzIGlkIHtcbiAgaWQ6IG51bWJlciA9IHVuaXF1ZUlkKCk7XG4gIHJlYWRvbmx5IHBvaW50czogVmVjdG9yW107XG5cbiAgY29uc3RydWN0b3IocG9pbnQ6IFZlY3Rvcikge1xuICAgIHRoaXMucG9pbnRzID0gW3BvaW50XTtcbiAgfVxuXG4gIGVxdWFscyh7IGlkIH06IERpc2pvaW5lZFNldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlkID09PSBpZDtcbiAgfVxuXG4gIG1lcmdlKHsgcG9pbnRzIH06IERpc2pvaW5lZFNldCk6IERpc2pvaW5lZFNldCB7XG4gICAgcG9pbnRzLmZvckVhY2goKHBvaW50OiBWZWN0b3IpID0+IHtcbiAgICAgIHBvaW50LnNldCA9IHRoaXM7XG4gICAgICB0aGlzLnBvaW50cy5wdXNoKHBvaW50KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IsIExpbmUsIFRyaWFuZ2xlIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBUcmlhbmd1bGF0aW9uIGZyb20gJy4vVHJpYW5ndWxhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1bGwge1xuICByZWFkb25seSBsaW5lczogTGluZVtdID0gW107XG4gIHByaXZhdGUgX3BvaW50czogVmVjdG9yW107XG4gIHByaXZhdGUgcmVhZG9ubHkgdHJpYW5nbGVzOiBUcmlhbmdsZVtdO1xuXG4gIGNvbnN0cnVjdG9yKHsgdHJpYW5nbGVzIH06IFRyaWFuZ3VsYXRpb24pIHtcbiAgICB0aGlzLnRyaWFuZ2xlcyA9IHRyaWFuZ2xlcztcbiAgfVxuXG4gIGdldCBwb2ludHMoKTogVmVjdG9yW10ge1xuICAgIHJldHVybiB0aGlzLl9wb2ludHM7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCB1bmlxdWVMaW5lczogTGluZVtdID0gVHJpYW5nbGUuR2V0VW5pcXVlTGluZXModGhpcy50cmlhbmdsZXMpO1xuICAgIGNvbnN0IHVuaXF1ZVBvaW50czogVmVjdG9yW10gPSBMaW5lLlBvaW50c0Zyb21BcnJheSh1bmlxdWVMaW5lcyk7XG4gICAgY29uc3QgY2N3UG9pbnRzOiBWZWN0b3JbXSA9IFZlY3Rvci5BcnJhbmdlUG9pbnRzQ0NXKHVuaXF1ZVBvaW50cyk7XG4gICAgdGhpcy5fcG9pbnRzID0gVmVjdG9yLlVuaXF1ZUZyb21BcnJheShjY3dQb2ludHMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9wb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpbmU6IExpbmUgPSBuZXcgTGluZSh0aGlzLl9wb2ludHNbaSAtIDFdLCB0aGlzLl9wb2ludHNbaV0pO1xuICAgICAgdGhpcy5saW5lcy5wdXNoKGxpbmUpO1xuICAgIH1cblxuICAgIGNvbnN0IGNsb3NpbmdMaW5lOiBMaW5lID0gbmV3IExpbmUoXG4gICAgICB0aGlzLl9wb2ludHNbdGhpcy5fcG9pbnRzLmxlbmd0aCAtIDFdLFxuICAgICAgdGhpcy5fcG9pbnRzWzBdXG4gICAgKTtcbiAgICB0aGlzLmxpbmVzLnB1c2goY2xvc2luZ0xpbmUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBMaW5lIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBUcmlhbmd1bGF0aW9uIGZyb20gJy4vVHJpYW5ndWxhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmltdW1TcGFubmluZ1RyZWUge1xuICByZWFkb25seSBsaW5lczogTGluZVtdID0gW107XG4gIHByaXZhdGUgX25vbk1pblNwYW5MaW5lczogTGluZVtdID0gW107XG4gIHByaXZhdGUgdW5pcXVlTGluZXM6IExpbmVbXSA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IHRyaWFuZ3VsYXRpb25MaW5lczogTGluZVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoeyBsaW5lcyB9OiBUcmlhbmd1bGF0aW9uKSB7XG4gICAgdGhpcy50cmlhbmd1bGF0aW9uTGluZXMgPSBsaW5lcztcbiAgfVxuXG4gIGdldCBub25NaW5TcGFuTGluZXMoKTogTGluZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fbm9uTWluU3BhbkxpbmVzO1xuICB9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5nZXRMaW5lcygpO1xuXG4gICAgdGhpcy51bmlxdWVMaW5lcy5mb3JFYWNoKChsaW5lOiBMaW5lKSA9PiBsaW5lLm1ha2VEaXNqb2luZWRTZXRzKCkpO1xuXG4gICAgdGhpcy51bmlxdWVMaW5lcy5mb3JFYWNoKChsaW5lOiBMaW5lLCBpOiBudW1iZXIpID0+IHtcbiAgICAgIGlmICghbGluZS5hLnNldC5lcXVhbHMobGluZS5iLnNldCkpIHtcbiAgICAgICAgbGluZS5iLnNldCA9IGxpbmUuYS5zZXQubWVyZ2UobGluZS5iLnNldCk7XG4gICAgICAgIHRoaXMubGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgdGhpcy5fbm9uTWluU3BhbkxpbmVzW2ldID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX25vbk1pblNwYW5MaW5lcyA9IHRoaXMuX25vbk1pblNwYW5MaW5lcy5maWx0ZXIoKGxpbmU6IExpbmUpID0+IGxpbmUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRMaW5lcygpOiB2b2lkIHtcbiAgICBsZXQgbGluZXM6IExpbmVbXSA9IExpbmUuUmVtb3ZlRHVwbGljYXRlcyh0aGlzLnRyaWFuZ3VsYXRpb25MaW5lcyk7XG4gICAgdGhpcy51bmlxdWVMaW5lcyA9IFsuLi5saW5lc107XG4gICAgdGhpcy5fbm9uTWluU3BhbkxpbmVzID0gWy4uLmxpbmVzXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yLCBMaW5lLCBUcmlhbmdsZSB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgSHVsbCBmcm9tICcuL0h1bGwnO1xuaW1wb3J0IE1pbmltdW1TcGFubmluZ1RyZWUgZnJvbSAnLi9NaW5pbXVtU3Bhbm5pbmdUcmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJpYW5ndWxhdGlvbiB7XG4gIHJlYWRvbmx5IGxpbmVzOiBMaW5lW10gPSBbXTtcbiAgcmVhZG9ubHkgdHJpYW5nbGVzOiBUcmlhbmdsZVtdID0gW107XG4gIHJlYWRvbmx5IE1TVDogTWluaW11bVNwYW5uaW5nVHJlZTtcbiAgcmVhZG9ubHkgaHVsbDogSHVsbDtcbiAgcHJpdmF0ZSBob2xkZXJUcmlhbmdsZTogVHJpYW5nbGUgPSBUcmlhbmd1bGF0aW9uLk1ha2VIb2xkZXJUcmlhbmdsZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHBvaW50czogVmVjdG9yW10pIHtcbiAgICB0aGlzLnRyaWFuZ2xlcy5wdXNoKHRoaXMuaG9sZGVyVHJpYW5nbGUpO1xuICAgIHRoaXMuaHVsbCA9IG5ldyBIdWxsKHRoaXMpO1xuICAgIHRoaXMuTVNUID0gbmV3IE1pbmltdW1TcGFubmluZ1RyZWUodGhpcyk7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLnBvaW50cy5mb3JFYWNoKChwb2ludDogVmVjdG9yKSA9PiB7XG4gICAgICBjb25zdCBiYWRUcmlhbmdsZXM6IFRyaWFuZ2xlW10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMudHJpYW5nbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IHRyaWFuZ2xlOiBUcmlhbmdsZSA9IHRoaXMudHJpYW5nbGVzW2ldO1xuXG4gICAgICAgIGlmICh0cmlhbmdsZS5pc1BvaW50SW5DaXJjdW1jaXJjbGUocG9pbnQpKSB7XG4gICAgICAgICAgdGhpcy50cmlhbmdsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJhZFRyaWFuZ2xlcy5wdXNoKHRyaWFuZ2xlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB1bmlxdWVMaW5lczogTGluZVtdID0gVHJpYW5nbGUuR2V0VW5pcXVlTGluZXMoYmFkVHJpYW5nbGVzKTtcblxuICAgICAgdW5pcXVlTGluZXMuZm9yRWFjaCgobGluZTogTGluZSkgPT4ge1xuICAgICAgICBjb25zdCB0cmlhbmdsZTogVHJpYW5nbGUgPSBuZXcgVHJpYW5nbGUocG9pbnQsIGxpbmUuYSwgbGluZS5iKTtcbiAgICAgICAgdGhpcy50cmlhbmdsZXMucHVzaCh0cmlhbmdsZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2xlYW5Ib2xkZXJUcmlhbmdsZSgpO1xuICAgIHRoaXMuYWRkRmluaXNoZWRUcmlhbmd1bGF0aW9uTGluZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIE1ha2VIb2xkZXJUcmlhbmdsZSgpOiBUcmlhbmdsZSB7XG4gICAgY29uc3Qgc2lkZTogbnVtYmVyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgY29uc3QgYTogVmVjdG9yID0gbmV3IFZlY3Rvcih7IHg6IHNpZGUgLyAyLCB5OiAtc2lkZSB9KTtcbiAgICBjb25zdCBiOiBWZWN0b3IgPSBuZXcgVmVjdG9yKHsgeDogLXNpZGUsIHk6IHNpZGUgfSk7XG4gICAgY29uc3QgYzogVmVjdG9yID0gbmV3IFZlY3Rvcih7IHg6IHNpZGUsIHk6IHNpZGUgfSk7XG5cbiAgICByZXR1cm4gbmV3IFRyaWFuZ2xlKGEsIGIsIGMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhbkhvbGRlclRyaWFuZ2xlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgYSwgYiwgYyB9ID0gdGhpcy5ob2xkZXJUcmlhbmdsZTtcblxuICAgIGZvciAobGV0IGkgPSB0aGlzLnRyaWFuZ2xlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgdHJpYW5nbGUgPSB0aGlzLnRyaWFuZ2xlc1tpXTtcblxuICAgICAgaWYgKHRyaWFuZ2xlLmhhc0FueVBvaW50KFthLCBiLCBjXSkpIHtcbiAgICAgICAgdGhpcy50cmlhbmdsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkRmluaXNoZWRUcmlhbmd1bGF0aW9uTGluZXMoKTogdm9pZCB7XG4gICAgdGhpcy50cmlhbmdsZXMuZm9yRWFjaCgodHJpYW5nbGU6IFRyaWFuZ2xlKSA9PiB7XG4gICAgICB0aGlzLmxpbmVzLnB1c2goLi4udHJpYW5nbGUubGluZXNBcnJheSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBEaXNqb2luZWRTZXQgZnJvbSAnLi9EaXNqb2luZWRTZXQnO1xuaW1wb3J0IEh1bGwgZnJvbSAnLi9IdWxsJztcbmltcG9ydCBNaW5pbXVtU3Bhbm5pbmdUcmVlIGZyb20gJy4vTWluaW11bVNwYW5uaW5nVHJlZSc7XG5pbXBvcnQgVHJpYW5ndWxhdGlvbiBmcm9tICcuL1RyaWFuZ3VsYXRpb24nO1xuXG5leHBvcnQgeyBEaXNqb2luZWRTZXQsIEh1bGwsIE1pbmltdW1TcGFubmluZ1RyZWUsIFRyaWFuZ3VsYXRpb24gfTtcbiIsImNvbnN0IGNsb25lT2JqZWN0ID0gKG9iamVjdDogYW55KSA9PiAoeyAuLi5vYmplY3QgfSk7XG5cbmNvbnN0IGNsb25lT2JqZWN0QXJyYXkgPSAoYXJyYXk6IGFueSkgPT4gYXJyYXkubWFwKGNsb25lT2JqZWN0KTtcblxuZXhwb3J0IHsgY2xvbmVPYmplY3QsIGNsb25lT2JqZWN0QXJyYXkgfTtcbiIsImltcG9ydCB7IGlkIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbmNvbnN0IGNvbnRhaW5zID0gKGFycmF5OiBpZFtdLCBlbGVtZW50OiBpZCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gZmluZEluZGV4KGFycmF5LCBlbGVtZW50KSAhPT0gLTE7XG59O1xuXG5jb25zdCBmaW5kSW5kZXggPSAoYXJyYXk6IGlkW10sIGZpbmQ6IGlkKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIGFycmF5LmZpbmRJbmRleCgoZWxlbWVudDogaWQpID0+IGVsZW1lbnQuaWQgPT09IGZpbmQuaWQpO1xufTtcblxuY29uc3QgcmVtb3ZlRnJvbUFycmF5ID0gKGFycmF5OiBpZFtdLCBmaW5kOiBpZCk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBpbmRleDogbnVtYmVyID0gZmluZEluZGV4KGFycmF5LCBmaW5kKTtcbiAgcmV0dXJuIHJlbW92ZUZyb21BcnJheUF0SW5kZXgoYXJyYXksIGluZGV4KTtcbn07XG5cbmNvbnN0IHJlbW92ZUZyb21BcnJheUF0SW5kZXggPSAoYXJyYXk6IGlkW10sIGluZGV4OiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCBhcnJheS5sZW5ndGgpIHtcbiAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IHsgY29udGFpbnMsIGZpbmRJbmRleCwgcmVtb3ZlRnJvbUFycmF5LCByZW1vdmVGcm9tQXJyYXlBdEluZGV4IH07XG4iLCJpbXBvcnQgeyBjbG9uZU9iamVjdCwgY2xvbmVPYmplY3RBcnJheSB9IGZyb20gJy4vY2xvbmUnO1xuaW1wb3J0IHsgY29udGFpbnMsIGZpbmRJbmRleCwgcmVtb3ZlRnJvbUFycmF5IH0gZnJvbSAnLi9pZCc7XG5pbXBvcnQgeyBSYWRUb0RlZywgRGVnVG9SYWQgfSBmcm9tICcuL3JhZERlZyc7XG5pbXBvcnQgeyBpc09kZCwgaXNFdmVuLCBpc051bWVyaWMgfSBmcm9tICcuL251bWJlcic7XG5pbXBvcnQge1xuICByYW5kb21JbnQsXG4gIHJhbmRvbUZsb2F0LFxuICByYW5kb21Db2xvcixcbiAgcmFuZG9tUG9pbnQsXG4gIHJhbmRvbVBvaW50cyxcbn0gZnJvbSAnLi9yYW5kb20nO1xuaW1wb3J0IHsgc29ydCwgaW1tdXRhYmxlT2JqZWN0U29ydCB9IGZyb20gJy4vc29ydCc7XG5pbXBvcnQgdG9GbG9hdCBmcm9tICcuL3RvRmxvYXQnO1xuaW1wb3J0IHVuaXF1ZUlkIGZyb20gJy4vdW5pcXVlSUQnO1xuXG5leHBvcnQge1xuICBjbG9uZU9iamVjdCxcbiAgY2xvbmVPYmplY3RBcnJheSxcbiAgY29udGFpbnMsXG4gIGZpbmRJbmRleCxcbiAgcmVtb3ZlRnJvbUFycmF5LFxuICBSYWRUb0RlZyxcbiAgRGVnVG9SYWQsXG4gIGlzT2RkLFxuICBpc0V2ZW4sXG4gIGlzTnVtZXJpYyxcbiAgcmFuZG9tSW50LFxuICByYW5kb21GbG9hdCxcbiAgcmFuZG9tQ29sb3IsXG4gIHNvcnQsXG4gIGltbXV0YWJsZU9iamVjdFNvcnQsXG4gIHRvRmxvYXQsXG4gIHVuaXF1ZUlkLFxuICByYW5kb21Qb2ludCxcbiAgcmFuZG9tUG9pbnRzLFxufTtcbiIsImNvbnN0IGlzT2RkID0gKG46IG51bWJlcikgPT4gTWF0aC5hYnMobiAlIDIpID09PSAxO1xuXG5jb25zdCBpc0V2ZW4gPSAobjogbnVtYmVyKTogYm9vbGVhbiA9PiBuICUgMiA9PT0gMDtcblxuY29uc3QgaXNOdW1lcmljID0gKG46IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobi50b1N0cmluZygpKSkgJiYgaXNGaW5pdGUobik7XG59O1xuXG5leHBvcnQgeyBpc09kZCwgaXNFdmVuLCBpc051bWVyaWMgfTtcbiIsImNvbnN0IFJhZFRvRGVnID0gKHJhZDogbnVtYmVyKTogbnVtYmVyID0+IHJhZCAqICgxODAgLyBNYXRoLlBJKTtcblxuY29uc3QgRGVnVG9SYWQgPSAoZGVnOiBudW1iZXIpOiBudW1iZXIgPT4gZGVnICogKE1hdGguUEkgLyAxODApO1xuXG5leHBvcnQgeyBSYWRUb0RlZywgRGVnVG9SYWQgfTtcbiIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi4vY29tbW9uL1ZlY3Rvcic7XG5pbXBvcnQgQm91bmRpbmdCb3ggZnJvbSAnLi4vY29tbW9uL0JvdW5kaW5nQm94JztcblxuY29uc3QgcmFuZG9tSW50ID0gKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLnJvdW5kKHJhbmRvbUZsb2F0KG1pbiwgbWF4KSk7XG59O1xuXG5jb25zdCByYW5kb21GbG9hdCA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xufTtcblxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gIGNvbnN0IHIgPSByYW5kb21JbnQoMCwgMjU1KTtcbiAgY29uc3QgZyA9IHJhbmRvbUludCgwLCAyNTUpO1xuICBjb25zdCBiID0gcmFuZG9tSW50KDAsIDI1NSk7XG4gIHJldHVybiBgcmdiKCR7cn0sJHtnfSwke2J9KWA7XG59O1xuXG5jb25zdCByYW5kb21Qb2ludCA9ICh7XG4gIHRvcExlZnQsXG4gIHRvcFJpZ2h0LFxuICBib3R0b21MZWZ0LFxufTogQm91bmRpbmdCb3gpOiBWZWN0b3IgPT4ge1xuICBjb25zdCB4ID0gcmFuZG9tSW50KHRvcExlZnQueCwgdG9wUmlnaHQueCk7XG4gIGNvbnN0IHkgPSByYW5kb21JbnQoYm90dG9tTGVmdC55LCB0b3BMZWZ0LnkpO1xuXG4gIHJldHVybiBuZXcgVmVjdG9yKHsgeCwgeSB9KTtcbn07XG5cbmNvbnN0IHJhbmRvbVBvaW50cyA9IChjb3VudDogbnVtYmVyLCBib3g6IEJvdW5kaW5nQm94KTogVmVjdG9yW10gPT4ge1xuICBjb25zdCBwb2ludHM6IFZlY3RvcltdID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgcG9pbnRzLnB1c2gocmFuZG9tUG9pbnQoYm94KSk7XG4gIH1cblxuICByZXR1cm4gcG9pbnRzO1xufTtcblxuZXhwb3J0IHsgcmFuZG9tSW50LCByYW5kb21GbG9hdCwgcmFuZG9tQ29sb3IsIHJhbmRvbVBvaW50LCByYW5kb21Qb2ludHMgfTtcbiIsImltcG9ydCB7IGNsb25lT2JqZWN0QXJyYXkgfSBmcm9tICcuL2Nsb25lJztcblxuY29uc3Qgc29ydCA9IChhcnJheTogYW55W10sIHByb3A6IHN0cmluZyk6IGFueVtdID0+IHtcbiAgcmV0dXJuIGFycmF5LnNvcnQoKGE6IGFueSwgYjogYW55KSA9PiBhW3Byb3BdIC0gYltwcm9wXSk7XG59O1xuXG5jb25zdCBpbW11dGFibGVPYmplY3RTb3J0ID0gKGFycmF5OiBhbnlbXSwgcHJvcDogc3RyaW5nKTogYW55W10gPT4ge1xuICBjb25zdCBjbG9uZTogYW55W10gPSBjbG9uZU9iamVjdEFycmF5KGFycmF5KTtcbiAgcmV0dXJuIHNvcnQoY2xvbmUsIHByb3ApO1xufTtcblxuZXhwb3J0IHsgc29ydCwgaW1tdXRhYmxlT2JqZWN0U29ydCB9O1xuIiwiY29uc3QgZmxvYXRQcmVjaXNpb246IG51bWJlciA9IDI7XG5cbmNvbnN0IHRvRmxvYXQgPSAobnVtYmVyOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gTnVtYmVyKG51bWJlci50b0ZpeGVkKGZsb2F0UHJlY2lzaW9uKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0b0Zsb2F0O1xuIiwibGV0IGlkID0gMDtcblxuY29uc3QgdW5pcXVlSWQgPSAoKTogbnVtYmVyID0+IGlkKys7XG5cbmV4cG9ydCBkZWZhdWx0IHVuaXF1ZUlkO1xuIiwiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy93b3JrZXIuZC50c1wiIC8+XG5pbXBvcnQgV29ya2VyIGZyb20gXCJ3b3JrZXItbG9hZGVyP3B1YmxpY1BhdGg9ZGlzdC8mbmFtZT13b3JrZXIuanMhLi93b3JrZXJcIjtcblxuY29uc3Qgd29ya2VyOiBXb3JrZXIgPSBuZXcgV29ya2VyKCk7XG5jb25zb2xlLmxvZyh3b3JrZXIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==