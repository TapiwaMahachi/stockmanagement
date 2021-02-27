import express from 'express';
import Product from '../models/product.js';
import verifyUser from './verifyToken.js';

const router = express.Router();

//get all products
router.get('/all', (req, res)=>{
    
    Product.find((err, data)=>{
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(data);
    })

})
//get product
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

//add product to db
router.post('/add',verifyUser, (req, res) =>{

    //verifying if the user is admin
    const {admin} = req.user;
    if(!admin)
        return res.status(403).send('Not an admin')

    //getting the product from the body
    const product = req.body;

    //add  product to the database
    Product.create(product,(err, data)=>{
        if(err)
            res.status(500).send(err);
        else
            res.status(201).send(data);
    });
})

//updating product
router.put('/product/update/:id',verifyUser,  (req, res)=>{

     //verifying if the user is admin
    const {admin} = req.user;
    if(!admin)
        return res.status(403).send('Not an admin');

    //get the new product from the body
    const product = req.body;
    //get product id from url
    const id = req.params.id

    //find the product using id
    Product.updateOne({_id: id}, {...product},(err , data)=>{
        if(err)
          res.status(500).send(err);
        else
          res.status(201).send(data);
    });

})
//delete product
router.delete('/product/delete/:id',verifyUser, (req, res)=>{

     //verifying if the user is admin
    const {admin} = req.user;
    if(!admin)
        return res.status(403).send('Not an admin');

    //get product id from url
    const id = req.params.id;
    //delete using id
    Product.deleteOne({_id: id}, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

export { router as prodRoute};