import jwt from "jsonwebtoken";

export default function jwtGenerator(userId: number): string{
    const key = process.env.JWT_KEY;
    const config = { expiresIn: 60*60*24 };//Expira em 1 dia
    const token = jwt.sign({userId}, key, config);
    return token;
}