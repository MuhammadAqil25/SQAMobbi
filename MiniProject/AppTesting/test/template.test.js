const { expect } = require("chai")
const setupDriver = require("../utils/setupDriver")

describe('', function() {

    /** @type {WebdriverIO.Browser} */ let driver

    before(async function() {
        driver = await setupDriver()
    })


    describe('', function() {
        it('', async function() {

        })
    })

    after(async function() {
        await driver.pause(2000)
        await driver.deleteSession()
    })
})