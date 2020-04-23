import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

import passport from 'passport'
import { Strategy } from 'passport-jwt'
import confJWT from './middleware/passport'

import viewMainRouter from './routes/main/viewMain'
import authRouter from './routes/auth'
import viewUserRouter from './routes/user/viewUser'
import actionUserRouter from './routes/user/actionUser'

const app = express()
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

passport.use(new Strategy(confJWT.jwt, function (jwt_payload, done) {
    if (jwt_payload) return done(false, jwt_payload)
    done(false, false)
}))
app.use(viewMainRouter)
app.use(authRouter)
app.use(viewUserRouter)
app.use(actionUserRouter)

app.listen(8080, () => console.log('start worker'))


