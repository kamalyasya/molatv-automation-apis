const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { loginWithCredentials } = require('../common/apiRequest');

describe('Login - [POST] /accounts/_/oauth2/v1/token', () => {
  const app_key = "wIHGzJhset"
  const grant_type = 'password' 
  const scope = 'https://internal.supersoccer.tv/users/users.profile.read https://internal.supersoccer.tv/subscriptions/users.read.global https://api.supersoccer.tv/subscriptions/subscriptions.read https://api.supersoccer.tv/orders/orders.create https://api.supersoccer.tv/videos/videos.read https://api.supersoccer.tv/orders/orders.read paymentmethods:read.internal openid profile.internal payments:payment.dopay https://internal.supersoccer.tv/offline_access userdata:preference.read userdata:preference.insert'
  const email = process.env.ACCOUNT_HBO_EMAIL
  const password = process.env.ACCOUNT_HBO_PASSWORD
  
  const invalid_app_key = "12345678"
  const invalid_grand_type = 'passwd'
  const invalid_scope = 'https://mola.tv'
  const invalid_email = 't1hbo@mola.tv'
  const invalid_password = '2118822'

  var loginErrorSchema = {
    "type": "object",
    "required": [
      "status_code",
      "error",
      "error_code",
      "error_description"],
    "properties": {
      "status_code": {
        "type": "number"
      },
      "error": {
        "type": "string"
      },
      "error_code": {
        "type": "string"
      },
      "error_description": {
        "type": "string"
      }
    }
  }

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

  it('Login Using Valid Email And Password', async() => {
    const email = process.env.ACCOUNT_HBO_EMAIL
    const password = process.env.ACCOUNT_HBO_PASSWORD

    response =  await loginWithCredentials(app_key, grant_type, scope, email, password).then(res => res)      

    expect(response.status).to.equal(200)
    expect(response.body.access_token).to.not.null
    expect(response.body.access_token).to.be.a("string")
    expect(response.body.token_type).to.equal("Bearer")
    expect(response.body.token_type).to.be.a("string")
    expect(response.body.expires_in).to.not.null
    expect(response.body.expires_in).to.be.a("number")
    expect(response.body.refresh_token).to.not.null
    expect(response.body.refresh_token).to.be.a("string")

  }),

  it('Login Using invalid Email And Valid Password', async() => {
    const email = process.env.ACCOUNT_KAMAL_EMAIL
    const password = process.env.ACCOUNT_KAMAL_PASSWORD
    response =  await loginWithCredentials(app_key, grant_type, scope, email, invalid_password).then(res => res)
    
    expect(response.status).to.equal(400)
    expect(response.body.status_code).to.equal(400)
    expect(response.body.status_code).to.be.a("number")
    expect(response.body.error).to.equal("invalid_id_or_password")
    expect(response.body.error).to.be.a("string")
    expect(response.body.error_code).to.equal("8010")
    expect(response.body.error_code).to.be.a("string")
    expect(response.body.error_description).to.equal("Either id or password you have entered is invalid")
    expect(response.body.error_description).to.be.a("string")
  }),

  it('Login Using Valid Email And Invalid Password', async() => {
    const email = process.env.ACCOUNT_CINCIN_EMAIL
    const password = process.env.ACCOUNT_CINCIN_PASSWORD
    response =  await loginWithCredentials(app_key, grant_type, scope, invalid_email, password).then(res => res)
    
    expect(response.status).to.equal(400)
    expect(response.body.status_code).to.equal(400)
    expect(response.body.status_code).to.be.a("number")
    expect(response.body.error).to.equal("invalid_id_or_password")
    expect(response.body.error).to.be.a("string")
    expect(response.body.error_code).to.equal("8010")
    expect(response.body.error_code).to.be.a("string")
    expect(response.body.error_description).to.equal("Either id or password you have entered is invalid")
    expect(response.body.error_description).to.be.a("string")
  }),

  it('Login Using invalid app_key', async() => {
    
    response =  await loginWithCredentials(invalid_app_key, grant_type, scope, email, password).then(res => res)
    
    expect(response.status).to.equal(400)
    expect(response.body.status_code).to.equal(400)
    expect(response.body.status_code).to.be.a("number")
    expect(response.body.error).to.equal("invalid_client")
    expect(response.body.error).to.be.a("string")
    expect(response.body.error_code).to.equal("1120")
    expect(response.body.error_code).to.be.a("string")
    expect(response.body.error_description).to.equal("Client authentication failed (e.g., unknown client, no client authentication included, or unsupported authentication method)")
    expect(response.body.error_description).to.be.a("string")
  }),

  it('Login Using invalid grand_type', async() => {
    
    response =  await loginWithCredentials(app_key, invalid_grand_type, scope, email, password).then(res => res)
    
    expect(response.status).to.equal(400)
    expect(response.body.status_code).to.equal(400)
    expect(response.body.status_code).to.be.a("number")
    expect(response.body.error).to.equal("unsupported_grant_type")
    expect(response.body.error).to.be.a("string")
    expect(response.body.error_code).to.equal("1150")
    expect(response.body.error_code).to.be.a("string")
    expect(response.body.error_description).to.equal("The authorization grant type is not supported by the authorization server.")
    expect(response.body.error_description).to.be.a("string")
  }),

  it('Login Using invalid scope', async() => {
    
    response =  await loginWithCredentials(app_key, grant_type, invalid_scope, email, password).then(res => res)
    
    expect(response.status).to.equal(400)
    expect(response.body.status_code).to.equal(400)
    expect(response.body.status_code).to.be.a("number")
    expect(response.body.error).to.equal("invalid_scope")
    expect(response.body.error).to.be.a("string")
    expect(response.body.error_code).to.equal("1160")
    expect(response.body.error_code).to.be.a("string")
    expect(response.body.error_description).to.equal("The requested scope is invalid, unknown, malformed, or exceeds the scope granted by the resource owner.")
    expect(response.body.error_description).to.be.a("string")
  }),

  it('Login Error Schema Validation', async() => {  
    response =  await loginWithCredentials(app_key, grant_type, scope, email, invalid_password).then(res => res)
    
    expect(response.body).to.be.jsonSchema(loginErrorSchema)
  })
})