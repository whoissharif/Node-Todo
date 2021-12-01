const FriendshipTransaction = require('../models/friendship_transaction');
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
            let allReq = await FriendshipTransaction.find();

            let records = [];
            
            for(let i = 0; i < allReq.length ; i++){

                let thisItem = allReq[i];

                let object = {};

                let userDetail = await User.find({
                    'userToken' : thisItem.from
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
                "token" : userToken
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
    }
}