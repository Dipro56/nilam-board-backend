import { IPlayer } from './player.interface';
import Player from './player.model';

export const createPlayerToDB = async (payload: IPlayer): Promise<IPlayer> => {


  console.log('create player to db payload : ' , payload)
  const player = new Player(payload);

  await player.save();
  return player;
};

export const getAllPlayers = async () => {
  const players = await Player.find();
  return players;
};

export const getPlayerByIdFromDB = async (
  payload: string
): Promise<IPlayer | null> => {
  const player = await Player.findOne({ id: payload });
  return player;
};
