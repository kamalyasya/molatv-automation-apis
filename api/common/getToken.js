const env = require('dotenv').config();
const { loginWithCredentials } = require('./apiRequest')
const email = env.ACCOUNT_HBO_EMAIL
const password = env.ACCOUNT_HBO_PASSWORD
const api_key = 'wIHGzJhset'
const grant_type = 'password'
const scope = 'https://internal.supersoccer.tv/users/users.profile.read https://internal.supersoccer.tv/subscriptions/users.read.global https://api.supersoccer.tv/subscriptions/subscriptions.read https://api.supersoccer.tv/orders/orders.create https://api.supersoccer.tv/videos/videos.read https://api.supersoccer.tv/orders/orders.read paymentmethods:read.internal openid profile.internal payments:payment.dopay https://internal.supersoccer.tv/offline_access userdata:preference.read userdata:preference.insert'

const getToken = (async() => {
  let token = '';
  
  const getToken = async () => {
    const response = await loginWithCredentials(api_key, grant_type, scope, email, password)
    token = response.body.access_token
    console.log('ini token =>',token)
    return token
  }

  if (token == '') {
    await getToken();
  }
  return {
    token
  }
})();

module.exports = {
  getToken
}