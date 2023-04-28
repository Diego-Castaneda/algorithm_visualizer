
<script lang="ts" setup>

import { defineComponent, reactive, ref, toRef } from 'vue';
import { BFS, DFS } from "./../SearchAlgorithms";
import { Cell } from "./../Cell"
import AlgorithmSelect from "./AlgorithmSelect.vue"
import GridOptions from "./GridOptions.vue"

type Algorithm = 'Breath First Search' | 'Depth First Search' | 'A star'
const DEFAULT_SEARCH_ALGORITHM = BFS;
const stringToAlgorithmMap = new Map([['Breath First Search', BFS], ['Depth First Search', DFS]]);

let mouseIsDown = false;
let updateSource = false;
let updateDestination = false;

const n = 64;
const m = n;

let searchAlgorithm = ref(DEFAULT_SEARCH_ALGORITHM);

const grid: Cell[][] = reactive(intializeGridWithCells(n, m));
console.log("grid initialized...");

const source = ref<Cell>(grid[0][0]);
const destination = ref<Cell>(grid[0][0]);
initializeSourceAndDestination();
console.log("source and destination initialized.");

interface Position {
  row: number;
  column: number;
};

function initializeSourceAndDestination() {
  const randomSource = getRandomRowAndColumn(0, n, m);
  let randomDestination = getRandomRowAndColumn(0, n, m);
  
  while (randomDestination.row === randomSource.row && randomDestination.column === randomSource.column) {
    randomDestination = getRandomRowAndColumn(0, n, m);
  }

  source.value = grid[randomSource.row][randomSource.column];
  destination.value = grid[randomDestination.row][randomDestination.column];

  source.value.isStart = true;
  destination.value.isEnd = true;
}

function getRandomRowAndColumn (min: number, maxRow: number, maxColumn: number): Position {
  const getRandomInt = (min: number, max: number) => { return Math.floor(Math.random() * (max - min) + min); };
  return { row: getRandomInt(min, maxRow), column: getRandomInt(min, maxColumn) };
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

  function handleSearch() {
    let algo = searchAlgorithm.value!;
    algo(grid, source.value, destination.value);
  };

  function mouseDown (event: Event, cell: Cell) {
    event.preventDefault();
    mouseIsDown = true;
    if (cell.isStart || cell.isEnd) {
      updateSource = cell.isStart ? true : false;
      updateDestination = cell.isEnd ? true : false;
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
      cell.isBarrier = cell.isBarrier? false : true;
      lastRow = cell.row;
      lastColumn = cell.column;
    }
  };

  function mouseUp(event: Event, cell: Cell) {
    console.log(`mouse released.`);
    if (updateSource) {
      source.value.isStart = false;
      source.value = cell;
      source.value.isStart = true;
      console.log('updating source...');
    } 
    else if (updateDestination) {
      destination.value.isEnd = false;
      destination.value = cell;
      destination.value.isEnd = true;
      console.log('updating destination...');
    }

    if (updateSource || updateDestination) {
      clearSearchAttributes(cell);
      cell.isBarrier = false;
    }

    mouseIsDown = false;
    updateSource = false;
    updateDestination = false;
  };

  function clearSearchAttributes(cell: Cell) {
    cell.isQueued = false;
    cell.isVisited = false;
  }

  function clearGrid(keepBarriers: boolean) {
    console.log(`clear grid, keep barriers: ${keepBarriers}`);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];
        clearSearchAttributes(cell);
        if (!keepBarriers) 
          cell.isBarrier = false;
      }
    }
  }

  function resetSearch() {
    clearTimeout(undefined);
    console.log('resetting search...')
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        clearSearchAttributes(grid[i][j]);
      }
    }
  }

  function changeAlgorithm(algorithm: Algorithm) {
    console.log(`Changing algorithm to: ${algorithm}`);
    searchAlgorithm.value = stringToAlgorithmMap.get(algorithm);
  }

</script>

<template>
  <div class="container">
    <div class="grid-wrapper">
      <div class="grid">
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
          <div v-for="(cell, colIndex) in row" :key="colIndex" 
          :class="{cell: true, start: cell.isStart, end: cell.isEnd, barrier: cell.isBarrier, queued: cell.isQueued, visited: cell.isVisited}"
          @mousedown="mouseDown($event, cell)"
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
      @clearGrid="clearGrid"></GridOptions>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

@media (max-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
  }

  .grid-wrapper {
    grid-column: 1;
    grid-row: 1 / span 1;
  }

  .options-pane {
    grid-column: 1;
    grid-row: 2 / span 1;
  }
}

.grid-wrapper {
  display: grid;
  background-color: #faaa93;
  flex-grow: 1;
  border: #646cffaa 8px solid;
  border-radius: 3px;
}
.grid {
  display: grid;
  background-color: #faaa93;
  flex-grow: 1;
}

.options-pane {
  display: flex;
  flex-direction: column;
  padding-left: .25em;
  padding-right: .25em;
}

h1 {
  color: #74A892;
  font-family: monospace;
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
  border-radius: 2px;
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
</style>