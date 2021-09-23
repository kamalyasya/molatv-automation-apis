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
const getInfoPin = (access_token) => {
  return chai.request(process.env.HOST)
    .get('/api/v2/userdata/pin/info')
    .set('Authorization', access_token)
}

const setPin = (access_token, payload) => {
  return chai.request(process.env.HOST)
    .post('/api/v2/userdata/setPin')
    .set('Content-Type', 'application/json')
    .set('Authorization', access_token)
    .send(payload)
}

const changePin = (access_token, payload) => {
  return chai.request(process.env.HOST)
    .post('/api/v2/userdata/changePin')
    .set('Content-Type', 'application/json')
    .set('Authorization', access_token)
    .send(payload)
}

const checkPin = (access_token, payload) => {
  return chai.request(process.env.HOST)
    .post('/api/v2/userdata/checkPin')
    .set('Content-Type', 'application/json')
    .set('Authorization', access_token)
    .send(payload)
}

const forgotPin = (access_token, payload) => {
  return chai.request(process.env.HOST)
    .post('/api/v2/userdata/forgotPin')
    .set('Content-Type', 'application/json')
    .set('Authorization', access_token)
    .send(payload)
}

const resetPin = (access_token, payload) => {
  return chai.request(process.env.HOST)
    .post('/api/v2/userdata/resetPin')
    .set('Content-Type', 'application/json')
    .set('Authorization', access_token)
    .send(payload)
}

module.exports = {
  loginWithCredentials,
  getProfile,
  addDevice,
  getPlaylistRoot,
  getPlaylistByLanguage,
  checkGeoguard,
  setPin,
  getInfoPin,
  changePin,
  checkPin,
  forgotPin,
  resetPin
}