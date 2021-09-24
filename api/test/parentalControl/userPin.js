const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { getInfoPin, postMethod } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

describe('Parental Control', () => { 
  describe('User can set PIN - [POST] /api/v2/userdata/setPin', () => {
    let payload
    let auth
    let response

    beforeEach( async () => {
      auth = await getTokenFromFile()
    })

    afterEach(() => {
      // if (this.currentTest.state == 'failed') { 
      //   console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
      //   console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
      //   console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
      // }
    })

    it('Get Info PIN', async() => {
      const response =  await getInfoPin(auth.auth_token).then(res => res)      
      expect(response.status).to.equal(200)
    })
  
    it('Set PIN', async() => {
      payload = {
        "PIN": "1234"
      }
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/checkPin').then(res => res)
      expect(response.status).to.equal(200)
    })

    it('Check PIN', async() => {
      payload = {
        "PIN": "1234"
      }
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/checkPin').then(res => res)
      expect(response.status).to.equal(200)
    })

    it('Change PIN', async() => {    
      payload = {
        "oldPin": "1234",
        "newPin": "5678"
      }    
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/changePin').then(res => res)
      expect(response.status).to.equal(200)
    })

    it('Forgot PIN', async() => { 
      payload = {
        "password": process.env.ACCOUNT_CINCIN_PASSWORD
      } 
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/forgotPin').then(res => res)
      expect(response.status).to.equal(200)
    })

    it('Reset PIN', async () => {
      console.log('forgot otp=>', typeof response.body.attributes.otp)
      payload = {
        "otp": response.body.attributes.otp,
        "pin": "1234"
      } 
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/resetPin').then(res => res)
      expect(response.status).to.equal(200)
    })
  })
})
