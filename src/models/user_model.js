import sql from './connect.js';

const get_users = async (page, limit, search) => {
    try {
        // Valores padrão
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;
        const searchTerm = search ? `%${search}%` : null;

        let users;

        if (searchTerm) {
            users = await sql`
                SELECT id, nome, avatar_url, bio, cidade, estado, cargo FROM users
                WHERE nome ILIKE ${searchTerm}
                LIMIT ${limit} OFFSET ${offset}
            `;
        } else {
            users = await sql`
                SELECT id, nome, email, avatar_url, bio, cidade, estado, cargo FROM users
                LIMIT ${limit} OFFSET ${offset}
            `;
        }

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const create_new_user = async (user_data) => {

    const { id, email, senha_hash } = user_data;
    const query = await sql`
        INSERT INTO users (id, email, senha_hash)
        VALUES (${id}, ${email}, ${senha_hash})
        RETURNING id
        `;

    return query; // Return the created user object

}

const update_user = async (user_data) => {

    const { id, nome, avatar_url,bio,cidade,estado,cargo } = user_data;
    console.log({ id, nome, avatar_url,bio,cidade,estado,cargo })
    const query = await sql`
        UPDATE users SET nome = ${nome}, avatar_url = ${avatar_url}, 
        bio = ${bio}, cidade = ${cidade}, estado = ${estado}, cargo = ${cargo}
        WHERE id = ${id}
        RETURNING id, email, nome, avatar_url;`;

    return query; // Return the created user object

}

const create_user = async (user_data) => {

    const { id, nome, email, senha_hash, avatar_url, bio, cidade, estado, cargo } = user_data;
    const query = await sql`
        INSERT INTO users (id, nome, email, senha_hash, avatar_url, bio, cidade, estado, cargo)
        VALUES (${id}, ${nome}, ${email}, ${senha_hash}, ${avatar_url}, ${bio}, ${cidade}, ${estado}, ${cargo})
        RETURNING id, nome, avatar_url, bio, cidade, estado, cargo
        `;

    return query; // Return the created user object

}

const delete_user = async (user_id) => {
    try {

        const query = await sql`DELETE FROM users WHERE id = ${user_id} RETURNING id, nome, avatar_url, bio, cidade, estado, cargo`;
        return query;

    } catch (error) {

        console.error('Error deleting user:', error);
        throw new Error('Internal Server Error');
    }
}

const get_user_by_id = async (user_id) => {
    try {
        const query = await sql`SELECT id, nome, avatar_url, bio, cidade, estado, cargo FROM users WHERE id = ${user_id}`;
        return query;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Internal Server Error');
    }
}

//only fetch the id, email and senha_hash, for login purposes
const get_user_by_email = async (email) => {

    try {
        const query = await sql`SELECT id, email, senha_hash FROM users WHERE email = ${email}`;
        return query;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw new Error('Internal Server Error');
    }
}

export default {
    get_users,
    create_user,
    delete_user,
    get_user_by_id,
    get_user_by_email,
    create_new_user,
    update_user

};