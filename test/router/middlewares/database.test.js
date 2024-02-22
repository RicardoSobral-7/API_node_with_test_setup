import { describe, it } from 'node:test'
import assert from 'node:assert'
import { randomUUID } from 'node:crypto'
import { Database } from '../../../src/middlewares/database.js'

const database = new Database


describe('Create Task Unit', () => {
  it('Should create one task', () => {

    const data = {
      id: randomUUID(),
      title: "Teste de criação unit",
      description: "Descrição de teste criação",
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    database.insert('tasks', data)
  })
});


describe('List Task Unit', () => {
  it('Should list tasks', async () => {
    const result = await database.select('tasks')
    assert.equal(result[result.length - 1].title, 'Teste de criação unit')
  })
  it('Should list tasks', async () => {
    const search = 'Teste de criação unit'
    const result = await database.select('tasks', { title: search, description: search })

    assert.equal(result[result.length - 1].title, 'Teste de criação unit')
  })
})

describe('Update Task Unit', () => {
  const taskId = "60cb92b1-94d3-4bf2-aeec-66be5ffd2238"
  const search = 'Teste de criação unit'
  
  it('Should update title of task', async () => {
    const getData = await database.select('tasks', { title: search, description: search })
    const title = 'Update title unit update'

    const updateTask = await database.update('tasks', taskId, {
      title,
      description: getData[getData.length - 1].description,
      updated_at: new Date()
    })

    assert.equal(updateTask.title, title)
  })

  it('Should update description of tasks', async () => {
    const description = 'Update description unit update'

    const updateTask = await database.update('tasks', taskId, {
      title: search,
      description: description,
      updated_at: new Date()
    })

    assert.equal(updateTask.description, description)
  })
})

describe('Delete Task Unit', () => {
  it('Should delete task', async () => {
    const getData = await database.select('tasks')

    const deletedTask = await database.delete('tasks', getData[getData.length - 1].id)

    assert.equal(deletedTask, 'ok')
  })

})