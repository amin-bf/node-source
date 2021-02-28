import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface IUserPayload {
  id: string
  username: string
  iat: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.session!.jwt

  try {
    const payload = jwt.verify(
      token,
      "hjfgHGyu^75(*hJghjhFGfjgf"
    ) as IUserPayload

    req.currentUser = payload
  } catch (err) {}

  next()
}
