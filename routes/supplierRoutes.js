import express from 'express';
import {all_suppliers ,  add_supplier} from '../controller/supplierController.js';

const router = express.Router();

//get all suppliers
router.get('/all', all_suppliers);

//add new supplier
router.post('/supplier/create', add_supplier);


export  {router as supplierRoutes};