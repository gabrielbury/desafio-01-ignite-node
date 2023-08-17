import { TaskService } from "../services/taskService.js"

const service = new TaskService()

export class TaskController {

  handleCreate(req, res) {

    this.#validateMinimumPayload(req)
    const { title, description } = req.body

    service.create(title, description)

    res.writeHead(201).end()
  }

  handleList(req, res) {
    res.end(JSON.stringify(service.list()))
  }

  handleUpdate(req, res) {
    this.#validateMinimumPayload(req)
    const { id } = req.params
    const { title, description } = req.body

    service.update(id, title, description)

    res.writeHead(204).end()
  }

  handleCompleteTask(req, res) {
    const { id } = req.params
    service.completeTask(id)
    res.writeHead(204).end()
  }

  handleDelete(req, res) {
    const { id } = req.params

    service.delete(id)

    res.writeHead(204).end()
  }

  #validateMinimumPayload(req) {
    const { title, description } = req.body
    if (!(title && description)) {
      throw new Error('Preencha corretamente os campos title e description')
    }
  }
}