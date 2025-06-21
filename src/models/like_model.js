import sql from "./connect";
import {like_count} from "./post_model";

const like_post = async (usuario_id, post_id) => {
    try {
        const query = await sql`
            INSERT INTO likes (usuario_id, postagem_id)
            VALUES (${usuario_id}, ${post_id})
            RETURNING *
        `;
        if(query.length !== 0 || query != null) {
            like_count(post_id, 1); //Increment like count in post_model
        }
        return query;
    } catch (error) {
        console.error('Error liking post:', error);
        throw new Error('Internal Server Error');
    }
}

const unlike_post = async (usuario_id, post_id) => {
    try {
        const query = await sql`
            DELETE FROM likes
            WHERE usuario_id = ${usuario_id} AND postagem_id = ${post_id}
            RETURNING *
        `;
        if(query.length !== 0 || query != null) {
            like_count(post_id, 0); // Decrement like count in post_model
        }
        return query;
    } catch (error) {
        console.error('Error unliking post:', error);
        throw new Error('Internal Server Error');
    }
}

const get_likes_by_post_id = async (post_id) => {
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

export default {
    like_post,
    unlike_post,
    get_likes_by_post_id
};