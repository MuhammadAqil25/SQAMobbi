const request = require("supertest")('https://gorest.co.in/public/v2');
const chai = require("chai");
const chaiJsonSchema = require('chai-json-schema')

chai.use(chaiJsonSchema)
const expect = chai.expect

const userSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        email: {type: 'string'},
        gender: {type: 'string'},
        status: {type: 'string'},
    },
    required: ['name', 'email', 'gender', 'status']
}

const usersSchema = {
    type: 'array',
    properties: {
        type: 'object',
        items: {
            name: {type: 'string'},
            email: {type: 'string'},
            gender: {type: 'string'},
            status: {type: 'string'},
        },
        required: ['name', 'email', 'gender', 'status']
    },
}

const token = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 64b8408bd891b7ce40fc0d1fb6a7791b1fd7fe02e74abe3f9d9875bcc9986fa7'
} 
// const token = '64b8408bd891b7ce40fc0d1fb6a7791b1fd7fe02e74abe3f9d9875bcc9986fa7'


describe('GoRest API Testing ', function(){  
    it('001_Get All GoRest Users', async function() {
        const res = await request.get('/users')
        expect(res.body).have.jsonSchema(usersSchema)
        expect(res.status).to.equal(200)
    }) 
    it('002_Get a Single GoRest Users', async function() {
        const userList = await request.get('/users')
        const selectedUser = userList.body[1].id
        const res = await request.get(`/users/${selectedUser}`)
        // console.log(res.body)
        expect(res.body).have.jsonSchema(userSchema)
    })
    it('003_Add New GoRest Users', async function() {
        const res = await request.post(`/users`).send({
            name: "Alexandre Christie",
            email: `alex_chris${Date.now()}@wolf.example`,
            gender: "Male",
            status: "active"
        }).set(token)
        // console.log(res.body)
        expect(res.body).have.jsonSchema(userSchema)
    })
    it('004_Update GoRest Users Details', async function() {
        const userList = await request.get('/users')
        const selectedUser = userList.body[1].id
        const res = await request.put(`/users/${selectedUser}`).send({
            name: "Clone",
            email: `Clone${Date.now()}@wolf.example`,
        }).set(token)
        // console.log(res.body)
        expect(res.body).have.jsonSchema(userSchema)
    })
    it('005_Delete GoRest Users', async function() {
        const userList = await request.get('/users')
        const selectedUser = userList.body[1].id
        const res = await request.del(`/users/${selectedUser}`).set(token)
        // console.log(res.body)
        expect(res.body).have.jsonSchema({})
    })
})

