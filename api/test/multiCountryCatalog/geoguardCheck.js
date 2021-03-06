const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(require('chai-things'));
chai.use(chaiHttp)

const expect = chai.expect

const { apiRequest } = require('../../common/apiRequest');

describe('Multi country catalog', () => { 
  describe('Indonesian user - [GET] /api/v2/videos/geoguard/check/{video_id}', () => {
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
  
    it('Can play videos with country set to indonesia', async() => {  
      video_id = 'vd71414281'
      option = {
        method: 'get',
        path: '/api/v2/videos/geoguard/check/'+video_id
      }

      response =  await apiRequest(option).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data.type).to.be.a('string')
      expect(response.body.data.type).to.equal('geoguard')
      expect(response.body.data.id).to.be.a('string')
      expect(response.body.data.id).to.equal(video_id)
      expect(response.body.data.attributes).to.be.a('object')
      expect(response.body.data.attributes.isAllowed).to.be.a('boolean')
      expect(response.body.data.attributes.isAllowed).to.equal(true)
    }),

    it('CANNOT play videos with country NOT set to indonesia', async() => {  
      video_id = 'vd71414281'
      option = {
        method: 'get',
        path: '/api/v2/videos/geoguard/check/'+video_id
      }

      response =  await apiRequest(option).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data.type).to.be.a('string')
      expect(response.body.data.type).to.equal('geoguard')
      expect(response.body.data.id).to.be.a('string')
      expect(response.body.data.id).to.equal(video_id)
      expect(response.body.data.attributes).to.be.a('object')
      expect(response.body.data.attributes.isAllowed).to.be.a('boolean')
      // expect(response.body.data.attributes.isAllowed).to.equal(false) // activate when ready
    })
  })
})
