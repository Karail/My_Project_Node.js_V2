
const { AWSconf } = require('../../config/conf.js')
import s3 from '../../middleware/aws';
import FileMethods from './FileMethods';

export default abstract class AWS {

    //!S3
    static async awsUploadFile(staticPath: string, iFile: string, mimetype: string, folderName: string) {

        const params = await new Promise(async (resolve, reject) => {
            try {
                const data = await FileMethods.readFile(staticPath)

                const params = {
                    Bucket: AWSconf.bucketName + folderName,
                    Key: iFile,
                    Body: data,
                    ContentType: mimetype,
                    ACL: 'public-read',
                }
                resolve(params)

            } catch (err) {
                reject(err)
            }
        })

        return s3.upload(params as any).promise()

    }

    static awsDeleteFile(bucket: string, key: string) {

        const params = {
            Bucket: AWSconf.bucketName + bucket,
            Key: key
        };

        return new Promise((resolve, reject) => {
            s3.deleteObject(params, function (err, data) {
                if (err)
                    return reject(err)
                resolve(data)
            })
        })

    }

} 