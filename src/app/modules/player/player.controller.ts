import express, { Application, Request, Response, NextFunction } from 'express';
import {
  createPlayerToDB,
  getAllPlayers,
  getPlayerByIdFromDB,
  updatePlayerById,
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
  let { name, type, position, rating, price, club, clubOwner } = req.body;
  let image = req.file?.filename;
  let data: IPlayer;

  const player = await createPlayerToDB({
    name,
    type,
    position,
    rating,
    price,
    club,
    clubOwner,
    image,
  });

  res.status(200).json({
    status: 'success',
    message: `${player?.name} added successfully`,
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
  console.log('id: ', id);
  const player = await getPlayerByIdFromDB(id);
  if (player) {
    res.status(200).json({
      status: 'success',
      message: `Data found for id: ${id}`, 
      data: player,
    });
  } else {
    res.status(404).json({ message: `Data not found for id: ${id}` })
  }
  //inserting data
  //interface  > schema > model > query
  //res.send('Hello World!');
};

export const updatePlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updatedInfo = req.body;

  const player = await updatePlayerById(id , updatedInfo);

  if (player) {
    res.status(200).json({
      status: 'success',
      message: `Data updated for id: ${id}`, 
      data: player,
    });
  } else {
    res.status(404).json({ message: `Data failed to update  for id: ${id}` })
  }
};


