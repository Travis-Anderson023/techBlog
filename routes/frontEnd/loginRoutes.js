const router = require('express').Router();
const { render } = require('express/lib/response');
const { User, Post, Comment } = require('../../models');

//login
router.get('/', (req, res) => {
    res.render('login');
});

module.exports = router;