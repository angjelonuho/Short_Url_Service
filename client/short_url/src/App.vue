<template>
  <div id="app">
    <UrlComponent />
  </div>
</template>

<script>
import UrlComponent from './components/UrlComponent.vue'

export default {
  name: 'App',
  components: {
    UrlComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
