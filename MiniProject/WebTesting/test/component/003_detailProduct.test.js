const chai = require('chai')
const { WebDriver, By } = require('selenium-webdriver')
const setupDriver = require('../../utils/SetupDriver')
const DashboardPage = require('../../pageobjects/DashboardPage')
const DetailProductPage = require('../../pageobjects/DetailProductPage')

const expect = chai.expect

describe('Mizan Store Detail Product Page', function() {
    /** @type {WebDriver} */let driver
    /** @type {DashboardPage} */ let dashboardPage
    /** @type {DetailProductPage} */ let detailProductPage

    before(async function() {
        driver = await setupDriver()
        detailProductPage = new DetailProductPage(driver)
        await driver.manage().window().maximize()
    })

    describe('Click Baca Selengkapnya', function() {
        it('Diarahkan ke Deskripsi Lengkap', async function() {
            await detailProductPage.openPage()
            await detailProductPage.clickReadmore()
            const text = await detailProductPage.getTextByCss('#desk > p')
            expect(text).to.include('Spesial Offer 2 - 13 Oktober 2023')
        })
    })
    describe('Plus and Minus Amount Button', function() {
        it('Amount Product Plus 1', async function() {
            await detailProductPage.openPage()
            await detailProductPage.scrollPage(200)
            await detailProductPage.clickPlusButton()
            const text = await detailProductPage.getAttributeByCss('.quntity-input','value' )
            expect(text).to.include('2')
        })
        it('Amount Product Plus 99', async function() {
            await detailProductPage.openPage()
            await detailProductPage.scrollPage(200)
            for(let i = 1; i <= 99; i++){
                await detailProductPage.clickPlusButton()
            }
            const text =  await detailProductPage.getAttributeByCss('.quntity-input','value' )
            expect(text).to.include('100')
        })
        it('Amount Product Minus 1', async function() {
            await detailProductPage.openPage()
            await detailProductPage.scrollPage(200)
            await detailProductPage.clickPlusButton()
            await detailProductPage.clickMinusButton()
            const text =  await detailProductPage.getAttributeByCss('.quntity-input','value' )
            expect(text).to.include('1')
        })
    }) 
    describe('Click Thumbnail Image', function() {
        it('Change the image according to your choice ', async function() {
            await detailProductPage.openPage()
            await detailProductPage.scrollPage(600)
            await detailProductPage.selectThumbImage(1)
            const text = await detailProductPage.getAttributeByCss('#product-thum > div.bx-wrapper > div.bx-viewport > ul', 'style' )
            expect(text).to.include('width: 515%; position: relative;')
        })
    })
    describe('Click on specification Produk', function() {
        it('Show specification of Product', async function() {
            await detailProductPage.openPage()
            await detailProductPage.scrollPage(1000)
            await detailProductPage.clickSpecProduct()
            const text = await detailProductPage.getTextByCss('#tab-3 > div > h4')
            expect(text).to.include('Spesifikasi Produk')
        })
    })
    describe('Click on Review', function() {
        it('Show Riview Customer of Product', async function() {
            await detailProductPage.openPage()
            await detailProductPage.clickReviewCs()
            await detailProductPage.scrollPage(100)
            const text = await detailProductPage.getTextByCss('#tb-1')
            expect(text).to.include('Ulasan')
        })
    })
    describe('Buy Product from Detail Product', function() {
        it('Go to Cart Page and Displays Purchased Products ', async function() {
            await detailProductPage.openPage()
            await detailProductPage.clickPlusButton()
            await detailProductPage.clickBuy(72498)
            const text = await detailProductPage.getTextByCss('#frm_show > div > div.col-md-8.table-responsive > table > tbody > tr > td:nth-child(1) > div:nth-child(2) > p')
            const qty = await detailProductPage.getAttributeByCss('#qty_79d78cb21ad5a6e26619257b3ad992c6', 'value')
            const url = await driver.getCurrentUrl()
            expect(text).to.include('Paket Andre - Happy Birth-Die 2')
            expect(qty).to.equal('2')
            expect(url).to.include('https://mizanstore.com/keranjang') 
        })
        
    })                   

    after(async function() {
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })
})
