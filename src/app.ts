import express, { Application, Request, Response, NextFunction,  } from 'express';
import cors from 'cors';
import multer, { diskStorage, Multer } from 'multer';



const app: Application = express();

//Application route
import playerRoute from './app/modules/player/player.route';
import managerRoute from './app/modules/manager/manager.route';
import transferRoute from './app/modules/transfer/transfer.route';

import bodyParser from 'body-parser';

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
    console.log('stprage app ts file: ' , file)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  dest: 'uploads/',
  storage, // Specify the destination folder for uploaded files
});



app.use(cors());
// app.use(upload.single('image'),(req:Request, res) => {
//   console.log('req: ', req.body)
//   res.send('file uploaded')
// });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))
// app.use('/manager', express.static('manager'))
app.use('/api/v1', playerRoute);
app.use('/api/v1', managerRoute);
app.use('/api/v1' , transferRoute)


//interface  > schema > model > query

export default app;
