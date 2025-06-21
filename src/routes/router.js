import express from 'express';
const router = express.Router();

import userRoutes from './user_routes.js';
import postRoutes from './post_routes.js';


router.use('/post',postRoutes);
router.use('/user', userRoutes);

export default router; 