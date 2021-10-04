const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(require('chai-things'));
chai.use(chaiHttp)

const expect = chai.expect

const { getAppParamsByPlatformId } = require('../../common/apiRequest');

describe('GET app-params', () => { 
  describe('GET] /api/v2/config/app-params?platformId={platformId}', () => {
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
  
    it('Get app-params Android platformId 1', async() => {  
      platform_id = 1
      response =  await getAppParamsByPlatformId(platform_id).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data).to.have.property('type', 'config')
      expect(response.body.data).to.have.keys('type','id', 'attributes')
      expect(response.body.data.attributes).to.have.any.keys('tabs','games') //Will add more keys on future
      expect(response.body.data.attributes.tabs).to.be.a('array')
      expect(response.body.data.attributes.tabs).to.have.all.keys('scene_key', 'scene_title', 'scene_src_icon', 'scene')
      
    })

    it('Get app-params MPS platformId 4', async() => {  
      platform_id = 4
      response =  await getAppParamsByPlatformId(platform_id).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data).to.have.property('type', 'config')
      expect(response.body.data).to.have.keys('type','id', 'attributes')
      expect(response.body.data.attributes).to.have.any.keys('tabs','games') //Will add more keys on future
      expect(response.body.data.attributes.tabs).to.be.a('array')
      expect(response.body.data.attributes.tabs).to.have.all.keys('scene_key', 'scene_title', 'scene_src_icon', 'scene')
    })

    it('Get app-params Web platformId 7', async() => {  
      platform_id = 7
      response =  await getAppParamsByPlatformId(platform_id).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data).to.have.property('type', 'config')
      expect(response.body.data).to.have.keys('type','id', 'attributes')
      expect(response.body.data.attributes).to.have.any.keys('tabs','games') //Will add more keys on future
      expect(response.body.data.attributes.tabs).to.be.a('array')
      expect(response.body.data.attributes.tabs).to.have.all.keys('scene_key', 'scene_title', 'scene_src_icon', 'scene')
    })

    it('Get app-params iOS platformId 8', async() => {  
      platform_id = 8
      response =  await getAppParamsByPlatformId(platform_id).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data).to.have.property('type', 'config')
      expect(response.body.data).to.have.keys('type','id', 'attributes')
      expect(response.body.data.attributes).to.have.any.keys('tabs','games') //Will add more keys on future
      expect(response.body.data.attributes.tabs).to.be.a('array')
      expect(response.body.data.attributes.tabs).to.have.all.keys('scene_key', 'scene_title', 'scene_src_icon', 'scene')
    })

  })
})
