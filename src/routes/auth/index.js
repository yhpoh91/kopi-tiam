import express from 'express';
import validate from 'express-validation';

import controller from './controller';
import validator from './validation';

const router = express.Router();

router.route('/')
  .get((_, res) => res.send('auth router'));

router.route('/login')
  .post(
    validate(validator.login),
    controller.login,
  );

router.route('/consent')
  .post(
    validate(validator.consent),
    controller.consent,
  );

router.route('/register')
  .post(
    validate(validator.register),
    controller.register,
  );

export default router;