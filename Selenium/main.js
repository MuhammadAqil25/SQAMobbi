const { Builder, Browser, By, until, promise } = require('selenium-webdriver')

async function testSauceDemo() {
    const driver = await new Builder().forBrowser(Browser.EDGE).build()
    //Login
    await driver.get('https://www.saucedemo.com/v1/')
    await driver.findElement(By.id('user-name')).sendKeys('problem_user')
    await driver.findElement(By.id('password')).sendKeys('secret_sauce')
    await driver.findElement(By.id('login-button')).click()
    //Add To Cart
    await driver.findElement(By.className('btn_inventory')).click()
    // Go To Cart
    await driver.findElement(By.css('.shopping_cart_link')).click()
    await driver.findElement(By.css('.checkout_button')).click()
    // Input Personal Data
    await driver.findElement(By.id('first-name')).sendKeys('Alexandre')
    await driver.findElement(By.id('last-name')).sendKeys('Christie')
    await driver.findElement(By.id('postal-code')).sendKeys('9862')
    await driver.findElement(By.css('.cart_button')).click()
    await new Promise(done => setTimeout(done, 3000))
    //Overview Page
    await driver.executeScript(function () {
        window.scroll({
            top : 300,
            behavior : 'smooth'
        })
    })
    await driver.findElement(By.css('.cart_button')).click()
    //LogOut
    await driver.findElement(By.css('.bm-burger-button')).click()
    const logout = await driver.findElement(By.id('logout_sidebar_link'))
    await driver.wait(until.elementIsVisible(logout), 3000)
    await logout.click()
    //Driver Close
    await new Promise(done => setTimeout(done, 3000))
    await driver.close()
}

testSauceDemo()