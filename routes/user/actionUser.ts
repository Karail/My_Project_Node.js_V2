
import ActionUser from '../../controllers/User/ActionUserController'
import { checkAuth } from '../../middleware/passport'
import {Router} from 'express';
import multer from 'multer'
import fileMiddleware from '../../middleware/file'
const upload: any = multer()

const router = Router()

router.post('/addComment', upload.array(), checkAuth, ActionUser.addComment.bind(ActionUser))

router.post('/delLike', checkAuth, ActionUser.delLike.bind(ActionUser))

router.get('/addLike', checkAuth, ActionUser.addLike.bind(ActionUser))

router.get('/addDislike', checkAuth, ActionUser.addDislike.bind(ActionUser))

router.post('/uploadVideo', fileMiddleware.single('file'), checkAuth, ActionUser.uploadVideo.bind(ActionUser))

router.post('/delMyVideo', checkAuth, ActionUser.delMyVideo.bind(ActionUser))

export default router