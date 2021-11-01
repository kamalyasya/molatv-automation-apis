const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { apiRequest, logToConsole } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');
const country = process.env.npm_config_country

describe('Search VOD', () => {
  let response
  let auth
  let host = "https://api.sent.tv"
  if (process.env.HOST.includes('beta')){
    host = "https://beta-api.sent.tv"
  }

  beforeEach(async () => {
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

  it('Search Using Keyword - Garuda', async() => {
      if (country === undefined){
          country = 'id'
      }

      option = {
        host: host,
        method: 'get',
        token: auth.auth_token,
        path: '/v1/analytics/prophet/search/suggestions',
        query: {app_id: "molatv", query: "garuda", platform_id: "7", country: country}
      }
    
    response = await apiRequest(option).then(res => res)    
    
    expect(response.status).to.equal(200)
    expect(response.body.data).to.have.lengthOf.above(20)
  
  }),

  it('Search Using Keyword - sofa kuning', async() => {
    if (country === undefined){
        country = 'id'
    }

    option = {
      host: host,
      method: 'get',
      token: auth.auth_token,
      path: '/v1/analytics/prophet/search/suggestions',
      query: {app_id: "molatv", query: "sofa kuning", platform_id: "7", country: country}
    }
  
    response = await apiRequest(option).then(res => res)    
  
    expect(response.status).to.equal(200)
    expect(response.body.data).to.have.lengthOf.above(20)
  }),

  it('Search Using Keyword - wwe', async() => {
    if (country === undefined){
        country = 'id'
    }

    option = {
      host: host,
      method: 'get',
      token: auth.auth_token,
      path: '/v1/analytics/prophet/search/suggestions',
      query: {app_id: "molatv", query: "wwe", platform_id: "7", country: country}
    }
  
    response = await apiRequest(option).then(res => res)    
  
    expect(response.status).to.equal(200)
    expect(response.body.data).to.have.lengthOf.above(20)
  }),

  it('Search Using Keyword - younger', async() => {
    if (country === undefined){
        country = 'id'
    }

    option = {
      host: host,
      method: 'get',
      token: auth.auth_token,
      path: '/v1/analytics/prophet/search/suggestions',
      query: {app_id: "molatv", query: "younger", platform_id: "7", country: country}
    }
  
    response = await apiRequest(option).then(res => res)    
  
    expect(response.status).to.equal(200)
    expect(response.body.data).to.have.lengthOf.above(20)
  }),

  it('Search Using Keyword - liverpool vs', async() => {
    if (country === undefined){
        country = 'id'
    }

    option = {
      host: host,
      method: 'get',
      token: auth.auth_token,
      path: '/v1/analytics/prophet/search/suggestions',
      query: {app_id: "molatv", query: "liverpool vs", platform_id: "7", country: country}
    }
  
    response = await apiRequest(option).then(res => res)    
  
    expect(response.status).to.equal(200)
    expect(response.body.data).to.have.lengthOf.above(20)
  }),

  it('Search Using Keyword - manchester united vs', async() => {
    if (country === undefined){
        country = 'id'
    }

    option = {
      host: host,
      method: 'get',
      token: auth.auth_token,
      path: '/v1/analytics/prophet/search/suggestions',
      query: {app_id: "molatv", query: "manchester united vs", platform_id: "7", country: country}
    }
  
    response = await apiRequest(option).then(res => res)    
  
    expect(response.status).to.equal(200)
    expect(response.body.data).to.have.lengthOf.above(20)
  }),

  it('Search Using Keyword - humans', async() => {
    if (country === undefined){
        country = 'id'
    }

    option = {
      host: host,
      method: 'get',
      token: auth.auth_token,
      path: '/v1/analytics/prophet/search/suggestions',
      query: {app_id: "molatv", query: "humans", platform_id: "7", country: country}
    }
  
    response = await apiRequest(option).then(res => res)    
  
    expect(response.status).to.equal(200)
    expect(response.body.data).to.have.lengthOf.above(20)
  })

})