
import { Request, CookieOptions } from 'express'

export type TokenBodyType = {
    id: number
}

export default interface IUserRequest extends Request {
    user?: any
}