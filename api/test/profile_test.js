const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)
const addContext = require('mochawesome/addContext')

const page = require('../page/profile_page.js');
const { access_token } = require('./login_test.js')

describe('Get Profile - [GET] /accounts/_/v2/profile', () => {
  afterEach(function(){
    if (this.currentTest.state == 'failed') { 
        console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
        console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
        console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
    }
  })

    it('User can get profile', async() => {
      response =  await page.getProfile(access_token)
      
      expect(response.status).to.equal(200)
      expect(response.body.birthdate).to.equal('01022002')
      expect(response.body.data.type).to.be.a("string")

      expect(response.body.data.id).to.equal(1)
      expect(response.body.data.id).to.be.a("number")

      expect(response.body.data.attributes.vuid).to.not.null
      expect(response.body.data.attributes.vuid).to.be.a("string")

      expect(response.body).to.be.jsonSchema(expectJsonSchema)
    })
  })