const request = require("supertest")('https://gorest.co.in/public/v2');
const chai = require("chai");
const chaiJsonSchema = require('chai-json-schema')

chai.use(chaiJsonSchema)
const expect = chai.expect

const todoSchema = {
    type: 'object',
    properties: {
        user_id: {type: 'number'},
        title: {type: 'string'},
        due_on: {type: 'string'},
        status: {type: 'string'},
    },
    required: ['user_id', 'title', 'due_on', 'status']
}

const todosSchema = {
    type: 'array',
    properties: {
        type: 'object',
        items: {
            user_id: {type: 'number'},
            title: {type: 'string'},
            due_on: {type: 'string'},
            status: {type: 'string'},
        },
        required: ['user_id', 'title', 'due_on', 'status']
    },
}

const token = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 64b8408bd891b7ce40fc0d1fb6a7791b1fd7fe02e74abe3f9d9875bcc9986fa7'
} 


describe('GoRest API Todos Testing ', function(){  
    it('001_Get All GoRest Todos', async function() {
        const res = await request.get('/todos')
        expect(res.body).have.jsonSchema(todosSchema)
        expect(res.status).to.equal(200)
    }) 
    it('002_Get a Single GoRest Todo', async function() {
        const todoList = await request.get('/todos')
        const selectedTodo = todoList.body[1].id
        const res = await request.get(`/todos/${selectedTodo}`)
        expect(res.status).to.equal(200)
        expect(res.body).have.jsonSchema(todoSchema)
    })
    it('003_Add New GoRest Todos', async function() {
        const todoList = await request.get('/todos')
        const selectedTodo = todoList.body[6].user_id
        const res = await request.post(`/todos`).send({
            user_id: selectedTodo,
            title: `Berpetualang Bersama Anonim ${Date.now()}`,
            due_on: `2023-10-14T00:00:00.000+05:30`,
            status: 'completed'
        }).set(token)
        expect(res.status).to.equal(201)
    })
    it('004_Update GoRest Todos Details', async function() {
        const todoList = await request.get('/todos')
        const selectedTodo = todoList.body[1].id
        const res = await request.put(`/todos/${selectedTodo}`).send({
            title: `Petualangan di kerajaan ${Date.now()}`,
            due_on: `2025-10-14T00:00:00.000+05:30`,
        }).set(token)
        expect(res.status).to.equal(200)
        expect(res.body).have.jsonSchema(todoSchema)
    })
    it('005_Delete GoRest Todos', async function() {
        const todoList = await request.get('/todos')
        const selectedTodo = todoList.body[1].id
        const res = await request.delete(`/todos/${selectedTodo}`).set(token)
        expect(res.status).to.equal(204)
        expect(res.body).have.jsonSchema({})
    })
})

