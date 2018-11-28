<template>
  <div>
    <h4 class="title is-4">Data per day</h4>
    <table class=table>
      <thead>
        <td>Date</td>
      </thead>
      <tbody>
        <tr v-for="bucket in bucketsReversed" v-bind:key="bucket.startTimeMillis">
          <td>{{ toDateString(bucket.startTimeMillis) }}</td>
          <td v-for="(value, index) in getValues(bucket)" :key="index">
            {{ getPrintableValue(value) }}
          </td>
        </tr>
      </tbody>
    </table>
    <h5 class="title is-5">Raw data</h5>
    <pre>{{ JSON.stringify(buckets, null, 2) }}</pre>
  </div>
</template>

<script>

export default {
  name: 'AggregratedData',
  props: {
    buckets: Array
  },
  computed: {
    bucketsReversed() {
      return this.buckets.slice().reverse();
    }
  },
  methods: {
    getValues(bucket) {
      if( bucket.dataset[0].point.length) {
        return bucket.dataset[0].point[0].value;
      } else {
        return [];
      }
    },
    getPrintableValue(value) {
      if (value.intVal) {
        return value.intVal;
      } else if (value.fpVal) {
        return value.fpVal.toFixed(2);
      } else {
        return value;
      }
    },
    toDateString(timestamp) {
      //const date = new Date(Number(timestamp));
      //return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      //return (new Date(Number(timestamp))).toDateString()
      return (new Date(Number(timestamp))).toLocaleDateString('sv-SE');
    }
  },
}
</script>

<style lang="scss" scoped>
  pre {
    text-align: left;
  }
</style>
