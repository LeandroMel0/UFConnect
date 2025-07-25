import sql from "./connect.js";

const comment_post = async (user_id, text, post_id) => {
    try {
        const query = await sql`
                INSERT INTO comments (user_id,texto,post_id) VALUES (${user_id},${text},${post_id});
            `;
        return query;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }

}
const delete_comment = async (comment_id) => {
    try {
        const query = await sql`
                DELETE FROM comments WHERE comment_id =${comment_id};
            `;
        return query;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }

}

const get_comments_from_post = async (post_id, page = 0,limit = 10) => {

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;


    try {
        const query = await sql`
                SELECT * FROM comments
                LIMIT ${limit} OFFSET ${offset}
            `;
        return query;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

export default {
    comment_post,
    get_comments_from_post,
    delete_comment
};