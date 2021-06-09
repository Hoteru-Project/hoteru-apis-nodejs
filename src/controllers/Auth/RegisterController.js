"use strict";

const UserModel = require("../../models/user");

module.exports = {
    get: (req, res) => {
        res.render("auth/RegisterPage",{"layout": "template/template2"});
    },
    post: (req, res) => {
        const user = new UserModel(req.body);
        user.save().then( () => res.json({message: "User Added Successfully"}))
            .catch(err => res.status(400).json({error: err}))
    }
}
