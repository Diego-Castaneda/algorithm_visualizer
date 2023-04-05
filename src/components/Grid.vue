
<script lang="ts">

import { defineComponent, reactive, ref, toRef } from 'vue';
import { BFS, DFS } from "./../SearchAlgorithms";
import { Cell } from "./../Cell"
import AlgorithmSelect from "./AlgorithmSelect.vue"
import GridOptions from "./GridOptions.vue"

type Algorithm = 'Breath First Search' | 'Depth First Search' | 'A star'
const stringToAlgorithmMap = new Map([['Breath First Search', BFS], ['Depth First Search', DFS]]);
const getRandomInt = (min: number, max: number) => { return Math.floor(Math.random() * (max - min) + min); }

const getRandomRowAndColumn = (min: number, maxRow: number, maxColumn: number) => {
  return [getRandomInt(min, maxRow), getRandomInt(min, maxColumn)];
}

function intializeGridWithCells(rows: number, columns: number) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(new Array(columns).fill(null));
    for (let j = 0; j < columns; j++) {
      grid[i][j] = {
        id: `${i},${j}`, 
        row: i,
        column: j,
        isVisited: false,
        isQueued: false,
        isCell: true,
        isStart: false,
        isEnd: false,
        isBarrier: false
      };
    }
  }
  
  return grid;
}

function getStartAndDestinationCells(grid: Cell[][]) {
  const n : number = grid.length;
  const m : number = grid[0].length;
  const [startRow, startColumn] = getRandomRowAndColumn(0, n, m);
  let [endRow, endColumn] = getRandomRowAndColumn(0, n, m);

  while (startRow === endRow && startColumn === endColumn) {
    [endRow, endColumn] = getRandomRowAndColumn(0, n, m);
  }

  return {start: grid[startRow][startColumn], destination: grid[endRow][endColumn]};
}

// function handleSearch(event, grid: Cell[][], start: Cell, destination: Cell, algorithm: Algorithm) {
//   // BFS(grid, start, destination);
//   algorithm(grid, start, destination);
// }

export default defineComponent({
    // TODO: Color searched cells based on the distance from the start node. Find some need gradient range.
    components: {
      AlgorithmSelect,
      GridOptions
    },
    setup() {
      const DEFAULT_SEARCH_ALGORITHM : Algorithm = 'Breath First Search'

      const n = 64;
      const m = n;

      let searchAlgorithm = ref(stringToAlgorithmMap.get(DEFAULT_SEARCH_ALGORITHM));

      const grid: Cell[][] = reactive(intializeGridWithCells(n, m));

      // let {start, destination} = reactive(getStartAndDestinationCells(grid));
      const result = getStartAndDestinationCells(grid);
      let start = ref(result.start);
      let destination = ref(result.destination);
      start.value.isStart = true;
      destination.value.isEnd = true;

      // toRef(grid);
      function handleSearch() {
        let algo = searchAlgorithm.value;
        algo(grid, start.value, destination.value);
      };

      const handleCellClick = (event: Event, cell: Cell) => {
          mouseDown(event, cell);
          // console.log(`selected algo: ${selectedTarget}`)
      };

      let mouseIsDown = false;
      let updateSource = false;
      let updateDestination = false;

      function mouseDown (event: Event, cell: Cell) {
        event.preventDefault();
        mouseIsDown = true;
        if (cell.isStart || cell.isEnd) {
          // event.currentTarget.classList.toggle("barrier");
          if (cell.isStart) {
            updateSource = true;
          }
          if (cell.isEnd) {
            updateDestination = true;
          }
        }
        else {
          cell.isBarrier = cell.isBarrier? false : true;
        }
      };

      let lastRow: number = -1;
      let lastColumn: number = -1;
      
      function makeBarrierCell(cell: Cell) {
        return mouseIsDown && !(cell.row === lastRow && cell.column === lastColumn) && (!cell.isStart && !cell.isEnd) && !updateSource && !updateDestination;
      };

      function mouseMove(event: Event, cell: Cell) {
        if (makeBarrierCell(cell)) {
          // event.currentTarget.classList.toggle("barrier");
          cell.isBarrier = cell.isBarrier? false : true;
          lastRow = cell.row;
          lastColumn = cell.column;
        }
      };

      function mouseUp(event: Event, cell: Cell) {
        console.log(`mouse released.`);
        if (updateSource) {
          start.value.isStart = false;
          start.value = cell;
          start.value.isStart = true;
          console.log('updating source...');
        } 
        else if (updateDestination) {
          destination.value.isEnd = false;
          destination.value = cell;
          destination.value.isEnd = true;
          console.log('updating destination...');
        }

        mouseIsDown = false;
        updateSource = false;
        updateDestination = false;
      };

      function handleMouseOut() {
        mouseIsDown = false;
        console.log('mouseout');
      }


      // function handleClearGrid(grid: Cell[][]) {
      //   clearGrid(grid);
      //   let result = getStartAndDestinationCells(grid);
      //   start.value = result.start;
      //   destination.value = result.destination;
      //   start.value.isStart = true;
      //   destination.value.isEnd = true;
      // }

      function clearGrid() {
        console.log("clear grid");
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = {
            id: `${i},${j}`, 
            row: i,
            column: j,
            isVisited: false,
            isQueued: false,
            isCell: true,
            isStart: false,
            isEnd: false,
            isBarrier: false
            };
          }
        }
      }

      function resetSearch() {
        clearTimeout(undefined);
        console.log('resetting search...')
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[0].length; j++) {
            const cell = grid[i][j];
            // cell.isBarrier = false;
            cell.isQueued = false;
            cell.isVisited = false;
          }
        }
      }

      function changeAlgorithm(algorithm: Algorithm) {
        console.log(`Changing algorithm to: ${algorithm}`);
        searchAlgorithm.value = stringToAlgorithmMap.get(algorithm);
      }

      return { grid, start, destination, searchAlgorithm, resetSearch, changeAlgorithm, handleCellClick, mouseMove, mouseUp, handleMouseOut, clearGrid, handleSearch};
    }
});

