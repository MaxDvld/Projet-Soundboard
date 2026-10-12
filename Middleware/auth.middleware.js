import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

function checkToken(req, res, next){
const header = req.headers["authorization"];
const token = header && header.split(" ")[1];
if(!token){
    return res.status(401).json({error : "Unhautorized"})
}
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
if(err){
    return res.status(403).json({error : "Token incorrect"})
}

next();
})
}

export default checkToken;