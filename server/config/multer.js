const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const random = uuidv4();
    cb(null,'song '+ random + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

module.exports = upload;