const express = require('express');
const router = express.Router();
const db = require('../db');

// Hae kaikki vastaukset
router.get('/', async (req, res) => {
  try {
    const text = 'SELECT * FROM vastaus ORDER BY id ASC';
    const { rows } = await db.query(text);
    res.send(rows);
  } catch (error) {
    res.status(500).send('Tenttivastausten haussa ilmeni ongelma ❌');
  }
});

// Lisää uusi vastaus
router.post('/', async (req, res) => {
  const { onkoOikein, vastaus, kysymys_id } = req.body;
  const values = [onkoOikein, vastaus, kysymys_id];

  try {
    const text =
      'INSERT INTO vastaus (oikein, teksti, kysymys_id) VALUES ($1, $2, $3)';
    await db.query(text, values);
    res.status(200).send('Tenttivastaus tallennettu onnistuneesti ✅');
  } catch (error) {
    console.error('Virhe:', error);
    res.status(500).send('Tenttivastauksen tallentamisessa ilmeni ongelma ❌');
  }
});

// Poista vastaus ID:n avulla
router.delete('/:id', async (req, res) => {
  try {
    const text = 'DELETE FROM vastaus WHERE id = ($1)';
    await db.query(text, [req.params.id]);
    res
      .status(200)
      .send(`Vastaus ID:llä ${req.params.id} poistettiin onnistuneesti ✅`);
  } catch (error) {
    console.error('Virhe:', error);
    res
      .status(500)
      .send(`Vastausta ID:llä ${req.params.id} ei onnistuttu poistamaan ❌`);
  }
});

// Muokkaa kysymyksen tietoja ID:n avulla
router.patch('/:id', async (req, res) => {
  const { onkoOikein, vastaus } = req.body;

  try {
    const text =
      'UPDATE vastaus SET oikein = ($1), teksti = ($2) WHERE id = ($3)';
    const values = [onkoOikein, vastaus, req.params.id];
    await db.query(text, values);
    res
      .status(200)
      .send(`Vastaus ID:llä ${req.params.id} päivitettiin onnistuneesti ✅`);
  } catch (error) {
    res
      .status(500)
      .send(`Vastauksen ID:llä ${req.params.id} ei onnistuttu päivittämään ❌`);
  }
});

module.exports = router;
