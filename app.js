const express = require("express");
const path = require("path");
//const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("cookie-session");
const dotenv = require("dotenv");
//const passport = require("./passport");

dotenv.config({ path: path.resolve(__dirname, ".env") });

// Set up mongoose connection
const mongoose = require("mongoose");
const DEPLOY_URL = "http://members-only.fly.dev";

mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://peterhellmuth:${process.env.MONGOOSE_PASS}@cluster0.kterel9.mongodb.net/members_only?retryWrites=true&w=majority`;

async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB");
}
main().catch((err) => console.log(err));

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
const helmet = require("helmet");

const cors = require("cors");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");

const app = express();
//app.use(passport.initialize());
// Apply rate limiter to all requests
app.use(limiter);

// Security
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "connect-src": ["'self'", `${DEPLOY_URL}`],
    },
  })
);
/* Set Cookie Settings */
/*
app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  })
);*/

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
const buildPath = path.normalize(path.join(__dirname, "./react-client/dist"));
app.use(express.static(buildPath));
app.use(cors());
app.use("/", indexRouter);
app.use("/users", userRouter);

module.exports = app;
