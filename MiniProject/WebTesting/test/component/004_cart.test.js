const chai = require('chai')
const { WebDriver, By, until } = require('selenium-webdriver')
const setupDriver = require('../../utils/SetupDriver')
const DetailProductPage = require('../../pageobjects/DetailProductPage')
const CartPage = require('../../pageobjects/CartPage')

const expect = chai.expect
// Positive
describe('Mizan Store Cart Page', function() {
    /** @type {WebDriver} */let driver
    /** @type {DetailProductPage} */ let detailProductPage
    /** @type {CartPage} */ let cartPage

    before(async function() {
        driver = await setupDriver()
        detailProductPage = new DetailProductPage(driver)
        cartPage = new CartPage(driver)
        await driver.manage().window().maximize()
        await detailProductPage.openPage()
        await detailProductPage.clickBuy(72498)
    })

    describe('Click Delete Button', function() {
        it('Product Deleted From Cart', async function() {
            await cartPage.openPage()
            await cartPage.clickDeleteItemButton()
            const text = await cartPage.getTextByCss('#show-cart-v1 > div > div > h4')
            expect(text).to.include('Keranjang Belanja Anda Masih Kosong')
            await detailProductPage.openPage()
            await detailProductPage.clickBuy(72498)
        })
    })
    
    describe('Click Kosongkan Button', function() {
        it('Deleted All Products From Cart', async function() {
            await cartPage.openPage()
            await cartPage.clickDeleteCartButton()
            const text = await cartPage.getTextByCss('#show-cart-v1 > div > div > h4')
            expect(text).to.include('Keranjang Belanja Anda Masih Kosong')
            await detailProductPage.openPage()
            await detailProductPage.clickBuy(72498)
        })
    })

    describe('Click Plus and Minus Button', function() {
        it('Quantity of Item Plus 1', async function() {
            await cartPage.openPage()
            await cartPage.clickPlusButton()
            const qty = await cartPage.getAttributeByCss('.quntity-input', 'value')
            expect(qty).to.equal('2')
        })
        it('Quantity of Item Minus 1', async function() {
            await cartPage.openPage()
            await cartPage.clickMinusButton()
            const qty = await cartPage.getAttributeByCss('.quntity-input', 'value')
            expect(qty).to.equal('1')
        }) 
    })

    describe('Click Lanjutkan Belanja Button', function() {
        it('Go To Dashboard Page', async function() {
            await cartPage.openPage()
            await cartPage.clickContinueShop()
            await driver.sleep(2000)
            const url = await driver.getCurrentUrl()
            expect(url).to.include('https://mizanstore.com/')
        })
    })

    describe('Click Checkout Button', function() {
        it('Go To Checkout Page', async function() {
            await cartPage.openPage()
            await cartPage.clickCheckout()
            const url = await driver.getCurrentUrl()
            expect(url).to.include('https://mizanstore.com/checkout')
        })
    })

    describe('Click at Lihat Voucher', function() {
        it('Show modals List Voucher', async function() {
            await cartPage.openPage()
            await cartPage.clickViewVoucher()
            await driver.sleep(2000)
            const modals = await cartPage.voucherModals()
            const text = await modals.getText()
            expect(text).to.include('SALIN & GUNAKAN KODE VOUCHER')
        })
    })
    
    //Negatif
    describe('Promo Voucher Test', function() {
        it('Empty Voucher Input', async function() {
            await cartPage.openPage()
            await cartPage.inputVoucherProcess('')
            const alert = await cartPage.alertVoucher()
            const text = await alert.getText()
            expect(text).to.include('Kode Voucher Wajib Di Input')
        })
        it('Input Wrong Word at Kode Voucher', async function() {
            await cartPage.openPage()
            await cartPage.inputVoucherProcess('plowjad@#!$!#')
            const alert = await cartPage.alertVoucher()
            const text = await alert.getText()
            expect(text).to.include('Voucher Gagal Digunakan')
        })        
    })

    after(async function() {
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })

})
