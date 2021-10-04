const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { getMethod, postMethod } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

describe('Parental Control', () => { 
  describe('User can manipulate age limit ', () => {
    let payload    
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

    it('Get age limit - [GET] /api/v2/userdata/parental-control', async() => {
      const response =  await getMethod('/api/v2/userdata/parental-control').then(res => res)      
      expect(response.status).to.equal(200)
    })
  
    it('User can update age limit and parental pin - [POST] /api/v2/userdata/parental-control', async() => {
      payload = {
        "pin": "1234",
        "minAge": 12
      }
      response =  await postMethod(auth.auth_token, payload, '/api/v2/userdata/parental-control').then(res => res)
      expect(response.status).to.equal(200)
    })
  })
})
