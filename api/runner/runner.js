const env = require('dotenv').config()
const HOST = process.env.HOST
const country = process.env.npm_config_country
console.log("============================================")
console.log("Running On \nHOST       : "+HOST+" \nCountry    : "+country)
console.log("============================================")

require('../test/login_test')

// Config
require('../test/config/configCountryFeatures')
require('../test/config/getAppParamsByPlatformId')

// Multi Country Catalog
require('../test/multiCountryCatalog/geoguardCheck')
require('../test/multiCountryCatalog/playlistIdByLanguage')
require('../test/multiCountryCatalog/playlistRoot')

// Multi Language UI
require('../test/multiLanguageUi/getUiLanguage')
require('../test/multiLanguageUi/getUserDataPreferences')
require('../test/multiLanguageUi/getUserLanguage')

// Parental Control
require('../test/parentalControl/parentalControl')
require('../test/parentalControl/ageRating')
require('../test/parentalControl/profile')
require('../test/parentalControl/signUp')
require('../test/parentalControl/userPin')
require('../test/parentalControl/videos')

// Subscriptions
require('../test/subscriptions/getSubscriptionsPackage')