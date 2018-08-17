import { Vector, Shape } from '../common';
export default class QuadTree {
    shape: Shape;
    private points;
    children: QuadTree[];
    quad1: QuadTree;
    quad2: QuadTree;
    quad3: QuadTree;
    quad4: QuadTree;
    containedPoints: Vector[];
    private parent;
    private capacity;
    constructor(shape: Shape, points: Vector[]);
    private start;
    private divide;
}
//# sourceMappingURL=QuadTree.d.ts.map