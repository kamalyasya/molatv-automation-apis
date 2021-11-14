const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { getVideoId, logToConsole, apiRequest } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');
const schemaVideoId = require('../../data/videoId.json');
const country = process.env.npm_config_country
const HOST = process.env.HOST

describe('Parental Control', () => {
  describe('Get data by video_id - [GET] /api/v2/videos/{video_id}?language={language_id}', () => {
    let response
    let auth

    beforeEach(async () => {
      auth = await getTokenFromFile()
    })

    afterEach(function () {
      if (process.env.DEBUG_MODE == 'true') {
        if (this.currentTest.state == 'failed') {
          console.log("    * Request URL: " + util.inspect(response.request.url, { depth: null, colors: true }) + "\n");
          console.log("    * Request Body: " + util.inspect(response.request._data, { depth: null, colors: true }) + "\n");
          console.log("    * Response Code: " + util.inspect(response.status, { depth: null, colors: true }) + "\n");
          console.log("    * Response Header: " + util.inspect(response.header, { depth: null, colors: true }) + "\n");
          console.log("    * Response Body: " + util.inspect(response.body, { depth: null, colors: true }) + "\n");
        }
      }
    })

    it('Get data by video_id', async () => {
      if (HOST.includes('beta'))
      {
        if (country == 'id') {
          video_id = 'vdt2523182'
          language_id = 'id'
        } else if (country == 'sg') {
          video_id = 'vdt2925331'
          language_id = 'sg'
        } else if (country == 'my') {
          video_id = 'vd33072453'
          language_id = 'my'
        } else if (country == 'it') {
          video_id = 'vd33072476'
          language_id = 'it'
        } else if (country == 'gb') {
          video_id = 'vd33072506'
          language_id = 'gb'
        }  
      }
      else {
        video_id = 'vd23339307'
        if (country == 'id') {
          language_id = 'id'
        } else if (country == 'sg') {
          language_id = 'sg'
        } else if (country == 'my') {
          language_id = 'my'
        } else if (country == 'it') {
          language_id = 'it'
        } else if (country == 'gb') {
          language_id = 'gb'
        }  
      }


      logToConsole(
        "video_id : "+video_id+
        "\nlanguage_id : "+language_id
      )

      option = {
        method: 'get',
        path: '/api/v2/videos/'+video_id,
        token: auth.auth_token,
        query: {language: language_id}
      }
      
      response = await apiRequest(option).then(res => res)

      expect(response.status).to.equal(200)
      // expect(response.body).to.be.jsonSchema(schemaVideoId);

    })

  })
})