const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)
const addContext = require('mochawesome/addContext')

const page = require('../page/add_device_page.js');

describe('Add Device - [GET] /api/v2/videos/drm/add-device?deviceId={deviceId}&test=1', () => {
  const expectJsonSchema = {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "id": {
            "type": "integer"
          },
          "attributes": {
            "type": "object",
            "properties": {
              "vuid": {
                "type": "string"
              }
            },
            "required": [
              "vuid"
            ]
          }
        },
        "required": [
          "type",
          "id",
          "attributes"
        ]
      }
    },
    "required": [
      "data"
    ]
  }

  afterEach(function(){
    if (this.currentTest.state == 'failed') { 
        console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
        console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
        console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
    }
  })

    it('addDevice', async() => {
      const userId = process.env.ACCOUNT_HBO_UDID
      response =  await page.addDevice(userId)
      
      expect(response.status).to.equal(200)
      expect(response.body.data.type).to.equal('verimatrix')
      expect(response.body.data.type).to.be.a("string")

      expect(response.body.data.id).to.equal(1)
      expect(response.body.data.id).to.be.a("number")

      expect(response.body.data.attributes.vuid).to.not.null
      expect(response.body.data.attributes.vuid).to.be.a("string")

      expect(response.body).to.be.jsonSchema(expectJsonSchema)
    })
  })