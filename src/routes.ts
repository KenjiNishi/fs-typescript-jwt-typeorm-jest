import {Router} from 'express';
import AuthController from './controllers/AuthController';
import RecruiterController from './controllers/RecruiterController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();
router.post('/api/recruiters/create/', RecruiterController.create);
router.post('/api/recruiters/auth/', AuthController.authenticate);

router.get('/api/candidates/list/', authMiddleware, RecruiterController.list);

export default router