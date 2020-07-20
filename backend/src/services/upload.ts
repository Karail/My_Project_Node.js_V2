
import threads from 'worker_threads';
import FileMethods from './abstract/FileMethods';
import sequelize from '../../db/db';
import IUserRequest from '../interface/IUser-request.interface';
import AWS from './abstract/AWS';
import child_process from 'child_process';

import {
    Video,
    VideoCategory,
    VideoModel,
    VideoStudio
} from '../models/control';

async function uploadVideo(req: IUserRequest, filePath: string, filePathPreview: string, newDuration: number) {

    let transaction;

    try {

        transaction = await sequelize.transaction();

        const { name, category, model, studio, privateType } = req.body

        let privat = 0;

        if (privateType) {
            privat = 1
        }

        child_process.spawn('ffmpeg', [
            '-i',
            filePath,
            '-ss',
            String(newDuration),
            '-t',
            '3',
            filePathPreview
        ]);

        const videoAWS = await AWS.awsUploadFile(filePath, req.file.filename, req.file.mimetype, '/video')

        const previewAWS = await AWS.awsUploadFile(filePathPreview, req.file.filename, req.file.mimetype, '/video/preview')



        const video = await Video.create({
            name,
            url: videoAWS.Location,
            fileName: req.file.filename,
            user_id: req.user.id,
            preview: previewAWS.Location,
            private: privat,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, { transaction })

        for (let id of category) {
            await VideoCategory.create({
                category_id: id,
                video_id: video.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            }, { transaction })
        }
        for (let id of model) {
            await VideoModel.create({
                model_id: id,
                video_id: video.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            }, { transaction })
        }
        for (let id of studio) {
            await VideoStudio.create({
                studio_id: id,
                video_id: video.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            }, { transaction })
        }

        await transaction.commit();

        // res.json(video)
        console.log('video')

        threads.parentPort?.postMessage({
            name: 'video',
            msg: video.id
        });

    } catch (err) {

        await transaction.rollback();

        threads.parentPort?.postMessage({
            name: 'err',
            msg: err
        });

    } finally {
        await FileMethods.deleteFile(filePath);
        await FileMethods.deleteFile(filePathPreview);
    }
}

const {
    req,
    filePath,
    filePathPreview,
    newDuration
} = threads.workerData;
uploadVideo(req, filePath, filePathPreview, newDuration);



