const express = require('express');
const router = express.Router();
const db = require('../db');

// Hae kaikki kysymykset
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

// Lisää uusi kysymys
router.post('/', async (req, res) => {
  const { kysymys } = req.body;

  try {
    const text = 'INSERT INTO kysymys (kysymys) VALUES ($1)';
    await db.query(text, kysymys);
    res.status(200).send('Tenttikysymys tallennettu onnistuneesti ✅');
  } catch (error) {
    res.status(500).send('Tenttikysymyksen tallentamisessa ilmeni ongelma');
  }
  // db.end();
});

// Poista kysymys ID:n avulla
router.delete('/:id', async (req, res) => {
  try {
    const text = 'DELETE FROM kysymys WHERE id = ($1)';
    const values = [req.params.id];
    await db.query(text, values);
    res
      .status(200)
      .send(`Kysymys ID:llä ${req.params.id} poistettiin onnistuneesti ✅`);
  } catch (error) {
    res
      .status(500)
      .send(`Kysymys ID:llä ${req.params.id} ei onnistuttu poistamaan ❌`);
  }
});

// Muokkaa kysymyksen tietoja ID:n avulla
router.patch('/:id', async (req, res) => {
  const { kysymys } = req.body;

  try {
    const text = 'UPDATE kysymys SET kysymys = ($1) WHERE id = ($2)';
    const values = [kysymys, req.params.id];
    await db.query(text, values);
    res
      .status(200)
      .send(`Kysymys ID:llä ${req.params.id} päivitettiin onnistuneesti ✅`);
  } catch (error) {
    res
      .status(500)
      .send(`Kysymys ID:llä ${req.params.id} ei onnistuttu päivittämään ❌`);
  }
});

module.exports = router;
