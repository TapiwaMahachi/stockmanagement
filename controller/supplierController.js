import express from 'express'
import {body, validationResult} from 'express-validator';
import Supplier from '../models/supplier.js';
import Product from '../models/product.js';

export  {
    all_suppliers ,
    create_supplier, 
    add_supplier
}

//handle supplier get 
const all_suppliers=(req, res, next)=>{

   Supplier.find({}, (err, data)=>{
       if(err) return next(err);
       res.status(201).send(data);
   })
}

//handle supplier create on POST
const create_supplier =[

    //validate and sanitize the results
    body('name', 'Enter valid supplier name').trim().isLength({min: 1}).escape(),
    body('email','Invalid Email').isEmail().normalizeEmail(),

     async (req, res, next) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(401).send({errors: errors.array()})
        } 
        else{

            //check if supplier exists
            const supplier =  await Supplier.findOne({email: req.body.email});

            if(supplier){
                const err =  new Error('Supplier Already Exists')
                return next(err);
            }
            
            Supplier.create(req.body, (err, data)=>{
                if(err) return next(err);
                res.status(201).send(data)
            });
        }

    }
]

//associating our suplier to the product
const add_supplier =(req, res, next)=>{
    
    Product.findById({_id: req.params.id},(err, product)=>{

        if(err) return next(err);

        product.supplier.push(req.body.supplier);
        console.log(`Supplier from the body ${req.body}`)
        product.save(function(err){
            if(err) return next(err)
            res.status(201).send('sucesss')
        });
    })
}