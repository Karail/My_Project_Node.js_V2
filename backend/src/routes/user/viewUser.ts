
import VidewUser from '../../controllers/User/ViewUserController'
import { checkAuth } from '../../middleware/auth'
import { Router } from 'express'
const router = Router()

router.get('/showLikeVideo', checkAuth, VidewUser.showLikeVideo.bind(VidewUser))

router.get('/showMyVideo', checkAuth, VidewUser.showMyVideo.bind(VidewUser))

router.get('/checkPrivate/:id', checkAuth, VidewUser.checkPrivate.bind(VidewUser))

export default router