const { Browser, Bt, until, WebDriver, By } = require('selenium-webdriver')
const chai  = require('chai')
const setupDriver = require('../../utils/SetupDriver')
const DashboardPage = require('../../pageobjects/DashboardPage.js')

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
            const text = await dashboardPage.getTextByCss('#list_sub_kategori > li:nth-child(1)')
            expect(url).to.equal('https://mizanstore.com/kategoriproduk/buku')
            expect(text).to.include('Kategori Buku')
        })
    })
    describe('Click POD on Navbar', function() {
        it('Go to POD Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.clickNavBar(2)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('body > div.wrapper.push-wrapper > main > div > div > div > div > div.book-listheader > div.col-md-12.box-pengarang > p > span')
            expect(url).to.equal('https://mizanstore.com/pencarian/hasil_pencarian?kata_pencarian=pod')
            expect(text).to.include('pod')
        })
    })
    describe('Click SELF PUB on Navbar', function() {
        it('Go to SELF PUB Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.clickNavBar(3)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('body > div.wrapper.push-wrapper > main > div > div > div > div > div.book-listheader > div.col-md-12.box-pengarang > p > span')
            expect(url).to.equal('https://mizanstore.com/pencarian/hasil_pencarian?kata_pencarian=slpb')
            expect(text).to.include('slpb')
        })
    })
    describe('Click E Book on Navbar', function() {
        it('Go to E Book Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.clickNavBar(4)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('body > div.wrapper.push-wrapper > main > div.tc-padding > div > div > div > div.book-list-header > div.col-md-12.col-sm-12.box-pengarang > h4')
            expect(url).to.equal('https://mizanstore.com/ebook/index')
            expect(text).to.include('Ebook / Google Book Store')
        })
    })
    describe('Test Search on Navbar', function() {
        it('Search item with Name Nusantara', async function() {
            await dashboardPage.openPage()
            await dashboardPage.searchProcess('Nusantara')
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('body > div.wrapper.push-wrapper > main > div > div > div > div > div.book-listheader > div.col-md-12.box-pengarang > p > span')
            expect(text).to.include('Nusantara')
            expect(url).to.equal('https://mizanstore.com/pencarian/hasil_pencarian?kata_pencarian=Nusantara')
        })
    })
    describe('Click Product Special Offer & Pre Order', function() {
        it('Go to Product Detail 1 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.specialProduct(1)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('#tag_judul')
            expect(text).to.include('Paket Reguler - Buku Tumbuh Meski Tak Utuh (Special Offer)')
            expect(url).to.equal('https://mizanstore.com/paket_reguler_-_buku_72519')
        })
        it('Go to Product Detail 10 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.specialProduct(10)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('#tag_judul')
            expect(text).to.include('Atlanta + Photocard (Special Offer)')
            expect(url).to.equal('https://mizanstore.com/atlanta_photocard_special_72152')
        }) 
    })
    describe('Click Product Buku Terbaru', function() {
        it('Go to Product Detail 1 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.bukuTerbaru(1)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('#tag_judul')
            expect(text).to.include('Cinta 31.000 Kaki')
            expect(url).to.equal('https://mizanstore.com/cinta_31000_kaki_72524')
        })
        it('Go to Product Detail 12 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.bukuTerbaru(12)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('#tag_judul')
            expect(text).to.include('Keluarga Dan Silsilah Suka Duka')
            expect(url).to.equal('https://mizanstore.com/keluarga_dan_silsilah_suka_72476')
        }) 
    })
    describe('Click Product Terlaris', function() {
        it('Go to Product Detail 1 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.bukuTerlaris(1)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('#tag_judul')
            expect(text).to.include('HALAMAN PERTAMA ANAS URBANINGRUM')
            expect(url).to.equal('https://mizanstore.com/halaman_pertama_anas_urbaningrum_71447')
        })
        it('Go to Product Detail 12 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.bukuTerlaris(12)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('#tag_judul')
            expect(text).to.include('10 ILMUWAN MUSLIM TERHEBAT (BOARDBOOK)')
            expect(url).to.equal('https://mizanstore.com/10_ilmuwan_muslim_terhebat_71425')
        }) 
    })
    describe('Click Product Al-Quran', function() {
        it('Go to Product Detail 1 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.Al_Quran(1)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('#tag_judul')
            expect(text).to.include('AL-QURAN AL-BAYAN A5 HVS MERAH NEW')
            expect(url).to.equal('https://mizanstore.com/al-quran_al-bayan_a5_hvs_70408')
        })
        it('Go to Product Detail 12 Page', async function() {
            await dashboardPage.openPage()
            await dashboardPage.Al_Quran(6)
            const url = await driver.getCurrentUrl()
            const text = await dashboardPage.getTextByCss('#tag_judul')
            expect(text).to.include('MUSHAF AL-MAQBUL HIJAU NEW')
            expect(url).to.equal('https://mizanstore.com/mushaf_al-maqbul_hijau_new_70397')
        }) 
    })
    
    describe('Test Search on Navbar with Wrong Input', function() {
        it('Search item with Name Nusantara', async function() {
            await dashboardPage.openPage()
            await dashboardPage.searchProcess('~!@#$%^&*()_+')
            const text = await dashboardPage.getTextByCss('body > div.wrapper.push-wrapper > main > div > div > div > div > div.book-listheader > div.col-md-12.box-pengarang > p:nth-child(2)')
            expect(text).to.include('tidak ditemukan')
        })
    })

    after(async function() {
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })
})