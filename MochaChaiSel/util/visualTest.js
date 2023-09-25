const { chaiImage } = require('chai-image')
const chai = require('chai')
const { existsSync, writeFileSync, readFileSync } = require('fs')
const { WebDriver } = require('selenium-webdriver')

chai.use(chaiImage)
const expect = chai.expect

class visualTest{
    constructor(driver){
        /** @type {WebDriver} */this.driver = driver
    }

    async screenshot(pageName, pageUrl){
        await this.driver.get(pageUrl)
    
        const baseScreenshotPath = `screenshots/base/${pageName}.jpg`
        const actualScreenshotPath = `screenshots/actual/${pageName}.jpg`
        const isBaseScreenshotExist = existsSync(baseScreenshotPath)
    
        const pageScreenshot = await this.driver.takeScreenshot()
        const pageScreenshotBuffer = Buffer.from(pageScreenshot, 'base64')
        
        if (isBaseScreenshotExist) {
            const baseScreenshotBuffer = readFileSync(baseScreenshotPath)
    
            writeFileSync(actualScreenshotPath, pageScreenshotBuffer)
            expect(pageScreenshotBuffer).to.matchImage(baseScreenshotBuffer)
        } else {
            writeFileSync(baseScreenshotPath, pageScreenshotBuffer)
        }
    }
}

module.exports = visualTest