const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { getPlaylistRoot } = require('../../common/apiRequest');

describe('Multi country catalog', () => {
  describe('Get Playlist Root - [GET] /api/v2/videos/playlists-root', () => {
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
  
    it('Get Playlist Root using Android Platform (1)', async() => {  
      platform_id = 1;
      response =  await getPlaylistRoot(platform_id).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data.type).to.equal('playlists-root')
      expect(response.body.data.type).to.be.a('string')
      expect(response.body.data.id).to.be.a('number')
      expect(response.body.data.attributes).to.be.a('object')
    })
  
    it('Get Playlist Root using MPS platform (4)', async() => {  
      platform_id = 4;
      response =  await getPlaylistRoot(platform_id).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data.type).to.equal('playlists-root')
      expect(response.body.data.type).to.be.a('string')
      expect(response.body.data.id).to.be.a('number')
      expect(response.body.data.attributes).to.be.a('object')
    })
  
    it('Get Playlist Root using Web Platform (7)', async() => {  
      platform_id = 7;
      response =  await getPlaylistRoot(platform_id).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data.type).to.equal('playlists-root')
      expect(response.body.data.type).to.be.a('string')
      expect(response.body.data.id).to.be.a('number')
      expect(response.body.data.attributes).to.be.a('object')
    })
  
    it('Get Playlist Root using iOS Platform (8)', async() => {  
      platform_id = 8;
      response =  await getPlaylistRoot(platform_id).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data.type).to.equal('playlists-root')
      expect(response.body.data.type).to.be.a('string')
      expect(response.body.data.id).to.be.a('number')
      expect(response.body.data.attributes).to.be.a('object')
    })
    
  })
})