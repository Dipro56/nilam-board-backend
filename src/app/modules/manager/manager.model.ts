import { Schema, model } from 'mongoose';
import { IManager } from './manager.interface';

const managerSchema = new Schema<IManager>({
  name: { type: String, required: true },
  club: { type: String, required: true },
  totalMoney: { type: String, required: true },
  totalSpent: { type: String, required: true },
  image: { type: String, required: true },
});

const Manager = model<IManager>('Manager', managerSchema);

export default Manager;
