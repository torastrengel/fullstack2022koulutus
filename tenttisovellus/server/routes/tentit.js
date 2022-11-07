const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const text = 'SELECT * FROM tentti ORDER BY id ASC';
    const { rows } = await db.query(text);
    res.send(rows);
  } catch (error) {
    console.error('Tenttidatan haussa ongelma:', error);
  }
  // db.end();
});

router.post('/', async (req, res) => {
  try {
    const values = [
      'Maantieto',
      'Maantiedon tentti, jossa erotellaan jyvät kanoista vai mitenkä se meni',
      false,
      '04.11.2022',
      50,
    ];
    const text =
      'INSERT INTO tentti (nimi, kuvaus, voimassaolo, pvm, max_pisteet) VALUES ($1, $2, $3, $4, $5)';
    await db.query(text, values);
  } catch (error) {
    res.status(500).send('Tentin tallennuksessa ilmeni virhe.');
  }
});

module.exports = router;
