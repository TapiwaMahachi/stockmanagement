 import Joi from '@hapi/joi';


/**
 * registration input details validation
 * @param {objetc} data 
 */
const userRegistrationValidation =(data)=>{
    
    //schema for validation
    const schema = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required(),
    admin: Joi.boolean()
    });
    
   return  schema.validate(data)
}

/**
 * login input details validation
 * @param {object} data 
 */
const loginValidation =(data)=>{
    
    //schema for validation
    const schema = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required(),
    admin: Joi.boolean(),
    });

   return  schema.validate(data)
}


 export {userRegistrationValidation, loginValidation };