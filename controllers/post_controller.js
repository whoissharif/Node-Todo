const Post = require('../models/post');
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

    }
}