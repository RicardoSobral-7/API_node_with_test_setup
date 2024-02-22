import { describe, it } from 'node:test'
import assert from 'node:assert'

describe('List tasks integration', () => {
  it('Should list all tasks', async () => {
    const response = await fetch(`http://localhost:3333/tasks`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
    assert.equal(response.status, 200)
  })
  it('Should list filter tasks', async () => {
    const response = await fetch(`http://localhost:3333/tasks?search=2`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
    assert.equal(response.status, 200)
  })
})