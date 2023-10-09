const path = require('path')

const DRIVER_OPTIONS = {
    hostname : '127.0.0.1',  
    port : 4723,
    logLevel : 'debug',
    capabilities : {
        'platformName' : 'Android',
        'appium:automationName' : 'UiAutomator2',
        'appium:deviceName' : 'emulator-5554',
        'appium:app' : path.join(process.cwd(), 'app/ECommerce.apk'),
        'appium:appActivity' : '.WelcomeActivity'
    }
}

module.exports = DRIVER_OPTIONS