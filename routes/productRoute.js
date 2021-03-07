import express from 'express';
import Product from '../models/product.js';
import Supplier from '../models/supplier.js'
import verifyUser from './verifyToken.js';


const router = express.Router();

//get all products
router.get('/all',(req, res, next)=>{
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

    Product.findById({_id: req.params.id})
     .populate('supplier') //associating our product with the supplier
     .exec( (err, product)=>{

         //findind suppliers not in our product supplier list
          Supplier.find({_id : {$nin : product?.supplier}},(err, suppliers)=>{
       
          if(err){
           return next(err) 
           }
           if(product === null){
            var err = new Error("Product not found")
            err.status = 404;
            next(err)
           }
           res.status(201).send(product)
        })
        
    })
})

//add product to db
router.post('/add',verifyUser,(req, res, next) =>{

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