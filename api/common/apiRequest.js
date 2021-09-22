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
  console.log('masuk cui', access_token)
  return chai.request(process.env.HOST)
    .get('/accounts/_/v2/profile')
    .set('Authorization', access_token)
}

// device
const addDevice = (user_id) => {
  chai.request(process.env.HOST)
    .get('/api/v2/videos/drm/add-device')
    .set('Authorization', access_token)
    .query({deviceId: userId, test: 1})
}
  
module.exports = {
  loginWithCredentials,
  getProfile,
  addDevice
}