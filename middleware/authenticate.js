require("dotenv").config;

const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "USE THIS SECRET";

module.exports = {
  restricted,
  generateToken,
  verifyDriver,
  verifyUser
};

function restricted(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
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
  let payload = {};

  if (user.driver_id) {
    const driver = user;

    payload = {
      subject: driver.driver_id,
      username: driver.username,
      type: "driver"
    };
  } else {
    payload = {
      subject: user.user_id,
      username: user.username,
      type: user.user_type
    };
  }

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

// Verify user is a driver and allow access to driver only endpoints
function verifyDriver() {
  return function(req, res, next) {
    if (req.decoded.type && req.decoded.type === "driver") {
      next();
    } else {
      res.status(403).json({ message: "Not Authorized" });
    }
  };
}

// Verify user is a Mother/Caretaker and allow access to user only endpoints
function verifyUser() {
  return function(req, res, next) {
    if (req.decoded.type) {
      if (
        req.decoded.type.includes("caretaker") ||
        req.decoded.type.includes("mother")
      ) {
        next();
      } else {
        res.status(403).json({ message: "Not Authorized" });
      }
    }
  };
}
