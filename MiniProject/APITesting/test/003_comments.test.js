const request = require("supertest")('https://gorest.co.in/public/v2');
const chai = require("chai");
const chaiJsonSchema = require('chai-json-schema')

chai.use(chaiJsonSchema)
const expect = chai.expect

const commentSchema = {
    type: 'object',
    properties: {
        post_id: {type: 'number'},
        name: {type: 'string'},
        email: {type: 'string'},
        body: {type: 'string'}
    },
    required: ['post_id', 'name', 'email', 'body']
}

const commentsSchema = {
    type: 'array',
    properties: {
        type: 'object',
        items: {
            post_id: {type: 'number'},
            name: {type: 'string'},
            email: {type: 'string'},
            body: {type: 'string'}
        },
        required: ['post_id', 'name', 'email', 'body']
    },
}

const token = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 64b8408bd891b7ce40fc0d1fb6a7791b1fd7fe02e74abe3f9d9875bcc9986fa7'
} 


describe('GoRest API Comments Testing ', function(){  
    it('001_Get All GoRest Comments', async function() {
        const res = await request.get('/comments')
        expect(res.body).have.jsonSchema(commentsSchema)
        expect(res.status).to.equal(200)
    }) 
    it('002_Get a Single GoRest Comment', async function() {
        const commentList = await request.get('/comments')
        const selectedPost = commentList.body[1].id
        const res = await request.get(`/comments/${selectedPost}`)
        expect(res.status).to.equal(200)
        expect(res.body).have.jsonSchema(commentSchema)
    })
    it('003_Add New GoRest Comments', async function() {
        const commentList = await request.get('/comments')
        const selectedPost = commentList.body[2].post_id
        const res = await request.post(`/comments`).send({
            post_id: selectedPost,
            name: `Break Ward ${Date.now()}`,
            email: `Clone${Date.now()}@wolf.example`,
            body: `blackbeard whitebeard brown beard ${Date.now()}`
        }).set(token)
        expect(res.status).to.equal(201)
    })
    it('004_Update GoRest Comments Details', async function() {
        const commentList = await request.get('/comments')
        const selectedPost = commentList.body[1].id
        const res = await request.put(`/comments/${selectedPost}`).send({
            email: `Petualangan${Date.now()}@mail.example`,
            body: `lorem lorem lorem ${Date.now()} eberpetualang`,
        }).set(token)
        expect(res.status).to.equal(200)
        expect(res.body).have.jsonSchema(commentSchema)
    })
    it('005_Delete GoRest Comments', async function() {
        const commentList = await request.get('/comments')
        const selectedPost = commentList.body[2].id
        const res = await request.del(`/comments/${selectedPost}`).set(token)
        expect(res.status).to.equal(204)
        expect(res.body).have.jsonSchema({})
    })
})

