import axios from 'axios';

const DATA_SOURCES_ENDPOINT = 'https://www.googleapis.com/fitness/v1/users/me/dataSources';
const DATASET_AGGREGATE_ENDPOINT = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';
const ONE_DAY_IN_MILLIS = 86400000;
const ONE_WEEK_IN_MILLIS = 7 * 86400000;

function getStartOfDay(timestamp) {
  const date = new Date(timestamp);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
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
  async getData(dataSourceId) {
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
          bucketByTime: { durationMillis: ONE_DAY_IN_MILLIS },
          startTimeMillis: getStartOfDay(Date.now() - ONE_WEEK_IN_MILLIS).getTime(),
          endTimeMillis: Date.now(),
        
        }
      });
      return response.data;
    } catch (e) {
      return e;
    }
  },
};