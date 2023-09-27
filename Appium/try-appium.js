const { remote } = require('webdriverio')
const path = require('path')


const options = {
    hostname : '0.0.0.0',
    port : 4723,
    logLevel : 'debug',
    capabilities : {
        'platformName' : 'Android',
        'appium:automationName' : 'UiAutomator2',
        'appium:deviceName' : 'emulator-5554',
        'appium:app' : path.join(process.cwd(), 'app/dummy.apk'),
        'appium:appActivity' : '.MainActivity'
    }
}

async function run () {
    const driver = await remote(options)
    await driver.$('//android.widget.Button[@content-desc="Login"]').click()
    await driver.pause(2000)
    await driver.deleteSession()
}   

run()