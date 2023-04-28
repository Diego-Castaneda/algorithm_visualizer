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

interface CellStateTransition {
    cell: Cell;
    next: {
        isVisited: boolean,
        isQueued: boolean,
    }
}

const isSamePosition = (n1: Cell, n2: Cell) => { return n1.row === n2.row &&  n1.column == n2.column };

export function BFS(grid: Cell[][], start: Cell, destination: Cell) {
    const stepQueue = []
    let stepTransitions = [];
    console.log("start BFS...");

    let queue: Cell[] = [start];
    const visited = new Set();
    let current: Cell = start;
    while(queue.length > 0 && queue !== undefined) {
        // Oooo something new!! The exclamation mark after the shift() call is the non-null assertion operator. This tells Typscript that the result of shift() will not result in `null` or `undefined`.
        // When running in `srict mode` Typescript will gently yell at you indicating that `null` and `undefined` are possible resulting values. In this case we know more information than the Typescript 
        // interpreter: The while loop checks to make sure that the queue has at least one element.
        current = queue.shift()!;
        visited.add(current.id);

        if (!isSamePosition(current, start) && !isSamePosition(current, destination)) {

            stepTransitions.push(
            {
                cell: current, 
                next: { isVisited: true, isQueued: false }
            });
        }

        for (let neighbor of SquareGrid.getNeighbors(grid, current)) {
            if (visited.has(neighbor.id) || neighbor.isBarrier)
                continue;

            if (isSamePosition(neighbor, destination)) {
                queue = [];
                continue;
            }

            queue.push(neighbor);
            stepTransitions.push(
                {
                    cell: neighbor,
                    next: { isVisited: neighbor.isVisited, isQueued: true }
                }
            )
            visited.add(neighbor.id)
        }

        stepQueue.push(stepTransitions);
        stepTransitions = [];
    }
    console.log("finished BFS.");

    return stepQueue;
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

export function DFS(grid: Cell[][], start: Cell, destination: Cell) {
    const stepQueue = []
    let stepTransitions = [];

    function DFSHelper(current: Cell, discovered: Set<string>) {

        for (let nei of shuffle(SquareGrid.getNeighbors(grid, current))) {
            if (discovered.has(nei.id) || nei.isBarrier)
                continue;

            if (isSamePosition(nei, destination)) 
                return true;

            discovered.add(nei.id);
            stepTransitions.push({
                cell: nei,
                next: { isVisited: true, isQueued: nei.isQueued }
            });

            if (DFSHelper(nei, discovered)) {
                return true;
            };
        }

        stepQueue.push(stepTransitions);
        stepTransitions = [];
    }

    let discovered: Set<string> = new Set();
    discovered.add(start.id);

    DFSHelper(start, discovered);

    return stepQueue;
}
