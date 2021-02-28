import { ValidationError } from "express-validator"

import { CustomError } from "./custom-error"

export class RequestValidationError extends CustomError {
  statusCode: number = 422

  constructor(public errors: ValidationError[]) {
    super("Bad User Input")

    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  public serializeErrors(): { message: string; field?: string | undefined }[] {
    const formattedErrors = this.errors.map(error => {
      return {
        message: error.msg,
        field: error.param
      }
    })

    return formattedErrors
  }
}
