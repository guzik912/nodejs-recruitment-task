const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const isValidate = require('../middlewares/isValidate');
const authController = require('../controllers/auth');

router.post(
  '/',
  isValidate([
    body('username').not().isEmpty().trim().withMessage('Username can not be empty.'),
    body('password').not().isEmpty().trim().withMessage('Password can not be empty.'),
  ]),
  authController.authUser
);

module.exports = router;
