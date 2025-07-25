import comments_model from "../models/comment_model.js";

const comment_post = async (request) => {

    if(!request.body){
        const error = new Error('Dados do comentario invalido');
        error.statusCode = 400; // Bad Request
        throw error;
    }

    const post_id = request.body.post_id;
    const users_id = request.usuario_id;
    const text = request.body.text;


    if(!post_id || !users_id || !text){
        const error = new Error('Dados do comentario invalido');
        error.statusCode = 400; // Bad Request
        throw error;
    }

    const result = await comments_model.comment_post(users_id,text,post_id);

    return result;

}
const delete_comment = async (request) => {

     if(!request.body){
        const error = new Error('Dados do comentario invalido');
        error.statusCode = 400; // Bad Request
        throw error;

    }

    const comment_id = request.body.comment_id;

    if(!comment_id){
        const error = new Error('Dados o invalidos');
        error.statusCode = 400; // Bad Request
        throw error;
    }

    const result = await comments_model.delete_comment(comment_id);

    return result;
}

const get_comments_from_post = async (request) => {


     if(!request.body){
        const error = new Error('Dados do comentario invalido');
        error.statusCode = 400; // Bad Request
        throw error;

    }



    const post_id = request.body.post_id;

    if(!post_id){
        const error = new Error('Dados o invalidos');
        error.statusCode = 400; // Bad Request
        throw error;
    }

    const result = await comments_model.get_comments_from_post(post_id);

    return result;

}

export default {
    comment_post,
    get_comments_from_post,
    delete_comment
};