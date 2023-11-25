import { Router } from 'express';
import { get, getAll, create, update, remove } from '../controllers/contacts.controller.js';
import pool from '../config/database.js';
import { verifyToken } from '../middlewares/authJwt.js';

const router = Router();

// router.get('/', (req, res) => res.redirect('/home'))

// router.get('/home', async (req, res) => res.render('home', {
//    contacts: (await pool.query('SELECT * FROM contacts'))[0]
// }))

router.get('/contacts/:id', verifyToken, get)

router.get('/contacts', verifyToken, getAll)

router.post('/contacts', verifyToken, create)

router.put('/contacts/:id', verifyToken, update)

router.delete('/contacts/:id', verifyToken, remove)

export default router
