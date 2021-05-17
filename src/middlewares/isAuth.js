const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provide.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ message: 'Token authenticate is denied.' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};