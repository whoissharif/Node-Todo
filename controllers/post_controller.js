const Post = require('../models/post');
const Reaction = require('../models/reaction');
const utils = require('../helpers/utils');
const Comment = require('../models/comment');
const Reply = require('../models/reply');

module.exports = {
    createPost: async (req, res) => {
        try {
            let proceed = true;
            const { postContent, postPrivacy } = req.body;
            const { usertoken, sessiontoken } = req.headers;

            if (await utils.authinticate(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    "type": "error",
                    "data": {
                        "msg": "Mismatched !"
                    },
                })
            }

            if (proceed) {
                let newPost = Post({
                    "postToken": utils.makeToken({
                        "label": "postToken"
                    }),
                    "postContent": postContent,
                    "postPrivacy": postPrivacy,
                    "userToken": usertoken,
                    "sessionToken": sessiontoken,
                });



                await newPost.save();

                res.send({
                    "type": "success",
                    "data": newPost,
                })


            }
        } catch (error) {

        }

    },

    react: async (req, res) => {
        try {
            let proceed = true;
            let reactionList = ["Like", "Love", "Haha"];
            const { reaction, postToken, posterToken } = req.body;
            const { usertoken, sessiontoken } = req.headers;

            if (await utils.authinticate(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    "type": "error",
                    "data": {
                        "msg": "Mismatched !"
                    },
                })
            }

            let hasReaction = reactionList.includes(reaction);

            if (hasReaction === false) {
                proceed = false;
                res.send({
                    "type": "error",
                    "data": {
                        "msg": "Wrong reaction"
                    },
                })
            }

            if (proceed) {
                let newReaction = Reaction({
                    "token": utils.makeToken({
                        "label": "RT"
                    }),
                    "reaction": reaction,
                    "reactorToken": usertoken,
                    "postToken": postToken,
                    "posterToken": posterToken,
                    "status": "active",

                });
                await newReaction.save();

                res.send({
                    "type": "success",
                    "data": newReaction,
                })
            }
        } catch (error) {

        }

    },

    unReact: async (req, res) => {
        try {
            let proceed = true;
            const { token } = req.body;
            const { usertoken, sessiontoken } = req.headers;

            if (await utils.authinticate(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    "type": "error",
                    "data": {
                        "msg": "Mismatched !"
                    },
                })
            }

            if (proceed) {
                await Reaction.findOneAndUpdate(
                    { 'token': token },
                    {
                        $set: {
                            'status': "inactive"
                        }
                    },
                    { new: true }
                );

                let reactionDetails = await Reaction.find({
                    'token': token
                })

                res.send({
                    "type": "success",
                    "data": reactionDetails,
                })
            }
        } catch (error) {
            res.send({
                "type": "error",
                "data": error,
            })
        }

    },

    comment: async (req, res) => {
        try {
            let proceed = true;
            const { content, postToken, posterToken, commenterToken } = req.body;
            const { usertoken, sessiontoken } = req.headers;

            if (await utils.authinticate(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    "type": "error",
                    "data": {
                        "msg": "Mismatched !"
                    },
                })
            }

            if (proceed) {
                let newComment = Comment({
                    "token": utils.makeToken({
                        "label": "CT"
                    }),
                    "content": content,
                    "postToken": postToken,
                    "posterToken": posterToken,
                    "commenterToken": commenterToken,
                    "status": "active",

                });
                await newComment.save();

                res.send({
                    "type": "Insersion successful",
                    "data": newComment,
                })
            }
        } catch (error) {
            res.send({
                "type": "error",
                "data": error,
            })
        }

    },

    reply: async (req, res) => {
        try {
            let proceed = true;
            const { content, commentToken, postToken, replierToken, posterToken, commenterToken } = req.body;
            const { usertoken, sessiontoken } = req.headers;

            if (await utils.authinticate(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    "type": "error",
                    "data": {
                        "msg": "Mismatched !"
                    },
                })
            }

            if (proceed) {
                let newReply = Reply({
                    "token": utils.makeToken({
                        "label": "CT"
                    }),
                    "content": content,
                    "commentToken": commentToken,
                    "postToken": postToken,
                    "replierToken": replierToken,
                    "posterToken": posterToken,
                    "commenterToken": commenterToken,
                    "status": "active",

                });
                await newReply.save();

                res.send({
                    "type": "Insersion successful",
                    "data": newReply,
                })
            }
        } catch (error) {
            res.send({
                "type": "error",
                "data": error,
            })
        }

    },
}