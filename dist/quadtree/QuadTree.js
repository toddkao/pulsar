import { Vector, Shape } from '../common';
export default class QuadTree {
    constructor(shape, points) {
        this.shape = shape;
        this.points = points;
        this.children = [];
        this.quad1 = null;
        this.quad2 = null;
        this.quad3 = null;
        this.quad4 = null;
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
        this.quad1 = new QuadTree(shape1, points);
        const shape2 = new Shape([top, topRight, right, centroid]);
        this.quad2 = new QuadTree(shape2, points);
        const shape3 = new Shape([centroid, right, bottomRight, bottom]);
        this.quad3 = new QuadTree(shape3, points);
        const shape4 = new Shape([centroid, bottom, bottomLeft, left]);
        this.quad4 = new QuadTree(shape4, points);
        this.children.push(this.quad1, this.quad2, this.quad3, this.quad4);
        this.children.forEach((child) => {
            child.parent = this;
        });
    }
}
//# sourceMappingURL=QuadTree.js.map