

import { Request, Response } from 'express'
const { Subscriber, Video } = require('../../models/control.js')
import IUserRequest from '../../intarface/IUserRequest';

class ViewUserController {

    async showLikeVideo(req: IUserRequest, res: Response) {

        const { id } = req.user

        try {
            const data = await Video.findAll({
                order: [['id', 'DESC']],
                include: [{
                    model: Subscriber,
                    through: {
                        where: {
                            'subscriber_id': id
                        }
                    },
                    required: true
                }],
            })

            res.json(data)
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

    async showMyVideo(req: IUserRequest, res: Response) {
        const { id } = req.user

        try {
            const data = await Video.findAll({
                order: [['id', 'DESC']],
                where: {
                    user_id: id
                }
            })

            res.json(data)
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

    async checkPrivate(req: IUserRequest, res: Response) {
        try {
            const data = await Video.findOne({
                where: {
                    user_id: req.user.id,
                    id: req.params.id
                }
            })
            if (data) {
                res.json(false)
            } else {
                res.json(true)
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

}

export default new ViewUserController