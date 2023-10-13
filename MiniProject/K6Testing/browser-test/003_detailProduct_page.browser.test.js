import { check, group, sleep } from 'k6'

export default async function (page) {
	await page.goto('https://mizanstore.com/percy_jackson_and_the_72513')
	page.waitForSelector('#product-thum > div.bx-wrapper > div.bx-viewport > ul > li:nth-child(1) > div > img')
	page.screenshot({ path: 'screenshots/003_detailProduct_page.png' })
	sleep(3)

	// const plusQty = page.locator('#form_add_cart > div > div > div.col-lg-8.col-md-7 > div > div.quantity-box > div > div.sp-plus.fff')
	// await plusQty.click()
	// await plusQty.click()

	// const buy = page.locator('#form_add_cart > div > div > div.col-lg-8.col-md-7 > div > ul.btn-list > li:nth-child(1)')
	// await buy.click()
	// await Promise.all([page.waitForNavigation(), buy.click()]);

	check(page, {
		'Go To Detail Product Page': page => page.locator('//span[text()="Percy Jackson and the Olympians #6: The Chalice of the Gods"]').isVisible() === true,
		'Check Item Name': page => page.locator('//span[text()="Percy Jackson and the Olympians #6: The Chalice of the Gods"]').isVisible() === true,
	  })
}