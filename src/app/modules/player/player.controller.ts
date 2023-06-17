import express, { Application, Request, Response, NextFunction } from 'express';
import {
  createPlayerToDB,
  getAllPlayers,
  getPlayerByIdFromDB,
} from './player.service';
import Player from './player.model';
import multer, { diskStorage, Multer } from 'multer';
import { IPlayer } from './player.interface';

export interface MulterRequest extends Request {
  file: multer.File;
}

// const storage = diskStorage({
//   destination: (
//     req: Request,
//     file,
//     cb: (error: Error | null, destination: string) => void
//   ) => {
//     cb(null, 'uploads/');
//   },
//   filename: (
//     req: Request,
//     file,
//     cb: (error: Error | null, filename: string) => void
//   ) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

export const createPlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log('createPlayer controller: ', req);
  // console.log('req.file: ' , req.file)
  let { name, type, position, rating } = req.body;
  let image = req.file?.filename;
  let data: IPlayer;

  const player = await createPlayerToDB({name, type, position, rating, image});

  res.status(200).json({
    status: 'success',
    message: 'Player created successfully',
    data: player,
  });
  //inserting data
  //interface  > schema > model > query
  //res.send('Hello World!');
};

export const getAllPlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const player = await getAllPlayers();
  res.status(200).json({
    status: 'success',
    data: player,
  });
};

export const getPlayerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const player = await getPlayerByIdFromDB(id);
  res.status(200).json({
    status: 'success',
    data: player,
  });
  //inserting data
  //interface  > schema > model > query
  //res.send('Hello World!');
};
