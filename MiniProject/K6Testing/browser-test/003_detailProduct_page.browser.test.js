import { sleep } from 'k6'

export default async function (page) {
	await page.goto('https://mizanstore.com/percy_jackson_and_the_72513')
	page.waitForSelector('#product-thum > div.bx-wrapper > div.bx-viewport > ul > li:nth-child(1) > div > img')
	page.screenshot({ path: 'screenshots/002_detailProduct_page.png' })
	sleep(3)
}