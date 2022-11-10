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
});

// Hae yksi tentti ID:n avulla, joka sisältää kysymykset ja vastaukset
router.get('/:tenttiId', async (req, res) => {
  try {
    const text =
      'SELECT tentti.id, tentti.nimi FROM tentti INNER JOIN tentti_kysymys_liitos ON tentti_kysymys_liitos.tentti_id=tentti.id WHERE tentti_kysymys_liitos.tentti_id = ($1)';
    const { rows } = await db.query(text, [req.params.tenttiId]);
    res.send(rows);
  } catch (error) {
    console.error('Virhe hakiessa tenttiä liitostaulusta:', error);
  }
});

// Lisää uusi tentti
router.post('/', async (req, res) => {
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

// Lisää uusi tenttisuoritus
router.post('/:tenttiId/suoritus', async (req, res) => {
  try {
    const { tenttiId: tentti_id } = req.params;
    const { kayttaja_id, suoritettu, hyvaksytty, vastaukset } = req.body;
    const values = [
      tentti_id,
      kayttaja_id,
      suoritettu,
      hyvaksytty,
      JSON.stringify(vastaukset),
    ];
    const text =
      'INSERT INTO tentti_suoritus (tentti_id, kayttaja_id, suoritettu, hyvaksytty, vastaukset) VALUES ($1, $2, $3, $4, $5)';

    await db.query(text, values);
    res.status(200).send('Tenttisuoritus lisätty onnistuneesti! ✅');
  } catch (error) {
    console.error('Virhe tenttisuorituksen tallennuksessa:', error);
    res.status(500).send('Tenttisuorituksen tallennuksessa ilmeni virhe:');
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
    console.error('Tentin poistossa ilmeni virhe:', error);
    res.status(500).send('Tentin poistossa ilmeni virhe');
  }
});

// Muokkaa tenttiä ID:n avulla
router.patch('/:id', async (req, res) => {
  try {
    const {
      uusiTenttiNimi,
      uusiTentinKuvaus,
      uusiVoimassaolo,
      uusiPvm,
      uudetPisteet,
    } = req.body;

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
    console.error('Tentin päivitys epäonnistui:', error);
    res.status(500).send('Tentin päivityksessä ilmeni virhe');
  }
});

module.exports = router;
