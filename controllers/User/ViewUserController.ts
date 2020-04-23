

import { Request, Response } from 'express'
const { Subscriber, Video } = require('../../models/control.js')
import IUserRequest from '../../intarface/IUserRequest';

class ViewUserController {

    async showLikeVideo(req: IUserRequest, res: Response) {

        const { id, name } = req.user

        try {
            const items = await Video.findAll({
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

            res.json(items)
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

    async showMyVideo(req: IUserRequest, res: Response) {
        const { id } = req.user

        try {
            const items = await Video.findAll({
                order: [['id', 'DESC']],
                where: {
                    'user_id': id
                }
            })

            res.json(items)
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

}

export default new ViewUserController