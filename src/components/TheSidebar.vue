<script lang="ts" setup>

const dataStructures = ["Graph", "Linked List", "Stacks"];

</script>

<template>
    <h1> Data Structures </h1>
    <div class="data-structure-list" v-for="ds in dataStructures">
        <div class="ds-option"> {{ ds }} </div>
    </div>
</template>

<style scoped>

.data-structure-list {
    display: flex;
    flex-direction: column;
}

.ds-option {
    font-size: 1.5em;
    color: #faaa93;
}

.ds-option:hover {
    box-shadow: 3px, 3px, 3px #646cffaa;
    border: #646cffaa .1em solid;
    /* background-color: lightgrey; */
    border-radius: .25em;
}

</style>
