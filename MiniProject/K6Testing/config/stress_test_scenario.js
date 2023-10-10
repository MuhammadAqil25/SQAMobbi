const stress_test_scenario ={
    executor: 'ramping-vus',
    stages: [
        {duration: '10m', target: 200},
        {duration: '30m', target: 200},
        {duration: '5m', target: 0},
    ]
}

export default stress_test_scenario