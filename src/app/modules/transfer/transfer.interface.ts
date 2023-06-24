import { IPlayer } from '../player/player.interface';
import { IManager } from '../manager/manager.interface';

export interface ITransfer {
  player: Partial<IPlayer>;
  manager: Partial<IManager>;
}