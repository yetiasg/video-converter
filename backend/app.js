const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const config = require('./config');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({message: "Hello from root route"})
});

app.use((req, res) => {
  res.status(404).json({message: 'This route does not exist'});
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status
    }
  });
});

app.listen(config.server.PORT, () => console.log(`Listening on port: ${config.server.PORT}`));