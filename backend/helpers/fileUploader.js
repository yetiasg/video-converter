const multer = require('multer');
const {v4: uuidv4} = require('uuid');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'files');
  },
  filename: (req, file, cb) => {
      cb(null, uuidv4() + '-' + file.originalname);
  }
});

function uploadFile(){
  const upload = multer({dest: './files', storage: fileStorage});
  return upload;
}

module.exports = {
  uploadFile
}