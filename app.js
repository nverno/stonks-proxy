const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

const tweets = require('./routes/api/tweets');
const quotes = require('./routes/api/quotes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
// app.get('/*', (req, res, next) => {
//   res.header('')
// })
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-type,Accept,application/json'
  );
  next();
});
app.use('/api/tweets', tweets);
app.use('/api/quotes', quotes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
