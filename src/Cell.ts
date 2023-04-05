interface Cell {
    id: string;
    row: number;
    column: number;
    // classes: {
    //     isQueued: boolean;
    // }
    isVisited: boolean;
    isQueued: boolean;
    isCell: boolean;
    isStart: boolean;
    isEnd: boolean;
    isBarrier: boolean;
}

export type { Cell };