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

    reaction: async (req, res) => {
        try {
            let proceed = true;
            let reactionList = ["Like","Love","Haha"];
            const { reaction, postToken, PosterToken, status } = req.body;
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
                    "status": status,

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
}