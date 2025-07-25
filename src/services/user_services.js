import user_sql from '../models/user_model.js';
import schema from '../utils/joi_validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const get_users = async (page, limit, search) => {
    try {
        const users = await user_sql.get_users(page, limit, search);
        return users;

    } catch {
        throw new Error('Internal Server Error');
    }


};

const create_new_user = async (request) => {

    let user_data ={};
    user_data.email = request.email
    user_data.id = uuidv4();
    user_data.senha_hash = request.password
    console.log(user_data)

    const { error, value } = schema.user_create_schema.validate(user_data);

    // If validation fails, error will contain the details

    if (error) {
        //Sendo validation error
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        throw validationError;
    } else {
        const salt = await bcrypt.genSalt(10);
        value.senha_hash = await bcrypt.hash(value.senha_hash, salt);
    }

    try {
        const new_user = await user_sql.create_new_user(value);
        return new_user;
    } catch (error) {
        if (error.code === '23505') {
            // Unique constraint violation (e.g., email already exists)
            const uniqueError = new Error('Email already exists');
            uniqueError.statusCode = 409;
            throw uniqueError;
        } else {
            console.error('Error creating user:', error);
            throw new Error('Internal Server Error');
        }

    }


}

const update_user = async (request) => {

    //console.log(request.body)
    request.body.avatar = request.file ? request.file.path : null;
    const user_data = request.body; // Get user data from the request body

    let imageUrl = null; // Initialize imageUrl to null

    if (user_data.avatar != null) {
        const baseUrl = `${request.protocol}://${request.get('host')}`;
        imageUrl = `${baseUrl}/uploads/${request.file.filename}`;
    }
    user_data.avatar_url = imageUrl || null; // Set the image URL if an image was uploaded

    delete user_data.avatar; // Remove the avatar field from the user data
    user_data.id = request.usuario_id

    console.log(user_data)
    const { error, value } = schema.user_update_schema.validate(user_data);

    // If validation fails, error will contain the details

    if (error) {
        //Sendo validation error
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        throw validationError;

    } else {

        // create the user in the database
        try {
            const new_user = await user_sql.update_user(value);
            return new_user;
        } catch (error) {

            console.error('Error creating user:', error);
            throw new Error('Internal Server Error');


        }

    }
}

const delete_user = async (user_id) => {

    try {
        const deletedUser = await user_sql.delete_user(user_id);
        if (!deletedUser) {
            throw new Error('Error deleting user');
        } else if (deletedUser.length === 0 || deletedUser == null) {
            return null; // User not found
        }


        //deleta o arquivo de avatar se existir
        if (deletedUser[0].avatar_url !== null && deletedUser[0].avatar_url !== undefined) {

            const myURL = new URL(deletedUser[0].avatar_url);
            const filename = path.basename(myURL.pathname);
            const filePath = path.join(__dirname, '..', 'uploads', filename);

            fs.unlinkSync(filePath);

        }
        return deletedUser;

    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Internal Server Error');
    }
}

const get_user_by_id = async (user_id) => {
    try {
        const user = await user_sql.get_user_by_id(user_id);
        if (!user || user.length === 0) {
            return null; // User not found
        }
        return user;

    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Internal Server Error');
    }
}

const login = async (request) => {

    const { error, value } = schema.login_schema.validate(request);

    if (error) {
        // If validation fails, throw an error with the validation message
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        throw validationError;

    }

    const { email, password} = value;

    const user = await user_sql.get_user_by_email(email);
    if (!user || user.length === 0) {
        return null; // User not found
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user[0].senha_hash);
    if (!isMatch) {
        return null; // Password or email dont match
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION // Token expiration time
    });
    const user_id =user[0].id;
    return {token, user_id}; // Return the user object if login is successful

}


export default {
    get_users,
    update_user,
    delete_user,
    get_user_by_id,
    login,
    create_new_user
};