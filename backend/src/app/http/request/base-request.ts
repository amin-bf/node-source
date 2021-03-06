import { requestValidation } from "../middleware/request-validation"

export abstract class BaseRequest {
  static rules(): any[] {
    return []
  }

  static getChain(): any[] {
    const validationSchema = this.rules()
    validationSchema.push(requestValidation)
    return validationSchema
  }
}
