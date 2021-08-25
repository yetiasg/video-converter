const router = require('express').Router();
const path = require('path');
const upload = require('../helpers/fileUploader').uploadFile()


router.get('/', (req, res) => {
  res.status(200).json({message: "Hello from root route"})
});

router.post('/uploadFile', upload.single('file'), (req, res) => {
  res.status(200).json({message: "Hello from upload route"})
});

router.get('/download', (req, res) => {
  const file = `/app/convertedData/iwo1.avi`;
  res.setHeader('Content-Length', file.length);
  res.download(file)
})

module.exports = router;




