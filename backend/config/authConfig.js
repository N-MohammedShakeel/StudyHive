// backend/config/authConfig.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback", // Backend URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile:", profile);
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            console.log(profile);
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              password: null,
            });
            await user.save();
            console.log("New Google User Saved:", user);
          } else {
            user.googleId = profile.id;
            await user.save();
            console.log("Existing User Updated with Google ID:", user);
          }
        }
        return done(null, user);
      } catch (error) {
        console.error("Google Auth Error:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
