import express, { Request, Response, NextFunction } from "express"

import routes from "./routes"
import { dbConnection } from "./util/database"
// let app = express()
const app = express()
app.use(express.json())

Object.values(routes).forEach(route => {
  app.use(route)
})

dbConnection()
  .then((outcome: boolean) => {
    app.listen(1366, () => {
      console.log("Server is running and listening on port 1366")
    })
  })
  .catch((outcome: boolean) => {})
