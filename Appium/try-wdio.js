const { remote } = require('webdriverio')

async function run () {
    const driver = await remote({
        capabilities : {
            browserName : 'chrome'
        }
    })

    await driver.url('https://www.google.com/')
    await driver.$('.gb_B').click()
    await driver.pause('2000')
    await driver.deleteSession()
}

run()
