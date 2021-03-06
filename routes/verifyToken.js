import jwt from 'jsonwebtoken';

//middleware to veryfy users
function verifyUser (req, res, next){

    /**
     * token stored in the cookie object
     */
    const token = req.cookies.jwt;
 
    if(!token){
        const err = new Error('Accecc-Denied');
        err.status = 401;
        return next(err)
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        //creating a property user assinged the verified user.
        req.user = verified;

       //verifying if the user is admin
       const {admin} = req.user;

       if(!admin){
          const err = new Error('User is not admin');
          err.status = 403;
          return next(err)
        }
      next();

    }catch(err){
            var err = new Error('Invalid-token')
            err.status = 401;
            return next(err)
    }
}

export default verifyUser;