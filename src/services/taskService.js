import { Database } from "../database.js"
import crypto from "node:crypto"

export class TaskService {

  #database

  constructor() {
    this.#database = new Database()
  }

  create(title, description) {
    this.#database.insert('tasks', {
      id: crypto.randomUUID(),
      title,
      description,
      created_at: new Date(),
      completed_at: null,
      updated_at: null
    })
  }

  list() {
    return this.#database.select('tasks')
  }

  update(id, title, description) {
    this.#database.update('tasks', id, {
      title,
      description,
      updated_at: new Date()
    })
  }

  completeTask(id) {
    this.#database.update('tasks', id, {
      completed_at: new Date(),
      updated_at: new Date()
    })
  }

  delete(id) {
    this.#database.delete('tasks', id)
  }
}