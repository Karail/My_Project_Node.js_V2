


import Auth from '../controllers/auth.controller'
import {Router} from 'express';
import multer from 'multer'
const upload: any = multer()

const router = Router()

router.post('/register', upload.array(), Auth.register)

router.post('/login', upload.array(), Auth.login)

router.post('/password', upload.array(), Auth.updatePassword)

router.get('/newPassword/:token', Auth.newPassword)

router.post('/resetPassword', upload.array(), Auth.resetPassword)

export default router