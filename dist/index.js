'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const cloneObject = (object) => (Object.assign({}, object));
const cloneObjectArray = (array) => array.map(cloneObject);

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

const RadToDeg = (rad) => rad * (180 / Math.PI);
const DegToRad = (deg) => deg * (Math.PI / 180);

const isOdd = (n) => Math.abs(n % 2) === 1;
const isNumeric = (n) => {
    return !isNaN(parseFloat(n.toString())) && isFinite(n);
};

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
        return RadToDeg(angle);
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
    return new Vector({ x, y });
};
const randomPoints = (count, box) => {
    const points = [];
    for (let i = 0; i < count; i++) {
        points.push(randomPoint(box));
    }
    return points;
};

const sort = (array, prop) => {
    return array.sort((a, b) => a[prop] - b[prop]);
};
const immutableObjectSort = (array, prop) => {
    const clone = cloneObjectArray(array);
    return sort(clone, prop);
};

let id = 0;
const uniqueId = () => id++;

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
        const random = randomInt(0, list.length - 1);
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
        if (contains(list, tile)) {
            tile.isObstacle = add;
            const index = findIndex(list, tile);
            list.splice(index, 1);
            otherList.push(tile);
            return true;
        }
        return false;
    }
}

class NavigatorData {
    constructor(navigator) {
        this.navigator = navigator;
        this.id = navigator.id;
    }
}

class NavigatorTile {
    constructor(position) {
        this.position = position;
        this.id = uniqueId();
        this.isObstacle = false;
        this.navigators = [];
    }
    registerNavigatorData(navigator) {
        const navigationData = new NavigatorData(navigator);
        if (contains(this.navigators, navigationData)) {
            return false;
        }
        this.navigators.push(navigationData);
        return true;
    }
    deregisterNavigatorData(navigator) {
        const navData = this.getNavigatorData(navigator);
        return removeFromArray(this.navigators, navData);
    }
    getNavigatorData(navigator) {
        const index = findIndex(this.navigators, navigator);
        if (index !== -1) {
            return this.navigators[index];
        }
        const data = new NavigatorData(navigator);
        this.navigators.push(data);
        return data;
    }
    isDiagonal({ position }) {
        return this.position.x !== position.x && this.position.y !== position.y;
    }
}

class DisjoinedSet {
    constructor(point) {
        this.id = uniqueId();
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
        const e = new Matrix2(this.x1, 1, this.x2, 1);
        const f = new Matrix2(this.y1, 1, this.y2, 1);
        const g = new Matrix2(this.x3, 1, this.x4, 1);
        const h = new Matrix2(this.y3, 1, this.y4, 1);
        const efgh = new Matrix2(e.determine(), f.determine(), g.determine(), h.determine());
        this.efghDeterminant = efgh.determine();
    }
    get intersects() {
        const areValidCoords = isNumeric(this.point.x) && isNumeric(this.point.y);
        return areValidCoords && this.isOnSegments();
    }
    get point() {
        const x = this.getX();
        const y = this.getY();
        return new Vector({ x, y });
    }
    getX() {
        const a = new Matrix2(this.x1, this.y1, this.x2, this.y2);
        const b = new Matrix2(this.x1, 1, this.x2, 1);
        const c = new Matrix2(this.x3, this.y3, this.x4, this.y4);
        const d = new Matrix2(this.x3, 1, this.x4, 1);
        const abcd = new Matrix2(a.determine(), b.determine(), c.determine(), d.determine());
        return abcd.determine() / this.efghDeterminant;
    }
    getY() {
        const a = new Matrix2(this.x1, this.y1, this.x2, this.y2);
        const b = new Matrix2(this.y1, 1, this.y2, 1);
        const c = new Matrix2(this.x3, this.y3, this.x4, this.y4);
        const d = new Matrix2(this.y3, 1, this.y4, 1);
        const abcd = new Matrix2(a.determine(), b.determine(), c.determine(), d.determine());
        return abcd.determine() / this.efghDeterminant;
    }
    isOnSegments() {
        const a = new Matrix2(this.x1 - this.x3, this.x3 - this.x4, this.y1 - this.y3, this.y3 - this.y4);
        const b = new Matrix2(this.x1 - this.x2, this.x3 - this.x4, this.y1 - this.y2, this.y3 - this.y4);
        const c = new Matrix2(this.x1 - this.x2, this.x1 - this.x3, this.y1 - this.y2, this.y1 - this.y3);
        const d = new Matrix2(this.x1 - this.x2, this.x3 - this.x4, this.y1 - this.y2, this.y3 - this.y4);
        const divisionAB = a.determine() / b.determine();
        const divisionCD = -(c.determine() / d.determine());
        const isOnSegmentA = divisionAB >= 0 && divisionAB <= 1;
        const isOnSegmentB = divisionCD >= 0 && divisionCD <= 1;
        return isOnSegmentA && isOnSegmentB;
    }
}

