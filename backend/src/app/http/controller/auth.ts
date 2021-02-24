import { randomBytes } from "crypto"

import { Request, Response } from "express"

const users: { id: string; username: string; password: string }[] = []

export const register = (req: Request, res: Response) => {
  const { username, password } = req.body

  const id = randomBytes(4).toString("hex")

  users.push({
    username,
    password,
    id
  })

  console.table(users)
  res.json({ message: "user Created!" })
}

export const list = (req: Request, res: Response) => {
  res.json(users)
}

export const modify = (req: Request, res: Response) => {
  const userId = req.params.id

  const existingUser = users.find(user => {
    return user.id === userId
  })

  if (!existingUser) throw new Error("user not found")

  const { username, password } = req.body

  existingUser.username = username
  existingUser.password = password
  res.json(existingUser)
}

export const deleteUser = (req: Request, res: Response) => {
  console.log("Deleting user")

  const userId = req.params.id
  console.log(userId)

  const index = users.findIndex(user => {
    return user.id === userId
  })

  if (index < 0) throw new Error("user not found")
  console.log("Found")

  users.splice(index, 1)
  console.log(users)

  res.json({ message: "User Deleted!" })
}
