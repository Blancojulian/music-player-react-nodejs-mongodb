const router = require('express').Router();
const songController = require('./../controllers/songController.js');
const upload = require('./../config/multer.js');

router.route('/song')
    .post(upload.single('song'), songController.createSong)
    .get(songController.getAllSongs);


router.route('/song/:id')
    .get(songController.getSong)
    .delete(songController.deleteSong)
    .put(upload.single('song'), songController.updateSong);


module.exports = router;