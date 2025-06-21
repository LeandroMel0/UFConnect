import post_model from "../models/post_model.js";  
import schema from '../utils/joi_validation.js';


const like_post = async (request) => {
    const { usuario_id, postagem_id } = request.body;

    // Validate the input data
    const { error} = schema.like_schema.validate({ usuario_id, postagem_id });
    if (error) {

        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        throw validationError;
    }

    try {
        const result = await post_model.like_post(usuario_id, postagem_id);

        if(result.length === 0 || result == null) {
            const notFoundError = new Error('Post not found or already liked');
            notFoundError.statusCode = 404;
            throw notFoundError;
        }

        return result;

    } catch (error) {
        console.error('Error liking post:', error);
        throw new Error('Internal Server Error');
    }
}

const unlike_post = async (request) => {
    const { usuario_id, postagem_id } = request.body;

    // Validate the input data
    const { error } = schema.like_schema.validate({ usuario_id, postagem_id });
    if (error) {
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        throw validationError;
    }

    try {
        const result = await post_model.unlike_post(usuario_id, postagem_id);

        if(result.length === 0 || result == null) {
            const notFoundError = new Error('Post not found or not liked');
            notFoundError.statusCode = 404;
            throw notFoundError;
        }

        return result;

    } catch (error) {
        console.error('Error unliking post:', error);
        throw new Error('Internal Server Error');
    }
}

const get_likes_by_post_id = async (request) => {
    const { postagem_id } = request.params;

    // Validate the input data
    const { error } = schema.like_schema.validate({ postagem_id });
    if (error) {
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        throw validationError;
    }

    try {
        const result = await post_model.get_likes_by_post_id(postagem_id);

        if(result.length === 0 || result == null) {
            const notFoundError = new Error('Post not found or no likes');
            notFoundError.statusCode = 404;
            throw notFoundError;
        }

        return result;

    } catch (error) {
        console.error('Error fetching likes by post ID:', error);
        throw new Error('Internal Server Error');
    }
}

export default {
    like_post,
    unlike_post,
    get_likes_by_post_id
};