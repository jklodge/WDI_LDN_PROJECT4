const router = require('express').Router();
const rekognition = require('../controllers/rekognition');

router.route('/rekognition')
  .post(rekognition.getLabels);

router.get('/recipes/:id', rekognition.getRecipeById);

module.exports = router;
