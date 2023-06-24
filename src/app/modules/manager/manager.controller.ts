import express, { Application, Request, Response, NextFunction } from 'express';
import multer, { diskStorage, Multer } from 'multer';
import { createManagerToDB, getAllManagers, getManagerByIdFromDB, updateManagerById } from './manager.service';


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

  const manager = await createManagerToDB({
    name,
    club,
    totalMoney,
    totalSpent,
    image,
  });

  res.status(200).json({
    status: 'success',
    message: 'Manager created successfully',
    data: manager,
  });
};

export const getAllManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const manager = await getAllManagers();
  res.status(200).json({
    status: 'success',
    data: manager,
  });
};


export const getManagerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log('id: ', id);
  const manager = await getManagerByIdFromDB(id);
  if (manager) {
    res.status(200).json({
      status: 'success',
      message: `Data found for id: ${id}`, 
      data: manager,
    });
  } else {
    res.status(404).json({ message: `Data not found for id: ${id}` })
  }

};

export const updateManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updatedInfo = req.body;

  const manager = await updateManagerById(id , updatedInfo);

  if (manager) {
    res.status(200).json({
      status: 'success',
      message: `Data updated for manager with id: ${id}`, 
      data: manager,
    });
  } else {
    res.status(404).json({ message: `Data failed to update for manager with id: ${id}` })
  }
};

