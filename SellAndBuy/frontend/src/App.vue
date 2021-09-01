<template >

  <header id="app">
    <img src="./assets/logo.png">
    <setting></setting>
    <router-view/>
  </header>
</template>

<script>
import setting from './components/setting.vue'
export default {
  components: { setting },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightblue;
  margin-top: 0px;
}
</style>
