const router = require('express').Router();
const { User, Post, Comment } = require('../models');

//homepage
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        });
        res.render('home', { posts });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});