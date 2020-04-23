
import { Request, CookieOptions } from 'express'

export type TokenBodyType = {
    id: string,
    name: string
}

export default interface IUserRequest extends Request {
    user?: TokenBodyType
    cookie?: CookieOptions
}