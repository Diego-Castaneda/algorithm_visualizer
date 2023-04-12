<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Grid from './components/Grid.vue'
import AlgorithmSelect from './components/AlgorithmSelect.vue'
</script>

<template>
  <div class="app-grid-container">
    <div class="header"> The Header </div>
    <div class="sidebar"> 
      <ul>
        <li> Grid </li>
        <li> Graph </li>
        <li> Linked List </li>
        <li> Stacks </li>
      </ul>
    </div>
    <div class="content"> 
      <Grid/> 
    </div>

  </div>
</template>

<style scoped>

.app-grid-container {
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr 5fr;
  column-gap: 10px;
  height: 100vh;
  width: 100vw;
  background-color: #feefc4;
  position: absolute;
  top: 0;
  left: 0;
}

.header {
  grid-column: 1 / span 2;
  background-color: darkgray;
  border-radius: 10px;
  visibility: hidden;
}

.sidebar {
  border: black 1px solid;
  grid-column: 1 / span 1;
  background-color: #eee;
}

.content {
  grid-column: 2 / span 1;
}

.canvas {
  flex-grow: 1;
  position: absolute;
}
</style>
