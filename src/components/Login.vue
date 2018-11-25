<template>
  <div class="login">
    <h1 class="title">Login to access your fitness data</h1>
    <button class="button is-medium is-primary" @click="login">Login using google</button>
  </div>
</template>

<script>
import authService from '@/services/authService';

export default {
  name: 'Login',
  props: {
    msg: String
  },
  methods: {
    login() {
      authService.login();
    }
  }
}
</script>

<style scoped>
  .login {
    text-align: center;
  }
</style>
