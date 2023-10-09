const Page = require("./Page");

class KatalogPage extends Page {
    constructor(driver){
        super(driver)
    }

    get featuredProdudtEl() {return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.RelativeLayout[2]/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[2]')}
    get saleFeaturedProductEl() {return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.RelativeLayout[3]/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout')}
    get categoryEl() {
        const categoryArr = [
            '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.RelativeLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]',
            '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.RelativeLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[2]',
            '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.RelativeLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[3]'
        ]
        return categoryArr
    }
    get searchEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/fab_ma_search')}
    get clearSearchEl() { return this.driver.$('~Clear query')}
    get applyEl() { return this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_filter')}
    get filterColorEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/spinner')}
    get colorRedEl() {return  this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[4]')}

    async selectProduct() {
        await this.featuredProdudtEl.click()
    }

    async selectSaleProduct() {
        await this.saleFeaturedProductEl.click()
    }

    async selectCategory(index) {
        await this.driver.$(`${this.categoryEl[index]}`).click()
    }

    async searchFilterBtn() {
        await this.searchEl.click()
        await this.clearSearchEl.click()
    }

    async slideMaxFilter(x) {
        await this.driver.touchPerform([
            { action: 'press', options : {x: 625, y: 250}},
            { action: 'wait', options : {ms: 500}},
            { action: 'moveTo', options : {x: x, y: 250}},
            { action: 'release'},
        ])
    }

    async slideMinFilter(x) {
        await this.driver.touchPerform([
            { action: 'press', options : {x: 95, y: 250}},
            { action: 'wait', options : {ms: 500}},
            { action: 'moveTo', options : {x: x, y: 250}},
            { action: 'release'},
        ])
    }

    async applyFilter() {
        await this.applyEl.click()
    }

    async selectColor() {
        await this.filterColorEl.click()
        const color = await this.colorRedEl
        await color.waitForDisplayed({timeout: 3000})
        await color.click()
    }
}

module.exports = KatalogPage