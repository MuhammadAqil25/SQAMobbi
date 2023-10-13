import { check, group, sleep } from 'k6'

export default async function (page) {
	await page.goto('https://mizanstore.com/')
	page.waitForSelector('#carousel > div > div.item.active > a > img')
	page.screenshot({ path: 'screenshots/002_dashboard_page.png' })
	sleep(3)

	// const selectedProduct = page.locator('#shop-collection-content-x > div > div:nth-child(1) > div > a > div.ms-product-item__desc > p[text()="PAKET REGULER - BU…"]')
	// await selectedProduct.click()

	check(page, {
		'Go To Dashboard Page': page => page.locator('//strong[text()="Baca informasi dampak Covid-19 di sini."]').isVisible() === true,
	})
}