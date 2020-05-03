
import { Request, Response } from 'express'

import ViewBaseFunc from '../abstract/ViewMethods';

import Sequelize from 'sequelize'
const Op = Sequelize.Op;

const { Video, Category, Model, Studio, Tag, Comment } = require('../../models/control.js')


class ViewMainController extends ViewBaseFunc {

    async showVideo(req: Request, res: Response) {
        this.resVideoOffset(req, res)
    }

    showCategory(req: Request, res: Response) {
        this.resModel(res, Category)
    }

    showVideoCategory(req: Request, res: Response) {
        this.resVideoOffset(req, res, Category, 'category_id')
    }

    showModel(req: Request, res: Response) {
        this.resModel(res, Model)
    }

    showVideoModel(req: Request, res: Response) {
        this.resVideoOffset(req, res, Model, 'model_id')
    }

    showStudio(req: Request, res: Response) {
        this.resModel(res, Studio)
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

            const category = await this.resModelVideoId(req, Category)

            const model = await this.resModelVideoId(req, Model)

            const studio = await this.resModelVideoId(req, Studio)

            const tag = await this.resModelVideoId(req, Tag)

            const comment = await Comment.findAll({
                order: [['id', 'DESC']],
                where: {
                    video_id: req.params.id
                }
            })

            const recommended = await Video.findAll({
                where: [
                    {
                        id: {
                            [Op.ne]: video.id
                        },
                        private: false,
                    },
                    Sequelize.literal('MATCH (name) AGAINST (:name)')
                ],
                replacements: {
                    name: video.name
                }
            })

            res.json({
                video,
                category,
                model,
                studio,
                tag,
                comment,
                recommended
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
                    },
                    private: false,
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

    async showModelsForSelect(req: Request, res: Response) {
        try {
            const category = await Category.findAll({
                order: [['id', 'DESC']],
            })
            const model = await Model.findAll({
                order: [['id', 'DESC']],
            })
            const studio = await Studio.findAll({
                order: [['id', 'DESC']],
            })
            console.log(category)
            res.json({
                category,
                model,
                studio
            })
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }
}


export default new ViewMainController

