import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Password } from "../../../util/password"
import { validationResult } from "express-validator"

import { User } from "../../models/user"
import { NotFoundError } from "../error/not-found-error"
import { RequestValidationError } from "../error/request-validation-error"

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  console.log(typeof errors.array()[0])

  const { username, password } = req.body

  const user = User.build({
    username,
    password
  })

  await user.save()

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    "hjfgHGyu^75(*hJghjhFGfjgf"
  )

  req.session!.jwt = token

  res.json({ message: "user Created!" })
}

export const list = async (req: Request, res: Response) => {
  const users = await User.find()
  res.status(201).json(users)
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body

  const existingUser = await User.findOne({
    username
  })

  if (!existingUser) {
    throw new Error("Invalid Credentials")
  }

  const passwordMatched = Password.compare(existingUser.password, password)

  if (!passwordMatched) {
    throw new Error("Invalid Credentials")
  }

  const token = jwt.sign(
    {
      id: existingUser.id,
      username: existingUser.username
    },
    "hjfgHGyu^75(*hJghjhFGfjgf"
  )

  req.session!.jwt = token

  res.json({ message: "signed in" })
}

export const modify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id

  const existingUser = await User.findById(userId)

  if (!existingUser) {
    throw new NotFoundError()
  }

  const { username, password } = req.body

  existingUser.set("username", username)
  if (password) existingUser.set("password", password)

  await existingUser.save()

  res.status(204).json(existingUser)
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id

  const existingUser = await User.findById(userId)

  if (!existingUser) {
    throw new NotFoundError()
  }
  console.log("Found")

  await existingUser.delete()

  res.status(204).json({ message: "User Deleted!" })
}

export const currentUser = (req: Request, res: Response) => {
  const user = req.currentUser

  res.json({ currentUser: user || null })
}
