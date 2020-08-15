import express from 'express';
import validate from 'express-validation';

import controller from './controller';
import validator from './validation';

const router = express.Router();

router.route('/')
  .get((_, res) => res.send('sample router'));

router.route('/sample')
  .get(
    validate(validator.sample),
    controller.sample,
  );

export default router;