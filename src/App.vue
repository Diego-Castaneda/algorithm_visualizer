<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Grid from './components/Grid.vue'
import AlgorithmSelect from './components/AlgorithmSelect.vue'
</script>

<template>
  <div class="container">
    <div class="app-container">
      <Grid msg="Other Message" />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  background-color: #feefc4;
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
