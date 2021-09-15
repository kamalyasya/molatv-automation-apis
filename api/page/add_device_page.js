const env = require('dotenv').config();
const chai = require('chai')
const chaiHttp = require('chai-http');
const { access_token } = require('../test/login_test');
const expect = chai.expect
chai.use(chaiHttp)

const addDevice = (userId) => 
chai.request(process.env.HOST)
 .get('/api/v2/videos/drm/add-device')
 .set('Authorization', access_token)
 .query({deviceId: userId, test: 1})

module.exports = {
    addDevice,
}