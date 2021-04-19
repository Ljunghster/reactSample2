const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');

router.post('/api/users/register', async (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            res.status(422).send(err);
        }
        else if (info != undefined) {
            res.status(422).json(info);
        }
        else {
            passport.authenticate('login', (loginErr, loginUser, loginInfo) => {
                if (loginErr) {
                    res.status(500).json({ message: 'Internal Server Error.' });
                } else if (loginInfo != undefined) {
                    res.status(422).json(loginInfo);
                } else {
                    req.logIn(loginUser, err => {
                        if (err) {
                            res.status(422).send(err);
                        }
                        else {
                            const token = jwt.sign({ id: req.body.email }, 'keyboardcat');
                            res.status(200).json({
                                token
                            })
                        }
                    });
                }
            })(req, res, next);
        }
    })(req, res, next);
});

router.post('/api/users/login', async (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
        if (info != undefined) {
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
    Post.create({
        userId: req.user._id,
        message: req.body.message
    });
    res.end('Post succesfully created.');
});

router.patch('/api/posts/:postId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // get the current user's userId
    // find the post with the matching postId and userId
    // if the post does not exist, send an error
    // if the post does exist, update the message

    const userId = req.user._id;
    const message = req.body.message;

    const post = await Post.findById(req.params.postId);
    if (post.userId !== userId) {
        res.status(403).end('-________-.')
    }

    try {
        await Post.update({ _id: req.params.postId, userId }, { $set: { message } });
        res.status(200).end();
    } catch (err) {
        res.status(500).end('Internal Server Error!');
    }
});

router.patch('/api/comments/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // get the current user's userId
    // find the comment with the matching commentId and userId
    // if the comment does not exist, send an error
    // if the comment does exist, update it

    const userId = req.user._id;
    const comment = req.body.comment;

    const comment = await Comment.findById(req.params.postId);
    if (comment.userId !== userId) {
        res.status(403).end('-________-.')
    }

    try {
        await Comment.update({ _id: req.params.commentId, userId }, { $set: { comment } });
        res.status(200).end();
    } catch (err) {
        res.status(500).end('Internal Server Error!');
    }
});

router.get('/api/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    res.json(await User.findById(req.user._id));
});

router.get('/api/posts', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const posts = await Post.find({}).sort([['date', -1]]);
    res.json(posts);
});

router.post('/api/comments/:postId',  passport.authenticate('jwt', { session: false }), async (req, res) => {
    const userId = req.user._id;
    const postId = req.params.postId;
    const post = await Post.findOne({ _id: postId });

    if (post) {
        const comment = await Comment.create({
            comment: req.body.comment,
            postId,
            userId,
        });
        res.status(200).json(comment);
    }
    else {
        res.status(422).json({
            message: 'Error creating comment.',
        });
    }
});

router.get('/api/comments/:postId', async (req, res) => {
    const comments = await Comment.find({ postId: req.params.postId, isHidden: false });
    res.status(200).json(comments || []);
});

router.delete('/api/posts/:postId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const post = await Post.findOne({ _id: req.params.postId, userId: req.user._id });
    if (post) {
        await Post.findByIdAndDelete(post._id);
        await Comment.deleteMany({ postId: post._id });
        res.status(200).send('Successfully deleted post.');
    } else {
        res.status(404).send('Post not found.');
    }
});

router.delete('/api/comments/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // owners can delete comments from their posts

    // grab the comment
    // grab the userId from the comment
    // verify that the userId of the logged in user is the same one as on the comment


    // grab the comment
    // grab the post from the comment
    // verify that

    if (!req.user) { 
        res.status(422).send('Not logged in!');
        return;
    }

    const comment = await Comment.findOne({ _id: req.params.commentId });

    if (comment) {
        const userId = comment.userId;
        const isOwnerOfComment = userId == req.user._id;
        const isOwnerOfPost = await Post.findOne({ _id: comment.postId, userId: req.user._id });

        if (!isOwnerOfComment && isOwnerOfPost === null) {
            res.status(403).send({ message: 'You need to be an owner of the comment or the post that was commented on to delete it.' });
            return;
        }

        try {
            await Comment.deleteOne({ _id: req.params.commentId });
            res.status(200).send({ message: 'Sucessfully deleted comment!' });
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: 'Internal server error!' });
        }
    } else {
        res.status(404).send({ message: 'Comment Not Found.' });
    }
});

module.exports = router;
