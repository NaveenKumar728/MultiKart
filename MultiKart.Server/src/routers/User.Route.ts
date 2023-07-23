import express from 'express';
import { getUsers } from '../controller/User.Controller';

const router = express.Router();

router.get('/users', getUsers)

export default router;