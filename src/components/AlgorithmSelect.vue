<script lang="ts" setup>
    import { defineEmits, ref, Ref } from "vue"

    const emit = defineEmits(['changeAlgorithm']);

    const algorithmOptions = ["Breath First Search", "A*", "Depth First Search"];
    let selectedTarget: Ref<EventTarget> | Ref<null> = ref(null);

    function changeAlgorithm(event: Event, selectedAlgo: string) {
        emit('changeAlgorithm', selectedAlgo);

        console.log(`algorithm selected: ${selectedAlgo}`);

        if (selectedTarget.value !== null) {
            selectedTarget.value.classList.remove('selected-algorithm');
        }
        
        selectedTarget.value = event.currentTarget;
        selectedTarget.value.classList.add('selected-algorithm');
    }
</script>

<template>
    <div class="algorithm-select">
        <h1> Algorithms </h1>
        <div v-for="option in algorithmOptions" @click="changeAlgorithm($event, option)" class="option"> 
        {{ option }}
        </div>
    </div>
</template>

<style scoped>
.option, .grid-option {
  color: #faaa93;
}

.option {
  border-radius: 2px;
  flex-grow: 1;
  vertical-align: center;
  margin: 2em 2em;
}

.option:hover {
  box-shadow: 3px 3px 5px #646cffaa;
  border: black 1px solid;
}

.algorithm-select {
  border: #513a52 1px solid;
  border-radius: 10px;
  margin-top: 1%;
  margin-bottom: 1%;
  display: flex;
  flex-direction: column;
  border: #646cffaa 8px solid;
  padding: .5em .25em;
}

.selected-algorithm {
  border: black 1px solid;
  box-shadow: 3px 3px 5px #646cffaa;
}

h1 {
  color: #74A892;
  font-family: monospace;
}


</style>
