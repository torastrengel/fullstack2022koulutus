const express = require('express');
const router = express.Router();
const db = require('../db');

// Hae kaikki tentit
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

// Lisää uusi tentti
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
    res.status(200).send('Tentti lisätty onnistuneesti! ✅')
  } catch (error) {
    res.status(500).send('Tentin tallennuksessa ilmeni virhe:', error);
  }
});

// Poista tentti ID:n avulla
router.delete('/:id', async (req, res) => {
  try {
    const text = 'DELETE FROM tentti WHERE id = ($1)';
    await db.query(text, [req.params.id]);
    res
      .status(200)
      .send(`Tentti ID:llä ${req.params.id} poistettiin onnistuneesti ✅`);
  } catch (error) {
    res.status(500).send('Tentin poistossa ilmeni virhe:', error);
  }
});

// Muokkaa tenttiä ID:n avulla
router.patch('/:id', async (req, res) => {
  try {
    const uusiTenttiNimi = 'Turhanpäiväinen tentti';
    const uusiTentinKuvaus = 'Bla bla bla';
    const uusiVoimassaolo = true;
    const uusiPvm = '07.11.2022';
    const uudetPisteet = 100;

    const text =
      'UPDATE tentti SET nimi = ($1), kuvaus = ($2), voimassaolo = ($3), pvm = ($4), max_pisteet = ($5) WHERE id = ($6)';
    await db.query(text, [
      uusiTenttiNimi,
      uusiTentinKuvaus,
      uusiVoimassaolo,
      uusiPvm,
      uudetPisteet,
      req.params.id,
    ]);
    res
      .status(200)
      .send(`Tentti ID:llä ${req.params.id} päivitettiin onnistuneesti ✅`);
  } catch (error) {
    res.status(500).send('Tentin päivityksessä ilmeni virhe:', error);
  }
});

module.exports = router;
