import point from '../interfaces/point';
import DisjoinedSet from '../triangulation/DisjoinedSet';
import QuadTree from '../quadtree/QuadTree';
export default class Vector {
    set: DisjoinedSet;
    quadTree: QuadTree;
    x: number;
    y: number;
    private floatPrecision;
    constructor({ x, y }?: point);
    clone(): Vector;
    magnitude(): number;
    dotProduct({ x, y }: Vector): number;
    add(vector: Vector): Vector;
    sub(vector: Vector): Vector;
    normalize(): Vector;
    negative(): Vector;
    perpendicular(): {
        left: Vector;
        right: Vector;
    };
    scale(length: number): Vector;
    angle(vector: Vector): number;
    bisector(vector: Vector): Vector;
    equals(vector: Vector): boolean;
    midpoint(vector: Vector): Vector;
    static RadToDeg(rad: number): number;
    static DegToRad(deg: number): number;
    static FindPolyCentroid(points: Vector[]): Vector;
    static ArrangePointsCCW(points: Vector[]): Vector[];
    static UniqueFromArray(points: Vector[]): Vector[];
}
//# sourceMappingURL=Vector.d.ts.map