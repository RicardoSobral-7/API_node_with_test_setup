import { randomUUID } from 'node:crypto'
import { buildRoutePath } from '../../utils/build-route-path.js'
import { Database } from '../../middlewares/database.js'

const database = new Database;

export const tasks = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handle: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? { title: search, description: search } : null);

      return res.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handle: (req, res) => {
      const { title, description } = req.body

      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }),
        )
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'description is required' })
        )
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handle: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title && !description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title or description are required' })
        )
      }

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end()
      }

      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date()
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handle: (req, res) => {
      const { id } = req.params

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res.writeHead(404).end()
      }

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handle: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id })

      if (!task) {
        res.writeHead(404).end()
      }

      const isTaskCompleted = !!task.completed_at;
      const completed_at = isTaskCompleted ? null : new Date();

      database.update('tasks', id, { completed_at });
      return res.writeHead(204).end()
    }
  }
]

//2024-02-20T21:43:39.034Z