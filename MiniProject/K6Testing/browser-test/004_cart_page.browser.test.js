import { sleep } from 'k6'

export default async function (page) {
	await page.goto('https://mizanstore.com/keranjang')
	page.waitForSelector('#show-cart-v1 > div > div > h4')
	page.screenshot({ path: 'screenshots/003_cart_page.png' })
	sleep(3)
}