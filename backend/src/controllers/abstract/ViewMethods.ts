
import { Request, Response } from 'express';

import { Video } from '../../models/control';

import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export default abstract class ViewMethod {

    protected async resVideoOffset(req: Request, res: Response, thwoModel?: any, tableId?: string) {
        try {
            let items;
            console.log(thwoModel, tableId)
            if (tableId && thwoModel) {
                
                items = await Video.findAll({
                    offset: +req.query.offset,
                    limit: +req.query.limit,
                    order: [[req.query.sort, 'DESC']],
                    include: [{
                        model: thwoModel,
                        through: {
                            where: {
                                [tableId]: req.params.id,
                            }
                        },
                        required: true
                    }],
                    where: {
                        private: false,
                    },
                });
            } else {
                items = await Video.findAll({
                    offset: +req.query.offset,
                    limit: +req.query.limit,
                    order: [[req.query.sort, 'DESC']],
                    where: {
                        private: false,
                    }
                });
            }
            const nextOffset = +req.query.offset + +req.query.limit;
            res.json({
                data: items,
                nextOffset: nextOffset,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Что то пошло не так' });
        }
    }

    protected async resModel(res: Response, model: any) {
        try {
            const data = await model.findAll({
                order: [['id', 'DESC']],
                include: [{
                    model: Video,
                    through: {
                        where: {
                            video_id: {
                                [Op.not]: null
                            }
                        },
                    },
                    required: true
                }]
            });
            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Что то пошло не так' });
        }
    }

    protected resModelVideoId(req: Request, model: any) {
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
        });
    }
}
