<template>
  <div>
    <h1>Back from authentication</h1>
    <pre>{{ JSON.stringify(result.data, null, 2) }}</pre>
  </div>
</template>

<script>
import authService from '@/services/authService';

export default {
  name: 'Authentication',
  props: {
    msg: String
  },
  data() {
    return {
      result: ''
    }
  },
  methods: {
    
  },
  async created() {
    const hashParams = new URLSearchParams(this.$router.currentRoute.hash);
    const accessToken = hashParams.get('access_token');
    this.$router.push({ hash: '' });
    if (await authService.validateAccessToken(accessToken)) {
      localStorage.accessToken = accessToken;
      this.$router.push('fitnessdata');
    } else {
      this.result = 'Error logging in to google fitness'
    }
  }
}
</script>

<style scoped>
  pre {
    text-align: left;
  }
</style>
