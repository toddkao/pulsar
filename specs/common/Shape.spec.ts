import { Shape, Vector, Line } from '../../src/common';
import { v00, v01, v03, v11, v10, v30, v33 } from './fixtures/Vectors';
import { ad, de, ef, af, da, ae, ed } from './fixtures/Lines';

describe('common / Shape', () => {
  it('should find its counterclockwise lines', () => {
    const shape: Shape = new Shape([v00, v01, v11, v10]);

    expect(shape.lines).toMatchObject([ad, de, ef, af]);
  });

  it('should find its bounding box', () => {
    const shape: Shape = new Shape([v00, v11, v10]);
    const correct: Line[] = [ae, ed, da, af];

    expect(shape.boundingBox.lines).toMatchObject(correct);
  });

  it('should know if it contains a point', () => {
    const shape: Shape = new Shape([v00, v01, v03, v11, v10, v30, v33]);
    const inside: Vector = new Vector({ x: 2, y: 2 });
    const outside: Vector = new Vector({ x: -1, y: -2 });

    expect(shape.containsPoint(inside)).toBe(true);
    expect(shape.containsPoint(outside)).toBe(false);
  });
});
