const average_load_test_scenario ={
    executor: 'ramping-vus',
    stages: [
        {duration: '5m', target: 100},
        {duration: '20m', target: 100},
        {duration: '5m', target: 0},
    ]
}

export default average_load_test_scenario