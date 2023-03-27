const { expressjwt } = require("express-jwt");
const config = require("./../config.json");

module.exports = jwt;

function jwt() {
  const { secret } = config;

  return expressjwt({
    secret,    
    getToken: req => req.cookies.token,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      "/api/users/signup",
      "/api/users/signin",
    ],
  });
}