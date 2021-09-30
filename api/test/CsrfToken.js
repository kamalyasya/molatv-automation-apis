const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { getCsrfToken, CsrfToken } = require('../common/apiRequest');

describe('GET CSRF Token', () => {
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

  it('GET CSRF Token', async() => {
    response = await CsrfToken('_csrf=q6lGDXZsypUP9WhF6nOmYxF6').then(res => res)    
    console.log('BODY : '+response.body )  

    expect(response.status).to.equal(200)
    expect(response.body['_csrf']).to.not.null
    expect(response.body['_csrf']).to.be.a("string")
    expect(response.body['x-csrf-token']).to.not.null
    expect(response.body['x-csrf-token']).to.be.a("string")
  })
})