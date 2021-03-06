import { Response, Request, NextFunction } from "express"
import { NotAuthenticatedError } from "../error/not-authenticated-error"

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser) {
    next()
    return
  }

  throw new NotAuthenticatedError()
}
