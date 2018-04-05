const router = require('express').Router();
const apiData = require('../controllers/apiData');

router.route('/recipes')
  .post(apiData.getLabels);

router.get('/recipes/:id', apiData.getRecipeById);

module.exports = router;
