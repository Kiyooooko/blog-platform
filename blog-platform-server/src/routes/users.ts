import { Router } from 'express';

import { adminAuth } from '../controllers/auth';
import { updateUser, deleteUser, getUsers } from '../controllers/users';

const router = Router();

router.get('/users', adminAuth, getUsers);
router.put('/user/:id', adminAuth, updateUser);
router.delete('/user/:id', adminAuth, deleteUser);

export default router;
