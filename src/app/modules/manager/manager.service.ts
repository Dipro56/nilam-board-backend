import { IManager } from './manager.interface';
import Manager from './manager.model';

export const createManagerToDB = async (
  payload: IManager
): Promise<IManager> => {
  const manager = new Manager(payload);

  await manager.save();
  return manager;
};
