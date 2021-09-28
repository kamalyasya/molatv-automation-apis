const env = require('dotenv').config();
const fs = require('fs');
const { loginWithCredentials } = require('./apiRequest')
const email = process.env.ACCOUNT_HBO_EMAIL
const password = process.env.ACCOUNT_HBO_PASSWORD
const api_key = 'wIHGzJhset'
const grant_type = 'password'
const scope = 'https://internal.supersoccer.tv/users/users.profile.read https://internal.supersoccer.tv/subscriptions/users.read.global https://api.supersoccer.tv/subscriptions/subscriptions.read https://api.supersoccer.tv/orders/orders.create https://api.supersoccer.tv/videos/videos.read https://api.supersoccer.tv/orders/orders.read paymentmethods:read.internal openid profile.internal payments:payment.dopay https://internal.supersoccer.tv/offline_access userdata:preference.read userdata:preference.insert'

/** 
 * Wrapper , HOC
 * boot(test)
 * 
 * function boot() {}
 * 
 * 
*/

/** 
 * Save to local file
 * can be json file
 * 
 * once has response token save to file json
 * 
 * ketika boot
 * fs.readFileSync(path)
 *  once has file token, check expiry time token
 *  * request token => save into file json
 *  * fs.writeSync()
 * 
*/

const TOKEN_FILE = 'token.json';

const getTokenAndSave = async () => {
  try {
    const response = await loginWithCredentials(api_key, grant_type, scope, email, password);
    const expiredAt = +new Date() + response.body.expires_in;
    response.body.expired_at = expiredAt;
    console.log({
      state: 'get token call',
      token: response.body
    })
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(response.body));
    console.log("write token file success with:", response.body)
  } catch (error) {
    throw new Error(error)
  }
};

const initateToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileToken = fs.readFileSync(TOKEN_FILE, 'utf8');
      const token = JSON.parse(fileToken);
      // console.log('date date => ', token.expired_at, new Date().getTime(), token.expired_at < new Date().getTime(), token.expired_at > new Date().getTime())
      if (token.expired_at > new Date().getTime()) {
        console.log({
          state: 'expired call to new token',
          token
        })
        fs.rmSync(TOKEN_FILE);
        await getTokenAndSave();
        resolve();
        return;
      }
      resolve();
      return;
    } catch (error) {
      await getTokenAndSave();
      resolve();
      return;
    }
  });
}

const getTokenFromFile = async () => {
  await initateToken();
  const fileToken = fs.readFileSync(TOKEN_FILE, 'utf8') || {};
  const result = JSON.parse(fileToken)
  result.auth_token = result.token_type + ' ' + result.access_token
  return result;
}

module.exports = {
  getTokenFromFile,
}