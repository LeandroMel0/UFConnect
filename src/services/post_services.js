import post_model from "../models/post_model.js";  
import schema from '../utils/joi_validation.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const get_usesr_posts = async (page, limit, usuario_id) => {
    try {
        const posts = await post_model.get_usesr_posts(page, limit, usuario_id);
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Internal Server Error');
    }
}

const get_posts = async (page, limit, search,tipo) => {
    try {
        const posts = await post_model.get_posts(page, limit, search,tipo);
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Internal Server Error');
    }
}

const create_post = async (request) => { 

    request.body.img = request.file ? request.file.path : null; 
    const post_data = request.body; // Get user data from the request body
    request.body.usuario_id = request.usuario_id; // Attach the user ID from the request object
    let imageUrl = null; // Initialize imageUrl to null

    if(post_data.img != null){
        const baseUrl = `${request.protocol}://${request.get('host')}`;
        imageUrl = `${baseUrl}/uploads/${request.file.filename}`;
    }
    post_data.imagem_url = imageUrl || null; // Set the image URL if an image was uploaded

    delete post_data.img; // Remove the avatar field from the user data


    //precisa validar usuario_id 
    const { error, value} = schema.post_schema.validate(post_data);
    if (error) {
        
        if(imageUrl !== null) {
            delete_img(imageUrl);
        }

        // Send validation error for post data
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        throw validationError;

    }

    const newPost = await post_model.create_post(value);
    return newPost;

}

const delete_post = async (post_id) => {
    try {
        const deletedPost = await post_model.delete_post(post_id);

        if (!deletedPost) {
            throw new Error('Error deleting post');
        }else if (deletedPost.length === 0 || deletedPost == null) {
             return null; // User not found
        }
        
            
        //deleta o arquivo se existir
        if(deletedPost[0].imagem_url !== null && deletedPost[0].imagem_url !== undefined) {
        
            delete_img(deletedPost[0].imagem_url);
        
        }

        return deletedPost;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

const get_post_by_id = async (post_id) => {
    try {
        const post = await post_model.get_post_by_id(post_id);
        if (!post || post.length === 0) {
            return null; // Post not found
        }
        return post;
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        throw new Error('Internal Server Error');
    }
}







const delete_img = (imageUrl) => {

            const myURL = new URL(imageUrl);
            const filename = path.basename(myURL.pathname);
            const filePath = path.join(__dirname, '..', 'uploads', filename);
        
            fs.unlinkSync(filePath);
}



export default {
    get_usesr_posts,
    get_posts,
    create_post,
    delete_post,
    get_post_by_id
};