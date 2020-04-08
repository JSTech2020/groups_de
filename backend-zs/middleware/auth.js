const jwt = require("jsonwebtoken");

module.exports = {
    authenticateUser: function (req, res, next) {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.status(401).json({ error: { message: 'jwt token missing' } })

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ error: err })
            req.user = user
            next() // pass the execution off to whatever request the client intended
        })
    }
}