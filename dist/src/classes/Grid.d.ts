import NavigatorTile from './NavigatorTile';
import size from '../interfaces/size';
import point from '../interfaces/point';
import row from '../interfaces/row';
import Obstacles from './Obstacles';
export default class Grid {
    private size;
    readonly tiles: NavigatorTile[];
    readonly rows: row[];
    readonly obstacles: Obstacles;
    constructor(size?: size);
    randomTile(): NavigatorTile | null;
    randomFreeTile(): NavigatorTile | null;
    findTile(position: point): NavigatorTile | null;
    private static getTile;
    private makeGrid;
}
//# sourceMappingURL=Grid.d.ts.map