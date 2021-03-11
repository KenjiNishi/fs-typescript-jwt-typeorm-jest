import {Router} from 'express';
import authMiddleware from './middlewares/authMiddleware';
import AuthController from './controllers/AuthController';
import RecruiterController from './controllers/RecruiterController';
import CandidateController from './controllers/CandidateController';


const router = Router();
router.post('/api/recruiters/create/', RecruiterController.create);
router.post('/api/recruiters/auth/', AuthController.authenticate);

router.post('/api/candidates/create/', CandidateController.create);
router.get('/api/candidates/get/:id', CandidateController.getOne);
router.put('/api/candidates/update/:id', CandidateController.update);
router.delete('/api/candidates/delete/:id', CandidateController.delete);
router.get('/api/candidates/list/', CandidateController.list);
// router.get('/api/candidates/list/', authMiddleware, CandidateController.list);

export default router