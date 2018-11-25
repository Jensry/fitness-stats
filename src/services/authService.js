import axios from 'axios';

const CLIENT_ID = '292580249990-jekc2juf4mt3gq54u84im245mc2iqjfq.apps.googleusercontent.com';
const OAUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
const FITNESS_ACTIVITY_READ_SCOPE = 'https://www.googleapis.com/auth/fitness.activity.read';
const FITNESS_BODY_READ_SCOPE = 'https://www.googleapis.com/auth/fitness.body.read';
const FITNESS_LOCATION_READ_SCOPE = 'https://www.googleapis.com/auth/fitness.location.read';

function createQuery(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export default {
  login() {
    const params = {
      client_id: CLIENT_ID,
      redirect_uri: `${window.location.origin}/authenticated`,
      response_type: 'token',
      scope: `${FITNESS_ACTIVITY_READ_SCOPE} ${FITNESS_BODY_READ_SCOPE} ${FITNESS_LOCATION_READ_SCOPE}`,
      include_granted_scopes: 'true',
      state: 'pass-through-value',
    };
    window.location.href = `${OAUTH_ENDPOINT}?${createQuery(params)}`;
  },
  async validateAccessToken(accessToken) {
    try {
      const response = await axios.request({
        method: 'post',
        url: TOKEN_INFO_ENDPOINT,
        params: {
          access_token: accessToken,
        },
      });
      return response.status === 200;
    } catch (e) {
      return false;
    }
  },
  async getDataSources(accessToken) {
    try {
      const response = await axios.request({
        method: 'get',
        url: 'https://www.googleapis.com/fitness/v1/users/me/dataSources',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (e) {
      return e;
    }
  },
};