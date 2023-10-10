const soak_test_scenario ={
    executor: 'ramping-vus',
    stages: [
        {duration: '5m', target: 100},
        {duration: '10h', target: 100},
        {duration: '5m', target: 0},
    ]
}

export default soak_test_scenario