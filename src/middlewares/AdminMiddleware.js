"use strict";

module.exports = async (req, res, next) => {
    if(req.session.isAuth){
        if(req.session.user.isAdmin)
            return next();
    }
    return res.redirect("/");
}
