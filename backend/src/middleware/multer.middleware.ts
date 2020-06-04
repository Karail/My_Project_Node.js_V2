
import { Request } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/uploads')
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/\s/g, ''))
  }
})

const allowedTypes = ['video/mp4']

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export default multer({
  storage, fileFilter
})