const db = require('../db');

const isAdmin = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM kayttaja WHERE email = $1', [
      req.decoded?.email,
    ]);
    const isAdmin = result.rows[0].admin;
    if (isAdmin) {
      return next();
    }
    res.status(403).send('Ei oikeuksia tähän toimintoon!');
  } catch (error) {
    console.error('Virhe adminin tarkistuksessa', error);
    res.status(500).send('Virhe admin oikeuksien tarkistuksessa');
  }
};

module.exports = {
  isAdmin,
};
