const router = require('express').Router();
const Comment = require('../../models/comments');

//get all comments
//create comment
//update comment
//delete comment
//get comment by id
//get comment by user
//get comment by post

//api/comments/
//all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.send(comments);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

//create comment
//takes body, user_id, post_id
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            body: req.body.body,
            user_id: req.session.userId,
            post_id: req.body.post_id
        });
        res.json(newComment);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});

//update comment
//takes id, body, user_id, post_id
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {
                body: req.body.body
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.json(updatedComment);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});

//delete comment
//takes id
router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(deletedComment);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});

//get comment by id
//takes id
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});

//get comment by user
//takes user_id
router.get('/user/:user_id', async (req, res) => {
    try {
        const comment = await Comment.findAll({
            where: {
                user_id: req.params.user_id
            }
        });
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});

//get comment by post
//takes post_id
router.get('/post/:post_id', async (req, res) => {
    try {
        const comment = await Comment.findAll({
            where: {
                post_id: req.params.post_id
            }
        });
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});




module.exports = router;