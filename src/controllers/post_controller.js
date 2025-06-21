import post_services from "../services/post_services.js";

const get_users_posts = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const { page = 1, limit = 10 } = req.query;

    try {
        const posts = await post_services.get_usesr_posts(page, limit, userId);
        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const get_posts = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    try {
        const posts = await post_services.get_posts(page, limit, search);
        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const create_post = async (req, res) => {

    try {

        const newPost = await post_services.create_post(req);
        return res.status(201).json({ post: newPost });

    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).json({ error: error.message || 'Erro interno' });
    }
}

const delete_post = async (req, res) => {
    const post_id = req.params.id;
    try {
        const deletedPost = await post_services.delete_post(post_id);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }else if (deletedPost.length === 0 || deletedPost == null) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json({ message: `Post with ID ${post_id} deleted successfully` });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const get_post_by_id = async (req, res) => {
    const post_id = req.params.id;
    try {
        const post = await post_services.get_post_by_id(post_id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default {
    get_users_posts,
    get_posts,
    create_post,
    delete_post,
    get_post_by_id
};