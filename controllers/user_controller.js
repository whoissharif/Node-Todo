const User = require('../models/user');
const argon2 = require('argon2');

module.exports = {
    createAccount: async (req, res) => {
        function checkEmail() {
            return true;
        }

        let proceed = true;



        const { username, password, firstName, lastName, birthDate } = req.body;
        const hashPass = await argon2.hash(password);
        let userCheck = await User.find({
            username: username
        });




        if (userCheck.length !== 0) {
            proceed = false;
            res.send({
                "type": "error",
                "data": {
                    "msg": "user already exist"
                }
            })
        }

        if (proceed) {
            let newUser = new User({
                "username": username,
                "password": hashPass,
                "firstName": firstName,
                "lastName": lastName,
                "birthDate": birthDate,
            });

            try {
                let newUserSave = await newUser.save();

                if (newUserSave) {
                    res.send(
                        {
                            "type": "success",
                            "data": "Added"
                        }
                    )
                } else {
                    res.send(
                        {
                            "type": "fail",
                            "data": "not added"
                        }
                    )

                }


                console.log(userCheck);
            } catch (e) {
                res.send(
                    {
                        "type": "fail $e",
                        "data": e
                    }
                )
            }


        }


        // console.log(username, password, firstName, lastName, birthDate);

    },
}