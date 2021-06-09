const UserModel = require('../models/user');

module.exports = async (req, res, next) => {
    req.user = await UserModel.findOne({token: req.headers.authorization})
    return next()
}
