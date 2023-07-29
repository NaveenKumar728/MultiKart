import express from 'express';
import { createUser, getUserById, getUsers, updateUser } from '../controller/User.Controller';

const router = express.Router();

router.get('/users', getUsers)
router.post('/user', createUser)
router.get('/user/:id', getUserById)
router.put('/user/:id', updateUser)

export default router;