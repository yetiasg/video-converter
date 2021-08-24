const router = require('express').Router();
const upload = require('../helpers/fileUploader').uploadFile()


router.get('/', (req, res) => {
  res.status(200).json({message: "Hello from root route"})
});

router.post('/uploadFile', upload.single('file'), (req, res) => {
  res.status(200).json({message: "Hello from upload route"})
});


module.exports = router;




