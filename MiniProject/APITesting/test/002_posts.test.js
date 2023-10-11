const request = require("supertest")('https://gorest.co.in/public/v2');
const chai = require("chai");
const chaiJsonSchema = require('chai-json-schema')

chai.use(chaiJsonSchema)
const expect = chai.expect

const postSchema = {
    type: 'object',
    properties: {
        user_id: {type: 'number'},
        title: {type: 'string'},
        body: {type: 'string'},
    },
    required: ['user_id', 'title', 'body']
}

const postsSchema = {
    type: 'array',
    properties: {
        type: 'object',
        items: {
            user_id: {type: 'number'},
            title: {type: 'string'},
            body: {type: 'string'},
        },
        required: ['user_id', 'title', 'body']
    },
}

const token = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 64b8408bd891b7ce40fc0d1fb6a7791b1fd7fe02e74abe3f9d9875bcc9986fa7'
} 


describe('GoRest API posts Testing ', function(){  
    it('001_Get All GoRest posts', async function() {
        const res = await request.get('/posts')
        expect(res.body).have.jsonSchema(postsSchema)
        expect(res.status).to.equal(200)
    }) 
    it('002_Get a Single GoRest post', async function() {
        const postList = await request.get('/posts')
        const selectedUser = postList.body[1].id
        const res = await request.get(`/posts/${selectedUser}`)
        expect(res.status).to.equal(200)
        expect(res.body).have.jsonSchema(postSchema)
    })
    it('003_Add New GoRest posts', async function() {
        const postList = await request.get('/posts')
        const selectedPost = postList.body[6].user_id
        const res = await request.post(`/posts`).send({
            user_id: selectedPost,
            title: `Berpetualang Bersama Anonim ${Date.now()}`,
            body: `petualangaawdasdan berjalaawdawdasn swadasdawelama disini aku tidak bisa ada kemari awdasfwafa ${Date.now()}`,
        }).set(token)
        expect(res.status).to.equal(201)
    })
    it('004_Update GoRest posts Details', async function() {
        const postList = await request.get('/posts')
        const selectedPost = postList.body[1].id
        const res = await request.put(`/posts/${selectedPost}`).send({
            title: `Petualangan ${Date.now()}`,
            body: `lorem lorem lorem ${Date.now()} eberpetualang`,
        }).set(token)
        expect(res.status).to.equal(200)
        expect(res.body).have.jsonSchema(postSchema)
    })
    it('005_Delete GoRest posts', async function() {
        const postList = await request.get('/posts')
        const selectedPost = postList.body[1].id
        const res = await request.delete(`/posts/${selectedPost}`).set(token)
        expect(res.status).to.equal(204)
        expect(res.body).have.jsonSchema({})
    })
})

