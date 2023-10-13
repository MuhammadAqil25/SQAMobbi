const { expect } = require("chai")
const setupDriver = require("../../utils/setupDriver")
const KatalogPage = require("../../pageobject/KatalogPage")

describe('Katalog Page Testing', function() {

    /** @type {WebdriverIO.Browser} */ let driver
    /** @type {KatalogPage} */ let katalogPage
    

    before(async function() {
        driver = await setupDriver()
        katalogPage = new KatalogPage(driver)
        await katalogPage.skipWelcomePage()
        await driver.pause(3000)
    })
    
    describe('Select product category', function() {
        it('go to Clothing Page', async function() {
            await katalogPage.selectCategory(0)
            const text = await driver.$('android.widget.TextView').getText()
            await katalogPage.backNav()
            expect(text).to.equal('Kids')
        })
        it('go to Electronics Page', async function() {
            await katalogPage.scrollPage(1000, 630)
            await katalogPage.selectCategory(2)
            const text = await driver.$('android.widget.TextView').getText()
            await katalogPage.backNav()
            expect(text).to.equal('TV')
        })
    })
     
    describe('Select product from featured Product', function() {
        it('go to Detail Product Page', async function() {
            await katalogPage.scrollPage(1250, 100)
            await katalogPage.selectProduct()
            const text = await driver.$('android.widget.TextView').getText()
            const productName  = await driver.$('id=com.studiobluelime.ecommerceapp:id/pv_txt_productname').getText()
            await katalogPage.backNav()
            expect(text).to.equal('Product')
            expect(productName).to.equal('Note 9 Pro')
        })
    })

    describe('Select product from Sale featured Product', function() {
        it('go to Detail Product Page', async function() {
            await katalogPage.scrollPage(1250, 100)
            await katalogPage.selectSaleProduct()
            const text = await driver.$('android.widget.TextView').getText()
            const productName  = await driver.$('id=com.studiobluelime.ecommerceapp:id/pv_txt_productname').getText()
            await katalogPage.backNav()
            expect(text).to.equal('Product')
            expect(productName).to.equal('Blue Joggers')
            
        })
    })

    describe('Test Search and Filter Feature', function() {
        // it('Find Product With Potato Name', async function() {
            // await driver.$('id=com.studiobluelime.ecommerceapp:id/fab_ma_search').click()
        //     await driver.$('id=com.studiobluelime.ecommerceapp:id/search_plate').sendKeys('Potato')
        //     await katalogPage.touchPage(300, 200)
        //     const productName = await driver.$('id=com.studiobluelime.ecommerceapp:id/textname')
        //     await productName.waitForExist({timeout: 3000})
        //     const productText = await productName.getText()
        //     expect(productText).to.equal('Potato')
        // })
        it('Filter By Price', async function() {
            await katalogPage.searchFilterBtn()
            await katalogPage.slideMaxFilter(200)
            await katalogPage.applyFilter()
            const productPrice = await driver.$('id=com.studiobluelime.ecommerceapp:id/textprice')
            await productPrice.waitForExist({timeout: 3000})
            const productText = await productPrice.getText()
            expect(productText).to.equal('Rs. 0')
        })
        it('Filter By Color', async function() {
            await driver.pause(2000)
            await katalogPage.selectColor()
            await katalogPage.applyFilter()
            const productName = await driver.$('id=com.studiobluelime.ecommerceapp:id/textname')
            await productName.waitForExist({timeout: 3000})
            const productText = await productName.getText()
            expect(productText).to.equal('Maroon Top')
        })
    })

    after(async function() {
        await driver.pause(2000)
        await driver.deleteSession()
    })
})