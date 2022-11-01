const { Pool, Client } = require('pg');

//Määritä tietokannan tiedot, jotta sinne voidaan yhdistää
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
});

// Hae tietokannasta kaikki tentit
const haeKaikkiTentit = async () => {
  try {
    const result = await pool.query(
      'SELECT * FROM tentit ORDER BY id ASC',
      (err, res) => {
        console.log(res.rows);
        pool.end();
      }
    );
  } catch (error) {
    console.error('Virhe tapahtui:', error);
  }
};
// haeKaikkiTentit();

const haeTenttiId = async (id) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tentit WHERE id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      throw new Error('Annetulla ID:llä ei löytynyt dataa...');
    }
    console.log(rows);
    pool.end();
  } catch (error) {
    console.error('Virhe tapahtui:', error);
    pool.end();
  }
};
// haeTenttiId('1018');

// Hae tenttiä sen nimellä
const haeTenttiNimellä = async (nimi) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM tentit WHERE nimi = ($1) ORDER BY nimi ASC',
      [nimi]
    );
    if (rows.length === 0) {
      throw new Error('Annetulla nimellä ei löytynyt dataa...');
    }
    console.log(rows);
    pool.end();
  } catch (error) {
    console.error('Virhe tapahtui:', error);
    pool.end();
  }
};

// haeTenttiNimellä('Maantieto');

// Hae monia tenttejä ID:illä
const haeTentitId = async (id) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tentit WHERE id = ANY ($1)', [
      id,
    ]);
    if (rows.length === 0) {
      throw new Error('Annetuilla ID:illä ei löytynyt dataa...');
    }
    console.log(rows);
    pool.end();
  } catch (error) {
    console.error('Virhe tapahtui:', error);
    pool.end();
  }
};

// haeTentitId([1018, 1019])

// Päivitä tentin nimi uuteen ID:n perusteella
const päivitäTentinNimi = async (id, uusiNimi) => {
  try {
    const { rows } = await pool.query(
      'UPDATE tentit SET nimi = ($1) WHERE id = ($2)',
      [uusiNimi, id]
    );
    if (rows.length === 0) {
      throw new Error('Annetulla nimellä ei löytynyt dataa...');
    }
    console.log(rows);
    pool.end();
  } catch (error) {
    console.error('Virhe tapahtui:', error);
    pool.end();
  }
};

päivitäTentinNimi(1019, 'Sekalainen tentti')

//Tallenna dataa tietokantaan --> TUPLA HIPSUT!!! Muuten ei toimi.
// Tämä ei toimi --> 'INSERT INTO tentit (nimi) VALUES ("jotain randomia")'
// for (let x = 0; x < 1000; x++) {
//   pool.query(
//     "INSERT INTO tentit (nimi) VALUES ('jotain randomia')",
//     (err, res) => {
//       console.log(err, res);
//       // pool.end();
//     }
//   );
// }

//Poista data taulusta 'tentit'
// pool.query('DELETE FROM tentit', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });
