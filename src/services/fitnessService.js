import axios from 'axios';

const DATA_SOURCES_ENDPOINT = 'https://www.googleapis.com/fitness/v1/users/me/dataSources';
const DATASET_AGGREGATE_ENDPOINT = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';

function getStartOfDay(timestamp) {
  const date = new Date(timestamp);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

function twoMonthAgo() {
  return new Date().setMonth(new Date().getMonth() - 2);
}

export default {
  async getDataSources() {
    try {
      const response = await axios.request({
        method: 'get',
        url: DATA_SOURCES_ENDPOINT,
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      return response.data.dataSource;
    } catch (e) {
      return e;
    }
  },
  async getAggregatedData(dataSourceId, timeUnit) {
    try {
      const response = await axios.request({
        method: 'post',
        url: DATASET_AGGREGATE_ENDPOINT,
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
        data: {
          aggregateBy: [{
            'dataSourceId': dataSourceId,
          }],
          bucketByTime: {
            period: {
              type: timeUnit,
              value: 1,
              timeZoneId: 'CET',
            },
          },
          startTimeMillis: getStartOfDay(twoMonthAgo()).getTime(),
          endTimeMillis: Date.now(),
        }
      });
      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getSessions() {
    try {
      const response = await axios.request({
        method: 'get',
        url: 'https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=2018-11-01T00:00:00.000Z&endTime=2018-11-28T23:59:59.999Z',
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      return response;
    } catch (e) {
      return e;
    }
  }
};