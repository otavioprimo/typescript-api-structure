/**
 * @description Wraper of all routes
 * */
import { Router } from 'express';
import userRoute from './v1/user/user.routes';

const router: Router = Router();

router.use(userRoute);

export default router;
