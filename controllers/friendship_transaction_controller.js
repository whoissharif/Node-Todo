const FriendshipTransaction = require('../models/friendship_transaction');
const utils = require('../helpers/utils');

module.exports = {
    sendFriendRequest: async (req, res) => {
        try {
            let proceed = true;
            const { from, to, type } = req.body;
            const { usertoken, sessiontoken } = req.headers;

            if (await utils.authinticate(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    "type": "error",
                    "data": {
                        "msg": "Not logged in"
                    },
                })
            }

            if (proceed) {
                let newRequest = FriendshipTransaction({
                    "token": utils.makeToken({
                        "label": "fst"
                    }),
                    "from": from,
                    "to": to,
                    "type": type,
                    "actionTime": "hi",
                });



                await newRequest.save();

                res.send({
                    "type": "success",
                    "data": newRequest,
                })


            }
        } catch (error) {

        }

    },

    allFriendRequest: async (req, res) => {
        try {
            let allReq = await FriendshipTransaction.find()
            res.send({
                "type": "success",
                "data": allReq,

            });
        } catch (error) {
            res.send({
                "type": "error",
                "data": allReq,

            });
        }
    },

    specificFriendRequest: async (req, res) => {
        try {

        } catch (error) {

        }
    }
}