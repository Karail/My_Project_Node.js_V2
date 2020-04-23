


import Auth from '../controllers/AuthController'
import {Router} from 'express';
import multer from 'multer'
const upload: any = multer({ dest: 'uploads/' })

const router = Router()

router.post('/register', upload.array(), Auth.register.bind(Auth))

router.post('/login', upload.array(), Auth.login.bind(Auth))

router.post('/password', upload.array(), Auth.updatePassword.bind(Auth))

router.get('/newPassword/:token', Auth.newPassword.bind(Auth))

router.post('/resetPassword', upload.array(), Auth.resetPassword.bind(Auth))

export default router