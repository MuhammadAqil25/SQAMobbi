const { Builder, Browser } = require("selenium-webdriver");

async function setupDriver () {
    const driver = new Builder().forBrowser(Browser.EDGE).build()
    return driver
}

module.exports = setupDriver