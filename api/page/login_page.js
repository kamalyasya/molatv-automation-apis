const env = require('dotenv').config();
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)


const loginWithCredentials = (app_key, grant_type, scope, email, password ) => 
chai.request(process.env.HOST)
 .post('/accounts/_/oauth2/v1/token')
 .set('Content-Type', 'application/json')
 .send({
    "app_key": app_key,
    "grant_type": grant_type,
    "scope": scope,
    "email": email,
    "password": password
})
//  .end((res) => {
//      done()
//  })

module.exports = {
    loginWithCredentials,
}