const env = require('dotenv').config();
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)
chai.use(require('chai-json-schema'));
const addContext = require('mochawesome/addContext');

var access_token;

console.log = () => {} // uncomment to turn off console logs

describe('examples', () => {
  describe('simple calls', () => {
    it('making a GET request', async() => {
      let response = await chai.request(process.env.HOST)
        .get('/api/v2/config/app-params')
        // console.log(res.body.data.attributes.tabs);
        expect(response.status).to.equal(200) // endpoint exists, return 200
        expect(response.body).to.not.null


    })
    it('making a POST request', async() => {
      let res = await chai.request(process.env.HOST)
       .post('/accounts/_/oauth2/v1/token')
       .set('Content-Type', 'application/json')
       .send({
          // "app_key": app_key,
          // "grant_type": grant_type,
          // "scope": scope,
          // "email": email,
          // "password": password
      })
      expect(res.status).to.not.equal(200) // endpoint exists, return 200
      console.log(res.body);

    })
    it('case 2')
    it('case 3')

  })
})

describe('parental control', () => {
  describe('get country ratings', () => {
    it('case 1')
    it('case 2')
    it('case 3')
  })
  describe('get country minimal legal age', () => {
    it('case 1')
    it('case 2')
    it('case 3')
  })
  describe('registering PIN', () => {
    it('case 1')
    it('case 2')
    it('case 3')
  })
  describe('entering PIN', () => {
    it('case 1')
    it('case 2')
    it('case 3')
  })
  describe('trying to watch video with rating above legal age', () => {
    it('case 1')
    it('case 2')
    it('case 3')
  })

  describe('Get Profile - [GET] /accounts/_/v2/profile', () => {
    it('User can get profile', async() => {
      const cek = await test
      cek.token = 'Bearer ' + cek.token
  
      response =  await getProfile(cek.token)
      
      expect(response.status).to.equal(200)
      expect(response.body.data.birthdate).to.equal('01022002')
      expect(response.body.data.type).to.be.a("string")
  
      expect(response.body.data.id).to.equal(1)
      expect(response.body.data.id).to.be.a("number")
  
      expect(response.body.data.attributes.vuid).to.not.null
      expect(response.body.data.attributes.vuid).to.be.a("string")
  
      expect(response.body).to.be.jsonSchema(expectJsonSchema)
    })
  })

})

describe('/subscriptions', () => {
  describe('/subscriptions platformId 4', () => {
    it('returns all package duration', async() => {
      // https://mola.tv/api/v2/subscriptions/subscriptions?platformId=4
      let response = await chai.request(process.env.HOST)
        .get('/api/v2/subscriptions/subscriptions?platformId=4')

      expect(response.status).to.equal(200) // endpoint exists, return 200
      expect(response.body).to.not.null

      // console.log(response.body.data);

      let subs = response.body.data
      // console.log('subs.length', subs.length);
      // console.log('subs.length', subs[0].attributes.title);

      expect(subs[0].attributes.title).to.contain(' 1 ')
      // expect(subs[0].attributes.title).to.contain(' 3 ')
      // expect(subs[0].attributes.title).to.contain(' 6 ')
      // expect(subs[0].attributes.title).to.contain(' 12 ')

    })
  })
})

describe('/videos', () => {
  describe('/permission/check', () => {
    it('case 1')
    it('case 2')
    it('case 3')

  })
  describe('/geoguard/check', () => {
    it('case 1')
    it('case 2')
    it('case 3')
  })
})


describe('multi country catalog', () => {
  describe('indonesian user', () => {
    describe('sees indonesian catalog', () => {
      it('case 1')
      it('case 2')
      it('case 3')

    })
    describe('can play videos with country set to indonesia', () => {
      it('case 1')
      it('case 2')
      it('case 3')

    })
    describe('CANNOT play videos with country NOT set to indonesia', () => {
      it('case 1')
      it('case 2')
      it('case 3')

    })
  })

  describe('MY user', () => {
    describe('sees MY catalog', () => {
      it('case 1')
      it('case 2')
      it('case 3')


    })
    describe('can play videos with country set to MY', () => {
      it('case 1')
      it('case 2')
      it('case 3')

    })
    describe('CANNOT play videos with country NOT set to MY', () => {
      it('case 1')
      it('case 2')
      it('case 3')

    })
  })

  describe('SG user', () => {
    describe('sees SG catalog', () => {
      it('case 1')
      it('case 2')
      it('case 3')

    })
    describe('can play videos with country set to SG', () => {
      it('case 1')
      it('case 2')
      it('case 3')
    })
    describe('CANNOT play videos with country NOT set to SG', () => {
      it('case 1')
      it('case 2')
      it('case 3')
    })
  })

  describe('IT user', () => {
    describe('sees IT catalog', () => {
      it('case 1')
      it('case 2')
      it('case 3')

    })
    describe('can play videos with country set to IT', () => {
      it('case 1')
      it('case 2')
      it('case 3')
    })
    describe('CANNOT play videos with country NOT set to IT', () => {
      it('case 1')
      it('case 2')
      it('case 3')
    })
  })


})
