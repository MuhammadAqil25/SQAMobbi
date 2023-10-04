import http from 'k6/http'
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { group } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

const myCounter = new Counter('my_counter')
const completedRate = new Rate('completed_rate')
const googleAllDuration = new Trend('google_all_duration')
const sauceAllDuration = new Trend('sauce_all_duration')

export const options = {
	vus: 15,
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

export default function() {
    group('Testing SauceDemo', function() {
        const res = http.get('https://www.saucedemo.com/', {
            tags: {
                my_tag: "i'm a tag"
            }
        })
        // completedRate.add(res)
        sauceAllDuration.add(res.timings.duration)
        myCounter.add(10)
        expect(res.status, 'statusnya').to.equal(200)
    })

    describe('Testing Google', function() {
        const res = http.get('https://www.google.com/', {
            tags: {
                my_tag: "i'm a tag"
            }
        })
        // completedRate.add(res)
        googleAllDuration.add(res.timings.duration)
        myCounter.add(5)
        expect(res.status, 'statusnya').to.equal(200)
    })
}