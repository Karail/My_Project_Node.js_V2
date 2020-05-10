
import ViewMain from '../../controllers/Main/ViewMainController'
import { Router } from 'express';

const router = Router()

router.get('/', ViewMain.showVideo)

router.get('/category', ViewMain.showCategory)
router.get('/category/:id', ViewMain.showVideoCategory)

router.get('/model', ViewMain.showModel)
router.get('/model/:id', ViewMain.showVideoModel)

router.get('/studio', ViewMain.showStudio)
router.get('/studio/:id', ViewMain.showVideoStudio)

router.get('/tag/:id', ViewMain.showVideoTag)

router.get('/movie/:id', ViewMain.showMovie)

router.get('/search/:name', ViewMain.showVideoSearch)

router.get('/allModels', ViewMain.showAllModels)

export default router