import { BaseRequest } from "../base-request"
import { body, param, query, checkSchema } from "express-validator"

export class RegisterRequest extends BaseRequest {
  static rules(): any[] {
    const validationSchema = [
      checkSchema({
        username: {
          trim: true,
          isEmpty: {
            bail: true,
            errorMessage: "Username field in compulsory!",
            options: {
              ignore_whitespace: true
            },
            negated: true
          },
          isEmail: {
            errorMessage: "Invalid email!"
          }
        },
        password: {
          trim: true,
          isEmpty: {
            bail: true,
            errorMessage: "Password field in compulsory!",
            options: {
              ignore_whitespace: true
            },
            negated: true
          }
        }
      })
    ]

    return validationSchema
  }
}
