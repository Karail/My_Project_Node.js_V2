
import { Request, Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

import Sequelize from 'sequelize'
const Op = Sequelize.Op;

import { Subscriber } from '../models/control';

import { JWTconf } from '../../config/conf';

import resetEmail from '../email/resetPassword'
import transporter from '../email';

import { TokenBodyType } from '../interface/IUserRequest';
import Bind from '../decorators/Bind';

class AuthController {

    private createToken(body: TokenBodyType) {
        return jsonwebtoken.sign(
            body,
            JWTconf.secretOrKey,
            { expiresIn: JWTconf.expiresIn }
        )
    }

    @Bind
    async register(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body

            console.log(req.body);


            if (!name || !password || !email) return res.status(400).send({ message: 'Не корректные данные' })

            const userEmail = await Subscriber.findOne({ where: { email } })
            const username = await Subscriber.findOne({ where: { name } })

            if (userEmail || username) return res.status(400).send({ message: "Пользователь уже зарегестрирован" })

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await Subscriber.create({
                email,
                name,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            const token = this.createToken({ id: user.id })

            res.cookie("token", token, {
                httpOnly: true
            });

            res.json({
                token,
            })

        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }


    @Bind
    async login(req: Request, res: Response) {
        try {

            const { email, password } = req.body

            if (!email || !password) return res.status(400).send({ message: 'Не корректные данные' })

            const user = await Subscriber.findOne({ where: { email } })

            if (!user) return res.status(400).json({ message: 'Пользователь не найден' })

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' })

            const token = this.createToken({ id: user.id })

            res.cookie("token", token, {
                httpOnly: true
            });

            res.json({
                token,
            })

        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }
    async updatePassword(req: Request, res: Response) {
        try {

            const { email } = req.body

            crypto.randomBytes(32, async (err, buffer) => {

                if (err) throw err

                const token = buffer.toString('hex')

                const candidate = await Subscriber.findOne({
                    where: {
                        email,
                    },
                })

                if (candidate) {

                    await Subscriber.update({
                        resetToken: token,
                        resetTokenExp: Date.now() + 60 * 60 * 1000 * 5,
                    }, {
                        where: {
                            email,
                        }
                    })

                    await transporter.sendMail(resetEmail(email, token))

                    res.json({
                        status: 1,
                        message: 'Письмо отправленно на почту ' + email
                    })

                } else {
                    res.json({
                        status: 0,
                        message: 'такого email нет',
                    })
                }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                status: 0,
                message: 'Что то пошло не так',
            })
        }
    }
    async newPassword(req: Request, res: Response) {
        try {

            const user = await Subscriber.findOne({
                where: {
                    resetToken: req.params.token,
                    resetTokenExp: { [Op.gt]: Date.now() }
                }
            })

            console.log(user)

            if (!user)
                return res.json({
                    status: 0
                })

            res.json({
                status: 1
            })


        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }
    async resetPassword(req: Request, res: Response) {
        try {

            if (req.body.pass !== req.body.rpass) {
                return res.json({
                    status: 0,
                    message: 'Пароли не совпадают',
                })
            }

            console.log(req.body.pass)

            const user = await Subscriber.findOne({
                where: {
                    resetToken: req.body.token,
                    resetTokenExp: { [Op.gt]: Date.now() }
                }
            })

            if (!user)
                return res.json({
                    status: 0,
                    message: 'Пользователь не найден',
                })

            const newPass = await bcrypt.hash(req.body.pass, 12)
            console.log(newPass)
            await Subscriber.update({
                password: newPass,
                resetToken: undefined,
                resetTokenExp: undefined,
            }, {
                where: {
                    id: user.id,
                    resetToken: user.resetToken
                }
            })

            res.json({
                status: 1,
                message: 'Пароль изменен'
            })


        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }
}

export default new AuthController
