import express from 'express';
import validate from 'express-validation';

import controller from './controller';
import validator from './validation';

import addressRouter from './address';
import emailRouter from './email';
import phoneNumberRouter from './phoneNumber';

const router = express.Router({ mergeParams: true });

router.route('/')
  .get((_, res) => res.send('user router'));

router.use('/addresses', addressRouter);
router.use('/emails', emailRouter);
router.use('/phoneNumbers', phoneNumberRouter);

router.route('/:userId')
  .get((_, r) => r.send('ok'))
  .put((_, r) => r.send('ok'))
  .delete((_, r) => r.send('ok'));

export default router;