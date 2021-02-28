import { CustomError } from "./custom-error"

export class NotFoundError extends CustomError {
  statusCode: number = 404

  constructor() {
    super("Item Not Found!")

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Item Not Found!" }]
  }
}
