const chai = require('chai')
const { WebDriver, By } = require('selenium-webdriver')
const setupDriver = require('../utils/SetupDriver')

const expect = chai.expect

describe('Mizan Store Detail Product Page', function() {
    /** @type {WebDriver} */let driver

    before(async function() {
        driver = await setupDriver()
        await driver.manage().window().maximize()
    })

    describe('', function() {
        it('', async function() {

        })
    })

    after(async function() {
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })
})
