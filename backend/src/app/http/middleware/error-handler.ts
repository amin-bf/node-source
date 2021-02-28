import { Response, Request, NextFunction } from "express"

import { CustomError } from "../error/custom-error"

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() })
  }

  res.status(500).json({ message: "Something Went Wrong!" })
}
