const express = require('express');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fg = require('fast-glob');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(morgan('dev'));
app.use('/convertedData', express.static(path.join(__dirname, 'convertedData')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access');
  next();
});

const router = require('./router/router');
app.use(router);


app.get('/convert', async (req, res, next) => {
  const fileName = fg.sync(`./receivedData/toConvert-*`, {onlyFiles: true, cwd: '', deep: 1})[0].substring(`./receivedData/toConvert-`.length);
  const name = path.parse(fileName).name;
  const extname = path.parse(fileName).ext;
  const newFormatExtension = 'avi';
  try{
    ffmpeg(path.join(`${__dirname}/receivedData/toConvert-${name}${extname}`))
      .videoBitrate('1000k', true)
      .size('?x1080')
      .aspect('16:9')
      .autopad('black')
      .output(path.join(`${__dirname}/convertedData/${name}.${newFormatExtension}`))
      .on('end', () =>{
        fs.unlink(path.join(`${__dirname}/receivedData/toConvert-${name}${extname}`), (err, file) => {
          if(!err) console.log('Deleted');
          createError.InternalServerError(err);
        })
      })
      .run();
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