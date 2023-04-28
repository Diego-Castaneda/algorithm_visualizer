<script setup lang="ts">
import Grid from './components/Grid.vue'
import TheSidebar from "./components/TheSidebar.vue"

</script>

<template>
  <div class="app-container">
    <div class="app-content-container">
      <div class="header"> The header </div>
      <div class="sidebar"> <TheSidebar/></div>
      <div class="content"> <Grid/> </div>
      <div class="footer"> The Footer </div>
    </div>
  </div>
</template>

<style scoped>
.app-content-container {
  display: grid;
  grid-template-rows: 100px 1fr 100px;
  grid-template-columns: 1fr 5fr;
  gap: .25rem;
  width: 100vw;
  background-color: #feefc4;
  padding: .25em;
}

.header {
  grid-column: 1 / span 2;
  grid-row: 1 / span 1;
}

.sidebar {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  border: #646cffaa 8px solid;
  border-radius: 3px;
}

.content {
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
}

.footer {
  grid-column: 1 / span 2;
  grid-row: 3;
}
/* *, *::before, *::after { box-sizing: border-box }; */


@media (max-width: 768px) {
  .app-content-container {
    grid-template-rows: 100px 1fr 10fr 100px;
    grid-template-columns: 1fr;
  }
  .header {
    grid-column: 1;
    grid-row: 1 / span 1;
    align-content: center;
  }

  .sidebar {
    grid-column: 1;
    grid-row: 2 / span 1;
  }

  .content {
    grid-column: 1;
    grid-row: 3 / span 1;
  }

  .footer {
    grid-column: 1;
    grid-row: 4 / span 1;
  }
}

</style>
