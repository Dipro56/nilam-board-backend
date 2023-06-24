import { Schema, model } from 'mongoose';
import { IPlayer } from './player.interface';

const playerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  position: { type: String, required: true },
  rating: { type: String, required: true },
  price: { type: String, required: true },
  club: { type: String, required: true },
  clubOwner: { type: String, required: true },
  image: { type: String, required: true },
});

const Player = model<IPlayer>('Player', playerSchema);

export default Player;
