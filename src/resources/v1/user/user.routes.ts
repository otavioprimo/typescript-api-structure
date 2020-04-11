import { Router } from 'express';
import userController from './user.controller';

const router: Router = Router();

router.post('/', userController.test);

router.post('/v1/login', userController.login);

router.use('/v1/user', router);
export default router;
