
import ActionUser from '../../controllers/User/ActionUserController'
import { checkAuth } from '../../middleware/auth'
import { Router } from 'express';
import multer from 'multer'
import fileMiddleware from '../../middleware/multer'
const upload: any = multer()

const router = Router()

router.post('/addComment', upload.array(), checkAuth, ActionUser.addComment)

router.delete('/removeLikeVideo', checkAuth, ActionUser.removeLikeVideo)

router.post('/addLike', checkAuth, ActionUser.addLike)

router.post('/addDislike', checkAuth, ActionUser.addDislike)

router.post('/uploadVideo', fileMiddleware.single('file'), checkAuth, ActionUser.uploadVideo)

router.delete('/removeMyVideo', checkAuth, ActionUser.removeMyVideo)

router.post('/updateViews', ActionUser.updateViews)

router.post('/editMyVideo', upload.array(), checkAuth, ActionUser.editMyVideo)

export default router