const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(require('chai-things'));
chai.use(chaiHttp)

const expect = chai.expect

const { getUiLanguage } = require('../../common/apiRequest');

describe('Multi Language UI', () => { 
  describe('Get UI Language - [GET] /api/v2/config/ui/language/{language_id}?platformId={platformId}', () => {
    afterEach(function(){
      if (this.currentTest.state == 'failed') { 
          console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
          console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
          console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
      }
    })
  
    it('Get UI Language - EN', async() => {  
      language = 'en'
      platform_id = 1
      
      response =  await getUiLanguage(language, platform_id).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('array')
      expect(response.body.data).to.all.have.property('type', 'ui_language')
      expect(response.body.data).to.all.have.keys('type','id', 'attributes')
      expect(response.body.data[0].attributes).to.be.a('object')
    })
  })
})
