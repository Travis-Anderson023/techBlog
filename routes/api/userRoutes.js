const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/Users');

//get all users
//create user
//login user

//api/users/

//all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

//create user
//takes username, password, email
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        res.json(newUser);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});

//login user
//takes username and password1
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (user) {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (passwordMatch) {
                req.session.userId = user.id;
                res.json({ message: 'success' });
            } else {
                res.json({ message: 'password fail' });
            }
        } else {
            res.json({ message: 'user not found' });
        }
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
});

//logout user
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'logged out' });
});


module.exports = router;