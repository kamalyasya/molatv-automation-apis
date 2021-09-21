const page = require('../page/login_page.js');

const env = require('dotenv').config();
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)
chai.use(require('chai-json-schema'));
const addContext = require('mochawesome/addContext');

describe('Videos', () => {
    it('Login Using Valid Email And Password', async() => {
      
      console.log("Access_token : " + JSON.stringify(access_token))
      

    })

  })