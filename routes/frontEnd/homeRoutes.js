const router = require('express').Router();
const { render } = require('express/lib/response');
const { User, Post, Comment } = require('../../models');

//homepage
router.get('/', async (req, res) => {
    try {
        const home =
            res.render('home');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;