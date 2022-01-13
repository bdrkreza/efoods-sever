import { AuthUser } from "../models";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "thesecret",
  algorithms: ["HS256"],
};

module.exports = (passport: any) => {
  passport.use(
    new JwtStrategy(options, function (jwt_payload: any, done: any) {
      AuthUser.findOne(
        { _id: jwt_payload.sub },
        { password: 0, __v: 0 },
        function (err: any, user: any) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            if (user.status === "verified" || user.status === "pending") {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Your account is inactive now, Please contact admin",
              });
            }
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
};
