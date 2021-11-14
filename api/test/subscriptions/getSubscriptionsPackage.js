const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(require('chai-things'));
chai.use(chaiHttp)

const expect = chai.expect

const { apiRequest } = require('../../common/apiRequest');

describe('Subscriptions', () => { 
  describe('Get Subscriptions Package - [GET] /api/v2/subscriptions/subscriptions?platformId={platformId}', () => {
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
  
    it('Get Subscriptions Package Android platformId 1', async() => {  
      platform_id = 1
      option = {
        method: 'get',
        path: '/api/v2/subscriptions/subscriptions',
        query: {platformId: platform_id}
      }
      response =  await apiRequest(option).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('array')
      expect(response.body.data).to.all.have.property('type', 'subscription')
      expect(response.body.data).to.all.have.keys('type','id', 'attributes')
      expect(response.body.data[0].attributes).to.be.a('object')
    })

    it('Get Subscriptions Package MPS platformId 4', async() => {  
      platform_id = 4
      option = {
        method: 'get',
        path: '/api/v2/subscriptions/subscriptions',
        query: {platformId: platform_id}
      }
      response =  await apiRequest(option).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('array')
      expect(response.body.data).to.all.have.property('type', 'subscription')
      expect(response.body.data).to.all.have.keys('type','id', 'attributes')
      expect(response.body.data[0].attributes).to.be.a('object')
    })

    it('Get Subscriptions Package Web platformId 7', async() => {  
      platform_id = 7
      option = {
        method: 'get',
        path: '/api/v2/subscriptions/subscriptions',
        query: {platformId: platform_id}
      }
      response =  await apiRequest(option).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('array')
      expect(response.body.data).to.all.have.property('type', 'subscription')
      expect(response.body.data).to.all.have.keys('type','id', 'attributes')
      expect(response.body.data[0].attributes).to.be.a('object')
    })

    it('Get Subscriptions Package iOS platformId 8', async() => {  
      platform_id = 8
      option = {
        method: 'get',
        path: '/api/v2/subscriptions/subscriptions',
        query: {platformId: platform_id}
      }
      response =  await apiRequest(option).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('array')
      expect(response.body.data).to.all.have.property('type', 'subscription')
      expect(response.body.data).to.all.have.keys('type','id', 'attributes')
      expect(response.body.data[0].attributes).to.be.a('object')
    })

  })
})
