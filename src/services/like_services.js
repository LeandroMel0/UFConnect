import like_model from "../models/like_model.js";

const like_post = async (request) => {
    const postagem_id = request.query.id;
    const usuario_id = request.usuario_id



    const result = await like_model.like_post(usuario_id, postagem_id);

    if (result.length === 0 || result == null) {
        const notFoundError = new Error('Post not found or already liked');
        notFoundError.statusCode = 404;
        throw notFoundError;
    }

    return result;


}

const unlike_post = async (request) => {
    const postagem_id = request.query.id;
    const usuario_id = request.usuario_id



    const result = await like_model.unlike_post(usuario_id, postagem_id);

    if (result.length === 0 || result == null) {
        const notFoundError = new Error('Post not found or not liked');
        notFoundError.statusCode = 404;
        throw notFoundError;
    }

    return result;

}

const get_likes_by_post_id = async (request) => {

    const postagem_id = request.query.id;


    const result = await like_model.get_likes_by_post_id(postagem_id);

    if (result.length === 0 || result == null) {
        const notFoundError = new Error('Post not found or no likes');
        notFoundError.statusCode = 404;
        throw notFoundError;
    }

    return result;

}

const get_user_liked_posts = async (request) => {

    const users_id = request.usuario_id;

    const result = await like_model.get_user_liked_posts(users_id);

    if (result.length === 0 || result == null) {
        const notFoundError = new Error('Post not found or no likes');
        notFoundError.statusCode = 404;
        throw notFoundError;
    }

    return result;


}

export default {
    like_post,
    unlike_post,
    get_likes_by_post_id,
    get_user_liked_posts
};