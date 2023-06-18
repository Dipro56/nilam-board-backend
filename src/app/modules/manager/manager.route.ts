import express from 'express';
import multer, { diskStorage, Multer } from 'multer';
import { createManager } from './manager.controller';


const storage = diskStorage({
  destination: (
    req: Request,
    file,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, 'manager/');
  },
  filename: (
    req: Request,
    file,
    cb: (error: Error | null, filename: string) => void
  ) => {
    console.log('file: ' , file)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  dest: 'manager/',
  storage
});

const router = express.Router();
router.post('/create-manager', upload.single('image'), createManager);

export default router;
