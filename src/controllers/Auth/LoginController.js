"use strict";

const UserModel = require("../../models/user");
const Helper = require("../../helpers/AuthHelper");


module.exports = {
    get: (req, res) => {
        res.render("auth/LoginPage",{"layout": "template/template2"});
    },
    post: async (req, res) => {
        const errors = {}
        let loggedIn = false
        const user = await UserModel.findOne({$or :[{username: req.body.username}, {email: req.body.username}]});
        user && await user.comparePassword(req.body.password, (err, isMatch)=> {
            if (isMatch){
                loggedIn = Helper.authenticate(req, user);
                if(loggedIn)
                    return res.status(302).redirect("/");
            }
            errors["username_password"]= "username/email or password are not correct";
            return res.render("auth/LoginPage",{"layout": "template/template2", errors:errors});

        })
        if (!user){
            return res.render("auth/LoginPage",{"layout": "template/template2", errors:errors});
        }
    }
}
