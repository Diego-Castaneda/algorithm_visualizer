<script lang="ts" setup>
    
    const emit = defineEmits(['resetSearch', 'search', 'clearGrid'])
    const gridOptions = ["Squares", "Hexagons", "Circles", "64x64"];

    function resetSearch() {
      emit('resetSearch');
    }

    function search() {
      emit('search');
    }

    function clearGrid() {
      emit('clearGrid');
    }
</script>

<template>
    <div class="grid-options">
        <h1> Grid Options </h1>
        <div v-for="option in gridOptions" class="grid-option"> {{ option }} </div>
        <button @click="search()"> Search </button>
        <button @click="resetSearch()"> Reset Search </button>
        <button @click="clearGrid()"> Clear Grid </button>
    </div>
</template>
<style>
.grid-options {
  margin-top: 1%;
  margin-bottom: 1%;
  flex-grow: 1;
  border: #513a52 1px solid;
  border-radius: 12%;
  display: flex;
  flex-direction: column;
  border: #646cffaa 8px solid;
  padding: 2%;
}

.grid-option:hover {
  box-shadow: 3px 3px 5px #646cffaa;
  border: black 1px solid;
}

.grid-option {
  color: #faaa93;
}

h1 {
  color: #74A892;
  font-family: monospace;
}
</style>