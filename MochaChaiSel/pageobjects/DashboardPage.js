const { By } = require("selenium-webdriver");
const Page = require("./Page");

class DashboardPage extends Page {
    constructor(driver){
        super(driver)
    }

    async openPage(){
        await this.openUrl('/inventory.html')
    }

    async addToCart(id){
        // await this.driver.findElement(By.css('.btn_inventory')).click()
        await this.driver.findElement(By.css(`.inventory_list .inventory_item:nth-child(${id}) .btn_inventory:last-child`)).click()
    }


}

module.exports = DashboardPage