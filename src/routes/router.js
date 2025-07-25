import express from 'express';
const router = express.Router();

import userRoutes from './user_routes.js';
import postRoutes from './post_routes.js';
import likeRoutes from './like_routes.js'
import commentRoutes from './comment_routes.js'

router.use('/post',postRoutes);
router.use('/user', userRoutes);
router.use('/post',likeRoutes);
router.use('/post',commentRoutes)

export default router;  