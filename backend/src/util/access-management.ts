import { NextFunction, Request, RequestHandler, Response } from "express"
import { NotAuthorizedError } from "../app/http/error/not-authorized-error"
import { IRoleDoc } from "../app/models/role"

export const authorize = (permissionName: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { roles } = req.currentUser!

    const allowed = checkAuthorization(permissionName, roles)

    if (allowed) {
      next()
    } else {
      throw new NotAuthorizedError()
    }
  }
}

const parsePermissionName = (
  permissionName: string
): { permissionType: string; permissionAccessArray: string[] } => {
  const permissionType = permissionName.split(":")[0]
  const permissionAccessArray = permissionName.split(":")[1].split(",")
  return { permissionType, permissionAccessArray }
}

const checkAuthorization = (
  permissionName: string,
  roles: any[] | undefined
): boolean => {
  const { permissionType, permissionAccessArray } = parsePermissionName(
    permissionName
  )
  let allowed = false

  if (roles && roles.length)
    roles.forEach(role => {
      switch (permissionType) {
        case "role":
          permissionAccessArray.forEach(accessType => {
            if (accessType === role.name) allowed = true
          })
          break
        case "permission":
          allowed = cehckPermission(role, permissionAccessArray)
          break
      }
    })

  return allowed
}

const cehckPermission = (role: IRoleDoc, permissionAccessArray: string[]) => {
  const intersection = role.permissions.filter((rolePermission: string) =>
    permissionAccessArray.includes(rolePermission)
  )
  return !!intersection.length
}
