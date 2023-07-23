const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../config/db.config.js");
const User = db.User;
// const Seller = db.Seller;



const secret = config.secret;

verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  let token = authHeader.replace("Bearer ", "");

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};


isAdmin = async (req, res, next) => {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      if (user.role === "admin") {
        next();
      } else {
        res.status(403).send({ message: "Require Admin Role!" });
      }
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
  


// isSeller = (req, res, next) => {
//     Seller.findByPk(req.userId).then(user => {
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }
  
//       if (!user.role) {
//         next();
//       } else {
//         res.status(403).send({ message: "Require Seller Role!" });
//       }
//     });
// };


isUserOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if (user.role === "admin" || user.role === "buyer") {
      next();
    } else {
      res.status(403).send({ message: "Require Admin or Buyer Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};



const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUserOrAdmin: isUserOrAdmin,
};
module.exports = authJwt;