import {Router} from 'express';
import AuthController from './controllers/AuthController';
import RecruiterController from './controllers/RecruiterController';

const router = Router();
router.post('/api/recruiters/create/', RecruiterController.create);
router.post('/api/recruiters/auth/', AuthController.authenticate);

export default router