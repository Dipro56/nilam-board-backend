import { Request, Response, NextFunction } from 'express';
import { updatePlayerById } from '../player/player.service';
import { updateManagerById } from '../manager/manager.service';

export const updatePlayerAndManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { updatedPlayerInfo, updatedManagerInfo } = req.body;

  console.log('req.body: ', req.body);
  console.log('updatedPlayerInfo: ', updatedPlayerInfo);
  console.log('updatedManagerInfo: ', updatedManagerInfo);

  const player = await updatePlayerById(
    updatedPlayerInfo?.playerId,
    updatedPlayerInfo
  );
  const manager = await updateManagerById(
    updatedManagerInfo?.managerId,
    updatedManagerInfo
  );

  console.log('player: ', player);
  console.log('manager: ', manager);
  if (player && manager) {
    res.status(200).json({
      status: 'success',
      playerUpdateMessage: `${player?.name} sold to ${player?.club} for ${player?.price}M`,
      managerInfo: manager,
    });
  } else {
    res.status(404).json({ message: `Transfer failed` });
  }
};
