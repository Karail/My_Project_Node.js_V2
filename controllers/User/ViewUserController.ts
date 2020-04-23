

import { Request, Response } from 'express'
const { MAINconf } = require('../../config/conf.js')
const { Subscriber, Video } = require('../../models/control.js')

interface IUserRequest extends Request {
    user?: any
    cookie?: any
}


class ViewUserController {

    private url = MAINconf.url

    async showLikeVideo(req: IUserRequest, res: Response) {

        const { id, name } = req.user

        res.set('Access-Control-Allow-Origin', this.url)
        res.set('Access-Control-Allow-Credentials', 'true')

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

        res.set('Access-Control-Allow-Origin', this.url)
        res.set('Access-Control-Allow-Credentials', 'true')

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