import express from 'express';
import Product from '../models/product.js';
import verifyUser from './verifyToken.js';

const router = express.Router();

//route to get all products from the database all users
router.get('/all', (req, res)=>{
    
    Product.find((err, data)=>{
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(data);
    })

})
//route to get one product - only verified users
router.get('/product/:id',(req, res)=>{
    const id = req.params.id;
    Product.findById(id,(err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

//route to add a new product in the database - only verified users
router.post('/add',verifyUser, (req, res) =>{

    //verifying if the user is admin
    const {admin} = req.user;
    if(!admin)
        return res.status(403).send('Not an admin')

    //getting the product from the body
    const product = req.body;

    //create the product in the database
    Product.create(product,(err, data)=>{
        if(err)
            res.status(500).send(err);
        else
            res.status(201).send(data);
    });
})
//edit the product - needs fixing not working git user must be verified to update
router.put('/product/update/:id',verifyUser,  (req, res)=>{

     //verifying if the user is admin
    const {admin} = req.user;
    if(!admin)
        return res.status(403).send('Not an admin');

    //get the new product from the body
    const product = req.body;
    //get product id from url
    const id = req.params.id

    //find the product from the database and update it using spread syntax
    Product.updateOne({_id: id}, {...product},(err , data)=>{
        if(err)
          res.status(500).send(err);
        else
          res.status(201).send(data);
    });

})
//deleting the product user must be veryfied to delete
router.delete('/product/delete/:id',verifyUser, (req, res)=>{

     //verifying if the user is admin
    const {admin} = req.user;
    if(!admin)
        return res.status(403).send('Not an admin');
    //get product id from url
    const id = req.params.id;
    
    Product.deleteOne({_id: id}, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

export { router as prodRoute};