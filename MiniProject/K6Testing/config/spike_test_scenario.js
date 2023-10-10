const spike_test_scenario ={
    executor: 'ramping-vus',
    stages: [
        {duration: '2m', target: 2000},
        {duration: '1m', target: 0},
    ]
}

export default spike_test_scenario