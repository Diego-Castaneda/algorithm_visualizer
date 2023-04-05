type GridTypes = "squares" | "hexagons"

interface Grid {
    generateGrid(ctx): any;
}

class SquareGrid implements Grid {
    static readonly type: "squares";
    readonly length: number;
    readonly width: number;

    constructor(length: number, width: number) {
        this.length = length;
        this.width = width
    }

    generateGrid(ctx: any) {
        // Draw elements relative to given context
        const boundingBox = ctx.getBoundingClientRect();
        // const x = e.clientX - boundingBox.left
        // const y = e.clinetY - boundingBox.top
        // Draw shapes
        // ctx.beginPath() // Make sure to include this, otherwise the canvas element will eventually get overloaded at each frame, since it's storing the same path??

        ctx.strokeStyle("green");
        ctx.fillStyle("red");

        ctx.fillRect(boundingBox.left, boundingBox.top, 20, 20)


    }
}
