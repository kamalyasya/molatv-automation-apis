const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(require('chai-things'));
chai.use(chaiHttp)

const expect = chai.expect

const { getUserDataPreferencesLanguage } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

describe('Multi Language UI', () => { 
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

  describe('Get User Preference Language - [GET] /api/v2/userdata/preferences/user-language?null=true/false', () => {  
    it('Get User Preference Language - null=true', async() => {  
      response =  await getUserDataPreferencesLanguage(auth.auth_token, true).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data).to.have.property('type', 'user_language')
      expect(response.body.data).to.have.keys('id', 'type', 'attributes')
      expect(response.body.data.attributes).to.be.a('object')
      expect(response.body.data.attributes).to.have.keys('id', 'userId', 'userLanguage', 'userLanguageAndroid', 'projectId', 'status', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy')
    }),
    it('Get User Preference Language - null=false', async() => {  
      response =  await getUserDataPreferencesLanguage(auth.auth_token, false).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data).to.have.property('type', 'user_language')
      expect(response.body.data).to.have.keys('id', 'type', 'attributes')
      expect(response.body.data.attributes).to.be.a('object')
      expect(response.body.data.attributes).to.have.keys('id', 'userId', 'userLanguage', 'userLanguageAndroid', 'projectId', 'status', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy')
    })
  })
})
