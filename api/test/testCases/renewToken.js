const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { loginWithCredentials, apiRequest, sleep } = require('../../common/apiRequest');

describe('Login - [POST] /accounts/_/oauth2/v1/token', () => {
  const app_key = "wIHGzJhset"
  const grant_type = 'password' 
  const scope = 'https://internal.supersoccer.tv/users/users.profile.read https://internal.supersoccer.tv/subscriptions/users.read.global https://api.supersoccer.tv/subscriptions/subscriptions.read https://api.supersoccer.tv/orders/orders.create https://api.supersoccer.tv/videos/videos.read https://api.supersoccer.tv/orders/orders.read paymentmethods:read.internal openid profile.internal payments:payment.dopay https://internal.supersoccer.tv/offline_access userdata:preference.read userdata:preference.insert'
  const email = process.env.ACCOUNT_HBO_EMAIL
  const password = process.env.ACCOUNT_HBO_PASSWORD
  
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

  it('Renew Token', async() => {
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

    payload = {        
        "app_key": "wIHGzJhset",
        "refresh_token": response.body.refresh_token
      }
      option = {
        method: 'post',
        token: response.body.token_type+" "+response.body.access_token,
        path: '/api/v2/config/renew-token'
      }
    
    sleep(3300) //Sleep in 3300s = 55m
    response = await apiRequest(option, payload).then(res => res)    
    
    expect(response.status).to.equal(200)
    expect(response.body).to.be.a("object")
    expect(response.body.data.type).to.equal("config")
    expect(response.body.data.attributes.message).to.equal("ok")
    expect(response.body.data.attributes.data.token_type).to.equal("Bearer")
    expect(response.body.data.attributes.data.access_token).to.to.not.null
    expect(response.body.data.attributes.data.access_token).to.be.a("string")
    expect(response.body.data.attributes.data.refresh_token).to.to.not.null
    expect(response.body.data.attributes.data.refresh_token).to.be.a("string")
    expect(response.body.data.attributes.data.expires_in).to.not.null
    expect(response.body.data.attributes.data.expires_in).to.be.a("number")
  
  })
})