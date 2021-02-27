import jwt from 'jsonwebtoken';

//middleware to veryfy users
function verifyUser (req, res, next){

    /**
     * token stored in the cookie object
     */
    const token = req.cookies.jwt;
 
    if(!token) 
        return res.status(401).send('Access-Denied');
    
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    }catch(err){

        res.status(400).send('Invalid-Token');
    }
}

export default verifyUser;