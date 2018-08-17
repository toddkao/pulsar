import { Vector, Shape } from '../common';

export default class QuadTree {
  children: QuadTree[] = [];
  quad1: QuadTree = null;
  quad2: QuadTree = null;
  quad3: QuadTree = null;
  quad4: QuadTree = null;
  containedPoints: Vector[] = [];

  private parent: QuadTree;
  private capacity: number = 1;

  constructor(public shape: Shape, private points: Vector[]) {
    this.start(points);
  }

  private start(points: Vector[]): void {
    for (let i = 0; i < points.length; i++) {
      const point: Vector = points[i];

      if (!this.shape.containsPoint(point)) continue;

      if (this.containedPoints.length < this.capacity) {
        point.quadTree = this;
        this.containedPoints.push(point);
      } else {
        this.containedPoints.length = 0;
        this.divide(points);
        break;
      }
    }
  }

  private divide(points: Vector[]): void {
    const {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    } = this.shape.boundingBox;
    const { top, bottom, left, right } = this.shape.boundingBox.midpoints;
    const centroid: Vector = Vector.FindPolyCentroid([
      top,
      bottom,
      left,
      right,
    ]);

    const shape1: Shape = new Shape([topLeft, top, centroid, left]);
    this.quad1 = new QuadTree(shape1, points);

    const shape2: Shape = new Shape([top, topRight, right, centroid]);
    this.quad2 = new QuadTree(shape2, points);

    const shape3: Shape = new Shape([centroid, right, bottomRight, bottom]);
    this.quad3 = new QuadTree(shape3, points);

    const shape4: Shape = new Shape([centroid, bottom, bottomLeft, left]);
    this.quad4 = new QuadTree(shape4, points);

    this.children.push(this.quad1, this.quad2, this.quad3, this.quad4);

    this.children.forEach((child: QuadTree) => {
      child.parent = this;
    });
  }
}
