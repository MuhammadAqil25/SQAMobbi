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

// const token = {
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer 64b8408bd891b7ce40fc0d1fb6a7791b1fd7fe02e74abe3f9d9875bcc9986fa7'
// 	}
// } 
// const token = '64b8408bd891b7ce40fc0d1fb6a7791b1fd7fe02e74abe3f9d9875bcc9986fa7'


describe('GoRest API Testing ', function(){
    it('001_Get All GoRest Users', async function() {
        const res = await request.get('/users')
        expect(res.body).have.jsonSchema(usersSchema)
    })
    it('002_Get a Single GoRest Users', async function() {
        const res = await request.get('/users/5296989')
        // console.log(res.body)
        expect(res.body).have.jsonSchema(userSchema)
    })
    // it('003_Add New GoRest Users', async function() {
    //     const res = await request.post(`/users?access-token=${token}`).send({
    //         name: "Alexandre Christie",
    //         email: "alex_chris2@wolf.example",
    //         gender: "Male",
    //         status: "active"
    //     })
    //     console.log(res.body)
    //     // expect(res.body).have.jsonSchema(userSchema)
    // })
    // it('004_Update GoRest Users Details', async function() {
    //     const res = await request.put(`/users?access-token=${token}/5296999`).send({
    //         name: "Clone",
    //         email: "Clone@wolf.example",
    //     })
    //     console.log(res.body)
    //     // expect(res.body).have.jsonSchema(userSchema)
    // })
    // it('005_Delete GoRest Users', async function() {
    //     const res = await request.delete(`/users?access-token=${token}/5296999`)
    //     console.log(res.body)
    //     // expect(res.body).have.jsonSchema(userSchema)
    // })
})

