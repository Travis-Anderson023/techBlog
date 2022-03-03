const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const loginRoutes = require('./loginRoutes');
const dashRoutes = require('./dashRoutes');
const postRoutes = require('./postRoutes');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/dash', dashRoutes);
router.use('/post', postRoutes);

module.exports = router;
