import Sequelize from 'sequelize'
const Op = Sequelize.Op;
import { Request, Response } from 'express'

const { Video } = require('../../models/control.js')


export default abstract class ViewBaseFunc {

    protected async resVideoOffset(req: Request, res: Response, thwoModel?: any, tableId?: any) {
        try {

            let items

            if (tableId && thwoModel) {
                items = await Video.findAll({
                    offset: +req.query.offset,
                    limit: +req.query.limit,
                    order: [['id', 'DESC']],
                    include: [{
                        model: thwoModel,
                        through: {
                            where: {
                                [tableId]: req.params.id
                            }
                        },
                        required: true
                    }],
                })
            } else {
                items = await Video.findAll({
                    offset: +req.query.offset,
                    limit: +req.query.limit,
                    order: [['id', 'DESC']],
                })
            }
            const nextOffset = +req.query.offset + +req.query.limit
            res.json({
                data: items,
                nextOffset: nextOffset,
            })
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

    protected async resModel(res: Response, model: any) {
        try {
            const items = await model.findAll({ order: [['id', 'DESC']] })
            res.json(items)
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

    protected resVideoIdModel(req: Request, model: any) {
        return model.findAll({
            include: [{
                model: Video,
                through: {
                    where: {
                        video_id: req.params.id
                    }
                },
                required: true
            }],
        })
    }
}
