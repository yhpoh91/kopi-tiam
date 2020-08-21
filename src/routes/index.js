import express from 'express';

import authRouter from './auth';
import userRouter from './user';
import sampleRouter from './sample';

const router = express.Router({ mergeParams: true });

router.get('/', (_, res) => res.send('root router'));
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/sample', sampleRouter);

export default router;