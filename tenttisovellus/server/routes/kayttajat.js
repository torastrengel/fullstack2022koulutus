const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const text = 'SELECT * FROM kayttaja ORDER BY id ASC';
    const { rows } = await db.query(text);
    res.send(rows);
  } catch (error) {
    res.status(500).send('Tenttikäyttäjien haussa ilmeni ongelma ❌');
  }
});

router.post('/', async (req, res) => {
  try {
    const values = ['Erkki Erkkinen', 'erkki@erkkikoodaa.codes', false];
    const text =
      'INSERT INTO kayttaja (nimi, email, admin) VALUES ($1, $2, $3)';
    await db.query(text, values);
    res.status(200).send('Tenttikäyttäjä tallennettu onnistuneesti ✅');
  } catch (error) {
    res.status(500).send('Tenttikäyttäjän tallennuksessa ilmeni ongelma ❌');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const text = 'DELETE FROM kayttaja WHERE id = ($1)';
    const values = [req.params.id];
    await db.query(text, values);
    res
      .status(200)
      .send(`Käyttäjä ID:llä ${req.params.id} poistettiin onnistuneesti ✅`);
  } catch (error) {
    res
      .status(500)
      .send(`Käyttäjää ID:llä ${req.params.id} ei onnistuttu poistamaan ❌`);
  }
});

router.patch('/:id', async (req, res) => {
  const { nimi, email, isAdmin } = req.body;

  try {
    const text =
      'UPDATE kayttaja SET nimi = ($1), email = ($2), admin = ($3) WHERE id = ($4)';
    const values = [nimi, email, isAdmin, req.params.id];
    await db.query(text, values);
    res
      .status(200)
      .send(`Käyttäjä ID:llä ${req.params.id} päivitettiin onnistuneesti ✅`);
  } catch (error) {
    res
      .status(500)
      .send(`Käyttäjää ID:llä ${req.params.id} ei onnistuttu päivittämään ❌`);
  }
});

module.exports = router;
