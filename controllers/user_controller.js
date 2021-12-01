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

    login: async (req, res) => {
        try {
            let proceed = true;
            const { username, password } = req.body;

            let checkUser = await User.find(
                {
                    username: username
                }
            );

            if (checkUser.length !== 1) {
                proceed = false;
                res.send({
                    "type": "error",
                    "data": {
                        "msg": "No user found"
                    }
                })
            } else {
                let checkPass = await argon2.verify(checkUser[0].password, password);
                // console.log(checkPass);

                if (checkPass === false) {
                    proceed = false;
                    res.send({
                        "type": "error",
                        "data": {
                            "msg": "Invalild pass"
                        }
                    })
                }
            }

            if (proceed) {

                res.send({
                    "type": "success",
                    "data": {
                        "msg": `Log in successfully as ${username}`
                    }
                })

            }



        } catch (e) {
            res.send(
                {
                    "type": "fail $e",
                    "data": e
                }
            )
        }
    },
}