const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { logToConsole, apiRequest } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');
const country = process.env.npm_config_country

const Cookie  ='_csrf='+process.env._csrf
const x_csrf_token = process.env.x_csrf_token


describe('Sign Up', () => {
  describe('Sign Up ', () => {
    afterEach(function () {
      if (process.env.DEBUG_MODE) {
        if (this.currentTest.state == 'failed') {
          console.log("    * Request URL: " + util.inspect(response.request.url, { depth: null, colors: true }) + "\n");
          console.log("    * Request Body: " + util.inspect(response.request._data, { depth: null, colors: true }) + "\n");
          console.log("    * Response Code: " + util.inspect(response.status, { depth: null, colors: true }) + "\n");
          console.log("    * Response Header: " + util.inspect(response.header, { depth: null, colors: true }) + "\n");
          console.log("    * Response Body: " + util.inspect(response.body, { depth: null, colors: true }) + "\n");
        }
      }
    })

    it('User Register using legal age', async () => {
      const email = "t.hbo+" + Number(new Date()) + "@mola.tv"
      const payload =
      {
        "email": email,
        "password": process.env.ACCOUNT_HBO_PASSWORD
      }

      if (country == 'sg' || country == 'my' || country == 'it' || country == 'gb') {
        payload.birthdate = "1990-01-01"
      }

      logToConsole(payload)

      option = {
        method: 'post',
        path: '/api/v2/accounts/signup/email',
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
      response = await apiRequest(option, payload).then(res => res)

      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data.method).to.be.a('string')
      expect(response.body.data.method).to.equal('email')
      expect(response.body.data.sent_to).to.be.a('string')
      expect(response.body.data.sent_to).to.equal(email)
    }),

      it('User Register using birthdate', async () => {
        const email = "t.hbo+" + Number(new Date()) + "@mola.tv"
        const payload =
        {
          "email": email,
          "password": process.env.ACCOUNT_HBO_PASSWORD,
          "birthdate": "1995-01-01"

        }

        logToConsole(payload)

        option = {
          method: 'post',
          path: '/api/v2/accounts/signup/email',
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
        response = await apiRequest(option, payload).then(res => res)

        expect(response.status).to.equal(200)
        expect(response.body).to.be.a('object')
        expect(response.body.data).to.be.a('object')
        expect(response.body.data.method).to.be.a('string')
        expect(response.body.data.method).to.equal('email')
        expect(response.body.data.sent_to).to.be.a('string')
        expect(response.body.data.sent_to).to.equal(email)
      }),

      it('User Register using non legal age', async () => {
        const email = "t.hbo+" + Number(new Date()) + "@mola.tv"
        const payload =
        {
          "email": email,
          "password": process.env.ACCOUNT_HBO_PASSWORD
        }

        if (country == 'sg' || country == 'my' || country == 'it' || country == 'gb') {
          payload.birthdate = "2010-01-01"
        }

        logToConsole(payload)

        option = {
          method: 'post',
          path: '/api/v2/accounts/signup/email',
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
        response = await apiRequest(option, payload).then(res => res)

        expect(response.status).to.equal(200)
        expect(response.body).to.be.a('object')
        expect(response.body.data).to.be.a('object')
        expect(response.body.data.method).to.be.a('string')
        expect(response.body.data.method).to.equal('email')
        expect(response.body.data.sent_to).to.be.a('string')
        expect(response.body.data.sent_to).to.equal(email)
      })

  })
})