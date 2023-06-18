import express, { Application, Request, Response, NextFunction } from 'express';
import multer, { diskStorage, Multer } from 'multer';
import { createManagerToDB } from './manager.service';

export interface MulterRequest extends Request {
  file: multer.File;
}

export const createManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  let { name, club, totalMoney, totalSpent, transferHistory } = req.body;
  let image = req.file?.filename;

  const manager = await createManagerToDB({name, club, totalMoney, totalSpent, transferHistory, image});

  res.status(200).json({
    status: 'success',
    message: 'Manager created successfully',
    data: manager,
  });
};
