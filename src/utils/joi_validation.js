import Joi from "joi";
const user_schema = Joi.object({

  id: Joi.string().uuid().required(),
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  senha_hash: Joi.string().min(8).required(),
  avatar_url: Joi.string().uri().required().optional().allow(null),
  bio: Joi.string().max(500).required(),
  cidade: Joi.string().required(),
  estado: Joi.string().required(),
  cargo: Joi.string().optional().required().allow(null)

}).required();

const post_schema = Joi.object({

  usuario_id: Joi.string().uuid().required(),
  texto: Joi.string().min(1).max(250).required(),
  imagem_url: Joi.string().uri().required().optional().allow(null),

}).required();

const login_schema = Joi.object({

  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()

}).required();


const like_schema = Joi.object({

  usuario_id: Joi.string().uuid().required(),
  postagem_id: Joi.string().uuid().required()

}).required();

export default {
  user_schema,
  post_schema,
  login_schema,
  like_schema

};