
import { Request, Response } from 'express'
import path from 'path';
import { Worker } from 'worker_threads';
const { getVideoDurationInSeconds } = require('get-video-duration')

import sequelize from '../../../db/db';

import IUserRequest from '../../interface/IUser-request.interface';
import AWS from '../../services/abstract/AWS';

import complain from '../../email/complain'
import transporter from '../../email';

import {
    Video,
    Comment,
    Subscriber,
    LikeSubscriber,
    DislikeSubscriber,
    VideoCategory,
    VideoModel,
    VideoStudio,
} from '../../models/control';
class ActionUserController {

    async addComment(req: IUserRequest, res: Response) {
        try {

            const { comment, video_id } = req.body
            const comment_id = req.body.comment_id || null

            console.log(req.body);


            if (!comment) 
                return res.status(400).send({ message: 'Не корректные данные' })

            const user = req.user

            await Comment.create({
                name: user.name,
                comment: comment.trim(),
                video_id,
                comment_id,
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            if (comment_id) {
                await Comment.update({
                    answer: 1,
                }, {
                    where: { id: comment_id }
                })
            }

            const items = await Comment.findAll({
                order: [['id', 'DESC']],
                where: {
                    video_id,
                }
            })

            res.json(items)

        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

    async removeLikeVideo(req: IUserRequest, res: Response) {
        try {
            const subscriber_id = req.user.id
            const video_id = req.query.video_id

            await LikeSubscriber.destroy({
                where: {
                    video_id,
                    subscriber_id,

                }
            })

            await sequelize.query("UPDATE videos SET `like` = `like` - 1 WHERE id = " + video_id);

            const items = await Video.findAll({
                order: [['id', 'DESC']],
                include: [{
                    model: Subscriber,
                    through: {
                        where: {
                            subscriber_id
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

    async addLike(req: IUserRequest, res: Response) {
        try {
            const subscriber_id = req.user.id
            const video_id = req.body.id
            const like = req.body.like
            const dislike = req.body.dislike

            let data: { like: number, dislike: number } = {
                like,
                dislike,
            }

            const itemDislike = await DislikeSubscriber.findOne({
                where: {
                    video_id,
                    subscriber_id,
                }
            })

            if (itemDislike) {

                await sequelize.query("UPDATE videos SET `dislike` = `dislike` - 1 WHERE id = " + video_id);

                await DislikeSubscriber.destroy({
                    where: {
                        video_id,
                        subscriber_id,

                    }
                })

                data.dislike = +dislike - 1
            }


            const itemLike = await LikeSubscriber.findOne({
                where: {
                    video_id,
                    subscriber_id,
                }
            })

            if (!itemLike) {

                await sequelize.query("UPDATE videos SET `like` = `like` + 1 WHERE id = " + video_id);

                await LikeSubscriber.create({
                    video_id,
                    subscriber_id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })

                data.like = +like + 1

            } else {

                await sequelize.query("UPDATE videos SET `like` = `like` - 1 WHERE id = " + video_id);

                await LikeSubscriber.destroy({
                    where: {
                        video_id,
                        subscriber_id,

                    }
                })

                data.like = +like - 1

            }

            res.json(data)

        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

    async addDislike(req: IUserRequest, res: Response) {
        try {
            const subscriber_id = req.user.id
            const video_id = req.body.id
            const like = req.body.like
            const dislike = req.body.dislike

            let data: { like: number, dislike: number } = {
                like,
                dislike,
            }

            const itemLike = await LikeSubscriber.findOne({
                where: {
                    video_id,
                    subscriber_id,
                }
            })

            if (itemLike) {
                await LikeSubscriber.destroy({
                    where: {
                        video_id,
                        subscriber_id,

                    }
                })
                await sequelize.query("UPDATE videos SET `like` = `like` - 1 WHERE id = " + video_id);

                data.like = +like - 1
            }


            const itemDislike = await DislikeSubscriber.findOne({
                where: {
                    video_id,
                    subscriber_id,
                }
            })

            if (!itemDislike) {

                await sequelize.query("UPDATE videos SET `dislike` = `dislike` + 1 WHERE id = " + video_id);

                await DislikeSubscriber.create({
                    video_id,
                    subscriber_id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })

                data.dislike = +dislike + 1

            } else {

                await sequelize.query("UPDATE videos SET `dislike` = `dislike` - 1 WHERE id = " + video_id);

                await DislikeSubscriber.destroy({
                    where: {
                        video_id,
                        subscriber_id,

                    }
                })
                data.dislike = +dislike - 1
            }

            res.json(data)

        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

    async uploadVideo(req: IUserRequest, res: Response) {

        const filePath = path.join(__dirname, '..', '..', '..', req.file.path)
        const filePathPreview = path.join(__dirname, '..', '..', '/uploads', '/preview', req.file.filename)

        try {

            const duration: number = await getVideoDurationInSeconds(filePath)

            const newDuration = Math.round(duration / 2)

            console.log({
                body: req.body,
                file: req.file,
                user: req.user.get(),
            })
            const worker = new Worker(
                path.join(__dirname, '..', '..', 'services', 'upload.imp.js'),
                {
                    workerData: {
                        req: {
                            body: req.body,
                            file: req.file,
                            user: req.user.get(),
                        },
                        filePath,
                        filePathPreview,
                        newDuration
                    }
                }
            )

            worker.on('message', (msg) => {
                if (msg.name === 'video') {
                    console.log(msg.msg)
                    res.json(msg.msg)
                } 
                else if (msg.name === 'err') {
                    console.log(msg.msg)
                    res.status(500).send({ message: msg.msg })
                    
                }
            });

        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    async removeMyVideo(req: IUserRequest, res: Response) {
        try {
            const user_id = req.user.id

            const video_id = req.query.video_id

            const videoItems = await Video.findOne({
                where: {
                    id: video_id,
                    user_id,
                }
            })

            if (videoItems) {
                await Comment.destroy({
                    where: {
                        video_id,
                    }
                })
                await LikeSubscriber.destroy({
                    where: {
                        video_id,
                    }
                })
                await DislikeSubscriber.destroy({
                    where: {
                        video_id,
                    }
                })
                await VideoCategory.destroy({
                    where: {
                        video_id,
                    }
                })
                await VideoModel.destroy({
                    where: {
                        video_id,
                    }
                })
                await VideoStudio.destroy({
                    where: {
                        video_id,
                    }
                })
                await Video.destroy({
                    where: {
                        id: video_id,
                        user_id
                    }
                })

                await AWS.awsDeleteFile('/video', videoItems.fileName)

                await AWS.awsDeleteFile('/video/preview', videoItems.fileName)

                res.send({
                    deleted: true
                })
            } else {
                throw new Error('Видео не найдено')
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: err.message })
        }
    }

    async editMyVideo(req: IUserRequest, res: Response) {
        try {


            const user_id = req.user.id

            const video_id = req.query.video_id

            const videoItems = await Video.findOne({
                where: {
                    id: video_id,
                    user_id,
                }
            })
            if (videoItems) {
                let privat = videoItems.private;

                const { name, category, model, studio, privateType } = req.body

                if (privateType) {
                    privat = 1
                } else {
                    privat = 0
                }

                console.log(privat)
                const video = await Video.update({
                    name,
                    private: privat

                }, {
                    where: {
                        user_id,
                        id: video_id,
                    }
                })

                await VideoCategory.destroy({
                    where: {
                        video_id,
                    }
                })
                await VideoModel.destroy({
                    where: {
                        video_id,
                    }
                })
                await VideoStudio.destroy({
                    where: {
                        video_id,
                    }
                })
                console.log(category)
                for (let id of category) {
                    await VideoCategory.create({
                        category_id: id,
                        video_id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    })
                }
                for (let id of model) {
                    await VideoModel.create({
                        model_id: id,
                        video_id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    })
                }
                for (let id of studio) {
                    await VideoStudio.create({
                        studio_id: id,
                        video_id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    })
                }
                res.json(videoItems)
            } else {
                throw new Error('Видео не найдено')
            }

        } catch (err) {
            console.log(err)
            res.status(500).send({ message: err.message })
        }
    }

    async updateViews(req: Request, res: Response) {
        try {
            const video_id = req.body.video_id;
            console.log(video_id)
            await sequelize.query("UPDATE videos SET `views` = `views` + 1 WHERE id = " + video_id);
            const data = await Video.findOne({
                where: {
                    id: video_id
                },
                attributes: ['views']
            })
            res.json(data)
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }

    async complain(req: IUserRequest, res: Response) {
        try {
            const userEmail = 'karail-fokus@mail.ru';
            const videoId = req.params.videoId;

            console.log(userEmail)
            await transporter.sendMail(complain(userEmail, videoId));

            res.json('Жалоба отправлена')
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Что то пошло не так' })
        }
    }
}

export default new ActionUserController





