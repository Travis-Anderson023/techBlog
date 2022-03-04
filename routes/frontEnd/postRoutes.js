const router = require('express').Router();
const { render } = require('express/lib/response');
const { User, Post, Comment } = require('../../models');

//posts
router.get('/:id', async (req, res) => {
    //array of all of your posts
    try {
        const thisPost = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['id', 'body', 'timestamp', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                },
            }]
        }
        );
        // map
        const postObject = {
            id: thisPost.id,
            userId: thisPost.user_id,
            title: thisPost.title,
            body: thisPost.body,
            user: thisPost.user.username,
            isPostOwner: req.session.userId === thisPost.user_id,
            timestamp: `${thisPost.timestamp.getMonth() + 1}/${thisPost.timestamp.getDate()}/${thisPost.timestamp.getFullYear()}`,
            comments: thisPost.comments.map(comment => {
                return {
                    id: comment.id,
                    isCommentOwner: req.session.userId === comment.user_id,
                    body: comment.body,
                    user: comment.user.username,
                    timestamp: `${comment.timestamp.getMonth() + 1}/${comment.timestamp.getDate()}/${comment.timestamp.getFullYear()}`
                };
            }
            )
        };
        if (req.session.userId === undefined) {
            res.redirect('/login');
        }
        res.render('post', {
            postObject: postObject,
            userId: req.session.userId,
        });


    } catch (err) {
        res.status(500).render('login', {
            userId: req.session.userId,
        });
        console.log(err);
    }
});

module.exports = router;