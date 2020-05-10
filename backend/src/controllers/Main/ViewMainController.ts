

import { Request, Response } from 'express'

import ViewMethods from '../abstract/ViewMethods';
import Bind from '../../decorators/Bind';

import Sequelize from 'sequelize'
const Op = Sequelize.Op;

import { Video, Category, Model, Studio, Tag, Comment } from '../../models/control';

class ViewMainController extends ViewMethods {

    @Bind
    showVideo(req: Request, res: Response) {
        this.resVideoOffset(req, res)
    }

    @Bind
    showCategory(_: Request, res: Response) {
        this.resModel(res, Category)
    }

    @Bind
    showVideoCategory(req: Request, res: Response) {
        this.resVideoOffset(req, res, Category, 'category_id')
    }

    @Bind
    showModel(_: Request, res: Response) {
        this.resModel(res, Model)
    }

    @Bind
    showVideoModel(req: Request, res: Response) {
        this.resVideoOffset(req, res, Model, 'model_id')
    }

    @Bind
    showStudio(_: Request, res: Response) {
        this.resModel(res, Studio)
    }

    @Bind
    showVideoStudio(req: Request, res: Response) {
        this.resVideoOffset(req, res, Studio, 'studio_id')
    }

    @Bind
    showVideoTag(req: Request, res: Response) {
        this.resVideoOffset(req, res, Tag, 'tag_id')
    }

    @Bind
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

    async showAllModels(_: Request, res: Response) {
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

