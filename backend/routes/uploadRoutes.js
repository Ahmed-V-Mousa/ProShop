import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  console.log('1');
  const fileTypes = /jpg|jpeg|png/;
  console.log('2');
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  console.log('3');
  const mimeType = fileTypes.test(file.mimetype);
  console.log('4');

  if (extName && mimeType) {
    console.log('5');
    return cb(null, true);
  } else {
    console.log('6');
    return cb('images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.route('/').post(upload.single('image'), (req, res) => {
  console.log(req.file.path);
  res.send(
    `https://proshop-backend-production.up.railway.app/${req.file.path}`
  );
});

export default router;
