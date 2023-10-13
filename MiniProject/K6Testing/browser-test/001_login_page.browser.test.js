import { check, group, sleep } from 'k6'

export default async function (page) {
    await page.goto('https://mizanstore.com/customer/login')
    page.waitForSelector('#form_login_member')
    page.screenshot({ path: 'screenshots/001_login_page_1.png' })
    sleep(3)

    //input Email
    await page.fill('#form_login_member > div:nth-child(2) > input[type=text]', 'aqilcihara@gmail.com')

    //input password
    await page.fill('#form_login_member > div:nth-child(3) > input[type=password]', 'alex123456')

    const loginBtn = page.locator('#form_login_member > div:nth-child(4) > button')
    await loginBtn.click()
    
    page.screenshot({ path: 'screenshots/001_login_page_2.png' })
    sleep(3)

    check(page, {
        'Go To Menu Account': page => page.locator('//h4[text()="Menu Account"]').isVisible() === true,
    })
}