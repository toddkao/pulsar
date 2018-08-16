import Vector from '../common/Vector';
import Shape from '../common/Shape';
export default class QuadTree {
    shape: Shape;
    private points;
    children: QuadTree[];
    containedPoints: Vector[];
    private parent;
    private capacity;
    constructor(shape: Shape, points: Vector[]);
    private start;
    divide(points: Vector[]): void;
}
//# sourceMappingURL=QuadTree.d.ts.map