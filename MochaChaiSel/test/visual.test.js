const chai = require('chai')
const setupDriver = require('../util/setupDriver')
const { WebDriver } = require('selenium-webdriver')
const { chaiImage } = require('chai-image')
const VisualTest = require('../util/visualTest')
const { existsSync, writeFileSync, readFileSync } = require('fs')

chai.use(chaiImage)
const expect = chai.expect

describe('Visual Test', function() {
    /** @type {WebDriver} */ let driver
    /** @type {VisualTest} */let visualTest

    before(async function() {
        driver = await setupDriver()
        visualTest = new VisualTest(driver)
    })

    describe('Visual Test Page 1', function(){
        it('Visual Tidak Terdapat Perubahan', async function() {
            visualTest.screenshot('Google', 'https://www.google.com/')

            // const PageName = 'Alex'
            // const PageUrl = 'https://www.google.com/'

            // await driver.get(PageUrl)
        
            // const baseScreenshotPath = `screenshots/base/${PageName}.jpg`
            // const actualScreenshotPath = `screenshots/actual/${PageName}.jpg`
            // const isBaseScreenshotExist = existsSync(baseScreenshotPath)
        
            // const pageScreenshot = await driver.takeScreenshot()
            // const pageScreenshotBuffer = Buffer.from(pageScreenshot, 'base64')

            // if (isBaseScreenshotExist) {
            //     const baseScreenshotBuffer = readFileSync(baseScreenshotPath)
        
            //     writeFileSync(actualScreenshotPath, pageScreenshotBuffer)
            //     expect(pageScreenshotBuffer).to.matchImage(baseScreenshotBuffer)
            // } else {
            //     writeFileSync(baseScreenshotPath, pageScreenshotBuffer)
            // }
        })
    })
    describe('Visual Test Page 2', function(){
        it('Visual Tidak Terdapat Perubahan', async function() {
            visualTest.screenshot('Google Meet', 'https://support.google.com/meet/announcements/13129399?sjid=405422622665848348-AP&authuser=0')
        })
    })
    describe('Visual Test Page 3', function(){
        it('Visual Tidak Terdapat Perubahan', async function() {
            visualTest.screenshot('Wikipedia', 'https://en.wikipedia.org/wiki/Help:Contents')
        })
    })
    describe('Visual Test Page 4', function(){
        it('Visual Tidak Terdapat Perubahan', async function() {
            visualTest.screenshot('Github', 'https://github.com/about/developer-policy')
        })
    })
    describe('Visual Test Page 5', function(){
        it('Visual Tidak Terdapat Perubahan', async function() {
            visualTest.screenshot('Tokopedia', 'https://www.tokopedia.com/about/contact-us/')
        })
    })

    after(async function() {
        await driver.close()
    })
})