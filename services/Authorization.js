const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/envConfig')

module.exports.authorized = (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (headerToken) {
        try {
            const token = headerToken.split('Bearer ')[1];
            const verified = jwt.verify(token, JWT_SECRET);
            if (verified) {
                next()
            } else {
                return res.status(401).json({ errors: [{ msg: "Invalid Token mismatch" }] })
            }
        } catch (err) {
            return res.status(401).json({ errors: [{ msg: "Invalid Token" }] })
        }
    } else {
        return res.status(401).json({ errors: [{ msg: "Token is missing" }] });
    }
}