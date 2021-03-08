import {Router} from 'express';
import RecruiterController from './controllers/RecruiterController';

const router = Router();
router.post('/api/recruiters/create/', RecruiterController.create);

export default router