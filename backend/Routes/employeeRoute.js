import express from 'express'
import { create, deleteEmployee, getAll, getById, getUser, update } from '../controller/employee.js'
import { auth, isAdminOrHR } from '../middleware/auth.js'
const router = express.Router()


router.post('/', auth, isAdminOrHR, create);
router.get('/', auth, getUser)
router.get('/all', auth, getAll);
router.get('/:id', auth, isAdminOrHR, getById);
router.put('/:id', auth, isAdminOrHR, update);
router.delete('/:id', auth, isAdminOrHR, deleteEmployee);


export default router;