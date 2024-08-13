import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';




const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-auth-token");

    if (!token)
        return res.status(401).send({ error: "Access denied. No token provided." });

    try {
        const payload = jwt.verify(token, "jwtPrivateKey");
        req.user = payload as JwtPayload;
        next();
    } catch (err) {
        res.status(400).send({ error: "Invalid token." });
    }
};




export default auth;

