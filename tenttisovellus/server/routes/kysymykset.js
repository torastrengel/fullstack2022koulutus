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
});

// Lisää uusi kysymys
router.post('/', async (req, res) => {
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
