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
            await visualTest.openPage('https://policies.google.com/?hl=en-US')
            await visualTest.setFileName('Google Privacy & Terms Overview')
            await visualTest.takeScreenshot()
            await visualTest.writeFile()
        })
    })
    describe('Visual Test Page 2', function(){
        it('Visual Tidak Terdapat Perubahan', async function() {
            await visualTest.openPage('https://support.google.com/meet/announcements/13129399?sjid=405422622665848348-AP&authuser=0')
            await visualTest.setFileName('Google Privacy & Terms Meet')
            await visualTest.takeScreenshot()
            await visualTest.writeFile()
        })
    })
    describe('Visual Test Page 3', function(){
        it('Visual Tidak Terdapat Perubahan', async function() {
            await visualTest.openPage('https://en.wikipedia.org/wiki/Help:Contents')
            await visualTest.setFileName('Wikipedia')
            await visualTest.takeScreenshot()
            await visualTest.writeFile()
        })
    })
    describe('Visual Test Page 4', function(){
        it('Visual Tidak Terdapat Perubahan', async function() {
            await visualTest.openPage('https://policies.google.com/technologies?hl=en-US')
            await visualTest.setFileName('Google Privacy & Terms Technologies')
            await visualTest.takeScreenshot()
            await visualTest.writeFile()
        })
    })
    describe('Visual Test Page 5', function(){
        it('Visual Tidak Terdapat Perubahan', async function() {
            await visualTest.openPage('https://policies.google.com/faq?hl=en-US')
            await visualTest.setFileName('Google Privacy & Terms FAQ')
            await visualTest.takeScreenshot()
            await visualTest.writeFile()
        })
    })

    after(async function() {
        await driver.close()
    })
})