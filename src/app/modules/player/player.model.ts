import { Schema, model } from 'mongoose';
import { IPlayer } from './player.interface';

const playerSchema = new Schema<IPlayer>({
  name: { type: String,},
  type: { type: String,},
  position: { type: String,},
  rating: { type: String,},
  image: { type: String},
});

const Player = model<IPlayer>('Player', playerSchema);

export default Player;
