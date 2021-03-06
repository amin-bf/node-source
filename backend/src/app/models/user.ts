import mongoose from "mongoose"

import { Password } from "../../util/password"
import { IRoleDoc } from "./role"

interface IUserAttrs {
  username: string
  password: string
  roles?: string[]
}

interface IUserDoc extends mongoose.Document {
  username: string
  password: string
  roles: IRoleDoc[]
}

interface IUserModel extends mongoose.Model<IUserDoc> {
  build(userAttrs: IUserAttrs): IUserDoc
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    roles: [{ type: mongoose.Types.ObjectId, ref: "Role" }]
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        delete ret.password
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    }
  }
)

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"))
    this.set("password", hashedPassword)
  }
  done()
})

userSchema.statics.build = (userAttrs: IUserAttrs): IUserDoc => {
  return new User(userAttrs)
}

export const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema)
