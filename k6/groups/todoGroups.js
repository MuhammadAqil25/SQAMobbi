import { group } from "k6"
import generateHeaders from "../utils/generateHeaders.js"
import http from "k6/http"
import getAuthToken from "../utils/getAuthToken.js"

export default function todoGroups(token) {
    
    group('Todo DummyJson API', function() {
        http.get('https://dummyjson.com/auth/todos', generateHeaders(token))
        http.get('https://dummyjson.com/auth/todos/1', generateHeaders(token))
        http.get('https://dummyjson.com/auth/todos/random', generateHeaders(token))
        http.get('https://dummyjson.com/auth/todos?limit=3&skip=10', generateHeaders(token))
        http.get('https://dummyjson.com/auth/todos/user/5', generateHeaders(token))
        http.post('https://dummyjson.com/auth/todos/add', JSON.stringify({ todo: 'Use DummyJSON in the project', completed: false, userId: 5,}), generateHeaders(token))
        http.put('https://dummyjson.com/auth/todos/1', JSON.stringify({completed: false}), generateHeaders(token))
        http.del('https://dummyjson.com/auth/todos/1', generateHeaders(token))
    })
}