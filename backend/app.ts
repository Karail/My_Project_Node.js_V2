import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import viewMainRouter from './routes/main/viewMain'
import authRouter from './routes/auth'
import viewUserRouter from './routes/user/viewUser'
import actionUserRouter from './routes/user/actionUser'

const app = express()
app.use(helmet())
app.use(
    cors({
        origin: (_, cb) => cb(null, true),
        credentials: true,
        preflightContinue: true,
        exposedHeaders: [
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
            'X-Password-Expired',
        ],
        optionsSuccessStatus: 200,
    }),
);
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(viewMainRouter)
app.use(authRouter)
app.use(viewUserRouter)
app.use(actionUserRouter)
//
app.listen(8082, () => console.log('start worker'))


