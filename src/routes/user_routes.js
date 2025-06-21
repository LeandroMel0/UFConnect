import {Router} from 'express';
const router = Router();
import auth from '../middlewares/auth.js';
import user_controller from '../controllers/user_controller.js';
import upload from "../config/multer.js";

router.get("/login", user_controller.login); // Login route
router.get('/list', user_controller.get_users);    // list users
router.post('/create',upload.single("image"), user_controller.create_user);   // Create a new user
router.delete('/delete/:id', auth.authMiddleware, user_controller.delete_user);  // Delete a user by ID
router.get('/get/:id', user_controller.get_user_by_id); // Get a user by ID

export default router;
