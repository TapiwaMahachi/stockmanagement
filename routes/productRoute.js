import express from 'express';
import Product from '../models/product.js';
import verifyUser from './verifyToken.js';


const router = express.Router();

//get all products
router.get('/all', verifyUser,(req, res, next)=>{
     //verifying if the user is admin
   
    Product.find({}, (err, data)=>{

        if(err){return next(err)} 
        else{  
         res.status(200).send(data);
        }
    })
})
//get product
router.get('/product/:id',(req, res, next)=>{

    Product.findById({_id: req.params.id} , (err, data)=>{
        if(err){
           return next(err) 
        }
        if(data === null){
            var err = new Error("Product not found")
            err.status = 404;
            next(err)
        }
        
         res.status(201).send(data)
        
    })
})

//add product to db
router.post('/add',verifyUser,(req, res, next) =>{

    //verifying if the user is admin
    const {admin} = req.user;
    if(!admin){
        const err = new Error('User is not admin');
        err.status = 403;
        next(err)
    }

    //add  product to the database
    Product.create( req.body ,(err, data)=>{
        if(err)
           return next(err)
        else
            res.status(201).send(data);
    });
})

//updating product
router.put('/product/update/:id',verifyUser,  (req, res, next)=>{

     //verifying if the user is admin
    const {admin} = req.user;

     if(!admin){
        const err = new Error('User is not admin');
        err.status = 403;
        next(err)
    }
    //find the product using id
    Product.updateOne({_id: req.params.id},
         //spread syntax
         {...req.body},
         (err , data)=>{

        if(err){return next(err)}
        else{ res.status(201).send(data)};
    });

})
//delete product
router.delete('/product/delete/:id', verifyUser, (req, res,next)=>{

    //verifying if the user is admin
    const {admin} = req.user;
    if(!admin){
        const err = new Error('User is not admin');
        err.status = 403;
        next(err)
    }

    //delete using id
    Product.deleteOne({_id: req.params.id}, (err,data)=>{
        if(err){
            return next(err)
        }else{
            res.status(201).send(data)
        }
    })
})

export { router as prodRoute};