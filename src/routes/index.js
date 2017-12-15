import express from 'express';
import audioRoutes from 'routes/audio';

const router = express.Router();

router.use('/audio', audioRoutes);

export default router;
