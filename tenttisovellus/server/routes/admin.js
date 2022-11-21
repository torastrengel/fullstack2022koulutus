const express = require('express');
const router = express.Router();
const db = require('../db');

/* KYSYMYKSET */

// Lisää uusi kysymys ja liitä se olemassa olevaan tenttiin
router.post('/kysymykset', async (req, res) => {
  const { kysymys, tentti_id, pisteet } = req.body;
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    const kysymysQuery =
      'INSERT INTO kysymys (kysymys) VALUES ($1) RETURNING id';
    const result = await client.query(kysymysQuery, [kysymys]);
    const insertQuestionToExam =
      'INSERT INTO tentti_kysymys_liitos(tentti_id, kysymys_id, pisteet) VALUES ($1, $2, $3)';
    const insertQuestionToExamValues = [tentti_id, result.rows[0].id, pisteet];
    await client.query(insertQuestionToExam, insertQuestionToExamValues);
    await client.query('COMMIT');
    res
      .status(200)
      .send(`Kysymys luotu ja yhdistetty tenttiin ID:llä ${tentti_id} ✅`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Virhe kysymyksen luomisessa:', error);
    res.status(500).send('Virhe kysymyksen luonnissa');
  } finally {
    client.release();
  }
});

// Poista kysymys ID:n avulla
router.delete('/kysymykset/:id', async (req, res) => {
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
router.put('/kysymykset/:id', async (req, res) => {
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

/* TENTIT */

// Lisää uusi tentti
router.post('/tentit', async (req, res) => {
  try {
    const { nimi, kuvaus, voimassaolo, pvm, max_pisteet } = req.body;
    const values = [nimi, kuvaus, voimassaolo, pvm, max_pisteet];
    const text =
      'INSERT INTO tentti (nimi, kuvaus, voimassaolo, pvm, max_pisteet) VALUES ($1, $2, $3, $4, $5)';

    await db.query(text, values);
    res.status(200).send('Tentti lisätty onnistuneesti! ✅');
  } catch (error) {
    console.error('Virhe tentin tallennuksessa:', error);
    res.status(500).send('Tentin tallennuksessa ilmeni virhe');
  }
});

/* VASTAUKSET */

// Lisää uusi vastaus
router.post('/vastaukset', async (req, res) => {
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
router.delete('/vastaukset/:id', async (req, res) => {
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

// Muokkaa vastauksen tietoja ID:n avulla
router.put('/vastaukset/:id', async (req, res) => {
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
