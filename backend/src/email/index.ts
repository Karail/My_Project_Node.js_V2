
import nodemailer from 'nodemailer';
const sendgrid = require('nodemailer-sendgrid-transport')
import { EMAILconf } from '../../config/conf';

const transporter = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: EMAILconf.sendgrid_api_key,
    },
}))

export default transporter