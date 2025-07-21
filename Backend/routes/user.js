
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers
  
} from '../controllers/userController.js';

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();


router.get('/',verifyAdmin,  getAllUsers);

router.get('/:id',verifyUser, getUserById);

router.put('/:id',verifyUser, updateUser);

router.delete('/:id',verifyUser,deleteUser)

router.get('/search',verifyUser, searchUsers);

export default router;
