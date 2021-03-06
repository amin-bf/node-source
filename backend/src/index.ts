import express, { Request, Response, NextFunction } from "express"
import "express-async-errors"
import cookieSession from "cookie-session"

import routes from "./routes"
import { dbConnection } from "./util/database"
import { currentUser } from "./app/http/middleware/current-user"
import { errorHandler } from "./app/http/middleware/error-handler"

import "./app/models/role"

const app = express()
app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    secure: false,
    name: "35v67X"
  })
)
app.use(currentUser)

Object.values(routes).forEach(route => {
  app.use(route)
})

app.use(errorHandler)

dbConnection()
  .then((outcome: boolean) => {
    app.listen(1366, () => {
      console.log("Server is running and listening on port 1366")
    })
  })
  .catch((outcome: boolean) => {})
