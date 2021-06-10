const User = require("../models/user");

module.exports = {
    authenticate: (req, user, isApi=false) => {
        if(user instanceof User) {
            if(!isApi) {
                delete user.password;
                req.session.user = user;
                req.session.isAuth = true;
            }
            return true;
        }
        return false;
    },
    logout: (req) => {
        req.session.user = null;
        req.session.isAuth = false;
        return false;
    }
}
