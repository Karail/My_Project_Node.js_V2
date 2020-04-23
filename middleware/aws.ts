

const { AWSconf } = require('../config/conf.js')
const AWS = require('aws-sdk');

AWS.config.update(
    {
        accessKeyId: AWSconf.accessKeyId,
        secretAccessKey: AWSconf.secretAccessKey
    }
)
const s3 = new AWS.S3();

export default s3
