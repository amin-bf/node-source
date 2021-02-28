import { NextFunction, Request, Response } from "express"

import { User } from "../../models/user"

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body

  const user = User.build({
    username,
    password
  })

  await user.save()

  console.log(user)
  res.json({ message: "user Created!" })
}

export const list = async (req: Request, res: Response) => {
  const users = await User.find()
  res.json(users)
}

export const modify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id

  const existingUser = await User.findById(userId)

  if (!existingUser) {
    const error = new Error("user not found")
    next(error)
    return
  }

  const { username, password } = req.body

  existingUser.set("username", username)
  existingUser.set("password", password)

  await existingUser.save()

  res.json(existingUser)
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id

  const existingUser = await User.findById(userId)

  if (!existingUser) {
    const error = new Error("user not found")
    next(error)
    return
  }
  console.log("Found")

  await existingUser.delete()

  res.json({ message: "User Deleted!" })
}
