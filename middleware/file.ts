
import { Request } from 'express'

import multer from 'multer'

const storage = multer.diskStorage({
  destination(req: Request, file: any, cb: any) {
    cb(null, 'uploads')
  },
  filename(req: Request, file: any, cb: any) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const allowedTypes = ['video/mp4']

const fileFilter = (req: Request, file: any, cb: any) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export default multer({
  storage, fileFilter
})