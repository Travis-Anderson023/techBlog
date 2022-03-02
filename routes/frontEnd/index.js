const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const loginRoutes = require('./loginRoutes');
const dashRoutes = require('./dashRoutes');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/dash', dashRoutes);

module.exports = router;
