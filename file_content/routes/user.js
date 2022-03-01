import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import authenticate from '../utils/authenticate';

router.route('/')
  .get(authenticate, userController.getCurrentUser)
  .post(userController.register);

router.post('/login', userController.login);

router.route('/:id')
  .put(authenticate, userController.update)
  .delete(authenticate, userController.delete);

export default router;
