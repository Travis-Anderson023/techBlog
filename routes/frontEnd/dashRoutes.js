const router = require('express').Router();
const { render } = require('express/lib/response');
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    //array of all of your posts
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ]
                }
            ],
            where: {
                user_id: req.session.userId
            }
        });
        //res.send(posts);
        // map
        const postObject = posts.map(post => {
            return {
                id: post.id,
                title: post.title,
                body: post.body,
                user: post.user.username,
                timestamp: `${post.timestamp.getMonth() + 1}/${post.timestamp.getDate()}/${post.timestamp.getFullYear()}`,
                comments: post.comments.map(comment => {
                    return {
                        id: comment.id,
                        body: comment.body,
                        user: comment.user.username
                    };
                })
            };

        });
        res.render('dash', {
            postObject: postObject,
            userId: req.session.userId
        });
    } catch (err) {
        res.status(500).render('home', {
            userId: req.session.userId,
        });
        console.log(err);
    }

});

module.exports = router;