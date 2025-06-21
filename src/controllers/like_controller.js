import like_services from "../services/like_services";


const like_post = async (req, res) => {
    try {
        const result = await like_services.like_post(req);
        return res.status(200).json({ message: 'Post liked successfully', data: result });
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message || 'Internal Server Error' });
    }
}

const unlike_post = async (req, res) => {
    try {
        const result = await like_services.unlike_post(req);
        return res.status(200).json({ message: 'Post unliked successfully', data: result });
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message || 'Internal Server Error' });
    }
}

const get_likes_by_post_id = async (req, res) => {
    try {
        const result = await like_services.get_likes_by_post_id(req);
        return res.status(200).json({ data: result });
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message || 'Internal Server Error' });
    }
}

export default {
    like_post,
    unlike_post,
    get_likes_by_post_id
};