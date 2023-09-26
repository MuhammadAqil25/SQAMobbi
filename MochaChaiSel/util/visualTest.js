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

    //element locator
    baseScreenshotPath
    actualScreenshotPath
    isBaseScreenshotExist
    pageScreenshot
    pageScreenshotBuffer
    baseScreenshotBuffer 

    async openPage(pageUrl){
        await this.driver.get(pageUrl)
    }

    async setFileName(pageName){
        this.baseScreenshotPath = `screenshots/base/${pageName}.jpg`
        this.actualScreenshotPath = `screenshots/actual/${pageName}.jpg`
        this.isBaseScreenshotExist = existsSync(this.baseScreenshotPath)
    }

    async takeScreenshot(){
        this.pageScreenshot = await this.driver.takeScreenshot()
        this.pageScreenshotBuffer = Buffer.from(this.pageScreenshot, 'base64')
    }
    
    async writeFile(){
        if (this.isBaseScreenshotExist) {
            this.baseScreenshotBuffer = readFileSync(this.baseScreenshotPath)
    
            writeFileSync(this.actualScreenshotPath, this.pageScreenshotBuffer)
            expect(this.pageScreenshotBuffer).to.matchImage(this.baseScreenshotBuffer)
        } else {
            writeFileSync(this.baseScreenshotPath, this.pageScreenshotBuffer)
        }
    }
}

module.exports = visualTest