const jwt = require('jsonwebtoken')

const verifyToken = (req, res) => {
    const authHeader = req.headers["authorization"];
    const incomingToken = authHeader.split(' ')[1]

    if (!incomingToken) {
        return res.status(403).json({
            message: "Access Denied"
        });
    }

    const decodedPayload = jwt.verify(incomingToken, process.env.JWT_SECRET);

    if (!decodedPayload) {
        return res.status(403).json({
            Error: "Invalid or Expired Token"
        });
    }

    req.user = decodedPayload;
};

module.exports = verifyToken;