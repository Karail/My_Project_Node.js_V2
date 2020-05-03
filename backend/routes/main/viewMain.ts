
import ViewMain from '../../controllers/Main/ViewMainController'
import { Router } from 'express';

const router = Router()

router.get('/', ViewMain.showVideo.bind(ViewMain))

router.get('/category', ViewMain.showCategory.bind(ViewMain))
router.get('/category/:id', ViewMain.showVideoCategory.bind(ViewMain))

router.get('/model', ViewMain.showModel.bind(ViewMain))
router.get('/model/:id', ViewMain.showVideoModel.bind(ViewMain))

router.get('/studio', ViewMain.showStudio.bind(ViewMain))
router.get('/studio/:id', ViewMain.showVideoStudio.bind(ViewMain))

router.get('/tag/:id', ViewMain.showVideoTag.bind(ViewMain))

router.get('/movie/:id', ViewMain.showMovie.bind(ViewMain))

router.get('/search/:name', ViewMain.showVideoSearch.bind(ViewMain))

router.get('/modelsForSelect', ViewMain.showModelsForSelect.bind(ViewMain))

export default router