import { id } from '../interfaces';
import Navigator from './Navigator';
import NavigatorData from './NavigatorData';
import { Vector } from '../common';
export default class NavigatorTile implements id {
    readonly position: Vector;
    id: number;
    isObstacle: boolean;
    hVal: number;
    private navigators;
    constructor(position: Vector);
    registerNavigatorData(navigator: Navigator): boolean;
    unregisterNavigatorData(navigator: Navigator): boolean;
    getNavigatorData(navigator: Navigator): NavigatorData | null;
    isDiagonal({ position }: NavigatorTile): boolean;
}
//# sourceMappingURL=NavigatorTile.d.ts.map