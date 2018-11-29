<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <router-link to="/" class="logo">
          <img alt="Fitness stats logo" src="./assets/fitness-stats-logo.png">
        </router-link>
        <router-view></router-view>
      </div>
    </section>
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 40px;
}

.logo {
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>
