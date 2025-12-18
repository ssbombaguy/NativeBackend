import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token || token.startsWith("Bearer")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }   
};