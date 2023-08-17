import { parse } from "csv-parse"
import { TaskService } from "../services/taskService.js"
import fs from "node:fs"

const csvPath = new URL('../csv/tasks.csv', import.meta.url)

const csvConfig = parse({
  skip_empty_lines: true,
  fromLine: 2
})

export class BulkTasks {
  #stream
  #taskService

  constructor() {
    this.#taskService = new TaskService()
    this.#stream = fs.createReadStream(csvPath)
  }

  async importTasksFromCSV() {
    const csvLines = this.#stream.pipe(csvConfig)

    for await (const line of csvLines) {
      const [title, description] = line
      this.#taskService.create(title, description)
    }
  }
}

new BulkTasks().importTasksFromCSV().then(() => console.log('CSV import completed'))