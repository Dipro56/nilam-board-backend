import express from 'express';
import multer, { diskStorage, Multer } from 'multer';
import {
  createManager,
  getAllManager,
  getManagerById,
  updateManager,
} from './manager.controller';

const storage = diskStorage({
  destination: (
    req: Request,
    file,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, 'uploads/');
  },
  filename: (
    req: Request,
    file,
    cb: (error: Error | null, filename: string) => void
  ) => {
    console.log('file: ', file);
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  dest: 'uploads/',
  storage,
});

const router = express.Router();

router.get('/manager/get-all-manager', getAllManager);
router.get('/manager/:id', getManagerById);
router.post('/manager/create-manager', upload.single('image'), createManager);
router.put('/manager/:id', updateManager);

export default router;
