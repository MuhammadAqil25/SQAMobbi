import { check, group, sleep } from 'k6'

export default async function (page) {
	await page.goto('https://mizanstore.com/keranjang')
	page.waitForSelector('#show-cart-v1 > div > div > h4')
	page.screenshot({ path: 'screenshots/004_cart_page.png' })
	sleep(3)

	check(page, {
		'Go To Cart Page': page => page.locator('//h4[text()="Keranjang Belanja Anda Masih Kosong Silahkan Klik "]').isVisible() === true,
	})
}