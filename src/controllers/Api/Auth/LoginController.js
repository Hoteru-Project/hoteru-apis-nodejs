"use strict";

const UserModel = require("../../../models/user");
const Helper = require("../../Helpers");
var randomstring = require("randomstring");



module.exports = {
    login: async (req, res) => {
        const errors = {}
        let loggedIn = false
        const user = await UserModel.findOne({$or :[{username: req.body.username}, {email: req.body.username}]});
        user && await user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch){
                loggedIn = Helper.authenticate(req, user, true);
                user.token = randomstring.generate();
                user.save()
                if(loggedIn)
                    return res.status(200).json({
                        success: true,
                        data: {
                            token: user.token
                        }
                    });
            }
            errors["username_password"]= "username/email or password are not correct";
            return res.status(400).json({
                success: false,
                errors: errors
            });

        })
        if (!user){
            return res.status(404).json({
                success: false,
                errors: {
                    "accountNotFound": "Requested Account Not Found"
                }
            });
        }
    }
}
