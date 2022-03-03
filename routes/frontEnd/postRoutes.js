const router = require('express').Router();
const { render } = require('express/lib/response');
const { User, Post, Comment } = require('../../models');

//posts
router.get('/:id', async (req, res) => {
    //array of all of your posts
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
            attributes: ['id', 'body', 'timestamp'],
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
        timestamp: `${thisPost.timestamp.getMonth() + 1}/${thisPost.timestamp.getDate()}/${thisPost.timestamp.getFullYear()}`,
        comments: thisPost.comments.map(comment => {
            return {
                id: comment.id,
                body: comment.body,
                user: comment.user.username,
                timestamp: `${comment.timestamp.getMonth() + 1}/${comment.timestamp.getDate()}/${comment.timestamp.getFullYear()}`
            };
        }
        )
    };
    console.log(postObject);
    res.render('post', {
        postObject: postObject,
        userId: req.session.userId
    });
});

module.exports = router;