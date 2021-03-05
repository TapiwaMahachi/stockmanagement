import express from 'express';
import {all_suppliers ,  create_supplier, add_supplier} from '../controller/supplierController.js';

const router = express.Router();

//get all suppliers
router.get('/suppliers/all', all_suppliers);

//add new supplier
router.post('/suppliers/supplier/create', create_supplier);

//route to associate our supplier to the product
router.post('/suppliers/product/:id/supplier', add_supplier);

export  {router as supplierRoutes};