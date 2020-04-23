


import { Request, Response, NextFunction } from 'express'
const { JWTconf } = require('../config/conf.js')
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

interface IUserRequest extends Request {
    user?: any
    cookie?: any
}

function ExtractJwt(req: Request) {
    let token = null
    if (req.cookies && req.cookies.token) {
        token = req.cookies['token']
    }
    return token
}

export function checkAuth(req: IUserRequest, res: Response, next: NextFunction) {

    const token = ExtractJwt(req)

    jwt.verify(token, JWTconf.secretOrKey, (error: any, decoded: any) => {
        if (error) {
            return res.status(400).send({ error })
        }
        req.user = decoded
        next()
    })
}


