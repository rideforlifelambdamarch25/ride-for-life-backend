require("dotenv").config;

const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "USE THIS SECRET";

module.exports = {
  authenticate,
  generateToken
};

function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: "No token provided. Token must be set on the authorization header"
    });
  }
}


function generateToken(user) {

    // check if user is a mother/caretaker or driver
    // set token based on which user type
  const payload = {}

    if (user.driver_id) {
      const driver = user

      payload = {
        subject: driver.driver_id,
        username: driver.username,
        type: 'driver'
      }
    } else {

      payload = {
        subject: user.user_id,
        username: user.username,
        type: user.user_type  
      }

    }
    
    const options = {
        expiresIn: "1d"
    };

    return jwt.sign(payload, secret, options)


}


function verifyDriver(type) {
  return function(req, res, next) {
    if (req.decodedJwt.user && req.decodedJwt.type.includes(type)) {
      next();
    } else {
      res.status(403).json({message: 'Not Authorized'})
    }
  }
}