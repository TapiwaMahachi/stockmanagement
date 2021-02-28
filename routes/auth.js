import express from 'express';
import User from '../models/user.js';
import {userRegistrationValidation, loginValidation}  from '../validation.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyUser from './verifyToken.js';

const router = express.Router();

//register users
router.post('/register',verifyUser, async (req, res)=>{
     
    //validating the user input details
    const {error} = userRegistrationValidation(req.body);
     if(error) 
        return res.status(400).send(error.details[0].message);
     
     //checking if user already exists in the database
     const emailExist = await User.findOne({email: req.body.email});
     if(emailExist) 
        return res.status(400).send('Email already exists');
     
     //harshing the password
     const hashPassword  =  bcrypt.hashSync(req.body.password, 10);

     //getting user from the body and replacing the password with the new hashed password
    const user = {...req.body, password: hashPassword};

    //creating a user
     User.create(user, (err, user)=>{
         if(err){
             res.status(400).send(err)
         }
         else{
             //sending back the created user just the id and name only for security reasons
             res.status(201).send({user: user.id, name: user.name});
         }
     })

})

//login
router.post('/login',  async (req, res)=>{

    //validate the user details 
    const {error} = loginValidation(req.body);
    if(error) 
        return res.status(400).send(error.details[0].message);

     //checking if user exists in the database- if not return 
     const user = await User.findOne({email: req.body.email});
     if(!user) 
        return res.status(400).send('Email or Password is wrong');

    //check if password is correct - if not return 
    //--using bcrypt to compare the password entered against the hashed password stored in the db
    const validPassword =  bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword) 
        return res.status(400).send('Invalid Password');
    
    //creating and signing a token  with JWT 
    const token = jwt.sign(
        {_id: user._id, admin: user.admin}, 
        process.env.TOKEN_SECRET,
        {expiresIn: 86400}
    );

    //adding the token to the cookies 
    //httpOnly to makes sure its only availble on the server
    res.cookie('jwt',token, {httpOnly: true})
     
    //sending a few user details excluding password
    res.send({name: user.name, id: user._id, admin: user.admin});

})
//get all users
router.get('/all',verifyUser, (req, res)=>{

    const admin =req.user.admin;
    if(!admin){
        res.status(403).send('Access Denied')
    }
    //get all the Users
    User.find((err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        };
    });
});

//get user
router.get('/user/:id',verifyUser, (req, res)=>{

     const id = req.params.id;

     User.findById(id, (err, data)=>{
         if(err)
            res.status(500).send(err);
        else
            res.status(201).send(data);
     });
});

router.put('/user/update/:id',verifyUser,async (req, res)=>{

    //verifying if the user is admin
    const {admin} = req.user;
    if(!admin)
        return res.status(403).send('Not an admin');

    //id from the url
    const id = req.params.id;
   
    //check if the password exists if not hash the new password
    const passwordExist = await User.findOne({password: req.body.password});
   
    if(!passwordExist){
        const hash = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hash;
    }
    
    User.updateOne({_id: id},{...req.body},(err, data)=>{
        if(err)
            res.status(500).send(err);
        else
            res.status(201).send(data);
    });
});

router.delete('/user/delete/:id',verifyUser,(req, res)=>{

    //verifying if the user is admin
    const {admin} = req.user;
    if(!admin)
        return res.status(403).send('Not an admin');
    
    //id from the url
    const id = req.params.id;

    User.deleteOne({_id: id},(err, data)=>{
        if(err)
            res.status(500).send(err);
        else
            res.status(201).send(data);
    });
});

export {router as authRoute};  