import user_services from "../services/user_services.js";

const get_users = async (req, res) => {

    try {

        const { page = 1, limit = 10, search = '' } = req.query;

        const users = await user_services.get_users(page, limit, search);

        return res.status(200).json(users);

    } catch (error) {

        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }

};

const create_user = async (req, res) => {
    try {

        const newUser = await user_services.create_new_user(req.body);
        return res.status(201).json({ user: newUser });


    } catch (error) {
        if (error.code === '23505') {
            // Unique constraint violation (e.g., email already exists)
            return res.status(409).json({ error: 'Este e-mail já está em uso!' });
        }
        const status = error.statusCode || 500;
        res.status(status).json({ error: error.message || 'Erro interno' });

    }
}

const update_user = async (req, res) => {
    try {
        console.log("test")
        const User = await user_services.update_user(req);
        return res.status(201).json({ user: User });

    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).json({ error: error.message || 'Erro interno' });

    }


}

const delete_user = async (req, res) => {
    const user_id = req.params.id;
    try {

        //call the service to delete the user
        const deletedUser = await user_services.delete_user(user_id);

        if (!deletedUser || deletedUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // send confirmation to reply
        return res.status(200).json({ message: `User with ID ${user_id} deleted successfully` });

    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const get_user_by_id = async (req, res) => {
    const user_id = req.params.id;
    try {
        const user = await user_services.get_user_by_id(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user[0]);
    } catch {
        //console.error('Error fetching user by ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const login = async (req, res) => {
    // Implement login logic here
    const userData = await user_services.login(req.body);

    if (!userData) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const {token,user_id} = await user_services.login(req.body);

    res.status(200).json({ 'token': token, "id":user_id });
}

export default {
    get_users,
    create_user,
    delete_user,
    get_user_by_id,
    login,
    update_user
};