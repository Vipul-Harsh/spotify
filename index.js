const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const User = require("./Models/user");
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

// Middleware
app.use(express.json());
app.use(passport.initialize());

// MongoDB Connection
mongoose.connect(`mongodb+srv://admin:${process.env.MONG_PASSWORD}@cluster0.swb01ku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Passport JWT Strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret', // Use environment variable for secret
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findOne({ _id: jwt_payload.identifier }).exec();
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));

// Routes
app.get('/', (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);

// Server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
