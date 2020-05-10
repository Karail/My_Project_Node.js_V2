


import { Request, Response, NextFunction } from 'express';
import { JWTconf } from '../../config/conf';
import jwt from 'jsonwebtoken';
import IUserRequest from '../interface/IUserRequest';

function ExtractJwt(req: Request) {
    let token = null
    if (req.cookies && req.cookies.token) {
        token = req.cookies['token']
    }
    return token
}

export function checkAuth(req: IUserRequest, res: Response, next: NextFunction) {

    const token = ExtractJwt(req);

    jwt.verify(token, JWTconf.secretOrKey, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({ error: err });
        }
        req.user = decoded;
        next();
    });
}


