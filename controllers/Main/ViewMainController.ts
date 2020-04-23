
import { Request, Response } from 'express'

import ViewBaseFunc from '../collections/ViewFuncCollection';

import Sequelize from 'sequelize'
const Op = Sequelize.Op;

const { Video, Category, Model, Studio, Tag, Comment } = require('../../models/control.js')


class ViewMainController extends ViewBaseFunc {

    async showVideo(req: Request, res: Response) {
        this.resVideoOffset(req, res)
    }

    showCategory(req: Request, res: Response) {
        this.resModel(req, res, Category)
    }

    showVideoCategory(req: Request, res: Response) {
        this.resVideoOffset(req, res, Category, 'category_id')
    }

    showModel(req: Request, res: Response) {
        this.resModel(req, res, Model)
    }

    showVideoModel(req: Request, res: Response) {
        this.resVideoOffset(req, res, Model, 'model_id')
    }

    showStudio(req: Request, res: Response) {
        this.resModel(req, res, Studio)
    }

    showVideoStudio(req: Request, res: Response) {
        this.resVideoOffset(req, res, Studio, 'studio_id')
    }
    showVideoTag(req: Request, res: Response) {
        this.resVideoOffset(req, res, Tag, 'tag_id')
    }
    async showMovie(req: Request, res: Response) {
        try {

            const video = await Video.findOne({
                where: { id: req.params.id },
            })

            const category = await this.resVideoIdModel(req, res, Category)

            const model = await this.resVideoIdModel(req, res, Model)

            const studio = await this.resVideoIdModel(req, res, Studio)

            const tag = await this.resVideoIdModel(req, res, Tag)

            const comment = await Comment.findAll({
                order: [['id', 'DESC']],
                where: {
                    video_id: req.params.id
                }
            })

            res.json({
                video,
                category,
                model,
                studio,
                tag,
                comment,
            })

        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

    async showVideoSearch(req: Request, res: Response) {

        const { offset, limit } = req.query
        const { name } = req.params

        try {
            const items = await Video.findAll({
                offset: +offset,
                limit: +limit,
                order: [['id', 'DESC']],
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    }
                }
            })
            const nextOffset = +offset + +limit
            res.json({
                data: items,
                nextOffset: nextOffset,
            })
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }
}


export default new ViewMainController

