const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res
      .status(200)
      .json({ success: false, message: 'Error! Token not provided.' });
  }

  const decodedToken = jwt.verify(token, 'apina');

  if (Date.now() >= decodedToken.exp * 1000) {
    res.status(401).send({
      success: false,
      message: 'Token expired, please log in again, to use the service!',
    });
  }

  req.decoded = decodedToken;
  next();
};

module.exports = {
  verifyToken,
};
