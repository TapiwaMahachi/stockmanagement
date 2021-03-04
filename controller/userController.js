import User from '../models/user.js';
import {body , validationResult} from 'express-validator';


export {
    login_user,
    create_user
}

//handle create user on POST
 const create_user =[
      //validate and sanitize input 
    body('name', 'Invalid name').trim().isLength({min:2}).escape(),
    body('email', 'Invalid email').isEmail().normalizeEmail(),
    body('password','Invalid password').isLength({min:6}),

    async (req, res, next) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.status(401).send({errors: errors.array()});
        }

        //check if user exists
        const user = User.findOne({email: req.body.email}).exec();
        if(user){
            const err = new Error('User Already Exists');
            return next(err)
        }
        User.create(req.body , (err, data)=>{
            if(err) return next(err);
            res.status(201).send(data);
        })
    }

 ]

//handle user login on POST
const login_user =[

      //validate and sanitize input 
    body('name', 'Invalid name').trim().isLength({min:2}).escape(),
    body('email', 'Invalid email').isEmail().normalizeEmail(),
    body('password','Invalid password').isLength({min:6}),

    async (req, res, next) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.status(401).send({errors: errors.array()});
        }

        //check if user exists
        const user = User.findOne({email: req.body.email}).exec();
        if(!user){
            const err = new Error('User does not xxists');
            return next(err)
        }
        //validate password
        res.status(201).send(user)
    }
]