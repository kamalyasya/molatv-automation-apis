const getToken = require('./api/common/getToken')

async function init() {
  const token = await getToken.getTokenFromFile()
  console.log('init token', token)
} 

init()