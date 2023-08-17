import http from "node:http"
import routes from "./routes/router.js"
import { json } from "./middlewares/json.js"
const PORT = 3333

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.path.test(url) && route.method === method
  })

  if (route) {
    req.params = { ...req.url.match(route.path).groups }
    try {
      return route.handler(req, res)
    } catch (ex) {
      if (ex instanceof Error)
        return res.writeHead(400).end(JSON.stringify({ message: ex.message }))
      else
        return res.writeHead(500).end()
    }

  }

  res.writeHead(404).end()
})



server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})