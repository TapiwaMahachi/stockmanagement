import express from 'express';
import {all, login ,signup, updateUser} from '../../../controller/users.js';


const router = express.Router();

/*------------Public routes ------------*/
router.post('/signup', signup);
router.post('/login', login);


/*------------Private Routes -----------*/
router.get('/all', all);

router.post('/update/user/:id/', updateUser);


export  {router as userRoutes};