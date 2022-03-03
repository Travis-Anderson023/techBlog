const router = require('express').Router();
const Post = require('../../models/Posts');


//get all posts
//create post
//update post
//delete post
//get post by id
//get post by user

//api/posts/
//all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.send(posts);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

//create post
//takes title, body, user_id
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.userId
        });
        console.log('====================');
        res.send(newPost);
    } catch (err) {
        res.send({ message: err });
        console.log('====================');
        console.log(err);
        console.log(req.body)
    }
});

//update post
//takes id, title, body, user_id
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                body: req.body.body,
                user_id: req.body.user_id
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});

//delete post
//takes id
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(deletedPost);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});

//get post by id
//takes id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(post);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});

//get post by user
//takes user_id
router.get('/user/:user_id', async (req, res) => {
    try {
        const post = await Post.findAll({
            where: {
                user_id: req.params.user_id
            }
        });
        res.json(post);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});




module.exports = router;