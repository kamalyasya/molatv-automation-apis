const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { getMethod } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

describe('Config', () => { 
  describe('Features list in a country ', () => {
    let payload    
    let auth

    beforeEach( async () => {
      auth = await getTokenFromFile()
    })

    afterEach(function() {
      if (this.currentTest.state == 'failed') { 
        console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
        console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
        console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
      }
    })

    it('Get country features - [GET] /api/v2/config/alrez/r/country-features', async() => {
      const response =  await getMethod('/api/v2/config/alrez/r/country-features').then(res => res)      
      expect(response.status).to.equal(200)
    })
  })
})
