import express from 'express';
import { updatePlayerAndManager } from './transfer.controller';

const router = express.Router();
router.post('/transfer/transfer-update', updatePlayerAndManager);

export default router;
