const FriendshipTransaction = require('../models/friendship_transaction');
const Friendship = require('../models/friendship');
const User = require('../models/user');
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
                // @allready friend or not

                let checkFriend = await Friendship.find({
                    'person': from,
                    'friend': to
                });

                let checkFriend2 = await Friendship.find({
                    'person': to,
                    'friend': from
                });

                if (checkFriend.length === 0 && checkFriend2.length === 0) {

                    //@ check pending request

                    let checkPendingReq = await FriendshipTransaction.find({
                        'from': from,
                        'to': to
                    });

                    let checkPendingReq2 = await FriendshipTransaction.find({
                        'from': to,
                        'to': from
                    });

                    if (checkPendingReq.length === 0 && checkPendingReq2.length === 0) {

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
                    else {
                        res.send("already pending request")
                    }

                }
                else {
                    res.send("Already friend")
                }
            }
        } catch (error) {

            res.send(error);

        }

    },

    allFriendRequest: async (req, res) => {
        try {
            let allReq = await FriendshipTransaction.find();

            let records = [];

            for (let i = 0; i < allReq.length; i++) {

                let thisItem = allReq[i];

                let object = {};

                let userDetail = await User.find({
                    'userToken': thisItem.from
                });

                object.token = userDetail[0].userToken;
                object.firstName = userDetail[0].firstName;
                object.lastName = userDetail[0].lastName;

                records.push(object);


            }

            res.send({
                "type": "success",
                "data": records,
                "count": records.length

            });
        } catch (error) {
            res.send({
                "type": "error"

            });
        }
    },

    specificFriendRequest: async (req, res) => {


        try {
            let userToken = req.params.userToken;

            let allReq = await FriendshipTransaction.find({
                "token": userToken
            });

            // let records = [];

            // for(let i = 0; i < allReq.length ; i++){

            //     let thisItem = allReq[i];

            //     let object = {};

            //     let userDetail = await User.find({
            //         'userToken' : thisItem.from
            //     });

            //     object.token = userDetail[0].userToken;
            //     object.firstName = userDetail[0].firstName;
            //     object.lastName = userDetail[0].lastName;

            //     records.push(object);


            // }

            res.send({
                "type": "success",
                "data": allReq,
                "count": allReq.length

            });



        } catch (error) {

        }
    },
    acceptFriendRequest: async (req, res) => {
        try {
            let proceed = true;
            const { from, to, status } = req.body;
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
                let newFriend = Friendship({
                    "person": to,
                    "friend": from,
                    "status": status,
                })
                
                await FriendshipTransaction.findOneAndUpdate(
                    { 'from': from },
                    {
                        $set: {
                            'actionTime': moment.utc().format('YYYY-MM-DD HH:mm:ss')
                        }
                    },
                    { new: true }
                );

                await newFriend.save();

                res.send({
                    "type": "success",
                    "data": newRequest,
                })

            }
        } catch (error) {

            res.send(error);

        }

    },
}