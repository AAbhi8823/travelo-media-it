const JWT = require('jsonwebtoken')
const dotdev = require('dotenv')
dotdev.config()
const secret = process.env.JWT_SECRET




const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ status: false, message: "Not Authorized!" });
    }
    let token = "";
    if (authHeader) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Token Not Found" });
    }
    const decoded_token = JWT.decode(token);
    if (!decoded_token) {
      return res.status(401).json({ status: false, message: "SignUp First" });
    }

    if (decoded_token.exp < Date.now() / 1000) {
      return res.status(401).json({ status: false, message: "Login First!" });
    }
    //verfy the token
    JWT.verify(token, secret, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ status: false, message: "Invalid Token" });
      } else {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};
module.exports = { authentication };


// const authentication = async (req, res, next) => {
//     try {
//         const authHeader = req.headers['authorization']
//         let token = ""
//         if (authHeader) {
//             token = authHeader.split(' ')[1]
//         }
//         if (!token) {
//             return res.status(401).json({ status: false, message: "Token not found" })
//         }
//         let decoded_token = JWT.decode(token)
//         if (decoded_token.iat > decoded_token.exp) {
//             return res.status(401).json({ status: false, message: "Loging First!" })
//         }
//         const decoded = JWT.verify(token, secret)
//         if (!decoded_token) {
//             return res.status(401).json({ status: false, message: "SignUp First!" })
//         }
//         if (decoded_token.length == 0) {
//             return res.status(401).json({ status: false, message: "User not authorized" })
//         }
//         //set user in req 
//         req.user = decoded_token
//         next()
//     } catch (err) {
//         return res.status(500).json({ status: false, message: "Login Please!", error: err.message })
//     }
// }
module.exports = {
    authentication
}
