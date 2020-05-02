
import ActionUser from '../../controllers/User/ActionUserController'
import { checkAuth } from '../../middleware/auth'
import { Router } from 'express';
import multer from 'multer'
import fileMiddleware from '../../middleware/multer'
const upload: any = multer()

const router = Router()

router.post('/addComment', upload.array(), checkAuth, ActionUser.addComment.bind(ActionUser))

router.delete('/removeLikeVideo', checkAuth, ActionUser.removeLikeVideo.bind(ActionUser))

router.get('/addLike', checkAuth, ActionUser.addLike.bind(ActionUser))

router.get('/addDislike', checkAuth, ActionUser.addDislike.bind(ActionUser))

router.post('/uploadVideo', fileMiddleware.single('file'), checkAuth, ActionUser.uploadVideo.bind(ActionUser))

router.delete('/removeMyVideo', checkAuth, ActionUser.removeMyVideo.bind(ActionUser))

router.get('/updateViews', ActionUser.updateViews.bind(ActionUser))

export default router