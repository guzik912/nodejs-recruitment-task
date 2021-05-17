const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const isValidate = require('../middlewares/isValidate');
const isAuth = require('../middlewares/isAuth');
const moviesController = require('../controllers/movies');

router.get('/', isAuth, moviesController.getMovies);
router.post(
  '/',
  isAuth,
  isValidate([
    body('title').not().isEmpty().trim().withMessage('Title can not be empty.'),
  ]),
  moviesController.createMovie
);

module.exports = router;
