import Vector from '../triangulation/Vector';
import uniqueID from '../util/uniqueID';
import { contains } from '../util/id';
export default class Navigator {
    constructor(grid, begin, end, onExplore = () => { }, onComplete = Navigator.defaultOnComplete, debug = false, debugMaxSteps = 0, debugInterval = null) {
        this.grid = grid;
        this.begin = begin;
        this.end = end;
        this.onExplore = onExplore;
        this.onComplete = onComplete;
        this.debug = debug;
        this.debugMaxSteps = debugMaxSteps;
        this.debugInterval = debugInterval;
        this.id = uniqueID();
        this._path = [];
        this.tiles = [];
        this.open = [];
        this.closed = [];
        this.debugSteps = 0;
        this.isDone = false;
        this.forceStop = false;
    }
    get path() {
        return this._path;
    }
    start() {
        this.addOpenTiles(this.grid);
        this.calculateH();
        this.closed.push(this.begin);
        const beginNavData = this.begin.getNavigatorData(this);
        beginNavData.gVal = 0;
        this.calculateG(this.begin);
    }
    stop() {
        this.forceStop = true;
    }
    addOpenTiles(grid) {
        grid.rows.forEach((row) => {
            const navigatorTiles = row.map((tile) => {
                tile.registerNavigatorData(this);
                return tile;
            });
            this.tiles = this.tiles.concat(navigatorTiles);
        });
    }
    calculateH() {
        this.tiles.forEach((tile) => {
            // manhattan distance
            const navData = tile.getNavigatorData(this);
            const colVal = Math.abs(tile.position.x - this.end.position.x);
            const rowVal = Math.abs(tile.position.y - this.end.position.y);
            navData.hVal = colVal + rowVal;
        });
    }
    calculateG(tile) {
        this.current = tile;
        const tileNavData = tile.getNavigatorData(this);
        for (let i = 0; i < Navigator.neighborsCount; i++) {
            const x = tile.position.x + Navigator.getColOffset(i);
            const y = tile.position.y + Navigator.getRowOffset(i);
            const exploring = this.grid.findTile(new Vector({ x, y }));
            if (!exploring) {
                continue;
            }
            const exploringNavData = exploring.getNavigatorData(this);
            if (exploring.isObstacle) {
                continue;
            }
            if (contains(this.closed, exploring)) {
                continue;
            }
            if (tile.id === exploring.id) {
                this.closed.push(exploring);
            }
            else {
                if (!this.getParent(tile, exploring)) {
                    continue;
                }
                if (!contains(this.open, exploring)) {
                    this.open.push(exploring);
                }
                if (Navigator.isDiagonal(tile, exploring)) {
                    exploringNavData.gVal = tileNavData.gVal + Navigator.diagonalCost;
                }
                else {
                    exploringNavData.gVal = tileNavData.gVal + Navigator.verticalCost;
                }
            }
            exploringNavData.fVal = this.calculateF(exploring);
        }
        if (this.forceStop)
            return;
        this.isDone = false;
        if (!this.debug) {
            const next = this.chooseNext();
            if (next) {
                if (this.debugInterval === null) {
                    this.onExplore(next);
                    this.calculateG(next);
                }
                else {
                    setTimeout(() => {
                        this.onExplore(next);
                        this.calculateG(next);
                    }, this.debugInterval);
                }
            }
            else {
                const path = this.getPath();
                this.onComplete(path);
            }
        }
        else {
            if (this.debugSteps++ < this.debugMaxSteps) {
                const next = this.chooseNext();
                if (next) {
                    this.onExplore(next);
                    this.calculateG(next);
                }
                else {
                    const path = this.getPath();
                    this.onComplete(path);
                }
            }
        }
    }
    calculateF(tile) {
        const { gVal, hVal } = tile.getNavigatorData(this);
        return gVal + hVal;
    }
    static getRowOffset(iteration) {
        /*
           iteration = 0, 1, or 2: [-1][-1][-1]
           iteration = 3, 4, or 5: [ 0][ 0][ 0]
           iteration = 6, 7, or 8: [+1][+1][+1]
         */
        return Navigator.neighborsCount + -Math.floor((32 - iteration) / 3);
    }
    static getColOffset(iteration) {
        /*
           iteration = 0, 1, or 2: [-1][ 0][+1]
           iteration = 3, 4, or 5: [-1][ 0][+1]
           iteration = 6, 7, or 8: [-1][ 0][+1]
         */
        return (iteration % 3) - 1;
    }
    static isDiagonal(tile, checkTile) {
        return (tile.position.x !== checkTile.position.x &&
            tile.position.y !== checkTile.position.y);
    }
    getParent(tile, checkTile) {
        const tileNavData = tile.getNavigatorData(this);
        const checkNavData = checkTile.getNavigatorData(this);
        if (!checkNavData.parent) {
            checkNavData.parent = tile;
            return tile;
        }
        const moveCost = Navigator.isDiagonal(tile, checkTile)
            ? Navigator.diagonalCost
            : Navigator.verticalCost;
        if (tileNavData.gVal + moveCost < checkNavData.gVal) {
            checkNavData.parent = tile;
            return tile;
        }
        return null;
    }
    chooseNext() {
        this.open.sort((a, b) => {
            const aNavData = a.getNavigatorData(this);
            const bNavData = b.getNavigatorData(this);
            return aNavData.fVal - bNavData.fVal;
        });
        const next = this.open[0];
        if (!next) {
            return null;
        }
        this.open.shift();
        this.closed.push(next);
        if (next.id === this.end.id) {
            this.current = this.end;
            return null;
        }
        return next;
    }
    getPath() {
        this._path = [];
        let { current } = this;
        while (current.id !== this.begin.id) {
            const currentNavData = current.getNavigatorData(this);
            this._path.push(current);
            if (currentNavData.parent) {
                current = currentNavData.parent;
            }
            else {
                break;
            }
        }
        this._path.push(this.begin);
        this._path.reverse();
        this.isDone = true;
        return this._path;
    }
    static defaultOnComplete(path) {
        console.log(path);
    }
}
Navigator.verticalCost = 1;
Navigator.diagonalCost = 1.4;
Navigator.neighborsCount = 9;
//# sourceMappingURL=Navigator.js.map