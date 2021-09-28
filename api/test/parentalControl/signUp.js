const env = require('dotenv').config()
const util = require('util')
const chaiHttp = require('chai-http')

const chai = require('chai')
chai.use(require('chai-json-schema'))
chai.use(chaiHttp)

const expect = chai.expect

const { signUp } = require('../../common/apiRequest');
const { getTokenFromFile } = require('../../common/getToken');

describe('Sign Up', () => {
  describe('Sign Up ', () => {
    afterEach(function() {
      if (this.currentTest.state == 'failed') { 
          console.log("    * Response Code: " + util.inspect(response.status,{depth: null, colors: true}) + "\n");
          console.log("    * Response Header: " + util.inspect(response.header,{depth: null, colors: true}) + "\n");
          console.log("    * Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
      }
    })
  
    it('User can register using valid email', async() => { 
      const email =  "t.hbo+"+Number(new Date())+"@mola.tv"
      const payload = 
        {
            "email"     : email,
            "password"  : process.env.ACCOUNT_HBO_PASSWORD
        }
      
      response =  await signUp(payload).then(res => res)
      
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('object')
      expect(response.body.data).to.be.a('object')
      expect(response.body.data.method).to.be.a('string')
      expect(response.body.data.method).to.equal('email')
      expect(response.body.data.sent_to).to.be.a('string')
      expect(response.body.data.sent_to).to.equal(email)
      
    })
    
  })
})