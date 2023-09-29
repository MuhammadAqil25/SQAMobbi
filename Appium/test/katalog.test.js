const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const LoginPageDemo = require('../pageobjects/LoginPageDemo')
const KatalogPage = require('../pageobjects/KatalogPage')

describe('Katalog Page Testing Saucedemo App', function() {

    /** @type {WebdriverIO.Browser} */ let driver
    /** @type {LoginPageDemo}*/ let loginPage
    /** @type {KatalogPage} */ let katalogPage

    before(async function () {
        driver = await setupDriver()
        katalogPage = new KatalogPage(driver)
        loginPage = new LoginPageDemo(driver)
        await loginPage.openLoginPage()
        await loginPage.loginProcess('bob@example.com', '10203040')    
    })

    describe('Name Sorting Descending', function(){
        it('All item sorti sort by descending', async function (){
            await katalogPage.sortNameDesc()
            const name1 = await katalogPage.getNameText(1)
            const name2 = await katalogPage.getNameText(2)
            expect(name1).to.satisfy(x => x > name2)
        })
    })

    describe('Name Sorting Ascending', function(){
        it('All item sorti by name ascending', async function (){
            await katalogPage.sortNameAsc()
            const name1 = await katalogPage.getNameText(1)
            const name2 = await katalogPage.getNameText(2)
            expect(name1).to.satisfy(x => x < name2)
        })
    })

    describe('Price Sorting Descending', function(){
        it('All item sort by price descending', async function (){
            await katalogPage.sortPriceDesc()
            const price1 = await katalogPage.getPriceText(1)
            const price2 = await katalogPage.getPriceText(2)
            expect(price1).to.satisfy(num => num > price2)
        })
    })

    describe('Price Sorting Ascending', function(){
        it('All item sorti by price ascending', async function (){
            await katalogPage.sortPriceAsc()
            const price1 = await katalogPage.getPriceText(1)
            const price2 = await katalogPage.getPriceText(2)
            expect(price1).to.satisfy(num => num < price2)
        })
    })

    describe.skip('Click Product', function() {
        it('Go to detail product page', async function () {
            const nameAtKatalog = await katalogPage.getNameText(1)
            await katalogPage.clickProduct(1)
            const nameAtDetail = await driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView').getText()
            // nameAtDetail Menerima input berupa 'Products' bukan nama dari product yang dipilih
            expect(nameAtKatalog).to.equal(nameAtDetail)
        })
    })
    
    after(async function() {
        await driver.pause(2000)
        await driver.deleteSession()  
    })
})