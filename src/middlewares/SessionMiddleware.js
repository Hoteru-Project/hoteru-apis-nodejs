const UserModel = require("../models/user");

module.exports = async (req, res, next) => {
    res.locals.session = req.session;
    if(req.session.user)
        res.locals.session.user = await UserModel.findOne({where:{id:req.session.user.id}});
    return next();
}
