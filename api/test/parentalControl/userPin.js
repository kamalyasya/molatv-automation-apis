const env = require('dotenv').config()
const util = require('util')

const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const { getInfoPin, postMethod } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

const expect = chai.expect

describe('Parental Control', () => { 
  describe('User PIN', () => {
    let response
    let auth

    beforeEach( async () => {
      auth = await getTokenFromFile()
    })

    afterEach(function(){
      if(process.env.DEBUG_MODE == 'true') {
        if (this.currentTest.state == 'failed') { 
          console.log("    * Request URL: " + util.inspect(response.request.url,{depth: null, colors: true}) + "\n");
          console.log("    * Request Body: " + util.inspect(response.request._data,{depth: null, colors: true}) + "\n");
          console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
          console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
          console.log("    * Response Body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
        }
      }
    })

    it('Get Info PIN - [GET] /userdata/pin/info', async() => {
      response =  await getInfoPin(auth.auth_token).then(res => res)      
      expect(response.status).to.equal(200)
    })
  
    it('Set PIN - [POST] /userdata/setPin', async() => {
      payload = {
        "PIN": "1234"
      }
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/setPin').then(res => res)      
      expect(response.status).to.be.oneOf([200, 409]);
    })

    it('Check PIN - [POST] /userdata/checkPin', async() => {
      payload = {
        "PIN": "1234"
      }
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/checkPin').then(res => res)
      expect(response.status).to.equal(200)
    })

    it('Change PIN - [POST] /userdata/changePin', async() => {    
      payload = {
        "oldPin": "5678",
        "newPin": "1234"
      }    
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/changePin').then(res => res)
      expect(response.status).to.equal(200)
    })

    it('Forgot PIN - [POST] /userdata/forgotPin', async() => { 
      payload = {
        "password": process.env.ACCOUNT_HBO_PASSWORD
      } 
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/forgotPin').then(res => res)
      expect(response.status).to.equal(200)
    })

    it('Reset PIN - [POST] /userdata/resetPin', async () => {
      payload = {
        "otp": response.body.attributes.otp,
        "pin": "1234"
      } 
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/resetPin').then(res => res)
      expect(response.status).to.equal(200)
    })
  })
})

