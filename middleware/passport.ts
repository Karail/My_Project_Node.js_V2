


import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

function ExtractJwt(req: Request) {
    let token = null
    if (req.cookies && req.cookies.token) {
        token = req.cookies['token']
    }
    return token
}

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, (error, decryptToken, jwtError) => {
        if (jwtError || error) return res.status(400).send({ error: jwtError || error })
        req.user = decryptToken
        next()
    })(req, res, next)
}

export default {
    jwt: {
        jwtFromRequest: ExtractJwt,
        secretOrKey: 'secret',
    },
    expiresIn: '1 day',
}

