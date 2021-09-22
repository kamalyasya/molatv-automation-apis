const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { forgotPin, resetPin } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

describe('Parental Control', () => { 
  describe('User can reset PIN when user forgets PIN - [POST] /api/v2/userdata/forgotPin', () => {
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
  
    it('forgot PIN', async() => { 
      payload = {
        "password": process.env.ACCOUNT_CINCIN_PASSWORD
      } 
      response =  await forgotPin(auth.auth_token, payload).then(res => res)
      expect(response.status).to.equal(200)
    })

    it('reset PIN', async () => {
      console.log('forgot otp=>', typeof response.body.attributes.otp)
      payload = {
        "otp": response.body.attributes.otp,
        "pin": "1234"
      } 
      response =  await resetPin(auth.auth_token, payload).then(res => res)
      expect(response.status).to.equal(200)
    })
  })
})
