

const { AWSconf } = require('../../config/conf.js')
import AWS_SDK from 'aws-sdk';

AWS_SDK.config.update(
    {
        accessKeyId: AWSconf.accessKeyId,
        secretAccessKey: AWSconf.secretAccessKey
    }
)
const s3 = new AWS_SDK.S3();

export default s3
