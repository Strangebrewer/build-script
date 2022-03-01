import path from 'path';
import express from 'express';
const router = express.Router();

import userRoutes from './user';

router.use('/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

export default router;
