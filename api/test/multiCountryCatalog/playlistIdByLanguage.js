const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(require('chai-things'));
chai.use(chaiHttp)

const expect = chai.expect

const { getPlaylistByLanguage } = require('../../common/apiRequest');
describe('Multi country catalog', () => { 
  describe('Get Playlist data by Language - [GET] /api/v2/videos/playlists/{playlist_id}', () => {
    afterEach(function(){
      if (this.currentTest.state == 'failed') { 
          console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
          console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
          console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
      }
    })
  
    it('Get Playlist data by Language - EN', async() => {  
      playlist_id = 'home-default'
      language = 'en'
      response =  await getPlaylistByLanguage(playlist_id, language).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('array')
      expect(response.body.data).to.all.have.property('type', 'playlists')
      expect(response.body.data).to.all.have.keys('type','id', 'attributes')
      expect(response.body.data[0].attributes).to.be.a('object')
    })
  })
})
