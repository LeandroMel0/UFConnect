import Joi from "joi";
const user_create_schema = Joi.object({

  id: Joi.string().uuid().required(),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'O e-mail deve ser uma string',
      'string.email': 'O e-mail fornecido não é válido',
      'any.required': 'O e-mail é obrigatório',
      'string.empty': 'O e-mail é obrigatório'
      
    }),

  senha_hash: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.base': 'A senha deve ser uma string',
      'string.min': 'A senha deve ter no mínimo 8 caracteres',
      'any.required': 'A senha é obrigatória'
    })

}).required();

const post_schema = Joi.object({

  usuario_id: Joi.string().uuid().required(),
  texto: Joi.string().min(1).max(250).required(),
  tipo: Joi.number().integer().min(0).max(1).required(),
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

const user_update_schema = Joi.object({

  id: Joi.string().uuid().required(),
  nome: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'O nome deve ser uma string',
      'string.min': 'O nome deve ter no mínimo 3 caracteres',
      'string.max': 'O nome pode ter no máximo 100 caracteres',
      'any.required': 'O nome é obrigatório'
    }),

  email: Joi.string()
    .email()
    .messages({
      'string.base': 'O e-mail deve ser uma string',
      'string.email': 'O e-mail fornecido não é válido'
    }),

  avatar_url: Joi.string()
    .uri()
    .optional()
    .allow(null)
    .default(null)
    .messages({
      'string.base': 'O avatar deve ser uma string (URL)',
      'string.uri': 'A URL do avatar não é válida'
    }),

  bio: Joi.string()
    .max(500)
    .required()
    .messages({
      'string.base': 'A biografia deve ser uma string',
      'string.max': 'A biografia pode ter no máximo 500 caracteres',
      'any.required': 'A biografia é obrigatória'
    }),

  cidade: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'A cidade deve ser uma string',
      'string.max': 'A cidade pode ter no máximo 100 caracteres',
      'any.required': 'A cidade é obrigatória'
    }),

  estado: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'O estado deve ser uma string',
      'string.max': 'O estado pode ter no máximo 100 caracteres',
      'any.required': 'O estado é obrigatório'
    }),

  cargo: Joi.string()
    .optional()
    .allow(null)
    .max(200)
    .messages({
      'string.base': 'O cargo deve ser uma string',
      'string.max': 'O cargo pode ter no máximo 200 caracteres'
    })

}).required();



export default {
  user_create_schema,
  post_schema,
  login_schema,
  like_schema,
  user_update_schema

};