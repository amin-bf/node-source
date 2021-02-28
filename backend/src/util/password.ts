import { randomBytes, scrypt } from "crypto"
import { promisify } from "util"

const scryptAsync = promisify(scrypt)

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString("hex")

    const hashedPasswordBuffer = (await scryptAsync(
      password,
      salt,
      64
    )) as Buffer

    return `${hashedPasswordBuffer.toString("hex")}.${salt}`
  }

  static async compare(
    storedPassword: string,
    providedPassword: string
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".")

    const hashedPasswordBuffer = (await scryptAsync(
      providedPassword,
      salt,
      64
    )) as Buffer

    return hashedPasswordBuffer.toString("hex") === hashedPassword
  }
}
