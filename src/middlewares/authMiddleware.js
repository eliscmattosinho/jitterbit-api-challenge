import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    // Search for the token in the Header 'Authorization' (Bearer <TOKEN>)
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. Token not provided." });
    }

    try {
        // Check if the token is valid
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};
