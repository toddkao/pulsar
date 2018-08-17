import { Shape, Vector } from '../../src/common';
import { QuadTree } from '../../src/quadtree';
import { v00, v01, v11, v10 } from '../common/fixtures/Vectors';

describe('QuadTree', () => {
  it('should divide if there are two points in the same quad', () => {
    const a: Vector = new Vector({ x: 0.1, y: 0.9 });
    const b: Vector = new Vector({ x: 0.9, y: 0.1 });
    const points: Vector[] = [a, b];
    const shapePoints: Vector[] = [v00, v01, v11, v10];
    const shape: Shape = new Shape(shapePoints);
    const quadTree: QuadTree = new QuadTree(shape, points);

    expect(quadTree.children.length).toBe(4);
    expect(quadTree.quad1.containedPoints.length).toBe(0);
    expect(quadTree.quad2.containedPoints.length).toBe(1);
    expect(quadTree.quad3.containedPoints.length).toBe(0);
    expect(quadTree.quad4.containedPoints.length).toBe(1);
  });

  it('should recursively divide if needed', () => {
    const a: Vector = new Vector({ x: 0.1, y: 0.1 });
    const b: Vector = new Vector({ x: 0.2, y: 0.1 });
    const points: Vector[] = [a, b];
    const shapePoints: Vector[] = [v00, v01, v11, v10];
    const shape: Shape = new Shape(shapePoints);
    const quadTree: QuadTree = new QuadTree(shape, points);

    const quad1Children: number = quadTree.quad1.children.length;
    const quad1GrandChildren: number =
      quadTree.quad1.children[0].children.length;

    expect(quad1Children).toBe(4);
    expect(quad1GrandChildren).toBe(4);
  });
});
