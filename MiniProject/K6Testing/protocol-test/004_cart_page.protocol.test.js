import { check, group } from 'k6'
import http from 'k6/http'
import { Trend } from 'k6/metrics'
import { headers } from '../config/headers.js'

const pageDuration = new Trend('page_cart_duration', true)


export default function () {
	group('004_cart_page', function () {
		const responses = http.batch([
			['GET', 'https://mizanstore.com/keranjang', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/animate.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/icomoon.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/main.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/color-1.css', headers],
			['GET', 'https://mizanstore.com/assets/maintenance/js/countdown.js', headers],
			['GET', 'https://mizanstore.com/assets/plugins/lazyload_image/jquery.unveil.js', headers],
			['GET', 'https://mizanstore.com/assets/dist/js/bootbox.min.js', headers],
			['GET', 'https://mizanstore.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js', headers],
			['GET', 'https://mizanstore.com/com_banner_info/get_banner?check=button_checkout', headers],
			['GET', 'https://mizanstore.com/admin718/assets/img/logo/logo-mizanstore-atas.png', headers],
			['GET', 'https://mizanstore.com/assets/img/logo/MS-FOOTER-IDEA.jpg', headers],
			['GET', 'https://mizanstore.com//admin718/assets/img/logo/logo_bawah_white.png', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/fontawesome-webfont.woff2?v=4.6.3', headers],
		])

		for (const res of responses) {
			pageDuration.add(res.timings.duration)

			check(res, {
				'status 200': r => r.status === 200
			})
		}
	})
}