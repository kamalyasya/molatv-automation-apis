const env = require('dotenv').config();
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

// token
const loginWithCredentials = (app_key, grant_type, scope, email, password) => { 
  return chai.request(process.env.HOST)
    .post('/accounts/_/oauth2/v1/token')
    .set('Content-Type', 'application/json')
    .send({
      "app_key": app_key,
      "grant_type": grant_type,
      "scope": scope,
      "email": email,
      "password": password
    })
}

// profile
const getProfile = (access_token) => {
  return chai.request(process.env.HOST)
    .get('/accounts/_/v2/profile')
    .set('Authorization', access_token)
}

const updateProfile = (access_token, payload) => {
  chai.request(process.env.HOST)
    .patch('/accounts/_/v2/profile')
    .set('Authorization', access_token)
    .send(payload)
}

// device
const addDevice = (access_token, userId) =>
  chai.request(process.env.HOST)
    .get('/api/v2/videos/drm/add-device')
    .set('Authorization', access_token)
    .query({deviceId: userId, test: 1})

// Playlist Root
const getPlaylistRoot = (platform_id) =>
chai.request(process.env.HOST)
    .get('/api/v2/videos/playlists-root')
    .query({platformId: platform_id})

// Playlist Data by Playlist_id and Language
const getPlaylistByLanguage = (playlist_id, language) =>
chai.request(process.env.HOST)
    .get('/api/v2/videos/playlists/' + playlist_id)
    .query({language: language})

// Geoguard
const checkGeoguard = (video_id) =>
chai.request(process.env.HOST)
    .get('/api/v2/videos/geoguard/check/'+video_id)

//PIN
const getInfoPin = (access_token) => 
  chai.request(process.env.HOST)
    .get('/api/v2/userdata/pin/info')
    .set('Authorization', access_token)

// Multi Country Catalog
const getUserLanguage = () => 
  chai.request(process.env.HOST)
    .get('/api/v2/config/languages')
    .set('Content-Type', 'application/json')

const getUiLanguage = (language, platform_id) => 
  chai.request(process.env.HOST)
    .get('/api/v2/config/ui/language/'+language)
    .set('Content-Type', 'application/json')
    .query({platformId: platform_id})

const getUserDataPreferencesLanguage = (access_token, boolean_null) => 
  chai.request(process.env.HOST)
  .get('/api/v2/userdata/preferences/user-language')
  .set('Content-Type', 'application/json')
  .set('Authorization', access_token)
  .query({null: boolean_null})

// Subscriptions
const getSubscriptionsPackageByPlatformId = (platform_id) => 
  chai.request(process.env.HOST)
  .get('/api/v2/subscriptions/subscriptions')
  .set('Content-Type', 'application/json')
  .query({platformId: platform_id})

// app-params
const getAppParamsByPlatformId = (platform_id) => 
  chai.request(process.env.HOST)
  .get('/api/v2/config/app-params')
  .set('Content-Type', 'application/json')
  .query({platformId: platform_id})

// Main function
const postMethod = (access_token, payload, path) => 
  chai.request(process.env.HOST)
    .post(path)
    .set('Content-Type', 'application/json')
    .set('Authorization', access_token)
    .send(payload)


module.exports = {
  loginWithCredentials,
  getProfile,
  addDevice,
  getPlaylistRoot,
  getPlaylistByLanguage,
  checkGeoguard,
  getInfoPin,
  getUserLanguage,
  getUiLanguage,
  getUserDataPreferencesLanguage,
  getSubscriptionsPackageByPlatformId,
  getAppParamsByPlatformId,
  postMethod
}