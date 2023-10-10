import { check, group } from 'k6'
import http from 'k6/http'
import { Trend } from 'k6/metrics'
import { headers } from '../config/headers.js'

const pageDuration = new Trend('page_checkout_duration', true)


export default function () {
	group('006_checkout_page', function () {
		const responses = http.batch([
			['GET', 'https://mizanstore.com/checkout', headers],
			['GET', 'https://mizanstore.com/themes/book-store/style_new.css', headers],
			['GET', 'https://mizanstore.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js', headers],
			['GET', 'https://mizanstore.com/cart_order/ctrl_501_co/f_Cek_Session', headers],
			['GET', 'https://mizanstore.com/cart_order/ctrl_501_co/f_Get_Default_Customer', headers],
			['GET', 'https://mizanstore.com/cart_order/ctrl_501_co/f_Get_Data_Ringkasan', headers],
			['GET', 'https://mizanstore.com/cart_kurir/pos_rln/f_Load_pos_rln', headers],
			['GET', 'https://mizanstore.com/cart_kurir/sicepat_luar_negri/f_Load_SicepatLN', headers],
			['GET', 'https://mizanstore.com/admin718/assets/img/logo/logo-mizanstore-bawah.png', headers],
			['GET', 'https://mizanstore.com/admin718/assets/img/com_cart/produk/percy_jackson_and_the_olympians_6_the_chalice_of_the_gods_thumb_2824.jpg', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/fontawesome-webfont.woff2?v=4.6.3', headers],
			['GET', 'https://mizanstore.com/themes/book-store/fonts/icomoon.ttf?f2i8mo', headers],
		])

		for (const res of responses) {
			pageDuration.add(res.timings.duration)

			check(res, {
				'status 200': r => r.status === 200
			})
		}
	})
}