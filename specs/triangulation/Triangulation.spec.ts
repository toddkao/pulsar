import { Triangulation } from '../../src/triangulation';
import { Vector } from '../../src/common';
import { v00, v01, v10, v11 } from '../common/fixtures/Vectors';
import { af, fd, da } from '../common/fixtures/Lines';

describe('triangulation / Triangulation', () => {
  it('should have a correct number of lines', () => {
    const points: Vector[] = [v00, v01, v10, v11];
    const t: Triangulation = new Triangulation(points);

    t.start();

    expect(t.lines.length).toBe(6);
  });

  it('should find its triangulation lines', () => {
    const points: Vector[] = [v00, v01, v10];
    const t: Triangulation = new Triangulation(points);

    t.start();

    expect(t.lines).toMatchObject([da, af, fd]);
  });
});
