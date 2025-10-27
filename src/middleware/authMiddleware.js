const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWth("Bearer ")) {
        return res.status(403).json({
            Error: "Access Denied: No Valid Token Provided"
        });
    }

    const incomingToken = authHeader.split(' ')[1]

    if (!incomingToken) {
        return res.status(403).json({
            Error: "Access Denied"
        });
    }

    try {
        const decodedPayload = jwt.verify(incomingToken, process.env.JWT_SECRET);
        req.user = decodedPayload;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

module.exports = verifyToken;