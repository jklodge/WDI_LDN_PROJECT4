const router = require('express').Router();
const apiData = require('../controllers/apiData');
const secureRoute = require('../lib/secureRoute');
const auth = require('../controllers/auth');

router.route('/recipes')
  .post(secureRoute, apiData.getRecipesFromIngredientsAndDiet);

router.route('/possible-food-names')
  .post(secureRoute, apiData.getFoodNamesFromAWSRekognition);

router.route('/recipes/:id')
  .get(secureRoute, apiData.getRecipeById);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;

// const router = require('express').Router();
// const apiData = require('../controllers/apiData');
// const auth = require('../controllers/auth');
//
// router.route('/recipes')
//   .post(apiData.getRecipesFromIngredientsAndDiet);
//
// router.route('/possible-food-names')
//   .post(apiData.getFoodNamesFromAWSRekognition);
//
// router.route('/recipes/:id')
//   .get(apiData.getRecipeById);
//
// router.route('/register')
//   .post(auth.register);
//
// router.route('/login')
//   .post(auth.login);
//
// router.route('/*')
//   .all((req, res) => res.status(404).json({ message: 'Not found' }));
//
// module.exports = router;
