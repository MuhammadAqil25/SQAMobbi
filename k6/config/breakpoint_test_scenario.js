const stagesArr = [{ duration: "10s", target: 20 },]

let targetVus = 0
for(let i = 2; i <= 145; i++){
    targetVus = targetVus + 20
    let stage = { duration: "50s", target: targetVus }
    stagesArr.push(stage)
}

const breakpoint_test_scenario ={
    executor: 'ramping-vus',
    stages: stagesArr
    // stages: [
    //     { duration: "10s", target: 20 },
    //     { duration: "50s", target: 20 },
    //     { duration: "50s", target: 40 },
    //     { duration: "50s", target: 60 },
    //     { duration: "50s", target: 80 },
    //     { duration: "50s", target: 100 },
    //     { duration: "50s", target: 120 },
    //     { duration: "50s", target: 140 },
    //     { duration: "50s", target: 160 },
    // ]
}

export default breakpoint_test_scenario