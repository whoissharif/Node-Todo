const Post = require('../models/post');
const Reaction = require('../models/reaction');
const Session = require('../models/session');
const utils = require('../helpers/utils');

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
                        "msg" : "Mismatched !"
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
            let reactionList = ["Like","Love","Haha"];
            const { reaction, postToken, posterToken } = req.body;
            const { usertoken, sessiontoken } = req.headers;

            if (await utils.authinticate(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    "type": "error",
                    "data": {
                        "msg" : "Mismatched !"
                    },
                })
            }

            let hasReaction = reactionList.includes(reaction);

                if(hasReaction === false){
                    proceed = false;
                    res.send({
                        "type": "error",
                        "data": {
                            "msg" : "Wrong reaction"
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
                        "msg" : "Mismatched !"
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
                    'token' : token
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
}