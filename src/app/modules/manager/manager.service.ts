import { IManager } from './manager.interface';
import Manager from './manager.model';

export const createManagerToDB = async (
  payload: IManager
): Promise<IManager> => {
  const manager = new Manager(payload);

  await manager.save();
  return manager;
};


export const getAllManagers = async () => {
  const managers = await Manager.find();
  return managers;
};

export const updateManagerById = async (
  payload: string,
  updatedInfo: IManager
): Promise<IManager | null> => {
  const manager = await Manager.findByIdAndUpdate({ _id: payload }, updatedInfo, { new: true });

  return manager;
};

export const getManagerByIdFromDB = async (
  payload: string
): Promise<IManager | null> => {
  const manager = await Manager.findOne({ _id: payload });
  return manager;
};


