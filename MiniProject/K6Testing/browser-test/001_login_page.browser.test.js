import { sleep } from 'k6'

export default async function (page) {
	await page.goto('https://mizanstore.com/customer/login')
	page.waitForSelector('#form_login_member')
	page.screenshot({ path: 'screenshots/000_login_page_1.png' })
	sleep(3)

    // const email = page.locator('#form_login_member > div:nth-child(2) > input[type=text]')
    // await email.inputValue('aqilcihara@gmail.com')
    // const password = page.locator('#form_login_member > div:nth-child(3) > input[type=password]')
    // await password.inputValue('alex123456')
    // const loginBtn = page.locator('#form_login_member > div:nth-child(4) > button')
    // await loginBtn.click()
    // page.waitForSelector('body > div.wrapper.push-wrapper > div.container > div > div.col-md-3 > div > h4')
    // page.screenshot({ path: 'screenshots/000_login_page_2.png' })
}