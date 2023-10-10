import { browser } from 'k6/experimental/browser'
import login_protocol from './protocol-test/001_login_page.protocol.test.js'
import dashboard_protocol from './protocol-test/002_dasboard_page.protocol.test.js'
import detailProduct_protocol from './protocol-test/003_detailProduct_page.protocol.test.js'
import cart_protocol from './protocol-test/004_cart_page.protocol.test.js'
import cart_with_1_item_protocol from './protocol-test/005_cart_page.protocol.test.js'
import checout_protocol from './protocol-test/006_checkout_page.protocol.test.js'
import orderPreview_protocol from './protocol-test/007_orderPreview_page.protocol.test.js'
import paymentMethod_protocol from './protocol-test/008_paymentMethod_page.protocol.test.js'

import login_browser from './browser-test/001_login_page.browser.test.js'
import dashboard_browser from './browser-test/002_dashboard_page.browser.test.js'
import detailProduct_browser from './browser-test/003_detailProduct_page.browser.test.js'
import cart_browser from './browser-test/004_cart_page.browser.test.js'
import cart_with_item_browser from './browser-test/005_cart_page.browser.test.js'

export const options = {
	scenarios: {
		protocolBased: {
			exec: 'protocolBasedScript',
			executor: 'constant-vus',
			vus: 10,
			duration: '15s',
		},
		// browserBased: {
		// 	exec: 'browserBasedScript',
		// 	executor: 'shared-iterations',
		// 	options: {
		// 		browser: {
		// 			type: 'chromium'
		// 		}
		// 	}
		// }
	}
}

export async function browserBasedScript () {
	const page = browser.newPage()

	try {
		await login_browser(page)
		await dashboard_browser(page)
		await detailProduct_browser(page)
		await cart_browser(page)
		await cart_with_item_browser(page)
	} finally {
		page.close()
	}
}

export function protocolBasedScript () {
	login_protocol()
	dashboard_protocol()
	detailProduct_protocol()
	cart_protocol()
	cart_with_1_item_protocol()
	checout_protocol()
	orderPreview_protocol()
	paymentMethod_protocol()
}