import { User } from '../model/User.js';
import jwt from 'jsonwebtoken';

// Function to get user  ID
function getUserById(id) {
    return User.findById(id).select("_id name email");
}

// Custom middleware  authorization
const isAuthorized = async (req, res, next) => {
    let token = req.cookies["x-auth-token"]; 
    

    if (!token) {
        return res.status(401).json({ error: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await getUserById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ error: "Invalid token, authorization denied" });
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(401).json({ error: "Invalid token, authorization denied" });
    }
};

export { isAuthorized };
