import Grid from "./components/Grid.vue";
import { Cell } from "./Cell";

interface Searchable {
    getNeighbors(grid: Cell[][], cell: Cell): Cell[];
}

class SquareGrid {
    grid: Cell[][];
    static readonly DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    constructor(grid: Cell[][]) {
        this.grid = grid
    }

    static getNeighbors(grid: Cell[][], cell: Cell) {
        const n = grid.length;
        const m = grid[0].length;
        const neighbors = [];
        for (let [dx, dy] of SquareGrid.DIRECTIONS) {
            let nrow = cell.row + dy;
            let ncol = cell.column + dx;
            if (0 <= nrow  && nrow < n && 0 <= ncol && ncol < m) {
                neighbors.push(grid[nrow][ncol]);
            }
        }

        return neighbors;
    }
}

async function setVisitedWithTimeout (cell: Cell, val: boolean) {
    await new Promise<void>(resolve => {
        setTimeout(() => {
            cell.isVisited = val; //
            resolve();
        }, 10);
    });
};

async function setQueuedWithTimeout (cell: Cell, val: boolean) {
    await new Promise<void>(resolve => {
        setTimeout(() => {
            cell.isQueued = val;
            resolve();
        }, 10);
    });
};

const isSamePosition = (n1: Cell, n2: Cell) => { return n1.row === n2.row &&  n1.column == n2.column};
const refresMilliseconds = .0001;
export function BFS(grid: Cell[][], start: Cell, destination: Cell) {
    console.log("start BFS...");

    // let delayCounter = 0; // This delayCounter to ensure search visualization is incremental (per iteration).

    let queue: Cell[] = [start];
    const visited = new Set();
    let current: Cell = start;
    while(queue.length > 0 && queue !== undefined) {
        // Oooo something new!! The exclamation mark after the shift() call is the non-null assertion operator. This tells Typscript that the result of shift() will not result in `null` or `undefined`.
        // When running in `srict mode` Typescript will gently yell at you indicating that `null` and `undefined` are possible resulting values. In this case we know more information than the Typescript 
        // interpreter: The while loop checks to make sure that the queue has at least one element.
        current = queue.shift()!;
        visited.add(current.id);

        // delayCounter++;
        if (!isSamePosition(current, start) && !isSamePosition(current, destination)) {
            setVisitedWithTimeout(current, true);
            setQueuedWithTimeout(current, false);
            // await new Promise<void>(resolve => {
            //     setTimeout(() => {
            //         current.isVisited = true;
            //         resolve();
            //     });
            // });
            // await new Promise<void>(resolve => {
            //     setTimeout(() => {
            //         current.isQueued = false;
            //         resolve();
            //     })
            // })
            // setTimeout(setVisited, refresMilliseconds * delayCounter, current)
            // setTimeout(setQueued, refresMilliseconds * delayCounter, current, false);
        }

        for (let neighbor of SquareGrid.getNeighbors(grid, current)) {
            if (visited.has(neighbor.id) || neighbor.isBarrier)
                continue;

            if (isSamePosition(neighbor, destination)) {
                queue = [];
                continue;
            }

            queue.push(neighbor);
            // setTimeout(setQueued, refresMilliseconds * delayCounter, neighbor, true);
            setQueuedWithTimeout(neighbor, true);
            // await new Promise<void>(resolve => {
            //     setTimeout(() => {
            //         neighbor.isQueued = true;
            //         resolve();
            //     })
            // });
            visited.add(neighbor.id)
        }
    }
    console.log("finished BFS.");
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function setVisited(cell: Cell) {
    cell.isVisited = true;
}

function setQueued(cell: Cell, val: boolean) {
    cell.isQueued = val;
}

export function DFS(grid: Cell[][], start: Cell, destination: Cell) {
    function DFSHelper(current: Cell, discovered: Set<string>) {

        for (let nei of shuffle(SquareGrid.getNeighbors(grid, current))) {
            if (discovered.has(nei.id) || nei.isBarrier)
                continue;

            if (isSamePosition(nei, destination)) 
                return true;

            discovered.add(nei.id);
            setTimeout(setVisited, refresMilliseconds * counter++, nei);
            if (DFSHelper(nei, discovered)) {
                return true;
            };
        }
    }

    let discovered: Set<string> = new Set();
    discovered.add(start.id);
    let counter = 0;

    DFSHelper(start, discovered);
}
