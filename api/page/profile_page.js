const env = require('dotenv').config();
const chai = require('chai')
const chaiHttp = require('chai-http');
const { access_token } = require('../test/login_test');
const expect = chai.expect
chai.use(chaiHttp)

const getProfile = (access_token) => 
chai.request(process.env.HOST)
 .get('/accounts/_/v2/profile')
 .set('Authorization', access_token)

module.exports = {
    getProfile,
}