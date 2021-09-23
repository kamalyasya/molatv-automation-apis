const util = require('util')

const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const { getProfile } = require('../common/apiRequest');
const { getToken } = require('../common/getToken');

const expect = chai.expect

describe('Get Profile - [GET] /accounts/_/v2/profile', () => {
  let response

  afterEach(function(){
    if (this.currentTest.state == 'failed') { 
      console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
      console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
      console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
    }
  })

  it('User can get profile', async() => {
    const auth = await getToken
    auth.token = 'Bearer ' + auth.token

    response =  await getProfile(auth.token)
        
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

// describe('Update Profile - [PATCH] /accounts/_/v2/profile', () => {
//   let cek

//   afterEach(function(){
//     if (this.currentTest.state == 'failed') { 
//       console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
//       console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
//       console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
//     }
//   })

//   it('User can get profile', async() => {
//     const cek = await test
//     cek.token = 'Bearer ' + cek.token

//     response =  await updateProfile(cek.token)
    
//     expect(response.status).to.equal(200)
//     expect(response.body.birthdate).to.equal('01022002')
//     expect(response.body.data.type).to.be.a("string")

//     expect(response.body.data.id).to.equal(1)
//     expect(response.body.data.id).to.be.a("number")

//     expect(response.body.data.attributes.vuid).to.not.null
//     expect(response.body.data.attributes.vuid).to.be.a("string")

//     expect(response.body).to.be.jsonSchema(expectJsonSchema)
//   })
// })