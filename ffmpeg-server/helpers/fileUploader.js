const multer = require('multer');
const {v4: uuidv4} = require('uuid');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'receivedData');
  },
  filename: (req, file, cb) => {
      cb(null, `toConvert-${file.originalname}`);
  }
});

function uploadFile(){
  const upload = multer({storage: fileStorage});
  return upload;
}

module.exports = {
  uploadFile
}