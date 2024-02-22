import { describe, it } from 'node:test'
import assert from 'node:assert'
import { Database } from '../../../src/middlewares/database.js'
const database = new Database

describe('Update tasks integration', () => {
  const taskId = '60cb92b1-94d3-4bf2-aeec-66be5ffd2238'
  it('Should update task widout title', async () => {

    const data = {
      description: "teste descrição update 1"
    }
    const response = await fetch(`http://localhost:3333/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    assert.deepEqual(response.status, 204)
  })

  it('Should update task witout description', async () => {

    const data = {
      title: "teste titulo update 2"
    }
    const response = await fetch(`http://localhost:3333/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    assert.deepEqual(response.status, 204)
  })

  it('Should not update without body', async () => {

    const data = {
    }
    const response = await fetch(`http://localhost:3333/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    assert.deepEqual(response.status, 400)
  })

  it('Should not update without id', async () => {

    const data = {
      title: "Teste de criação update 2",
      description: "teste descrição update 2"
    }

    const response = await fetch(`http://localhost:3333/tasks/`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    assert.deepEqual(response.status, 404)
  })

  it('Should not update with invalid id', async () => {

    const data = {
      title: "Teste de criação update 2",
      description: "teste descrição update 2"
    }

    const response = await fetch(`http://localhost:3333/tasks/bifd-shias-dfgibs`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    assert.deepEqual(response.status, 404)
  })

  it('Should update task', async () => {
    
    const data = {
      title: "Teste de criação update 3",
      description: "teste descrição update 3"
    }
    const response = await fetch(`http://localhost:3333/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    assert.deepEqual(response.status, 204)
  })
})