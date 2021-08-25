const router = require('express').Router();
const createError = require('http-errors');
const fs = require('fs');
const fg = require('fast-glob');
const upload = require('../helpers/fileUploader').uploadFile()


router.get('/', (req, res) => {
  res.status(200).json({message: "Hello from root route"})
});

router.post('/uploadFile', upload.single('file'), (req, res) => {
  res.status(200).json({message: "Hello from upload route"})
});

router.get('/download', (req, res) => {
  const fileName = fg.sync(`./convertedData/*`, {onlyFiles: true, cwd: '', deep: 1})[0];
  console.log(fileName)
  const file = `/app/${fileName}`;
  res.setHeader('Content-Length', file.length);
  res.download(file, (err) => {
    if(err) return;
    fs.unlink(`/app/${fileName}`, (err, file) => {
      if(!err) console.log('Deleted');
      createError.InternalServerError(err);
    })
  })
})

module.exports = router;