class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.id = uniqueId();
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
        return new LineIntersection(this, line).intersects;
    }
    intersectionPoint(line) {
        return new LineIntersection(this, line).point;
    }
    makeDisjoinedSets() {
        this.a.set = new DisjoinedSet(this.a);
        this.b.set = new DisjoinedSet(this.b);
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
        this.topLeft = this.topLeft.add(new Vector({ x: -n, y: n }));
        this.topRight = this.topRight.add(new Vector({ x: n, y: n }));
        this.bottomLeft = this.bottomLeft.add(new Vector({ x: -n, y: -n }));
        this.bottomRight = this.bottomRight.add(new Vector({ x: n, y: -n }));
    }
    clone() {
        return new BoundingBox(this.points);
    }
    findCorners() {
        const sortedX = immutableObjectSort(this.points, 'x');
        const sortedY = immutableObjectSort(this.points, 'y');
        const firstX = sortedX[0];
        const firstY = sortedY[0];
        const lastX = sortedX[sortedX.length - 1];
        const lastY = sortedY[sortedY.length - 1];
        this.topLeft = new Vector({ x: firstX.x, y: lastY.y });
        this.topRight = new Vector({ x: lastX.x, y: lastY.y });
        this.bottomRight = new Vector({ x: lastX.x, y: firstY.y });
        this.bottomLeft = new Vector({ x: firstX.x, y: firstY.y });
    }
    makeLines() {
        this.top = new Line(this.topLeft, this.topRight);
        this.right = new Line(this.topRight, this.bottomRight);
        this.bottom = new Line(this.bottomRight, this.bottomLeft);
        this.left = new Line(this.bottomLeft, this.topLeft);
    }
    findLimits() {
        const top = this.topLeft.midpoint(this.topRight);
        const bottom = this.bottomLeft.midpoint(this.bottomRight);
        const left = this.topLeft.midpoint(this.bottomLeft);
        const right = this.topRight.midpoint(this.bottomRight);
        this.limits = { top, bottom, left, right };
    }
}

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

class Shape {
    constructor(points) {
        this.points = points;
        this.lines = Shape.makeLines(points);
        this.boundingBox = new BoundingBox(points);
    }
    containsPoint(point) {
        let intersects = 0;
        const checkPoint = new Vector({
            x: point.x,
            y: Number.MAX_SAFE_INTEGER,
        });
        const checkLine = new Line(point, checkPoint);
        this.lines.forEach((line) => {
            if (line.intersects(checkLine)) {
                intersects++;
            }
        });
        return isOdd(intersects);
    }
    get centroid() {
        return Vector.FindPolyCentroid(this.points);
    }
    static makeLines(points) {
        const lines = [];
        const ccwPoints = Vector.ArrangePointsCCW(points);
        for (let i = 1; i < ccwPoints.length; i++) {
            const a = ccwPoints[i - 1];
            const b = ccwPoints[i];
            const ab = new Line(a, b);
            lines.push(ab);
        }
        const firstPoint = ccwPoints[0];
        const lastPoint = ccwPoints[ccwPoints.length - 1];
        const closingLine = new Line(firstPoint, lastPoint);
        lines.push(closingLine);
        return lines;
    }
}

class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.id = uniqueId();
        const ab = new Line(a, b);
        const bc = new Line(b, c);
        const ca = new Line(c, a);
        this.lines = { ab, bc, ca };
    }
    get centroid() {
        return Vector.FindPolyCentroid(this.points);
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
        const matrix = new Matrix4(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
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
        return lines.filter((line) => Line.IsUnique(line, lines));
    }
}

const defaultSize = { width: 10, height: 10 };
class Grid {
    constructor(size = defaultSize) {
        this.size = size;
        this.onTileCreate = () => { };
        this.obstacles = new Obstacles(this);
        this.tiles = [];
        this.rows = [];
    }
    /** Returns a random tile, can be an obstacle or not. */
    randomTile() {
        const x = randomInt(0, this.size.width - 1);
        const y = randomInt(0, this.size.height - 1);
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
                const pos = new Vector({ x, y });
                const tile = new NavigatorTile(pos);
                this.onTileCreate(tile);
                this.tiles.push(tile);
                row.push(tile);
            }
            this.rows.push(row);
        }
    }
}

class Navigator {
    constructor({ grid, begin, end, onExplore, onComplete, maxSteps, }) {
        this.id = uniqueId();
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
            if (contains(this.closed, exploring)) {
                continue;
            }
            if (tile.id === exploring.id) {
                this.closed.push(exploring);
            }
            else {
                if (!this.getParent(tile, exploring, tileNavData, exploringNavData)) {
                    continue;
                }
                if (!contains(this.open, exploring)) {
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
        if (!contains(this.registeredTiles, tile)) {
            this.registeredTiles.push(tile);
        }
    }
}
Navigator.neighborsCount = 9;

class Hull {
    constructor({ triangles }) {
        this.lines = [];
        this.triangles = triangles;
    }
    get points() {
        return this._points;
    }
    start() {
        const uniqueLines = Triangle.GetUniqueLines(this.triangles);
        const uniquePoints = Line.PointsFromArray(uniqueLines);
        const ccwPoints = Vector.ArrangePointsCCW(uniquePoints);
        this._points = Vector.UniqueFromArray(ccwPoints);
        for (let i = 1; i < this._points.length; i++) {
            const line = new Line(this._points[i - 1], this._points[i]);
            this.lines.push(line);
        }
        const closingLine = new Line(this._points[this._points.length - 1], this._points[0]);
        this.lines.push(closingLine);
    }
}

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
        let lines = Line.RemoveDuplicates(this.triangulationLines);
        this.uniqueLines = [...lines];
        this._nonMinSpanLines = [...lines];
    }
}

