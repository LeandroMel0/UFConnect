import { Router } from "express";
const router = Router();
import auth from "../middlewares/auth.js";
import like_controller from "../controllers/like_controller.js";

/////////Criar middleware para verificar se o usuário existe, se a postagem existe e se a postagem não foi curtida antes de permitir a ação de curtir
////auth.ensureUserExists, auth.ensurePostExists, auth.ensurePostNotLiked

router.post("/like", auth.authMiddleware, like_controller.like_post); // Like a post
router.post("/unlike", auth.authMiddleware, like_controller.unlike_post); // Unlike a post
router.get("/likes",auth.authMiddleware, like_controller.get_likes_by_post_id); // Get likes by post ID
router.get("/ilike",auth.authMiddleware, like_controller.get_user_liked_posts); //Get users liked posts

export default router;