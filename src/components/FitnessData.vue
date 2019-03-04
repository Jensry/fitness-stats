<template>
  <div>
    <h1 class="title">Browse your fitness data</h1>
    <div class="field">
      <label class="label">Data Type</label>
      <div class="control">
        <div class="select">
          <select v-model="selectedDataType" required>
            <option value="">Choose data type...</option>
            <option v-for="dataType in getDataTypes()" :key="dataType" :value="dataType">
              {{ mapToDisplayName(dataType) }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Data Source</label>
      <div class="control">
        <div class="select">
          <select v-model="selectedDataSource" required>
            <option value="">Choose data source...</option>
            <option v-for="dataSource in selectableDataSources" :key="dataSource">
              {{ dataSource }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Aggregate by</label>
      <div class="control">
        <div class="select">
          <select v-model="selectedTimeUnit" required>
            <option v-for="(value, key) in getTimeUnits()" :key="key" :value="key">
              {{ value }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <hr>
    <div class="chart">
      <chart v-if="data.bucket" :buckets="data.bucket"></chart>
    </div>
    <aggregated-data v-if="data.bucket" :buckets="data.bucket"></aggregated-data>
    
    <!--pre>{{ JSON.stringify(sessions, null, 2) }}</pre-->
    <pre>{{ JSON.stringify(datasets, null, 2) }}</pre>
  </div>
</template>

<script>
import fitnessHelper from '@/utils/fitnessHelper';
import fitnessService from '@/services/fitnessService';
import AggregatedData from '@/components/AggregatedData';
import Chart from '@/components/Chart';

const TIME_UNITS = {
  day: 'Day',
  week: 'Week',
  month: 'Month',
};

const testChartData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    /*backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],*/
    borderWidth: 1
  }]
};

const testOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
};

export default {
  name: 'FitnessData',
  components: {
    AggregatedData,
    Chart,
  },
  props: {
    msg: String
  },
  data() {
    return {
      dataSources: '',
      selectedDataType: '',
      selectedDataSource: '',
      selectedTimeUnit: 'day',
      data: {},
      sessions: {},
      datasets: {},
      chartData: testChartData,
      chartOptions: testOptions,
    }
  },
  async created() {
    this.dataSources = await fitnessService.getDataSources();
    this.fetchSessions();
  },
  methods: {
    mapToDisplayName(dataType) {
      return fitnessHelper.dataTypes[dataType] ? fitnessHelper.dataTypes[dataType].name : dataType.replace('com.google.', '')
    },
    getDataTypes() {
      if (this.dataSources) {
        return [...new Set(this.dataSources.map(dataSource => dataSource.dataType.name))];
      }
    },
    getTimeUnits() {
      return TIME_UNITS;
    },
    async fetchData() {
      if (this.selectedDataSource) {
        this.data = await fitnessService.getAggregatedData(this.selectedDataSource, this.selectedTimeUnit);
        this.datasets = await fitnessService.getDatasets(this.selectedDataSource);
      }
    },
    async fetchSessions() {
      this.sessions = await fitnessService.getSessions();
    }
  },
  computed: {
    selectableDataSources() {
      if (this.dataSources) {
        return this.dataSources.filter(dataSource => dataSource.dataType.name === this.selectedDataType).map(dataSource => dataSource.dataStreamId);
      }
    },
  },
  watch: {
    async selectedDataSource() {
      this.fetchData();
    },
    async selectedTimeUnit() {
      if (this.selectedDataType && this.selectedDataSource) {
        this.fetchData();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  max-width: 500px;
}
</style>
