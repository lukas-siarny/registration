const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fs = require("fs");
const path = require('path');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

//init env
dotenv.config({ path: "./config/config.env" });

//init express
const app = express();

////Passport config
require("./config/passport")(passport); 

//connect to DB
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Mongo DB connected"))
.catch((err) => console.log(err));

//body parser
app.use(express.urlencoded({ extended: true}));

//set view enigne
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layoutIndex', 'layoutsMain');
app.use(expressLayouts);

//Express session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

//Connect flash // we have pristup to req.flash where the massages are stroed
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

//helpers
const { formatDate } = require("./helpers/ejs");
app.locals.formatDate = formatDate;

//public folder
app.use(express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/index"));
app.use("/main", require("./routes/main"));

//run server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));