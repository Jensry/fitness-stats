<template>
  <div>
    <h1 class="title">Browse your fitness data</h1>
    <div class="field">
      <label class="label">Data Type</label>
      <div class="control">
        <div class="select">
          <select v-model="selectedDataType" required>
            <option value="">Choose data type...</option>
            <option v-for="dataType in getDataTypes()" v-bind:key="dataType">
              {{ dataType }}
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
            <option v-for="dataSource in getDataSources()" v-bind:key="dataSource">
              {{ dataSource }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <hr>
    <aggregated-data :buckets="weekData.bucket"></aggregated-data>
  </div>
</template>

<script>
import fitnessService from '@/services/fitnessService';
import AggregatedData from '@/components/AggregatedData';

export default {
  name: 'FitnessData',
  components: {
    AggregatedData,
  },
  props: {
    msg: String
  },
  data() {
    return {
      dataSources: '',
      selectedDataType: '',
      selectedDataSource: '',
      weekData: '',
    }
  },
  async created() {
    this.dataSources = await fitnessService.getDataSources();
  },
  methods: {
    getDataTypes() {
      if (this.dataSources) {
        return [...new Set(this.dataSources.map(dataSource => dataSource.dataType.name))];
      }
    },
    getDataSources() {
      if (this.dataSources) {
        return this.dataSources.filter(dataSource => dataSource.dataType.name === this.selectedDataType).map(dataSource => dataSource.dataStreamId);
      }
    },
  },
  watch: {
    async selectedDataSource() {
      this.weekData = 'Fetching data...'
      if (this.selectedDataSource) {
        this.weekData = await fitnessService.getData(this.selectedDataSource);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  pre {
    text-align: left;
  }
</style>
