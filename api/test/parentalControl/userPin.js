const env = require('dotenv').config()
const util = require('util')

const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(require('chai-things'));
chai.use(chaiHttp)

const { getMethod, postMethod, deletePin } = require('../../common/apiRequest');
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
    
    it('Delete PIN - [DELETE] /userdata/pin?app_id=molatv', async() => {
      payload = {
        "userIds": [process.env.ACCOUNT_HBO_USERID]
      }
      response =  await deletePin(auth.auth_token, payload).then(res => res)

      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('string')
      expect(response.body.data).to.equal('OK')
    })

    it('Get Info PIN - [GET] /userdata/pin/info', async() => {
      option = {
        token: auth.auth_token,
        path: '/api/v2/userdata/pin/info'
      }
      
      response =  await getMethod(option).then(res => res)
      
      expect(response.status).to.equal(200)
      // expect(response.body).to.be.a('object')
      // expect(response.body.data).to.be.a('object')
      // expect(response.body.data).to.all.have.keys('type','id', 'attributes')
      // expect(response.body.data.type).to.be.a('string')
      // expect(response.body.data.type).to.equal('preference')
      // expect(response.body.data.id).to.be.a('number')
      // expect(response.body.data.attributes).to.be.a('object')
      // expect(response.body.data.attributes).to.all.have.keys('id', 'isCheckPin')
      // expect(response.body.data.attributes.isCheckPin).to.be.a('boolean')
      // expect(response.body.data.attributes.isCheckPin).to.equal(true)
    })
  
    it('Set PIN - [POST] /userdata/setPin', async() => {
      payload = {
        "PIN": "1234"
      }

      option = {
        token: auth.auth_token,
        path: '/api/v2/userdata/setPin'
      }

      response =  await postMethod(option, payload).then(res => res)      
      expect(response.status).to.be.oneOf([200, 409]);
      expect(response.body).to.be.a('object')

      // if(response.status == 409) {
      //   expect(response.body).to.all.have.keys('errors')
      //   expect(response.body.errors).to.be.a('array')
      // } else if(response.status == 200) {
      //   expect(response.body.data).to.be.a('string')
      //   expect(response.body.data).to.equal('OK')
      // }
    })

    it('Check PIN - [POST] /userdata/checkPin', async() => {
      payload = {
        "PIN": "1234"
      }

      option = {
        token: auth.auth_token,
        path: '/api/v2/userdata/checkPin'
      }

      response =  await postMethod(option, payload).then(res => res)

      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('string')
      expect(response.body.data).to.equal('PIN matched')
    })

    it('Change PIN - [POST] /userdata/changePin', async() => {    
      payload = {
        "oldPin": "1234",
        "newPin": "5678"
      }

      option = {
        token: auth.auth_token,
        path: '/api/v2/userdata/changePin'
      }

      response =  await postMethod(option, payload).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('string')
      expect(response.body.data).to.equal('PIN updated')
    })

    it('Forgot PIN - [POST] /userdata/forgotPin', async() => { 
      payload = {
        "password": process.env.ACCOUNT_HBO_PASSWORD
      }

      option = {
        token: auth.auth_token,
        path: '/api/v2/userdata/forgotPin'
      }
      
      response =  await postMethod(option, payload).then(res => res)
      
      expect(response.status).to.equal(200)
      // expect(response.body).to.be.a('object')
      // expect(response.body.data).to.be.a('object')
      // expect(response.body.data).to.all.have.keys('type','id', 'attributes')
      // expect(response.body.data.type).to.be.a('string')
      // expect(response.body.data.type).to.equal('reset-pin')
      // expect(response.body.data.id).to.be.a('string')
      // expect(response.body.data.attributes).to.be.a('object')
      // expect(response.body.data.attributes).to.all.have.keys('valid', 'otp')
      // expect(response.body.data.attributes.valid).to.be.a('boolean')
      // expect(response.body.data.attributes.valid).to.equal(true)
      // expect(response.body.data.attributes.otp).to.be.a('string')
    })

    it('Reset PIN - [POST] /userdata/resetPin', async () => {
      payload = {
        "otp": response.body.data.attributes.otp,
        "pin": "1234"
      } 

      option = {
        token: auth.auth_token,
        path: '/api/v2/userdata/resetPin'
      }

      response =  await postMethod(option, payload).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('string')
      expect(response.body.data).to.equal('OK')
    })
  })
})

