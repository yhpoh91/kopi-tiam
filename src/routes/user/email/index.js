import express from 'express';
import validate from 'express-validation';

import controller from './controller';
import validator from './validation';

const router = express.Router();

router.route('/')
  .get((_, res) => res.send('user email router'));

router.route('/:emailId')
  .get((_, r) => r.send('ok'))
  .put((_, r) => r.send('ok'))
  .delete((_, r) => r.send('ok'));

export default router;