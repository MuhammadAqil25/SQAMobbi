import { check, group } from 'k6'
import http from 'k6/http'
import { Trend } from 'k6/metrics'
import { headers } from '../config/headers.js'

const pageDuration = new Trend('page_dashboard_duration', true)

export default function () {
	group('002_dashboard_page', function () {
		const responses = http.batch([
			['GET', 'https://mizanstore.com/', headers],
			['GET', 'https://mizanstore.com//themes/book-store/style_new.css', headers],
			['GET', 'https://mizanstore.com/assets/dist/ms-newcss.css', headers],
			['GET', 'https://mizanstore.com//themes/book-store/style_new.css', headers],
			['GET', 'https://mizanstore.com/assets/dist/ms-newcss.css', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/vendor/jquery.min.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/jquery-ui.js', headers],
			['GET', 'https://mizanstore.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js', headers],
			['GET', 'https://mizanstore.com//themes/book-store/js/main.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/owl-carousel.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/vendor/modernizr.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/vendor/bootstrap.min.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/datepicker.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/contact-form.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/bigslide.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/3d-book-showcase.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/turn.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/mcustom-scrollbar.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/timeliner.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/parallax.js', headers],
			['GET', 'https://mizanstore.com/assets/maintenance/js/countdown.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/countTo.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/bxslider.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/appear.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/sticky.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/prettyPhoto.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/isotope.pkgd.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/wow-min.js', headers],
			['GET', 'https://mizanstore.com/themes/book-store/js/classie.js', headers],
			['GET', 'https://mizanstore.com/assets/plugins/lazyload_image/jquery.unveil.js', headers],
			['GET', 'https://mizanstore.com/assets/dist/js/bootbox.min.js', headers],
			['GET', 'https://mizanstore.com/assets/plugins/sly/sly.min.js', headers],
			['GET', 'https://mizanstore.com/assets/plugins/sly/plugins.js', headers],
			['GET', 'https://mizanstore.com/assets/plugins/sly/modernizr.js', headers],
			['GET', 'https://mizanstore.com/admin718/assets/img/logo/logo-mizanstore-atas.png', headers],
			['GET', 'https://mizanstore.com/assets/img/sample/loader/loader_produk.webp', headers],
			['GET', 'https://mizanstore.com/assets/img/logo/MS-FOOTER-IDEA.jpg', headers],
			['GET', 'https://mizanstore.com/admin718/assets/img/logo/logo-mizanstore-bawah.png', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/fontawesome-webfont.woff2?v=4.6.3', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/icomoon.woff', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/icomoon.ttf?f2i8mo', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/Roboto-Regular.ttf', headers],
		])

		for (const res of responses) {
			pageDuration.add(res.timings.duration)

			check(res, {
				'status 200': r => r.status === 200
			})
		}
	})
}