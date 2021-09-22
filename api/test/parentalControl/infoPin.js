const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { getInfoPin } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

describe('Parental Control', () => { 
  describe('Get the user status: whether the PIN has been set or not - [GET] /api/v2/userdata/setPin', () => {
    let auth
    beforeEach( async () => {
      auth = await getTokenFromFile()
    })

    afterEach(function(){
      if (this.currentTest.state == 'failed') { 
          console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
          console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
          console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
      }
    })
  
    it('Get Info PIN', async() => {
      const response =  await getInfoPin(auth.auth_token).then(res => res)      
      expect(response.status).to.equal(200)
    })
  })
})
