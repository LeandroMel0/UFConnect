import comments_service from "../services/comments_services.js";


const comment_post = async (req, res) => {
    try {
        const result = await comments_service.comment_post(req);
        return res.status(200).json({ message: 'Comment made successfully', data: result });
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message || 'Internal Server Error' });
    }
}

const delete_comment = async (req, res) => {
    try {
        const result = await comments_service.delete_comment(req);
        return res.status(200).json({ message: 'Comment deleted successfully', data: result });
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message || 'Internal Server Error' });
    }
}

const get_comments_from_post = async (req, res) => {
    try {
        const result = await comments_service.get_comments_from_post(req);
        return res.status(200).json(result);
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message || 'Internal Server Error' });
    }
}



export default {
    get_comments_from_post,
    delete_comment,
    comment_post
};