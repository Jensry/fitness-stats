<template>
  <div id="app">
    <div class="container">
      <router-link to="/" class="logo">
        <img alt="Vue logo" src="./assets/logo.png">
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="scss">
@import "assets/fitness-styles";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
