const env = require('dotenv').config();
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const Cookie  ='_csrf='+process.env._csrf
const x_csrf_token = process.env.x_csrf_token

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

// device
const addDevice = (access_token, userId) =>
  chai.request(process.env.HOST)
    .get('/api/v2/videos/drm/add-device')
    .set('Authorization', access_token)
    .query({deviceId: userId, test: 1})


// Main function
const getMethod = (option) => {
  let chaiTest = chai.request(process.env.HOST).get(option.path)
    .set('Content-Type', 'application/json')
    
  if(option.token && option.token !== '') {
    chaiTest.set('Authorization', option.token)
  }

  if(option.useCsrf) {
    chaiTest.set('Cookie', Cookie)
      .set('x-csrf-token', x_csrf_token)
  }

  if(option.query) {
    chaiTest.query(option.query)
  }

  return chaiTest
}

const editMethod = (option, payload) => {
  let chaiTest = chai.request(process.env.HOST)
  if(option.method == 'put') {
    chaiTest = chaiTest.put(option.path)
  } else {
    chaiTest = chaiTest.patch(option.path)
  }

  if(option.token && option.token !== '') {
    chaiTest.set('Authorization', option.token)
  }

  if(option.useCsrf) {
    chaiTest.set('Cookie', Cookie)
      .set('x-csrf-token', x_csrf_token)
  }

  if(option.query) {
    chaiTest.query(option.query)
  }

  return chaiTest.send(payload)
}

const postMethod = (option, payload) => {
  let chaiTest = chai.request(process.env.HOST).post(option.path)
    .set('Content-Type', 'application/json')

  if(option.token && option.token !== '') {
    chaiTest.set('Authorization', option.token)
  }

  if(option.useCsrf) {
    chaiTest.set('Cookie', Cookie)
      .set('x-csrf-token', x_csrf_token)
  }

  if(option.query) {
    chaiTest.query(option.query)
  }

  return chaiTest.send(payload)
}

const deleteMethod = (option, payload) => {
  let chaiTest = chai.request(process.env.HOST).delete(option.path)
    .set('Content-Type', 'application/json')

  if(option.token && option.token !== '') {
    chaiTest.set('Authorization', option.token)
  }

  if(option.useCsrf) {
    chaiTest.set('Cookie', Cookie)
      .set('x-csrf-token', x_csrf_token)
  }

  if(option.query) {
    chaiTest.query(option.query)
  }

  return chaiTest.send(payload).send(payload)
}

const apiRequest = (option, payload) => {
  let chaiTest
  if (option.host && option.host !== '') {
    chaiTest = chai.request(option.host)
  } else {
    chaiTest = chai.request(process.env.HOST)
  }

  if (option.method == 'get') {
    chaiTest = chaiTest.get(option.path)
  } else if(option.method == 'post') {
    chaiTest = chaiTest.post(option.path)
  } else if(option.method == 'put') {
    chaiTest = chaiTest.put(option.path)
  } else if(option.method == 'patch') {
    chaiTest = chaiTest.patch(option.path)
  } else {
    chaiTest = chaiTest.delete(option.path)
  }

  if(option.token && option.token !== '') {
    chaiTest.set('Authorization', option.token)
  }

  if(option.header) {
    option.header.map(function(header, idx) {
      console.log('custom header ==> ', header.attribute, header.value)
      chaiTest.set(header.attribute, header.value)
    })
  }

  if(option.query) {
    chaiTest.query(option.query)
  }

  if(option.method == 'get') {
    return chaiTest
  }

  return chaiTest.send(payload)
}

const signUpVerify = (payload) => 
  chai.request(process.env.HOST)
  .post('/api/v2/accounts/signup/email/verify')
  .set('content-type', 'application/json')
  .set('x-csrf-token', x_csrf_token)
  .set('Cookie', Cookie)
  .send(payload)

const getCsrfToken = () =>
  chai.request(process.env.HOST)
  .get('/accounts/_/v2/__csrf')
  .set('Content-Type', 'application/json')

const logToConsole = (messages) => {
  if(process.env.DEBUG_MODE == 'true') {
    console.log(messages)
  }
}

function sleep(delayInSecond) {
    logToConsole("--- Sleep Started ---")
    var start = new Date().getTime();
    while (new Date().getTime() < start + (1000*delayInSecond));
    logToConsole("--- Sleep Finished ---")
}

module.exports = {
  loginWithCredentials,
  addDevice,
  postMethod,
  getMethod,
  deleteMethod,
  editMethod,
  getCsrfToken,
  apiRequest,
  logToConsole,
  sleep
}