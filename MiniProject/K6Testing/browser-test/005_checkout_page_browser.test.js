import { sleep } from 'k6'

export default async function (page) {
	await page.goto('https://mizanstore.com/checkout')
	page.waitForSelector('#checkout-validation-form > div > div.panel-judul')
	page.screenshot({ path: 'screenshots/006_checkout_page.png' })
	sleep(3)
}