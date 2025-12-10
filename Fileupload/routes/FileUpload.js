const express = require('express');

const router = express.Router();

const {localFileUpload,videoUpload,imageResizer, imageUpload} = require('../controllers/fileUpload');
// const {, , imageResizer} = require('../controllers/fileUpload');

router.post('/localFileUpload', localFileUpload);
router.post('/videoUpload', videoUpload);
router.post('/imageUpload', imageUpload);
router.post('/imageResizer', imageResizer);

module.exports = router;