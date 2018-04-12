const router = require('express').Router();
const crimes = require('../controllers/crimes');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
router.route('/crimes')
  .get(crimes.index)
  .post(secureRoute, crimes.create);

router.route('/crimes/:id')
  .get(crimes.show)
  .put(secureRoute, crimes.update)
  .delete(secureRoute, crimes.delete);


router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/crimes/:id/support')
  .post(secureRoute, crimes.support)
  .get(crimes.deleteSupport);

router.route('/*')
  .all((req, res) =>
    res.status(404).json({
      message: 'Not found'
    }));

module.exports = router;
