import express from 'express';

import authRouter from './auth';
import userRouter from './user';
import profileRouter from './profile';

const router = express.Router();

router.get('/', (_, res) => res.send('meow1123'));
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/profile', profileRouter);

export default router;