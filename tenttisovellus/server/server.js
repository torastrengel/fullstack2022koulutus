const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, './tenttidata.json'), {
    encoding: 'utf-8',
    flag: 'r',
  });
  res.json(JSON.parse(data));
});

app.post('/', (req, res) => {
  if (req.body.length > 0) {
    const newData = JSON.stringify(req.body);
    fs.writeFileSync(path.join(__dirname, './tenttidata.json'), newData);
    res.send('Data tallennettu onnistuneesti!');
  } else {
    res.send('Pyynnössä ei lähetetty dataa. Mitään ei tehty...');
  }
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
