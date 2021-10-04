const env = require('dotenv').config()
const util = require('util')

const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const { ageRating} = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

const expect = chai.expect

describe('Parental Control', () => { 
  describe('ageRating', () => {
    let response
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

    it('Get ageRating - [GET] /api/v2/videos/age-rating/country', async() => {
      let payload = {
        "name": "Mocha Chai Automation",
        "description": "Umur 13 tahun ke atas",
        "countryId": "id"
      }
      
      response =  await ageRating(auth.auth_token, payload)
          
      expect(response.status).to.equal(200)
    })
  })
})