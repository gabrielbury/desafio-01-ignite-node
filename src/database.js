import fs from "node:fs"

const databasePath = new URL('../db.json', import.meta.url);
export class Database {
  #database = {}

  constructor() {
    try {
      const file = fs.readFileSync(databasePath, 'utf8')
      this.#database = JSON.parse(file)
    }
    catch {
      this.#persist()
    }
  }

  #persist() {
    fs.writeFileSync(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    return this.#database[table] ?? []
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      console.log('VISH')
      this.#database[table] = [data]
    }

    this.#persist()
  }

  update(table, id, updatedData) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex >= 0) {
      const actualData = this.#database[table][rowIndex]
      this.#database[table][rowIndex] = { id, ...actualData, ...updatedData }
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex >= 0) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}