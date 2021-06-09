module.exports = (req, res, next) => {
    if(req.user || req.session?.isAuth)
        return next()
    if(req.session)
        return res.status(301).redirect("/login");
    return res.status(401).json({
        success: false,
        error: "Un Authenticated Access not permitted"
    });
}
