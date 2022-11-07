const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const port = process.env.PORT || 3001;

//Import routes
const tenttiRoute = require('./routes/tentit');
const kayttajaRoute = require('./routes/kayttajat');
const kysymysRoute = require('./routes/kysymykset');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tentit', tenttiRoute);
app.use('/kysymykset', kysymysRoute);
app.use('/kayttajat', kayttajaRoute);

app.get('/', (req, res) => {
  res.send('You arrived to the root route. Nothing to see here!');
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
