import { sleep } from 'k6'

export default async function (page) {
	await page.goto('https://mizanstore.com/')
	page.waitForSelector('#carousel > div > div.item.active > a > img')
	page.screenshot({ path: 'screenshots/001_dashboard_page.png' })
	sleep(3)
}