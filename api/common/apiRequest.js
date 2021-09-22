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

module.exports = {
  loginWithCredentials,
  getProfile,
  addDevice,
  getPlaylistRoot,
  getPlaylistByLanguage,
  checkGeoguard
}