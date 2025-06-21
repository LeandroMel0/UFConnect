import {Router} from 'express';
const router = Router();
import auth from '../middlewares/auth.js';
import post_controller from '../controllers/post_controller.js';
import upload from "../config/multer.js";

router.get('/list', post_controller.get_posts); // List all posts with pagination and search
router.get('/user/:userId', post_controller.get_users_posts); // List posts by user with pagination   
router.post('/create',auth.authMiddleware,upload.single("imagem"), post_controller.create_post); // Create a new post
router.delete('/delete/:id',auth.authMiddleware,auth.ensurePostOwner, post_controller.delete_post); // Delete a post by ID
router.get('/get/:id', post_controller.get_post_by_id); // Get a post by ID


export default router;