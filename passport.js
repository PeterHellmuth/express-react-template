/*const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/user");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: (req) => req.session.jwt,
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    (payload, done) => {
      // TODO: add additional jwt token verification
      return done(null, payload);
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      //check if username exists.
      const existingUsername = await User.find({
        username: { $eq: req.body.username },
      });
      //check if password matches
      const matchingPassword = [];
      for (const user of existingUsername) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          matchingPassword.push(user);
        }
      }

      if (existingUsername.length <= 0) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (matchingPassword.length <= 0) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, matchingPassword[0]);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;*/
