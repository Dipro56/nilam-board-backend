import { IPlayer } from "./player.interface";
import Player from "./player.model";

export const createPlayerToDB = async (payload: IPlayer): Promise<IPlayer> => {
  const player = new Player(payload);

  await player.save();
  return player;
};

export const getAllPlayers = async () => {
  const players = await Player.find().sort({ rating: -1, name: 1 });
  return players;
};

export const getPlayerByIdFromDB = async (
  payload: string
): Promise<IPlayer | null> => {
  const player = await Player.findOne({ _id: payload });
  return player;
};

export const updatePlayerById = async (
  payload: string,
  updatedInfo: IPlayer
): Promise<IPlayer | null> => {
  const player = await Player.findByIdAndUpdate({ _id: payload }, updatedInfo, {
    new: true,
  });

  console.log("updated player: ", player);
  return player;
};

export const deletePlayerById = async (id: string) => {
  return await Player.findByIdAndDelete(id);
};
