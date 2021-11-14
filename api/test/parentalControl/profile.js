const util = require('util')
const env = require('dotenv').config();

const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const { apiRequest } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

const Cookie  ='_csrf='+process.env._csrf
const x_csrf_token = process.env.x_csrf_token

const expect = chai.expect

describe('Parental Control', () => { 
  describe('Profile', () => {
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

    it('Get Profile - [GET] /accounts/_/v2/profile', async() => {
      option = {
        method: 'get',
        token: auth.auth_token,
        path: '/accounts/_/v2/profile',
      }
      response =  await apiRequest(option).then(res => res)
          
      expect(response.status).to.equal(200)
    })


    it('Update Profile - [PATCH] /accounts/_/v2/profile', async() => {
      let payload = {
        "name": "Mocha Chai Automation",
        "gender": "m",
        "location": "Indonesia"
      }

      option = {
        method: 'patch',
        token: auth.auth_token,
        path: '/accounts/_/v2/profile',
        header: [
          {
            attribute: 'Cookie',
            value: Cookie
          },
          {
            attribute: 'x-csrf-token',
            value: x_csrf_token
          }
        ]
        
      }
      response =  await apiRequest(option, payload).then(res => res)
          
      expect(response.status).to.equal(200)
    })
  })
})
