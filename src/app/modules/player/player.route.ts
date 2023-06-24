import express from 'express';
import {
  createPlayer,
  getAllPlayer,
  getPlayerById,
  updatePlayer,
} from './player.controller';
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
    console.log('file: ', file);
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  dest: 'uploads/', // Specify the destination folder for uploaded files
  storage,
});

const router = express.Router();
router.get('/player/get-all-player', getAllPlayer);
router.get('/player/:id', getPlayerById);
router.post('/player/create-player', upload.single('image'), createPlayer);
router.put('/player/:id', updatePlayer);

// router.post('/create-player', upload.single('image'), (req, res) => {
//   console.log(req.file)
//    console.log(req.body)
//   res.send('req successfully sent')
// });
export default router;
