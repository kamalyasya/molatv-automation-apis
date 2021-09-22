const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { changePin } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

describe('Parental Control', () => { 
  describe('User can change PIN - [POST] /api/v2/userdata/changePin', () => {
    let payload = {
      "oldPin": "1234",
      "newPin": "5678"
    }
    let auth
    beforeEach( async () => {
      auth = await getTokenFromFile()
    })

    afterEach(() => {      
      if (this.currentTest.state == 'failed') { 
        console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
        console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
        console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
      }
    })
  
    it('Change PIN', async() => {        
      response =  await changePin(auth.auth_token, payload).then(res => res)
      expect(response.status).to.equal(200)
    })
  })
})
