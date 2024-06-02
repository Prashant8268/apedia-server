const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach user information to request object
        req.user = decoded;
        next();
    });
};
module.exports = authenticate;
