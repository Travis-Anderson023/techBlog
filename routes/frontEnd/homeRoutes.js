const router = require('express').Router();
const { render } = require('express/lib/response');
const { User, Post, Comment } = require('../../models');

//homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ]
        });

        const postObject = postData.map(post => {
            return {
                id: post.id,
                title: post.title,
                body: post.body,
                user_id: post.user_id,
                user: post.user.username,
                timestamp: `${post.timestamp.getMonth() + 1}/${post.timestamp.getDate()}/${post.timestamp.getFullYear()}`
            }
        });
        res.render('home', {
            userId: req.session.userId,
            posts: postObject
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;