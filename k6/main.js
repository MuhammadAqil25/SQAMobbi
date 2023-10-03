import http from "k6/http";
import { check } from 'k6'

export const options = {
	vus: 20,
	thresholds: {
		http_req_duration: ['avg<300', 'p(90)<250'],
		http_req_failed: ['rate<0.5'],
		iterations: ['count>400']
	},
    stages: [
		{ duration: '5s', target: 10 },
		{ duration: '5s', target: 20 },
		{ duration: '3s', target: 25 },
		{ duration: '5s', target: 0 },
	]
}

export default function () {
    const res = http.get('https://www.google.com/')

    check(res, {
		'responsenya harus 200': (r) => r.status === 200,
	})
}