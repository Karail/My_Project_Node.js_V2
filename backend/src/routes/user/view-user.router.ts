
import VidewUser from '../../controllers/User/view-user.controller'
import { checkAuth } from '../../middleware/auth.middleware'
import { Router } from 'express'
const router = Router()

router.get('/showLikeVideo', checkAuth, VidewUser.showLikeVideo)

router.get('/showMyVideo', checkAuth, VidewUser.showMyVideo)

router.get('/checkPrivate/:id', checkAuth, VidewUser.checkPrivate)

export default router