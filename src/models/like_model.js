import sql from "./connect.js";

const like_post = async (usuario_id, post_id) => {

    if (!usuario_id || !post_id) {

        const error = new Error('Usuário ou Post inválido');
        error.statusCode = 400; // Bad Request
        throw error;
    }

    try {
        const query = await sql`
            INSERT INTO likes (usuario_id, postagem_id)
            VALUES (${usuario_id}, ${post_id})
            RETURNING *
        `;
        return query;
    } catch (error) {
        console.error('Error liking post:', error);
        throw new Error('Internal Server Error');
    }
}

const unlike_post = async (usuario_id, post_id) => {

    if (!usuario_id || !post_id) {

        const error = new Error('Usuário ou Post inválido');
        error.statusCode = 400; // Bad Request
        throw error;
    }

    try {
        const query = await sql`
            DELETE FROM likes
            WHERE usuario_id = ${usuario_id} AND postagem_id = ${post_id}
            RETURNING *
        `;
        return query;
    } catch (error) {
        console.error('Error unliking post:', error);
        throw new Error('Internal Server Error');
    }
}

const get_likes_by_post_id = async (post_id) => {

    if (!post_id) {
        const error = new Error('Usuário ou Post inválido');
        error.statusCode = 400; // Bad Request
        throw error;
    }



    try {
        const query = await sql`
            SELECT * FROM likes
            WHERE postagem_id = ${post_id}
            ORDER BY data DESC
        `;
        return query[0].like_count;
    } catch (error) {
        console.error('Error fetching likes by post ID:', error);
        throw new Error('Internal Server Error');
    }
}

const get_user_liked_posts = async (user_id) => {

    if (!user_id) {
        const error = new Error('Usuário ou Post inválido');
        error.statusCode = 400; // Bad Request
        throw error;
    }
    try {
        const query = await sql`
            SELECT postagem_id FROM likes
            WHERE usuario_id = ${user_id}
            ORDER BY data DESC;
        `;

        return query;
    } catch (error) {
        console.error('Error fetching likes by post ID:', error);
        throw new Error('Internal Server Error');
    }


}



export default {
    like_post,
    unlike_post,
    get_likes_by_post_id,
    get_user_liked_posts
};