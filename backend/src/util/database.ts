import mongoose from "mongoose"

export const dbConnection = async (): Promise<boolean> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    console.log("Connected to mongoDB")
    return true
  } catch (error) {
    return false
  }
}
