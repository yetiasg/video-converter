const express = require('express');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/files', express.static(path.join(__dirname, 'files')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access');
  next();
});

const router = require('./router/router');
app.use(router);

const fileName = 'iwo1';

app.get('/convert', (req, res, next) => {
  try{
      const command = ffmpeg(path.join(`${__dirname}/receivedData/${fileName}.mp4`))
      .videoBitrate('1000k', true)
      .size('?x1080')
      .aspect('16:9')
      .autopad('black')
      .output(path.join(`${__dirname}/convertedData/${fileName}.avi`))
      .run();
      res.status(200).json({message: 'Converted'})
    // .download(path.join(`${__dirname}/convertedData/${fileName}.avi`));
  }catch (error){
    next(createError.InternalServerError(error));
  }
})



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