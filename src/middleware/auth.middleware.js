const {User_details} = require("../db/models");
const jwt = require("jsonwebtoken");
const {secretKey} = require("../utils/secretKey");

module.exports.validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const err = new Error();

  try {
    if (!token) {
      err.message = "Authorization token is missing";
      return next(err);
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      err.message = "Invalid token format";
      return next(err);
    }

    const tokenValue = tokenParts[1];

    const decodedToken = jwt.verify(tokenValue, secretKey);

    if (decodedToken.exp <= Date.now() / 1000) {
      err.message = "Token has expired";
      return next(err);
    }

    const userDetail = await User_details.findOne({where: {token: tokenValue}});

    if (!userDetail) {
      err.message = "You are not authorized to access this data";
      return next(err);
    }

    next();
  } catch (error) {
    err.message = error.message;
    return next(err);
  }
};
