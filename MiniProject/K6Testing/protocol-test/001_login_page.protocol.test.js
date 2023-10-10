import { check, group } from 'k6'
import http from 'k6/http'
import { Trend } from 'k6/metrics'
import { headers } from '../config/headers.js'

const pageDuration = new Trend('page_login_duration', true)


export default function () {
	group('001_login_page', function () {
		const responses = http.batch([
			['GET', 'https://mizanstore.com/customer/login_proses', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/bootstrap/bootstrap.min.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/font-awesome.min.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/animate.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/icomoon.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/main.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/color-1.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/style_new.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/responsive.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/css/transition.css', headers],
			['GET', 'https://mizanstore.com/assets/maintenance/js/countdown.js', headers],
			['GET', 'https://mizanstore.com/assets/plugins/lazyload_image/jquery.unveil.js', headers],
			['GET', 'https://mizanstore.com/assets/dist/js/bootbox.min.js', headers],
			['GET', 'https://mizanstore.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js', headers],
			['GET', 'https://mizanstore.com/admin718/assets/img/logo/logo-mizanstore-atas.png', headers],
			['GET', 'https://mizanstore.com/admin718/assets/img/logo/logo-mizanstore-bawah.png', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/fontawesome-webfont.woff2?v=4.6.3', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/fontawesome-webfont.woff2?v=4.6.3', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/fontawesome-webfont.woff2?v=4.6.3', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/fontawesome-webfont.woff2?v=4.6.3', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/fontawesome-webfont.woff2?v=4.6.3', headers],
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