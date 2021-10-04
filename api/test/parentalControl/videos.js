const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { getVideoId } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');
const schemaVideoId = require('../../data/videoId.json');

describe('Parental Control', () => {
  describe('Get data by video_id - [GET] /api/v2/videos/{video_id}?language={language_id}', () => {
    let response
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
  
    it('Get data by video_id', async() => {  
      video_id = 'id-dengan-agerating-baru'
      language_id = 'id'
      response =  await getVideoId(auth.auth_token, video_id, language_id).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.jsonSchema(schemaVideoId);
      
    })
    
  })
})