const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside JWTMiddleware');
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if (token) {
        try {
            //logic verify token
            const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
            console.log(jwtResponse);
            req.payload = jwtResponse.userId
            next()
        } catch (error) {
            res.status(401).json("Invalid Token.. Please login")
        }
    }else{
        res.status(404).json('Missing Token!!')
    }
}

module.exports = jwtMiddleware
