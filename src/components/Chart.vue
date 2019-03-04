<template>
  <div>
    <h4 class="title is-4">Heart rate</h4>
    <line-chart :chart-data="chartData" :options="options"></line-chart>
    <!--<table class=table>
      <thead>
        <td>Date</td>
      </thead>
      <tbody>
        <tr v-for="bucket in filteredBuckets" v-bind:key="bucket.startTimeMillis">
          <td>{{ toDateString(bucket.startTimeMillis) }}</td>
          <td v-for="(value, index) in getValues(bucket)" :key="index">
            {{ getPrintableValue(value) }}
          </td>
        </tr>
      </tbody>
    </table>-->
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart'

export default {
  name: 'Chart',
  components: {
    LineChart,
  },
  props: {
    buckets: Array
  },
  data() {
    return {
      chartData: {},
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      },
    }
  },
  mounted() {
    /*{
      labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
    };*/
    this.chartData = {
      labels: this.startDates(),
      datasets: [
        {
          label: 'Average heart rate',
          data: this.average(),
        },
        {
          label: 'Max heart rate',
          data: this.max(),
        },
        {
          label: 'Min heart rate',
          data: this.min(),
        }
      ]
    };
  },
  methods: {
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    filteredBuckets() {
      const reversedBuckets = this.buckets.slice().reverse();
      return reversedBuckets.filter(bucket => bucket.dataset[0].point.length > 0);
    },
    startDates() {
      return this.filteredBuckets().map(bucket => this.toDateString(bucket.startTimeMillis));
    },
    average() {
      return this.filteredBuckets().map(bucket => this.getValues(bucket));
    },
    max() {
      return this.filteredBuckets().map(bucket => this.getMax(bucket));
    },
    min() {
      return this.filteredBuckets().map(bucket => this.getMin(bucket));
    },
    getValues(bucket) {
      console.log(bucket.dataset[0].point[0].value[0].fpVal);
      if( bucket.dataset[0].point.length) {
        return bucket.dataset[0].point[0].value[0].fpVal;
      } else {
        return [];
      }
    },
    getMax(bucket) {
      if( bucket.dataset[0].point.length) {
        return bucket.dataset[0].point[0].value[1].fpVal;
      } else {
        return [];
      }
    },
    getMin(bucket) {
      if( bucket.dataset[0].point.length) {
        return bucket.dataset[0].point[0].value[2].fpVal;
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
</style>