</script>

<template>
  <div class="container">
    <div class="about">
      <h1> About Me </h1>
    </div>
    <div class="grid-wrapper">
      <div class="grid">
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
          <div v-for="(cell, colIndex) in row" :key="colIndex" 
          :class="{cell: true, start: cell.isStart, end: cell.isEnd, barrier: cell.isBarrier, queued: cell.isQueued, visited: cell.isVisited}"
          @mousedown="handleCellClick($event, cell)"
          @mousemove="mouseMove($event, cell)"
          @mouseup=" mouseUp($event, cell)">{{ }}</div>
        </div>
      </div>
    </div>
    <div class="options-pane">
      <AlgorithmSelect @changeAlgorithm="changeAlgorithm($event)"></AlgorithmSelect>
      <GridOptions 
      @search="handleSearch()" 
      @resetSearch="resetSearch()" 
      @clearGrid="clearGrid()"></GridOptions>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  width: 100%;
  height: 80%;
  position: relative;
  left: 0%;
  top: 10%;
}

.about {
  flex-grow: 1;
  width: 20%;
  margin-left: 1%;
  margin-right: 1%;
  border-left: black 1px solid;
  border-right: black 1px solid;
  visibility: hidden;
}
.grid-wrapper {
  display: grid;
  background-color: #faaa93;
  height: 100%; 
  width: 40%;
  flex-grow: 1;
  border: #646cffaa 8px solid;
  border-radius: 2%;
}
.grid {
  display: grid;
  background-color: #faaa93;
  /* height: 100%; 
  width: 40%; */
  flex-grow: 1;
}

.options-pane {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%; 
  width: 20%;
  padding-left: 1%;
  padding-right: 1%;
}

/* .grid-options button {
  width: 100px;
} */

h1 {
  color: #74A892;
  font-family: monospace;
}

.inputs{
  outline: black 1px solid;
}

.row {
  display: flex;
  left: 0;
  top: 0;
}

.cell {
  background-color: #fff;
  outline: black 0.1px solid;
  flex-grow: 1;
  border-radius: 15%;
}

.clicked-cell {
  background-color: red;
}

.start {
  background-color: orange;
}

.end {
  background-color: green;
}
.visited {
  background-color: lightgrey;
}
.queued {
  background-color: aqua;
}
.barrier {
  background-color: brown;
}

.cell:before {
  content: "";
  display: block;
  padding-top: calc(100%/ 20);
}

.cell:hover {
  filter: drop-shadow(0 0 0.5em #646cffaa);
}

.read-the-docs {
  color: #888;
}
.canvas {
  outline: black 3px solid;
}
</style>