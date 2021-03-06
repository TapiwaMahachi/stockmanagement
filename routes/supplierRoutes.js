import express from 'express';
import {all_suppliers ,  create_supplier, add_supplier} from '../controller/supplierController.js';

const router = express.Router();

//get all suppliers
router.get('/all', all_suppliers);

//add new supplier
router.post('/supplier/add', create_supplier);

//route to associate our supplier to the product
router.post('/supplier/product/:id/', add_supplier);

export  {router as supplierRoutes};