class Triangulation {
    constructor(points) {
        this.points = points;
        this.lines = [];
        this.triangles = [];
        this.holderTriangle = Triangulation.MakeHolderTriangle();
        this.triangles.push(this.holderTriangle);
        this.hull = new Hull(this);
        this.MST = new MinimumSpanningTree(this);
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
            const uniqueLines = Triangle.GetUniqueLines(badTriangles);
            uniqueLines.forEach((line) => {
                const triangle = new Triangle(point, line.a, line.b);
                this.triangles.push(triangle);
            });
        });
        this.cleanHolderTriangle();
        this.addFinishedTriangulationLines();
    }
    static MakeHolderTriangle() {
        const side = Number.MAX_SAFE_INTEGER;
        const a = new Vector({ x: side / 2, y: -side });
        const b = new Vector({ x: -side, y: side });
        const c = new Vector({ x: side, y: side });
        return new Triangle(a, b, c);
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
        const centroid = Vector.FindPolyCentroid([
            top,
            bottom,
            left,
            right,
        ]);
        const shape1 = new Shape([topLeft, top, centroid, left]);
        const quad1 = new QuadTree(shape1, points);
        const shape2 = new Shape([top, topRight, right, centroid]);
        const quad2 = new QuadTree(shape2, points);
        const shape3 = new Shape([centroid, right, bottomRight, bottom]);
        const quad3 = new QuadTree(shape3, points);
        const shape4 = new Shape([centroid, bottom, bottomLeft, left]);
        const quad4 = new QuadTree(shape4, points);
        this.children.push(quad1, quad2, quad3, quad4);
        this.children.forEach((child) => {
            child.parent = this;
        });
    }
}

class Component {
    constructor() {
        this.id = uniqueId();
        this.updatePriority = null;
    }
    start() { }
    stop() { }
    update(tickData) { }
}

class Entity {
    constructor() {
        this.id = uniqueId();
        this.components = [];
    }
    start() { }
    stop() { }
}

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

class Invoke extends Component {
    constructor(updater, component, timeout) {
        super();
        this.updater = updater;
        this.component = component;
        this.timeout = timeout;
        this.id = uniqueId();
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

class InvokeRepeating extends Invoke {
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

class Updater {
    constructor() {
        this.onUpdateComplete = new Component();
        this.components = [];
        this.running = false;
        this.clock = new Clock();
        this.entityUpdater = new EntityUpdater(this);
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
        if (behaviour instanceof Component) {
            return this.addComponent(behaviour);
        }
        else {
            return this.entityUpdater.add(behaviour);
        }
    }
    remove(behaviour) {
        if (behaviour instanceof Component) {
            return this.removeComponent(behaviour);
        }
        else {
            return this.entityUpdater.remove(behaviour);
        }
    }
    toggle(behaviour) {
        if (behaviour instanceof Component) {
            return this.toggleComponent(behaviour);
        }
        else {
            return this.entityUpdater.toggle(behaviour);
        }
    }
    isUpdatingComponent(component) {
        return contains(this.components, component);
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
        return removeFromArray(this.components, component);
    }
    toggleComponent(component) {
        if (!this.addComponent(component)) {
            this.removeComponent(component);
            return false;
        }
        return true;
    }
    invoke(component, time) {
        const invoke = new Invoke(this, component, time);
        this.add(invoke);
    }
    invokeRepeating(component, time, times = Infinity) {
        const invoke = new InvokeRepeating(this, component, time, times);
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

exports.Grid = Grid;
exports.Navigator = Navigator;
exports.NavigatorTile = NavigatorTile;
exports.Triangulation = Triangulation;
exports.Hull = Hull;
exports.Vector = Vector;
exports.Line = Line;
exports.Triangle = Triangle;
exports.Shape = Shape;
exports.BoundingBox = BoundingBox;
exports.QuadTree = QuadTree;
exports.uniqueId = uniqueId;
exports.sort = sort;
exports.immutableObjectSort = immutableObjectSort;
exports.contains = contains;
exports.RadToDeg = RadToDeg;
exports.DegToRad = DegToRad;
exports.removeFromArray = removeFromArray;
exports.Entity = Entity;
exports.Component = Component;
exports.Updater = Updater;
exports.randomPoint = randomPoint;
exports.randomPoints = randomPoints;
exports.randomInt = randomInt;
exports.randomFloat = randomFloat;
exports.randomColor = randomColor;
