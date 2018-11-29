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
    <aggregated-data v-if="data.bucket" :buckets="data.bucket"></aggregated-data>
  </div>
</template>

<script>
import fitnessData from '@/utils/fitnessData';
import fitnessService from '@/services/fitnessService';
import AggregatedData from '@/components/AggregatedData';

const TIME_UNITS = {
  day: 'Day',
  week: 'Week',
  month: 'Month',
}

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
      selectedTimeUnit: 'day',
      data: {},
    }
  },
  async created() {
    this.dataSources = await fitnessService.getDataSources();
  },
  methods: {
    mapToDisplayName(dataType) {
      return fitnessData.dataTypes[dataType] ? fitnessData.dataTypes[dataType].name : dataType.replace('com.google.', '')
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
        this.data = await fitnessService.getData(this.selectedDataSource, this.selectedTimeUnit);
      }
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
</style>
