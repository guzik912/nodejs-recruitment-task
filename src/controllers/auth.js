const { authFactory, AuthError } = require('../services/auth');
const { validationResult } = require('express-validator');
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET env var. Set it and restart the server');
}

const auth = authFactory(JWT_SECRET);

exports.authUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({ error: errors.array() });
  }

  const { username, password } = req.body;


  try {
    const token = auth(username, password);

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    next(error);
  }
};
