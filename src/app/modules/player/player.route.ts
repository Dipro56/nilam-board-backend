import express from 'express';
import { createPlayer, getAllPlayer, getPlayerById } from './player.controller';
import multer, { diskStorage, Multer } from 'multer';

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
    console.log('file: ' , file)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  dest: 'uploads/',// Specify the destination folder for uploaded files
  storage
});

const router = express.Router();
router.get('/', getAllPlayer);
router.get('/:id', getPlayerById);
// router.post('/create-player', upload.single('image'), (req, res) => {
//   console.log(req.file)
//    console.log(req.body)
//   res.send('req successfully sent')
// });
router.post('/create-player', upload.single('image'), createPlayer);
//createPlayer
export default router;
