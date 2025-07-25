import sql from './connect.js';

const get_usesr_posts = async (page, limit, usuario_id) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;

        const posts = await sql`SELECT P.*, U.nome, U.cargo, U.avatar_url
                    FROM posts P
                    JOIN users U ON U.id = P.usuario_id
                    WHERE P.usuario_id = ${usuario_id}
                    ORDER BY P.data_postagem DESC
                    LIMIT ${limit} OFFSET ${offset}`;         
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Internal Server Error');
    }
}

const get_posts = async (page, limit, search,tipo) => {
    try {
        // Valores padrão
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;
        const searchTerm = search ? `%${search}%` : null;

        let posts;

        if (searchTerm) {
            posts = await sql`
                SELECT P.*, U.nome, U.cargo, U.avatar_url FROM posts P JOIN users U 
                ON U.id = P.usuario_id
                WHERE P.texto ILIKE ${searchTerm} AND ORDER BY P.data_postagem DESC
                LIMIT ${limit} OFFSET ${offset}`;
            
        } else {
            posts = await sql`
                SELECT P.*, U.nome, U.cargo, U.avatar_url FROM posts P JOIN users U 
                ON U.id = P.usuario_id WHERE tipo = ${tipo}
                ORDER BY P.data_postagem DESC
                `;
        }

        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

const create_post = async (post_data) => {
    try {
        const {usuario_id, texto, imagem_url,tipo}= post_data;
        const query = await sql`
            INSERT INTO posts (usuario_id, texto, imagem_url,tipo)
            VALUES (${usuario_id}, ${texto}, ${imagem_url},${tipo})
            RETURNING *
        `;

        return query;
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error("Error creating post on the database", error);
    }
}

const delete_post = async (post_id) => {
    try {
        const query = await sql`
            DELETE FROM posts WHERE id = ${post_id} RETURNING *
        `;
        return query;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Internal Server Error');
    }
}

/// Update post function(Não está implementada no controller)
/*
const update_post = async (post_id, post_data) => {
    try {
        const { texto } = post_data;
        const query = await sql`
            UPDATE posts
            SET texto = ${texto}
            WHERE id = ${post_id}
            RETURNING *
        `;
        return query;
    } catch (error) {
        console.error('Error updating post:', error);
        throw new Error('Internal Server Error');
    }
}
*/
const get_post_by_id = async (post_id) => {
    try {
        const query = await sql`
            SELECT * FROM posts WHERE id = ${post_id}
        `;
        return query;
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        throw new Error('Internal Server Error');
    }
}

export const get_post_owner = async (post_id) => {
    try {
        const query = await sql`
            SELECT usuario_id FROM posts WHERE id = ${post_id}
        `;
        if (query.length === 0 || query == null) {
            return null; // Post not found
        }
        return query[0].usuario_id;
    } catch (error) {
        console.error('Error fetching post owner:', error);
        throw new Error('Internal Server Error');
    }
}




export default {
    get_posts,
    create_post,
    delete_post,
    //update_post,
    get_post_by_id,
    get_usesr_posts,
};