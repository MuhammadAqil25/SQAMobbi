const { Browser, Bt, until, WebDriver } = require('selenium-webdriver')
const chai  = require('chai')
const setupDriver = require('../utils/SetupDriver')
const DashboardPage = require('../pageobjects/DashboardPage.js')

const expect = chai.expect

describe('Mizan Store Dashboard Web Testing', function() {
    /** @type {WebDriver} */ let driver
    /** @type {DashboardPage} */ let dashboardPage

    before(async function() {
        driver = await setupDriver()
        dashboardPage = new DashboardPage(driver)
        driver.manage().window().maximize()
    })

    describe('Click Kategori on Navbar', function() {
        it('Go to Kategori Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.clickNavBar(1)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/kategoriproduk/buku')
        })
    })
    describe('Click POD on Navbar', function() {
        it('Go to POD Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.clickNavBar(2)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/pencarian/hasil_pencarian?kata_pencarian=pod')
        })
    })
    describe('Click SELF PUB on Navbar', function() {
        it('Go to SELF PUB Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.clickNavBar(3)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/pencarian/hasil_pencarian?kata_pencarian=slpb')
        })
    })
    describe('Click E Book on Navbar', function() {
        it('Go to E Book Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.clickNavBar(4)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/ebook/index')
        })
    })
    describe('Test Search on Navbar', function() {
        it('Search item with Name Nusantara', async function() {
            await dashboardPage.openPage()
            await dashboardPage.searchProcess('Nusantara')
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/pencarian/hasil_pencarian?kata_pencarian=Nusantara')
        })
    })
    describe('Click Product Special Offer & Pre Order', function() {
        it('Go to Product Detail 1 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.specialProduct(3)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/paket_andre_-_happy_72498')
        })
        it('Go to Product Detail 6 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.specialProduct(8)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/sister_fillah_youll_never_72095')
        }) 
    })
    describe('Click Product Buku Terbaru', function() {
        it('Go to Product Detail 1 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.bukuTerbaru(1)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/percy_jackson_and_the_72513')
        })
        it('Go to Product Detail 12 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.bukuTerbaru(12)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/keluarga_dan_silsilah_suka_72476')
        }) 
    })
    describe('Click Product Terlaris', function() {
        it('Go to Product Detail 1 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.bukuTerlaris(1)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/halaman_pertama_anas_urbaningrum_71447')
        })
        it('Go to Product Detail 12 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.bukuTerlaris(12)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/10_ilmuwan_muslim_terhebat_71425')
        }) 
    })
    describe('Click Product Al-Quran', function() {
        it('Go to Product Detail 1 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.Al_Quran(1)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/al-quran_al-bayan_a5_hvs_70408')
        })
        it('Go to Product Detail 12 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.Al_Quran(6)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/mushaf_al-maqbul_hijau_new_70397')
        }) 
    })                  

    after(async function() {
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })
})