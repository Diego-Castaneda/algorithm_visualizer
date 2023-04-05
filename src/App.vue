<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Grid from './components/Grid.vue'
import AlgorithmSelect from './components/AlgorithmSelect.vue'
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <div class="container">
    <div class="app-container">
      <Grid msg="Other Message" />
    </div>
  </div>
  <!-- <div class="test"> Text </div> -->
</template>

<style scoped>

/* .container {
  height: 3000px;
} */
.app-container {
  background-color: #feefc4;
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
}


.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.test {
  display: block;
  border: black 1px solid;
  width: 100%;
  /* position: absolute; */
  left: 0%;

}
</style>
