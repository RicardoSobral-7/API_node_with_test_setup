import { describe, it } from 'node:test'
import assert from 'node:assert'

describe('Create tasks integration', () => {
  it('Should not create task witout title', async () => {
    const data = {
      description: "teste descrição"
    }
    const response = await fetch('http://localhost:3333/tasks', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    assert.deepEqual(response.status, 400)
  })

  it('Should not create task witout description', async () => {
    const data = {
      title: "teste descrição"
    }
    const response = await fetch('http://localhost:3333/tasks', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    assert.deepEqual(response.status, 400)
  })

  it('Should create task', async () => {
    const data = {
      title: "Teste de criação",
      description: "teste descrição"
    }
    const response = await fetch('http://localhost:3333/tasks', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    assert.deepEqual(response.status, 201)
  })
})