import express, { Application, Request, Response, NextFunction } from "express";
import {
  createPlayerToDB,
  deletePlayerById,
  getAllPlayers,
  getPlayerByIdFromDB,
  updatePlayerById,
} from "./player.service";
import Player from "./player.model";
import { IPlayer } from "./player.interface";
import { uploadOnCloudinary } from "../../utils/cloudinary";
import { ApiError } from "../../utils/ApiError";



export const createPlayer = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // console.log('createPlayer controller: ', req);
  // console.log('req.file: ' , req.file)
  let { name, type, position, rating, price, club, clubOwner } = req.body;

  let data: IPlayer;

  let image: any;

  console.log("req?.files?.image", req?.files?.image);

  if (req?.files && req?.files?.image) {
    const avatarLocalPath = req?.files?.image?.[0]?.path;

    console.log("avatarLocalPath", avatarLocalPath);

    if (avatarLocalPath) {
      image = await uploadOnCloudinary(avatarLocalPath);
      console.log("image", image);
      if (!image) {
        throw new ApiError(400, "Avatar file is required");
      }
    }
  }

  const player = await createPlayerToDB({
    name,
    type,
    position,
    rating,
    price,
    club,
    clubOwner,
    image: image?.url,
  });

  res.status(200).json({
    status: "success",
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
    status: "success",
    data: player,
  });
};

export const getPlayerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log("id: ", id);
  const player = await getPlayerByIdFromDB(id);
  if (player) {
    res.status(200).json({
      status: "success",
      message: `Data found for id: ${id}`,
      data: player,
    });
  } else {
    res.status(404).json({ message: `Data not found for id: ${id}` });
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

  const player = await updatePlayerById(id, updatedInfo);

  if (player) {
    res.status(200).json({
      status: "success",
      message: `Data updated for id: ${id}`,
      data: player,
    });
  } else {
    res.status(404).json({ message: `Data failed to update  for id: ${id}` });
  }
};

export const deletePlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const deletedPlayer = await deletePlayerById(id);

    if (deletedPlayer) {
      res.status(200).json({
        status: "success",
        message: `Player with id: ${id} deleted successfully.`,
        data: deletedPlayer,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: `No player found with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
};
