import mongoose from "mongoose"

interface IRoleAttrs {
  name: string
  permissions: []
}

export interface IRoleDoc extends mongoose.Document {
  name: string
  permissions: []
}

interface IRoleModel extends mongoose.Model<IRoleDoc> {}

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    permissions: {
      type: Array,
      required: true,
      default: []
    }
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    }
  }
)

export const Role = mongoose.model<IRoleDoc, IRoleModel>("Role", roleSchema)
