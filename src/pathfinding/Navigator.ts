import NavigatorTile from './NavigatorTile';
import NavigatorData from './NavigatorData';
import row from '../interfaces/row';
import Grid from './Grid';
import Vector from '../triangulation/Vector';
import uniqueID from '../util/uniqueID';
import id from '../interfaces/id';
import { contains } from '../util/id';
type onExplore = (tile: NavigatorTile) => void;
type onComplete = (path: NavigatorTile[]) => void;

export default class Navigator implements id {
  id: number = uniqueID();
  private _path: row = [];
  static verticalCost: number = 1;
  static diagonalCost: number = 1.4;
  private static neighborsCount: number = 9;
  private tiles: row = [];
  private open: row = [];
  private closed: row = [];
  current: NavigatorTile;
  private debugSteps: number = 0;
  isDone: boolean = false;
  forceStop: boolean = false;

  constructor(
    private grid: Grid,
    public begin: NavigatorTile,
    private end: NavigatorTile,
    private readonly onExplore: onExplore = () => {},
    private readonly onComplete: onComplete = Navigator.defaultOnComplete,
    private debug: boolean = false,
    private debugMaxSteps: number = 0,
    private debugInterval: number = null
  ) {}

  get path(): row {
    return this._path;
  }

  start(): void {
    this.addOpenTiles(this.grid);
    this.calculateH();
    this.closed.push(this.begin);
    const beginNavData: NavigatorData = this.begin.getNavigatorData(this);
    beginNavData.gVal = 0;
    this.calculateG(this.begin);
  }

  stop(): void {
    this.forceStop = true;
  }

  private addOpenTiles(grid: Grid): void {
    grid.rows.forEach((row: row) => {
      const navigatorTiles: NavigatorTile[] = row.map((tile: NavigatorTile) => {
        tile.registerNavigatorData(this);
        return tile;
      });
      this.tiles = this.tiles.concat(navigatorTiles);
    });
  }

  private calculateH(): void {
    this.tiles.forEach((tile: NavigatorTile) => {
      // manhattan distance
      const navData: NavigatorData = tile.getNavigatorData(this);
      const colVal: number = Math.abs(tile.position.x - this.end.position.x);
      const rowVal: number = Math.abs(tile.position.y - this.end.position.y);
      navData.hVal = colVal + rowVal;
    });
  }

  calculateG(tile: NavigatorTile): void {
    this.current = tile;
    const tileNavData = tile.getNavigatorData(this);

    for (let i = 0; i < Navigator.neighborsCount; i++) {
      const x: number = tile.position.x + Navigator.getColOffset(i);
      const y: number = tile.position.y + Navigator.getRowOffset(i);
      const exploring: NavigatorTile | null = this.grid.findTile(
        new Vector({ x, y })
      );

      if (!exploring) {
        continue;
      }

      const exploringNavData: NavigatorData = exploring.getNavigatorData(this);

      if (exploring.isObstacle) {
        continue;
      }

      if (contains(this.closed, exploring)) {
        continue;
      }

      if (tile.id === exploring.id) {
        this.closed.push(exploring);
      } else {
        if (!this.getParent(tile, exploring)) {
          continue;
        }

        if (!contains(this.open, exploring)) {
          this.open.push(exploring);
        }
        
        if (Navigator.isDiagonal(tile, exploring)) {
          exploringNavData.gVal = tileNavData.gVal + Navigator.diagonalCost;
        } else {
          exploringNavData.gVal = tileNavData.gVal + Navigator.verticalCost;
        }
      }

      exploringNavData.fVal = this.calculateF(exploring);
    }

    if (this.forceStop) return;
    this.isDone = false;
    if (!this.debug) {
      const next = this.chooseNext();
  
      if (next) {
        if (this.debugInterval === null) {
          this.onExplore(next);
          this.calculateG(next);
        } else {
          setTimeout(() => {
            this.onExplore(next);
            this.calculateG(next);
          }, this.debugInterval);
        }
      } else {
        const path: NavigatorTile[] = this.getPath();
        this.onComplete(path);
      }
    } else {
      if (this.debugSteps++ < this.debugMaxSteps) {
        const next = this.chooseNext();
    
        if (next) {
          this.onExplore(next);
          this.calculateG(next);
        } else {
          const path: NavigatorTile[] = this.getPath();
          this.onComplete(path);
        }
      }
    }
  }

  private calculateF(tile: NavigatorTile): number {
    const { gVal, hVal }: NavigatorData = tile.getNavigatorData(this);
    return gVal + hVal;
  }

  static getRowOffset(iteration: number): number {
    /*
       iteration = 0, 1, or 2: [-1][-1][-1]
       iteration = 3, 4, or 5: [ 0][ 0][ 0]
       iteration = 6, 7, or 8: [+1][+1][+1]
     */
    return Navigator.neighborsCount + -Math.floor((32 - iteration) / 3);
  }

  static getColOffset(iteration: number): number {
    /*
       iteration = 0, 1, or 2: [-1][ 0][+1]
       iteration = 3, 4, or 5: [-1][ 0][+1]
       iteration = 6, 7, or 8: [-1][ 0][+1]
     */
    return (iteration % 3) - 1;
  }

  static isDiagonal(
    tile: NavigatorTile,
    checkTile: NavigatorTile
  ): boolean {
    return (
      tile.position.x !== checkTile.position.x &&
      tile.position.y !== checkTile.position.y
    );
  }

  private getParent(
    tile: NavigatorTile,
    checkTile: NavigatorTile
  ): NavigatorTile | null {
    const tileNavData: NavigatorData = tile.getNavigatorData(this);
    const checkNavData: NavigatorData = checkTile.getNavigatorData(this);

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

  chooseNext(): NavigatorTile | null {
    this.open.sort((a: NavigatorTile, b: NavigatorTile) => {
      const aNavData: NavigatorData = a.getNavigatorData(this);
      const bNavData: NavigatorData = b.getNavigatorData(this);
      return aNavData.fVal - bNavData.fVal;
    });
    const next: NavigatorTile | undefined = this.open[0];

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

  private getPath(): NavigatorTile[] {
    this._path = [];
    let { current } = this;

    while (current.id !== this.begin.id) {
      const currentNavData: NavigatorData = current.getNavigatorData(this);
      this._path.push(current);

      if (currentNavData.parent) {
        current = currentNavData.parent;
      } else {
        break;
      }
    }

    this._path.push(this.begin);
    this._path.reverse();
    this.isDone = true;
    return this._path;
  }

  private static defaultOnComplete(path: NavigatorTile[]) {
    console.log(path);
  }
}
