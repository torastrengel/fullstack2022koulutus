const { verifyToken } = require('../middlewares/verifyToken');
const express = require('express');
const router = express.Router();
const db = require('../db');

// Hae kaikki tentit
router.get('/', async (req, res) => {
  try {
    const text = 'SELECT * FROM tentti ORDER BY id ASC';
    const { rows } = await db.query(text);
    res.status(200).send(rows);
  } catch (error) {
    console.error('Tenttidatan haussa ongelma:', error);
  }
});

// Hae yksi tentti ID:n avulla, joka sisältää kysymykset ja vastausvaihtoehdot
router.get('/:tenttiId', async (req, res) => {
  try {
    const tentti_query = 'SELECT * FROM tentti WHERE id = ($1)';
    const { rows: tentti_data } = await db.query(tentti_query, [
      req.params.tenttiId,
    ]);

    const kysymys_query =
      'SELECT * FROM kysymys WHERE id IN (SELECT kysymys_id FROM tentti_kysymys_liitos WHERE tentti_id = ($1))';
    const { rows: kysymys_data } = await db.query(kysymys_query, [
      req.params.tenttiId,
    ]);

    const vastaus_query =
      'SELECT * FROM vastaus WHERE kysymys_id IN (SELECT kysymys_id FROM tentti_kysymys_liitos WHERE tentti_id = ($1))';
    const { rows: vastaus_data } = await db.query(vastaus_query, [
      req.params.tenttiId,
    ]);

    const kysymykset = kysymys_data.map((kysymys) => {
      return {
        id: kysymys.id,
        kysymys: kysymys.kysymys,
        vastausvaihtoehdot: vastaus_data.filter(
          (vastaus) => vastaus.kysymys_id === kysymys.id
        ),
      };
    });

    console.log(kysymykset);
    // Kirjoita logiikka tähän, jotta vastaukset yhdistetään kysymyksiin. käytä Reactin Kysymys.js filter logiikkaa tähän
    const tenttiObjekti = {
      tentti: { ...tentti_data[0] },
      kysymykset,
    };

    res.send(tenttiObjekti);
  } catch (error) {
    console.error('Virhe hakiessa tenttiä liitostaulusta:', error);
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
