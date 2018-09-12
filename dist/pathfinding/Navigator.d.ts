import { row, id, navigatorSettings } from '../interfaces';
export default class Navigator implements id {
    id: number;
    private _path;
    private verticalCost;
    private diagonalCost;
    private static neighborsCount;
    private open;
    private closed;
    private registeredTiles;
    private grid;
    private steps;
    private readonly begin;
    private readonly end;
    private readonly onExplore;
    private readonly onComplete;
    private readonly maxSteps;
    constructor({ grid, begin, end, onExplore, onComplete, maxSteps, }: navigatorSettings);
    readonly path: row;
    /** Begin the pathfinding process. Does not start if destination is an obstacle. */
    start(): boolean;
    private deregisterNavigatorData;
    private calculateH;
    private calculateG;
    private done;
    private calculateF;
    static getRowOffset(iteration: number): number;
    static getColOffset(iteration: number): number;
    private getParent;
    private chooseNext;
    private getPath;
    private addToExplored;
}
//# sourceMappingURL=Navigator.d.ts.map