const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res, next) => {
  let { email, password } = req.body;

  let existingUser;
  let passwordMatch = false;
  try {
    const userQueryText = 'SELECT * FROM kayttaja WHERE email = ($1)';
    const { rows } = await db.query(userQueryText, [email]);
    existingUser = rows[0];
    passwordMatch = await bcrypt.compare(password, existingUser.salasana);
  } catch {
    res.status(400).send('Käyttäjätunnus tai salasana väärin!');
    const error = 'Tapahtui virhe!';
    return next(error);
  }
  if (!existingUser || !passwordMatch) {
    const error = Error(
      'Väärät kirjautumistiedot! Tarkista sähköposti sekä salasana ja yritä uudestaan.'
    );
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'apina',
      { expiresIn: '1h' }
    );
  } catch (err) {
    console.error(err);
    const error = new Error('Virhe! Jotain meni pieleen kirjautuessa.');
    return next(error);
  }

  res.status(200).json({
    success: true,
    user: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
});

module.exports = router;
