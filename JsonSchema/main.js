const request = require('supertest')('https://dummyjson.com')
const chai = require('chai')
const chaiJsonSchema = require('chai-json-schema')

chai.use(chaiJsonSchema)
const expect = chai.expect

const todoSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        todo: { type: 'string' },
        completed: { type: 'boolean' },
        userId: { type: 'number' },
    },
    required: ['id', 'todo', 'completed', 'userId']
}

const todosSchema = {
    type: 'object',
    properties: {
        todos: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    todo: { type: 'string' },
                    userId: { type: 'number' },
                    completed: { type: 'boolean' },
                },
                require: ['id', 'todo', 'completed', 'userId']
            }
        }
    }
}

describe('Dummy JSON', function() {
    it('001_Test Dummy Json Get All Todos', async function () {
        const res = await request.get('/todos')
        expect(res.body).have.jsonSchema(todosSchema)
    })
    
    it('002_Test Dummy Json Get A Singel Todo', async function () {   
        const res = await request.get('/todos/1')
        expect(res.body).have.jsonSchema(todoSchema)
    })

    it('003_Test Dummy Json Get A Random Todo', async function () {   
        const res = await request.get('/todos/random')
        expect(res.body).have.jsonSchema(todoSchema)
    })

    it('004_Test Dummy Json Limit And Skip Todos', async function () {   
        const res = await request.get('/todos?limit=3&skip=10')
        expect(res.body).have.jsonSchema(todosSchema)
    })

    it('005_Test Dummy Json Get All Todos By User ID', async function () {   
        const res = await request.get('/todos/user/5')
        expect(res.body).have.jsonSchema(todosSchema)
    })

    it('006_Test Dummy Json Add New Todo', async function () {   
        const res = await request.post('/todos/add').send({
            todo: 'Use DummyJSON in the project',
            completed: false,
            userId: 5
        })
        expect(res.body).have.jsonSchema(todoSchema)
    })
    // Belum Sesuai 007 - 008
    it('007_Test Dummy Json Update A Todo', async function () {   
        const res = await request.get('/todos/1').set('completed', false)
        expect(res.body).have.jsonSchema(todoSchema)
        // console.log(res.body)
    })

    it('008_Test Dummy Json Delete A Todo', async function () {   
        const res = await request.get('/todos/1', {
            method: 'DELETE',
          })
        expect(res.body).have.jsonSchema(todoSchema)
        // console.log(res.body)
    })
})