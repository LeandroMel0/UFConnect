import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {get_post_owner} from '../models/post_model.js'; // Assuming you have a function to get the post owner
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {

    const token = (req.headers.authorization || '').replace('Bearer ', '');
    console.log(req.headers.authorization)
    console.log(token)
    if (!token) {
        return res.status(401).json({error: 'Token de autenticação não fornecido'});
    }
    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario_id = decoded.id; // Attach the user id info to the request object
   
        next();

    } catch (error) {
        console.error('Erro de autenticação:', error);
        return res.status(401).json({error: 'Token inválido ou expirado'});
    }

}

const ensureOwner = (req, res, next) => {

    const userId = req.body.usuario_id;
    const resourceId = req.params.id; 

    if (userId !== resourceId) {
        return res.status(403).json({error: 'Acesso negado.'});
    }

    next();
}

const ensurePostOwner = async (req, res, next) => {

    const userId = req.usuario_id;
    const postId = req.params.id; 

    // Assuming you have a function to get the post owner
    const postOwner =  await get_post_owner(postId);
    //console.log('Verificando proprietário do post:', postOwner, 'Usuário:', userId);
    if (!postOwner || postOwner == null) {
        return res.status(404).json({error: 'Post não encontrado.'});
    }
    if (postOwner != userId) {
            return res.status(403).json({error: 'Acesso negado.'});
    }else {
        //console.log('Proprietário do post verificado com sucesso:', postOwner);
        next();
    }
}



export default {authMiddleware,ensureOwner,ensurePostOwner};
