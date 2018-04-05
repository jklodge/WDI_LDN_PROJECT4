const router = require('express').Router();
const apiData = require('../controllers/apiData');
const auth = require('../controllers/auth');

router.route('/recipes')
  .post(apiData.getLabels);

router.get('/recipes/:id', apiData.getRecipeById);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;