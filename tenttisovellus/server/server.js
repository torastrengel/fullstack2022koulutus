const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tentti ORDER BY id ASC');
    res.send(rows);
  } catch (error) {
    console.error('Virhe datan haussa:', error);
  }
});

app.post('/', async (req, res) => {
  const { id, kysymykset: uudetKysymykset } = req.body;

  if (req.body && Object.keys(req.body).length > 0) {
    await db.query('UPDATE tentti SET kysymykset = ($1) WHERE id = ($2)', [
      JSON.stringify(uudetKysymykset),
      id,
    ]);
    //   const newData = JSON.stringify(req.body);
    //   fs.writeFileSync(path.join(__dirname, './tenttidata.json'), newData);
    res.send('Data tallennettu onnistuneesti!');
  } else {
    res.send('Pyynnössä ei lähetetty dataa. Mitään ei tehty...');
  }
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
