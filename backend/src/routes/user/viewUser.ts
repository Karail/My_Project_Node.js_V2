
import VidewUser from '../../controllers/User/ViewUserController'
import { checkAuth } from '../../middleware/auth'
import { Router } from 'express'
const router = Router()

router.get('/showLikeVideo', checkAuth, VidewUser.showLikeVideo)

router.get('/showMyVideo', checkAuth, VidewUser.showMyVideo)

router.get('/checkPrivate/:id', checkAuth, VidewUser.checkPrivate)

export default router