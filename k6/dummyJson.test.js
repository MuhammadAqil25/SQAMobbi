import http from "k6/http";
import thresholds from './config/thresholds.js'
import smoke_test_scenario from "./config/smoke_test_scenario.js";
import average_load_test_scenario from "./config/average_load_test_scenario.js";
import stress_test_scenario from "./config/stress_test_scenario.js"
import soak_test_scenario from "./config/soak_test_scenario.js"
import spike_test_scenario from "./config/spike_test_scenario.js"
import breakpoint_test_scenario from "./config/breakpoint_test_scenario.js"
import getAuthToken from "./utils/getAuthToken.js";
import todoGroups from "./groups/todoGroups.js";
import productsGroups from "./groups/productsGroups.js";
import { sleep } from "k6";

const scenarioList = {
    smoke: smoke_test_scenario,
    average: average_load_test_scenario,
    stress: stress_test_scenario,
    soak: soak_test_scenario,
    spike: spike_test_scenario,
    breakpoint: breakpoint_test_scenario,
}

export const options = {
    thresholds,
    scenarios: {
        currentScenario: scenarioList[__ENV.SCENARIO] || smoke_test_scenario
    }
}

export function setup() {
    return getAuthToken()
}

export default function(token) {
    productsGroups(token)
    todoGroups(token)
    sleep(1)
}