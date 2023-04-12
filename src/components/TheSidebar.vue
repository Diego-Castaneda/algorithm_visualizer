<script lang="ts" setup>

const dataStructures = ["Graph", "Linked List", "Stacks"];

</script>

<template>
    <div class="data-structure-list">
        <ul v-for="ds in dataStructures">
            <li> {{ ds }}</li>
        </ul>
    </div>
</template>

<style scoped>

</style>