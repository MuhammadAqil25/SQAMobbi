const { Builder, Browser, By, until, WebDriver } = require('selenium-webdriver')
const chai = require('chai')
const setupDriver = require('../util/setupDriver')
const LoginPage = require('../pageobjects/LoginPage')
const DashboardPage = require('../pageobjects/DashboardPage')
const CartPage = require('../pageobjects/CartPage')
const CheckoutInformation = require('../pageobjects/CheckoutInformation')

const expect = chai.expect

describe("SauceDemo Web Test", function() {
    /** @type {WebDriver} */ let driver
    /** @type {LoginPage} */ let loginPage
    /** @type {DashboardPage} */ let dashboardPage
    /** @type {CartPage} */ let cartPage
    /** @type {CheckoutInformation} */ let checkoutInformation

    before(async function() {
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        dashboardPage = new DashboardPage(driver)
        cartPage = new CartPage(driver)
        checkoutInformation = new CheckoutInformation(driver)
    })

    // Login Page
    describe("Melakukan Login dengan Username standard_user", function() {
        it("Masuk kehalaman Dashboard Saucedemo", async function () {
            //Login
            await loginPage.openPage()
            await loginPage.loginProcess('standard_user', 'secret_sauce')
            
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://www.saucedemo.com/v1/inventory.html')
        })
    })
    describe("Melakukan Login dengan Username locked_out_user", function() {
        it("Masuk kehalaman Dashboard Saucedemo", async function () {
            //Login
            await loginPage.openPage()
            await loginPage.loginProcess('locked_out_user', 'secret_sauce')
            
            const errMassage = await loginPage.errMassage()
            expect(errMassage).to.include('Sorry, this user has been locked out.')
        })
    })
    describe("Melakukan Login dengan Username problem_user", function() {
        it("Masuk kehalaman Dashboard Saucedemo", async function () {
            //Login
            await loginPage.openPage()
            await loginPage.loginProcess('problem_user', 'secret_sauce')
            
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://www.saucedemo.com/v1/inventory.html')
        })
    })     
    describe("Melakukan Login Tanpa Memasukkan Input", function() {
        it("Menampilkan Alert di Samping Tombol Login", async function () {
            //Login
            await loginPage.openPage()
            await loginPage.loginProcess('', '')
            const errMassage = await loginPage.errMassage()
            expect(errMassage).have.to.include('Username is required')
        })
    })
    describe("Melakukan Login Tanpa Memasukkan Username", function() {
        it("Menampilkan Alert di Samping Tombol Login", async function () {
            //Login
            await loginPage.openPage()
            await loginPage.loginProcess('', 'secret_sauce')
            const errMassage = await loginPage.errMassage()
            expect(errMassage).have.to.include('Username is required')
        })
    })
    describe("Melakukan Login Tanpa Memasukkan Password", function() {
        it("Menampilkan Alert di Samping Tombol Login", async function () {
            //Login
            await loginPage.openPage()
            await loginPage.loginProcess('standard_user', '')
            const errMassage = await loginPage.errMassage()
            expect(errMassage).have.to.include('Password is required')
        })
    })
    // Dashboard Page
    describe("Add To Cart Products", function() {
        it("Jumlah Product Bertambah di Icon Keranjang", async function(){
            await dashboardPage.openPage()
            await dashboardPage.addToCart(1)
            await dashboardPage.addToCart(2)
            // await dashboardPage.addToCart(4)
            driver.sleep(6000)
            const totalItem = parseInt(await driver.findElement(By.css('.fa-layers-counter.shopping_cart_badge')).getText())
            expect(totalItem).to.equal(2)
        })
    })
    describe("Klik Tombol Keranjang", function(){
        it("Menuju ke halaman Keranjang", async function(){
            await dashboardPage.openPage()
            await driver.findElement(By.css('.shopping_cart_link')).click()

            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://www.saucedemo.com/v1/cart.html')
        })
    })  
    // Cart Page
    describe("Klik Tombol Checkout", function() {
        it('Menuju ke halaman CheckoutInformation', async function() {
            await cartPage.openPage()
            await driver.findElement(By.css('.checkout_button')).click()
            const url = await driver.getCurrentUrl()
            expect(url).to.equal("https://www.saucedemo.com/v1/checkout-step-one.html")
        })
    })
    // Checkout Information Page
    describe("Menginput Semua Data Dengan Benar", function(){
        it("Menuju ke halaman Overview", async function() {
            await checkoutInformation.openPage()
            await checkoutInformation.yourInformation('Alexandre', "Christie", "12342")
            const url = await driver.getCurrentUrl()
            expect(url).to.equal("https://www.saucedemo.com/v1/checkout-step-two.html")
        })
    })
    describe("Menginput Data Dengan Mengosongkan Firstname", function(){
        it("Menampilkan Alert First Name is required", async function() {
            await checkoutInformation.openPage()
            await checkoutInformation.yourInformation('', "Christie", "12342")
            const err = await checkoutInformation.errMassage()
            expect(err).to.include("First Name is required")
        })
    })
    describe("Menginput Data Dengan Mengosongkan Lastname", function(){
        it("Menampilkan Alert Last Name is required", async function() {
            await checkoutInformation.openPage()
            await checkoutInformation.yourInformation('Alexandre', "", "12342")
            const err = await checkoutInformation.errMassage()
            expect(err).to.include("Last Name is required")
        })
    })
    describe("Menginput Data Dengan Mengosongkan Postal Code", function(){
        it("Menampilkan Alert Postal Code is required", async function() {
            await checkoutInformation.openPage()
            await checkoutInformation.yourInformation('Alexandre', "Christie", "")
            const err = await checkoutInformation.errMassage()
            expect(err).to.include("Postal Code is required")
        })
    })
    describe("Mengosongkan Seluruh Data CO", function(){
        it("Menampilkan Alert First Name is required", async function() {
            await checkoutInformation.openPage()
            await checkoutInformation.yourInformation('', "", "")
            const err = await checkoutInformation.errMassage()
            expect(err).to.include("First Name is required")
        })
    })
    // Checkout Overview Page
    describe("Klik Tombol Finish pada halaman Overview", function() {
        it('Menuju ke Halaman Finish', async function() {
            await driver.get('https://www.saucedemo.com/v1/checkout-step-two.html')
            await driver.executeScript(function () {
                window.scroll({
                    top : 300,
                    behavior : 'smooth'
                })
            })
            await driver.findElement(By.css('.cart_button')).click()
            const url = await driver.getCurrentUrl()
            expect(url).to.equal("https://www.saucedemo.com/v1/checkout-complete.html")
        })
    })
    // Finish Page
    describe("Selesaikan Pesanan dan Logout", function(){
        it('Logout dan kembali ke halaman Login', async function(){
            await driver.get('https://www.saucedemo.com/v1/checkout-complete.html')
            await driver.findElement(By.css('.bm-burger-button')).click()
            const logout = await driver.findElement(By.id('logout_sidebar_link'))
            await driver.wait(until.elementIsVisible(logout), 3000)
            await logout.click()
        })
    })

    after(async function() {
        //Driver Close
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })
})
