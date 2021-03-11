import {Router} from 'express';
import authMiddleware from './middlewares/authMiddleware';
import AuthController from './controllers/AuthController';
import RecruiterController from './controllers/RecruiterController';
import CandidateController from './controllers/CandidateController';


const router = Router();
router.post('/api/recruiters/create/', RecruiterController.create);
router.post('/api/recruiters/auth/', AuthController.authenticate);

router.post('/api/candidates/create/', authMiddleware, CandidateController.create);
router.get('/api/candidates/get/:id', authMiddleware, CandidateController.getOne);
router.put('/api/candidates/update/:id', authMiddleware, CandidateController.update);
router.delete('/api/candidates/delete/:id', authMiddleware, CandidateController.delete);
router.get('/api/candidates/list/', authMiddleware, CandidateController.list);

export default router