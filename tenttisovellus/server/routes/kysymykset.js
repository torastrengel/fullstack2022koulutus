const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const text = 'SELECT * FROM kysymys ORDER BY id ASC';
    const { rows } = await db.query(text);
    res.send(rows);
  } catch (error) {
    console.error('Tenttikysymysten haussa ilmeni ongelma:', error);
  }
  // db.end();
});

router.post('/', async (req, res) => {
  try {
    const uusiKysymys = ['Mikä on Suomen pääkaupunki?'];
    const text = 'INSERT INTO kysymys (kysymys) VALUES ($1)';
    await db.query(text, uusiKysymys);
    res.status(200).send('Tenttikysymys tallennettu onnistuneesti ✅');
  } catch (error) {
    res.status(500).send('Tenttikysymyksen tallentamisessa ilmeni ongelma');
  }
  // db.end();
});

module.exports = router;
