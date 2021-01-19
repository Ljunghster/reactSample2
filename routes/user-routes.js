const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

router.post('/api/users/register', async (req, res, next) => {
    console.log('j')
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.log(err);
            res.status(422).send(err);
        }
        else if (info != undefined) {
            console.log(info.message);
            res.status(422).json(info);
        }
        else {
            req.logIn(user, err => {
                if (err) {
                    console.log(err);
                    res.status(422).send(err);
                }
                else {
                    res.status(200).json({ messsage: 'User created' })
                }
            })
        }
    })(req, res, next);
    console.log('test')
});

router.post('/api/users/login', async (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(422).json(info);
        }
        else {
            req.logIn(user, async err => {
                const findUser = await User.findOne({
                    email: req.body.email
                });
                const token = jwt.sign({ id: findUser.email }, 'keyboardcat');
                res.status(200).json({
                    token
                })
            })
        }
    })(req, res, next);
});

router.post('/create-post', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user)
    Post.create({
        userId: req.user._id,
        message: req.body.message
    });
    res.end('Hello');
});

router.get('/api/posts', async (req, res) => {
    const posts = await Post.find({}).sort([['date', -1]]);
    console.log('Posts', posts)
    res.json(posts);
});

module.exports = router;
