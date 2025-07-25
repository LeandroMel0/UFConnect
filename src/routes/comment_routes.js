import { Router } from "express";
const router = Router();
import auth from "../middlewares/auth.js";
import comment_controller from "../controllers/comment_controller.js";

/////////Criar middleware para verificar se o usuário existe, se a postagem existe e se a postagem não foi curtida antes de permitir a ação de curtir
////auth.ensureUserExists, auth.ensurePostExists, auth.ensurePostNotLiked

router.post("/comment", auth.authMiddleware, comment_controller.comment_post); // Like a post
router.post("/commnet/remove", auth.authMiddleware, comment_controller.delete_comment); // Unlike a post
router.get("/comments/post",auth.authMiddleware, comment_controller.get_comments_from_post); // Get likes by post ID


export default router;