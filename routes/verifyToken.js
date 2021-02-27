import jwt from 'jsonwebtoken';

//middleware function to verify the user used to allow access to  certain routes
function verifyUser (req, res, next){

    //getting token from the header - if doesnt exist deny access
    //getting the token stored in the cookie objext
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