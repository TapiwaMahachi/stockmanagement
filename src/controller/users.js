import User from '../models/user.js';
import {body , validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';


export {
    login,
    signup,
    all,
    deleteUser,
    updateUser
}

//handle create user on POST
const signup =[

    //validate and sanitize input 
    body('name', 'Invalid name').trim().isLength({min:2}).escape(),
    body('email', 'Invalid email').isEmail().normalizeEmail(),
    body('password','Invalid password').isLength({min:6}),

    async (req, res, next) =>{

        const errors = validationResult(req);

        if(!errors.isEmpty())
            res.status(401).send({errors: errors.array()});
        
        //check if user exists
        const userExist = await User.findOne({email: req.body.email});
        if(userExist)
             return next(new Error('User already exists'));
       
        const user = new User(req.body);
        user.save()
        .then(user => res.status(201).send(user))
        .catch(err => res.status(400).json(err));
    }

]

//handle user login on POST
const login =[

    //validate and sanitize input 
    body('name', 'Invalid name').trim().isLength({min:2}).escape(),
    body('email', 'Invalid email').isEmail().normalizeEmail(),
    body('password','Invalid password').isLength({min:6}),

    async (req, res, next) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.status(401).send({errors: errors.array()});
        }
        const user =  await User.findOne({email: req.body.email});
        if(!user)
            return next(new Error('User does not exist'));
        
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(isMatch){
                const token = jwt.sign(
                    {user},
                    process.env.TOKEN_SECRET,
                    {expiresIn: '24h'}
                )
                res.json({token});
            }else{
                return next(new Error('bad credentials'));
            }
        })   
    }
]

//get all users
const all = (req, res, next)=>{
    User.find({}, (err, user)=>{
        if(err) return next(err);
        res.json(user)
    });
};

//delete user
const deleteUser =(req, res, next)=>{
   User.deleteOne({id: req.params.id},(err)=>{
       if(err) return next(err)
       res.status(201).send('user deleted');
   });
};
//update User
const updateUser =[

    //validate and sanitize
    body('name',"Invalid name").isLength({min:2}).escape().trim(),
    body('email',"Invalid email").isEmail().normalizeEmail(),
    body('password', 'Invalid password').isLength({min:6}),

    async (req, res, next)=>{
  
        const errors = validationResult(req.body);
        if(!errors.isEmpty())
            return next(new Error({error: errors.array()}));

        // User.updateOne({_id: req.params.id}, (err, user)=>{

        //     if(err) return next(err)

        //     user.comparePassword(req.body.password, (err, isMatch)=>{
        //         if(isMatch){
        //             user.save();
        //         }
        //     })
        // })
        
        const oldUser = await User.findById({_id: req.params.id});
        const newUser = new User({...oldUser, ...req.body, _id: req.params.id});
        newUser.save()
        .then(user => res.json(user))
        .catch(err =>{
            return next(new Error('Failed to update user'));
        });
        
       

    }

]